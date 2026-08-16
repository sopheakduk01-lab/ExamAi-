import React, { useRef, useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  Award,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Zap,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { ExamPaper, SubjectId } from '../types';
import { NEW_EXAM_PAPERS } from '../data/newExamsData';

interface Grade6ExamCarouselProps {
  onSelectExam: (exam: ExamPaper) => void;
  onSelectSubject: (subjectId: SubjectId) => void;
  defaultTab?: 'exam' | 'lesson';
}

export const Grade6ExamCarousel: React.FC<Grade6ExamCarouselProps> = ({
  onSelectExam,
  onSelectSubject,
  defaultTab = 'lesson'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'exam' | 'lesson'>(defaultTab);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Mouse drag handlers for smooth horizontal swiping on desktop & mobile
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.8; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Lesson Summaries Carousel Items (មេរៀនតាមមុខវិជ្ជា)
  const lessonItems = [
    {
      id: 'lesson-khmer',
      tag: 'មេរៀនសង្ខេប',
      tagBg: 'bg-blue-600',
      tagText: 'text-white font-extrabold',
      title: 'មេរៀនសង្ខេប៖ ភាសាខ្មែរ',
      subtitle: 'អត្ថបទស្តាប់ (១០មេរៀន), វេយ្យាករណ៍, វិធីសាស្ត្រតែងសេចក្តី និងបទានុក្រម',
      subjectId: 'khmer' as SubjectId,
      subjectName: 'ភាសាខ្មែរ',
      subjectIcon: '📘',
      lessonCount: 35,
      questionCount: 294,
      gradientBg: 'from-blue-900 via-indigo-950 to-slate-900',
      buttonText: 'ចូលអានមេរៀនសង្ខេប'
    },
    {
      id: 'lesson-math',
      tag: 'មេរៀនសង្ខេប',
      tagBg: 'bg-emerald-600',
      tagText: 'text-white font-extrabold',
      title: 'មេរៀនសង្ខេប៖ គណិតវិទ្យា',
      subtitle: 'លេខគណនា, ប្រភាគ, ចំនួនទសភាគ, រូបមន្តធរណីមាត្រ និងចំណោទ',
      subjectId: 'math' as SubjectId,
      subjectName: 'គណិតវិទ្យា',
      subjectIcon: '📐',
      lessonCount: 20,
      questionCount: 636,
      gradientBg: 'from-emerald-900 via-teal-950 to-slate-900',
      buttonText: 'ចូលអានមេរៀនសង្ខេប'
    },
    {
      id: 'lesson-science',
      tag: 'មេរៀនសង្ខេប',
      tagBg: 'bg-sky-600',
      tagText: 'text-white font-extrabold',
      title: 'មេរៀនសង្ខេប៖ វិទ្យាសាស្ត្រ',
      subtitle: 'សរីរាង្គមនុស្ស, រុក្ខជាតិ, អគ្គិសនី និងប្រព័ន្ធព្រះអាទិត្យ',
      subjectId: 'science' as SubjectId,
      subjectName: 'វិទ្យាសាស្ត្រ',
      subjectIcon: '🔬',
      lessonCount: 28,
      questionCount: 280,
      gradientBg: 'from-sky-900 via-cyan-950 to-slate-900',
      buttonText: 'ចូលអានមេរៀនសង្ខេប'
    },
    {
      id: 'lesson-social',
      tag: 'មេរៀនសង្ខេប',
      tagBg: 'bg-amber-600',
      tagText: 'text-white font-extrabold',
      title: 'មេរៀនសង្ខេប៖ សិក្សាសង្គម',
      subtitle: 'ប្រវត្តិវិទ្យា, ភូមិវិទ្យា, សីលធម៌-ពលរដ្ឋវិទ្យា',
      subjectId: 'social' as SubjectId,
      subjectName: 'សិក្សាសង្គម',
      subjectIcon: '🌍',
      lessonCount: 25,
      questionCount: 166,
      gradientBg: 'from-amber-900 via-orange-950 to-slate-900',
      buttonText: 'ចូលអានមេរៀនសង្ខេប'
    },
    {
      id: 'lesson-health',
      tag: 'មេរៀនសង្ខេប',
      tagBg: 'bg-teal-600',
      tagText: 'text-white font-extrabold',
      title: 'មេរៀនសង្ខេប៖ អប់រំសុខភាព',
      subtitle: 'សុខភាពបឋម, សុខភាពផ្លូវចិត្ត, សុខភាពបន្តពូជ និងសុខភាពបរិស្ថាន',
      subjectId: 'health' as SubjectId,
      subjectName: 'អប់រំសុខភាព',
      subjectIcon: '🩺',
      lessonCount: 18,
      questionCount: 160,
      gradientBg: 'from-teal-900 via-emerald-950 to-slate-900',
      buttonText: 'ចូលអានមេរៀនសង្ខេប'
    },
    {
      id: 'lesson-english',
      tag: 'មេរៀនសង្ខេប',
      tagBg: 'bg-purple-600',
      tagText: 'text-white font-extrabold',
      title: 'មេរៀនសង្ខេប៖ ភាសាអង់គ្លេស',
      subtitle: 'Grammar, Vocabulary, Reading & Writing Grade 6',
      subjectId: 'english' as SubjectId,
      subjectName: 'ភាសាអង់គ្លេស',
      subjectIcon: '🇬🇧',
      lessonCount: 15,
      questionCount: 85,
      gradientBg: 'from-purple-900 via-violet-950 to-slate-900',
      buttonText: 'ចូលអានមេរៀនសង្ខេប'
    }
  ];

  // Exam Papers Carousel Items (វិញ្ញាសាតាមមេរៀន & តេស្ត)
  const examItems: {
    id: string;
    tag: string;
    tagBg: string;
    tagText: string;
    title: string;
    subtitle: string;
    subjectId: SubjectId;
    subjectName: string;
    subjectIcon: string;
    duration: number;
    questionsCount: number;
    totalPoints: number;
    gradientBg: string;
    buttonText: string;
    examPaper?: ExamPaper;
  }[] = [
    {
      id: 'by-lesson-khmer',
      tag: 'វិញ្ញាសាតាមមេរៀន',
      tagBg: 'bg-blue-600',
      tagText: 'text-white font-extrabold',
      title: 'វិញ្ញាសាតាមមេរៀន៖ ភាសាខ្មែរ',
      subtitle: 'អត្ថបទស្តាប់, វេយ្យាករណ៍, វិធីសាស្ត្រតែងសេចក្តី និងបទានុក្រម',
      subjectId: 'khmer',
      subjectName: 'ភាសាខ្មែរ',
      subjectIcon: '📘',
      duration: 45,
      questionsCount: 294,
      totalPoints: 50,
      gradientBg: 'from-blue-900 via-indigo-950 to-slate-900',
      buttonText: 'ចូលធ្វើវិញ្ញាសាតាមមេរៀន'
    },
    {
      id: 'by-lesson-math',
      tag: 'វិញ្ញាសាតាមមេរៀន',
      tagBg: 'bg-emerald-600',
      tagText: 'text-white font-extrabold',
      title: 'វិញ្ញាសាតាមមេរៀន៖ គណិតវិទ្យា',
      subtitle: 'លេខគណនា, ប្រភាគ, ចំនួនទសភាគ, រូបមន្តធរណីមាត្រ និងចំណោទ',
      subjectId: 'math',
      subjectName: 'គណិតវិទ្យា',
      subjectIcon: '📐',
      duration: 45,
      questionsCount: 636,
      totalPoints: 50,
      gradientBg: 'from-emerald-900 via-teal-950 to-slate-900',
      buttonText: 'ចូលធ្វើវិញ្ញាសាតាមមេរៀន'
    },
    {
      id: 'by-lesson-science',
      tag: 'វិញ្ញាសាតាមមេរៀន',
      tagBg: 'bg-sky-600',
      tagText: 'text-white font-extrabold',
      title: 'វិញ្ញាសាតាមមេរៀន៖ វិទ្យាសាស្ត្រ',
      subtitle: 'សរីរាង្គមនុស្ស, រុក្ខជាតិ, អគ្គិសនី និងប្រព័ន្ធព្រះអាទិត្យ',
      subjectId: 'science',
      subjectName: 'វិទ្យាសាស្ត្រ',
      subjectIcon: '🔬',
      duration: 45,
      questionsCount: 280,
      totalPoints: 50,
      gradientBg: 'from-sky-900 via-cyan-950 to-slate-900',
      buttonText: 'ចូលធ្វើវិញ្ញាសាតាមមេរៀន'
    },
    {
      id: 'by-lesson-social',
      tag: 'វិញ្ញាសាតាមមេរៀន',
      tagBg: 'bg-amber-600',
      tagText: 'text-white font-extrabold',
      title: 'វិញ្ញាសាតាមមេរៀន៖ សិក្សាសង្គម',
      subtitle: 'ប្រវត្តិវិទ្យា, ភូមិវិទ្យា, សីលធម៌-ពលរដ្ឋវិទ្យា',
      subjectId: 'social',
      subjectName: 'សិក្សាសង្គម',
      subjectIcon: '🌍',
      duration: 45,
      questionsCount: 166,
      totalPoints: 50,
      gradientBg: 'from-amber-900 via-orange-950 to-slate-900',
      buttonText: 'ចូលធ្វើវិញ្ញាសាតាមមេរៀន'
    },
    {
      id: 'by-lesson-health',
      tag: 'វិញ្ញាសាតាមមេរៀន',
      tagBg: 'bg-teal-600',
      tagText: 'text-white font-extrabold',
      title: 'វិញ្ញាសាតាមមេរៀន៖ អប់រំសុខភាព',
      subtitle: 'សុខភាពបឋម, សុខភាពផ្លូវចិត្ត, សុខភាពបន្តពូជ និងសុខភាពបរិស្ថាន',
      subjectId: 'health',
      subjectName: 'អប់រំសុខភាព',
      subjectIcon: '🩺',
      duration: 40,
      questionsCount: 160,
      totalPoints: 50,
      gradientBg: 'from-teal-900 via-emerald-950 to-slate-900',
      buttonText: 'ចូលធ្វើវិញ្ញាសាតាមមេរៀន'
    },
    {
      id: 'by-lesson-english',
      tag: 'វិញ្ញាសាតាមមេរៀន',
      tagBg: 'bg-purple-600',
      tagText: 'text-white font-extrabold',
      title: 'វិញ្ញាសាតាមមេរៀន៖ ភាសាអង់គ្លេស',
      subtitle: 'Grammar, Vocabulary, Reading & Writing Grade 6',
      subjectId: 'english',
      subjectName: 'ភាសាអង់គ្លេស',
      subjectIcon: '🇬🇧',
      duration: 30,
      questionsCount: 85,
      totalPoints: 50,
      gradientBg: 'from-purple-900 via-violet-950 to-slate-900',
      buttonText: 'ចូលធ្វើវិញ្ញាសាតាមមេរៀន'
    },
    {
      id: 'diagnostic-science-1',
      tag: 'តេស្តស្ទង់សមត្ថភាព',
      tagBg: 'bg-rose-600',
      tagText: 'text-white font-black',
      title: 'តេស្តស្ទង់សមត្ថភាព៖ វិទ្យាសាស្ត្រ (កម្រងអូរឫស្សី)',
      subtitle: 'វិញ្ញាសារួមត្រៀមប្រឡងបញ្ចប់បឋមសិក្សា (QCM, ផ្គូរផ្គង, ខុស/ត្រូវ, បំពេញចន្លោះ)',
      subjectId: 'science',
      subjectName: 'វិទ្យាសាស្ត្រ',
      subjectIcon: '🧪',
      duration: 45,
      questionsCount: 28,
      totalPoints: 50,
      gradientBg: 'from-rose-900 via-red-950 to-slate-900',
      buttonText: 'ធ្វើតេស្តស្ទង់សមត្ថភាព',
      examPaper: NEW_EXAM_PAPERS[0]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-3xl p-4 sm:p-5 text-white shadow-xl border-2 border-amber-500/40 space-y-3.5 relative overflow-hidden">
      {/* Top Header Row with Title, Mode Switcher & Scroll Indicators */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md text-xl shrink-0">
            {activeTab === 'lesson' ? '📖' : '🎓'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-moul text-sm sm:text-base text-amber-200 tracking-wide">
                រៀនបន្ថែម សម្រាប់កូនៗថ្នាក់ទី៦
              </h2>
            </div>
            <p className="text-xs text-slate-300/90 font-medium">
              ស្គ្រូលទៅស្តាំ 👉 ដើម្បីជ្រើសរើស{activeTab === 'lesson' ? 'មេរៀនសង្ខេប' : 'វិញ្ញាសាប្រឡង'}តាមមុខវិជ្ជា
            </p>
          </div>
        </div>

        {/* Tab Switcher & Scroll Control Arrows */}
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {/* Filter Tab Switcher inside carousel header */}
          <div className="flex items-center p-1 bg-slate-800/90 rounded-xl border border-slate-700 text-xs font-bold">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'lesson'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>មេរៀនសង្ខេប</span>
            </button>

            <button
              onClick={() => setActiveTab('exam')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'exam'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>វិញ្ញាសាប្រឡង</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollNav('left')}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-700 active:scale-95"
              title="ស្គ្រូលទៅឆ្វេង"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollNav('right')}
              className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-colors cursor-pointer font-bold shadow-sm active:scale-95"
              title="ស្គ្រូលទៅស្តាំ"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Swipeable Container (Scrollable Left/Right) */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex items-stretch gap-3.5 overflow-x-auto py-1 scroll-smooth select-none cursor-grab active:cursor-grabbing no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {activeTab === 'lesson'
          ? lessonItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectSubject(item.subjectId)}
                className={`w-[280px] sm:w-[320px] rounded-2xl bg-gradient-to-br ${item.gradientBg} border border-slate-700 hover:border-amber-400/80 p-4 shrink-0 flex flex-col justify-between gap-3 shadow-lg hover:shadow-2xl transition-all cursor-pointer group snap-start relative overflow-hidden transform hover:-translate-y-1 active:scale-98`}
              >
                {/* Top Tag & Icon */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${item.tagBg} ${item.tagText} shadow-xs truncate max-w-[200px]`}
                    >
                      {item.tag}
                    </span>
                    <span className="text-xl bg-slate-800/80 p-1 rounded-lg border border-slate-700">
                      {item.subjectIcon}
                    </span>
                  </div>

                  <h3 className="font-moul text-sm text-amber-100 group-hover:text-white transition-colors leading-relaxed line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300/80 font-medium line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                {/* Lesson Stats & Action Button */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{item.lessonCount} មេរៀនសង្ខេប</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{item.questionCount} សំណួរ QCM</span>
                    </span>
                  </div>

                  <button
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:scale-102"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          : examItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.examPaper) {
                    onSelectExam(item.examPaper);
                  } else {
                    onSelectSubject(item.subjectId);
                  }
                }}
                className={`w-[280px] sm:w-[320px] rounded-2xl bg-gradient-to-br ${item.gradientBg} border border-slate-700 hover:border-amber-400/80 p-4 shrink-0 flex flex-col justify-between gap-3 shadow-lg hover:shadow-2xl transition-all cursor-pointer group snap-start relative overflow-hidden transform hover:-translate-y-1 active:scale-98`}
              >
                {/* Top Tag & Icon */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${item.tagBg} ${item.tagText} shadow-xs truncate max-w-[200px]`}
                    >
                      {item.tag}
                    </span>
                    <span className="text-xl bg-slate-800/80 p-1 rounded-lg border border-slate-700">
                      {item.subjectIcon}
                    </span>
                  </div>

                  <h3 className="font-moul text-sm text-amber-100 group-hover:text-white transition-colors leading-relaxed line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300/80 font-medium line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                {/* Exam Details & Action Button */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{item.questionsCount} សំណួរ</span>
                    </span>
                    <span className="flex items-center gap-1 text-sky-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.duration} នាទី</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Award className="w-3.5 h-3.5" />
                      <span>{item.totalPoints} ពិន្ទុ</span>
                    </span>
                  </div>

                  <button
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:scale-102"
                  >
                    <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}

        {/* View All Subjects Card at the End of Carousel */}
        <div
          onClick={() => onSelectSubject('khmer')}
          className="w-[200px] sm:w-[220px] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-dashed border-amber-500/50 hover:border-amber-400 p-4 shrink-0 flex flex-col items-center justify-center text-center gap-2 shadow-lg transition-all cursor-pointer group snap-start active:scale-95"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
            📚
          </div>
          <h4 className="font-moul text-xs text-amber-200">
            មើលគ្រប់មុខវិជ្ជាទាំងអស់
          </h4>
          <p className="text-[11px] text-slate-400 font-medium">
            ចុចទីនេះដើម្បីជ្រើសរើសមុខវិជ្ជា
          </p>
          <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs mt-1">
            ចូលរៀន
          </span>
        </div>
      </div>
    </div>
  );
};
