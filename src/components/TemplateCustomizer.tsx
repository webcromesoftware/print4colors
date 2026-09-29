import React, { useState, useEffect } from 'react';
import {
  Template,
  TemplateCustomization,
  ConfiguredItem,
  ProductSize,
  ProductStock,
  TurnaroundOption
} from '../types/print';
import { TURNAROUND_OPTIONS } from '../data/mockData';
import { usePrintStore } from '../context/PrintStore';
import {
  Sparkles,
  Layers,
  Eye,
  RotateCw,
  Check,
  ArrowLeft,
  ArrowRight,
  Download,
  Palette,
  Image as ImageIcon,
  Shield,
  Smartphone,
  Globe,
  Mail,
  MapPin,
  Building,
  User,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface Props {
  initialTemplateId?: string | null;
  onBack: () => void;
}

export const TemplateCustomizer: React.FC<Props> = ({ initialTemplateId, onBack }) => {
  const { templates, addToCart, showToast, setCurrentView } = usePrintStore();

  // Selected template
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(() => {
    if (initialTemplateId) {
      const match = templates.find((t) => t.id === initialTemplateId);
      if (match) return match;
    }
    return templates[0];
  });

  // Customization fields
  const [customData, setCustomData] = useState<TemplateCustomization>(selectedTemplate.defaultData);

  // Active view: 'front' | 'back'
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

  // Print guides toggle
  const [showGuides, setShowGuides] = useState(true);

  // Quick quantity & options for adding to cart
  const [orderQty, setOrderQty] = useState(500);
  const [orderStock, setOrderStock] = useState('16pt Premium Heavyweight Cover');
  const [orderFinish, setOrderFinish] = useState('Dull Matte Finish');

  useEffect(() => {
    if (initialTemplateId) {
      const match = templates.find((t) => t.id === initialTemplateId);
      if (match) {
        setSelectedTemplate(match);
        setCustomData(match.defaultData);
      }
    }
  }, [initialTemplateId, templates]);

  const handleTemplateSwitch = (tmpl: Template) => {
    setSelectedTemplate(tmpl);
    setCustomData(tmpl.defaultData);
  };

  const handleInputChange = (field: keyof TemplateCustomization, value: string) => {
    setCustomData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setCustomData((prev) => ({
            ...prev,
            logoUrl: uploadEvent.target?.result as string,
          }));
          showToast('Custom logo uploaded!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add customized design to Cart
  const handleSaveAndAddToCart = () => {
    const isCard = selectedTemplate.category === 'business-cards';
    const isFlyer = selectedTemplate.category === 'flyers';

    const mockSize: ProductSize = isCard
      ? { id: 'std-2x35', name: 'Standard (2" x 3.5")', dimensions: '2" x 3.5"', widthInches: 3.5, heightInches: 2.0, basePrice: 19.99 }
      : isFlyer
      ? { id: 'fl-5x7', name: '5" x 7" Flyer', dimensions: '5" x 7"', widthInches: 5, heightInches: 7, basePrice: 36.00 }
      : { id: 'br-85x11', name: '8.5" x 11" Brochure', dimensions: '8.5" x 11"', widthInches: 8.5, heightInches: 11, basePrice: 54.00 };

    const mockStock: ProductStock = {
      id: 'custom-stock',
      name: orderStock,
      description: 'Selected during template customization',
      multiplier: 1.0,
    };

    const calculatedPrice = isCard
      ? Math.round((24.99 + (orderQty > 250 ? orderQty * 0.04 : 0)) * 100) / 100
      : isFlyer
      ? Math.round((45.00 + (orderQty > 250 ? orderQty * 0.08 : 0)) * 100) / 100
      : Math.round((85.00 + (orderQty > 250 ? orderQty * 0.14 : 0)) * 100) / 100;

    const newItem: ConfiguredItem = {
      id: `tmpl-item-${Date.now()}`,
      productId: isCard ? 'prod-bc-standard' : isFlyer ? 'prod-flyers' : 'prod-brochures',
      productName: `${selectedTemplate.name} (${selectedTemplate.categoryLabel})`,
      category: isCard ? 'business-cards' : 'marketing',
      imageUrl: selectedTemplate.thumbnail,
      size: mockSize,
      stock: mockStock,
      coating: { id: 'finish-custom', name: orderFinish, priceDelta: 0 },
      sides: { id: '4-4', name: 'Full Color Both Sides (4/4)', multiplier: 1.0 },
      quantity: orderQty,
      turnaround: TURNAROUND_OPTIONS[0],
      unitPrice: Math.round((calculatedPrice / orderQty) * 1000) / 1000,
      totalPrice: calculatedPrice,
      artworkType: 'template',
      templateData: customData,
      customerNotes: `Customized with Print4Colors Online Template Editor (${selectedTemplate.name}).`,
    };

    addToCart(newItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                Phase 1 Template Studio
              </span>
              <span className="text-xs text-slate-500 font-medium">15 Pre-Configured Formats</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Customize "{selectedTemplate.name}"
            </h1>
          </div>
        </div>

        {/* Quick Guide Overlay Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowGuides(!showGuides)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer flex items-center gap-1.5 ${
              showGuides
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>{showGuides ? 'Print Bleed & Trim Guides: ON' : 'Print Guides: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Configuration Form (5 cols), Right Live Canvas (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Customization Inputs Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Template Quick Switcher Tabs */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select from 15 Available Templates
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {templates.map((t) => {
                const isActive = t.id === selectedTemplate.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateSwitch(t)}
                    className={`shrink-0 px-3 py-2 rounded-xl text-left border text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.defaultData.primaryColor }}></span>
                    <span className="whitespace-nowrap">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields as defined in PDF specs */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Text & Contact Information</span>
              <span className="text-xs text-sky-600 font-semibold">Updates live in canvas</span>
            </h3>

            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                Business / Organization Name
              </label>
              <input
                type="text"
                value={customData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-slate-900"
              />
            </div>

            {/* Name & Job Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Contact Person Name
                </label>
                <input
                  type="text"
                  value={customData.personName}
                  onChange={(e) => handleInputChange('personName', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title / Specialty</label>
                <input
                  type="text"
                  value={customData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  Phone Number
                </label>
                <input
                  type="text"
                  value={customData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address
                </label>
                <input
                  type="text"
                  value={customData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            {/* Website & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Website URL
                </label>
                <input
                  type="text"
                  value={customData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Physical Address / City
                </label>
                <input
                  type="text"
                  value={customData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            {/* Tagline & Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Tagline / Subtitle</label>
              <input
                type="text"
                value={customData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Headline Text</label>
              <input
                type="text"
                value={customData.headline}
                onChange={(e) => handleInputChange('headline', e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Main Body / Description</label>
              <textarea
                rows={2}
                value={customData.descriptionText}
                onChange={(e) => handleInputChange('descriptionText', e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
              />
            </div>

            {/* Bullets if applicable */}
            {(customData.bullet1 || selectedTemplate.category !== 'business-cards') && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">Features / Bullets</label>
                <input
                  type="text"
                  placeholder="Key highlight 1"
                  value={customData.bullet1 || ''}
                  onChange={(e) => handleInputChange('bullet1', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Key highlight 2"
                  value={customData.bullet2 || ''}
                  onChange={(e) => handleInputChange('bullet2', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Key highlight 3"
                  value={customData.bullet3 || ''}
                  onChange={(e) => handleInputChange('bullet3', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Color Schemes & Logo Upload */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-rose-500" />
              Brand Colors & Logo Asset
            </h3>

            {/* Color Pickers */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customData.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                  />
                  <span className="text-xs text-slate-600 font-mono">{customData.primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Secondary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customData.secondaryColor}
                    onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                  />
                  <span className="text-xs text-slate-600 font-mono">{customData.secondaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Accent Accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customData.accentColor}
                    onChange={(e) => handleInputChange('accentColor', e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                  />
                  <span className="text-xs text-slate-600 font-mono">{customData.accentColor}</span>
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Upload Company Logo (Optional)</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="template-logo-file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="template-logo-file"
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer transition flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Choose Image File
                </label>
                {customData.logoUrl && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Logo Loaded
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Live Canvas Preview & Add to Cart (7 cols) */}
        <div className="lg:col-span-7 sticky top-28 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl space-y-4">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Interactive Live Print Canvas
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  CMYK Simulation
                </span>
              </div>

              {/* Front / Back Switcher */}
              <div className="flex items-center bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setActiveSide('front')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeSide === 'front' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Front Side
                </button>
                <button
                  onClick={() => setActiveSide('back')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeSide === 'back' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Back Side
                </button>
              </div>
            </div>

            {/* The Live Render Canvas Container */}
            <div className="relative p-6 sm:p-10 bg-slate-950/60 rounded-xl flex items-center justify-center min-h-[380px] overflow-hidden">
              {/* Guides Legend */}
              {showGuides && (
                <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-2 text-[10px] bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-700 text-slate-300">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-rose-500 border border-rose-400 inline-block"></span> 0.125" Bleed
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-white inline-block"></span> Cut Trim
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-emerald-400 border-dashed border inline-block"></span> Safe Zone
                  </span>
                </div>
              )}

              {/* RENDERED PRINT CANVAS MOCKUP */}
              <div
                className={`relative transition-all duration-300 shadow-2xl overflow-hidden select-none ${
                  selectedTemplate.category === 'business-cards'
                    ? 'w-full max-w-[460px] aspect-[7/4] rounded-lg'
                    : selectedTemplate.category === 'flyers'
                    ? 'w-full max-w-[380px] aspect-[5/7] rounded-lg'
                    : 'w-full max-w-[500px] aspect-[8.5/11] rounded-lg'
                }`}
                style={{
                  backgroundColor:
                    activeSide === 'front'
                      ? '#ffffff'
                      : customData.primaryColor,
                  color: activeSide === 'front' ? '#0f172a' : '#ffffff',
                }}
              >
                {/* Visual Bleed & Margin Lines */}
                {showGuides && (
                  <>
                    <div className="absolute inset-0 border-2 border-dashed border-rose-500/60 pointer-events-none z-10"></div>
                    <div className="absolute inset-2 border border-slate-400/50 pointer-events-none z-10"></div>
                    <div className="absolute inset-4 border border-dashed border-emerald-500/60 pointer-events-none z-10"></div>
                  </>
                )}

                {/* --- FRONT SIDE CONTENT --- */}
                {activeSide === 'front' && (
                  <div className="relative w-full h-full p-6 flex flex-col justify-between">
                    {/* Top Header / Branding Bar */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {customData.logoUrl ? (
                          <img
                            src={customData.logoUrl}
                            alt="Logo"
                            className="h-9 w-auto object-contain mb-1 rounded"
                          />
                        ) : (
                          <div
                            className="font-black tracking-tight text-lg uppercase flex items-center gap-1.5"
                            style={{ color: customData.primaryColor }}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-sm rotate-45 inline-block"
                              style={{ backgroundColor: customData.secondaryColor }}
                            ></span>
                            {customData.businessName}
                          </div>
                        )}
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          {customData.tagline}
                        </p>
                      </div>

                      {customData.badgeText && (
                        <span
                          className="text-[9px] font-black uppercase px-2 py-0.5 rounded text-white shadow-2xs"
                          style={{ backgroundColor: customData.secondaryColor }}
                        >
                          {customData.badgeText}
                        </span>
                      )}
                    </div>

                    {/* Middle Graphic / Headline */}
                    <div className="my-auto py-2">
                      <h4
                        className="text-sm sm:text-base font-extrabold tracking-tight leading-snug"
                        style={{ color: customData.primaryColor }}
                      >
                        {customData.headline}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {customData.descriptionText}
                      </p>

                      {/* Optional Bullets */}
                      {customData.bullet1 && (
                        <div className="mt-2 space-y-1 text-[10px] text-slate-700 font-medium">
                          <div className="flex items-center gap-1">
                            <span style={{ color: customData.secondaryColor }}>✓</span>
                            <span>{customData.bullet1}</span>
                          </div>
                          {customData.bullet2 && (
                            <div className="flex items-center gap-1">
                              <span style={{ color: customData.secondaryColor }}>✓</span>
                              <span>{customData.bullet2}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Contact Strip */}
                    <div
                      className="pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-700"
                      style={{ borderColor: customData.accentColor }}
                    >
                      <div>
                        <div className="font-extrabold text-slate-900 text-xs">{customData.personName}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">{customData.jobTitle}</div>
                      </div>
                      <div className="text-right space-y-0.5">
                        <div className="font-bold text-slate-900">{customData.phone}</div>
                        <div className="text-slate-600 font-medium">{customData.website}</div>
                      </div>
                    </div>

                    {/* CMYK Signature Brush bottom decor if creative color template */}
                    {selectedTemplate.id === 'tmpl-bc-creative-color' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-rose-500 to-amber-400"></div>
                    )}
                  </div>
                )}

                {/* --- BACK SIDE CONTENT --- */}
                {activeSide === 'back' && (
                  <div className="relative w-full h-full p-8 flex flex-col items-center justify-center text-center text-white">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl mb-3 shadow-md border border-white/20"
                      style={{ backgroundColor: customData.secondaryColor }}
                    >
                      {customData.businessName.charAt(0)}
                    </div>
                    <div className="text-lg font-black tracking-tight">{customData.businessName}</div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mt-1"
                      style={{ color: customData.accentColor }}
                    >
                      {customData.tagline}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10 w-full max-w-[260px] text-[10px] text-slate-300 space-y-1">
                      <div>{customData.address}</div>
                      <div className="font-bold text-white">{customData.email}</div>
                      <div className="font-mono text-cyan-300">{customData.website}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Specs & Add to Cart Box */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">Production Quantity:</label>
                  <select
                    value={orderQty}
                    onChange={(e) => setOrderQty(Number(e.target.value))}
                    className="w-full bg-slate-800 text-white rounded-lg p-2 font-bold border border-slate-700"
                  >
                    <option value={250}>250 units</option>
                    <option value={500}>500 units (Standard)</option>
                    <option value={1000}>1,000 units (Best Value)</option>
                    <option value={2500}>2,500 units (Commercial)</option>
                    <option value={5000}>5,000 units (Bulk)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">Stock & Paper Coating:</label>
                  <select
                    value={orderFinish}
                    onChange={(e) => setOrderFinish(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-lg p-2 font-bold border border-slate-700"
                  >
                    <option value="Dull Matte Finish">16pt Cover - Silk Matte</option>
                    <option value="High Gloss UV">16pt Cover - High Gloss UV</option>
                    <option value="Velvet Soft-Touch">19pt Velvet Soft-Touch</option>
                    <option value="100lb Gloss Book">100lb Gloss Book (Flyers)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleSaveAndAddToCart}
                  className="flex-1 py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Add Customized Design to Cart</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                You will receive a high-resolution PDF proof to approve before printing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
