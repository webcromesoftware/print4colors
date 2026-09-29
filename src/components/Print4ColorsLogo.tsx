import React from 'react';

interface Print4ColorsLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Print4ColorsLogo: React.FC<Print4ColorsLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isDark = variant === 'dark';

  const textSize = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl'
  }[size];

  const iconSize = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10 sm:w-12 sm:h-12'
  }[size];

  const taglineSize = {
    sm: 'text-[7.5px]',
    md: 'text-[8.5px] sm:text-[9.5px]',
    lg: 'text-[10px] sm:text-[11px]'
  }[size];

  return (
    <div className={`inline-flex flex-col select-none leading-none ${className}`}>
      <div className="flex items-center gap-1.5 font-sans">
        {/* CMYK 4-petals Emblem */}
        <div className={`relative ${iconSize} shrink-0`}>
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
            {/* Top Cyan Petal */}
            <path
              d="M22 22 C19 11, 10 9, 8 18 C6 24, 15 25, 22 22 Z"
              fill="#009FE3"
            />
            {/* Right Magenta Petal */}
            <path
              d="M22 22 C33 19, 35 10, 26 8 C20 6, 19 15, 22 22 Z"
              fill="#E6007E"
            />
            {/* Bottom Yellow Petal */}
            <path
              d="M22 22 C25 33, 34 35, 36 26 C38 20, 29 19, 22 22 Z"
              fill="#FFED00"
            />
            {/* Left Green/Lime Petal */}
            <path
              d="M22 22 C11 25, 9 34, 18 36 C24 38, 25 29, 22 22 Z"
              fill="#10B981"
            />
            {/* Subtle center core */}
            <circle cx="22" cy="22" r="3.5" fill={isDark ? '#0F172A' : '#FFFFFF'} />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex items-baseline font-black tracking-tight">
          <span className={isDark ? 'text-white' : 'text-slate-900'} style={{ fontSize: 'inherit' }}>
            <span className={textSize}>Print</span>
          </span>
          <span className="text-[#009FE3]" style={{ fontSize: 'inherit' }}>
            <span className={textSize}>4</span>
          </span>
          <span className={isDark ? 'text-white' : 'text-slate-900'} style={{ fontSize: 'inherit' }}>
            <span className={textSize}>Colors</span>
          </span>
        </div>
      </div>

      {showTagline && (
        <span
          className={`font-black tracking-[0.22em] uppercase mt-1 ${taglineSize} ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          YOUR IDEAS. OUR PRINT. REAL IMPACT.
        </span>
      )}
    </div>
  );
};
