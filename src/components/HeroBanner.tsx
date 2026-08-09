import React from 'react';
import { BookOpen, Lightbulb, GraduationCap, CheckCircle2, Sparkles, Trophy, Target, Bot, ArrowRight, Compass, Megaphone } from 'lucide-react';
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
  onOpenCharacterModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps & {
  activeMainTab?: 'exam' | 'lesson' | 'new_exam' | 'homework';
  onSelectMainTab?: (tab: 'exam' | 'lesson' | 'new_exam' | 'homework') => void;
}> = ({
  onStartExamClick,
  onStartLessonClick,
  onOpenMissions,
  onOpenModernLibrary,
  onOpenAITutor,
  onOpenStudentChat,
  onOpenFishingGame,
  userProfile,
  onOpenRegistrationModal,
  onOpenCharacterModal,
  activeMainTab = 'exam',
  onSelectMainTab
}) => {
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    
    // Swipe Right -> Switch to Lesson tab
    if (diff > 50 && onSelectMainTab) {
      onSelectMainTab('lesson');
    }
    // Swipe Left -> Open Modern Library
    else if (diff < -50 && onOpenModernLibrary) {
      onOpenModernLibrary();
    }
    setTouchStartX(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

          {onOpenCharacterModal && (
            <button
              onClick={onOpenCharacterModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-500/30 hover:from-amber-500/50 hover:to-yellow-500/50 border border-amber-400/60 text-yellow-200 text-xs font-bold transition-all cursor-pointer backdrop-blur-md active:scale-95 shadow-md"
              id="btn-hero-character-modal"
            >
              <span>{userProfile?.avatar || '👦'}</span>
              <span>សួស្តី, {userProfile?.name || 'សុខា'}! 👋</span>
              <span className="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-md text-[10px]">🎭 ៥០ តួអង្គ</span>
            </button>
          )}
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
          ត្រៀមប្រឡងបញ្ចប់បឋមសិក្សា ថ្នាក់ទី៦
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-amber-100/90 font-medium leading-relaxed max-w-xl mb-6">
          ប្រព័ន្ធសាកល្បងសមត្ថភាព មេរៀនសង្ខេប និងវិញ្ញាសាគំរូផ្លូវការ គ្រប់មុខវិជ្ជា៖ <span className="text-yellow-300 font-bold">ភាសាខ្មែរ, គណិតវិទ្យា, វិទ្យាសាស្ត្រ, សិក្សាសង្គម & អង់គ្លេស</span>
        </p>


      </div>

      {/* Bottom Main Tabs Inside Card */}
      {onSelectMainTab && (
        <div className="relative z-10 pt-4 border-t border-amber-600/30 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => onSelectMainTab('exam')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 font-moul ${
              activeMainTab === 'exam'
                ? 'bg-amber-400 text-amber-950 shadow-lg scale-105 font-bold'
                : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-500/30'
            }`}
            id="hero-tab-exam"
          >
            <GraduationCap className="w-4 h-4" />
            <span>វិញ្ញាសាប្រឡង</span>
          </button>

          <button
            onClick={() => onSelectMainTab('lesson')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 font-moul ${
              activeMainTab === 'lesson'
                ? 'bg-amber-400 text-amber-950 shadow-lg scale-105 font-bold'
                : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-500/30'
            }`}
            id="hero-tab-lesson"
          >
            <BookOpen className="w-4 h-4" />
            <span>មេរៀនសង្ខេប</span>
          </button>

          <button
            onClick={() => onSelectMainTab('new_exam')}
            className={`py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 relative font-moul ${
              activeMainTab === 'new_exam'
                ? 'bg-amber-400 text-amber-950 shadow-lg scale-105 font-bold'
                : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-500/30'
            }`}
            id="hero-tab-new-exam"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>តេស្តវិញ្ញាសាថ្មី</span>
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-bounce shadow-xs">
              NEW!
            </span>
          </button>

          <button
            onClick={() => onSelectMainTab('homework')}
            className={`py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 relative font-moul ${
              activeMainTab === 'homework'
                ? 'bg-amber-400 text-amber-950 shadow-lg scale-105 font-bold'
                : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-500/30'
            }`}
            id="hero-tab-homework"
          >
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>កិច្ចការផ្ទះ</span>
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-bounce shadow-xs">
              ថ្មី
            </span>
          </button>

          {onOpenModernLibrary && (
            <button
              onClick={onOpenModernLibrary}
              className="py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 font-moul bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-500/30"
              id="hero-tab-modern-library"
              title="អូសស្តាំលើផ្ទាំងនេះ ឬចុចទីនេះដើម្បីបើកបណ្ណាល័យទំនើប"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>បណ្ណាល័យទំនើប</span>
            </button>
          )}
        </div>
      )}


    </div>
  );
};

