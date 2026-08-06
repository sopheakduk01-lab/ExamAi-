import React, { useState, useEffect, useRef } from 'react';
import { Subject, ExamPaper, Question } from '../types';
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
  ShieldAlert,
  Flame,
  Award,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';

interface AIBattleViewProps {
  subject: Subject;
  examPapers: ExamPaper[];
  onSelectPaperForBattle?: (paper: ExamPaper) => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

export const AIBattleView: React.FC<AIBattleViewProps> = ({ subject, examPapers }) => {
  // Config state
  const [selectedPaperId, setSelectedPaperId] = useState<string>(
    examPapers.length > 0 ? examPapers[0].id : ''
  );
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [durationMinutes, setDurationMinutes] = useState<number>(5);

  // Game state
  const [gameState, setGameState] = useState<'config' | 'playing' | 'ended'>('config');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(300);

  // Scores & Streaks
  const [userScore, setUserScore] = useState<number>(0);
  const [aiScore, setAiScore] = useState<number>(0);
  const [userStreak, setUserStreak] = useState<number>(0);
  const [userCorrectCount, setUserCorrectCount] = useState<number>(0);
  const [aiCorrectCount, setAiCorrectCount] = useState<number>(0);

  // Per-question state
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [aiAnswer, setAiAnswer] = useState<number | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [aiStatusText, setAiStatusText] = useState<string>('AI កំពុងរង់ចាំ...');

  const aiTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activePaper = examPapers.find((p) => p.id === selectedPaperId) || examPapers[0];
  const questions: Question[] = activePaper ? activePaper.questions : [];
  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect during play
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeftSeconds <= 0) {
      setGameState('ended');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeftSeconds]);

  // Start game handler
  const handleStartGame = () => {
    if (!activePaper || questions.length === 0) return;
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds(durationMinutes * 60);
    setUserScore(0);
    setAiScore(0);
    setUserStreak(0);
    setUserCorrectCount(0);
    setAiCorrectCount(0);
    resetQuestionState();
    triggerAITurn(0);
  };

  const resetQuestionState = () => {
    setUserAnswer(null);
    setAiAnswer(null);
    setQuestionAnswered(false);
    setAiThinking(true);
    setAiStatusText('AI កំពុងវិភាគ និងគិតគណនា...');
  };

  // AI Logic simulation based on difficulty
  const triggerAITurn = (qIndex: number) => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

    const q = questions[qIndex];
    if (!q) return;

    setAiThinking(true);
    setAiStatusText('AI កំពុងគិតគណនា...');

    // Determine delay and accuracy based on difficulty
    let delayMs = 5000;
    let accuracyRate = 0.7;

    if (difficulty === 'easy') {
      delayMs = Math.floor(Math.random() * 4000) + 5000; // 5-9s
      accuracyRate = 0.65;
    } else if (difficulty === 'medium') {
      delayMs = Math.floor(Math.random() * 3000) + 3000; // 3-6s
      accuracyRate = 0.82;
    } else {
      delayMs = Math.floor(Math.random() * 2000) + 1500; // 1.5-3.5s
      accuracyRate = 0.95;
    }

    aiTimerRef.current = setTimeout(() => {
      // Determine AI answer
      const isCorrect = Math.random() < accuracyRate;
      let chosenIndex = q.correctAnswerIndex;

      if (!isCorrect) {
        // Pick wrong option
        const wrongIndices = q.options
          .map((_, idx) => idx)
          .filter((idx) => idx !== q.correctAnswerIndex);
        chosenIndex = wrongIndices[Math.floor(Math.random() * wrongIndices.length)] ?? 0;
      }

      setAiAnswer(chosenIndex);
      setAiThinking(false);

      if (chosenIndex === q.correctAnswerIndex) {
        setAiScore((prev) => prev + 10);
        setAiCorrectCount((prev) => prev + 1);
      }
      setAiStatusText('AI បានជ្រើសរើសចម្លើយរួចរាល់!');
    }, delayMs);
  };

  // User answer handler
  const handleUserAnswer = (optionIndex: number) => {
    if (userAnswer !== null || !currentQuestion) return;

    setUserAnswer(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      const bonusStreak = userStreak >= 2 ? 5 : 0;
      const pts = 10 + bonusStreak;
      setUserScore((prev) => prev + pts);
      setUserStreak((prev) => prev + 1);
      setUserCorrectCount((prev) => prev + 1);
    } else {
      setUserStreak(0);
    }
  };

  // Next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      resetQuestionState();
      triggerAITurn(nextIdx);
    } else {
      setGameState('ended');
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Configuration Mode */}
      {gameState === 'config' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Top Banner */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <Swords className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-moul text-slate-900 flex items-center gap-2">
                ប្រកួតស្ទង់សមត្ថភាពជាមួយ AI
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                ជ្រើសរើសវិញ្ញាសាតាមមេរៀន និងកម្រិត AI ដើម្បីប្រកួតប្រជែងពិន្ទុក្នុងពេលកំណត់!
              </p>
            </div>
          </div>

          {/* 1. Select Paper */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              ១. ជ្រើសរើសវិញ្ញាសា ឬមេរៀនប្រកួត៖
            </label>
            <select
              value={selectedPaperId}
              onChange={(e) => setSelectedPaperId(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-300 bg-slate-50 font-bold text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {examPapers.map((paper) => (
                <option key={paper.id} value={paper.id}>
                  {paper.yearOrType} - {paper.title} ({paper.questions.length} សំណួរ)
                </option>
              ))}
            </select>
          </div>

          {/* 2. AI Difficulty Level */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-amber-600" />
              ២. ជ្រើសរើសកម្រិតសមត្ថភាព AI៖
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setDifficulty('easy')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  difficulty === 'easy'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-emerald-800">🟢 កម្រិតងាយ</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                    AI កូនសិស្ស
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  ល្បឿនឆ្លើយមធ្យម ឆ្លើយត្រូវប្រហែល ៦៥% សម្រាប់សិស្សទើបចាប់ផ្តើម។
                </p>
              </button>

              <button
                onClick={() => setDifficulty('medium')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  difficulty === 'medium'
                    ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-amber-800">🟡 កម្រិតមធ្យម</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                    AI សិស្សពូកែ
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  ល្បឿនឆ្លើយរហ័ស ឆ្លើយត្រូវប្រហែល ៨២% សម្រាប់តេស្តសមត្ថភាពទូទៅ។
                </p>
              </button>

              <button
                onClick={() => setDifficulty('hard')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  difficulty === 'hard'
                    ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-rose-800">🔴 កម្រិតពិបាក</span>
                  <span className="text-[10px] bg-rose-100 text-rose-900 px-2 py-0.5 rounded-md font-bold">
                    AI គ្រូប្រឡង
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  ល្បឿនឆ្លើយលឿនបំផុត ឆ្លើយត្រូវ ៩៥% ប្រកួតប្រជែងយ៉ាងស្វិតស្វាញ!
                </p>
              </button>
            </div>
          </div>

          {/* 3. Duration */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-sky-600" />
              ៣. កំណត់រយៈពេលប្រកួត៖
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { min: 3, label: '⚡ ៣ នាទី (លឿន)' },
                { min: 5, label: '⏱️ ៥ នាទី (ស្តង់ដារ)' },
                { min: 10, label: '🏆 ១០ នាទី (ពេញលេញ)' }
              ].map((dur) => (
                <button
                  key={dur.min}
                  onClick={() => setDurationMinutes(dur.min)}
                  className={`p-3 rounded-2xl border font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    durationMinutes === dur.min
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleStartGame}
              className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Swords className="w-6 h-6" />
              <span>ចាប់ផ្តើមប្រកួតជាមួយ AI ឥឡូវនេះ</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Battle Arena */}
      {gameState === 'playing' && currentQuestion && (
        <div className="space-y-4 animate-fade-in">
          {/* Header Live Scoreboard */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-4 sm:p-6 text-white border border-slate-700 shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-4">
              {/* Student Side */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                    <span>ប្អូន (សិស្ស)</span>
                    {userStreak >= 2 && (
                      <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[10px] rounded-full font-bold animate-bounce">
                        🔥 Combo x{userStreak}
                      </span>
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                    {userScore} <span className="text-xs font-normal text-emerald-200">ពិន្ទុ</span>
                  </div>
                </div>
              </div>

              {/* Timer Pill */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  ពេលនៅសល់
                </span>
                <span className="text-base sm:text-xl font-mono font-bold text-amber-400 bg-black/40 px-3 py-1 rounded-xl border border-amber-500/30">
                  {formatTime(timeLeftSeconds)}
                </span>
              </div>

              {/* AI Side */}
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="text-xs text-amber-300 font-bold">
                    AI Opponent ({difficulty === 'easy' ? 'ងាយ' : difficulty === 'medium' ? 'មធ្យម' : 'ពិបាក'})
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                    {aiScore} <span className="text-xs font-normal text-amber-200">ពិន្ទុ</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* AI Live Status Bar */}
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <Bot className={`w-4 h-4 ${aiThinking ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
                <span>ស្ថានភាព AI៖ {aiStatusText}</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                សំណួរ {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
          </div>

          {/* Current Question Display */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              <MathFormattedText text={currentQuestion.text} />
            </h3>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isUserChoice = userAnswer === idx;
                const isCorrect = idx === currentQuestion.correctAnswerIndex;

                let borderStyle = 'border-slate-200 hover:border-emerald-400 bg-white text-slate-800';

                if (userAnswer !== null) {
                  if (isCorrect) {
                    borderStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                  } else if (isUserChoice) {
                    borderStyle = 'border-rose-600 bg-rose-50 text-rose-950 font-bold';
                  } else {
                    borderStyle = 'border-slate-200 bg-slate-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={userAnswer !== null}
                    onClick={() => handleUserAnswer(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer font-medium text-xs sm:text-sm flex items-center justify-between gap-3 ${borderStyle}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span><MathFormattedText text={option} /></span>
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      {isUserChoice && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                          ជម្រើសប្អូន
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation card after user answers */}
            {userAnswer !== null && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed space-y-1 animate-fade-in">
                <div className="font-bold text-amber-900 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ការបកស្រាយ៖
                </div>
                <p className="text-slate-700">
                  <MathFormattedText text={currentQuestion.explanation} />
                </p>
              </div>
            )}

            {/* Next Question Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                {userAnswer === null ? 'សូមជ្រើសរើសចម្លើយដើម្បីបន្ត...' : 'បានជ្រើសរើសរួចរាល់!'}
              </span>

              <button
                disabled={userAnswer === null}
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
              >
                <span>សំណួរទៅមុខ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Battle Ended Result Screen */}
      {gameState === 'ended' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-6 shadow-sm animate-fade-in">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg bg-gradient-to-br from-amber-400 to-amber-600 text-white">
            {userScore > aiScore ? '🏆' : userScore === aiScore ? '🤝' : '🤖'}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-moul text-slate-900">
              {userScore > aiScore
                ? '🎉 អបអរសាទរ! ប្អូនបានប្រកួតឈ្នះ AI!'
                : userScore === aiScore
                ? '🤝 លទ្ធផលស្មើគ្នា!'
                : '🤖 AI បានឈ្នះលើកនេះ!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              ការប្រកួតលើវិញ្ញាសា «{activePaper?.title}» ត្រូវបានបញ្ចប់។
            </p>
          </div>

          {/* Stats Comparison */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="p-3 bg-white rounded-xl border border-emerald-200">
              <div className="text-xs text-slate-500 font-bold">ពិន្ទុប្អូន (សិស្ស)</div>
              <div className="text-2xl font-mono font-bold text-emerald-600 mt-1">{userScore}</div>
              <div className="text-[11px] text-slate-500 mt-1">ឆ្លើយត្រូវ {userCorrectCount}/{questions.length}</div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-amber-200">
              <div className="text-xs text-slate-500 font-bold">ពិន្ទុ AI</div>
              <div className="text-2xl font-mono font-bold text-amber-600 mt-1">{aiScore}</div>
              <div className="text-[11px] text-slate-500 mt-1">ឆ្លើយត្រូវ {aiCorrectCount}/{questions.length}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleStartGame}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ប្រកួតឡើងវិញ (Rematch)</span>
            </button>

            <button
              onClick={() => setGameState('config')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>ជ្រើសរើសវិញ្ញាសាផ្សេង</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
