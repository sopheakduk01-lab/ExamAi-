import React from 'react';
import { Subject } from '../types';
import { ChevronRight, BookOpen, Calculator, Atom, Globe, Languages, HelpCircle, CheckCircle2, HeartPulse, Heart } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
  selectedMode?: 'exam' | 'lesson' | 'new_exam';
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick, selectedMode = 'exam' }) => {
  // Render icon based on iconName
  const renderIcon = () => {
    switch (subject.iconName) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Atom':
        return <Atom className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Globe':
        return <Globe className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Languages':
        return <Languages className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'HeartPulse':
      case 'Heart':
        return <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7" />;
      default:
        return <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />;
    }
  };

  return (
    <div
      onClick={onClick}
      id={`card-subject-${subject.id}`}
      className={`group relative bg-white hover:bg-[#FAF8F5] rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden ${subject.colorBorder} border-l-[5px] flex flex-col justify-between gap-3`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left emblem & info */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Avatar Icon Box */}
          <div className="relative shrink-0">
            <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${subject.colorBgLight} ${subject.colorText} flex flex-col items-center justify-center border border-slate-200/70 shadow-2xs group-hover:scale-105 transition-all duration-300`}>
              {renderIcon()}
              <span className="text-[10px] font-black mt-0.5 tracking-tighter opacity-90">{subject.symbol}</span>
            </div>
          </div>

          {/* Text details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold font-moul text-blue-900 group-hover:text-amber-900 transition-colors line-clamp-1 leading-snug">
                {subject.nameKhmer}
              </h3>
            </div>
            
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
              {subject.description}
            </p>
          </div>
        </div>

        {/* Right Badge & Arrow */}
        <div className="flex flex-col items-end justify-between gap-2 shrink-0 self-stretch">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-2xs group-hover:scale-105 transition-transform ${
            selectedMode === 'lesson'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-900 border-amber-200'
          }`}>
            <CheckCircle2 className={`w-3 h-3 ${selectedMode === 'lesson' ? 'text-emerald-600' : 'text-amber-600'}`} />
            {selectedMode === 'lesson'
              ? `${subject.lessonCount} មេរៀន`
              : selectedMode === 'new_exam'
              ? `វិញ្ញាសាថ្មី`
              : `${subject.questionCount} សំណួរ`}
          </span>

          <div className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-300 mt-auto flex items-center gap-1 ${
            selectedMode === 'lesson'
              ? 'bg-emerald-100 text-emerald-900 group-hover:bg-emerald-600 group-hover:text-white'
              : 'bg-amber-100 text-amber-950 group-hover:bg-amber-600 group-hover:text-white'
          }`}>
            <span>{selectedMode === 'lesson' ? 'មើលមេរៀន' : 'ធ្វើវិញ្ញាសា'}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom meta row with stats */}
      <div className="pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span className={`flex items-center gap-1.5 font-bold ${selectedMode === 'lesson' ? 'text-emerald-800 font-moul' : 'text-slate-600'}`}>
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          {subject.lessonCount} មេរៀនសង្ខេប
        </span>
        <span className={`font-bold ${selectedMode === 'exam' ? 'text-amber-800 font-moul' : 'text-slate-700'}`}>
          {subject.questionCount} សំណួរ QCM
        </span>
      </div>
    </div>
  );
};

