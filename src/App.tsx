import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { StudentExamRegistrationModal } from './components/StudentExamRegistrationModal';
import { OwnerTrackingModal } from './components/OwnerTrackingModal';
import { MobileLauncherHome } from './components/MobileLauncherHome';
import { Grade6ExamCarousel } from './components/Grade6ExamCarousel';
import { EdgeBottomSheetDrawer } from './components/EdgeBottomSheetDrawer';
import { FacebookBottomNav } from './components/FacebookBottomNav';
import { AICreatorStudioModal } from './components/AICreatorStudioModal';
import { HomeworkModal } from './components/HomeworkModal';
import { HomeworkSection } from './components/HomeworkSection';
import {
  FontPreferencesModal,
  getSavedFontSettings,
  applyFontSettingsToDOM,
  FontSettings
} from './components/FontPreferencesModal';
import {
  migrateLegacyDataIfNeeded,
  syncStudentState,
  getCurrentStudentAccount,
  getOrCreateDefaultStudentAccount,
  updateStudentAccount
} from './utils/studentAccounts';
import { Search, GraduationCap, BookOpen, Sparkles, Filter, Trophy, ArrowRight, Target, Layers, Palette, Swords, Music, Globe, Clock, CheckCircle2, ChevronRight, Award, ChevronLeft, Bot, Gamepad2, Type } from 'lucide-react';

