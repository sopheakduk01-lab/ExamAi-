import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Search,
  Mic,
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  Layers,
  Sliders,
  Flame,
  User,
  Swords,
  Trophy,
  Compass,
  Zap,
  PlayCircle,
  HelpCircle,
  Bookmark,
  CheckCircle2,
  Image as ImageIcon,
  Grid,
  ListFilter
} from 'lucide-react';
import { SubjectId, ExamPaper, UserProfile, StudentAccount } from '../types';
import { SUBJECTS } from '../data/grade6Data';
import { NEW_EXAM_PAPERS } from '../data/newExamsData';
import { Grade6ExamCarousel } from './Grade6ExamCarousel';

interface MobileLauncherHomeProps {
  userProfile?: UserProfile | null;
  currentAccount?: StudentAccount | null;
  onSelectSubject: (subjectId: SubjectId) => void;
  onSelectMainTab: (tab: 'exam' | 'lesson' | 'new_exam' | 'homework') => void;
  onOpenSearch: () => void;
  onOpenStudentChat: () => void;
  onOpenAIBattle: () => void;
  onOpenFishingGame: () => void;
  onOpenEnglishGame: () => void;
  onOpenVijjaNavaGame?: () => void;
  onOpenDrawing: () => void;
  onOpenModernLibrary: () => void;
  onOpenHomework?: () => void;
  onOpenMissions: () => void;
  onOpenBookmarks: () => void;
  onOpenProgress: () => void;
  onOpenMenu: () => void;
  onOpenAccountModal: () => void;
  onSelectExamWithRegistration: (paper: ExamPaper) => void;
  activeMainTab: 'exam' | 'lesson' | 'new_exam' | 'homework';
  bookmarkedCount: number;
}

// Wallpaper options for launcher background
const WALLPAPERS = [
  {
    id: 'nyhavn',
    name: 'Nyhavn River (រូបក្នុងគំរូ)',
    url: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'angkor',
    name: 'ប្រាសាទអង្គរវត្ត',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cozy_library',
    name: 'បណ្ណាល័យ',
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'skyline',
    name: 'មេឃ និងធម្មជាតិ',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
  }
];

