import React, { useState } from 'react';
import { Order, ProofVersion } from '../types/print';
import { usePrintStore } from '../context/PrintStore';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  MessageSquare,
  FileCheck,
  Eye,
  ZoomIn,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  order: Order;
  onBack: () => void;
}

export const ProofApprovalView: React.FC<Props> = ({ order, onBack }) => {
  const { approveProof, requestProofChanges, showToast } = usePrintStore();

  const proofs = order.proofs || [];
  const latestProof = proofs[proofs.length - 1];

  const [activeVersionNum, setActiveVersionNum] = useState<number>(
    latestProof ? latestProof.version : 1
  );
  const [changeFeedback, setChangeFeedback] = useState('');
  const [isRequestingChanges, setIsRequestingChanges] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<1 | 1.5 | 2>(1);

  const currentProof = proofs.find((p) => p.version === activeVersionNum) || latestProof;

  const handleApprove = () => {
    if (!currentProof) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    approveProof(order.id, currentProof.version);
    showToast(`Proof v${currentProof.version} Approved! Order is now In Production.`, 'success');
  };

  const handleSendFeedback = () => {
    if (!changeFeedback.trim()) {
      showToast('Please type your requested adjustments before submitting.', 'warning');
      return;
    }
    if (!currentProof) return;

    requestProofChanges(order.id, currentProof.version, changeFeedback);
    setChangeFeedback('');
    setIsRequestingChanges(false);
  };

  if (!currentProof) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-slate-500">No proof has been generated for this order yet.</p>
        <button onClick={onBack} className="text-sky-600 font-bold hover:underline">
          ← Return to Dashboard
        </button>
      </div>
    );
  }

  const isApproved = currentProof.status === 'Approved';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Breadcrumb & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Online Proof Approval System
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">Order #{order.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Proof Review: {order.items[0]?.productName}
            </h1>
          </div>
        </div>

        {/* Proof Status Badge */}
        <div className="flex items-center gap-2">
          {isApproved ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 flex items-center gap-1.5 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Proof Approved for Press
            </span>
          ) : currentProof.status === 'Changes Requested' ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 flex items-center gap-1.5 border border-amber-300">
              <RotateCcw className="w-4 h-4 text-amber-600" />
              Changes Requested - Preflight Revising
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 flex items-center gap-1.5 border border-rose-300 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Customer Action Required: Approve or Request Changes
            </span>
          )}
        </div>
      </div>

      {/* Main Proof Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Proof Viewer Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-6 shadow-xl space-y-4">
          {/* Proof Canvas Header Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-slate-300 text-xs border-b border-slate-800 pb-3">
            {/* Version Tabs */}
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-medium mr-1">Proof Version:</span>
              {proofs.map((p) => (
                <button
                  key={p.version}
                  onClick={() => setActiveVersionNum(p.version)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                    activeVersionNum === p.version
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Version {p.version} {p.status === 'Approved' && '✓'}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-[11px]">Zoom:</span>
              <button
                onClick={() => setZoomLevel(1)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  zoomLevel === 1 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                100%
              </button>
              <button
                onClick={() => setZoomLevel(1.5)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  zoomLevel === 1.5 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                150%
              </button>
              <button
                onClick={() => setZoomLevel(2)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  zoomLevel === 2 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                200%
              </button>
            </div>
          </div>

          {/* Proof Image Stage */}
          <div className="relative min-h-[420px] bg-slate-900 rounded-xl overflow-auto flex items-center justify-center p-6 border border-slate-800">
            <div
              className="transition-transform duration-200 relative shadow-2xl rounded-lg overflow-hidden border-2 border-white/20"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={currentProof.proofImageUrl}
                alt={`Proof v${currentProof.version}`}
                className="max-w-full max-h-[500px] object-contain rounded"
              />

              {/* Bleed, Trim & Safe Zone Overlays */}
              <div className="absolute inset-0 border-2 border-dashed border-rose-500/70 pointer-events-none"></div>
              <div className="absolute inset-2 border border-white/60 pointer-events-none"></div>
              <div className="absolute inset-4 border border-dashed border-emerald-400/70 pointer-events-none"></div>
            </div>

            {/* Print Guides Note Badge */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-[10px] text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-rose-500 inline-block"></span> 0.125" Bleed Line
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-white inline-block"></span> Cut Trim Line
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-emerald-400 inline-block"></span> Safe Zone Margin
              </span>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            Please carefully inspect spellings, phone numbers, addresses, and margins. What you approve is what will print.
          </div>
        </div>

        {/* Right Column: Preflight Notes, Version History & Decision Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Preflight & Designer Comments */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-100 pb-2.5">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              Preflight Designer Remarks
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1.5 border border-slate-200/60">
              <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                <span>{currentProof.designerName}</span>
                <span>{new Date(currentProof.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="font-medium leading-relaxed">{currentProof.designerComments}</p>
            </div>

            {/* Customer Feedback if already requested changes */}
            {currentProof.customerFeedback && (
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 space-y-1 border border-amber-200">
                <div className="font-bold flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                  Your Change Request:
                </div>
                <p className="italic">"{currentProof.customerFeedback}"</p>
                <div className="text-[10px] text-amber-600">
                  Submitted on {new Date(currentProof.feedbackDate || '').toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>

          {/* Order Specifications Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2.5 text-xs">
            <h4 className="font-extrabold text-slate-900 border-b border-slate-100 pb-2">
              Print Job Specifications
            </h4>
            <div className="flex justify-between text-slate-600">
              <span>Item:</span>
              <span className="font-bold text-slate-900 text-right">{order.items[0]?.productName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Size:</span>
              <span className="font-bold text-slate-900">{order.items[0]?.size.dimensions}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Quantity:</span>
              <span className="font-bold text-sky-700">{order.items[0]?.quantity.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Paper Stock:</span>
              <span className="font-bold text-slate-900 truncate max-w-[160px]">{order.items[0]?.stock.name}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Coating / Finish:</span>
              <span className="font-bold text-slate-900 truncate max-w-[160px]">{order.items[0]?.coating.name}</span>
            </div>
          </div>

          {/* CUSTOMER DECISION PANEL (APPROVE OR REQUEST CHANGES) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg space-y-4">
            <h4 className="font-extrabold text-slate-900 text-sm">Customer Approval Action</h4>

            {isApproved ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-black text-emerald-900 text-sm">
                  You have Approved this Proof!
                </p>
                <p className="text-xs text-emerald-700">
                  This job has been released directly to the press production department.
                </p>
              </div>
            ) : isRequestingChanges ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Describe what needs adjustment:
                </label>
                <textarea
                  rows={3}
                  value={changeFeedback}
                  onChange={(e) => setChangeFeedback(e.target.value)}
                  placeholder="e.g., 'Please move the company logo 0.25 inches to the right, and correct phone number to (415) 555-0199'"
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSendFeedback}
                    className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Preflight Team</span>
                  </button>
                  <button
                    onClick={() => setIsRequestingChanges(false)}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* 1. APPROVE BUTTON */}
                <button
                  onClick={handleApprove}
                  className="w-full py-4 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>APPROVE PROOF FOR PRINTING</span>
                </button>

                {/* 2. REQUEST CHANGES BUTTON */}
                <button
                  onClick={() => setIsRequestingChanges(true)}
                  className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>REQUEST CHANGES / REVISION</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
