import React from 'react';
import { Menu, BookOpen, Bookmark, Award, Search, Target, Flame, Sparkles, User, Bell, QrCode, Smartphone, Sun, Moon, ShieldCheck } from 'lucide-react';
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
  onOpenStudentChat?: () => void;
  onOpenNotifications?: () => void;
  onOpenQRCode?: () => void;
  onOpenAddToHomeScreen?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  unreadNotificationsCount?: number;
  onHomeClick: () => void;
  userProfile?: UserProfile | null;
  onOpenRegistrationModal?: () => void;
  onOpenCharacterModal?: () => void;
  onOpenOwnerTracking?: () => void;
  isVisible?: boolean;
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
  onOpenStudentChat,
  onOpenNotifications,
  onOpenQRCode,
  onOpenAddToHomeScreen,
  isDarkMode,
  onToggleDarkMode,
  unreadNotificationsCount = 0,
  onHomeClick,
  userProfile,
  onOpenRegistrationModal,
  onOpenCharacterModal,
  onOpenOwnerTracking,
  isVisible = true
}) => {
  return (
    <header className={`fixed top-0 inset-x-0 z-40 w-full max-w-full overflow-x-hidden bg-gradient-to-r from-[#2B170B] via-[#452413] to-[#2B170B] text-amber-50 border-b border-amber-600/30 shadow-lg shadow-amber-950/20 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
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

        {/* Center Extra: Student Character Button */}
        {onOpenCharacterModal && (
          <button
            onClick={onOpenCharacterModal}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-bold text-yellow-200 transition-all cursor-pointer backdrop-blur-md shadow-xs active:scale-95"
            id="btn-header-character-select"
          >
            <span className="text-base">{userProfile?.avatar || '👦'}</span>
            <span className="font-moul text-amber-100">{userProfile?.name || 'សុខា'}</span>
            <span className="bg-amber-500 text-amber-950 text-[10px] px-1.5 py-0.2 rounded-md font-extrabold">
              🎭 ៥០ តួអង្គ
            </span>
          </button>
        )}

        {/* Right: Actions Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
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

          {/* Notifications Button */}
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-amber-200 hover:text-amber-100 hover:bg-amber-800/40 transition-colors cursor-pointer active:scale-95 group"
              title="ការជូនដំណឹង"
              id="btn-notifications-header"
            >
              <Bell className="w-4.5 h-4.5 text-yellow-300 group-hover:rotate-12 transition-transform" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-4.5 px-1 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#2B170B] shadow-md animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Dark Mode Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-amber-200 hover:text-amber-100 hover:bg-amber-800/40 transition-colors cursor-pointer active:scale-95"
              title={isDarkMode ? 'ប្តូរទៅម៉ូដភ្លឺ (Light Mode)' : 'ប្តូរទៅម៉ូដងងឹត (Dark Mode)'}
              id="btn-dark-mode-header"
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-yellow-300 animate-spin-slow" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-amber-200" />
              )}
            </button>
          )}

          {/* Add to Home Screen PWA Button */}
          {onOpenAddToHomeScreen && (
            <button
              onClick={onOpenAddToHomeScreen}
              className="p-2 rounded-xl bg-amber-800/50 text-amber-200 hover:text-white hover:bg-amber-700/60 transition-colors cursor-pointer active:scale-95 flex items-center gap-1 border border-amber-500/30 shadow-xs"
              title="បន្ថែម App លើទូរស័ព្ទ (Add to Home Screen)"
              id="btn-pwa-header"
            >
              <Smartphone className="w-4.5 h-4.5 text-amber-300" />
              <span className="hidden md:inline text-[11px] font-bold">ដំឡើង App</span>
            </button>
          )}

          {/* Owner Tracking Portal Button */}
          {onOpenOwnerTracking && (
            <button
              onClick={onOpenOwnerTracking}
              className="p-2 rounded-xl bg-amber-500/20 text-amber-300 hover:text-white hover:bg-amber-500/40 border border-amber-400/30 transition-colors cursor-pointer active:scale-95 flex items-center gap-1"
              title="ប្រព័ន្ធតាមដានការចូលប្រឡង (Owner Tracking)"
              id="btn-owner-tracking-header"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-amber-300" />
              <span className="hidden lg:inline text-[11px] font-bold">Owner Sheet</span>
            </button>
          )}

          {/* QR Code Button */}
          {onOpenQRCode && (
            <button
              onClick={onOpenQRCode}
              className="p-2 rounded-xl text-amber-200 hover:text-amber-100 hover:bg-amber-800/40 transition-colors cursor-pointer active:scale-95"
              title="QR Code ចូល App"
              id="btn-qr-header"
            >
              <QrCode className="w-4.5 h-4.5 text-amber-300" />
            </button>
          )}

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

