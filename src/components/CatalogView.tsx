import React from 'react';
import { usePrintStore } from '../context/PrintStore';
import { ProductCard } from './ProductCard';
import { BusinessCardsCatalog } from './BusinessCardsCatalog';
import { Search, Filter, Sparkles, Layers } from 'lucide-react';

export const CatalogView: React.FC = () => {
  const { products, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = usePrintStore();

  // If business cards category is active, render the dedicated 20-product business cards catalog layout matching 4over
  if (activeCategory === 'business-cards' && searchQuery.trim() === '') {
    return (
      <div className="space-y-4">
        {/* Category Switcher Pill Header */}
        <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('business-cards')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0284C7] text-white shadow-xs transition cursor-pointer"
            >
              Business Cards (20)
            </button>
            <button
              onClick={() => setActiveCategory('marketing')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              Marketing Products
            </button>
            <button
              onClick={() => setActiveCategory('signs-banners')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              Signs & Banners
            </button>
          </div>
        </div>

        {/* Dedicated 20-Product Business Cards Catalog */}
        <BusinessCardsCatalog />
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Category Title & Description */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Commercial Print Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Factory-direct US commercial printing. Premium business cards, marketing brochures, direct mail postcards, and weather-proof outdoor signage with real-time dynamic pricing.
        </p>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setActiveCategory('business-cards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'business-cards'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Business Cards (20)
          </button>
          <button
            onClick={() => setActiveCategory('marketing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'marketing'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Marketing Collateral
          </button>
          <button
            onClick={() => setActiveCategory('signs-banners')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeCategory === 'signs-banners'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Signs & Banners
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-slate-500 text-sm">No products found matching your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="text-xs font-bold text-sky-600 hover:underline cursor-pointer"
          >
            Clear Filters & Search
          </button>
        </div>
      )}
    </div>
  );
};
