import React from 'react';
import { Menu, BookOpen, Bookmark, Award, Search, Target, Flame, Sparkles, User } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenBookmarks: () => void;
  bookmarkedCount: number;
  onOpenSearch: () => void;
  onOpenProgress: () => void;
  onOpenMissions?: () => void;
  onOpenModernLibrary?: () => void;
  onOpenDrawing?: () => void;
  onHomeClick: () => void;
  userProfile?: UserProfile | null;
  onOpenRegistrationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenBookmarks,
  bookmarkedCount,
  onOpenSearch,
  onOpenProgress,
  onOpenMissions,
  onOpenModernLibrary,
  onOpenDrawing,
  onHomeClick,
  userProfile,
  onOpenRegistrationModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#2B170B] via-[#452413] to-[#2B170B] text-amber-50 border-b border-amber-600/30 shadow-lg shadow-amber-950/20 backdrop-blur-xl">
      {/* Top subtle highlight shimmer line */}
      <div className="h-0.5 bg-gradient-to-r from-amber-600/20 via-amber-400 to-amber-600/20 w-full opacity-80" />

      <div className="max-w-5xl mx-auto px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Hamburger menu + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-xl bg-amber-950/50 hover:bg-amber-800/50 text-amber-200 border border-amber-600/30 active:scale-95 transition-all cursor-pointer shadow-xs"
            aria-label="Menu"
            id="btn-main-menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center/Left: Brand Logo */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0"
            id="btn-brand-logo"
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-amber-950 flex items-center justify-center shadow-md shadow-amber-950/40 border border-amber-300/50 group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-5 h-5 text-amber-950 font-bold" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400 border border-amber-950"></span>
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-amber-100 tracking-wide leading-tight flex items-center gap-2 font-moul whitespace-nowrap">
                <span>ត្រៀមប្រឡង</span>
                <span className="whitespace-nowrap text-[10px] sm:text-xs font-sans font-bold bg-amber-400/20 text-yellow-300 border border-amber-400/40 px-2 py-0.5 rounded-lg shadow-2xs">
                  ថ្នាក់ទី៦
                </span>
              </div>
              <p className="text-[10px] text-amber-300/80 font-medium tracking-wide leading-none mt-0.5 whitespace-nowrap">
                ប្រព័ន្ធល្បងសមត្ថភាពបឋមសិក្សា
              </p>
            </div>
          </button>
        </div>

        {/* Center Extra: Streak / Level Badge for motivation */}
        <div className="hidden lg:flex items-center gap-2 bg-amber-950/70 border border-amber-600/30 px-3 py-1 rounded-full text-xs font-medium text-amber-200">
          <span className="flex items-center gap-1 text-orange-400 font-bold">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-400 animate-bounce" />
            ៣ ថ្ងៃតជាប់
          </span>
          <span className="text-amber-600">|</span>
          <span className="flex items-center gap-1 text-yellow-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            សិស្សពូកែ ២០២៦
          </span>
        </div>

        {/* Right: Actions Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* User Profile Button */}
          {onOpenRegistrationModal && (
            <button
              onClick={onOpenRegistrationModal}
              className="px-2 sm:px-2.5 py-1 rounded-xl bg-amber-950/80 hover:bg-amber-900/90 border border-amber-500/40 text-amber-100 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
              title={userProfile ? `គណនី៖ ${userProfile.name}` : 'ចុះឈ្មោះប្រើប្រាស់'}
              id="btn-user-profile-header"
            >
              <span className="text-sm">{userProfile?.avatar || '🎓'}</span>
              <span className="hidden sm:inline font-bold text-xs truncate max-w-[90px] text-yellow-200">
                {userProfile?.name || 'ចុះឈ្មោះ'}
              </span>
            </button>
          )}

          {onOpenModernLibrary && (
            <button
              onClick={onOpenModernLibrary}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-200 hover:text-amber-100 border border-amber-400/40 transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs shadow-2xs active:scale-95"
              title="ប័ណ្ណាល័យទំនើប"
              id="btn-modern-library-header"
            >
              <span className="text-sm">📚</span>
              <span className="hidden sm:inline font-moul text-amber-200">ប័ណ្ណាល័យ</span>
            </button>
          )}

          {onOpenDrawing && (
            <button
              onClick={onOpenDrawing}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-800/40 text-amber-200 border border-amber-700/30 transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs active:scale-95"
              title="គំនូសសេរី (Art Canvas)"
              id="btn-drawing-header"
            >
              <span className="text-sm">🎨</span>
              <span className="hidden md:inline text-amber-200">គំនូសសេរី</span>
            </button>
          )}

          <a
            href="/project.zip"
            download="grade6-exam-prep-source.zip"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-600/80 text-emerald-100 border border-emerald-400/50 transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs active:scale-95 shadow-xs"
            title="ទាញយក Code ZIP"
            id="btn-download-zip-header"
          >
            <span className="text-sm">📦</span>
            <span className="hidden sm:inline font-bold">ទាញយក ZIP</span>
          </a>

          {onOpenMissions && (
            <button
              onClick={onOpenMissions}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-800/40 text-amber-200 border border-amber-700/30 transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs active:scale-95"
              title="បេសកកម្ម និងរង្វាន់"
              id="btn-missions-header"
            >
              <Target className="w-4.5 h-4.5 text-amber-400" />
              <span className="hidden md:inline text-amber-200">បេសកកម្ម</span>
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-amber-200 hover:text-amber-100 hover:bg-amber-800/40 transition-colors cursor-pointer active:scale-95"
            title="ស្វែងរក"
            id="btn-search-header"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={onOpenProgress}
            className="p-2 rounded-xl text-amber-200 hover:text-amber-100 hover:bg-amber-800/40 transition-colors cursor-pointer hidden sm:flex items-center gap-1 active:scale-95"
            title="លទ្ធផល"
            id="btn-progress-header"
          >
            <Award className="w-4.5 h-4.5 text-yellow-400" />
          </button>

          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-xl text-amber-200 hover:text-amber-100 hover:bg-amber-800/40 transition-colors cursor-pointer active:scale-95"
            title="សំណួរដែលបានចំណាំ"
            id="btn-bookmarks-header"
          >
            <Bookmark className="w-4.5 h-4.5 text-amber-200" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-4.5 px-1 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#2B170B] shadow-md animate-pulse">
                {bookmarkedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

