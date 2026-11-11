// Shopify "Order payment" webhook -> Pinterest Conversions API (server-side
// copy of the 'checkout' event for forgali.com).
//
// Why this exists: the Pinterest 'checkout' event fires from the Shopify
// custom pixel "Pinterest Checkout" in the buyer's browser. Safari forgets
// script-written storage after 7 days, ad blockers stop the tag, and a
// thank-you page that never finishes loading sends nothing. This function
// sends a second copy of every paid order from the server with the SAME
// event_id the pixel uses (the Shopify order id). Pinterest's rule: same
// event_id + same event name = duplicate, the first one is kept and the other
// removed within 48 hours. So each order counts once, and it still counts
// when the pixel never fired.
//
// Wiring (full write-up: ~/Desktop/Forgali_Pinterest_Setup_2026-11-02/
// PINTEREST_CAPI_2026-11.md on Daniel's Mac):
//   Shopify admin > Settings > Notifications > Webhooks > Create webhook:
//     Event "Order payment" (orders/paid), Format JSON,
//     URL https://www.forgali.com/api/pinterest-capi
//   Vercel project env (Production):
//     SHOPIFY_WEBHOOK_SECRET  the store's webhook signing secret (same page)
//     PINTEREST_CAPI_TOKEN    Ads Manager > Conversions > Set up API >
//                             Generate new token (ad account 549770956733)
//     PINTEREST_CAPI_TEST=1   optional: send every order as a test event
//                             (shows on the Test events page, never counted)
//
// Deliberately plain: no dependencies, nothing stored, nothing logged that
// identifies the buyer, no retry loop of its own (Shopify retries a failed
// delivery 8 times over 4 hours; a 5xx from here asks for that retry).

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const config = { maxDuration: 10 };

const AD_ACCOUNT_ID = "549770956733";
const SHOP_DOMAIN = "kjrq9s-yp.myshopify.com";
// Public Storefront token, the same one the site ships in its bundle
// (src/services/shopifyService.ts). Read-only. Used to turn numeric product
// ids into handles: the Pinterest catalog's item id is the handle (<g:id> in
// google-feed.xml) and the webhook only carries numeric ids.
const STOREFRONT_TOKEN = "a657d35533c14d8ad23c908b75c56427";
const STOREFRONT_URL = `https://${SHOP_DOMAIN}/api/2025-01/graphql.json`;
const EVENT_SOURCE_URL = "https://www.forgali.com/";
// Same shape rule as src/lib/adClick.ts (epik is base64-ish).
const CLICK_ID = /^[A-Za-z0-9_\-+/=.]{1,500}$/;

type Address = {
  first_name?: string | null;
  last_name?: string | null;
  city?: string | null;
  province_code?: string | null;
  country_code?: string | null;
  phone?: string | null;
};

type LineItem = {
  product_id?: number | string | null;
  variant_id?: number | string | null;
  sku?: string | null;
  title?: string | null;
  price?: string | number | null;
  quantity?: number | null;
};

type ShopifyOrder = {
  id: number | string;
  name?: string | null;
  test?: boolean | null;
  email?: string | null;
  contact_email?: string | null;
  phone?: string | null;
  currency?: string | null;
  total_price?: string | number | null;
  created_at?: string | null;
  processed_at?: string | null;
  customer?: {
    id?: number | string | null;
    email?: string | null;
    phone?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    default_address?: Address | null;
  } | null;
  billing_address?: Address | null;
  shipping_address?: Address | null;
  line_items?: LineItem[] | null;
  note_attributes?: Array<{ name?: string | null; value?: string | null } | null> | null;
  client_details?: { browser_ip?: string | null; user_agent?: string | null } | null;
};

type UserData = {
  em?: string[];
  ph?: string[];
  fn?: string[];
  ln?: string[];
  ct?: string[];
  st?: string[];
  country?: string[];
  external_id?: string[];
  click_id?: string;
  client_ip_address?: string;
  client_user_agent?: string;
};

type Content = { id: string; item_price: string; quantity: number; item_name?: string };

type CheckoutEvent = {
  event_name: "checkout";
  action_source: "web";
  event_time: number;
  event_id: string;
  event_source_url: string;
  partner_name: string;
  opt_out: boolean;
  user_data: UserData;
  custom_data: {
    currency: string;
    value: string;
    content_ids: string[];
    contents: Content[];
    num_items: number;
    order_id: string;
  };
};

type PinterestResponse = {
  num_events_received?: number;
  num_events_processed?: number;
  events?: Array<{ status?: string; error_message?: string; warning_message?: string }>;
  code?: number;
  message?: string;
};

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

