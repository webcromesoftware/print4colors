import React, { useState, useMemo } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { BusinessCardVisualPreview } from './BusinessCardVisualPreview';
import { ALL_BUSINESS_CARD_PRODUCTS } from '../data/businessCardsData';
import {
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

export const BusinessCardsCatalog: React.FC = () => {
  const { setSelectedProductId, setCurrentView } = usePrintStore();

  // Filter States
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [selectedCoatings, setSelectedCoatings] = useState<string[]>([]);
  const [stockSearchQuery, setStockSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'position' | 'price-asc' | 'price-desc' | 'name-asc'>('position');

  // Sidebar collapsible accordions
  const [openSections, setOpenSections] = useState({
    category: true,
    size: true,
    stock: true,
    coating: false,
    colorspec: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Toggle filter item
  const toggleSize = (sizeName: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeName) ? prev.filter((s) => s !== sizeName) : [...prev, sizeName]
    );
  };

  const toggleStock = (stockKeyword: string) => {
    setSelectedStocks((prev) =>
      prev.includes(stockKeyword) ? prev.filter((s) => s !== stockKeyword) : [...prev, stockKeyword]
    );
  };

  const toggleCoating = (coatingKeyword: string) => {
    setSelectedCoatings((prev) =>
      prev.includes(coatingKeyword) ? prev.filter((c) => c !== coatingKeyword) : [...prev, coatingKeyword]
    );
  };

  const resetFilters = () => {
    setSelectedSubCategory('all');
    setSelectedSizes([]);
    setSelectedStocks([]);
    setSelectedCoatings([]);
    setStockSearchQuery('');
  };

  // Filtered & Sorted Products
  const filteredCards = useMemo(() => {
    let result = [...ALL_BUSINESS_CARD_PRODUCTS];

    // Subcategory Filter
    if (selectedSubCategory !== 'all') {
      result = result.filter((p) => p.subCategory === selectedSubCategory);
    }

    // Size Filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.some((filterSize) => s.name.toLowerCase().includes(filterSize.toLowerCase())))
      );
    }

    // Stock Filter
    if (selectedStocks.length > 0) {
      result = result.filter((p) =>
        p.stocks.some((st) => selectedStocks.some((filterSt) => st.name.toLowerCase().includes(filterSt.toLowerCase())))
      );
    }

    // Coating Filter
    if (selectedCoatings.length > 0) {
      result = result.filter((p) =>
        p.coatings.some((c) => selectedCoatings.some((filterC) => c.name.toLowerCase().includes(filterC.toLowerCase())))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedSubCategory, selectedSizes, selectedStocks, selectedCoatings, sortBy]);

  const stockFilterOptions = [
    '14PT C2S',
    '14PT Uncoated',
    '14PT Natural',
    '16PT C2S',
    '18PT C1S',
    '18PT Uncoated Kraft',
    '100LB Gloss Cover',
    '100LB Cover Linen',
    '14PT Pearl Metallic',
    '10PT EndurACE',
    '20PT Plastic',
    '32PT Painted Edge'
  ];

  const visibleStockOptions = stockFilterOptions.filter((s) =>
    s.toLowerCase().includes(stockSearchQuery.toLowerCase())
  );

  const hasActiveFilters =
    selectedSubCategory !== 'all' ||
    selectedSizes.length > 0 ||
    selectedStocks.length > 0 ||
    selectedCoatings.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-['Plus_Jakarta_Sans',sans-serif] space-y-6">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-500">
        <button
          onClick={() => setCurrentView('home')}
          className="hover:text-slate-800 transition cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">Business Cards</span>
      </nav>

      {/* 2. Header Title & Description (Matching Screenshot Intro) */}
      <div className="space-y-2 text-center max-w-4xl mx-auto pt-2 pb-4">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Business Cards
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
          Help your customers present themselves perfectly with our high-quality Business Cards. Print4Colors' extensive selection makes it easy to select the ideal Business Card for each customer from our variety of sizes, stocks, finishes, and enhancements.
        </p>

        {/* Paper Supplier Badge */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>Print4Colors proudly uses certified G7 Master Color & sustainably sourced US papers.</span>
        </div>
      </div>

      {/* 3. Main Catalog Layout (Left Sidebar + Right Product Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* ========================================================= */}
        {/* LEFT COLUMN: FILTERS SIDEBAR (3 cols) */}
        {/* ========================================================= */}
        <aside className="lg:col-span-3 space-y-5 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-sky-600" />
              <span>Filters</span>
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Section 1: CATEGORY */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider py-1 cursor-pointer"
            >
              <span>Category</span>
              <span className="text-slate-400 font-normal">{openSections.category ? '−' : '+'}</span>
            </button>

            {openSections.category && (
              <div className="space-y-1.5 pt-1 text-xs">
                <button
                  onClick={() => setSelectedSubCategory('all')}
                  className={`w-full text-left py-1 px-2 rounded-md transition cursor-pointer flex justify-between ${
                    selectedSubCategory === 'all'
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>All Business Cards</span>
                  <span className="text-[11px] text-slate-400 font-normal">20</span>
                </button>
                <button
                  onClick={() => setSelectedSubCategory('popular')}
                  className={`w-full text-left py-1 px-2 rounded-md transition cursor-pointer flex justify-between ${
                    selectedSubCategory === 'popular'
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Popular Business Cards</span>
                  <span className="text-[11px] text-slate-400 font-normal">6</span>
                </button>
                <button
                  onClick={() => setSelectedSubCategory('premium')}
                  className={`w-full text-left py-1 px-2 rounded-md transition cursor-pointer flex justify-between ${
                    selectedSubCategory === 'premium'
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Premium Business Cards</span>
                  <span className="text-[11px] text-slate-400 font-normal">8</span>
                </button>
                <button
                  onClick={() => setSelectedSubCategory('majestic')}
                  className={`w-full text-left py-1 px-2 rounded-md transition cursor-pointer flex justify-between ${
                    selectedSubCategory === 'majestic'
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Majestic Business Cards</span>
                  <span className="text-[11px] text-slate-400 font-normal">4</span>
                </button>
                <button
                  onClick={() => setSelectedSubCategory('shape')}
                  className={`w-full text-left py-1 px-2 rounded-md transition cursor-pointer flex justify-between ${
                    selectedSubCategory === 'shape'
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Business Cards by Shape</span>
                  <span className="text-[11px] text-slate-400 font-normal">5</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 2: SIZE */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => toggleSection('size')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider py-1 cursor-pointer"
            >
              <span>Size</span>
              <span className="text-slate-400 font-normal">{openSections.size ? '−' : '+'}</span>
            </button>

            {openSections.size && (
              <div className="space-y-1.5 pt-1 text-xs">
                {[
                  '2" x 3.5" (US Standard)',
                  '2.125" x 3.375" (EU Standard)',
                  '2.5" x 2.5"',
                  '1.75" x 3.5"',
                  '2" x 2"',
                  '2" x 7"',
                  '2" x 4"'
                ].map((sizeStr) => (
                  <label
                    key={sizeStr}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(sizeStr)}
                      onChange={() => toggleSize(sizeStr)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span>{sizeStr}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: STOCK */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => toggleSection('stock')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider py-1 cursor-pointer"
            >
              <span>Stock</span>
              <span className="text-slate-400 font-normal">{openSections.stock ? '−' : '+'}</span>
            </button>

            {openSections.stock && (
              <div className="space-y-2 pt-1 text-xs">
                {/* Stock Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search (14PT, 16PT, Suede...)"
                    value={stockSearchQuery}
                    onChange={(e) => setStockSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md py-1 px-2 text-[11px] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <Search className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 scrollbar-thin pr-1">
                  {visibleStockOptions.map((st) => (
                    <label
                      key={st}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStocks.includes(st)}
                        onChange={() => toggleStock(st)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="truncate">{st}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: COATING */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <button
              onClick={() => toggleSection('coating')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider py-1 cursor-pointer"
            >
              <span>Coating</span>
              <span className="text-slate-400 font-normal">{openSections.coating ? '−' : '+'}</span>
            </button>

            {openSections.coating && (
              <div className="space-y-1.5 pt-1 text-xs">
                {['High Gloss UV', 'Dull Matte Finish', 'Velvet Suede', 'Raised Spot UV', 'Gold Foil'].map((c) => (
                  <label
                    key={c}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCoatings.includes(c)}
                      onChange={() => toggleCoating(c)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: COLORSPEC */}
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('colorspec')}
              className="w-full flex items-center justify-between text-xs font-black text-slate-900 uppercase tracking-wider py-1 cursor-pointer"
            >
              <span>ColorSpec</span>
              <span className="text-slate-400 font-normal">{openSections.colorspec ? '−' : '+'}</span>
            </button>

            {openSections.colorspec && (
              <div className="space-y-1.5 pt-1 text-xs">
                <label className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600" />
                  <span>4/0 (Full Color Front)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600" />
                  <span>4/4 (Full Color Both Sides)</span>
                </label>
              </div>
            )}
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: 20-PRODUCT CATALOG GRID (9 cols) */}
        {/* ========================================================= */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Sort & Count Bar Matching Screenshot */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="font-semibold text-slate-500">Sort By</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs font-medium text-slate-800 pr-7 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="position">Position</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="text-xs font-bold text-slate-600">
              {filteredCards.length} Results
            </div>
          </div>

          {/* 3-Column Product Grid Matching Screenshot Exactly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProductId(product.id);
                  setCurrentView('configurator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Mockup Preview */}
                <div className="w-full aspect-[4/3] bg-slate-50 relative overflow-hidden border-b border-slate-100">
                  <BusinessCardVisualPreview slug={product.slug} />
                </div>

                {/* Card Title & Subtitle Matching Screenshot */}
                <div className="p-4 space-y-1 text-center bg-white flex-1 flex flex-col justify-center">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-sky-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block text-[11px] font-bold text-sky-600 group-hover:underline">
                      From ${product.startingPrice.toFixed(2)} →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pagination Strip */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs font-semibold cursor-pointer">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>per page</span>
            </div>

            <div className="font-medium text-slate-500">
              Showing 1 - {filteredCards.length} of {filteredCards.length} Business Cards
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
