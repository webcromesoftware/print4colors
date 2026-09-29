import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Template,
  Order,
  OrderStatus,
  QuoteRequest,
  CustomerUser,
  ConfiguredItem,
  ProofVersion,
  TemplateCustomization
} from '../types/print';
import {
  PRODUCTS as INITIAL_PRODUCTS_LIST,
  TEMPLATES as INITIAL_TEMPLATES_LIST,
  INITIAL_ORDERS,
  INITIAL_QUOTES,
  INITIAL_CUSTOMERS
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface PrintContextType {
  // Navigation & Role
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Role
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  currentUser: CustomerUser;
  switchUser: (userId: string) => void;

  // Data
  products: Product[];
  templates: Template[];
  orders: Order[];
  quotes: QuoteRequest[];
  cart: ConfiguredItem[];
  customers: CustomerUser[];

  // Cart operations
  addToCart: (item: ConfiguredItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQty: (itemId: string, qty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountAmount: number;
  applyPromoCode: (code: string) => boolean;

  // Order Operations
  placeOrder: (shippingInfo: any, paymentDetails: any) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  updateOrderTracking: (orderId: string, carrier: string, trackingNumber: string) => void;
  uploadProofVersion: (orderId: string, proofImageUrl: string, designerComments: string) => void;
  approveProof: (orderId: string, versionNumber: number) => void;
  requestProofChanges: (orderId: string, versionNumber: number, feedback: string) => void;
  reorderItem: (orderItem: ConfiguredItem) => void;

  // Quotes
  submitQuoteRequest: (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateQuoteStatus: (quoteId: string, status: QuoteRequest['status'], adminNotes?: string, quotedAmount?: number) => void;

  // Products Admin
  updateProduct: (updated: Product) => void;
  addProduct: (newProd: Product) => void;

  // Toasts / Feedback
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Modals
  isSampleKitOpen: boolean;
  setIsSampleKitOpen: (val: boolean) => void;
  isGuidelinesOpen: boolean;
  setIsGuidelinesOpen: (val: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (val: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (val: boolean) => void;
}

const PrintContext = createContext<PrintContextType | undefined>(undefined);

export const PrintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Role & User
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomerUser[]>(() => {
    const saved = localStorage.getItem('p4c_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  const [currentUser, setCurrentUser] = useState<CustomerUser>(customers[0]);

  // Catalog
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('p4c_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS_LIST;
  });
  const [templates] = useState<Template[]>(INITIAL_TEMPLATES_LIST);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('p4c_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Quotes
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('p4c_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  // Cart
  const [cart, setCart] = useState<ConfiguredItem[]>(() => {
    const saved = localStorage.getItem('p4c_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('p4c_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('p4c_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('p4c_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('p4c_products', JSON.stringify(products));
  }, [products]);

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartTotalCount = cart.length;
  const discountAmount = Number((cartSubtotal * (discountPercent / 100)).toFixed(2));

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoCode('WELCOME10');
      showToast('Promo code WELCOME10 applied! (10% off)', 'success');
      return true;
    }
    if (clean === 'PRINT15') {
      setDiscountPercent(15);
      setPromoCode('PRINT15');
      showToast('Promo code PRINT15 applied! (15% off)', 'success');
      return true;
    }
    if (clean === 'FREESHIP') {
      setPromoCode('FREESHIP');
      showToast('Free Express Shipping code applied!', 'success');
      return true;
    }
    showToast('Invalid or expired coupon code', 'error');
    return false;
  };

  const addToCart = (item: ConfiguredItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Added ${item.quantity.toLocaleString()}x ${item.productName} to your cart!`, 'success');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartItemQty = (itemId: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const ratio = qty / item.quantity;
          const adjustedPrice = Math.round(item.totalPrice * (ratio > 1 ? ratio * 0.9 : ratio) * 100) / 100;
          return {
            ...item,
            quantity: qty,
            totalPrice: adjustedPrice,
            unitPrice: Math.round((adjustedPrice / qty) * 1000) / 1000,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const switchUser = (userId: string) => {
    const found = customers.find((c) => c.id === userId);
    if (found) {
      setCurrentUser(found);
      showToast(`Switched account to: ${found.name}`, 'info');
    }
  };

  // Place Order
  const placeOrder = (shippingInfo: any, paymentDetails: any): Order => {
    const orderNumber = `P4C-${Math.floor(10000 + Math.random() * 90000)}`;
    const shippingCost = cartSubtotal >= 50 || promoCode === 'FREESHIP' ? 0 : 9.99;
    const estimatedTax = Number(((cartSubtotal - discountAmount) * 0.0825).toFixed(2));
    const grandTotal = Number((cartSubtotal - discountAmount + shippingCost + estimatedTax).toFixed(2));

    const needsProof = cart.some((i) => i.artworkType === 'upload' || i.artworkType === 'template');

    const newOrder: Order = {
      id: orderNumber,
      createdAt: new Date().toISOString(),
      customer: {
        name: shippingInfo.name || currentUser.name,
        email: shippingInfo.email || currentUser.email,
        phone: shippingInfo.phone || currentUser.phone,
        company: shippingInfo.company || currentUser.company,
      },
      shippingAddress: {
        street: shippingInfo.street,
        suite: shippingInfo.suite || '',
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: 'United States',
      },
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      promoCode: promoCode || undefined,
      shippingFee: shippingCost,
      shippingMethod: shippingInfo.shippingMethod || 'Standard Ground (2-3 Business Days)',
      tax: estimatedTax,
      total: grandTotal,
      paymentStatus: 'Paid',
      paymentMethod: `Stripe Credit Card (ending in ${paymentDetails?.last4 || '4242'})`,
      paymentTransactionId: `ch_${Math.random().toString(36).substring(2, 15)}`,
      orderStatus: needsProof ? 'Artwork Review' : 'In Production',
      statusHistory: [
        {
          status: 'Paid',
          timestamp: new Date().toISOString(),
          note: 'Online payment authorized via Stripe.',
        },
        {
          status: needsProof ? 'Artwork Review' : 'In Production',
          timestamp: new Date().toISOString(),
          note: needsProof ? 'Artwork submitted for automatic preflight review.' : 'Routed directly to print queue.',
        },
      ],
      proofs: needsProof
        ? [
            {
              version: 1,
              proofImageUrl: cart[0]?.artworkFile?.previewUrl || cart[0]?.imageUrl,
              createdAt: new Date().toISOString(),
              designerName: 'Automated Preflight Engine',
              designerComments: 'Bleed line: 0.125 inch verified. Color profile: CMYK US Sheetfed Coated. High-resolution check passed.',
              status: 'Pending Customer Approval',
            },
          ]
        : [],
      estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderId(newOrder.id);
    showToast(`Order #${newOrder.id} placed successfully! Thank you for your business.`, 'success');
    return newOrder;
  };

  // Status updates
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: newStatus,
            statusHistory: [
              ...ord.statusHistory,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                note: note || `Order updated to ${newStatus}`,
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} marked as "${newStatus}"`, 'info');
  };

  const updateOrderTracking = (orderId: string, carrier: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            carrier,
            trackingNumber,
            orderStatus: 'Shipped',
            statusHistory: [
              ...ord.statusHistory,
              {
                status: 'Shipped',
                timestamp: new Date().toISOString(),
                note: `Shipped via ${carrier}. Tracking: ${trackingNumber}`,
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`Tracking updated for Order #${orderId}`, 'success');
  };

  // Proof Approval Workflow
  const uploadProofVersion = (orderId: string, proofImageUrl: string, designerComments: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextVersion = ord.proofs.length + 1;
          const newProof: ProofVersion = {
            version: nextVersion,
            proofImageUrl,
            createdAt: new Date().toISOString(),
            designerName: 'Print4Colors Preflight Department',
            designerComments,
            status: 'Pending Customer Approval',
          };
          return {
            ...ord,
            orderStatus: 'Proof Sent',
            proofs: [...ord.proofs, newProof],
            statusHistory: [
              ...ord.statusHistory,
              {
                status: 'Proof Sent',
                timestamp: new Date().toISOString(),
                note: `Proof version ${nextVersion} uploaded and sent to customer for review.`,
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`New proof version dispatched to customer!`, 'success');
  };

  const approveProof = (orderId: string, versionNumber: number) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedProofs = ord.proofs.map((p) => {
            if (p.version === versionNumber) {
              return {
                ...p,
                status: 'Approved' as const,
                feedbackDate: new Date().toISOString(),
              };
            }
            return p;
          });
          return {
            ...ord,
            orderStatus: 'Approved',
            proofs: updatedProofs,
            statusHistory: [
              ...ord.statusHistory,
              {
                status: 'Approved',
                timestamp: new Date().toISOString(),
                note: `Customer approved proof v${versionNumber}. Ready for press production.`,
              },
              {
                status: 'In Production',
                timestamp: new Date().toISOString(),
                note: 'Sent to Heidelberg 8-Color UV Offset Press.',
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`Proof v${versionNumber} Approved! Sent directly into production queue.`, 'success');
  };

  const requestProofChanges = (orderId: string, versionNumber: number, feedback: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedProofs = ord.proofs.map((p) => {
            if (p.version === versionNumber) {
              return {
                ...p,
                status: 'Changes Requested' as const,
                customerFeedback: feedback,
                feedbackDate: new Date().toISOString(),
              };
            }
            return p;
          });
          return {
            ...ord,
            orderStatus: 'Artwork Review',
            proofs: updatedProofs,
            statusHistory: [
              ...ord.statusHistory,
              {
                status: 'Artwork Review',
                timestamp: new Date().toISOString(),
                note: `Customer requested adjustments on v${versionNumber}: "${feedback}"`,
              },
            ],
          };
        }
        return ord;
      })
    );
    showToast(`Feedback submitted to our preflight team. We'll issue a revised proof promptly!`, 'info');
  };

  const reorderItem = (orderItem: ConfiguredItem) => {
    const newItem: ConfiguredItem = {
      ...orderItem,
      id: `reorder-${Math.random().toString(36).substring(2, 9)}`,
    };
    addToCart(newItem);
  };

  // Quotes
  const submitQuoteRequest = (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `QR-${Math.floor(2000 + Math.random() * 8000)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setQuotes((prev) => [newQuote, ...prev]);
    showToast(`Quote request #${newQuote.id} received! Our estimators will review and email you shortly.`, 'success');
  };

  const updateQuoteStatus = (
    quoteId: string,
    status: QuoteRequest['status'],
    adminNotes?: string,
    quotedAmount?: number
  ) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) {
          return {
            ...q,
            status,
            adminNotes: adminNotes !== undefined ? adminNotes : q.adminNotes,
            quotedAmount: quotedAmount !== undefined ? quotedAmount : q.quotedAmount,
          };
        }
        return q;
      })
    );
    showToast(`Quote #${quoteId} updated to ${status}`, 'info');
  };

  // Admin Products
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated successfully`, 'success');
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`New product "${newProd.name}" added to catalog`, 'success');
  };

  return (
    <PrintContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedTemplateId,
        setSelectedTemplateId,
        selectedOrderId,
        setSelectedOrderId,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        isAdmin,
        setIsAdmin,
        currentUser,
        switchUser,
        products,
        templates,
        orders,
        quotes,
        cart,
        customers,
        addToCart,
        removeFromCart,
        updateCartItemQty,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        promoCode,
        setPromoCode,
        discountAmount,
        applyPromoCode,
        placeOrder,
        updateOrderStatus,
        updateOrderTracking,
        uploadProofVersion,
        approveProof,
        requestProofChanges,
        reorderItem,
        submitQuoteRequest,
        updateQuoteStatus,
        updateProduct,
        addProduct,
        toasts,
        showToast,
        removeToast,
        isSampleKitOpen,
        setIsSampleKitOpen,
        isGuidelinesOpen,
        setIsGuidelinesOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </PrintContext.Provider>
  );
};

export const usePrintStore = () => {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error('usePrintStore must be used within a PrintProvider');
  }
  return context;
};
