import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { Order, OrderStatus, Product, QuoteRequest } from '../types/print';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileCheck2,
  Sparkles,
  Upload,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Truck,
  DollarSign,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Send,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

const ALL_ORDER_STATUSES: OrderStatus[] = [
  'Pending Payment',
  'Paid',
  'Artwork Pending',
  'Artwork Review',
  'Proof Required',
  'Proof Sent',
  'Customer Approval Required',
  'Approved',
  'In Production',
  'Shipped',
  'Completed',
];

export const AdminPanel: React.FC = () => {
  const {
    orders,
    products,
    customers,
    quotes,
    updateOrderStatus,
    updateOrderTracking,
    uploadProofVersion,
    updateQuoteStatus,
    updateProduct,
    addProduct,
    setSelectedOrderId,
    setCurrentView,
    showToast
  } = usePrintStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'customers' | 'quotes' | 'proofs'>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Proof upload form state
  const [proofMockUrl, setProofMockUrl] = useState('');
  const [designerComment, setDesignerComment] = useState('');

  // Tracking form state
  const [carrierInput, setCarrierInput] = useState('UPS Ground');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // KPIs
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingArtworkCount = orders.filter((o) => o.orderStatus === 'Artwork Review' || o.orderStatus === 'Artwork Pending').length;
  const pendingProofsCount = orders.filter((o) => o.orderStatus === 'Proof Sent' || o.orderStatus === 'Proof Required').length;
  const newQuotesCount = quotes.filter((q) => q.status === 'New').length;

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUploadProof = (orderId: string) => {
    if (!designerComment.trim()) {
      showToast('Please add preflight/designer notes before dispatching the proof.', 'warning');
      return;
    }

    const proofUrl =
      proofMockUrl.trim() ||
      selectedOrder?.items[0]?.artworkFile?.previewUrl ||
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80';

    uploadProofVersion(orderId, proofUrl, designerComment);
    setProofMockUrl('');
    setDesignerComment('');
  };

  const handleShipOrder = (orderId: string) => {
    if (!trackingNumberInput.trim()) {
      showToast('Please enter a tracking number.', 'warning');
      return;
    }
    updateOrderTracking(orderId, carrierInput, trackingNumberInput.trim());
    setTrackingNumberInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400">
              Print4Colors Commercial Operations Panel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Management & Preflight Console</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage 11-step print order lifecycles, inspect customer uploaded artwork, issue digital proofs, and review quotes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            ← View Public Store
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-6 text-sm font-bold scrollbar-none">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'border-sky-600 text-sky-600 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-sky-600 text-sky-600 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('proofs')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'proofs'
              ? 'border-sky-600 text-sky-600 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-rose-500" />
          Proofs & Artwork Review
          {pendingProofsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">
              {pendingProofsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-sky-600 text-sky-600 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Catalog Products ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'customers'
              ? 'border-sky-600 text-sky-600 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Customers ({customers.length})
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'quotes'
              ? 'border-sky-600 text-sky-600 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Quote Requests
          {newQuotesCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">
              {newQuotesCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Gross Sales</span>
              <div className="text-2xl font-black text-slate-900">${totalSales.toFixed(2)}</div>
              <p className="text-[11px] text-emerald-600 font-bold">100% Online Authorized</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</span>
              <div className="text-2xl font-black text-slate-900">{totalOrdersCount}</div>
              <p className="text-[11px] text-sky-600 font-medium">Commercial US print runs</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Artwork</span>
              <div className="text-2xl font-black text-amber-600">{pendingArtworkCount}</div>
              <p className="text-[11px] text-slate-500 font-medium">Needs preflight check</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Proofs</span>
              <div className="text-2xl font-black text-rose-600">{pendingProofsCount}</div>
              <p className="text-[11px] text-rose-600 font-bold">Awaiting client signoff</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Quote Inquiries</span>
              <div className="text-2xl font-black text-indigo-600">{quotes.length}</div>
              <p className="text-[11px] text-indigo-600 font-bold">{newQuotesCount} need response</p>
            </div>
          </div>

          {/* Recent Orders Quick Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-base">Recent Commercial Orders</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-sky-600 hover:underline cursor-pointer"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer & Company</th>
                    <th className="p-3.5">Product & Quantity</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-mono font-black text-sky-700">#{o.id}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{o.customer.name}</div>
                        <div className="text-slate-400 text-[11px]">{o.customer.company || o.customer.email}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-800">{o.items[0]?.productName}</div>
                        <div className="text-slate-500 text-[11px]">{o.items[0]?.quantity.toLocaleString()} units</div>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">${o.total.toFixed(2)}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-sky-100 text-sky-800">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrder(o);
                            setActiveTab('orders');
                          }}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold text-[11px] transition cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FULL ORDERS MANAGEMENT (WITH ALL 11 STATUSES) */}
      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Orders List (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-sm">Orders Queue</h3>
                <span className="text-xs text-slate-400 font-bold">{filteredOrders.length} orders</span>
              </div>

              {/* Filter by status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-700"
              >
                <option value="all">All Statuses (11 States)</option>
                {ALL_ORDER_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by ID, name, email..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full text-xs p-2 pl-8 border border-slate-300 rounded-xl"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredOrders.map((o) => {
                const isSelected = selectedOrder?.id === o.id;
                return (
                  <div
                    key={o.id}
                    onClick={() => setSelectedOrder(o)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition space-y-1.5 ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-black text-sky-700">#{o.id}</span>
                      <span className="font-bold text-slate-900">${o.total.toFixed(2)}</span>
                    </div>
                    <div className="font-bold text-slate-800 truncate">{o.customer.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{o.items[0]?.productName}</div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                      <span className="text-[10px] text-slate-400">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {o.orderStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Order Detailed Workbench (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            {selectedOrder ? (
              <>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Order Operations</span>
                    <h2 className="text-2xl font-black text-slate-900 font-mono">
                      #{selectedOrder.id}
                    </h2>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">Placed on:</span>
                    <div className="text-xs font-bold text-slate-700">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 11-STATUS CHANGER */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Update Order Status (11 Official Document States)
                    </label>
                    <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      Current: {selectedOrder.orderStatus}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {ALL_ORDER_STATUSES.map((status) => {
                      const isCurrent = selectedOrder.orderStatus === status;
                      return (
                        <button
                          key={status}
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, status);
                            setSelectedOrder({
                              ...selectedOrder,
                              orderStatus: status,
                            });
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                            isCurrent
                              ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tracking & Carrier Dispatch */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-sky-600" />
                    Dispatch Tracking (FedEx / UPS)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={carrierInput}
                      onChange={(e) => setCarrierInput(e.target.value)}
                      className="p-2 bg-white border border-slate-300 rounded-lg font-bold"
                    >
                      <option value="UPS Ground">UPS Ground</option>
                      <option value="FedEx Ground">FedEx Ground</option>
                      <option value="FedEx Priority Overnight">FedEx Priority Overnight</option>
                      <option value="USPS Priority Mail">USPS Priority Mail</option>
                    </select>

                    <input
                      type="text"
                      placeholder="e.g. 1Z9999999999999999"
                      value={trackingNumberInput}
                      onChange={(e) => setTrackingNumberInput(e.target.value)}
                      className="p-2 bg-white border border-slate-300 rounded-lg font-mono"
                    />

                    <button
                      onClick={() => handleShipOrder(selectedOrder.id)}
                      className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition cursor-pointer"
                    >
                      Mark as Shipped
                    </button>
                  </div>

                  {selectedOrder.trackingNumber && (
                    <div className="pt-2 text-indigo-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Shipped via {selectedOrder.carrier}: {selectedOrder.trackingNumber}
                    </div>
                  )}
                </div>

                {/* Preflight & Proof Upload Studio for this Order */}
                <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-4">
                  <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-rose-500" />
                    Issue Digital Proof Version (Preflight Team)
                  </h4>

                  {/* Customer uploaded files */}
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-2">
                    <span className="font-bold text-slate-700 block">Customer Submitted File:</span>
                    {selectedOrder.items[0]?.artworkFile ? (
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                        <div className="flex items-center space-x-2">
                          <span className="w-8 h-8 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                            PDF
                          </span>
                          <div>
                            <div className="font-bold text-slate-900">
                              {selectedOrder.items[0].artworkFile.name}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {selectedOrder.items[0].artworkFile.size} • 300 DPI Preflight OK
                            </div>
                          </div>
                        </div>

                        <a
                          href={selectedOrder.items[0].artworkFile.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold text-[11px] flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View File
                        </a>
                      </div>
                    ) : (
                      <p className="text-slate-500">Customer utilized online Template Customizer.</p>
                    )}
                  </div>

                  {/* Upload new proof version form */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Proof Mockup Image URL (Optional - defaults to high-res render)
                      </label>
                      <input
                        type="text"
                        placeholder="https://... or leave blank for auto-generated preview"
                        value={proofMockUrl}
                        onChange={(e) => setProofMockUrl(e.target.value)}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preflight Designer Comments & Notes for Customer:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. 'Bleeds verified 0.125 inch. Text within safe zone. Converted to CMYK profile.'"
                        value={designerComment}
                        onChange={(e) => setDesignerComment(e.target.value)}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <button
                      onClick={() => handleUploadProof(selectedOrder.id)}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Upload & Dispatch Proof (Version {selectedOrder.proofs.length + 1})</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400">Select an order from the list</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PROOFS REVIEW CENTER */}
      {activeTab === 'proofs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-slate-900 text-lg">Preflight & Digital Proofs Hub</h3>
              <p className="text-xs text-slate-500">
                Track proofs dispatched to customers, customer approvals, and change requests.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter((o) => o.proofs.length > 0)
              .map((ord) => {
                const latest = ord.proofs[ord.proofs.length - 1];
                return (
                  <div
                    key={ord.id}
                    className="border border-slate-200 rounded-2xl p-5 space-y-4 hover:shadow-md transition bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono font-black text-sky-700 text-sm">#{ord.id}</span>
                        <div className="font-bold text-slate-800 text-xs mt-0.5">{ord.customer.name}</div>
                      </div>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          latest.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : latest.status === 'Changes Requested'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        v{latest.version}: {latest.status}
                      </span>
                    </div>

                    <img
                      src={latest.proofImageUrl}
                      alt="Proof Preview"
                      className="w-full h-36 object-cover rounded-xl border border-slate-200"
                    />

                    <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-3 rounded-xl">
                      <p><strong>Comments:</strong> {latest.designerComments}</p>
                      {latest.customerFeedback && (
                        <p className="text-rose-700 font-bold">
                          Client requested: "{latest.customerFeedback}"
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrderId(ord.id);
                          setCurrentView('proof-review');
                        }}
                        className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-sky-600 transition cursor-pointer text-center"
                      >
                        Inspect Proof Studio
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-slate-900 text-lg">Product Catalog & Pricing Control</h3>
              <p className="text-xs text-slate-500">
                Configure prices, paper stocks, turnaround options and commercial descriptions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border border-slate-200 rounded-2xl p-5 space-y-3 hover:shadow-md transition bg-white"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-36 object-cover rounded-xl border border-slate-200"
                />
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                      {p.categoryName}
                    </span>
                    <span className="font-black text-slate-900 text-sm">
                      From ${p.startingPrice.toFixed(2)}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{p.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{p.sizes.length} Sizes</span>
                  <span>{p.stocks.length} Stocks</span>
                  <span>{p.standardTurnaround}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CUSTOMERS DIRECTORY */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-black text-slate-900 text-lg">Customer Directory</h3>
            <p className="text-xs text-slate-500">
              Verified commercial clients, agencies, and retail accounts.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Default Shipping Address</th>
                  <th className="p-3.5 text-right">Orders Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c) => {
                  const custOrders = orders.filter(
                    (o) => o.customer.email.toLowerCase() === c.email.toLowerCase()
                  );
                  return (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{c.name}</td>
                      <td className="p-3.5 font-medium text-slate-700">{c.company}</td>
                      <td className="p-3.5 text-slate-600">
                        <div>{c.email}</div>
                        <div className="text-slate-400">{c.phone}</div>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {c.addresses[0]?.street}, {c.addresses[0]?.city} {c.addresses[0]?.state}
                      </td>
                      <td className="p-3.5 text-right font-black text-slate-900">
                        {custOrders.length} orders
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: QUOTE REQUESTS MANAGER */}
      {activeTab === 'quotes' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-black text-slate-900 text-lg">Custom Print Quote Inquiries</h3>
            <p className="text-xs text-slate-500">
              Submissions from the "Request a Quote" form for special die-cuts, custom substrates, and large volume jobs.
            </p>
          </div>

          <div className="space-y-4">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="p-5 border border-slate-200 rounded-2xl hover:border-slate-300 transition space-y-3 bg-slate-50/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-black text-sky-700 text-sm">#{q.id}</span>
                    <span className="font-bold text-slate-900 text-sm">{q.name}</span>
                    {q.company && <span className="text-xs text-slate-500">({q.company})</span>}
                  </div>
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      q.status === 'New'
                        ? 'bg-amber-100 text-amber-800'
                        : q.status === 'Quote Sent'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {q.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-bold block">Product Requested:</span>
                    <span className="font-extrabold text-slate-900">{q.product}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Quantity & Dimensions:</span>
                    <span className="font-bold text-slate-800">{q.quantity} • {q.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Contact:</span>
                    <span className="font-medium text-slate-700">{q.email} • {q.phone}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-800 block">Requirements:</span>
                  <p>{q.requirements}</p>
                  {q.artworkFileName && (
                    <div className="text-emerald-700 font-bold mt-1">
                      Artwork attached: {q.artworkFileName}
                    </div>
                  )}
                </div>

                {/* Admin quoting actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuoteStatus(q.id, 'Quote Sent', 'Official estimate emailed.', 1850)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Email Estimate to Client
                    </button>
                    <button
                      onClick={() => updateQuoteStatus(q.id, 'Reviewing')}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Mark Under Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
