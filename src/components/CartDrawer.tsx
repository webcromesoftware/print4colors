import React from 'react';
import { usePrintStore } from '../context/PrintStore';
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  Check,
  FileCheck2,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartItemQty,
    clearCart,
    cartSubtotal,
    cartTotalCount,
    promoCode,
    discountAmount,
    applyPromoCode,
    setCurrentView
  } = usePrintStore();

  const [inputCode, setInputCode] = React.useState('');

  if (!isCartDrawerOpen) return null;

  const shippingCost = cartSubtotal >= 50 || promoCode === 'FREESHIP' ? 0 : 9.99;
  const estimatedTax = Number(((cartSubtotal - discountAmount) * 0.0825).toFixed(2));
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost + estimatedTax);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Your Print Cart ({cartTotalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Your cart is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our popular business cards, flyers, brochures or banners to configure your order.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('catalog');
                  }}
                  className="mt-2 px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-extrabold shadow-sm hover:bg-sky-700 transition cursor-pointer"
                >
                  Browse Commercial Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-2xs space-y-3 relative"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate pr-4">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5 space-y-0.5">
                        <div>Size: <span className="font-medium text-slate-700">{item.size.dimensions}</span></div>
                        <div>Stock: <span className="font-medium text-slate-700 truncate inline-block max-w-[170px] align-bottom">{item.stock.name}</span></div>
                        <div>Sides: <span className="font-medium text-slate-700">{item.sides.name.split('(')[0]}</span></div>
                        {item.coating && <div>Finish: <span className="font-medium text-slate-700 truncate inline-block max-w-[170px] align-bottom">{item.coating.name}</span></div>}
                      </div>
                    </div>
                  </div>

                  {/* Artwork status pill */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      {item.artworkType === 'upload' ? (
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                          <FileCheck2 className="w-3 h-3 text-emerald-600" />
                          Artwork Attached: {item.artworkFile?.name ? item.artworkFile.name.substring(0, 14) + '...' : 'PDF Ready'}
                        </span>
                      ) : item.artworkType === 'template' ? (
                        <span className="text-[10px] bg-rose-50 text-rose-800 font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-rose-200">
                          <Sparkles className="w-3 h-3 text-rose-600" />
                          Template Customized: {item.templateData?.businessName || 'Saved'}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
                          Design Service (+$29.99)
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="font-black text-slate-900 text-sm">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {item.quantity.toLocaleString()} units (${item.unitPrice.toFixed(3)}/ea)
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              {/* Promo code entry */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. WELCOME10)"
                    className="w-full text-xs py-2 pl-7 pr-2 uppercase bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 font-bold"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
                </div>
                <button
                  onClick={() => {
                    if (inputCode) {
                      applyPromoCode(inputCode);
                      setInputCode('');
                    }
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({promoCode}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (FedEx Ground):</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax:</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total:</span>
                  <span className="text-sky-700">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('checkout');
                }}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Stripe Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-bit Encrypted Checkout • Digital Proof Guarantee
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
