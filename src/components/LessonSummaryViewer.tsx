import React, { useState, useRef, useMemo } from 'react';
import { LessonSummary, Subject, Question } from '../types';
import {
  BookOpen,
  Sparkles,
  Volume2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
  Type,
  Lightbulb,
  AlertTriangle,
  Zap,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowLeft,
  ArrowRight,
  Layers,
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

export const LessonSummaryViewer: React.FC<LessonSummaryViewerProps> = ({
  subject,
  lessons,
  onBack
}) => {
  const [selectedSubModuleId, setSelectedSubModuleId] = useState<string>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || '');
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'grid' | 'list'>('horizontal');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [readingId, setReadingId] = useState<string | null>(null);
  const [ttsState, setTtsState] = useState<'playing' | 'paused' | 'stopped'>('stopped');
  const [isTtsTroubleOpen, setIsTtsTroubleOpen] = useState(false);
  const [aiTutorLesson, setAiTutorLesson] = useState<LessonSummary | null>(null);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});

  const [lessonTouchStartX, setLessonTouchStartX] = useState<number | null>(null);
  const [lessonTouchStartY, setLessonTouchStartY] = useState<number | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

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

    if (sId === 'math') {
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

    if (sId === 'science') {
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
    }

    if (sId === 'social') {
      return [
        {
          id: 'all',
          title: 'ទាំងអស់',
          titleKhmer: 'កម្រងមេរៀនសិក្សាសង្គមទាំងអស់',
          subtitle: `មេរៀនសង្ខេបសិក្សាសង្គមទាំង ${lessons.length} មេរៀន`,
          icon: '🏛️',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          activeBorder: 'border-amber-600 ring-2 ring-amber-500/30',
          cardGradient: 'from-amber-900 via-slate-900 to-orange-950',
          filterFn: () => true
        },
        {
          id: 'social-history',
          title: '១. ប្រវត្តិវិទ្យាខ្មែរ',
          titleKhmer: 'ប្រវត្តិសាស្ត្រខ្មែរ',
          subtitle: 'សម័យចតុមុខ លង្វែក និងឧដុង្គ',
          icon: '📜',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          activeBorder: 'border-amber-500 ring-2 ring-amber-500/30',
          cardGradient: 'from-amber-600 via-orange-700 to-amber-900',
          filterFn: (l) =>
            l.title.includes('ប្រវត្តិ') ||
            l.title.includes('ឧដុង្គ') ||
            l.title.includes('លង្វែក') ||
            l.title.includes('ចតុមុខ')
        },
        {
          id: 'social-geo',
          title: '២. ភូមិវិទ្យា & អាស៊ាន',
          titleKhmer: 'ភូមិវិទ្យា និងអាស៊ាន',
          subtitle: 'ភូមិសាស្ត្រកម្ពុជា និងបណ្តាប្រទេសអាស៊ាន',
          icon: '🗺️',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
          cardGradient: 'from-emerald-600 via-teal-700 to-slate-900',
          filterFn: (l) =>
            l.title.includes('ភូមិ') ||
            l.title.includes('អាស៊ាន') ||
            l.title.includes('ទេសចរណ៍')
        },
        {
          id: 'social-ethics',
          title: '៣. សីលធម៌ & ពលរដ្ឋ',
          titleKhmer: 'សីលធម៌ និងពលរដ្ឋវិជ្ជា',
          subtitle: 'ឥរិយាបថល្អ សុវត្ថិភាពចរាចរណ៍ និងសង្គម',
          icon: '🤝',
          badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
          activeBorder: 'border-blue-500 ring-2 ring-blue-500/30',
          cardGradient: 'from-blue-600 via-indigo-700 to-slate-900',
          filterFn: (l) =>
            l.title.includes('សីលធម៌') ||
            l.title.includes('ឥរិយាបថ') ||
            l.title.includes('ចរាចរណ៍') ||
            l.title.includes('តុលាការ')
        }
      ];
    }

    if (sId === 'health') {
      return [
        {
          id: 'all',
          title: 'ទាំងអស់',
          titleKhmer: 'កម្រងមេរៀនសុខភាពទាំងអស់',
          subtitle: `មេរៀនសង្ខេបសុខភាពទាំង ${lessons.length} មេរៀន`,
          icon: '🏥',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          activeBorder: 'border-teal-600 ring-2 ring-teal-500/30',
          cardGradient: 'from-teal-900 via-slate-900 to-emerald-950',
          filterFn: () => true
        },
        {
          id: 'health-primary',
          title: '១. សុខភាពបឋម',
          titleKhmer: 'សុខភាពបឋម & អាហាររូបត្ថម្ភ',
          subtitle: 'អនាម័យខ្លួនប្រាណ និងអាហារមានប្រយោជន៍',
          icon: '🍎',
          badgeBg: 'bg-teal-100 text-teal-900 border-teal-200',
          activeBorder: 'border-teal-500 ring-2 ring-teal-500/30',
          cardGradient: 'from-teal-600 via-emerald-700 to-slate-900',
          filterFn: (l) =>
            l.title.includes('បឋម') ||
            l.title.includes('អាហារ') ||
            l.title.includes('ចំណី')
        },
        {
          id: 'health-mental',
          title: '២. សុខភាពផ្លូវចិត្ត',
          titleKhmer: 'សុខភាពផ្លូវចិត្ត',
          subtitle: 'ការគ្រប់គ្រងអារម្មណ៍ និងការគិតវិជ្ជមាន',
          icon: '🧠',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
          activeBorder: 'border-purple-500 ring-2 ring-purple-500/30',
          cardGradient: 'from-purple-600 via-indigo-700 to-slate-900',
          filterFn: (l) =>
            l.title.includes('ចិត្ត') ||
            l.title.includes('អារម្មណ៍')
        },
        {
          id: 'health-repro',
          title: '៣. សុខភាពបន្តពូជ',
          titleKhmer: 'សុខភាពបន្តពូជ & ផ្លូវភេទ',
          subtitle: 'ការផ្លាស់ប្តូររាងកាយ និងអនាម័យបន្តពូជ',
          icon: '🌺',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
          activeBorder: 'border-rose-500 ring-2 ring-rose-500/30',
          cardGradient: 'from-rose-600 via-pink-700 to-purple-900',
          filterFn: (l) =>
            l.title.includes('បន្តពូជ') ||
            l.title.includes('ភេទ')
        },
        {
          id: 'health-env',
          title: '៤. សង្គ្រោះបឋម',
          titleKhmer: 'សុខភាពបរិស្ថាន & សង្គ្រោះបឋម',
          subtitle: 'ការសង្គ្រោះបឋមពេលមានគ្រោះថ្នាក់',
          icon: '🚑',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          activeBorder: 'border-amber-500 ring-2 ring-amber-500/30',
          cardGradient: 'from-amber-600 via-orange-600 to-rose-700',
          filterFn: (l) =>
            l.title.includes('បរិស្ថាន') ||
            l.title.includes('សង្គ្រោះ')
        }
      ];
    }

    if (sId === 'english') {
      return [
        {
          id: 'all',
          title: 'All Lessons',
          titleKhmer: 'មេរៀនអង់គ្លេសទាំងអស់',
          subtitle: `English Lessons Total: ${lessons.length}`,
          icon: '🔤',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          activeBorder: 'border-rose-600 ring-2 ring-rose-500/30',
          cardGradient: 'from-rose-900 via-slate-900 to-pink-950',
          filterFn: () => true
        },
        {
          id: 'eng-vocab',
          title: '1. Vocabulary',
          titleKhmer: 'ពាក្យ និងការបញ្ចេញសំឡេង',
          subtitle: 'Wordlists, Phonics & Pronunciation',
          icon: '🔤',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
          activeBorder: 'border-rose-500 ring-2 ring-rose-500/30',
          cardGradient: 'from-rose-600 via-pink-600 to-red-700',
          filterFn: (l) =>
            l.title.toLowerCase().includes('vocab') ||
            l.title.toLowerCase().includes('word') ||
            l.title.toLowerCase().includes('phonics')
        },
        {
          id: 'eng-gram',
          title: '2. Grammar',
          titleKhmer: 'វេយ្យាករណ៍ & ល្បះ',
          subtitle: 'Tenses, Verbs & Sentence Structures',
          icon: '📝',
          badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
          activeBorder: 'border-blue-500 ring-2 ring-blue-500/30',
          cardGradient: 'from-blue-600 via-indigo-700 to-slate-900',
          filterFn: (l) =>
            l.title.toLowerCase().includes('gram') ||
            l.title.toLowerCase().includes('tense') ||
            l.title.toLowerCase().includes('verb')
        },
        {
          id: 'eng-read',
          title: '3. Reading & Dialogue',
          titleKhmer: 'ការអាន & សន្ទនា',
          subtitle: 'Short Stories, Reading & Conversation',
          icon: '📖',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
          cardGradient: 'from-emerald-600 via-teal-700 to-slate-900',
          filterFn: (l) =>
            l.title.toLowerCase().includes('read') ||
            l.title.toLowerCase().includes('dialogue') ||
            l.title.toLowerCase().includes('story')
        }
      ];
    }

    // Default fallback
    return [
      {
        id: 'all',
        title: 'ទាំងអស់',
        titleKhmer: 'មេរៀនទាំងអស់',
        subtitle: `ចំនួន ${lessons.length} មេរៀន`,
        icon: '📚',
        badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
        activeBorder: 'border-emerald-600 ring-2 ring-emerald-500/30',
        cardGradient: 'from-slate-800 to-teal-900',
        filterFn: () => true
      }
    ];
  }, [subject.id, lessons.length]);

  // Find active sub-module
  const activeSubModule = subModules.find((sm) => sm.id === selectedSubModuleId) || subModules[0];

  // Filter lessons based on sub-module AND search query
  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      const matchesSubModule = activeSubModule.filterFn(l);
      if (!matchesSubModule) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.chapter.toLowerCase().includes(q) ||
        l.content.toLowerCase().includes(q)
      );
    });
  }, [lessons, activeSubModule, searchQuery]);

  // Ensure selectedLessonId belongs to filteredLessons
  const currentLessonIndex = filteredLessons.findIndex((l) => l.id === selectedLessonId);
  const currentLesson = filteredLessons[currentLessonIndex] || filteredLessons[0] || lessons[0];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleReadLesson = (lesson: LessonSummary, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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
    // Quick work-around to unlock TTS on iOS and Chrome
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
  };

  // Helper fallbacks for rich explanations
  const getStepByStepExample = (lesson: LessonSummary) => {
    if (lesson.stepByStepExample) return lesson.stepByStepExample;

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
            detail: 'ពិនិត្យមើលសញ្ញា និងឯកតារវាស់ (ដូចជា cm, m², ha, នាក់) ឲ្យបានត្រឹមត្រូវ'
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
      'ការមិនបានតម្រៀបខ្ទង់ ឬសញ្ញាចុចទសភាគឲ្យត្រង់ជួរគ្នាមុនធ្វើប្រមាណវិធី',
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
    <div className="max-w-5xl mx-auto py-3 px-3 sm:px-4 space-y-6">
      {/* Top Header Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="py-2 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
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
              មាន {subModules.length - 1} ផ្នែកមេរៀនរង • សរុប {lessons.length} មេរៀន
            </p>
          </div>
        </div>

        {/* View Layout Switcher & Text Size Button */}
        <div className="flex items-center gap-2">
          {/* Layout Mode Selector */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setLayoutMode('horizontal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                layoutMode === 'horizontal'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="បង្ហាញជាជួរដេក (Horizontal Carousel)"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ជួរដេក</span>
            </button>

            <button
              onClick={() => setLayoutMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                layoutMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="បង្ហាញជាក្រឡា (Grid)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ក្រឡា</span>
            </button>

            <button
              onClick={() => setLayoutMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                layoutMode === 'list'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="បង្ហាញជាបញ្ជី (List)"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">បញ្ជី</span>
            </button>
          </div>

          {/* Font Size Selector */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            title="ផ្លាស់ប្តូរទំហំអក្សរ"
          >
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">{fontSize === 'normal' ? 'អក្សរធំ' : 'ធម្មតា'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 FEATURED SUB-MODULES GRID (ជ្រើសរើសផ្នែកមេរៀនរង តាមមុខវិជ្ជា) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>ជ្រើសរើសផ្នែកមេរៀនរង (Sub-Modules Categories) ៖</span>
          </span>
          {selectedSubModuleId !== 'all' && (
            <button
              onClick={() => setSelectedSubModuleId('all')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>បង្ហាញទាំងអស់ ({lessons.length})</span>
            </button>
          )}
        </div>

        {/* Grid of Sub-Module Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {subModules.filter((sm) => sm.id !== 'all').map((sub) => {
            const count = lessons.filter(sub.filterFn).length;
            const isSelected = selectedSubModuleId === sub.id;

            return (
              <div
                key={sub.id}
                onClick={() => {
                  setSelectedSubModuleId(sub.id);
                  // Auto pick first lesson in sub-module
                  const matching = lessons.filter(sub.filterFn);
                  if (matching[0]) {
                    setSelectedLessonId(matching[0].id);
                  }
                }}
                className={`p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden select-none active:scale-[0.98] ${
                  isSelected
                    ? `bg-gradient-to-br ${sub.cardGradient} text-white ${sub.activeBorder} shadow-md scale-[1.02]`
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 shadow-2xs hover:border-emerald-300'
                }`}
              >
                {/* Glow accent */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-2xl">{sub.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? 'bg-white/20 text-white border-white/30'
                          : sub.badgeBg
                      }`}
                    >
                      {count} មេរៀន
                    </span>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {sub.title}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-2 leading-snug ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    {sub.subtitle}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[10px] font-bold flex items-center justify-between ${isSelected ? 'border-white/20 text-amber-300' : 'border-slate-100 text-emerald-700'}`}>
                  <span>{isSelected ? 'កំពុងមើល ✓' : 'ចុចចូលមើល'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-Module Quick Filter Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto scrollbar-none">
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
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.title}</span>
              <span
                className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`ស្វែងរកមេរៀនក្នុងផ្នែក «${activeSubModule.title}» ...`}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-2xs"
        />
        {searchQuery && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
            រកឃើញ {filteredLessons.length} មេរៀន
          </span>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. HORIZONTAL CAROUSEL LAYOUT (ជួរដេក - PRIMARY DEFAULT) */}
      {/* ========================================================================= */}
      {layoutMode === 'horizontal' && (
        <div className="space-y-5">
          {/* Carousel Title Bar */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>កម្រងមេរៀន (ជួរដេក) - {activeSubModule.titleKhmer || activeSubModule.title} ({filteredLessons.length}) ៖</span>
            </span>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollCarousel('left')}
                className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 shadow-2xs transition-colors cursor-pointer"
                title="រំកិលទៅឆ្វេង"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 shadow-2xs transition-colors cursor-pointer"
                title="រំកិលទៅស្តាំ"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Card Row Carousel Container */}
          <div
            ref={carouselRef}
            className="flex items-stretch gap-3.5 overflow-x-auto pb-3 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-thin"
          >
            {filteredLessons.map((lesson) => {
              const isSelected = lesson.id === (currentLesson?.id || selectedLessonId);
              const hasFormula = Boolean(lesson.formulaCard);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`snap-start shrink-0 w-[260px] sm:w-[290px] p-4 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white border-emerald-400 shadow-lg ring-2 ring-emerald-500/30 scale-[1.02]'
                      : 'bg-white hover:bg-emerald-50/40 text-slate-800 border-slate-200/90 shadow-2xs hover:border-emerald-300'
                  }`}
                >
                  <div>
                    {/* Chapter Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${
                          isSelected
                            ? 'bg-white/20 text-emerald-100 border-white/30'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                        }`}
                      >
                        {lesson.chapter}
                      </span>

                      {hasFormula && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-amber-400 text-amber-950'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}
                        >
                          ⚡ មានរូបមន្ត
                        </span>
                      )}
                    </div>

                    {/* Lesson Title */}
                    <h3 className={`text-sm font-bold leading-snug line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      <MathFormattedText text={lesson.title} />
                    </h3>
                  </div>

                  {/* Footer Stats & Selection Indicator */}
                  <div className={`mt-4 pt-2.5 border-t flex items-center justify-between text-xs ${isSelected ? 'border-white/20 text-emerald-100' : 'border-slate-100 text-slate-500'}`}>
                    <span className="text-[11px] font-medium">
                      {lesson.keyPoints.length} ចំណុចសំខាន់
                    </span>

                    <span
                      className={`text-[11px] font-bold flex items-center gap-1 ${
                        isSelected ? 'text-amber-300' : 'text-emerald-700'
                      }`}
                    >
                      {isSelected ? 'កំពុងមើល ✓' : 'ចុចមើល'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE LESSON DETAILED VIEW (CARD DISPLAY) */}
          {currentLesson && (() => {
            const stepEx = getStepByStepExample(currentLesson);
            const realApp = getRealWorldApp(currentLesson);
            const pitfalls = getCommonPitfalls(currentLesson);
            const quiz = getQuickPractice(currentLesson);

            const handleLessonTouchStart = (e: React.TouchEvent) => {
              setLessonTouchStartX(e.targetTouches[0].clientX);
              setLessonTouchStartY(e.targetTouches[0].clientY);
            };

            const handleLessonTouchEnd = (e: React.TouchEvent) => {
              if (lessonTouchStartX === null || lessonTouchStartY === null) return;
              const touchEndX = e.changedTouches[0].clientX;
              const touchEndY = e.changedTouches[0].clientY;

              const diffX = lessonTouchStartX - touchEndX;
              const diffY = lessonTouchStartY - touchEndY;

              if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                if (diffX > 0 && currentLessonIndex < filteredLessons.length - 1) {
                  // Swiped left -> next lesson
                  setSelectedLessonId(filteredLessons[currentLessonIndex + 1].id);
                } else if (diffX < 0 && currentLessonIndex > 0) {
                  // Swiped right -> previous lesson
                  setSelectedLessonId(filteredLessons[currentLessonIndex - 1].id);
                }
              }

              setLessonTouchStartX(null);
              setLessonTouchStartY(null);
            };

            return (
              <div
                onTouchStart={handleLessonTouchStart}
                onTouchEnd={handleLessonTouchEnd}
                className="bg-white rounded-3xl border-2 border-emerald-500/80 shadow-md p-5 sm:p-7 space-y-6 animate-fade-in relative overflow-hidden touch-pan-y"
              >
                {/* Background Accent Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Swipe Left/Right Gesture Badge */}
                <div className="flex items-center justify-between p-2 px-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs font-bold text-emerald-950">
                  <span className="flex items-center gap-1.5">
                    <span>👈👉 អូសទៅឆ្វេង ឬស្តាំ ដើម្បីប្តូរទៅមេរៀនបន្ទាប់ ឬមេរៀនមុន</span>
                  </span>
                  <span className="text-[11px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-mono shrink-0">
                    {currentLessonIndex + 1} / {filteredLessons.length}
                  </span>
                </div>

                {/* Lesson Banner & Header Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold mb-2 border border-emerald-200">
                      {currentLesson.chapter} • {activeSubModule.title}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
                      <MathFormattedText text={currentLesson.title} />
                    </h3>
                  </div>

                  {/* Audio & AI Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleReadLesson(currentLesson)}
                      className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                        readingId === currentLesson.id
                          ? 'bg-amber-400 text-amber-950 animate-pulse'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                      title="ស្តាប់ការអានមេរៀន"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{readingId === currentLesson.id ? 'កំពុងអាន...' : 'ស្តាប់ការអាន'}</span>
                    </button>

                    <button
                      onClick={() => setAiTutorLesson(currentLesson)}
                      className="px-3.5 py-2 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                      title="សួរគ្រូ AI អំពីមេរៀននេះ"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>សួរ AI</span>
                    </button>
                  </div>
                </div>

                {/* Active Audio Reader Controller Widget */}
                {readingId === currentLesson.id && (
                  <div className="bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-amber-500/15 border-2 border-amber-400 p-4 rounded-2xl space-y-3 shadow-xs animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Interactive pulsing speaker icon */}
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0 animate-pulse">
                          🎙️
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 font-moul">កំពុងអានមេរៀនដោយ៖ សំឡេងស្រីខ្មែរពីរោះស្រទន់</h4>
                          <p className="text-[10px] text-slate-600 font-medium">Pitch ខ្ពស់ល្មម ស័ក្តិសមសម្រាប់សិស្សានុសិស្សស្តាប់សិក្សា</p>
                        </div>
                      </div>
                      
                      {/* Control Controls */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            if (ttsState === 'playing') {
                              window.speechSynthesis.pause();
                              setTtsState('paused');
                            } else {
                              window.speechSynthesis.resume();
                              setTtsState('playing');
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200/90 shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          {ttsState === 'playing' ? '⏸️ ផ្អាក' : '▶️ បន្តអាន'}
                        </button>
                        <button
                          onClick={() => {
                            window.speechSynthesis.cancel();
                            setReadingId(null);
                            setTtsState('stopped');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          ⏹️ បញ្ឈប់
                        </button>
                        <button
                          onClick={() => setIsTtsTroubleOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          📢 គ្មានសំឡេង?
                        </button>
                      </div>
                    </div>

                    {/* Subtitle Card Fallback */}
                    <div className="p-3 bg-white/95 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-3xs">
                      <div className="text-[11px] font-bold text-amber-800 mb-1 flex items-center gap-1">
                        <span>📖 អត្ថបទដែលកំពុងអានឮ៖</span>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                      </div>
                      <p className="text-slate-700 font-medium font-sans">
                        {currentLesson.content}
                      </p>
                    </div>
                  </div>
                )}

                {/* 1. Main Overview Explanation */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>ខ្លឹមសារសង្ខេបមេរៀន (Lesson Summary)</span>
                  </div>
                  <div
                    className={`text-slate-800 leading-relaxed bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs ${
                      fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                    }`}
                  >
                    <MathFormattedText text={currentLesson.content} />
                  </div>
                </div>

                {/* 2. Formula Card (If present) */}
                {currentLesson.formulaCard && (
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-emerald-50 space-y-3 shadow-md border border-emerald-800/60">
                    <div className="flex items-center justify-between gap-2 font-bold text-emerald-300 text-xs sm:text-sm">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        {currentLesson.formulaCard.title}
                      </span>
                      <span className="text-[10px] bg-emerald-800 px-2.5 py-0.5 rounded-full text-emerald-200 uppercase font-mono">
                        រូបមន្តគន្លឹះ
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-100 font-mono text-xs sm:text-sm leading-relaxed">
                      <MathFormattedText text={currentLesson.formulaCard.content} />
                    </div>

                    {currentLesson.formulaCard.example && (
                      <div className="p-3 rounded-xl bg-emerald-900/60 text-xs text-emerald-200 border border-emerald-700/50">
                        💡 <span className="font-bold text-amber-300">ឧទាហរណ៍អនុវត្ត៖</span>{' '}
                        <MathFormattedText text={currentLesson.formulaCard.example} />
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Step-by-Step Solved Problem Example */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-50 via-emerald-50/40 to-amber-50/30 border border-emerald-200 space-y-3.5 shadow-2xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                      📝
                    </span>
                    <span>លំហាត់គំរូ និងដំណោះស្រាយជំហានៗ (Step-by-Step Solution)</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 font-bold text-xs sm:text-sm text-slate-800 shadow-2xs">
                    <MathFormattedText text={stepEx.problemText} />
                  </div>

                  <div className="space-y-2">
                    {stepEx.steps.map((st) => (
                      <div
                        key={st.stepNumber}
                        className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 text-xs sm:text-sm space-y-1 shadow-2xs"
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

                  <div className="p-3.5 rounded-2xl bg-emerald-800 text-white font-bold text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      ចម្លើយចុងក្រោយ៖
                    </span>
                    <span className="text-amber-200 font-mono text-xs sm:text-sm bg-emerald-950/70 px-3 py-1 rounded-xl border border-emerald-600/50">
                      <MathFormattedText text={stepEx.finalAnswer} />
                    </span>
                  </div>
                </div>

                {/* 4. Grid for Key Takeaways & Real-World Apps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Key Takeaways */}
                  <div className="p-4.5 rounded-3xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      <span>ចំណុចសំខាន់ៗត្រូវចងចាំ៖</span>
                    </div>
                    <ul className="space-y-2 pl-1">
                      {currentLesson.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span>
                          <div className="flex-1 leading-relaxed">
                            <MathFormattedText text={point} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real World Applications */}
                  <div className="p-4.5 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-2.5">
                    <div className="flex items-center gap-2 font-bold text-amber-900 text-xs sm:text-sm">
                      <Lightbulb className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                      <span>ការអនុវត្តក្នុងជីវិតជាក់ស្ដែង៖</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <MathFormattedText text={realApp} />
                    </p>
                  </div>
                </div>

                {/* 5. Exam Traps & Pitfalls */}
                <div className="p-4.5 rounded-3xl bg-rose-50/80 border border-rose-200 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-rose-900 text-xs sm:text-sm">
                    <AlertTriangle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
                    <span>កំហុសឆ្គងដែលសិស្សជួបប្រទះញឹកញាប់ក្នុងប្រឡង (Exam Traps)៖</span>
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {pitfalls.map((pit, pidx) => (
                      <li key={pidx} className="flex items-start gap-2 text-xs sm:text-sm text-rose-950">
                        <span className="text-rose-600 font-bold mt-0.5">•</span>
                        <div className="flex-1">
                          <MathFormattedText text={pit} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6. Interactive Quick Quiz */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border border-amber-200 space-y-3.5">
                  <div className="flex items-center justify-between gap-2 font-bold text-amber-950">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4.5 h-4.5 text-amber-600" />
                      <span>អនុវត្តលំហាត់សាកល្បងសមត្ថភាព (Quick Practice)</span>
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                      តេស្តភ្លាមៗ
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-amber-200 font-bold text-xs sm:text-sm text-slate-900 shadow-2xs">
                    <MathFormattedText text={quiz.questionText} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quiz.options.map((opt, oidx) => {
                      const selected = practiceAnswers[currentLesson.id] === oidx;
                      const isCorrect = oidx === quiz.correctIndex;
                      const answered = practiceAnswers[currentLesson.id] !== undefined;

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
                          onClick={() => setPracticeAnswers((prev) => ({ ...prev, [currentLesson.id]: oidx }))}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer text-xs font-semibold flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span><MathFormattedText text={opt} /></span>
                          {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {practiceAnswers[currentLesson.id] !== undefined && (
                    <div className="p-3.5 rounded-xl bg-white border border-amber-300 text-xs text-slate-800 leading-relaxed animate-fade-in shadow-2xs">
                      <span className="font-bold text-amber-900">💡 ការបកស្រាយ៖ </span>
                      <MathFormattedText text={quiz.explanation} />
                    </div>
                  )}
                </div>

                {/* Bottom Lesson Navigation Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (currentLessonIndex > 0) {
                        setSelectedLessonId(filteredLessons[currentLessonIndex - 1].id);
                      }
                    }}
                    disabled={currentLessonIndex <= 0}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>មេរៀនមុន</span>
                  </button>

                  <span className="text-xs font-bold text-slate-500">
                    មេរៀន {currentLessonIndex + 1} / {filteredLessons.length}
                  </span>

                  <button
                    onClick={() => {
                      if (currentLessonIndex < filteredLessons.length - 1) {
                        setSelectedLessonId(filteredLessons[currentLessonIndex + 1].id);
                      }
                    }}
                    disabled={currentLessonIndex >= filteredLessons.length - 1}
                    className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>មេរៀនបន្ទាប់</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GRID LAYOUT MODE */}
      {/* ========================================================================= */}
      {layoutMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLessons.map((lesson) => {
            const isSelected = selectedLessonId === lesson.id;
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  setSelectedLessonId(lesson.id);
                  setLayoutMode('horizontal');
                }}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer bg-white hover:border-emerald-400 shadow-2xs hover:shadow-md ${
                  isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
                }`}
              >
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold">
                  {lesson.chapter}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 mb-1.5">
                  <MathFormattedText text={lesson.title} />
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {lesson.content}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{lesson.keyPoints.length} ចំណុចសំខាន់</span>
                  <span className="flex items-center gap-1">
                    មើលមេរៀន <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VERTICAL LIST LAYOUT MODE */}
      {/* ========================================================================= */}
      {layoutMode === 'list' && (
        <div className="space-y-3">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => {
                setSelectedLessonId(lesson.id);
                setLayoutMode('horizontal');
              }}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 cursor-pointer shadow-2xs transition-all flex items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                  {lesson.chapter}
                </span>
                <h3 className="text-sm font-bold text-slate-900 truncate mt-1">
                  <MathFormattedText text={lesson.title} />
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
            </div>
          ))}
        </div>
      )}

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
                {/* Step 1 */}
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

                {/* Step 2 */}
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

                {/* Step 3 */}
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

                {/* Step 4 */}
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
