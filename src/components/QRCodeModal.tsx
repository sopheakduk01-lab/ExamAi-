import React, { useState, useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  Share2,
  Smartphone,
  ExternalLink,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-xjnox23763e4wypkyj2bpt-41472081240.asia-southeast1.run.app';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'grade6-exam-prep-qr.png';
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-amber-100 my-auto flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            id="btn-close-qr-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl border border-white/30 shadow-inner">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/30 text-amber-100 text-[10px] font-bold tracking-wide uppercase mb-1">
                <Sparkles className="w-3 h-3 text-yellow-300" /> QR Code ចូលប្រើប្រាស់
              </span>
              <h2 className="text-base sm:text-lg font-bold font-moul text-amber-50">
                ស្កែន QR Code ដើម្បីចូល App
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-5">
          {/* Instructions */}
          <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200/70 w-full text-xs text-amber-950 font-medium leading-relaxed">
            <p className="flex items-center justify-center gap-1.5 font-bold text-amber-900 mb-1">
              <Smartphone className="w-4 h-4 text-amber-700" />
              ប្រើប្រាស់កាមេរ៉ាទូរស័ព្ទ ឬ QR Scanner
            </p>
            <span>
              ស្កែនរូបភាព QR ខាងក្រោមនេះ ដើម្បីចូលប្រើប្រាស់កម្មវិធី <strong className="text-amber-950">«ត្រៀមប្រឡងថ្នាក់ទី៦»</strong> ដោយផ្ទាល់លើទូរស័ព្ទដៃ ឬ iPad/Tablet!
            </span>
          </div>

          {/* QR Code Container */}
          <div
            ref={qrRef}
            className="p-4 bg-white rounded-2xl border-2 border-amber-200 shadow-lg relative group flex flex-col items-center justify-center"
          >
            <QRCodeCanvas
              value={appUrl}
              size={200}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: '/app-icon.png',
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />

            <div className="mt-2 text-[11px] font-bold text-slate-500 font-moul">
              ត្រៀមប្រឡងថ្នាក់ទី៦
            </div>
          </div>

          {/* Copy URL Link Section */}
          <div className="w-full bg-slate-50 rounded-xl p-2.5 border border-slate-200 flex items-center justify-between gap-2">
            <div className="text-left min-w-0 flex-1 px-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                លីងកម្មវិធី (App Link)
              </p>
              <p className="text-xs font-mono font-semibold text-slate-700 truncate">
                {appUrl}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-2xs"
              id="btn-copy-app-url"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">បានចម្លង</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>ចម្លង</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={handleDownloadQR}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-amber-300/80"
              id="btn-download-qr-image"
            >
              <Download className="w-4 h-4 text-amber-800" />
              <span>ទាញយករូប QR</span>
            </button>

            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>បើកលីងក្នុង Tab ថ្មី</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            id="btn-close-qr-modal-footer"
          >
            បិទ
          </button>
        </div>
      </div>
    </div>
  );
};
