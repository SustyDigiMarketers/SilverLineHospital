import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Printer, X, Download, ShieldCheck } from 'lucide-react';
import { SubmissionResult, getFormReceiptTitle } from '../lib/formSubmission';

interface ReceiptModalProps {
  receipt: SubmissionResult | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ receipt, onClose }) => {
  const [isPrinting, setIsPrinting] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Printing state duration
    const printDuration = mediaQuery.matches ? 400 : 1600;
    const timer = setTimeout(() => {
      setIsPrinting(false);
      closeButtonRef.current?.focus();
    }, printDuration);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [onClose]);

  if (!receipt) return null;

  const { heading, successMessage } = getFormReceiptTitle(receipt.sheet);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-heading"
    >
      <div className="relative w-full max-w-sm sm:max-w-md my-auto">
        {/* Device / Thermal Printer Top Hardware */}
        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-2xl border-t border-x border-slate-700 shadow-2xl p-4 sm:p-5 z-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  isPrinting ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                }`}
                aria-hidden="true"
              />
              <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
                {isPrinting ? 'PRINTING RECEIPT...' : 'DEVICE READY • PRINTED'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <Printer className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
              <span>SLH-TERM-01</span>
            </div>
          </div>

          {/* Paper Exit Feed Slot */}
          <div className="mt-3 relative h-2.5 bg-slate-950 rounded-full shadow-inner border border-slate-800/80 overflow-hidden">
            <div
              className={`absolute inset-x-4 top-0.5 h-1 rounded-full ${
                isPrinting ? 'bg-cyan-500/40 animate-pulse' : 'bg-emerald-500/20'
              }`}
            />
          </div>
        </div>

        {/* Paper Container emerging from the slot */}
        <div className="relative overflow-hidden z-10 -mt-1 pt-1 px-2 sm:px-4">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { y: -80, opacity: 0.2 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="bg-[#FCFCFC] text-slate-800 rounded-b-xl shadow-2xl border-x border-b border-slate-300/80 p-5 sm:p-7 relative font-sans text-xs sm:text-sm selection:bg-slate-200"
          >
            {/* Thermal Print Header */}
            <div className="text-center pb-4 border-b border-dashed border-slate-300">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 mb-2 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 id="receipt-heading" className="text-base sm:text-lg font-bold tracking-tight text-slate-900 uppercase">
                SilverLine Hospital
              </h2>
              <p className="text-[11px] text-slate-500 tracking-wide font-medium">
                Trichy, Tamil Nadu • 24/7 Helpline: 0431-2906470
              </p>
            </div>

            {/* Receipt Form Type & Success Badge */}
            <div className="my-4 text-center py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-200/80">
              <p className="text-[11px] font-mono tracking-wider text-slate-500 uppercase font-semibold">
                {heading}
              </p>
              <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>{successMessage}</span>
              </p>
            </div>

            {/* Submission Metadata */}
            <div className="space-y-2 py-3 border-y border-dashed border-slate-300 font-mono text-[11px] sm:text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400 uppercase">REF NO:</span>
                <span className="font-bold text-slate-900 tracking-wider">{receipt.referenceId}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400 uppercase">DATE & TIME:</span>
                <span className="text-slate-800">{receipt.timestamp}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400 uppercase">SUBMITTER:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[180px]">
                  {receipt.submittedName}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400 uppercase">STATUS:</span>
                <span className="text-emerald-700 font-bold uppercase tracking-wider">VERIFIED ✓</span>
              </div>
            </div>

            {/* Information Notice */}
            <div className="mt-4 text-center text-slate-500 text-[11px] leading-relaxed">
              Our clinical coordinator has received your request and will connect with you promptly.
            </div>

            {/* Thermal Barcode Graphic */}
            <div className="mt-4 pt-3 flex flex-col items-center justify-center" aria-hidden="true">
              <div className="h-7 w-48 bg-[repeating-linear-gradient(90deg,#1e293b,#1e293b_2px,transparent_2px,transparent_5px,#1e293b_5px,#1e293b_6px,transparent_6px,transparent_8px,#1e293b_8px,#1e293b_11px,transparent_11px,transparent_13px)] opacity-70" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-1">
                *{receipt.referenceId}*
              </span>
            </div>

            {/* Perforated Zigzag Tear-off Edge */}
            <div
              className="absolute -bottom-2.5 left-0 right-0 h-3 bg-repeat-x bg-[length:12px_6px]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 6px 0, transparent 4px, #FCFCFC 4px)'
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 flex items-center justify-center gap-3 z-30 relative">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Done & Close</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-slate-700 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 hidden sm:inline-flex items-center gap-1.5"
            title="Print or save as PDF"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
