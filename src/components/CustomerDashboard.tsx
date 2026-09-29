import React, { useState } from 'react';
import { usePrintStore } from '../context/PrintStore';
import { Order, OrderStatus } from '../types/print';
import {
  Package,
  FileCheck2,
  Clock,
  Printer,
  RotateCw,
  ExternalLink,
  Truck,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Building,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';

const ORDER_STATUS_STEPS: OrderStatus[] = [
  'Paid',
  'Artwork Review',
  'Proof Sent',
  'Approved',
  'In Production',
  'Shipped',
  'Completed',
];

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    reorderItem,
    setSelectedOrderId,
    setCurrentView,
    showToast
  } = usePrintStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'proofs' | 'addresses' | 'profile'>('orders');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // Filter orders for the active customer
  const customerOrders = orders.filter(
    (o) =>
      o.customer.email.toLowerCase() === currentUser.email.toLowerCase() ||
      o.customer.name.toLowerCase() === currentUser.name.toLowerCase()
  );

  const pendingProofOrders = customerOrders.filter(
    (o) =>
      o.orderStatus === 'Proof Sent' ||
      o.orderStatus === 'Customer Approval Required' ||
      (o.proofs.length > 0 && o.proofs[o.proofs.length - 1].status === 'Pending Customer Approval')
  );

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Completed':
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Production':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Proof Sent':
      case 'Customer Approval Required':
        return 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse font-bold';
      case 'Artwork Review':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Paid':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Customer Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
              <span className="text-[11px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                Active Client
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{currentUser.company}</p>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
          </div>
        </div>

        {/* Quick Action KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Orders</span>
            <div className="text-xl font-black text-slate-900">{customerOrders.length}</div>
          </div>

          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-600">Pending Proofs</span>
            <div className="text-xl font-black text-rose-700">{pendingProofOrders.length}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Spent</span>
            <div className="text-xl font-black text-emerald-600">
              ${customerOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Proof Alert Banner if proofs waiting approval */}
      {pendingProofOrders.length > 0 && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-rose-950 text-sm">
                Action Required: {pendingProofOrders.length} Digital Proof Awaiting Your Approval!
              </h3>
              <p className="text-xs text-rose-700 mt-0.5">
                Inspect high-resolution bleeds and crop marks before we send this job to our Heidelberg offset presses.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedOrderId(pendingProofOrders[0].id);
              setCurrentView('proof-review');
            }}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-sm transition cursor-pointer whitespace-nowrap"
          >
            Review & Approve Proof #{pendingProofOrders[0].id} →
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition cursor-pointer ${
            activeTab === 'orders'
              ? 'border-sky-600 text-sky-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Orders ({customerOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('proofs')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'proofs'
              ? 'border-sky-600 text-sky-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Proof Approvals</span>
          {pendingProofOrders.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">
              {pendingProofOrders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 transition cursor-pointer ${
            activeTab === 'addresses'
              ? 'border-sky-600 text-sky-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Saved US Addresses
        </button>
      </div>

      {/* TAB 1: ORDERS LIST */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {customerOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700">No print orders found under this account.</p>
              <button
                onClick={() => setCurrentView('catalog')}
                className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold"
              >
                Start Your First Print Order
              </button>
            </div>
          ) : (
            customerOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-slate-50 p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Order Placed</span>
                      <span className="font-bold text-slate-800">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Order Number</span>
                      <span className="font-mono font-black text-sky-700 text-sm">#{order.id}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">Total Charged</span>
                      <span className="font-bold text-slate-900">${order.total.toFixed(2)}</span>
                    </div>

                    {order.trackingNumber && (
                      <div>
                        <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                          {order.carrier || 'Carrier'} Tracking
                        </span>
                        <span className="font-mono font-bold text-indigo-700 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          {order.trackingNumber}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-black border ${getStatusBadge(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>

                    {/* View Invoice button */}
                    <button
                      onClick={() => setSelectedOrderForInvoice(order)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                      title="View Official PDF Invoice"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 11-Status Progression Bar */}
                <div className="p-4 sm:p-5 bg-white border-b border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Live Production Milestones
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 overflow-x-auto pb-1 scrollbar-none gap-2">
                    {ORDER_STATUS_STEPS.map((st, idx) => {
                      const isPast =
                        ORDER_STATUS_STEPS.indexOf(order.orderStatus) >= idx ||
                        order.orderStatus === 'Completed';
                      const isCurrent = order.orderStatus === st;

                      return (
                        <div
                          key={st}
                          className={`flex items-center gap-1.5 whitespace-nowrap ${
                            isCurrent
                              ? 'text-sky-600 font-black'
                              : isPast
                              ? 'text-emerald-700 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              isCurrent
                                ? 'bg-sky-600 text-white ring-2 ring-sky-300'
                                : isPast
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-200 text-slate-400'
                            }`}
                          >
                            {isPast && !isCurrent ? '✓' : idx + 1}
                          </span>
                          <span>{st}</span>
                          {idx < ORDER_STATUS_STEPS.length - 1 && (
                            <span className="text-slate-200 mx-1">→</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-5 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200"
                        />
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-900 text-sm">{item.productName}</h4>
                          <div className="text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-0.5">
                            <span>Dimensions: <strong>{item.size.dimensions}</strong></span>
                            <span>•</span>
                            <span>Qty: <strong>{item.quantity.toLocaleString()}</strong></span>
                            <span>•</span>
                            <span>Stock: <strong>{item.stock.name}</strong></span>
                          </div>

                          {/* Proof / Artwork Action */}
                          {order.proofs && order.proofs.length > 0 && (
                            <div className="pt-1 flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedOrderId(order.id);
                                  setCurrentView('proof-review');
                                }}
                                className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                Review Proof (v{order.proofs[order.proofs.length - 1].version})
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Item Total & Reorder Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <span className="font-black text-slate-900 text-base">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                        <button
                          onClick={() => {
                            reorderItem(item);
                            showToast(`1-Click Reorder: Added ${item.productName} to Cart!`, 'success');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-slate-600" />
                          <span>1-Click Reorder</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: PROOFS LIST */}
      {activeTab === 'proofs' && (
        <div className="space-y-4">
          {pendingProofOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <p className="font-bold text-slate-800">All current proofs have been reviewed and approved!</p>
              <p className="text-xs text-slate-500 mt-1">There are no outstanding proofs requiring action.</p>
            </div>
          ) : (
            pendingProofOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-2xl p-6 border-2 border-rose-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={ord.proofs[ord.proofs.length - 1]?.proofImageUrl || ord.items[0]?.imageUrl}
                    alt="Proof Preview"
                    className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-xs"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                      Proof Ready for Approval
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {ord.items[0]?.productName} (Order #{ord.id})
                    </h3>
                    <p className="text-xs text-slate-600">
                      Preflight comments: "{ord.proofs[ord.proofs.length - 1]?.designerComments}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedOrderId(ord.id);
                    setCurrentView('proof-review');
                  }}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect & Approve Proof</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser.addresses.map((addr) => (
            <div key={addr.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-slate-900 text-sm">{addr.label}</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">Default</span>
              </div>
              <p className="text-xs text-slate-600">{addr.street}</p>
              <p className="text-xs text-slate-600">{addr.city}, {addr.state} {addr.zipCode}</p>
              <p className="text-xs text-slate-400">United States</p>
            </div>
          ))}
        </div>
      )}

      {/* INVOICE MODAL */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <div className="font-black text-2xl text-slate-900">
                  <span className="text-sky-600">Print</span>
                  <span className="text-rose-500">4</span>
                  <span>colors</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Official Commercial Print Invoice
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-black text-sky-700 text-base">
                  INVOICE #{selectedOrderForInvoice.id}
                </span>
                <p className="text-xs text-slate-400">
                  Date: {new Date(selectedOrderForInvoice.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Billed & Shipped To:</span>
                <p className="font-bold text-slate-800">{selectedOrderForInvoice.customer.name}</p>
                <p>{selectedOrderForInvoice.customer.company}</p>
                <p>{selectedOrderForInvoice.shippingAddress.street}</p>
                <p>
                  {selectedOrderForInvoice.shippingAddress.city},{' '}
                  {selectedOrderForInvoice.shippingAddress.state}{' '}
                  {selectedOrderForInvoice.shippingAddress.zipCode}
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 block mb-1">Payment Method:</span>
                <p>{selectedOrderForInvoice.paymentMethod}</p>
                <p className="text-emerald-600 font-bold">Status: PAID IN FULL</p>
              </div>
            </div>

            {/* Items table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-left">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedOrderForInvoice.items.map((i) => (
                    <tr key={i.id}>
                      <td className="p-3 font-medium text-slate-800">
                        {i.productName} ({i.size.dimensions}, {i.stock.name})
                      </td>
                      <td className="p-3 text-center text-slate-600">{i.quantity.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-slate-900">${i.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 text-right">
              <div>Subtotal: <strong>${selectedOrderForInvoice.subtotal.toFixed(2)}</strong></div>
              <div>Sales Tax: <strong>${selectedOrderForInvoice.tax.toFixed(2)}</strong></div>
              <div className="text-base font-black text-slate-900 pt-2 border-t">
                Total: ${selectedOrderForInvoice.total.toFixed(2)}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
