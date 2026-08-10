import React, { useState, useEffect, useRef } from 'react';
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
import { VijjaNavaGameModal } from './components/VijjaNavaGameModal';
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
import { AICreatorStudioModal } from './components/AICreatorStudioModal';
import { HomeworkModal } from './components/HomeworkModal';
import { HomeworkSection } from './components/HomeworkSection';
import { CHARACTERS_DATA, FullBodyCharacter as CharacterType } from './data/charactersData';
import { FullBodyCharacter } from './components/FullBodyCharacter';
import {
  migrateLegacyDataIfNeeded,
  syncStudentState,
  getCurrentStudentAccount,
  getOrCreateDefaultStudentAccount,
  updateStudentAccount
} from './utils/studentAccounts';
import { Search, GraduationCap, BookOpen, Sparkles, Filter, Trophy, ArrowRight, Target, Layers, Palette, Swords, Music, Globe, Clock, CheckCircle2, ChevronRight, Award, ChevronLeft, Bot } from 'lucide-react';

export default function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'exam' | 'lesson' | 'new_exam' | 'homework'>('exam');
  const [useMobileLauncher, setUseMobileLauncher] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const newExamsScrollRef = useRef<HTMLDivElement>(null);

  // Modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isAIBattleOpen, setIsAIBattleOpen] = useState(false);
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);
  const [isModernLibraryOpen, setIsModernLibraryOpen] = useState(false);
  const [isHomeworkOpen, setIsHomeworkOpen] = useState(false);
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
  const [isVijjaNavaGameOpen, setIsVijjaNavaGameOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [isAddToHomeScreenOpen, setIsAddToHomeScreenOpen] = useState(false);
  const [isOwnerTrackingOpen, setIsOwnerTrackingOpen] = useState(false);
  const [isStudentRegistrationOpen, setIsStudentRegistrationOpen] = useState(false);
  const [isAICreatorOpen, setIsAICreatorOpen] = useState(false);
  const [pendingExamToStart, setPendingExamToStart] = useState<ExamPaper | null>(null);
  const [fishingInitialSubject, setFishingInitialSubject] = useState<SubjectId>('math');
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  const handleStartCustomQuiz = (quizTitle: string, questions: any[]) => {
    const customExam: ExamPaper = {
      id: 'custom-' + Date.now(),
      title: quizTitle,
      subjectId: 'math',
      description: 'វិញ្ញាសាបង្កើតដោយ AI និងផ្ទាល់ខ្លួនសម្រាប់ត្រៀមប្រឡង',
      durationMinutes: 30,
      totalPoints: questions.length * 10,
      yearOrType: '2026',
      questions: questions.map((q, idx) => ({
        id: q.id || 'q-' + idx,
        text: q.question,
        options: q.options,
        correctAnswerIndex: q.correctAnswer,
        subjectId: 'math' as SubjectId,
        explanation: q.explanation
      }))
    };
    setSelectedExam(customExam);
  };

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




  // Games carousel horizontal scroll & drag handlers
  const gamesScrollRef = useRef<HTMLDivElement>(null);
  const [isGamesMouseDown, setIsGamesMouseDown] = useState(false);
  const [gamesStartX, setGamesStartX] = useState(0);
  const [gamesScrollLeft, setGamesScrollLeft] = useState(0);

  const handleGamesMouseDown = (e: React.MouseEvent) => {
    if (!gamesScrollRef.current) return;
    setIsGamesMouseDown(true);
    setGamesStartX(e.pageX - gamesScrollRef.current.offsetLeft);
    setGamesScrollLeft(gamesScrollRef.current.scrollLeft);
  };

  const handleGamesMouseLeave = () => {
    setIsGamesMouseDown(false);
  };

  const handleGamesMouseUp = () => {
    setIsGamesMouseDown(false);
  };

  const handleGamesMouseMove = (e: React.MouseEvent) => {
    if (!isGamesMouseDown || !gamesScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - gamesScrollRef.current.offsetLeft;
    const walk = (x - gamesStartX) * 1.5;
    gamesScrollRef.current.scrollLeft = gamesScrollLeft - walk;
  };

  const scrollGames = (direction: 'left' | 'right') => {
    if (gamesScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gamesScrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      
      if (direction === 'right') {
        if (scrollLeft >= maxScrollLeft - 30) {
          gamesScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          gamesScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 30) {
          gamesScrollRef.current.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
          gamesScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
      }
    }
  };

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
    setIsAICreatorOpen(false);
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

  const handleEarnRewards = (coins: number, xp: number) => {
    try {
      const raw = localStorage.getItem('grade6_reward_state');
      let state = {
        coins: 500,
        xp: 800,
        level: 3,
        streakDays: 1,
        lastCheckInDate: null,
        claimedMissionIds: [],
        customMissions: [],
        unlockedAvatarIds: ['av_starter'],
        activeAvatarId: 'av_starter',
        unlockedBadgeIds: ['bg_first_step'],
        powerUps: {}
      };
      if (raw) {
        state = { ...state, ...JSON.parse(raw) };
      }
      state.coins = (state.coins || 0) + coins;
      state.xp = (state.xp || 0) + xp;
      
      // Level up calculation: every 1000 XP is a level
      const calculatedLevel = Math.max(state.level, Math.floor(state.xp / 1000) + 1);
      state.level = calculatedLevel;

      localStorage.setItem('grade6_reward_state', JSON.stringify(state));
      console.log(`Earned ${coins} coins and ${xp} XP. New state:`, state);
    } catch (e) {
      console.error('Error updating reward state:', e);
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
        onOpenSearch={() => setIsGlobalSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-24 sm:pt-28 pb-20 space-y-6">
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
            initialTab={activeMainTab === 'lesson' ? 'lessons' : 'exams'}
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
            onOpenVijjaNavaGame={() => setIsVijjaNavaGameOpen(true)}
            onOpenDrawing={() => setIsDrawingOpen(true)}
            onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
            onOpenHomework={() => {
              setActiveMainTab('homework');
              setTimeout(() => {
                const el = document.getElementById('main-exams-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
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
              activeMainTab={activeMainTab}
              onSelectMainTab={(tab) => {
                setActiveMainTab(tab);
                setSelectedSubjectId(null);
                setSelectedExam(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />





            {/* Horizontal Swipeable Square Game Cards Section ( ផ្ទាំងការេ នៃ game នីមួយៗអាចអូសទៅឆ្វេងស្តាំបាន ) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-moul text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-5 bg-purple-600 rounded-full"></span>
                    ហ្គេមអប់រំ និងកម្សាន្ត (អូសស្តាំ-ឆ្វេង)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">ជ្រើសរើសហ្គេមដើម្បីលេង និងសាកល្បងសមត្ថភាព</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollGames('left')}
                    className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                    title="រំកិលទៅឆ្វេង"
                    id="btn-scroll-games-left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollGames('right')}
                    className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                    title="រំកិលទៅស្តាំ"
                    id="btn-scroll-games-right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={gamesScrollRef}
                onMouseDown={handleGamesMouseDown}
                onMouseLeave={handleGamesMouseLeave}
                onMouseUp={handleGamesMouseUp}
                onMouseMove={handleGamesMouseMove}
                className="flex gap-4 overflow-x-auto pb-2 pt-1 scrollbar-none cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {[
                  {
                    id: 'vijja_nava',
                    title: 'វិជ្ជានាវា៖ ល្បងប្រាជ្ញា',
                    subtitle: 'ហ្គេមអប់រំថ្នាក់ទី៦',
                    icon: <span className="text-4xl">👑</span>,
                    bg: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 border-amber-400 hover:border-amber-600 text-amber-950 shadow-amber-200/50',
                    onClick: () => setIsVijjaNavaGameOpen(true)
                  },
                  {
                    id: 'english',
                    title: 'ហ្គេមអង់គ្លេស',
                    subtitle: 'រៀនពាក្យ & វេយ្យាករណ៍',
                    icon: <BookOpen className="w-9 h-9 text-sky-700" />,
                    bg: 'bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 border-sky-300 hover:border-sky-500 text-sky-950',
                    onClick: () => setIsEnglishGameOpen(true)
                  },
                  {
                    id: 'ai_battle',
                    title: 'ប្រកួតជាមួយគ្រូ AI',
                    subtitle: 'ប្រកួតល្បឿនឆ្លើយសំណួរ',
                    icon: <Swords className="w-9 h-9 text-purple-700" />,
                    bg: 'bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 border-purple-300 hover:border-purple-500 text-purple-950',
                    onClick: () => setIsAIBattleOpen(true)
                  },
                  {
                    id: 'fishing',
                    title: 'ហ្គេមស្ទូចត្រី',
                    subtitle: 'អ្នក vs AI សួរឆ្លើយ',
                    icon: <span className="text-4xl">🎣</span>,
                    bg: 'bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100 border-cyan-300 hover:border-cyan-500 text-cyan-950',
                    onClick: () => setIsFishingGameOpen(true)
                  },
                  {
                    id: 'drawing',
                    title: 'គំនូសសេរី',
                    subtitle: 'ក្ដារខៀនសិល្បៈឌីជីថល',
                    icon: <Palette className="w-9 h-9 text-amber-700" />,
                    bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border-amber-300 hover:border-amber-500 text-amber-950',
                    onClick: () => setIsDrawingOpen(true)
                  },
                  {
                    id: 'ai_tutor',
                    title: 'គ្រូ AI ឆ្លើយសំណួរ',
                    subtitle: 'ជំនួយការសិក្សាផ្ទាល់ខ្លួន',
                    icon: <Bot className="w-9 h-9 text-blue-700" />,
                    bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-blue-300 hover:border-blue-500 text-blue-950',
                    onClick: () => setIsStudentChatOpen(true)
                  },
                  {
                    id: 'missions',
                    title: 'បេសកកម្មប្រចាំថ្ងៃ',
                    subtitle: 'ប្រមូលពិន្ទុ និងរង្វាន់',
                    icon: <Trophy className="w-9 h-9 text-orange-700" />,
                    bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-orange-300 hover:border-orange-500 text-orange-950',
                    onClick: () => setIsMissionsOpen(true)
                  }
                ].map((game) => (
                  <div
                    key={game.id}
                    onClick={game.onClick}
                    className={`w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0 rounded-3xl ${game.bg} border-2 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-between p-4 text-center group transform hover:-translate-y-1`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                    <div className="space-y-0.5 w-full">
                      <h3 className="font-bold font-moul text-xs sm:text-sm truncate w-full">
                        {game.title}
                      </h3>
                      <p className="text-[10px] text-slate-600 truncate w-full">
                        {game.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Horizontal Swipeable Grade 6 Exam Prep Carousel ( ត្រៀមប្រឡងបញ្ចប់បឋមសិក្សា ថ្នាក់ទី៦ ) */}
            {activeMainTab === 'exam' && (
              <Grade6ExamCarousel
                onSelectExam={(exam) => handleSelectExamWithRegistration(exam)}
                onSelectSubject={(sId) => setSelectedSubjectId(sId)}
              />
            )}

            {/* Section Content Based on activeMainTab */}
            <div id="main-exams-section" className="scroll-mt-20">
              {activeMainTab === 'homework' ? (
                <div className="mt-4 animate-fade-in">
                  <HomeworkSection
                    onEarnCoins={(coins, xp) => {
                      handleEarnRewards(coins, xp);
                    }}
                  />
                </div>
              ) : (
                <>
                  {/* Distinct Section Banner */}
                  <div className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-2 shadow-xs ${
                    activeMainTab === 'lesson'
                      ? 'bg-gradient-to-r from-emerald-500/10 via-teal-100/50 to-emerald-500/10 border-emerald-300'
                      : activeMainTab === 'new_exam'
                      ? 'bg-gradient-to-r from-purple-500/10 via-indigo-100/50 to-purple-500/10 border-purple-300'
                      : 'bg-gradient-to-r from-amber-500/10 via-yellow-100/50 to-orange-500/10 border-amber-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs shrink-0 text-white ${
                        activeMainTab === 'lesson'
                          ? 'bg-gradient-to-br from-emerald-600 to-teal-700'
                          : activeMainTab === 'new_exam'
                          ? 'bg-gradient-to-br from-purple-600 to-indigo-700'
                          : 'bg-gradient-to-br from-amber-600 to-orange-700'
                      }`}>
                        {activeMainTab === 'lesson' ? '📚' : activeMainTab === 'new_exam' ? '✨' : '🎯'}
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold font-moul text-slate-900 tracking-wide flex items-center gap-2">
                          {activeMainTab === 'exam'
                            ? 'កន្លែងវិញ្ញាសាប្រឡង ថ្នាក់ទី៦'
                            : activeMainTab === 'new_exam'
                            ? 'កន្លែងតេស្តវិញ្ញាសាថ្មីៗ'
                            : 'កន្លែងមេរៀនសង្ខេប តាមមុខវិជ្ជា'}
                        </h2>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">
                          {activeMainTab === 'lesson'
                            ? 'ជ្រើសរើសមុខវិជ្ជាខាងក្រោមដើម្បីចូលមើលមេរៀនសង្ខេប រូបមន្ត និងចំណុចសំខាន់ៗ'
                            : activeMainTab === 'new_exam'
                            ? 'ជ្រើសរើសវិញ្ញាសាថ្មីៗខាងក្រោមដើម្បីប្រឡងតេស្តសមត្ថភាព និងប្រមូលពិន្ទុ'
                            : 'ជ្រើសរើសមុខវិជ្ជាខាងក្រោមដើម្បីចូលធ្វើវិញ្ញាសាប្រឡង និងតេស្តសមត្ថភាព'}
                        </p>
                      </div>
                    </div>
                    <span className={`self-end sm:self-center px-3.5 py-1 rounded-full text-xs font-bold border shrink-0 ${
                      activeMainTab === 'lesson'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : activeMainTab === 'new_exam'
                        ? 'bg-purple-100 text-purple-900 border-purple-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      {activeMainTab === 'new_exam' ? `${NEW_EXAM_PAPERS.length} វិញ្ញាសា` : `${filteredSubjects.length} មុខវិជ្ជា`}
                    </span>
                  </div>

                {/* Render NEW_EXAM_PAPERS list in a horizontal scrollable row when new_exam tab is selected */}
                {activeMainTab === 'new_exam' ? (
                  <div className="space-y-3 my-2">
                    {/* Horizontal scroll guidance & navigation controls */}
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-semibold text-amber-900/90 flex items-center gap-1.5 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
                        <span>👈👉 អូសទៅឆ្វេង ឬស្តាំ ដើម្បីជ្រើសរើសវិញ្ញាសា</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            if (newExamsScrollRef.current) {
                              newExamsScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
                            }
                          }}
                          className="p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shadow-2xs border border-amber-300 cursor-pointer active:scale-95"
                          title="ទៅឆ្វេង"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (newExamsScrollRef.current) {
                              newExamsScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                            }
                          }}
                          className="p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shadow-2xs border border-amber-300 cursor-pointer active:scale-95"
                          title="ទៅស្តាំ"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Horizontal Scrollable Row Container */}
                    <div
                      ref={newExamsScrollRef}
                      className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 px-1 no-scrollbar sm:scroll-smooth"
                    >
                      {NEW_EXAM_PAPERS.map((paper) => {
                        const subjectBadge = 
                          paper.subjectId === 'science' ? '🧪 វិទ្យាសាស្ត្រ' :
                          paper.subjectId === 'health' ? '🍎 អប់រំសុខភាព' :
                          paper.subjectId === 'khmer' ? '📚 ភាសាខ្មែរ' :
                          paper.subjectId === 'math' ? '📐 គណិតវិទ្យា' :
                          paper.subjectId === 'social' ? '🌏 សិក្សាសង្គម' : '📝 វិញ្ញាសា';

                        return (
                          <div
                            key={paper.id}
                            onClick={() => handleSelectExamWithRegistration(paper)}
                            className="w-[290px] sm:w-[350px] shrink-0 snap-start p-5 rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-sky-50/40 border-2 border-amber-300/80 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer group relative flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-3 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[11px] shadow-2xs flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  <span>{paper.yearOrType}</span>
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px] border border-sky-200">
                                  {subjectBadge}
                                </span>
                              </div>

                              <h3 className="font-moul text-sm sm:text-base text-slate-900 group-hover:text-amber-900 transition-colors leading-relaxed line-clamp-2">
                                {paper.title}
                              </h3>

                              <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                                {paper.description}
                              </p>
                            </div>

                            <div className="pt-4 mt-3 border-t border-amber-200/60 space-y-3">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-600 flex-wrap gap-2">
                                <span className="flex items-center gap-1 text-slate-700">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{paper.questions.length} សំណួរ</span>
                                </span>
                                <span className="flex items-center gap-1 text-slate-700">
                                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                                  <span>{paper.durationMinutes} នាទី</span>
                                </span>
                                <span className="flex items-center gap-1 text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
                                  <Award className="w-3.5 h-3.5 text-amber-700" />
                                  <span>{paper.totalPoints} ពិន្ទុ</span>
                                </span>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectExamWithRegistration(paper);
                                }}
                                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-amber-950 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02] active:scale-95"
                              >
                                <span>ប្រឡងវិញ្ញាសានេះឥឡូវនេះ</span>
                                <ChevronRight className="w-4 h-4 text-amber-200" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Subject List Cards Grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {filteredSubjects.map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        selectedMode={activeMainTab === 'homework' ? 'exam' : activeMainTab}
                        onClick={() => setSelectedSubjectId(subject.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            </div>
          </>
        )}
      </main>

      {/* Modals & Drawers */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectSubject={(sId) => setSelectedSubjectId(sId)}
        onSelectMainTab={(tab) => setActiveMainTab(tab)}
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
        onOpenVijjaNavaGame={() => setIsVijjaNavaGameOpen(true)}
        onOpenHomework={() => {
          setActiveMainTab('homework');
          setTimeout(() => {
            const el = document.getElementById('main-exams-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
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

      <HomeworkModal
        isOpen={isHomeworkOpen}
        onClose={() => setIsHomeworkOpen(false)}
        onEarnCoins={(coins, xp) => {
          handleEarnRewards(coins, xp);
        }}
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

      <VijjaNavaGameModal
        isOpen={isVijjaNavaGameOpen}
        onClose={() => setIsVijjaNavaGameOpen(false)}
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

      <AICreatorStudioModal
        isOpen={isAICreatorOpen}
        onClose={() => setIsAICreatorOpen(false)}
        onStartCustomQuiz={handleStartCustomQuiz}
      />

      {/* Floating Kahoot-style Bottom Navigation Bar */}
      <FacebookBottomNav
        isVisible={isBottomNavVisible}
        onHomeClick={handleGoHome}
        onOpenHomework={() => {
          setActiveMainTab('homework');
          setSelectedSubjectId(null);
          setSelectedExam(null);
          setTimeout(() => {
            const el = document.getElementById('main-exams-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }
          }, 100);
        }}
        onOpenStudentChat={() => setIsStudentChatOpen(true)}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenModernLibrary={() => setIsModernLibraryOpen(true)}
        onOpenDrawing={() => setIsDrawingOpen(true)}
        onOpenQRCode={() => setIsQRCodeOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenAICreator={() => setIsAICreatorOpen(true)}
        onJoinClick={() => {
          setActiveMainTab('new_exam');
          setSelectedSubjectId(null);
          setSelectedExam(null);
          setTimeout(() => {
            const el = document.getElementById('main-exams-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }
          }, 100);
        }}
        unreadNotificationsCount={unreadNotificationsCount}
      />
    </div>
  );
}
