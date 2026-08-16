import React, { useState, useRef } from 'react';
import {
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  Printer,
  ChevronLeft,
  ChevronRight,
  Save,
  ArrowLeft,
  GraduationCap,
  Calculator,
  Search,
  BookMarked
} from 'lucide-react';

interface HomeworkQuestion {
  id: string;
  type: 'text' | 'choice';
  questionText: string;
  placeholder?: string;
  correctAnswer: string;
  options?: string[];
  explanation: string;
}

interface HomeworkSheet {
  id: string;
  subjectId: 'khmer' | 'math' | 'science';
  subjectName: string;
  lessonNumber: string;
  lessonTitle: string;
  topicTitle: string;
  icon: string;
  bgGradient: string;
  badgeColor: string;
  questions: HomeworkQuestion[];
}

interface SubjectCategory {
  id: 'khmer' | 'math' | 'science';
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  lessonCount: number;
}

interface HomeworkSectionProps {
  onEarnCoins?: (coins: number, xp: number) => void;
}

const SUBJECT_CATEGORIES: SubjectCategory[] = [
  {
    id: 'math',
    title: 'គណិតវិទ្យា',
    subtitle: 'ថ្នាក់ទី៦ - កម្រងកិច្ចការផ្ទះក្រសួងអប់រំ យុវជន និងកីឡា (គ្រប់មេរៀន)',
    icon: '📐',
    gradient: 'from-amber-600 via-orange-600 to-amber-950',
    borderColor: 'border-amber-400/80 hover:border-amber-300',
    textColor: 'text-amber-100',
    badgeBg: 'bg-amber-500/30 text-amber-200 border-amber-400/40',
    lessonCount: 28
  },
  {
    id: 'khmer',
    title: 'ភាសាខ្មែរ',
    subtitle: 'ថ្នាក់ទី៦ - ក្រសួងអប់រំ យុវជន និងកីឡា',
    icon: '📚',
    gradient: 'from-blue-600 via-indigo-700 to-slate-900',
    borderColor: 'border-blue-400/80 hover:border-blue-300',
    textColor: 'text-blue-100',
    badgeBg: 'bg-blue-500/30 text-blue-200 border-blue-400/40',
    lessonCount: 4
  },
  {
    id: 'science',
    title: 'វិទ្យាសាស្ត្រ',
    subtitle: 'ថ្នាក់ទី៦ - ក្រសួងអប់រំ យុវជន និងកីឡា',
    icon: '🔬',
    gradient: 'from-emerald-600 via-teal-700 to-slate-900',
    borderColor: 'border-emerald-400/80 hover:border-emerald-300',
    textColor: 'text-emerald-100',
    badgeBg: 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40',
    lessonCount: 3
  }
];

const LESSON_COLOR_PALETTES = [
  {
    // 1. Amber Gold / Sunset Flame
    cardBg: 'from-amber-950/95 via-amber-900/60 to-slate-900 hover:from-amber-900 hover:to-orange-950',
    borderColor: 'border-amber-500/60 hover:border-amber-300',
    shadowGlow: 'hover:shadow-amber-500/20',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    titleColor: 'text-amber-200 group-hover:text-amber-300',
    subTextColor: 'text-amber-100/80',
    progressBg: 'from-amber-400 to-orange-400',
    btnBg: 'from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950',
    iconColor: 'text-amber-300',
  },
  {
    // 2. Royal Sapphire / Ocean Blue
    cardBg: 'from-blue-950/95 via-blue-900/60 to-slate-900 hover:from-blue-900 hover:to-indigo-950',
    borderColor: 'border-blue-500/60 hover:border-blue-300',
    shadowGlow: 'hover:shadow-blue-500/20',
    badgeBg: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    titleColor: 'text-blue-200 group-hover:text-blue-300',
    subTextColor: 'text-blue-100/80',
    progressBg: 'from-blue-400 to-cyan-400',
    btnBg: 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white',
    iconColor: 'text-blue-300',
  },
  {
    // 3. Emerald Forest / Bio Green
    cardBg: 'from-emerald-950/95 via-emerald-900/60 to-slate-900 hover:from-emerald-900 hover:to-teal-950',
    borderColor: 'border-emerald-500/60 hover:border-emerald-300',
    shadowGlow: 'hover:shadow-emerald-500/20',
    badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    titleColor: 'text-emerald-200 group-hover:text-emerald-300',
    subTextColor: 'text-emerald-100/80',
    progressBg: 'from-emerald-400 to-teal-300',
    btnBg: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950',
    iconColor: 'text-emerald-300',
  },
  {
    // 4. Purple Galaxy / Electric Violet
    cardBg: 'from-purple-950/95 via-purple-900/60 to-slate-900 hover:from-purple-900 hover:to-violet-950',
    borderColor: 'border-purple-500/60 hover:border-purple-300',
    shadowGlow: 'hover:shadow-purple-500/20',
    badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    titleColor: 'text-purple-200 group-hover:text-purple-300',
    subTextColor: 'text-purple-100/80',
    progressBg: 'from-purple-400 to-pink-400',
    btnBg: 'from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 text-white',
    iconColor: 'text-purple-300',
  },
  {
    // 5. Crimson Rose / Ruby Sparkle
    cardBg: 'from-rose-950/95 via-rose-900/60 to-slate-900 hover:from-rose-900 hover:to-pink-950',
    borderColor: 'border-rose-500/60 hover:border-rose-300',
    shadowGlow: 'hover:shadow-rose-500/20',
    badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
    titleColor: 'text-rose-200 group-hover:text-rose-300',
    subTextColor: 'text-rose-100/80',
    progressBg: 'from-rose-400 to-pink-400',
    btnBg: 'from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white',
    iconColor: 'text-rose-300',
  },
  {
    // 6. Cyan Tech / Electric Aqua
    cardBg: 'from-cyan-950/95 via-cyan-900/60 to-slate-900 hover:from-cyan-900 hover:to-sky-950',
    borderColor: 'border-cyan-500/60 hover:border-cyan-300',
    shadowGlow: 'hover:shadow-cyan-500/20',
    badgeBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
    titleColor: 'text-cyan-200 group-hover:text-cyan-300',
    subTextColor: 'text-cyan-100/80',
    progressBg: 'from-cyan-400 to-blue-400',
    btnBg: 'from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-slate-950',
    iconColor: 'text-cyan-300',
  },
  {
    // 7. Neon Fuchsia / Magenta Wave
    cardBg: 'from-fuchsia-950/95 via-fuchsia-900/60 to-slate-900 hover:from-fuchsia-900 hover:to-pink-950',
    borderColor: 'border-fuchsia-500/60 hover:border-fuchsia-300',
    shadowGlow: 'hover:shadow-fuchsia-500/20',
    badgeBg: 'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/40',
    titleColor: 'text-fuchsia-200 group-hover:text-fuchsia-300',
    subTextColor: 'text-fuchsia-100/80',
    progressBg: 'from-fuchsia-400 to-rose-400',
    btnBg: 'from-fuchsia-500 to-pink-600 hover:from-fuchsia-400 hover:to-pink-500 text-white',
    iconColor: 'text-fuchsia-300',
  },
  {
    // 8. Deep Indigo / Velvet Night
    cardBg: 'from-indigo-950/95 via-indigo-900/60 to-slate-900 hover:from-indigo-900 hover:to-purple-950',
    borderColor: 'border-indigo-500/60 hover:border-indigo-300',
    shadowGlow: 'hover:shadow-indigo-500/20',
    badgeBg: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40',
    titleColor: 'text-indigo-200 group-hover:text-indigo-300',
    subTextColor: 'text-indigo-100/80',
    progressBg: 'from-indigo-400 to-violet-400',
    btnBg: 'from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white',
    iconColor: 'text-indigo-300',
  },
  {
    // 9. Fiery Orange / Ember Flame
    cardBg: 'from-orange-950/95 via-orange-900/60 to-slate-900 hover:from-orange-900 hover:to-amber-950',
    borderColor: 'border-orange-500/60 hover:border-orange-300',
    shadowGlow: 'hover:shadow-orange-500/20',
    badgeBg: 'bg-orange-500/20 text-orange-200 border-orange-400/40',
    titleColor: 'text-orange-200 group-hover:text-orange-300',
    subTextColor: 'text-orange-100/80',
    progressBg: 'from-orange-400 to-amber-300',
    btnBg: 'from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-slate-950',
    iconColor: 'text-orange-300',
  },
  {
    // 10. Sky Blue / Azure Dawn
    cardBg: 'from-sky-950/95 via-sky-900/60 to-slate-900 hover:from-sky-900 hover:to-blue-950',
    borderColor: 'border-sky-500/60 hover:border-sky-300',
    shadowGlow: 'hover:shadow-sky-500/20',
    badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
    titleColor: 'text-sky-200 group-hover:text-sky-300',
    subTextColor: 'text-sky-100/80',
    progressBg: 'from-sky-400 to-cyan-300',
    btnBg: 'from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950',
    iconColor: 'text-sky-300',
  },
  {
    // 11. Vibrant Teal / Lagoon Magic
    cardBg: 'from-teal-950/95 via-teal-900/60 to-slate-900 hover:from-teal-900 hover:to-emerald-950',
    borderColor: 'border-teal-500/60 hover:border-teal-300',
    shadowGlow: 'hover:shadow-teal-500/20',
    badgeBg: 'bg-teal-500/20 text-teal-200 border-teal-400/40',
    titleColor: 'text-teal-200 group-hover:text-teal-300',
    subTextColor: 'text-teal-100/80',
    progressBg: 'from-teal-400 to-emerald-300',
    btnBg: 'from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950',
    iconColor: 'text-teal-300',
  },
  {
    // 12. Golden Lime / Electric Meadow
    cardBg: 'from-lime-950/95 via-lime-900/60 to-slate-900 hover:from-lime-900 hover:to-emerald-950',
    borderColor: 'border-lime-500/60 hover:border-lime-300',
    shadowGlow: 'hover:shadow-lime-500/20',
    badgeBg: 'bg-lime-500/20 text-lime-200 border-lime-400/40',
    titleColor: 'text-lime-200 group-hover:text-lime-300',
    subTextColor: 'text-lime-100/80',
    progressBg: 'from-lime-400 to-emerald-400',
    btnBg: 'from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-slate-950',
    iconColor: 'text-lime-300',
  }
];

