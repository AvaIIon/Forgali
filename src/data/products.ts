export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: "bunk-beds" | "loft-beds" | "single-beds" | "accessories";
  colors: string[];
  finishes?: string[];
  badge?: "new" | "bestseller" | "sale";
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  // BUNK BEDS
  {
    id: "1",
    name: "Maxtrix Twin Quad Bunk Bed With Stairs",
    price: 5566.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__4.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__4.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__7.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__5.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__6.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: "2",
    name: "Max & Lily Twin XL-Over-Queen Bunk Bed",
    price: 963.63,
    originalPrice: 1438.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/06/twin-xl-over-queen-white.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/06/twin-xl-over-queen-white.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/06/twin-xl-over-queen-white1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/06/twin-xl-over-queen-white2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/06/twin-xl-over-queen-white3.jpg"
    ],
    category: "bunk-beds",
    colors: ["#FFFFFF", "#C9B8A8", "#C19A6B"],
    finishes: ["White", "Clay", "Pecan"],
    badge: "sale",
    rating: 4.8,
    reviews: 203,
  },
  {
    id: "3",
    name: "Maxtrix GETIT Twin Medium Bunk Bed with Ladder",
    price: 2092.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/08/getit-ws__2-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/08/getit-ws__2-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/getit-natural-slat-right-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/getit-white-slat-right-drawers-open-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/getit-ns__2-1024x1024.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "4",
    name: "Mid-Century Modern Twin Over Full L-Shaped Bunk Bed",
    price: 1375.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/01/twin-over-full-bunk-bed-1-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/01/twin-over-full-bunk-bed-1-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/01/20-812-527__1_f977f78e-75f3-434d-b008-cc7a57b0ec07.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/01/20-812-527__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/01/20-812-527__3.jpg"
    ],
    category: "bunk-beds",
    colors: ["#FFFFFF", "#5C4033"],
    finishes: ["White/Pecan", "White/Walnut"],
    badge: "new",
    rating: 4.6,
    reviews: 94,
  },
  {
    id: "5",
    name: "Mid-Century Modern Full Over Full Bunk Bed",
    price: 1260.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/200251-527__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/200251-527__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/200251-527__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/200251-527__6.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/200251-527__5.jpg"
    ],
    category: "bunk-beds",
    colors: ["#FFFFFF", "#C19A6B"],
    finishes: ["White/Pecan"],
    badge: "new",
    rating: 4.8,
    reviews: 67,
  },
  {
    id: "6",
    name: "Maxtrix Twin XL over Queen High Bunk Bed with Angled Ladder",
    price: 2990.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/08/lavish-xl-ws__2-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/08/lavish-xl-ws__2-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/lavish-xl-ws-bunk-bed-right-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/lavish-xl-ws__5-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/lavish-xl-ws__4-1024x1024.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut", "Modern White"],
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "7",
    name: "MAXTRIX STACKER Twin Low Bunk Bed with Stairs",
    price: 3125.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/10/stacker_7.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/10/stacker_7.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/stacker.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/stacker_5.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/stacker_20ns__3_540x.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 178,
  },
  {
    id: "8",
    name: "Maxtrix Quattro Twin over Twin High Corner Bunk with Ladders",
    price: 3713.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/11/solid-wood-quattro-twin-over-twin-high-corner-bunk-with-ladders-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/solid-wood-quattro-twin-over-twin-high-corner-bunk-with-ladders-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2017/12/quattro-chestnutl-with-panel-bed-above-view-dressed-with-bedding-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2017/12/quattro-chestnutl-with-panel-bed-above-view-no-mattress-to-show-slats-1024x1024.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.8,
    reviews: 145,
  },
  {
    id: "9",
    name: "Maxtrix Full over Full Bunk Bed with Straight Ladder",
    price: 2778.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/11/buff_6.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/buff_6.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/11/buff.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/11/buff_1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/11/buff_2.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.7,
    reviews: 112,
  },
  {
    id: "10",
    name: "Max and Lily Twin Over Full Bunk Bed",
    price: 830.20,
    originalPrice: 1186.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/2949.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/2949.jpg",
      "https://bedsmart.ca/wp-content/uploads/2018/01/180231-131__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2018/01/180231-131__6.jpg",
      "https://bedsmart.ca/wp-content/uploads/2018/01/180231-131__3.jpg"
    ],
    category: "bunk-beds",
    colors: ["#3C1414", "#808080", "#D4A574", "#FFFFFF", "#4A90A4", "#C19A6B", "#5C4033"],
    finishes: ["Espresso", "Grey", "Natural", "White", "Blue", "Pecan", "Walnut"],
    badge: "sale",
    rating: 4.7,
    reviews: 312,
  },
  {
    id: "11",
    name: "Max and Lily Twin Over Full L-Shaped Bunk Bed",
    price: 1045.45,
    originalPrice: 1395.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/18-812-002__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/18-812-002__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/18-812-002__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/18-812-002__3.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/18-812-002__4.jpg"
    ],
    category: "bunk-beds",
    colors: ["#FFFFFF", "#C9B8A8"],
    finishes: ["White", "Clay"],
    badge: "sale",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "12",
    name: "Maxtrix Full over Full Bunk Bed with Staircase",
    price: 4170.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/139.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/139.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/140.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/11/topper.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/11/topper_1.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.9,
    reviews: 98,
  },
  {
    id: "13",
    name: "Max & Lily Modern Farmhouse Twin Over Twin Bunk Bed With Trundle",
    price: 1220.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/196201-185__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/196201-185__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/196201-185__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/196201-185__6.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/196201-185__5.jpg"
    ],
    category: "bunk-beds",
    colors: ["#B8A590", "#F5F5F5"],
    finishes: ["Driftwood", "White Wash"],
    badge: "new",
    rating: 4.7,
    reviews: 78,
  },
  {
    id: "14",
    name: "Maxtrix VENTI Twin High Bunk Bed with Angled Ladder",
    price: 2307.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/10/venti_5.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/10/venti_5.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/venti.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/venti_1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/venti_2.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.8,
    reviews: 145,
  },
  {
    id: "15",
    name: "Maxtrix Twin XL Low Bunk Bed with Ladder",
    price: 2383.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/08/hotshot_20ns__1_540x.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/08/hotshot_20ns__1_540x.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/hotshot_20cs__1_540x.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/08/hotshot_20ws__1_540x.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.6,
    reviews: 87,
  },
  {
    id: "16",
    name: "Maxtrix Smile Twin Low Bunk Bed with Slide and Ladder",
    price: 2383.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/10/smile_20ws__1_900x.webp",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/10/smile_20ws__1_900x.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/10/smile_20cs__1_900x.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/10/smile_20cs__3_900x.webp"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.7,
    reviews: 134,
  },
  {
    id: "17",
    name: "Max and Lily Twin Over Twin L-Shaped Low Bunk Bed",
    price: 990.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/1850153100-002__1-copy.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/1850153100-002__1-copy.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/1850153100-002__5.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/1850153100-002__2.jpg"
    ],
    category: "bunk-beds",
    colors: ["#FFFFFF"],
    finishes: ["White"],
    badge: "new",
    rating: 4.8,
    reviews: 56,
  },
  {
    id: "18",
    name: "Maxtrix HOTSHOT Twin Low Bunk Bed with Ladder",
    price: 1975.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/10/hotshot9.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/10/hotshot9.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/hotshot_13.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/hotshot_15.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 189,
  },
  {
    id: "19",
    name: "Max and Lily Twin Over Twin Bunk Bed With Trundle",
    price: 952.00,
    originalPrice: 1190.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/max-and-lily-twin-over-twin-bunk-bed-with-trundle-in-natural.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/max-and-lily-twin-over-twin-bunk-bed-with-trundle-in-natural.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/max-and-lily-twin-over-twin-bunk-bed-with-trundle-in-white.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1294.jpg"
    ],
    category: "bunk-beds",
    colors: ["#3C1414", "#808080", "#D4A574", "#FFFFFF", "#4A90A4"],
    finishes: ["Espresso", "Grey", "Natural", "White", "Blue"],
    badge: "sale",
    rating: 4.8,
    reviews: 267,
  },
  {
    id: "20",
    name: "Maxtrix Twin XL High Bunk Bed with Ladder",
    price: 2450.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/07/tall-xl.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/07/tall-xl.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/07/tall-xl-2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/07/tall-xl-3.jpg"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "21",
    name: "Maxtrix Modern Twin Low Bunk Bed with Ladder",
    price: 1975.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/12/hot-shot4-1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/12/hot-shot4-1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/12/tall_20mws__1_540x.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/12/hot-shot3.webp"
    ],
    category: "bunk-beds",
    colors: ["#FFFFFF", "#C19A6B"],
    finishes: ["White/Pecan"],
    badge: "new",
    rating: 4.8,
    reviews: 67,
  },
  {
    id: "22",
    name: "Maxtrix Full Medium Bunk Bed with Slide and Angled Ladder",
    price: 3197.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/11/hooray_20ws__1_900x.webp",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/hooray_20ws__1_900x.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/11/hooray_20cs__1_900x.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/11/hooray_20cp__1_900x.webp"
    ],
    category: "bunk-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.8,
    reviews: 145,
  },

  // LOFT BEDS
  {
    id: "23",
    name: "York 1 Twin Low Loft Bed in Grey with Pink Curtain",
    price: 1064.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/1680.jpg",
    images: ["https://bedsmart.ca/wp-content/uploads/2022/06/1680.jpg"],
    category: "loft-beds",
    colors: ["#808080", "#FFB6C1"],
    finishes: ["Grey/Pink"],
    rating: 4.7,
    reviews: 63,
  },
  {
    id: "24",
    name: "Max and Lily Twin Low Loft Bed In White With Desk and Bookcase",
    price: 1499.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/01/loft-with-desk.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/01/loft-with-desk.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/01/loft-with-desk-1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/01/loft-with-desk2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/01/loft-with-desk3.jpg"
    ],
    category: "loft-beds",
    colors: ["#FFFFFF"],
    finishes: ["White"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 189,
  },
  {
    id: "25",
    name: "Max and Lily Solid Wood Low Loft Bed With Staircase In Grey Finish and Curtain",
    price: 852.72,
    originalPrice: 1025.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/04/81fra5nblul_ac_sl1500-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/04/81fra5nblul_ac_sl1500-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/04/81nr3mfyyql_ac_sl1500-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/2780.jpg"
    ],
    category: "loft-beds",
    colors: ["#4A90A4", "#FFB6C1", "#9370DB"],
    finishes: ["Blue/Grey", "Pink/Grey", "Purple/Grey"],
    badge: "sale",
    rating: 4.8,
    reviews: 134,
  },
  {
    id: "26",
    name: "Awesome27 Maxtrix Twin Mid Loft Bed",
    price: 2816.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/663.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/663.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/664.jpg"
    ],
    category: "loft-beds",
    colors: ["#3C1414", "#D4A574", "#FFFFFF"],
    finishes: ["Espresso", "Natural", "White"],
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "27",
    name: "Max & Lily Mid-Century Modern Full High Loft Bed",
    price: 1135.75,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/205256-527__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/205256-527__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/205256-527__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/205256-527__3.jpg"
    ],
    category: "loft-beds",
    colors: ["#FFFFFF", "#C19A6B"],
    finishes: ["White/Pecan"],
    badge: "new",
    rating: 4.6,
    reviews: 72,
  },
  {
    id: "28",
    name: "Uber Bulky Full Ultra High Loft Bed with Straight Ladder on End",
    price: 1715.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/05/uber-bulky-cs__5-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/05/uber-bulky-cs__5-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/05/uber-bulky-cs__1-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/05/uber-bulky-cs__2-1024x1024.jpg"
    ],
    category: "loft-beds",
    colors: ["#D4A574", "#8B4513"],
    finishes: ["Natural", "Chestnut"],
    rating: 4.8,
    reviews: 78,
  },
  {
    id: "29",
    name: "Max and Lily Twin High Loft Bed",
    price: 595.70,
    originalPrice: 805.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/180427-002__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/180427-002__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/180427-002__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/180427-002__3.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/180427-002__4.jpg"
    ],
    category: "loft-beds",
    colors: ["#FFFFFF", "#C9B8A8", "#B8A590", "#C19A6B"],
    finishes: ["White", "Clay", "Driftwood", "Pecan"],
    badge: "sale",
    rating: 4.8,
    reviews: 245,
  },
  {
    id: "30",
    name: "Max and Lily Modern Farmhouse Twin High Loft Bed",
    price: 820.75,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/190227-182__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/190227-182__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/190227-182__3.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/190227-182__4.jpg"
    ],
    category: "loft-beds",
    colors: ["#8B7355", "#B8A590", "#C19A6B", "#F5F5F5"],
    finishes: ["Barnwood Brown", "Driftwood", "Pecan", "White Wash"],
    badge: "new",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "31",
    name: "Star Maxtrix Twin Size High Loft Bed",
    price: 3125.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/10/star-ns__2-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/10/star-ns__2-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/star-np__2-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/star-np__6-1024x1024.jpg"
    ],
    category: "loft-beds",
    colors: ["#3C1414", "#D4A574", "#FFFFFF"],
    finishes: ["Espresso", "Natural", "White"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "32",
    name: "Maxtrix Queen Size High Loft Bed with Straight Ladder",
    price: 2160.00,
    image: "https://bedsmart.ca/wp-content/uploads/2018/06/heavy-xl-ws-left-angle-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2018/06/heavy-xl-ws-left-angle-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2018/06/heavy-xl-ws-above-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2018/06/heavy-xl-ws-centered-1024x1024.jpg"
    ],
    category: "loft-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.8,
    reviews: 78,
  },
  {
    id: "33",
    name: "Max and Lily Twin Low Loft Bed With Slide",
    price: 631.81,
    originalPrice: 890.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/01/loft-with-slide-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/01/loft-with-slide-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/01/loft-with-slide3-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/01/loft-with-slide5-1024x1024.jpg"
    ],
    category: "loft-beds",
    colors: ["#808080", "#FFFFFF"],
    finishes: ["Grey", "White"],
    badge: "sale",
    rating: 4.7,
    reviews: 167,
  },
  {
    id: "34",
    name: "Crest Maxtrix Full Twin High Corner Loft Bed",
    price: 4532.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/11/crest_2.webp",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/crest_2.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/11/crest_1.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/11/crest.webp"
    ],
    category: "loft-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 145,
  },
  {
    id: "35",
    name: "Max and Lily Mid-Century Modern Twin High Loft Bed",
    price: 909.00,
    image: "https://bedsmart.ca/wp-content/uploads/2024/01/716k6revhjl_ac_sl1500-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2024/01/716k6revhjl_ac_sl1500-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/01/71pdmoyaopl_ac_sl1500-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2024/01/71qngo97krl_ac_sl1500-1024x1024.jpg"
    ],
    category: "loft-beds",
    colors: ["#FFFFFF", "#C19A6B"],
    finishes: ["White/Pecan"],
    rating: 4.8,
    reviews: 167,
  },

  // SINGLE BEDS
  {
    id: "36",
    name: "Maxtrix Full Traditional Bed with Slatted Headboard",
    price: 984.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/556.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/556.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/555.jpg"
    ],
    category: "single-beds",
    colors: ["#D4A574", "#8B4513"],
    finishes: ["Natural", "Chestnut"],
    rating: 4.7,
    reviews: 112,
  },
  {
    id: "37",
    name: "Max and Lily Classic Twin Floor Bed",
    price: 317.50,
    originalPrice: 556.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/09/180200-002__2.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/09/180200-002__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/09/180200-010__17.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/09/180200-002__6.jpg"
    ],
    category: "single-beds",
    colors: ["#FFFFFF", "#E8D4A2"],
    finishes: ["White", "Blonde"],
    badge: "sale",
    rating: 4.8,
    reviews: 234,
  },
  {
    id: "38",
    name: "Maxtrix Full Traditional Bed With Panel End and Low Footboard",
    price: 1123.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/560.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/560.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/561.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/562.jpg"
    ],
    category: "single-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "39",
    name: "Maxtrix Twin Traditional Bed with Panel End (High/Low)",
    price: 856.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/540.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/540.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/538.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/539.jpg"
    ],
    category: "single-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 189,
  },
  {
    id: "40",
    name: "Max and Lily Modern Farmhouse Queen Panel Bed",
    price: 665.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/190221-182__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/190221-182__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/190221-182__3.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/190221-182__4.jpg"
    ],
    category: "single-beds",
    colors: ["#8B7355", "#B8A590", "#C19A6B", "#F5F5F5"],
    finishes: ["Barnwood Brown", "Driftwood", "Pecan", "White Wash"],
    badge: "new",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: "41",
    name: "Queen Size Platform Bed",
    price: 489.00,
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/130322-187__1.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2025/11/130322-187__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/130322-185__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/11/130322-185__2.jpg"
    ],
    category: "single-beds",
    colors: ["#B8A590", "#C19A6B", "#5C4033"],
    finishes: ["Driftwood", "Pecan", "Walnut"],
    rating: 4.8,
    reviews: 145,
  },
  {
    id: "42",
    name: "Max and Lily Full Size Platform Bed",
    price: 409.09,
    originalPrice: 620.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/solid-wood-max-and-lily-full-platform-bed-in-espresso.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/solid-wood-max-and-lily-full-platform-bed-in-espresso.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1788.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1789.jpg"
    ],
    category: "single-beds",
    colors: ["#3C1414", "#808080", "#D4A574", "#FFFFFF", "#4A90A4", "#C9B8A8"],
    finishes: ["Espresso", "Grey", "Natural", "White", "Blue", "Clay"],
    badge: "sale",
    rating: 4.7,
    reviews: 278,
  },
  {
    id: "43",
    name: "Maxtrix Twin Traditional Bed with Slatted Headboard",
    price: 765.00,
    image: "https://bedsmart.ca/wp-content/uploads/2016/11/1160_20ns__1_900x.webp",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/1160_20ns__1_900x.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/11/1160_20cs__1_900x.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/11/1160_20cs__3_900x.webp"
    ],
    category: "single-beds",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.6,
    reviews: 98,
  },

  // ACCESSORIES
  {
    id: "44",
    name: "Full Size 6-Inch Bedsmart Foam Mattress",
    price: 500.00,
    image: "https://bedsmart.ca/wp-content/uploads/2017/08/JESS_HYBRIDMATTRESS_DREAM_STAR_BEDDING_BEST_QUALITY_MATTRESS_CANADIAN_78a94e84-5481-4da1-a595-be181f65301f-1024x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2017/08/JESS_HYBRIDMATTRESS_DREAM_STAR_BEDDING_BEST_QUALITY_MATTRESS_CANADIAN_78a94e84-5481-4da1-a595-be181f65301f-1024x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2017/08/screenshot2022-01-10at41910pm-1024x706.webp",
      "https://bedsmart.ca/wp-content/uploads/2017/08/screenshot2022-01-06at44137pm.webp"
    ],
    category: "accessories",
    colors: ["#FFFFFF"],
    finishes: ["White"],
    badge: "bestseller",
    rating: 4.9,
    reviews: 287,
  },
  {
    id: "45",
    name: "Max and Lily Add on Safety Guard Rail",
    price: 78.00,
    originalPrice: 95.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/2086-scaled-e1754517308220-1020x1024.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/2086-scaled-e1754517308220-1020x1024.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/04/177209-002__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2025/04/177209-002__3.jpg"
    ],
    category: "accessories",
    colors: ["#D4A574", "#FFFFFF", "#4A90A4", "#C9B8A8", "#C19A6B", "#5C4033"],
    finishes: ["Natural", "White", "Blue", "Clay", "Pecan", "Walnut"],
    badge: "sale",
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "46",
    name: "Maxtrix 2 Drawer Unit Underbed Dresser Drawers",
    price: 713.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/maxtrix-2-drawer-unit.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/maxtrix-2-drawer-unit.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1089.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1090.jpg"
    ],
    category: "accessories",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "47",
    name: "Solid Wood Maxtrix Student Desk",
    price: 750.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/2425-solid-wood-maxtrix-student-desk.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/2425-solid-wood-maxtrix-student-desk.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/832.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/833.jpg"
    ],
    category: "accessories",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    badge: "bestseller",
    rating: 4.8,
    reviews: 145,
  },
  {
    id: "48",
    name: "Maxtrix Narrow 3 Shelf Bookcase",
    price: 265.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/1476.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/1476.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1474.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1472.jpg"
    ],
    category: "accessories",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "49",
    name: "Max and Lily Night Stand With Drawer and Shelf",
    price: 322.00,
    image: "https://bedsmart.ca/wp-content/uploads/2020/05/180001-002__5.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2020/05/180001-002__5.jpg",
      "https://bedsmart.ca/wp-content/uploads/2020/05/180001-002__1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2020/05/180001-002__3.jpg"
    ],
    category: "accessories",
    colors: ["#D4A574", "#FFFFFF", "#4A90A4", "#C9B8A8", "#C19A6B", "#5C4033"],
    finishes: ["Natural", "White", "Blue", "Clay", "Pecan", "Walnut"],
    badge: "new",
    rating: 4.8,
    reviews: 178,
  },
  {
    id: "50",
    name: "1215 MAXTRIX TRUNDLE DRAWER",
    price: 641.00,
    image: "https://bedsmart.ca/wp-content/uploads/2022/06/615.jpg",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/615.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/616.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/619.jpg"
    ],
    category: "accessories",
    colors: ["#D4A574", "#FFFFFF", "#8B4513"],
    finishes: ["Natural", "White", "Chestnut"],
    rating: 4.7,
    reviews: 95,
  },
  {
    id: "51",
    name: "Twin Size 5-Inch Foam Mattress",
    price: 400.00,
    image: "https://bedsmart.ca/wp-content/uploads/2017/08/Bed33.1-1024x576.webp",
    images: [
      "https://bedsmart.ca/wp-content/uploads/2017/08/Bed33.1-1024x576.webp"
    ],
    category: "accessories",
    colors: ["#FFFFFF"],
    finishes: ["White"],
    rating: 4.8,
    reviews: 203,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getCategoryInfo = (category: string) => {
  const categoryInfo: Record<string, { title: string; description: string }> = {
    "bunk-beds": {
      title: "Bunk Beds",
      description: "Premium solid wood bunk beds built to last. From twin over twin to quad bunks, find the perfect space-saving solution for your family.",
    },
    "loft-beds": {
      title: "Loft Beds",
      description: "Maximize your space with our versatile loft beds. Perfect for creating study areas, play spaces, or extra storage underneath.",
    },
    "single-beds": {
      title: "Single Beds",
      description: "Classic platform beds and traditional designs in twin, full, and queen sizes. Solid wood construction for lasting quality.",
    },
    "accessories": {
      title: "Storage & Accessories",
      description: "Complete your bedroom setup with mattresses, guard rails, desks, bookcases, nightstands, and storage solutions.",
    },
  };
  return categoryInfo[category] || { title: "All Products", description: "Browse our complete collection of solid wood beds and accessories." };
};

export const getCategories = () => [
  { slug: "bunk-beds", name: "Bunk Beds", count: products.filter(p => p.category === "bunk-beds").length },
  { slug: "loft-beds", name: "Loft Beds", count: products.filter(p => p.category === "loft-beds").length },
  { slug: "single-beds", name: "Single Beds", count: products.filter(p => p.category === "single-beds").length },
  { slug: "accessories", name: "Accessories", count: products.filter(p => p.category === "accessories").length }
];
