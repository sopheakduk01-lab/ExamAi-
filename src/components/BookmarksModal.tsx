import React from 'react';
import { Question } from '../types';
import { X, Bookmark, CheckCircle2, Trash2 } from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedQuestions: Question[];
  onRemoveBookmark: (qId: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedQuestions,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Bookmark className="w-5 h-5 fill-amber-700" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 font-moul">
                សំណួរដែលបានចំណាំ ({bookmarkedQuestions.length})
              </h2>
              <p className="text-xs text-slate-500">មើលឡើងវិញមុនពេលចូលប្រឡង</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            id="btn-close-bookmarks"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {bookmarkedQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Bookmark className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
              <p className="font-semibold text-sm">មិនទាន់មានសំណួរដែលបានចំណាំនៅឡើយទេ</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                ប្អូនៗអាចចុចលើរូបសញ្ញា «ចំណាំ» ពេលធ្វើវិញ្ញាសាដើម្បីរក្សាទុកសំណួរពិបាកៗត្រង់នេះ។
              </p>
            </div>
          ) : (
            bookmarkedQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30 space-y-3 relative group">
                <div className="flex items-start justify-between gap-3 pr-8">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                    សំណួរទី {idx + 1}
                  </span>

                  <button
                    onClick={() => onRemoveBookmark(q.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors absolute top-3 right-3 cursor-pointer"
                    title="លុបការចំណាំ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-800 leading-relaxed">
                  <MathFormattedText text={q.text} />
                </p>

                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ចម្លើយត្រឹមត្រូវ៖ <MathFormattedText text={q.options[q.correctAnswerIndex]} /></span>
                </div>

                <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                  💡 <span className="font-semibold text-amber-900">ការបកស្រាយ៖</span> <MathFormattedText text={q.explanation} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
