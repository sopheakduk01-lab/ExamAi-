import React from 'react';
import { UserProgress } from '../types';
import { X, Award, Trophy, CheckCircle2, Clock, Calendar } from 'lucide-react';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  progress
}) => {
  if (!isOpen) return null;

  const totalCompleted = progress.completedExams.length;
  const avgPercentage = totalCompleted > 0
    ? Math.round(progress.completedExams.reduce((acc, curr) => acc + curr.percentage, 0) / totalCompleted)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Award className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 font-moul">
                វឌ្ឍនភាព និងប្រវត្តិធ្វើតេស្ត
              </h2>
              <p className="text-xs text-slate-500">លទ្ធផលនៃការប្រឡងសាកល្បង</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            id="btn-close-progress"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Stats Summary Box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div>
              <p className="text-xs text-slate-500 font-medium">វិញ្ញាសាបានធ្វើ</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-800 mt-1">{totalCompleted}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">ពិន្ទុមធ្យមភាគ</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">{avgPercentage}%</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-slate-500 font-medium">សំណួរបានចំណាំ</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">{progress.bookmarkedQuestionIds.length}</p>
            </div>
          </div>

          {/* Exam History List */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              ប្រវត្តិការប្រឡងសាកល្បង
            </h3>

            {totalCompleted === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs sm:text-sm bg-slate-50 rounded-xl border border-dashed border-slate-300 p-4">
                ប្អូនមិនទាន់បានធ្វើវិញ្ញាសាប្រឡងណាមួយនៅឡើយទេ! សូមជ្រើសរើសមុខវិជ្ជាដើម្បីចាប់ផ្តើម។
              </div>
            ) : (
              <div className="space-y-3">
                {progress.completedExams.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-xs">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{res.examTitle}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {res.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {Math.round(res.timeSpentSeconds / 60)} នាទី</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${res.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {res.score}/{res.totalQuestions} ({res.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
