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
  onOpenAIBattle?: () => void;
  onOpenStudentChat?: () => void;
  onOpenNotifications?: () => void;
  onOpenEnglishGame?: () => void;
  onOpenFishingGame?: () => void;
  onOpenAbout?: () => void;
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
  onOpenAIBattle,
  onOpenStudentChat,
  onOpenNotifications,
  onOpenEnglishGame,
  onOpenFishingGame,
  onOpenAbout,
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {/* Student Profile Card */}
          <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/70 rounded-xl p-3.5 border border-amber-200/80 shadow-2xs">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0 border border-amber-300">
                  {userProfile?.avatar || '🎓'}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate font-moul text-amber-950">
                    {userProfile?.name || 'សិស្សមិនទាន់ចុះឈ្មោះ'}
                  </h3>
                  <p className="text-xs text-amber-800 font-medium truncate mt-0.5">
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
                  className="p-2 rounded-lg bg-amber-200/60 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer shrink-0"
                  title="កែប្រែព័ត៌មាន"
                  id="btn-edit-profile-drawer"
                >
                  <Edit3 className="w-4 h-4 text-amber-900" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Nav Group 1: ទូទៅ & ការសិក្សា (General & Study) */}
          <div className="space-y-1">
            <div className="px-2 text-xs font-extrabold uppercase tracking-wider text-amber-900/70 font-sans mb-1">
              ទំព័រដើម & ការសិក្សា
            </div>

            <button
              onClick={() => {
                onHomeClick();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-amber-50 hover:text-amber-950 transition-colors flex items-center gap-3 text-sm cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <span className="font-semibold">ទំព័រដើម</span>
            </button>

            {onOpenStudentChat && (
              <button
                onClick={() => {
                  onOpenStudentChat();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-amber-100/70 transition-colors flex items-center justify-between text-sm cursor-pointer"
                id="btn-student-chat-drawer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-sm shrink-0">
                    💬
                  </div>
                  <span className="font-bold text-amber-950">Chat ពិភាក្សារវាងសិស្ស</span>
                </div>
                <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  ថ្មី
                </span>
              </button>
            )}

            {onOpenModernLibrary && (
              <button
                onClick={() => {
                  onOpenModernLibrary();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-amber-100/70 transition-colors flex items-center gap-3 text-sm cursor-pointer"
              >
                <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm shrink-0">
                  📚
                </div>
                <span className="font-semibold">បណ្ណាល័យទំនើប</span>
              </button>
            )}

            {onOpenEnglishGame && (
              <button
                onClick={() => {
                  onOpenEnglishGame();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-sky-50 transition-colors flex items-center gap-3 text-sm cursor-pointer"
                id="btn-english-game-drawer"
              >
                <div className="w-7 h-7 rounded-md bg-sky-100 text-sky-800 flex items-center justify-center text-sm shrink-0">
                  🔤
                </div>
                <span className="font-semibold">រៀនភាសាអង់គ្លេស ថ្នាក់ទី៦</span>
              </button>
            )}
          </div>

          {/* Quick Nav Group 2: ការប្រកួត & ហ្គេម (Games & Battles) */}
          <div className="space-y-1">
            <div className="px-2 text-xs font-extrabold uppercase tracking-wider text-amber-900/70 font-sans mb-1">
              ល្បងសមត្ថភាព & ហ្គេម
            </div>

            {onOpenFishingGame && (
              <button
                onClick={() => {
                  onOpenFishingGame();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-cyan-50 transition-colors flex items-center justify-between text-sm cursor-pointer"
                id="btn-fishing-game-drawer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-cyan-100 text-cyan-800 flex items-center justify-center text-sm shrink-0">
                    🎣
                  </div>
                  <span className="font-semibold">ហ្គេមស្ទូចត្រី (អ្នក vs AI)</span>
                </div>
                <span className="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded-md">
                  Fun
                </span>
              </button>
            )}

            {onOpenAIBattle && (
              <button
                onClick={() => {
                  onOpenAIBattle();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-purple-50 transition-colors flex items-center justify-between text-sm cursor-pointer"
                id="btn-ai-battle-drawer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-800 flex items-center justify-center text-sm shrink-0">
                    ⚔️
                  </div>
                  <span className="font-semibold">ប្រកួតជាមួយគ្រូ AI</span>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-md">
                  Quiz
                </span>
              </button>
            )}

            {onOpenMissions && (
              <button
                onClick={() => {
                  onOpenMissions();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-amber-50 transition-colors flex items-center gap-3 text-sm cursor-pointer"
              >
                <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <span className="font-semibold">បេសកកម្ម និងរង្វាន់</span>
              </button>
            )}
          </div>

          {/* Quick Nav Group 3: វឌ្ឍនភាព & ការកំណត់ (Progress & Items) */}
          <div className="space-y-1">
            <div className="px-2 text-xs font-extrabold uppercase tracking-wider text-amber-900/70 font-sans mb-1">
              វឌ្ឍនភាព & សំណួរ
            </div>

            {onOpenNotifications && (
              <button
                onClick={() => {
                  onOpenNotifications();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-amber-50 transition-colors flex items-center justify-between text-sm cursor-pointer"
                id="btn-notifications-drawer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">ការជូនដំណឹង</span>
                </div>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full">
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
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-amber-50 transition-colors flex items-center gap-3 text-sm cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span className="font-semibold">លទ្ធផល និងវឌ្ឍនភាព</span>
            </button>

            <button
              onClick={() => {
                onOpenBookmarks();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-amber-50 transition-colors flex items-center gap-3 text-sm cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Bookmark className="w-4 h-4" />
              </div>
              <span className="font-semibold">សំណួរបានចំណាំ</span>
            </button>

            {onOpenDrawing && (
              <button
                onClick={() => {
                  onOpenDrawing();
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-rose-50 transition-colors flex items-center gap-3 text-sm cursor-pointer"
              >
                <div className="w-7 h-7 rounded-md bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <span className="font-semibold">គំនូសសេរី (Art Canvas)</span>
              </button>
            )}

            <button
              onClick={() => {
                if (onOpenAbout) {
                  onOpenAbout();
                } else {
                  window.open('https://t.me/Duk_sopheak1', '_blank');
                }
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-sky-50 transition-colors flex items-center justify-between text-sm cursor-pointer"
              id="btn-about-me-drawer"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-semibold">អំពីខ្ញុំ</span>
              </div>
              <span className="text-[11px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-md">
                ព័ត៌មាន & Contact
              </span>
            </button>
          </div>

          {/* Subjects List */}
          <div className="pt-3 border-t border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900/70 px-2 mb-2 font-sans">
              មុខវិជ្ជាប្រឡងថ្នាក់ទី៦
            </h3>
            <div className="grid grid-cols-1 gap-1">
              {SUBJECTS.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectSubject(sub.id);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer flex items-center justify-between group hover:bg-slate-100 ${sub.colorBorder} border-l-2`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-md ${sub.colorBgLight} ${sub.colorText} flex items-center justify-center font-bold text-xs`}>
                      {sub.symbol}
                    </span>
                    <span className="text-slate-800 group-hover:text-amber-950 font-bold">{sub.nameKhmer}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3.5 border-t border-slate-100 text-center text-xs text-slate-500 bg-slate-50 flex flex-col items-center justify-center gap-1">
          <p className="font-semibold text-slate-700">ត្រៀមប្រឡងថ្នាក់ទី៦ v1.0</p>
          <button
            onClick={() => {
              if (onOpenAbout) {
                onOpenAbout();
              } else {
                window.open('https://t.me/Duk_sopheak1', '_blank');
              }
              onClose();
            }}
            className="inline-flex items-center gap-1 text-sky-600 font-bold hover:underline text-xs cursor-pointer"
          >
            <span>អំពីលោកគ្រូ ឌុក សុភ័ក្រ ៖ @Duk_sopheak1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
