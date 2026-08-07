import React, { useState, useEffect } from 'react';
import { SubjectId, ExamPaper, ExamResult, UserProgress, Question, UserProfile, StudentAccount } from './types';
import { SUBJECTS, EXAM_PAPERS, LESSON_SUMMARIES } from './data/grade6Data';
import { NEW_EXAM_PAPERS } from './data/newExamsData';
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
import { AboutModal } from './components/AboutModal';
import { QRCodeModal } from './components/QRCodeModal';
import { AddToHomeScreenModal } from './components/AddToHomeScreenModal';
import { CharacterSelectionModal } from './components/CharacterSelectionModal';
import { StudentExamRegistrationModal } from './components/StudentExamRegistrationModal';
import { OwnerTrackingModal } from './components/OwnerTrackingModal';
import { MobileLauncherHome } from './components/MobileLauncherHome';
import { Grade6ExamCarousel } from './components/Grade6ExamCarousel';
import { EdgeBottomSheetDrawer } from './components/EdgeBottomSheetDrawer';
import { FacebookBottomNav } from './components/FacebookBottomNav';
import { CHARACTERS_DATA, FullBodyCharacter as CharacterType } from './data/charactersData';
import { FullBodyCharacter } from './components/FullBodyCharacter';
import {
  migrateLegacyDataIfNeeded,
  syncStudentState,
  getCurrentStudentAccount,
  getOrCreateDefaultStudentAccount,
  updateStudentAccount
} from './utils/studentAccounts';
import { Search, GraduationCap, BookOpen, Sparkles, Filter, Trophy, ArrowRight, Target, Layers, Palette, Swords, Music, Globe, Clock, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export default function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'exam' | 'lesson' | 'new_exam'>('exam');
  const [useMobileLauncher, setUseMobileLauncher] = useState(false);
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
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isStudentChatOpen, setIsStudentChatOpen] = useState(false);
  const [isInitialSetup, setIsInitialSetup] = useState(false);

  // Automatically trigger character selection modal on initial app entry (onboarding registration)
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('grade6_has_completed_character_onboarding');
    if (!hasCompletedOnboarding) {
      setIsCharacterModalOpen(true);
    }
  }, []);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEnglishGameOpen, setIsEnglishGameOpen] = useState(false);
  const [isFishingGameOpen, setIsFishingGameOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [isAddToHomeScreenOpen, setIsAddToHomeScreenOpen] = useState(false);
  const [isOwnerTrackingOpen, setIsOwnerTrackingOpen] = useState(false);
  const [isStudentRegistrationOpen, setIsStudentRegistrationOpen] = useState(false);
  const [pendingExamToStart, setPendingExamToStart] = useState<ExamPaper | null>(null);
  const [fishingInitialSubject, setFishingInitialSubject] = useState<SubjectId>('math');
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  const handleSelectExamWithRegistration = (exam: ExamPaper) => {
    setPendingExamToStart(exam);
    setIsStudentRegistrationOpen(true);
  };

  const handleConfirmStudentRegistration = (info: { name: string; gender: 'ប្រុស' | 'ស្រី' }) => {
    setIsStudentRegistrationOpen(false);
    if (pendingExamToStart) {
      setSelectedExam(pendingExamToStart);
      setPendingExamToStart(null);
    }
  };

  // Handler for Home navigation button - resets views to Grade 6 Primary School Completion Exam Prep
  const handleGoHome = () => {
    setSelectedSubjectId(null);
    setSelectedExam(null);
    setActiveMainTab('exam');
    setUseMobileLauncher(false);
    setIsStudentChatOpen(false);
    setIsMissionsOpen(false);
    setIsProgressOpen(false);
    setIsNotificationsOpen(false);
    setIsModernLibraryOpen(false);
    setIsDrawingOpen(false);
    setIsQRCodeOpen(false);
    setIsMenuOpen(false);
    setIsBookmarksOpen(false);
    setIsGlobalSearchOpen(false);
    setIsAIBattleOpen(false);
    setIsFishingGameOpen(false);
    setIsEnglishGameOpen(false);
    setIsAccountModalOpen(false);
    setIsCharacterModalOpen(false);
    setIsAboutOpen(false);
    setIsAddToHomeScreenOpen(false);
    setIsOwnerTrackingOpen(false);
    setIsStudentRegistrationOpen(false);
    setPendingExamToStart(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Active Student Account state - Default to instant default guest account (NO mandatory signup)
  const [currentAccount, setCurrentAccount] = useState<StudentAccount>(() => {
    return migrateLegacyDataIfNeeded() || getOrCreateDefaultStudentAccount();
  });

  // Current selected full body character
  const currentCharacter = CHARACTERS_DATA.find(
    (c) => c.id === (currentAccount?.characterId || 'char_1')
  ) || CHARACTERS_DATA[0];

  const handleCloseCharacterModal = () => {
    localStorage.setItem('grade6_has_completed_character_onboarding', 'true');
    setIsCharacterModalOpen(false);
  };

  const handleSelectCharacter = (char: CharacterType) => {
    localStorage.setItem('grade6_has_completed_character_onboarding', 'true');
    if (currentAccount) {
      const updated = updateStudentAccount(currentAccount.id, {
        name: char.name.split(' (')[0],
        avatar: char.badgeEmoji,
        characterId: char.id
      });
      if (updated) setCurrentAccount(updated);
    } else {
      const newAcc = getOrCreateDefaultStudentAccount();
      const updated = updateStudentAccount(newAcc.id, {
        name: char.name.split(' (')[0],
        avatar: char.badgeEmoji,
        characterId: char.id
      });
      if (updated) setCurrentAccount(updated);
    }
  };

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

  // Directional navigation bar visibility based on user request:
  // When scrolling down towards bottom: top header disappears, bottom bar shows.
  // When scrolling up towards top: top header shows, bottom bar disappears.
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        // Near top of page: show both bars
        setIsHeaderVisible(true);
        setIsBottomNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling DOWN towards bottom: hide top header, show bottom nav
        setIsHeaderVisible(false);
        setIsBottomNavVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP towards top: show top header, hide bottom nav
        setIsHeaderVisible(true);
        setIsBottomNavVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-[#FAF8F5] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-['Siemreap','Khmer_OS_Siemreap','Kantumruuy_Pro',sans-serif] transition-colors duration-200">
      {/* Navigation Header */}
      <Header
        isVisible={isHeaderVisible}
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
        onOpenQRCode={() => setIsQRCodeOpen(true)}
        onOpenAddToHomeScreen={() => setIsAddToHomeScreenOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        unreadNotificationsCount={unreadNotificationsCount}
        onHomeClick={handleGoHome}
        userProfile={userProfile}
        onOpenRegistrationModal={() => {
          setIsInitialSetup(false);
          setIsAccountModalOpen(true);
        }}
        onOpenCharacterModal={selectedSubjectId || selectedExam ? undefined : () => setIsCharacterModalOpen(true)}
        onOpenOwnerTracking={() => setIsOwnerTrackingOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-16 sm:pt-20 pb-20 space-y-6">
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
            onSelectExam={(exam) => handleSelectExamWithRegistration(exam)}
            bookmarkedQuestionIds={bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenEnglishGame={() => setIsEnglishGameOpen(true)}
            onOpenFishingGame={() => {
              setFishingInitialSubject(selectedSubject.id);
              setIsFishingGameOpen(true);
            }}
          />
        ) : useMobileLauncher ? (
          /* Mobile Launcher View matching reference design image (Easy to click) */
          <MobileLauncherHome
            userProfile={userProfile}
            currentAccount={currentAccount}
            onSelectSubject={(id) => setSelectedSubjectId(id)}
            onSelectMainTab={(tab) => setActiveMainTab(tab)}
            onOpenSearch={() => setIsGlobalSearchOpen(true)}
            onOpenStudentChat={() => setIsStudentChatOpen(true)}
            onOpenAIBattle={() => setIsAIBattleOpen(true)}
            onOpenFishingGame={() => setIsFishingGameOpen(true)}
            onOpenEnglishGame={() => setIsEnglishGameOpen(true)}
            onOpenDrawing={() => setIsDrawingOpen(true)}
            onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
            onOpenMissions={() => setIsMissionsOpen(true)}
            onOpenBookmarks={() => setIsBookmarksOpen(true)}
            onOpenProgress={() => setIsProgressOpen(true)}
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenCharacterModal={() => setIsCharacterModalOpen(true)}
            onOpenAccountModal={() => {
              setIsInitialSetup(false);
              setIsAccountModalOpen(true);
            }}
            onSelectExamWithRegistration={handleSelectExamWithRegistration}
            activeMainTab={activeMainTab}
            bookmarkedCount={bookmarkedQuestionIds.length}
          />
        ) : (
          /* Classic Main Homepage View */
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
              onOpenCharacterModal={() => setIsCharacterModalOpen(true)}
            />

            {/* Announcement Notification Banner for Students */}
            <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 border border-amber-700/50">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-700/50 backdrop-blur-md flex items-center justify-center shrink-0 text-xl sm:text-2xl shadow-inner border border-amber-500/30">
                  📢
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-wide animate-pulse">
                      ជូនដំណឹងថ្មី
                    </span>
                    <h3 className="font-moul text-sm sm:text-base text-amber-100">
                      តេស្តវិញ្ញាសាថ្មីត្រូវបានដាក់បញ្ចូល!
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 font-medium leading-relaxed">
                    សូមអញ្ជើញសិស្សានុសិស្សថ្នាក់ទី៦ ចូលរួមធ្វើតេស្ត <span className="text-white font-bold">វិញ្ញាសាត្រៀមប្រឡងឆមាសលើកទី២ មុខវិជ្ជា៖ វិទ្យាសាស្ត្រ (កម្រងអូរឫស្សីកណ្តាល)</span> ដើម្បីវាស់ស្ទង់សមត្ថភាពឥឡូវនេះ!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveMainTab('new_exam');
                  if (NEW_EXAM_PAPERS.length > 0) {
                    handleSelectExamWithRegistration(NEW_EXAM_PAPERS[0]);
                  }
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-102 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>ចូលធ្វើតេស្តឥឡូវនេះ</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
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

                  <button
                    onClick={() => setActiveMainTab('new_exam')}
                    className={`py-2 px-3.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 relative ${activeMainTab === 'new_exam' ? 'bg-white text-amber-950 shadow-xs font-bold' : 'text-amber-900/70 hover:text-amber-950'}`}
                    id="tab-main-new-exam"
                  >
                    <Sparkles className="w-4 h-4 text-amber-700 animate-pulse" />
                    <span>តេស្តវិញ្ញាសាថ្មី</span>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-bounce shadow-xs">
                      NEW!
                    </span>
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


            </div>

            {/* Horizontal Swipeable Grade 6 Exam Prep Carousel ( ត្រៀមប្រឡងបញ្ចប់បឋមសិក្សា ថ្នាក់ទី៦ ) */}
            {activeMainTab === 'exam' && (
              <Grade6ExamCarousel
                onSelectExam={(exam) => handleSelectExamWithRegistration(exam)}
                onSelectSubject={(sId) => setSelectedSubjectId(sId)}
              />
            )}

            {/* Section Title */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-moul text-slate-900 tracking-wide flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-amber-600 rounded-full inline-block"></span>
                  {activeMainTab === 'exam'
                    ? 'មុខវិជ្ជាប្រឡងថ្នាក់ទី៦'
                    : activeMainTab === 'new_exam'
                    ? 'តេស្តវិញ្ញាសាថ្មី'
                    : 'មេរៀនសង្ខេបតាមមុខវិជ្ជា'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {activeMainTab === 'new_exam'
                    ? 'ជ្រើសរើសវិញ្ញាសាថ្មីៗខាងក្រោមដើម្បីប្រឡងតេស្តសមត្ថភាព'
                    : 'ជ្រើសរើសមុខវិជ្ជាខាងក្រោមដើម្បីចាប់ផ្តើមរៀន និងប្រឡង'}
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                {activeMainTab === 'new_exam' ? `${NEW_EXAM_PAPERS.length} វិញ្ញាសា` : `${filteredSubjects.length} មុខវិជ្ជា`}
              </span>
            </div>

            {/* Render NEW_EXAM_PAPERS list when new_exam tab is selected */}
            {activeMainTab === 'new_exam' ? (
              <div className="space-y-4 my-2">
                {NEW_EXAM_PAPERS.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => handleSelectExamWithRegistration(paper)}
                    className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-sky-50/40 border-2 border-amber-300/80 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer group relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[11px] shadow-2xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>{paper.yearOrType}</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px] border border-sky-200">
                          🧪 មុខវិជ្ជា៖ វិទ្យាសាស្ត្រ
                        </span>
                      </div>

                      <h3 className="font-moul text-base sm:text-lg text-slate-900 group-hover:text-amber-900 transition-colors leading-relaxed">
                        {paper.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {paper.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{paper.questions.length} សំណួរ (៥ ផ្នែកស្តង់ដារ)</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <Clock className="w-4 h-4 text-sky-600" />
                          <span>{paper.durationMinutes} នាទី</span>
                        </span>
                        <span className="flex items-center gap-1 text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-200">
                          <Award className="w-4 h-4 text-amber-700" />
                          <span>ពិន្ទុសរុប៖ {paper.totalPoints} ពិន្ទុ</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExam(paper);
                      }}
                      className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-amber-950 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
                    >
                      <span>ប្រឡងវិញ្ញាសានេះឥឡូវនេះ</span>
                      <ChevronRight className="w-4 h-4 text-amber-200" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Subject List Cards Grid */
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
            )}
          </>
        )}
      </main>

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
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenQRCode={() => setIsQRCodeOpen(true)}
        onOpenAddToHomeScreen={() => setIsAddToHomeScreenOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
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
        onOpenCharacterModal={selectedSubjectId || selectedExam ? undefined : () => setIsCharacterModalOpen(true)}
        onOpenOwnerTracking={() => setIsOwnerTrackingOpen(true)}
      />

      <CharacterSelectionModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        selectedCharacterId={currentCharacter.id}
        onSelectCharacter={handleSelectCharacter}
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
          handleSelectExamWithRegistration(exam);
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

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <QRCodeModal
        isOpen={isQRCodeOpen}
        onClose={() => setIsQRCodeOpen(false)}
      />

      <AddToHomeScreenModal
        isOpen={isAddToHomeScreenOpen}
        onClose={() => setIsAddToHomeScreenOpen(false)}
      />

      <StudentExamRegistrationModal
        isOpen={isStudentRegistrationOpen}
        examTitle={pendingExamToStart?.title || 'វិញ្ញាសាតេស្ត'}
        onClose={() => {
          setIsStudentRegistrationOpen(false);
          setPendingExamToStart(null);
        }}
        onConfirm={handleConfirmStudentRegistration}
      />

      <OwnerTrackingModal
        isOpen={isOwnerTrackingOpen}
        onClose={() => setIsOwnerTrackingOpen(false)}
      />

      {/* Floating Kahoot-style Bottom Navigation Bar */}
      <FacebookBottomNav
        isVisible={isBottomNavVisible}
        onHomeClick={handleGoHome}
        onOpenStudentChat={() => setIsStudentChatOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
        onOpenDrawing={() => setIsDrawingOpen(true)}
        onOpenQRCode={() => setIsQRCodeOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />
    </div>
  );
}
