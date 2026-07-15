// Swatch colors for every finish/color value in the catalog (census 2026-07-14).
// Shared by product cards and the PDP finish selector. Unknown values fall back
// to a keyword match so new finishes get a plausible tone instead of grey.

const FINISH_COLORS: Record<string, string> = {
  // core wood tones
  "White": "#F5F5F4",
  "Black": "#262626",
  "Grey": "#8C8C8C",
  "Natural": "#D4A574",
  "Espresso": "#3C2414",
  "Pecan": "#C19A6B",
  "Walnut": "#5C4033",
  "Blonde": "#E5C89A",
  "Clay": "#C9B8A8",
  "Chestnut": "#8B4513",
  "Driftwood": "#B8A590",
  "White Wash": "#EFEBE4",
  "Barnwood Brown": "#8B7355",
  "Blue": "#4A647C",
  "Navy": "#24344D",
  "Green": "#5B7553",
  "Teal": "#3D7676",
  "Dusty Rose": "#C9A0A0",
  "Yellow": "#E7C24A",
  "Pink": "#E8AFC0",
  "Purple": "#9B86C1",
  "Red": "#B5443C",
  "Charcoal": "#4A4A4A",
  "Moss": "#7A7C5A",
  "Cream": "#F2E8D5",
  "Seashell": "#F0E9DC",
  "Hazelnut": "#A9805B",
  "Cashew": "#D7B98E",
  "Noir": "#1F1F1F",
  // wirebrush / textured lines
  "Pecan Wirebrush": "#B08D5F",
  "Seashell Wirebrush": "#EFE6D8",
  "Black Wirebrush": "#333333",
  "Blonde Wirebrush": "#DDBF92",
  "Walnut Wirebrush": "#6B4F3A",
  "White Wirebrush": "#F1EEE7",
  // named whites
  "Coastal White": "#F4F1E8",
  "Cerused White": "#EDE7DC",
  "Modern White": "#FAFAF8",
  "White Sand": "#EDE4D3",
  // rustic line
  "Rustic Barnwood": "#9C8468",
  "Rustic Honey": "#C8933B",
  "Rustic Char": "#4A4038",
  // two-tone combos (frame tone shown)
  "Black and Black": "#222222",
  "Black and Ivory": "#3A3A36",
  "Blonde and Ivory": "#E7D2A8",
  "Blonde and Sesame": "#DEC391",
  "Pecan and Ivory": "#D9C39A",
  "Pecan and Toffee": "#BE9560",
  "Pecan and Black": "#A9814F",
  "Pecan and Terracotta": "#BE8A5E",
  "Pecan and Marine": "#A98A5C",
  "Pecan and Cream Microsuede": "#CDA972",
  "Walnut and Black": "#4E3A2C",
  "Walnut and Ivory": "#7B5F46",
  "Walnut and Moss Microsuede": "#675844",
  "Walnut and Charcoal Microsuede": "#55453A",
  "Walnut and Evergreen": "#52493A",
  "Antique White and Ivory": "#EFE8D8",
  "White and Pecan": "#E8D9BE",
  "White and Blonde": "#F0E6CE",
  "White/Pecan": "#E8D9BE",
  "White/Walnut": "#E8DED0",
  "White/Blonde": "#F0E6CE",
  "Grey/Pink": "#D4A5B9",
  "Blue/Grey": "#7A9BA8",
  "Pink/Grey": "#D4A5B9",
  "Purple/Grey": "#A89BC9",
};

// keyword -> tone, checked in order (first match wins)
const KEYWORD_TONES: Array<[RegExp, string]> = [
  [/noir|char(coal)?\b|black/i, "#2E2A26"],
  [/walnut/i, "#5C4033"],
  [/espresso/i, "#3C2414"],
  [/pecan/i, "#C19A6B"],
  [/blonde|honey/i, "#DDB878"],
  [/barnwood|brown|hazelnut/i, "#8B7355"],
  [/chestnut/i, "#8B4513"],
  [/driftwood|clay/i, "#B8A590"],
  [/wash|antique|cerused|coastal|sand|seashell|ivory|cream|cashew/i, "#EFE6D5"],
  [/white/i, "#F5F5F4"],
  [/navy/i, "#24344D"],
  [/blue/i, "#4A647C"],
  [/teal/i, "#3D7676"],
  [/green|moss|evergreen/i, "#5B7553"],
  [/rose|pink/i, "#D4A5B9"],
  [/purple/i, "#9B86C1"],
  [/red|terracotta/i, "#B5443C"],
  [/yellow/i, "#E7C24A"],
  [/grey|gray/i, "#8C8C8C"],
  [/natural|oak|wood/i, "#D4A574"],
];

export const getFinishColor = (finish: string): string => {
  if (FINISH_COLORS[finish]) return FINISH_COLORS[finish];
  for (const [re, hex] of KEYWORD_TONES) {
    if (re.test(finish)) return hex;
  }
  return "#CCCCCC";
};
