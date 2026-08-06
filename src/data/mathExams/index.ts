import { ExamPaper } from '../../types';
import { LESSONS_1_TO_5_EXAMS } from './lessons1to5';
import { LESSONS_6_TO_10_EXAMS } from './lessons6to10';
import { LESSONS_11_TO_15_EXAMS } from './lessons11to15';
import { LESSONS_16_TO_20_EXAMS } from './lessons16to20';
import { SEMESTER_1_MATH_EXAM } from './semester1Exam';
import { SEMESTER_2_MATH_EXAM } from './semester2Exam';
import { MATH_EXAM_PAPERS as COMPREHENSIVE_MATH_EXAMS } from '../mathExamsData';

export const ALL_LESSON_MATH_EXAMS: ExamPaper[] = [
  ...LESSONS_1_TO_5_EXAMS,
  ...LESSONS_6_TO_10_EXAMS,
  ...LESSONS_11_TO_15_EXAMS,
  ...LESSONS_16_TO_20_EXAMS,
];

export const ALL_MATH_EXAM_PAPERS: ExamPaper[] = [
  SEMESTER_1_MATH_EXAM,
  SEMESTER_2_MATH_EXAM,
  ...ALL_LESSON_MATH_EXAMS,
  ...COMPREHENSIVE_MATH_EXAMS,
];

