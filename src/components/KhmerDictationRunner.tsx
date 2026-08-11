import React, { useState, useEffect, useRef } from 'react';
import { ExamPaper, Question, ExamResult } from '../types';
import { configureKhmerFemaleVoice } from '../utils/audioSynthesizer';
import {
  ArrowLeft,
  Clock,
  Volume2,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Edit3,
  HelpCircle,
  User,
  AlertCircle,
  Check,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveExamAttemptRecord } from '../utils/examTracking';

interface KhmerDictationRunnerProps {
  exam: ExamPaper;
  onBack: () => void;
  onFinishExam: (result: ExamResult) => void;
  studentName?: string;
  studentGender?: 'ប្រុស' | 'ស្រី';
}

export const KhmerDictationRunner: React.FC<KhmerDictationRunnerProps> = ({
  exam,
  onBack,
  onFinishExam,
  studentName = 'សិស្សមិនបានបញ្ជាក់',
  studentGender = 'ប្រុស'
}) => {
  // Timer state
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Answers State
  const [dictationAnswers, setDictationAnswers] = useState<Record<string, string>>({});
  const [qcmAnswers, setQcmAnswers] = useState<Record<string, number>>({});
  const [fillAnswers, setFillAnswers] = useState<Record<string, number>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<string, number>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<string, string>>({});
  const [gradedScore, setGradedScore] = useState<number>(0);

  // Audio Playback State
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [isAutoPlayingAll, setIsAutoPlayingAll] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState<number>(-1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Question lists filtered by category
  const dictationQuestions = exam.questions.filter(q => q.category.includes('សរសេរតាមអាន'));
  const qcmQuestions = exam.questions.filter(q => q.category.includes('QCM'));
  const fillQuestions = exam.questions.filter(q => q.category.includes('បំពេញល្បះ'));
  const tfQuestions = exam.questions.filter(q => q.category.includes('ខុស ឬ ត្រូវ'));
  const essayQuestions = exam.questions.filter(q => q.category.includes('គំនិតច្នៃប្រឌិត'));

  // Timer Countdown
  useEffect(() => {
    if (!isTimerRunning || isCompleted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleGradeAndComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isCompleted]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingWordId(null);
  };

  // TTS helper via /api/tts
  const playWordTTS = async (text: string, id: string) => {
    stopAudio();
    setPlayingWordId(id);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: 'Kore', // Soft female Voice
        }),
      });

      if (!res.ok) throw new Error('TTS failed');
      const data = await res.json();
      if (!data.audio) throw new Error('No audio');

      const audioUrl = `data:${data.mimeType || 'audio/mp3'};base64,${data.audio}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        setPlayingWordId(null);
        // If auto-playing, trigger next word after a pause
        if (isAutoPlayingAll && autoPlayIndex !== -1) {
          triggerNextAutoPlayWord(autoPlayIndex + 1);
        }
      });

      audio.play().catch((err) => {
        console.error('Playback failed:', err);
        setPlayingWordId(null);
      });
    } catch (err) {
      console.error('Error generating word audio:', err);
      // Fallback: Web Speech API
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        configureKhmerFemaleVoice(utterance);
        utterance.onend = () => {
          setPlayingWordId(null);
          if (isAutoPlayingAll && autoPlayIndex !== -1) {
            triggerNextAutoPlayWord(autoPlayIndex + 1);
          }
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setPlayingWordId(null);
      }
    }
  };

  // Sequential Autoplay Logic
  const triggerNextAutoPlayWord = (nextIndex: number) => {
    if (nextIndex >= dictationQuestions.length) {
      // Finished all dictation words
      setIsAutoPlayingAll(false);
      setAutoPlayIndex(-1);
      return;
    }

    setAutoPlayIndex(nextIndex);
    const question = dictationQuestions[nextIndex];
    
    // Scroll word card into view
    const cardElement = document.getElementById(`dict-card-${question.id}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Pause briefly, then say: "ពាក្យទី X... [ពាក្យ]"
    const preText = `ពាក្យទី ${nextIndex + 1}។ ${question.text}។ ម្ដងទៀត។ ពាក្យទី ${nextIndex + 1}៖ ${question.text}។`;
    
    autoPlayTimerRef.current = setTimeout(() => {
      playWordTTS(preText, `autoplay-${question.id}`);
    }, 2500); // Wait 2.5 seconds before starting next word pronunciation
  };

  const handleStartAutoPlay = () => {
    stopAudio();
    if (isAutoPlayingAll) {
      setIsAutoPlayingAll(false);
      setAutoPlayIndex(-1);
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    } else {
      setIsAutoPlayingAll(true);
      triggerNextAutoPlayWord(0);
    }
  };

  // Check dictation word spellings accurately (ignoring trailing whitespace)
  const isDictationCorrect = (userAns: string, correctAns: string) => {
    if (!userAns) return false;
    const cleanUser = userAns.trim();
    const cleanCorrect = correctAns.trim();
    return cleanUser === cleanCorrect;
  };

  // Grade Exam & Save Score
  const handleGradeAndComplete = () => {
    stopAudio();
    setIsTimerRunning(false);
    setIsCompleted(true);

    // Calculate score
    let totalScore = 0;

    // Part 1: Dictation (20 words, each worth 0.25 points, total = 5 points)
    let dictationCorrectCount = 0;
    dictationQuestions.forEach((q) => {
      const userAns = dictationAnswers[q.id] || '';
      if (isDictationCorrect(userAns, q.text)) {
        dictationCorrectCount += 1;
      }
    });
    const dictationScore = dictationCorrectCount * 0.25;
    totalScore += dictationScore;

    // Part 2: QCM (10 questions, each worth 0.1 points, total = 1 point)
    let qcmCorrectCount = 0;
    qcmQuestions.forEach((q) => {
      if (qcmAnswers[q.id] === q.correctAnswerIndex) {
        qcmCorrectCount += 1;
      }
    });
    const qcmScore = qcmCorrectCount * 0.1;
    totalScore += qcmScore;

    // Part 3: Fill Blanks (10 sentences, each worth 0.1 points, total = 1 point)
    let fillCorrectCount = 0;
    fillQuestions.forEach((q) => {
      if (fillAnswers[q.id] === q.correctAnswerIndex) {
        fillCorrectCount += 1;
      }
    });
    const fillScore = fillCorrectCount * 0.1;
    totalScore += fillScore;

    // Part 4: True/False (8 sentences, each worth 0.125 points, total = 1 point)
    let tfCorrectCount = 0;
    tfQuestions.forEach((q) => {
      if (tfAnswers[q.id] === q.correctAnswerIndex) {
        tfCorrectCount += 1;
      }
    });
    const tfScore = tfCorrectCount * 0.125;
    totalScore += tfScore;

    // Part 5: Essays (2 essays, pre-graded as correct for demonstration or given partial scores, total = 2 points)
    let essayCorrectCount = 0;
    essayQuestions.forEach((q) => {
      const length = (essayAnswers[q.id] || '').trim().length;
      if (length > 10) {
        essayCorrectCount += 1;
      }
    });
    const essayScore = essayCorrectCount * 1.0;
    totalScore += essayScore;

    const finalScore = Math.min(10, Math.round(totalScore * 100) / 100);
    setGradedScore(finalScore);
    const percentage = Math.round((finalScore / 10) * 100);
    const timeSpent = exam.durationMinutes * 60 - timeLeftSeconds;
    const finalTimeSpent = Math.max(10, timeSpent);
    const finalDate = new Date().toLocaleDateString('km-KH');

    // Play happy chime & throw confetti if score is high!
    if (finalScore >= 5) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    const finalStudentGender: 'ប្រុស' | 'ស្រី' = studentGender === 'ស្រី' ? 'ស្រី' : 'ប្រុស';

    // Save attempts for tracking dashboard
    saveExamAttemptRecord({
      studentName,
      studentGender: finalStudentGender,
      examId: exam.id,
      examTitle: exam.title,
      subjectId: exam.subjectId,
      score: finalScore,
      totalQuestions: exam.questions.length,
      percentage,
      date: finalDate,
      timeSpentSeconds: finalTimeSpent
    });

    // Notify App of completion
    onFinishExam({
      examId: exam.id,
      examTitle: exam.title,
      subjectId: exam.subjectId,
      score: finalScore,
      totalQuestions: exam.questions.length,
      percentage,
      date: finalDate,
      timeSpentSeconds: finalTimeSpent,
      studentName,
      studentGender: finalStudentGender
    });
  };

  // Performance Assessment
  const getPerformanceFeedback = (score: number) => {
    if (score >= 9) return { text: 'មហាស្នាដៃ! ពូកែណាស់!', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 7.5) return { text: 'ល្អណាស់! ប្រឹងប្រែងបន្ថែមទៀត!', color: 'text-sky-700 bg-sky-50 border-sky-200' };
    if (score >= 5) return { text: 'មធ្យម! ត្រូវរៀនបន្ថែម!', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { text: 'ព្យាយាមបន្ថែមទៀត! អ្នកអាចធ្វើបាន!', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  return (
    <div className="max-w-4xl mx-auto py-3 px-2 sm:px-4 space-y-6 font-siemreap text-slate-800">
      {/* Exam Header Topbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            title="ត្រឡប់ទៅក្រោយ"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                📚 ភាសាខ្មែរ
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                ⏱️ {exam.durationMinutes} នាទី
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                🎯 ១០ ពិន្ទុពេញ
              </span>
            </div>
            <h1 className="font-moul text-xs sm:text-sm text-slate-900 mt-1 sm:leading-relaxed">
              {exam.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          {/* Student Info Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>{studentName} ({studentGender})</span>
          </div>

          {/* Realtime Timer */}
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-amber-100 text-amber-900 font-mono text-sm font-bold border border-amber-200/80 shadow-2xs">
            <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>
        </div>
      </div>

      {/* COMPLETED / GRADED PANEL */}
      {isCompleted && (
        <div className="bg-gradient-to-br from-white via-amber-50/10 to-emerald-50/10 border-2 border-emerald-500/80 p-6 rounded-3xl shadow-lg space-y-6 animate-fadeIn">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 shadow-2xs">
              <Award className="w-9 h-9 text-emerald-600 animate-bounce" />
            </div>
            <h2 className="font-moul text-lg text-slate-900">
              លទ្ធផលនៃការធ្វើតេស្តរបស់អ្នកសិស្ស!
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              កាលបរិច្ឆេទ៖ {new Date().toLocaleDateString('km-KH')} | ឈ្មោះសិស្ស៖ {studentName} ({studentGender})
            </p>

            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-xs text-center">
                <span className="block text-xs font-bold text-slate-400">ពិន្ទុទទួលបាន</span>
                <span className="font-moul text-2xl text-emerald-600">
                  {gradedScore} / ១០
                </span>
              </div>
              <div className={`px-5 py-4 rounded-2xl border text-center font-bold text-xs sm:text-sm shadow-xs ${getPerformanceFeedback(gradedScore).color}`}>
                <span className="block text-[10px] opacity-75 mb-0.5">ការវាយតម្លៃ</span>
                {getPerformanceFeedback(gradedScore).text}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setDictationAnswers({});
                setQcmAnswers({});
                setFillAnswers({});
                setTfAnswers({});
                setEssayAnswers({});
                setIsCompleted(false);
                setTimeLeftSeconds(exam.durationMinutes * 60);
                setIsTimerRunning(true);
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ប្រឡងឡើងវិញ</span>
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200 active:scale-95 transition-all cursor-pointer text-sm"
            >
              ត្រឡប់ទៅបញ្ជីវិញ្ញាសា
            </button>
          </div>
        </div>
      )}

      {/* CORE PORTION: AUDIO DICTATION CONTROL BOARD */}
      {!isCompleted && (
        <div className="bg-gradient-to-r from-sky-50 to-amber-50/50 border border-sky-200 p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-moul text-xs text-sky-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              ប្រព័ន្ធសំឡេងអានស្វ័យប្រវត្តិ (Gemini Smart Voice Reader)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              ចុចប៊ូតុងខាងស្តាំ ដើម្បីឱ្យប្រព័ន្ធអានពាក្យទាំង ២០ ជូនសិស្សដោយស្វ័យប្រវត្តិតាមលំដាប់លំដោយ ជាមួយការផ្អាកសមស្រប។
            </p>
          </div>
          <button
            onClick={handleStartAutoPlay}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer shrink-0 ${
              isAutoPlayingAll
                ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
            }`}
          >
            {isAutoPlayingAll ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>ផ្អាកការអានស្វ័យប្រវត្ត</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>ស្ដាប់ការអានទាំង ២០ ពាក្យ</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* PART 1: DICTATION WORDS GRID */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-moul text-xs sm:text-sm text-slate-900">
              ផ្នែកទី១៖ សរសេរតាមអាន (២០ ពាក្យ - ៥ ពិន្ទុ)
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
              ចូរស្ដាប់សំឡេងអានរបស់ Gemini រួចសរសេរពាក្យឲ្យបានត្រឹមត្រូវទៅក្នុងចន្លោះនីមួយៗ (០.២៥ ពិន្ទុ/ពាក្យ)។
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dictationQuestions.map((q, idx) => {
            const userAns = dictationAnswers[q.id] || '';
            const isCorrect = isDictationCorrect(userAns, q.text);
            const isAutoPlayActive = autoPlayIndex === idx && isAutoPlayingAll;
            const isIndividualPlaying = playingWordId === q.id;

            return (
              <div
                key={q.id}
                id={`dict-card-${q.id}`}
                className={`p-3.5 rounded-2xl border transition-all relative flex flex-col justify-between h-[135px] ${
                  isCompleted
                    ? isCorrect
                      ? 'bg-emerald-50/60 border-emerald-400'
                      : 'bg-rose-50/60 border-rose-400'
                    : isAutoPlayActive
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300'
                    : 'bg-slate-50/40 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    ពាក្យទី {idx + 1}
                  </span>

                  {!isCompleted && (
                    <button
                      onClick={() => playWordTTS(`ពាក្យទី ${idx + 1}៖ ${q.text}។`, q.id)}
                      className={`p-1.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                        isIndividualPlaying
                          ? 'bg-amber-500 text-white border-amber-500 animate-pulse'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                      title="ស្ដាប់សំឡេង"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isCompleted && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  {isCompleted ? (
                    <div className="space-y-1.5">
                      <div className="text-xs text-slate-500">
                        ចម្លើយ៖ <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700 line-through'}`}>{userAns || '(គ្មានចម្លើយ)'}</span>
                      </div>
                      {!isCorrect && (
                        <div className="text-xs text-slate-800 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 inline-block">
                          អក្ខរាវិរុទ្ធ៖ <span className="text-emerald-600 font-moul text-[11px]">{q.text}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={userAns}
                      onChange={(e) =>
                        setDictationAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      placeholder="វាយអក្សរ..."
                      className="w-full text-center px-2 py-1.5 text-sm font-bold bg-white rounded-xl border border-slate-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50 placeholder-slate-400 transition-all font-siemreap"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PART 2: QCM QUESTIONS */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-moul text-xs sm:text-sm text-slate-900">
              ផ្នែកទី២៖ សំណួរជ្រើសរើសចម្លើយត្រូវ QCM (១០ សំណួរ - ១ ពិន្ទុ)
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
              ចូរជ្រើសរើសចម្លើយណាដែលត្រឹមត្រូវបំផុតសម្រាប់សំណួរនីមួយៗ (០.១ ពិន្ទុ/សំណួរ)។
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {qcmQuestions.map((q, idx) => {
            const selectedIdx = qcmAnswers[q.id];
            const isQuestionCorrect = selectedIdx === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? isQuestionCorrect
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-rose-50/40 border-rose-300'
                    : 'bg-slate-50/30 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-950 leading-relaxed">
                    {q.text}
                  </h4>
                  {isCompleted && (
                    <span className="shrink-0 pt-0.5">
                      {isQuestionCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedIdx === oIdx;
                    const isCorrectOption = oIdx === q.correctAnswerIndex;

                    return (
                      <button
                        key={oIdx}
                        disabled={isCompleted}
                        onClick={() => setQcmAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`px-4 py-2 text-left text-xs rounded-xl font-medium border flex items-center gap-2 transition-all ${
                          isCompleted
                            ? isSelected
                              ? isCorrectOption
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-rose-600 border-rose-600 text-white'
                              : isCorrectOption
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                              : 'bg-white border-slate-200 text-slate-500'
                            : isSelected
                            ? 'bg-amber-500 border-amber-500 text-white font-semibold'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border shrink-0 ${
                          isSelected || (isCompleted && isCorrectOption)
                            ? 'bg-white/20 border-white text-current'
                            : 'border-slate-300 text-slate-500'
                        }`}>
                          {oIdx === 0 ? 'ក' : oIdx === 1 ? 'ខ' : oIdx === 2 ? 'គ' : 'ឃ'}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isCompleted && q.explanation && (
                  <div className="mt-2.5 p-2 rounded-xl bg-white/70 border border-slate-200 text-xs text-slate-600 font-medium">
                    <span className="text-emerald-700 font-bold">ពន្យល់៖</span> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PART 3: FILL IN THE BLANKS */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-moul text-xs sm:text-sm text-slate-900">
              ផ្នែកទី៣៖ បំពេញចន្លោះល្បះ (១០ ល្បះ - ១ ពិន្ទុ)
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
              ចូរជ្រើសរើសពាក្យអក្ខរាវិរុទ្ធដែលត្រឹមត្រូវយកទៅបំពេញចន្លោះក្នុងល្បះនីមួយៗ (០.១ ពិន្ទុ/ល្បះ)។
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {fillQuestions.map((q, idx) => {
            const selectedIdx = fillAnswers[q.id];
            const isQuestionCorrect = selectedIdx === q.correctAnswerIndex;

            // Highlight blank spot visually
            const displayText = q.text.replace('[ចន្លោះ]', '______');

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? isQuestionCorrect
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-rose-50/40 border-rose-300'
                    : 'bg-slate-50/30 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-950 leading-relaxed">
                    {displayText}
                  </h4>
                  {isCompleted && (
                    <span className="shrink-0 pt-0.5">
                      {isQuestionCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedIdx === oIdx;
                    const isCorrectOption = oIdx === q.correctAnswerIndex;

                    return (
                      <button
                        key={oIdx}
                        disabled={isCompleted}
                        onClick={() => setFillAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`px-4 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isCompleted
                            ? isSelected
                              ? isCorrectOption
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-rose-600 border-rose-600 text-white'
                              : isCorrectOption
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                              : 'bg-white border-slate-200 text-slate-400'
                            : isSelected
                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isCompleted && (
                  <div className="mt-2.5 p-2 rounded-xl bg-white/70 border border-slate-200 text-xs text-slate-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ល្បះត្រឹមត្រូវ៖ {q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PART 4: TRUE OR FALSE */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-moul text-xs sm:text-sm text-slate-900">
              ផ្នែកទី៤៖ សំណួរ ខុស ឬ ត្រូវ (៨ ល្បះ - ១ ពិន្ទុ)
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
              ចូរកំណត់ថាតើពាក្យដែលសរសេរជាអក្សរដិតខ្មៅ នៅក្នុងល្បះនីមួយៗ សរសេរត្រឹមត្រូវ ឬខុស (០.១២៥ ពិន្ទុ/ល្បះ)។
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {tfQuestions.map((q, idx) => {
            const selectedIdx = tfAnswers[q.id];
            const isQuestionCorrect = selectedIdx === q.correctAnswerIndex;

            // Simple markup parsing helper for bold Markdown syntax **word**
            const parseBoldKhmer = (rawText: string) => {
              const parts = rawText.split('**');
              if (parts.length > 2) {
                return (
                  <span>
                    {parts[0]}
                    <strong className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/50 inline-block font-moul text-[11px]">{parts[1]}</strong>
                    {parts[2]}
                  </span>
                );
              }
              return <span>{rawText}</span>;
            };

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? isQuestionCorrect
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-rose-50/40 border-rose-300'
                    : 'bg-slate-50/30 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-medium text-xs sm:text-sm text-slate-900 leading-relaxed">
                    {parseBoldKhmer(q.text)}
                  </h4>
                  {isCompleted && (
                    <span className="shrink-0 pt-0.5">
                      {isQuestionCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-3">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedIdx === oIdx;
                    const isCorrectOption = oIdx === q.correctAnswerIndex;

                    return (
                      <button
                        key={oIdx}
                        disabled={isCompleted}
                        onClick={() => setTfAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`px-5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          isCompleted
                            ? isSelected
                              ? isCorrectOption
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-rose-600 border-rose-600 text-white'
                              : isCorrectOption
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                              : 'bg-white border-slate-200 text-slate-400'
                            : isSelected
                            ? oIdx === 0
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                              : 'bg-rose-600 border-rose-600 text-white shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isCompleted && (
                  <div className="mt-2.5 p-2 rounded-xl bg-white/70 border border-slate-200 text-xs text-slate-600 font-semibold">
                    <span className="text-emerald-700 font-bold">លម្អិត៖</span> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PART 5: CREATIVE ESSAYS */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-moul text-xs sm:text-sm text-slate-900">
              ផ្នែកទី៥៖ សំណួរអប់រំ និងគំនិតច្នៃប្រឌិត (២ សំណួរ - ២ ពិន្ទុ)
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
              ចូរសរសេរពន្យល់តាមការយល់ឃើញរបស់អ្នកឲ្យបានត្រឹមត្រូវ និងសមស្រប (១.០ ពិន្ទុ/សំណួរ)។
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {essayQuestions.map((q, idx) => {
            const userAns = essayAnswers[q.id] || '';

            return (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/20 space-y-3"
              >
                <h4 className="font-bold text-xs sm:text-sm text-slate-950 leading-relaxed">
                  {q.text}
                </h4>

                {isCompleted ? (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <span className="block font-bold text-slate-400 text-[10px] mb-1">អត្ថបទឆ្លើយរបស់អ្នក៖</span>
                      {userAns ? (
                        <p className="whitespace-pre-line">{userAns}</p>
                      ) : (
                        <p className="italic text-slate-400">(គ្មានចម្លើយ)</p>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 leading-relaxed space-y-1">
                      <span className="block font-moul text-emerald-800 text-[10px] mb-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        ចម្លើយគំរូ និងចំណុចគន្លឹះ៖
                      </span>
                      <p className="font-medium whitespace-pre-line">{q.explanation}</p>
                    </div>
                  </div>
                ) : (
                  <textarea
                    rows={4}
                    value={userAns}
                    onChange={(e) => setEssayAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder="សរសេរការយល់ឃើញរបស់អ្នកនៅទីនេះ..."
                    className="w-full p-3.5 text-xs sm:text-sm bg-white rounded-2xl border border-slate-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50 placeholder-slate-400 transition-all font-siemreap leading-relaxed"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTION BUTTONS */}
      {!isCompleted && (
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>សូមពិនិត្យអក្ខរាវិរុទ្ធ និងចម្លើយឡើងវិញ មុនពេលបញ្ចប់ការប្រឡង។</span>
          </div>

          <button
            onClick={handleGradeAndComplete}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>កែវិញ្ញាសា និងបញ្ចប់ការប្រឡង</span>
          </button>
        </div>
      )}
    </div>
  );
};
