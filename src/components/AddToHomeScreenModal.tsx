import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Share,
  PlusSquare,
  MoreVertical,
  Download,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  Globe,
  Layers
} from 'lucide-react';

interface AddToHomeScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToHomeScreenModal: React.FC<AddToHomeScreenModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('android');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect iOS vs Android
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOSDevice) {
      setActiveTab('ios');
    }

    // Check if running as standalone (already added)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-amber-100 my-auto flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            id="btn-close-pwa-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            {/* App Icon preview */}
            <div className="w-14 h-14 rounded-2xl bg-white p-1 border-2 border-amber-200 shadow-md shrink-0 overflow-hidden">
              <img
                src="/app-icon.png?v=2"
                alt="App Icon ត្រៀមប្រឡងទី៦"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/30 text-amber-100 text-[10px] font-bold uppercase mb-1">
                <Sparkles className="w-3 h-3 text-yellow-300" /> ដំឡើងលើទូរស័ព្ទ (App Icon)
              </span>
              <h2 className="text-base sm:text-lg font-bold font-moul text-amber-50">
                បន្ថែម App លើអេក្រង់ទូរស័ព្ទ
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4">
          {/* Status banner if already installed */}
          {isInstalled ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-emerald-900 text-sm font-moul">
                បានដំឡើងរួចរាល់ហើយ!
              </h3>
              <p className="text-xs text-emerald-700 mt-1">
                អ្នកកំពុងបើកប្រើប្រាស់កម្មវិធីផ្ទាល់លើអេក្រង់ទូរស័ព្ទ (Standalone App Mod)។
              </p>
            </div>
          ) : (
            <>
              {/* Native Install Button if available */}
              {deferredPrompt && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-2">
                  <p className="text-xs text-amber-900 font-bold">
                    ទូរស័ព្ទរបស់អ្នកគាំទ្រការដំឡើងដោយស្វ័យប្រវត្ត ១-Click!
                  </p>
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                    id="btn-pwa-native-install"
                  >
                    <Download className="w-5 h-5" />
                    <span>ចុចដំឡើង App លើទូរស័ព្ទឥឡូវនេះ</span>
                  </button>
                </div>
              )}

              {/* Operating System Selector Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setActiveTab('android')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'android'
                      ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Android (Chrome)</span>
                </button>

                <button
                  onClick={() => setActiveTab('ios')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'ios'
                      ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Share className="w-4 h-4 text-sky-600" />
                  <span>iPhone / iPad (Safari)</span>
                </button>
              </div>

              {/* Instructions Steps */}
              {activeTab === 'android' ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-800">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1.5 font-moul text-xs">
                    <Globe className="w-4 h-4 text-amber-600" /> របៀបបន្ថែមលើ Android (Google Chrome)
                  </h4>

                  <ol className="space-y-2.5 list-decimal list-inside font-medium leading-relaxed">
                    <li className="pl-1">
                      បើកកម្មវិធី <strong className="text-amber-800">Google Chrome</strong> លើទូរស័ព្ទរបស់អ្នក។
                    </li>
                    <li className="pl-1">
                      ចុចលើ <strong className="text-slate-900 inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-200 rounded text-[11px]"><MoreVertical className="w-3.5 h-3.5" /> ចុច៣ចុច (Menu)</strong> នៅជ្រុងខាងលើស្តាំនៃ Chrome។
                    </li>
                    <li className="pl-1">
                      ជ្រើសរើសពាក្យ <strong className="text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded font-bold">«Add to Home screen»</strong> ឬ <strong className="text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded font-bold">«ដំឡើងកម្មវិធី / Install App»</strong>។
                    </li>
                    <li className="pl-1">
                      ចុច <strong className="text-emerald-700">Add / បន្ថែម</strong> ជាការស្រេច! រូបតំណាង App «ត្រៀមប្រឡងទី៦» នឹងបង្ហាញលើអេក្រង់ដើមទូរស័ព្ទ។
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-800">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1.5 font-moul text-xs">
                    <Share className="w-4 h-4 text-sky-600" /> របៀបបន្ថែមលើ iPhone / iPad (Safari)
                  </h4>

                  <ol className="space-y-2.5 list-decimal list-inside font-medium leading-relaxed">
                    <li className="pl-1">
                      សូមបើកលីងនេះក្នុងកម្មវិធី <strong className="text-sky-700">Safari</strong> លើ iPhone/iPad។
                    </li>
                    <li className="pl-1">
                      ចុចលើប៊ូតុង <strong className="text-sky-800 inline-flex items-center gap-1 px-1.5 py-0.5 bg-sky-100 rounded text-[11px]"><Share className="w-3.5 h-3.5 text-sky-600" /> ចែករំលែក (Share)</strong> នៅផ្នែកខាងក្រោមនៃ Safari។
                    </li>
                    <li className="pl-1">
                      រំកិលចុះក្រោម រួចជ្រើសរើស <strong className="text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded font-bold inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 text-amber-800" /> Add to Home Screen (បន្ថែមទៅអេក្រង់ដើម)</strong>។
                    </li>
                    <li className="pl-1">
                      ចុចពាក្យ <strong className="text-emerald-700">Add / បន្ថែម</strong> នៅជ្រុងខាងលើស្តាំ។
                    </li>
                  </ol>
                </div>
              )}
            </>
          )}

          {/* App Preview Card */}
          <div className="p-3 bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-amber-600/10 rounded-2xl border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs font-moul">
                  ត្រៀមប្រឡងថ្នាក់ទី៦
                </p>
                <p className="text-[10px] text-amber-800 font-semibold">
                  មេរៀន វិញ្ញាសា និងល្បែងសិក្សា
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold bg-amber-600 text-white px-2.5 py-1 rounded-full shadow-2xs">
              PWA Ready
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            id="btn-close-pwa-footer"
          >
            យល់ព្រម / បិទ
          </button>
        </div>
      </div>
    </div>
  );
};
