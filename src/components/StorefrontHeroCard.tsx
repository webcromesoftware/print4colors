import React from 'react';
import { Print4ColorsLogo } from './Print4ColorsLogo';

export const StorefrontHeroCard: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 select-none group">
      {/* 3D Commercial Storefront Illustration & Architecture */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-b from-sky-100 via-sky-50 to-slate-200 overflow-hidden flex flex-col justify-end">
        {/* Sky & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 via-sky-100/30 to-transparent pointer-events-none" />
        
        {/* Subtle Sunlight Flare */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Building Exterior Structure */}
        <div className="relative w-full h-[88%] bg-[#E6DFD5] border-t-8 border-[#3A4750] shadow-2xl flex flex-col justify-between">
          {/* Architectural Sandstone Brick Texture Overlay */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0,0,0,0.06) 18px, rgba(0,0,0,0.06) 20px),
                                repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0,0,0,0.06) 48px, rgba(0,0,0,0.06) 50px)`
            }}
          />

          {/* Upper Facade: Dimensional 3D Store Sign */}
          <div className="relative z-10 pt-4 pb-2 px-6 flex justify-center items-center">
            <div className="bg-white/95 backdrop-blur-xs px-6 py-2.5 rounded-xl shadow-lg border border-slate-200/90 flex flex-col items-center transform hover:scale-[1.02] transition-transform duration-300">
              <Print4ColorsLogo size="md" variant="light" showTagline={true} />
            </div>
          </div>

          {/* Lower Storefront: Floor-to-Ceiling Glass Picture Windows & Entrance */}
          <div className="relative z-10 mx-3 sm:mx-6 mb-0 h-[68%] grid grid-cols-12 gap-1 sm:gap-2 bg-slate-950 p-2 sm:p-2.5 rounded-t-xl border-x-4 border-t-4 border-slate-800 shadow-inner">
            
            {/* Left Window: SIGNS BANNERS DECALS & MORE */}
            <div className="col-span-4 relative rounded-md overflow-hidden bg-gradient-to-br from-[#0F3556] to-[#0A2239] border border-slate-700/80 p-2 sm:p-3 flex flex-col justify-between shadow-inner">
              {/* Glass sheen highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              
              {/* Abstract decorative decal shapes */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-400/40 via-emerald-400/30 to-transparent rounded-tl-full pointer-events-none" />
              <div className="absolute top-0 right-0 w-12 h-12 bg-amber-400/30 rounded-bl-full pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-block text-[9px] sm:text-[11px] font-black tracking-widest text-cyan-300 uppercase">
                  DISPLAY
                </span>
                <div className="text-white font-black text-xs sm:text-base leading-tight tracking-tight mt-1 drop-shadow-sm">
                  SIGNS<br />
                  BANNERS<br />
                  DECALS<br />
                  <span className="text-cyan-400">& MORE</span>
                </div>
              </div>

              {/* Sample prints inside */}
              <div className="relative z-10 flex gap-1 mt-2">
                <div className="h-10 w-8 rounded bg-gradient-to-br from-amber-400 to-rose-500 shadow-xs border border-white/20" />
                <div className="h-10 w-8 rounded bg-gradient-to-br from-sky-400 to-blue-600 shadow-xs border border-white/20" />
              </div>
            </div>

            {/* Center Entrance: Glass Double Doors */}
            <div className="col-span-4 relative rounded-md overflow-hidden bg-slate-900/90 border border-slate-700/80 p-2 flex flex-col justify-between">
              {/* Door Glass Divider */}
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-slate-700/80 -translate-x-1/2" />
              
              {/* Door Handles */}
              <div className="absolute top-1/2 left-[44%] -translate-y-1/2 w-1 h-8 bg-slate-300 rounded-full shadow" />
              <div className="absolute top-1/2 right-[44%] -translate-y-1/2 w-1 h-8 bg-slate-300 rounded-full shadow" />

              {/* Welcome Decal & Hours */}
              <div className="relative z-10 text-center pt-1">
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-300 tracking-wider uppercase block">
                  OPEN TO THE PUBLIC
                </span>
                <span className="text-[10px] sm:text-xs font-black text-white block mt-0.5">
                  1042 PRINT AVE
                </span>
              </div>

              {/* Lit Interior Glimpse */}
              <div className="relative z-10 w-full h-12 rounded bg-gradient-to-t from-amber-100/10 to-transparent flex items-center justify-center">
                <span className="text-[8px] text-amber-200/80 font-bold tracking-wider uppercase">
                  Walk-Ins & Pro Pickups
                </span>
              </div>
            </div>

            {/* Right Window: BIG IDEAS BOLDER PRINTS */}
            <div className="col-span-4 relative rounded-md overflow-hidden bg-gradient-to-bl from-[#0052CC] via-[#0747A6] to-[#0A2A5E] border border-slate-700/80 p-2 sm:p-3 flex flex-col justify-between shadow-inner">
              {/* Glass sheen highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Giant CMYK vibrant abstract wave shapes matching photo */}
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-gradient-to-tr from-[#FFED00] via-[#E6007E] to-[#009FE3] rounded-full opacity-80 blur-xs pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-block text-[9px] sm:text-[11px] font-black tracking-widest text-amber-300 uppercase">
                  LARGE FORMAT
                </span>
                <div className="text-white font-black text-xs sm:text-base leading-tight tracking-tight mt-1 drop-shadow-md">
                  BIG<br />
                  IDEAS<br />
                  BOLDER<br />
                  <span className="text-amber-300">PRINTS</span>
                </div>
              </div>

              {/* High vibrancy graphic in window */}
              <div className="relative z-10 flex justify-end">
                <div className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-xs text-[9px] font-bold text-white tracking-wider">
                  G7 MASTER
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Clean Sidewalk & Landscaping Potted Topiaries */}
        <div className="relative w-full h-[12%] bg-gradient-to-b from-[#C8CCD0] to-[#ADB5BD] border-t-2 border-slate-400 px-6 flex items-center justify-between shadow-md">
          {/* Left Potted Plant */}
          <div className="flex flex-col items-center -translate-y-3 sm:-translate-y-4">
            <div className="w-5 h-6 sm:w-6 sm:h-7 rounded-full bg-emerald-600 shadow-md border border-emerald-500" />
            <div className="w-3.5 h-3 sm:w-4 sm:h-4 bg-[#8C5E3B] rounded-b-sm border-t border-slate-600 shadow-sm" />
          </div>

          {/* Sidewalk Expansion Joints */}
          <div className="flex-1 flex justify-around px-4">
            <div className="w-px h-full bg-slate-400/60" />
            <div className="w-px h-full bg-slate-400/60" />
            <div className="w-px h-full bg-slate-400/60" />
          </div>

          {/* Right Potted Plant */}
          <div className="flex flex-col items-center -translate-y-3 sm:-translate-y-4">
            <div className="w-5 h-6 sm:w-6 sm:h-7 rounded-full bg-emerald-600 shadow-md border border-emerald-500" />
            <div className="w-3.5 h-3 sm:w-4 sm:h-4 bg-[#8C5E3B] rounded-b-sm border-t border-slate-600 shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
