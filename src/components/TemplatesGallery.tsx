import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { Sparkles, Layers, ArrowRight, Check, Search } from 'lucide-react';
import { Template } from '../types/print';

export const TemplatesGallery: React.FC = () => {
  const { templates, setSelectedTemplateId, setCurrentView } = usePrintStore();
  const [filter, setFilter] = useState<'all' | 'business-cards' | 'flyers' | 'brochures'>('all');
  const [search, setSearch] = useState('');

  const filtered = templates.filter((t) => {
    const matchesFilter = filter === 'all' || t.category === filter;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.categoryLabel.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplateId(template.id);
    setCurrentView('template-customizer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          15 Free Commercial Print Templates
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Select a Template & Customize Online
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Need artwork quickly without starting from scratch? Choose any of our 15 professionally formatted templates for Business Cards, Flyers, and Folded Brochures. Customize text, colors, and your logo in seconds.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Templates (15)
          </button>
          <button
            onClick={() => setFilter('business-cards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              filter === 'business-cards'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Business Cards (5)
          </button>
          <button
            onClick={() => setFilter('flyers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              filter === 'flyers'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Flyers (5)
          </button>
          <button
            onClick={() => setFilter('brochures')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              filter === 'brochures'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Brochures (5)
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Thumbnail Mockup */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={t.thumbnail}
                alt={t.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-black text-slate-800 shadow-xs">
                {t.categoryLabel}
              </div>
              <div
                className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-white shadow-xs"
                style={{ backgroundColor: t.defaultData.primaryColor }}
                title="Primary Color Motif"
              ></div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-sky-600 transition">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {t.description}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 font-medium">
                  Default: <span className="font-semibold text-slate-700">{t.defaultData.businessName}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                  <Check className="w-3.5 h-3.5 mr-0.5" /> Free with Print
                </span>
                <button
                  onClick={() => handleSelectTemplate(t)}
                  className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Customize</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
