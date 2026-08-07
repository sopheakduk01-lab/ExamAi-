import React, { useState } from 'react';
import {
  X,
  Target,
  Send,
  Sparkles,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Check,
  Copy,
  ExternalLink,
  Heart,
  Bot,
  Award
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const telegramUrl = 'https://t.me/Duk_sopheak1';

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(telegramUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-amber-100 my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            id="btn-close-about-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shadow-inner">
              🎓
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide uppercase mb-1 backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-amber-200" /> ព័ត៌មានកម្មវិធី
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-moul leading-tight text-white drop-shadow-xs">
                អំពីកម្មវិធី & ទំនាក់ទំនង
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700 leading-relaxed text-sm">
          {/* Purpose / គោលបំណងនៃការបង្កើត App */}
          <div className="bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-950 font-bold text-base border-b border-amber-200/80 pb-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-moul text-amber-950 text-sm sm:text-base">
                🎯 គោលបំណងនៃការបង្កើត App នេះឡើង
              </h3>
            </div>

            <ul className="space-y-3 text-slate-700 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  ១
                </div>
                <div>
                  <strong className="text-amber-950 font-bold block mb-0.5">
                    ជួយដល់ការសិក្សារបស់សិស្សថ្នាក់ទី៦៖
                  </strong>
                  បង្កើតឡើងក្នុងគោលបំណងជួយសម្រួលដល់ប្អូនៗសិស្សានុសិស្សថ្នាក់ទី៦ ក្នុងការរំលឹកមេរៀន ធ្វើលំហាត់អនុវត្ត និងត្រៀមខ្លួនសម្រាប់ការប្រឡងបញ្ចប់ភូមិសិក្សា (បឋមសិក្សា) ឲ្យទទួលបានលទ្ធផលល្អប្រសើរ។
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  ២
                </div>
                <div>
                  <strong className="text-amber-950 font-bold block mb-0.5">
                    ប្រមូលផ្តុំវិញ្ញាសានិងមេរៀនសង្ខេប៖
                  </strong>
                  មានវិញ្ញាសាប្រឡងគំរូ មុខវិជ្ជាគណិតវិទ្យា វិទ្យាសាស្ត្រ ភាសាខ្មែរ និងភាសាអង់គ្លេស ព្រមទាំងមេរៀនសង្ខេបងាយយល់ និងរូបភាពពន្យល់ច្បាស់លាស់។
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  ៣
                </div>
                <div>
                  <strong className="text-amber-950 font-bold block mb-0.5">
                    បច្ចេកវិទ្យា AI ជំនួយការរៀនសូត្រ៖
                  </strong>
                  រួមបញ្ចូលឧបករណ៍ទំនើបៗដូចជា គ្រូ AI ជួយពន្យល់លំហាត់, ហ្គេមស្ទូចត្រីតេស្តចំណេះដឹង, ហ្គេមប្រកួតជាមួយ AI និង Chat ពិភាក្សារវាងសិស្ស ដើម្បីធ្វើឲ្យការរៀនសូត្រសប្បាយរីករាយ និងទាក់ទាញ។
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  ៤
                </div>
                <div>
                  <strong className="text-amber-950 font-bold block mb-0.5">
                    ឥតគិតថ្លៃ និងប្រើបានគ្រប់ពេល៖
                  </strong>
                  សិស្សានុសិស្សអាចចូលរៀន រំលឹកមេរៀន និងស្ទង់សមត្ថភាពបានដោយសេរី ឥតគិតថ្លៃ គ្រប់ពេលវេលា និងគ្រប់ទីកន្លែង។
                </div>
              </li>
            </ul>
          </div>

          {/* Teacher Contact Section / ព័ត៌មាន និង លីងទំនាក់ទំនងគ្រូ */}
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50/60 rounded-2xl p-4 sm:p-5 border border-sky-200 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-sky-200 pb-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-moul text-sky-950 text-sm sm:text-base">
                  👨‍🏫 លីងទំនាក់ទំនងគ្រូ / អ្នករៀបចំ
                </h3>
                <p className="text-xs text-sky-800 font-medium">
                  សំណួរ មតិយោបល់ ឬការណែនាំបន្ថែម
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-sky-300 shadow-md shrink-0 bg-sky-100 relative">
                  <img
                    src="/teacher.svg"
                    alt="លោកគ្រូ ឌុក សុភ័ក្រ"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-slate-900 text-sm">
                      លោកគ្រូ ឌុក សុភ័ក្រ
                    </p>
                    <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-sky-200">
                      Duk Sopheak
                    </span>
                  </div>
                  <p className="text-xs text-sky-700 font-semibold flex items-center gap-1.5 mt-1">
                    <Send className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    Telegram: <span className="font-mono text-sky-900 font-bold">@Duk_sopheak1</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="ចម្លងលីង Telegram"
                  id="btn-copy-telegram-link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">បានចម្លង</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>ចម្លងលីង</span>
                    </>
                  )}
                </button>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                  id="btn-open-telegram-direct"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>បើក Telegram</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>ផលិតឡើងដោយក្តីស្រឡាញ់សម្រាប់សិស្សថ្នាក់ទី៦</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              id="btn-close-about-modal-footer"
            >
              បិទ
            </button>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>ទំនាក់ទំនង Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
