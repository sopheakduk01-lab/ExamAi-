import React from 'react';
import { BookOpen, Lightbulb, Megaphone, Palette, RefreshCw } from 'lucide-react';
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

interface ThemeConfig {
  id: number;
  name: string;
  timeRange: string;
  bg: string;
  border: string;
  orbs: string[];
  textAccent: string;
  titleGradient: string;
  chipBg: string;
  chipBorder: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
}

const HERO_THEMES: ThemeConfig[] = [
  {
    id: 0,
    name: 'ស្បៃអន្ធកាល (Deep Midnight)',
    timeRange: 'ម៉ោង 12 AM - 2 AM',
    bg: 'bg-gradient-to-br from-[#0B0D17] via-[#1A1C29] to-[#05060B]',
    border: 'border-indigo-500/30',
    orbs: ['bg-indigo-500/10', 'bg-purple-500/10'],
    textAccent: 'text-indigo-300',
    titleGradient: 'from-indigo-100 via-purple-200 to-indigo-100',
    chipBg: 'bg-indigo-950/80',
    chipBorder: 'border-indigo-500/40',
    iconBg: 'from-[#1A1C29] to-[#0B0D17]',
    iconBorder: 'border-indigo-400/50',
    iconColor: 'text-indigo-200'
  },
  {
    id: 1,
    name: 'អ័ព្ទពាក់កណ្តាលអាធ្រាត្រ (Midnight Purple)',
    timeRange: 'ម៉ោង 2 AM - 4 AM',
    bg: 'bg-gradient-to-br from-[#140C24] via-[#25133E] to-[#0A0414]',
    border: 'border-purple-500/30',
    orbs: ['bg-purple-500/15', 'bg-pink-500/10'],
    textAccent: 'text-purple-300',
    titleGradient: 'from-fuchsia-100 via-purple-200 to-pink-100',
    chipBg: 'bg-purple-950/80',
    chipBorder: 'border-purple-500/40',
    iconBg: 'from-[#25133E] to-[#140C24]',
    iconBorder: 'border-purple-400/50',
    iconColor: 'text-purple-200'
  },
  {
    id: 2,
    name: 'ព្រៃព្រឹក្សាស្ងប់ស្ងាត់ (Pre-Dawn Forest)',
    timeRange: 'ម៉ោង 4 AM - 6 AM',
    bg: 'bg-gradient-to-br from-[#061C14] via-[#0E3525] to-[#030E0A]',
    border: 'border-emerald-500/30',
    orbs: ['bg-emerald-500/10', 'bg-teal-500/10'],
    textAccent: 'text-emerald-300',
    titleGradient: 'from-emerald-100 via-teal-200 to-emerald-100',
    chipBg: 'bg-emerald-950/80',
    chipBorder: 'border-emerald-500/40',
    iconBg: 'from-[#0E3525] to-[#061C14]',
    iconBorder: 'border-emerald-400/50',
    iconColor: 'text-emerald-200'
  },
  {
    id: 3,
    name: 'ព្រលឹមស្រាងៗ (Golden Dawn)',
    timeRange: 'ម៉ោង 6 AM - 8 AM',
    bg: 'bg-gradient-to-br from-[#3D2012] via-[#59301A] to-[#2B150A]',
    border: 'border-amber-600/40',
    orbs: ['bg-amber-500/15', 'bg-yellow-400/10'],
    textAccent: 'text-amber-200',
    titleGradient: 'from-amber-100 via-yellow-200 to-amber-100',
    chipBg: 'bg-[#59301A]/80',
    chipBorder: 'border-amber-500/40',
    iconBg: 'from-[#69391E] to-[#452311]',
    iconBorder: 'border-amber-400/60',
    iconColor: 'text-amber-200'
  },
  {
    id: 4,
    name: 'រស្មីអរុណរះ (Morning Skies)',
    timeRange: 'ម៉ោង 8 AM - 10 AM',
    bg: 'bg-gradient-to-br from-[#0A2E3D] via-[#10485E] to-[#051821]',
    border: 'border-sky-500/30',
    orbs: ['bg-sky-500/15', 'bg-teal-400/10'],
    textAccent: 'text-sky-300',
    titleGradient: 'from-sky-100 via-teal-200 to-sky-100',
    chipBg: 'bg-sky-950/80',
    chipBorder: 'border-sky-500/40',
    iconBg: 'from-[#10485E] to-[#0A2E3D]',
    iconBorder: 'border-sky-400/50',
    iconColor: 'text-sky-200'
  },
  {
    id: 5,
    name: 'កម្ដៅសូរិយា (Solar Amber)',
    timeRange: 'ម៉ោង 10 AM - 12 PM',
    bg: 'bg-gradient-to-br from-[#3C2D00] via-[#5C4500] to-[#241B00]',
    border: 'border-yellow-600/40',
    orbs: ['bg-yellow-500/15', 'bg-amber-400/15'],
    textAccent: 'text-yellow-300',
    titleGradient: 'from-yellow-100 via-amber-200 to-yellow-100',
    chipBg: 'bg-amber-950/80',
    chipBorder: 'border-yellow-500/40',
    iconBg: 'from-[#5C4500] to-[#3C2D00]',
    iconBorder: 'border-yellow-400/50',
    iconColor: 'text-yellow-200'
  },
  {
    id: 6,
    name: 'ខ្សាច់មាសបុរាណ (Midday Bronze)',
    timeRange: 'ម៉ោង 12 PM - 2 PM',
    bg: 'bg-gradient-to-br from-[#3E1A0F] via-[#5F2C1A] to-[#290F07]',
    border: 'border-orange-600/40',
    orbs: ['bg-orange-500/15', 'bg-yellow-500/10'],
    textAccent: 'text-orange-300',
    titleGradient: 'from-orange-100 via-amber-200 to-orange-100',
    chipBg: 'bg-orange-950/80',
    chipBorder: 'border-orange-500/40',
    iconBg: 'from-[#5F2C1A] to-[#3E1A0F]',
    iconBorder: 'border-orange-400/50',
    iconColor: 'text-orange-200'
  },
  {
    id: 7,
    name: 'ជម្រៅជលសា (Deep Blue Ocean)',
    timeRange: 'ម៉ោង 2 PM - 4 PM',
    bg: 'bg-gradient-to-br from-[#091E3A] via-[#103460] to-[#040E1B]',
    border: 'border-blue-500/35',
    orbs: ['bg-blue-500/15', 'bg-cyan-400/10'],
    textAccent: 'text-blue-300',
    titleGradient: 'from-blue-100 via-cyan-200 to-blue-100',
    chipBg: 'bg-blue-950/80',
    chipBorder: 'border-blue-500/40',
    iconBg: 'from-[#103460] to-[#091E3A]',
    iconBorder: 'border-blue-400/50',
    iconColor: 'text-blue-200'
  },
  {
    id: 8,
    name: 'រស្មីអស្តង្គត (Sunset Glow)',
    timeRange: 'ម៉ោង 4 PM - 6 PM',
    bg: 'bg-gradient-to-br from-[#421228] via-[#631F3F] to-[#2B0918]',
    border: 'border-rose-500/35',
    orbs: ['bg-rose-500/15', 'bg-orange-500/10'],
    textAccent: 'text-rose-300',
    titleGradient: 'from-rose-100 via-orange-200 to-rose-100',
    chipBg: 'bg-rose-950/80',
    chipBorder: 'border-rose-500/40',
    iconBg: 'from-[#631F3F] to-[#421228]',
    iconBorder: 'border-rose-400/50',
    iconColor: 'text-rose-200'
  },
  {
    id: 9,
    name: 'ជំនោរព្រលប់ (Twilight Zen)',
    timeRange: 'ម៉ោង 6 PM - 8 PM',
    bg: 'bg-gradient-to-br from-[#1B2421] via-[#2A3733] to-[#111715]',
    border: 'border-teal-600/30',
    orbs: ['bg-teal-500/12', 'bg-emerald-400/10'],
    textAccent: 'text-teal-300',
    titleGradient: 'from-teal-100 via-emerald-200 to-teal-100',
    chipBg: 'bg-teal-950/80',
    chipBorder: 'border-teal-500/40',
    iconBg: 'from-[#2A3733] to-[#1B2421]',
    iconBorder: 'border-teal-500/40',
    iconColor: 'text-teal-200'
  },
  {
    id: 10,
    name: 'រងើកភ្លើងកក់ក្តៅ (Warm Hearth)',
    timeRange: 'ម៉ោង 8 PM - 10 PM',
    bg: 'bg-gradient-to-br from-[#241315] via-[#381F22] to-[#150A0B]',
    border: 'border-red-500/30',
    orbs: ['bg-red-500/12', 'bg-amber-500/10'],
    textAccent: 'text-red-300',
    titleGradient: 'from-red-100 via-amber-200 to-red-100',
    chipBg: 'bg-red-950/80',
    chipBorder: 'border-red-500/40',
    iconBg: 'from-[#381F22] to-[#241315]',
    iconBorder: 'border-red-400/40',
    iconColor: 'text-red-200'
  },
  {
    id: 11,
    name: 'រាជវាំងស្វាយ (Royal Amethyst)',
    timeRange: 'ម៉ោង 10 PM - 12 AM',
    bg: 'bg-gradient-to-br from-[#1F1030] via-[#321B4D] to-[#13091F]',
    border: 'border-violet-500/40',
    orbs: ['bg-violet-500/15', 'bg-pink-500/10'],
    textAccent: 'text-violet-300',
    titleGradient: 'from-violet-100 via-pink-200 to-violet-100',
    chipBg: 'bg-[#321B4D]/80',
    chipBorder: 'border-violet-500/40',
    iconBg: 'from-[#321B4D] to-[#1F1030]',
    iconBorder: 'border-violet-400/50',
    iconColor: 'text-violet-200'
  }
];

