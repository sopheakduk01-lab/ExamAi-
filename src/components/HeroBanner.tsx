import React from 'react';
import { BookOpen, Lightbulb, GraduationCap, CheckCircle2, Sparkles, Trophy, Target, Bot, ArrowRight, Compass } from 'lucide-react';
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

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartExamClick,
  onStartLessonClick,
  onOpenMissions,
  onOpenModernLibrary,
  onOpenAITutor,
  onOpenStudentChat,
  onOpenFishingGame,
  userProfile,
  onOpenRegistrationModal
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3D2012] via-[#59301A] to-[#2B150A] text-amber-50 p-6 sm:p-9 shadow-2xl shadow-amber-950/30 border border-amber-600/40">
      {/* Decorative ambient glowing orbs & radial background elements */}
      <div className="absolute -right-16 -top-16 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.06),transparent_70%)] pointer-events-none" />

      {/* Decorative Cambodian Geometric Subtle Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Top Official Badge & Greeting */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-inner backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse" />
            <span>កម្មវិធីសិក្សា និងប្រឡងសាកល្បងថ្នាក់ទី៦ - ក្រសួងអប់រំ</span>
          </div>

          {userProfile && (
            <button
              onClick={onOpenRegistrationModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-yellow-200 text-xs font-bold transition-all cursor-pointer backdrop-blur-md"
            >
              <span>{userProfile.avatar}</span>
              <span>សួស្តី, {userProfile.name}! 👋</span>
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

        {/* Feature Highlights Pills - Spacious & Elegant */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 text-xs sm:text-sm font-medium max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/70 border border-amber-500/40 text-yellow-200 shadow-sm backdrop-blur-md hover:border-amber-400/60 transition-colors">
            <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
            <span className="font-semibold">🏆 វិញ្ញាសាប្រឡងគំរូ ៥០+</span>
          </span>

          {onOpenStudentChat && (
            <button
              onClick={onOpenStudentChat}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold transition-all cursor-pointer shadow-md hover:scale-103 active:scale-97 border border-amber-300/40"
              id="btn-hero-student-chat"
            >
              <span>💬 Chat ពិភាក្សាសិស្ស</span>
            </button>
          )}

          {onOpenModernLibrary && (
            <button
              onClick={onOpenModernLibrary}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400/90 to-yellow-400/90 text-amber-950 hover:from-amber-300 hover:to-yellow-300 font-bold transition-all cursor-pointer shadow-md hover:scale-103 active:scale-97 border border-yellow-200/50"
              id="btn-hero-modern-library"
            >
              <span>📚 បណ្ណាល័យ (៣០+ អត្ថបទ)</span>
            </button>
          )}

          {onOpenMissions && (
            <button
              onClick={onOpenMissions}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-400/50 text-amber-100 font-semibold transition-all cursor-pointer backdrop-blur-md hover:scale-103 active:scale-97 shadow-sm"
              id="btn-hero-missions"
            >
              <Target className="w-4 h-4 text-amber-300 shrink-0" />
              <span>🎯 បេសកកម្ម & រង្វាន់</span>
            </button>
          )}

          {onOpenFishingGame && (
            <button
              onClick={onOpenFishingGame}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold transition-all cursor-pointer shadow-md hover:scale-103 active:scale-97 border border-cyan-300/40"
              id="btn-hero-fishing-pill"
            >
              <span>🎣 ហ្គេមស្ទូចត្រី (អ្នក vs AI)</span>
            </button>
          )}
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onStartExamClick}
            className="flex-1 sm:flex-initial px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-bold shadow-xl shadow-amber-950/40 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2.5 text-sm sm:text-base border border-yellow-200/50"
            id="btn-hero-start-exam"
          >
            <GraduationCap className="w-5 h-5 text-amber-950" />
            <span>ធ្វើវិញ្ញាសាប្រឡង</span>
            <ArrowRight className="w-4 h-4 text-amber-900" />
          </button>

          <button
            onClick={onStartLessonClick}
            className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-amber-950/70 hover:bg-amber-950/90 border border-amber-400/40 text-amber-100 font-semibold active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-md shadow-md"
            id="btn-hero-start-lesson"
          >
            <BookOpen className="w-5 h-5 text-yellow-400" />
            <span>មើលមេរៀនសង្ខេប</span>
          </button>

          {onOpenAITutor && (
            <button
              onClick={onOpenAITutor}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base shadow-md border border-emerald-400/30"
              id="btn-hero-ai-tutor"
            >
              <Bot className="w-5 h-5 text-emerald-200" />
              <span>ប្រកួតជាមួយគ្រូ AI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

