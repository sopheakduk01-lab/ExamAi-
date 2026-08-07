export type SubjectId = 'khmer' | 'math' | 'science' | 'social' | 'english' | 'health';

export interface Subject {
  id: SubjectId;
  nameKhmer: string;
  nameEnglish: string;
  description: string;
  questionCount: number;
  lessonCount: number;
  examPaperCount: number;
  colorBorder: string; // Tailwind border color class e.g. border-blue-600
  colorBgLight: string; // Light background for avatar e.g. bg-blue-50
  colorText: string; // Text color e.g. text-blue-600
  colorBadgeBg: string; // e.g. bg-blue-100
  colorBadgeText: string; // e.g. text-blue-700
  iconName: string;
  symbol: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category?: string;
  subjectId: SubjectId;
  questionType?: 'single' | 'matching_table' | 'fill_blank' | 'multi_select';
  matchingData?: {
    columnA: { id: number; text: string }[];
    columnB: { label: string; text: string }[];
    correctPairs: Record<number, string>;
  };
  correctAnswersIndices?: number[];
  wordBank?: string[];
}

export interface ExamPaper {
  id: string;
  subjectId: SubjectId;
  title: string;
  description: string;
  durationMinutes: number;
  totalPoints: number;
  questions: Question[];
  yearOrType: string;
}

export interface LessonSummary {
  id: string;
  subjectId: SubjectId;
  chapter: string;
  title: string;
  content: string;
  keyPoints: string[];
  formulaCard?: {
    title: string;
    content: string;
    example?: string;
  };
  stepByStepExample?: {
    problemText: string;
    steps: { stepNumber: number; title: string; detail: string }[];
    finalAnswer: string;
  };
  realWorldApplication?: string;
  commonPitfalls?: string[];
  quickPractice?: {
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  audioReadText?: string;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  subjectId: SubjectId;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  timeSpentSeconds: number;
  studentName?: string;
  studentGender?: 'ប្រុស' | 'ស្រី';
}

export interface StudentExamTrackingRecord {
  id: string;
  studentName: string;
  studentGender: 'ប្រុស' | 'ស្រី';
  examId: string;
  examTitle: string;
  subjectId: SubjectId;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  timestamp: number;
  timeSpentSeconds: number;
}

export interface UserProfile {
  name: string;
  grade: string;
  school?: string;
  avatar: string;
  characterId?: string;
  registeredAt: string;
  pin?: string;
}

export interface StudentAccount {
  id: string;
  name: string;
  pin: string; // 6-digit PIN code
  grade: string;
  school?: string;
  avatar: string;
  characterId?: string;
  createdAt: string;
  lastLoginAt: string;
  bookmarks: string[];
  progress: UserProgress;
}

export interface UserProgress {
  completedExams: ExamResult[];
  bookmarkedQuestionIds: string[];
  notes: Record<string, string>;
}
