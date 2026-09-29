import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { X, Send, Sparkles, UploadCloud, CheckCircle2 } from 'lucide-react';

export const QuoteRequestModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, submitQuoteRequest, showToast } = usePrintStore();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('Custom Embossed Presentation Folders');
  const [quantity, setQuantity] = useState('1,000');
  const [dimensions, setDimensions] = useState('9" x 12"');
  const [requirements, setRequirements] = useState('');
  const [notes, setNotes] = useState('');
  const [artworkFileName, setArtworkFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArtworkFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuoteRequest({
      name,
      company: company || undefined,
      email,
      phone,
      product,
      quantity,
      dimensions,
      requirements,
      notes: notes || undefined,
      hasArtwork: !!artworkFileName,
      artworkFileName: artworkFileName || undefined,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
        <button
          onClick={() => setIsQuoteModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-black text-slate-900">Custom Quote Request Submitted!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Our estimators will review your dimensions and finishing requirements and send a formal PDF quote to <strong>{email}</strong> within 2 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Custom Manufacturing & Specialty Finishes
              </div>
              <h2 className="text-2xl font-black text-slate-900">Request a Custom Print Quote</h2>
              <p className="text-xs text-slate-500">
                Need a unique size, foil embossing, die-cut shape, or bulk runs exceeding standard catalog tiers? We quote fast!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Studios"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-1">
                <label className="block font-bold text-slate-700 mb-1">Product *</label>
                <input
                  required
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Pocket Folders"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quantity *</label>
                <input
                  required
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 5,000"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dimensions *</label>
                <input
                  required
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 9x12, 4x6"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Specifications & Requirements *
              </label>
              <textarea
                required
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Paper stock preference, spot colors, foil stamping, laminates, delivery deadlines, zip code..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
              />
            </div>

            {/* Artwork File Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Attach Die-line or Artwork (Optional)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="quote-file-input"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="quote-file-input"
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer transition flex items-center gap-1.5"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  Choose File
                </label>
                {artworkFileName && (
                  <span className="text-xs text-emerald-600 font-semibold truncate max-w-xs">
                    {artworkFileName}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Custom Quote Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
