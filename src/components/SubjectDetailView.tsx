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
  onBack: () => void;
  onSelectExam: (exam: ExamPaper) => void;
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (qId: string) => void;
  onOpenEnglishGame?: () => void;
  onOpenFishingGame?: () => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  examPapers,
  lessons,
  onBack,
  onSelectExam,
  onOpenEnglishGame,
  onOpenFishingGame
}) => {
  const [activeTab, setActiveTab] = useState<'exams' | 'lessons' | 'ai'>('exams');
  const [filterType, setFilterType] = useState<'all' | 'lesson' | 'comprehensive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [examScores, setExamScores] = useState<Record<string, { score: number; total: number; percentage: number }>>({});

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
    <div className="max-w-5xl mx-auto py-4 px-4">
      {/* Top Banner for Subject */}
      <div className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border border-slate-200/90 shadow-sm mb-6 ${subject.colorBorder} border-l-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-40 h-40 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <button
              onClick={onBack}
              className="text-xs sm:text-sm font-bold text-slate-500 hover:text-emerald-800 transition-colors mb-2 cursor-pointer flex items-center gap-1 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-xl border border-slate-200/80 shadow-2xs"
              id="btn-back-subject"
            >
              <ArrowLeft className="w-4 h-4" />
              ត្រឡប់ទៅទំព័រដើម
            </button>

            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                កម្មវិធីសិក្សាផ្លូវការ ថ្នាក់ទី៦
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-bold font-moul text-slate-900 mt-2">
              {subject.nameKhmer}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
              {subject.description}
            </p>
          </div>

          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${subject.colorBgLight} ${subject.colorText} font-bold text-2xl sm:text-3xl flex items-center justify-center shrink-0 border border-slate-200/90 shadow-md transform rotate-1 hover:rotate-0 transition-transform`}>
            {subject.symbol}
          </div>
        </div>

        {/* Quick Stats Pill Line */}
        <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-4 border-t border-slate-200/60 text-xs font-bold text-slate-700">
          <span className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            {examPapers.length} វិញ្ញាសាប្រឡង
          </span>
          <span className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            {lessons.length} មេរៀនសង្ខេប
          </span>
          <span className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-rose-600" />
            {subject.questionCount} សំណួរ QCM
          </span>
        </div>
      </div>



      {/* Special Banner for English Subject interactive Game */}
      {subject.id === 'english' && onOpenEnglishGame && (
        <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-sky-500 via-indigo-600 to-sky-600 text-white shadow-md border-2 border-sky-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 border border-white/30">
              📖
            </div>
            <div>
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                Interactive Learning Game
              </span>
              <h3 className="font-extrabold text-base sm:text-xl text-white font-moul leading-tight">
                រៀនភាសាអង់គ្លេស ថ្នាក់ទី៦ (គ្រប់ ១៥ មេរៀន)
              </h3>
              <p className="text-xs text-sky-100 font-medium mt-0.5">
                ប័ណ្ណពាក្យ (Flashcards) • រៀបប្រយោគ (Builder) • ធៀបលំហ (Preposition Cat Room) • តេស្ត (Quiz)
              </p>
            </div>
          </div>

          <button
            onClick={onOpenEnglishGame}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
            id="btn-launch-english-game-detail"
          >
            <span>ចាប់ផ្តើមលេងហ្គេម (Play Game)</span>
            <ChevronRight className="w-4 h-4 text-amber-950" />
          </button>
        </div>
      )}

      {/* Main Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl mb-6 font-semibold text-xs sm:text-sm shadow-inner">
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'exams'
              ? 'bg-white text-emerald-950 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          id="tab-subject-exams"
        >
          <GraduationCap className="w-4.5 h-4.5 text-emerald-700" />
          <span>វិញ្ញាសាប្រឡង ({examPapers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'lessons'
              ? 'bg-white text-emerald-950 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          id="tab-subject-lessons"
        >
          <BookOpen className="w-4.5 h-4.5 text-emerald-700" />
          <span>មេរៀនសង្ខេប ({lessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'ai'
              ? 'bg-white text-amber-950 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          id="tab-subject-ai"
        >
          <Sparkles className="w-4.5 h-4.5 text-amber-600 animate-pulse" />
          <span>ប្រកួតជាមួយ AI</span>
        </button>
      </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          onBack={() => setActiveTab('exams')}
        />
      )}

      {activeTab === 'ai' && (
        <AIBattleView subject={subject} examPapers={examPapers} />
      )}
    </div>
  );
};

