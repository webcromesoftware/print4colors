import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Phone,
  HelpCircle,
  User,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Package,
  Sparkles,
  X,
  Truck
} from 'lucide-react';
import { usePrintStore } from '../context/PrintStore';
import { Print4ColorsLogo } from './Print4ColorsLogo';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    isAdmin,
    setIsAdmin,
    currentUser,
    switchUser,
    customers,
    products,
    setSelectedProductId,
    setIsQuoteModalOpen,
    setIsSampleKitOpen,
    setIsGuidelinesOpen,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
  } = usePrintStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close search and dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Top Utility Notification Strip (Dark Navy Bar Matching Mockup) */}
      <div className="bg-[#0B132B] text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Value Props */}
          <div className="flex items-center space-x-2 text-xs font-medium tracking-wide">
            <span className="flex items-center text-slate-200">
              <Truck className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
              Free Shipping on Orders over $95
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-200">Fast Turnaround</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-200">High Quality Printing</span>
          </div>

          {/* Right Support & Quick Access */}
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>Need Help?</span>
              <a
                href="tel:18001234567"
                className="font-bold text-white hover:text-sky-400 transition flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>+1 (800) 123-4567</span>
              </a>
            </div>

            {/* Subtle Admin toggle */}
            <button
              onClick={() => {
                if (currentView === 'admin-panel') {
                  setCurrentView('home');
                  setIsAdmin(false);
                } else {
                  setCurrentView('admin-panel');
                  setIsAdmin(true);
                }
              }}
              className="text-[11px] text-slate-400 hover:text-white transition flex items-center gap-1 border-l border-slate-700 pl-3"
              title="Admin Order Management"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>{isAdmin ? 'Exit Admin' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Search Header (White Row Matching Mockup) */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
        {/* Logo */}
        <div
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer select-none shrink-0"
        >
          <Print4ColorsLogo size="md" variant="light" showTagline={true} />
        </div>

        {/* Central Search Bar */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search for products, templates, or ideas..."
              className="w-full bg-slate-50 border border-slate-300 rounded-full pl-5 pr-12 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition shadow-xs"
            />
            {/* Blue Round Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="absolute right-1.5 w-8 h-8 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white flex items-center justify-center transition shadow-xs cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-11 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Popup */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <>
                  <div className="px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Found {filteredProducts.length} matching products
                  </div>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setCurrentView('configurator');
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-3 hover:bg-sky-50/70 cursor-pointer flex items-center gap-3 transition"
                    >
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-md border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm truncate">{p.name}</span>
                          <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-medium">
                            {p.categoryName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{p.tagline}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">from</span>
                        <div className="font-extrabold text-sky-700 text-sm">${p.startingPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No products found for "{searchQuery}". Try "Business Cards", "Banners", or "Yard Signs".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Header Navigation: Help, My Account, Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Help */}
          <button
            onClick={() => setIsGuidelinesOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-slate-700 hover:text-sky-600 text-sm font-semibold transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Help</span>
          </button>

          {/* My Account */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 text-slate-700 hover:text-sky-600 text-sm font-semibold transition cursor-pointer py-1"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">My Account</span>
            </button>

            {/* Account Switcher Modal/Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-3 divide-y divide-slate-100 animate-in fade-in-50 zoom-in-95">
                <div className="pb-3">
                  <div className="text-xs text-slate-400">Current User</div>
                  <div className="font-bold text-slate-900 text-sm">{currentUser.name}</div>
                  <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                  <div className="text-[11px] text-sky-600 font-semibold mt-1">{currentUser.company}</div>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentView('customer-dashboard');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Order History & Proofs
                  </button>
                  <button
                    onClick={() => {
                      setIsSampleKitOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Request Free Sample Kit
                  </button>
                </div>

                <div className="pt-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Switch Test Account
                  </div>
                  <div className="space-y-1">
                    {customers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          switchUser(c.id);
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition ${
                          currentUser.id === c.id
                            ? 'bg-sky-50 text-sky-700 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{c.name} ({c.company})</span>
                        {currentUser.id === c.id && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon with Red Badge (Matching Mockup) */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex items-center text-slate-700 hover:text-sky-600 transition cursor-pointer p-1"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            <span className="absolute -top-1.5 -right-2 bg-[#EA4335] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {cartTotalCount}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Sub-Navigation Bar (Matching Mockup with 'Get a Quote' Red Button) */}
      <nav ref={dropdownRef} className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Main Category Links */}
          <div className="flex items-center space-x-1 sm:space-x-4 py-2 overflow-x-auto scrollbar-none text-sm font-semibold text-slate-700">
            {/* Business Cards Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'cards' ? null : 'cards')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:text-sky-600 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>Business Cards</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'cards' && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50">
                  <button
                    onClick={() => {
                      const dual = products.find((p) => p.slug === 'dual-raised-business-cards');
                      if (dual) {
                        setSelectedProductId(dual.id);
                        setCurrentView('configurator');
                      }
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-bold text-slate-900 flex items-center justify-between"
                  >
                    <span>Dual Raised Business Cards</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-black">
                      HOT
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const std = products.find((p) => p.slug === 'standard-business-cards');
                      if (std) {
                        setSelectedProductId(std.id);
                        setCurrentView('configurator');
                      }
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700"
                  >
                    Standard 16pt & 18pt Cards
                  </button>
                  <button
                    onClick={() => {
                      const prem = products.find((p) => p.slug === 'premium-business-cards');
                      if (prem) {
                        setSelectedProductId(prem.id);
                        setCurrentView('configurator');
                      }
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700"
                  >
                    Specialty & Foil Cards
                  </button>
                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        setActiveCategory('business-cards');
                        setCurrentView('catalog');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs font-bold text-sky-600 hover:underline"
                    >
                      View All Business Cards →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Marketing Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'marketing' ? null : 'marketing')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:text-sky-600 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>Marketing Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'marketing' && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50">
                  <button
                    onClick={() => {
                      const fl = products.find((p) => p.slug === 'commercial-flyers');
                      if (fl) {
                        setSelectedProductId(fl.id);
                        setCurrentView('configurator');
                      }
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700"
                  >
                    Commercial Flyers & Handouts
                  </button>
                  <button
                    onClick={() => {
                      const br = products.find((p) => p.slug === 'custom-brochures');
                      if (br) {
                        setSelectedProductId(br.id);
                        setCurrentView('configurator');
                      }
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700"
                  >
                    Folded Brochures (Tri-fold, Z-fold)
                  </button>
                  <button
                    onClick={() => {
                      const pc = products.find((p) => p.slug === 'direct-mail-postcards');
                      if (pc) {
                        setSelectedProductId(pc.id);
                        setCurrentView('configurator');
                      }
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700"
                  >
                    Direct Mail & EDDM Postcards
                  </button>
                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        setActiveCategory('marketing');
                        setCurrentView('catalog');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs font-bold text-sky-600 hover:underline"
                    >
                      View All Marketing Products →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Signs & Banners */}
            <button
              onClick={() => {
                setActiveCategory('signs-banners');
                setCurrentView('catalog');
              }}
              className="px-3 py-1.5 rounded-md hover:text-sky-600 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap"
            >
              Signs & Banners
            </button>

            {/* Templates */}
            <button
              onClick={() => setCurrentView('templates')}
              className="px-3 py-1.5 rounded-md hover:text-sky-600 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap"
            >
              Templates
            </button>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:text-sky-600 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'resources' && (
                <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50">
                  <button
                    onClick={() => {
                      setIsGuidelinesOpen(true);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                    Artwork Guidelines
                  </button>
                  <button
                    onClick={() => {
                      setIsSampleKitOpen(true);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <Package className="w-3.5 h-3.5 text-rose-500" />
                    Free Paper Sample Kit
                  </button>
                  <button
                    onClick={() => {
                      setIsQuoteModalOpen(true);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 text-xs font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Custom Quote Request
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Coral-Red "Get a Quote" Button (Matching Mockup) */}
          <div className="py-2 pl-2">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-[#EA4335] hover:bg-[#D93025] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-md shadow-xs transition duration-150 cursor-pointer whitespace-nowrap"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
