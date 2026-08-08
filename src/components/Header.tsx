import React from 'react';
import { Menu, BookOpen, Bookmark, Award, Search, Target, Flame, Sparkles, User, Bell, QrCode, Smartphone, Sun, Moon, ShieldCheck, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';
import { WalkingCharacterHeader } from './WalkingCharacterHeader';

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
  activeMainTab?: 'exam' | 'lesson' | 'new_exam';
  onSelectMainTab?: (tab: 'exam' | 'lesson' | 'new_exam') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenSearch,
  isDarkMode,
  onToggleDarkMode,
  onHomeClick,
  isVisible = true
}) => {
  return (
    <header className={`fixed top-0 inset-x-0 z-40 w-full max-w-full overflow-x-hidden bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-xl transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-5xl mx-auto px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Three-line menu button */}
        <button
          onClick={onOpenMenu}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all cursor-pointer shadow-xs"
          aria-label="Menu"
          id="btn-main-menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Center: Walking Character reading a book */}
        <WalkingCharacterHeader onHomeClick={onHomeClick} />

        {/* Right: Exactly two buttons (Search & Dark Mode) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer active:scale-95 border border-slate-200 dark:border-slate-700"
            title="ស្វែងរក"
            id="btn-search-header"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer active:scale-95 border border-slate-200 dark:border-slate-700"
              title={isDarkMode ? 'ប្តូរទៅម៉ូដភ្លឺ (Light Mode)' : 'ប្តូរទៅម៉ូដងងឹត (Dark Mode)'}
              id="btn-dark-mode-header"
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-700" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

