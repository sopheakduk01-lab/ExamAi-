import React from 'react';
import { SubjectId, UserProfile } from '../types';
import { SUBJECTS } from '../data/grade6Data';
import { X, Home, BookOpen, GraduationCap, Bookmark, Award, Palette, ChevronRight, Target, Sparkles, User, Edit3, Bell } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubject: (sId: SubjectId) => void;
  onOpenBookmarks: () => void;
  onOpenProgress: () => void;
  onOpenMissions?: () => void;
  onOpenModernLibrary?: () => void;
  onOpenDrawing?: () => void;
  onOpenStudentChat?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  onHomeClick: () => void;
  userProfile?: UserProfile | null;
  onOpenRegistrationModal?: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSubject,
  onOpenBookmarks,
  onOpenProgress,
  onOpenMissions,
  onOpenModernLibrary,
  onOpenDrawing,
  onOpenStudentChat,
  onOpenNotifications,
  unreadNotificationsCount = 0,
  onHomeClick,
  userProfile,
  onOpenRegistrationModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-start animate-fade-in">
      <div className="w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col border-r border-slate-200 overflow-hidden">
        {/* Top Header Drawer */}
        <div className="p-5 bg-gradient-to-r from-[#8C5E3C] to-[#72482A] text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 font-bold flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base font-moul tracking-wide text-amber-100">
                ត្រៀមប្រឡងទី៦
              </h2>
              <p className="text-[11px] text-amber-200/80">កម្រងវិញ្ញាសា និងមេរៀនសង្ខេប</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            id="btn-close-drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Menu List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Student Profile Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 rounded-2xl p-3.5 border border-amber-200/80 shadow-2xs">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs border border-amber-300">
                  {userProfile?.avatar || '🎓'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight font-moul text-amber-950">
                    {userProfile?.name || 'សិស្សមិនទាន់ចុះឈ្មោះ'}
                  </h3>
                  <p className="text-[11px] text-amber-800 font-medium">
                    {userProfile?.grade || 'ថ្នាក់ទី៦'} {userProfile?.school ? `• ${userProfile.school}` : ''}
                  </p>
                </div>
              </div>

              {onOpenRegistrationModal && (
                <button
                  onClick={() => {
                    onOpenRegistrationModal();
                    onClose();
                  }}
                  className="p-2 rounded-xl bg-amber-200/60 hover:bg-amber-300/80 text-amber-900 transition-colors cursor-pointer"
                  title="កែប្រែព័ត៌មាន"
                  id="btn-edit-profile-drawer"
                >
                  <Edit3 className="w-4 h-4 text-amber-900" />
                </button>
              )}
            </div>
          </div>

          {/* Main Quick Links */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onHomeClick();
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center gap-3 text-sm cursor-pointer"
            >
              <Home className="w-4 h-4 text-amber-700" />
              ទំព័រដើម
            </button>

            {onOpenStudentChat && (
              <button
                onClick={() => {
                  onOpenStudentChat();
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-amber-950 bg-gradient-to-r from-amber-100 to-amber-200/90 border border-amber-300 hover:from-amber-200 hover:to-amber-300 transition-colors flex items-center gap-3 text-sm cursor-pointer shadow-2xs"
                id="btn-student-chat-drawer"
              >
                <span className="text-lg">💬</span>
                <span className="font-moul text-amber-950">Chat ពិភាក្សារវាងសិស្ស</span>
              </button>
            )}

            {onOpenModernLibrary && (
              <button
                onClick={() => {
                  onOpenModernLibrary();
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-amber-950 bg-amber-100/90 border border-amber-300 hover:bg-amber-200 transition-colors flex items-center gap-3 text-sm cursor-pointer shadow-2xs"
              >
                <span className="text-base">📚</span>
                <span className="font-moul">បណ្ណាល័យទំនើប</span>
              </button>
            )}

            {onOpenMissions && (
              <button
                onClick={() => {
                  onOpenMissions();
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-[#8C5E3C] bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100 transition-colors flex items-center gap-3 text-sm cursor-pointer"
              >
                <Target className="w-4 h-4 text-amber-600" />
                <span>បេសកកម្ម និងរង្វាន់</span>
              </button>
            )}

            {onOpenNotifications && (
              <button
                onClick={() => {
                  onOpenNotifications();
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-amber-950 bg-amber-50/90 border border-amber-300 hover:bg-amber-100 transition-colors flex items-center justify-between text-sm cursor-pointer shadow-2xs"
                id="btn-notifications-drawer"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-amber-700" />
                  <span>ការជូនដំណឹង (Notifications)</span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => {
                onOpenProgress();
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center gap-3 text-sm cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-700" />
              លទ្ធផល និងវឌ្ឍនភាព
            </button>

            <button
              onClick={() => {
                onOpenBookmarks();
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center gap-3 text-sm cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-amber-700" />
              សំណួរបានចំណាំ
            </button>

            {onOpenDrawing && (
              <button
                onClick={() => {
                  onOpenDrawing();
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-amber-950 bg-amber-50/80 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-3 text-sm cursor-pointer shadow-2xs"
              >
                <Palette className="w-4 h-4 text-amber-700" />
                <span>🎨 គំនូសសេរី (Art Canvas)</span>
              </button>
            )}

            <a
              href="/project.zip"
              download="grade6-exam-prep-source.zip"
              onClick={onClose}
              className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-emerald-950 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors flex items-center gap-3 text-sm cursor-pointer shadow-2xs"
              id="btn-download-zip-drawer"
            >
              <span className="text-base">📦</span>
              <span>ទាញយក Source Code (ZIP File)</span>
            </a>
          </div>

          {/* Subjects List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              មុខវិជ្ជាប្រឡងថ្នាក់ទី៦
            </h3>
            <div className="space-y-1">
              {SUBJECTS.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectSubject(sub.id);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between group hover:bg-slate-100 ${sub.colorBorder} border-l-2`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-md ${sub.colorBgLight} ${sub.colorText} flex items-center justify-center font-bold text-[10px]`}>
                      {sub.symbol}
                    </span>
                    <span className="text-slate-800 group-hover:text-amber-900">{sub.nameKhmer}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-400 bg-slate-50">
          <p className="font-semibold text-slate-600">ត្រៀមប្រឡងថ្នាក់ទី៦ v1.0</p>
          <p className="text-[10px] mt-0.5">សម្រាប់សិស្សានុសិស្សបឋមសិក្សា</p>
        </div>
      </div>
    </div>
  );
};
