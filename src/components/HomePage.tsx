import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { StorefrontHeroCard } from './StorefrontHeroCard';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  Award,
  Zap,
  Leaf,
  CheckCircle2,
  MousePointer,
  Image as ImageIcon,
  ShoppingCart,
  FileCheck2,
  LayoutGrid,
  Star,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    setCurrentView,
    setActiveCategory,
    setSelectedProductId,
    setSelectedTemplateId,
    setIsQuoteModalOpen
  } = usePrintStore();

  const [activeTemplateTab, setActiveTemplateTab] = useState<'business-cards' | 'flyers' | 'brochures'>('business-cards');

  // Popular product definitions matching the 10 items in the mockup
  const popularProductsList = [
    {
      id: 'prod-bc-dual-raised',
      slug: 'dual-raised-business-cards',
      title: 'Business Cards',
      artText: 'Your Brand Our Priority',
      badge: 'Bestseller',
      bgGradient: 'from-slate-100 to-slate-200',
      action: () => {
        const p = products.find((x) => x.slug === 'dual-raised-business-cards') || products.find((x) => x.category === 'business-cards');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-slate-50 to-slate-200">
          <div className="w-[85%] aspect-[1.75/1] bg-white rounded-md shadow-md border border-slate-300/80 p-3 flex flex-col justify-between transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <div className="text-[10px] font-black text-slate-900 tracking-tight">
              Your Brand<br />
              <span className="text-slate-500 font-semibold">Our Priority</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-1 w-8 bg-sky-500 rounded" />
              <span className="text-[8px] font-bold text-slate-400">16pt Suede</span>
            </div>
          </div>
          {/* Stack effect */}
          <div className="absolute w-[82%] aspect-[1.75/1] bg-slate-200/90 rounded-md -rotate-6 -z-10 shadow-xs" />
        </div>
      )
    },
    {
      id: 'prod-flyers',
      slug: 'commercial-flyers',
      title: 'Flyers',
      artText: 'SPECIAL OFFER 50% OFF',
      badge: 'Popular',
      bgGradient: 'from-amber-50 to-rose-50',
      action: () => {
        const p = products.find((x) => x.slug === 'commercial-flyers');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">
          <div className="w-[72%] aspect-[1/1.35] bg-gradient-to-br from-rose-500 via-pink-600 to-indigo-700 rounded-md shadow-md p-2.5 text-white flex flex-col justify-between transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
            <div>
              <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                SPECIAL OFFER
              </span>
              <div className="text-sm font-black mt-1 leading-none text-white drop-shadow-xs">
                50% OFF
              </div>
            </div>
            <div className="text-[8px] opacity-90 leading-tight">
              Grand Opening Sale<br />
              Commercial Quality
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'prod-brochures',
      slug: 'custom-brochures',
      title: 'Brochures',
      artText: 'Grow Your Business',
      badge: 'Tri-Fold',
      bgGradient: 'from-sky-50 to-blue-50',
      action: () => {
        const p = products.find((x) => x.slug === 'custom-brochures');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-sky-50 to-indigo-100/50">
          <div className="w-[82%] aspect-[1.3/1] flex shadow-md rounded-md overflow-hidden transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
            <div className="w-1/3 bg-[#0A2540] text-white p-1.5 flex flex-col justify-between border-r border-slate-700">
              <span className="text-[7px] font-black text-sky-400">SERVICES</span>
              <div className="text-[8px] font-bold leading-tight">Grow Your Business</div>
            </div>
            <div className="w-1/3 bg-white p-1.5 flex flex-col justify-between border-r border-slate-200">
              <div className="space-y-1">
                <div className="h-1 w-full bg-slate-200 rounded" />
                <div className="h-1 w-3/4 bg-slate-200 rounded" />
              </div>
              <span className="text-[7px] text-slate-400">Tri-Fold</span>
            </div>
            <div className="w-1/3 bg-slate-50 p-1.5 flex flex-col justify-end">
              <span className="text-[7px] font-bold text-sky-600">Contact Us</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'prod-postcards',
      slug: 'direct-mail-postcards',
      title: 'Postcards',
      artText: 'STAY CONNECTED',
      badge: 'Mailable',
      bgGradient: 'from-indigo-50 to-cyan-50',
      action: () => {
        const p = products.find((x) => x.slug === 'direct-mail-postcards');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-indigo-50 to-sky-100">
          <div className="w-[84%] aspect-[1.5/1] bg-gradient-to-r from-blue-700 to-indigo-900 rounded-md shadow-md p-3 text-white flex flex-col justify-between transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-[9px] font-black tracking-wider text-sky-300 uppercase">
              STAY CONNECTED
            </span>
            <div className="flex justify-between items-end">
              <span className="text-[8px] text-slate-300 font-medium">EDDM Direct Mail</span>
              <div className="w-4 h-4 rounded-xs border border-white/40 flex items-center justify-center text-[7px]">
                ✉️
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'prod-vinyl-banners',
      slug: 'outdoor-vinyl-banners',
      title: 'Banners',
      artText: 'MAKE A BIGGER IMPACT',
      badge: 'Heavy 13oz',
      bgGradient: 'from-sky-50 to-blue-100',
      action: () => {
        const p = products.find((x) => x.slug === 'outdoor-vinyl-banners');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-sky-100 via-blue-50 to-slate-200">
          <div className="relative w-[90%] aspect-[2.1/1] bg-[#0052CC] rounded-xs shadow-md p-2.5 text-white flex flex-col justify-center items-center text-center border-y-2 border-white/20">
            {/* Brass Grommets */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-400 border border-slate-900" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 border border-slate-900" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-400 border border-slate-900" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 border border-slate-900" />

            <span className="text-[10px] font-black tracking-tight leading-tight uppercase">
              MAKE A BIGGER<br />
              <span className="text-amber-300">IMPACT</span>
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'prod-yard-signs',
      slug: 'corrugated-yard-signs',
      title: 'Yard Signs',
      artText: 'VOTE TODAY',
      badge: 'Weatherproof',
      bgGradient: 'from-emerald-50 to-green-100',
      action: () => {
        const p = products.find((x) => x.slug === 'corrugated-yard-signs');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-b from-sky-100 via-emerald-50 to-emerald-200/80">
          {/* Sign board */}
          <div className="w-[78%] aspect-[1.33/1] bg-white rounded-xs shadow-md border border-slate-300 p-2 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-black text-blue-900 leading-tight">
              VOTE<br />
              <span className="text-rose-600">TODAY</span>
            </span>
          </div>
          {/* Wire H-Stake */}
          <div className="w-12 h-6 flex justify-between px-2">
            <div className="w-0.5 h-full bg-slate-400" />
            <div className="w-0.5 h-full bg-slate-400" />
          </div>
        </div>
      )
    },
    {
      id: 'prod-stickers',
      slug: 'custom-stickers-labels',
      title: 'Stickers & Labels',
      artText: 'Good Ideas Stick',
      badge: 'Die-Cut',
      bgGradient: 'from-amber-50 to-orange-100',
      action: () => {
        const p = products.find((x) => x.slug === 'custom-stickers-labels') || products.find((x) => x.id === 'prod-stickers');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-slate-200 p-2 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform">
            <span className="text-[10px] font-black text-slate-900 leading-tight">
              Good<br />
              Ideas<br />
              <span className="text-amber-500 font-bold">Stick</span>
            </span>
            {/* Peel corner effect */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-slate-200 rounded-tl-full shadow-inner" />
          </div>
        </div>
      )
    },
    {
      id: 'prod-posters',
      slug: 'commercial-posters',
      title: 'Posters',
      artText: 'DREAM CREATE PRINT',
      badge: 'Full Bleed',
      bgGradient: 'from-blue-50 to-indigo-100',
      action: () => {
        const p = products.find((x) => x.slug === 'commercial-posters') || products.find((x) => x.id === 'prod-posters');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-slate-100 to-indigo-50">
          <div className="w-[70%] aspect-[1/1.4] bg-[#0B1A30] rounded-xs shadow-md p-2.5 text-white flex flex-col justify-between border-4 border-slate-800">
            <div className="text-[9px] font-black tracking-tight leading-tight">
              DREAM<br />
              CREATE<br />
              <span className="text-sky-400">PRINT</span>
            </div>
            <div className="h-0.5 w-6 bg-gradient-to-r from-sky-400 to-amber-400" />
          </div>
        </div>
      )
    },
    {
      id: 'prod-packaging',
      slug: 'custom-packaging-boxes',
      title: 'Packaging',
      artText: 'UNBOX GREAT THINGS',
      badge: 'Custom Corrugated',
      bgGradient: 'from-amber-50 to-rose-100',
      action: () => {
        const p = products.find((x) => x.slug === 'custom-packaging-boxes') || products.find((x) => x.id === 'prod-packaging');
        if (p) setSelectedProductId(p.id);
        setCurrentView('configurator');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100">
          {/* Isometric Mailer Box */}
          <div className="w-[78%] aspect-[1.2/1] bg-white rounded-md shadow-md border border-slate-300 p-2.5 flex flex-col justify-between transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[8px] font-black text-rose-600 uppercase">Custom Box</span>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            </div>
            <div className="text-[9px] font-black text-slate-900 leading-tight">
              UNBOX<br />
              GREAT<br />
              THINGS
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'view-all',
      slug: 'all-products',
      title: 'View All Products',
      artText: 'Browse 100+ items',
      badge: 'Catalog',
      bgGradient: 'from-sky-50 to-blue-50',
      action: () => {
        setActiveCategory('all');
        setCurrentView('catalog');
      },
      renderVisual: () => (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-3 bg-sky-50/70 hover:bg-sky-100/70 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-sky-600/10 text-sky-600 flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-sky-700">100+ Products</span>
        </div>
      )
    }
  ];

  // 5 Templates matching the row in the screenshot
  const templatesRow = [
    {
      id: 'tmpl-bc-modern-corp',
      title: 'Modern Corporate',
      preview: (
        <div className="w-full h-full bg-[#0D1B2A] text-white p-3.5 flex flex-col justify-between rounded-lg">
          <div>
            <div className="text-xs font-black text-white">Your Brand</div>
            <div className="text-[10px] text-amber-300 font-semibold">Your Story</div>
          </div>
          <div className="text-[8px] text-slate-400">Apex Advisory Partners</div>
        </div>
      )
    },
    {
      id: 'tmpl-bc-bold-biz',
      title: 'Bold Business',
      preview: (
        <div className="w-full h-full bg-white text-slate-900 p-3.5 flex flex-col justify-between rounded-lg border border-slate-200">
          <div>
            <div className="text-xs font-black tracking-tight text-slate-900">JESSICA SMITH</div>
            <div className="text-[9px] font-bold text-rose-600">Marketing Director</div>
          </div>
          <div className="text-[8px] text-slate-500">Global Ventures LLC</div>
        </div>
      )
    },
    {
      id: 'tmpl-bc-minimal-exec',
      title: 'Minimal Executive',
      preview: (
        <div className="w-full h-full bg-[#FAFAFA] text-slate-900 p-3.5 flex flex-col justify-between rounded-lg border border-slate-200">
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-slate-800">
              ALEX JOHNSON
            </div>
            <div className="text-[8px] text-slate-500 uppercase tracking-widest mt-0.5">
              CONSULTANT
            </div>
          </div>
          <div className="h-0.5 w-8 bg-slate-900" />
        </div>
      )
    },
    {
      id: 'tmpl-bc-creative-color',
      title: 'Creative Color',
      preview: (
        <div className="w-full h-full bg-gradient-to-br from-rose-500 via-amber-500 to-sky-500 text-white p-3.5 flex flex-col justify-between rounded-lg shadow-inner">
          <div className="text-xs font-black drop-shadow-sm">
            DREAM<br />
            PLAN<br />
            DO
          </div>
          <div className="text-[8px] font-bold text-white/90">Prism Agency</div>
        </div>
      )
    },
    {
      id: 'tmpl-bc-prof-services',
      title: 'Professional Services',
      preview: (
        <div className="w-full h-full bg-white text-slate-900 p-3.5 flex flex-col justify-between rounded-lg border border-slate-200">
          <div>
            <div className="text-xs font-bold text-sky-900">Reliable Professional Results</div>
            <div className="h-1 w-10 bg-sky-600 mt-1 rounded" />
          </div>
          <div className="text-[8px] text-slate-500">Beacon Legal Partners</div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 font-['Plus_Jakarta_Sans',sans-serif] bg-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Matching Mockup: Clean Split Layout) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-to-b from-slate-50/80 via-white to-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, CTAs, 3 Value Props */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-600 uppercase block">
              HIGH QUALITY PRINTING FOR EVERY BUSINESS
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.12] tracking-tight">
              Bring Your Ideas<br />
              to Life with<br />
              <span className="text-[#0284C7]">Print4Colors</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-lg">
              Custom printing, signage, and marketing materials designed to help your business stand out.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setCurrentView('catalog');
                }}
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-white hover:bg-slate-50 text-[#0284C7] border border-[#0284C7] font-bold text-sm sm:text-base px-7 py-3.5 rounded-lg shadow-2xs hover:shadow-xs transition cursor-pointer"
              >
                Get a Quote
              </button>
            </div>

            {/* 3 Mini Value Props */}
            <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-slate-700" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-slate-700" />
                <span>Premium Print Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-slate-700" />
                <span>Expert Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Storefront Architectural Illustration */}
          <div className="lg:col-span-6">
            <StorefrontHeroCard />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. POPULAR PRODUCTS SECTION (2 Rows of 5 Cards = 10 Items) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Popular Products
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Everything you need to market your business, all in one place.
          </p>
        </div>

        {/* 10-Product Responsive Grid (5 cols on lg desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {popularProductsList.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="group bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
            >
              {/* Card Visual / Mockup Preview */}
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-slate-50">
                {item.renderVisual()}
              </div>

              {/* Title & Arrow Link */}
              <div className="p-3.5 flex items-center justify-between bg-white border-t border-slate-100">
                <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition truncate">
                  {item.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. READY-TO-USE TEMPLATES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4">
        {/* Header row with Title, Filters, and "View All Templates" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              DESIGN MADE EASY
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Ready-to-Use Templates
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl">
              Create stunning designs in minutes with our professional templates. Just customize, order, and we'll take care of the rest.
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 pt-3">
              <button
                onClick={() => setActiveTemplateTab('business-cards')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTemplateTab === 'business-cards'
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Business Cards
              </button>
              <button
                onClick={() => setActiveTemplateTab('flyers')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTemplateTab === 'flyers'
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Flyers
              </button>
              <button
                onClick={() => setActiveTemplateTab('brochures')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTemplateTab === 'brochures'
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Brochures
              </button>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('templates')}
            className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1 cursor-pointer self-start md:self-end"
          >
            <span>View All Templates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Template Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {templatesRow.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setSelectedTemplateId(t.id);
                setCurrentView('template-customizer');
              }}
              className="group cursor-pointer space-y-2"
            >
              <div className="w-full aspect-[1.6/1] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 border border-slate-200">
                {t.preview}
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition">
                  {t.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. HOW IT WORKS SECTION (5 Steps with Numbers & Arrows) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            From design to delivery, we make printing simple.
          </p>
        </div>

        {/* 5-Step Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-3 relative">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm shadow-md">
                1
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700">
                <MousePointer className="w-3 h-3" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Choose a Product</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-[190px]">
                Browse our wide range of printing products.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-3 relative">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm shadow-md">
                2
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700">
                <ImageIcon className="w-3 h-3" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Use a Template or Upload Design</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-[190px]">
                Customize a template or upload your artwork.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-3 relative">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm shadow-md">
                3
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700">
                <ShoppingCart className="w-3 h-3" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Place Your Order</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-[190px]">
                Configure, get instant pricing, and checkout.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center space-y-3 relative">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm shadow-md">
                4
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Approve Your Proof</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-[190px]">
                Review and approve your design.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center text-center space-y-3 relative">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-sm shadow-md">
                5
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700">
                <Truck className="w-3 h-3 text-sky-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">We Print & Deliver</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-[190px]">
                High-quality printing and fast delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. WHY CHOOSE PRINT4COLORS / MORE THAN JUST PRINTING */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-1 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            WHY CHOOSE PRINT4COLORS
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            More Than Just Printing
          </h2>
        </div>

        {/* 5 Columns / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Card 1: Premium Quality */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Premium Quality</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Vibrant colors and professional results.
            </p>
          </div>

          {/* Card 2: Fast Turnaround */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-xs">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Fast Turnaround</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Get your prints when you need them.
            </p>
          </div>

          {/* Card 3: Secure Ordering */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Secure Ordering</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Your files and data are safe with us.
            </p>
          </div>

          {/* Card 4: Expert Support */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-xs">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Expert Support</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Real people, ready to help.
            </p>
          </div>

          {/* Card 5: Eco-Friendly Options */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-xs">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Eco-Friendly Options</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Sustainable printing for a better tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. TRUSTED BY BUSINESSES LIKE YOURS (Testimonials) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Trusted by Businesses Like Yours
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Thousands of businesses rely on <span className="font-semibold text-slate-800">Print4Colors</span> for their printing needs.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sarah Mitchell */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-md transition space-y-4">
            <p className="text-slate-700 text-sm italic leading-relaxed">
              "Amazing quality and fast service! Our business cards look fantastic."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                SM
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-xs">Sarah Mitchell</div>
                <div className="text-[11px] text-slate-500 truncate">Small Business Owner</div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </div>

          {/* James Carter */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-md transition space-y-4">
            <p className="text-slate-700 text-sm italic leading-relaxed">
              "Easy to use templates and the print quality exceeded our expectations."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                JC
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-xs">James Carter</div>
                <div className="text-[11px] text-slate-500 truncate">Marketing Manager</div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </div>

          {/* Priya Sharma */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-md transition space-y-4">
            <p className="text-slate-700 text-sm italic leading-relaxed">
              "Great customer support and on-time delivery. Highly recommend!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                PS
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-xs">Priya Sharma</div>
                <div className="text-[11px] text-slate-500 truncate">Entrepreneur</div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. PRE-FOOTER CTA BANNER (Dark Navy with CMYK Wave Accents) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#0B132B] text-white py-14 px-4 my-8">
        {/* Colorful Abstract CMYK Wave Ribbons on the edges matching mockup */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#009FE3]/30 via-[#E6007E]/20 to-transparent pointer-events-none blur-xl" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#FFED00]/30 via-[#E6007E]/20 to-transparent pointer-events-none blur-xl" />

        {/* Decorative CMYK shapes on edges */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-28 h-48 rounded-full bg-gradient-to-br from-cyan-400 via-pink-500 to-amber-400 opacity-60 blur-md pointer-events-none" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-28 h-48 rounded-full bg-gradient-to-bl from-amber-400 via-pink-500 to-cyan-400 opacity-60 blur-md pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
              READY TO GET STARTED?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Let's Print Something Amazing
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Your business deserves great print. Start your order today!
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setCurrentView('catalog');
              }}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
