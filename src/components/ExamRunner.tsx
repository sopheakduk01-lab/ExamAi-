import React, { useState, useEffect } from 'react';
import { getSafeAudioContext, configureKhmerFemaleVoice } from '../utils/audioSynthesizer';
import { ExamPaper, Question, ExamResult } from '../types';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Award,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Volume2,
  PenTool,
  BookOpen,
  Grid,
  Bot,
  CheckSquare,
  Layers,
  Edit3,
  Calculator,
  Target
} from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';
import { MathScratchpad } from './MathScratchpad';
import { MathFormulaModal } from './MathFormulaModal';
import { MathAIQuestionTutorModal } from './MathAIQuestionTutorModal';
import { saveExamAttemptRecord } from '../utils/examTracking';
import { KhmerDictationRunner } from './KhmerDictationRunner';

interface ExamRunnerProps {
  exam: ExamPaper;
  onBack: () => void;
  onFinishExam: (result: ExamResult) => void;
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
  studentName?: string;
  studentGender?: 'ប្រុស' | 'ស្រី';
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  exam,
  onBack,
  onFinishExam,
  bookmarkedQuestionIds,
  onToggleBookmark,
  studentName,
  studentGender
}) => {
  if (exam.id === 'new_khmer_dictation_exam_2026_orussi') {
    return (
      <KhmerDictationRunner
        exam={exam}
        onBack={onBack}
        onFinishExam={onFinishExam}
        studentName={studentName}
        studentGender={studentGender}
      />
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [matchingSelections, setMatchingSelections] = useState<Record<string, Record<number, string>>>({});
  const [multiSelections, setMultiSelections] = useState<Record<string, number[]>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isReadingQuestion, setIsReadingQuestion] = useState(false);

  // Modals state
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isAITutorModalOpen, setIsAITutorModalOpen] = useState(false);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);

  const currentQuestion: Question = exam.questions[currentIndex];
  const isBookmarked = bookmarkedQuestionIds.includes(currentQuestion?.id);

  // Countdown timer
  useEffect(() => {
    if (!isTimerRunning || isCompleted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleCompleteExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isCompleted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const playAnswerFeedback = (isCorrect: boolean) => {
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (isCorrect) {
        // Correct sound: cheerful chime (C5 -> E5 -> G5)
        const freqs = [523.25, 659.25, 783.99];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.25, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.25);
        });
      } else {
        // Wrong sound: low buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);

        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([150, 80, 150]);
          } catch (e) {
            // ignore
          }
        }
      }
    } catch (e) {
      // ignore
    }
  };

  const isNewExamPaper =
    exam.id === 'new_grade6_full_exam' ||
    exam.id.startsWith('new_') ||
    exam.title.includes('វិញ្ញាសាតេស្តថ្មី');
  const isInstantFeedbackAllowed = !isNewExamPaper;

  const handleSelectOption = (optionIndex: number) => {
    if (isCompleted) return;

    if (isInstantFeedbackAllowed) {
      if (selectedAnswers[currentQuestion.id] !== undefined) return;

      const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
      playAnswerFeedback(isCorrect);
      setShowExplanation((prev) => ({
        ...prev,
        [currentQuestion.id]: true
      }));
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  // Matching pair handler
  const handleSelectMatchingPair = (questionId: string, itemId: number, selectedLabel: string) => {
    if (isCompleted) return;
    setMatchingSelections((prev) => {
      const qMatches = prev[questionId] || {};
      return {
        ...prev,
        [questionId]: {
          ...qMatches,
          [itemId]: selectedLabel
        }
      };
    });
  };

  // Multi-select handler
  const handleToggleMultiSelect = (questionId: string, optionIndex: number) => {
    if (isCompleted) return;
    setMultiSelections((prev) => {
      const currentArr = prev[questionId] || [];
      if (currentArr.includes(optionIndex)) {
        return {
          ...prev,
          [questionId]: currentArr.filter((i) => i !== optionIndex)
        };
      } else {
        return {
          ...prev,
          [questionId]: [...currentArr, optionIndex]
        };
      }
    });
  };

  const handleNext = () => {
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleCompleteExam();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Calculate score with exact weightings
  const calculateScore = () => {
    let score = 0;
    exam.questions.forEach((q) => {
      if (q.questionType === 'matching_table' && q.matchingData) {
        const selections = matchingSelections[q.id] || {};
        let correctPairCount = 0;
        Object.entries(q.matchingData.correctPairs).forEach(([itemId, correctLabel]) => {
          if (selections[Number(itemId)] === correctLabel) {
            correctPairCount += 1;
          }
        });
        // 8 pairs = 1 full score unit
        score += correctPairCount / 8;
      } else if (q.questionType === 'multi_select' && q.correctAnswersIndices) {
        const selections = multiSelections[q.id] || [];
        let correctCount = 0;
        selections.forEach((idx) => {
          if (q.correctAnswersIndices?.includes(idx)) {
            correctCount += 1;
          }
        });
        const targetCount = q.correctAnswersIndices.length || 6;
        score += Math.min(1, correctCount / targetCount);
      } else {
        if (selectedAnswers[q.id] === q.correctAnswerIndex) {
          score += 1;
        }
      }
    });
    return Math.min(exam.questions.length, Math.round(score * 100) / 100);
  };

  const handleCompleteExam = () => {
    setIsCompleted(true);
    setIsTimerRunning(false);
    const calculated = calculateScore();
    const total = exam.questions.length;
    const percentage = Math.min(100, Math.round((calculated / total) * 100));
    const timeSpent = exam.durationMinutes * 60 - timeLeftSeconds;

    let finalStudentName = studentName || 'សិស្សមិនបានបញ្ជាក់';
    let finalStudentGender: 'ប្រុស' | 'ស្រី' = studentGender || 'ប្រុស';

    try {
      const savedInfo = localStorage.getItem('grade6_student_exam_info');
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        if (parsed.name) finalStudentName = parsed.name;
        if (parsed.gender) finalStudentGender = parsed.gender;
      }
    } catch (e) {
      // ignore
    }

    const finalScore = Math.round(calculated * 10) / 10;
    const finalDate = new Date().toLocaleDateString('km-KH');
    const finalTimeSpent = Math.max(10, timeSpent);

    // Save tracking attempt record for Owner
    saveExamAttemptRecord({
      studentName: finalStudentName,
      studentGender: finalStudentGender,
      examId: exam.id,
      examTitle: exam.title,
      subjectId: exam.subjectId,
      score: finalScore,
      totalQuestions: total,
      percentage,
      date: finalDate,
      timeSpentSeconds: finalTimeSpent
    });

    onFinishExam({
      examId: exam.id,
      examTitle: exam.title,
      subjectId: exam.subjectId,
      score: finalScore,
      totalQuestions: total,
      percentage,
      date: finalDate,
      timeSpentSeconds: finalTimeSpent,
      studentName: finalStudentName,
      studentGender: finalStudentGender
    });
  };

  // Web Speech synthesis for Khmer reading
  const handleReadQuestion = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (isReadingQuestion) {
          window.speechSynthesis.cancel();
          setIsReadingQuestion(false);
          return;
        }
        window.speechSynthesis.cancel();
        const textToRead = `${currentQuestion.text}. ជម្រើសរួមមាន៖ ${currentQuestion.options.join(', ')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        configureKhmerFemaleVoice(utterance);
        utterance.onend = () => setIsReadingQuestion(false);
        utterance.onerror = () => setIsReadingQuestion(false);

        setIsReadingQuestion(true);
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsReadingQuestion(false);
    }
  };

  const rawScore = calculateScore();
  const percentage = Math.min(100, Math.round((rawScore / exam.questions.length) * 100));

  // Collect used words in Part 4 fill in the blanks
  const usedWordsInPart4 = exam.questions
    .filter((q) => q.questionType === 'fill_blank' && q.id !== currentQuestion.id && selectedAnswers[q.id] !== undefined)
    .map((q) => q.options[selectedAnswers[q.id]]);

  const getCategoryDetails = (category?: string) => {
    if (!category) {
      return {
        title: 'សំណួរទូទៅ',
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
        bannerBg: 'bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50 border-amber-200/80 text-amber-950',
        icon: <HelpCircle className="w-4 h-4 text-amber-600" />
      };
    }

    if (category.includes('ផ្នែកទី១') || category.includes('QCM')) {
      return {
        title: category,
        badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
        bannerBg: 'bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-slate-50 border-blue-200 text-blue-950',
        icon: <CheckSquare className="w-4 h-4 text-blue-600" />
      };
    }

    if (category.includes('ផ្នែកទី២') || category.includes('ផ្គូផ្គង')) {
      return {
        title: category,
        badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
        bannerBg: 'bg-gradient-to-r from-purple-50/90 via-fuchsia-50/80 to-slate-50 border-purple-200 text-purple-950',
        icon: <Layers className="w-4 h-4 text-purple-600" />
      };
    }

    if (category.includes('ផ្នែកទី៣') || category.includes('ខុស') || category.includes('ត្រូវ')) {
      return {
        title: category,
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        bannerBg: 'bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-slate-50 border-emerald-200 text-emerald-950',
        icon: <Target className="w-4 h-4 text-emerald-600" />
      };
    }

    if (category.includes('ផ្នែកទី៤') || category.includes('បំពេញ')) {
      return {
        title: category,
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
        bannerBg: 'bg-gradient-to-r from-amber-50/90 via-yellow-50/80 to-orange-50 border-amber-200 text-amber-950',
        icon: <Edit3 className="w-4 h-4 text-amber-600" />
      };
    }

    if (category.includes('ផ្នែកទី៥') || category.includes('ត្រិះរិះ') || category.includes('លំហាត់')) {
      return {
        title: category,
        badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
        bannerBg: 'bg-gradient-to-r from-rose-50/90 via-orange-50/80 to-red-50 border-rose-200 text-rose-950',
        icon: <Calculator className="w-4 h-4 text-rose-600" />
      };
    }

    return {
      title: category,
      badgeBg: 'bg-slate-100 text-slate-900 border-slate-300',
      bannerBg: 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200 text-slate-900',
      icon: <Sparkles className="w-4 h-4 text-amber-600" />
    };
  };

  if (isCompleted) {
    return (
      <div className="max-w-3xl mx-auto py-6 px-4">
        {/* Exam Completion Screen */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-lg text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold font-moul text-slate-800 mb-2">
            {percentage >= 80 ? 'អបអរសាទរ! ពូកែណាស់' : percentage >= 50 ? 'ល្អណាស់! ព្យាយាមបន្ថែមទៀត' : 'ព្យាយាមឡើងវិញ!'}
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            អ្នកបានបញ្ចប់ «{exam.title}»
          </p>

          {/* Score details badge */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl mb-6 border border-slate-200/60 text-center">
            <div>
              <p className="text-xs text-slate-500 font-medium">ពិន្ទុសរុប</p>
              <p className="text-xl font-bold text-emerald-600">{Math.round(rawScore * 10) / 10} / {exam.questions.length}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">ភាគរយ</p>
              <p className="text-xl font-bold text-amber-600">{percentage}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">រយៈពេលប្រើ</p>
              <p className="text-xl font-bold text-blue-600">
                {formatTime(exam.durationMinutes * 60 - timeLeftSeconds)}
              </p>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="text-left space-y-4 mb-8">
            <h3 className="text-base font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ពិនិត្យចម្លើយឡើងវិញ
            </h3>
            {exam.questions.map((q, idx) => {
              const catDetails = getCategoryDetails(q.category);

              if (q.questionType === 'matching_table' && q.matchingData) {
                const selections = matchingSelections[q.id] || {};
                let correctCount = 0;
                Object.entries(q.matchingData.correctPairs).forEach(([itemId, correctLabel]) => {
                  if (selections[Number(itemId)] === correctLabel) correctCount += 1;
                });

                return (
                  <div key={q.id} className="p-4 rounded-xl border bg-purple-50/40 border-purple-200 space-y-3">
                    <div className={`text-xs font-bold inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shadow-2xs ${catDetails.bannerBg}`}>
                      {catDetails.icon}
                      <span>{q.category}</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-slate-800">
                        {idx + 1}. <MathFormattedText text={q.text} />
                      </span>
                      <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-md shrink-0">
                        ត្រឹមត្រូវ {correctCount} / ៨ ចំណុច
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.matchingData.columnA.map((item) => {
                        const userPick = selections[item.id];
                        const correctPick = q.matchingData?.correctPairs[item.id];
                        const isPairCorrect = userPick === correctPick;

                        return (
                          <div key={item.id} className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${isPairCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'}`}>
                            <span className="font-semibold">{item.text}</span>
                            <span className="font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border shadow-2xs shrink-0">
                              ចម្លើយ៖ {userPick || '—'} {isPairCorrect ? '✅' : `(ត្រូវ៖ ${correctPick})`}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2 text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 leading-relaxed whitespace-pre-line">
                      💡 <span className="font-semibold text-purple-900">ការបកស្រាយផ្គូផ្គង៖</span> {q.explanation}
                    </div>
                  </div>
                );
              }

              if (q.questionType === 'multi_select' && q.correctAnswersIndices) {
                const selections = multiSelections[q.id] || [];
                let correctCount = 0;
                selections.forEach((sIdx) => {
                  if (q.correctAnswersIndices?.includes(sIdx)) correctCount += 1;
                });

                return (
                  <div key={q.id} className="p-4 rounded-xl border bg-rose-50/40 border-rose-200 space-y-3">
                    <div className={`text-xs font-bold inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shadow-2xs ${catDetails.bannerBg}`}>
                      {catDetails.icon}
                      <span>{q.category}</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-slate-800">
                        {idx + 1}. <MathFormattedText text={q.text} />
                      </span>
                      <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-md shrink-0">
                        ត្រឹមត្រូវ {correctCount} / ៦ ចម្លើយ
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selections.includes(oIdx);
                        const isCorrectOpt = q.correctAnswersIndices?.includes(oIdx);

                        let itemStyle = 'bg-white border-slate-200 text-slate-700';
                        if (isSelected && isCorrectOpt) itemStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                        else if (isSelected && !isCorrectOpt) itemStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                        else if (!isSelected && isCorrectOpt) itemStyle = 'bg-amber-50 border-amber-300 text-amber-950 italic';

                        return (
                          <div key={oIdx} className={`p-2 rounded-lg border flex items-start gap-2 ${itemStyle}`}>
                            <span className="shrink-0">{isSelected ? (isCorrectOpt ? '✅' : '❌') : (isCorrectOpt ? '⭐ (ចម្លើយត្រូវ)' : '⚪')}</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2 text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 leading-relaxed whitespace-pre-line">
                      💡 <span className="font-semibold text-rose-900">ការបកស្រាយ៖</span> {q.explanation}
                    </div>
                  </div>
                );
              }

              // Standard single choice
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswerIndex;

              return (
                <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                  {q.category && (
                    <div className={`text-xs font-bold mb-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shadow-2xs ${catDetails.bannerBg}`}>
                      {catDetails.icon}
                      <span>{q.category}</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-slate-800">
                      {idx + 1}. <MathFormattedText text={q.text} />
                    </span>
                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ត្រឹមត្រូវ
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                        <XCircle className="w-3.5 h-3.5" /> ខុស
                      </span>
                    )}
                  </div>
                  <div className="text-xs space-y-1 text-slate-700">
                    <p><span className="font-semibold">ចម្លើយអ្នក៖</span> {userAns !== undefined ? <MathFormattedText text={q.options[userAns]} /> : 'មិនបានឆ្លើយ'}</p>
                    <p className="text-emerald-800 font-semibold"><span className="font-bold">ចម្លើយត្រឹមត្រូវ៖</span> <MathFormattedText text={q.options[q.correctAnswerIndex]} /></p>
                  </div>
                  <div className="mt-2 text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                    💡 <span className="font-semibold text-amber-900">ការបកស្រាយ៖</span> <MathFormattedText text={q.explanation} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setIsCompleted(false);
                setSelectedAnswers({});
                setMatchingSelections({});
                setMultiSelections({});
                setShowExplanation({});
                setCurrentIndex(0);
                setTimeLeftSeconds(exam.durationMinutes * 60);
                setIsTimerRunning(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 active:scale-95 transition-all cursor-pointer flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              ធ្វើតេស្តឡើងវិញ
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 active:scale-95 transition-all cursor-pointer text-sm"
            >
              ត្រឡប់ទៅមុខវិជ្ជា
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      {/* Exam Header Topbar */}
      <div className="flex items-center justify-between gap-2 mb-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-900 transition-colors cursor-pointer"
          id="btn-back-exam"
        >
          <ArrowLeft className="w-4 h-4" />
          ត្រឡប់
        </button>

        {/* Timer */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-mono text-xs sm:text-sm font-bold border border-amber-300/60">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>

        {/* Question Counter & Palette Toggle */}
        <button
          onClick={() => setShowQuestionPalette(!showQuestionPalette)}
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          title="បើកបញ្ជីសំណួរទាំងអស់"
        >
          <Grid className="w-3.5 h-3.5 text-amber-700" />
          <span>{currentIndex + 1} / {exam.questions.length}</span>
        </button>
      </div>

      {/* Math Utility Tools Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/70 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsScratchpadOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>ក្ដារខៀវ/ក្រដាសព្រៀង</span>
          </button>

          <button
            onClick={() => setIsFormulaModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>រូបមន្តសំខាន់ៗ</span>
          </button>
        </div>
      </div>

      {/* Expandable Question Grid Palette */}
      {showQuestionPalette && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
            <span>បញ្ជីសំណួរ (ចុចដើម្បីផ្លាស់ប្ដូរភ្លាមៗ)</span>
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> បានឆ្លើយ</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> ចំណាំ</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> មិនទាន់ឆ្លើយ</span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {exam.questions.map((q, idx) => {
              const isAns = selectedAnswers[q.id] !== undefined || (matchingSelections[q.id] && Object.keys(matchingSelections[q.id]).length > 0) || (multiSelections[q.id] && multiSelections[q.id].length > 0);
              const isBm = bookmarkedQuestionIds.includes(q.id);
              const isCurr = idx === currentIndex;

              let btnBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
              if (isCurr) {
                btnBg = 'bg-amber-600 text-white ring-2 ring-amber-500 ring-offset-1 font-bold';
              } else if (isAns) {
                btnBg = 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300';
              } else if (isBm) {
                btnBg = 'bg-amber-100 text-amber-800 font-bold border border-amber-300';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowQuestionPalette(false);
                  }}
                  className={`h-9 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${btnBg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / exam.questions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-sm mb-6">
        {/* Section Category Header Banner */}
        {currentQuestion.category && (
          <div className={`mb-4 p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-between shadow-2xs ${getCategoryDetails(currentQuestion.category).bannerBg}`}>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-white/90 shadow-2xs">
                {getCategoryDetails(currentQuestion.category).icon}
              </span>
              <span className="leading-tight">{currentQuestion.category}</span>
            </div>
            <span className="text-[11px] font-mono font-bold bg-white/80 px-2 py-0.5 rounded-md text-slate-700 shadow-2xs shrink-0">
              សំណួរ {currentIndex + 1}/{exam.questions.length}
            </span>
          </div>
        )}

        <div className="flex items-start justify-between gap-3 mb-4">
          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold border ${getCategoryDetails(currentQuestion.category).badgeBg}`}>
            សំណួរទី {currentIndex + 1}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadQuestion}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${isReadingQuestion ? 'bg-amber-200 text-amber-900 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              title="អានសំណួរ"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleBookmark(currentQuestion.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${isBookmarked ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              title={isBookmarked ? 'បានចំណាំ' : 'ចំណាំសំណួរ'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-600 text-amber-700" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Formatted Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
          <MathFormattedText text={currentQuestion.text} />
        </h2>

        {/* 1. MATCHING TABLE UI (Part 2) */}
        {currentQuestion.questionType === 'matching_table' && currentQuestion.matchingData ? (
          <div className="space-y-6 mb-6">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-200/80 pb-2 flex-wrap gap-2">
                <span className="font-bold text-xs sm:text-sm text-purple-950 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-700" />
                  <span>តារាងផ្គូផ្គងទាំងមូល (សូមជ្រើសរើសចម្លើយ ជួរ ខ សម្រាប់ជួរ ក នីមួយៗ)</span>
                </span>
                <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-300">
                  សរុប ៨ ចំណុច
                </span>
              </div>

              {/* Column B Descriptions Box for clear reference */}
              <div className="p-3.5 bg-white rounded-xl border border-purple-200 text-xs space-y-1.5 shadow-2xs">
                <p className="font-bold text-purple-900 mb-1 border-b pb-1">📋 បញ្ជីការពិពណ៌នា (ជួរ ខ)៖</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700">
                  {currentQuestion.matchingData.columnB.map((colB) => (
                    <div key={colB.label} className="flex items-start gap-1.5 p-1.5 rounded-md bg-purple-50/40 border border-purple-100">
                      <span className="font-mono font-bold text-purple-800 bg-purple-200/80 px-1.5 py-0.2 rounded shrink-0">
                        {colB.label}
                      </span>
                      <span>{colB.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column A Items & Selectors */}
              <div className="space-y-2.5">
                <p className="font-bold text-xs text-slate-800">👇 ជ្រើសរើសចម្លើយ ជួរ ខ ផ្គូផ្គងជាមួយ ជួរ ក៖</p>
                {currentQuestion.matchingData.columnA.map((colA) => {
                  const currentPick = matchingSelections[currentQuestion.id]?.[colA.id] || '';

                  return (
                    <div
                      key={colA.id}
                      className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs hover:border-purple-300 transition-colors"
                    >
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {colA.text}
                      </span>

                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                        <span className="text-xs text-slate-500 font-semibold">ផ្គូផ្គងនឹង៖</span>
                        <select
                          value={currentPick}
                          onChange={(e) => handleSelectMatchingPair(currentQuestion.id, colA.id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg border-2 border-purple-300 bg-purple-50 text-purple-950 font-bold text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all w-full sm:w-auto"
                        >
                          <option value="">-- ជ្រើសរើស (ក..ជ) --</option>
                          {currentQuestion.matchingData?.columnB.map((b) => (
                            <option key={b.label} value={b.label}>
                              {b.label}. {b.text.substring(0, 32)}...
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : currentQuestion.questionType === 'multi_select' && currentQuestion.correctAnswersIndices ? (
          /* 2. MULTI-SELECT UI (Part 5) */
          <div className="space-y-4 mb-6">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 font-semibold flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-rose-700" />
                <span>សូមជ្រើសរើសចម្លើយត្រឹមត្រូវទាំងអស់ខាងក្រោម៖</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const selectedList = multiSelections[currentQuestion.id] || [];
                const isSelected = selectedList.includes(idx);
                const isCorrectOption = currentQuestion.correctAnswersIndices?.includes(idx);

                let optionStyle = "border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/30 text-slate-800";

                if (isCompleted) {
                  if (isSelected) {
                    optionStyle = isCorrectOption
                      ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30"
                      : "border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/30";
                  } else if (isCorrectOption) {
                    optionStyle = "border-emerald-400 bg-emerald-50/70 text-emerald-900 font-bold";
                  } else {
                    optionStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                  }
                } else if (isSelected) {
                  optionStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/30";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleToggleMultiSelect(currentQuestion.id, idx)}
                    disabled={isCompleted}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between gap-2 text-xs sm:text-sm cursor-pointer ${optionStyle}`}
                  >
                    <span>
                      <MathFormattedText text={option} />
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* 3. STANDARD / FILL IN BLANKS OPTIONS UI */
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              // For Part 4 (fill in blanks): do not show words that were already selected/used in previous Part 4 questions!
              if (currentQuestion.questionType === 'fill_blank') {
                const isSelected = selectedAnswers[currentQuestion.id] === idx;
                const isAlreadyUsedElsewhere = usedWordsInPart4.includes(option) && !isSelected;

                if (isAlreadyUsedElsewhere) {
                  return null; // Hide already used words!
                }
              }

              const isSelected = selectedAnswers[currentQuestion.id] === idx;
              const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
              const isCorrectOption = idx === currentQuestion.correctAnswerIndex;

              const showResults = isInstantFeedbackAllowed ? isAnswered : isCompleted;

              let optionStyle = 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/30 text-slate-800';

              if (showResults) {
                if (isSelected) {
                  optionStyle = isCorrectOption
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30'
                    : 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/30';
                } else if (isCorrectOption) {
                  optionStyle = 'border-emerald-400 bg-emerald-50/70 text-emerald-900 font-bold';
                } else {
                  optionStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/30';
              }

              const labels = ['ក', 'ខ', 'គ', 'ឃ'];

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showResults}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-sm sm:text-base font-medium ${
                    showResults ? 'cursor-default' : 'cursor-pointer'
                  } ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        showResults
                          ? isSelected
                            ? isCorrectOption
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : isCorrectOption
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-700'
                          : isSelected
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {labels[idx] || idx + 1}
                    </span>
                    <span>
                      <MathFormattedText text={option} />
                    </span>
                  </div>

                  {showResults ? (
                    isSelected ? (
                      isCorrectOption ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )
                    ) : isCorrectOption ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 opacity-80" />
                    ) : null
                  ) : isSelected ? (
                    <span className="w-3 h-3 rounded-full bg-amber-600 shrink-0" />
                  ) : null}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation Card with Math Formatting */}
        {(isCompleted || (isInstantFeedbackAllowed && showExplanation[currentQuestion.id])) && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed animate-fade-in">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              ការបកស្រាយលម្អិត៖
            </div>
            <p className="text-slate-700 whitespace-pre-line">
              <MathFormattedText text={currentQuestion.explanation} />
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-700 text-xs sm:text-sm disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          សំណួរមុន
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
        >
          {currentIndex === exam.questions.length - 1 ? 'បញ្ចប់តេស្ត' : 'សំណួរបន្ទាប់'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modals */}
      <MathScratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      <MathFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />

      <MathAIQuestionTutorModal
        isOpen={isAITutorModalOpen}
        onClose={() => setIsAITutorModalOpen(false)}
        question={currentQuestion}
        questionIndex={currentIndex}
      />
    </div>
  );
};