export default function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'exam' | 'lesson' | 'new_exam' | 'homework' | 'games'>('exam');
  const [useMobileLauncher, setUseMobileLauncher] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryInput, setSearchQueryInput] = useState('');
  const [selectedFilterSubject, setSelectedFilterSubject] = useState<string>('all');
  const [selectedFilterType, setSelectedFilterType] = useState<string>('all');
  const newExamsScrollRef = useRef<HTMLDivElement>(null);

  // Font preferences & typography customizer state
  const [fontSettings, setFontSettings] = useState<FontSettings>(getSavedFontSettings);
  const [isFontPreferencesOpen, setIsFontPreferencesOpen] = useState(false);

  useEffect(() => {
    applyFontSettingsToDOM(fontSettings);
  }, [fontSettings]);

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
  const [isStudentChatOpen, setIsStudentChatOpen] = useState(false);
  const [isInitialSetup, setIsInitialSetup] = useState(false);

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

  // Main Games Tab horizontal scroll & drag handlers
  const mainGamesTabScrollRef = useRef<HTMLDivElement>(null);
  const [isMainGamesMouseDown, setIsMainGamesMouseDown] = useState(false);
  const [mainGamesStartX, setMainGamesStartX] = useState(0);
  const [mainGamesScrollLeft, setMainGamesScrollLeft] = useState(0);

  const handleMainGamesMouseDown = (e: React.MouseEvent) => {
    if (!mainGamesTabScrollRef.current) return;
    setIsMainGamesMouseDown(true);
    setMainGamesStartX(e.pageX - mainGamesTabScrollRef.current.offsetLeft);
    setMainGamesScrollLeft(mainGamesTabScrollRef.current.scrollLeft);
  };

  const handleMainGamesMouseLeave = () => {
    setIsMainGamesMouseDown(false);
  };

  const handleMainGamesMouseUp = () => {
    setIsMainGamesMouseDown(false);
  };

  const handleMainGamesMouseMove = (e: React.MouseEvent) => {
    if (!isMainGamesMouseDown || !mainGamesTabScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - mainGamesTabScrollRef.current.offsetLeft;
    const walk = (x - mainGamesStartX) * 1.5;
    mainGamesTabScrollRef.current.scrollLeft = mainGamesScrollLeft - walk;
  };

  const scrollMainGamesTab = (direction: 'left' | 'right') => {
    if (mainGamesTabScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mainGamesTabScrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      
      if (direction === 'right') {
        if (scrollLeft >= maxScrollLeft - 30) {
          mainGamesTabScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          mainGamesTabScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 30) {
          mainGamesTabScrollRef.current.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
          mainGamesTabScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
      }
    }
  };

  // Subject filter horizontal scroll & drag handlers
  const subjectFilterScrollRef = useRef<HTMLDivElement>(null);
  const [isSubjMouseDown, setIsSubjMouseDown] = useState(false);
  const [subjStartX, setSubjStartX] = useState(0);
  const [subjScrollLeft, setSubjScrollLeft] = useState(0);

  const handleSubjMouseDown = (e: React.MouseEvent) => {
    if (!subjectFilterScrollRef.current) return;
    setIsSubjMouseDown(true);
    setSubjStartX(e.pageX - subjectFilterScrollRef.current.offsetLeft);
    setSubjScrollLeft(subjectFilterScrollRef.current.scrollLeft);
  };

  const handleSubjMouseLeave = () => {
    setIsSubjMouseDown(false);
  };

  const handleSubjMouseUp = () => {
    setIsSubjMouseDown(false);
  };

  const handleSubjMouseMove = (e: React.MouseEvent) => {
    if (!isSubjMouseDown || !subjectFilterScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - subjectFilterScrollRef.current.offsetLeft;
    const walk = (x - subjStartX) * 1.5;
    subjectFilterScrollRef.current.scrollLeft = subjScrollLeft - walk;
  };

  const handleGoHome = () => {
    setSelectedSubjectId(null);
    setSelectedLessonId(null);
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
    setIsAboutOpen(false);
    setIsAddToHomeScreenOpen(false);
    setIsOwnerTrackingOpen(false);
    setIsStudentRegistrationOpen(false);
    setIsAICreatorOpen(false);
    setPendingExamToStart(null);
    setSearchQueryInput('');
    setSelectedFilterSubject('all');
    setSelectedFilterType('all');
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

  // Compile all searchable documents (exams, lessons, new exams)
  const searchableDocuments = useMemo(() => {
    const docs: Array<{
      id: string;
      title: string;
      description: string;
      subjectId: SubjectId;
      type: 'exam' | 'lesson' | 'new_exam';
      meta: {
        questionsCount?: number;
        durationMinutes?: number;
        totalPoints?: number;
        chapter?: string;
      };
      rawItem: any;
    }> = [];

    // Add Exam Papers
    EXAM_PAPERS.forEach((paper) => {
      docs.push({
        id: paper.id,
        title: paper.title,
        description: paper.description,
        subjectId: paper.subjectId,
        type: 'exam',
        meta: {
          questionsCount: paper.questions.length,
          durationMinutes: paper.durationMinutes,
          totalPoints: paper.totalPoints
        },
        rawItem: paper
      });
    });

    // Add New Exam Papers
    NEW_EXAM_PAPERS.forEach((paper) => {
      docs.push({
        id: paper.id,
        title: paper.title,
        description: paper.description,
        subjectId: paper.subjectId,
        type: 'new_exam',
        meta: {
          questionsCount: paper.questions.length,
          durationMinutes: paper.durationMinutes,
          totalPoints: paper.totalPoints
        },
        rawItem: paper
      });
    });

    // Add Lesson Summaries
    LESSON_SUMMARIES.forEach((lesson) => {
      docs.push({
        id: lesson.id,
        title: lesson.title,
        description: `មេរៀនសង្ខេបជំពូក៖ ${lesson.chapter || ''}។ រួមមានគន្លឹះចងចាំសំខាន់ៗ និងលំហាត់អនុវត្តផ្ទាល់ខ្លួន។`,
        subjectId: lesson.subjectId,
        type: 'lesson',
        meta: {
          chapter: lesson.chapter
        },
        rawItem: lesson
      });
    });

    return docs;
  }, []);

  // Filter searchable documents based on user input & selections
  const filteredDocuments = useMemo(() => {
    return searchableDocuments.filter((doc) => {
      // 1. Subject filter
      if (selectedFilterSubject !== 'all' && doc.subjectId !== selectedFilterSubject) {
        return false;
      }
      // 2. Type filter
      if (selectedFilterType !== 'all' && doc.type !== selectedFilterType) {
        return false;
      }
      // 3. Search query
      if (searchQueryInput.trim() !== '') {
        const query = searchQueryInput.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(query);
        const matchesDesc = doc.description.toLowerCase().includes(query);
        const subject = SUBJECTS.find((s) => s.id === doc.subjectId);
        const matchesSubject = subject ? subject.nameKhmer.toLowerCase().includes(query) : false;
        
        return matchesTitle || matchesDesc || matchesSubject;
      }
      return true;
    });
  }, [searchableDocuments, selectedFilterSubject, selectedFilterType, searchQueryInput]);

  // Synchronize activeMainTab with selectedFilterType to maintain consistent search focus
  useEffect(() => {
    if (activeMainTab === 'exam') {
      setSelectedFilterType('exam');
    } else if (activeMainTab === 'lesson') {
      setSelectedFilterType('lesson');
    } else if (activeMainTab === 'new_exam') {
      setSelectedFilterType('new_exam');
    } else {
      setSelectedFilterType('all');
    }
  }, [activeMainTab]);

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
    <div className="min-h-screen max-w-full overflow-x-hidden bg-app-dynamic flex flex-col">
      {/* Navigation Header */}
      <Header
        isVisible={isHeaderVisible}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsGlobalSearchOpen(true)}
        onOpenFontPreferences={() => setIsFontPreferencesOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        onHomeClick={handleGoHome}
        bookmarkedCount={bookmarkedQuestionIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 pt-20 sm:pt-24 lg:pt-26 pb-24 space-y-6">
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
            initialTab={selectedLessonId ? 'lessons' : (activeMainTab === 'lesson' ? 'lessons' : 'exams')}
            initialLessonId={selectedLessonId || undefined}
            activeMainTab={activeMainTab}
            onBack={() => {
              setSelectedSubjectId(null);
              setSelectedLessonId(null);
            }}
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
            {activeMainTab === 'exam' && (
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
                activeMainTab={activeMainTab}
                onSelectMainTab={(tab) => {
                  setActiveMainTab(tab);
                  setSelectedSubjectId(null);
                  setSelectedExam(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}





            {/* Horizontal Swipeable Square Game Cards Section ( ផ្ទាំងការេ នៃ game នីមួយៗអាចអូសទៅឆ្វេងស្តាំបាន ) */}
            {activeMainTab === 'exam' && (
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
            )}


            {/* Horizontal Swipeable Grade 6 Exam Prep Carousel ( ត្រៀមប្រឡងបញ្ចប់បឋមសិក្សា ថ្នាក់ទី៦ ) */}
            {activeMainTab === 'exam' && (
              <Grade6ExamCarousel
                onSelectExam={(exam) => handleSelectExamWithRegistration(exam)}
                onSelectSubject={(sId) => setSelectedSubjectId(sId)}
              />
            )}

            {/* ផ្ទាំងរុករក និងស្វែងរកឯកសារ (Document Finder Dashboard) */}
            {activeMainTab !== 'homework' && activeMainTab !== 'games' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
                <div className="space-y-1">
                  <h3 className="font-moul text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2.5 h-5 bg-amber-500 rounded-full"></span>
                    ស្វែងរកឯកសារ និងវិញ្ញាសាភ្លាមៗ (Instant Finder)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">ស្វែងរក ឬចុចជ្រើសរើសមុខវិជ្ជា និងប្រភេទឯកសារ ដើម្បីចូលមើល ឬធ្វើតេស្តភ្លាមៗ</p>
                </div>

                {/* 1. Search Bar Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQueryInput}
                    onChange={(e) => setSearchQueryInput(e.target.value)}
                    placeholder="🔍 វាយបញ្ចូលឈ្មោះវិញ្ញាសា មេរៀន ឬពាក្យគន្លឹះដើម្បីស្វែងរក..."
                    className="w-full pl-11 pr-10 py-3.5 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl border-2 border-slate-200 dark:border-slate-700/80 focus:border-amber-500 dark:focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all text-xs sm:text-sm font-medium shadow-2xs"
                  />
                  {searchQueryInput && (
                    <button
                      onClick={() => setSearchQueryInput('')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer active:scale-95"
                      title="សម្អាតការស្វែងរក"
                    >
                      <span className="text-sm font-bold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center">×</span>
                    </button>
                  )}
                </div>

                {/* 2. Horizontal Scrollable Subject Filter Tags */}
                <div className="space-y-2 select-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      តម្រងតាមមុខវិជ្ជា (Filter by Subject)
                    </span>
                    <span className="text-[10px] text-amber-600/80 dark:text-amber-400/80 font-bold animate-pulse">
                      👈 អូសឆ្វេងស្តាំ 👉
                    </span>
                  </div>
                  <div 
                    ref={subjectFilterScrollRef}
                    onMouseDown={handleSubjMouseDown}
                    onMouseLeave={handleSubjMouseLeave}
                    onMouseUp={handleSubjMouseUp}
                    onMouseMove={handleSubjMouseMove}
                    className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
                  >
                    {/* "All" subject button */}
                    <button
                      onClick={() => setSelectedFilterSubject('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                        selectedFilterSubject === 'all'
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-200/50'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-slate-700'
                      }`}
                    >
                      ✨ គ្រប់មុខវិជ្ជា
                    </button>
                    {/* Individual subjects */}
                    {SUBJECTS.map((subject) => {
                      const isActive = selectedFilterSubject === subject.id;
                      return (
                        <button
                          key={subject.id}
                          onClick={() => setSelectedFilterSubject(subject.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border flex items-center gap-1.5 ${
                            isActive
                              ? `${subject.colorBadgeBg} ${subject.colorBadgeText} border-transparent scale-[1.03] shadow-md`
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-slate-700'
                          }`}
                        >
                          <span>{subject.symbol === 'ខ្មែរ' ? '📚' : subject.symbol === 'គ' ? '📐' : subject.symbol === 'វិ' ? '🧪' : subject.symbol === 'ស' ? '🌏' : subject.symbol === 'សុខ' ? '🍎' : '🇬🇧'}</span>
                          <span>{subject.nameKhmer.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Segmented Type Tabs */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    តម្រងតាមប្រភេទឯកសារ (Filter by Document Type)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
                    {[
                      { id: 'all', label: 'បង្ហាញទាំងអស់', icon: '📁' },
                      { id: 'exam', label: 'វិញ្ញាសាប្រឡង', icon: '📝' },
                      { id: 'lesson', label: 'មេរៀនសង្ខេប', icon: '📚' },
                      { id: 'new_exam', label: 'វិញ្ញាសាថ្មីៗ', icon: '✨' },
                    ].map((type) => {
                      const isActive = selectedFilterType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => {
                            setSelectedFilterType(type.id);
                            // Sync with active tab state if clicked directly
                            if (type.id !== 'all') {
                              setActiveMainTab(type.id as any);
                            } else {
                              setActiveMainTab('exam');
                            }
                          }}
                          className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 sm:gap-1.5 ${
                            isActive
                              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-400 shadow-xs scale-[1.01]'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{type.icon}</span>
                          <span className="truncate">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* បញ្ជីលទ្ធផលស្វែងរក និងរុករកឯកសារ (Filtered Search Results) */}
            <div id="main-exams-section" className="scroll-mt-20 space-y-4">
              {activeMainTab === 'homework' ? (
                <div className="mt-4 animate-fade-in">
                  <HomeworkSection
                    onEarnCoins={(coins, xp) => {
                      handleEarnRewards(coins, xp);
                    }}
                  />
                </div>
              ) : activeMainTab === 'games' ? (
                <div className="space-y-6 my-2 animate-fade-in">
                  {/* Games Header */}
                  <div className="bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 rounded-3xl p-6 text-white shadow-lg space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-15 pointer-events-none">
                      <Gamepad2 className="w-48 h-48" />
                    </div>
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold font-moul tracking-wide backdrop-blur-md inline-block">
                      🎮 ពិភពហ្គេមអប់រំ និងកម្សាន្ត
                    </span>
                    <h2 className="font-moul text-xl sm:text-2xl leading-relaxed">
                      លេងបណ្ដើរ រៀនបណ្ដើរ
                    </h2>
                    <p className="text-xs sm:text-sm text-white/95 max-w-xl leading-relaxed font-medium">
                      សាកល្បងសមត្ថភាពរបស់អ្នកជាមួយហ្គេមឆ្លើយសំណួរ គណនាល្បឿនលឿន និងការសន្ទនាជាមួយបញ្ញាសិប្បនិម្មិត AI ដើម្បីទទួលបានកាក់មាស និងបទពិសោធន៍!
                    </p>
                  </div>

                  {/* Games Horizontal Slider Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-moul text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span className="w-2.5 h-5 bg-purple-600 rounded-full"></span>
                        ជ្រើសរើសហ្គេមដើម្បីលេង (អូសស្តាំ-ឆ្វេង)
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => scrollMainGamesTab('left')}
                          className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
                          title="រំកិលទៅឆ្វេង"
                          id="btn-scroll-maingames-left"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => scrollMainGamesTab('right')}
                          className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
                          title="រំកិលទៅស្តាំ"
                          id="btn-scroll-maingames-right"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={mainGamesTabScrollRef}
                      onMouseDown={handleMainGamesMouseDown}
                      onMouseLeave={handleMainGamesMouseLeave}
                      onMouseUp={handleMainGamesMouseUp}
                      onMouseMove={handleMainGamesMouseMove}
                      className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {[
                        {
                          id: 'vijja_nava',
                          title: 'វិជ្ជានាវា៖ ល្បងប្រាជ្ញា',
                          description: 'ហ្គេមអប់រំសួរឆ្លើយវិញ្ញាសាថ្នាក់ទី៦ ដ៏ជក់ចិត្ត និងទទួលបានរង្វាន់ជាច្រើន។',
                          icon: <span className="text-4xl">👑</span>,
                          badge: '🔥 ពេញនិយម',
                          bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100/60 border-amber-300 hover:border-amber-500 text-amber-950',
                          onClick: () => setIsVijjaNavaGameOpen(true)
                        },
                        {
                          id: 'english',
                          title: 'ហ្គេមអង់គ្លេស',
                          description: 'រៀនពាក្យអង់គ្លេស និងបង្កើតប្រយោគដោយការផ្គុំពាក្យឱ្យបានត្រឹមត្រូវ។',
                          icon: <BookOpen className="w-8 h-8 text-sky-700" />,
                          badge: '🇬🇧 English',
                          bg: 'bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100/60 border-sky-300 hover:border-sky-500 text-sky-950',
                          onClick: () => setIsEnglishGameOpen(true)
                        },
                        {
                          id: 'ai_battle',
                          title: 'ប្រកួតជាមួយគ្រូ AI',
                          description: 'ប្រកួតល្បឿនឆ្លើយសំណួរជាមួយគ្រូបញ្ញាសិប្បនិម្មិត AI តើអ្នកណាឆ្លើយលឿនជាង?',
                          icon: <Swords className="w-8 h-8 text-purple-700" />,
                          badge: '🤖 AI Battle',
                          bg: 'bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100/60 border-purple-300 hover:border-purple-500 text-purple-950',
                          onClick: () => setIsAIBattleOpen(true)
                        },
                        {
                          id: 'fishing',
                          title: 'ហ្គេមស្ទូចត្រី',
                          description: 'ល្បែងស្ទូចត្រីឆ្លើយសំណួរជាមួយ AI សប្បាយរីករាយ និងទទួលបានចំណេះដឹងទូទៅ។',
                          icon: <span className="text-4xl">🎣</span>,
                          badge: '🌊 សប្បាយៗ',
                          bg: 'bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100/60 border-cyan-300 hover:border-cyan-500 text-cyan-950',
                          onClick: () => setIsFishingGameOpen(true)
                        },
                        {
                          id: 'drawing',
                          title: 'គំនូសសេរី',
                          description: 'ក្ដារខៀនសិល្បៈឌីជីថល គូររូបដោយសេរី និងអាចរក្សាទុកគំនូរស្អាតៗរបស់អ្នកបាន។',
                          icon: <Palette className="w-8 h-8 text-amber-700" />,
                          badge: '🎨 សិល្បៈ',
                          bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100/60 border-amber-300 hover:border-amber-500 text-amber-950',
                          onClick: () => setIsDrawingOpen(true)
                        },
                        {
                          id: 'ai_tutor',
                          title: 'គ្រូ AI ឆ្លើយសំណួរ',
                          description: 'ជំនួយការសិក្សាផ្ទាល់ខ្លួន និងការពិភាក្សាឆ្លើយសំណួរមេរៀនគ្រប់មុខវិជ្ជា។',
                          icon: <Bot className="w-8 h-8 text-blue-700" />,
                          badge: '💬 AI Tutor',
                          bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100/60 border-blue-300 hover:border-blue-500 text-blue-950',
                          onClick: () => setIsStudentChatOpen(true)
                        },
                        {
                          id: 'missions',
                          title: 'បេសកកម្មប្រចាំថ្ងៃ',
                          description: 'បំពេញបេសកកម្មប្រចាំថ្ងៃដើម្បីប្រមូលពិន្ទុ បទពិសោធន៍ និងកាក់មាសបន្ថែម។',
                          icon: <Trophy className="w-8 h-8 text-orange-700" />,
                          badge: '🏆 កិច្ចការ',
                          bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/60 border-orange-300 hover:border-orange-500 text-orange-950',
                          onClick: () => setIsMissionsOpen(true)
                        }
                      ].map((game) => (
                        <div
                          key={game.id}
                          onClick={game.onClick}
                          className="w-72 sm:w-80 shrink-0 snap-start p-5 rounded-3xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[175px] group transform hover:-translate-y-1 relative overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        >
                          <div className="space-y-3 text-left">
                            <div className="flex items-center justify-between">
                              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                                {game.icon}
                              </div>
                              <span className="text-[10px] font-extrabold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full shadow-3xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                {game.badge}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-bold font-moul text-xs sm:text-sm text-slate-900 dark:text-white leading-normal">
                                {game.title}
                              </h3>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {game.description}
                              </p>
                            </div>
                          </div>
                          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              លេងឥឡូវនេះ <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* If search query or filters are active, show search results list */}
                  {(searchQueryInput.trim() !== '' || selectedFilterSubject !== 'all' || selectedFilterType !== 'all') ? (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                          រកឃើញឯកសារសរុប៖ <span className="font-bold text-amber-600 dark:text-amber-400">{filteredDocuments.length}</span>
                        </span>
                        {(searchQueryInput || selectedFilterSubject !== 'all' || selectedFilterType !== 'all') && (
                          <button
                            onClick={() => {
                              setSearchQueryInput('');
                              setSelectedFilterSubject('all');
                              setSelectedFilterType('all');
                              setActiveMainTab('exam');
                            }}
                            className="text-xs font-bold text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200 dark:border-amber-900/50"
                          >
                            🔄 សម្អាតតម្រងទាំងអស់
                          </button>
                        )}
                      </div>

                      {filteredDocuments.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3.5">
                          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/60 rounded-full flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-900">
                            <Search className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className="space-y-1 max-w-sm mx-auto">
                            <h4 className="font-bold font-moul text-sm sm:text-base text-slate-800 dark:text-slate-200">
                              រកមិនឃើញឯកសារដែលត្រូវគ្នាទេ
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                              សូមព្យាយាមផ្លាស់ប្តូរពាក្យគន្លឹះ ឬជ្រើសរើសមុខវិជ្ជា និងប្រភេទឯកសារផ្សេងទៀតដើម្បីស្វែងរក។
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSearchQueryInput('');
                              setSelectedFilterSubject('all');
                              setSelectedFilterType('all');
                            }}
                            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            បង្ហាញឯកសារទាំងអស់ឡើងវិញ
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                          {filteredDocuments.map((doc) => {
                            const subject = SUBJECTS.find(s => s.id === doc.subjectId);
                            const subjectName = subject ? subject.nameKhmer.split(' ')[0] : 'ទូទៅ';
                            const isLesson = doc.type === 'lesson';
                            const isNewExam = doc.type === 'new_exam';

                            return (
                              <div
                                key={`${doc.type}-${doc.id}`}
                                onClick={() => {
                                  if (isLesson) {
                                    setSelectedSubjectId(doc.subjectId);
                                    setSelectedLessonId(doc.id);
                                  } else {
                                    handleSelectExamWithRegistration(doc.rawItem);
                                  }
                                }}
                                className="bg-white dark:bg-slate-900 hover:bg-amber-50/20 dark:hover:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600/80 transition-all cursor-pointer group flex flex-col justify-between gap-4 relative"
                              >
                                <div className="space-y-2">
                                  {/* Document badges */}
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shadow-3xs flex items-center gap-1 ${
                                      isLesson
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                                        : isNewExam
                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-900'
                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                                    }`}>
                                      <span>{isLesson ? '📚 មេរៀនសង្ខេប' : isNewExam ? '✨ វិញ្ញាសាថ្មី' : '📝 វិញ្ញាសាប្រឡង'}</span>
                                    </span>
                                    {subject && (
                                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${subject.colorBadgeBg} ${subject.colorBadgeText}`}>
                                        {subjectName}
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                                    {doc.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                    {doc.description}
                                  </p>
                                </div>

                                {/* Metadata & Actions */}
                                <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                                  {isLesson ? (
                                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                      <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                                      <span>ជំពូក៖ {doc.meta.chapter || 'មេរៀនគ្រឹះ'}</span>
                                    </span>
                                  ) : (
                                    <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                      <span className="flex items-center gap-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        <span>{doc.meta.questionsCount} សំណួរ</span>
                                      </span>
                                      <span className="flex items-center gap-0.5">
                                        <Clock className="w-3.5 h-3.5 text-sky-500" />
                                        <span>{doc.meta.durationMinutes} នាទី</span>
                                      </span>
                                    </div>
                                  )}

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (isLesson) {
                                        setSelectedSubjectId(doc.subjectId);
                                        setSelectedLessonId(doc.id);
                                      } else {
                                        handleSelectExamWithRegistration(doc.rawItem);
                                      }
                                    }}
                                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                                      isLesson
                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                                    }`}
                                  >
                                    <span>{isLesson ? '📖 មើលមេរៀន' : '✍️ ធ្វើតេស្ត'}</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Default view when no search/filters are active */
                    <>
                      {activeMainTab === 'new_exam' ? (
                        <div className="space-y-3 my-2">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3.5 sm:gap-4">
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
        onOpenFontPreferences={() => setIsFontPreferencesOpen(true)}
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
        onOpenOwnerTracking={() => setIsOwnerTrackingOpen(true)}
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
          setSelectedLessonId(lesson.id);
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

      <FontPreferencesModal
        isOpen={isFontPreferencesOpen}
        onClose={() => setIsFontPreferencesOpen(false)}
        currentSettings={fontSettings}
        onUpdateSettings={(newSettings) => setFontSettings(newSettings)}
      />

      {/* Floating Kahoot-style Bottom Navigation Bar */}
      <FacebookBottomNav
        isVisible={isBottomNavVisible && !isEnglishGameOpen && !isFishingGameOpen && !isVijjaNavaGameOpen}
        onHomeClick={handleGoHome}
        onOpenHomework={() => {
          setActiveMainTab('homework');
          setSelectedSubjectId(null);
          setSelectedExam(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLessons={() => {
          setActiveMainTab('lesson');
          setSelectedSubjectId(null);
          setSelectedExam(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGames={() => {
          setActiveMainTab('games');
          setSelectedSubjectId(null);
          setSelectedExam(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadNotificationsCount={unreadNotificationsCount}
      />
    </div>
  );
}
