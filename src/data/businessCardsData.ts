import { Product } from '../types/print';

export const ALL_BUSINESS_CARD_PRODUCTS: Product[] = [
  // 1. Standard Business Cards
  {
    id: 'prod-bc-standard',
    slug: 'standard-business-cards',
    name: 'Standard Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'popular',
    tagline: 'Common sizes, stocks, and finishes',
    description: 'The foundation of professional networking. Printed on heavyweight 14pt or 16pt cardstock with optional mirror high-gloss UV or silky matte coating.',
    startingPrice: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 19.99 },
      { id: 'euro-21x33', name: '2.125" x 3.375" (EU Standard)', dimensions: '2.125" x 3.375"', widthInches: 3.375, heightInches: 2.125, basePrice: 24.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 24.99 },
      { id: 'slim-175x35', name: '1.75" x 3.5"', dimensions: '1.75" x 3.5"', widthInches: 3.5, heightInches: 1.75, basePrice: 22.99 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16PT C2S', description: 'Sturdy, rigid cardstock favored across the USA.', multiplier: 1.0, popular: true },
      { id: '14pt-c2s', name: '14PT C2S', description: 'Classic commercial cardstock.', multiplier: 0.9 },
      { id: '14pt-uncoated', name: '14PT Uncoated', description: 'Smooth, non-reflective writable surface.', multiplier: 1.0 },
    ],
    coatings: [
      { id: 'gloss-uv', name: 'High Gloss UV Coating', priceDelta: 0 },
      { id: 'matte-dull', name: 'Dull Matte Finish', priceDelta: 2.0 },
      { id: 'uncoated', name: 'Uncoated (Pen-Friendly)', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    corners: [
      { id: 'square', name: 'Standard Square Corners', price: 0 },
      { id: 'round-1-4', name: '1/4" Rounded Corners', price: 7.5 },
      { id: 'round-1-8', name: '1/8" Rounded Corners', price: 7.5 },
    ],
    quantities: [100, 250, 500, 1000, 2500, 5000],
    standardTurnaround: '2-3 Business Days'
  },

  // 2. Dual Raised Business Cards
  {
    id: 'prod-bc-dual-raised',
    slug: 'dual-raised-business-cards',
    name: 'Dual Raised Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'majestic',
    tagline: 'Impressive dual finish',
    description: 'Dual-raised business cards add a stunning visual effect with tactile 50μ raised foil coupled with 50μ raised spot UV on 1.5mil scuff-resistant soft-velvet suede laminate.',
    startingPrice: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 49.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 59.99 },
      { id: 'euro-21x33', name: '2.125" x 3.375" (EU Standard)', dimensions: '2.125" x 3.375"', widthInches: 3.375, heightInches: 2.125, basePrice: 64.99 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16PT C2S with Velvet Suede', description: 'Rigid heavyweight with velvet barrier.', multiplier: 1.0, popular: true },
      { id: '18pt-suede', name: '18PT Suede Cover', description: 'Ultra-luxurious tactile thickness.', multiplier: 1.25 },
    ],
    coatings: [
      { id: 'scuff-velvet', name: '1.5mil Scuff-Resistant Soft-Velvet Suede', priceDelta: 0 },
    ],
    foilColors: [
      { id: 'gold-foil', name: 'Gold Foil (Raised 50μ)', priceDelta: 16 },
      { id: 'silver-foil', name: 'Silver Foil (Raised 50μ)', priceDelta: 16 },
      { id: 'holographic-foil', name: 'Holographic Foil (Raised Rainbow)', priceDelta: 24 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '3-5 Business Days'
  },

  // 3. Suede Business Cards
  {
    id: 'prod-bc-suede',
    slug: 'suede-business-cards',
    name: 'Suede Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'popular',
    tagline: 'Scuff-resistant velvet laminate',
    description: 'Substantial 16pt cardstock laminated with 1.5mil soft velvet suede film on both sides. Incredibly soft to the touch yet highly durable against finger scratches.',
    startingPrice: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    popular: true,
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 34.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 42.99 },
      { id: 'euro-21x33', name: '2.125" x 3.375" (EU Standard)', dimensions: '2.125" x 3.375"', widthInches: 3.375, heightInches: 2.125, basePrice: 44.99 },
    ],
    stocks: [
      { id: '16pt-suede', name: '16PT Suede Cover', description: 'Rich velvet touch feel.', multiplier: 1.0, popular: true },
      { id: '19pt-velvet', name: '19PT Heavy Suede', description: 'Reinforced thickness with velvet film.', multiplier: 1.2 },
    ],
    coatings: [
      { id: 'velvet-both', name: 'Double-Sided Suede Velvet Laminate', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '2-4 Business Days'
  },

  // 4. Silk Business Cards
  {
    id: 'prod-bc-silk',
    slug: 'silk-business-cards',
    name: 'Silk Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'popular',
    tagline: 'Sensuous, soft-touch matte laminate',
    description: 'Silky smooth, water and tear-resistant 16pt cardstock with a supple matte finish. Elegant, professional, and long-lasting.',
    startingPrice: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    popular: true,
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 29.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 38.99 },
    ],
    stocks: [
      { id: '16pt-silk', name: '16PT Silk Laminated Cover', description: 'Tear-resistant matte barrier.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'silk-matte', name: 'Silk Matte Finish', priceDelta: 0 },
      { id: 'silk-spot-uv', name: 'Silk with Flat Spot UV Accents', priceDelta: 12 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '3-4 Business Days'
  },

  // 5. Raised Spot UV Business Cards
  {
    id: 'prod-bc-raised-spot-uv',
    slug: 'raised-spot-uv-business-cards',
    name: 'Raised Spot UV Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'majestic',
    tagline: 'Elegant emphasis you can see and feel',
    description: 'Clear, tactile 50-micron raised gloss varnish layered over velvety matte laminate gives logos and headlines a dramatic dimensional pop.',
    startingPrice: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    popular: true,
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 44.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 54.99 },
    ],
    stocks: [
      { id: '16pt-velvet', name: '16PT Suede with Raised Spot UV', description: 'High-contrast tactile gloss.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: '50-micron-uv', name: '50 Micron Raised High-Gloss UV', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '3-5 Business Days'
  },

  // 6. Painted Edge Business Cards
  {
    id: 'prod-bc-painted-edge',
    slug: 'painted-edge-business-cards',
    name: 'Painted Edge Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Ultra-thick with bright colored sides',
    description: 'Gigantic 32pt heavy-duty cards featuring hand-painted edge colors in metallic gold, radiant neon pink, electric cyan, vibrant orange, or emerald green.',
    startingPrice: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    popular: true,
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 59.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 69.99 },
    ],
    stocks: [
      { id: '32pt-uncoated', name: '32PT Extra-Thick Uncoated Triple-Layer', description: 'Double thickness with dyed edges.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'painted-gold', name: 'Metallic Gold Edge Paint', priceDelta: 0 },
      { id: 'painted-blue', name: 'Cyan Blue Edge Paint', priceDelta: 0 },
      { id: 'painted-magenta', name: 'Neon Pink / Magenta Edge Paint', priceDelta: 0 },
    ],
    sides: [
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.0 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '4-6 Business Days'
  },

  // 7. Black Edge Business Cards
  {
    id: 'prod-bc-black-edge',
    slug: 'black-edge-business-cards',
    name: 'Black Edge Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Bright white layers on solid black core',
    description: 'Super-sturdy 34pt triplex cardstock with two pristine white exterior printing surfaces surrounding a dark, solid pitch-black center core.',
    startingPrice: 64.99,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 64.99 },
    ],
    stocks: [
      { id: '34pt-black-core', name: '34PT Triplex with Solid Black Core', description: 'Indestructible triplex card.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'uncoated-smooth', name: 'Uncoated Smooth White Faces', priceDelta: 0 },
    ],
    sides: [
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.0 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '4-6 Business Days'
  },

  // 8. Foil Worx Business Cards
  {
    id: 'prod-bc-foil-worx',
    slug: 'foil-worx-business-cards',
    name: 'Foil Worx Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'majestic',
    tagline: 'Hot-stamped foil accents',
    description: 'Prestige hot-stamped flat metallic foil in classic gold, silver, copper, or rose gold pressed deeply into smooth 14pt or 16pt cardstock.',
    startingPrice: 42.99,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 42.99 },
    ],
    stocks: [
      { id: '14pt-uncoated', name: '14PT Uncoated with Foil', description: 'Classic stamping.', multiplier: 1.0 },
      { id: '16pt-silk', name: '16PT Silk with Foil', description: 'Smooth matte with metallic stamp.', multiplier: 1.2, popular: true },
    ],
    coatings: [
      { id: 'gold-foil-flat', name: 'Hot Stamped Gold Foil', priceDelta: 0 },
      { id: 'silver-foil-flat', name: 'Hot Stamped Silver Foil', priceDelta: 0 },
      { id: 'copper-foil', name: 'Hot Stamped Copper Foil', priceDelta: 5.0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '3-5 Business Days'
  },

  // 9. Raised Foil Business Cards
  {
    id: 'prod-bc-raised-foil',
    slug: 'raised-foil-business-cards',
    name: 'Raised Foil Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'majestic',
    tagline: 'Foil embossed on soft-touch laminate',
    description: 'Take metallic foil into the 3rd dimension. Foil is physically lifted 50 microns above velvety suede lamination for an irresistible tactile feel.',
    startingPrice: 46.99,
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    popular: true,
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 46.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 56.99 },
    ],
    stocks: [
      { id: '16pt-suede', name: '16PT Suede with Raised Foil', description: 'Embossed metallic luster.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'raised-gold', name: '50μ Raised Gold Foil', priceDelta: 0 },
      { id: 'raised-silver', name: '50μ Raised Silver Foil', priceDelta: 0 },
      { id: 'raised-holo', name: '50μ Raised Holographic Foil', priceDelta: 10 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '3-5 Business Days'
  },

  // 10. Linen Uncoated Business Cards
  {
    id: 'prod-bc-linen',
    slug: 'linen-uncoated-business-cards',
    name: 'Linen Uncoated Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Traditional, elegant, and affordable',
    description: 'Crosshatch woven texture that conveys timeless heritage. Favored by law firms, financial institutions, and corporate executives.',
    startingPrice: 27.99,
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 27.99 },
    ],
    stocks: [
      { id: '100lb-linen', name: '100LB Cover Linen Premium Cardstock', description: 'Distinct woven texture.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'linen-uncoated', name: 'Traditional Woven Linen (Uncoated)', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '2-4 Business Days'
  },

  // 11. Brown Kraft Business Cards
  {
    id: 'prod-bc-brown-kraft',
    slug: 'brown-kraft-business-cards',
    name: 'Brown Kraft Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Organic look with natural fibers',
    description: 'Thick, rustic 18pt natural kraft board containing 100% recycled fibers. Ideal for organic foods, artisan craftsmen, coffee roasters, and boutiques.',
    startingPrice: 26.99,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 26.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 32.99 },
    ],
    stocks: [
      { id: '18pt-kraft', name: '18PT 100% Recycled Brown Kraft', description: 'Authentic earthy fiberboard.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'uncoated-kraft', name: 'Raw Natural Uncoated Finish', priceDelta: 0 },
      { id: 'white-ink-kraft', name: 'Optional Opaque White Under-Ink', priceDelta: 15 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '2-4 Business Days'
  },

  // 12. Natural Business Cards
  {
    id: 'prod-bc-natural',
    slug: 'natural-business-cards',
    name: 'Natural Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Eco-friendly with recycled fibers',
    description: 'Warm, off-white 14pt cardstock with organic natural flecks visible throughout the sheet. 30% post-consumer recycled content.',
    startingPrice: 25.99,
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 25.99 },
    ],
    stocks: [
      { id: '14pt-natural', name: '14PT Natural Off-White with Flecks', description: 'Eco-friendly paper.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'natural-smooth', name: 'Smooth Uncoated Natural', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '2-4 Business Days'
  },

  // 13. EndurACE Business Cards
  {
    id: 'prod-bc-endurace',
    slug: 'endurace-business-cards',
    name: 'EndurACE Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Waterproof, resilient 10pt synthetic',
    description: 'Crafted from multi-layered synthetic plastic fibers that cannot be torn, scuffed, or ruined by water. Ideal for plumbers, contractors, dive instructors, and poolside resorts.',
    startingPrice: 32.99,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 32.99 },
    ],
    stocks: [
      { id: '10pt-endurace', name: '10PT EndurACE Waterproof Polymer', description: '100% waterproof and tear-resistant.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'matte-synthetic', name: 'Resilient Matte Synthetic Finish', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '3-4 Business Days'
  },

  // 14. Pearl Business Cards
  {
    id: 'prod-bc-pearl',
    slug: 'pearl-business-cards',
    name: 'Pearl Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Subtle shimmer of pearl fibers',
    description: 'Embedded mica crystals create a captivating pearlescent iridescent shimmer that catches light at every angle. Glamorous and unforgettable.',
    startingPrice: 36.99,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" (US Standard)', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 36.99 },
      { id: 'square-25', name: '2.5" x 2.5"', dimensions: '2.5" x 2.5"', widthInches: 2.5, heightInches: 2.5, basePrice: 44.99 },
    ],
    stocks: [
      { id: '14pt-pearl', name: '14PT Metallic Pearl Shimmer Cardstock', description: 'Embedded mica crystal sheen.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'pearl-luster', name: 'Ethereal Pearlescent Luster', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '3-4 Business Days'
  },

  // 15. Fold-over Business Cards
  {
    id: 'prod-bc-fold-over',
    slug: 'fold-over-business-cards',
    name: 'Fold-over Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'shape',
    tagline: 'Expanded information, folded to fit',
    description: 'Double the space of a standard card. Folds in half to create 4 distinct panels for loyalty stamp punch cards, appointment calendars, or mini product menus.',
    startingPrice: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'fo-4x35', name: '4" x 3.5" (Folds to 2" x 3.5" Horizontal)', dimensions: '4" x 3.5"', widthInches: 4.0, heightInches: 3.5, basePrice: 45.00 },
      { id: 'fo-2x7', name: '2" x 7" (Folds to 2" x 3.5" Vertical Tent)', dimensions: '2" x 7"', widthInches: 2.0, heightInches: 7.0, basePrice: 49.00 },
    ],
    stocks: [
      { id: '14pt-c2s', name: '14PT C2S Machine Scored', description: 'Folds without cracking.', multiplier: 1.0, popular: true },
      { id: '14pt-uncoated', name: '14PT Uncoated (Appointment Writable)', description: 'Perfect for pen notes.', multiplier: 1.1 },
    ],
    coatings: [
      { id: 'gloss-outside', name: 'Gloss UV Outside / Uncoated Inside', priceDelta: 0 },
      { id: 'matte-both', name: 'Matte Both Sides', priceDelta: 4.0 },
    ],
    sides: [
      { id: '4-4', name: 'Full Color 4 Panels (4/4)', multiplier: 1.0 },
    ],
    quantities: [100, 250, 500, 1000, 2500],
    standardTurnaround: '3-5 Business Days'
  },

  // 16. Plastic Business Cards
  {
    id: 'prod-bc-plastic',
    slug: 'plastic-business-cards',
    name: 'Plastic Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'Strong, versatile, and durable',
    description: 'Durable 20pt plastic available in Clear Transparent, Frosted Translucent, or Solid White Plastic with rounded corners.',
    startingPrice: 54.00,
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" Credit Card Size', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 54.00 },
    ],
    stocks: [
      { id: '20pt-frosted', name: '20PT Frosted Translucent Plastic', description: 'Diffused light transmission.', multiplier: 1.0, popular: true },
      { id: '20pt-clear', name: '20PT Crystal Clear Plastic', description: 'See-through plastic.', multiplier: 1.0 },
      { id: '20pt-white', name: '20PT Opaque White Plastic', description: 'Credit card rigidity.', multiplier: 0.95 },
    ],
    coatings: [
      { id: 'plastic-matte', name: 'Scratch-Resistant Plastic Finish', priceDelta: 0 },
    ],
    corners: [
      { id: 'round-1-8', name: '1/8" Credit Card Rounded Corners', price: 0 },
      { id: 'round-1-4', name: '1/4" Rounded Corners', price: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4 - Solid White only)', multiplier: 1.3 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '4-6 Business Days'
  },

  // 17. Magnet Business Cards
  {
    id: 'prod-bc-magnet',
    slug: 'magnet-business-cards',
    name: 'Magnet Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'premium',
    tagline: 'The perfect promotional reminder',
    description: 'Heavy 17pt magnetic material with full magnetic backing. Sticks firmly to fridges, filing cabinets, and metal doors so your number is always on display.',
    startingPrice: 38.00,
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'std-2x35', name: '2" x 3.5" Fridge Magnet', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 38.00 },
    ],
    stocks: [
      { id: '17pt-magnet', name: '17PT Full Magnetic Material', description: 'Magnetic backing across the entire card.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'gloss-uv-magnet', name: 'High-Gloss UV Protective Coating', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Face Full Color (4/0)', multiplier: 1.0 },
    ],
    quantities: [50, 100, 250, 500, 1000],
    standardTurnaround: '3-4 Business Days'
  },

  // 18. Leaf Business Cards
  {
    id: 'prod-bc-leaf',
    slug: 'leaf-business-cards',
    name: 'Leaf Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'shape',
    tagline: 'Rounded on opposite corners only',
    description: 'A distinctive organic silhouette featuring two diagonally opposite rounded corners and two sharp corners, mimicking an elegant botanical leaf.',
    startingPrice: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'leaf-2x35', name: '2" x 3.5" Die-Cut Leaf Shape', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 35.00 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16PT Heavyweight C2S', description: 'Precision die-cut leaf contour.', multiplier: 1.0, popular: true },
      { id: '18pt-suede', name: '18PT Suede Velvet', description: 'Tactile leaf texture.', multiplier: 1.25 },
    ],
    coatings: [
      { id: 'gloss-uv', name: 'High Gloss UV Coating', priceDelta: 0 },
      { id: 'matte-dull', name: 'Dull Matte Finish', priceDelta: 2.0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '3-5 Business Days'
  },

  // 19. Oval Business Cards
  {
    id: 'prod-bc-oval',
    slug: 'oval-business-cards',
    name: 'Oval Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'shape',
    tagline: 'A subtle, distinctive shape',
    description: 'Smooth precision die-cut oval shape that breaks free from conventional rectangular bounds. Highly memorable and delightful in hand.',
    startingPrice: 36.00,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'oval-2x35', name: '2" x 3.5" Precision Oval', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 36.00 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16PT Die-Cut Cardstock', description: 'Smooth oval cut.', multiplier: 1.0, popular: true },
    ],
    coatings: [
      { id: 'gloss-uv', name: 'High Gloss UV Coating', priceDelta: 0 },
      { id: 'matte-dull', name: 'Matte Finish', priceDelta: 2.0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '3-5 Business Days'
  },

  // 20. Circle Business Cards
  {
    id: 'prod-bc-circle',
    slug: 'circle-business-cards',
    name: 'Circle Business Cards',
    category: 'business-cards',
    categoryName: 'Business Cards',
    subCategory: 'shape',
    tagline: 'A fun, friendly way to stand out',
    description: 'Perfect circular die-cut cards available in 2" or 2.5" diameter. Fantastic for beverage coasters, micro-breweries, DJs, boutiques, and bakeries.',
    startingPrice: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { id: 'circle-25', name: '2.5" Diameter Circle', dimensions: '2.5" Dia', widthInches: 2.5, heightInches: 2.5, basePrice: 35.00 },
      { id: 'circle-20', name: '2" Diameter Circle', dimensions: '2.0" Dia', widthInches: 2.0, heightInches: 2.0, basePrice: 32.00 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16PT Heavyweight Cardstock', description: 'Stiff round circular board.', multiplier: 1.0, popular: true },
      { id: '18pt-kraft', name: '18PT Brown Kraft Coaster Card', description: 'Artisanal round card.', multiplier: 1.2 },
    ],
    coatings: [
      { id: 'gloss-uv', name: 'High Gloss UV Coating', priceDelta: 0 },
      { id: 'matte-finish', name: 'Matte Velvet Finish', priceDelta: 3.0 },
    ],
    sides: [
      { id: '4-0', name: 'Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Front & Back (4/4)', multiplier: 1.25 },
    ],
    quantities: [100, 250, 500, 1000],
    standardTurnaround: '3-5 Business Days'
  }
];
