import React, { useState, useEffect } from 'react';
import { Subject, ExamPaper, LessonSummary } from '../types';
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Sparkles,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  LayoutGrid,
  List,
  Star,
  Target
} from 'lucide-react';
import { LessonSummaryViewer } from './LessonSummaryViewer';
import { AIBattleView } from './AIBattleView';

interface SubjectDetailViewProps {
  subject: Subject;
  examPapers: ExamPaper[];
  lessons: LessonSummary[];
  initialTab?: 'exams' | 'lessons';
  initialLessonId?: string;
  onBack: () => void;
  onSelectExam: (exam: ExamPaper) => void;
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (qId: string) => void;
  onOpenEnglishGame?: () => void;
  onOpenFishingGame?: () => void;
  activeMainTab?: 'exam' | 'lesson' | 'new_exam' | 'homework' | 'games';
  isFluidWidth?: boolean;
  onToggleFluidWidth?: () => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  examPapers,
  lessons,
  initialTab = 'exams',
  initialLessonId,
  onBack,
  onSelectExam,
  onOpenEnglishGame,
  onOpenFishingGame,
  activeMainTab,
  isFluidWidth,
  onToggleFluidWidth
}) => {
  const [activeTab, setActiveTab] = useState<'exams' | 'lessons'>(
    activeMainTab === 'lesson' ? 'lessons' : (activeMainTab === 'exam' ? 'exams' : initialTab)
  );
  const [filterType, setFilterType] = useState<'all' | 'lesson' | 'comprehensive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [examScores, setExamScores] = useState<Record<string, { score: number; total: number; percentage: number }>>({});

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    // Disable horizontal swipe switching when activeMainTab is strictly lessons or exams to keep them isolated
    if (activeMainTab === 'lesson' || activeMainTab === 'exam') return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Ensure it's a horizontal swipe rather than a vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        // Swiped Left -> Move forward (exams -> lessons)
        if (activeTab === 'exams') setActiveTab('lessons');
      } else {
        // Swiped Right -> Move backward (lessons -> exams)
        if (activeTab === 'lessons') setActiveTab('exams');
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };
  useEffect(() => {
    if (activeMainTab === 'lesson') {
      setActiveTab('lessons');
    } else if (activeMainTab === 'exam') {
      setActiveTab('exams');
    } else if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, activeMainTab]);

  useEffect(() => {
    // Load exam scores from localStorage
    try {
      const saved = localStorage.getItem('grade6_exam_results');
      if (saved) {
        const parsed = JSON.parse(saved);
        const map: Record<string, { score: number; total: number; percentage: number }> = {};
        if (Array.isArray(parsed)) {
          parsed.forEach((res: any) => {
            if (res.examPaperId) {
              map[res.examPaperId] = {
                score: res.score,
                total: res.totalQuestions,
                percentage: Math.round((res.score / res.totalQuestions) * 100)
              };
            }
          });
        }
        setExamScores(map);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Filter exam papers
  const filteredExams = examPapers.filter((paper) => {
    const isLessonExam = paper.yearOrType.includes('មេរៀន') || paper.title.includes('មេរៀន');
    if (filterType === 'lesson' && !isLessonExam) return false;
    if (filterType === 'comprehensive' && isLessonExam) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        paper.title.toLowerCase().includes(term) ||
        paper.description.toLowerCase().includes(term) ||
        paper.yearOrType.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const lessonExamsCount = examPapers.filter((p) => p.yearOrType.includes('មេរៀន') || p.title.includes('មេរៀន')).length;
  const comprehensiveExamsCount = examPapers.length - lessonExamsCount;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1720px] w-full mx-auto py-3 px-2 sm:px-4 space-y-4 touch-pan-y"
    >
      {/* Swipe Left/Right Quick Tip Badge */}
      {activeMainTab !== 'lesson' && activeMainTab !== 'exam' && (
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 bg-slate-100/90 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
          <span className="flex items-center gap-1.5 text-emerald-800">
            <span>👈👉 អូសទៅឆ្វេង ឬស្តាំ ដើម្បីផ្លាស់ប្តូរផ្នែក (វិញ្ញាសា / មេរៀន / AI)</span>
          </span>
          <span className="text-slate-400 font-mono hidden sm:inline">Touch Swipe Enabled</span>
        </div>
      )}
      {/* Subject Title & Section Status Header Banner */}
      <div className={`p-4 rounded-3xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
        activeTab === 'lessons'
          ? 'bg-gradient-to-r from-emerald-500/10 via-teal-100/50 to-emerald-500/10 border-emerald-300'
          : activeTab === 'exams'
          ? 'bg-gradient-to-r from-amber-500/10 via-yellow-100/50 to-orange-500/10 border-amber-300'
          : 'bg-gradient-to-r from-purple-500/10 via-indigo-100/50 to-purple-500/10 border-purple-300'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200/90 shadow-2xs flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
            title="ត្រឡប់ទៅទំព័រដើម"
            id="btn-back-subject"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === 'lessons'
                  ? 'bg-emerald-600 text-white'
                  : activeTab === 'exams'
                  ? 'bg-amber-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}>
                {activeTab === 'lessons' ? '📚 ផ្នែកមេរៀនសង្ខេប' : activeTab === 'exams' ? '🎯 ផ្នែកវិញ្ញាសាប្រឡង' : '⚔️ ផ្នែកប្រកួត AI'}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {subject.nameKhmer}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold font-moul text-slate-900 mt-1">
              {activeTab === 'lessons'
                ? `កន្លែងមេរៀនសង្ខេប៖ ${subject.nameKhmer}`
                : activeTab === 'exams'
                ? `កន្លែងវិញ្ញាសាប្រឡង៖ ${subject.nameKhmer}`
                : `ប្រកួតឆ្លើយសំណួរ AI៖ ${subject.nameKhmer}`}
            </h1>
          </div>
        </div>

        {/* Quick Tab Indicator Badge */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs font-bold text-slate-600 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200">
            {activeTab === 'lessons' ? `${lessons.length} មេរៀន` : activeTab === 'exams' ? `${examPapers.length} វិញ្ញាសា` : 'ឆ្លើយសំណួរផ្ទាល់'}
          </span>
        </div>
      </div>

      {/* Main Tabs Segmented Navigation */}
      {activeMainTab !== 'lesson' && activeMainTab !== 'exam' && (
        <div className="flex items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl font-bold text-xs sm:text-sm shadow-inner">
          <button
            onClick={() => setActiveTab('exams')}
            className={`flex-1 py-3 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-moul ${
              activeTab === 'exams'
                ? 'bg-amber-600 text-white shadow-md scale-[1.01]'
                : 'text-slate-700 hover:bg-slate-300/60'
            }`}
            id="tab-subject-exams"
          >
            <GraduationCap className="w-4 h-4" />
            <span>កន្លែងវិញ្ញាសាប្រឡង ({examPapers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 py-3 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-moul ${
              activeTab === 'lessons'
                ? 'bg-emerald-600 text-white shadow-md scale-[1.01]'
                : 'text-slate-700 hover:bg-slate-300/60'
            }`}
            id="tab-subject-lessons"
          >
            <BookOpen className="w-4 h-4" />
            <span>កន្លែងមេរៀនសង្ខេប ({lessons.length})</span>
          </button>
        </div>
      )}

      {/* Tab Contents */}
      {activeTab === 'exams' && (
        <div className="space-y-5">
          {/* Controls Header: Category Filter, Search Bar & Grid/List Toggle */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold overflow-x-auto">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    filterType === 'all'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  ទាំងអស់ ({examPapers.length})
                </button>

                <button
                  onClick={() => setFilterType('lesson')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    filterType === 'lesson'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  តាមមេរៀន ({lessonExamsCount})
                </button>

                <button
                  onClick={() => setFilterType('comprehensive')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    filterType === 'comprehensive'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  វិញ្ញាសារួម/ឆមាស ({comprehensiveExamsCount})
                </button>
              </div>

              {/* View Switcher & Search */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ស្វែងរកវិញ្ញាសា..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                  />
                </div>

                <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-slate-500'
                    }`}
                    title="ទិដ្ឋភាពក្រឡា (Grid)"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'list' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-slate-500'
                    }`}
                    title="ទិដ្ឋភាពបញ្ជី (List)"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Cards Listing */}
          {filteredExams.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
              រកមិនឃើញវិញ្ញាសាដែលត្រូវនឹង «{searchTerm}» ឡើយ។
            </div>
          ) : viewMode === 'grid' ? (
            /* Modern Student-Friendly Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredExams.map((paper, index) => {
                const isLesson = paper.yearOrType.includes('មេរៀន') || paper.title.includes('មេរៀន');
                const prevScore = examScores[paper.id];

                return (
                  <div
                    key={paper.id}
                    onClick={() => onSelectExam(paper)}
                    className={`bg-white rounded-2xl border transition-all cursor-pointer group p-5 flex flex-col justify-between relative overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${
                      isLesson
                        ? 'border-slate-200/90 hover:border-emerald-400'
                        : 'border-amber-200/80 bg-gradient-to-br from-white via-amber-50/20 to-orange-50/30 hover:border-amber-400'
                    }`}
                    id={`exam-paper-item-${paper.id}`}
                  >
                    {/* Top Accent Line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1.5 ${
                        isLesson ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                      }`}
                    />

                    <div>
                      {/* Badge header */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 ${
                            isLesson
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}
                        >
                          {isLesson ? <BookOpen className="w-3 h-3" /> : <Trophy className="w-3 h-3 text-amber-700" />}
                          {paper.yearOrType}
                        </span>

                        {prevScore ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {prevScore.score}/{prevScore.total} ({prevScore.percentage}%)
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {paper.durationMinutes} នាទី
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                        {paper.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {paper.description}
                      </p>
                    </div>

                    {/* Footer Info & Action Button */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
                          {paper.questions.length} សំណួរ
                        </span>
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
                          {paper.totalPoints} ពិន្ទុ
                        </span>
                      </div>

                      <span
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-2xs group-hover:shadow-xs transition-all flex items-center gap-1 ${
                          isLesson
                            ? 'bg-emerald-600 text-white group-hover:bg-emerald-700'
                            : 'bg-amber-600 text-white group-hover:bg-amber-700'
                        }`}
                      >
                        {prevScore ? 'ប្រឡងឡើងវិញ' : 'ចាប់ផ្តើម'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Sleek List View */
            <div className="space-y-3">
              {filteredExams.map((paper) => {
                const isLesson = paper.yearOrType.includes('មេរៀន') || paper.title.includes('មេរៀន');
                const prevScore = examScores[paper.id];

                return (
                  <div
                    key={paper.id}
                    onClick={() => onSelectExam(paper)}
                    className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group flex items-center justify-between gap-4"
                    id={`exam-paper-item-${paper.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            isLesson ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {paper.yearOrType}
                        </span>

                        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {paper.durationMinutes} នាទី
                        </span>

                        {prevScore && (
                          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            ✓ ពិន្ទុ {prevScore.score}/{prevScore.total}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                        {paper.title}
                      </h3>

                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {paper.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      <div className="hidden sm:block text-right text-xs text-slate-500 font-medium">
                        <div>{paper.questions.length} សំណួរ</div>
                        <div>{paper.totalPoints} ពិន្ទុ</div>
                      </div>

                      <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs group-hover:bg-emerald-700 transition-colors flex items-center gap-1">
                        {prevScore ? 'ប្រឡងឡើងវិញ' : 'ចាប់ផ្តើម'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'lessons' && (
        <LessonSummaryViewer
          subject={subject}
          lessons={lessons}
          onBack={() => {
            if (activeMainTab === 'lesson') {
              onBack(); // Go back to subject selection directly instead of shifting tab to exams
            } else {
              setActiveTab('exams');
            }
          }}
          initialLessonId={initialLessonId}
          isFluidWidth={isFluidWidth}
          onToggleFluidWidth={onToggleFluidWidth}
        />
      )}
    </div>
  );
};