export const MobileLauncherHome: React.FC<MobileLauncherHomeProps> = ({
  userProfile,
  currentAccount,
  onSelectSubject,
  onSelectMainTab,
  onOpenSearch,
  onOpenStudentChat,
  onOpenAIBattle,
  onOpenFishingGame,
  onOpenEnglishGame,
  onOpenVijjaNavaGame,
  onOpenDrawing,
  onOpenModernLibrary,
  onOpenHomework,
  onOpenMissions,
  onOpenBookmarks,
  onOpenProgress,
  onOpenMenu,
  onOpenAccountModal,
  onSelectExamWithRegistration,
  activeMainTab,
  bookmarkedCount
}) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(WALLPAPERS[0].url);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'subject' | 'exam' | 'game'>('all');
  const [isLargeButtonMode, setIsLargeButtonMode] = useState(true);

  // Shortcut Apps definitions (Easy to click, large rounded icon squares)
  const shortcuts = [
    {
      id: 'khmer',
      category: 'subject',
      title: 'ភាសាខ្មែរ',
      subtitle: 'វិញ្ញាសា & មេរៀន',
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      icon: '📘',
      action: () => onSelectSubject('khmer')
    },
    {
      id: 'math',
      category: 'subject',
      title: 'គណិតវិទ្យា',
      subtitle: 'វិញ្ញាសា & លំហាត់',
      bgColor: 'bg-gradient-to-br from-rose-500 to-red-600',
      icon: '📐',
      action: () => onSelectSubject('math')
    },
    {
      id: 'science',
      category: 'subject',
      title: 'វិទ្យាសាស្ត្រ',
      subtitle: 'វិញ្ញាសា & មេរៀន',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      icon: '🔬',
      action: () => onSelectSubject('science')
    },
    {
      id: 'social',
      category: 'subject',
      title: 'សិក្សាសង្គម',
      subtitle: 'វិញ្ញាសា & មេរៀន',
      bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600',
      icon: '🌍',
      action: () => onSelectSubject('social')
    },
    {
      id: 'english',
      category: 'subject',
      title: 'ភាសាអង់គ្លេស',
      subtitle: 'ពាក្យ & វិញ្ញាសា',
      bgColor: 'bg-gradient-to-br from-purple-500 to-violet-600',
      icon: '🇬🇧',
      action: () => onSelectSubject('english')
    },
    {
      id: 'new_exam',
      category: 'exam',
      title: 'វិញ្ញាសាថ្មី',
      subtitle: 'តេស្តឆមាសទី២',
      bgColor: 'bg-gradient-to-br from-pink-500 to-rose-600',
      icon: '🧪',
      badge: 'NEW',
      action: () => {
        onSelectMainTab('new_exam');
        if (NEW_EXAM_PAPERS.length > 0) {
          onSelectExamWithRegistration(NEW_EXAM_PAPERS[0]);
        }
      }
    },
    {
      id: 'vijja_nava',
      category: 'game',
      title: 'វិជ្ជានាវា',
      subtitle: 'ល្បងប្រាជ្ញាចិន្តា',
      bgColor: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600',
      icon: '👑',
      badge: 'HOT',
      action: onOpenVijjaNavaGame || onOpenFishingGame
    },
    {
      id: 'fishing',
      category: 'game',
      title: 'ស្ទូចត្រី AI',
      subtitle: 'ល្បែងសួរឆ្លើយ',
      bgColor: 'bg-gradient-to-br from-cyan-400 to-sky-600',
      icon: '🎣',
      action: onOpenFishingGame
    },
    {
      id: 'ai_battle',
      category: 'game',
      title: 'ប្រកួត AI',
      subtitle: 'តេស្តល្បឿន',
      bgColor: 'bg-gradient-to-br from-violet-600 to-purple-800',
      icon: '⚔️',
      action: onOpenAIBattle
    },
    {
      id: 'ai_tutor',
      category: 'game',
      title: 'គ្រូ AI',
      subtitle: 'ឆ្លើយសំណួរមេរៀន',
      bgColor: 'bg-gradient-to-br from-sky-400 to-blue-600',
      icon: '🤖',
      action: onOpenStudentChat
    },
    {
      id: 'library',
      category: 'exam',
      title: 'បណ្ណាល័យ',
      subtitle: 'សៀវភៅ & ឯកសារ',
      bgColor: 'bg-gradient-to-br from-teal-500 to-emerald-700',
      icon: '📖',
      action: onOpenModernLibrary
    },
    {
      id: 'homework',
      category: 'exam',
      title: 'កិច្ចការផ្ទះ',
      subtitle: 'លំហាត់គំរូ MoEYS',
      bgColor: 'bg-gradient-to-br from-amber-600 to-yellow-700',
      icon: '✍️',
      badge: 'ថ្មី',
      action: onOpenHomework || (() => {})
    },
    {
      id: 'drawing',
      category: 'game',
      title: 'គំនូសសេរី',
      subtitle: 'ក្តារខៀនឌីជីថល',
      bgColor: 'bg-gradient-to-br from-amber-400 to-yellow-600',
      icon: '🎨',
      action: onOpenDrawing
    },
    {
      id: 'missions',
      category: 'game',
      title: 'បេសកកម្ម',
      subtitle: 'រង្វាន់ & ពិន្ទុ',
      bgColor: 'bg-gradient-to-br from-orange-400 to-amber-600',
      icon: '🏆',
      action: onOpenMissions
    }
  ];

  const filteredShortcuts = shortcuts.filter((sc) => {
    if (activeCategoryFilter === 'all') return true;
    return sc.category === activeCategoryFilter;
  });

  return (
    <div className="relative min-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between font-siemreap border border-slate-700/40">
      {/* Background Wallpaper image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
        style={{ backgroundImage: `url('${selectedWallpaper}')` }}
      />

      {/* Dark Ambient Gradient Overlay for High Contrast & Touch Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/65 to-slate-950/95 backdrop-blur-[2px]" />

      {/* EASY CLICK CATEGORY FILTER TABS AT TOP */}
      <div className="relative z-10 px-4 pt-4">
        <div className="flex items-center justify-between gap-1 bg-black/45 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'ទាំងអស់' },
            { id: 'subject', label: 'មុខវិជ្ជា' },
            { id: 'exam', label: 'វិញ្ញាសាតេស្ត' },
            { id: 'game', label: 'ល្បែង AI' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id as any)}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-102'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER CONTENT AREA */}
      <div className="relative z-10 px-3 sm:px-4 py-4 space-y-5 flex-1 flex flex-col justify-center">
        {/* QUICK ACCESS APP GRID */}
        <div>
          <div className="flex items-center justify-between mb-3 text-white/90">
            <h3 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase flex items-center gap-2 text-amber-200">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>កម្មវិធីសិក្សា (ប៊ូតុងធំៗ ស្រួលចុច)</span>
            </h3>
            <button
              onClick={() => setIsLargeButtonMode((prev) => !prev)}
              className="text-[11px] bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              {isLargeButtonMode ? <Grid className="w-3.5 h-3.5" /> : <ListFilter className="w-3.5 h-3.5" />}
              <span>{isLargeButtonMode ? 'ទម្រង់ធំ' : 'ទម្រង់បង្រួម'}</span>
            </button>
          </div>

          {/* Easy Tap Launcher grid */}
          <div
            className={
              isLargeButtonMode
                ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-3.5 sm:gap-4'
                : 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3'
            }
          >
            {filteredShortcuts.map((sc) => (
              <button
                key={sc.id}
                onClick={sc.action}
                className="group flex flex-col items-center gap-2 cursor-pointer transition-all transform active:scale-90 hover:scale-105"
              >
                {/* Large Ergonomic App Icon */}
                <div
                  className={`relative ${
                    isLargeButtonMode ? 'w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl' : 'w-14 h-14 text-2xl'
                  } rounded-2xl ${sc.bgColor} text-white flex items-center justify-center shadow-xl shadow-black/50 border-2 border-white/20 group-hover:border-amber-300 group-hover:shadow-2xl transition-all`}
                >
                  <span>{sc.icon}</span>

                  {sc.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg border border-white animate-bounce">
                      {sc.badge}
                    </span>
                  )}
                </div>

                {/* App Label Below Icon */}
                <div className="text-center">
                  <span className="block text-xs sm:text-sm font-bold text-white leading-tight drop-shadow-md group-hover:text-amber-300 transition-colors max-w-[80px] sm:max-w-[100px] truncate">
                    {sc.title}
                  </span>
                  {isLargeButtonMode && (
                    <span className="block text-[10px] text-slate-300/80 font-medium max-w-[80px] sm:max-w-[100px] truncate">
                      {sc.subtitle}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grade 6 Exam Prep Horizontal Swipe Carousel */}
        <Grade6ExamCarousel
          onSelectExam={(exam) => onSelectExamWithRegistration(exam)}
          onSelectSubject={(sId) => onSelectSubject(sId)}
        />

        {/* FEATURED QUICK EXAM CHALLENGE CARD */}
        <div
          onClick={() => {
            onSelectMainTab('new_exam');
            if (NEW_EXAM_PAPERS.length > 0) {
              onSelectExamWithRegistration(NEW_EXAM_PAPERS[0]);
            }
          }}
          className="group relative rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-950/90 hover:from-slate-900 hover:to-slate-900 backdrop-blur-2xl border-2 border-amber-500/50 p-4 text-white shadow-2xl transition-all cursor-pointer hover:border-amber-400 overflow-hidden flex items-center justify-between gap-3 active:scale-98"
        >
          {/* Glow background */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-all" />

          <div className="space-y-1 z-10 max-w-[78%]">
            <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>ប្រឡងតេស្តភ្លាមៗ • Click to Start Test</span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-amber-200 leading-snug group-hover:text-white transition-colors">
              វិញ្ញាសាតេស្តឆមាសទី២៖ វិទ្យាសាស្ត្រ (កម្រងអូរឫស្សី)
            </h4>
            <p className="text-xs text-slate-300 font-medium line-clamp-1">
              ចុចទីនេះដើម្បីប្រឡងភ្លាមៗ ទទួលបានពិន្ទុ & ការបកស្រាយស្វ័យប្រវត្ត
            </p>
          </div>

          {/* Easy Tap Play Button on Right */}
          <div className="z-10 w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-xl shrink-0 group-hover:scale-110 transition-transform">
            <PlayCircle className="w-7 h-7 text-slate-950 fill-slate-950" />
          </div>
        </div>
      </div>

      {/* BOTTOM AREA: STATUS BAR (MOVED FROM TOP TO BOTTOM) + SEARCH + EASY NAV TOOLBAR */}
      <div className="relative z-10 px-3 sm:px-4 pb-4 space-y-2.5">
        {/* Wallpaper Selector Popup (Opens right above bottom status bar) */}
        {showWallpaperSelector && (
          <div className="p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 text-white shadow-2xl animate-fade-in space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                ជ្រើសរើសរូបភាពផ្ទៃខាងក្រោយ (Wallpaper):
              </span>
              <button
                onClick={() => setShowWallpaperSelector(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => {
                    setSelectedWallpaper(wp.url);
                    setShowWallpaperSelector(false);
                  }}
                  className={`p-2 rounded-xl text-left border text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    selectedWallpaper === wp.url
                      ? 'border-amber-400 bg-amber-500/20 text-amber-200 font-bold'
                      : 'border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg bg-cover bg-center shrink-0 border border-white/20"
                    style={{ backgroundImage: `url('${wp.url}')` }}
                  />
                  <span className="truncate">{wp.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM STATUS BAR (MOVED FROM TOP BAR TO BOTTOM BAR AS REQUESTED) */}
        <div className="flex items-center justify-between gap-2">
          {/* Left Pill: Student Profile */}
          <button
            onClick={onOpenAccountModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white backdrop-blur-md border border-blue-400/40 shadow-lg text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
              {userProfile?.avatar || '👤'}
            </div>
            <span className="max-w-[110px] truncate">{userProfile?.name || 'សិស្សថ្នាក់ទី៦'}</span>
          </button>

          {/* Center Pill: Weather & Grade */}
          <button
            onClick={onOpenProgress}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-amber-300 backdrop-blur-md border border-amber-500/40 shadow-lg text-xs font-bold transition-all cursor-pointer"
          >
            <span>🌙 28°C</span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
              <span>ថ្នាក់ទី៦</span>
            </span>
          </button>

          {/* Right Pill: Wallpaper / Customization Settings */}
          <button
            onClick={() => setShowWallpaperSelector((prev) => !prev)}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-95 cursor-pointer"
            title="ប្តូររូបភាពផ្ទៃខាងក្រោយ (Wallpaper)"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* FLOATING EASY SEARCH BAR */}
        <div
          onClick={onOpenSearch}
          className="w-full bg-slate-900/90 hover:bg-slate-900 backdrop-blur-xl border-2 border-slate-700/80 text-white rounded-full px-4 py-3 shadow-2xl flex items-center justify-between gap-3 cursor-pointer transition-all hover:border-amber-400/80 active:scale-98"
        >
          {/* Left AI Sparkles Icon */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
          </div>

          {/* Placeholder Text */}
          <span className="text-xs sm:text-sm font-bold text-slate-200 flex-1 truncate">
            ស្វែងរកវិញ្ញាសា ឬសួរមេរៀនជាមួយគ្រូ AI...
          </span>

          {/* Right Voice Search Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenStudentChat();
            }}
            className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 transition-colors"
            title="សួរគ្រូ AI ដោយសំឡេង"
          >
            <Mic className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* BOTTOM NAVIGATION TOOLBAR (5 Big Touch Buttons) */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border-2 border-slate-800 rounded-2xl p-2.5 flex items-center justify-around shadow-2xl text-slate-300">
          {/* Back */}
          <button
            onClick={() => onSelectMainTab('exam')}
            className="p-3 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer active:scale-90"
            title="ត្រឡប់ក្រោយ"
          >
            <ChevronLeft className="w-6 h-6 text-slate-200" />
          </button>

          {/* AI Tutor Chat */}
          <button
            onClick={onOpenStudentChat}
            className="p-3 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer active:scale-90"
            title="គ្រូ AI ឆ្លើយសំណួរ"
          >
            <ChevronRight className="w-6 h-6 text-slate-200" />
          </button>

          {/* Center Drawing / Whiteboard Plus */}
          <button
            onClick={onOpenDrawing}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-slate-950 font-bold shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="គំនូសសេរី / ក្តារខៀន"
          >
            <Plus className="w-6 h-6 text-slate-950" />
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="p-3 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer relative active:scale-90"
            title="សំណួរដែលបានចំណាំ"
          >
            <Bookmark className="w-6 h-6 text-slate-200" />
            {bookmarkedCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Menu Drawer */}
          <button
            onClick={onOpenMenu}
            className="p-3 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer active:scale-90"
            title="ម៉ឺនុយមេ"
          >
            <Menu className="w-6 h-6 text-slate-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
