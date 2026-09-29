import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { Print4ColorsLogo } from './Print4ColorsLogo';
import {
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setCurrentView,
    setActiveCategory,
    setIsGuidelinesOpen,
    setIsSampleKitOpen,
    setIsQuoteModalOpen,
    showToast
  } = usePrintStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to Print4Colors updates & offers!', 'success');
      setNewsletterEmail('');
    } else {
      showToast('Please enter a valid email address.', 'info');
    }
  };

  return (
    <footer className="bg-[#0B132B] text-slate-400 text-xs font-['Plus_Jakarta_Sans',sans-serif] border-t border-slate-800">
      {/* Main 5-Column Grid Matching Mockup */}
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Column 1: Brand & Socials (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer inline-block"
          >
            <Print4ColorsLogo size="md" variant="dark" showTagline={true} />
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm pt-1">
            Professional printing, signage and marketing solutions for businesses of all sizes.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Shop (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wide">Shop</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button
                onClick={() => {
                  setActiveCategory('business-cards');
                  setCurrentView('catalog');
                }}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Business Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('marketing');
                  setCurrentView('catalog');
                }}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Marketing Products
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('signs-banners');
                  setCurrentView('catalog');
                }}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Signs & Banners
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('templates')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Templates
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setCurrentView('catalog');
                }}
                className="hover:text-white transition cursor-pointer text-left"
              >
                All Products
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Support (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wide">Support</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button
                onClick={() => setIsGuidelinesOpen(true)}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Help Center
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsGuidelinesOpen(true)}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Artwork Guidelines
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast('Standard Ground Shipping is 1-3 Business Days nationwide.', 'info')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Shipping Information
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast('100% Quality Reprint Guarantee on all defective or damaged prints.', 'info')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Returns
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Company (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wide">Company</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button
                onClick={() => showToast('Print4Colors is built on 25+ years of US commercial print expertise.', 'info')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast('Explore print tips, CMYK bleed setup guides, and industry news.', 'info')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Our Blog
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast('We are currently hiring print technicians and preflight specialists.', 'info')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Careers
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast('Commercial terms: Net 30 available for verified high-volume trade accounts.', 'info')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Terms & Conditions
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast('Your artwork files and personal data are protected by 256-bit encryption.', 'info')}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Subscribe to Our Newsletter (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-white text-sm tracking-wide">Subscribe to Our Newsletter</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Get the latest offers and printing tips.
          </p>

          <form onSubmit={handleSubscribe} className="pt-1">
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-transparent">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white p-2 transition shrink-0 cursor-pointer"
                title="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {subscribed && (
              <p className="text-emerald-400 text-[11px] mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed successfully!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar Matching Mockup */}
      <div className="border-t border-slate-800/80 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Print4Colors. All rights reserved.
          </div>
          <div className="font-bold tracking-wider uppercase text-slate-400 text-[11px]">
            Your Ideas. Our Print. Real Impact.
          </div>
        </div>
      </div>
    </footer>
  );
};
