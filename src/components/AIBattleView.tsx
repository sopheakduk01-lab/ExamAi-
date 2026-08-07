import React, { useState, useEffect, useRef } from 'react';
import { getSafeAudioContext } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import { Subject, ExamPaper, Question } from '../types';
import { SUBJECTS, EXAM_PAPERS } from '../data/grade6Data';
import {
  Swords,
  Bot,
  User,
  Trophy,
  Timer,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  Award,
  BookOpen,
  ChevronRight,
  Volume2,
  VolumeX,
  Wand2,
  Sliders,
  Clock,
  Flag,
  X,
  Check,
  Crown
} from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';

interface AIBattleViewProps {
  subject?: Subject;
  examPapers?: ExamPaper[];
  onSelectPaperForBattle?: (paper: ExamPaper) => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const AI_CONFIGS = {
  easy: {
    name: '🟢 ងាយស្រួល (AI កូនសិស្ស)',
    shortName: 'ងាយស្រួល',
    badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    minDelay: 4500,
    maxDelay: 7500,
    accuracy: 0.55
  },
  medium: {
    name: '🟡 ពិបាកបង្គួរ (AI សិស្សពូកែ)',
    shortName: 'ពិបាកបង្គួរ',
    badgeClass: 'bg-amber-950 text-amber-300 border-amber-700',
    minDelay: 3000,
    maxDelay: 5500,
    accuracy: 0.78
  },
  hard: {
    name: '🔴 ពិបាកខ្លាំង (AI គ្រូប្រឡង)',
    shortName: 'ពិបាកខ្លាំង',
    badgeClass: 'bg-rose-950 text-rose-300 border-rose-700',
    minDelay: 1800,
    maxDelay: 3800,
    accuracy: 0.92
  }
};

export const AIBattleView: React.FC<AIBattleViewProps> = ({ subject, examPapers }) => {
  // 1. Subject & Paper Selection
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    subject ? subject.id : 'science'
  );

  // Available papers for current subject (supporting all subjects and sub-subjects like khmer-grammar, social-studies, etc.)
  const availablePapers = EXAM_PAPERS.filter((p) => {
    if (selectedSubjectId === 'khmer') {
      return p.subjectId === 'khmer' || p.subjectId.startsWith('khmer');
    }
    if (selectedSubjectId === 'social') {
      return p.subjectId.startsWith('social');
    }
    return p.subjectId === selectedSubjectId;
  });

  const [selectedPaperId, setSelectedPaperId] = useState<string>(() => {
    if (examPapers && examPapers.length > 0) return examPapers[0].id;
    const firstForSubject = EXAM_PAPERS.find((p) => p.subjectId === (subject ? subject.id : 'science'));
    return firstForSubject ? firstForSubject.id : EXAM_PAPERS[0]?.id || '';
  });

  // Whenever selectedSubjectId changes, update selectedPaperId to the first paper of that subject
  useEffect(() => {
    const papers = EXAM_PAPERS.filter((p) => {
      if (selectedSubjectId === 'khmer') return p.subjectId === 'khmer' || p.subjectId.startsWith('khmer');
      if (selectedSubjectId === 'social') return p.subjectId.startsWith('social');
      return p.subjectId === selectedSubjectId;
    });
    if (papers.length > 0) {
      setSelectedPaperId(papers[0].id);
    }
  }, [selectedSubjectId]);

  // Game Settings
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [timerConfig, setTimerConfig] = useState<string>('300'); // '60', '180', '300', '600', 'unlimited'
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  // Game States
  const [gameState, setGameState] = useState<'config' | 'playing' | 'ended'>('config');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(300);

  // Tower climb scores
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [aiScore, setAiScore] = useState<number>(0);
  const [userStreak, setUserStreak] = useState<number>(0);

  // Per question state
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [aiAnswer, setAiAnswer] = useState<number | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const [aiStatusText, setAiStatusText] = useState<string>('AI កំពុងរង់ចាំ...');
  const [showAiHint, setShowAiHint] = useState<boolean>(false);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs & Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const aiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to remove English or hint text inside parentheses in option choices (e.g. (Conductor), (Insulator), (Parallel), etc.)
  const cleanOptionText = (text: string): string => {
    if (!text) return '';
    // Removes parenthetical notes like (Conductor), (Insulator), (Parallel), (Series), etc.
    return text.replace(/\s*\([a-zA-Z\s\-\/]+\)/g, '').trim();
  };

