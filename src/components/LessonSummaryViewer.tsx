import React, { useState } from 'react';
import { LessonSummary, Subject } from '../types';
import {
  BookOpen,
  Sparkles,
  Volume2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Type,
  Lightbulb,
  AlertTriangle,
  Bot,
  Zap,
  Target,
  Award,
  HelpCircle
} from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';
import { MathAIQuestionTutorModal } from './MathAIQuestionTutorModal';

interface LessonSummaryViewerProps {
  subject: Subject;
  lessons: LessonSummary[];
  onBack: () => void;
}

export const LessonSummaryViewer: React.FC<LessonSummaryViewerProps> = ({
  subject,
  lessons,
  onBack
}) => {
  const [expandedId, setExpandedId] = useState<string>(lessons[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [readingId, setReadingId] = useState<string | null>(null);
  const [aiTutorLesson, setAiTutorLesson] = useState<LessonSummary | null>(null);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});

  const filteredLessons = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadLesson = (lesson: LessonSummary, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      if (readingId === lesson.id) {
        window.speechSynthesis.cancel();
        setReadingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const readText = `${lesson.title}. ${lesson.content}. ចំណុចសំខាន់ៗ៖ ${lesson.keyPoints.join(', ')}`;
      const utterance = new SpeechSynthesisUtterance(readText);
      utterance.lang = 'km-KH';
      utterance.rate = 0.9;
      utterance.onend = () => setReadingId(null);
      utterance.onerror = () => setReadingId(null);

      setReadingId(lesson.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper fallbacks for rich explanations
  const getStepByStepExample = (lesson: LessonSummary) => {
    if (lesson.stepByStepExample) return lesson.stepByStepExample;

    // Default step-by-step generator based on formulaCard or lesson title
    if (lesson.formulaCard) {
      return {
        problemText: `គំរូលំហាត់អនុវត្ត៖ គណនាតាមរូបមន្តនៃ ${lesson.title}`,
        steps: [
          {
            stepNumber: 1,
            title: 'កត់ត្រាប្រធាន និងទិន្នន័យដែលស្គាល់',
            detail: `ផ្អែកតាមរូបមន្ត៖ ${lesson.formulaCard.content}`
          },
          {
            stepNumber: 2,
            title: 'ជំនួសតម្លៃលេខចូលក្នុងរូបមន្ត',
            detail: lesson.formulaCard.example || 'អនុវត្តគណនាតាមលំដាប់លំដោយនៃប្រមាណវិធី'
          },
          {
            stepNumber: 3,
            title: 'ផ្ទៀងផ្ទាត់ និងសរសេរចម្លើយជាមួយនឹងឯកតា',
            detail: 'ពិនិត្យមើលសញ្ញា និងឯកតារវាស់ (ដូចជា cm, m², ha, នាក់) ឲ្យបានត្រឹមត្រូវ។'
          }
        ],
        finalAnswer: lesson.formulaCard.example || 'ចម្លើយត្រូវបានផ្ទៀងផ្ទាត់ត្រឹមត្រូវ ១០០%'
      };
    }

    return {
      problemText: `លំហាត់គំរូ និងវិធីវិភាគប្រធាន៖ ${lesson.title}`,
      steps: [
        {
          stepNumber: 1,
          title: 'អានប្រធាន និងកំណត់ចំណុចគន្លឹះ',
          detail: 'បំបែកប្រធានលំហាត់ជាផ្នែកតូចៗ រួចរកចំណុចដែលសួររក។'
        },
        {
          stepNumber: 2,
          title: 'ប្រើប្រាស់វិធាន និងច្បាប់នៃមេរៀន',
          detail: lesson.keyPoints[0] || 'អនុវត្តតាមវិធានដែលបានរៀនក្នុងមេរៀននេះ។'
        }
      ],
      finalAnswer: 'ទទួលបានផលប្រៀបធៀប និងដំណោះស្រាយត្រឹមត្រូវ'
    };
  };

  const getRealWorldApp = (lesson: LessonSummary) => {
    if (lesson.realWorldApplication) return lesson.realWorldApplication;
    if (lesson.subjectId === 'math') {
      return 'មេរៀននេះត្រូវបានប្រើប្រាស់ជាប្រចាំថ្ងៃក្នុងការទិញដូរនៅផ្សារ ការវាស់វែងផ្ទៃដីស្រែចម្ការ ផ្ទះសម្បែង ការគណនាប្រាក់ចំណេញ/ខាត និងការធ្វើដំណើរកម្សាន្ត។';
    }
    if (lesson.subjectId === 'science') {
      return 'ជួយឲ្យសិស្សយល់ដឹងពីបាតុភូតធម្មជាតិ ការថែរក្សាសុខភាពរាងកាយ បរិស្ថានជុំវិញខ្លួន និងការយល់ដឹងពីឧបករណ៍បច្ចេកវិទ្យា។';
    }
    return 'ជួយពង្រឹងចំណេះដឹងទូទៅ ការគិតបែបហេតុផល និងជំនាញដោះស្រាយបញ្ហាក្នុងជីវិតរស់នៅជាក់ស្ដែង។';
  };

  const getCommonPitfalls = (lesson: LessonSummary) => {
    if (lesson.commonPitfalls && lesson.commonPitfalls.length > 0) return lesson.commonPitfalls;
    return [
      'ការច្រឡំសញ្ញា និងការភ្លេចប្តូរឯកតា (ដូចជាការភ្លេចបំប្លែង m ទៅ cm)',
      'ការមិនបានតម្រៀបខ្ទង់ ឬសញ្ញាចុចទសភាគឲ្យត្រង់ជួរគ្នាមុនធ្វើប្រមាណវិធី',
      'ការច្រឡំរូបមន្ត (ឧទាហរណ៍៖ ច្រឡំបរិមាត្រ ជាមួយនឹងផ្ទៃក្រឡា)'
    ];
  };

  const getQuickPractice = (lesson: LessonSummary) => {
    if (lesson.quickPractice) return lesson.quickPractice;
    return {
      questionText: `តើចំណុចណាមួយខាងក្រោមនេះជាវិធានត្រឹមត្រូវនៃ ${lesson.title}?`,
      options: [
        lesson.keyPoints[0] || 'អនុវត្តតាមវិធានគ្រឹះនៃមេរៀន',
        'ធ្វើប្រមាណវិធីដោយមិនបាច់គិតពីខ្ទង់',
        'ចោលផ្នែកទសភាគទាំងអស់',
        'មិនបាច់ដាក់ឯកតារវាស់'
      ],
      correctIndex: 0,
      explanation: `ចម្លើយត្រឹមត្រូវគឺជម្រើសទី ១ ដោយសារ៖ ${lesson.keyPoints[0] || lesson.content}`
    };
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-900 transition-colors cursor-pointer flex items-center gap-1"
        >
          ← ត្រឡប់ទៅមុខវិជ្ជា
        </button>

        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="p-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            title="ផ្លាស់ប្តូរទំហំអក្សរ"
          >
            <Type className="w-4 h-4" />
            <span>{fontSize === 'normal' ? 'អក្សរធំ' : 'អក្សរធម្មតា'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ស្វែងរកមេរៀនសង្ខេប រូបមន្ត ឬប្រធានបទ..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-2xs"
        />
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        {filteredLessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
            មិនរកឃើញមេរៀនដែលត្រូវនឹង «{searchQuery}» ឡើយ។
          </div>
        ) : (
          filteredLessons.map((lesson) => {
            const isExpanded = expandedId === lesson.id;
            const stepEx = getStepByStepExample(lesson);
            const realApp = getRealWorldApp(lesson);
            const pitfalls = getCommonPitfalls(lesson);
            const quiz = getQuickPractice(lesson);

            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                    : 'border-slate-200 shadow-2xs hover:border-emerald-300'
                }`}
              >
                {/* Lesson Header Accordion Trigger */}
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : lesson.id)}
                  className="p-5 flex items-start justify-between gap-3 cursor-pointer select-none bg-gradient-to-r from-white via-slate-50 to-emerald-50/20"
                >
                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold mb-1.5 border border-emerald-200">
                      {lesson.chapter}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      <MathFormattedText text={lesson.title} />
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleReadLesson(lesson, e)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        readingId === lesson.id
                          ? 'bg-amber-400 text-amber-950 animate-pulse'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="ស្តាប់ការអានមេរៀន"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Lesson Content details when expanded */}
                {isExpanded && (
                  <div className="p-5 pt-3 border-t border-slate-100 space-y-6">
                    {/* 1. Main Overview Explanation */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span>ពន្យល់ខ្លឹមសារមេរៀន (Lesson Overview)</span>
                      </div>
                      <div
                        className={`text-slate-800 leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-200/90 ${
                          fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                        }`}
                      >
                        <MathFormattedText text={lesson.content} />
                      </div>
                    </div>

                    {/* 2. Formula & Rules Showcase Card (if formula exists) */}
                    {lesson.formulaCard && (
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-emerald-50 space-y-3 shadow-sm border border-emerald-800/50">
                        <div className="flex items-center justify-between gap-2 font-bold text-emerald-300 text-xs sm:text-sm">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            {lesson.formulaCard.title}
                          </span>
                          <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-200 uppercase font-mono">
                            រូបមន្តសំខាន់
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/30 text-emerald-100 font-mono text-xs sm:text-sm leading-relaxed">
                          <MathFormattedText text={lesson.formulaCard.content} />
                        </div>

                        {lesson.formulaCard.example && (
                          <div className="p-2.5 rounded-xl bg-emerald-900/60 text-xs text-emerald-200 border border-emerald-700/50">
                            💡 <span className="font-bold text-amber-300">ឧទាហរណ៍៖</span>{' '}
                            <MathFormattedText text={lesson.formulaCard.example} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* 3. Step-by-Step Solved Problem & Proofs */}
                    <div className="p-4.5 rounded-2xl bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 border border-emerald-200/80 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                        <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                          📝
                        </span>
                        <span>លំហាត់គំរូ និងដំណោះស្រាយជំហានៗ (Step-by-Step Solution)</span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/90 font-bold text-xs sm:text-sm text-slate-800 shadow-2xs">
                        <MathFormattedText text={stepEx.problemText} />
                      </div>

                      <div className="space-y-2">
                        {stepEx.steps.map((st) => (
                          <div
                            key={st.stepNumber}
                            className="p-3 rounded-xl bg-white/90 border border-slate-200/90 text-xs sm:text-sm space-y-1 shadow-2xs"
                          >
                            <div className="font-bold text-emerald-800 flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold border border-emerald-200">
                                ជំហានទី {st.stepNumber}
                              </span>
                              <span>{st.title}</span>
                            </div>
                            <div className="text-slate-700 leading-relaxed pl-1 pt-0.5">
                              <MathFormattedText text={st.detail} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-800 text-white font-bold text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          ចម្លើយចុងក្រោយ៖
                        </span>
                        <span className="text-amber-200 font-mono text-xs sm:text-sm bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-600/50">
                          <MathFormattedText text={stepEx.finalAnswer} />
                        </span>
                      </div>
                    </div>

                    {/* 4. Key Rules to Remember */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                        <span>ខ្លឹមសារសំខាន់ៗ និងច្បាប់ត្រូវចងចាំ (Key Takeaways)៖</span>
                      </div>
                      <ul className="space-y-2 pl-1">
                        {lesson.keyPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-2 text-slate-800 ${
                              fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                            }`}
                          >
                            <span className="text-emerald-600 font-bold mt-0.5">•</span>
                            <div className="flex-1">
                              <MathFormattedText text={point} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 5. Real-World Applications & Practical Proof */}
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Lightbulb className="w-4.5 h-4.5 text-amber-600" />
                        <span>អំណះអំណាង និងការអនុវត្តក្នុងជីវិតជាក់ស្ដែង (Real-World Application)៖</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-1">
                        <MathFormattedText text={realApp} />
                      </p>
                    </div>

                    {/* 6. Common Pitfalls & Exam Traps */}
                    <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/90 space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 font-bold text-rose-900">
                        <AlertTriangle className="w-4.5 h-4.5 text-rose-600" />
                        <span>កំហុសឆ្គងដែលសិស្សជួបប្រទះញឹកញាប់ក្នុងប្រឡង (Exam Traps to Avoid)៖</span>
                      </div>
                      <ul className="space-y-1.5 pl-1">
                        {pitfalls.map((pit, pidx) => (
                          <li key={pidx} className="flex items-start gap-2 text-rose-950">
                            <span className="text-rose-600 font-bold mt-0.5">•</span>
                            <div className="flex-1">
                              <MathFormattedText text={pit} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 7. Interactive Micro Practice Self-Check */}
                    <div className="p-4.5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-white border border-amber-200/90 space-y-3 text-xs sm:text-sm">
                      <div className="flex items-center justify-between gap-2 font-bold text-amber-950">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-4.5 h-4.5 text-amber-600" />
                          <span>អនុវត្តលំហាត់សាកល្បងសមត្ថភាព (Interactive Quick Quiz)</span>
                        </span>
                        <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                          តេស្តភ្លាមៗ
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-amber-200/80 font-bold text-slate-900 shadow-2xs">
                        <MathFormattedText text={quiz.questionText} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {quiz.options.map((opt, oidx) => {
                          const selected = practiceAnswers[lesson.id] === oidx;
                          const isCorrect = oidx === quiz.correctIndex;
                          const answered = practiceAnswers[lesson.id] !== undefined;

                          let btnStyle = "bg-white hover:bg-amber-100/80 border-slate-200 text-slate-800";
                          if (answered) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs";
                            } else if (selected) {
                              btnStyle = "bg-rose-600 text-white border-rose-600 font-bold shadow-xs";
                            } else {
                              btnStyle = "bg-slate-100 text-slate-400 border-slate-200";
                            }
                          }

                          return (
                            <button
                              key={oidx}
                              onClick={() => setPracticeAnswers((prev) => ({ ...prev, [lesson.id]: oidx }))}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer text-xs font-semibold flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span><MathFormattedText text={opt} /></span>
                              {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {practiceAnswers[lesson.id] !== undefined && (
                        <div className="p-3 rounded-xl bg-white border border-amber-300 text-xs text-slate-800 leading-relaxed animate-fade-in shadow-2xs">
                          <span className="font-bold text-amber-900">💡 ការបកស្រាយ៖ </span>
                          <MathFormattedText text={quiz.explanation} />
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


