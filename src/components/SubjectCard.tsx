import React from 'react';
import { Subject } from '../types';
import { ChevronRight, BookOpen, Calculator, Atom, Globe, Languages, HelpCircle, CheckCircle2, HeartPulse, Heart } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
  selectedMode?: 'exam' | 'lesson';
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
      className={`group relative bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden ${subject.colorBorder} border-l-4 flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left emblem & info */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Avatar Icon Box */}
          <div className="relative shrink-0">
            <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${subject.colorBgLight} ${subject.colorText} flex flex-col items-center justify-center border border-slate-200/60 shadow-xs group-hover:scale-105 group-hover:rotate-1 transition-all duration-300`}>
              {renderIcon()}
              <span className="text-[10px] font-black mt-0.5 tracking-tighter opacity-95">{subject.symbol}</span>
            </div>
          </div>

          {/* Text details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold font-moul text-slate-800 tracking-wide group-hover:text-amber-900 transition-colors line-clamp-1">
                {subject.nameKhmer}
              </h3>
            </div>
            
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
              {subject.description}
            </p>
          </div>
        </div>

        {/* Right Badge & Arrow */}
        <div className="flex flex-col items-end justify-between gap-2 shrink-0 self-stretch">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${subject.colorBadgeBg} ${subject.colorBadgeText} shadow-2xs group-hover:scale-105 transition-transform`}>
            <CheckCircle2 className="w-3 h-3 opacity-80" />
            {selectedMode === 'lesson' ? `${subject.lessonCount} មេរៀន` : `${subject.questionCount} សំណួរ`}
          </span>

          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-100 text-slate-400 group-hover:text-amber-900 flex items-center justify-center transition-all duration-300 mt-auto shadow-2xs">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom meta row with stats */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1 text-slate-500">
          <BookOpen className="w-3.5 h-3.5 text-amber-600/80" />
          {subject.lessonCount} មេរៀនសង្ខេប
        </span>
        <span className="font-bold text-slate-600">
          {subject.questionCount} សំណួរ QCM
        </span>
      </div>
    </div>
  );
};