const ALL_HOMEWORK_SHEETS: HomeworkSheet[] = [
  // =========================================================================
  // គណិតវិទ្យា (MATH) - គ្រប់មេរៀនតាមកម្រងកិច្ចការផ្ទះ MoEYS ថ្នាក់ទី៦ (សង្ខេបបញ្ចូលគ្នា)
  // =========================================================================
  {
    id: 'hw_math_m1_p1',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១ (ផ្នែកទី១)',
    lessonTitle: 'អំណាន និងសំណេរចំនួន',
    topicTitle: '❖ អំណាន និងសំណេរចំនួន (សៀវភៅសិស្សទំព័រ ១)',
    icon: '📖',
    bgGradient: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-500 text-white',
    questions: [
      {
        id: 'hw_m1_p1_q1',
        type: 'text',
        questionText: '១. តើចំនួន 870 465 250 គេអានតាមខ្ទង់បានយ៉ាងដូចម្តេច?',
        placeholder: 'សរសេរចម្លើយតាមខ្ទង់...',
        correctAnswer: 'ប្រាំបីរយលាន ប្រាំពីរដប់លាន បួនសែន ប្រាំមួយម៉ឺន ប្រាំពាន់ ពីររយ ហាសិប',
        explanation: 'តាមខ្ទង់៖ ៨រយលាន ៧សិបលាន ០លាន ៤សែន ៦ម៉ឺន ៥ពាន់ ពីររយ ៥សិប ០រាយ (ប្រាំបីរយលាន ប្រាំពីរដប់លាន បួនសែន ប្រាំមួយម៉ឺន ប្រាំពាន់ ពីររយ ហាសិប)'
      },
      {
        id: 'hw_m1_p1_q2',
        type: 'text',
        questionText: '២. តើចំនួន 870 465 250 គេអានតាមថ្នាក់បានយ៉ាងដូចម្តេច?',
        placeholder: 'សរសេរចម្លើយតាមថ្នាក់...',
        correctAnswer: 'ប្រាំបីរយចិតសិបលាន បួនរយហុកសិបប្រាំពាន់ ពីររយហាសិប',
        explanation: 'តាមថ្នាក់៖ ប្រាំបីរយចិតសិបលាន បួនរយហុកសិបប្រាំពាន់ ពីររយហាសិប'
      },
      {
        id: 'hw_m1_p1_q3',
        type: 'choice',
        questionText: '៣. ចូរជ្រើសរើសចម្លើយត្រឹមត្រូវនៃពាក្យអានចំនួន 24 376 809 តាមថ្នាក់៖',
        options: [
          'ក. ម្ភៃបួនលានបីរយចិតសិបប្រាំមួយប្រាំបីរយប្រាំបួន',
          'ខ. ម្ភៃបួនលានបីរយចិតសិបប្រាំមួយពាន់ប្រាំបីរយ',
          'គ. ម្ភៃបួនលានបីរយចិតសិបប្រាំមួយពាន់ប្រាំបីរយប្រាំបួន',
          'ឃ. ម្ភៃបួនលានបីរយចិតសិបប្រាំមួយពាន់ប្រាំរយប្រាំបួន'
        ],
        correctAnswer: 'គ. ម្ភៃបួនលានបីរយចិតសិបប្រាំមួយពាន់ប្រាំបីរយប្រាំបួន',
        explanation: '24 376 809 អានតាមថ្នាក់គឺ ម្ភៃបួនលានបីរយចិតសិបប្រាំមួយពាន់ប្រាំបីរយប្រាំបួន។'
      },
      {
        id: 'hw_m1_p1_q4',
        type: 'text',
        questionText: '៤. ចូរសរសេរចំនួន 224 345 527 ជាពាក្យអានតាមខ្ទង់៖',
        placeholder: 'សរសេរតាមខ្ទង់...',
        correctAnswer: 'ពីររយលាន ពីរដប់លាន បួនលាន បីសែន បួនម៉ឺន ប្រាំពាន់ ប្រាំរយ ពីរដប់ ប្រាំពីរ',
        explanation: '២២៤,៣៤៥,៥២៧ តាមខ្ទង់គឺ៖ ពីររយលាន ពីរដប់លាន បួនលាន បីសែន បួនម៉ឺន ប្រាំពាន់ ប្រាំរយ ពីរដប់ ប្រាំពីរ'
      },
      {
        id: 'hw_m1_p1_q5',
        type: 'text',
        questionText: '៥. ចូរសរសេរចំនួន 224 345 527 ជាពាក្យអានតាមថ្នាក់៖',
        placeholder: 'សរសេរតាមថ្នាក់...',
        correctAnswer: 'ពីររយម្ភៃបួនលាន បីរយសែសិបប្រាំពាន់ ប្រាំរយម្ភៃប្រាំពីរ',
        explanation: '២២៤,៣៤៥,៥២៧ តាមថ្នាក់គឺ៖ ពីររយម្ភៃបួនលាន បីរយសែសិបប្រាំពាន់ ប្រាំរយម្ភៃប្រាំពីរ'
      },
      {
        id: 'hw_m1_p1_q6',
        type: 'text',
        questionText: '៦. ចូរសរសេរចំនួន 128 352 683 ជាពាក្យអានតាមខ្ទង់៖',
        placeholder: 'សរសេរតាមខ្ទង់...',
        correctAnswer: 'មួយរយលាន ពីរដប់លាន ប្រាំបីលាន បីសែន ប្រាំម៉ឺន ពីរពាន់ ប្រាំមួយរយ ប៉ែតសិប បី',
        explanation: '១២៨,៣៥២,៦៨៣ តាមខ្ទង់គឺ៖ មួយរយលាន ពីរដប់លាន ប្រាំបីលាន បីសែន ប្រាំម៉ឺន ពីរពាន់ ប្រាំមួយរយ ប៉ែតសិប បី'
      },
      {
        id: 'hw_m1_p1_q7',
        type: 'text',
        questionText: '៧. ចូរសរសេរចំនួន 128 352 683 ជាពាក្យអានតាមថ្នាក់៖',
        placeholder: 'សរសេរតាមថ្នាក់...',
        correctAnswer: 'មួយរយម្ភៃប្រាំបីលាន បីរយហាសិបពីរពាន់ ប្រាំមួយរយប៉ែតសិបបី',
        explanation: '១២៨,៣៥២,៦៨៣ តាមថ្នាក់គឺ៖ មួយរយម្ភៃប្រាំបីលាន បីរយហាសិបពីរពាន់ ប្រាំមួយរយប៉ែតសិបបី'
      },
      {
        id: 'hw_m1_p1_q8',
        type: 'text',
        questionText: '៨. ចូរសរសេរចំនួនតាងពាក្យអាន "មួយរយសាមសិបប្រាំលាន បីសែនប្រាំម៉ឺន បីពាន់បួនរយហាសិបពីរ" ជាលេខ៖',
        placeholder: 'ឧ. 135,353,452',
        correctAnswer: '135,353,452',
        explanation: '១៣៥ ៣៥៣ ៤៥២ = 135,353,452'
      },
      {
        id: 'hw_m1_p1_q9',
        type: 'text',
        questionText: '៩. ចូរសរសេរចំនួនតាងពាក្យអាន "ប្រាំបួនរយដប់ពីរលាន ប្រាំរយសែសិបបីពាន់មួយរយម្ភៃបួន" ជាលេខ៖',
        placeholder: 'ឧ. 912,543,124',
        correctAnswer: '912,543,124',
        explanation: '៩១២ ៥៤៣ ១២៤ = 912,543,124'
      }
    ]
  },
  {
    id: 'hw_math_m1_p2',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១ (ផ្នែកទី២)',
    lessonTitle: 'ខ្ទង់ និងតម្លៃលេខតាមខ្ទង់',
    topicTitle: '❖ ខ្ទង់ និងតម្លៃលេខតាមខ្ទង់ (សៀវភៅសិស្សទំព័រ ២)',
    icon: '🎯',
    bgGradient: 'from-orange-500 to-amber-700',
    badgeColor: 'bg-orange-500 text-white',
    questions: [
      {
        id: 'hw_m1_p2_q1',
        type: 'choice',
        questionText: '១. គេមានចំនួន 3 024 103 ៖ តើលេខ 3 (ខាងឆ្វេងបង្អស់) នៅខ្ទង់ណា ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់លាន មានតម្លៃ 3,000,000',
          'ខ. ខ្ទង់សែន មានតម្លៃ 300,000',
          'គ. ខ្ទង់លាន មានតម្លៃ 30,000',
          'ឃ. ខ្ទង់រាយ មានតម្លៃ 3'
        ],
        correctAnswer: 'ក. ខ្ទង់លាន មានតម្លៃ 3,000,000',
        explanation: 'លេខ ៣ ខាងឆ្វេងបង្អស់ស្ថិតនៅខ្ទង់លាន មានតម្លៃ ៣,០០០,០០០។'
      },
      {
        id: 'hw_m1_p2_q2',
        type: 'choice',
        questionText: '២. គេមានចំនួន 3 024 103 ៖ តើលេខ ០ (បន្ទាប់ពីលេខ ៣) នៅខ្ទង់ណា ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់ដប់ មានតម្លៃ 0',
          'ខ. ខ្ទង់សែន មានតម្លៃ 0',
          'គ. ខ្ទង់លាន មានតម្លៃ 0',
          'ឃ. ខ្ទង់ម៉ឺន មានតម្លៃ 0'
        ],
        correctAnswer: 'ខ. ខ្ទង់សែន មានតម្លៃ 0',
        explanation: 'លេខ ០ បន្ទាប់ពីលេខ ៣ ស្ថិតនៅខ្ទង់សែន មានតម្លៃ ០។'
      },
      {
        id: 'hw_m1_p2_q3',
        type: 'choice',
        questionText: '៣. គេមានចំនួន 3 024 103 ៖ តើលេខ 2 នៅខ្ទង់ណា ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់ពាន់ មានតម្លៃ 2,000',
          'ខ. ខ្ទង់ម៉ឺន មានតម្លៃ 20,000',
          'គ. ខ្ទង់សែន មានតម្លៃ 200,000',
          'ឃ. ខ្ទង់ដប់ មានតម្លៃ 20'
        ],
        correctAnswer: 'ខ. ខ្ទង់ម៉ឺន មានតម្លៃ 20,000',
        explanation: 'លេខ ២ ស្ថិតនៅខ្ទង់ម៉ឺន មានតម្លៃ ២០,០០០ (២ម៉ឺន)។'
      },
      {
        id: 'hw_m1_p2_q4',
        type: 'choice',
        questionText: '៤. គេមានចំនួន 3 024 103 ៖ តើលេខ 4 នៅខ្ទង់ណា ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់រយ មានតម្លៃ 400',
          'ខ. ខ្ទង់ពាន់ មានតម្លៃ 4,000',
          'គ. ខ្ទង់ម៉ឺន មានតម្លៃ 40,000'
        ],
        correctAnswer: 'ខ. ខ្ទង់ពាន់ មានតម្លៃ 4,000',
        explanation: 'លេខ ៤ ស្ថិតនៅខ្ទង់ពាន់ មានតម្លៃ ៤,០០០ (៤ពាន់)។'
      },
      {
        id: 'hw_m1_p2_q5',
        type: 'choice',
        questionText: '៥. គេមានចំនួន 3 024 103 ៖ តើលេខ 1 នៅខ្ទង់ណា? ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់រយ មានតម្លៃ 100',
          'ខ. ខ្ទង់ដប់ មានតម្លៃ 10',
          'គ. ខ្ទង់ពាន់ មានតម្លៃ 1,000'
        ],
        correctAnswer: 'ក. ខ្ទង់រយ មានតម្លៃ 100',
        explanation: 'លេខ ១ ស្ថិតនៅខ្ទង់រយ មានតម្លៃ ១០០ (១រយ)។'
      },
      {
        id: 'hw_m1_p2_q6',
        type: 'choice',
        questionText: '៦. គេមានចំនួន 3 024 103 ៖ តើលេខ ០ (បន្ទាប់ពីលេខ ១) នៅខ្ទង់ណា? ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់ដប់ មានតម្លៃ 0',
          'ខ. ខ្ទង់រាយ មានតម្លៃ 0',
          'គ. ខ្ទង់រយ មានតម្លៃ 0'
        ],
        correctAnswer: 'ក. ខ្ទង់ដប់ មានតម្លៃ 0',
        explanation: 'លេខ ០ មុនលេខ ៣ ចុងក្រោយ ស្ថិតនៅខ្ទង់ដប់ មានតម្លៃ ០។'
      },
      {
        id: 'hw_m1_p2_q7',
        type: 'choice',
        questionText: '៧. គេមានចំនួន 3 024 103 ៖ តើលេខ 3 (ខាងស្តាំបង្អស់) នៅខ្ទង់ណា? ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់រាយ មានតម្លៃ 3',
          'ខ. ខ្ទង់ដប់ មានតម្លៃ 30',
          'គ. ខ្ទង់លាន មានតម្លៃ 3,000,000'
        ],
        correctAnswer: 'ក. ខ្ទង់រាយ មានតម្លៃ 3',
        explanation: 'លេខ ៣ ខាងស្តាំបង្អស់ ស្ថិតនៅខ្ទង់រាយ មានតម្លៃ ៣។'
      },
      {
        id: 'hw_m1_p2_q8',
        type: 'text',
        questionText: '៨. ចូរសរសេរចំនួន 3 024 103 ជាទម្រង់ពង្រាយ៖',
        placeholder: 'ឧ. 3000000 + 20000 + 4000 + 100 + 3',
        correctAnswer: '3000000 + 20000 + 4000 + 100 + 3',
        explanation: '3 024 103 = 3000000 + 20000 + 4000 + 100 + 3'
      },
      {
        id: 'hw_m1_p2_q9',
        type: 'text',
        questionText: '៩. ក្នុងចំនួន 90 264 537 ៖ លេខ 4 នៅខ្ទង់ពាន់មានតម្លៃប៉ុន្មាន?',
        placeholder: 'សរសេរតម្លៃលេខ...',
        correctAnswer: '4,000',
        explanation: 'លេខ ៤ ស្ថិតនៅខ្ទង់ពាន់ មានតម្លៃ ៤,០០០ (4,000)។'
      },
      {
        id: 'hw_m1_p2_q10',
        type: 'text',
        questionText: '១០. ក្នុងចំនួន 90 264 537 ៖ លេខ 5 នៅខ្ទង់រយមានតម្លៃប៉ុន្មាន?',
        placeholder: 'សរសេរតម្លៃលេខ...',
        correctAnswer: '500',
        explanation: 'លេខ ៥ ស្ថិតនៅខ្ទង់រយ មានតម្លៃ ៥០០ (500)។'
      },
      {
        id: 'hw_m1_p2_q11',
        type: 'choice',
        questionText: '១១. ក្នុងចំនួន 90 264 537 ៖ តើលេខ 2 ស្ថិតនៅខ្ទង់ណា ហើយមានតម្លៃប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់សែន មានតម្លៃ 200,000',
          'ខ. ខ្ទង់លាន មានតម្លៃ 2,000,000',
          'គ. ខ្ទង់ម៉ឺន មានតម្លៃ 20,000'
        ],
        correctAnswer: 'ក. ខ្ទង់សែន មានតម្លៃ 200,000',
        explanation: 'លេខ ២ ស្ថិតនៅខ្ទង់សែន មានតម្លៃ ២០០,០០០។'
      },
      {
        id: 'hw_m1_p2_q12',
        type: 'choice',
        questionText: '១២. ក្នុងចំនួន 90 264 537 ៖ តើលេខ 6 ស្ថិតនៅខ្ទង់ណា ហើយមានតម្លៃប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់សែន មានតម្លៃ 600,000',
          'ខ. ខ្ទង់ម៉ឺន មានតម្លៃ 60,000',
          'គ. ខ្ទង់ពាន់ មានតម្លៃ 6,000'
        ],
        correctAnswer: 'ខ. ខ្ទង់ម៉ឺន មានតម្លៃ 60,000',
        explanation: 'លេខ ៦ ស្ថិតនៅខ្ទង់ម៉ឺន មានតម្លៃ ៦០,០០០។'
      },
      {
        id: 'hw_m1_p2_q13',
        type: 'text',
        questionText: '១៣. ចូរសរសេរចំនួន 25 543 760 ជាទម្រង់ពង្រាយ៖',
        placeholder: 'ឧ. 20000000 + 5000000 + ...',
        correctAnswer: '20000000 + 5000000 + 500000 + 40000 + 3000 + 700 + 60',
        explanation: '25 543 760 = 20000000 + 5000000 + 500000 + 40000 + 3000 + 700 + 60'
      },
      {
        id: 'hw_m1_p2_q14',
        type: 'text',
        questionText: '១៤. ចូរសរសេរចំនួន 342 350 789 ជាទម្រង់ពង្រាយ៖',
        placeholder: 'ឧ. 300000000 + 40000000 + ...',
        correctAnswer: '300000000 + 40000000 + 2000000 + 300000 + 50000 + 700 + 80 + 9',
        explanation: '342 350 789 = 300000000 + 40000000 + 2000000 + 300000 + 50000 + 700 + 80 + 9'
      }
    ]
  },
  {
    id: 'hw_math_m1_p3',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១ (ផ្នែកទី៣)',
    lessonTitle: 'ប្រៀបធៀប និងរៀបលំដាប់ចំនួនគត់',
    topicTitle: '❖ ប្រៀបធៀប និងរៀបលំដាប់ចំនួនគត់ (សៀវភៅសិស្សទំព័រ ៣)',
    icon: '⚖️',
    bgGradient: 'from-orange-600 to-amber-700',
    badgeColor: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'hw_m1_p3_q1',
        type: 'choice',
        questionText: '១. តើចំនួន 3 256 401 និង 3 257 250 មួយណាមានតម្លៃធំជាង?',
        options: [
          'ក. 3 256 401',
          'ខ. 3 257 250'
        ],
        correctAnswer: 'ខ. 3 257 250',
        explanation: '3 257 250 ធំជាង 3 256 401 ព្រោះខ្ទង់ពាន់ ៧ > ៦។'
      },
      {
        id: 'hw_m1_p3_q2',
        type: 'choice',
        questionText: '២. ចូរបំពេញសញ្ញាប្រៀបធៀបរវាង 3 256 401 និង 3 257 250៖',
        options: [
          'ក. 3 256 401 < 3 257 250',
          'ខ. 3 256 401 > 3 257 250',
          'គ. 3 256 401 = 3 257 250'
        ],
        correctAnswer: 'ក. 3 256 401 < 3 257 250',
        explanation: '3 256 401 < 3 257 250'
      },
      {
        id: 'hw_m1_p3_q3',
        type: 'choice',
        questionText: '៣. ប្រៀបធៀបចំនួនម្ដងពីរៗ៖ 263 895 និង 2 510 571',
        options: [
          'ក. 263 895 < 2 510 571',
          'ខ. 263 895 > 2 510 571'
        ],
        correctAnswer: 'ក. 263 895 < 2 510 571',
        explanation: '២៦៣ ៨៩៥ មាន ៦ ខ្ទង់ ចំណែក ២ ៥១០ ៥៧១ មាន ៧ ខ្ទង់ ដូចនេះ ២៦៣ ៨៩៥ < ២ ៥១០ ៥៧១។'
      },
      {
        id: 'hw_m1_p3_q4',
        type: 'text',
        questionText: '៤. រៀបលំដាប់ពីតូចទៅធំ៖ 2 510 571 ; 2 538 505 ; 2 530 295 ; 263 895',
        placeholder: 'សរសេររៀបតាមលំដាប់ (ប្រើសញ្ញា " ; ")...',
        correctAnswer: '263 895 ; 2 510 571 ; 2 530 295 ; 2 538 505',
        explanation: 'លំដាប់ពីតូចទៅធំគឺ៖ 263 895 ; 2 510 571 ; 2 530 295 ; 2 538 505'
      },
      {
        id: 'hw_m1_p3_q5',
        type: 'text',
        questionText: '៥. រៀបលំដាប់ពីធំទៅតូច៖ 2 510 571 ; 2 538 505 ; 2 530 295 ; 263 895',
        placeholder: 'សរសេររៀបតាមលំដាប់ (ប្រើសញ្ញា " ; ")...',
        correctAnswer: '2 538 505 ; 2 530 295 ; 2 510 571 ; 263 895',
        explanation: 'លំដាប់ពីធំទៅតូចគឺ៖ 2 538 505 ; 2 530 295 ; 2 510 571 ; 263 895'
      },
      {
        id: 'hw_m1_p3_q6',
        type: 'choice',
        questionText: '៦. ចូរប្រៀបធៀបចំនួន 6 740 389 និង 6 729 889៖',
        options: [
          'ក. 6 740 389 > 6 729 889',
          'ខ. 6 740 389 < 6 729 889',
          'គ. 6 740 389 = 6 729 889'
        ],
        correctAnswer: 'ក. 6 740 389 > 6 729 889',
        explanation: '6 740 389 > 6 729 889 (ព្រោះខ្ទង់ម៉ឺន ៤ > 2)'
      },
      {
        id: 'hw_m1_p3_q7',
        type: 'choice',
        questionText: '៧. ចូរប្រៀបធៀបចំនួន 8 345 789 និង 8 402 121៖',
        options: [
          'ក. 8 345 789 > 8 402 121',
          'ខ. 8 345 789 < 8 402 121',
          'គ. 8 345 789 = 8 402 121'
        ],
        correctAnswer: 'ខ. 8 345 789 < 8 402 121',
        explanation: '8 345 789 < 8 402 121 (ព្រោះខ្ទង់សែន ៣ < ៤)'
      },
      {
        id: 'hw_m1_p3_q8',
        type: 'text',
        questionText: '៨. ចូររៀបលំដាប់ចំនួនពីតូចទៅធំ៖ 3 632 768; 3 575 985; 3 620 345; 3 590 137; 3 632 770',
        placeholder: 'សរសេររៀបតាមលំដាប់ (ប្រើសញ្ញា " ; ")...',
        correctAnswer: '3 575 985 ; 3 590 137 ; 3 620 345 ; 3 632 768 ; 3 632 770',
        explanation: 'លំដាប់ពីតូចទៅធំ៖ 3 575 985 ; 3 590 137 ; 3 620 345 ; 3 632 768 ; 3 632 770'
      },
      {
        id: 'hw_m1_p3_q9',
        type: 'text',
        questionText: '៩. ចូររៀបលំដាប់ចំនួនពីធំទៅតូច៖ 3 632 768; 3 575 985; 3 620 345; 3 590 137; 3 632 770',
        placeholder: 'សរសេររៀបតាមលំដាប់ (ប្រើសញ្ញា " ; ")...',
        correctAnswer: '3 632 770 ; 3 632 768 ; 3 620 345 ; 3 590 137 ; 3 575 985',
        explanation: 'លំដាប់ពីធំទៅតូច៖ 3 632 770 ; 3 632 768 ; 3 620 345 ; 3 590 137 ; 3 575 985'
      }
    ]
  },
  {
    id: 'hw_math_m1_p4',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១ (ផ្នែកទី៤)',
    lessonTitle: 'ការបង្គត់ចំនួន',
    topicTitle: '❖ ការបង្គត់ចំនួន (សៀវភៅសិស្សទំព័រ ៤)',
    icon: '🎯',
    bgGradient: 'from-amber-700 to-orange-800',
    badgeColor: 'bg-amber-700 text-white',
    questions: [
      {
        id: 'hw_m1_p4_q1',
        type: 'choice',
        questionText: '១. ចំនួន 2 782 150 នៅជិតចំនួនណាជាង?',
        options: [
          'ក. នៅជិត 2 000 000 ជាង',
          'ខ. នៅជិត 3 000 000 ជាង'
        ],
        correctAnswer: 'ខ. នៅជិត 3 000 000 ជាង',
        explanation: '២,៧៨២,១៥០ នៅជិត ៣,០០០,០០០ ជាង ២,០០០,០០០ ព្រោះខ្ទង់សែនគឺ ៧ (≥ ៥)។'
      },
      {
        id: 'hw_m1_p4_q2',
        type: 'text',
        questionText: '២. ចំនួន 2 782 150 បង្គត់ត្រឹមខ្ទង់លានគឺ៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '3,000,000',
        explanation: 'បង្គត់ឡើងបាន 3,000,000 (៣ ០០០ ០០០)។'
      },
      {
        id: 'hw_m1_p4_q3',
        type: 'choice',
        questionText: '៣. ចំនួន 5 623 501 នៅជិតចំនួនណាជាង?',
        options: [
          'ក. នៅជិត 5 600 000 ជាង',
          'ខ. នៅជិត 5 700 000 ជាង'
        ],
        correctAnswer: 'ក. នៅជិត 5 600 000 ជាង',
        explanation: '៥,៦២៣,៥០១ នៅជិត ៥,៦០០,០០០ ជាង ៥,៧០០,០០០ ព្រោះខ្ទង់ម៉ឺនគឺ ២ (< ៥)។'
      },
      {
        id: 'hw_m1_p4_q4',
        type: 'text',
        questionText: '៤. ចំនួន 5 623 501 បង្គត់ត្រឹមខ្ទង់សែនគឺ៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '5,600,000',
        explanation: 'បង្គត់ចុះបាន 5,600,000 (៥ ៦០០ ០០០)។'
      },
      {
        id: 'hw_m1_p4_q5',
        type: 'choice',
        questionText: '៥. បើខ្ទង់ខាងស្តាំបន្ទាប់ដែលត្រូវបង្គត់ជាលេខ 0, 1, 2, 3, 4 តើត្រូវបង្គត់ឡើង ឬបង្គត់ចុះ?',
        options: [
          'ក. បង្គត់ឡើង',
          'ខ. បង្គត់ចុះ'
        ],
        correctAnswer: 'ខ. បង្គត់ចុះ',
        explanation: 'បើខ្ទង់ខាងស្តាំបន្ទាប់មានលេខតូចជាង ៥ ត្រូវបង្គត់ចុះ។'
      },
      {
        id: 'hw_m1_p4_q6',
        type: 'choice',
        questionText: '៦. បើខ្ទង់ខាងស្តាំបន្ទាប់ដែលត្រូវបង្គត់ជាលេខ 5, 6, 7, 8, 9 តើត្រូវបង្គត់ឡើង ឬបង្គត់ចុះ?',
        options: [
          'ក. បង្គត់ឡើង',
          'ខ. បង្គត់ចុះ'
        ],
        correctAnswer: 'ក. បង្គត់ឡើង',
        explanation: 'បើខ្ទង់ខាងស្តាំបន្ទាប់មានលេខចាប់ពី ៥ ឡើងទៅ ត្រូវបង្គត់ឡើង។'
      },
      {
        id: 'hw_m1_p4_q7',
        type: 'text',
        questionText: '៧. ចូរបង្គត់ចំនួន 4 502 275 ត្រឹមខ្ទង់លាន៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '5,000,000',
        explanation: 'ខ្ទង់សែនគឺ ៥ (≥ ៥) ដូច្នេះបង្គត់ឡើងបាន 5,000,000។'
      },
      {
        id: 'hw_m1_p4_q8',
        type: 'text',
        questionText: '៨. ចូរបង្គត់ចំនួន 7 489 564 ត្រឹមខ្ទង់លាន៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '7,000,000',
        explanation: 'ខ្ទង់សែនគឺ ៤ (< ៥) ដូច្នេះបង្គត់ចុះបាន 7,000,000។'
      },
      {
        id: 'hw_m1_p4_q9',
        type: 'text',
        questionText: '៩. ចូរបង្គត់ចំនួន 5 601 637 ត្រឹមខ្ទង់លាន៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '6,000,000',
        explanation: 'ខ្ទង់សែនគឺ ៦ (≥ ៥) ដូច្នេះបង្គត់ឡើងបាន 6,000,000។'
      },
      {
        id: 'hw_m1_p4_q10',
        type: 'text',
        questionText: '១០. ចូរបង្គត់ចំនួន 8 508 954 ត្រឹមខ្ទង់សែន៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '8,500,000',
        explanation: 'ខ្ទង់ម៉ឺនគឺ ០ (< ៥) ដូច្នេះបង្គត់ចុះបាន 8,500,000។'
      },
      {
        id: 'hw_m1_p4_q11',
        type: 'text',
        questionText: '១១. ចូរបង្គត់ចំនួន 6 170 756 ត្រឹមខ្ទង់សែន៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '6,200,000',
        explanation: 'ខ្ទង់ម៉ឺនគឺ ៧ (≥ ៥) ដូច្នេះបង្គត់ឡើងបាន 6,200,000។'
      },
      {
        id: 'hw_m1_p4_q12',
        type: 'text',
        questionText: '១២. កសិករក្នុងសហគមន៍មួយទទួលទិន្នផលស្រូវបាន 648 578 តោន។ ចូរបង្គត់ចំនួនត្រឹមខ្ទង់ម៉ឺន៖',
        placeholder: 'សរសេរចំនួនបង្គត់...',
        correctAnswer: '650,000',
        explanation: 'ខ្ទង់ពាន់គឺ ៨ (≥ ៥) ដូច្នេះបង្គត់ឡើងបាន 650,000។'
      }
    ]
  },
  {
    id: 'hw_math_m2_p1',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២ (ផ្នែកទី១)',
    lessonTitle: 'អំណាន និងសំណេរចំនួនទសភាគ',
    topicTitle: '❖ អំណាន និងសំណេរចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ៥)',
    icon: '📖',
    bgGradient: 'from-orange-500 to-amber-700',
    badgeColor: 'bg-orange-500 text-white',
    questions: [
      {
        id: 'hw_m2_p1_q1',
        type: 'choice',
        questionText: '១. ចូរមើលសៀវភៅសិស្សទំព័រ ៥ (ចំណុច អំណាន និងសំណេរចំនួនទសភាគ)៖ បើគេមានចំនួនទសភាគ 1.025 តើចំនួននេះសរសេរជាប្រភាគយ៉ាងដូចម្តេច?',
        options: [
          'ក. 1025/10',
          'ខ. 1025/100',
          'គ. 1025/1000',
          'ឃ. 1025/10000'
        ],
        correctAnswer: 'គ. 1025/1000',
        explanation: 'ចំនួនទសភាគ 1.025 មានខ្ទង់ទសភាគ ៣ ខ្ទង់ ដូច្នេះសរសេរជាប្រភាគគឺ 1025/1000 ។'
      },
      {
        id: 'hw_m2_p1_q2',
        type: 'choice',
        questionText: '២. តើចំនួនទសភាគ 1.025 ខាងលើនេះ គេអានជាអក្សរយ៉ាងដូចម្តេច?',
        options: [
          'ក. មួយក្បៀសម្ភៃប្រាំ',
          'ខ. មួយក្បៀសសូន្យម្ភៃប្រាំ',
          'គ. មួយក្បៀសសូន្យពីរប្រាំ',
          'ឃ. ដប់ក្បៀសម្ភៃប្រាំ'
        ],
        correctAnswer: 'ខ. មួយក្បៀសសូន្យម្ភៃប្រាំ',
        explanation: '1.025 អានថា មួយក្បៀសសូន្យម្ភៃប្រាំ (ឬ មួយ និងម្ភៃប្រាំភាគពាន់)។'
      },
      {
        id: 'hw_m2_p1_q3',
        type: 'choice',
        questionText: '៣. ចូរមើលសៀវភៅសិស្សទំព័រ ៥ ដដែល៖ បើគេមានប្រភាគ 135/1000 សរសេរជាចំនួនទសភាគបាន 0.135 តើចំនួននេះអានយ៉ាងដូចម្តេច?',
        options: [
          'ក. សូន្យក្បៀសដប់ប្រាំ',
          'ខ. សូន្យក្បៀសមួយរយសាមសិបប្រាំ',
          'គ. សូន្យក្បៀសដប់បីប្រាំ',
          'ឃ. មួយរយសាមសិបប្រាំ'
        ],
        correctAnswer: 'ខ. សូន្យក្បៀសមួយរយសាមសិបប្រាំ',
        explanation: '0.135 អានថា សូន្យក្បៀសមួយរយសាមសិបប្រាំ (ឬ មួយរយសាមសិបប្រាំភាគពាន់)។'
      },
      {
        id: 'hw_m2_p1_q4',
        type: 'text',
        questionText: '៤. [ផ្នែក ខ] ចូរសរសេរប្រភាគ 87/1000 ជាចំនួនទសភាគ៖',
        placeholder: 'ឧ. 0.087',
        correctAnswer: '0.087',
        explanation: '87/1000 = 0.087'
      },
      {
        id: 'hw_m2_p1_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរសរសេរប្រភាគ 367/1000 ជាចំនួនទសភាគ៖',
        placeholder: 'ឧ. 0.367',
        correctAnswer: '0.367',
        explanation: '367/1000 = 0.367'
      },
      {
        id: 'hw_m2_p1_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរសរសេរប្រភាគ 6523/1000 ជាចំនួនទសភាគ៖',
        placeholder: 'ឧ. 6.523',
        correctAnswer: '6.523',
        explanation: '6523/1000 = 6.523'
      },
      {
        id: 'hw_m2_p1_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូរសរសេរប្រភាគ 43127/1000 ជាចំនួនទសភាគ៖',
        placeholder: 'ឧ. 43.127',
        correctAnswer: '43.127',
        explanation: '43127/1000 = 43.127'
      },
      {
        id: 'hw_m2_p1_q8',
        type: 'choice',
        questionText: '៨. [ផ្នែក ខ] ចូរសរសេរពាក្យអំណាននៃចំនួនទសភាគ 0.056 ៖',
        options: [
          'ក. សូន្យក្បៀសសូន្យហាសិបប្រាំមួយ',
          'ខ. សូន្យក្បៀសហាសិបប្រាំមួយ',
          'គ. សូន្យក្បៀសសូន្យប្រាំប្រាំមួយ',
          'ឃ. សូន្យក្បៀសប្រាំប្រាំមួយ'
        ],
        correctAnswer: 'ក. សូន្យក្បៀសសូន្យហាសិបប្រាំមួយ',
        explanation: '0.056 អានថា "សូន្យក្បៀសសូន្យហាសិបប្រាំមួយ"។'
      },
      {
        id: 'hw_m2_p1_q9',
        type: 'choice',
        questionText: '៩. [ផ្នែក ខ] ចូរសរសេរពាក្យអំណាននៃចំនួនទសភាគ 34.120 ៖',
        options: [
          'ក. សាមសិបបួនក្បៀសដប់ពីរ',
          'ខ. សាមសិបបួនក្បៀសមួយរយម្ភៃ',
          'គ. បីបួនក្បៀសមួយពីរ',
          'ឃ. សាមសិបបួនក្បៀសមួយពីរសូន្យ'
        ],
        correctAnswer: 'ខ. សាមសិបបួនក្បៀសមួយរយម្ភៃ',
        explanation: '34.120 អានថា "សាមសិបបួនក្បៀសមួយរយម្ភៃ" (ឬ សាមសិបបួន និងមួយរយម្ភៃភាគពាន់)។'
      },
      {
        id: 'hw_m2_p1_q10',
        type: 'choice',
        questionText: '១០. [ផ្នែក ខ] ចូរសរសេរពាក្យអំណាននៃចំនួនទសភាគ 76.034 ៖',
        options: [
          'ក. ចិតសិបប្រាំមួយក្បៀសសាមសិបបួន',
          'ខ. ចិតសិបប្រាំមួយក្បៀសសូន្យសាមសិបបួន',
          'គ. ចិតសិបប្រាំមួយក្បៀសសូន្យបីបួន',
          'ឃ. ប្រាំពីរប្រាំមួយក្បៀសសូន្យសាមសិបបួន'
        ],
        correctAnswer: 'ខ. ចិតសិបប្រាំមួយក្បៀសសូន្យសាមសិបបួន',
        explanation: '76.034 អានថា "ចិតសិបប្រាំមួយក្បៀសសូន្យសាមសិបបួន"។'
      },
      {
        id: 'hw_m2_p1_q11',
        type: 'choice',
        questionText: '១១. [ផ្នែក ខ] ចូរសរសេរពាក្យអំណាននៃចំនួនទសភាគ 8.543 ៖',
        options: [
          'ក. ប្រាំបីក្បៀសប្រាំរយសែសិបបី',
          'ខ. ប្រាំបីក្បៀសហាសិបបួនបី',
          'គ. ប្រាំបីក្បៀសប្រាំបួនបី',
          'ឃ. ប្រាំបីក្បៀសប្រាំសែសិបបី'
        ],
        correctAnswer: 'ក. ប្រាំបីក្បៀសប្រាំរយសែសិបបី',
        explanation: '8.543 អានថា "ប្រាំបីក្បៀសប្រាំរយសែសិបបី"។'
      }
    ]
  },
  {
    id: 'hw_math_m2_p2',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២ (ផ្នែកទី២)',
    lessonTitle: 'ខ្ទង់ និងតម្លៃលេខតាមខ្ទង់',
    topicTitle: '❖ ខ្ទង់ និងតម្លៃលេខតាមខ្ទង់ចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ៦)',
    icon: '🎯',
    bgGradient: 'from-orange-500 to-amber-700',
    badgeColor: 'bg-orange-500 text-white',
    questions: [
      {
        id: 'hw_m2_p2_q1',
        type: 'choice',
        questionText: '១. ចូរមើលសៀវភៅសិស្សទំព័រ ៦ (ខ្ទង់ និងតម្លៃលេខតាមខ្ទង់)៖ ក្នុងចំនួន 36.458 តើតួលេខ ៣ និង ៦ នៅផ្នែកគត់ ស្ថិតនៅខ្ទង់ណាខ្លះ និងមានតម្លៃប៉ុន្មាន?',
        options: [
          'ក. លេខ ៣ នៅខ្ទង់រាយ តម្លៃ ៣, លេខ ៦ នៅខ្ទង់ដប់ តម្លៃ ៦០',
          'ខ. លេខ ៣ នៅខ្ទង់ដប់ តម្លៃ ៣០, លេខ ៦ នៅខ្ទង់រាយ តម្លៃ ៦',
          'គ. លេខ ៣ នៅខ្ទង់ភាគដប់ តម្លៃ ០.៣, លេខ ៦ នៅខ្ទង់រាយ តម្លៃ ៦',
          'ឃ. លេខ ៣ នៅខ្ទង់ដប់ តម្លៃ ៣, លេខ ៦ នៅខ្ទង់រាយ តម្លៃ ០.៦'
        ],
        correctAnswer: 'ខ. លេខ ៣ នៅខ្ទង់ដប់ តម្លៃ ៣០, លេខ ៦ នៅខ្ទង់រាយ តម្លៃ ៦',
        explanation: 'ក្នុងចំនួន 36.458 ៖ លេខ ៣ នៅខ្ទង់ដប់ (តម្លៃ ៣០) និងលេខ ៦ នៅខ្ទង់រាយ (តម្លៃ ៦)។'
      },
      {
        id: 'hw_m2_p2_q2',
        type: 'choice',
        questionText: '២. ក្នុងចំនួន 36.458 តើតួលេខ ៤ នៅក្រោយក្បៀស ស្ថិតនៅខ្ទង់អ្វី និងមានតម្លៃប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់ភាគដប់ តម្លៃ ០.៤',
          'ខ. ខ្ទង់ភាគរយ តម្លៃ ០.០៤',
          'គ. ខ្ទង់ភាគពាន់ តម្លៃ ០.០០៤',
          'ឃ. ខ្ទង់ដប់ តម្លៃ ៤០'
        ],
        correctAnswer: 'ក. ខ្ទង់ភាគដប់ តម្លៃ ០.៤',
        explanation: 'តួលេខ ៤ នៅក្រោយក្បៀសខ្ទង់ទីមួយ គឺស្ថិតនៅខ្ទង់ភាគដប់ មានតម្លៃ ០.៤។'
      },
      {
        id: 'hw_m2_p2_q3',
        type: 'choice',
        questionText: '៣. ក្នុងចំនួន 36.458 តើតួលេខ ៥ និង ៨ ស្ថិតនៅខ្ទង់ណាខ្លះ និងមានតម្លៃប៉ុន្មាន?',
        options: [
          'ក. លេខ ៥ នៅខ្ទង់ភាគដប់ តម្លៃ ០.៥, លេខ ៨ នៅខ្ទង់ភាគរយ តម្លៃ ០.០៨',
          'ខ. លេខ ៥ នៅខ្ទង់ភាគរយ តម្លៃ ០.០៥, លេខ ៨ នៅខ្ទង់ភាគពាន់ តម្លៃ ០.០០៨',
          'គ. លេខ ៥ នៅខ្ទង់ភាគរយ តម្លៃ ០.៥, លេខ ៨ នៅខ្ទង់ភាគពាន់ តម្លៃ ០.០៨',
          'ឃ. លេខ ៥ នៅខ្ទង់ដប់ តម្លៃ ៥០, លេខ ៨ នៅខ្ទង់រាយ តម្លៃ ៨'
        ],
        correctAnswer: 'ខ. លេខ ៥ នៅខ្ទង់ភាគរយ តម្លៃ ០.០៥, លេខ ៨ នៅខ្ទង់ភាគពាន់ តម្លៃ ០.០០៨',
        explanation: 'លេខ ៥ នៅខ្ទង់ភាគរយ (តម្លៃ ០.០៥) និងលេខ ៨ នៅខ្ទង់ភាគពាន់ (តម្លៃ ០.០០៨)។'
      },
      {
        id: 'hw_m2_p2_q4',
        type: 'choice',
        questionText: '៤. ចូរសរសេរចំនួន 36.458 ជាទម្រង់ពង្រាយ៖',
        options: [
          'ក. 30 + 6 + 4 + 5 + 8',
          'ខ. 30 + 6 + 0.4 + 0.05 + 0.008',
          'គ. 3 + 6 + 0.4 + 0.05 + 0.008',
          'ឃ. 300 + 60 + 4 + 0.5 + 0.08'
        ],
        correctAnswer: 'ខ. 30 + 6 + 0.4 + 0.05 + 0.008',
        explanation: 'ទម្រង់ពង្រាយនៃ 36.458 គឺ 30 + 6 + 0.4 + 0.05 + 0.008 ។'
      },
      {
        id: 'hw_m2_p2_q5',
        type: 'choice',
        questionText: '៥. [ផ្នែក ខ] ក្នុងចំនួន 534.867 តើតួលេខ ៣ នៅខ្ទង់ដប់ និងតួលេខ ៨ នៅខ្ទង់ភាគដប់ មានតម្លៃប៉ុន្មានរៀងគ្នា?',
        options: [
          'ក. លេខ ៣ មានតម្លៃ ៣, លេខ ៨ មានតម្លៃ ៨',
          'ខ. លេខ ៣ មានតម្លៃ ៣០, លេខ ៨ មានតម្លៃ ០.៨',
          'គ. លេខ ៣ មានតម្លៃ ៣០០, លេខ ៨ មានតម្លៃ ០.០៨',
          'ឃ. លេខ ៣ មានតម្លៃ ៣០, លេខ ៨ មានតម្លៃ ៨'
        ],
        correctAnswer: 'ខ. លេខ ៣ មានតម្លៃ ៣០, លេខ ៨ មានតម្លៃ ០.៨',
        explanation: 'លេខ ៣ នៅខ្ទង់ដប់ មានតម្លៃ ៣០, លេខ ៨ នៅខ្ទង់ភាគដប់ មានតម្លៃ ០.៨។'
      },
      {
        id: 'hw_m2_p2_q6',
        type: 'choice',
        questionText: '៦. [ផ្នែក ខ] ក្នុងចំនួន 534.867 តើតួលេខ ៧ នៅខ្ទង់ណា ហើយមានតម្លៃប៉ុន្មាន? និងតួលេខ ៥ នៅខ្ទង់ណា ហើយមានតម្លៃប៉ុន្មាន?',
        options: [
          'ក. លេខ ៧ នៅខ្ទង់ភាគរយ តម្លៃ ០.០៧, លេខ ៥ នៅខ្ទង់រាយ តម្លៃ ៥',
          'ខ. លេខ ៧ នៅខ្ទង់ភាគពាន់ តម្លៃ ០.០០៧, លេខ ៥ នៅខ្ទង់រយ តម្លៃ ៥០០',
          'គ. លេខ ៧ នៅខ្ទង់ភាគពាន់ តម្លៃ ០.០៧, លេខ ៥ នៅខ្ទង់រយ តម្លៃ ៥០',
          'ឃ. លេខ ៧ នៅខ្ទង់ភាគដប់ តម្លៃ ០.៧, លេខ ៥ នៅខ្ទង់ដប់ តម្លៃ ៥០'
        ],
        correctAnswer: 'ខ. លេខ ៧ នៅខ្ទង់ភាគពាន់ តម្លៃ ០.០០៧, លេខ ៥ នៅខ្ទង់រយ តម្លៃ ៥០០',
        explanation: 'លេខ ៧ នៅខ្ទង់ភាគពាន់ មានតម្លៃ ០.០០៧; លេខ ៥ នៅខ្ទង់រយ មានតម្លៃ ៥០០។'
      },
      {
        id: 'hw_m2_p2_q7',
        type: 'choice',
        questionText: '៧. [ផ្នែក ខ] ចូរប្រាប់ខ្ទង់ និងតម្លៃនៃតួលេខដែលគូសបន្ទាត់ពីក្រោម ក្នុងចំនួន 45.[7]63 (គូសក្រោមលេខ ៧)៖',
        options: [
          'ក. ខ្ទង់ភាគដប់ មានតម្លៃ ០.៧',
          'ខ. ខ្ទង់ភាគរយ មានតម្លៃ ០.០៧',
          'គ. ខ្ទង់ភាគពាន់ មានតម្លៃ ០.០០៧',
          'ឃ. ខ្ទង់រាយ មានតម្លៃ ៧'
        ],
        correctAnswer: 'ក. ខ្ទង់ភាគដប់ មានតម្លៃ ០.៧',
        explanation: 'លេខ ៧ គូសបន្ទាត់ពីក្រោម ស្ថិតនៅខ្ទង់ភាគដប់ មានតម្លៃ ០.៧។'
      },
      {
        id: 'hw_m2_p2_q8',
        type: 'choice',
        questionText: '៨. [ផ្នែក ខ] ចូរប្រាប់ខ្ទង់ និងតម្លៃនៃតួលេខដែលគូសបន្ទាត់ពីក្រោម ក្នុងចំនួន 0.50[7] (គូសក្រោមលេខ ៧)៖',
        options: [
          'ក. ខ្ទង់ភាគរយ មានតម្លៃ ០.០៧',
          'ខ. ខ្ទង់ភាគពាន់ មានតម្លៃ ០.០០៧',
          'គ. ខ្ទង់ភាគដប់ មានតម្លៃ ០.៧',
          'ឃ. ខ្ទង់រាយ មានតម្លៃ ៧'
        ],
        correctAnswer: 'ខ. ខ្ទង់ភាគពាន់ មានតម្លៃ ០.០០៧',
        explanation: 'លេខ ៧ គូសបន្ទាត់ពីក្រោម ស្ថិតនៅខ្ទង់ភាគពាន់ មានតម្លៃ ០.០០៧។'
      },
      {
        id: 'hw_m2_p2_q9',
        type: 'choice',
        questionText: '៩. [ផ្នែក ខ] ចូរប្រាប់ខ្ទង់ និងតម្លៃនៃតួលេខដែលគូសបន្ទាត់ពីក្រោម ក្នុងចំនួន 25[9].453 (គូសក្រោមលេខ ៩)៖',
        options: [
          'ក. ខ្ទង់រាយ មានតម្លៃ ៩',
          'ខ. ខ្ទង់ដប់ មានតម្លៃ ៩០',
          'គ. ខ្ទង់រយ មានតម្លៃ ៩០០',
          'ឃ. ខ្ទង់ភាគដប់ មានតម្លៃ ០.៩'
        ],
        correctAnswer: 'ក. ខ្ទង់រាយ មានតម្លៃ ៩',
        explanation: 'លេខ ៩ គូសបន្ទាត់ពីក្រោម ស្ថិតនៅខ្ទង់រាយ មានតម្លៃ ៩។'
      }
    ]
  },
  {
    id: 'hw_math_m2_p3',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២ (ផ្នែកទី៣)',
    lessonTitle: 'ចំនួនទសភាគស្មើគ្នា និងការបង្គត់',
    topicTitle: '❖ ចំនួនទសភាគស្មើគ្នា និងការបង្គត់ចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ៧)',
    icon: '📊',
    bgGradient: 'from-orange-500 to-amber-700',
    badgeColor: 'bg-orange-500 text-white',
    questions: [
      {
        id: 'hw_m2_p3_q1',
        type: 'choice',
        questionText: '១. ចូរមើលសៀវភៅសិស្សទំព័រ ៧ (ចំនួនទសភាគមានតម្លៃស្មើគ្នា) ឧទាហរណ៍ទី១៖ ប្រភាគ 2/10 = 20/100 តាមរូបតំណាង តើគេអាចសរសេរចំនួនទសភាគស្មើគ្នាដូចម្តេច?',
        options: [
          'ក. 0.2 = 0.20',
          'ខ. 0.2 = 0.02',
          'គ. 0.2 = 2.0',
          'ឃ. 0.2 = 0.200'
        ],
        correctAnswer: 'ក. 0.2 = 0.20',
        explanation: '2/10 = 0.2 ហើយ 20/100 = 0.20 ដូច្នេះ 0.2 = 0.20 ។'
      },
      {
        id: 'hw_m2_p3_q2',
        type: 'choice',
        questionText: '២. តាមឧទាហរណ៍ទី២ និងបំពេញចន្លោះ៖ បើ 0.9 = 90/100 = 900/1000 នោះមានន័យថា 0.9 ស្មើនឹងចំនួនណាខ្លះ?',
        options: [
          'ក. 0.90 និង 0.900',
          'ខ. 0.09 និង 0.009',
          'គ. 9.0 និង 90.0',
          'ឃ. 0.9 = 9.0'
        ],
        correctAnswer: 'ក. 0.90 និង 0.900',
        explanation: '0.9 = 0.90 = 0.900 ព្រោះការបន្ថែមលេខសូន្យនៅខាងចុងផ្នែកទសភាគ មិនផ្លាស់ប្តូរតម្លៃរបស់វាឡើយ។'
      },
      {
        id: 'hw_m2_p3_q3',
        type: 'text',
        questionText: '៣. ចូរសរសេរចំនួន 12.000 សម្រួលជាចំនួនសាមញ្ញបំផុត៖',
        placeholder: 'ឧ. 12',
        correctAnswer: '12',
        explanation: '12.000 = 12 (លេខសូន្យនៅផ្នែកទសភាគខាងចុងអាចលុបបាន)'
      },
      {
        id: 'hw_m2_p3_q4',
        type: 'choice',
        questionText: '៤. តើការសរសេរលេខសូន្យបន្តពីក្រោយលេខនៅផ្នែកទសភាគ ធ្វើឱ្យចំនួនទសភាគផ្លាស់ប្តូរតម្លៃដែរឬទេ?',
        options: [
          'ក. បាទ/ចាស ធ្វើឱ្យផ្លាស់ប្តូរតម្លៃ',
          'ខ. ទេ មិនធ្វើឱ្យផ្លាស់ប្តូរតម្លៃឡើយ',
          'គ. ផ្លាស់ប្តូរតែផ្នែកគត់ប៉ុណ្ណោះ',
          'ឃ. អាស្រ័យលើចំនួនគត់ខាងមុខ'
        ],
        correctAnswer: 'ខ. ទេ មិនធ្វើឱ្យផ្លាស់ប្តូរតម្លៃឡើយ',
        explanation: 'ការសរសេរលេខសូន្យបន្តពីក្រោយលេខផ្នែកទសភាគ មិនធ្វើឱ្យចំនួនទសភាគនោះផ្លាស់ប្តូរតម្លៃទេ។'
      },
      {
        id: 'hw_m2_p3_q5',
        type: 'choice',
        questionText: '៥. ចូរមើលសៀវភៅសិស្សទំព័រ ៧ (ចំណុច ការបង្គត់ចំនួនទសភាគ)៖ បង្គត់ 2.362 ត្រឹមខ្ទង់ភាគរយ។ នៅខ្ទង់ភាគពាន់មានតួលេខ ២ ដូច្នេះយើងត្រូវបង្គត់ឡើង ឬបង្គត់ចុះ? ហើយទទួលបានលទ្ធផលប៉ុន្មាន?',
        options: [
          'ក. បង្គត់ឡើង ទទួលបាន 2.37',
          'ខ. បង្គត់ចុះ ទទួលបាន 2.36',
          'គ. បង្គត់ចុះ ទទួលបាន 2.3',
          'ឃ. បង្គត់ឡើង ទទួលបាន 2.4'
        ],
        correctAnswer: 'ខ. បង្គត់ចុះ ទទួលបាន 2.36',
        explanation: 'តួលេខខ្ទង់ភាគពាន់គឺ ២ (< ៥) ដូច្នេះយើងត្រូវបង្គត់ចុះ (លុបចោល) បានលទ្ធផល 2.36។'
      },
      {
        id: 'hw_m2_p3_q6',
        type: 'choice',
        questionText: '៦. បង្គត់ 15.385 ត្រឹមខ្ទង់ភាគដប់។ នៅខ្ទង់ភាគរយមានតួលេខ ៨ ដូច្នេះយើងត្រូវបង្គត់ឡើង ឬបង្គត់ចុះ? ហើយទទួលបានលទ្ធផលប៉ុន្មាន?',
        options: [
          'ក. បង្គត់ចុះ ទទួលបាន 15.3',
          'ខ. បង្គត់ឡើង ទទួលបាន 15.4',
          'គ. បង្គត់ឡើង ទទួលបាន 15.39',
          'ឃ. បង្គត់ចុះ ទទួលបាន 15.38'
        ],
        correctAnswer: 'ខ. បង្គត់ឡើង ទទួលបាន 15.4',
        explanation: 'តួលេខខ្ទង់ភាគរយគឺ ៨ (≥ ៥) ដូច្នេះយើងត្រូវបង្គត់ឡើង (ថែម ១ ទៅលើខ្ទង់ភាគដប់) បានលទ្ធផល 15.4។'
      },
      {
        id: 'hw_m2_p3_q7',
        type: 'choice',
        questionText: '៧. តើការបង្គត់ចំនួនទសភាគដូចគ្នានឹងការបង្គត់ចំនួនអ្វីដែរ?',
        options: [
          'ក. ចំនួនគត់',
          'ខ. ចំនួនសនិទាន',
          'គ. ចំនួនអសនិទាន',
          'ឃ. ប្រភាគ'
        ],
        correctAnswer: 'ក. ចំនួនគត់',
        explanation: 'ការបង្គត់ចំនួនទសភាគគឺប្រើគោលការណ៍ដូចគ្នានឹងការបង្គត់ចំនួនគត់ដែរ (ពិនិត្យតួលេខបន្ទាប់ បើ < ៥ បង្គត់ចុះ បើ ≥ ៥ បង្គត់ឡើង)។'
      },
      {
        id: 'hw_m2_p3_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូរបំពេញចន្លោះដើម្បីឱ្យបានចំនួនទសភាគស្មើគ្នា៖ 0.8 = 0.80 = ......',
        placeholder: 'ឧ. 0.800',
        correctAnswer: '0.800',
        explanation: '0.8 = 0.80 = 0.800'
      },
      {
        id: 'hw_m2_p3_q9',
        type: 'text',
        questionText: '៩. [ផ្នែក ខ] ចូរបំពេញចន្លោះដើម្បីឱ្យបានចំនួនទសភាគស្មើគ្នា៖ 2.5 = ...... = 2.500',
        placeholder: 'ឧ. 2.50',
        correctAnswer: '2.50',
        explanation: '2.5 = 2.50 = 2.500'
      },
      {
        id: 'hw_m2_p3_q10',
        type: 'text',
        questionText: '១០. [ផ្នែក ខ] បង្គត់ចំនួន 8.547 ត្រឹមខ្ទង់ភាគដប់៖',
        placeholder: 'ឧ. 8.5',
        correctAnswer: '8.5',
        explanation: 'ខ្ទង់ភាគរយគឺ ៤ (< ៥) នាំឱ្យបង្គត់ចុះបាន 8.5 ។'
      },
      {
        id: 'hw_m2_p3_q11',
        type: 'text',
        questionText: '១១. [ផ្នែក ខ] បង្គត់ចំនួន 8.547 ត្រឹមខ្ទង់ភាគរយ៖',
        placeholder: 'ឧ. 8.55',
        correctAnswer: '8.55',
        explanation: 'ខ្ទង់ភាគពាន់គឺ ៧ (≥ ៥) នាំឱ្យបង្គត់ឡើងបាន 8.55 ។'
      },
      {
        id: 'hw_m2_p3_q12',
        type: 'text',
        questionText: '១២. [ផ្នែក ខ] បង្គត់ចំនួន 234.605 ត្រឹមខ្ទង់ភាគដប់៖',
        placeholder: 'ឧ. 234.6',
        correctAnswer: '234.6',
        explanation: 'ខ្ទង់ភាគរយគឺ ០ (< ៥) នាំឱ្យបង្គត់ចុះបាន 234.6 ។'
      },
      {
        id: 'hw_m2_p3_q13',
        type: 'text',
        questionText: '១៣. [ផ្នែក ខ] បង្គត់ចំនួន 234.605 ត្រឹមខ្ទង់ភាគរយ៖',
        placeholder: 'ឧ. 234.61',
        correctAnswer: '234.61',
        explanation: 'ខ្ទង់ភាគពាន់គឺ ៥ (≥ ៥) នាំឱ្យបង្គត់ឡើងបាន 234.61 ។'
      }
    ]
  },
  {
    id: 'hw_math_m2_p4',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២ (ផ្នែកទី៤)',
    lessonTitle: 'ការប្រៀបធៀប និងរៀបលំដាប់',
    topicTitle: '❖ ការប្រៀបធៀប និងរៀបលំដាប់ចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ៨-៩)',
    icon: '⚖️',
    bgGradient: 'from-orange-500 to-amber-700',
    badgeColor: 'bg-orange-500 text-white',
    questions: [
      {
        id: 'hw_m2_p4_q1',
        type: 'choice',
        questionText: '១. ចូរមើលសៀវភៅសិស្សទំព័រ ៨ (ការប្រៀបធៀប និងរៀបលំដាប់)៖ តើចំនួន 36.272 និង 36.254 ណាមួយមានតម្លៃធំជាង?',
        options: [
          'ក. 36.272',
          'ខ. 36.254',
          'គ. ចំនួនទាំងពីរមានតម្លៃស្មើគ្នា'
        ],
        correctAnswer: 'ក. 36.272',
        explanation: 'ប្រៀបធៀបផ្នែកគត់គឺ ៣៦ ដូចគ្នា, ភាគដប់គឺ ២ ដូចគ្នា, តែខ្ទង់ភាគរយ ៧ ធំជាង ៥ នាំឱ្យ 36.272 > 36.254 ។'
      },
      {
        id: 'hw_m2_p4_q2',
        type: 'choice',
        questionText: '២. ចូររៀបលំដាប់ចំនួនទសភាគទាំងនេះពីតូចទៅធំ៖ 72.654 ; 72.683 ; 72.125 ; 73.109 ៖',
        options: [
          'ក. 72.125 ; 72.654 ; 72.683 ; 73.109',
          'ខ. 73.109 ; 72.683 ; 72.654 ; 72.125',
          'គ. 72.654 ; 72.125 ; 72.683 ; 73.109',
          'ឃ. 72.125 ; 72.683 ; 72.654 ; 73.109'
        ],
        correctAnswer: 'ក. 72.125 ; 72.654 ; 72.683 ; 73.109',
        explanation: 'រៀបលំដាប់ពីតូចទៅធំ៖ 72.125 < 72.654 < 72.683 < 73.109'
      },
      {
        id: 'hw_m2_p4_q3',
        type: 'choice',
        questionText: '៣. ចូររៀបលំដាប់ចំនួនទសភាគទាំងនេះពីធំទៅតូច៖ 72.654 ; 72.683 ; 72.125 ; 73.109 ៖',
        options: [
          'ក. 72.125 ; 72.654 ; 72.683 ; 73.109',
          'ខ. 73.109 ; 72.683 ; 72.654 ; 72.125',
          'គ. 73.109 ; 72.654 ; 72.683 ; 72.125',
          'ឃ. 72.683 ; 73.109 ; 72.654 ; 72.125'
        ],
        correctAnswer: 'ខ. 73.109 ; 72.683 ; 72.654 ; 72.125',
        explanation: 'រៀបលំដាប់ពីធំទៅតូច៖ 73.109 > 72.683 > 72.654 > 72.125'
      },
      {
        id: 'hw_m2_p4_q4',
        type: 'choice',
        questionText: '៤. [ផ្នែក ខ] ចូរប្រៀបធៀបចំនួនទសភាគ៖ 25.742 ...... 25.738 ៖',
        options: [
          'ក. >',
          'ខ. <',
          'គ. ='
        ],
        correctAnswer: 'ក. >',
        explanation: 'ខ្ទង់ភាគរយ ៤ > ៣ ដូច្នេះ 25.742 > 25.738'
      },
      {
        id: 'hw_m2_p4_q5',
        type: 'choice',
        questionText: '៥. [ផ្នែក ខ] ចូរប្រៀបធៀបចំនួនទសភាគ៖ 564.090 ...... 564.90 ៖',
        options: [
          'ក. >',
          'ខ. <',
          'គ. ='
        ],
        correctAnswer: 'ខ. <',
        explanation: 'ខ្ទង់ភាគដប់ ០ < ៩ ដូច្នេះ 564.090 < 564.90 (ព្រោះ 564.90 ស្មើនឹង 564.900)'
      },
      {
        id: 'hw_m2_p4_q6',
        type: 'choice',
        questionText: '៦. [ផ្នែក ខ] ចូរប្រៀបធៀបចំនួនទសភាគ៖ 67.85 ...... 67.850 ៖',
        options: [
          'ក. >',
          'ខ. <',
          'គ. ='
        ],
        correctAnswer: 'គ. =',
        explanation: '67.850 ស្មើនឹង 67.85 ព្រោះការលុប ឬបន្ថែមសូន្យនៅខាងចុងទសភាគ មិនផ្លាស់ប្តូរតម្លៃទេ'
      },
      {
        id: 'hw_m2_p4_q7',
        type: 'choice',
        questionText: '៧. [ផ្នែក ខ] ចូរប្រៀបធៀបចំនួនទសភាគ៖ 327.154 ...... 326.789 ៖',
        options: [
          'ក. >',
          'ខ. <',
          'គ. ='
        ],
        correctAnswer: 'ក. >',
        explanation: 'ប្រៀបធៀបផ្នែកគត់៖ ៣២៧ > ៣២៦ ដូច្នេះ 327.154 > 326.789'
      },
      {
        id: 'hw_m2_p4_q8',
        type: 'choice',
        questionText: '៨. [ផ្នែក ខ] ចូររៀបលំដាប់ចំនួនទសភាគខាងក្រោមពីតូចទៅធំ៖ 59.035 ; 59.354 ; 58.368 ; 59.350 ; 59.348 ៖',
        options: [
          'ក. 58.368 ; 59.035 ; 59.348 ; 59.350 ; 59.354',
          'ខ. 59.035 ; 58.368 ; 59.348 ; 59.350 ; 59.354',
          'គ. 58.368 ; 59.035 ; 59.350 ; 59.348 ; 59.354',
          'ឃ. 59.354 ; 59.350 ; 59.348 ; 59.035 ; 58.368'
        ],
        correctAnswer: 'ក. 58.368 ; 59.035 ; 59.348 ; 59.350 ; 59.354',
        explanation: 'រៀបលំដាប់ត្រឹមត្រូវពីតូចទៅធំ៖ 58.368 < 59.035 < 59.348 < 59.350 < 59.354'
      },
      {
        id: 'hw_m2_p4_q9',
        type: 'choice',
        questionText: '៩. [ផ្នែក ខ] ចូររៀបលំដាប់ចំនួនទសភាគខាងក្រោមពីធំទៅតូច៖ 59.035 ; 59.354 ; 58.368 ; 59.350 ; 59.348 ៖',
        options: [
          'ក. 58.368 ; 59.035 ; 59.348 ; 59.350 ; 59.354',
          'ខ. 59.354 ; 59.350 ; 59.348 ; 59.035 ; 58.368',
          'គ. 59.354 ; 59.348 ; 59.350 ; 59.035 ; 58.368',
          'ឃ. 59.350 ; 59.354 ; 59.348 ; 59.035 ; 58.368'
        ],
        correctAnswer: 'ខ. 59.354 ; 59.350 ; 59.348 ; 59.035 ; 58.368',
        explanation: 'រៀបលំដាប់ត្រឹមត្រូវពីធំទៅតូច៖ 59.354 > 59.350 > 59.348 > 59.035 > 58.368'
      }
    ]
  },
  {
    id: 'hw_math_m3_p1',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី១)',
    lessonTitle: 'ការបូកចំនួនទសភាគនឹងចំនួនគត់',
    topicTitle: '❖ ការបូកចំនួនទសភាគនឹងចំនួនគត់ (សៀវភៅសិស្សទំព័រ ៩)',
    icon: '➕',
    bgGradient: 'from-orange-500 to-amber-700',
    badgeColor: 'bg-orange-500 text-white',
    questions: [
      {
        id: 'hw_m3_p1_q1',
        type: 'choice',
        questionText: '១. [ផ្នែក ក] តើម្តាយស៊ីណាតត្បាញក្រមាថ្ងៃទី១ បានប៉ុន្មានម៉ែត្រ? ហើយថ្ងៃទី២ បានប៉ុន្មានម៉ែត្រ?',
        options: [
          'ក. ថ្ងៃទី១ បាន ៤.៥ ម៉ែត្រ និងថ្ងៃទី២ បាន ៣ ម៉ែត្រ',
          'ខ. ថ្ងៃទី១ បាន ៣ ម៉ែត្រ និងថ្ងៃទី២ បាន ៤.៥ ម៉ែត្រ',
          'គ. ថ្ងៃទី១ បាន ៤.៥ ម៉ែត្រ និងថ្ងៃទី២ បាន ៥ ម៉ែត្រ'
        ],
        correctAnswer: 'ក. ថ្ងៃទី១ បាន ៤.៥ ម៉ែត្រ និងថ្ងៃទី២ បាន ៣ ម៉ែត្រ',
        explanation: 'តាមខ្លឹមសារចំណោទ៖ ថ្ងៃទី១ ម្តាយស៊ីណាតត្បាញបាន ៤.៥ម និងថ្ងៃទី២ បាន ៣ម។'
      },
      {
        id: 'hw_m3_p1_q2',
        type: 'choice',
        questionText: '២. [ផ្នែក ក] តើប្រធានចំណោទគេសួររកអ្វី? ហើយមានចម្លើយស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. សួររកប្រវែងក្រមាសរុបដែលម្តាយស៊ីណាតត្បាញបាន ស្មើនឹង ៧.៥ ម៉ែត្រ',
          'ខ. សួររកប្រវែងក្រមាសរុបដែលម្តាយស៊ីណាតត្បាញបាន ស្មើនឹង ៤.៨ ម៉ែត្រ',
          'គ. សួររកទម្ងន់ក្រមាសរុបដែលម្តាយស៊ីណាតត្បាញបាន ស្មើនឹង ៧.៥ គីឡូក្រាម'
        ],
        correctAnswer: 'ក. សួររកប្រវែងក្រមាសរុបដែលម្តាយស៊ីណាតត្បាញបាន ស្មើនឹង ៧.៥ ម៉ែត្រ',
        explanation: 'ប្រធានចំណោទសួររកប្រវែងក្រមាសរុប៖ ៤.៥ + ៣ = ៧.៥ ម៉ែត្រ។'
      },
      {
        id: 'hw_m3_p1_q3',
        type: 'choice',
        questionText: '៣. [ផ្នែក ក] ដើម្បីបូកចំនួនទសភាគនឹងចំនួនគត់ តើគេត្រូវធ្វើដូចម្តេច?',
        options: [
          'ក. គេសរសេរចំនួនគត់នៅក្រោមផ្នែកគត់ឱ្យត្រូវតាមខ្ទង់ រួចបូកដូចចំនួនគត់ ហើយដាក់ក្បៀសឱ្យត្រង់ចុះមកក្រោម',
          'ខ. គេសរសេរចំនួនគត់នៅក្រោមផ្នែកទសភាគឱ្យត្រូវតាមខ្ទង់',
          'គ. គេបូកចំនួនគត់នឹងផ្នែកទសភាគតែម្តង'
        ],
        correctAnswer: 'ក. គេសរសេរចំនួនគត់នៅក្រោមផ្នែកគត់ឱ្យត្រូវតាមខ្ទង់ រួចបូកដូចចំនួនគត់ ហើយដាក់ក្បៀសឱ្យត្រង់ចុះមកក្រោម',
        explanation: 'ច្បាប់នៃការបូកចំនួនទសភាគនឹងចំនួនគត់ គឺត្រូវដាក់ផ្នែកគត់នៅក្រោមផ្នែកគត់ឱ្យចំខ្ទង់។'
      },
      {
        id: 'hw_m3_p1_q4',
        type: 'choice',
        questionText: '៤. [ផ្នែក ខ] ចូរជ្រើសរើសចម្លើយត្រឹមត្រូវនៃផលបូក 25.421 + 26 ៖',
        options: [
          'ក. 411.421',
          'ខ. 52.421',
          'គ. 51.421',
          'ឃ. 41.421'
        ],
        correctAnswer: 'គ. 51.421',
        explanation: '25.421 + 26.000 = 51.421 ។'
      },
      {
        id: 'hw_m3_p1_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 67.835 + 77 = ?',
        placeholder: 'ឧ. 144.835',
        correctAnswer: '144.835',
        explanation: '67.835 + 77.000 = 144.835'
      },
      {
        id: 'hw_m3_p1_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 56 + 297.08 = ?',
        placeholder: 'ឧ. 353.08',
        correctAnswer: '353.08',
        explanation: '56.00 + 297.08 = 353.08'
      },
      {
        id: 'hw_m3_p1_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 45 + 27.56 + 85 = ?',
        placeholder: 'ឧ. 157.56',
        correctAnswer: '157.56',
        explanation: '45.00 + 27.56 + 85.00 = 157.56'
      },
      {
        id: 'hw_m3_p1_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 76 + 35.640 + 8.073 = ?',
        placeholder: 'ឧ. 119.713',
        correctAnswer: '119.713',
        explanation: '76.000 + 35.640 + 8.073 = 119.713'
      },
      {
        id: 'hw_m3_p1_q9',
        type: 'text',
        questionText: '៩. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 46 + 26.209 + 78 + 5.634 = ?',
        placeholder: 'ឧ. 155.843',
        correctAnswer: '155.843',
        explanation: '46.000 + 26.209 + 78.000 + 5.634 = 155.843'
      }
    ]
  },
  {
    id: 'hw_math_m3_p2',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី២)',
    lessonTitle: 'ការបូកចំនួនទសភាគនឹងចំនួនទសភាគ',
    topicTitle: '❖ ការបូកចំនួនទសភាគនឹងចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ១០)',
    icon: '📊',
    bgGradient: 'from-amber-500 to-orange-700',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m3_p2_q1',
        type: 'text',
        questionText: '១. [ផ្នែក ក] បំពេញចំនួនតាងឱ្យផលបូក៖ 3.356 + 40.513 = ?',
        placeholder: 'ឧ. 43.869',
        correctAnswer: '43.869',
        explanation: '3.356 + 40.513 = 43.869'
      },
      {
        id: 'hw_m3_p2_q2',
        type: 'text',
        questionText: '២. [ផ្នែក ក] បំពេញចំនួនតាងឱ្យផលបូក៖ 163.251 + 32.8 = ? (ត្រូវថែមសូន្យលើ 32.8 ឱ្យបាន 32.800)',
        placeholder: 'ឧ. 196.051',
        correctAnswer: '196.051',
        explanation: '163.251 + 32.800 = 196.051'
      },
      {
        id: 'hw_m3_p2_q3',
        type: 'choice',
        questionText: '៣. [ផ្នែក ក] តើដើម្បីបូកចំនួនទសភាគនឹងចំនួនទសភាគ គេត្រូវធ្វើដូចម្តេច?',
        options: [
          'ក. សរសេរផ្នែកគត់ក្រោមផ្នែកគត់ ផ្នែកទសភាគក្រោមផ្នែកទសភាគ ក្បៀសឱ្យចំក្បៀស រួចបូកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់ចុះមកក្រោម',
          'ខ. សរសេរផ្នែកគត់ឱ្យចំផ្នែកទសភាគ រួចបូកចូលគ្នា',
          'គ. គេបូកតែផ្នែកគត់ និងផ្នែកគត់ រីឯផ្នែកទសភាគទុកដដែល'
        ],
        correctAnswer: 'ក. សរសេរផ្នែកគត់ក្រោមផ្នែកគត់ ផ្នែកទសភាគក្រោមផ្នែកទសភាគ ក្បៀសឱ្យចំក្បៀស រួចបូកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់ចុះមកក្រោម',
        explanation: 'ច្បាប់នៃការបូកចំនួនទសភាគនឹងចំនួនទសភាគ គឺត្រូវដាក់ខ្ទង់គត់ និងខ្ទង់ទសភាគឱ្យចំគ្នា រួមទាំងក្បៀសផងដែរ។'
      },
      {
        id: 'hw_m3_p2_q4',
        type: 'choice',
        questionText: '៤. [ផ្នែក ខ] ចូរជ្រើសរើសចម្លើយត្រឹមត្រូវនៃផលបូក 27.345 + 6.437 ៖',
        options: [
          'ក. 213.7712',
          'ខ. 33.782',
          'គ. 33.772',
          'ឃ. 23.782'
        ],
        correctAnswer: 'ខ. 33.782',
        explanation: '27.345 + 6.437 = 33.782'
      },
      {
        id: 'hw_m3_p2_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 456.078 + 82.563 = ?',
        placeholder: 'ឧ. 538.641',
        correctAnswer: '538.641',
        explanation: '456.078 + 82.563 = 538.641'
      },
      {
        id: 'hw_m3_p2_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 89.474 + 740.595 = ?',
        placeholder: 'ឧ. 830.069',
        correctAnswer: '830.069',
        explanation: '89.474 + 740.595 = 830.069'
      },
      {
        id: 'hw_m3_p2_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 634.5 + 70.367 + 8.09 = ?',
        placeholder: 'ឧ. 712.957',
        correctAnswer: '712.957',
        explanation: '634.500 + 70.367 + 8.090 = 712.957'
      },
      {
        id: 'hw_m3_p2_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូរគណនាផលបូក៖ 7.78 + 564.09 + 88.067 = ?',
        placeholder: 'ឧ. 659.937',
        correctAnswer: '659.937',
        explanation: '7.780 + 564.090 + 88.067 = 659.937'
      }
    ]
  },
  {
    id: 'hw_math_m3_p3',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី៣)',
    lessonTitle: 'ការប៉ាន់ស្មានផលបូកចំនួនទសភាគ',
    topicTitle: '❖ ការប៉ាន់ស្មានផលបូកចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ១១)',
    icon: '🎯',
    bgGradient: 'from-yellow-500 to-orange-700',
    badgeColor: 'bg-yellow-600 text-white',
    questions: [
      {
        id: 'hw_m3_p3_q1',
        type: 'choice',
        questionText: '១. [ផ្នែក ក] តើពូលីប្រមូលផលគ្រាប់កាហ្វេលើកទី១ លើកទី២ និងលើកទី៣ មួយលើកៗបានប៉ុន្មានគីឡូក្រាម?',
        options: [
          'ក. លើកទី១ បាន ២៧.៨៥ គក, លើកទី២ បាន ៤៣.៥ គក និងលើកទី៣ បាន ១៥.៤២ គក',
          'ខ. លើកទី១ បាន ៣០ គក, លើកទី២ បាន ៤០ គក និងលើកទី៣ បាន ១៥ គក',
          'គ. លើកទី១ បាន ២៥ គក, លើកទី២ បាន ៤៥ គក និងលើកទី៣ បាន ១៦ គក'
        ],
        correctAnswer: 'ក. លើកទី១ បាន ២៧.៨៥ គក, លើកទី២ បាន ៤៣.៥ គក និងលើកទី៣ បាន ១៥.4២ គក',
        explanation: 'តាមខ្លឹមសារចំណោទ៖ លើកទី១ បាន ២៧.៨៥គក, លើកទី២ បាន ៤៣.៥គក និងលើកទី៣ បាន ១៥.៤២គក។'
      },
      {
        id: 'hw_m3_p3_q2',
        type: 'choice',
        questionText: '២. [ផ្នែក ក] តើប្រធានចំណោទគេសួររកអ្វី? ហើយមានចម្លើយស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. សួររកផលបូកប្រហែលនៃទម្ងន់គ្រាប់កាហ្វេសរុប ស្មើនឹងប្រហែល ៨៧ គក (ពិតប្រាកដគឺ ៨៦.៧៧ គក)',
          'ខ. សួររកប្រវែងគ្រាប់កាហ្វេ ស្មើនឹង ៨៥ ម៉ែត្រ',
          'គ. សួររកចំនួនថង់កាហ្វេ ស្មើនឹង ៨៧ ថង់'
        ],
        correctAnswer: 'ក. សួររកផលបូកប្រហែលនៃទម្ងន់គ្រាប់កាហ្វេសរុប ស្មើនឹងប្រហែល ៨៧ គក (ពិតប្រាកដគឺ ៨៦.៧៧ គក)',
        explanation: 'ប្រធានចំណោទសួររកផលបូកប្រហែល៖ ២៧.៨៥ + ៤៣.៥ + ១៥.៤២ ≈ ២៨ + ៤៤ + ១៥ = ៨៧ គក។'
      },
      {
        id: 'hw_m3_p3_q3',
        type: 'choice',
        questionText: '៣. [ផ្នែក ក] តើដើម្បីប៉ាន់ស្មានផលបូកចំនួនទសភាគ យើងត្រូវធ្វើដូចម្តេច?',
        options: [
          'ក. បង្គត់ចំនួនទសភាគនីមួយៗទៅជាចំនួនគត់ជិតបំផុត រួចបូកចំនួនគត់ដែលបង្គត់រួចនោះចូលគ្នា',
          'ខ. បូកតែផ្នែកទសភាគ រួចបង្គត់ជាចំនួនគត់',
          'គ. បូកចំនួនគត់ទាំងអស់ រួចលុបផ្នែកទសភាគចោល'
        ],
        correctAnswer: 'ក. បង្គត់ចំនួនទសភាគនីមួយៗទៅជាចំនួនគត់ជិតបំផុត រួចបូកចំនួនគត់ដែលបង្គត់រួចនោះចូលគ្នា',
        explanation: 'ច្បាប់ប៉ាន់ស្មានផលបូក គឺបង្គត់ចំនួនទសភាគនីមួយៗទៅជាចំនួនគត់ជិតបំផុតសិន រួចបូកលទ្ធផលចូលគ្នា។'
      },
      {
        id: 'hw_m3_p3_q4',
        type: 'text',
        questionText: '៤. [ផ្នែក ខ] ចូរប៉ាន់ស្មានផលបូក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 45.056 + 78.502 ≈ ?',
        placeholder: 'ឧ. 124',
        correctAnswer: '124',
        explanation: '45.056 ≈ 45; 78.502 ≈ 79; ផលបូកប្រហែល = 45 + 79 = 124'
      },
      {
        id: 'hw_m3_p3_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរប៉ាន់ស្មានផលបូក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 73.70 + 460.289 + 6.178 ≈ ?',
        placeholder: 'ឧ. 540',
        correctAnswer: '540',
        explanation: '73.70 ≈ 74; 460.289 ≈ 460; 6.178 ≈ 6; ផលបូកប្រហែល = 74 + 460 + 6 = 540'
      },
      {
        id: 'hw_m3_p3_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរប៉ាន់ស្មានផលបូក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 73.178 + 34.08 + 218.29 ≈ ?',
        placeholder: 'ឧ. 325',
        correctAnswer: '325',
        explanation: '73.178 ≈ 73; 34.08 ≈ 34; 218.29 ≈ 218; ផលបូកប្រហែល = 73 + 34 + 218 = 325'
      },
      {
        id: 'hw_m3_p3_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូររកតម្លៃប្រហែលនៃផលបូក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 73.609 + 8.199 ≈ ?',
        placeholder: 'ឧ. 82',
        correctAnswer: '82',
        explanation: '73.609 ≈ 74; 8.199 ≈ 8; តម្លៃប្រហែល = 74 + 8 = 82'
      },
      {
        id: 'hw_m3_p3_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូររកតម្លៃប្រហែលនៃផលបូក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 0.47 + 89.50 + 8.63 ≈ ?',
        placeholder: 'ឧ. 99',
        correctAnswer: '99',
        explanation: '0.47 ≈ 0; 89.50 ≈ 90; 8.63 ≈ 9; តម្លៃប្រហែល = 0 + 90 + 9 = 99'
      },
      {
        id: 'hw_m3_p3_q9',
        type: 'text',
        questionText: '៩. [ផ្នែក ខ] ចូររកតម្លៃប្រហែលនៃផលបូក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 8.661 + 56.078 + 77.38 ≈ ?',
        placeholder: 'ឧ. 142',
        correctAnswer: '142',
        explanation: '8.661 ≈ 9; 56.078 ≈ 56; 77.38 ≈ 77; តម្លៃប្រហែល = 9 + 56 + 77 = 142'
      }
    ]
  },
  {
    id: 'hw_math_m3_p4',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី៤)',
    lessonTitle: 'ការដកចំនួនទសភាគដែលផ្នែកទសភាគមានចំនួនខ្ទង់ស្មើគ្នា',
    topicTitle: '❖ ការដកចំនួនទសភាគដែលផ្នែកទសភាគមានចំនួនខ្ទង់ស្មើគ្នា (សៀវភៅសិស្សទំព័រ ១៣)',
    icon: '➖',
    bgGradient: 'from-orange-600 to-red-800',
    badgeColor: 'bg-red-700 text-white',
    questions: [
      {
        id: 'hw_m3_p4_q1',
        type: 'choice',
        questionText: '១. [ផ្នែក ក] តើផ្លូវលំមួយខ្សែមានប្រវែងប៉ុន្មានគីឡូម៉ែត្រ?',
        options: [
          'ក. ៨.៦៥០ គីឡូម៉ែត្រ',
          'ខ. ៥.៤២០ គីឡូម៉ែត្រ',
          'គ. ៣.២៣០ គីឡូម៉ែត្រ'
        ],
        correctAnswer: 'ក. ៨.៦៥០ គីឡូម៉ែត្រ',
        explanation: 'តាមខ្លឹមសារចំណោទ៖ ផ្លូវលំមួយខ្សែមានប្រវែង ៨.៦៥០ គម។'
      },
      {
        id: 'hw_m3_p4_q2',
        type: 'choice',
        questionText: '២. [ផ្នែក ក] តើគេបានក្រាលកៅស៊ូបានប្រវែងប៉ុន្មានម៉ែត្រ?',
        options: [
          'ក. ៥៤២០ ម៉ែត្រ (៥.៤២០ គីឡូម៉ែត្រ)',
          'ខ. ៨៦៥០ ម៉ែត្រ (៨.៦៥០ គីឡូម៉ែត្រ)',
          'គ. ៣២៣០ ម៉ែត្រ (៣.២៣០ គីឡូម៉ែត្រ)'
        ],
        correctAnswer: 'ក. ៥៤២០ ម៉ែត្រ (៥.៤២០ គីឡូម៉ែត្រ)',
        explanation: '៥.៤២០ គម ស្មើនឹង ៥៤២០ ម៉ែត្រ។'
      },
      {
        id: 'hw_m3_p4_q3',
        type: 'choice',
        questionText: '៣. [ផ្នែក ក] តើប្រធានចំណោទគេសួររកអ្វី? ហើយមានចម្លើយស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. សួររកប្រវែងផ្លូវលំដែលមិនទាន់ក្រាលកៅស៊ូ ស្មើនឹង ៣.២៣ គីឡូម៉ែត្រ',
          'ខ. សួររកប្រវែងផ្លូវលំទាំងអស់ ស្មើនឹង ១៤.០៧ គីឡូម៉ែត្រ',
          'គ. សួររកទម្ងន់ផ្លូវលំ ស្មើនឹង ៣.២៣ គីឡូក្រាម'
        ],
        correctAnswer: 'ក. សួររកប្រវែងផ្លូវលំដែលមិនទាន់ក្រាលកៅស៊ូ ស្មើនឹង ៣.២៣ គីឡូម៉ែត្រ',
        explanation: 'ប្រធានចំណោទសួររកប្រវែងផ្លូវដែលសល់៖ ៨.៦៥០ - ៥.៤២០ = ៣.២៣០ គម (ឬ ៣.២៣ គម)។'
      },
      {
        id: 'hw_m3_p4_q4',
        type: 'choice',
        questionText: '៤. [ផ្នែក ក] ដើម្បីដកចំនួនទសភាគដែលផ្នែកទសភាគមានចំនួនខ្ទង់ស្មើគ្នា តើយើងត្រូវធ្វើដូចម្តេច?',
        options: [
          'ក. គេសរសេរផ្នែកគត់ក្រោមផ្នែកគត់ ផ្នែកទសភាគក្រោមផ្នែកទសភាគ ក្បៀសឱ្យចំក្បៀស រួចធ្វើការដកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់ចុះមកក្រោម',
          'ខ. គេដកតែផ្នែកគត់ ហើយផ្នែកទសភាគដកពីឆ្វេងទៅស្តាំ',
          'គ. គេសរសេរផ្នែកគត់នៅក្រោមផ្នែកទសភាគ រួចដកធម្មតា'
        ],
        correctAnswer: 'ក. គេសរសេរផ្នែកគត់ក្រោមផ្នែកគត់ ផ្នែកទសភាគក្រោមផ្នែកទសភាគ ក្បៀសឱ្យចំក្បៀស រួចធ្វើការដកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់ចុះមកក្រោម',
        explanation: 'ច្បាប់នៃការដកចំនួនទសភាគមានខ្ទង់ទសភាគស្មើគ្នា គឺត្រូវសរសេរខ្ទង់ឱ្យចំគ្នា ក្បៀសចំក្បៀស រួចដកដូចចំនួនគត់។'
      },
      {
        id: 'hw_m3_p4_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរគណនាផលដក៖ 0.857 - 0.287 = ?',
        placeholder: 'ឧ. 0.57',
        correctAnswer: '0.57',
        explanation: '0.857 - 0.287 = 0.570 = 0.57'
      },
      {
        id: 'hw_m3_p4_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរគណនាផលដក៖ 7.482 - 0.745 = ?',
        placeholder: 'ឧ. 6.737',
        correctAnswer: '6.737',
        explanation: '7.482 - 0.745 = 6.737'
      },
      {
        id: 'hw_m3_p4_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូរគណនាផលដក៖ 45.708 - 9.756 = ?',
        placeholder: 'ឧ. 35.952',
        correctAnswer: '35.952',
        explanation: '45.708 - 9.756 = 35.952'
      },
      {
        id: 'hw_m3_p4_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូរគណនាផលដក៖ 65.427 - 37.528 = ?',
        placeholder: 'ឧ. 27.899',
        correctAnswer: '27.899',
        explanation: '65.427 - 37.528 = 27.899'
      },
      {
        id: 'hw_m3_p4_q9',
        type: 'text',
        questionText: '៩. [ផ្នែក ខ] ចូរគណនាផលដក៖ 638.123 - 352.402 = ?',
        placeholder: 'ឧ. 285.721',
        correctAnswer: '285.721',
        explanation: '638.123 - 352.402 = 285.721'
      }
    ]
  },
  {
    id: 'hw_math_m3_p5',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី៥)',
    lessonTitle: 'ការដកចំនួនទសភាគដែលផ្នែកទសភាគមានចំនួនខ្ទង់មិនស្មើគ្នា',
    topicTitle: '❖ ការដកចំនួនទសភាគដែលផ្នែកទសភាគមានចំនួនខ្ទង់មិនស្មើគ្នា (សៀវភៅសិស្សទំព័រ ១៤)',
    icon: '⚖️',
    bgGradient: 'from-red-500 to-orange-700',
    badgeColor: 'bg-red-600 text-white',
    questions: [
      {
        id: 'hw_m3_p5_q1',
        type: 'choice',
        questionText: '១. [ផ្នែក ក] តើបូណានិងនារីម្នាក់ៗមានទម្ងន់ប៉ុន្មានគីឡូក្រាម?',
        options: [
          'ក. បូណាមានទម្ងន់ ៤៥.៥ គក និងនារីមានទម្ងន់ ៣៨.៧៥ គក',
          '火. បូណាមានទម្ងន់ ៣៨.៧៥ គក និងនារីមានទម្ងន់ ៤៥.៥ គក',
          'គ. បូណាមានទម្ងន់ ៤៥ គក និងនារីមានទម្ងន់ ៣៨ គក'
        ],
        correctAnswer: 'ក. បូណាមានទម្ងន់ ៤៥.៥ គក និងនារីមានទម្ងន់ ៣៨.៧៥ គក',
        explanation: 'តាមចំណោទ៖ បូណាមានទម្ងន់ ៤៥.៥គក ហើយនារីមានទម្ងន់ ៣៨.៧៥គក។'
      },
      {
        id: 'hw_m3_p5_q2',
        type: 'choice',
        questionText: '២. [ផ្នែក ក] តើប្រធានចំណោទគេសួររកអ្វី? ហើយមានចម្លើយស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. សួររកទម្ងន់បូណាធ្ងន់ជាងនារីប៉ុន្មាន ស្មើនឹង ៦.៧៥ គីឡូក្រាម',
          'ខ. សួររកផលបូកទម្ងន់អ្នកទាំងពីរ ស្មើនឹង ៨៤.២៥ គីឡូក្រាម',
          'គ. សួររកទម្ងន់របស់នារី ស្មើនឹង ៣៨.៧៥ គីឡូក្រាម'
        ],
        correctAnswer: 'ក. សួររកទម្ងន់បូណាធ្ងន់ជាងនារីប៉ុន្មាន ស្មើនឹង ៦.៧៥ គីឡូក្រាម',
        explanation: 'ប្រធានចំណោទសួររកទម្ងន់ខុសគ្នា៖ ៤៥.៥០ - ៣៨.៧៥ = ៦.៧៥ គក។'
      },
      {
        id: 'hw_m3_p5_q3',
        type: 'choice',
        questionText: '៣. [ផ្នែក ក] តើដើម្បីដកចំនួនទសភាគដែលផ្នែកទសភាគមានចំនួនខ្ទង់មិនស្មើគ្នាយើងត្រូវធ្វើដូចម្តេច?',
        options: [
          'ក. ត្រូវថែមលេខសូន្យនៅខាងចុងផ្នែកទសភាគណាដែលមានខ្ទង់តិចជាង ដើម្បីឱ្យចំនួនខ្ទង់ទសភាគស្មើគ្នា រួចសរសេរឱ្យចំខ្ទង់ ដកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់មកក្រោម',
          'ខ. ត្រូវដកផ្នែកគត់ និងផ្នែកគត់ រីឯផ្នែកទសភាគលុបចោល',
          'គ. ត្រូវយកផ្នែកទសភាគធំជាងដកផ្នែកទសភាគតូចជាង ដោយមិនបាច់ថែមសូន្យ'
        ],
        correctAnswer: 'ក. ត្រូវថែមលេខសូន្យនៅខាងចុងផ្នែកទសភាគណាដែលមានខ្ទង់តិចជាង ដើម្បីឱ្យចំនួនខ្ទង់ទសភាគស្មើគ្នា រួចសរសេរឱ្យចំខ្ទង់ ដកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់មកក្រោម',
        explanation: 'ច្បាប់នៃការដកចំនួនទសភាគខ្ទង់មិនស្មើគ្នា គឺត្រូវថែមសូន្យឱ្យខ្ទង់ទសភាគស្មើគ្នាជាមុនសិន។'
      },
      {
        id: 'hw_m3_p5_q4',
        type: 'text',
        questionText: '៤. [ផ្នែក ខ] ចូរគណនាផលដក៖ 35.22 - 8.724 = ?',
        placeholder: 'ឧ. 26.496',
        correctAnswer: '26.496',
        explanation: '35.220 - 8.724 = 26.496'
      },
      {
        id: 'hw_m3_p5_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរគណនាផលដក៖ 67.8 - 42.584 = ?',
        placeholder: 'ឧ. 25.216',
        correctAnswer: '25.216',
        explanation: '67.800 - 42.584 = 25.216'
      },
      {
        id: 'hw_m3_p5_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរគណនាផលដក៖ 85.50 - 67.877 = ?',
        placeholder: 'ឧ. 17.623',
        correctAnswer: '17.623',
        explanation: '85.500 - 67.877 = 17.623'
      },
      {
        id: 'hw_m3_p5_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូរគណនាផលដក៖ 358.7 - 40.45 - 35.127 = ?',
        placeholder: 'ឧ. 283.123',
        correctAnswer: '283.123',
        explanation: '(358.700 - 40.450) - 35.127 = 318.250 - 35.127 = 283.123'
      },
      {
        id: 'hw_m3_p5_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូរគណនាផលដក៖ 780.76 - 78.9 - 46.568 = ?',
        placeholder: 'ឧ. 655.292',
        correctAnswer: '655.292',
        explanation: '(780.760 - 78.900) - 46.568 = 701.860 - 46.568 = 655.292'
      }
    ]
  },
  {
    id: 'hw_math_m3_p6',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី៦)',
    lessonTitle: 'ការដកចំនួនគត់នឹងចំនួនទសភាគ',
    topicTitle: '❖ ការដកចំនួនគត់នឹងចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ១៥)',
    icon: '🔢',
    bgGradient: 'from-orange-500 to-red-700',
    badgeColor: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'hw_m3_p6_q1',
        type: 'choice',
        questionText: '១. [ផ្នែក ក] តើម្ដាយធីតាទិញប្រេងឆាប៉ុន្មានលីត្រ? ហើយគាត់ប្រើប្រាស់អស់ប៉ុន្មានលីត្រ?',
        options: [
          'ក. ទិញ ៥ លីត្រ ប្រើប្រាស់អស់ ១.២៥០ លីត្រ',
          'ខ. ទិញ ១.២៥០ លីត្រ ប្រើប្រាស់អស់ ៥ លីត្រ',
          'គ. ទិញ ៥ លីត្រ ប្រើប្រាស់អស់ ៣.៧៥០ លីត្រ'
        ],
        correctAnswer: 'ក. ទិញ ៥ លីត្រ ប្រើប្រាស់អស់ ១.២៥០ លីត្រ',
        explanation: 'តាមចំណោទ៖ ម្តាយធីតាទិញប្រេងឆា ៥លីត្រ និងប្រើអស់ ១.២៥០លីត្រ។'
      },
      {
        id: 'hw_m3_p6_q2',
        type: 'choice',
        questionText: '២. [ផ្នែក ក] តើប្រធានចំណោទគេសួររកអ្វី? ហើយមានចម្លើយស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. សួររកមាឌប្រេងឆាដែលនៅសល់ ស្មើនឹង ៣.៧៥ លីត្រ',
          'ខ. សួររកផលបូកមាឌប្រេងឆា ស្មើនឹង ៦.២៥ លីត្រ',
          'គ. សួររកប្រេងឆាដែលបានប្រើប្រាស់ ស្មើនឹង ១.២៥ លីត្រ'
        ],
        correctAnswer: 'ក. សួររកមាឌប្រេងឆាដែលនៅសល់ ស្មើនឹង ៣.៧៥ លីត្រ',
        explanation: 'ប្រធានចំណោទសួររកប្រេងឆាដែលសល់៖ ៥.០០០ - ១.២៥០ = ៣.៧៥០ លីត្រ (ឬ ៣.៧៥ លីត្រ)។'
      },
      {
        id: 'hw_m3_p6_q3',
        type: 'choice',
        questionText: '៣. [ផ្នែក ក] តើដើម្បីដកចំនួនគត់នឹងចំនួនទសភាគយើងត្រូវធ្វើដូចម្តេច?',
        options: [
          'ក. សរសេរចំនួនគត់ជាចំនួនទសភាគដែលមានក្បៀស និងថែមលេខសូន្យនៅខាងចុងផ្នែកទសភាគឱ្យមានចំនួនខ្ទង់ស្មើគ្នានឹងចំនួនទសភាគ រួចដកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់ចុះមកក្រោម',
          'ខ. យកចំនួនគត់ដកផ្នែកគត់ ហើយចោលផ្នែកទសភាគ',
          'គ. យកផ្នែកទសភាគមកសរសេរជាលទ្ធផល ហើយយកចំនួនគត់ដកផ្នែកគត់'
        ],
        correctAnswer: 'ក. សរសេរចំនួនគត់ជាចំនួនទសភាគដែលមានក្បៀស និងថែមលេខសូន្យនៅខាងចុងផ្នែកទសភាគឱ្យមានចំនួនខ្ទង់ស្មើគ្នានឹងចំនួនទសភាគ រួចដកដូចចំនួនគត់ ហើយដាក់ក្បៀសត្រង់ចុះមកក្រោម',
        explanation: 'ច្បាប់ដកចំនួនគត់នឹងចំនួនទសភាគ គឺត្រូវបំប្លែងចំនួនគត់ឱ្យមានក្បៀស និងថែមសូន្យឱ្យស្មើនឹងខ្ទង់ទសភាគដក។'
      },
      {
        id: 'hw_m3_p6_q4',
        type: 'text',
        questionText: '៤. [ផ្នែក ខ] ចូរគណនា៖ 7 - 0.654 = ?',
        placeholder: 'ឧ. 6.346',
        correctAnswer: '6.346',
        explanation: '7.000 - 0.654 = 6.346'
      },
      {
        id: 'hw_m3_p6_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរគណនា៖ 86 - 47.793 = ?',
        placeholder: 'ឧ. 38.207',
        correctAnswer: '38.207',
        explanation: '86.000 - 47.793 = 38.207'
      },
      {
        id: 'hw_m3_p6_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរគណនា៖ 157 - 78.462 = ?',
        placeholder: 'ឧ. 78.538',
        correctAnswer: '78.538',
        explanation: '157.000 - 78.462 = 78.538 (កែសម្រួលពី ៥៧ ទៅ ១៥៧ ដើម្បីកុំឱ្យមានចម្លើយអវិជ្ជមាន)'
      },
      {
        id: 'hw_m3_p6_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូរគណនា៖ 90 - 25.746 - 6.050 = ?',
        placeholder: 'ឧ. 58.204',
        correctAnswer: '58.204',
        explanation: '(90.000 - 25.746) - 6.050 = 64.254 - 6.050 = 58.204'
      },
      {
        id: 'hw_m3_p6_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូរគណនា៖ 473 - 148.435 - 67.008 = ?',
        placeholder: 'ឧ. 257.557',
        correctAnswer: '257.557',
        explanation: '(473.000 - 148.435) - 67.008 = 324.565 - 67.008 = 257.557'
      }
    ]
  },
  {
    id: 'hw_math_m3_p7',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី៧)',
    lessonTitle: 'ការប៉ាន់ស្មានផលដកចំនួនទសភាគ',
    topicTitle: '❖ การប៉ាន់ស្មានផលដកចំនួនទសភាគ (សៀវភៅសិស្សទំព័រ ១៦)',
    icon: '📊',
    bgGradient: 'from-amber-600 to-red-800',
    badgeColor: 'bg-amber-700 text-white',
    questions: [
      {
        id: 'hw_m3_p7_q1',
        type: 'choice',
        questionText: '១. [ផ្នែក ក] តើពូសំតាមដានការលូតលាស់កូនជ្រូកដែលមានលទ្ធផលខែទី១ កូនជ្រូកមានទម្ងន់ប៉ុន្មានគីឡូក្រាម? ហើយខែទី២ កូនជ្រូកមានទម្ងន់ប៉ុន្មានគីឡូក្រាម?',
        options: [
          'ក. ខែទី១ មានទម្ងន់ ២៤.៥០០ គក, ខែទី២ មានទម្ងន់ ៣៨.៧២៥ គក',
          'ខ. ខែទី១ មានទម្ងន់ ៣៨.៧២៥ គក, ខែទី២ មានទម្ងន់ ២៤.៥០០ គក',
          'គ. ខែទី១ មានទម្ងន់ ២៥ គក, ខែទី២ មានទម្ងន់ ៣៩ គក'
        ],
        correctAnswer: 'ក. ខែទី១ មានទម្ងន់ ២៤.៥០០ គក, ខែទី២ មានទម្ងន់ ៣៨.៧២៥ គក',
        explanation: 'តាមចំណោទ៖ ខែទី១ កូនជ្រូកធ្ងន់ ២៤.៥០០គក ហើយខែទី២ ធ្ងន់ ៣៨.៧២៥គក។'
      },
      {
        id: 'hw_m3_p7_q2',
        type: 'choice',
        questionText: '២. [ផ្នែក ក] តើប្រធានចំណោទគេសួររកអ្វី? ហើយមានចម្លើយស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. សួររកទម្ងន់ដែលកូនជ្រូកកើនឡើងប្រហែលប៉ុន្មានគីឡូក្រាម ស្មើនឹងប្រហែល ១៤ គក (ពិតប្រាកដគឺ ១៤.២២៥ គក)',
          'ខ. សួររកផលបូកទម្ងន់ទាំងពីរខែ ស្មើនឹង ៦៣.២២៥ គក',
          'គ. សួររកទម្ងន់ខែទី២ ស្មើនឹង ៣៨.៧២៥ គក'
        ],
        correctAnswer: 'ក. សួររកទម្ងន់ដែលកូនជ្រូកកើនឡើងប្រហែលប៉ុន្មានគីឡូក្រាម ស្មើនឹងប្រហែល ១៤ គក (ពិតប្រាកដគឺ ១៤.២២៥ គក)',
        explanation: 'ប្រធានចំណោទសួររកទម្ងន់ដែលកើនឡើងប្រហែល៖ ៣៨.៧២៥ - ២៤.៥០០ ≈ ៣៩ - ២៥ = ១៤ គក។'
      },
      {
        id: 'hw_m3_p7_q3',
        type: 'choice',
        questionText: '៣. [ផ្នែក ក] ដើម្បីប៉ាន់ស្មានផលដកចំនួនទសភាគតើយើងត្រូវធ្វើដូចម្តេច?',
        options: [
          'ក. ត្រូវបង្គត់ចំនួនទសភាគនីមួយៗទៅជាចំនួនគត់បង្គត់ (ចំនួនគត់ជិតបំផុត) រួចធ្វើប្រមាណវិធីដកចំនួនគត់ដែលបង្គត់រួចនោះ',
          'ខ. ដកតែផ្នែកគត់ ហើយរក្សាផ្នែកទសភាគដដែល',
          'គ. ដកផ្នែកទសភាគ រួចដកផ្នែកគត់ជាក្រោយ'
        ],
        correctAnswer: 'ក. ត្រូវបង្គត់ចំនួនទសភាគនីមួយៗទៅជាចំនួនគត់បង្គត់ (ចំនួនគត់ជិតបំផុត) រួចធ្វើប្រមាណវិធីដកចំនួនគត់ដែលបង្គត់រួចនោះ',
        explanation: 'ច្បាប់ប៉ាន់ស្មានផលដក គឺត្រូវបង្គត់ចំនួនទសភាគនីមួយៗទៅជាចំនួនគត់ជិតបំផុត រួចធ្វើការដកធម្មតា។'
      },
      {
        id: 'hw_m3_p7_q4',
        type: 'text',
        questionText: '៤. [ផ្នែក ខ] ចូរប៉ាន់ស្មានផលដក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 56.278 - 23.504 ≈ ?',
        placeholder: 'ឧ. 32',
        correctAnswer: '32',
        explanation: '56.278 ≈ 56; 23.504 ≈ 24; ផលដកប្រហែល = 56 - 24 = 32'
      },
      {
        id: 'hw_m3_p7_q5',
        type: 'text',
        questionText: '៥. [ផ្នែក ខ] ចូរប៉ាន់ស្មានផលដក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 352.070 - 96.702 ≈ ?',
        placeholder: 'ឧ. 255',
        correctAnswer: '255',
        explanation: '352.070 ≈ 352; 96.702 ≈ 97; ផលដកប្រហែល = 352 - 97 = 255'
      },
      {
        id: 'hw_m3_p7_q6',
        type: 'text',
        questionText: '៦. [ផ្នែក ខ] ចូរប៉ាន់ស្មានផលដក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 45.276 - 13 - 8.603 ≈ ?',
        placeholder: 'ឧ. 23',
        correctAnswer: '23',
        explanation: '45.276 ≈ 45; 13 ≈ 13; 8.603 ≈ 9; ផលដកប្រហែល = 45 - 13 - 9 = 23'
      },
      {
        id: 'hw_m3_p7_q7',
        type: 'text',
        questionText: '៧. [ផ្នែក ខ] ចូររកតម្លៃប្រហែលនៃផលដក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 65.040 - 27.190 ≈ ?',
        placeholder: 'ឧ. 38',
        correctAnswer: '38',
        explanation: '65.040 ≈ 65; 27.190 ≈ 27; តម្លៃប្រហែល = 65 - 27 = 38'
      },
      {
        id: 'hw_m3_p7_q8',
        type: 'text',
        questionText: '៨. [ផ្នែក ខ] ចូររកតម្លៃប្រហែលនៃផលដក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 37 - 9.508 - 5.197 ≈ ?',
        placeholder: 'ឧ. 22',
        correctAnswer: '22',
        explanation: '37 ≈ 37; 9.508 ≈ 10; 5.197 ≈ 5; តម្លៃប្រហែល = 37 - 10 - 5 = 22'
      },
      {
        id: 'hw_m3_p7_q9',
        type: 'text',
        questionText: '៩. [ផ្នែក ខ] ចូររកតម្លៃប្រហែលនៃផលដក (បង្គត់ជាចំនួនគត់ជិតបំផុត)៖ 89.28 - 13.82 - 7.089 ≈ ?',
        placeholder: 'ឧ. 68',
        correctAnswer: '68',
        explanation: '89.28 ≈ 89; 13.82 ≈ 14; 7.089 ≈ 7; តម្លៃប្រហែល = 89 - 14 - 7 = 68'
      }
    ]
  },
  {
    id: 'hw_math_m3_p8',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣ (ផ្នែកទី៨)',
    lessonTitle: 'ការដោះស្រាយចំណោទវិធីបូកនិងវិធីដក',
    topicTitle: '❖ ការដោះស្រាយចំណោទវិធីបូក និងវិធីដកចំនួនទសភាគ',
    icon: '📝',
    bgGradient: 'from-yellow-600 to-amber-800',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m3_p8_q1',
        type: 'text',
        questionText: '១. ពូហំលក់ស្រូវលើកទី១ បាន 85kg លើកទី២ បាន 75.50kg និងលើកទី៣ បាន 67.25kg។ តើគាត់លក់ស្រូវសរុបបានប៉ុន្មានគីឡូក្រាម? (គិតជាគីឡូក្រាម)',
        placeholder: 'ឧ. 227.75',
        correctAnswer: '227.75',
        explanation: 'លក់ស្រូវសរុប = 85 + 75.50 + 67.25 = 227.75 គីឡូក្រាម'
      },
      {
        id: 'hw_m3_p8_q2',
        type: 'text',
        questionText: '២. ចតុកោណកែងមួយមានទទឹង 80cm និងបណ្តោយលើសទទឹង 55.25cm។ ចូរគណនាប្រវែងជុំវិញចតុកោណកែងនោះ (បរិមាត្រ គិតជាសង់ទីម៉ែត្រ)៖',
        placeholder: 'ឧ. 430.5',
        correctAnswer: '430.5',
        explanation: 'ទទឹង = 80cm; បណ្តោយ = 80 + 55.25 = 135.25cm។ បរិមាត្រ = (ទទឹង + បណ្តោយ) x ២ = (80 + 135.25) x ២ = 215.25 x ២ = 430.5cm'
      },
      {
        id: 'hw_m3_p8_q3',
        type: 'text',
        questionText: '៣. សុខមានទម្ងន់ 65kg។ សៅមានទម្ងន់ 50.35kg។ តើសុខមានទម្ងន់ធ្ងន់ជាងសៅប៉ុន្មានគីឡូក្រាម? (គិតជាគីឡូក្រាម)',
        placeholder: 'ឧ. 14.65',
        correctAnswer: '14.65',
        explanation: 'ទម្ងន់សុខធ្ងន់ជាង = 65 - 50.35 = 14.65 គីឡូក្រាម'
      },
      {
        id: 'hw_m3_p8_q4',
        type: 'text',
        questionText: '៤. មីងសំទិញសាច់ជ្រូក 5.5kg ។ គាត់យកទៅប្រឡាក់អស់ 2.50kg និងយកទៅឆាអស់ 0.85kg។ តើសាច់ជ្រូកនៅសល់មានទម្ងន់ប៉ុន្មានគីឡូក្រាម? (គិតជាគីឡូក្រាម)',
        placeholder: 'ឧ. 2.15',
        correctAnswer: '2.15',
        explanation: 'សាច់ជ្រូកដែលនៅសល់ = 5.5 - (2.50 + 0.85) = 5.5 - 3.35 = 2.15 គីឡូក្រាម'
      },
      {
        id: 'hw_m3_p8_q5',
        type: 'text',
        questionText: '៥. កសិករម្នាក់មានស្រូវ 30kg។ គាត់យកឱ្យមាន់ស៊ីអស់ 3.5kg និងយកទៅឱ្យទាស៊ីអស់ 10.25kg។ តើស្រូវរបស់គាត់នៅសល់មានទម្ងន់ប៉ុន្មានគីឡូក្រាម? (គិតជាគីឡូក្រាម)',
        placeholder: 'ឧ. 16.25',
        correctAnswer: '16.25',
        explanation: 'ស្រូវដែលនៅសល់ = 30 - 3.5 - 10.25 = 16.25 គីឡូក្រាម'
      },
      {
        id: 'hw_m3_p8_q6',
        type: 'choice',
        questionText: '៦. ដារ៉ាមានទម្ងន់ 70.35kg ហើយចន្ថាមានទម្ងន់ 65.45kg ។ បន្ទាប់ពីហាត់ប្រាណមួយរយៈ ដារ៉ានៅសល់ទម្ងន់ 69.15kg ហើយចន្ថានៅសល់ទម្ងន់ 63.30kg។ តើនរណាបានស្រកទម្ងន់តិចជាង? តិចជាងប៉ុន្មានគីឡូក្រាម?',
        options: [
          'ក. ដារ៉ាស្រកទម្ងន់តិចជាង ចំនួន ០.៩៥ គីឡូក្រាម',
          'ខ. ចន្ថាស្រកទម្ងន់តិចជាង ចំនួន ០.៩៥ គីឡូក្រាម',
          'គ. ដារ៉ាស្រកទម្ងន់តិចជាង ចំនួន ១.២ គីឡូក្រាម',
          'ឃ. ចន្ថាស្រកទម្ងន់តិចជាង ចំនួន ២.១៥ គីឡូក្រាម'
        ],
        correctAnswer: 'ក. ដារ៉ាស្រកទម្ងន់តិចជាង ចំនួន ០.៩៥ គីឡូក្រាម',
        explanation: 'ដារ៉ាស្រកទម្ងន់៖ 70.35 - 69.15 = 1.20គក។ ចន្ថាស្រកទម្ងន់៖ 65.45 - 63.30 = 2.15គក។ ដូចនេះដារ៉ាស្រកតិចជាងចន្ថាចំនួន៖ 2.15 - 1.20 = 0.95គក។'
      }
    ]
  },
  {
    id: 'hw_math_m4_p21',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៤ (ទំព័រ ២១-២៨)',
    lessonTitle: 'កន្លះបន្ទាត់ពុះមុំ និងសំណង់មុំ',
    topicTitle: '❖ សំណង់កន្លះបន្ទាត់ពុះមុំ មុំ 60° និង មុំ 90°',
    icon: '📐',
    bgGradient: 'from-yellow-600 to-amber-800',
    badgeColor: 'bg-yellow-600 text-white',
    questions: [
      {
        id: 'hw_m4_p21_q1',
        type: 'choice',
        questionText: '១. តើកន្លះបន្ទាត់ដែលចែកមុំមួយជាពីរស្មើគ្នាហៅថាយ៉ាងដូចម្តេច?',
        options: [
          'ក. កន្លះបន្ទាត់ស្រប',
          'ខ. កន្លះបន្ទាត់កែង',
          'គ. កន្លះបន្ទាត់ពុះមុំ',
          'ឃ. អង្កត់ផ្ចិត'
        ],
        correctAnswer: 'គ. កន្លះបន្ទាត់ពុះមុំ',
        explanation: 'កន្លះបន្ទាត់ដែលចែកមុំមួយជាពីរស្មើគ្នា ហៅថា កន្លះបន្ទាត់ពុះមុំ។'
      }
    ]
  },
  {
    id: 'hw_math_m5_p29',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៥ (ទំព័រ ២៩-៣៣)',
    lessonTitle: 'ការជំនួសលេខដោយអក្សរ',
    topicTitle: '❖ កន្សោមពីជគណិត និងការដោះស្រាយសមីការ',
    icon: '🔤',
    bgGradient: 'from-amber-600 to-orange-800',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m5_p29_q1',
        type: 'text',
        questionText: '១. ចូរកំណត់តម្លៃ a ដែល៖ a + 5 = 15',
        placeholder: 'a = ?',
        correctAnswer: '10',
        explanation: 'a = 15 - 5 = 10។'
      },
      {
        id: 'hw_m5_p29_q2',
        type: 'text',
        questionText: '២. ចូរកំណត់តម្លៃ y ដែល៖ 5y + 7 = 17',
        placeholder: 'y = ?',
        correctAnswer: '2',
        explanation: '5y = 17 - 7 = 10 ➔ y = 10 / 5 = 2។'
      }
    ]
  },
  {
    id: 'hw_math_m6_p34',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៦ (ទំព័រ ៣៤-៣៨)',
    lessonTitle: 'បរិមាត្រ',
    topicTitle: '❖ បរិមាត្រចតុplural, ត្រីកោណ និងថាស',
    icon: '⭕',
    bgGradient: 'from-orange-600 to-amber-800',
    badgeColor: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'hw_m6_p34_q1',
        type: 'text',
        questionText: '១. ចូរគណនាបរិមាត្រថាសដែលមានកាំ r = 3cm (យក π = 3.14)៖',
        placeholder: 'សរសេរលទ្ធផល cm...',
        correctAnswer: '18.84',
        explanation: 'P = 2 × π × r = 2 × 3.14 × 3 = 18.84 cm។'
      }
    ]
  },
  {
    id: 'hw_math_m7_p39',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៧ (ទំព័រ ៣៩-៤៨)',
    lessonTitle: 'ផ្ទៃក្រឡា',
    topicTitle: '❖ ផ្ទៃក្រឡាចតុplural, ត្រីកោណ, ថាស',
    icon: '🗺️',
    bgGradient: 'from-amber-600 to-orange-900',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m7_p39_q1',
        type: 'text',
        questionText: '១. គណនាផ្ទៃក្រឡាត្រីកោណដែលមានបាត b = 12cm និងកម្ពស់ h = 6cm៖',
        placeholder: 'សរសេរលទ្ធផល cm²...',
        correctAnswer: '36',
        explanation: 'A = (b × h) / 2 = (12 × 6) / 2 = 36 cm²។'
      }
    ]
  },
  {
    id: 'hw_math_m8_p49',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៨ (ទំព័រ ៤៩-៥៧)',
    lessonTitle: 'វិធីគុណ និងចែកចំនួនទសភាគ',
    topicTitle: '❖ ប្រមាណវិធីគុណ និងចែកចំនួនទសភាគ',
    icon: '✖️',
    bgGradient: 'from-orange-500 to-amber-800',
    badgeColor: 'bg-orange-500 text-white',
    questions: [
      {
        id: 'hw_m8_p49_q1',
        type: 'text',
        questionText: '១. គណនា៖ 43.56 × 7.3 = ?',
        placeholder: 'សរសេរចម្លើយ...',
        correctAnswer: '317.988',
        explanation: '43.56 × 7.3 = 317.988។'
      }
    ]
  },
  {
    id: 'hw_math_m9_p58',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៩ (ទំព័រ ៥៨-៦៩)',
    lessonTitle: 'តួចែករួមធំបំផុត និងពហុគុណរួមតូចបំផុត',
    topicTitle: '❖ ត.ច.រ.ប និង ព.គុ.រ.ត',
    icon: '🔢',
    bgGradient: 'from-amber-700 to-yellow-900',
    badgeColor: 'bg-amber-700 text-white',
    questions: [
      {
        id: 'hw_m9_p58_q1',
        type: 'text',
        questionText: '១. រកតួចែករួមធំបំផុត ត.ច.រ.ប (18 ; 24) ៖',
        placeholder: 'សរសេរចម្លើយ...',
        correctAnswer: '6',
        explanation: 'តួចែកនៃ ១៨ = {១,២,៣,៦,៩,១៨}, តួចែកនៃ ២៤ = {១,២,៣,៤,៦,៨,១២,២៤} ➔ ត.ច.រ.ប = ៦។'
      }
    ]
  },
  {
    id: 'hw_math_m10_p70',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១០ (ទំព័រ ៧០-៧៧)',
    lessonTitle: 'វិធីបូក និងវិធីដកប្រភាគ',
    topicTitle: '❖ ប្រមាណវិធីបូក និងដកប្រភាគ',
    icon: '➕',
    bgGradient: 'from-orange-600 to-amber-900',
    badgeColor: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'hw_m10_p70_q1',
        type: 'choice',
        questionText: '១. គណនាប្រភាគ៖ 5/7 + 3/10 = ?',
        options: ['ក. 71/70', 'ខ. 8/17', 'គ. 15/70', 'ឃ. 50/70'],
        correctAnswer: 'ក. 71/70',
        explanation: 'ភាគបែងរួម ៧០ ➔ (៥០ + ២១) / ៧០ = ៧១/៧០ (ឬ 1 1/70)។'
      }
    ]
  },
  {
    id: 'hw_math_m11_p78',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១១ (ទំព័រ ៧៨-៨២)',
    lessonTitle: 'វិធីគុណ និងវិធីចែកប្រភាគ',
    topicTitle: '❖ ប្រមាណវិធីគុណ និងចែកប្រភាគ',
    icon: '✖️',
    bgGradient: 'from-amber-600 to-orange-800',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m11_p78_q1',
        type: 'text',
        questionText: '១. គណនា៖ (2/7) × (2/5) = ?',
        placeholder: 'សរសេរជា a/b...',
        correctAnswer: '4/35',
        explanation: '(២ × ពីរ) / (៧ × ៥) = ៤/៣៥។'
      }
    ]
  },
  {
    id: 'hw_math_m12_p83',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១២ (ទំព័រ ៨៣-៨៤)',
    lessonTitle: 'ផលធៀប',
    topicTitle: '❖ គណនាផលធៀបទំហំ',
    icon: '⚖️',
    bgGradient: 'from-yellow-600 to-amber-800',
    badgeColor: 'bg-yellow-600 text-white',
    questions: [
      {
        id: 'hw_m12_p83_q1',
        type: 'choice',
        questionText: '១. សុខមានមាន់ចំនួន 55 ក្បាល និងទាចំនួន 32 ក្បាល។ ផលធៀបនៃចំនួនទានិងមាន់ស្មើនឹង៖',
        options: ['ក. 32/55', 'ខ. 55/32', 'គ. 1/32', 'ឃ. 1/55'],
        correctAnswer: 'ក. 32/55',
        explanation: 'ផលធៀបចំនួនទារៀបនឹងចំនួនមាន់ = 32 / 55 (32:55)។'
      }
    ]
  },
  {
    id: 'hw_math_m13_p85',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៣ (ទំព័រ ៨៥-៨៧)',
    lessonTitle: 'សមាមាត្រ',
    topicTitle: '❖ វិធីគុណខ្វែងនៃសមាមាត្រ',
    icon: '📊',
    bgGradient: 'from-amber-600 to-orange-800',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m13_p85_q1',
        type: 'text',
        questionText: '១. សៀវភៅ ៣ ក្បាលថ្លៃ 7500៛។ តើសៀវភៅ ១០ ក្បាលថ្លៃប៉ុន្មានរៀល?',
        placeholder: 'សរសេរលទ្ធផល៛...',
        correctAnswer: '25000',
        explanation: '១ ក្បាលថ្លៃ 7500 / 3 = 2500៛ ➔ ១០ ក្បាលថ្លៃ 2500 × 10 = 25,000៛។'
      },
      {
        id: 'hw_m13_p85_q2',
        type: 'choice',
        questionText: '២. គេមានសមាមាត្រ n/4 = 7/2។ តើតម្លៃ n ស្មើនឹងប៉ុន្មាន?',
        options: ['ក. n = 1.14', 'ខ. n = 5.5', 'គ. n = 14', 'ឃ. n = 28'],
        correctAnswer: 'គ. n = 14',
        explanation: 'តាមវិធីគុណខ្វែង 2 × n = 4 × 7 = 28 ➔ n = 28 / 2 = 14។'
      }
    ]
  },
  {
    id: 'hw_math_m14_p88',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៤ (ទំព័រ ៨៨-៨៩)',
    lessonTitle: 'ល្បឿន',
    topicTitle: '❖ គណនាល្បឿន ចម្ងាយចរ និងរយៈពេល',
    icon: '🏎️',
    bgGradient: 'from-amber-600 to-orange-900',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m14_p88_q1',
        type: 'text',
        questionText: '១. រថយន្តមួយចរបានចម្ងាយ d = 150km ក្នុងរយៈពេល t = 3h។ រកល្បឿន v (km/h)៖',
        placeholder: 'សរសេរល្បឿន...',
        correctAnswer: '50',
        explanation: 'v = d / t = 150 / 3 = 50 km/h។'
      }
    ]
  },
  {
    id: 'hw_math_m15_p90',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៥ (ទំព័រ ៩០-១០៣)',
    lessonTitle: 'ប្រមាណវិធីលើចំនួនចម្រុះ',
    topicTitle: '❖ វិធីបូក ដក គុណ ចែក ចំនួនចម្រុះ',
    icon: '🔢',
    bgGradient: 'from-orange-600 to-amber-900',
    badgeColor: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'hw_m15_p90_q1',
        type: 'text',
        questionText: '១. គណនា៖ 22 (5/12) + 35 (3/12) = ?',
        placeholder: 'សរសេរចម្លើយ...',
        correctAnswer: '57 8/12',
        explanation: '២២ + ៣៥ = ៥៧ ហើយ ៥/១២ + ៣/១២ = ៨/១២ (ត្រូវនឹង 57 2/3)។'
      }
    ]
  },
  {
    id: 'hw_math_m16_p104',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៦ (ទំព័រ ១០៤-១១០)',
    lessonTitle: 'ភាគរយ',
    topicTitle: '❖ គណនាភាគរយ និងការបញ្ចុះតម្លៃ',
    icon: 'percent',
    bgGradient: 'from-amber-600 to-yellow-800',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m16_p104_q1',
        type: 'text',
        questionText: '១. គណនា 12% នៃ 2500 = ?',
        placeholder: 'សរសេរលទ្ធផល...',
        correctAnswer: '300',
        explanation: '12% × 2500 = (12 / 100) × 2500 = 300។'
      }
    ]
  },
  {
    id: 'hw_math_m17_p111',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៧ (ទំព័រ ១១១-១១២)',
    lessonTitle: 'ការប្រាក់',
    topicTitle: '❖ អត្រាការប្រាក់ និងការបង់រំលស់',
    icon: '💰',
    bgGradient: 'from-yellow-600 to-amber-900',
    badgeColor: 'bg-yellow-600 text-white',
    questions: [
      {
        id: 'hw_m17_p111_q1',
        type: 'text',
        questionText: '១. ប្រាក់ដើម 2,500,000៛ អត្រាការប្រាក់ប្រចាំឆ្នាំ 4% ក្នុងរយៈពេល 5 ឆ្នាំ។ រកប្រាក់ការសរុប៖',
        placeholder: 'សរសេរប្រាក់ការ៛...',
        correctAnswer: '500000',
        explanation: 'ប្រាក់ការ = ២,៥០០,០០០ × 4% × ៥ = ៥០០,០០០៛។'
      }
    ]
  },
  {
    id: 'hw_math_m18_p113',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៨ (ទំព័រ ១១៣-១១៦)',
    lessonTitle: 'ស្ថិតិ',
    topicTitle: '❖ តារាងទិន្នន័យ និងក្រាហ្វសសរ',
    icon: '📈',
    bgGradient: 'from-amber-600 to-orange-800',
    badgeColor: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'hw_m18_p113_q1',
        type: 'choice',
        questionText: '១. តើតារាងបង្ហាញចំនួនសិស្សចូលរៀនឆ្នាំ 2016 (335នាក់) ដល់ 2020 (615នាក់) មានការកើនឡើង ឬថយចុះ?',
        options: ['ក. កើនឡើងរៀងរាល់ឆ្នាំ', 'ខ. ថយចុះរៀងរាល់ឆ្នាំ', 'គ. នៅថេរ'],
        correctAnswer: 'ក. កើនឡើងរៀងរាល់ឆ្នាំ',
        explanation: 'ចំនួនសិស្សកើនពី ៣៣៥ ដល់ ៦១៥ នាក់។'
      }
    ]
  },
  {
    id: 'hw_math_m19_p117',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៩ (ទំព័រ ១១៧-១២០)',
    lessonTitle: 'ប្រមាណវិធីលើរង្វាស់ពេល',
    topicTitle: '❖ បូក ដក គុណ ចែក រង្វាស់ពេល',
    icon: '⏰',
    bgGradient: 'from-orange-600 to-amber-900',
    badgeColor: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'hw_m19_p117_q1',
        type: 'text',
        questionText: '១. បំពេញចន្លោះ៖ 25mn + _________ = 1h',
        placeholder: 'សរសេរចំនួននាទី...',
        correctAnswer: '35mn',
        explanation: '1h = 60mn ➔ 60 - 25 = 35mn។'
      }
    ]
  },
  {
    id: 'hw_math_m20_p121',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២០ (ទំព័រ ១២១-១២៧)',
    lessonTitle: 'មាឌ និងផ្ទៃក្រឡាមុខខាងនៃសូលីត',
    topicTitle: '❖ គណនាមាឌប្រអប់ និងសូលីត',
    icon: '📦',
    bgGradient: 'from-amber-700 to-orange-950',
    badgeColor: 'bg-amber-700 text-white',
    questions: [
      {
        id: 'hw_m20_p121_q1',
        type: 'text',
        questionText: '១. គណនាមាឌប្រអប់ដែលមាន បណ្តោយ 4m ទទឹង 2m និងកម្ពស់ 3m៖',
        placeholder: 'សរសេរមាឌ m³...',
        correctAnswer: '24',
        explanation: 'V = បណ្តោយ × ទទឹង × កម្ពស់ = 4 × 2 × 3 = 24 m³។'
      }
    ]
  },

  // =========================================================================
  // ភាសាខ្មែរ (KHMER)
  // =========================================================================
  {
    id: 'hw_khmer_lesson1',
    subjectId: 'khmer',
    subjectName: 'ភាសាខ្មែរថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១',
    lessonTitle: 'ថ្នាក់ពាក្យ',
    topicTitle: '❖ នាម អាយតនិបាត និងគុណនាម',
    icon: '📖',
    bgGradient: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-600 text-white',
    questions: [
      {
        id: 'hw_khmer_q1',
        type: 'choice',
        questionText: '១. តើពាក្យ "សាលារៀន" ជាថ្នាក់ពាក្យប្រភេទអ្វី?',
        options: [
          'ក. កិរិយាសព្ទ',
          'ខ. នាមអរូបី',
          'គ. នាមរូបី (នាមទូទៅ)',
          'ឃ. គុណនាម'
        ],
        correctAnswer: 'គ. នាមរូបី (នាមទូទៅ)',
        explanation: 'សាលារៀន ជានាមរូបី (នាមទូទៅ) ព្រោះជាពាក្យសម្គាល់ទីកន្លែងដែលយើងមើលឃើញផ្ទាល់ភ្នែក។'
      },
      {
        id: 'hw_khmer_q2',
        type: 'text',
        questionText: '២. ចូរបំពេញពាក្យអាយតនិបាត (ធ្នាក់) ត្រឹមត្រូវក្នុងល្បះ៖ "សិស្សានុសិស្សកំពុងរៀនសូត្រ ________ បណ្ណាល័យ។"',
        placeholder: 'បំពេញពាក្យអាយតនិបាត...',
        correctAnswer: 'នៅក្នុង',
        explanation: 'ពាក្យ "នៅក្នុង" ឬ "ក្នុង" ឬ "នៅ" គឺជាអាយតនិបាត (ធ្នាក់) ដែលបង្ហាញទីកន្លែងសមស្របបំផុត។'
      }
    ]
  },
  {
    id: 'hw_khmer_lesson2',
    subjectId: 'khmer',
    subjectName: 'ភាសាខ្មែរថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២',
    lessonTitle: 'តែងសេចក្ដី',
    topicTitle: '❖ តែងសេចក្ដីពណ៌នាអំពីទេសភាព',
    icon: '✍️',
    bgGradient: 'from-indigo-600 to-blue-800',
    badgeColor: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'hw_khmer_l2_q1',
        type: 'choice',
        questionText: '១. តើតែងសេចក្តីមានប៉ុន្មានផ្នែកសំខាន់ៗ?',
        options: [
          'ក. ២ ផ្នែក (ផ្តើម និងបញ្ចប់)',
          'ខ. ៣ ផ្នែក (ផ្ដើមសេចក្ដី តួសេចក្ដី និងបញ្ជប់សេចក្ដី)',
          'គ. ៤ ផ្នែក'
        ],
        correctAnswer: 'ខ. ៣ ផ្នែក (ផ្ដើមសេចក្ដី តួសេចក្ដី និងបញ្ជប់សេចក្ដី)',
        explanation: 'គម្រោងតែងសេចក្ដីទូទៅតែងតែមាន ៣ ផ្នែកសំខាន់។'
      }
    ]
  },
  {
    id: 'hw_khmer_lesson3',
    subjectId: 'khmer',
    subjectName: 'ភាសាខ្មែរថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣',
    lessonTitle: 'អក្សរសិល្ប៍',
    topicTitle: '❖ រឿងរាមកេរ្តិ៍ និងតម្លៃអប់រំ',
    icon: '📜',
    bgGradient: 'from-cyan-600 to-blue-900',
    badgeColor: 'bg-cyan-600 text-white',
    questions: [
      {
        id: 'hw_khmer_l3_q1',
        type: 'text',
        questionText: '១. ចូរបញ្ជាក់តួអង្គឯកប្រុស និងស្រីក្នុងរឿងរាមកេរ្តិ៍ខ្មែរ៖',
        placeholder: 'សរសេរឈ្មោះតួអង្គ...',
        correctAnswer: 'ព្រះរាម និងនាងសីដា',
        explanation: 'តួអង្គឯកប្រុសគឺ ព្រះរាម ហើយតួអង្គឯកស្រីគឺ នាងសីដា។'
      }
    ]
  },
  {
    id: 'hw_khmer_lesson4',
    subjectId: 'khmer',
    subjectName: 'ភាសាខ្មែរថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៤',
    lessonTitle: 'សំណេរខ្មែរ',
    topicTitle: '❖ ការសរសេរតាមអាន និងអក្ខរាវិរុទ្ធ',
    icon: '✒️',
    bgGradient: 'from-violet-600 to-indigo-900',
    badgeColor: 'bg-violet-600 text-white',
    questions: [
      {
        id: 'hw_khmer_l4_q1',
        type: 'choice',
        questionText: '១. តើពាក្យណាខ្លះដែលមានអក្ខរាវិរុទ្ធត្រឹមត្រូវ?',
        options: ['ក. កិត្តិយស', 'ខ. កិត្តិយស្ស', 'គ. កិតិយស'],
        correctAnswer: 'ក. កិត្តិយស',
        explanation: 'ពាក្យត្រឹមត្រូវគឺ "កិត្តិយស"។'
      }
    ]
  },

  // =========================================================================
  // វិទ្យាសាស្ត្រ (SCIENCE)
  // =========================================================================
  {
    id: 'hw_science_plants',
    subjectId: 'science',
    subjectName: 'វិទ្យាសាស្ត្រថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១',
    lessonTitle: 'រុក្ខជាតិ',
    topicTitle: '❖ សរីរាង្គលូតលាស់ និងការបន្តពូជរបស់រុក្ខជាតិ',
    icon: '🌿',
    bgGradient: 'from-emerald-600 to-teal-800',
    badgeColor: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'hw_science_q1',
        type: 'choice',
        questionText: '១. តើសរីរាង្គណាខ្លះរបស់រុក្ខជាតិដែលចាត់ទុកជា "សរីរាង្គលូតលាស់"?',
        options: [
          'ក. ផ្កា ផ្លែ និងគ្រាប់',
          'ខ. រឹស ដើម និងស្លឹក',
          'គ. លម្អងញី និងលម្អងឈ្មោល'
        ],
        correctAnswer: 'ខ. រឹស ដើម និងស្លឹក',
        explanation: 'ឫស ដើម និងស្លឹក គឺជាសរីរាង្គលូតលាស់របស់រុក្ខជាតិ។'
      }
    ]
  },
  {
    id: 'hw_science_animals',
    subjectId: 'science',
    subjectName: 'វិទ្យាសាស្ត្រថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២',
    lessonTitle: 'សត្វ និងបរិស្ថាន',
    topicTitle: '❖ ថ្នាក់សត្វឥតឆ្អឹងកង និងមានឆ្អឹងកង',
    icon: '🦋',
    bgGradient: 'from-teal-600 to-emerald-900',
    badgeColor: 'bg-teal-600 text-white',
    questions: [
      {
        id: 'hw_sci_l2_q1',
        type: 'choice',
        questionText: '១. តើសត្វណាខ្លះជាសត្វឥតឆ្អឹងកង?',
        options: ['ក. ត្រី និងកង្កែប', 'ខ. មេអំបៅ និងជន្លេន', 'គ. ឆ្កែ និងឆ្មា'],
        correctAnswer: 'ខ. មេអំបៅ និងជន្លេន',
        explanation: 'មេអំបៅ និងជន្លេន គ្មានឆ្អឹងកងខ្នងទេ។'
      }
    ]
  },
  {
    id: 'hw_science_energy',
    subjectId: 'science',
    subjectName: 'វិទ្យាសាស្ត្រថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី៣',
    lessonTitle: 'ថាមពល និងចលនា',
    topicTitle: '❖ ប្រភពថាមពលកើតឡើងវិញ',
    icon: '⚡',
    bgGradient: 'from-cyan-600 to-teal-900',
    badgeColor: 'bg-cyan-600 text-white',
    questions: [
      {
        id: 'hw_sci_l3_q1',
        type: 'choice',
        questionText: '១. តើប្រភពថាមពលណាជាថាមពលកើតឡើងវិញ (Renewable Energy)?',
        options: ['ក. ប្រេងកាត', 'ខ. ធ្យូងថ្ម', 'គ. ថាមពលព្រះអាទិត្យ'],
        correctAnswer: 'គ. ថាមពលព្រះអាទិត្យ',
        explanation: 'ថាមពលព្រះអាទិត្យជាប្រភពថាមពលកើតឡើងវិញគ្មានថ្ងៃអស់។'
      }
    ]
  }
];

