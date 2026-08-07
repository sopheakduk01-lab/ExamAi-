import React from 'react';
import { X } from 'lucide-react';
import { AIBattleView } from './AIBattleView';
import { Subject, ExamPaper } from '../types';

interface AIBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: Subject;
  examPapers?: ExamPaper[];
}

export const AIBattleModal: React.FC<AIBattleModalProps> = ({
  isOpen,
  onClose,
  subject,
  examPapers
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 text-white rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-purple-900/40 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xl shadow-inner">
              ⚔️
            </div>
            <div>
              <h3 className="font-moul text-xs sm:text-sm text-purple-200 font-bold leading-tight">
                កន្លែងប្រកួតជាមួយគ្រូ AI
              </h3>
              <p className="text-[11px] text-purple-300/70 font-sans">
                ល្បងសមត្ថភាពឆ្លើយសំណួរដណ្តើមពិន្ទុជាមួយ AI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60 active:scale-95"
            title="បិទ (Close)"
            id="btn-close-ai-battle-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5">
          <AIBattleView subject={subject} examPapers={examPapers} />
        </div>
      </div>
    </div>
  );
};
