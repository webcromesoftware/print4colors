import React from 'react';
import { usePrintStore } from '../context/PrintStore';
import { X, Check, AlertTriangle, Layers, Palette, Crop, ShieldCheck } from 'lucide-react';

export const ArtworkGuidelinesModal: React.FC = () => {
  const { isGuidelinesOpen, setIsGuidelinesOpen } = usePrintStore();

  if (!isGuidelinesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsGuidelinesOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Preflight Standards & Press Specifications
          </div>
          <h2 className="text-2xl font-black text-slate-900">Commercial Artwork Guidelines</h2>
          <p className="text-xs text-slate-500">
            Follow these essential print rules to ensure your finished orders are razor-sharp with flawless color accuracy.
          </p>
        </div>

        {/* 4 Pillars of Commercial Printing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold">
              <Crop className="w-4 h-4" />
              <span>1. Bleed & Safety Zones (0.125")</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Always add <strong>0.125 inches (1/8")</strong> of bleed on all sides beyond the final trim size. Keep critical text and logos at least <strong>0.125 inches inside</strong> the cut trim line to prevent accidental trimming.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-sky-600 font-extrabold">
              <Palette className="w-4 h-4" />
              <span>2. CMYK Color Space Only</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Design files must be saved in <strong>CMYK (Cyan, Magenta, Yellow, Key Black)</strong>, not RGB. RGB monitors display light frequencies that commercial inks cannot reproduce. Use US Web Coated (SWOP) v2 or GRACoL2006.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-extrabold">
              <Layers className="w-4 h-4" />
              <span>3. Resolution: 300 DPI Native</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              All raster images must have a minimum resolution of <strong>300 DPI at 100% scale</strong>. Web images (72 DPI) will print pixelated and blurry. Outdoor large format vinyl banners may use 150 DPI.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 font-extrabold">
              <AlertTriangle className="w-4 h-4" />
              <span>4. Rich Black vs Plain Black</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              For solid deep black background fields, use Rich Black: <strong>C: 60, M: 40, Y: 40, K: 100</strong>. For small body text (under 12pt), use 100% K only (C:0, M:0, Y:0, K:100) to avoid color registration fringing.
            </p>
          </div>
        </div>

        {/* Accepted File Formats */}
        <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-200 space-y-2 text-xs">
          <div className="font-bold text-sky-900">Supported Press-Ready Formats:</div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white px-2.5 py-1 rounded-md border border-sky-300 font-mono font-bold text-sky-800">
              PDF/X-1a (Recommended)
            </span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-sky-300 font-mono font-bold text-sky-800">
              High-Res TIFF (300 DPI)
            </span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-sky-300 font-mono font-bold text-sky-800">
              Adobe Illustrator (.AI - Outlined Fonts)
            </span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-sky-300 font-mono font-bold text-sky-800">
              JPEG / PNG (Maximum Quality)
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsGuidelinesOpen(false)}
          className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
        >
          Got It, Thanks!
        </button>
      </div>
    </div>
  );
};
