import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  FileText,
  ChevronRight,
  Filter,
  Tag,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { SubjectId, ExamPaper, LessonSummary, Subject } from '../types';
import { SUBJECTS, EXAM_PAPERS, LESSON_SUMMARIES } from '../data/grade6Data';
import { LIBRARY_ARTICLES, LibraryArticle } from '../data/libraryData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubject: (subjectId: SubjectId) => void;
  onSelectExam: (exam: ExamPaper) => void;
  onSelectLesson: (lesson: LessonSummary, subjectId: SubjectId) => void;
  onSelectArticle: (article: LibraryArticle) => void;
  initialQuery?: string;
}

type FilterCategory = 'all' | 'exams' | 'lessons' | 'library' | 'subjects';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSubject,
  onSelectExam,
  onSelectLesson,
  onSelectArticle,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');

  // Quick search keywords
  const QUICK_TAGS = [
    { label: '🇬🇧 វិញ្ញាសាអង់គ្លេស', query: 'ភាសាអង់គ្លេស' },
    { label: '📐 គណិតវិទ្យា & ប្រភាគ', query: 'ប្រភាគ' },
    { label: '🌱 ដំណើររស្មីសំយោគ', query: 'រស្មីសំយោគ' },
    { label: '📖 រឿងព្រេងប្រជាប្រិយ', query: 'រឿង' },
    { label: '🎧 អត្ថបទស្តាប់ខ្មែរ', query: 'ស្តាប់' },
    { label: '❤️ កាយវិភាគវិទ្យា', query: 'សុខភាព' },
    { label: '📝 Grammar Basics', query: 'Grammar' },
    { label: '🏛️ ប្រវត្តិសាស្ត្រខ្មែរ', query: 'ប្រវត្តិសាស្ត្រ' },
  ];

  // Helper map for subject names & colors
  const subjectMap = useMemo(() => {
    const map: Record<string, Subject> = {};
    SUBJECTS.forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, []);

  // Filter items based on query and subject filter
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // 1. Filter Subjects
    const matchedSubjects = SUBJECTS.filter((s) => {
      if (selectedSubjectId !== 'all' && s.id !== selectedSubjectId) return false;
      if (!q) return true;
      return (
        s.nameKhmer.toLowerCase().includes(q) ||
        s.nameEnglish.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    });

    // 2. Filter Exam Papers
    const matchedExams = EXAM_PAPERS.filter((e) => {
      if (selectedSubjectId !== 'all' && e.subjectId !== selectedSubjectId) return false;
      if (!q) return true;
      const subj = subjectMap[e.subjectId];
      const subjName = subj ? subj.nameKhmer.toLowerCase() : '';
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.yearOrType.toLowerCase().includes(q) ||
        subjName.includes(q) ||
        e.questions.some((ques) => ques.text.toLowerCase().includes(q))
      );
    });

    // 3. Filter Lesson Summaries
    const matchedLessons = LESSON_SUMMARIES.filter((l) => {
      if (selectedSubjectId !== 'all' && l.subjectId !== selectedSubjectId) return false;
      if (!q) return true;
      const subj = subjectMap[l.subjectId];
      const subjName = subj ? subj.nameKhmer.toLowerCase() : '';
      return (
        l.title.toLowerCase().includes(q) ||
        l.chapter.toLowerCase().includes(q) ||
        l.content.toLowerCase().includes(q) ||
        subjName.includes(q) ||
        l.keyPoints.some((kp) => kp.toLowerCase().includes(q))
      );
    });

    // 4. Filter Library Articles
    const matchedArticles = LIBRARY_ARTICLES.filter((a) => {
      if (selectedSubjectId !== 'all') {
        if (selectedSubjectId === 'khmer' && a.category !== 'khmer') return false;
        if (selectedSubjectId === 'science' && a.category !== 'science') return false;
        if (selectedSubjectId === 'social' && a.category !== 'social') return false;
        if (selectedSubjectId === 'math' && a.category !== 'math') return false;
      }
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );
    });

    // Sort matchedLessons by subjectId and then chapter number
    matchedLessons.sort((a, b) => {
      if (a.subjectId !== b.subjectId) {
        return a.subjectId.localeCompare(b.subjectId);
      }
      return a.chapter.localeCompare(b.chapter, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Sort matchedExams by subjectId and then title
    matchedExams.sort((a, b) => {
      if (a.subjectId !== b.subjectId) {
        return a.subjectId.localeCompare(b.subjectId);
      }
      return a.title.localeCompare(b.title);
    });

    return {
      subjects: matchedSubjects,
      exams: matchedExams,
      lessons: matchedLessons,
      articles: matchedArticles,
      totalCount: matchedSubjects.length + matchedExams.length + matchedLessons.length + matchedArticles.length
    };
  }, [searchQuery, selectedSubjectId, subjectMap]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-start justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl border border-amber-200/90 shadow-2xl w-full max-w-3xl my-4 sm:my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header & Search Box */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#2B170B] via-[#452413] to-[#2B170B] text-amber-50 relative shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold border border-amber-400/30">
                🔍
              </span>
              <div>
                <h2 className="font-moul text-base sm:text-lg text-amber-100 font-bold tracking-wide">
                  ស្វែងរកឯកសារ និងមេរៀន
                </h2>
                <p className="text-[11px] text-amber-300/80">
                  ស្វែងរកវិញ្ញាសា មេរៀន និងអត្ថបទអានក្នុងប្រព័ន្ធ
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-amber-950/60 text-amber-300 hover:text-white hover:bg-amber-800/80 transition-all cursor-pointer border border-amber-600/30 active:scale-95"
              aria-label="Close"
              id="btn-close-global-search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative mt-2">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="វាយបញ្ចូលពាក្យគន្លឹះ (ឧ. ភាសាអង់គ្លេស, ប្រភាគ, រស្មីសំយោគ, រឿងព្រេង...)"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/10 border border-amber-400/40 text-amber-50 placeholder-amber-300/60 text-sm focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400/80 transition-all font-medium shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-300/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            <span className="text-[10px] text-amber-300/80 font-bold shrink-0 mr-1">ពាក្យញឹកញាប់៖</span>
            {QUICK_TAGS.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(tag.query)}
                className="px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100 transition-all shrink-0 font-medium cursor-pointer text-[11px]"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="bg-slate-50 border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between gap-3 overflow-x-auto shrink-0">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'all'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <span>ទាំងអស់</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-950/20 text-[10px]">
                {searchResults.totalCount}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('exams')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'exams'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>វិញ្ញាសា</span>
              <span className="ml-0.5 text-[10px] opacity-80">({searchResults.exams.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('lessons')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'lessons'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>មេរៀន</span>
              <span className="ml-0.5 text-[10px] opacity-80">({searchResults.lessons.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('library')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'library'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>បណ្ណាល័យ</span>
              <span className="ml-0.5 text-[10px] opacity-80">({searchResults.articles.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('subjects')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'subjects'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>មុខវិជ្ជា</span>
              <span className="ml-0.5 text-[10px] opacity-80">({searchResults.subjects.length})</span>
            </button>
          </div>

          {/* Subject Filter Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 py-1 px-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs cursor-pointer shadow-2xs"
            >
              <option value="all">មុខវិជ្ជាទាំងអស់</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameKhmer}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF8F5]">
          {searchResults.totalCount === 0 ? (
            <div className="text-center py-12 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3 text-2xl font-bold border border-amber-200">
                🔍
              </div>
              <h3 className="font-moul text-base text-slate-800 font-bold">
                មិនរកឃើញឯកសារ «{searchQuery}»
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto">
                សូមសាកល្បងវាយបញ្ចូលពាក្យផ្សេង ដូចជា «អង់គ្លេស», «ប្រភាគ», «វិទ្យាសាស្ត្រ», «រឿងព្រេង» ឬជ្រើសរើសមុខវិជ្ជាទាំងអស់។
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubjectId('all');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs hover:bg-amber-900 transition-colors cursor-pointer shadow-xs"
              >
                បង្ហាញឯកសារទាំងអស់
              </button>
            </div>
          ) : (
            <>
              {/* 1. EXAM PAPERS SECTION */}
              {(selectedCategory === 'all' || selectedCategory === 'exams') && searchResults.exams.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-moul text-sm text-slate-900 font-bold flex items-center gap-2">
                      <GraduationCap className="w-4.5 h-4.5 text-amber-700" />
                      វិញ្ញាសាប្រឡង ({searchResults.exams.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {searchResults.exams.map((exam) => {
                      const subj = subjectMap[exam.subjectId];
                      return (
                        <div
                          key={exam.id}
                          onClick={() => {
                            onSelectExam(exam);
                            onClose();
                          }}
                          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${subj?.colorBadgeBg || 'bg-amber-100'} ${subj?.colorBadgeText || 'text-amber-900'}`}>
                                {subj?.nameKhmer || 'វិញ្ញាសា'}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {exam.durationMinutes} នាទី
                              </span>
                            </div>

                            <h4 className="font-moul text-xs text-slate-900 font-bold group-hover:text-amber-900 transition-colors leading-snug">
                              {exam.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                              {exam.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-600 flex items-center gap-1">
                              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                              {exam.questions.length} សំណួរ ({exam.totalPoints} ពិន្ទុ)
                            </span>
                            <span className="text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              ធ្វើវិញ្ញាសា <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. LESSON SUMMARIES SECTION */}
              {(selectedCategory === 'all' || selectedCategory === 'lessons') && searchResults.lessons.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pt-2">
                    <h3 className="font-moul text-sm text-slate-900 font-bold flex items-center gap-2">
                      <BookOpen className="w-4.5 h-4.5 text-emerald-700" />
                      មេរៀនសង្ខេប ({searchResults.lessons.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {searchResults.lessons.map((lesson) => {
                      const subj = subjectMap[lesson.subjectId];
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(lesson, lesson.subjectId);
                            onClose();
                          }}
                          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                                {lesson.chapter}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${subj?.colorBadgeBg || 'bg-slate-100'} ${subj?.colorBadgeText || 'text-slate-700'}`}>
                                {subj?.nameKhmer || 'មេរៀន'}
                              </span>
                            </div>

                            <h4 className="font-moul text-xs text-slate-900 font-bold group-hover:text-emerald-900 transition-colors leading-snug">
                              {lesson.title}
                            </h4>
                            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                              {lesson.content}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-500">
                              {lesson.keyPoints.length} ចំនុចសំខាន់ៗ
                            </span>
                            <span className="text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              អានមេរៀន <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. LIBRARY ARTICLES SECTION */}
              {(selectedCategory === 'all' || selectedCategory === 'library') && searchResults.articles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pt-2">
                    <h3 className="font-moul text-sm text-slate-900 font-bold flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-blue-700" />
                      បណ្ណាល័យអត្ថបទអាន ({searchResults.articles.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {searchResults.articles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => {
                          onSelectArticle(article);
                          onClose();
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200/80">
                              {article.icon} {article.categoryLabel}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {article.readingTimeMinutes} នាទី
                            </span>
                          </div>

                          <h4 className="font-moul text-xs text-slate-900 font-bold group-hover:text-blue-900 transition-colors leading-snug">
                            {article.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {article.summary}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-400">អត្ថបទអានបន្ថែម</span>
                          <span className="text-blue-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            បើកអាន <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. SUBJECTS SECTION */}
              {(selectedCategory === 'all' || selectedCategory === 'subjects') && searchResults.subjects.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pt-2">
                    <h3 className="font-moul text-sm text-slate-900 font-bold flex items-center gap-2">
                      <Layers className="w-4.5 h-4.5 text-purple-700" />
                      មុខវិជ្ជា ({searchResults.subjects.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {searchResults.subjects.map((subj) => (
                      <div
                        key={subj.id}
                        onClick={() => {
                          onSelectSubject(subj.id);
                          onClose();
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-400 transition-all cursor-pointer group flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl ${subj.colorBgLight} ${subj.colorText} font-bold text-xl flex items-center justify-center shrink-0 border border-slate-200/60`}>
                            {subj.symbol}
                          </div>
                          <div>
                            <h4 className="font-moul text-xs text-slate-900 font-bold group-hover:text-amber-900 transition-colors">
                              {subj.nameKhmer}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {subj.description}
                            </p>
                          </div>
                        </div>

                        <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-amber-100 text-slate-400 group-hover:text-amber-900 flex items-center justify-center transition-colors shrink-0">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
