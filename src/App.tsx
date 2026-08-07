import React, { useState, useEffect } from 'react';
import { SubjectId, ExamPaper, ExamResult, UserProgress, Question, UserProfile, StudentAccount } from './types';
import { SUBJECTS, EXAM_PAPERS, LESSON_SUMMARIES } from './data/grade6Data';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SubjectCard } from './components/SubjectCard';
import { SubjectDetailView } from './components/SubjectDetailView';
import { ExamRunner } from './components/ExamRunner';
import { BookmarksModal } from './components/BookmarksModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { ProgressModal } from './components/ProgressModal';
import { FreeDrawingModal } from './components/FreeDrawingModal';
import { NotificationsModal } from './components/NotificationsModal';
import { MissionsModal } from './components/MissionsModal';
import { ModernLibraryModal } from './components/ModernLibraryModal';
import { StudentAccountModal } from './components/StudentAccountModal';
import { StudentChatModal } from './components/StudentChatModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { EnglishGameModal } from './components/EnglishGameModal';
import { AIBattleModal } from './components/AIBattleModal';
import { FishingGameModal } from './components/FishingGameModal';
import {
  migrateLegacyDataIfNeeded,
  syncStudentState,
  getCurrentStudentAccount
} from './utils/studentAccounts';
import { Search, GraduationCap, BookOpen, Sparkles, Filter, Trophy, ArrowRight, Target, Layers, Palette, Swords } from 'lucide-react';

