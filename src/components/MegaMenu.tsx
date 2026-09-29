import React from 'react';
import {
  CreditCard,
  Sparkles,
  Layers,
  FileText,
  BookOpen,
  Mail,
  Flag,
  MapPin,
  Maximize2,
  Palette,
  Briefcase,
  Download,
  FileCheck,
  Package,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Phone
} from 'lucide-react';
import { Product } from '../types/print';

interface MegaMenuProps {
  activeMenu: 'cards' | 'marketing' | 'signs' | 'templates' | 'resources' | null;
  onClose: () => void;
  onSelectProductBySlug: (slug: string) => void;
  onSelectCategory: (category: string) => void;
  onNavigate: (view: 'home' | 'catalog' | 'configurator' | 'templates' | 'template-customizer') => void;
  onOpenModal: (modal: 'quote' | 'sample-kit' | 'guidelines') => void;
  products: Product[];
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeMenu,
  onClose,
  onSelectProductBySlug,
  onSelectCategory,
  onNavigate,
  onOpenModal,
  products
}) => {
  if (!activeMenu) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute left-0 right-0 top-full w-full bg-white shadow-2xl border-t border-b border-slate-200 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ========================================================= */}
        {/* 1. BUSINESS CARDS MEGA MENU */}
        {/* ========================================================= */}
        {activeMenu === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Column 1: Core Stocks (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Popular Card Stocks
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('standard-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Standard Business Cards
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                        From $19.99
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Common sizes, stocks, and finishes.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('suede-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Suede Business Cards
                      </span>
                      <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded">
                        Popular
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Scuff-resistant velvet laminate.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('silk-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Silk Business Cards
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Sensuous, soft-touch matte laminate.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('painted-edge-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Painted Edge Business Cards
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                        32PT
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Ultra-thick with bright colored sides.
                    </p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Specialty & Embellishments (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Luxury Embellishments
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('dual-raised-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-amber-50/60 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-amber-600 transition">
                        Dual Raised Business Cards
                      </span>
                      <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                        HOT
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Impressive dual finish with tactile foil and spot UV.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('raised-spot-uv-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Raised Spot UV Cards
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Elegant emphasis you can see and feel.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('raised-foil-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Raised Foil Business Cards
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Foil embossed on soft-touch laminate.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('black-edge-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Black Edge Business Cards
                      </span>
                      <span className="text-[10px] bg-slate-950 text-white font-mono px-1 rounded">
                        34PT
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                      Bright white layers on solid black core.
                    </p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Shapes & Specialty (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Shapes & Specialty
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('plastic-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Plastic Business Cards (Frosted/Clear)
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Strong, versatile, and durable 20pt.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('leaf-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Leaf & Oval Business Cards
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Distinctive die-cut curved shapes.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('circle-business-cards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Circle Business Cards
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">A fun, friendly way to stand out.</p>
                  </button>
                </li>
                <li className="pt-1">
                  <button
                    onClick={() => {
                      onSelectCategory('business-cards');
                      onNavigate('catalog');
                      onClose();
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1.5"
                  >
                    <span>View All Business Cards (20 Types) →</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Spotlight Banner Card (3 cols) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                  Flagship Product
                </span>
                <h4 className="text-base font-black text-white leading-tight">
                  Dual Raised Foil & UV Cards
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Make a lasting impression with double-sided velvet laminate and 3D tactile metallic foil.
                </p>
                <div className="text-sm font-extrabold text-amber-300 pt-1">
                  From $49.99 for 100 cards
                </div>
              </div>

              <div className="pt-4 relative z-10">
                <button
                  onClick={() => {
                    onSelectProductBySlug('dual-raised-business-cards');
                    onClose();
                  }}
                  className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Configure Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. MARKETING PRODUCTS MEGA MENU */}
        {/* ========================================================= */}
        {activeMenu === 'marketing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Column 1: Flyers & Sheets (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <FileText className="w-4 h-4 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Flyers & Handouts
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('commercial-flyers');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Club & Commercial Flyers
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                        From $28.50
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">
                      100lb Gloss Book or heavy 16pt cardstock.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('commercial-flyers');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      4" x 6" Postcard Flyers
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Popular retail promotional handout.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('commercial-flyers');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      8.5" x 11" Letter Sell Sheets
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Corporate sales sheets and price lists.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('commercial-posters');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      11" x 17" Tabloid Poster Flyers
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Full-color mini posters for store windows.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Brochures & Folded (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-rose-500" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Folded Collateral
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('custom-brochures');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Tri-Fold Brochures
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                        Top Seller
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">
                      6-panel machine-scored letter fold.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('custom-brochures');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Z-Fold & Half-Fold Formats
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Accordion and single crease presentation.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('saddle-stitch-booklets');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Saddle-Stitched Booklets
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">8 to 48 page product catalogs & magazines.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('die-cut-door-hangers');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Die-Cut Door Hangers
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Canvassing handouts with pre-cut knob hole.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Mail & Packaging (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Mail className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Direct Mail & Packaging
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('direct-mail-postcards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Official USPS EDDM (6.5" x 9")
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        USPS
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Every Door Direct Mail postal compliant.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('custom-stickers-labels');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Stickers & Roll Labels
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Weatherproof custom die-cut vinyl.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('custom-packaging-boxes');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Custom Mailer Boxes
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Corrugated e-commerce unboxing packaging.</p>
                  </button>
                </li>
                <li className="pt-1">
                  <button
                    onClick={() => {
                      onSelectCategory('marketing');
                      onNavigate('catalog');
                      onClose();
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1.5"
                  >
                    <span>View All Marketing Products →</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Spotlight Banner Card (3 cols) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] bg-rose-500 text-white font-black px-2 py-0.5 rounded uppercase">
                  Fast 1-2 Day Dispatch
                </span>
                <h4 className="text-base font-black text-white leading-tight">
                  High-Impact Event Flyers & Brochures
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Printed on certified offset presses with rich CMYK inks and instant PDF soft-proofing.
                </p>
                <div className="text-sm font-extrabold text-amber-300 pt-1">
                  Starting at $28.50 for 250
                </div>
              </div>

              <div className="pt-4 relative z-10">
                <button
                  onClick={() => {
                    onSelectProductBySlug('commercial-flyers');
                    onClose();
                  }}
                  className="w-full bg-[#EA4335] hover:bg-[#D92D20] text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Order Commercial Flyers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. SIGNS & BANNERS MEGA MENU */}
        {/* ========================================================= */}
        {activeMenu === 'signs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Column 1: Outdoor Banners (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Flag className="w-4 h-4 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Outdoor Vinyl Banners
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('outdoor-vinyl-banners');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        13oz Matte Scrim Banner
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                        From $35.00
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Welded hems and brass grommets included.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('outdoor-vinyl-banners');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      18oz Heavy Blockout Banners
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Zero light bleed-through for double-sided.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('outdoor-vinyl-banners');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      9oz Breathable Mesh Vinyl
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Wind-resistant for construction fences.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Yard Signs (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Rigid Lawn Signs
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('corrugated-yard-signs');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        4mm Coroplast Yard Signs
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        Includes Stakes
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Direct UV flatbed printing on fluted plastic.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('corrugated-yard-signs');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      18" x 24" Standard Lawn Size
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">America's #1 contractor & campaign sign.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('corrugated-yard-signs');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      24" x 36" Large Real Estate Signs
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">High-visibility property listings.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Window Graphics (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Maximize2 className="w-4 h-4 text-purple-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Window & Wall Decals
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('vinyl-decals-graphics');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Storefront Window Vinyl
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Full-color adhesive decals with UV laminate.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('vinyl-decals-graphics');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Perforated Window Film (60/40)
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">One-way vision: see out, graphics outside.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('vinyl-decals-graphics');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Static Window Clings
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">No adhesive residue, reusable anytime.</p>
                  </button>
                </li>
                <li className="pt-1">
                  <button
                    onClick={() => {
                      onSelectCategory('signs-banners');
                      onNavigate('catalog');
                      onClose();
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1.5"
                  >
                    <span>View All Signs & Banners →</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Spotlight Banner Card (3 cols) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] bg-cyan-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                  Wide-Format Production
                </span>
                <h4 className="text-base font-black text-white leading-tight">
                  Waterproof & UV Fade-Proof Displays
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Printed on Japanese grand-format UV flatbed printers rated for 3-5 years outdoor durability.
                </p>
                <div className="text-sm font-extrabold text-amber-300 pt-1">
                  Yard Signs from $22.00
                </div>
              </div>

              <div className="pt-4 relative z-10">
                <button
                  onClick={() => {
                    onSelectProductBySlug('corrugated-yard-signs');
                    onClose();
                  }}
                  className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Build Yard Signs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. TEMPLATES MEGA MENU */}
        {/* ========================================================= */}
        {activeMenu === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Column 1: By Product (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Palette className="w-4 h-4 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Templates by Product
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Business Card Templates
                      </span>
                      <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded">
                        5 Styles
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Modern Corporate, Bold Business, Minimal Exec.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Flyer & Promo Templates
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Event announcements, grand openings, retail.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Brochure Layout Templates
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Tri-fold and bi-fold service menus.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: By Industry (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Templates by Industry
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Corporate & Financial Services
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Apex Advisory, Sterling Wealth, banking.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Creative & Design Agencies
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Prism Studio, vibrant CMYK gradients.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Legal, Medical & Consulting
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Beacon Legal Partners, healthcare.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Designer Features (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Download className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Free Design Tools
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      In-Browser Customizer
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Live text editing, color themes, logo upload.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onOpenModal('guidelines');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Download Bleed Guides
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Blank Adobe Illustrator & Photoshop files.</p>
                  </button>
                </li>
                <li className="pt-1">
                  <button
                    onClick={() => {
                      onNavigate('templates');
                      onClose();
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1.5"
                  >
                    <span>Browse All 15 Templates →</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Spotlight Banner Card (3 cols) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-900 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] bg-purple-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                  100% Free Tool
                </span>
                <h4 className="text-base font-black text-white leading-tight">
                  Design in 5 Minutes. No Software Needed.
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Select a template, customize names, phone numbers and branding, and get an instant digital PDF proof.
                </p>
              </div>

              <div className="pt-4 relative z-10">
                <button
                  onClick={() => {
                    onNavigate('templates');
                    onClose();
                  }}
                  className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Template Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. RESOURCES MEGA MENU */}
        {/* ========================================================= */}
        {activeMenu === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Column 1: Preflight & Guidelines (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <FileCheck className="w-4 h-4 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Artwork Setup & Bleed
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onOpenModal('guidelines');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      Artwork Guidelines Modal
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">
                      0.125" standard bleeds and safe cut margins.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onOpenModal('guidelines');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      CMYK Color Mode Guide
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Prevent RGB shift and rich black formulas.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onOpenModal('guidelines');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      300 DPI Resolution Check
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Ensures crisp, non-pixelated printed text.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Free Tools & Quotes (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Package className="w-4 h-4 text-rose-500" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Ordering Tools
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      onOpenModal('sample-kit');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Free Paper Sample Kit
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        100% FREE
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Touch & feel 18 cardstocks and foil samples.
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onOpenModal('quote');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition">
                        Custom Quote Estimator
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                        Fast
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">Instant quotes for volume & bespoke jobs.</p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectProductBySlug('direct-mail-postcards');
                      onClose();
                    }}
                    className="group text-left w-full hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition block">
                      USPS EDDM Postal Cheat Sheet
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">Mailing dimensions and permit rules.</p>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Turnaround & Support (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Clock className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Guarantees & Support
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <div className="p-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      G7 Master Color Guarantee
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Reprint protection on color or defect issues.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="p-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      Free Prepress PDF Proofing
                    </span>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Inspect bleeds and trim lines before printing.
                    </p>
                  </div>
                </li>
                <li>
                  <a
                    href="tel:18001234567"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-sky-50 text-slate-900 hover:text-sky-700 transition"
                  >
                    <Phone className="w-4 h-4 text-sky-600" />
                    <div>
                      <div className="font-bold text-xs sm:text-sm">+1 (800) 123-4567</div>
                      <div className="text-[11px] text-slate-500">Live Mon-Fri 8AM - 8PM EST</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Spotlight Banner Card (3 cols) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                  Complimentary Swatches
                </span>
                <h4 className="text-base font-black text-white leading-tight">
                  Free Paper & Finish Sample Kit
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Sent directly to your door: 16pt cards, suede laminate, foil swatches, synthetic plastic, and flyer stocks.
                </p>
              </div>

              <div className="pt-4 relative z-10">
                <button
                  onClick={() => {
                    onOpenModal('sample-kit');
                    onClose();
                  }}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Request Free Sample Kit</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop closer strip */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>G7 Master Certified Color Production • Free PDF Proofs</span>
        </span>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline"
        >
          Close Menu ✕
        </button>
      </div>
    </div>
  );
};