export const HeroBanner: React.FC<HeroBannerProps & {
  activeMainTab?: 'exam' | 'lesson' | 'new_exam' | 'homework';
  onSelectMainTab?: (tab: 'exam' | 'lesson' | 'new_exam' | 'homework') => void;
}> = ({
  userProfile,
  onSelectMainTab
}) => {
  const [manualThemeIndex, setManualThemeIndex] = React.useState<number | null>(() => {
    const saved = localStorage.getItem('hero_banner_theme_index');
    return saved ? parseInt(saved, 10) : null;
  });

  const [currentHour, setCurrentHour] = React.useState(() => new Date().getHours());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 15000); // Check every 15 seconds for responsive switching
    return () => clearInterval(timer);
  }, []);

  const autoThemeIndex = Math.floor(currentHour / 2) % 12;
  const activeThemeIndex = manualThemeIndex !== null ? manualThemeIndex : autoThemeIndex;
  const currentTheme = HERO_THEMES[activeThemeIndex] || HERO_THEMES[3];

  const handleToggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextIndex = (activeThemeIndex + 1) % 12;
    setManualThemeIndex(nextIndex);
    localStorage.setItem('hero_banner_theme_index', nextIndex.toString());
  };

  const handleResetToAuto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setManualThemeIndex(null);
    localStorage.removeItem('hero_banner_theme_index');
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${currentTheme.bg} text-amber-50 p-6 sm:p-9 shadow-2xl shadow-amber-950/30 border ${currentTheme.border} space-y-6 select-none transition-all duration-1000`}
    >
      {/* Decorative ambient glowing orbs & radial background elements */}
      <div className={`absolute -right-16 -top-16 w-72 h-72 ${currentTheme.orbs[0]} rounded-full blur-3xl pointer-events-none transition-all duration-1000`} />
      <div className={`absolute -left-16 -bottom-16 w-64 h-64 ${currentTheme.orbs[1]} rounded-full blur-2xl pointer-events-none transition-all duration-1000`} />
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${currentTheme.chipBg} border ${currentTheme.chipBorder} text-amber-200 text-xs font-bold shadow-md transition-colors duration-1000`}
          >
            <span>{userProfile?.avatar || '🎓'}</span>
            <span>សួស្តី, {userProfile?.name || 'សុខា'}! 👋</span>
          </div>

          {/* Theme Selector Button */}
          <button
            onClick={handleToggleTheme}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/55 border border-white/10 hover:border-white/25 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer group"
            title="ចុចទីនេះដើម្បីសាកល្បងប្តូរម៉ូតពណ៌ដោយខ្លួនឯង"
          >
            <Palette className="w-3.5 h-3.5 text-yellow-300 hover:rotate-180 transition-transform duration-500" />
            <span className="text-amber-100">រចនាបថ៖ <span className="text-yellow-200">{currentTheme.name}</span></span>
            {manualThemeIndex !== null ? (
              <span 
                onClick={handleResetToAuto}
                className="ml-1 p-0.5 rounded-full bg-white/20 hover:bg-white/45 text-white cursor-pointer hover:scale-110 active:scale-90 transition-transform"
                title="ចុចទីនេះដើម្បីប្តូរមកតាមម៉ោងជាក់ស្តែងឡើងវិញ"
              >
                <RefreshCw className="w-2.5 h-2.5 text-amber-200" />
              </span>
            ) : (
              <span className="text-[10px] text-emerald-400 font-medium ml-1 flex items-center gap-0.5">
                ● តាមម៉ោង ({currentTheme.timeRange})
              </span>
            )}
          </button>
        </div>

        {/* Center Icon Emblem with glowing ring */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 opacity-40 blur-md group-hover:opacity-75 transition duration-500"></div>
          <div className={`relative w-22 h-22 sm:w-26 sm:h-26 rounded-2xl bg-gradient-to-br ${currentTheme.iconBg} border-2 ${currentTheme.iconBorder} flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-1000`}>
            <div className="relative">
              <BookOpen className={`w-11 h-11 sm:w-13 sm:h-13 ${currentTheme.iconColor} transition-colors duration-1000`} />
              <div className="absolute -top-3.5 -right-3 bg-gradient-to-br from-yellow-300 to-amber-500 text-amber-950 p-2 rounded-full shadow-lg border border-yellow-200 animate-bounce">
                <Lightbulb className="w-5 h-5 fill-yellow-300 text-amber-950" />
              </div>
            </div>
          </div>
        </div>

        {/* Title in Khmer Moul font */}
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold font-moul tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.titleGradient} drop-shadow-md mb-3 transition-all duration-1000`}>
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