export default function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'exam' | 'lesson'>('exam');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isAIBattleOpen, setIsAIBattleOpen] = useState(false);
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);
  const [isModernLibraryOpen, setIsModernLibraryOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isStudentChatOpen, setIsStudentChatOpen] = useState(false);
  const [isInitialSetup, setIsInitialSetup] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEnglishGameOpen, setIsEnglishGameOpen] = useState(false);
  const [isFishingGameOpen, setIsFishingGameOpen] = useState(false);
  const [fishingInitialSubject, setFishingInitialSubject] = useState<SubjectId>('math');
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  // Active Student Account state
  const [currentAccount, setCurrentAccount] = useState<StudentAccount | null>(() => {
    return migrateLegacyDataIfNeeded();
  });

  // Automatically prompt account login/register on first load if no student account
  useEffect(() => {
    if (!currentAccount) {
      setIsInitialSetup(true);
      setIsAccountModalOpen(true);
    }
  }, []);

  // Bookmarks state tied to current student
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(() => {
    return currentAccount?.bookmarks || [];
  });

  // Progress state tied to current student
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    return currentAccount?.progress || { completedExams: [], bookmarkedQuestionIds: [], notes: {} };
  });

  // Sync state whenever current student account or bookmarks/progress update
  useEffect(() => {
    if (currentAccount) {
      syncStudentState(currentAccount.id, bookmarkedQuestionIds, userProgress);
    }
  }, [currentAccount, bookmarkedQuestionIds, userProgress]);

  const handleAccountChange = (account: StudentAccount | null) => {
    setCurrentAccount(account);
    if (account) {
      setBookmarkedQuestionIds(account.bookmarks || []);
      setUserProgress(account.progress || { completedExams: [], bookmarkedQuestionIds: [], notes: {} });
    } else {
      setBookmarkedQuestionIds([]);
      setUserProgress({ completedExams: [], bookmarkedQuestionIds: [], notes: {} });
    }
  };

  // Convert currentAccount to UserProfile for legacy component compatibility
  const userProfile: UserProfile | null = currentAccount
    ? {
        name: currentAccount.name,
        grade: currentAccount.grade,
        school: currentAccount.school,
        avatar: currentAccount.avatar,
        registeredAt: currentAccount.createdAt,
        pin: currentAccount.pin
      }
    : null;

  const handleToggleBookmark = (qId: string) => {
    setBookmarkedQuestionIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleFinishExam = (result: ExamResult) => {
    setUserProgress((prev) => ({
      ...prev,
      completedExams: [result, ...prev.completedExams]
    }));
  };

  // Find all bookmarked question objects
  const allQuestions: Question[] = EXAM_PAPERS.flatMap((e) => e.questions);
  const bookmarkedQuestions = allQuestions.filter((q) => bookmarkedQuestionIds.includes(q.id));

  // Current Subject
  const selectedSubject = SUBJECTS.find((s) => s.id === selectedSubjectId);
  const subjectExams = EXAM_PAPERS.filter((e) => e.subjectId === selectedSubjectId);
  const subjectLessons = LESSON_SUMMARIES.filter((l) => l.subjectId === selectedSubjectId);

  // Search filtered subjects
  const filteredSubjects = SUBJECTS.filter(
    (s) =>
      s.nameKhmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-['Kantumruuy_Pro',sans-serif]">
      {/* Top Header */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkedCount={bookmarkedQuestionIds.length}
        onOpenSearch={() => setIsGlobalSearchOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
        onOpenDrawing={() => setIsDrawingOpen(true)}
        onOpenStudentChat={() => setIsStudentChatOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
        onHomeClick={() => {
          setSelectedSubjectId(null);
          setSelectedExam(null);
        }}
        userProfile={userProfile}
        onOpenRegistrationModal={() => {
          setIsInitialSetup(false);
          setIsAccountModalOpen(true);
        }}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 space-y-6">
        {/* If taking an exam */}
        {selectedExam ? (
          <ExamRunner
            exam={selectedExam}
            onBack={() => setSelectedExam(null)}
            onFinishExam={handleFinishExam}
            bookmarkedQuestionIds={bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : selectedSubject ? (
          /* Subject Detail View */
          <SubjectDetailView
            subject={selectedSubject}
            examPapers={subjectExams}
            lessons={subjectLessons}
            onBack={() => setSelectedSubjectId(null)}
            onSelectExam={(exam) => setSelectedExam(exam)}
            bookmarkedQuestionIds={bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenEnglishGame={() => setIsEnglishGameOpen(true)}
            onOpenFishingGame={() => {
              setFishingInitialSubject(selectedSubject.id);
              setIsFishingGameOpen(true);
            }}
          />
        ) : (
          /* Main Homepage View matching reference design */
          <>
            {/* Hero Banner */}
            <HeroBanner
              onStartExamClick={() => {
                setActiveMainTab('exam');
                setSelectedSubjectId('khmer');
              }}
              onStartLessonClick={() => {
                setActiveMainTab('lesson');
                setSelectedSubjectId('khmer');
              }}
              onOpenMissions={() => setIsMissionsOpen(true)}
              onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
              onOpenStudentChat={() => setIsStudentChatOpen(true)}
              onOpenFishingGame={() => setIsFishingGameOpen(true)}
              userProfile={userProfile}
              onOpenRegistrationModal={() => {
                setIsInitialSetup(false);
                setIsAccountModalOpen(true);
              }}
            />

            {/* Quick Feature Hub (Organized 4-Grid Shortcuts) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setIsModernLibraryOpen(true)}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
                id="hub-btn-library"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-lg font-bold shadow-2xs group-hover:scale-110 transition-transform">📚</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900">៣០+ អត្ថបទ</span>
                </div>
                <div>
                  <h4 className="font-moul text-xs text-amber-950 font-bold group-hover:text-amber-800 transition-colors">បណ្ណាល័យ</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">អត្ថបទអានបន្ថែម</p>
                </div>
              </button>

              <button
                onClick={() => setIsMissionsOpen(true)}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
                id="hub-btn-missions"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-lg font-bold shadow-2xs group-hover:scale-110 transition-transform">🎯</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900">រង្វាន់ធំ</span>
                </div>
                <div>
                  <h4 className="font-moul text-xs text-emerald-950 font-bold group-hover:text-emerald-800 transition-colors">បេសកកម្ម</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">ប្រមូលកាក់ & XP</p>
                </div>
              </button>

              <button
                onClick={() => setIsProgressOpen(true)}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
                id="hub-btn-progress"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center text-lg font-bold shadow-2xs group-hover:scale-110 transition-transform">🏆</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-200/60 text-blue-900">
                    {userProgress.completedExams.length} វិញ្ញាសា
                  </span>
                </div>
                <div>
                  <h4 className="font-moul text-xs text-blue-950 font-bold group-hover:text-blue-800 transition-colors">វឌ្ឍនភាព</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">ប្រវត្តិពិន្ទុ & លទ្ធផល</p>
                </div>
              </button>

              <button
                onClick={() => setIsBookmarksOpen(true)}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
                id="hub-btn-bookmarks"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-9 h-9 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center text-lg font-bold shadow-2xs group-hover:scale-110 transition-transform">🔖</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200/60 text-rose-900">
                    {bookmarkedQuestionIds.length} សំណួរ
                  </span>
                </div>
                <div>
                  <h4 className="font-moul text-xs text-rose-950 font-bold group-hover:text-rose-800 transition-colors">សំណួរចំណាំ</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">មើលសំណួររក្សាទុក</p>
                </div>
              </button>
            </div>

            {/* Filter & Search Section */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
              {/* Tabs & Tips Button */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-xl font-semibold text-xs sm:text-sm">
                  <button
                    onClick={() => setActiveMainTab('exam')}
                    className={`py-2 px-3.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeMainTab === 'exam' ? 'bg-white text-amber-950 shadow-xs font-bold' : 'text-amber-900/70 hover:text-amber-950'}`}
                    id="tab-main-exam"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-700" />
                    <span>វិញ្ញាសាប្រឡង</span>
                  </button>

                  <button
                    onClick={() => setActiveMainTab('lesson')}
                    className={`py-2 px-3.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeMainTab === 'lesson' ? 'bg-white text-amber-950 shadow-xs font-bold' : 'text-amber-900/70 hover:text-amber-950'}`}
                    id="tab-main-lesson"
                  >
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>មេរៀនសង្ខេប</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setIsEnglishGameOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-100/90 border border-sky-300 text-sky-950 text-xs font-bold hover:bg-sky-200 transition-colors cursor-pointer shadow-2xs"
                    id="btn-english-game-main"
                  >
                    <BookOpen className="w-4 h-4 text-sky-700" />
                    <span>📖 ហ្គេមអង់គ្លេស</span>
                  </button>

                  <button
                    onClick={() => setIsAIBattleOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-100/90 border border-purple-300 text-purple-950 text-xs font-bold hover:bg-purple-200 transition-colors cursor-pointer shadow-2xs"
                    id="btn-ai-battle-main"
                  >
                    <Swords className="w-4 h-4 text-purple-800" />
                    <span>⚔️ ប្រកួតជាមួយគ្រូ AI</span>
                  </button>

                  <button
                    onClick={() => setIsFishingGameOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-100 to-sky-100 border border-cyan-400 text-cyan-950 text-xs font-bold hover:from-cyan-200 hover:to-sky-200 transition-colors cursor-pointer shadow-2xs"
                    id="btn-fishing-game-main"
                  >
                    <span className="text-sm">🎣</span>
                    <span>ហ្គេមស្ទូចត្រី (អ្នក vs AI)</span>
                  </button>

                  <button
                    onClick={() => setIsDrawingOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-200 transition-colors cursor-pointer shadow-2xs"
                    id="btn-drawing-main"
                  >
                    <Palette className="w-4 h-4 text-amber-800" />
                    <span>🎨 គំនូសសេរី</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex gap-2">
                <div
                  onClick={() => setIsGlobalSearchOpen(true)}
                  className="relative flex-1 cursor-pointer"
                >
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="search-input-main"
                    type="text"
                    readOnly
                    value={searchQuery}
                    placeholder="ស្វែងរកឯកសារ វិញ្ញាសា មេរៀន ឬអត្ថបទ..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50/70 text-sm focus:bg-white transition-all cursor-pointer font-medium text-slate-700"
                  />
                </div>
                <button
                  onClick={() => setIsGlobalSearchOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
                  id="btn-open-global-search"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">ស្វែងរកចម្រុះ</span>
                </button>
              </div>
            </div>

            {/* Section Title */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-moul text-slate-900 tracking-wide flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-amber-600 rounded-full inline-block"></span>
                  {activeMainTab === 'exam' ? 'មុខវិជ្ជាប្រឡងថ្នាក់ទី៦' : 'មេរៀនសង្ខេបតាមមុខវិជ្ជា'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  ជ្រើសរើសមុខវិជ្ជាខាងក្រោមដើម្បីចាប់ផ្តើមរៀន និងប្រឡង
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                {filteredSubjects.length} មុខវិជ្ជា
              </span>
            </div>

            {/* Subject List Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  selectedMode={activeMainTab}
                  onClick={() => setSelectedSubjectId(subject.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-900/10 bg-[#FAF8F5] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-bold text-amber-950 font-moul">ត្រៀមប្រឡងថ្នាក់ទី៦ - Grade 6 Exam Prep</p>
          <p>កម្មវិធីសិក្សា និងប្រឡងសាកល្បង សម្រាប់សិស្សបឋមសិក្សាថ្នាក់ទី៦</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectSubject={(sId) => setSelectedSubjectId(sId)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
        onOpenDrawing={() => setIsDrawingOpen(true)}
        onOpenAIBattle={() => setIsAIBattleOpen(true)}
        onOpenStudentChat={() => setIsStudentChatOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenEnglishGame={() => setIsEnglishGameOpen(true)}
        onOpenFishingGame={() => setIsFishingGameOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
        onHomeClick={() => {
          setSelectedSubjectId(null);
          setSelectedExam(null);
        }}
        userProfile={userProfile}
        onOpenRegistrationModal={() => {
          setIsInitialSetup(false);
          setIsAccountModalOpen(true);
        }}
      />

      <StudentChatModal
        isOpen={isStudentChatOpen}
        onClose={() => setIsStudentChatOpen(false)}
        currentAccount={currentAccount}
        onOpenAccountModal={() => {
          setIsInitialSetup(false);
          setIsAccountModalOpen(true);
        }}
      />

      <StudentAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentAccount={currentAccount}
        onAccountChange={handleAccountChange}
        isInitialSetup={isInitialSetup}
      />

      <ModernLibraryModal
        isOpen={isModernLibraryOpen}
        onClose={() => setIsModernLibraryOpen(false)}
      />

      <MissionsModal
        isOpen={isMissionsOpen}
        onClose={() => setIsMissionsOpen(false)}
        completedExamCount={userProgress.completedExams.length}
        bookmarkedCount={bookmarkedQuestionIds.length}
      />

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedQuestions={bookmarkedQuestions}
        onRemoveBookmark={handleToggleBookmark}
      />

      <ProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        progress={userProgress}
      />

      <FreeDrawingModal
        isOpen={isDrawingOpen}
        onClose={() => setIsDrawingOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenStudentChat={() => setIsStudentChatOpen(true)}
        onOpenDrawing={() => setIsDrawingOpen(true)}
        onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onUnreadCountChange={(count) => setUnreadNotificationsCount(count)}
      />

      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onSelectSubject={(sId) => setSelectedSubjectId(sId)}
        onSelectExam={(exam) => {
          setSelectedSubjectId(exam.subjectId);
          setSelectedExam(exam);
        }}
        onSelectLesson={(lesson, subjectId) => {
          setSelectedSubjectId(subjectId);
          setActiveMainTab('lesson');
        }}
        onSelectArticle={() => {
          setIsModernLibraryOpen(true);
        }}
      />

      <EnglishGameModal
        isOpen={isEnglishGameOpen}
        onClose={() => setIsEnglishGameOpen(false)}
      />

      <AIBattleModal
        isOpen={isAIBattleOpen}
        onClose={() => setIsAIBattleOpen(false)}
      />

      <FishingGameModal
        isOpen={isFishingGameOpen}
        onClose={() => setIsFishingGameOpen(false)}
        initialSubjectId={fishingInitialSubject}
      />
    </div>
  );
}
