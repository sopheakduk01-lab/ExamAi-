import React, { useState, useEffect } from 'react';
import { SubjectId, ExamPaper, ExamResult, UserProgress, Question, UserProfile } from './types';
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
import { MissionsModal } from './components/MissionsModal';
import { ModernLibraryModal } from './components/ModernLibraryModal';
import { UserRegistrationModal } from './components/UserRegistrationModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Search, GraduationCap, BookOpen, Sparkles, Filter, Trophy, ArrowRight, Target, Layers, Palette } from 'lucide-react';

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
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);
  const [isModernLibraryOpen, setIsModernLibraryOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isInitialRegistration, setIsInitialRegistration] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // User Profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('grade6_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Automatically show registration on first app load if userProfile is not found
  useEffect(() => {
    if (!userProfile) {
      setIsInitialRegistration(true);
      setIsRegistrationOpen(true);
    }
  }, []);

  // Save user profile state
  useEffect(() => {
    try {
      if (userProfile) {
        localStorage.setItem('grade6_user_profile', JSON.stringify(userProfile));
      }
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  // User persistence state
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('grade6_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('grade6_progress');
      return saved ? JSON.parse(saved) : { completedExams: [], bookmarkedQuestionIds: [], notes: {} };
    } catch {
      return { completedExams: [], bookmarkedQuestionIds: [], notes: {} };
    }
  });

  // Save state changes
  useEffect(() => {
    try {
      localStorage.setItem('grade6_bookmarks', JSON.stringify(bookmarkedQuestionIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedQuestionIds]);

  useEffect(() => {
    try {
      localStorage.setItem('grade6_progress', JSON.stringify(userProgress));
    } catch (e) {
      console.error(e);
    }
  }, [userProgress]);

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
        onHomeClick={() => {
          setSelectedSubjectId(null);
          setSelectedExam(null);
        }}
        userProfile={userProfile}
        onOpenRegistrationModal={() => {
          setIsInitialRegistration(false);
          setIsRegistrationOpen(true);
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
              userProfile={userProfile}
              onOpenRegistrationModal={() => {
                setIsInitialRegistration(false);
                setIsRegistrationOpen(true);
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
                  <h4 className="font-moul text-xs text-amber-950 font-bold group-hover:text-amber-800 transition-colors">ប័ណ្ណាល័យ</h4>
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

                <button
                  onClick={() => setIsDrawingOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-200 transition-colors cursor-pointer shadow-2xs"
                  id="btn-drawing-main"
                >
                  <Palette className="w-4 h-4 text-amber-800" />
                  <span>🎨 គំនូសសេរី</span>
                </button>
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
        onHomeClick={() => {
          setSelectedSubjectId(null);
          setSelectedExam(null);
        }}
        userProfile={userProfile}
        onOpenRegistrationModal={() => {
          setIsInitialRegistration(false);
          setIsRegistrationOpen(true);
        }}
      />

      <UserRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        userProfile={userProfile}
        onSaveProfile={(profile) => setUserProfile(profile)}
        isInitialRegistration={isInitialRegistration}
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
    </div>
  );
}
