import React, { useRef, useState } from 'react';
import { Home, GraduationCap, LayoutGrid, Award, Bell, Palette, Menu, MessageSquare, BookOpen, Gamepad2 } from 'lucide-react';

interface FacebookBottomNavProps {
  isVisible: boolean;
  onHomeClick: () => void;
  onOpenHomework?: () => void;
  onOpenLessons?: () => void;
  onOpenGames?: () => void;
  onOpenStudentChat?: () => void;
  onOpenMissions?: () => void;
  onOpenNotifications?: () => void;
  onOpenMenu: () => void;
  onOpenProgress?: () => void;
  onOpenModernLibrary?: () => void;
  onOpenDrawing?: () => void;
  onOpenQRCode?: () => void;
  onOpenAICreator?: () => void;
  onJoinClick?: () => void;
  unreadNotificationsCount?: number;
}

export const FacebookBottomNav: React.FC<FacebookBottomNavProps> = ({
  isVisible,
  onHomeClick,
  onOpenHomework,
  onOpenLessons,
  onOpenGames,
  onOpenStudentChat,
  onOpenMissions,
  onOpenNotifications,
  onOpenMenu,
  onOpenProgress,
  onOpenModernLibrary,
  onOpenDrawing,
  onOpenQRCode,
  onOpenAICreator,
  onJoinClick,
  unreadNotificationsCount = 0,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeTab, setActiveTab] = useState<'home' | 'homework' | 'lessons' | 'games' | 'library' | 'results' | 'notifications' | 'drawing' | 'menu'>('home');

  // Smooth drag to scroll handler for desktop mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={`fixed bottom-4 inset-x-0 z-50 w-full max-w-lg mx-auto px-3 flex items-center justify-between gap-3 pointer-events-none transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      id="modern-kahoot-nav"
    >
      {/* 1. Main Floating Capsule Container */}
      <div className="relative flex-1 min-w-0 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-white/40 dark:border-slate-800/40 shadow-2xl shadow-indigo-950/15 rounded-[40px] overflow-hidden pointer-events-auto">
        
        {/* Soft Gradient Top Glow (Cyan/Teal on Left blending into Soft Purple on Right) */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-cyan-300/60 via-teal-200/50 to-purple-400/60 blur-xs pointer-events-none" />

        {/* Scrollable Navigation Bar Container */}
        <nav
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="px-2.5 py-2 flex items-center justify-between gap-2 overflow-x-auto scroll-smooth select-none cursor-grab active:cursor-grabbing no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          aria-label="Floating Kahoot Style Navigation Bar"
        >
          {/* Tab 1: Home (Grade 6 Primary School Completion Exam Prep) */}
          <button
            onClick={() => {
              setActiveTab('home');
              onHomeClick();
            }}
            title="រៀនបន្ថែម សម្រាប់កូនៗថ្នាក់ទី៦ (Home)"
            className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'home'
                ? 'bg-blue-100/90 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-home"
          >
            <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-xs">
              <Home className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className={`text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul ${
              activeTab === 'home' ? 'text-blue-800 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'
            }`}>
              ទំព័រដើម
            </span>
          </button>



          {/* Tab 2: Homework (កិច្ចការផ្ទះ) */}
          <button
            onClick={() => {
              setActiveTab('homework');
              if (onOpenHomework) {
                onOpenHomework();
              } else if (onOpenStudentChat) {
                onOpenStudentChat();
              }
            }}
            className={`flex flex-col items-center justify-center min-w-[62px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'homework'
                ? 'bg-amber-100/90 dark:bg-amber-950/60 text-amber-900 dark:text-amber-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-homework"
            title="កិច្ចការផ្ទះ"
          >
            <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul text-amber-800 dark:text-amber-300">
              កិច្ចការផ្ទះ
            </span>
          </button>

          {/* Tab 3: រៀន (Lessons & Summaries) */}
          <button
            onClick={() => {
              setActiveTab('lessons');
              if (onOpenLessons) {
                onOpenLessons();
              }
            }}
            className={`flex flex-col items-center justify-center min-w-[60px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'lessons'
                ? 'bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-lessons"
            title="រៀនមេរៀនសង្ខេប (Lessons)"
          >
            <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul text-emerald-800 dark:text-emerald-300">
              រៀន
            </span>
          </button>

          {/* Tab 3.5: ល្បែងសិក្សា (Educational Games) */}
          <button
            onClick={() => {
              setActiveTab('games');
              if (onOpenGames) {
                onOpenGames();
              }
            }}
            className={`flex flex-col items-center justify-center min-w-[70px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'games'
                ? 'bg-violet-100/90 dark:bg-violet-950/60 text-violet-900 dark:text-violet-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-games"
            title="ល្បែងសិក្សា (Educational Games)"
          >
            <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-xs">
              <Gamepad2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul text-purple-800 dark:text-purple-300">
              ល្បែងសិក្សា
            </span>
          </button>

          {/* Tab 4: Library (📚 បណ្ណាល័យ) */}
          <button
            onClick={() => {
              setActiveTab('library');
              if (onOpenModernLibrary) {
                onOpenModernLibrary();
              } else if (onOpenMissions) {
                onOpenMissions();
              } else {
                onOpenMenu();
              }
            }}
            className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'library'
                ? 'bg-rose-100/90 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-library"
          >
            <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className={`text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul ${
              activeTab === 'library' ? 'text-rose-800 dark:text-rose-300' : 'text-slate-700 dark:text-slate-300'
            }`}>
              បណ្ណាល័យ
            </span>
          </button>

          {/* Optional Tab 5: Results */}
          {onOpenProgress && (
            <button
              onClick={() => {
                setActiveTab('results');
                onOpenProgress();
              }}
              className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
                activeTab === 'results'
                  ? 'bg-amber-100/90 dark:bg-amber-950/60 text-amber-900 dark:text-amber-100 font-bold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
              id="nav-tab-results"
              title="វឌ្ឍនភាព (Results)"
            >
              <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-xs">
                <Award className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className={`text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul ${
                activeTab === 'results' ? 'text-amber-800 dark:text-amber-300' : 'text-slate-700 dark:text-slate-300'
              }`}>
                វឌ្ឍនភាព
              </span>
            </button>
          )}

          {/* Optional Tab 6: Notifications (🔔 ដំណឹង) */}
          {onOpenNotifications && (
            <button
              onClick={() => {
                setActiveTab('notifications');
                onOpenNotifications();
              }}
              className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 relative ${
                activeTab === 'notifications'
                  ? 'bg-indigo-100/90 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-100 font-bold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
              id="nav-tab-notifications"
              title="ដំណឹង (Alerts)"
            >
              <div className="relative">
                <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-xs">
                  <Bell className="w-4 h-4 stroke-[2.2]" />
                </div>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[15px] h-3.5 px-0.5 bg-rose-500 text-white text-[8px] font-extrabold rounded-full flex items-center justify-center border border-white dark:border-slate-900 animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul ${
                activeTab === 'notifications' ? 'text-indigo-800 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'
              }`}>
                ដំណឹង
              </span>
            </button>
          )}

          {/* Optional Tab 7: Menu */}
          <button
            onClick={() => {
              setActiveTab('menu');
              onOpenMenu();
            }}
            className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'menu'
                ? 'bg-fuchsia-100/90 dark:bg-fuchsia-950/60 text-fuchsia-900 dark:text-fuchsia-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-menu"
            title="ម៉ឺនុយ (Menu)"
          >
            <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-purple-500 text-white flex items-center justify-center shadow-xs">
              <Menu className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className={`text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul ${
              activeTab === 'menu' ? 'text-fuchsia-800 dark:text-fuchsia-300' : 'text-slate-700 dark:text-slate-300'
            }`}>
              ម៉ឺនុយ
            </span>
          </button>
        </nav>
      </div>

      {/* 2. Separate Floating Action Circle Button on Right ("Join") */}
      <button
        onClick={onJoinClick || onOpenQRCode || onOpenMenu}
        className="w-16 h-16 sm:w-17 sm:h-17 bg-gradient-to-tr from-pink-500 via-purple-600 via-indigo-600 via-cyan-500 to-pink-500 bg-[length:300%_300%] animate-gradient-shift animate-join-glow border-2 border-white/50 dark:border-slate-800/50 shadow-2xl rounded-full flex flex-col items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0 pointer-events-auto group relative overflow-hidden"
        id="nav-tab-join"
        title="ធ្វើតេស្តវិញ្ញាសា (Take Exam)"
      >
        {/* Shiny overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/30 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/40 to-transparent blur-[1px] pointer-events-none" />

        {/* 4 Geometric Colorful Kahoot Icon Shapes (Red Triangle, Blue Diamond, Yellow Circle, Green Square) */}
        <div className="p-1 bg-white/25 backdrop-blur-md rounded-lg border border-white/35 shadow-sm group-hover:scale-110 transition-transform">
          <div className="grid grid-cols-2 gap-0.5 items-center justify-items-center">
            {/* Red Triangle */}
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-rose-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"></div>
            {/* Blue Diamond */}
            <div className="w-2.5 h-2.5 bg-blue-500 rotate-45 rounded-[1px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"></div>
            {/* Yellow Circle */}
            <div className="w-2.5 h-2.5 bg-amber-300 rounded-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"></div>
            {/* Green Square */}
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-[1px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"></div>
          </div>
        </div>

        <span className="text-[10px] font-bold mt-0.5 tracking-tight text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.5)] font-moul">
          តេស្ត
        </span>
      </button>
    </div>
  );
};




