import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { supabaseDb, isSupabaseConfigured } from '../lib/supabase';
import { X, Package, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SampleKitModal: React.FC = () => {
  const { isSampleKitOpen, setIsSampleKitOpen, showToast } = usePrintStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');

  if (!isSampleKitOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSupabaseConfigured) {
      supabaseDb.insertSampleKit({
        name,
        company,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@samplekit.com`,
        phone: '',
        street,
        city,
        state,
        zip,
        interest: 'Commercial Paper Swatch Sample Kit'
      });
    }
    setSubmitted(true);
    showToast('Your Free US Paper Sample Kit is on its way via USPS Priority!', 'success');
    setTimeout(() => {
      setSubmitted(false);
      setIsSampleKitOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
        <button
          onClick={() => setIsSampleKitOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-black text-slate-900">Sample Kit Dispatched!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your comprehensive sample swatch kit includes 14pt/16pt cardstocks, Soft-Touch Velvet, Raised Spot UV, Cold Foil samples, and 13oz vinyl swatches.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider">
                <Package className="w-3.5 h-3.5" />
                100% Free • No Credit Card Required
              </div>
              <h2 className="text-2xl font-black text-slate-900">Request a Free Paper Sample Kit</h2>
              <p className="text-xs text-slate-500">
                Touch and feel our thick stocks, high gloss UV, velvet soft-touch, liquid foil stamping, and outdoor vinyl banner materials.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Studio</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Business name"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">US Shipping Address *</label>
                <input
                  required
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street address & suite"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block font-bold text-slate-700 mb-1">City *</label>
                  <input
                    required
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State *</label>
                  <input
                    required
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="CA"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ZIP *</label>
                  <input
                    required
                    type="text"
                    maxLength={5}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="90210"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              Send My Free Sample Kit
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Ships free via USPS First Class to any 50 US States.
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
