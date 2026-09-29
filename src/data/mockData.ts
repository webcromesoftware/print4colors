import { Product, Template, Order, QuoteRequest, CustomerUser, TurnaroundOption } from '../types/print';
import { ALL_BUSINESS_CARD_PRODUCTS } from './businessCardsData';

export const TURNAROUND_OPTIONS: TurnaroundOption[] = [
  { id: 'standard', name: 'Standard Production (2-3 Business Days)', days: '2-3 Days', rushFeePercentage: 0 },
  { id: 'rush-next-day', name: 'Next-Day Rush Production', days: '1 Day', rushFeePercentage: 0.25, badge: 'Popular' },
  { id: 'rush-same-day', name: 'Same-Day Super Rush (Order before 11AM EST)', days: 'Today', rushFeePercentage: 0.5, badge: 'Fastest' },
  { id: 'economy', name: 'Economy Production (4-5 Business Days - Save 5%)', days: '4-5 Days', rushFeePercentage: -0.05 },
];

export const PRODUCTS: Product[] = [
  // --- 20 TYPES OF BUSINESS CARDS (MATCHING 4OVER CATALOG) ---
  ...ALL_BUSINESS_CARD_PRODUCTS,

  // --- MARKETING PRODUCTS ---
  {
    id: 'prod-flyers',
    slug: 'commercial-flyers',
    name: 'Club & Commercial Flyers',
    category: 'marketing',
    categoryName: 'Marketing Products',
    tagline: 'High-impact promotional prints for events, sales & retail campaigns',
    description: 'Broadcast your message with brilliant G7 certified full-color printing on heavy 100lb Gloss Book or 16pt Cardstock. Ideal for nightlife promos, grand openings, and direct distribution.',
    startingPrice: 28.50,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'fl-4x6', name: '4" x 6" Postcard Flyer', dimensions: '4" x 6"', widthInches: 4, heightInches: 6, basePrice: 28.50 },
      { id: 'fl-5x7', name: '5" x 7" Classic Promo Flyer', dimensions: '5" x 7"', widthInches: 5, heightInches: 7, basePrice: 36.00 },
      { id: 'fl-85x11', name: '8.5" x 11" Standard Letter Sheet', dimensions: '8.5" x 11"', widthInches: 8.5, heightInches: 11, basePrice: 48.00 },
      { id: 'fl-11x17', name: '11" x 17" Tabloid Poster Flyer', dimensions: '11" x 17"', widthInches: 11, heightInches: 17, basePrice: 72.00 },
    ],
    stocks: [
      { id: '100lb-gloss-book', name: '100lb Gloss Book with Aqueous Coating', description: 'Crisp magazine weight with brilliant color pop.', multiplier: 1.0, popular: true },
      { id: '100lb-cover', name: '100lb Gloss Cover Cardstock', description: 'Substantial medium cardstock with high stiffness.', multiplier: 1.2 },
      { id: '16pt-cardstock', name: '16pt Ultra-Heavyweight Cardstock', description: 'Indestructible club-grade flyer that won\'t wrinkle in pockets.', multiplier: 1.45 },
      { id: '70lb-uncoated', name: '70lb Uncoated Opaque Text', description: 'Smooth matte finish for easy writing and pen notation.', multiplier: 0.95 },
    ],
    coatings: [
      { id: 'aqueous', name: 'Standard Semi-Gloss Aqueous', priceDelta: 0 },
      { id: 'high-gloss-uv', name: 'Mirror High-Gloss UV Coating', priceDelta: 8.0 },
      { id: 'satin-matte', name: 'Satin Dull Matte', priceDelta: 6.0 },
    ],
    sides: [
      { id: '4-0', name: 'Full Color Front Only (4/0)', multiplier: 1.0 },
      { id: '4-4', name: 'Full Color Both Sides (4/4)', multiplier: 1.35 },
    ],
    quantities: [250, 500, 1000, 2500, 5000, 10000],
    standardTurnaround: '1-2 Business Days',
  },
  {
    id: 'prod-brochures',
    slug: 'custom-brochures',
    name: 'Custom Folded Brochures',
    category: 'marketing',
    categoryName: 'Marketing Products',
    tagline: 'Professional multi-panel sales collateral with precision folding',
    description: 'Tell your company story or present complete service menus with machine-scored, crisp folded brochures. Choose Tri-Fold, Z-Fold, or Half-Fold configurations.',
    startingPrice: 54.00,
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'br-85x11', name: '8.5" x 11" (Standard 6-Panel)', dimensions: '8.5" x 11"', widthInches: 8.5, heightInches: 11, basePrice: 54.00 },
      { id: 'br-85x14', name: '8.5" x 14" (Legal 6-Panel)', dimensions: '8.5" x 14"', widthInches: 8.5, heightInches: 14, basePrice: 68.00 },
      { id: 'br-11x17', name: '11" x 17" (Tabloid 4-Panel / 8-Panel)', dimensions: '11" x 17"', widthInches: 11, heightInches: 17, basePrice: 89.00 },
      { id: 'br-11x25', name: '11" x 25.5" (Panoramic 8-Panel)', dimensions: '11" x 25.5"', widthInches: 11, heightInches: 25.5, basePrice: 135.00 },
    ],
    stocks: [
      { id: '100lb-gloss-book', name: '100lb Gloss Book (Standard)', description: 'Pliable, fold-friendly gloss paper that will not crack on folds.', multiplier: 1.0, popular: true },
      { id: '100lb-gloss-cover', name: '100lb Gloss Cover (Heavyweight Scored)', description: 'Sturdier presentation feel, scored prior to machine folding.', multiplier: 1.35 },
      { id: '70lb-matte-text', name: '70lb Uncoated Opaque Text', description: 'Sophisticated uncoated texture with no surface reflections.', multiplier: 1.05 },
    ],
    coatings: [
      { id: 'aqueous', name: 'Aqueous Protective Seal', priceDelta: 0 },
      { id: 'matte-aq', name: 'Dull Matte Aqueous', priceDelta: 6.0 },
      { id: 'uv-outside', name: 'UV Coating on Outside Panels Only', priceDelta: 14.0 },
    ],
    sides: [
      { id: '4-4', name: 'Full Color Both Sides (4/4 - Standard for Brochures)', multiplier: 1.0 },
    ],
    folding: [
      { id: 'tri-fold', name: 'Tri-Fold (Letter Fold - 3 Equal Panels)', price: 0 },
      { id: 'z-fold', name: 'Z-Fold (Accordion Fold - 3 Equal Panels)', price: 0 },
      { id: 'half-fold', name: 'Half-Fold (Single Crease - 4 Pages)', price: 0 },
      { id: 'gate-fold', name: 'Gate Fold (2 Outer Panels Meet in Center)', price: 18.0 },
    ],
    quantities: [250, 500, 1000, 2500, 5000],
    standardTurnaround: '2-3 Business Days',
  },
  {
    id: 'prod-postcards',
    slug: 'direct-mail-postcards',
    name: 'Direct Mail & EDDM Postcards',
    category: 'marketing',
    categoryName: 'Marketing Products',
    tagline: 'USPS compliant sizes for Every Door Direct Mail & retail handouts',
    description: 'Certified USPS mailing dimensions including 6.5" x 9" EDDM approved format. Built with durable 16pt cardstock to withstand postal automated sorting equipment without damage.',
    startingPrice: 32.00,
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    popular: false,
    featured: false,
    sizes: [
      { id: 'pc-4x6', name: '4" x 6" Standard Postcard', dimensions: '4" x 6"', widthInches: 4, heightInches: 6, basePrice: 32.00 },
      { id: 'pc-5x7', name: '5" x 7" Classic Announcement Card', dimensions: '5" x 7"', widthInches: 5, heightInches: 7, basePrice: 42.00 },
      { id: 'pc-6x9', name: '6" x 9" Jumbo Direct Mail', dimensions: '6" x 9"', widthInches: 6, heightInches: 9, basePrice: 58.00 },
      { id: 'pc-eddm-65x9', name: '6.5" x 9" Official EDDM Size (USPS Retail Approved)', dimensions: '6.5" x 9"', widthInches: 6.5, heightInches: 9, basePrice: 64.00 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16pt Heavyweight Dull/Gloss Cover', description: 'Postal compliant thickness that prevents bending.', multiplier: 1.0, popular: true },
      { id: '14pt-c2s', name: '14pt Postal Cardstock', description: 'Economical option for mass-volume distribution.', multiplier: 0.88 },
      { id: '18pt-c1s', name: '18pt C1S (Gloss Front / Uncoated Back for Inkjet Addressing)', description: 'Ideal when you need to run cards through address printers.', multiplier: 1.25 },
    ],
    coatings: [
      { id: 'uv-front', name: 'UV Gloss Front / No Coating Back (Mailable)', priceDelta: 0 },
      { id: 'uv-both', name: 'UV Gloss Both Sides', priceDelta: 5.0 },
      { id: 'matte-both', name: 'Matte/Dull Both Sides', priceDelta: 4.0 },
    ],
    sides: [
      { id: '4-4', name: 'Full Color Both Sides (4/4)', multiplier: 1.25 },
      { id: '4-1', name: 'Color Front / Black Addressing Back (4/1)', multiplier: 1.1 },
    ],
    quantities: [250, 500, 1000, 2500, 5000, 10000],
    standardTurnaround: '2-3 Business Days',
  },
  {
    id: 'prod-door-hangers',
    slug: 'custom-door-hangers',
    name: 'Die-Cut Door Hangers',
    category: 'marketing',
    categoryName: 'Marketing Products',
    tagline: 'Neighborhood canvassing with 1.25" round die-cut doorknob holes',
    description: 'Precision die-cut with a 1.25" circle and side slit to easily slip onto residential doorknobs. Optional bottom tear-off perforated business card coupon.',
    startingPrice: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    popular: false,
    featured: false,
    sizes: [
      { id: 'dh-35x85', name: '3.5" x 8.5" Standard Hanger', dimensions: '3.5" x 8.5"', widthInches: 3.5, heightInches: 8.5, basePrice: 45.00 },
      { id: 'dh-425x11', name: '4.25" x 11" Jumbo Hanger', dimensions: '4.25" x 11"', widthInches: 4.25, heightInches: 11, basePrice: 59.00 },
      { id: 'dh-perf-35x11', name: '3.5" x 11" with 2" Perforated Coupon Tear-off', dimensions: '3.5" x 11"', widthInches: 3.5, heightInches: 11, basePrice: 69.00 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16pt Heavy Cover (Weather-Tolerant)', description: 'Sturdy stock that hangs straight without sagging.', multiplier: 1.0, popular: true },
      { id: '100lb-gloss-cover', name: '100lb Gloss Cover', description: 'Economical alternative for high-volume canvassing.', multiplier: 0.85 },
    ],
    coatings: [
      { id: 'gloss-uv', name: 'UV Gloss Both Sides', priceDelta: 0 },
      { id: 'matte-dull', name: 'Matte Finish Both Sides', priceDelta: 5.0 },
    ],
    sides: [
      { id: '4-4', name: 'Full Color Both Sides (4/4)', multiplier: 1.0 },
      { id: '4-0', name: 'Full Color Front Only (4/0)', multiplier: 0.85 },
    ],
    quantities: [250, 500, 1000, 2500, 5000],
    standardTurnaround: '3-4 Business Days',
  },
  {
    id: 'prod-booklets',
    slug: 'saddle-stitched-booklets',
    name: 'Saddle-Stitched Booklets & Catalogs',
    category: 'marketing',
    categoryName: 'Marketing Products',
    tagline: 'Multi-page product catalogs, annual reports & event programs',
    description: 'Bound with two heavy-duty industrial wire staples along the spine. Clean face-trim for sharp flat pages. Available in 8 to 48 page counts.',
    startingPrice: 115.00,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    popular: false,
    featured: false,
    sizes: [
      { id: 'bk-85x11', name: '8.5" x 11" Portrait Catalog', dimensions: '8.5" x 11"', widthInches: 8.5, heightInches: 11, basePrice: 115.00 },
      { id: 'bk-55x85', name: '5.5" x 8.5" Digest Booklet', dimensions: '5.5" x 8.5"', widthInches: 5.5, heightInches: 8.5, basePrice: 89.00 },
    ],
    stocks: [
      { id: '100lb-self-cover', name: '100lb Gloss Book Throughout (Self-Cover)', description: 'Uniform high-gloss look from cover to cover.', multiplier: 1.0, popular: true },
      { id: '100lb-cover-plus-text', name: '100lb Gloss Cover + 80lb Gloss Text Inside', description: 'Stiff protective cover with lighter readable interior pages.', multiplier: 1.3 },
    ],
    coatings: [
      { id: 'aqueous', name: 'All-over Aqueous Protection', priceDelta: 0 },
      { id: 'uv-cover', name: 'High-Gloss UV on Outer Covers', priceDelta: 25.0 },
    ],
    sides: [
      { id: '4-4', name: 'Full Color Throughout (4/4)', multiplier: 1.0 },
    ],
    quantities: [50, 100, 250, 500, 1000],
    standardTurnaround: '4-5 Business Days',
  },
  {
    id: 'prod-rack-cards',
    slug: 'promotional-rack-cards',
    name: 'Promotional Rack Cards (4" x 9")',
    category: 'marketing',
    categoryName: 'Marketing Products',
    tagline: 'Tourist kiosk displays, hotel lobbies & trade show handouts',
    description: 'Designed to fit standard retail display racks. High color saturation on heavy 16pt cardstock ensures your promo stands out in crowded displays.',
    startingPrice: 34.00,
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
    popular: false,
    featured: false,
    sizes: [
      { id: 'rc-4x9', name: '4" x 9" Standard Rack Card', dimensions: '4" x 9"', widthInches: 4, heightInches: 9, basePrice: 34.00 },
    ],
    stocks: [
      { id: '16pt-c2s', name: '16pt Heavy Cover Cardstock', description: 'Resists curling when standing in hotel display slots.', multiplier: 1.0, popular: true },
      { id: '14pt-c2s', name: '14pt Value Stock', description: 'Cost-effective for high turn rates.', multiplier: 0.9 },
    ],
    coatings: [
      { id: 'gloss-uv', name: 'Gloss UV Both Sides', priceDelta: 0 },
      { id: 'matte-dull', name: 'Matte Finish Both Sides', priceDelta: 4.0 },
    ],
    sides: [
      { id: '4-4', name: 'Full Color Both Sides (4/4)', multiplier: 1.0 },
      { id: '4-0', name: 'Full Color Front Only (4/0)', multiplier: 0.8 },
    ],
    quantities: [250, 500, 1000, 2500, 5000],
    standardTurnaround: '2-3 Business Days',
  },

  // --- SIGNS & BANNERS ---
  {
    id: 'prod-vinyl-banners',
    slug: 'outdoor-vinyl-banners',
    name: 'Heavy-Duty Outdoor Vinyl Banners',
    category: 'signs-banners',
    categoryName: 'Signs & Banners',
    tagline: 'Waterproof, tear-resistant 13oz matte vinyl with welded hems & grommets',
    description: 'Commercial wide-format outdoor banners printed with UV-cured inks rated for 3-5 years outdoor durability. Includes heat-welded hemmed edges and brass grommets every 2 feet at no extra charge.',
    startingPrice: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'vb-2x4', name: '2 ft x 4 ft (Small Event)', dimensions: '2\' x 4\'', widthInches: 48, heightInches: 24, basePrice: 35.00 },
      { id: 'vb-3x6', name: '3 ft x 6 ft (Standard Business)', dimensions: '3\' x 6\'', widthInches: 72, heightInches: 36, basePrice: 58.00 },
      { id: 'vb-4x8', name: '4 ft x 8 ft (Jumbo Storefront)', dimensions: '4\' x 8\'', widthInches: 96, heightInches: 48, basePrice: 89.00 },
      { id: 'vb-5x10', name: '5 ft x 10 ft (Highway / Arena)', dimensions: '5\' x 10\'', widthInches: 120, heightInches: 60, basePrice: 139.00 },
    ],
    stocks: [
      { id: '13oz-scrim', name: '13oz Heavyweight Scrim Matte Vinyl', description: 'Industry standard for wind resistance and color vibrancy.', multiplier: 1.0, popular: true },
      { id: '18oz-blockout', name: '18oz Heavy Blockout Opaque Vinyl', description: 'Zero light bleed-through, ideal for double-sided hanging or harsh sun.', multiplier: 1.4 },
      { id: 'mesh-9oz', name: '9oz Breathable Mesh Vinyl (Windy Areas)', description: 'Micro-perforations let wind pass through without tearing fences.', multiplier: 1.25 },
    ],
    coatings: [
      { id: 'hems-grommets', name: 'Welded Hems + Brass Grommets (Every 2ft)', priceDelta: 0, description: 'Reinforced edges ready for zip ties or rope.' },
      { id: 'pole-pockets-top-bot', name: '3" Pole Pockets Top & Bottom', priceDelta: 18.0 },
      { id: 'clean-cut', name: 'Flush Cut (No Hems, No Grommets)', priceDelta: -5.0 },
    ],
    sides: [
      { id: 'single-sided', name: 'Single-Sided Print (4/0)', multiplier: 1.0 },
      { id: 'double-sided', name: 'Double-Sided Blockout (4/4)', multiplier: 1.7 },
    ],
    quantities: [1, 2, 3, 5, 10, 25],
    standardTurnaround: '1-2 Business Days',
  },
  {
    id: 'prod-yard-signs',
    slug: 'corrugated-yard-signs',
    name: 'Coroplast Yard Signs (with H-Stakes)',
    category: 'signs-banners',
    categoryName: 'Signs & Banners',
    tagline: 'Waterproof 4mm fluted plastic for real estate, contractors & campaigns',
    description: 'Direct UV flatbed printing on weatherproof 4mm Coroplast. Flutes run vertically so standard galvanized steel H-wire step stakes slide directly in for effortless lawn installation.',
    startingPrice: 22.00,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'ys-18x24', name: '18" x 24" (Most Popular Yard Size)', dimensions: '18" x 24"', widthInches: 24, heightInches: 18, basePrice: 22.00 },
      { id: 'ys-12x18', name: '12" x 18" (Directional Sign)', dimensions: '12" x 18"', widthInches: 18, heightInches: 12, basePrice: 16.00 },
      { id: 'ys-24x36', name: '24" x 36" (Large Real Estate Commercial)', dimensions: '24" x 36"', widthInches: 36, heightInches: 24, basePrice: 38.00 },
    ],
    stocks: [
      { id: '4mm-white-coroplast', name: '4mm All-Weather White Coroplast', description: 'Rigid fluted polypropylene, 100% waterproof and UV fade proof.', multiplier: 1.0, popular: true },
      { id: '10mm-heavy-coroplast', name: '10mm Heavy-Duty Coroplast', description: 'Extra thick industrial board for high winds and long-term jobsites.', multiplier: 1.6 },
    ],
    coatings: [
      { id: 'with-h-stakes', name: 'Includes Standard 10" x 30" Wire H-Stakes', priceDelta: 2.50, description: 'Durable 9-gauge steel ground stakes.' },
      { id: 'sign-only', name: 'Sign Only (No Stakes)', priceDelta: 0 },
      { id: 'grommets-corners', name: 'Add 4 Metal Grommets in Corners', priceDelta: 4.0 },
    ],
    sides: [
      { id: 'double-sided', name: 'Double-Sided Print (4/4 - Readable Both Ways)', multiplier: 1.4 },
      { id: 'single-sided', name: 'Single-Sided Print (4/0)', multiplier: 1.0 },
    ],
    quantities: [1, 5, 10, 25, 50, 100, 250],
    standardTurnaround: '1-2 Business Days',
  },
  {
    id: 'prod-vinyl-decals',
    slug: 'vinyl-decals-graphics',
    name: 'Window & Vehicle Vinyl Graphics',
    category: 'signs-banners',
    categoryName: 'Signs & Banners',
    tagline: 'Removable or permanent adhesive decals for storefronts & fleets',
    description: 'Vibrant opaque adhesive vinyl prints with optional UV clear laminate shield against sun bleaching, car washes, and rain.',
    startingPrice: 29.00,
    imageUrl: 'https://images.unsplash.com/photo-1572945753563-8049567831f4?auto=format&fit=crop&w=800&q=80',
    popular: false,
    featured: false,
    sizes: [
      { id: 'vd-12x12', name: '12" x 12" Square / Contour', dimensions: '12" x 12"', widthInches: 12, heightInches: 12, basePrice: 29.00 },
      { id: 'vd-24x36', name: '24" x 36" Storefront Graphic', dimensions: '24" x 36"', widthInches: 24, heightInches: 36, basePrice: 65.00 },
      { id: 'vd-36x48', name: '36" x 48" Large Window Display', dimensions: '36" x 48"', widthInches: 36, heightInches: 48, basePrice: 98.00 },
    ],
    stocks: [
      { id: 'opaque-white-vinyl', name: 'Opaque White Adhesive Vinyl (Air-Release)', description: 'Bubble-free application adhesive for smooth installation.', multiplier: 1.0, popular: true },
      { id: 'clear-window-cling', name: 'Static Cling (No Adhesive Residue)', description: 'Easily peel and re-apply to glass storefronts anytime.', multiplier: 1.15 },
      { id: 'perforated-window', name: 'One-Way Vision Perforated Film (60/40)', description: 'See out from inside while displaying full graphics outside.', multiplier: 1.35 },
    ],
    coatings: [
      { id: 'uv-gloss-laminate', name: 'Heavy UV Gloss Overlaminate', priceDelta: 6.0 },
      { id: 'matte-laminate', name: 'Matte Anti-Glare Overlaminate', priceDelta: 6.0 },
      { id: 'unlaminated', name: 'Standard Unlaminated Print', priceDelta: 0 },
    ],
    sides: [
      { id: '4-0', name: 'Single-Sided Adhesive Face/Back', multiplier: 1.0 },
    ],
    quantities: [1, 2, 5, 10, 20],
    standardTurnaround: '2-3 Business Days',
  },
  {
    id: 'prod-stickers',
    slug: 'custom-stickers-labels',
    name: 'Custom Stickers & Roll Labels',
    category: 'marketing',
    categoryName: 'Stickers & Labels',
    tagline: 'Die-cut vinyl stickers and product labels - Good Ideas Stick',
    description: 'Thick, durable vinyl protects your stickers from scratches, water & sunlight. Available as kiss-cut singles, die-cut shapes, or continuous roll labels.',
    startingPrice: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'st-2x2', name: '2" x 2" Circle / Square', dimensions: '2" x 2"', widthInches: 2, heightInches: 2, basePrice: 19.99 },
      { id: 'st-3x3', name: '3" x 3" Custom Shape', dimensions: '3" x 3"', widthInches: 3, heightInches: 3, basePrice: 28.50 },
      { id: 'st-4x4', name: '4" x 4" Die-Cut', dimensions: '4" x 4"', widthInches: 4, heightInches: 4, basePrice: 38.00 },
    ],
    stocks: [
      { id: 'white-vinyl', name: 'Premium Weatherproof White Vinyl', description: 'UV-resistant outdoor gloss vinyl.', multiplier: 1.0, popular: true },
      { id: 'clear-vinyl', name: 'Transparent Clear Vinyl', description: 'Crystal-clear adhesive film.', multiplier: 1.2 },
      { id: 'holographic-vinyl', name: 'Rainbow Holographic Vinyl', description: 'Eye-catching shimmering metallic effect.', multiplier: 1.4 },
    ],
    coatings: [
      { id: 'glossy-uv', name: 'Gloss UV Protected (Scratch Proof)', priceDelta: 0 },
      { id: 'matte-velvet', name: 'Matte Soft-Touch Finish', priceDelta: 4.0 },
    ],
    sides: [
      { id: '4-0', name: 'Full Color Front (4/0)', multiplier: 1.0 },
    ],
    quantities: [50, 100, 250, 500, 1000],
    standardTurnaround: '2-3 Business Days',
  },
  {
    id: 'prod-posters',
    slug: 'commercial-posters',
    name: 'High-Impact Posters',
    category: 'marketing',
    categoryName: 'Posters',
    tagline: 'Dream. Create. Print. Brilliant full-bleed art & marketing prints',
    description: 'Vivid wide-gamut giclée and offset printing on heavy 100lb Gloss or Satin poster stock. Ideal for retail window displays, events, movies, and wall decor.',
    startingPrice: 18.00,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'po-11x17', name: '11" x 17" Tabloid Poster', dimensions: '11" x 17"', widthInches: 11, heightInches: 17, basePrice: 18.00 },
      { id: 'po-18x24', name: '18" x 24" Medium Display', dimensions: '18" x 24"', widthInches: 18, heightInches: 24, basePrice: 28.00 },
      { id: 'po-24x36', name: '24" x 36" Large Movie / Retail Poster', dimensions: '24" x 36"', widthInches: 24, heightInches: 36, basePrice: 42.00 },
    ],
    stocks: [
      { id: '100lb-gloss-poster', name: '100lb Gloss Poster Paper', description: 'Brilliant light-reflecting sheen.', multiplier: 1.0, popular: true },
      { id: '80lb-satin-text', name: '80lb Satin Matte Non-Glare', description: 'Museum-grade smooth finish.', multiplier: 1.15 },
    ],
    coatings: [
      { id: 'aqueous', name: 'Aqueous Protective Seal', priceDelta: 0 },
      { id: 'uv-gloss', name: 'High-Gloss UV Flood Coating', priceDelta: 6.0 },
    ],
    sides: [
      { id: '4-0', name: 'Full Color Front Only (4/0)', multiplier: 1.0 },
    ],
    quantities: [10, 25, 50, 100, 250, 500],
    standardTurnaround: '1-2 Business Days',
  },
  {
    id: 'prod-packaging',
    slug: 'custom-packaging-boxes',
    name: 'Custom Packaging & Mailer Boxes',
    category: 'marketing',
    categoryName: 'Boxes & Packaging',
    tagline: 'Unbox Great Things with full-color corrugated shipping boxes',
    description: 'Transform customer unboxing experiences with vibrant, durable corrugated mailer boxes. Printed inside and out with food-safe, fade-resistant UV cured inks.',
    startingPrice: 65.00,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    popular: true,
    featured: true,
    sizes: [
      { id: 'bx-6x6x2', name: '6" x 6" x 2" Small Goods Box', dimensions: '6" x 6" x 2"', widthInches: 6, heightInches: 6, basePrice: 65.00 },
      { id: 'bx-9x6x3', name: '9" x 6" x 3" E-Commerce Mailer', dimensions: '9" x 6" x 3"', widthInches: 9, heightInches: 6, basePrice: 85.00 },
      { id: 'bx-12x9x4', name: '12" x 9" x 4" Apparel / Retail Box', dimensions: '12" x 9" x 4"', widthInches: 12, heightInches: 9, basePrice: 115.00 },
    ],
    stocks: [
      { id: 'white-corrugated-e', name: 'Premium White E-Flute Corrugated', description: 'Stiff, lightweight, and smooth for photo-quality print.', multiplier: 1.0, popular: true },
      { id: 'kraft-corrugated-e', name: 'Eco Natural Kraft Corrugated', description: 'Organic earthy brown aesthetic.', multiplier: 0.95 },
    ],
    coatings: [
      { id: 'matte-box', name: 'Matte Touch Finish', priceDelta: 0 },
      { id: 'gloss-box', name: 'High Gloss Lamination', priceDelta: 8.0 },
    ],
    sides: [
      { id: 'outside-only', name: 'Printed Outside Only (4/0)', multiplier: 1.0 },
      { id: 'inside-outside', name: 'Printed Inside & Outside (4/4)', multiplier: 1.4 },
    ],
    quantities: [25, 50, 100, 250, 500],
    standardTurnaround: '3-5 Business Days',
  }
];

