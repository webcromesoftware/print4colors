import React, { useState, useMemo } from 'react';
import {
  Check,
  UploadCloud,
  FileCheck2,
  Calendar,
  Truck,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Info,
  Palette,
  AlertCircle,
  Eye,
  RotateCcw,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  FileText,
  Heart,
  ChevronDown
} from 'lucide-react';
import {
  Product,
  ConfiguredItem,
  ProductSize,
  ProductStock,
  ProductOption,
  TurnaroundOption
} from '../types/print';
import { TURNAROUND_OPTIONS } from '../data/mockData';
import { usePrintStore } from '../context/PrintStore';

interface Props {
  product: Product;
  onBackToCatalog: () => void;
}

export const ProductConfigurator: React.FC<Props> = ({ product, onBackToCatalog }) => {
  const {
    addToCart,
    setCurrentView,
    setSelectedTemplateId,
    templates,
    setIsGuidelinesOpen,
    setIsQuoteModalOpen,
    showToast
  } = usePrintStore();

  // Top Tab Switcher: 'options' (Product Options) vs 'shipping' (Sets & Shipping)
  const [activeTab, setActiveTab] = useState<'options' | 'shipping'>('options');

  // Bottom Info Tab Switcher: 'description' | 'specs' | 'templates' | 'faqs'
  const [infoTab, setInfoTab] = useState<'description' | 'specs' | 'templates' | 'faqs'>('description');

  // Image Gallery Carousel
  const galleryImages = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images;
    return [product.imageUrl];
  }, [product]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form Fields
  const [projectName, setProjectName] = useState('');
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [selectedStock, setSelectedStock] = useState<ProductStock>(product.stocks[0]);
  const [selectedSides, setSelectedSides] = useState(product.sides[0]);
  const [selectedCoating, setSelectedCoating] = useState<ProductOption>(product.coatings[0]);

  // Optional Enhancements (Dual-Raised / Specialty fields)
  const [selectedLamination, setSelectedLamination] = useState<ProductOption | undefined>(
    product.laminationOptions ? product.laminationOptions[0] : undefined
  );
  const [selectedFoilColor, setSelectedFoilColor] = useState<ProductOption | undefined>(
    product.foilColors ? product.foilColors[0] : undefined
  );
  const [selectedSecondRaisedColor, setSelectedSecondRaisedColor] = useState<ProductOption | undefined>(
    product.secondRaisedColors ? product.secondRaisedColors[0] : undefined
  );
  const [selectedRaisedFoilSide, setSelectedRaisedFoilSide] = useState<string>(
    product.raisedFoilSides ? product.raisedFoilSides[0].name : 'Front Only'
  );
  const [selectedRaisedSpotUvSide, setSelectedRaisedSpotUvSide] = useState<string>(
    product.raisedSpotUvSides ? product.raisedSpotUvSides[0].name : 'Front Only'
  );
  const [selectedRaisedSpotUvHeight, setSelectedRaisedSpotUvHeight] = useState<string>(
    product.raisedSpotUvHeights ? product.raisedSpotUvHeights[0].name : '50 Micron Raised High-Gloss'
  );

  const [selectedCorner, setSelectedCorner] = useState(product.corners ? product.corners[0] : undefined);
  const [selectedFolding, setSelectedFolding] = useState(product.folding ? product.folding[0] : undefined);

  // Additional Checkbox Options
  const [includeJobSamples, setIncludeJobSamples] = useState(false);
  const [includeDigitalProofs, setIncludeDigitalProofs] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sets & Shipping states
  const [selectedQty, setSelectedQty] = useState<number>(product.quantities[1] || product.quantities[0]);
  const [selectedTurnaround, setSelectedTurnaround] = useState<TurnaroundOption>(TURNAROUND_OPTIONS[0]);
  const [zipCode, setZipCode] = useState('90210');

  // Artwork & Preflight
  const [artworkTab, setArtworkTab] = useState<'upload' | 'template' | 'design_service'>('upload');
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    url: string;
    previewUrl?: string;
    uploadDate: string;
  } | null>(null);
  const [customerNotes, setCustomerNotes] = useState('');
  const [isPreflightInspected, setIsPreflightInspected] = useState(false);

  // Pricing Engine
  const pricing = useMemo(() => {
    const baseTotal = selectedSize.basePrice * (selectedQty / (product.quantities[0] || 100));

    // Volume discount curve
    let qtyDiscountFactor = 1.0;
    if (selectedQty >= 5000) qtyDiscountFactor = 0.55;
    else if (selectedQty >= 2500) qtyDiscountFactor = 0.65;
    else if (selectedQty >= 1000) qtyDiscountFactor = 0.75;
    else if (selectedQty >= 500) qtyDiscountFactor = 0.85;
    else if (selectedQty >= 250) qtyDiscountFactor = 0.92;

    const stockMultiplier = selectedStock.multiplier || 1.0;
    const sidesMultiplier = selectedSides.multiplier || 1.0;

    // Addon fees
    const coatingAddon = (selectedCoating?.priceDelta || 0) * (selectedQty > 100 ? Math.log10(selectedQty) * 1.5 : 1);
    const laminationAddon = (selectedLamination?.priceDelta || 0);
    const foilAddon = selectedFoilColor ? selectedFoilColor.priceDelta : 0;
    const secondRaisedAddon = selectedSecondRaisedColor ? selectedSecondRaisedColor.priceDelta : 0;
    const cornerAddon = selectedCorner ? selectedCorner.price : 0;
    const foldingAddon = selectedFolding ? selectedFolding.price : 0;
    const samplesFee = includeJobSamples ? 9.99 : 0;
    const proofFee = includeDigitalProofs ? 5.0 : 0;

    let subtotal =
      baseTotal * qtyDiscountFactor * stockMultiplier * sidesMultiplier +
      coatingAddon +
      laminationAddon +
      foilAddon +
      secondRaisedAddon +
      cornerAddon +
      foldingAddon +
      samplesFee +
      proofFee;

    if (artworkTab === 'design_service') {
      subtotal += 29.99;
    }

    const rushAdjustment = subtotal * selectedTurnaround.rushFeePercentage;
    const calculatedTotal = Math.max(product.startingPrice, Math.round((subtotal + rushAdjustment) * 100) / 100);
    const unitCost = Math.round((calculatedTotal / selectedQty) * 1000) / 1000;

    return {
      total: calculatedTotal,
      unitCost,
      subtotal: Math.round(subtotal * 100) / 100,
      rushAdjustment: Math.round(rushAdjustment * 100) / 100,
      samplesFee,
      proofFee,
      foilAddon,
      secondRaisedAddon,
      estimatedShipDate: getEstimatedDelivery(selectedTurnaround.days),
    };
  }, [
    selectedSize,
    selectedStock,
    selectedSides,
    selectedCoating,
    selectedLamination,
    selectedFoilColor,
    selectedSecondRaisedColor,
    selectedCorner,
    selectedFolding,
    includeJobSamples,
    includeDigitalProofs,
    selectedQty,
    selectedTurnaround,
    artworkTab,
    product,
  ]);

  function getEstimatedDelivery(daysStr: string) {
    let daysToAdd = 3;
    if (daysStr.includes('Today')) daysToAdd = 1;
    else if (daysStr.includes('1 Day')) daysToAdd = 2;
    else if (daysStr.includes('4-5 Days')) daysToAdd = 5;

    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // File Upload Preflight handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const mockUrl = isImage ? URL.createObjectURL(file) : product.imageUrl;
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        url: mockUrl,
        previewUrl: mockUrl,
        uploadDate: new Date().toLocaleTimeString(),
      });
      setIsPreflightInspected(true);
      showToast(`Artwork "${file.name}" uploaded! Preflight verified 300 DPI CMYK.`, 'success');
    }
  };

  const handleStartOver = () => {
    setProjectName('');
    setSelectedSize(product.sizes[0]);
    setSelectedStock(product.stocks[0]);
    setSelectedSides(product.sides[0]);
    setSelectedCoating(product.coatings[0]);
    if (product.laminationOptions) setSelectedLamination(product.laminationOptions[0]);
    if (product.foilColors) setSelectedFoilColor(product.foilColors[0]);
    if (product.secondRaisedColors) setSelectedSecondRaisedColor(product.secondRaisedColors[0]);
    setIncludeJobSamples(false);
    setIncludeDigitalProofs(false);
    setUploadedFile(null);
    setIsPreflightInspected(false);
    setActiveTab('options');
    showToast('Options reset to defaults', 'info');
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    showToast(!isFavorited ? 'Added to your favorites!' : 'Removed from favorites', 'success');
  };

  const handleAddToCart = () => {
    const item: ConfiguredItem = {
      id: `cfg-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      category: product.category,
      imageUrl: uploadedFile?.previewUrl || product.imageUrl,
      projectName: projectName.trim() || undefined,
      size: selectedSize,
      stock: selectedStock,
      coating: selectedCoating,
      lamination: selectedLamination,
      foilColor: selectedFoilColor,
      secondRaisedColor: selectedSecondRaisedColor,
      raisedFoilSide: selectedRaisedFoilSide,
      raisedSpotUvSide: selectedRaisedSpotUvSide,
      raisedSpotUvHeight: selectedRaisedSpotUvHeight,
      includeJobSamples,
      includeDigitalProofs,
      sides: selectedSides,
      corner: selectedCorner,
      folding: selectedFolding,
      quantity: selectedQty,
      turnaround: selectedTurnaround,
      unitPrice: pricing.unitCost,
      totalPrice: pricing.total,
      artworkType: artworkTab,
      artworkFile: uploadedFile || undefined,
      customerNotes: customerNotes.trim() || undefined,
    };

    addToCart(item);
  };

  // Find matching templates
  const matchingTemplates = templates.filter((t) => {
    if (product.category === 'business-cards') return t.category === 'business-cards';
    if (product.category === 'marketing') return t.category === 'flyers' || t.category === 'brochures';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Breadcrumb & Product Code Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <nav className="flex items-center text-xs text-slate-500 mb-1 space-x-1.5 font-medium">
              <button onClick={onBackToCatalog} className="hover:text-blue-600 transition cursor-pointer">
                Home
              </button>
              <span>&gt;</span>
              <button onClick={onBackToCatalog} className="hover:text-blue-600 transition cursor-pointer">
                {product.categoryName}
              </button>
              <span>&gt;</span>
              <span className="text-slate-800 font-bold">{product.name}</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              {product.pdpCode || `PDP: ${product.slug}`}
            </p>
          </div>

          <button
            onClick={handleStartOver}
            className="flex items-center gap-1.5 text-xs font-black text-rose-600 hover:text-rose-700 uppercase tracking-wider transition cursor-pointer px-3 py-1.5 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            START OVER
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            LEFT COLUMN (7 COLS): Media Gallery, Custom Estimate, Info Tabs
        ========================================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Media Gallery */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
            <div className="relative group overflow-hidden rounded-xl bg-slate-50 aspect-4/3 flex items-center justify-center border border-slate-100">
              <img
                src={galleryImages[activeImageIndex] || product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center transition duration-300 group-hover:scale-105"
              />

              {/* Prev / Next Carousel Controls */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 transition cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 transition cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center justify-center gap-3 pt-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* "Not finding what you're looking for?" Promo Banner */}
          <div className="bg-slate-100/90 border border-slate-200 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <span className="text-xs sm:text-sm font-semibold italic text-slate-700">
              Not finding what you're looking for?
            </span>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-md transition shadow-xs cursor-pointer whitespace-nowrap"
            >
              Get A Custom Estimate
            </button>
          </div>

          {/* Tab Navigation: Description / Specs / Templates / FAQs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex border-b border-slate-200 bg-slate-50/70 text-xs font-bold">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specs', label: 'Specs' },
                { id: 'templates', label: 'Templates' },
                { id: 'faqs', label: 'FAQs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInfoTab(tab.id as any)}
                  className={`flex-1 py-3.5 px-4 text-center transition cursor-pointer border-b-2 ${
                    infoTab === tab.id
                      ? 'border-[#f24f13] text-slate-900 font-black bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-6 text-xs text-slate-600 leading-relaxed space-y-4">
              {infoTab === 'description' && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-800">
                    {product.description.split('\n\n')[0]}
                  </p>

                  <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 space-y-2">
                    <p className="font-bold">
                      <span className="text-amber-700">Note:</span> Unique dual metallic embellishments are available in gold and silver foil, gold or silver foil coupled with holographic foil, gold or silver foil coupled with raised spot UV, and holographic foil coupled with raised spot UV.
                    </p>
                    <p className="text-[11px] text-amber-800">
                      <span className="font-bold">Design Note:</span> When preparing your design, ensure that the two types of embellishments are placed in separate areas and do not overlap.
                    </p>
                  </div>

                  {product.uses && product.uses.length > 0 && (
                    <div className="pt-2">
                      <h3 className="text-base font-black text-slate-900 mb-2.5">
                        {product.name} Uses
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                        {product.uses.map((use, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block"></span>
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {infoTab === 'specs' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Prepress File Preparation Guidelines</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-0.5">Bleed & Safe Margins</span>
                      <p className="text-[11px] text-slate-500">
                        Include 1/8" (0.125") bleed on all 4 sides. Keep critical text & logos at least 1/8" inside the trim line.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-0.5">Resolution & Color Mode</span>
                      <p className="text-[11px] text-slate-500">
                        300 DPI at 100% finished dimensions. Convert all RGB images to CMYK (ISO 12647-2 Master Press).
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-0.5">Embellishment Mask Files</span>
                      <p className="text-[11px] text-slate-500">
                        Provide a separate page/layer for Foil & Raised Spot UV masks formatted as 100% K (Black vector art).
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-0.5">Supported File Formats</span>
                      <p className="text-[11px] text-slate-500">
                        PDF/X-1a (Recommended), high-res TIFF, EPS, Adobe Illustrator (AI with outlined fonts).
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsGuidelinesOpen(true)}
                    className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:underline text-xs cursor-pointer"
                  >
                    <FileText className="w-4 h-4" /> View Full Artwork Preflight Checklist
                  </button>
                </div>
              )}

              {infoTab === 'templates' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Download Blank Setup Templates</h4>
                  <p className="text-xs text-slate-600">
                    Use our verified commercial grid templates with pre-configured bleeds, trims, and safe zones.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {['PDF Vector Template', 'Adobe Illustrator (.AI)', 'Photoshop (.PSD)', 'InDesign (.INDD)'].map(
                      (item, i) => (
                        <button
                          key={i}
                          onClick={() => showToast(`Downloaded ${item} for ${product.name}!`, 'info')}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {infoTab === 'faqs' && (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-bold text-slate-900">What makes Dual-Raised cards unique?</h5>
                    <p className="text-slate-600 text-xs mt-0.5">
                      They combine tactile raised foil and 50-micron high-gloss raised UV on top of a velvety suede laminate for multi-dimensional contrast.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Can foil and raised spot UV overlap?</h5>
                    <p className="text-slate-600 text-xs mt-0.5">
                      No. Embellishments must be in distinct areas to prevent adhesion failure on high-speed presses.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">What is the standard production turnaround?</h5>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Standard production is 3-5 business days. Next-day rush options are available during checkout.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (5 COLS): The Backend Configurator (Product Options vs Sets & Shipping)
        ========================================================================== */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Top 2-Tab Header: Product Options vs Sets & Shipping */}
            <div className="grid grid-cols-2 text-center text-xs sm:text-sm font-bold border-b border-slate-200">
              <button
                onClick={() => setActiveTab('options')}
                className={`py-3.5 px-4 transition cursor-pointer ${
                  activeTab === 'options'
                    ? 'bg-[#2b2f3a] text-white font-extrabold shadow-inner'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Product Options
              </button>

              <button
                onClick={() => setActiveTab('shipping')}
                className={`py-3.5 px-4 transition cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'bg-[#2b2f3a] text-white font-extrabold shadow-inner'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Sets &amp; Shipping
              </button>
            </div>

            {/* TAB 1: PRODUCT OPTIONS */}
            {activeTab === 'options' && (
              <div className="p-5 sm:p-6 space-y-4 text-xs">
                {/* PROJECT NAME / P.O. * */}
                <div className="space-y-1">
                  <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                    PROJECT NAME / P.O. <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Name Your Project"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* SIZE * */}
                <div className="space-y-1">
                  <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                    SIZE <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSize.id}
                      onChange={(e) => {
                        const found = product.sizes.find((s) => s.id === e.target.value);
                        if (found) setSelectedSize(found);
                      }}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                    >
                      {product.sizes.map((sz) => (
                        <option key={sz.id} value={sz.id}>
                          {sz.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* STOCK * */}
                <div className="space-y-1">
                  <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                    STOCK <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStock.id}
                      onChange={(e) => {
                        const found = product.stocks.find((s) => s.id === e.target.value);
                        if (found) setSelectedStock(found);
                      }}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                    >
                      {product.stocks.map((stk) => (
                        <option key={stk.id} value={stk.id}>
                          {stk.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* COLORSPEC * */}
                <div className="space-y-1">
                  <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                    COLORSPEC <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSides.id}
                      onChange={(e) => {
                        const found = product.sides.find((s) => s.id === e.target.value);
                        if (found) setSelectedSides(found);
                      }}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                    >
                      {product.sides.map((sd) => (
                        <option key={sd.id} value={sd.id}>
                          {sd.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* COATING * */}
                <div className="space-y-1">
                  <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                    COATING <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCoating.id}
                      onChange={(e) => {
                        const found = product.coatings.find((c) => c.id === e.target.value);
                        if (found) setSelectedCoating(found);
                      }}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                    >
                      {product.coatings.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* LAMINATION * (if applicable) */}
                {product.laminationOptions && (
                  <div className="space-y-1">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                      LAMINATION <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLamination?.id}
                        onChange={(e) => {
                          const found = product.laminationOptions?.find((l) => l.id === e.target.value);
                          if (found) setSelectedLamination(found);
                        }}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                      >
                        {product.laminationOptions.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* FOIL COLOR * (if applicable) */}
                {product.foilColors && (
                  <div className="space-y-1">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                      FOIL COLOR <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedFoilColor?.id}
                        onChange={(e) => {
                          const found = product.foilColors?.find((f) => f.id === e.target.value);
                          if (found) setSelectedFoilColor(found);
                        }}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                      >
                        {product.foilColors.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* SECOND RAISED COLOR * (if applicable) */}
                {product.secondRaisedColors && (
                  <div className="space-y-1">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                      SECOND RAISED COLOR <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedSecondRaisedColor?.id}
                        onChange={(e) => {
                          const found = product.secondRaisedColors?.find((s) => s.id === e.target.value);
                          if (found) setSelectedSecondRaisedColor(found);
                        }}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                      >
                        {product.secondRaisedColors.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* RAISED FOIL SIDE * (if applicable) */}
                {product.raisedFoilSides && (
                  <div className="space-y-1">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                      RAISED FOIL SIDE <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRaisedFoilSide}
                        onChange={(e) => setSelectedRaisedFoilSide(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                      >
                        {product.raisedFoilSides.map((r) => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* RAISED SPOT UV SIDE * (if applicable) */}
                {product.raisedSpotUvSides && (
                  <div className="space-y-1">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                      RAISED SPOT UV SIDE <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRaisedSpotUvSide}
                        onChange={(e) => setSelectedRaisedSpotUvSide(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                      >
                        {product.raisedSpotUvSides.map((r) => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* RAISED SPOT UV HEIGHT * (if applicable) */}
                {product.raisedSpotUvHeights && (
                  <div className="space-y-1">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                      RAISED SPOT UV HEIGHT <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRaisedSpotUvHeight}
                        onChange={(e) => setSelectedRaisedSpotUvHeight(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                      >
                        {product.raisedSpotUvHeights.map((h) => (
                          <option key={h.id} value={h.name}>
                            {h.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* CORNERS (if applicable) */}
                {product.corners && (
                  <div className="space-y-1">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                      CORNERS
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCorner?.id}
                        onChange={(e) => {
                          const found = product.corners?.find((c) => c.id === e.target.value);
                          if (found) setSelectedCorner(found);
                        }}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-8 cursor-pointer"
                      >
                        {product.corners.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} {c.price > 0 ? `(+$${c.price})` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Checkboxes: JOB SAMPLES & DIGITAL PROOFS */}
                <div className="pt-2 border-t border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px]">
                      JOB SAMPLES
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 text-xs">
                      <input
                        type="checkbox"
                        checked={includeJobSamples}
                        onChange={(e) => setIncludeJobSamples(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Sample of Completed job (per set) +$9.99</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px]">
                      DIGITAL PROOFS
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 text-xs">
                      <input
                        type="checkbox"
                        checked={includeDigitalProofs}
                        onChange={(e) => setIncludeDigitalProofs(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>PDF Proofs (per set) +$5.00</span>
                    </label>
                  </div>
                </div>

                {/* Favorites Strip */}
                <div className="bg-slate-100 rounded-lg p-3 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-600 italic">
                    Order this product often? Add it to your Favorites!
                  </span>
                  <button
                    onClick={handleToggleFavorite}
                    className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border ${
                      isFavorited
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFavorited ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                    {isFavorited ? 'Favorited' : 'Add To Favorites'}
                  </button>
                </div>

                {/* PROCEED TO SHIPPING BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className="w-full bg-[#f24f13] hover:bg-[#d9420b] text-white font-black text-base py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Proceed To Shipping</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mt-2">
                    NEXT: DETERMINE SET COUNT &amp; SHIPPING LOCATIONS
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: SETS & SHIPPING */}
            {activeTab === 'shipping' && (
              <div className="p-5 sm:p-6 space-y-5 text-xs">
                {/* 1. QUANTITY SELECTOR & PRICING TABLE */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px]">
                      SELECT QUANTITY SET <span className="text-rose-600">*</span>
                    </label>
                    <span className="text-slate-500 text-[11px]">Bulk wholesale discount applied</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                    {product.quantities.map((qty) => {
                      const isSelected = selectedQty === qty;
                      return (
                        <button
                          key={qty}
                          onClick={() => setSelectedQty(qty)}
                          className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-black ring-2 ring-blue-500/20 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-sm font-black">{qty.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">pieces</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. TURNAROUND SPEED */}
                <div className="space-y-2">
                  <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                    PRODUCTION TURNAROUND <span className="text-rose-600">*</span>
                  </label>
                  <div className="space-y-1.5">
                    {TURNAROUND_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                          selectedTurnaround.id === opt.id
                            ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="turnaround"
                            checked={selectedTurnaround.id === opt.id}
                            onChange={() => setSelectedTurnaround(opt)}
                            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                          />
                          <div>
                            <div className="text-xs font-bold flex items-center gap-2">
                              {opt.name}
                              {opt.badge && (
                                <span className="text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.5 rounded">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500">{opt.days}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold">
                          {opt.rushFeePercentage > 0 ? `+${(opt.rushFeePercentage * 100).toFixed(0)}%` : 'Included'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. ARTWORK UPLOAD & PREFLIGHT */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <label className="font-black text-slate-800 uppercase tracking-wide text-[11px] block">
                    ARTWORK SUBMISSION <span className="text-rose-600">*</span>
                  </label>

                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-500 bg-slate-50/60 transition relative">
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.ai,.psd"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-1.5" />
                    <div className="font-bold text-slate-900 text-xs">
                      {uploadedFile ? uploadedFile.name : 'Upload Print-Ready File'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      PDF, AI, PSD, TIFF, PNG (Max 100MB)
                    </div>
                  </div>

                  {uploadedFile && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-emerald-900 text-xs">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 font-bold" />
                        <div>
                          <span className="font-bold">{uploadedFile.name}</span>
                          <span className="text-[10px] text-emerald-700 ml-1.5">({uploadedFile.size})</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
                        ✓ 300 DPI Preflight OK
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        const template = matchingTemplates[0];
                        if (template) {
                          setSelectedTemplateId(template.id);
                          setCurrentView('template-customizer');
                        } else {
                          setCurrentView('templates-gallery');
                        }
                      }}
                      className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      🎨 Or design with Free Online Template
                    </button>

                    <button
                      onClick={() => setIsGuidelinesOpen(true)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Preflight Guide
                    </button>
                  </div>
                </div>

                {/* 4. DESTINATION SHIPPING ZIP */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-black text-slate-800 uppercase tracking-wide text-[11px]">
                      SHIPPING ESTIMATOR
                    </label>
                    <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> FREE Ground Delivery $50+
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="US ZIP (e.g. 90210)"
                      className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <div className="flex-1 flex items-center justify-end text-xs font-medium text-slate-600">
                      Est. Arrival: <strong className="ml-1 text-slate-900">{pricing.estimatedShipDate}</strong>
                    </div>
                  </div>
                </div>

                {/* 5. PRICING TOTAL SUMMARY */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-baseline border-b border-slate-200 pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Total Commercial Run
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900">${pricing.total.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-500">${pricing.unitCost.toFixed(3)} each</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span>Base Subtotal ({selectedQty.toLocaleString()} units):</span>
                      <span>${pricing.subtotal.toFixed(2)}</span>
                    </div>
                    {pricing.rushAdjustment > 0 && (
                      <div className="flex justify-between text-amber-600 font-bold">
                        <span>Rush Production:</span>
                        <span>+${pricing.rushAdjustment.toFixed(2)}</span>
                      </div>
                    )}
                    {includeJobSamples && (
                      <div className="flex justify-between text-slate-600">
                        <span>Sample of Completed Job:</span>
                        <span>+$9.99</span>
                      </div>
                    )}
                    {includeDigitalProofs && (
                      <div className="flex justify-between text-slate-600">
                        <span>Digital PDF Proofs:</span>
                        <span>+$5.00</span>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>FedEx Ground Shipping:</span>
                      <span>{pricing.total >= 50 ? 'FREE' : '$8.50'}</span>
                    </div>
                  </div>
                </div>

                {/* ADD TO CART & PROCEED BUTTON */}
                <div className="space-y-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#f24f13] hover:bg-[#d9420b] text-white font-black text-base py-4 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart &amp; Checkout</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('options')}
                    className="w-full text-xs font-bold text-blue-600 hover:text-blue-800 py-2 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    ❮ Back to Product Options
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