/** Health check: tells whether the two secrets are present, nothing else. */
export async function GET(): Promise<Response> {
  return json({
    ok: true,
    function: "pinterest-capi",
    configured: Boolean(process.env.SHOPIFY_WEBHOOK_SECRET && process.env.PINTEREST_CAPI_TOKEN),
    test_mode: process.env.PINTEREST_CAPI_TEST === "1",
  });
}

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  const token = process.env.PINTEREST_CAPI_TOKEN;
  if (!secret || !token) return json({ error: "not configured" }, 503);

  // Raw bytes first: the HMAC covers the body exactly as Shopify sent it.
  const raw = await request.text();
  if (!verifyShopifyHmac(raw, request.headers.get("x-shopify-hmac-sha256"), secret)) {
    return json({ error: "bad signature" }, 401);
  }
  const shop = request.headers.get("x-shopify-shop-domain");
  if (shop && shop !== SHOP_DOMAIN) return json({ error: "wrong shop" }, 401);
  const topic = request.headers.get("x-shopify-topic") ?? "";
  // Another topic pointed here by mistake: acknowledge so Shopify stops
  // retrying, send nothing.
  if (topic && topic !== "orders/paid") return json({ ok: true, skipped: topic });

  let order: ShopifyOrder;
  try {
    order = JSON.parse(raw) as ShopifyOrder;
  } catch {
    return json({ error: "bad json" }, 400);
  }
  if (!order || order.id === undefined || order.id === null) return json({ error: "no order id" }, 400);

  // Shopify's "Send test" notification carries X-Shopify-Test: true and a
  // sample order flagged test. Those go to Pinterest's test endpoint: visible
  // on the Test events page, never counted.
  const test =
    order.test === true ||
    request.headers.get("x-shopify-test") === "true" ||
    process.env.PINTEREST_CAPI_TEST === "1";

  const event = await buildCheckoutEvent(order);
  const result = await sendToPinterest(event, token, test);

  console.log(
    JSON.stringify({
      fn: "pinterest-capi",
      order: order.name ?? String(order.id),
      event_id: event.event_id,
      value: event.custom_data.value,
      items: event.custom_data.content_ids,
      has_click_id: Boolean(event.user_data.click_id),
      test,
      ...result.summary,
    }),
  );

  if (result.retry) return json({ error: "pinterest unavailable", pinterest: result.summary }, 502);
  return json({ ok: true, test, event_id: event.event_id, pinterest: result.summary });
}

function verifyShopifyHmac(raw: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const expected = createHmac("sha256", secret).update(raw, "utf8").digest("base64");
  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// --- Pinterest hashing rules (Track conversions in the API, parameter table):
// em: lower case · ph: digits only, with country code, no leading zeros ·
// fn/ln: lower case · ct: lower case, no spaces/punctuation · st/country:
// two-letter code, lower case. All SHA-256 hex. Postal code is skipped on
// purpose (Pinterest wants digits only; Canadian codes are alphanumeric).
const sha256 = (s: string): string => createHash("sha256").update(s, "utf8").digest("hex");
const lower = (s: string): string => s.trim().toLowerCase();
const cityNorm = (s: string): string => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const codeNorm = (s: string): string => {
  const c = lower(s);
  return /^[a-z]{2}$/.test(c) ? c : "";
};
const phoneNorm = (s: string): string => {
  let digits = s.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10) digits = `1${digits}`; // Canada/US local number
  return digits.length >= 8 && digits.length <= 15 ? digits : "";
};
const money = (v: string | number | null | undefined): string => {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
};
const first = (...vals: Array<string | null | undefined>): string =>
  vals.find((v) => typeof v === "string" && v.trim() !== "") ?? "";

function hashedList(value: string, norm: (s: string) => string): string[] | undefined {
  const n = norm(value);
  return n ? [sha256(n)] : undefined;
}

