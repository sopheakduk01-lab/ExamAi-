import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Lightbulb, 
  FileText, 
  Table, 
  Lock, 
  Unlock, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  PlusSquare, 
  Copy, 
  Scale, 
  ArrowDown, 
  ArrowUp, 
  MoveHorizontal,  
  MapPin, 
  Award, 
  Trophy, 
  CheckCircle2, 
  XCircle,
  Clock,
  RotateCcw,
  Volume2,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MathLesson1Interactive: React.FC = () => {
  // Audio Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = (type: 'click' | 'correct' | 'wrong' | 'unlock') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(420, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'unlock') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {
      console.warn('Audio context is blocked or not supported:', e);
    }
  };

  // State definitions
  const [numInput, setNumInput] = useState<string>('870465250');
  const [activeTab, setActiveTab] = useState<'reading' | 'expanded' | 'compare' | 'rounding' | 'quiz'>('reading');
  const [currentTabNum, setCurrentTabNum] = useState<number>(1);
  const [unlockedTabs, setUnlockedTabs] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false
  });
  const [tabSecondsSpent, setTabSecondsSpent] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });

  // Balance Beam comparator inputs
  const [compA, setCompA] = useState<number>(3256401);
  const [compB, setCompB] = useState<number>(3257250);

  // Sorting list values
  const [orderingList, setOrderingList] = useState<number[]>([2510571, 2538505, 2530295, 263895]);

  // Rounding active value and settings
  const [roundNum, setRoundNum] = useState<string>('2782150');
  const [roundPlaceMode, setRoundPlaceMode] = useState<'million' | 'hundredk'>('million');

  // 5-Star practice state
  const [starAnswers, setStarAnswers] = useState<Record<number, boolean | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  });
  const [quizFeedback, setQuizFeedback] = useState<Record<number, { isCorrect: boolean; text: string } | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  });

  const REQUIRED_STUDY_TIME = 150; // 2 minutes 30 seconds

  // Section Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTabSecondsSpent(prev => {
        const updatedSecs = prev[currentTabNum] + 1;
        const remaining = Math.max(0, REQUIRED_STUDY_TIME - updatedSecs);

        if (remaining === 0) {
          const nextTab = currentTabNum + 1;
          if (nextTab <= 5 && !unlockedTabs[nextTab]) {
            setUnlockedTabs(tabs => ({ ...tabs, [nextTab]: true }));
            playSound('unlock');
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.2 } });
          }
        }

        return { ...prev, [currentTabNum]: updatedSecs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTabNum, unlockedTabs]);

  const activeRemainingSeconds = Math.max(0, REQUIRED_STUDY_TIME - tabSecondsSpent[currentTabNum]);

  // Formatting remaining time string
  const remainingTimeString = useMemo(() => {
    const mins = Math.floor(activeRemainingSeconds / 60);
    const secs = activeRemainingSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [activeRemainingSeconds]);

  const timerPercent = useMemo(() => {
    return Math.min(100, Math.floor(((REQUIRED_STUDY_TIME - activeRemainingSeconds) / REQUIRED_STUDY_TIME) * 100));
  }, [activeRemainingSeconds]);

  // Handle Tab switches safely
  const attemptSwitchTab = (tabName: 'reading' | 'expanded' | 'compare' | 'rounding' | 'quiz', tabNum: number) => {
    if (!unlockedTabs[tabNum]) {
      playSound('wrong');
      alert(`🔒 ផ្នែកនេះត្រូវបានចាក់សោរ! \n\nសូមសិក្សាក្នុងផ្នែកបច្ចុប្បន្នឱ្យគ្រប់ ០២:៣០ នាទីសិន។ \n(ឬអ្នកអាចចុចប៊ូតុង "ដោះសោរគ្រប់ផ្នែក" សម្រាប់ការវាយតម្លៃរហ័ស)`);
      return;
    }
    playSound('click');
    setActiveTab(tabName);
    setCurrentTabNum(tabNum);
  };

  const forceUnlockAll = () => {
    playSound('unlock');
    setUnlockedTabs({
      1: true,
      2: true,
      3: true,
      4: true,
      5: true
    });
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.2 } });
  };

  // Presets load helper
  const loadPreset = (val: string) => {
    playSound('click');
    setNumInput(val);
  };

  // Clear Input value
  const clearInput = () => {
    setNumInput('');
  };

  // Convert number to Khmer string representation
  const khDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  const khWords = ['សូន្យ', 'មួយ', 'ពីរ', 'បី', 'បួន', 'ប្រាំ', 'ប្រាំមួយ', 'ប្រាំពីរ', 'ប្រាំបី', 'ប្រាំបួន'];

  const toKhmerDigits = (valStr: string) => {
    return valStr.replace(/\d/g, d => khDigits[parseInt(d)]);
  };

  const formatSpaces = (val: number | string) => {
    const clean = val.toString().replace(/\D/g, '');
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Parse num input safely up to 12 digits
  const parsedNum = useMemo(() => {
    const rawDigits = numInput.replace(/\D/g, '');
    const sliced = rawDigits.slice(0, 12);
    return sliced === '' ? 0 : parseInt(sliced, 10);
  }, [numInput]);

  // Unified table cell calculations
  const paddedDigitsArray = useMemo(() => {
    const rawStr = parsedNum.toString();
    const padded = rawStr.padStart(12, '0');
    return padded.split('').map(Number);
  }, [parsedNum]);

  // Generates readings
  const readByDigitKhmer = useMemo(() => {
    const num = parsedNum;
    if (num === 870465250) return "ប្រាំបីរយចិតសិបលាន បួនសែនប្រាំមួយម៉ឺន ប្រាំពាន់ពីររយហាសិប";
    if (num === 3024103) return "បីលាន សូន្យសែនពីរម៉ឺន បួនពាន់មួយរយសូន្យដប់ បី";
    if (num === 6053871189) return "ប្រាំមួយពាន់លាន សូន្យរយលាន ហាសិបបីលាន ប្រាំបីសែន ប្រាំពីរម៉ឺន មួយពាន់ មួយរយ ប៉ែតសិប ប្រាំបួន";

    const s = num.toString();
    const posNames = ['រាយ', 'ដប់', 'រយ', 'ពាន់', 'ម៉ឺន', 'សែន', 'លាន', 'ដប់លាន', 'រយលាន', 'ពាន់លាន', 'ដប់ពាន់លាន', 'រយពាន់លាន'];
    let parts: string[] = [];
    for (let i = 0; i < s.length; i++) {
      let digit = parseInt(s[i], 10);
      let posIndex = s.length - 1 - i;
      if (digit !== 0 || s.length === 1) {
        parts.push(khWords[digit] + (posNames[posIndex] !== 'រាយ' ? posNames[posIndex] : ''));
      }
    }
    return parts.join(' ');
  }, [parsedNum]);

  const readByClassKhmer = useMemo(() => {
    const num = parsedNum;
    if (num === 870465250) return "ប្រាំបីរយចិតសិបលាន បួនរយហុកសិបប្រាំពាន់ ពីររយហាសិប";
    if (num === 3024103) return "បីលាន ម្ភៃបួនពាន់ មួយរយបី";
    if (num === 6053871189) return "ប្រាំមួយពាន់លាន ហាសិបបីលាន ប្រាំបីរយចិតសិបមួយពាន់ មួយរយប៉ែតសិបប្រាំបួន";

    return `${toKhmerDigits(formatSpaces(num))} (អានជាកម្រងថ្នាក់ ៖ ពាន់លាន ➔ លាន ➔ ពាន់ ➔ ឯកតា)`;
  }, [parsedNum]);

  // Expanded cards calculation
  const expandedCards = useMemo(() => {
    const str = parsedNum.toString();
    const len = str.length;
    const posNames = ['រាយ', 'ដប់', 'រយ', 'ពាន់', 'ម៉ឺន', 'សែន', 'លាន', 'ដប់លាន', 'រយលាន', 'ពាន់លាន', 'ដប់ពាន់លាន', 'រយពាន់លាន'];
    const cards = [];
    const formulaParts = [];

    for (let i = 0; i < len; i++) {
      const digit = parseInt(str[i], 10);
      const power = len - 1 - i;
      const placeVal = Math.pow(10, power);
      const total = digit * placeVal;

      if (digit > 0) {
        formulaParts.push(formatSpaces(total));
      }

      cards.push({
        digit,
        placeVal,
        total,
        placeName: posNames[power]
      });
    }

    return {
      cards,
      formula: `${formatSpaces(parsedNum)} = ${formulaParts.join(' + ') || '0'}`
    };
  }, [parsedNum]);

  const copyExpandedFormula = () => {
    playSound('click');
    navigator.clipboard.writeText(expandedCards.formula);
    alert('📋 បានចម្លងសមីការទម្រង់ពង្រាយរួចរាល់!');
  };

  // Comparator angle calc
  const comparatorAngle = useMemo(() => {
    if (compA < compB) return 7;
    if (compA > compB) return -7;
    return 0;
  }, [compA, compB]);

  const triggerSort = (type: 'asc' | 'desc') => {
    playSound('correct');
    const sorted = [...orderingList];
    if (type === 'asc') sorted.sort((a, b) => a - b);
    if (type === 'desc') sorted.sort((a, b) => b - a);
    setOrderingList(sorted);
  };

  // Rounding simulation options
  const loadRoundingCase = (num: string, mode: 'million' | 'hundredk') => {
    playSound('click');
    setRoundNum(num);
    setRoundPlaceMode(mode);
  };

  const roundingExplanation = useMemo(() => {
    if (roundPlaceMode === 'million') {
      return {
        lowerBound: "2 000 000",
        upperBound: "3 000 000",
        pointerLeftPercent: "78.2%",
        badgeText: "ខ្ទង់សែនគឺលេខ 7 (≥ 5)",
        resultText: "➔ បង្កត់ឡើងទៅ 3 000 000",
        isUp: true
      };
    } else {
      return {
        lowerBound: "5 600 000",
        upperBound: "5 700 000",
        pointerLeftPercent: "23.5%",
        badgeText: "ខ្ទង់ម៉ឺនគឺលេខ 2 (< 5)",
        resultText: "➔ បង្កត់ចុះទៅ 5 600 000",
        isUp: false
      };
    }
  }, [roundPlaceMode]);

  // Quiz submission handler
  const handleQuizAnswer = (level: number, isCorrect: boolean, choice: string) => {
    const feedbackText = isCorrect 
      ? `🎉 ត្រឹមត្រូវឥតខ្ចោះ! ប្អូនទទួលបានផ្កាយ ⭐ ${level} នៃការអនុវត្តលំហាត់!`
      : `❌ មិនទាន់ត្រឹមត្រូវទេ! សូមពិនិត្យខ្ទង់លេខឱ្យបានហ្មត់ចត់ ហើយជ្រើសរើសចម្លើយម្តងទៀត។`;

    setQuizFeedback(prev => ({
      ...prev,
      [level]: { isCorrect, text: feedbackText }
    }));

    setStarAnswers(prev => {
      const newAnswers = { ...prev, [level]: isCorrect };
      const earned = Object.values(newAnswers).filter(Boolean).length;
      if (earned === 5 && isCorrect) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
      return newAnswers;
    });

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const earnedStarsCount = Object.values(starAnswers).filter(Boolean).length;

  const tableScrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTable = (amount: number) => {
    playSound('click');
    if (tableScrollWrapperRef.current) {
      tableScrollWrapperRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col font-sans transition-all w-full">
      
      {/* 1. HERO BANNER HEADER */}
      <header className="relative bg-gradient-to-r from-violet-900 via-indigo-800 to-blue-900 text-white p-5 sm:p-6 overflow-hidden shadow-md">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 font-black rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 shrink-0">
              ៦
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-0.5 rounded-full text-xs text-amber-300 font-semibold mb-1 border border-white/10">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>កម្មវិធីរៀន និងបង្រៀនគណិតវិទ្យាទំនើប ថ្នាក់ទី៦</span>
              </div>
              <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight text-white KhmerTitle">
                គណិតវិទ្យា ថ្នាក់ទី៦ <span className="text-amber-300">|</span> មេរៀនទី១៖ ចំនួនគត់
              </h1>
            </div>
          </div>

          {/* Quick numbers preset */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15">
            <span className="text-xs text-indigo-200 font-bold px-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> គំរូ PDF:
            </span>
            <button 
              onClick={() => loadPreset('870465250')} 
              className="px-3 py-1 bg-white/15 hover:bg-amber-400 hover:text-slate-900 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
            >
              870 465 250
            </button>
            <button 
              onClick={() => loadPreset('3024103')} 
              className="px-3 py-1 bg-white/15 hover:bg-amber-400 hover:text-slate-900 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
            >
              3 024 103
            </button>
            <button 
              onClick={() => loadPreset('6053871189')} 
              className="px-3 py-1 bg-white/15 hover:bg-amber-400 hover:text-slate-900 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
            >
              6 053 871 189
            </button>
          </div>
        </div>
      </header>

      {/* 2. STUDY TIMER BAR & NAVIGATION */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        
        {/* Timer status banner */}
        <div className="bg-slate-900 text-white px-4 py-1.5 flex flex-wrap justify-between items-center text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> ពេលវេលាសិក្សាក្នុងផ្នែកនេះ (តម្រូវ ០២:៣០ នាទី) ៖
            </span>
            <span className="font-mono text-xs font-black text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
              {remainingTimeString}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-32 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-1000" style={{ width: `${timerPercent}%` }}></div>
              </div>
              <span className="text-[11px] text-slate-300">
                {activeRemainingSeconds > 0 ? 'រង់ចាំដោះសោរផ្នែកបន្ទាប់...' : '✨ ផ្នែកបន្ទាប់ត្រូវបានដោះសោរ!'}
              </span>
            </div>
            <button 
              onClick={forceUnlockAll}
              className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 font-bold text-[10px] text-white flex items-center gap-1 cursor-pointer transition shadow-sm"
              title="សម្រាប់លោកគ្រូ/អ្នកគ្រូវាយតម្លៃរហ័ស"
            >
              <Unlock className="w-2.5 h-2.5" /> ដោះសោរគ្រប់ផ្នែក (Teacher Bypass)
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto space-x-2 space-x-reverse no-scrollbar py-2">
          <button 
            onClick={() => attemptSwitchTab('reading', 1)}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'reading' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>១. តារាងបំបែកខ្ទង់ & អាន</span>
          </button>

          <button 
            onClick={() => attemptSwitchTab('expanded', 2)}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'expanded' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : unlockedTabs[2]
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-slate-400 opacity-60 cursor-not-allowed'
            }`}
          >
            {unlockedTabs[2] ? <Unlock className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-amber-500" />}
            <span>២. ទម្រង់ពង្រាយ</span>
          </button>

          <button 
            onClick={() => attemptSwitchTab('compare', 3)}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'compare' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : unlockedTabs[3]
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-slate-400 opacity-60 cursor-not-allowed'
            }`}
          >
            {unlockedTabs[3] ? <Unlock className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-amber-500" />}
            <span>៣. ប្រៀបធៀប & លំដាប់</span>
          </button>

          <button 
            onClick={() => attemptSwitchTab('rounding', 4)}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'rounding' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : unlockedTabs[4]
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-slate-400 opacity-60 cursor-not-allowed'
            }`}
          >
            {unlockedTabs[4] ? <Unlock className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-amber-500" />}
            <span>៤. ការបង្កត់ចំនួន</span>
          </button>

          <button 
            onClick={() => attemptSwitchTab('quiz', 5)}
            className={`py-2 px-3.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quiz' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : unlockedTabs[5]
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-slate-400 opacity-60 cursor-not-allowed'
            }`}
          >
            {unlockedTabs[5] ? <Unlock className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-amber-500" />}
            <span>៥. លំហាត់ ⭐១ ដល់ ⭐៥</span>
          </button>
        </div>
      </div>

      {/* 3. TABS CONTAINER BODY */}
      <main className="p-4 sm:p-6 flex-1 max-w-7xl mx-auto w-full space-y-6">

        {/* ================= TAB 1: CONNECTED PLACE VALUE TABLE ================= */}
        {activeTab === 'reading' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Input card */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-3/4 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    ✍️ បញ្ចូលចំនួនសិក្សា (រហូតដល់ ១២ ខ្ទង់)
                  </label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={numInput} 
                      onChange={(e) => setNumInput(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      maxLength={12}
                      className="w-full pl-5 pr-12 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xl sm:text-2xl tracking-widest focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-950 focus:outline-none transition-all text-center sm:text-left"
                      placeholder="ឧ. 870465250"
                    />
                    {numInput && (
                      <button 
                        onClick={clearInput} 
                        className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-1/4 self-end">
                  <button 
                    onClick={() => { playSound('click'); }} 
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>បំបែកក្នុងតារាង</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable table card */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-1.5 KhmerTitle">
                    <Table className="w-5 h-5 text-indigo-600" />
                    <span>តារាងបំបែកថ្នាក់ និងខ្ទង់ចំនួន</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">អូសទៅឆ្វេង ឬស្តាំ ដើម្បីមើលខ្ទង់ចំនួនទាំងអស់តាមថ្នាក់នីមួយៗ</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-bold px-2.5 py-1 rounded-full border border-indigo-150">
                    ↔️ អូសឆ្វេង-ស្តាំ
                  </span>
                  <button 
                    onClick={() => scrollTable(-200)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-indigo-600 dark:bg-slate-900 dark:hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center text-xs font-bold cursor-pointer border border-slate-200/50 dark:border-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => scrollTable(200)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-indigo-600 dark:bg-slate-900 dark:hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center text-xs font-bold cursor-pointer border border-slate-200/50 dark:border-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Connected Unified Table */}
              <div 
                ref={tableScrollWrapperRef}
                className="table-scroll-container overflow-x-auto rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-inner no-scrollbar"
              >
                <table className="w-full text-center border-collapse min-w-[950px] select-none text-xs">
                  <thead>
                    <tr className="text-white text-xs font-black tracking-wide">
                      <th colSpan={3} className="bg-gradient-to-r from-rose-600 to-pink-600 py-3 border-r-2 border-white dark:border-slate-800">
                        ថ្នាក់ពាន់លាន / កោដិ (Billions)
                      </th>
                      <th colSpan={3} className="bg-gradient-to-r from-purple-600 to-violet-600 py-3 border-r-2 border-white dark:border-slate-800">
                        ថ្នាក់លាន (Millions)
                      </th>
                      <th colSpan={3} className="bg-gradient-to-r from-emerald-600 to-teal-600 py-3 border-r-2 border-white dark:border-slate-800">
                        ថ្នាក់ពាន់ (Thousands)
                      </th>
                      <th colSpan={3} className="bg-gradient-to-r from-sky-500 to-blue-600 py-3">
                        ថ្នាក់ឯកតា (Units)
                      </th>
                    </tr>
                    <tr className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-rose-50/40 dark:bg-rose-950/10 text-rose-800 dark:text-rose-400">រយពាន់លាន</th>
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-rose-50/40 dark:bg-rose-950/10 text-rose-800 dark:text-rose-400">ដប់ពាន់លាន</th>
                      <th className="py-2.5 px-2 border-r-2 border-rose-300 dark:border-r-slate-800 bg-rose-100/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 font-extrabold">ពាន់លាន</th>
                      
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-purple-50/40 dark:bg-purple-950/10 text-purple-800 dark:text-purple-400">រយលាន</th>
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-purple-50/40 dark:bg-purple-950/10 text-purple-800 dark:text-purple-400">ដប់លាន</th>
                      <th className="py-2.5 px-2 border-r-2 border-purple-300 dark:border-r-slate-800 bg-purple-100/40 dark:bg-purple-950/20 text-purple-900 dark:text-purple-300 font-extrabold">លាន</th>
                      
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/10 text-emerald-800 dark:text-emerald-400">សែន</th>
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/10 text-emerald-800 dark:text-emerald-400">ម៉ឺន</th>
                      <th className="py-2.5 px-2 border-r-2 border-emerald-300 dark:border-r-slate-800 bg-emerald-100/40 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 font-extrabold">ពាន់</th>
                      
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-sky-50/40 dark:bg-sky-950/10 text-sky-800 dark:text-sky-400">រយ</th>
                      <th className="py-2.5 px-2 border-r border-slate-200 dark:border-slate-800 bg-sky-50/40 dark:bg-sky-950/10 text-sky-800 dark:text-sky-400">ដប់</th>
                      <th className="py-2.5 px-2 bg-sky-100/40 dark:bg-sky-950/20 text-sky-900 dark:text-sky-300 font-extrabold">រាយ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-sans font-black text-2xl text-slate-900 dark:text-slate-50 border-b border-slate-200 dark:border-slate-800">
                      {paddedDigitsArray.map((digit, idx) => {
                        const posFromRight = 11 - idx;
                        let cellBg = "bg-white dark:bg-slate-900";
                        let borderStyle = "border-r border-slate-200 dark:border-slate-800";

                        if (posFromRight === 9) borderStyle = "border-r-2 border-rose-300 dark:border-r-slate-800";
                        if (posFromRight === 6) borderStyle = "border-r-2 border-purple-300 dark:border-r-slate-800";
                        if (posFromRight === 3) borderStyle = "border-r-2 border-emerald-300 dark:border-r-slate-800";

                        // leading zeroes handling
                        const firstNonZero = paddedDigitsArray.findIndex(d => d > 0);
                        const isLeadingZero = idx < firstNonZero && idx < 11;

                        if (isLeadingZero) {
                          cellBg = "bg-slate-50 dark:bg-slate-950 text-slate-300 dark:text-slate-700";
                        } else {
                          if (posFromRight >= 9) cellBg = "bg-rose-50/40 dark:bg-rose-950/15 text-rose-900 dark:text-rose-400";
                          else if (posFromRight >= 6) cellBg = "bg-purple-50/40 dark:bg-purple-950/15 text-purple-900 dark:text-purple-400";
                          else if (posFromRight >= 3) cellBg = "bg-emerald-50/40 dark:bg-emerald-950/15 text-emerald-900 dark:text-emerald-400";
                          else cellBg = "bg-sky-50/40 dark:bg-sky-950/15 text-sky-900 dark:text-sky-400";
                        }

                        return (
                          <td key={idx} className={`py-4 px-2 ${borderStyle} ${cellBg} digit-pop`}>
                            {digit}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Readings layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border-l-8 border-l-amber-500 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/50">
                  វិធីទី១
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">អានតាមខ្ទង់ (Reading by Place Value)</h3>
                <div className="p-4 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/30 text-slate-800 dark:text-slate-200 font-bold text-sm leading-relaxed">
                  {readByDigitKhmer}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border-l-8 border-l-emerald-500 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200/50">
                  វិធីទី២ (និយមប្រើ)
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">អានតាមថ្នាក់ (Reading by Class)</h3>
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-200/30 text-slate-900 dark:text-emerald-300 font-extrabold text-sm leading-relaxed">
                  {readByClassKhmer}
                </div>
              </div>
            </div>

            {/* Bottom memory tip */}
            <div className="bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-amber-50/80 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-amber-950/20 p-5 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  💡
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider bg-amber-200/40 px-2 py-0.5 rounded border border-amber-300/40">
                      ពាក្យគន្លឹះចងចាំមេរៀន ៖ ចំណុចទី ១
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">អំណាន និងសំណេរចំនួន</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">«តើធ្វើដូចម្តេចដើម្បីអានចំនួនធំៗបានលឿន និងត្រឹមត្រូវ?»</h4>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5">
                    <p>• <b>អានតាមខ្ទង់ ៖</b> ហៅឈ្មោះតួលេខ + ឈ្មោះខ្ទង់គ្រប់លេខតាមលំដាប់ (ឧ. <b>៨រយលាន ៧ដប់លាន... ៤សែន</b>)។</p>
                    <p>• <b>អានតាមថ្នាក់ (និយមប្រើ) ៖</b> បែងចែកលេខជាក្រុមៗ <b>៣ ខ្ទង់</b> (រាយ, ដប់, រយ) រាប់ពីស្តាំទៅឆ្វេង រួចអានឈ្មោះថ្នាក់នៅចុងបញ្ចប់នៃក្រុមនីមួយៗ (<b>...លាន, ...ពាន់, ...ឯកតា</b>)។</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: EXPANDED FORM ================= */}
        {activeTab === 'expanded' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-1.5 KhmerTitle">
                    <PlusSquare className="w-5 h-5 text-indigo-600" />
                    <span>ទម្រង់ពង្រាយ (Expanded Form)</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">តម្លៃសរុបនៃចំនួន = ផលបូកនៃ (លេខតាមខ្ទង់ × តម្លៃខ្ទង់)</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-150 text-indigo-800 dark:text-indigo-400 px-4 py-2 rounded-2xl font-black text-base sm:text-lg">
                  {formatSpaces(parsedNum)}
                </div>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {expandedCards.cards.map((c, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-2xl border transition-all ${
                      c.digit > 0 
                        ? 'bg-white dark:bg-slate-900 border-indigo-100 dark:border-slate-800 shadow-3xs' 
                        : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-150 dark:border-slate-800/40 text-slate-400'
                    }`}
                  >
                    <div className={`text-[10px] font-bold uppercase ${c.digit > 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                      ខ្ទង់{c.placeName}
                    </div>
                    <div className="text-sm font-black my-1 text-slate-800 dark:text-slate-200">
                      {c.digit} × {formatSpaces(c.placeVal)}
                    </div>
                    <div className={`text-xs font-bold ${c.digit > 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                      = {formatSpaces(c.total)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Equation block */}
              <div className="bg-slate-950 p-4 rounded-2xl text-emerald-400 font-mono shadow-md relative">
                <div className="text-[10px] font-sans text-slate-400 mb-2.5 flex justify-between items-center">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-indigo-400" /> សមីការទម្រង់ពង្រាយពេញលេញ</span>
                  <button 
                    onClick={copyExpandedFormula}
                    className="text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors text-xs"
                  >
                    <Copy className="w-3 h-3" /> ចម្លង
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-bold leading-relaxed break-all">
                  {expandedCards.formula}
                </div>
              </div>
            </div>

            {/* Expanded Mnemonic card */}
            <div className="bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-amber-50/80 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-amber-950/20 p-5 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  💡
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider bg-amber-200/40 px-2 py-0.5 rounded border border-amber-300/40">
                      ពាក្យគន្លឹះចងចាំមេរៀន ៖ ចំណុចទី ២
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">ទម្រង់ពង្រាយ</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">«តើអ្វីជាសមីការទម្រង់ពង្រាយនៃចំនួន?»</h4>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5">
                    <p>• <b>ទម្រង់ពង្រាយ ៖</b> គឺយក <b>(តួលេខ × តម្លៃខ្ទង់)</b> នៃខ្ទង់នីមួយៗ មក <b>បូកបញ្ចូលគ្នា</b> (ឧ. <b>3024103 = 3000000 + 20000 + 4000 + 100 + 3</b>)។</p>
                    <p>• <b>ចំណាំសំខាន់ ៖</b> ខ្ទង់ណាដែលមាន <b>លេខ ០</b> យើងមិនបាច់សរសេរចូលក្នុងទម្រង់ពង្រាយក៏បាន ព្រោះតម្លៃវានៅតែស្មើ ០ ដដែល។</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: COMPARISON & ORDERING ================= */}
        {activeTab === 'compare' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Balance beam card */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-1.5 KhmerTitle">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <span>ជញ្ជីងប្រៀបធៀប ២ ចំនួន</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">ប្រៀបធៀបខ្ទង់ពីឆ្វេងទៅស្តាំ ៖ បើខ្ទង់ដើមស្មើគ្នា ត្រូវពិនិត្យខ្ទង់បន្ទាប់!</p>
              </div>

              {/* Tilting Balance Beam Display */}
              <div className="bg-gradient-to-b from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="relative w-full max-w-xl mx-auto h-40 flex flex-col items-center justify-between">
                  
                  {/* Beam structure */}
                  <div 
                    className="w-full h-2.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 rounded-full relative flex justify-between items-center shadow-md transition-all duration-700 ease-out"
                    style={{ transform: `rotate(${comparatorAngle}deg)`, transformOrigin: 'center center' }}
                  >
                    {/* Pivot pin */}
                    <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 w-5 h-5 bg-amber-400 rotate-45 rounded-sm border-2 border-slate-900"></div>

                    {/* Pan Left */}
                    <div className="absolute -left-3 top-3 flex flex-col items-center">
                      <div className="w-0.5 h-10 bg-amber-300/60"></div>
                      <div className="w-28 sm:w-36 p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center shadow-lg">
                        <div className="text-[9px] text-amber-300 font-bold">ចំនួន A</div>
                        <div className="text-xs sm:text-sm font-black text-white truncate">{formatSpaces(compA)}</div>
                      </div>
                    </div>

                    {/* Pan Right */}
                    <div className="absolute -right-3 top-3 flex flex-col items-center">
                      <div className="w-0.5 h-10 bg-amber-300/60"></div>
                      <div className="w-28 sm:w-36 p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center shadow-lg">
                        <div className="text-[9px] text-amber-300 font-bold">ចំនួន B</div>
                        <div className="text-xs sm:text-sm font-black text-white truncate">{formatSpaces(compB)}</div>
                      </div>
                    </div>

                  </div>

                  {/* Base stand */}
                  <div className="w-7 h-20 bg-slate-800 rounded-t-lg shadow-inner"></div>
                  <div className="w-24 h-3 bg-slate-800 rounded-full shadow-md"></div>
                </div>

                {/* Result bar */}
                <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  {compA < compB ? (
                    <div className="text-sm sm:text-base font-black text-amber-300">
                      {formatSpaces(compA)} &lt; {formatSpaces(compB)} (A តូចជាង B)
                    </div>
                  ) : compA > compB ? (
                    <div className="text-sm sm:text-base font-black text-amber-300">
                      {formatSpaces(compA)} &gt; {formatSpaces(compB)} (A ធំជាង B)
                    </div>
                  ) : (
                    <div className="text-sm sm:text-base font-black text-emerald-400">
                      {formatSpaces(compA)} = {formatSpaces(compB)} (ស្មើគ្នា)
                    </div>
                  )}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">ចំនួនទី១ (A):</label>
                  <input 
                    type="number" 
                    value={compA} 
                    onChange={(e) => setCompA(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl font-extrabold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">ចំនួនទី២ (B):</label>
                  <input 
                    type="number" 
                    value={compB} 
                    onChange={(e) => setCompB(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl font-extrabold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Ordering list card */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-1.5 KhmerTitle">
                  <ArrowDown className="w-5 h-5 text-indigo-600" />
                  <span>ការរៀបលំដាប់ចំនួន (ទំព័រ ៣ សៀវភៅពុម្ព)</span>
                </h2>
              </div>

              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-950 p-4 rounded-2xl">
                <div className="flex flex-wrap gap-2.5">
                  {orderingList.map((num, idx) => (
                    <div 
                      key={idx} 
                      className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-2xl font-extrabold text-slate-800 dark:text-slate-200 shadow-3xs flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-black">
                        {idx + 1}
                      </span> 
                      <span>{formatSpaces(num)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button 
                  onClick={() => triggerSort('asc')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs text-xs sm:text-sm cursor-pointer transition-colors flex items-center gap-1"
                >
                  <ArrowUp className="w-4 h-4" /> តម្រៀបពី តូច ទៅ ធំ
                </button>
                <button 
                  onClick={() => triggerSort('desc')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs text-xs sm:text-sm cursor-pointer transition-colors flex items-center gap-1"
                >
                  <ArrowDown className="w-4 h-4" /> តម្រៀបពី ធំ ទៅ តូច
                </button>
                <button 
                  onClick={() => { setOrderingList([2510571, 2538505, 2530295, 263895]); playSound('click'); }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs sm:text-sm cursor-pointer transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> កំណត់ឡើងវិញ
                </button>
              </div>
            </div>

            {/* Comparator Memory Tip */}
            <div className="bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-amber-50/80 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-amber-950/20 p-5 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  💡
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider bg-amber-200/40 px-2 py-0.5 rounded border border-amber-300/40">
                      ពាក្យគន្លឹះចងចាំមេរៀន ៖ ចំណុចទី ៣
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">ការប្រៀបធៀប និងរៀបលំដាប់</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">«តើត្រូវប្រៀបធៀប និងរៀបលំដាប់ចំនួនយ៉ាងដូចម្តេចឱ្យត្រឹមត្រូវ?»</h4>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5">
                    <p>• <b>ជំហានទី១ (រាប់ចំនួនខ្ទង់) ៖</b> ចំនួនណាដែលមាន <b>ចំនួនខ្ទង់ច្រើនជាង ➔ មានតម្លៃធំជាង!</b></p>
                    <p>• <b>ជំហានទី២ (បើចំនួនខ្ទង់ស្មើគ្នា) ៖</b> ប្រៀបធៀបតួលេខពី <b>ឆ្វេងទៅស្តាំ</b> ម្តងមួយខ្ទង់ៗ។ ខ្ទង់ដំបូងណាដែលមានលេខធំជាង ➔ ចំនួននោះធំជាង!</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: ROUNDING MACHINE ================= */}
        {activeTab === 'rounding' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-1.5 KhmerTitle">
                  <MoveHorizontal className="w-5 h-5 text-indigo-600" />
                  <span>ម៉ាស៊ីនបង្កត់ចំនួនអន្តរកម្ម</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">មើលខ្ទង់ខាងស្តាំបន្ទាប់ដើម្បីសម្រេចចិត្តបង្កត់ចុះ ឬបង្កត់ឡើង</p>
              </div>

              {/* Graphical Rounded Meter display */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl text-white shadow-xl text-center space-y-6 relative overflow-hidden">
                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest block">จำนวนที่ต้องการปัด / ចំនួនដែលត្រូវបង្កត់</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-300 leading-tight">
                    {formatSpaces(roundNum)}
                  </div>
                </div>

                {/* Meter slider view */}
                <div className="relative w-full max-w-xl mx-auto my-12 px-2">
                  <div className="w-full h-2.5 bg-slate-700 rounded-full relative">
                    
                    {/* Lower end */}
                    <div className="absolute -left-1 -top-8 text-center sm:text-left">
                      <span className="text-[9px] font-bold text-slate-400 block">បង្កត់ចុះ</span>
                      <span className="text-[11px] font-extrabold text-blue-400 tracking-wider">{roundingExplanation.lowerBound}</span>
                    </div>

                    {/* Upper end */}
                    <div className="absolute -right-1 -top-8 text-center sm:text-right">
                      <span className="text-[9px] font-bold text-slate-400 block">បង្កត់ឡើង</span>
                      <span className="text-[11px] font-extrabold text-emerald-400 tracking-wider">{roundingExplanation.upperBound}</span>
                    </div>

                    {/* Sliding Ball pointer */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-out"
                      style={{ left: roundingExplanation.pointerLeftPercent }}
                    >
                      <div className="w-6.5 h-6.5 bg-amber-400 border-2 border-white rounded-full shadow-lg flex items-center justify-center text-slate-900 text-xs font-black animate-bounce">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text analysis box */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-xl mx-auto space-y-1.5 relative z-10">
                  <div className="text-xs text-indigo-200 font-bold">
                    {roundingExplanation.badgeText}
                  </div>
                  <div className={`text-base sm:text-lg font-black ${roundingExplanation.isUp ? 'text-emerald-400' : 'text-blue-400'}`}>
                    {roundingExplanation.resultText}
                  </div>
                </div>
              </div>

              {/* Rounding interactive test buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => loadRoundingCase('2782150', 'million')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    roundNum === '2782150' && roundPlaceMode === 'million'
                      ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-500/10'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">ឧទាហរណ៍ ក. 2 782 150 (បង្កត់ត្រឹមខ្ទង់លាន)</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">លេខបន្ទាប់ 7 (≥ 5) ➔ បង្កត់ឡើងទៅ 3 000 000</div>
                </button>

                <button 
                  onClick={() => loadRoundingCase('5623501', 'hundredk')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    roundNum === '5623501' && roundPlaceMode === 'hundredk'
                      ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-500/10'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">ឧទាហរណ៍ ខ. 5 623 501 (បង្កត់ត្រឹមខ្ទង់សែន)</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">លេខបន្ទាប់ 2 (&lt; 5) ➔ បង្កត់ចុះទៅ 5 600 000</div>
                </button>
              </div>
            </div>

            {/* Golden rule rounding card */}
            <div className="bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-amber-50/80 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-amber-950/20 p-5 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  💡
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider bg-amber-200/40 px-2 py-0.5 rounded border border-amber-300/40">
                      ពាក្យគន្លឹះចងចាំមេរៀន ៖ ចំណុចទី ៤
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">ច្បាប់មាសនៃការបង្កត់ចំនួន</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">«តើពេលណាត្រូវបង្កត់ចុះ ហើយពេលណាត្រូវបង្កត់ឡើង?»</h4>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5">
                    <p>• <b>កំណត់ខ្ទង់បង្កត់ ៖</b> ពិនិត្យមើលលេខនៅ <b>ខ្ទង់ខាងស្តាំបន្ទាប់</b> ភ្លាម!</p>
                    <p>• <b>⬇️ បើជាលេខ [០, ១, ២, ៣, ៤] ➔ បង្កត់ចុះ ៖</b> រក្សាខ្ទង់បង្កត់នៅដដែល ឯខ្ទង់ខាងស្តាំទាំងអស់ប្រែជា <b>០</b>។</p>
                    <p>• <b>⬆️ បើជាលេខ [៥, ៦, ៧, ៨, ៩] ➔ បង្កត់ឡើង ៖</b> បូកបន្ថែម <b>+១</b> លើខ្ទង់បង្កត់ ឯខ្ទង់ខាងស្តាំទាំងអស់ប្រែជា <b>០</b>។</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: 5-STAR EXERCISES ================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Practice stars score banner */}
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center justify-center md:justify-start gap-1.5 KhmerTitle">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>លំហាត់អនុវត្តកម្រិតសមត្ថភាព (⭐១ ដល់ ⭐៥)</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ដកស្រង់លំហាត់ពុម្ព និងលំហាត់ពង្រឹងសមត្ថភាពតាមកម្រិតផ្កាយ</p>
              </div>

              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-5 py-2 rounded-2xl shadow-md shrink-0">
                <Trophy className="w-6 h-6 shrink-0 text-white" />
                <div>
                  <div className="text-[9px] font-bold text-amber-100 uppercase tracking-wider">ផ្កាយទទួលបានសរុប</div>
                  <div className="text-lg font-black tracking-wider">{earnedStarsCount} / 5 ⭐</div>
                </div>
              </div>
            </div>

            {/* Quiz levels stepper buttons */}
            <div className="flex overflow-x-auto space-x-2 space-x-reverse no-scrollbar pb-1">
              {[
                { id: 1, label: 'ផ្កាយ ១', title: 'អំណានខ្ទង់' },
                { id: 2, label: 'ផ្កាយ ២', title: 'ទម្រង់ពង្រាយ' },
                { id: 3, label: 'ផ្កាយ ៣', title: 'ប្រៀបធៀប-លំដាប់' },
                { id: 4, label: 'ផ្កាយ ៤', title: 'ការបង្កត់ចំនួន' },
                { id: 5, label: 'ផ្កាយ ៥', title: 'ប្រឡងកំណត់ត្រា' },
              ].map((lvl) => {
                const isSelected = currentTabNum === lvl.id;
                const isDone = starAnswers[lvl.id] === true;

                return (
                  <button
                    key={lvl.id}
                    onClick={() => attemptSwitchTab('quiz', lvl.id)}
                    className={`flex-1 min-w-[130px] p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`text-[10px] font-extrabold flex items-center justify-center gap-1 ${isSelected ? 'text-amber-300' : 'text-amber-500'}`}>
                      <span>{'⭐'.repeat(lvl.id)}</span>
                    </div>
                    <div className="text-xs font-bold mt-0.5">{lvl.title}</div>
                    {isDone && <span className="text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-1.5 py-0.2 rounded-full mt-1 inline-block">រួចរាល់ ✔</span>}
                  </button>
                );
              })}
            </div>

            {/* LEVEL 1: STAR 1 CARD */}
            {currentTabNum === 1 && (
              <div className="bg-white dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full border border-amber-300 dark:border-amber-900">
                    ⭐ ផ្កាយ ១ (កម្រិតដំបូង ៖ ការស្គាល់ខ្ទង់)
                  </span>
                  <span className="text-[11px] text-slate-400">ទំព័រ ២ សៀវភៅពុម្ព</span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                  សំណួរ ៖ ក្នុងចំនួន <span className="text-indigo-600 font-mono">80 250 346</span> តើតួលេខ <span className="font-black text-purple-700 dark:text-purple-400 text-lg sm:text-xl">5</span> ស្ថិតនៅខ្ទង់អ្វី និងមានតម្លៃស្មើប៉ុន្មាន?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => handleQuizAnswer(1, false, 'A')}
                    className="p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-sm cursor-pointer shadow-3xs"
                  >
                    ក. ខ្ទង់ពាន់ (តម្លៃ 5 000)
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(1, true, 'B')}
                    className="p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-sm cursor-pointer shadow-3xs"
                  >
                    ខ. ខ្ទង់ម៉ឺន (តម្លៃ 50 000)
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(1, false, 'C')}
                    className="p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-sm cursor-pointer shadow-3xs"
                  >
                    គ. ខ្ទង់សែន (តម្លៃ 500 000)
                  </button>
                </div>

                {quizFeedback[1] && (
                  <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-center gap-2 ${quizFeedback[1].isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border border-rose-200'}`}>
                    {quizFeedback[1].isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" /> : <XCircle className="w-5 h-5 shrink-0 text-rose-500" />}
                    <span>{quizFeedback[1].text}</span>
                  </div>
                )}
              </div>
            )}

            {/* LEVEL 2: STAR 2 CARD */}
            {currentTabNum === 2 && (
              <div className="bg-white dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full border border-amber-300 dark:border-amber-900">
                    ⭐⭐ ផ្កាយ ២ (កម្រិតបង្គួរ ៖ ទម្រង់ពង្រាយ)
                  </span>
                  <span className="text-[11px] text-slate-400">ទំព័រ ២ សៀវភៅពុម្ព</span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                  សំណួរ ៖ តើសមីការទម្រង់ពង្រាយត្រឹមត្រូវនៃចំនួន <span className="text-indigo-600">15 721 540</span> គឺមួយណា?
                </h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => handleQuizAnswer(2, false, 'A')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ក. 10 000 000 + 5 000 000 + 700 000 + 20 000 + 1 000 + 500 + 40
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(2, true, 'B')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ខ. 10 000 000 + 5 000 000 + 700 000 + 20 000 + 1 000 + 500 + 40 + 0 (ទម្រង់ពង្រាយពុម្ពពេញខ្ទង់)
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(2, false, 'C')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    គ. 1 000 000 + 500 000 + 70 000 + 2 000 + 100 + 50 + 4
                  </button>
                </div>

                {quizFeedback[2] && (
                  <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-center gap-2 ${quizFeedback[2].isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border border-rose-200'}`}>
                    {quizFeedback[2].isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" /> : <XCircle className="w-5 h-5 shrink-0 text-rose-500" />}
                    <span>{quizFeedback[2].text}</span>
                  </div>
                )}
              </div>
            )}

            {/* LEVEL 3: STAR 3 CARD */}
            {currentTabNum === 3 && (
              <div className="bg-white dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full border border-amber-300 dark:border-amber-900">
                    ⭐⭐⭐ ផ្កាយ ៣ (កម្រិតមធ្យម ៖ រៀបលំដាប់)
                  </span>
                  <span className="text-[11px] text-slate-400">ទំព័រ ៣ លំហាត់ទី២</span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                  សំណួរ ៖ ជ្រើសរើសលំដាប់ពី <span className="text-emerald-600 dark:text-emerald-400 underline font-bold">តូចទៅធំ</span> ត្រឹមត្រូវនៃចំនួន៖ <br />
                  <span className="text-indigo-600 font-mono font-bold">[3 303 003 ; 3 300 033 ; 3 033 003 ; 3 300 303]</span>
                </h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => handleQuizAnswer(3, true, 'A')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ក. 3 033 003 &lt; 3 300 033 &lt; 3 300 303 &lt; 3 303 003
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(3, false, 'B')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ខ. 3 303 003 &lt; 3 300 303 &lt; 3 300 033 &lt; 3 033 003
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(3, false, 'C')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    គ. 3 300 033 &lt; 3 033 003 &lt; 3 300 303 &lt; 3 303 003
                  </button>
                </div>

                {quizFeedback[3] && (
                  <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-center gap-2 ${quizFeedback[3].isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border border-rose-200'}`}>
                    {quizFeedback[3].isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" /> : <XCircle className="w-5 h-5 shrink-0 text-rose-500" />}
                    <span>{quizFeedback[3].text}</span>
                  </div>
                )}
              </div>
            )}

            {/* LEVEL 4: STAR 4 CARD */}
            {currentTabNum === 4 && (
              <div className="bg-white dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full border border-amber-300 dark:border-amber-900">
                    ⭐⭐⭐⭐ ផ្កាយ ៤ (កម្រិតខ្ពស់ ៖ ការបង្កត់ចំនួន)
                  </span>
                  <span className="text-[11px] text-slate-400">ទំព័រ ៤ លំហាត់ទី២ & ៣</span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                  សំណួរ ៖ ប្រជាជនកម្ពុជា <span className="text-indigo-600 font-bold">13 395 682 នាក់</span> (បង្កត់ត្រឹមខ្ទង់លាន) និងផ្ទៃក្រឡា <span className="text-indigo-600 font-bold">181 035 km²</span> (បង្កត់ត្រឹមខ្ទង់ម៉ឺន) ស្មើនឹង៖
                </h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => handleQuizAnswer(4, false, 'A')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ក. ប្រជាជន 14 000 000 នាក់ និងផ្ទៃក្រឡា 190 000 km²
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(4, true, 'B')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ខ. ប្រជាជន 13 000 000 នាក់ និងផ្ទៃក្រឡា 180 000 km²
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(4, false, 'C')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    គ. ប្រជាជន 13 400 000 នាក់ និងផ្ទៃក្រឡា 181 000 km²
                  </button>
                </div>

                {quizFeedback[4] && (
                  <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-center gap-2 ${quizFeedback[4].isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border border-rose-200'}`}>
                    {quizFeedback[4].isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" /> : <XCircle className="w-5 h-5 shrink-0 text-rose-500" />}
                    <span>{quizFeedback[4].text}</span>
                  </div>
                )}
              </div>
            )}

            {/* LEVEL 5: STAR 5 CARD */}
            {currentTabNum === 5 && (
              <div className="bg-white dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm space-y-4 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full border border-amber-300 dark:border-amber-900">
                    ⭐⭐⭐⭐⭐ ផ្កាយ ៥ (កម្រិតប្រឡងប្រជែង ៖ ចំនួន ១០ ខ្ទង់)
                  </span>
                  <span className="text-[11px] text-slate-400">ទំព័រ ១ លំហាត់ទី១.ច</span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                  សំណួរ ៖ ក្នុងចំនួន <span className="text-indigo-600 font-mono font-bold">6 053 871 189</span> តើតួលេខ <span className="text-rose-600 font-black">5</span> ស្ថិតនៅខ្ទង់អ្វី ហើយអានតាមថ្នាក់យ៉ាងដូចម្តេច?
                </h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => handleQuizAnswer(5, true, 'A')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ក. ខ្ទង់ដប់លាន (តម្លៃ 50 000 000) | អាន ៖ ប្រាំមួយពាន់លាន ហាសិបបីលាន...
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(5, false, 'B')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    ខ. ខ្ទង់លាន (តម្លៃ 5 000 000) | អាន ៖ ប្រាំមួយរយប្រាំបីលាន បីរយប្រាំពីរពាន់
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(5, false, 'C')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 text-left transition-all text-xs sm:text-sm cursor-pointer shadow-3xs"
                  >
                    គ. ខ្ទង់រយលាន (តម្លៃ 500 000 000) | អាន ៖ ប្រាំមួយពាន់លាន...
                  </button>
                </div>

                {quizFeedback[5] && (
                  <div className={`p-4 rounded-2xl text-xs font-bold leading-relaxed flex items-center gap-2 ${quizFeedback[5].isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border border-rose-200'}`}>
                    {quizFeedback[5].isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" /> : <XCircle className="w-5 h-5 shrink-0 text-rose-500" />}
                    <span>{quizFeedback[5].text}</span>
                  </div>
                )}
              </div>
            )}

            {/* Star practice memory card */}
            <div className="bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-amber-50/80 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-amber-950/20 p-5 rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  💡
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider bg-amber-200/40 px-2 py-0.5 rounded border border-amber-300/40">
                      ពាក្យគន្លឹះចងចាំមេរៀន ៖ ចំណុចទី ៥
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">យុទ្ធសាស្ត្រលំហាត់ ⭐១ ដល់ ⭐៥</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">«តើធ្វើដូចម្តេចដើម្បីដោះស្រាយលំហាត់គ្រប់កម្រិតបានពិន្ទុពេញ?»</h4>
                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5">
                    <p>• <b>⭐១ = ស្គាល់ខ្ទង់</b> | <b>⭐⭐២ = បំបែកទម្រង់ពង្រាយ</b> | <b>⭐⭐⭐៣ = ប្រៀបធៀប & រៀបលំដាប់</b> | <b>⭐⭐⭐⭐៤ = បង្កត់ចំនួន</b> | <b>⭐⭐⭐⭐⭐៥ = លំហាត់ស្មុគស្មាញ!</b></p>
                    <p>• <b>តិចនិក ៖</b> ផ្ទៀងផ្ទាត់លេខតាមខ្ទង់នីមួយៗឱ្យបានច្បាស់លាស់ មុននឹងសម្រេចចិត្តជ្រើសរើសចម្លើយ។</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">កម្មវិធីជំនួយការបង្រៀនគណិតវិទ្យា ថ្នាក់ទី៦</span> — ប្រព័ន្ធសិក្សាអន្តរកម្មឌីជីថល
          </div>
          <div className="text-slate-400">
            ប្រព័ន្ធរៀបចំពេលវេលាសិក្សា ២:៣០ នាទី & ពាក្យគន្លឹះចងចាំផ្នែកខាងក្រោម 💡
          </div>
        </div>
      </footer>

    </div>
  );
};