interface SheetCompletionRecord {
  sheetId: string;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: number;
}

export const HomeworkSection: React.FC<HomeworkSectionProps> = ({ onEarnCoins }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<'khmer' | 'math' | 'science' | null>(null);
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);
  const [selectedLessonKey, setSelectedLessonKey] = useState<string | null>(null);

  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [gradedQuestions, setGradedQuestions] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'practice' | 'history'>('practice');

  const [completedSheets, setCompletedSheets] = useState<Record<string, SheetCompletionRecord>>(() => {
    try {
      const saved = localStorage.getItem('moeys_homework_completed_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      'm6-1-1': { sheetId: 'm6-1-1', correctCount: 5, totalQuestions: 5, percentage: 100, submittedAt: Date.now() - 86400000 },
      'm6-1-2': { sheetId: 'm6-1-2', correctCount: 4, totalQuestions: 5, percentage: 80, submittedAt: Date.now() - 43200000 },
      'k6-1-1': { sheetId: 'k6-1-1', correctCount: 3, totalQuestions: 3, percentage: 100, submittedAt: Date.now() - 172800000 }
    };
  });

  const [searchQuery, setSearchQuery] = useState('');

  const subjectsScrollRef = useRef<HTMLDivElement>(null);
  const lessonsScrollRef = useRef<HTMLDivElement>(null);

  const currentSheet = ALL_HOMEWORK_SHEETS.find((s) => s.id === activeSheetId);
  const selectedSubject = SUBJECT_CATEGORIES.find((s) => s.id === selectedSubjectId);

  // Helper to extract the base lesson key, e.g., "មេរៀនទី១" from "មេរៀនទី១ (ផ្នែកទី១)"
  const extractBaseLesson = (lessonNumberString: string) => {
    const match = lessonNumberString.match(/មេរៀនទី\s*([០-៩\d]+)/);
    if (match) {
      return `មេរៀនទី${match[1]}`;
    }
    return lessonNumberString.split('(')[0].trim();
  };

  const filteredSheets = selectedSubjectId
    ? ALL_HOMEWORK_SHEETS.filter((s) => {
        if (s.subjectId !== selectedSubjectId) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          s.lessonNumber.toLowerCase().includes(q) ||
          s.lessonTitle.toLowerCase().includes(q) ||
          s.topicTitle.toLowerCase().includes(q)
        );
      })
    : [];

  // Group the filtered sheets by their base lesson
  const groupedLessonsMap: Record<string, {
    lessonKey: string;
    lessonTitle: string;
    icon: string;
    bgGradient: string;
    badgeColor: string;
    sheets: HomeworkSheet[];
  }> = {};

  filteredSheets.forEach((sheet) => {
    const lessonKey = extractBaseLesson(sheet.lessonNumber);
    if (!groupedLessonsMap[lessonKey]) {
      groupedLessonsMap[lessonKey] = {
        lessonKey,
        lessonTitle: sheet.lessonTitle,
        icon: sheet.icon,
        bgGradient: sheet.bgGradient,
        badgeColor: sheet.badgeColor,
        sheets: []
      };
    }
    groupedLessonsMap[lessonKey].sheets.push(sheet);
  });

  const groupedLessons = Object.values(groupedLessonsMap);
  const selectedLessonGroup = groupedLessons.find((g) => g.lessonKey === selectedLessonKey);

  // Overall Subject Progress Statistics
  const subjectTotalSheets = selectedSubjectId
    ? ALL_HOMEWORK_SHEETS.filter((s) => s.subjectId === selectedSubjectId)
    : [];
  const subjectDoneSheets = subjectTotalSheets.filter((s) => completedSheets[s.id]);
  const subjectCompletionPct = subjectTotalSheets.length > 0
    ? Math.round((subjectDoneSheets.length / subjectTotalSheets.length) * 100)
    : 0;
  const subjectAvgScore = subjectDoneSheets.length > 0
    ? Math.round(
        subjectDoneSheets.reduce((sum, s) => sum + (completedSheets[s.id]?.percentage || 0), 0) /
          subjectDoneSheets.length
      )
    : 0;

  const handleAnswerChange = (questionId: string, value: string) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const cleanText = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[,.\s\-\[\]\(\)]/g, '')
      .replace(/៥/g, '5')
      .replace(/៩/g, '9')
      .replace(/៣/g, '3')
      .replace(/៧/g, '7')
      .trim();
  };

  const checkAnswerCorrectness = (q: HomeworkQuestion, studentAns: string): boolean => {
    if (!studentAns) return false;
    if (q.type === 'choice') {
      return studentAns.charAt(0) === q.correctAnswer.charAt(0);
    }
    const cleanStudent = cleanText(studentAns);
    const cleanCorrect = cleanText(q.correctAnswer);
    return cleanStudent.includes(cleanCorrect) || cleanCorrect.includes(cleanStudent);
  };

  const handleSubmitHomework = () => {
    if (!currentSheet) return;
    const grades: Record<string, boolean> = {};
    let correctCount = 0;

    currentSheet.questions.forEach((q) => {
      const studentAns = studentAnswers[q.id] || '';
      const isCorrect = checkAnswerCorrectness(q, studentAns);
      grades[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setGradedQuestions(grades);
    setShowResults(true);

    const totalQ = currentSheet.questions.length;
    const percentage = Math.round((correctCount / totalQ) * 100);

    const newRecord: SheetCompletionRecord = {
      sheetId: currentSheet.id,
      correctCount,
      totalQuestions: totalQ,
      percentage,
      submittedAt: Date.now()
    };

    setCompletedSheets((prev) => {
      const updated = {
        ...prev,
        [currentSheet.id]: newRecord
      };
      try {
        localStorage.setItem('moeys_homework_completed_v2', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    const earnedCoins = correctCount * 100 + 50;
    const earnedXp = correctCount * 150 + 100;

    if (onEarnCoins) {
      onEarnCoins(earnedCoins, earnedXp);
    }
  };

  const handleReset = () => {
    setStudentAnswers({});
    setShowResults(false);
    setGradedQuestions({});
  };

  return (
    <div className="bg-slate-900 rounded-3xl w-full flex flex-col shadow-2xl overflow-hidden border border-amber-500/30 transition-all duration-300">
      
      {/* Sleek Golden-Khmer Header Bar */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-50 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shrink-0 border-b border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 flex items-center justify-center shadow-lg shrink-0 font-bold text-2xl border border-amber-200/50 transform hover:rotate-6 transition-transform">
            📚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base sm:text-lg font-moul tracking-wide text-amber-100 flex items-center gap-2">
                <span>ផ្ទាំងកិច្ចការផ្ទះ MoEYS</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                ថ្នាក់ទី៦
              </span>
            </div>
            <p className="text-xs text-amber-200/90 font-medium mt-0.5">
              ជ្រើសរើសមុខវិជ្ជា និងមេរៀនដើម្បីអនុវត្តកិច្ចការផ្ទះតាមកម្មវិធីសិក្សាគោល (គ្រប់មេរៀន)
            </p>
          </div>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-2xl border border-amber-500/20 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              setActiveTab('practice');
              setActiveSheetId(null);
              setSelectedLessonKey(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'practice'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md font-bold'
                : 'text-amber-200 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>កិច្ចការផ្ទះ</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md font-bold'
                : 'text-amber-200 hover:bg-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>ប្រវត្តិកិច្ចការ</span>
          </button>
        </div>
      </div>

      {activeTab === 'practice' ? (
        <div className="p-4 sm:p-6 bg-slate-950 text-slate-100 min-h-[520px]">
          
          {/* LEVEL 1: Subject Cards Selection (LARGE RECTANGULAR CARDS - HORIZONTAL SCROLL) */}
          {!selectedSubjectId && !activeSheetId && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-moul text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>ជ្រើសរើសមុខវិជ្ជាកិច្ចការផ្ទះ</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    អូសទៅឆ្វេង ឬស្តាំ 👈👉 ដើម្បីជ្រើសរើសមុខវិជ្ជាគណិតវិទ្យា ភាសាខ្មែរ និងវិទ្យាសាស្ត្រ
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
                    👈👉 អូសឆ្វេងស្តាំ
                  </span>
                  <button
                    onClick={() => {
                      if (subjectsScrollRef.current) {
                        subjectsScrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                      }
                    }}
                    className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer shadow-md active:scale-95"
                    title="ទៅឆ្វេង"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (subjectsScrollRef.current) {
                        subjectsScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
                      }
                    }}
                    className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer shadow-md active:scale-95"
                    title="ទៅស្តាំ"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Large Rectangular Subject Cards Horizontal Scrollable Container */}
              <div
                ref={subjectsScrollRef}
                className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 no-scrollbar sm:scroll-smooth"
              >
                {SUBJECT_CATEGORIES.map((subject) => {
                  const subjSheets = ALL_HOMEWORK_SHEETS.filter((s) => s.subjectId === subject.id);
                  const subjDone = subjSheets.filter((s) => completedSheets[s.id]).length;
                  const subjPct = subjSheets.length > 0 ? Math.round((subjDone / subjSheets.length) * 100) : 0;

                  return (
                    <div
                      key={subject.id}
                      onClick={() => {
                        setSelectedSubjectId(subject.id);
                        setSelectedLessonKey(null);
                        setActiveSheetId(null);
                      }}
                      className={`w-[340px] h-[300px] sm:w-[450px] sm:h-[340px] shrink-0 snap-start rounded-[32px] p-6 sm:p-8 bg-gradient-to-br ${subject.gradient} border-2 ${subject.borderColor} shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden backdrop-blur-md`}
                    >
                      {/* Background icon element */}
                      <div className="absolute -right-8 -bottom-8 text-9xl opacity-15 pointer-events-none select-none transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        {subject.icon}
                      </div>

                      <div className="flex items-center justify-between z-10">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 transition-transform">
                          {subject.icon}
                        </div>
                        <span className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border backdrop-blur-md ${subject.badgeBg}`}>
                          {subject.lessonCount} មេរៀន
                        </span>
                      </div>

                      <div className="z-10 space-y-3 mt-auto">
                        <h4 className="font-moul text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors drop-shadow-md">
                          {subject.title}
                        </h4>
                        <p className="text-xs sm:text-base text-slate-200 font-medium line-clamp-1 leading-relaxed opacity-90">
                          {subject.subtitle}
                        </p>

                        {/* Subject Percentage Progress Indicator */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex justify-between items-center text-[11px] sm:text-xs font-bold text-amber-200">
                            <span>ភាគរយបានធ្វើ៖</span>
                            <span>{subjPct}% ({subjDone}/{subjSheets.length} ផ្នែក)</span>
                          </div>
                          <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/20">
                            <div
                              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                              style={{ width: `${subjPct}%` }}
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-amber-300 font-bold text-xs sm:text-sm border-t border-white/10">
                          <span>ចូលរើសមេរៀន</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            <ChevronRight className="w-5 h-5 text-amber-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LEVEL 2: Lessons List for Selected Subject (GROUPED SYLLABUS GRID) */}
          {selectedSubjectId && !selectedLessonKey && !activeSheetId && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-4">
                <button
                  onClick={() => setSelectedSubjectId(null)}
                  className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border border-slate-700 shadow-md active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ត្រលប់ទៅមុខវិជ្ជាវិញ</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{selectedSubject?.icon}</span>
                  <div>
                    <h3 className="font-moul text-lg text-amber-300">
                      {selectedSubject?.title} - បញ្ជីមេរៀនកិច្ចការផ្ទះ
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ជ្រើសរើសមេរៀនកិច្ចការផ្ទះខាងក្រោម ដើម្បីមើលផ្នែកកិច្ចការនីមួយៗ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Search Lesson Filter Input */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ស្វែងរកមេរៀន..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 text-slate-100 text-xs border border-slate-700 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Overall Subject Progress Overview Card */}
              <div className="bg-gradient-to-r from-slate-800 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-2xl shrink-0">
                    📊
                  </div>
                  <div>
                    <h4 className="font-moul text-sm sm:text-base text-amber-200">
                      ភាគរយសម្រេចកិច្ចការផ្ទះ {selectedSubject?.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      បានធ្វើបញ្ចប់ <span className="text-amber-300 font-bold">{subjectDoneSheets.length}</span> / <span className="text-slate-100 font-bold">{subjectTotalSheets.length}</span> ផ្នែក • ពិន្ទុមធ្យម <span className="text-emerald-400 font-bold">{subjectAvgScore}%</span>
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-64 space-y-1.5 shrink-0">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">ភាគរយបានធ្វើសរុប</span>
                    <span className="text-amber-300">{subjectCompletionPct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700/80">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${subjectCompletionPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Scroll controls and navigation info for Lessons */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
                <div>
                  <h4 className="font-moul text-xs sm:text-sm text-amber-200/90 flex items-center gap-1.5">
                    <span>📚 មេរៀនទាំងអស់ក្នុងវិជ្ជា {selectedSubject?.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    អូសទៅឆ្វេង ឬស្តាំ 👈👉 ឬប្រើប៊ូតុងព្រួញខាងស្តាំ ដើម្បីជ្រើសរើសមេរៀន
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                    ស្វែងយល់ពីមេរៀន
                  </span>
                  <button
                    onClick={() => {
                      if (lessonsScrollRef.current) {
                        lessonsScrollRef.current.scrollBy({ left: -330, behavior: 'smooth' });
                      }
                    }}
                    className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer shadow-md active:scale-95"
                    title="មេរៀនមុន"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (lessonsScrollRef.current) {
                        lessonsScrollRef.current.scrollBy({ left: 330, behavior: 'smooth' });
                      }
                    }}
                    className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer shadow-md active:scale-95"
                    title="មេរៀនបន្ទាប់"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Beautiful Syllabus Row layout with Lesson Completion Percentages & Unique Vibrant Lesson Colors */}
              <div 
                ref={lessonsScrollRef}
                className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 no-scrollbar sm:scroll-smooth"
              >
                {groupedLessons.map((group, idx) => {
                  const palette = LESSON_COLOR_PALETTES[idx % LESSON_COLOR_PALETTES.length];
                  const groupSheets = group.sheets;
                  const doneGroupSheets = groupSheets.filter((s) => completedSheets[s.id]);
                  const partsDone = doneGroupSheets.length;
                  const partsTotal = groupSheets.length;
                  const lessonCompletionPct = Math.round((partsDone / partsTotal) * 100);
                  const lessonAvgScore = partsDone > 0
                    ? Math.round(doneGroupSheets.reduce((acc, s) => acc + (completedSheets[s.id]?.percentage || 0), 0) / partsDone)
                    : 0;

                  return (
                    <div
                      key={group.lessonKey}
                      onClick={() => {
                        setSelectedLessonKey(group.lessonKey);
                      }}
                      className={`group relative rounded-[32px] p-6 bg-gradient-to-br ${palette.cardBg} border-2 ${palette.borderColor} shadow-2xl ${palette.shadowGlow} hover:scale-[1.03] hover:rotate-1 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[250px] backdrop-blur-md shrink-0 w-[320px] sm:w-[360px] snap-start`}
                    >
                      <div className="absolute -right-4 -bottom-4 p-4 opacity-15 text-7xl pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        {group.icon}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${palette.badgeBg}`}>
                          {group.lessonKey}
                        </span>
                        <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                          {group.icon}
                        </div>
                      </div>

                      <div className="space-y-1.5 mt-4 my-auto">
                        <h4 className={`font-moul text-base sm:text-lg leading-relaxed transition-colors line-clamp-2 ${palette.titleColor}`}>
                          {group.lessonTitle}
                        </h4>
                      </div>

                      {/* Lesson Level Percentage Display */}
                      <div className="space-y-1.5 mt-4 pt-3 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`text-[11px] font-bold ${palette.subTextColor}`}>ភាគរយបានធ្វើ៖</span>
                          <span className={`font-bold text-xs ${lessonCompletionPct === 100 ? 'text-emerald-300' : lessonCompletionPct > 0 ? 'text-amber-300' : 'text-slate-400'}`}>
                            {lessonCompletionPct}% ({partsDone}/{partsTotal} ផ្នែក)
                          </span>
                        </div>
                        <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/20">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              lessonCompletionPct === 100
                                ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                                : lessonCompletionPct > 0
                                ? `bg-gradient-to-r ${palette.progressBg}`
                                : 'bg-slate-700'
                            }`}
                            style={{ width: `${lessonCompletionPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-xl border ${palette.badgeBg}`}>
                          📋 {partsTotal} ផ្នែក {partsDone > 0 && `• ពិន្ទុ ${lessonAvgScore}%`}
                        </span>
                        <span className={`text-[11px] sm:text-xs font-bold flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform ${palette.iconColor}`}>
                          <span>ចូលមើលមេរៀន</span>
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LEVEL 3: Parts List for Selected Lesson (កិច្ចការតាមផ្នែកនីមួយៗនៃមេរៀន) */}
          {selectedSubjectId && selectedLessonKey && !activeSheetId && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-4">
                <button
                  onClick={() => setSelectedLessonKey(null)}
                  className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border border-slate-700 shadow-md active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ត្រលប់ទៅបញ្ជីមេរៀនវិញ</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{selectedLessonGroup?.icon}</span>
                  <div>
                    <h3 className="font-moul text-lg text-amber-300">
                      {selectedLessonGroup?.lessonKey}៖ {selectedLessonGroup?.lessonTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      សូមជ្រើសរើសផ្នែកកិច្ចការផ្ទះខាងក្រោមដើម្បីចាប់ផ្តើមធ្វើលំហាត់
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  មាន {selectedLessonGroup?.sheets.length} ផ្នែកកិច្ចការ
                </div>
              </div>

              {/* Lesson Progress Banner */}
              {selectedLessonGroup && (() => {
                const grpSheets = selectedLessonGroup.sheets;
                const doneGrp = grpSheets.filter((s) => completedSheets[s.id]);
                const pct = Math.round((doneGrp.length / grpSheets.length) * 100);
                const avgScore = doneGrp.length > 0
                  ? Math.round(doneGrp.reduce((acc, s) => acc + (completedSheets[s.id]?.percentage || 0), 0) / doneGrp.length)
                  : 0;
                return (
                  <div className="bg-gradient-to-r from-slate-800 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedLessonGroup.icon}</span>
                      <div>
                        <h4 className="font-moul text-sm text-amber-200">
                          ភាគរយសម្រេចកិច្ចការមេរៀន៖ {selectedLessonGroup.lessonKey}
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5">
                          ភាគរយបានធ្វើ៖ <span className="text-amber-300 font-bold">{pct}%</span> ({doneGrp.length}/{grpSheets.length} ផ្នែក) • ពិន្ទុមធ្យម៖ <span className="text-emerald-400 font-bold">{avgScore}%</span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full sm:w-48 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-700/80">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Sub-parts cards of this Lesson (បង្ហាញភាគរយតាមផ្នែក ពណ៌ខុសៗគ្នា) */}
              <div className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 no-scrollbar sm:scroll-smooth">
                {selectedLessonGroup?.sheets.map((sheet, sIdx) => {
                  const sheetPalette = LESSON_COLOR_PALETTES[(sIdx + 3) % LESSON_COLOR_PALETTES.length];
                  const record = completedSheets[sheet.id];
                  const isDone = !!record;

                  return (
                    <div
                      key={sheet.id}
                      onClick={() => {
                        setActiveSheetId(sheet.id);
                        setShowResults(false);
                        setStudentAnswers({});
                      }}
                      className={`group rounded-3xl p-5 bg-gradient-to-br ${sheetPalette.cardBg} border-2 ${sheetPalette.borderColor} shadow-2xl ${sheetPalette.shadowGlow} hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative min-h-[210px] backdrop-blur-md shrink-0 w-[290px] sm:w-[320px] snap-start`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${sheetPalette.badgeBg}`}>
                            {sheet.lessonNumber}
                          </span>
                          {/* Section Percentage Badge */}
                          {isDone ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 text-xs font-bold flex items-center gap-1 shadow-xs">
                              <span>✅ ភាគរយពិន្ទុ: {record.percentage}%</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-slate-300 border border-white/20 text-xs font-bold">
                              ⏳ មិនទាន់ធ្វើ (0%)
                            </span>
                          )}
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                          {sheet.icon}
                        </div>
                      </div>

                      <div className="space-y-1.5 my-3">
                        <h4 className={`font-moul text-base transition-colors line-clamp-2 ${sheetPalette.titleColor}`}>
                          {sheet.lessonTitle}
                        </h4>
                        <p className={`text-xs font-medium line-clamp-2 leading-relaxed opacity-90 ${sheetPalette.subTextColor}`}>
                          {sheet.topicTitle}
                        </p>
                      </div>

                      {/* Section Level Progress Bar */}
                      <div className="space-y-1 my-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className={`${sheetPalette.subTextColor} font-bold`}>លទ្ធផលភាគរយផ្នែកនេះ</span>
                          <span className={isDone ? 'text-emerald-300 font-bold' : 'text-slate-400'}>
                            {isDone ? `ពិន្ទុ ${record.correctCount}/${record.totalQuestions} (${record.percentage}%)` : 'មិនទាន់ធ្វើ (0%)'}
                          </span>
                        </div>
                        <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/20">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isDone ? 'bg-gradient-to-r from-emerald-400 to-teal-300' : 'bg-slate-700/60'
                            }`}
                            style={{ width: `${isDone ? record.percentage : 0}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${sheetPalette.badgeBg} flex items-center gap-1`}>
                          📝 {sheet.questions.length} សំណួរ
                        </span>
                        <button className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${sheetPalette.btnBg} font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 group-hover:scale-[1.02] cursor-pointer`}>
                          <span>{isDone ? 'ធ្វើឡើងវិញ' : 'ធ្វើកិច្ចការ'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LEVEL 3: Printable Official Homework Worksheet Sheet */}
          {activeSheetId && currentSheet && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveSheetId(null);
                    setShowResults(false);
                    setStudentAnswers({});
                  }}
                  className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border border-slate-700 shadow-md active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ត្រលប់ទៅបញ្ជីមេរៀនវិញ</span>
                </button>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400">
                    {currentSheet.subjectName}
                  </span>
                  <h3 className="font-moul text-sm text-amber-300">
                    {currentSheet.lessonNumber}៖ {currentSheet.lessonTitle}
                  </h3>
                </div>
              </div>

              {/* Centered Printable Paper Sheet */}
              <div className="flex justify-center">
                <div className="w-full max-w-[800px] bg-[#FAF8F5] text-slate-950 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-900/20 relative overflow-hidden flex flex-col justify-between min-h-[720px]">
                  
                  {/* Decorative Paper Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-800/40 rounded-tl-xl pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-800/40 rounded-tr-xl pointer-events-none"></div>

                  {/* Ministry Header */}
                  <div className="flex flex-col items-center text-center space-y-3 border-b-2 border-slate-300 pb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-amber-100 flex items-center justify-center shadow-lg border-2 border-amber-400/80 relative group">
                      <GraduationCap className="w-9 h-9 text-amber-200" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xs shadow-sm border border-white">
                        🇰🇭
                      </div>
                    </div>
                    <div>
                      <h4 className="font-moul text-xs sm:text-sm text-slate-900 tracking-wide">
                        ក្រសួងអប់រំ យុវជន និងកីឡា
                      </h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                        Ministry of Education, Youth and Sport
                      </p>
                    </div>

                    <div className="pt-1 space-y-1">
                      <h2 className="font-moul text-base text-slate-900">
                        {currentSheet.lessonNumber}៖ {currentSheet.lessonTitle}
                      </h2>
                      <p className="text-xs font-bold text-amber-900">
                        {currentSheet.topicTitle}
                      </p>
                    </div>

                    {/* Show Previous / Current Submission Percentage Badge */}
                    {completedSheets[currentSheet.id] && (
                      <div className="w-full bg-amber-50 border-2 border-amber-400/60 rounded-2xl p-3 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🏆</span>
                          <div className="text-left">
                            <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                              លទ្ធផលធ្វើកិច្ចការ
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              ពិន្ទុត្រឹមត្រូវ៖ {completedSheets[currentSheet.id].correctCount}/{completedSheets[currentSheet.id].totalQuestions} សំណួរ
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
                            {completedSheets[currentSheet.id].percentage}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Questions */}
                  <div className="space-y-6 my-6">
                    {currentSheet.questions.map((q) => (
                      <div key={q.id} className="space-y-3 bg-white/80 p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                          {q.questionText}
                        </p>

                        {q.type === 'choice' && q.options ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-1">
                            {q.options.map((opt) => (
                              <button
                                key={opt}
                                disabled={showResults}
                                onClick={() => handleAnswerChange(q.id, opt)}
                                className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                                  studentAnswers[q.id] === opt
                                    ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs'
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                                }`}
                              >
                                <span>{opt}</span>
                                {studentAnswers[q.id] === opt && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="pl-1">
                            <input
                              type="text"
                              disabled={showResults}
                              value={studentAnswers[q.id] || ''}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              placeholder={q.placeholder}
                              className="w-full p-3 rounded-xl bg-slate-50 text-slate-900 border-2 border-slate-300 focus:border-amber-600 focus:bg-white focus:outline-none text-xs font-semibold transition-all"
                            />
                          </div>
                        )}

                        {showResults && (
                          <div className={`p-3 rounded-xl border text-xs font-medium space-y-1.5 ${
                            gradedQuestions[q.id]
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-rose-50 border-rose-300 text-rose-950'
                          }`}>
                            <div className="flex items-center gap-1.5 font-bold">
                              {gradedQuestions[q.id] ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                              <span>
                                {gradedQuestions[q.id] ? 'ត្រឹមត្រូវ! (+១០០ ពិន្ទុ)' : 'មិនទាន់ត្រឹមត្រូវ!'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed pl-5">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="border-t-2 border-slate-300 pt-5 flex items-center justify-between flex-wrap gap-3">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-4 h-4" />
                      <span>បោះពុម្ពសន្លឹកកិច្ចការ</span>
                    </button>

                    {showResults ? (
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95"
                      >
                        ធ្វើឡើងវិញ
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitHomework}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all"
                      >
                        <Save className="w-4 h-4 text-amber-200" />
                        <span>ប្រគល់កិច្ចការផ្ទះ</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* History & Progress Dashboard tab */
        <div className="p-6 sm:p-8 bg-slate-950 text-slate-200 space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Award className="w-5 h-5" />
                </span>
                <h3 className="font-moul text-lg text-amber-300">
                  របាយការណ៍ភាគរយ និងប្រវត្តិកិច្ចការផ្ទះ
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                ពិនិត្យមើលភាគរយសម្រេចកិច្ចការផ្ទះតាមមុខវិជ្ជា និងប្រវត្តិនៃការប្រគល់លំហាត់នីមួយៗ
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>បានបញ្ចប់ {Object.keys(completedSheets).length} / {ALL_HOMEWORK_SHEETS.length} ផ្នែកកិច្ចការ</span>
            </div>
          </div>

          {/* 3 Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">ចំនួនផ្នែកបានបញ្ចប់</span>
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-300 text-lg">📋</span>
              </div>
              <div className="text-2xl font-bold text-slate-100">
                {Object.keys(completedSheets).length} <span className="text-xs font-normal text-slate-400">/ {ALL_HOMEWORK_SHEETS.length} ផ្នែក</span>
              </div>
              <p className="text-[11px] text-amber-400/90 font-medium">
                ចំនួនកិច្ចការផ្ទះដែលបានធ្វើរួចរាល់
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">ភាគរយសម្រេចសរុប</span>
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-300 text-lg">📊</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400">
                {ALL_HOMEWORK_SHEETS.length > 0
                  ? Math.round((Object.keys(completedSheets).length / ALL_HOMEWORK_SHEETS.length) * 100)
                  : 0}%
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ALL_HOMEWORK_SHEETS.length > 0
                        ? Math.round((Object.keys(completedSheets).length / ALL_HOMEWORK_SHEETS.length) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">ពិន្ទុមធ្យមភាគរយ</span>
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-300 text-lg">⭐</span>
              </div>
              <div className="text-2xl font-bold text-amber-300">
                {Object.keys(completedSheets).length > 0
                  ? Math.round(
                      (Object.values(completedSheets) as SheetCompletionRecord[]).reduce((acc, c) => acc + c.percentage, 0) /
                        Object.keys(completedSheets).length
                    )
                  : 0}%
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                គិតជាមធ្យមភាគរយនៃសំណួរដែលឆ្លើយត្រូវ
              </p>
            </div>
          </div>

          {/* Subject Breakdown Progress Bars */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <h4 className="font-moul text-sm text-amber-300 flex items-center gap-2">
              <span>📚</span>
              <span>ភាគរយសម្រេចកិច្ចការតាមមុខវិជ្ជា</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SUBJECT_CATEGORIES.map((cat) => {
                const catSheets = ALL_HOMEWORK_SHEETS.filter((s) => s.subjectId === cat.id);
                const catDone = catSheets.filter((s) => completedSheets[s.id]).length;
                const catPct = catSheets.length > 0 ? Math.round((catDone / catSheets.length) * 100) : 0;
                const catAvgScore = catDone > 0
                  ? Math.round(
                      catSheets
                        .filter((s) => completedSheets[s.id])
                        .reduce((acc, s) => acc + (completedSheets[s.id]?.percentage || 0), 0) / catDone
                    )
                  : 0;

                return (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <h5 className="font-moul text-xs text-slate-200">{cat.title}</h5>
                          <p className="text-[10px] text-slate-400">
                            ធ្វើបាន {catDone}/{catSheets.length} ផ្នែក
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {catPct}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${catPct}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                      <span>ពិន្ទុមធ្យមមុខវិជ្ជានេះ៖</span>
                      <span className="text-emerald-400 font-bold">{catAvgScore}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* List of Completed Homeworks */}
          <div className="space-y-4">
            <h4 className="font-moul text-sm text-amber-300 flex items-center gap-2">
              <span> history </span>
              <span>បញ្ជីប្រវត្តិកិច្ចការដែលបានប្រគល់</span>
            </h4>

            {Object.keys(completedSheets).length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
                <span className="text-5xl opacity-40 block">📝</span>
                <h5 className="font-moul text-sm text-slate-300">មិនទាន់មានប្រវត្តិកិច្ចការផ្ទះនៅឡើយទេ</h5>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  សូមចូលទៅកាន់ផ្ទាំង "បញ្ជីកិច្ចការផ្ទះ" ដើម្បីជ្រើសរើសមេរៀន និងធ្វើកិច្ចការផ្ទះដំបូងរបស់អ្នក!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.values(completedSheets) as SheetCompletionRecord[]).map((rec) => {
                  const sheetInfo = ALL_HOMEWORK_SHEETS.find((s) => s.id === rec.sheetId);
                  if (!sheetInfo) return null;

                  return (
                    <div
                      key={rec.sheetId}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-2 rounded-xl bg-slate-800 border border-slate-700">
                            {sheetInfo.icon}
                          </span>
                          <div>
                            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                              {sheetInfo.subjectName}
                            </span>
                            <h5 className="font-moul text-xs text-slate-100 mt-1">
                              {sheetInfo.lessonNumber}៖ {sheetInfo.lessonTitle}
                            </h5>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                              {sheetInfo.topicTitle}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-base font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 block">
                            {rec.percentage}%
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            ត្រូវ {rec.correctCount}/{rec.totalQuestions}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px]">
                        <span className="text-slate-400">
                          📅 កាលបរិច្ឆេទ៖ {new Date(rec.submittedAt).toLocaleDateString('km-KH')}
                        </span>
                        <button
                          onClick={() => {
                            setActiveTab('homework');
                            setSelectedSubjectId(sheetInfo.subjectId);
                            setSelectedLessonKey(sheetInfo.lessonNumber);
                            setActiveSheetId(sheetInfo.id);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>មើល / ធ្វើឡើងវិញ</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
