import React, { useState, useRef, useMemo, useEffect } from 'react';
import { LessonSummary, Subject, Question } from '../types';
import {
  BookOpen,
  Sparkles,
  Volume2,
  CheckCircle2,
  Search,
  Type,
  Lightbulb,
  AlertTriangle,
  Zap,
  ArrowLeft,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';
import { MathAIQuestionTutorModal } from './MathAIQuestionTutorModal';
import { configureKhmerFemaleVoice } from '../utils/audioSynthesizer';

interface LessonSummaryViewerProps {
  subject: Subject;
  lessons: LessonSummary[];
  onBack: () => void;
}

export interface SubModuleCategory {
  id: string;
  title: string;
  titleKhmer: string;
  subtitle: string;
  icon: string;
  badgeBg: string;
  activeBorder: string;
  cardGradient: string;
  filterFn: (lesson: LessonSummary) => boolean;
}

const SummaryTab: React.FC<{
  currentLesson: LessonSummary;
  fontSize: 'normal' | 'large';
  getRealWorldApp: (lesson: LessonSummary) => string;
}> = ({ currentLesson, fontSize, getRealWorldApp }) => (
  <div className="space-y-4 animate-fade-in" id="summary-tab-content">
    <div className="space-y-2">
      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        ខ្លឹមសារមេរៀនសង្ខេប
      </span>
      <div className={`p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 text-slate-800 leading-relaxed font-sans ${
        fontSize === 'large' ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
      }`}>
        <MathFormattedText text={currentLesson.content} />
      </div>
    </div>

    {currentLesson.formulaCard && (
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3 shadow-3xs border border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {currentLesson.formulaCard.title}
          </span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-mono border border-slate-700">
            រូបមន្តគ្រឹះ
          </span>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm">
          <MathFormattedText text={currentLesson.formulaCard.content} />
        </div>
        {currentLesson.formulaCard.example && (
          <div className="text-[11px] sm:text-xs text-slate-300 pl-1 border-l-2 border-amber-500/50">
            💡 <span className="font-bold text-amber-300">ឧទាហរណ៍៖</span>{' '}
            <MathFormattedText text={currentLesson.formulaCard.example} />
          </div>
        )}
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2.5">
        <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ចំណុចគន្លឹះត្រូវចងចាំ
        </span>
        <ul className="space-y-1.5 pl-0.5">
          {currentLesson.keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-relaxed">
              <span className="text-emerald-600 font-bold">•</span>
              <div className="flex-1">
                <MathFormattedText text={point} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50/30 border border-amber-100 space-y-2">
        <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
          ការអនុវត្តក្នុងជីវិតពិត
        </span>
        <p className="text-xs text-slate-600 leading-relaxed">
          <MathFormattedText text={getRealWorldApp(currentLesson)} />
        </p>
      </div>
    </div>
  </div>
);

const ExampleTab: React.FC<{
  currentLesson: LessonSummary;
  getStepByStepExample: (lesson: LessonSummary) => any;
}> = ({ currentLesson, getStepByStepExample }) => {
  const stepEx = getStepByStepExample(currentLesson);
  return (
    <div className="space-y-4 animate-fade-in" id="example-tab-content">
      <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
          វិភាគប្រធានលំហាត់គំរូ
        </span>
        <div className="font-bold text-xs sm:text-sm text-slate-800 leading-relaxed">
          <MathFormattedText text={stepEx.problemText} />
        </div>
      </div>

      <div className="space-y-2.5">
        {stepEx.steps.map((st: any) => (
          <div key={st.stepNumber} className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-3xs flex gap-3">
            <span className="w-5.5 h-5.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0">
              {st.stepNumber}
            </span>
            <div className="space-y-0.5 flex-1 min-w-0">
              <h4 className="font-bold text-xs text-slate-800">{st.title}</h4>
              <div className="text-xs text-slate-600 leading-relaxed pt-0.5">
                <MathFormattedText text={st.detail} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-between gap-3 shadow-3xs">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          ចម្លើយចុងក្រោយ៖
        </span>
        <span className="bg-emerald-950/40 px-2.5 py-1 rounded text-amber-200 font-mono">
          <MathFormattedText text={stepEx.finalAnswer} />
        </span>
      </div>
    </div>
  );
};

const QuizTab: React.FC<{
  currentLesson: LessonSummary;
  getCommonPitfalls: (lesson: LessonSummary) => string[];
  getQuickPractice: (lesson: LessonSummary) => any;
  practiceAnswers: Record<string, number>;
  setPracticeAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}> = ({ currentLesson, getCommonPitfalls, getQuickPractice, practiceAnswers, setPracticeAnswers }) => {
  const pitfalls = getCommonPitfalls(currentLesson);
  const quiz = getQuickPractice(currentLesson);
  return (
    <div className="space-y-5 animate-fade-in" id="quiz-tab-content">
      <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2">
        <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          ចំណុចប្រុងប្រយ័ត្នក្នុងការប្រឡង (Exam Traps)
        </span>
        <ul className="space-y-1 pl-0.5">
          {pitfalls.map((pit, pidx) => (
            <li key={pidx} className="flex items-start gap-1.5 text-xs text-rose-950 leading-relaxed">
              <span className="text-rose-500 font-bold">•</span>
              <div className="flex-1">
                <MathFormattedText text={pit} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-amber-50/30 border border-amber-200 p-4 rounded-xl space-y-3 shadow-3xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600" />
            សំណួរគន្លឹះអនុវត្តភ្លាមៗ
          </span>
          <span className="text-[9px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
            QUIZ
          </span>
        </div>

        <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs font-bold text-slate-800 leading-relaxed">
          <MathFormattedText text={quiz.questionText} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quiz.options.map((opt: string, oidx: number) => {
            const selected = practiceAnswers[currentLesson.id] === oidx;
            const isCorrect = oidx === quiz.correctIndex;
            const answered = practiceAnswers[currentLesson.id] !== undefined;

            let btnStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-800";
            if (answered) {
              if (isCorrect) {
                btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
              } else if (selected) {
                btnStyle = "bg-rose-600 text-white border-rose-600 font-bold";
              } else {
                btnStyle = "bg-slate-50 text-slate-400 border-slate-100";
              }
            }

            return (
              <button
                key={oidx}
                onClick={() => setPracticeAnswers((prev) => ({ ...prev, [currentLesson.id]: oidx }))}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer text-xs flex items-center justify-between gap-2 ${btnStyle}`}
              >
                <span><MathFormattedText text={opt} /></span>
                {answered && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
              </button>
            );
          })}
        </div>

        {practiceAnswers[currentLesson.id] !== undefined && (
          <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs text-slate-700 leading-relaxed animate-fade-in shadow-3xs">
            <span className="font-bold text-amber-900">💡 ពន្យល់៖ </span>
            <MathFormattedText text={quiz.explanation} />
          </div>
        )}
      </div>
    </div>
  );
};

export const LessonSummaryViewer: React.FC<LessonSummaryViewerProps> = ({
  subject,
  lessons,
  onBack
}) => {
  const [selectedSubModuleId, setSelectedSubModuleId] = useState<string>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [readingId, setReadingId] = useState<string | null>(null);
  const [ttsState, setTtsState] = useState<'playing' | 'paused' | 'stopped'>('stopped');
  const [isTtsTroubleOpen, setIsTtsTroubleOpen] = useState(false);
  const [aiTutorLesson, setAiTutorLesson] = useState<LessonSummary | null>(null);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [mobileViewState, setMobileViewState] = useState<'list' | 'reader'>('list');
  const [readerTab, setReaderTab] = useState<'summary' | 'example' | 'quiz'>('summary');

  // Reset active tab to summary when selected lesson changes
  useEffect(() => {
    setReaderTab('summary');
  }, [selectedLessonId]);

  // Gemini TTS states & references
  const [useGeminiTts] = useState<boolean>(true);
  const [selectedGeminiVoice, setSelectedGeminiVoice] = useState<'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr'>('Kore');
  const [isTtsLoading, setIsTtsLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Define sub-modules based on subject ID
  const subModules = useMemo<SubModuleCategory[]>(() => {
    const sId = subject.id;

    if (sId === 'khmer') {
      return [
        {
          id: 'all',
          title: 'ទាំងអស់',
          titleKhmer: 'កម្រងមេរៀនភាសាខ្មែរទាំងអស់',
          subtitle: `មេរៀនសង្ខេបភាសាខ្មែរទាំង ${lessons.length} មេរៀន`,
          icon: '📚',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          activeBorder: 'border-blue-600 ring-2 ring-blue-500/30',
          cardGradient: 'from-slate-800 via-blue-950 to-slate-900',
          filterFn: () => true
        },
        {
          id: 'khmer-listening',
          title: '១. អត្ថបទស្តាប់',
          titleKhmer: 'អត្ថបទស្តាប់ & ការយល់ដឹង',
          subtitle: 'អត្ថបទស្តាប់ កំណាព្យ និងរឿងនិទានអប់រំ',
          icon: '🎧',
          badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
          activeBorder: 'border-sky-500 ring-2 ring-sky-500/30',
          cardGradient: 'from-sky-600 via-blue-600 to-indigo-700',
          filterFn: (l) =>
            l.id.includes('listen') ||
            l.title.includes('ស្តាប់') ||
            l.chapter.includes('ស្តាប់') ||
            l.title.includes('អត្ថបទ') ||
            l.title.includes('កំណាព្យ')
        },
        {
          id: 'khmer-grammar',
          title: '២. វេយ្យាករណ៍ខ្មែរ',
          titleKhmer: 'វេយ្យាករណ៍ & អក្ខរាវិរុទ្ធ',
          subtitle: 'ស្រៈ ព្យញ្ជនៈ ថ្នាក់ពាក្យ ល្បះ និងវណ្ណយុត្តិ',
          icon: '📖',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
          cardGradient: 'from-emerald-600 via-teal-700 to-slate-900',
          filterFn: (l) =>
            l.id.includes('gram') ||
            l.title.includes('វេយ្យាករណ៍') ||
            l.title.includes('ស្រៈ') ||
            l.title.includes('ព្យញ្ជនៈ') ||
            l.title.includes('ល្បះ') ||
            l.title.includes('ថ្នាក់ពាក្យ') ||
            l.title.includes('វណ្ណយុត្តិ')
        },
        {
          id: 'khmer-essay',
          title: '៣. វិធីសាស្ត្រតែងសេចក្តី',
          titleKhmer: 'វិធីសាស្ត្រតែងសេចក្តី & សំណេរ',
          subtitle: 'គោលការណ៍ រចនាសម្ព័ន្ធ ៣ផ្នែក និងការពណ៌នា',
          icon: '✍️',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          activeBorder: 'border-amber-500 ring-2 ring-amber-500/30',
          cardGradient: 'from-amber-600 via-orange-600 to-rose-700',
          filterFn: (l) =>
            l.id.includes('essay') ||
            l.title.includes('តែងសេចក្តី') ||
            l.title.includes('សំណេរ') ||
            l.title.includes('ពណ៌នា')
        },
        {
          id: 'khmer-vocab',
          title: '៤. បទានុក្រមពាក្យពិបាក',
          titleKhmer: 'បទានុក្រម & បច្នានុក្រម',
          subtitle: 'បច្នានុក្រមពាក្យពិបាក អត្ថន័យ និងថ្នាក់ពាក្យ',
          icon: '📜',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
          activeBorder: 'border-purple-500 ring-2 ring-purple-500/30',
          cardGradient: 'from-purple-600 via-violet-700 to-indigo-900',
          filterFn: (l) =>
            l.id.includes('vocab') ||
            l.title.includes('បទានុក្រម') ||
            l.title.includes('ពាក្យ') ||
            l.title.includes('បច្នានុក្រម')
        }
      ];
    }

    if (subject.id === 'math') {
      return [
        {
          id: 'all',
          title: 'ទាំងអស់',
          titleKhmer: 'កម្រងមេរៀនគណិតវិទ្យាទាំងអស់',
          subtitle: `មេរៀនសង្ខេបគណិតវិទ្យាទាំង ${lessons.length} មេរៀន`,
          icon: '🔢',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          activeBorder: 'border-emerald-600 ring-2 ring-emerald-500/30',
          cardGradient: 'from-emerald-800 via-teal-900 to-slate-900',
          filterFn: () => true
        },
        {
          id: 'math-numbers',
          title: '១. ចំនួន & ប្រមាណវិធី',
          titleKhmer: 'ចំនួនគត់ & ប្រមាណវិធី',
          subtitle: 'តម្លៃលេខតាមខ្ទង់ ការបង្គត់ និងប្រមាណវិធី៤',
          icon: '🧮',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
          cardGradient: 'from-emerald-600 via-teal-600 to-emerald-800',
          filterFn: (l) =>
            l.title.includes('ចំនួន') ||
            l.title.includes('វិធី') ||
            l.id === 'math-1' ||
            l.id === 'math-2' ||
            l.id === 'math-3'
        },
        {
          id: 'math-fractions',
          title: '២. ប្រភាគ & ទសភាគ',
          titleKhmer: 'ប្រភាគ, ទសភាគ & ភាគរយ',
          subtitle: 'ប្រមាណវិធីលើប្រភាគ ចំនួនទសភាគ និងភាគរយ',
          icon: '🍕',
          badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-200',
          activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/30',
          cardGradient: 'from-cyan-600 via-teal-700 to-blue-800',
          filterFn: (l) =>
            l.title.includes('ប្រភាគ') ||
            l.title.includes('ទសភាគ') ||
            l.title.includes('ភាគរយ')
        },
        {
          id: 'math-geometry',
          title: '៣. ធរណីមាត្រ & សំណង់',
          titleKhmer: 'ធរណីមាត្រ, រង្វាស់ & សំណង់',
          subtitle: 'មុំ ផ្ទៃក្រឡា បរិមាត្រ និងរូបធរណីមាត្រ',
          icon: '📐',
          badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
          activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/30',
          cardGradient: 'from-indigo-600 via-blue-700 to-slate-900',
          filterFn: (l) =>
            l.title.includes('មុំ') ||
            l.title.includes('ផ្ទៃ') ||
            l.title.includes('បរិមាត្រ') ||
            l.title.includes('រង្វង់') ||
            l.title.includes('សំណង់')
        },
        {
          id: 'math-algebra',
          title: '៤. អក្សរ & សមីការ',
          titleKhmer: 'ពីជគណិត & សមីការ',
          subtitle: 'ការជំនួសលេខដោយអក្សរ និងសមីការ',
          icon: '⚡',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          activeBorder: 'border-amber-500 ring-2 ring-amber-500/30',
          cardGradient: 'from-amber-600 via-orange-600 to-rose-700',
          filterFn: (l) =>
            l.title.includes('អក្សរ') ||
            l.title.includes('សមីការ') ||
            l.title.includes('សមាមាត្រ') ||
            l.title.includes('ស្ថិតិ')
        }
      ];
    }

    // Default science categories
    return [
      {
        id: 'all',
        title: 'ទាំងអស់',
        titleKhmer: 'កម្រងមេរៀនវិទ្យាសាស្ត្រទាំងអស់',
        subtitle: `មេរៀនសង្ខេបវិទ្យាសាស្ត្រទាំង ${lessons.length} មេរៀន`,
        icon: '🔬',
        badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
        activeBorder: 'border-sky-600 ring-2 ring-sky-500/30',
        cardGradient: 'from-sky-900 via-slate-900 to-teal-950',
        filterFn: () => true
      },
      {
        id: 'science-bio',
        title: '១. រុក្ខជាតិ & សត្វ',
        titleKhmer: 'ជីវវិទ្យារុក្ខជាតិ និងសត្វ',
        subtitle: 'ការលូតលាស់ រស្មីសំយោគ និងការបន្តពូជ',
        icon: '🌿',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
        cardGradient: 'from-emerald-600 via-teal-700 to-slate-900',
        filterFn: (l) =>
          l.title.includes('រុក្ខជាតិ') ||
          l.title.includes('សត្វ') ||
          l.content.includes('រុក្ខជាតិ')
      },
      {
        id: 'science-env',
        title: '២. បរិស្ថាន & ធនធាន',
        titleKhmer: 'បរិស្ថាន និងធនធានធម្មជាតិ',
        subtitle: 'ប្រព័ន្ធអេកូឡូស៊ី រ៉ែ ទឹក និងខ្យល់',
        icon: '🌍',
        badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
        activeBorder: 'border-sky-500 ring-2 ring-sky-500/30',
        cardGradient: 'from-sky-600 via-blue-700 to-indigo-800',
        filterFn: (l) =>
          l.title.includes('បរិស្ថាន') ||
          l.title.includes('រ៉ែ') ||
          l.title.includes('ជលផល') ||
          l.title.includes('ធម្មជាតិ')
      },
      {
        id: 'science-human',
        title: '៣. មនុស្ស & សុខភាព',
        titleKhmer: 'សរីរាង្គមនុស្ស និងសុខភាព',
        subtitle: 'ប្រព័ន្ធរំលាយអាហារ ចរន្តឈាម និងជំងឺ',
        icon: '🧬',
        badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
        activeBorder: 'border-rose-500 ring-2 ring-rose-500/30',
        cardGradient: 'from-rose-600 via-pink-700 to-purple-900',
        filterFn: (l) =>
          l.title.includes('មនុស្ស') ||
          l.title.includes('ជំងឺ') ||
          l.title.includes('សរីរាង្គ')
      },
      {
        id: 'science-physics',
        title: '៤. រូបធាតុ & ម៉ាស៊ីន',
        titleKhmer: 'រូបធាតុ, ថាមពល & ម៉ាស៊ីន',
        subtitle: 'ម៉ាស៊ីនងាយ អគ្គិសនី និងពន្លឺ',
        icon: '⚡',
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
        activeBorder: 'border-amber-500 ring-2 ring-amber-500/30',
        cardGradient: 'from-amber-600 via-orange-600 to-slate-900',
        filterFn: (l) =>
          l.title.includes('ម៉ាស៊ីន') ||
          l.title.includes('អគ្គិសនី') ||
          l.title.includes('ថាមពល') ||
          l.title.includes('រូបធាតុ')
      }
    ];
  }, [subject.id, lessons.length]);

  const activeSubModule = useMemo(() => {
    return subModules.find((sub) => sub.id === selectedSubModuleId) || subModules[0];
  }, [subModules, selectedSubModuleId]);

  // Combined Filtering: Submodule category + Search query
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesCategory = activeSubModule.filterFn(lesson);
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        lesson.title.toLowerCase().includes(query) ||
        lesson.content.toLowerCase().includes(query) ||
        lesson.chapter.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [lessons, activeSubModule, searchQuery]);

  // Ensure selectedLessonId belongs to filteredLessons
  const currentLessonIndex = filteredLessons.findIndex((l) => l.id === selectedLessonId);
  const currentLesson = filteredLessons[currentLessonIndex] || filteredLessons[0] || lessons[0];

  const handleReadLesson = async (lesson: LessonSummary, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (!useGeminiTts) {
      // Browser SpeechSynthesis Mode (Native fallback)
      if (!('speechSynthesis' in window)) {
        alert('សូមអភ័យទោស! កម្មវិធីរុករក (Browser) របស់អ្នកមិនគាំទ្រការអានសំឡេងឡើយ។');
        return;
      }

      if (readingId === lesson.id) {
        if (ttsState === 'playing') {
          window.speechSynthesis.pause();
          setTtsState('paused');
        } else if (ttsState === 'paused') {
          window.speechSynthesis.resume();
          setTtsState('playing');
        } else {
          window.speechSynthesis.cancel();
          setReadingId(null);
          setTtsState('stopped');
        }
        return;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const readText = `${lesson.title}។ ${lesson.content}។ ចំណុចសំខាន់ៗ៖ ${lesson.keyPoints.join(', ')}។`;
      const utterance = new SpeechSynthesisUtterance(readText);
      
      configureKhmerFemaleVoice(utterance);

      utterance.onstart = () => {
        setReadingId(lesson.id);
        setTtsState('playing');
      };
      utterance.onpause = () => {
        setTtsState('paused');
      };
      utterance.onresume = () => {
        setTtsState('playing');
      };
      utterance.onend = () => {
        setReadingId(null);
        setTtsState('stopped');
      };
      utterance.onerror = (evt) => {
        console.warn('Speech synthesis error:', evt);
        setReadingId(null);
        setTtsState('stopped');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Gemini AI TTS Mode (Full-stack Server proxy)
      if (readingId === lesson.id) {
        if (audioRef.current) {
          if (ttsState === 'playing') {
            audioRef.current.pause();
            setTtsState('paused');
          } else if (ttsState === 'paused') {
            audioRef.current.play().catch(err => console.error("Playback failed", err));
            setTtsState('playing');
          } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setReadingId(null);
            setTtsState('stopped');
          }
        }
        return;
      }

      // Stop any existing playback
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      setIsTtsLoading(true);
      setReadingId(lesson.id);
      setTtsState('stopped');

      try {
        const readText = `${lesson.title}។ ${lesson.content}។ ចំណុចសំខាន់ៗ៖ ${lesson.keyPoints.join(', ')}។`;
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: readText,
            voice: selectedGeminiVoice,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to generate audio from Gemini");
        }

        const data = await res.json();
        if (!data.audio) {
          throw new Error("No audio data returned from Gemini");
        }

        const mimeType = data.mimeType || "audio/mp3";
        const audioUrl = `data:${mimeType};base64,${data.audio}`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.addEventListener("canplaythrough", () => {
          setIsTtsLoading(false);
          setTtsState('playing');
          audio.play().catch(err => {
            console.error("Autoplay failed:", err);
            setTtsState('paused');
          });
        });

        audio.addEventListener("ended", () => {
          setReadingId(null);
          setTtsState('stopped');
        });

        audio.addEventListener("pause", () => {
          if (audio.currentTime !== audio.duration) {
            setTtsState('paused');
          }
        });

        audio.addEventListener("play", () => {
          setTtsState('playing');
        });

        audio.addEventListener("error", (e) => {
          const mediaError = audio.error;
          console.error("Audio playback error:", mediaError ? { code: mediaError.code, message: mediaError.message } : e);
          setIsTtsLoading(false);
          setReadingId(null);
          setTtsState('stopped');
          alert(`សូមអភ័យទោស! មានកំហុសក្នុងការលេងសំឡេង៖ ${mediaError ? mediaError.message : 'មិនស្គាល់'}`);
        });

      } catch (err: any) {
        console.error("Gemini TTS Error:", err);
        setIsTtsLoading(false);
        setReadingId(null);
        setTtsState('stopped');
        alert(`សូមអភ័យទោស! មិនអាចទាញយកសំឡេងអានបានទេ៖ ${err.message || err}`);
      }
    }
  };

  const getStepByStepExample = (lesson: LessonSummary) => {
    if (lesson.stepByStepExample) return lesson.stepByStepExample;
    return {
      problemText: `លំហាត់គំរូ និងវិធីវិភាគប្រធាន៖ ${lesson.title}`,
      steps: [
        {
          stepNumber: 1,
          title: 'អានប្រធាន និងកំណត់ចំណុចគន្លឹះ',
          detail: 'បំបែកប្រធានលំហាត់ជាផ្នែកតូចៗ រួចរកចំណុចដែលសួររក'
        },
        {
          stepNumber: 2,
          title: 'ប្រើប្រាស់វិធាន និងច្បាប់នៃមេរៀន',
          detail: lesson.keyPoints[0] || 'អនុវត្តតាមវិធានដែលបានរៀនក្នុងមេរៀននេះ'
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
    if (lesson.subjectId === 'khmer') {
      return 'ជួយពង្រឹងជំនាញអាន សរសេរ អក្ខរាវិរុទ្ធខ្មែរបានត្រឹមត្រូវ និងការទាក់ទងគ្នាក្នុងជីវិតរស់នៅប្រចាំថ្ងៃប្រកបដោយសេចក្តីថ្លៃថ្នូរ។';
    }
    return 'ជួយពង្រឹងចំណេះដឹងទូទៅ ការគិតបែបហេតុផល និងជំនាញដោះស្រាយបញ្ហាក្នុងជីវិតរស់នៅជាក់ស្ដែង។';
  };

  const getCommonPitfalls = (lesson: LessonSummary) => {
    if (lesson.commonPitfalls && lesson.commonPitfalls.length > 0) return lesson.commonPitfalls;
    return [
      'ការច្រឡំសញ្ញា និងការភ្លេចប្តូរឯកតា ឬការសរសេរខុសអក្ខរាវិរុទ្ធ',
      'ការមិនបានតម្រៀបខ្ទង់ ឬសញ្ញចុចទសភាគឲ្យត្រង់ជួរគ្នាមុនធ្វើប្រមាណវិធី',
      'ការច្រឡំបទបញ្ជា និងរូបមន្ត ឬរចនាសម្ព័ន្ធសំណេរ'
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

  // Convert current lesson into AI Tutor question format if opened
  const dummyQuestionForLesson: Question | null = aiTutorLesson ? {
    id: aiTutorLesson.id,
    subjectId: aiTutorLesson.subjectId,
    category: aiTutorLesson.chapter,
    text: `មេរៀន៖ ${aiTutorLesson.title}\n\nខ្លឹមសារសង្ខេប៖ ${aiTutorLesson.content}`,
    options: aiTutorLesson.keyPoints.slice(0, 4),
    correctAnswerIndex: 0,
    explanation: `ចំណុចសំខាន់ៗនៃមេរៀន៖ ${aiTutorLesson.keyPoints.join('; ')}`
  } : null;

  return (
    <div className="max-w-7xl mx-auto py-4 px-3 sm:px-6 space-y-5">
      {/* 1. Header controls (Always visible) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (mobileViewState === 'reader') {
                setMobileViewState('list');
              } else {
                onBack();
              }
            }}
            className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            id="btn-back-from-lessons"
          >
            ← ត្រឡប់
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>កម្រងមេរៀនសង្ខេប {subject.nameKhmer || subject.name}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              សរុប {lessons.length} មេរៀន • ជ្រើសរើសដើម្បីសិក្សា
            </p>
          </div>
        </div>

        {/* Font Size Toggle */}
        <button
          onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          title="ផ្លាស់ប្តូរទំហំអក្សរ"
        >
          <Type className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">{fontSize === 'normal' ? 'អក្សរធំ' : 'អក្សរធម្មតា'}</span>
        </button>
      </div>

      {/* 2. Main Workspace (Split Pane) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[600px]">
        
        {/* LEFT PANEL: LESSON BROWSER */}
        <div className={`lg:col-span-4 flex flex-col gap-4 ${mobileViewState === 'reader' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Sub-module filters */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
              ផ្នែកមេរៀន (Categories)
            </span>
            <div className="flex lg:flex-wrap gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
              {subModules.map((sub) => {
                const isSelected = selectedSubModuleId === sub.id;
                const count = lessons.filter(sub.filterFn).length;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubModuleId(sub.id);
                      const matching = lessons.filter(sub.filterFn);
                      if (matching[0]) {
                        setSelectedLessonId(matching[0].id);
                      }
                      setMobileViewState('list');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.title}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & List */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3 flex-1 flex flex-col min-h-[400px]">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ស្វែងរកមេរៀន..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2 px-1">
              <span>បញ្ជីមេរៀន ({filteredLessons.length})</span>
            </div>

            <div className="space-y-1.5 overflow-y-auto max-h-[500px] lg:max-h-[600px] pr-1 scrollbar-thin">
              {filteredLessons.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  រកមិនឃើញមេរៀនដែលត្រូវនឹងការស្វែងរកទេ
                </div>
              ) : (
                filteredLessons.map((lesson, idx) => {
                  const isSelected = lesson.id === (currentLesson?.id || selectedLessonId);
                  const hasFormula = Boolean(lesson.formulaCard);
                  
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLessonId(lesson.id);
                        setMobileViewState('reader');
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1 select-none text-left ${
                        isSelected
                          ? 'bg-emerald-50/90 border-emerald-500 ring-1 ring-emerald-500 text-emerald-950 font-medium'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          មេរៀនទី {idx + 1}
                        </span>
                        {hasFormula && (
                          <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                            ⚡ រូបមន្ត
                          </span>
                        )}
                      </div>
                      <h3 className={`text-xs font-bold leading-snug line-clamp-1 mt-1 ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                        {lesson.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1 leading-normal">
                        {lesson.chapter}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: ACTIVE LESSON DETAIL READER */}
        <div className={`lg:col-span-8 flex flex-col gap-4 ${mobileViewState === 'list' ? 'hidden lg:flex' : 'flex'}`}>
          {currentLesson ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 flex flex-col gap-5 min-h-[550px]">
              
              {/* Mobile Back Button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setMobileViewState('list')}
                  className="py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  ← ត្រឡប់ទៅបញ្ជីមេរៀន
                </button>
              </div>

              {/* Reader Header */}
              <div className="pb-4 border-b border-slate-100 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 text-[10px] sm:text-xs font-bold mb-1.5 border border-emerald-200">
                      {currentLesson.chapter}
                    </span>
                    <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                      <MathFormattedText text={currentLesson.title} />
                    </h1>
                  </div>

                  <button
                    onClick={() => setAiTutorLesson(currentLesson)}
                    className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                    <span>សួរគ្រូ AI</span>
                  </button>
                </div>

                {/* Integrated Media Player Audio Reader Widget */}
                <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-3xs">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-3xs shrink-0 ${readingId === currentLesson.id && ttsState === 'playing' ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                      {readingId === currentLesson.id && ttsState === 'playing' ? '🎙️' : '🔊'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">ស្ដាប់សំឡេងអានមេរៀន</h4>
                      <p className="text-[10px] text-slate-500">
                        {isTtsLoading ? 'កំពុងទាញយកសំឡេងពី AI...' : readingId === currentLesson.id ? 'កំពុងចាក់សំឡេងស្រីខ្មែរពីរោះស្រទន់' : 'អានដោយសំឡេងបញ្ញាសិប្បនិម្មិត Gemini AI'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {/* Voice selector */}
                    <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/80 mr-1.5">
                      <select
                        value={selectedGeminiVoice}
                        onChange={(e) => setSelectedGeminiVoice(e.target.value as any)}
                        className="text-[11px] font-bold text-emerald-800 bg-transparent focus:outline-none cursor-pointer border-none py-0.5 px-1 pr-4"
                        title="ជ្រើសរើសសំឡេង AI"
                      >
                        <option value="Kore">ស្រី (Kore)</option>
                        <option value="Puck">ប្រុស (Puck)</option>
                        <option value="Charon">ប្រុស (Charon)</option>
                        <option value="Fenrir">ប្រុស (Fenrir)</option>
                        <option value="Zephyr">ប្រុស (Zephyr)</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleReadLesson(currentLesson)}
                      disabled={isTtsLoading}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-3xs ${
                        readingId === currentLesson.id
                          ? 'bg-amber-400 text-amber-950 hover:bg-amber-500'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isTtsLoading ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>ទាញយក...</span>
                        </>
                      ) : readingId === currentLesson.id ? (
                        <>
                          <span>{ttsState === 'playing' ? '⏸️ ផ្អាក' : '▶️ បន្ត'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>ស្ដាប់សំឡេង</span>
                        </>
                      )}
                    </button>

                    {readingId === currentLesson.id && (
                      <button
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                          }
                          if ('speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                          }
                          setReadingId(null);
                          setTtsState('stopped');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 cursor-pointer flex items-center gap-0.5"
                      >
                        ⏹️ បញ្ឈប់
                      </button>
                    )}

                    <button
                      onClick={() => setIsTtsTroubleOpen(true)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs cursor-pointer"
                      title="គ្មានសំឡេង?"
                    >
                      ❓
                    </button>
                  </div>
                </div>
              </div>

              {/* Reader Tab Navigation */}
              <div className="flex border-b border-slate-100 p-0.5 bg-slate-50 rounded-xl">
                <button
                  onClick={() => setReaderTab('summary')}
                  className={`flex-1 py-2 px-1 text-center rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    readerTab === 'summary'
                      ? 'bg-white text-emerald-800 shadow-3xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ខ្លឹមសារមេរៀន</span>
                </button>

                <button
                  onClick={() => setReaderTab('example')}
                  className={`flex-1 py-2 px-1 text-center rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    readerTab === 'example'
                      ? 'bg-white text-emerald-800 shadow-3xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>លំហាត់គំរូ</span>
                </button>

                <button
                  onClick={() => setReaderTab('quiz')}
                  className={`flex-1 py-2 px-1 text-center rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    readerTab === 'quiz'
                      ? 'bg-white text-emerald-800 shadow-3xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>លំហាត់អនុវត្ត</span>
                </button>
              </div>

              {/* Reader Body Content */}
              <div className="flex-1">
                {readerTab === 'summary' && (
                  <SummaryTab
                    currentLesson={currentLesson}
                    fontSize={fontSize}
                    getRealWorldApp={getRealWorldApp}
                  />
                )}

                {readerTab === 'example' && (
                  <ExampleTab
                    currentLesson={currentLesson}
                    getStepByStepExample={getStepByStepExample}
                  />
                )}

                {readerTab === 'quiz' && (
                  <QuizTab
                    currentLesson={currentLesson}
                    getCommonPitfalls={getCommonPitfalls}
                    getQuickPractice={getQuickPractice}
                    practiceAnswers={practiceAnswers}
                    setPracticeAnswers={setPracticeAnswers}
                  />
                )}
              </div>

              {/* Bottom Lesson Reader Footer */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => {
                    if (currentLessonIndex > 0) {
                      setSelectedLessonId(filteredLessons[currentLessonIndex - 1].id);
                    }
                  }}
                  disabled={currentLessonIndex <= 0}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold flex items-center gap-1 cursor-pointer transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>មេរៀនមុន</span>
                </button>

                <span className="font-bold text-slate-400">
                  មេរៀន {currentLessonIndex + 1} / {filteredLessons.length}
                </span>

                <button
                  onClick={() => {
                    if (currentLessonIndex < filteredLessons.length - 1) {
                      setSelectedLessonId(filteredLessons[currentLessonIndex + 1].id);
                    }
                  }}
                  disabled={currentLessonIndex >= filteredLessons.length - 1}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold flex items-center gap-1 cursor-pointer transition-all shadow-3xs"
                >
                  <span>មេរៀនបន្ទាប់</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-10 flex flex-col items-center justify-center text-slate-400 text-xs sm:text-sm">
              <BookOpen className="w-10 h-10 text-slate-200 mb-2" />
              <span>សូមជ្រើសរើសមេរៀនដើម្បីចាប់ផ្តើមសិក្សា</span>
            </div>
          )}
        </div>

      </div>

      {/* AI Tutor Modal */}
      {dummyQuestionForLesson && (
        <MathAIQuestionTutorModal
          isOpen={Boolean(aiTutorLesson)}
          onClose={() => setAiTutorLesson(null)}
          question={dummyQuestionForLesson}
          questionIndex={0}
        />
      )}

      {/* TTS Troubleshooting Modal */}
      {isTtsTroubleOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-xl overflow-hidden border border-slate-200 animate-scale-in">
            <div className="p-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔊</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base font-moul leading-none">ជំនួយ៖ ប្រសិនបើគ្មានសំឡេងចេញ</h3>
                  <p className="text-[10px] text-amber-100 mt-1 font-medium">របៀបដោះស្រាយបញ្ហាអានសំឡេងខ្សឹប ឬស្ងាត់</p>
                </div>
              </div>
              <button
                onClick={() => setIsTtsTroubleOpen(false)}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                មុខងារអានមេរៀននេះប្រើប្រាស់ប្រព័ន្ធសំឡេងស្វ័យប្រវត្តិនៃឧបករណ៍របស់អ្នក (Web Speech Synthesis)។ ប្រសិនបើអ្នកមិនឮសំឡេងសោះ ឬឮសំឡេងជាភាសាបរទេស សូមសាកល្បងជំហានងាយៗខាងក្រោម៖
              </p>

              <div className="space-y-3">
                <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    ១
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">ពិនិត្យមើលប៊ូតុងស្ងាត់ (Mute Switch)</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">
                      ចំពោះឧបករណ៍ **iPhone/iPad**៖ សូមពិនិត្យមើលប៊ូតុងចំហៀងឆ្វេង (Silent Switch)។ ប្រសិនបើវាបើកឆ្នូតក្រហម (ស្ងាត់) នោះប្រព័ន្ធនឹងមិនបញ្ចេញសំឡេងអានឡើយ។ សូមបើកវាឡើងវិញ។
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    ២
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">តម្លើងកម្រិតសំឡេងមេឌៀ (Volume)</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">
                      សូមចុចប៊ូតុងតម្លើងសំឡេងឱ្យបានខ្លាំងល្មមស្តាប់បាន ពីព្រោះសំឡេងអានពេលខ្លះស្ថិតក្រោមការគ្រប់គ្រងរបស់កម្រិតសំឡេងមេឌៀ (Media/Music Volume)។
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    ៣
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">ប្រើប្រាស់កម្មវិធី Chrome ឬ Safari</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">
                      មុខងារសំឡេងស្តង់ដារភាសាខ្មែរ ដំណើរការបានល្អឥតខ្ចោះបំផុតនៅលើកម្មវិធី **Google Chrome (Android/PC)** និង **Safari (iOS/Mac)**។
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    ៤
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">ដំឡើងកញ្ចប់ភាសាខ្មែរ (Install Khmer TTS)</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">
                      ប្រសិនបើឮសំឡេងអានអក្សរខ្មែរជាភាសាអង់គ្លេសខុសទំនង ឬអត់សំឡេងសោះ៖ សូមចូលទៅកាន់ Settings ➔ Accessibility ➔ Text-to-Speech នៃទូរស័ព្ទ រួចជ្រើសរើស ឬទាញយក "ភាសាខ្មែរ (Khmer)"។
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsTtsTroubleOpen(false)}
                className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                យល់ព្រម និងបិទផ្ទាំងនេះ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
