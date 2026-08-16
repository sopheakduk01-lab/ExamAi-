import React from 'react';
import { BookOpen, Lightbulb, Megaphone } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroBannerProps {
  onStartExamClick: () => void;
  onStartLessonClick: () => void;
  onOpenMissions?: () => void;
  onOpenModernLibrary?: () => void;
  onOpenAITutor?: () => void;
  onOpenStudentChat?: () => void;
  onOpenFishingGame?: () => void;
  userProfile?: UserProfile | null;
  onOpenRegistrationModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps & {
  activeMainTab?: 'exam' | 'lesson' | 'new_exam' | 'homework';
  onSelectMainTab?: (tab: 'exam' | 'lesson' | 'new_exam' | 'homework') => void;
}> = ({
  userProfile,
  onSelectMainTab
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3D2012] via-[#59301A] to-[#2B150A] text-amber-50 p-6 sm:p-9 shadow-2xl shadow-amber-950/30 border border-amber-600/40 space-y-6 select-none"
    >
      {/* Decorative ambient glowing orbs & radial background elements */}
      <div className="absolute -right-16 -top-16 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.06),transparent_70%)] pointer-events-none" />

      {/* Decorative Cambodian Geometric Subtle Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Top Official Badge & Greeting */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <div 
            onClick={() => {
              if (onSelectMainTab) {
                onSelectMainTab('new_exam');
                setTimeout(() => {
                  const el = document.getElementById('main-exams-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }
            }}
            className="w-full sm:w-auto max-w-sm sm:max-w-md inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-inner backdrop-blur-md overflow-hidden relative cursor-pointer hover:border-amber-400 transition-colors group"
            title="ចុចទីនេះដើម្បីមើលវិញ្ញាសាថ្មីៗ"
          >
            <div className="flex items-center gap-1 shrink-0 bg-amber-500/20 px-2 py-0.5 rounded-full text-yellow-300 font-bold text-[11px] border border-amber-400/30">
              <Megaphone className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span className="whitespace-nowrap">ជូនដំណឹងសិស្ស</span>
            </div>
            <div className="overflow-hidden relative flex-1 h-5 flex items-center">
              <div className="animate-marquee-continuous flex items-center gap-8">
                <span className="whitespace-nowrap text-amber-200/90 font-medium text-xs">
                  📢 ជូនដំណឹងដល់សិស្សថ្នាក់ទី៦៖ វិញ្ញាសាត្រៀមប្រឡងឆមាសទី២ (អប់រំសុខភាព វិទ្យាសាស្ត្រ ភាសាខ្មែរ គណិតវិទ្យា) ត្រូវបានដាក់បញ្ចូលក្នុងប្រព័ន្ធ! សូមអញ្ជើញធ្វើតេស្តវាស់ស្ទង់សមត្ថភាព!
                </span>
                <span className="whitespace-nowrap text-amber-200/90 font-medium text-xs">
                  📢 ជូនដំណឹងដល់សិស្សថ្នាក់ទី៦៖ វិញ្ញាសាត្រៀមប្រឡងឆមាសទី២ (អប់រំសុខភាព វិទ្យាសាស្ត្រ ភាសាខ្មែរ គណិតវិទ្យា) ត្រូវបានដាក់បញ្ចូលក្នុងប្រព័ន្ធ! សូមអញ្ជើញធ្វើតេស្តវាស់ស្ទង់សមត្ថភាព!
                </span>
              </div>
            </div>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#59301A]/80 border border-amber-500/40 text-amber-200 text-xs font-bold shadow-md"
          >
            <span>{userProfile?.avatar || '🎓'}</span>
            <span>សួស្តី, {userProfile?.name || 'សុខា'}! 👋</span>
          </div>
        </div>

        {/* Center Icon Emblem with glowing ring */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 opacity-40 blur-md group-hover:opacity-75 transition duration-500"></div>
          <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-2xl bg-gradient-to-br from-[#69391E] to-[#452311] border-2 border-amber-400/60 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <BookOpen className="w-11 h-11 sm:w-13 sm:h-13 text-amber-200" />
              <div className="absolute -top-3.5 -right-3 bg-gradient-to-br from-yellow-300 to-amber-500 text-amber-950 p-2 rounded-full shadow-lg border border-yellow-200 animate-bounce">
                <Lightbulb className="w-5 h-5 fill-yellow-300 text-amber-950" />
              </div>
            </div>
          </div>
        </div>

        {/* Title in Khmer Moul font */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-moul tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-100 drop-shadow-md mb-3">
          រៀនបន្ថែម សម្រាប់កូនៗថ្នាក់ទី៦
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-amber-100/90 font-medium leading-relaxed max-w-xl mb-6">
          ប្រព័ន្ធសាកល្បងសមត្ថភាព មេរៀនសង្ខេប និងវិញ្ញាសាគំរូផ្លូវការ គ្រប់មុខវិជ្ជា៖ <span className="text-yellow-300 font-bold">ភាសាខ្មែរ, គណិតវិទ្យា, វិទ្យាសាស្ត្រ, សិក្សាសង្គម & អង់គ្លេស</span>
        </p>
      </div>
    </div>
  );
};
