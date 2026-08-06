import { ExamPaper } from '../../types';
import { LESSONS_1_TO_6_SCIENCE_EXAMS } from './lessons1to6';
import { LESSONS_7_TO_12_SCIENCE_EXAMS } from './lessons7to12';
import { LESSONS_13_TO_17_SCIENCE_EXAMS } from './lessons13to17';
import { COMPREHENSIVE_SCIENCE_EXAMS } from './comprehensiveScienceExams';

export const ALL_LESSON_SCIENCE_EXAMS: ExamPaper[] = [
  ...LESSONS_1_TO_6_SCIENCE_EXAMS,
  ...LESSONS_7_TO_12_SCIENCE_EXAMS,
  ...LESSONS_13_TO_17_SCIENCE_EXAMS,
];

export const ALL_SCIENCE_EXAM_PAPERS: ExamPaper[] = [
  ...ALL_LESSON_SCIENCE_EXAMS,
  ...COMPREHENSIVE_SCIENCE_EXAMS,
];