async function buildCheckoutEvent(order: ShopifyOrder): Promise<CheckoutEvent> {
  const orderId = String(order.id);
  const addr = order.billing_address ?? order.shipping_address ?? order.customer?.default_address ?? null;
  const ship = order.shipping_address ?? null;

  const lineItems = (order.line_items ?? []).filter((li) => li && (li.quantity ?? 0) > 0);
  const handles = await productHandles(lineItems.map((li) => li.product_id).filter((id) => id !== null && id !== undefined) as Array<number | string>);
  const contents: Content[] = lineItems.map((li) => {
    const pid = li.product_id === null || li.product_id === undefined ? "" : String(li.product_id);
    const id = handles.get(pid) || pid || String(li.sku || li.variant_id || "unknown");
    const content: Content = { id, item_price: money(li.price), quantity: li.quantity ?? 1 };
    if (li.title) content.item_name = li.title;
    return content;
  });
  const numItems = contents.reduce((n, c) => n + c.quantity, 0);

  const user_data: UserData = {};
  const em = hashedList(first(order.email, order.contact_email, order.customer?.email), lower);
  if (em) user_data.em = em;
  const ph = hashedList(first(order.phone, order.customer?.phone, addr?.phone, ship?.phone), phoneNorm);
  if (ph) user_data.ph = ph;
  const fn = hashedList(first(addr?.first_name, order.customer?.first_name), lower);
  if (fn) user_data.fn = fn;
  const ln = hashedList(first(addr?.last_name, order.customer?.last_name), lower);
  if (ln) user_data.ln = ln;
  const ct = hashedList(first(addr?.city), cityNorm);
  if (ct) user_data.ct = ct;
  const st = hashedList(first(addr?.province_code), codeNorm);
  if (st) user_data.st = st;
  const country = hashedList(first(addr?.country_code), codeNorm);
  if (country) user_data.country = country;
  if (order.customer?.id !== null && order.customer?.id !== undefined) {
    user_data.external_id = [sha256(String(order.customer.id))];
  }
  // The ad click id travels forgali.com -> cart attribute -> order note
  // attribute (src/lib/adClick.ts). Sent raw, not hashed.
  const epik = (order.note_attributes ?? []).find((a) => a && a.name === "epik")?.value;
  if (typeof epik === "string" && CLICK_ID.test(epik)) user_data.click_id = epik;
  const ip = order.client_details?.browser_ip;
  if (ip && ip !== "0.0.0.0" && ip !== "::") user_data.client_ip_address = ip;
  const ua = order.client_details?.user_agent;
  if (ua && ua.trim()) user_data.client_user_agent = ua.trim();

  const now = Math.floor(Date.now() / 1000);
  const paidAt = Date.parse(order.processed_at ?? order.created_at ?? "");
  const eventTime = Number.isFinite(paidAt) ? Math.min(Math.floor(paidAt / 1000), now) : now;

  return {
    event_name: "checkout",
    action_source: "web",
    event_time: eventTime,
    event_id: orderId, // = the pixel's event_id (checkout.order.id) -> dedup key
    event_source_url: EVENT_SOURCE_URL,
    partner_name: "direct",
    opt_out: false,
    user_data,
    custom_data: {
      currency: (order.currency || "CAD").toUpperCase(),
      // Order total incl. tax (and shipping, which Forgali does not charge):
      // the same number the pixel sends as checkout.totalPrice.
      value: money(order.total_price),
      content_ids: contents.map((c) => c.id),
      contents,
      num_items: numItems,
      order_id: orderId,
    },
  };
}

/** product id -> handle through the public Storefront API; best effort. */
async function productHandles(productIds: Array<number | string>): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const ids = [...new Set(productIds.map(String))].filter((id) => /^\d+$/.test(id));
  if (ids.length === 0) return map;
  try {
    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: "query($ids: [ID!]!) { nodes(ids: $ids) { ... on Product { id handle } } }",
        variables: { ids: ids.map((id) => `gid://shopify/Product/${id}`) },
      }),
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return map;
    const data = (await res.json()) as { data?: { nodes?: Array<{ id?: string; handle?: string } | null> } };
    for (const node of data.data?.nodes ?? []) {
      if (node?.id && node.handle) map.set(node.id.replace("gid://shopify/Product/", ""), node.handle);
    }
  } catch {
    /* fall back to numeric product ids; dedup does not depend on them */
  }
  return map;
}

async function sendToPinterest(
  event: CheckoutEvent,
  token: string,
  test: boolean,
): Promise<{ retry: boolean; summary: Record<string, unknown> }> {
  const url = `https://api.pinterest.com/v5/ad_accounts/${AD_ACCOUNT_ID}/events${test ? "?test=true" : ""}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ data: [event] }),
      signal: AbortSignal.timeout(3500),
    });
    const text = await res.text();
    let body: PinterestResponse = {};
    try {
      body = JSON.parse(text) as PinterestResponse;
    } catch {
      /* non-JSON error page */
    }
    const ev = body.events?.[0];
    const summary: Record<string, unknown> = {
      http: res.status,
      received: body.num_events_received,
      processed: body.num_events_processed,
      status: ev?.status,
    };
    if (ev?.error_message || body.message) summary.error = ev?.error_message || body.message;
    if (ev?.warning_message) summary.warning = ev.warning_message;
    // 5xx / 429: Pinterest hiccup, let Shopify retry. 4xx (bad token, bad
    // payload) would fail the same way again, so acknowledge and leave the
    // reason in the function log.
    return { retry: res.status >= 500 || res.status === 429, summary };
  } catch (err) {
    return { retry: true, summary: { http: 0, error: err instanceof Error ? err.message : "network error" } };
  }
}
