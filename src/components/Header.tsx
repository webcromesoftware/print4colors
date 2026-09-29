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
  X,
  Truck,
  Menu as MenuIcon
} from 'lucide-react';
import { usePrintStore } from '../context/PrintStore';
import { Print4ColorsLogo } from './Print4ColorsLogo';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
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
    setActiveCategory,
  } = usePrintStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  // Mega Menu Active State & Graceful Hover Delay
  const [activeMegaMenu, setActiveMegaMenu] = useState<
    'cards' | 'marketing' | 'signs' | 'templates' | 'resources' | null
  >(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleMenuMouseEnter = (
    menu: 'cards' | 'marketing' | 'signs' | 'templates' | 'resources'
  ) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMegaMenu(menu);
  };

  const handleMenuMouseLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const handleMenuClick = (
    menu: 'cards' | 'marketing' | 'signs' | 'templates' | 'resources'
  ) => {
    if (activeMegaMenu === menu) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(menu);
    }
  };

  // Close search and user menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
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

  const handleSelectProductBySlug = (slug: string) => {
    const product = products.find((p) => p.slug === slug);
    if (product) {
      setSelectedProductId(product.id);
      setCurrentView('configurator');
    } else {
      setActiveCategory('all');
      setCurrentView('catalog');
    }
    setActiveMegaMenu(null);
  };

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
              className="text-[11px] text-slate-400 hover:text-white transition flex items-center gap-1 border-l border-slate-700 pl-3 cursor-pointer"
              title="Admin Order Management"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>{isAdmin ? 'Exit Admin' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Search Header (White Row Matching Mockup) */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4 sm:gap-6">
        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-1.5 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100 transition"
          aria-label="Toggle navigation menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>

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
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Help */}
          <button
            onClick={() => setIsGuidelinesOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-slate-700 hover:text-sky-600 text-sm font-semibold transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Help</span>
          </button>

          {/* My Account */}
          <div ref={userMenuRef} className="relative">
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
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Order History & Proofs
                  </button>
                  <button
                    onClick={() => {
                      setIsSampleKitOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
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
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition cursor-pointer ${
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

      {/* 3. Sub-Navigation Bar & Mega Menu Container */}
      {/* NOTICE: Position is RELATIVE with NO overflow-hidden or overflow-x-auto to prevent clipping! */}
      <nav className="relative bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Main Category Mega-Menu Triggers */}
          <div className="hidden lg:flex items-center space-x-1 py-1 text-sm font-semibold text-slate-700">
            {/* 1. Business Cards */}
            <div
              onMouseEnter={() => handleMenuMouseEnter('cards')}
              onMouseLeave={handleMenuMouseLeave}
              className="relative"
            >
              <button
                onClick={() => handleMenuClick('cards')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md transition cursor-pointer ${
                  activeMegaMenu === 'cards'
                    ? 'text-sky-600 bg-sky-50 font-bold'
                    : 'hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                <span>Business Cards</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === 'cards' ? 'rotate-180 text-sky-600' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>

            {/* 2. Marketing Products */}
            <div
              onMouseEnter={() => handleMenuMouseEnter('marketing')}
              onMouseLeave={handleMenuMouseLeave}
              className="relative"
            >
              <button
                onClick={() => handleMenuClick('marketing')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md transition cursor-pointer ${
                  activeMegaMenu === 'marketing'
                    ? 'text-sky-600 bg-sky-50 font-bold'
                    : 'hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                <span>Marketing Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === 'marketing' ? 'rotate-180 text-sky-600' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>

            {/* 3. Signs & Banners */}
            <div
              onMouseEnter={() => handleMenuMouseEnter('signs')}
              onMouseLeave={handleMenuMouseLeave}
              className="relative"
            >
              <button
                onClick={() => handleMenuClick('signs')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md transition cursor-pointer ${
                  activeMegaMenu === 'signs'
                    ? 'text-sky-600 bg-sky-50 font-bold'
                    : 'hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                <span>Signs & Banners</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === 'signs' ? 'rotate-180 text-sky-600' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>

            {/* 4. Templates */}
            <div
              onMouseEnter={() => handleMenuMouseEnter('templates')}
              onMouseLeave={handleMenuMouseLeave}
              className="relative"
            >
              <button
                onClick={() => handleMenuClick('templates')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md transition cursor-pointer ${
                  activeMegaMenu === 'templates'
                    ? 'text-sky-600 bg-sky-50 font-bold'
                    : 'hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                <span>Templates</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === 'templates' ? 'rotate-180 text-sky-600' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>

            {/* 5. Resources */}
            <div
              onMouseEnter={() => handleMenuMouseEnter('resources')}
              onMouseLeave={handleMenuMouseLeave}
              className="relative"
            >
              <button
                onClick={() => handleMenuClick('resources')}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md transition cursor-pointer ${
                  activeMegaMenu === 'resources'
                    ? 'text-sky-600 bg-sky-50 font-bold'
                    : 'hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === 'resources' ? 'rotate-180 text-sky-600' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Categories Scroll Strip (When not expanded) */}
          <div className="flex lg:hidden items-center space-x-2 py-2 overflow-x-auto text-xs font-bold text-slate-700 scrollbar-none">
            <button
              onClick={() => handleMenuClick('cards')}
              className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 shrink-0 cursor-pointer"
            >
              Cards ▾
            </button>
            <button
              onClick={() => handleMenuClick('marketing')}
              className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 shrink-0 cursor-pointer"
            >
              Marketing ▾
            </button>
            <button
              onClick={() => handleMenuClick('signs')}
              className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 shrink-0 cursor-pointer"
            >
              Signs ▾
            </button>
            <button
              onClick={() => handleMenuClick('templates')}
              className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 shrink-0 cursor-pointer"
            >
              Templates ▾
            </button>
            <button
              onClick={() => handleMenuClick('resources')}
              className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 shrink-0 cursor-pointer"
            >
              Resources ▾
            </button>
          </div>

          {/* Right Coral-Red "Get a Quote" Button (Matching Mockup) */}
          <div className="py-2 pl-2 shrink-0">
            <button
              onClick={() => {
                setIsQuoteModalOpen(true);
                setActiveMegaMenu(null);
              }}
              className="bg-[#EA4335] hover:bg-[#D93025] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-md shadow-xs transition duration-150 cursor-pointer whitespace-nowrap"
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FULL-WIDTH UNCLIPPED MEGA MENU DROPDOWN PANEL */}
        {/* ========================================================================= */}
        <div
          onMouseEnter={() => {
            if (closeTimerRef.current) {
              clearTimeout(closeTimerRef.current);
              closeTimerRef.current = null;
            }
          }}
          onMouseLeave={handleMenuMouseLeave}
        >
          <MegaMenu
            activeMenu={activeMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
            onSelectProductBySlug={handleSelectProductBySlug}
            onSelectCategory={setActiveCategory}
            onNavigate={setCurrentView}
            onOpenModal={(modal) => {
              if (modal === 'quote') setIsQuoteModalOpen(true);
              if (modal === 'sample-kit') setIsSampleKitOpen(true);
              if (modal === 'guidelines') setIsGuidelinesOpen(true);
            }}
            products={products}
          />
        </div>
      </nav>

      {/* Dimmed backdrop when Mega Menu is open */}
      {activeMegaMenu && (
        <div
          onClick={() => setActiveMegaMenu(null)}
          className="fixed inset-0 top-[138px] bg-slate-900/25 backdrop-blur-[1px] z-30 transition-opacity"
        />
      )}

      {/* Mobile Drawer (When Hamburger is clicked) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[115px] bg-white z-50 overflow-y-auto p-4 space-y-4 shadow-2xl border-t border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="font-bold text-slate-900 text-sm">Print4Colors Directory</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Accordion */}
          <div className="space-y-2">
            {/* 1. Business Cards */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  setMobileExpandedSection(
                    mobileExpandedSection === 'cards' ? null : 'cards'
                  )
                }
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 font-bold text-sm text-left"
              >
                <span>Business Cards</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileExpandedSection === 'cards' ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </button>
              {mobileExpandedSection === 'cards' && (
                <div className="p-3 space-y-2 bg-white divide-y divide-slate-100 text-xs">
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('dual-raised-business-cards');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 font-bold text-slate-900 hover:text-sky-600 flex justify-between"
                  >
                    <span>Dual Raised Foil & UV Cards</span>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-1 rounded font-black">
                      HOT
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('standard-business-cards');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-700 hover:text-sky-600"
                  >
                    Standard 16pt & 18pt Cards
                  </button>
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('premium-business-cards');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-700 hover:text-sky-600"
                  >
                    Specialty Metallic Foil & Plastic
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory('business-cards');
                      setCurrentView('catalog');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-sky-600 font-bold"
                  >
                    View All Business Cards →
                  </button>
                </div>
              )}
            </div>

            {/* 2. Marketing Products */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  setMobileExpandedSection(
                    mobileExpandedSection === 'marketing' ? null : 'marketing'
                  )
                }
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 font-bold text-sm text-left"
              >
                <span>Marketing Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileExpandedSection === 'marketing' ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </button>
              {mobileExpandedSection === 'marketing' && (
                <div className="p-3 space-y-2 bg-white divide-y divide-slate-100 text-xs">
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('commercial-flyers');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold"
                  >
                    Club & Commercial Flyers
                  </button>
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('custom-brochures');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold"
                  >
                    Folded Brochures (Tri-fold & Z-fold)
                  </button>
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('direct-mail-postcards');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold"
                  >
                    Direct Mail & EDDM Postcards
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory('marketing');
                      setCurrentView('catalog');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-sky-600 font-bold"
                  >
                    View All Marketing Products →
                  </button>
                </div>
              )}
            </div>

            {/* 3. Signs & Banners */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  setMobileExpandedSection(
                    mobileExpandedSection === 'signs' ? null : 'signs'
                  )
                }
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 font-bold text-sm text-left"
              >
                <span>Signs & Banners</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileExpandedSection === 'signs' ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </button>
              {mobileExpandedSection === 'signs' && (
                <div className="p-3 space-y-2 bg-white divide-y divide-slate-100 text-xs">
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('outdoor-vinyl-banners');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold"
                  >
                    Heavy-Duty Outdoor Vinyl Banners
                  </button>
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('corrugated-yard-signs');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold"
                  >
                    Coroplast Yard Signs (with H-Stakes)
                  </button>
                  <button
                    onClick={() => {
                      handleSelectProductBySlug('vinyl-decals-graphics');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold"
                  >
                    Window & Storefront Decals
                  </button>
                </div>
              )}
            </div>

            {/* 4. Templates */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => {
                  setCurrentView('templates');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 font-bold text-sm text-left"
              >
                <span>Browse All Templates</span>
                <span className="text-xs text-sky-600">Open →</span>
              </button>
            </div>

            {/* 5. Resources */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  setMobileExpandedSection(
                    mobileExpandedSection === 'resources' ? null : 'resources'
                  )
                }
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 font-bold text-sm text-left"
              >
                <span>Resources & Preflight</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileExpandedSection === 'resources' ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </button>
              {mobileExpandedSection === 'resources' && (
                <div className="p-3 space-y-2 bg-white divide-y divide-slate-100 text-xs">
                  <button
                    onClick={() => {
                      setIsGuidelinesOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold"
                  >
                    Artwork Bleed & Margins Guidelines
                  </button>
                  <button
                    onClick={() => {
                      setIsSampleKitOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold text-rose-600"
                  >
                    Request Free Paper Sample Kit
                  </button>
                  <button
                    onClick={() => {
                      setIsQuoteModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-slate-900 font-semibold text-amber-700"
                  >
                    Custom Commercial Quote Estimator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
