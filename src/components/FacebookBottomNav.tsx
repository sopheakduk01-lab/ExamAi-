import React, { useRef, useState } from 'react';
import { Home, Plus, LayoutGrid, Award, Bell, Palette, Menu } from 'lucide-react';

interface FacebookBottomNavProps {
  isVisible: boolean;
  onHomeClick: () => void;
  onOpenStudentChat?: () => void;
  onOpenMissions?: () => void;
  onOpenNotifications?: () => void;
  onOpenMenu: () => void;
  onOpenProgress?: () => void;
  onOpenModernLibrary?: () => void;
  onOpenDrawing?: () => void;
  onOpenQRCode?: () => void;
  onOpenAICreator?: () => void;
  unreadNotificationsCount?: number;
}

export const FacebookBottomNav: React.FC<FacebookBottomNavProps> = ({
  isVisible,
  onHomeClick,
  onOpenStudentChat,
  onOpenMissions,
  onOpenNotifications,
  onOpenMenu,
  onOpenProgress,
  onOpenModernLibrary,
  onOpenDrawing,
  onOpenQRCode,
  onOpenAICreator,
  unreadNotificationsCount = 0,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'library' | 'results' | 'notifications' | 'drawing' | 'menu'>('home');

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
      <div className="relative flex-1 min-w-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-indigo-950/20 rounded-[40px] overflow-hidden pointer-events-auto">
        
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
            title="ត្រៀមប្រឡងបញ្ចប់បឋមសិក្សា ថ្នាក់ទី៦ (Home)"
            className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'home'
                ? 'bg-purple-100/90 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-home"
          >
            <Home className="w-5 h-5 fill-slate-900 dark:fill-slate-100 stroke-none" />
            <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap font-moul">
              ទំព័រដើម
            </span>
          </button>



          {/* Tab 3: Create (Plus icon inside solid black rounded square) */}
          <button
            onClick={() => {
              setActiveTab('create');
              if (onOpenAICreator) {
                onOpenAICreator();
              } else if (onOpenStudentChat) {
                onOpenStudentChat();
              } else if (onOpenDrawing) {
                onOpenDrawing();
              }
            }}
            className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 ${
              activeTab === 'create'
                ? 'bg-purple-100/90 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-create"
          >
            <div className="w-5.5 h-5.5 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-xs">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap">
              Create
            </span>
          </button>

          {/* Tab 4: Library (4 rounded squares icon - 2x2 grid) */}
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
                ? 'bg-purple-100/90 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-library"
          >
            <LayoutGrid className="w-5 h-5 text-slate-900 dark:text-slate-100 fill-slate-900 dark:fill-slate-100" />
            <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap">
              Library
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
                  ? 'bg-purple-100/90 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-bold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
              id="nav-tab-results"
            >
              <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap">
                Results
              </span>
            </button>
          )}

          {/* Optional Tab 6: Notifications */}
          {onOpenNotifications && (
            <button
              onClick={() => {
                setActiveTab('notifications');
                onOpenNotifications();
              }}
              className={`flex flex-col items-center justify-center min-w-[58px] px-2 py-1 rounded-2xl shrink-0 transition-all cursor-pointer active:scale-95 relative ${
                activeTab === 'notifications'
                  ? 'bg-purple-100/90 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-bold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
              id="nav-tab-notifications"
            >
              <div className="relative">
                <Bell className="w-5 h-5 text-slate-900 dark:text-slate-100" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-0.5 bg-rose-500 text-white text-[8px] font-extrabold rounded-full flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap">
                Alerts
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
                ? 'bg-purple-100/90 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-bold'
                : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`}
            id="nav-tab-menu"
          >
            <Menu className="w-5 h-5 text-slate-900 dark:text-slate-100" />
            <span className="text-[10px] font-bold mt-0.5 tracking-tight whitespace-nowrap">
              Menu
            </span>
          </button>
        </nav>
      </div>

      {/* 2. Separate Floating Action Circle Button on Right ("Join") */}
      <button
        onClick={onOpenQRCode || onOpenMenu}
        className="w-16 h-16 sm:w-17 sm:h-17 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-indigo-950/20 rounded-full flex flex-col items-center justify-center text-slate-900 dark:text-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 pointer-events-auto group relative overflow-hidden"
        id="nav-tab-join"
        title="Join Exam / Quiz"
      >
        {/* Soft top gradient inner-glow on Join button */}
        <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-cyan-300/60 via-purple-300/50 to-purple-500/60 blur-xs pointer-events-none" />

        {/* 4 Geometric Colorful Kahoot Icon Shapes (Red Triangle, Blue Diamond, Yellow Circle, Green Square) */}
        <div className="p-1 bg-slate-50 dark:bg-slate-800/90 rounded-lg border border-slate-200/70 dark:border-slate-700/70 shadow-xs group-hover:scale-110 transition-transform">
          <div className="grid grid-cols-2 gap-0.5 items-center justify-items-center">
            {/* Red Triangle */}
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-rose-500"></div>
            {/* Blue Diamond */}
            <div className="w-2.5 h-2.5 bg-blue-600 rotate-45 rounded-[1px]"></div>
            {/* Yellow Circle */}
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
            {/* Green Square */}
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-[1px]"></div>
          </div>
        </div>

        <span className="text-[11px] font-black mt-0.5 tracking-tight text-slate-900 dark:text-slate-100 font-sans">
          Join
        </span>
      </button>
    </div>
  );
};




