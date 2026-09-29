import React from 'react';
import { PrintProvider, usePrintStore } from './context/PrintStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogView } from './components/CatalogView';
import { ProductConfigurator } from './components/ProductConfigurator';
import { TemplatesGallery } from './components/TemplatesGallery';
import { TemplateCustomizer } from './components/TemplateCustomizer';
import { CustomerDashboard } from './components/CustomerDashboard';
import { ProofApprovalView } from './components/ProofApprovalView';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { SampleKitModal } from './components/SampleKitModal';
import { ArtworkGuidelinesModal } from './components/ArtworkGuidelinesModal';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedProductId,
    products,
    selectedOrderId,
    orders,
    selectedTemplateId,
    toasts,
    removeToast
  } = usePrintStore();

  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Universal Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}

        {currentView === 'catalog' && <CatalogView />}

        {currentView === 'configurator' && (
          <ProductConfigurator
            product={activeProduct}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'templates' && <TemplatesGallery />}

        {currentView === 'template-customizer' && (
          <TemplateCustomizer
            initialTemplateId={selectedTemplateId}
            onBack={() => setCurrentView('templates')}
          />
        )}

        {currentView === 'customer-dashboard' && <CustomerDashboard />}

        {currentView === 'proof-review' && (
          <ProofApprovalView
            order={activeOrder}
            onBack={() => setCurrentView('customer-dashboard')}
          />
        )}

        {currentView === 'admin-panel' && <AdminPanel />}

        {currentView === 'checkout' && (
          <CheckoutView onBackToCart={() => setCurrentView('catalog')} />
        )}
      </main>

      {/* Commercial Print Footer */}
      <Footer />

      {/* Persistent Modals & Drawers */}
      <CartDrawer />
      <QuoteRequestModal />
      <SampleKitModal />
      <ArtworkGuidelinesModal />

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs font-bold transition-all border ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-emerald-500'
                : toast.type === 'warning'
                ? 'bg-amber-900 text-amber-100 border-amber-600'
                : toast.type === 'error'
                ? 'bg-rose-900 text-rose-100 border-rose-600'
                : 'bg-slate-900 text-slate-100 border-sky-500'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <PrintProvider>
      <AppContent />
    </PrintProvider>
  );
}