// --- 15 PRE-BUILT TEMPLATES AS REQUESTED IN DOCUMENT ---
export const TEMPLATES: Template[] = [
  // 1. Business Cards - 5 Templates
  {
    id: 'tmpl-bc-modern-corp',
    name: 'Modern Corporate',
    category: 'business-cards',
    categoryLabel: 'Business Cards',
    thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
    description: 'Clean architectural grid with deep navy authority, crisp typography and subtle cyan accent bar.',
    defaultData: {
      templateId: 'tmpl-bc-modern-corp',
      templateName: 'Modern Corporate',
      category: 'business-cards',
      businessName: 'Apex Financial Advisors',
      personName: 'Alexander Vance',
      jobTitle: 'Senior Vice President',
      phone: '(415) 890-2340',
      email: 'a.vance@apexfinancial.com',
      website: 'www.apexfinancial.com',
      address: '500 Market St, Suite 2200, San Francisco, CA',
      tagline: 'Wealth Preservation & Corporate Advisory',
      headline: 'TRUSTED CAPITAL PARTNERS',
      descriptionText: 'Comprehensive portfolio management and bespoke institutional financial strategies.',
      primaryColor: '#0f172a', // Navy
      secondaryColor: '#0284c7', // Cyan
      accentColor: '#38bdf8',
      badgeText: 'FINRA / SIPC MEMBER',
    }
  },
  {
    id: 'tmpl-bc-bold-biz',
    name: 'Bold Business',
    category: 'business-cards',
    categoryLabel: 'Business Cards',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    description: 'High-contrast typography with bold geometric color block that commands immediate attention.',
    defaultData: {
      templateId: 'tmpl-bc-bold-biz',
      templateName: 'Bold Business',
      category: 'business-cards',
      businessName: 'VORTEX TECH GROUP',
      personName: 'Elena Rostova',
      jobTitle: 'Chief Strategy Officer',
      phone: '(212) 555-0199',
      email: 'elena@vortexgroup.io',
      website: 'www.vortexgroup.io',
      address: '747 Broadway, 14th Fl, New York, NY 10003',
      tagline: 'Accelerating Digital Transformation',
      headline: 'BUILDING THE UNEXPECTED',
      descriptionText: 'Enterprise software architecture, AI cloud workflows, and next-gen digital infrastructure.',
      primaryColor: '#09090b', // Zinc black
      secondaryColor: '#e11d48', // Bold magenta-crimson
      accentColor: '#f43f5e',
      badgeText: 'SERIES B FAST50',
    }
  },
  {
    id: 'tmpl-bc-minimal-exec',
    name: 'Minimal Executive',
    category: 'business-cards',
    categoryLabel: 'Business Cards',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    description: 'Swiss-style generous whitespace, refined serif styling, and understated elegance for consultants & executives.',
    defaultData: {
      templateId: 'tmpl-bc-minimal-exec',
      templateName: 'Minimal Executive',
      category: 'business-cards',
      businessName: 'Sterling & Co. Advisory',
      personName: 'Julian H. Sterling',
      jobTitle: 'Managing Principal',
      phone: '(312) 440-9201',
      email: 'jsterling@sterlingadvisory.com',
      website: 'www.sterlingadvisory.com',
      address: '200 S Michigan Ave, Chicago, IL 60604',
      tagline: 'Discreet Strategy for Global Leaders',
      headline: 'EXCELLENCE WITHOUT COMPROMISE',
      descriptionText: 'Mergers & acquisitions, board governance, and high-stakes executive advisory.',
      primaryColor: '#1e293b',
      secondaryColor: '#64748b',
      accentColor: '#d97706', // warm gold
      badgeText: 'ESTABLISHED 1998',
    }
  },
  {
    id: 'tmpl-bc-creative-color',
    name: 'Creative Color (Print4Colors Signature)',
    category: 'business-cards',
    categoryLabel: 'Business Cards',
    thumbnail: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    description: 'Vibrant CMYK multi-color gradient brush stroke inspired directly by the Print4Colors brand identity.',
    defaultData: {
      templateId: 'tmpl-bc-creative-color',
      templateName: 'Creative Color',
      category: 'business-cards',
      businessName: 'Prism Creative Agency',
      personName: 'Maya Lin Chen',
      jobTitle: 'Creative Director',
      phone: '(512) 774-9022',
      email: 'maya@prismcreative.design',
      website: 'www.prismcreative.design',
      address: '1100 E 6th St, Austin, TX 78702',
      tagline: 'Vibrant Brands That Resonate',
      headline: 'WHERE COLOR MEETS IMPACT',
      descriptionText: 'Brand identities, commercial packaging design, and omnichannel experiential visuals.',
      primaryColor: '#0284c7', // Cyan
      secondaryColor: '#db2777', // Magenta
      accentColor: '#f59e0b', // Yellow/Orange
      badgeText: 'AWARD WINNING STUDIO',
    }
  },
  {
    id: 'tmpl-bc-prof-services',
    name: 'Professional Services',
    category: 'business-cards',
    categoryLabel: 'Business Cards',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
    description: 'Structured card layout tailored for legal, accounting, healthcare, and engineering professionals.',
    defaultData: {
      templateId: 'tmpl-bc-prof-services',
      templateName: 'Professional Services',
      category: 'business-cards',
      businessName: 'Beacon Legal Partners LLP',
      personName: 'David K. Morrison, Esq.',
      jobTitle: 'Partner - Commercial Litigation',
      phone: '(617) 502-3310',
      email: 'dmorrison@beaconlegal.com',
      website: 'www.beaconlegal.com',
      address: 'One International Place, 26th Fl, Boston, MA 02110',
      tagline: 'Fierce Advocacy. Proven Results.',
      headline: 'DEDICATED TO YOUR LEGAL SUCCESS',
      descriptionText: 'Commercial litigation, contract enforcement, and intellectual property defense.',
      primaryColor: '#042f2e', // Deep emerald
      secondaryColor: '#0d9488', // Teal
      accentColor: '#ca8a04', // Brass gold
      badgeText: 'AV PREEMINENT RATED',
    }
  },

  // 2. Flyers - 5 Templates
  {
    id: 'tmpl-flyer-grand-opening',
    name: 'Grand Opening Flyer',
    category: 'flyers',
    categoryLabel: 'Flyers',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80',
    description: 'Festive, bold celebratory flyer with ribbon header, date callout, and voucher discount badge.',
    defaultData: {
      templateId: 'tmpl-flyer-grand-opening',
      templateName: 'Grand Opening',
      category: 'flyers',
      businessName: 'VELO CRAFT COFFEE & ROASTERY',
      personName: 'Join Us for the Celebration!',
      jobTitle: 'Saturday, October 18th • 8:00 AM - 6:00 PM',
      phone: '(503) 912-3388',
      email: 'hello@velocraftcoffee.com',
      website: 'www.velocraftcoffee.com',
      address: '820 SE Division St, Portland, OR',
      tagline: 'Artisanal Single-Origin Roasts & House Pastries',
      headline: 'GRAND OPENING WEEKEND!',
      descriptionText: 'Be among the first 100 visitors and enjoy a complimentary brew plus exclusive gift tote bags, live acoustic music, and latte art demonstrations.',
      bullet1: '★ First 100 Guests Receive FREE Signature Latte Mug',
      bullet2: '★ 25% Off All Whole-Bean Bags All Weekend',
      bullet3: '★ Live Music & Artisan Pastry Samples from 11AM - 2PM',
      primaryColor: '#78350f', // Warm roast brown
      secondaryColor: '#ea580c', // Orange flame
      accentColor: '#fbbf24',
      badgeText: 'FREE ENTRY & SAMPLES',
    }
  },
  {
    id: 'tmpl-flyer-restaurant-special',
    name: 'Restaurant Special & Menu Promo',
    category: 'flyers',
    categoryLabel: 'Flyers',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    description: 'Mouth-watering dining flyer highlighting chef specials, lunch combos, and happy hour discounts.',
    defaultData: {
      templateId: 'tmpl-flyer-restaurant-special',
      templateName: 'Restaurant Special',
      category: 'flyers',
      businessName: 'Trattoria Bella Napoli',
      personName: 'Chef Vincenzo Bellini',
      jobTitle: 'Authentic Wood-Fired Italian Cuisine',
      phone: '(305) 441-8922',
      email: 'reservations@bellanapoli-miami.com',
      website: 'www.bellanapoli-miami.com',
      address: '1420 Ocean Drive, Miami Beach, FL',
      tagline: 'Hand-Rolled Pasta & Neapolitan Pizzas Daily',
      headline: 'CHEF\'S TASTING MENU - 3 COURSES $39',
      descriptionText: 'Experience authentic southern Italian gastronomy made with imported San Marzano tomatoes, fresh buffalo mozzarella, and homemade limoncello.',
      bullet1: 'Course 1: Burrata Pugliese with Heirloom Tomatoes',
      bullet2: 'Course 2: House Truffle Tagliolini or Branzino al Forno',
      bullet3: 'Course 3: Classic Espresso Tiramisu with Amaretto',
      primaryColor: '#991b1b', // Italian deep red
      secondaryColor: '#15803d', // Basil green
      accentColor: '#eab308',
      badgeText: 'RESERVE NOW • LIMITED SEATS',
    }
  },
  {
    id: 'tmpl-flyer-real-estate',
    name: 'Real Estate Showcase Flyer',
    category: 'flyers',
    categoryLabel: 'Flyers',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    description: 'Luxury property listing flyer with room specifications, open house schedule, and broker contact block.',
    defaultData: {
      templateId: 'tmpl-flyer-real-estate',
      templateName: 'Real Estate Showcase',
      category: 'flyers',
      businessName: 'Sotheby\'s Premier Realty Group',
      personName: 'Charlotte Montgomery',
      jobTitle: 'Luxury Property Specialist • Lic. #0192847',
      phone: '(480) 555-9830',
      email: 'charlotte@montgomeryluxury.com',
      website: 'www.montgomeryluxury.com',
      address: '7400 E Pinnacle Peak Rd, Scottsdale, AZ',
      tagline: 'JUST LISTED • 4 BED | 4.5 BATH | 4,850 SQ FT',
      headline: 'LUXURY DESERT OASIS RETREAT',
      descriptionText: 'Architectural masterpiece boasting unobstructed mountain panoramas, zero-edge heated infinity pool, smart home automation, and chef\'s Gaggenau kitchen.',
      bullet1: 'Open House: Saturday & Sunday 1:00 PM - 4:00 PM',
      bullet2: 'Private Guard-Gated Community with Championship Golf Access',
      bullet3: 'Offered at $2,495,000 — Private Tours by Appointment',
      primaryColor: '#0f172a',
      secondaryColor: '#0284c7',
      accentColor: '#d97706',
      badgeText: 'EXCLUSIVE LISTING',
    }
  },
  {
    id: 'tmpl-flyer-biz-promo',
    name: 'Business Promotion & Sale Flyer',
    category: 'flyers',
    categoryLabel: 'Flyers',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80',
    description: 'High conversion retail sale and seasonal promo flyer with discount badges and clear call-to-action.',
    defaultData: {
      templateId: 'tmpl-flyer-biz-promo',
      templateName: 'Business Promotion',
      category: 'flyers',
      businessName: 'APEX PRO AUTO CARE & PERFORMANCE',
      personName: 'Fall Vehicle Maintenance Specials',
      jobTitle: 'ASE Master Certified Technicians',
      phone: '(702) 880-9944',
      email: 'service@apexproautocare.com',
      website: 'www.apexproautocare.com',
      address: '4250 W Flamingo Rd, Las Vegas, NV',
      tagline: 'Precision Diagnostics • Factory Scheduled Service',
      headline: 'SAVE UP TO $150 THIS MONTH ONLY!',
      descriptionText: 'Prepare your vehicle for seasonal driving with our comprehensive 40-point safety inspection and computerized fluid flush service.',
      bullet1: '$39.99 Full Synthetic Oil Change & Filter (Up to 5 qts)',
      bullet2: 'Free Brake Inspection with any Tire Rotation Package',
      bullet3: '15% Off All Suspension, Shocks & Alignment Services',
      primaryColor: '#111827',
      secondaryColor: '#dc2626',
      accentColor: '#facc15',
      badgeText: 'COUPON CODE: FALLSAVE',
    }
  },
  {
    id: 'tmpl-flyer-event',
    name: 'Event & Conference Flyer',
    category: 'flyers',
    categoryLabel: 'Flyers',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
    description: 'Dynamic festival or conference promotional flyer with lineup schedule, keynote speakers and ticket link.',
    defaultData: {
      templateId: 'tmpl-flyer-event',
      templateName: 'Event & Conference',
      category: 'flyers',
      businessName: 'NEXTERA TECH SUMMIT 2026',
      personName: 'November 12-14, 2026 • Seattle Convention Center',
      jobTitle: 'Keynotes • AI Hackathons • Investor Expo',
      phone: '(206) 400-8812',
      email: 'tickets@nexterasummit.com',
      website: 'www.nexterasummit.com',
      address: '705 Pike St, Seattle, WA 98101',
      tagline: 'Shaping the Future of Generative Technologies',
      headline: '3 DAYS. 50+ SPEAKERS. 2,000 ATTENDEES.',
      descriptionText: 'Join pioneering founders, venture capitalists, and AI engineers for three days of breakthrough tech presentations and networking sessions.',
      bullet1: 'Day 1: Autonomous Systems & Cloud Architecture Keynotes',
      bullet2: 'Day 2: $100K Seed Pitch Competition & VIP Networking Dinner',
      bullet3: 'Day 3: Hands-on Developer Labs & Career Accelerator Expo',
      primaryColor: '#312e81', // Indigo deep
      secondaryColor: '#9333ea', // Electric purple
      accentColor: '#06b6d4', // Cyan
      badgeText: 'EARLY BIRD PASSES OPEN',
    }
  },

  // 3. Brochures - 5 Templates
  {
    id: 'tmpl-br-corp-services',
    name: 'Corporate Services Brochure',
    category: 'brochures',
    categoryLabel: 'Brochures',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80',
    description: 'Tri-fold tri-panel corporate profile detailing company mission, core competencies, and team expertise.',
    defaultData: {
      templateId: 'tmpl-br-corp-services',
      templateName: 'Corporate Services',
      category: 'brochures',
      businessName: 'OmniGlobal Consulting Group',
      personName: 'Strategic Management & Operational Excellence',
      jobTitle: 'Empowering Global Enterprises Since 2004',
      phone: '(800) 555-OMNI',
      email: 'solutions@omniglobal.com',
      website: 'www.omniglobal.com',
      address: 'Wall Street Tower, New York, NY 10005',
      tagline: 'Insight. Agility. Enduring Value.',
      headline: 'TRANSFORMING ORGANIZATIONS FOR SUSTAINABLE GROWTH',
      descriptionText: 'We partner with Fortune 500 boards to eliminate structural inefficiencies, deploy lean automation, and build resilient modern organizations.',
      bullet1: 'Supply Chain Resiliency & Global Logistics Optimization',
      bullet2: 'Private Equity Value Creation & Post-Merger Integration',
      bullet3: 'Cloud Modernization & Predictive Analytics Infrastructure',
      primaryColor: '#0f172a',
      secondaryColor: '#0369a1',
      accentColor: '#38bdf8',
      badgeText: 'GLOBAL REACH • LOCAL EXPERTISE',
    }
  },
  {
    id: 'tmpl-br-real-estate',
    name: 'Real Estate Development Brochure',
    category: 'brochures',
    categoryLabel: 'Brochures',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    description: 'Architectural portfolio brochure with floor plans, amenity maps, and community lifestyle highlights.',
    defaultData: {
      templateId: 'tmpl-br-real-estate',
      templateName: 'Real Estate Development',
      category: 'brochures',
      businessName: 'The Lumina Waterfront Residences',
      personName: 'Urban Luxury Redefined',
      jobTitle: 'Now Pre-Selling 1, 2 & 3 Bedroom Condominiums',
      phone: '(305) 555-LUMI',
      email: 'sales@luminawaterfront.com',
      website: 'www.luminawaterfront.com',
      address: '250 Biscayne Blvd, Miami, FL 33131',
      tagline: 'Private Marina • Rooftop Helipad • 5-Star Concierge',
      headline: 'ELEVATE YOUR EVERYDAY LIVING EXPERIENCE',
      descriptionText: 'Surrounded by shimmering bay vistas, Lumina blends bold architectural contours with museum-quality interior appointments and curated resident amenities.',
      bullet1: 'Floor-to-Ceiling 12ft Hurricane Impact Glass Walls',
      bullet2: 'Sub-Zero & Wolf Integrated Appliance Suites in Every Home',
      bullet3: 'Private 50-Foot Yacht Slips & Electric Hydrofoil Charging',
      primaryColor: '#1e293b',
      secondaryColor: '#059669',
      accentColor: '#fbbf24',
      badgeText: 'OCCUPANCY Q4 2027',
    }
  },
  {
    id: 'tmpl-br-restaurant-menu',
    name: 'Restaurant & Catering Menu Brochure',
    category: 'brochures',
    categoryLabel: 'Brochures',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    description: 'Tri-panel layout specifically laid out for appetizers, chef entrees, desserts, and catering packages.',
    defaultData: {
      templateId: 'tmpl-br-restaurant-menu',
      templateName: 'Restaurant & Catering Menu',
      category: 'brochures',
      businessName: 'Cask & Oak Smokehouse & Bar',
      personName: 'Slow-Smoked Texas BBQ & Craft Cocktails',
      jobTitle: 'Full-Service Corporate & Wedding Catering Available',
      phone: '(512) 555-CASK',
      email: 'catering@caskandoakbbq.com',
      website: 'www.caskandoakbbq.com',
      address: '610 Red River St, Austin, TX 78701',
      tagline: '16-Hour Post Oak Smoked Brisket & Heritage Ribs',
      headline: 'HONORING TIME-TESTED SMOKEHOUSE TRADITIONS',
      descriptionText: 'Our pits burn around the clock using seasoned post oak wood. Every brisket is seasoned simply with coarse black pepper and kosher salt, then smoked to tender perfection.',
      bullet1: 'USDA Prime Brisket, Pork Ribs, Pulled Heritage Pork & Sausage',
      bullet2: 'Scratch-Made Jalapeño Cream Corn & Smoked Gouda Mac',
      bullet3: 'Mobile Smoker Catering for Groups from 50 to 2,000 Guests',
      primaryColor: '#451a03',
      secondaryColor: '#b45309',
      accentColor: '#f59e0b',
      badgeText: 'VOTED BEST BBQ IN AUSTIN',
    }
  },
  {
    id: 'tmpl-br-travel-tourism',
    name: 'Travel & Tourism Destination Brochure',
    category: 'brochures',
    categoryLabel: 'Brochures',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Vivid scenic photo panels with excursion itineraries, booking packages, and seasonal travel guides.',
    defaultData: {
      templateId: 'tmpl-br-travel-tourism',
      templateName: 'Travel & Tourism',
      category: 'brochures',
      businessName: 'Wilderness Crest Expeditions',
      personName: 'Guided Alaskan Backcountry & Glacier Tours',
      jobTitle: 'Certified Naturalists • Small Group Charters',
      phone: '(907) 555-WILD',
      email: 'adventures@wildernesscrest.com',
      website: 'www.wildernesscrest.com',
      address: '300 Harbor Way, Seward, AK 99664',
      tagline: 'Where Untamed Nature Greets the Ocean',
      headline: 'DISCOVER THE MAJESTIC GLACIERS OF KENAI FJORDS',
      descriptionText: 'Navigate through crystal blue icebergs, witness humpback whale breeches, and kayak beneath towering glacier walls with our master expedition guides.',
      bullet1: '7-Day All-Inclusive Wildlife Safari & Luxury Eco-Lodge Stays',
      bullet2: 'Helicopter Glacier Landings & Guided Ice Cave Traversals',
      bullet3: 'All Cold-Weather Technical Gear & Gourmet Meals Provided',
      primaryColor: '#0c4a6e', // Deep glacial blue
      secondaryColor: '#0284c7',
      accentColor: '#38bdf8',
      badgeText: 'NATIONAL GEOGRAPHIC TOP PICK',
    }
  },
  {
    id: 'tmpl-br-construction',
    name: 'Construction & Contractor Brochure',
    category: 'brochures',
    categoryLabel: 'Brochures',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    description: 'Rugged, dependable contractor brochure covering commercial builds, residential remodeling, and licensing.',
    defaultData: {
      templateId: 'tmpl-br-construction',
      templateName: 'Construction & Contractor',
      category: 'brochures',
      businessName: 'Vanguard Builders & Commercial Contractors',
      personName: 'Licensed General Contractor • Lic. #GC-88402',
      jobTitle: 'Design-Build • Commercial Tenant Improvements • Custom Homes',
      phone: '(720) 555-BLDR',
      email: 'estimates@vanguardbuilders.com',
      website: 'www.vanguardbuilders.com',
      address: '1800 Larimer St, Denver, CO 80202',
      tagline: 'Building Denver\'s Landmarks with Uncompromising Integrity',
      headline: 'PRECISION CRAFTSMANSHIP. ON-TIME. ON-BUDGET.',
      descriptionText: 'Over 25 years of structural construction mastery. From LEED certified commercial offices to high-end custom mountain residences, we bring blueprints to life safely.',
      bullet1: 'Pre-Construction Feasibility Studies & 3D BIM Modeling',
      bullet2: 'Comprehensive Project Management with Daily Owner Updates',
      bullet3: 'Fully Bonded, $5M Insured & OSHA Compliant Operations',
      primaryColor: '#18181b', // Industrial dark
      secondaryColor: '#ea580c', // Safety orange
      accentColor: '#eab308',
      badgeText: 'A+ BBB ACCREDITED',
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'P4C-98421',
    createdAt: '2026-09-26T14:30:00Z',
    customer: {
      name: 'Jessica Reynolds',
      email: 'jessica@reynoldsdesign.com',
      phone: '(415) 555-8291',
      company: 'Reynolds Creative Co.'
    },
    shippingAddress: {
      street: '1440 Mission St, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'United States'
    },
    items: [
      {
        id: 'item-101',
        productId: 'prod-bc-standard',
        productName: 'Standard Business Cards',
        category: 'business-cards',
        imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
        size: { id: 'std-2x35', name: 'Standard (2" x 3.5")', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 19.99 },
        stock: { id: '16pt-c2s', name: '16pt Premium Heavyweight Cover', description: 'Sturdy cardstock', multiplier: 1.0 },
        coating: { id: 'soft-touch', name: 'Soft-Touch Suede / Velvet', priceDelta: 8.5 },
        sides: { id: '4-4', name: 'Full Color Front & Back (4/4)', multiplier: 1.25 },
        corner: { id: 'round-1-4', name: '1/4" Rounded Corners', price: 7.5 },
        quantity: 500,
        turnaround: TURNAROUND_OPTIONS[1],
        unitPrice: 0.12,
        totalPrice: 62.50,
        artworkType: 'upload',
        artworkFile: {
          name: 'Reynolds_BizCards_PressReady_v2.pdf',
          size: '4.8 MB',
          url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
          previewUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
          uploadDate: '2026-09-26T14:32:00Z'
        },
        customerNotes: 'Please ensure Pantone 293C matches accurately.'
      }
    ],
    subtotal: 62.50,
    discount: 0,
    shippingFee: 0,
    shippingMethod: 'FedEx Ground (FREE on orders over $50)',
    tax: 5.47,
    total: 67.97,
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe (Visa ending in 4242)',
    paymentTransactionId: 'ch_3M9Z4l2eZvKYlo2C12vK991',
    orderStatus: 'Proof Sent',
    statusHistory: [
      { status: 'Paid', timestamp: '2026-09-26T14:35:00Z', note: 'Payment received via Stripe' },
      { status: 'Artwork Review', timestamp: '2026-09-26T15:10:00Z', note: 'Preflight check completed: 300 DPI verified' },
      { status: 'Proof Sent', timestamp: '2026-09-26T16:00:00Z', note: 'Digital proof v1 generated & notified customer' }
    ],
    proofs: [
      {
        version: 1,
        proofImageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
        createdAt: '2026-09-26T16:00:00Z',
        designerName: 'Marcus Miller (Preflight Lead)',
        designerComments: 'Bleed extended 0.125" all edges. Color converted to US Sheetfed Coated v2 (CMYK). Safe margin checked.',
        status: 'Pending Customer Approval'
      }
    ],
    estimatedDeliveryDate: '2026-09-29'
  },
  {
    id: 'P4C-98319',
    createdAt: '2026-09-25T10:15:00Z',
    customer: {
      name: 'Marcus Sterling',
      email: 'msterling@vanguardbldr.com',
      phone: '(312) 555-4920',
      company: 'Vanguard Builders'
    },
    shippingAddress: {
      street: '880 N Michigan Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60611',
      country: 'United States'
    },
    items: [
      {
        id: 'item-102',
        productId: 'prod-yard-signs',
        productName: 'Coroplast Yard Signs (with H-Stakes)',
        category: 'signs-banners',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
        size: { id: 'ys-18x24', name: '18" x 24" (Most Popular Yard Size)', dimensions: '18" x 24"', widthInches: 24, heightInches: 18, basePrice: 22.00 },
        stock: { id: '4mm-white-coroplast', name: '4mm All-Weather White Coroplast', description: 'Rigid fluted plastic', multiplier: 1.0 },
        coating: { id: 'with-h-stakes', name: 'Includes Standard 10" x 30" Wire H-Stakes', priceDelta: 2.50 },
        sides: { id: 'double-sided', name: 'Double-Sided Print (4/4)', multiplier: 1.4 },
        quantity: 25,
        turnaround: TURNAROUND_OPTIONS[0],
        unitPrice: 18.50,
        totalPrice: 462.50,
        artworkType: 'template',
        templateData: TEMPLATES[14].defaultData
      }
    ],
    subtotal: 462.50,
    discount: 46.25,
    promoCode: 'WELCOME10',
    shippingFee: 0,
    shippingMethod: 'UPS Ground Commercial',
    tax: 37.46,
    total: 453.71,
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe (Mastercard ending in 8812)',
    paymentTransactionId: 'ch_3M9Z4l2eZvKYlo2C12vK992',
    orderStatus: 'In Production',
    statusHistory: [
      { status: 'Paid', timestamp: '2026-09-25T10:20:00Z' },
      { status: 'Proof Sent', timestamp: '2026-09-25T11:00:00Z' },
      { status: 'Approved', timestamp: '2026-09-25T13:45:00Z', note: 'Customer approved Proof v1' },
      { status: 'In Production', timestamp: '2026-09-25T15:00:00Z', note: 'Routed to Flatbed UV Press Line 4' }
    ],
    proofs: [
      {
        version: 1,
        proofImageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        createdAt: '2026-09-25T11:00:00Z',
        designerName: 'Sarah Jenkins',
        designerComments: 'Coroplast vertical flutes alignment confirmed for wire stakes.',
        status: 'Approved',
        feedbackDate: '2026-09-25T13:45:00Z'
      }
    ],
    estimatedDeliveryDate: '2026-09-28'
  },
  {
    id: 'P4C-98102',
    createdAt: '2026-09-24T09:00:00Z',
    customer: {
      name: 'David Vance',
      email: 'david@austinbrewfest.org',
      phone: '(512) 555-3001',
      company: 'Austin Craft Beer Guild'
    },
    shippingAddress: {
      street: '400 Congress Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'United States'
    },
    items: [
      {
        id: 'item-103',
        productId: 'prod-vinyl-banners',
        productName: 'Heavy-Duty Outdoor Vinyl Banners',
        category: 'signs-banners',
        imageUrl: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=400&q=80',
        size: { id: 'vb-4x8', name: '4 ft x 8 ft (Jumbo Storefront)', dimensions: '4\' x 8\'', widthInches: 96, heightInches: 48, basePrice: 89.00 },
        stock: { id: '13oz-scrim', name: '13oz Heavyweight Scrim Matte Vinyl', description: 'Outdoor durability', multiplier: 1.0 },
        coating: { id: 'hems-grommets', name: 'Welded Hems + Brass Grommets (Every 2ft)', priceDelta: 0 },
        sides: { id: 'single-sided', name: 'Single-Sided Print (4/0)', multiplier: 1.0 },
        quantity: 3,
        turnaround: TURNAROUND_OPTIONS[1],
        unitPrice: 89.00,
        totalPrice: 267.00,
        artworkType: 'upload',
        artworkFile: {
          name: 'Austin_BeerFest_MainStage_Banner_4x8.pdf',
          size: '18.4 MB',
          url: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80',
          previewUrl: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80',
          uploadDate: '2026-09-24T09:05:00Z'
        }
      }
    ],
    subtotal: 267.00,
    discount: 0,
    shippingFee: 0,
    shippingMethod: 'FedEx Express Saver',
    tax: 22.03,
    total: 289.03,
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe (American Express ending in 1004)',
    paymentTransactionId: 'ch_3M9Z4l2eZvKYlo2C12vK993',
    orderStatus: 'Shipped',
    trackingNumber: '1Z9999999999999999',
    carrier: 'UPS Ground',
    statusHistory: [
      { status: 'Paid', timestamp: '2026-09-24T09:10:00Z' },
      { status: 'Approved', timestamp: '2026-09-24T10:30:00Z' },
      { status: 'In Production', timestamp: '2026-09-24T12:00:00Z' },
      { status: 'Shipped', timestamp: '2026-09-25T16:00:00Z', note: 'Package picked up by UPS carrier' }
    ],
    proofs: [
      {
        version: 1,
        proofImageUrl: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=800&q=80',
        createdAt: '2026-09-24T09:30:00Z',
        designerName: 'Marcus Miller',
        designerComments: 'Grommets marked 1" in from heat-welded hems.',
        status: 'Approved',
        feedbackDate: '2026-09-24T10:30:00Z'
      }
    ],
    estimatedDeliveryDate: '2026-09-27'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'QR-2041',
    createdAt: '2026-09-27T06:40:00Z',
    name: 'Robert Hastings',
    company: 'Apex Hospitality Group',
    email: 'robert@apexhospitality.com',
    phone: '(214) 555-7721',
    product: 'Custom Embossed Presentation Folders with 4" Pockets',
    quantity: '2,500 units',
    dimensions: '9" x 12" Folded (holds 8.5x11 sheets)',
    requirements: 'Need 16pt Silk Laminated Cover with Raised Gold Foil on Front Cover and Business Card Slits on right pocket. Required delivery in Dallas by Oct 12.',
    notes: 'Please quote 2-day ground delivery option to zip code 75201.',
    hasArtwork: true,
    artworkFileName: 'Apex_PocketFolder_DieLines.ai',
    status: 'New',
  },
  {
    id: 'QR-2038',
    createdAt: '2026-09-26T18:15:00Z',
    name: 'Melissa Hernandez',
    company: 'SunState Realty Partners',
    email: 'mhernandez@sunstaterealty.com',
    phone: '(407) 555-9014',
    product: 'Custom Die-Cut Shaped Yard Signs (House Shape)',
    quantity: '500 signs + 500 Heavy Duty H-Stakes',
    dimensions: '24" x 24" Contour Cut to Gable House Outline',
    requirements: 'Reflective vinyl layer preferred if possible, otherwise standard UV 4mm Coroplast. Double-sided 4/4 printing.',
    hasArtwork: true,
    artworkFileName: 'SunState_HouseShape_CutPath.pdf',
    status: 'Reviewing',
    adminNotes: 'Checked with CNC router team, contour cut fee is $1.20/pc. Quoted $3,450 all-in.',
    quotedAmount: 3450.00
  }
];

export const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: 'cust-1',
    name: 'Jessica Reynolds',
    email: 'jessica@reynoldsdesign.com',
    phone: '(415) 555-8291',
    company: 'Reynolds Creative Co.',
    addresses: [
      {
        id: 'addr-1',
        label: 'Design Studio (Default)',
        street: '1440 Mission St, Suite 400',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94103'
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'Marcus Sterling',
    email: 'msterling@vanguardbldr.com',
    phone: '(312) 555-4920',
    company: 'Vanguard Builders',
    addresses: [
      {
        id: 'addr-2',
        label: 'Headquarters',
        street: '880 N Michigan Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60611'
      }
    ]
  }
];
