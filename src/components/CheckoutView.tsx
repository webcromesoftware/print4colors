import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import {
  CreditCard,
  Lock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  User,
  Mail,
  Phone,
  FileCheck2,
  Sparkles,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onBackToCart: () => void;
}

export const CheckoutView: React.FC<Props> = ({ onBackToCart }) => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    promoCode,
    placeOrder,
    currentUser,
    setCurrentView,
    setSelectedOrderId
  } = usePrintStore();

  // Contact & Address info
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    company: currentUser.company,
    street: currentUser.addresses[0]?.street || '1200 Market Street',
    suite: 'Suite 300',
    city: currentUser.addresses[0]?.city || 'San Francisco',
    state: currentUser.addresses[0]?.state || 'CA',
    zipCode: currentUser.addresses[0]?.zipCode || '94102',
    shippingMethod: 'FedEx Ground (2-3 Business Days)',
  });

  // Stripe Payment Form
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardZip, setCardZip] = useState('94102');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  // Quick autofill test card
  const fillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExp('10/28');
    setCardCvc('123');
    setCardZip(formData.zipCode || '90210');
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const shippingCost =
    cartSubtotal >= 50 || promoCode === 'FREESHIP'
      ? 0
      : formData.shippingMethod.includes('Overnight')
      ? 35.0
      : formData.shippingMethod.includes('2-Day')
      ? 18.0
      : 9.99;

  const estimatedTax = Number(((cartSubtotal - discountAmount) * 0.0825).toFixed(2));
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost + estimatedTax);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Stripe payment processing & webhook confirmation
    setTimeout(() => {
      const placed = placeOrder(formData, { last4: cardNumber.slice(-4) });
      setIsProcessing(false);
      setOrderComplete(placed);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 1500);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Payment Confirmed via Stripe
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            Thank You, {orderComplete.customer.name}!
          </h1>
          <p className="text-sm text-slate-600">
            Your commercial print order has been received and logged into our US production facility.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-left shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Order Reference</p>
              <p className="text-xl font-black text-sky-700">#{orderComplete.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase">Total Charged</p>
              <p className="text-xl font-black text-slate-900">${orderComplete.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Shipping Destination:</span>
              <p>{orderComplete.customer.name}</p>
              <p>{orderComplete.shippingAddress.street}</p>
              <p>
                {orderComplete.shippingAddress.city}, {orderComplete.shippingAddress.state}{' '}
                {orderComplete.shippingAddress.zipCode}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Production & Proof Status:</span>
              <p className="font-bold text-sky-600">{orderComplete.orderStatus}</p>
              <p className="text-slate-500 mt-1">
                Estimated Delivery: {orderComplete.estimatedDeliveryDate}
              </p>
            </div>
          </div>

          {/* Proof notice */}
          {orderComplete.proofs.length > 0 && (
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-sky-600" />
                <span className="text-slate-800 font-semibold">
                  A digital proof has been prepared for your online review!
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedOrderId(orderComplete.id);
                  setCurrentView('proof-review');
                }}
                className="font-bold text-sky-700 underline cursor-pointer"
              >
                Inspect Proof →
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => {
              setSelectedOrderId(orderComplete.id);
              setCurrentView('customer-dashboard');
            }}
            className="px-6 py-3.5 bg-slate-900 text-white font-extrabold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            Go to My Orders & Proofs
          </button>
          <button
            onClick={() => {
              setCurrentView('catalog');
            }}
            className="px-6 py-3.5 bg-sky-50 text-sky-700 border border-sky-200 font-extrabold text-xs rounded-xl hover:bg-sky-100 transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={onBackToCart}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-sky-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Cart</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Stripe Secure 256-Bit SSL Checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Customer, Shipping & Payment (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Contact Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. US Shipping Address */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              USA Shipping Address
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
              <input
                required
                type="text"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">Apt / Suite</label>
                <input
                  type="text"
                  value={formData.suite}
                  onChange={(e) => handleInputChange('suite', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white font-medium"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State (US)</label>
                <input
                  required
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="CA, NY, TX, FL..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white uppercase font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ZIP Code</label>
                <input
                  required
                  type="text"
                  maxLength={5}
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white font-bold"
                />
              </div>
            </div>

            {/* Shipping carrier selection */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">Carrier & Delivery Speed</label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-slate-50 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={formData.shippingMethod.includes('Ground')}
                      onChange={() => handleInputChange('shippingMethod', 'FedEx Ground (2-3 Business Days)')}
                      className="text-sky-600"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">FedEx Ground</span>
                      <span className="text-slate-500">2-3 Business Days nationwide</span>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600">
                    {cartSubtotal >= 50 ? 'FREE' : '$9.99'}
                  </span>
                </label>

                <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-slate-50 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={formData.shippingMethod.includes('2-Day')}
                      onChange={() => handleInputChange('shippingMethod', 'UPS 2-Day Air')}
                      className="text-sky-600"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">UPS 2-Day Air Express</span>
                      <span className="text-slate-500">Guaranteed 2nd business day delivery</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800">$18.00</span>
                </label>
              </div>
            </div>
          </div>

          {/* 3. Stripe Online Payment */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                Payment Information (Stripe Integration)
              </h3>
              <button
                type="button"
                onClick={fillTestCard}
                className="text-[11px] font-bold text-sky-600 hover:underline cursor-pointer bg-sky-50 px-2 py-1 rounded"
              >
                Autofill Test Card
              </button>
            </div>

            {/* Simulated Stripe Card Element */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-sky-600" />
                  Credit or Debit Card
                </span>
                <div className="flex gap-1.5">
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black">VISA</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black">MC</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black">AMEX</span>
                </div>
              </div>

              <div>
                <input
                  required
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full text-sm font-mono p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Expires</label>
                  <input
                    required
                    type="text"
                    placeholder="MM/YY"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full text-xs font-mono p-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">CVC</label>
                  <input
                    required
                    type="text"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full text-xs font-mono p-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Billing Zip</label>
                  <input
                    required
                    type="text"
                    placeholder="90210"
                    value={cardZip}
                    onChange={(e) => setCardZip(e.target.value)}
                    className="w-full text-xs font-mono p-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary: Sticky Order Review (5 Cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg space-y-4">
            <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-3">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* List items */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex gap-3 text-xs">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-12 h-12 object-cover rounded-md border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{item.productName}</p>
                    <p className="text-[11px] text-slate-500">
                      {item.quantity.toLocaleString()} units • {item.size.dimensions}
                    </p>
                    <span className="text-[10px] text-sky-700 font-semibold">{item.turnaround.days}</span>
                  </div>
                  <div className="font-black text-slate-900">${item.totalPrice.toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax:</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-sky-700">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isProcessing || cart.length === 0}
              className="w-full py-4 px-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Authorizing Stripe Payment...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order (${finalTotal.toFixed(2)})</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-center text-slate-500 space-y-1">
              <p>Your card will only be charged upon order authorization.</p>
              <p className="text-emerald-700 font-bold">Digital PDF proof included for your approval prior to printing.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
