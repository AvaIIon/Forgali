// Shipping and return terms as schema.org JSON-LD, shared by the server-rendered
// product head (middleware.ts productHead) and the hydrated product page
// (ProductPage.tsx), and copied BY HAND into the OnlineStore block in index.html
// (static markup outside the routehead markers — keep the two in sync).
//
// Every value mirrors the customer-facing copy in src/i18n/messages.ts
// (shipping.*, returns.*, pdp.*; returns policy effective July 16, 2026).
// Change the copy first, then this file: structured data must never promise
// more than the page shows.

export const SITE_URL = "https://www.forgali.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Profiles Forgali actually runs. index.html's sameAs must list the same URLs. */
export const SAME_AS: string[] = [
  "https://www.facebook.com/Forgali/",
  // Business account "Forgali" (forgali.com claimed). Pinterest assigned the
  // username; if a vanity handle is ever set, update this URL and index.html.
  "https://www.pinterest.com/0nikphs1whppw6r7bgid0mtd3slnjf/",
];

/**
 * shipping.card1Body: every order ships free to any Canadian address.
 * shipping.times1 / pdp.deliveryWindow: processed "within about one week",
 * "12–18 business days in total". Handling is pinned at that week (5 business
 * days) so handling + transit reproduces the 12–18 window the PDP shows;
 * transit carries the destination spread ("transit times vary by destination").
 */
export const SHIPPING_DETAILS_JSONLD = {
  "@type": "OfferShippingDetails",
  shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "CAD" },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: "CA" },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 5, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: 7, maxValue: 13, unitCode: "DAY" },
  },
} as const;

/**
 * returns.*: new, unused, unassembled, undamaged items within 30 days of
 * delivery; the customer ships the item back at their own expense with the
 * carrier it arrived with (no label from us); refund once it arrives
 * re-sellable, "a 20% restocking fee may apply" (Google reads a bare Number
 * as a percentage of the price paid). Damaged, defective or wrong items: we
 * cover the return shipping and waive the restocking fee.
 */
export const RETURN_POLICY_JSONLD = {
  "@type": "MerchantReturnPolicy",
  "@id": `${SITE_URL}/returns#policy`,
  name: "Forgali 30-day returns",
  url: `${SITE_URL}/returns`,
  applicableCountry: "CA",
  returnPolicyCountry: "CA",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  itemCondition: "https://schema.org/NewCondition",
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnShippingFees",
  returnLabelSource: "https://schema.org/ReturnLabelCustomerResponsibility",
  refundType: "https://schema.org/FullRefund",
  restockingFee: 20,
  customerRemorseReturnFees: "https://schema.org/ReturnShippingFees",
  customerRemorseReturnLabelSource: "https://schema.org/ReturnLabelCustomerResponsibility",
  itemDefectReturnFees: "https://schema.org/FreeReturn",
} as const;

/**
 * Offer fields every product shares: new condition, who sells it, how it
 * ships, how it comes back. Spread into the Offer after price/availability.
 */
export const OFFER_TERMS_JSONLD = {
  itemCondition: "https://schema.org/NewCondition",
  seller: { "@type": "OnlineStore", "@id": ORGANIZATION_ID, name: "Forgali" },
  shippingDetails: SHIPPING_DETAILS_JSONLD,
  hasMerchantReturnPolicy: RETURN_POLICY_JSONLD,
} as const;
