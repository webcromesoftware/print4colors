import React from 'react';

interface BusinessCardVisualPreviewProps {
  slug: string;
}

export const BusinessCardVisualPreview: React.FC<BusinessCardVisualPreviewProps> = ({ slug }) => {
  switch (slug) {
    // 1. Standard Business Cards (White stack with Rosen Floral Boutiques)
    case 'standard-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="absolute w-[82%] aspect-[1.75/1] bg-white/70 rounded-xs shadow-sm -rotate-6 translate-x-1" />
          <div className="relative w-[84%] aspect-[1.75/1] bg-white rounded-xs shadow-md p-3 flex flex-col justify-between border border-slate-200/90 transform -rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-serif font-bold text-rose-700 block tracking-wider">
                  ROSEN
                </span>
                <span className="text-[7.5px] text-slate-500 font-sans tracking-widest uppercase">
                  Floral Boutiques
                </span>
              </div>
              <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center text-[10px]">
                🌸
              </div>
            </div>
            <div className="border-t border-slate-100 pt-1 flex justify-between text-[7px] text-slate-400">
              <span>www.rosenfloral.com</span>
              <span>16PT C2S</span>
            </div>
          </div>
        </div>
      );

    // 2. Dual Raised Business Cards (Emerald green with gold ornate crest)
    case 'dual-raised-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950">
          <div className="relative w-[85%] aspect-[1.75/1] bg-[#032B1C] rounded-xs shadow-xl p-3 flex flex-col justify-between border border-amber-400/40 transform rotate-2 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[13px] font-serif font-black text-amber-300 drop-shadow block">
                  Ferante
                </span>
                <span className="text-[7.5px] font-sans font-bold tracking-widest text-emerald-300 uppercase">
                  Quality Leather
                </span>
              </div>
              <div className="w-6 h-6 rounded-full border border-amber-300/60 bg-amber-400/10 flex items-center justify-center text-[10px] text-amber-300">
                ⚜️
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[7px] font-bold text-amber-200/80 tracking-wider">
                RAISED GOLD FOIL + UV
              </span>
              <span className="text-[7px] text-emerald-400/80">EST. 1984</span>
            </div>
          </div>
        </div>
      );

    // 3. Suede Business Cards (Royal Navy with Strato Hair Clinic)
    case 'suede-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
          <div className="absolute w-[82%] aspect-[1.75/1] bg-white rounded-xs shadow-sm -rotate-3 translate-x-2" />
          <div className="relative w-[84%] aspect-[1.75/1] bg-[#1E3A8A] rounded-xs shadow-lg p-3 text-white flex flex-col justify-between transform rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black tracking-tight text-white block">
                  STRATO
                </span>
                <span className="text-[7.5px] text-sky-200 tracking-wider uppercase font-semibold">
                  HAIR CLINIC
                </span>
              </div>
              <div className="w-5 h-5 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-[9px]">
                ✂️
              </div>
            </div>
            <div className="flex justify-between text-[7px] text-sky-200">
              <span>Velvet Soft-Touch Barrier</span>
              <span>19PT Suede</span>
            </div>
          </div>
        </div>
      );

    // 4. Silk Business Cards (White with colorful CMYK swirling ribbon)
    case 'silk-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-slate-50 to-cyan-50">
          <div className="relative w-[84%] aspect-[1.75/1] bg-white rounded-xs shadow-md p-3 flex flex-col justify-between border border-slate-200 transform -rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-black tracking-tight bg-gradient-to-r from-pink-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
                  Cupcake
                </span>
                <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block">
                  Artisan Bakery
                </span>
              </div>
              <div className="h-4 w-10 bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 rounded-full opacity-80" />
            </div>
            <div className="flex justify-between text-[7px] text-slate-400">
              <span>Silky Matte Lamination</span>
              <span>Tear-Resistant</span>
            </div>
          </div>
        </div>
      );

    // 5. Raised Spot UV Business Cards (Navy with Baker Law Firm)
    case 'raised-spot-uv-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="relative w-[85%] aspect-[1.75/1] bg-[#0E1E38] rounded-xs shadow-xl p-3 text-white flex flex-col justify-between border border-sky-900/60 transform rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[12px] font-serif font-black text-sky-100 block tracking-wider drop-shadow-md">
                  BAKER
                </span>
                <span className="text-[7.5px] tracking-widest text-sky-300 font-bold uppercase">
                  LAW FIRM
                </span>
              </div>
              <div className="w-5 h-5 rounded-full border border-sky-400/40 bg-sky-500/10 flex items-center justify-center text-[10px]">
                ⚖️
              </div>
            </div>
            <div className="flex justify-between text-[7px] text-sky-300/80">
              <span>50 Micron Raised Gloss Varnish</span>
              <span>Velvet Matte</span>
            </div>
          </div>
        </div>
      );

    // 6. Painted Edge Business Cards (Ultra thick with colored edge stack)
    case 'painted-edge-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200">
          {/* Card stack with neon painted edges visible */}
          <div className="relative w-[84%] aspect-[1.75/1] bg-white rounded-xs shadow-xl p-3 border-l-4 border-l-[#E11D48] border-b-4 border-b-[#E11D48] border-r border-t border-slate-200 flex flex-col justify-between transform -rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black tracking-tight text-slate-900 block">
                  STAR TECH
                </span>
                <span className="text-[7.5px] font-bold text-rose-600 uppercase">
                  CLOUD SYSTEMS
                </span>
              </div>
              <span className="text-[8px] bg-rose-500 text-white font-black px-1 rounded">
                32PT
              </span>
            </div>
            <div className="flex justify-between text-[7px] text-slate-500 font-bold">
              <span>Radiant Neon Edges</span>
              <span>Ultra Thick Core</span>
            </div>
          </div>
        </div>
      );

    // 7. Black Edge Business Cards (White face with solid black core)
    case 'black-edge-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300">
          <div className="relative w-[84%] aspect-[1.75/1] bg-white rounded-xs shadow-2xl p-3 border-l-[6px] border-l-black border-b-[6px] border-b-black border-r border-t border-slate-300 flex flex-col justify-between transform rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black text-slate-900 block">
                  SPEEDY BOLT
                </span>
                <span className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">
                  ELECTRIC COMPANY
                </span>
              </div>
              <span className="text-[8px] bg-black text-white font-mono px-1 rounded font-bold">
                34PT
              </span>
            </div>
            <div className="flex justify-between text-[7px] text-slate-600 font-semibold">
              <span>Solid Pitch Black Core</span>
              <span>Triplex Board</span>
            </div>
          </div>
        </div>
      );

    // 8. Foil Worx Business Cards (Hot stamped gold script Pm Jewelry)
    case 'foil-worx-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-neutral-900 to-neutral-950">
          <div className="relative w-[84%] aspect-[1.75/1] bg-[#121212] rounded-xs shadow-xl p-3 border border-amber-500/30 text-white flex flex-col justify-between transform -rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[15px] font-serif font-black text-amber-300 tracking-wider block drop-shadow-sm">
                  Pm
                </span>
                <span className="text-[7px] font-sans font-bold text-amber-200/80 tracking-widest uppercase">
                  Jewelry Design
                </span>
              </div>
              <div className="w-5 h-5 rounded-full border border-amber-400 bg-amber-400/20 flex items-center justify-center text-[10px] text-amber-300">
                💎
              </div>
            </div>
            <div className="flex justify-between text-[7px] text-amber-300/70">
              <span>Hot Stamped Metallic Foil</span>
              <span>16PT Silk</span>
            </div>
          </div>
        </div>
      );

    // 9. Raised Foil Business Cards (Golden Age Casino)
    case 'raised-foil-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-stone-900 to-black">
          <div className="relative w-[85%] aspect-[1.75/1] bg-black rounded-xs shadow-2xl p-3 border border-amber-400/60 text-white flex flex-col justify-between transform rotate-2 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-serif font-black text-amber-400 tracking-wider block drop-shadow-md">
                  GOLDEN AGE
                </span>
                <span className="text-[7.5px] font-sans font-black text-amber-200 tracking-widest uppercase">
                  CASINO & RESORT
                </span>
              </div>
              <span className="text-[12px] text-amber-400">👑</span>
            </div>
            <div className="flex justify-between text-[7px] text-amber-300">
              <span>50μ Embossed Gold Foil</span>
              <span>Suede Laminate</span>
            </div>
          </div>
        </div>
      );

    // 10. Linen Uncoated Business Cards (Textured Sunny Days)
    case 'linen-uncoated-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-stone-100">
          <div
            className="relative w-[84%] aspect-[1.75/1] bg-[#FAF8F5] rounded-xs shadow-md p-3 border border-stone-200 flex flex-col justify-between transform -rotate-1 group-hover:rotate-0 transition-transform"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black text-amber-700 tracking-tight block">
                  SUNNY DAYS
                </span>
                <span className="text-[7.5px] text-stone-500 font-bold uppercase tracking-wider">
                  FLOWER SHOP
                </span>
              </div>
              <span className="text-xs">🌻</span>
            </div>
            <div className="flex justify-between text-[7px] text-stone-500">
              <span>Traditional Woven Linen</span>
              <span>100LB Cover</span>
            </div>
          </div>
        </div>
      );

    // 11. Brown Kraft Business Cards (Earnest Organic Food)
    case 'brown-kraft-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-amber-100 to-amber-200">
          <div className="relative w-[84%] aspect-[1.75/1] bg-[#C49A6C] rounded-xs shadow-md p-3 text-[#2F2012] flex flex-col justify-between border border-[#A87E50] transform rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black tracking-tight block">
                  EARNEST
                </span>
                <span className="text-[7.5px] font-bold tracking-wider uppercase text-[#4A321E]">
                  ORGANIC FOOD
                </span>
              </div>
              <span className="text-xs">🌾</span>
            </div>
            <div className="flex justify-between text-[7px] text-[#4A321E] font-bold">
              <span>100% Recycled Brown Kraft</span>
              <span>18PT Rigid</span>
            </div>
          </div>
        </div>
      );

    // 12. Natural Business Cards (Eco-friendly with recycled flecks)
    case 'natural-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-stone-100 to-emerald-50">
          <div className="relative w-[84%] aspect-[1.75/1] bg-[#F7F4EB] rounded-xs shadow-md p-3 border border-stone-300 flex flex-col justify-between transform -rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold text-emerald-900 tracking-wider uppercase block">
                  NATURAL
                </span>
                <span className="text-[7.5px] text-stone-600 font-semibold">
                  Botanical Goods
                </span>
              </div>
              <span className="text-xs">🍃</span>
            </div>
            <div className="flex justify-between text-[7px] text-emerald-800 font-semibold">
              <span>Recycled Natural Flecks</span>
              <span>14PT Off-White</span>
            </div>
          </div>
        </div>
      );

    // 13. EndurACE Business Cards (Joe Smith Plumber)
    case 'endurace-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-blue-100">
          <div className="relative w-[84%] aspect-[1.75/1] bg-white rounded-xs shadow-md p-3 border border-sky-300 flex flex-col justify-between transform rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black text-blue-900 block">
                  Joe Smith
                </span>
                <span className="text-[7.5px] font-bold text-sky-600 uppercase">
                  MASTER PLUMBER
                </span>
              </div>
              <span className="text-xs">💧</span>
            </div>
            <div className="flex justify-between text-[7px] text-blue-900 font-bold">
              <span>100% Waterproof Synthetic</span>
              <span>10PT EndurACE</span>
            </div>
          </div>
        </div>
      );

    // 14. Pearl Business Cards (Sound Music)
    case 'pearl-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 via-pink-50 to-amber-50">
          <div className="relative w-[84%] aspect-[1.75/1] bg-gradient-to-tr from-[#FFF5F8] via-[#F4E8FF] to-[#FFF9E6] rounded-xs shadow-md p-3 border border-purple-200/80 flex flex-col justify-between transform -rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black tracking-tight text-purple-900 block">
                  SOUND MUSIC
                </span>
                <span className="text-[7.5px] text-pink-600 font-bold uppercase tracking-wider">
                  STUDIO RECORDINGS
                </span>
              </div>
              <span className="text-xs">🎵</span>
            </div>
            <div className="flex justify-between text-[7px] text-purple-700 font-semibold">
              <span>Mica Crystal Shimmer</span>
              <span>14PT Pearl</span>
            </div>
          </div>
        </div>
      );

    // 15. Fold-over Business Cards (Cloe Lorem)
    case 'fold-over-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-orange-50">
          {/* Standing tent folded card */}
          <div className="relative w-[80%] aspect-[1.4/1] bg-white rounded-xs shadow-xl p-2.5 border border-slate-300 flex flex-col justify-between transform -rotate-2 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black text-rose-700 block">
                  CLOE LOREM
                </span>
                <span className="text-[7px] font-bold text-slate-500 uppercase">
                  Design Studio
                </span>
              </div>
              <span className="text-[8px] bg-amber-100 text-amber-900 px-1 rounded font-bold">
                Fold-Over
              </span>
            </div>
            <div className="flex justify-between text-[7px] text-slate-500">
              <span>4 Printable Panels</span>
              <span>Scored to Fold</span>
            </div>
          </div>
        </div>
      );

    // 16. Plastic Business Cards (Superior Help Movers)
    case 'plastic-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100">
          <div className="relative w-[84%] aspect-[1.75/1] bg-white/70 backdrop-blur-md rounded-md shadow-lg p-3 border border-white/60 text-purple-950 flex flex-col justify-between transform rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black text-purple-900 block">
                  SUPERIOR HELP
                </span>
                <span className="text-[7.5px] font-bold text-indigo-700 uppercase">
                  LOGISTICS & MOVERS
                </span>
              </div>
              <span className="text-xs">📦</span>
            </div>
            <div className="flex justify-between text-[7px] text-purple-800 font-bold">
              <span>20PT Frosted Translucent</span>
              <span>Waterproof Plastic</span>
            </div>
          </div>
        </div>
      );

    // 17. Magnet Business Cards (Johnnie's Food Delivery)
    case 'magnet-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-orange-100">
          <div className="relative w-[84%] aspect-[1.75/1] bg-[#F59E0B] rounded-xs shadow-xl p-3 text-slate-950 flex flex-col justify-between border-2 border-amber-600 transform -rotate-1 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black block">
                  Johnnie's
                </span>
                <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-900">
                  FOOD DELIVERY
                </span>
              </div>
              <span className="text-xs">🍕</span>
            </div>
            <div className="flex justify-between text-[7px] font-black text-slate-900">
              <span>Full Fridge Magnet Back</span>
              <span>17PT Magnetic</span>
            </div>
          </div>
        </div>
      );

    // 18. Leaf Business Cards (Sammy's Fish Grill)
    case 'leaf-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-100">
          {/* Leaf die cut: top-left rounded, bottom-right rounded */}
          <div className="relative w-[84%] aspect-[1.75/1] bg-[#006D77] rounded-tl-2xl rounded-br-2xl shadow-xl p-3 text-white flex flex-col justify-between transform rotate-2 group-hover:rotate-0 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-black text-white block">
                  Sammy's
                </span>
                <span className="text-[7.5px] font-bold text-teal-200 uppercase">
                  FISH GRILL
                </span>
              </div>
              <span className="text-xs">🐟</span>
            </div>
            <div className="flex justify-between text-[7px] text-teal-100 font-semibold">
              <span>Opposite Corner Leaf Cut</span>
              <span>16PT C2S</span>
            </div>
          </div>
        </div>
      );

    // 19. Oval Business Cards (Mystique Club)
    case 'oval-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-indigo-950">
          {/* Oval die cut */}
          <div className="relative w-[86%] aspect-[1.75/1] bg-black rounded-full shadow-2xl p-3 border border-purple-500/50 text-white flex flex-col justify-center items-center text-center transform -rotate-1 group-hover:rotate-0 transition-transform">
            <span className="text-[12px] font-serif font-black bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent block">
              Mystique
            </span>
            <span className="text-[7px] font-sans font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              LOUNGE & NIGHTCLUB
            </span>
            <span className="text-[6.5px] text-purple-400 mt-1">Die-Cut Oval</span>
          </div>
        </div>
      );

    // 20. Circle Business Cards (Vector Vision)
    case 'circle-business-cards':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-indigo-100">
          {/* Circular die cut */}
          <div className="relative w-24 h-24 bg-[#4C1D95] rounded-full shadow-2xl p-2 text-white flex flex-col justify-center items-center text-center border-2 border-purple-400 transform hover:scale-105 transition-transform">
            <div className="w-5 h-5 rounded-full border border-white/60 flex items-center justify-center text-[10px] mb-0.5">
              🎯
            </div>
            <span className="text-[9px] font-black text-white leading-tight">
              VECTOR<br />VISION
            </span>
            <span className="text-[6.5px] text-purple-200 uppercase mt-0.5">
              2.5" Circle
            </span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-bold">
          Business Card
        </div>
      );
  }
};
