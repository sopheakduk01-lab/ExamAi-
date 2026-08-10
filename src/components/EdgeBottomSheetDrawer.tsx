import React from 'react';
import {
  Star,
  History,
  Download,
  Settings,
  Home,
  Shield,
  Plus,
  Layers,
  Monitor,
  Trash2,
  Puzzle,
  Share2,
  ChevronDown,
  User,
  QrCode,
  Smartphone,
  Sparkles,
  Award,
  BookOpen,
  X,
  Moon,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { UserProfile, StudentAccount } from '../types';

interface EdgeBottomSheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile | null;
  currentAccount?: StudentAccount | null;
  onOpenBookmarks: () => void;
  onOpenProgress: () => void;
  onOpenModernLibrary: () => void;
  onOpenAccountModal: () => void;
  onHomeClick: () => void;
  onOpenAIBattle: () => void;
  onOpenStudentChat: () => void;
  onOpenDrawing: () => void;
  onOpenQRCode: () => void;
  onOpenOwnerTracking: () => void;
  onOpenAddToHomeScreen?: () => void;
  onToggleDarkMode?: () => void;
  isDarkMode?: boolean;
  onResetProgress?: () => void;
  bookmarkedCount?: number;
}

export const EdgeBottomSheetDrawer: React.FC<EdgeBottomSheetDrawerProps> = ({
  isOpen,
  onClose,
  userProfile,
  currentAccount,
  onOpenBookmarks,
  onOpenProgress,
  onOpenModernLibrary,
  onOpenAccountModal,
  onHomeClick,
  onOpenAIBattle,
  onOpenStudentChat,
  onOpenDrawing,
  onOpenQRCode,
  onOpenOwnerTracking,
  onOpenAddToHomeScreen,
  onToggleDarkMode,
  isDarkMode,
  onResetProgress,
  bookmarkedCount = 0
}) => {
  if (!isOpen) return null;

  const displayEmail = currentAccount?.email || 'sopheakduk071@gmail.com';
  const displayName = userProfile?.name || currentAccount?.name || 'Personal Account';

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-fade-in font-siemreap">
      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Edge Style Dark Bottom Sheet Sheet Modal */}
      <div className="w-full max-w-lg mx-auto bg-[#1e222a] text-slate-100 rounded-t-3xl border-t border-slate-700/80 shadow-2xl p-4 sm:p-5 pb-6 space-y-4 animate-slide-up">
        {/* Top Handle Drag Bar */}
        <div className="flex justify-center -mt-1 mb-2">
          <div className="w-12 h-1.5 rounded-full bg-slate-500/60" />
        </div>

        {/* 1. PROFILE ACCOUNT CARD (Matching user screenshot: "Personal sopheakduk071@gmail.com") */}
        <div
          onClick={() => {
            onOpenAccountModal();
            onClose();
          }}
          className="bg-[#2a2f3b] hover:bg-[#323847] active:scale-98 transition-all rounded-2xl p-3.5 border border-slate-700/80 flex items-center justify-between gap-3 cursor-pointer shadow-md"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Profile Avatar Icon */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shrink-0 border border-blue-400/40">
              {userProfile?.avatar ? (
                <span className="text-lg">{userProfile.avatar}</span>
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Profile Name & Email */}
            <div className="min-w-0">
              <h4 className="font-bold text-white text-sm sm:text-base leading-tight truncate">
                {displayName}
              </h4>
              <p className="text-xs text-slate-400 truncate mt-0.5 font-sans">
                {displayEmail}
              </p>
            </div>
          </div>

          {/* Chevron Dropdown arrow */}
          <div className="w-7 h-7 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 shrink-0">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* 2. PRIMARY TOP ACTION ROW (4 Large Circular Action Buttons) */}
        <div className="grid grid-cols-4 gap-2 pt-1 border-b border-slate-700/60 pb-4">
          {/* Favorites / Bookmarks */}
          <button
            onClick={() => {
              onOpenBookmarks();
              onClose();
            }}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-90"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-all relative">
              <Star className="w-5 h-5 text-blue-400 fill-blue-400/20" />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkedCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white">
              Favorites
            </span>
          </button>

          {/* History / Exam Progress */}
          <button
            onClick={() => {
              onOpenProgress();
              onClose();
            }}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-90"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-all">
              <History className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white">
              History
            </span>
          </button>

          {/* Downloads / Modern Library */}
          <button
            onClick={() => {
              onOpenModernLibrary();
              onClose();
            }}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-90"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-all">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white">
              Downloads
            </span>
          </button>

          {/* Settings / Owner Tracking Google Sheets */}
          <button
            onClick={() => {
              onOpenOwnerTracking();
              onClose();
            }}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-90"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-all">
              <Settings className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white">
              Settings
            </span>
          </button>
        </div>

        {/* 3. SECONDARY 4-COLUMN MENU GRID (Matching lower grid in screenshot) */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-2 pt-1 text-center">
          {/* Home */}
          <button
            onClick={() => {
              onHomeClick();
              onClose();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              <Home className="w-5 h-5 text-slate-200" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white">
              Home
            </span>
          </button>

          {/* Quick AI Test (InPrivate / Fast Mode) */}
          <button
            onClick={() => {
              onOpenAIBattle();
              onClose();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              InPrivate Test
            </span>
          </button>

          {/* Add to Favorites */}
          <button
            onClick={() => {
              onOpenBookmarks();
              onClose();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              Add to Favorites
            </span>
          </button>

          {/* Recent Tabs / Whiteboard */}
          <button
            onClick={() => {
              onOpenDrawing();
              onClose();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              Recent Tabs
            </span>
          </button>

          {/* View Desktop Site / Dark Mode toggle */}
          <button
            onClick={() => {
              if (onToggleDarkMode) onToggleDarkMode();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-indigo-300" />}
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Delete Data / Reset Progress */}
          <button
            onClick={() => {
              if (onResetProgress) onResetProgress();
              else {
                alert('ទិន្នន័យប្រឡងត្រូវបានរក្សាទុកក្នុង Google Sheet យ៉ាងសុវត្ថិភាព!');
              }
              onClose();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              Delete Data
            </span>
          </button>

          {/* Extensions / AI Student Chat */}
          <button
            onClick={() => {
              onOpenStudentChat();
              onClose();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              <Puzzle className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              AI Extensions
            </span>
          </button>

          {/* Share / QR Code */}
          <button
            onClick={() => {
              onOpenQRCode();
              onClose();
            }}
            className="group flex flex-col items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              Share QR
            </span>
          </button>
        </div>

        {/* Pagination Dots at Bottom (Matching screenshot "--") */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          <div className="w-5 h-1.5 rounded-full bg-blue-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        </div>
      </div>
    </div>
  );
};
