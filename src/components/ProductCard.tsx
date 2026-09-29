import React from 'react';
import { Product } from '../types/print';
import { ArrowRight, Clock, Check, Sparkles } from 'lucide-react';
import { usePrintStore } from '../context/PrintStore';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { setSelectedProductId, setCurrentView } = usePrintStore();

  const handleConfigure = () => {
    setSelectedProductId(product.id);
    setCurrentView('configurator');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Product Image Stage */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-black text-slate-800 shadow-xs">
            {product.categoryName}
          </span>
          {product.featured && (
            <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs">
              Popular
            </span>
          )}
        </div>

        {/* Turnaround speed pill */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{product.standardTurnaround}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-sky-600 transition leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-600">
            <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
              {product.sizes.length} Sizes
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
              {product.stocks.length} Paper Stocks
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
              CMYK G7 Verified
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Starting at</span>
            <span className="text-base sm:text-lg font-black text-slate-900">
              ${product.startingPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleConfigure}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-black shadow-xs transition flex items-center gap-1.5 cursor-pointer group-hover:bg-slate-900"
          >
            <span>Configure</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
