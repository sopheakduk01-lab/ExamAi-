import React, { useState, useEffect } from 'react';
import { getSafeAudioContext } from '../utils/audioSynthesizer';
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

interface ExamRunnerProps {
  exam: ExamPaper;
  onBack: () => void;
  onFinishExam: (result: ExamResult) => void;
  bookmarkedQuestionIds: string[];
  onToggleBookmark: (questionId: string) => void;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  exam,
  onBack,
  onFinishExam,
  bookmarkedQuestionIds,
  onToggleBookmark
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
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

        // Vibrate mobile device when wrong answer
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

  const handleSelectOption = (optionIndex: number) => {
    if (isCompleted || selectedAnswers[currentQuestion.id] !== undefined) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    playAnswerFeedback(isCorrect);

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
    setShowExplanation((prev) => ({
      ...prev,
      [currentQuestion.id]: true
    }));
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

  const calculateScore = () => {
    let score = 0;
    exam.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleCompleteExam = () => {
    setIsCompleted(true);
    setIsTimerRunning(false);
    const score = calculateScore();
    const total = exam.questions.length;
    const percentage = Math.round((score / total) * 100);
    const timeSpent = exam.durationMinutes * 60 - timeLeftSeconds;

    onFinishExam({
      examId: exam.id,
      examTitle: exam.title,
      subjectId: exam.subjectId,
      score,
      totalQuestions: total,
      percentage,
      date: new Date().toLocaleDateString('km-KH'),
      timeSpentSeconds: Math.max(10, timeSpent)
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
        utterance.lang = 'km-KH';
        utterance.rate = 0.9;
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

  const score = calculateScore();
  const percentage = Math.round((score / exam.questions.length) * 100);

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

    if (category.includes('ផ្នែកទី៥') || category.includes('លំហាត់')) {
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
      <div className="max-w-2xl mx-auto py-6 px-4">
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
              <p className="text-xl font-bold text-emerald-600">{score} / {exam.questions.length}</p>
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
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswerIndex;
              const catDetails = getCategoryDetails(q.category);
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
              const isAns = selectedAnswers[q.id] !== undefined;
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

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
            const isCorrectOption = idx === currentQuestion.correctAnswerIndex;

            let optionStyle = 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/30 text-slate-800';
            if (isAnswered) {
              if (isSelected) {
                optionStyle = isCorrectOption
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30'
                  : 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/30';
              } else if (isCorrectOption) {
                optionStyle = 'border-emerald-400 bg-emerald-50/70 text-emerald-900';
              } else {
                optionStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
              }
            }

            const labels = ['ក', 'ខ', 'គ', 'ឃ'];

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 text-sm sm:text-base font-medium ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${isSelected ? (isCorrectOption ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : 'bg-slate-100 text-slate-700'}`}>
                    {labels[idx] || idx + 1}
                  </span>
                  <span>
                    <MathFormattedText text={option} />
                  </span>
                </div>

                {isAnswered && isSelected && (
                  isCorrectOption ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card with Math Formatting */}
        {showExplanation[currentQuestion.id] && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed animate-fade-in">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              ការបកស្រាយលម្អិត៖
            </div>
            <p className="text-slate-700">
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