  const activePaper = EXAM_PAPERS.find((p) => p.id === selectedPaperId) || availablePapers[0] || EXAM_PAPERS[0];
  const questions: Question[] = activePaper ? activePaper.questions : [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalStepsNeeded = 25; // 25 points needed to win

  // Web Audio Synthesizer
  const playSound = (type: 'correct' | 'wrong' | 'win' | 'click') => {
    if (!isSoundOn) return;
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'correct') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);

        // Vibrate phone/device on wrong answer
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([150, 80, 150]);
          } catch (e) {
            // ignore
          }
        }
      } else if (type === 'win') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.2, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.3);
        });
      }
    } catch (e) {
      // ignore
    }
  };

  // Canvas background animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(244, 63, 94, '
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.6)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color + '1)';
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color + (1 - dist / 100) * 0.12 + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timerConfig !== 'unlimited') {
      if (timeLeftSeconds <= 0) {
        endGame(playerScore >= aiScore);
        return;
      }

      const timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame(playerScore >= aiScore);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, timeLeftSeconds, timerConfig, playerScore, aiScore]);

  // Keyboard Shortcuts Support (Q, W, E, R or 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing' || userAnswer !== null || !currentQuestion) return;
      const key = e.key.toLowerCase();
      if (key === 'q' || key === '1' || key === 'a') handleUserAnswer(0);
      else if (key === 'w' || key === '2' || key === 'b') handleUserAnswer(1);
      else if (key === 'e' || key === '3' || key === 'c') handleUserAnswer(2);
      else if (key === 'r' || key === '4' || key === 'd') handleUserAnswer(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, userAnswer, currentQuestionIndex]);

  // Start Battle
  const handleStartGame = () => {
    if (!activePaper || questions.length === 0) return;
    playSound('click');
    setGameState('playing');
    setCurrentQuestionIndex(0);
    const secs = timerConfig === 'unlimited' ? 999999 : parseInt(timerConfig, 10);
    setTimeLeftSeconds(secs);
    setPlayerScore(0);
    setAiScore(0);
    setUserStreak(0);
    resetQuestionState();
    scheduleAiAnswer();
  };

  const resetQuestionState = () => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setUserAnswer(null);
    setAiAnswer(null);
    setShowAiHint(false);
    setAiThinking(true);
    setAiStatusText('AI កំពុងវិភាគ និងគិតគណនា...');
  };

  // AI Answer Generator Logic
  const scheduleAiAnswer = () => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

    const config = AI_CONFIGS[difficulty];
    const delay = Math.floor(Math.random() * (config.maxDelay - config.minDelay)) + config.minDelay;

    setAiThinking(true);
    setAiStatusText('AI កំពុងគិតគណនា...');

    aiTimerRef.current = setTimeout(() => {
      const isCorrect = Math.random() < config.accuracy;
      if (isCorrect) {
        setAiScore((prev) => {
          const next = prev + 1;
          if (next >= totalStepsNeeded) {
            setTimeout(() => endGame(false), 200);
          }
          return next;
        });
      }

      setAiThinking(false);
      setAiStatusText(isCorrect ? 'AI បានឆ្លើយត្រូវ!' : 'AI បានឆ្លើយខុស!');
    }, delay);
  };

  // User Answer Handler with Auto-Advance after 900ms
  const handleUserAnswer = (optionIndex: number) => {
    if (userAnswer !== null || !currentQuestion) return;

    setUserAnswer(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      playSound('correct');
      setUserStreak((prev) => prev + 1);
      setPlayerScore((prev) => {
        const next = prev + 1;
        if (next >= totalStepsNeeded) {
          setTimeout(() => endGame(true), 300);
        }
        return next;
      });
    } else {
      playSound('wrong');
      setUserStreak(0);
    }

    // Auto-advance to next question automatically after 900ms delay without needing manual button click
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    autoNextTimerRef.current = setTimeout(() => {
      handleNextQuestion();
    }, 900);
  };

  // Next Question
  const handleNextQuestion = () => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    playSound('click');
    if (currentQuestionIndex + 1 < questions.length) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      resetQuestionState();
      scheduleAiAnswer();
    } else {
      // Loop or finish
      setCurrentQuestionIndex(0);
      resetQuestionState();
      scheduleAiAnswer();
    }
  };

  // End Game
  const endGame = (isPlayerWinner: boolean) => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    setGameState('ended');

    if (isPlayerWinner) {
      playSound('win');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playSound('wrong');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const formatTime = (secs: number) => {
    if (secs >= 99990) return '∞ គ្មានកំណត់';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const playerProgressPct = Math.min(100, (playerScore / totalStepsNeeded) * 100);
  const aiProgressPct = Math.min(100, (aiScore / totalStepsNeeded) * 100);
  const playerLevel = Math.min(5, Math.floor(playerScore / 5) + 1);
  const aiLevel = Math.min(5, Math.floor(aiScore / 5) + 1);

  return (
    <div className="relative max-w-5xl mx-auto space-y-4">
      {/* BACKGROUND CANVAS */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-40 bg-slate-950" />
      </div>

      {/* MAIN CONTAINER CONTENT */}
      <div className="relative z-10 space-y-4">
        
        {/* TOP BAR / NAVIGATION & QUICK SUBJECT SELECTOR */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 text-slate-100">
          
          {/* Left: ElectroClimb Logo & Current Subject */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-yellow-300 text-xl font-bold border border-cyan-400/40 shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-moul text-sm sm:text-base bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  ElectroClimb AI ថ្នាក់ទី៦
                </h2>
                <span className="bg-indigo-900/80 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-700">
                  ប្រកួតចំណេះដឹង
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                ប្រព័ន្ធប្រកួតប្រជែងសមត្ថភាពជាមួយ AI សិប្បនិម្មិត តាមមុខវិជ្ជា
              </p>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle Button */}
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title={isSoundOn ? 'បិទសំឡេង' : 'បើកសំឡេង'}
            >
              {isSoundOn ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">សំឡេង</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span className="hidden sm:inline">បិទសំឡេង</span>
                </>
              )}
            </button>

            {/* Restart / Reset Config */}
            {gameState !== 'config' && (
              <button
                onClick={() => setGameState('config')}
                className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
                <span>រៀបចំប្រកួតថ្មី</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. CONFIGURATION MODE */}
        {gameState === 'config' && (
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl space-y-6 text-slate-100 animate-fade-in">
            
            {/* Subject Selector Tabs */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-cyan-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                ១. ជ្រើសរើសមុខវិជ្ជាប្រកួត (Select Subject)៖
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
                {SUBJECTS.map((sub) => {
                  const isSelected = selectedSubjectId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        playSound('click');
                        setSelectedSubjectId(sub.id);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-b from-indigo-950 to-slate-900 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/40'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xl">{sub.symbol === 'គ' ? '📐' : sub.symbol === 'វិ' ? '⚡' : sub.symbol === 'ខ្មែរ' ? '📚' : sub.symbol === 'ស' ? '🌏' : sub.symbol === 'សុខ' ? '🏥' : '🔤'}</span>
                      <span className="font-bold text-xs truncate max-w-full">{sub.nameKhmer.split('(')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exam Paper / Lesson Selector */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                ២. ជ្រើសរើសវិញ្ញាសា ឬមេរៀនប្រកួត៖
              </label>
              <select
                value={selectedPaperId}
                onChange={(e) => {
                  playSound('click');
                  setSelectedPaperId(e.target.value);
                }}
                className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950 text-cyan-300 font-bold text-xs sm:text-sm focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
              >
                {availablePapers.map((paper) => (
                  <option key={paper.id} value={paper.id}>
                    {paper.title} ({paper.questions.length} សំណួរ)
                  </option>
                ))}
              </select>
            </div>

            {/* AI Difficulty Selector */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-rose-300 flex items-center gap-2">
                <Bot className="w-4 h-4 text-rose-400" />
                ៣. ជ្រើសរើសកម្រិតសមត្ថភាព AI Opponent៖
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((diffKey) => {
                  const isSelected = difficulty === diffKey;
                  const cfg = AI_CONFIGS[diffKey];
                  return (
                    <button
                      key={diffKey}
                      onClick={() => {
                        playSound('click');
                        setDifficulty(diffKey);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isSelected
                          ? `${cfg.badgeClass} ring-2 ring-amber-400/40 shadow-lg`
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{cfg.name}</div>
                      <p className="text-[11px] opacity-80 leading-relaxed">
                        {diffKey === 'easy'
                          ? 'ល្បឿនឆ្លើយមធ្យម ឆ្លើយត្រូវប្រហែល ៥៥% សម្រាប់សិស្សទើបចាប់ផ្តើម។'
                          : diffKey === 'medium'
                          ? 'ល្បឿនឆ្លើយរហ័ស ឆ្លើយត្រូវប្រហែល ៧៨% តេស្តសមត្ថភាពទូទៅ។'
                          : 'ល្បឿនឆ្លើយលឿនបំផុត ឆ្លើយត្រូវ ៩២% ប្រកួតប្រជែងយ៉ាងស្វិតស្វាញ!'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timer Config */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-sky-300 flex items-center gap-2">
                <Timer className="w-4 h-4 text-sky-400" />
                ៤. កំណត់រយៈពេលប្រកួត (Time Limit)៖
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { value: '60', label: '⚡ ១ នាទី' },
                  { value: '180', label: '⏱️ ៣ នាទី' },
                  { value: '300', label: '🏆 ៥ នាទី (ស្តង់ដារ)' },
                  { value: '600', label: '⏳ ១០ នាទី' },
                  { value: 'unlimited', label: '∞ គ្មានកំណត់' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      playSound('click');
                      setTimerConfig(item.value);
                    }}
                    className={`p-3 rounded-2xl border font-bold text-xs transition-all cursor-pointer ${
                      timerConfig === item.value
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md ring-2 ring-sky-400/40'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* START BATTLE BUTTON */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleStartGame}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer active:scale-98"
              >
                <Swords className="w-6 h-6 animate-bounce" />
                <span>ចាប់ផ្តើមប្រកួត ElectroClimb AI ឥឡូវនេះ</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. ACTIVE ARENA PLAYING MODE */}
        {gameState === 'playing' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* HORIZONTAL ARENA TRACK (STUDENT VS AI TOWER CLIMB) */}
            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden space-y-4">
              
              {/* Status Header: Student vs AI */}
              <div className="flex justify-between items-center gap-2">
                
                {/* Blue Team Student */}
                <div className="flex items-center gap-2.5 sm:gap-3 bg-blue-950/80 border border-cyan-500/40 px-3 sm:px-4 py-2 rounded-2xl shadow-lg shadow-cyan-500/10">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-base font-bold shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <span>ក្រុមខៀវ (សិស្ស)</span>
                      {userStreak >= 2 && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full animate-bounce">
                          🔥 x{userStreak}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      ពិន្ទុ: <span className="font-bold text-yellow-300 font-mono text-sm">{playerScore}</span>/{totalStepsNeeded} (កម្រិត <span className="font-bold text-cyan-300">{playerLevel}</span>/5)
                    </div>
                  </div>
                </div>

                {/* Central Info Rules */}
                <div className="hidden md:flex flex-col items-center text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">ពេលនៅសល់</span>
                  <span className="text-base font-mono font-bold text-amber-300 bg-slate-950/80 px-3.5 py-1 rounded-xl border border-amber-500/40 shadow-inner">
                    <Clock className="w-4 h-4 inline mr-1 text-amber-400" />
                    {formatTime(timeLeftSeconds)}
                  </span>
                </div>

                {/* Red Team AI */}
                <div className="flex items-center gap-2.5 sm:gap-3 bg-rose-950/80 border border-rose-500/40 px-3 sm:px-4 py-2 rounded-2xl shadow-lg shadow-rose-500/10 text-right">
                  <div>
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${AI_CONFIGS[difficulty].badgeClass}`}>
                        {AI_CONFIGS[difficulty].shortName}
                      </span>
                      <span className="text-xs font-bold text-rose-300">ក្រុមក្រហម (AI)</span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      ពិន្ទុ: <span className="font-bold text-yellow-300 font-mono text-sm">{aiScore}</span>/{totalStepsNeeded} (កម្រិត <span className="font-bold text-rose-300">{aiLevel}</span>/5)
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white text-base font-bold shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Progress Track Bars */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-4 relative shadow-inner">
                
                {/* Track 1: Student Bar */}
                <div className="relative flex items-center">
                  <span className="w-12 text-xs font-bold text-cyan-400 shrink-0">សិស្ស:</span>
                  <div className="flex-1 bg-slate-900 h-6 sm:h-7 rounded-full overflow-hidden p-1 border border-cyan-900/60 relative">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 shadow-md shadow-cyan-500/30"
                      style={{ width: `${playerProgressPct}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 -ml-3 z-10"
                      style={{ left: `${playerProgressPct}%` }}
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-lg animate-bounce">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                  <Trophy className="w-6 h-6 text-yellow-400 ml-3 shrink-0" />
                </div>

                {/* Track 2: AI Bar */}
                <div className="relative flex items-center">
                  <span className="w-12 text-xs font-bold text-rose-400 shrink-0">AI:</span>
                  <div className="flex-1 bg-slate-900 h-6 sm:h-7 rounded-full overflow-hidden p-1 border border-rose-900/60 relative">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 via-pink-500 to-amber-400 rounded-full transition-all duration-500 shadow-md shadow-rose-500/30"
                      style={{ width: `${aiProgressPct}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 -ml-3 z-10"
                      style={{ left: `${aiProgressPct}%` }}
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 border-2 border-white flex items-center justify-center text-white text-xs shadow-lg animate-bounce">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                  <Trophy className="w-6 h-6 text-yellow-400 ml-3 shrink-0" />
                </div>
              </div>
            </div>

            {/* QUESTION & ANSWER CARD AREA */}
            {currentQuestion && (
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 text-slate-100 relative">
                
                {/* Question Header & AI Hint Toggle */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs bg-indigo-950 text-cyan-300 px-3 py-1 rounded-full border border-indigo-700/60 font-semibold">
                    សំណួរទី <span className="font-bold text-yellow-300 font-mono">{currentQuestionIndex + 1}</span>/10
                  </span>

                  {/* AI Hint Button */}
                  <button
                    onClick={() => {
                      playSound('click');
                      setShowAiHint(!showAiHint);
                    }}
                    className="bg-indigo-900/80 hover:bg-indigo-800 text-cyan-200 border border-indigo-600/60 text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <Wand2 className="w-4 h-4 text-amber-400 animate-spin" />
                    <span>{showAiHint ? 'បិទការបកស្រាយ' : 'ជំនួយ AI ពន្យល់'}</span>
                  </button>
                </div>

                {/* Question Text Box */}
                <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-inner relative">
                  <div className="text-[11px] font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{activePaper.title}</span>
                  </div>
                  <div className="text-base sm:text-xl font-bold leading-relaxed text-slate-100">
                    <MathFormattedText text={currentQuestion.text} />
                  </div>
                </div>

                {/* AI Hint Explanation Popup Box */}
                {showAiHint && (
                  <div className="p-4 bg-indigo-950/95 border border-indigo-400/50 rounded-2xl text-xs sm:text-sm text-indigo-100 relative shadow-xl animate-fade-in space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span>ការបកស្រាយពី AI ជំនួយ៖</span>
                    </div>
                    <div className="leading-relaxed text-slate-200">
                      <MathFormattedText text={currentQuestion.explanation} />
                    </div>
                  </div>
                )}

                {/* 4 Answer Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
                  {currentQuestion.options.map((optText, idx) => {
                    const isUserChoice = userAnswer === idx;
                    const isCorrect = idx === currentQuestion.correctAnswerIndex;

                    let btnClass =
                      'bg-slate-950/90 hover:bg-indigo-900/50 border-slate-800 text-slate-200 hover:border-cyan-400';

                    if (userAnswer !== null) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-950/95 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/20';
                      } else if (isUserChoice) {
                        btnClass = 'bg-rose-950/95 border-rose-500 text-rose-200 font-bold ring-2 ring-rose-500/50 shadow-lg shadow-rose-500/20';
                      } else {
                        btnClass = 'bg-slate-950/40 border-slate-800/60 text-slate-500';
                      }
                    }

                    const keyLabels = ['ក', 'ខ', 'គ', 'ឃ'];

                    return (
                      <button
                        key={idx}
                        disabled={userAnswer !== null}
                        onClick={() => handleUserAnswer(idx)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer shadow-md min-h-[64px] h-full ${btnClass}`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="w-8 h-8 rounded-xl bg-slate-900 text-cyan-300 font-bold text-xs flex items-center justify-center border border-slate-700 shrink-0 shadow-inner">
                            {keyLabels[idx]}
                          </span>
                          <span className="text-xs sm:text-sm font-medium leading-normal flex-1">
                            <MathFormattedText text={cleanOptionText(optText)} />
                          </span>
                        </div>

                        {userAnswer !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scale-in" />
                        )}
                        {userAnswer !== null && isUserChoice && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0 animate-scale-in" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Navigation & Report Issue Link */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="hover:text-cyan-300 underline cursor-pointer flex items-center gap-1"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>រាយការណ៍អំពីកំហុសសំណួរ</span>
                  </button>

                  <button
                    disabled={userAnswer === null}
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 transition cursor-pointer shadow-md"
                  >
                    <span>សំណួរទៅមុខ</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. GAME OVER / VICTORY MODAL */}
        {gameState === 'ended' && (
          <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl animate-fade-in text-slate-100">
            <div className="w-20 h-20 rounded-full mx-auto bg-amber-500/20 text-yellow-400 border-2 border-yellow-400 flex items-center justify-center text-4xl shadow-xl animate-bounce">
              {playerScore >= aiScore ? <Crown className="w-10 h-10 text-yellow-400" /> : <Bot className="w-10 h-10 text-rose-400" />}
            </div>

            <div>
              <h2 className="font-moul text-xl sm:text-2xl text-yellow-400 mb-1">
                {playerScore >= aiScore ? '🎉 អ្នកទទួលបានជ័យជម្នះ!' : '🤖 AI បានឈ្នះលើកនេះ!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {playerScore >= aiScore
                  ? `អបអរសាទរ! អ្នកបានយកឈ្នះ AI (${AI_CONFIGS[difficulty].shortName}) និងឡើងដល់កំពូលបង្គោលមុន!`
                  : `ក្រុម AI (${AI_CONFIGS[difficulty].shortName}) បានឡើងដល់កំពូលមុន! ព្យាយាមប្រកួតម្តងទៀត។`}
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 max-w-sm mx-auto grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl bg-slate-900 border border-cyan-500/30">
                <div className="text-xs text-slate-400 font-bold">ពិន្ទុរបស់អ្នក</div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{playerScore}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-900 border border-rose-500/30">
                <div className="text-xs text-slate-400 font-bold">ពិន្ទុ AI</div>
                <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{aiScore}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartGame}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ប្រកួតម្តងទៀត (Rematch)</span>
              </button>

              <button
                onClick={() => setGameState('config')}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer border border-slate-700"
              >
                <BookOpen className="w-4 h-4" />
                <span>ជ្រើសរើសមុខវិជ្ជាផ្សេង</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* REPORT ISSUE MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 max-w-sm w-full text-slate-100 shadow-2xl space-y-3">
            <h3 className="font-moul text-sm text-yellow-300">រាយការណ៍អំពីសំណួរ</h3>
            <p className="text-xs text-slate-400">សូមរៀបរាប់ពីបញ្ហា ឬកំហុសអក្ខរាវិរុទ្ធដែលបានជួបប្រទះ៖</p>
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              rows={3}
              placeholder="សរសេរព័ត៌មានបន្ថែម..."
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                បោះបង់
              </button>
              <button
                onClick={() => {
                  setIsReportModalOpen(false);
                  setReportText('');
                  showToast('សាររាយការណ៍ត្រូវបានផ្ញើដោយជោគជ័យ! អរគុណសម្រាប់ការចូលរួម។');
                }}
                className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-bold cursor-pointer"
              >
                ផ្ញើ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-cyan-500 text-cyan-200 text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
