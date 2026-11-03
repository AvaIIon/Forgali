// Finish families for the category-page Finish filter ONLY. Product pages,
// cards, cart and search keep the exact Shopify finish names.
//
// The raw list ran to ~55 names ("Black", "Black Wirebrush", "Noir", "Pecan
// and Ivory"…), so the filter shows one entry per colour family instead:
// - two-tone values file under the frame (first part): the second part is
//   the seat/cushion on P&B chairs ("Pecan and Ivory") or the accent on
//   Max & Lily mid-century beds ("White/Pecan");
// - "<X> Wirebrush" is the textured version of <X>;
// - the aliases below fold Plank & Beam's named shades into the plain colour.
const FAMILY_ALIASES: Record<string, string> = {
  'noir': 'Black',
  'coastal white': 'White',
  'cerused white': 'White',
  'white wash': 'White',
  'white sand': 'White',
  'antique white': 'White',
};

export const finishFamily = (finish: string): string => {
  const frame = finish.split(/\s+and\s+|\//i)[0].trim();
  const base = frame.replace(/\s+wirebrush$/i, '').trim();
  return FAMILY_ALIASES[base.toLowerCase()] ?? base;
};

export const productHasFinishFamily = (finishes: string[], family: string): boolean =>
  finishes.some(f => finishFamily(f).toLowerCase() === family.toLowerCase());
