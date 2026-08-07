import React, { useState, useEffect, useRef } from 'react';
import { getSafeAudioContext } from '../utils/audioSynthesizer';
import {
  X,
  Volume2,
  VolumeX,
  Trophy,
  Swords,
  User,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';
import { SubjectId } from '../types';
import { EXAM_PAPERS } from '../data/grade6Data';
import { sanitizeOptionText } from '../utils/questionSanitizer';

interface FishingGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubjectId?: SubjectId;
}

// មុខវិជ្ជាសម្រាប់ជ្រើសរើសក្នុងហ្គេមស្ទូចត្រី
export const FISHING_SUBJECTS = [
  { id: 'all', nameKhmer: 'វិញ្ញាសាចម្រុះថ្នាក់ទី៦', icon: '🌟', color: 'from-amber-500 to-orange-600' },
  { id: 'math', nameKhmer: 'គណិតវិទ្យា', icon: '📐', color: 'from-blue-500 to-indigo-600' },
  { id: 'khmer', nameKhmer: 'ភាសាខ្មែរ', icon: '📜', color: 'from-emerald-500 to-teal-600' },
  { id: 'science', nameKhmer: 'វិទ្យាសាស្ត្រ', icon: '🔬', color: 'from-purple-500 to-violet-600' },
  { id: 'social', nameKhmer: 'សិក្សាសង្គម', icon: '🗺️', color: 'from-rose-500 to-pink-600' },
  { id: 'health', nameKhmer: 'អប់រំសុខភាព', icon: '🏥', color: 'from-teal-500 to-emerald-600' },
  { id: 'english', nameKhmer: 'ភាសាអង់គ្លេស', icon: '🔤', color: 'from-sky-500 to-cyan-600' }
];

// ធនាគារសំណួរតាមមុខវិជ្ជាសម្រាប់ថ្នាក់ទី៦
const SUBJECT_QUESTIONS: Record<string, Array<{ q: string; options: string[]; answer: number; exp: string }>> = {
  math: [
    {
      q: "តើ 25 × 4 - 20 ស្មើនឹងប៉ុន្មាន?",
      options: ["70", "80", "90", "100"],
      answer: 1,
      exp: "25 × 4 = 100 ហើយ 100 - 20 = 80។"
    },
    {
      q: "តើ 144 ចែកនឹង 12 ស្មើនឹងប៉ុន្មាន?",
      options: ["10", "11", "12", "14"],
      answer: 2,
      exp: "144 ÷ 12 = 12។"
    },
    {
      q: "តើភាគរយ 25% នៃ 200 ស្មើនឹងប៉ុន្មាន?",
      options: ["25", "40", "50", "75"],
      answer: 2,
      exp: "200 × (25 / 100) = 50។"
    },
    {
      q: "ក្រឡាផ្ទៃចតុកោណកែងដែលមានបណ្ដោយ 8m និងទទឹង 5m ស្មើនឹង៖",
      options: ["13 m²", "26 m²", "40 m²", "85 m²"],
      answer: 2,
      exp: "ក្រឡាផ្ទៃចតុកោណកែង = បណ្ដោយ × ទទឹង = 8m × 5m = 40 m²។"
    },
    {
      q: "ប្រភាគ 3/4 ស្មើនឹងចំនួនទសភាគណា?",
      options: ["0.34", "0.50", "0.75", "0.80"],
      answer: 2,
      exp: "3 ÷ 4 = 0.75។"
    },
    {
      q: "តើមុំកែងមានរង្វាស់ប៉ុន្មានដឺក្រេ?",
      options: ["45°", "90°", "180°", "360°"],
      answer: 1,
      exp: "មុំកែងជាមុំដែលមានរង្វាស់ស្មើនឹង 90 ដឺក្រេ (90°)។"
    },
    {
      q: "បរិមាត្រការ៉េដែលមានជ្រុង 6cm ស្មើនឹង៖",
      options: ["12 cm", "18 cm", "24 cm", "36 cm"],
      answer: 2,
      exp: "បរិមាត្រការ៉េ = ជ្រុង × 4 = 6cm × 4 = 24cm។"
    },
    {
      q: "តើ 1/2 + 1/4 ស្មើនឹងប្រភាគណា?",
      options: ["2/6", "3/4", "2/4", "1/8"],
      answer: 1,
      exp: "1/2 = 2/4, ដូច្នេះ 2/4 + 1/4 = 3/4។"
    }
  ],
  khmer: [
    {
      q: "តើផ្កាអ្វីជាផ្កាតំណាងជាតិរបស់ប្រទេសកម្ពុជា?",
      options: ["ផ្កាឈូក", "ផ្កាចំប៉ា", "ផ្ការំដួល", "ផ្ការំយោល"],
      answer: 2,
      exp: "ផ្ការំដួលត្រូវបានប្រកាសជាផ្កាតំណាងជាតិកម្ពុជាដោយព្រះរាជក្រឹត្យក្នុងឆ្នាំ ២០០៥។"
    },
    {
      q: "តើពាក្យ «កត្តញ្ញូ» មានន័យដូចម្ដេច?",
      options: ["ការដឹងគុណអ្នកមានគុណ", "ការធ្វើការងារលឿន", "ការរៀនសូត្រពូកែ", "ការនិយាយភាសាបរទេស"],
      answer: 0,
      exp: "កត្តញ្ញូ មានន័យថា ការដឹងគុណ និងចងចាំគុណបំណាច់របស់អ្នកមានគុណដូចជា ឪពុកម្តាយ និងគ្រូបង្រៀន។"
    },
    {
      q: "តើនាមអរូបជាអ្វី?",
      options: ["នាមមើលឃើញនឹងភ្នែក", "នាមអត់មានរូបរាងច្បាស់លាស់ (គុណធម៌ គំនិត...)", "ឈ្មោះសត្វ", "ឈ្មោះទីក្រុង"],
      answer: 1,
      exp: "នាមអរូប ជានាមបញ្ជាក់ពីគំនិត អារម្មណ៍ ឬគុណធម៌ ដែលមិនអាចស្ទាប ឬមើលឃើញដោយភ្នែកទទេ។"
    },
    {
      q: "តើសត្វណាជាសត្វតំណាងជាតិកម្ពុជា?",
      options: ["សត្វដំរី", "សត្វខ្លា", "សត្វកូប៉្រៃ", "សត្វអណ្ដើកលហុង"],
      answer: 2,
      exp: "សត្វកូប៉្រៃ (Kouprey) ត្រូវបានកំណត់ជាសត្វតំណាងជាតិកម្ពុជា។"
    },
    {
      q: "តើកម្រងកំណាព្យ «រឿងរាមកេរ្តិ៍» ជារឿងបែបណា?",
      options: ["រឿងនិទានប្រជាប្រិយ", "រឿងអក្សរសិល្ប៍បុរាណឥណ្ឌូ-ខ្មែរ", "រឿងកំប្លែង", "រឿងវិទ្យាសាស្ត្រ"],
      answer: 1,
      exp: "រាមកេរ្តិ៍ជារឿងអក្សរសិល្ប៍បុរាណដ៏ល្បីល្បាញដែលមានចារិកលើជញ្ជាំងថែវអង្គរវត្ត។"
    },
    {
      q: "តើពាក្យផ្ទុយនៃពាក្យ «ស្មោះត្រង់» គឺអ្វី?",
      options: ["វៃឆ្លាត", "ក្បត់ / វៀចវេរ", "ស្លូតបូត", "អត់ធ្មត់"],
      answer: 1,
      exp: "ពាក្យផ្ទុយនៃ «ស្មោះត្រង់» គឺ «ក្បត់» ឬ «វៀចវេរ»។"
    }
  ],
  science: [
    {
      q: "តើភពណាដែលនៅជិតព្រះអាទិត្យជាងគេបង្អស់?",
      options: ["ភពសុក្រ (Venus)", "ភពផែនដី (Earth)", "ភពពុធ (Mercury)", "ភពអង្គារ (Mars)"],
      answer: 2,
      exp: "ភពពុធ (Mercury) ជាភពដែលនៅជិតព្រះអាទិត្យជាងគេបង្អស់ក្នុងប្រព័ន្ធព្រះអាទិត្យ។"
    },
    {
      q: "តើសរីរាង្គណាដែលធ្វើនាទីបូមឈាមទៅកាន់រាងកាយទាំងមូល?",
      options: ["សួត", "បេះដូង", "ថ្លើម", "ក្រពះ"],
      answer: 1,
      exp: "បេះដូងជាសរីរាង្គដ៏សំខាន់ធ្វើនាទីបូមឈាមពាសពេញរាងកាយ។"
    },
    {
      q: "តើឧស្ម័នអ្វីដែលរុក្ខជាតិស្រូបយកសម្រាប់ធ្វើរស្មីសំយោគ?",
      options: ["អុកស៊ីសែន (O2)", "កាបូនឌីអុកស៊ីត (CO2)", "អាសូត (N2)", "អ៊ីដ្រូសែន (H2)"],
      answer: 1,
      exp: "រុក្ខជាតិស្រូបយករស្មីព្រះអាទិត្យ និងឧស្ម័នកាបូនឌីអុកស៊ីត (CO2) ដើម្បីផលិតចំណីអាហារ។"
    },
    {
      q: "តើទឹកកកប្រែជាទឹករាវតាមរយៈដំណើរការអ្វី?",
      options: ["ការរំហួត", "ការកក", "ការរលាយ", "ការកំណាត់"],
      answer: 2,
      exp: "ការរលាយ (Melting) ជាដំណើរការដែលធាតុរឹង (ទឹកកក) ប្រែជារាវនៅពេលរងកម្ដៅ។"
    },
    {
      q: "តើវីតាមីន C មានច្រើនក្នុងផ្លែឈើណា?",
      options: ["ផ្លែក្រូច និងប៉េងប៉ោះ", "អង្ករ និងស្រូវសាឡី", "សាច់ជ្រូក", "ប្រេងសណ្ដែក"],
      answer: 0,
      exp: "ផ្លែក្រូច ក្រូចឆ្មារ និងប៉េងប៉ោះ សំបូរទៅដោយវីតាមីន C ជួយពង្រឹងប្រព័ន្ធការពាររាងកាយ។"
    }
  ],
  social: [
    {
      q: "តើទន្លេណាដែលវែងជាងគេបង្អស់ក្នុងប្រទេសកម្ពុជា?",
      options: ["ទន្លេមេគង្គ", "ទន្លេសាប", "ទន្លេបាសាក់", "ទន្លេសេកុង"],
      answer: 0,
      exp: "ទន្លេមេគង្គជាទន្លេវែងជាងគេក្នុងប្រទេសកម្ពុជា មានប្រវែងសរុបប្រមាណ ៤,៩០៩ គីឡូម៉ែត្រ។"
    },
    {
      q: "តើប្រាសាទអង្គរវត្តត្រូវបានកសាងឡើងក្នុងរជ្ជកាលព្រះមហាក្សត្រអង្គណា?",
      options: ["ព្រះបាទជ័យវរ្ម័នទី ៧", "ព្រះបាទសូរ្យវរ្ម័នទី ២", "ព្រះបាទឥន្ទ្រវរ្ម័នទី ១", "ព្រះបាទយសោវរ្ម័នទី ១"],
      answer: 1,
      exp: "ប្រាសាទអង្គរវត្តត្រូវបានកសាងឡើងក្នុងរជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី ២ នៅដើមសតវត្សរ៍ទី ១២។"
    },
    {
      q: "តើថ្ងៃណាជាទិវាបុណ្យឯករាជ្យជាតិកម្ពុជា?",
      options: ["៧ មករា", "៩ វិច្ឆិកា", "១ មេសា", "១៤ តុលា"],
      answer: 1,
      exp: "ប្រទេសកម្ពុជាទទួលបានឯករាជ្យបរិបូរណ៍ពីបារាំងនៅថ្ងៃទី ៩ ខែវិច្ឆិកា ឆ្នាំ ១៩៥៣។"
    },
    {
      q: "តើខេត្តណាដែលមានផ្ទៃដីធំជាងគេក្នុងប្រទេសកម្ពុជា?",
      options: ["ខេត្តសៀមរាប", "ខេត្តបាត់ដំបង", "ខេត្តរតនគិរី", "ខេត្តមណ្ឌលគិរី"],
      answer: 3,
      exp: "ខេត្តមណ្ឌលគិរីជាខេត្តដែលមានផ្ទៃដីធំជាងគេបង្អស់ក្នុងប្រទេសកម្ពុជា (ប្រមាណ ១៤,២៨៨ គម²)។"
    }
  ],
  english: [
    {
      q: "What is the past tense of the verb 'GO'?",
      options: ["Goed", "Gone", "Went", "Going"],
      answer: 2,
      exp: "The past tense of the irregular verb 'go' is 'went'."
    },
    {
      q: "Choose the correct preposition: 'The book is ___ the table.'",
      options: ["in", "on", "under", "between"],
      answer: 1,
      exp: "We use 'on' when something is resting on the surface of a table."
    },
    {
      q: "Which word is an adjective?",
      options: ["Quickly", "Beautiful", "Run", "Happiness"],
      answer: 1,
      exp: "'Beautiful' is an adjective used to describe a noun."
    },
    {
      q: "What is the plural form of 'Child'?",
      options: ["Childs", "Children", "Childrens", "Childes"],
      answer: 1,
      exp: "The plural of 'child' is 'children'."
    }
  ]
};

const ALL_QUESTIONS = [
  ...SUBJECT_QUESTIONS.math,
  ...SUBJECT_QUESTIONS.khmer,
  ...SUBJECT_QUESTIONS.science,
  ...SUBJECT_QUESTIONS.social,
  ...SUBJECT_QUESTIONS.english
];

// មុខងារទាញយកសំណួរផ្ទាល់ពីវិញ្ញាសាប្រឡងក្នុងកម្មវិធី
function getExamQuestionsForSubject(subjectId: string): Array<{ q: string; options: string[]; answer: number; exp: string }> {
  const extractedQuestions: Array<{ q: string; options: string[]; answer: number; exp: string }> = [];

  EXAM_PAPERS.forEach((paper) => {
    if (subjectId === 'all' || paper.subjectId === subjectId) {
      paper.questions.forEach((q) => {
        if (q.options && q.options.length >= 2 && typeof q.correctAnswerIndex === 'number' && q.correctAnswerIndex >= 0) {
          extractedQuestions.push({
            q: q.text,
            options: q.options.map(sanitizeOptionText),
            answer: q.correctAnswerIndex,
            exp: q.explanation || 'សូមរំលឹកឡើងវិញនូវមេរៀនសង្ខេបដើម្បីស្វែងយល់បន្ថែម!'
          });
        }
      });
    }
  });

  const baseList = extractedQuestions.length > 0 ? extractedQuestions : (SUBJECT_QUESTIONS[subjectId] || ALL_QUESTIONS);

  return baseList.map(item => ({
    ...item,
    options: item.options.map(sanitizeOptionText)
  }));
}

export const FishingGameModal: React.FC<FishingGameModalProps> = ({
  isOpen,
  onClose,
  initialSubjectId = 'math'
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubjectId);
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [gameMode, setGameMode] = useState<'vs_ai' | 'solo'>('vs_ai');
  const [isMuted, setIsMuted] = useState(false);

  // Game States
  const [gameRunning, setGameRunning] = useState(false);
  const [gameTime, setGameTime] = useState(120);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  // Quiz Overlay States
  const [currentQuiz, setCurrentQuiz] = useState<{
    q: string;
    options: string[];
    answer: number;
    exp: string;
    fishName: string;
    fishPoints: number;
    fishType: string;
  } | null>(null);
  const [quizTimeLeft, setQuizTimeLeft] = useState(10);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // End Game State
  const [showGameOver, setShowGameOver] = useState(false);

  // Canvas Refs & Objects
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const quizTimerRef = useRef<any>(null);

  // Mutable Game State Refs to prevent closure stale state bugs
  const playerBoatRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    hookX: number;
    hookY: number;
    targetY: number;
    state: 'IDLE' | 'DROPPING' | 'HOOKED' | 'REELING';
    speed: number;
    caughtFish: any;
  }>({
    x: 220,
    y: 105,
    width: 140,
    height: 35,
    hookX: 280,
    hookY: 120,
    targetY: 120,
    state: 'IDLE',
    speed: 4.5,
    caughtFish: null
  });

  const aiBoatRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    hookX: number;
    hookY: number;
    targetY: number;
    state: 'IDLE' | 'DROPPING' | 'THINKING' | 'REELING';
    speed: number;
    caughtFish: any;
    thinkTimer: number;
    thoughtText: string;
  }>({
    x: 780,
    y: 105,
    width: 140,
    height: 35,
    hookX: 720,
    hookY: 120,
    targetY: 120,
    state: 'IDLE',
    speed: 3.8,
    caughtFish: null,
    thinkTimer: 0,
    thoughtText: ''
  });

  const fishesRef = useRef<any[]>([]);
  const particlesRef = useRef<any[]>([]);
  const floatingTextsRef = useRef<any[]>([]);
  const magnetTimerRef = useRef<number>(0);

  // Audio Synthesizer
  const playAudio = (type: 'drop' | 'hook' | 'correct' | 'wrong' | 'splash') => {
    if (isMuted) return;
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'drop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'hook') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.15);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'correct') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.15, now + idx * 0.07);
          gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.07 + 0.2);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.2);
        });
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addFloatingText = (x: number, y: number, text: string, color: string) => {
    floatingTextsRef.current.push({ x, y, text, color, opacity: 1.0 });
  };

  const createParticles = (x: number, y: number, color: string, count = 10) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        radius: 2 + Math.random() * 3,
        color,
        life: 30 + Math.random() * 20
      });
    }
  };

  const triggerHookDrop = (targetYPos: number) => {
    if (playerBoatRef.current.state !== 'IDLE' || !gameRunning) return;
    const WATER_LEVEL = 120;
    const SEABED_LEVEL = 525;
    playerBoatRef.current.targetY = Math.min(Math.max(targetYPos, WATER_LEVEL + 35), SEABED_LEVEL - 10);
    playerBoatRef.current.state = 'DROPPING';
    playAudio('drop');
    createParticles(playerBoatRef.current.hookX, WATER_LEVEL, '#38bdf8', 8);
  };

  // Main Canvas Render Loop
  useEffect(() => {
    if (!isOpen || !gameRunning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CANVAS_WIDTH = 1000;
    const CANVAS_HEIGHT = 560;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const WATER_LEVEL = 120;
    const SEABED_LEVEL = CANVAS_HEIGHT - 35;

    // Reset boats
    playerBoatRef.current = {
      x: 220,
      y: WATER_LEVEL - 15,
      width: 140,
      height: 35,
      hookX: 280,
      hookY: WATER_LEVEL,
      targetY: WATER_LEVEL,
      state: 'IDLE',
      speed: 4.5,
      caughtFish: null
    };

    aiBoatRef.current = {
      x: 780,
      y: WATER_LEVEL - 15,
      width: 140,
      height: 35,
      hookX: 720,
      hookY: WATER_LEVEL,
      targetY: WATER_LEVEL,
      state: 'IDLE',
      speed: aiDifficulty === 'easy' ? 2.8 : aiDifficulty === 'medium' ? 4.0 : 5.5,
      caughtFish: null,
      thinkTimer: 0,
      thoughtText: ''
    };

    fishesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    magnetTimerRef.current = 0;

    let bubbles: any[] = [];
    for (let i = 0; i < 20; i++) {
      bubbles.push({
        x: Math.random() * CANVAS_WIDTH,
        y: WATER_LEVEL + Math.random() * (CANVAS_HEIGHT - WATER_LEVEL),
        radius: 1 + Math.random() * 3.5,
        speed: 0.3 + Math.random() * 0.8
      });
    }

    const ITEM_TYPES = [
      { type: 'small', name: 'ត្រីតូច', points: 10, speed: 2.2, size: 18, color: '#38bdf8', rarity: 0.35 },
      { type: 'medium', name: 'ត្រីមធ្យម', points: 20, speed: 1.8, size: 26, color: '#fb923c', rarity: 0.30 },
      { type: 'gold', name: 'ត្រីមាស', points: 50, speed: 3.2, size: 22, color: '#facc15', rarity: 0.15 },
      { type: 'big', name: 'ត្រីយក្ស', points: 100, speed: 1.2, size: 38, color: '#a855f7', rarity: 0.10 },
      { type: 'chest', name: 'ប្រអប់កំណប់', points: 150, speed: 0.6, size: 24, color: '#eab308', rarity: 0.05 },
      { type: 'magnet', name: 'មេដែក', points: 30, speed: 1.5, size: 20, color: '#ef4444', rarity: 0.05 }
    ];

    const spawnFish = () => {
      if (fishesRef.current.length >= 6) return;
      const rand = Math.random();
      let cum = 0;
      let selectedType = ITEM_TYPES[0];
      for (let t of ITEM_TYPES) {
        cum += t.rarity;
        if (rand <= cum) {
          selectedType = t;
          break;
        }
      }

      const direction = Math.random() < 0.5 ? 1 : -1;
      const spawnX = direction === 1 ? -40 : CANVAS_WIDTH + 40;
      const spawnY = WATER_LEVEL + 40 + Math.random() * (SEABED_LEVEL - WATER_LEVEL - 80);

      fishesRef.current.push({
        id: Math.random(),
        x: spawnX,
        y: spawnY,
        baseY: spawnY,
        direction,
        speed: (selectedType.speed + Math.random() * 0.4) * direction,
        type: selectedType.type,
        name: selectedType.name,
        points: selectedType.points,
        size: selectedType.size,
        color: selectedType.color,
        sinOffset: Math.random() * Math.PI * 2,
        state: 'SWIMMING'
      });
    };

    for (let i = 0; i < 5; i++) spawnFish();

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const scaleY = CANVAS_HEIGHT / rect.height;
      const clickY = (clientY - rect.top) * scaleY;
      triggerHookDrop(clickY);
    };

    canvas.addEventListener('click', handlePointerDown);
    canvas.addEventListener('touchstart', handlePointerDown, { passive: false });

    let timeCount = 0;

    const render = () => {
      timeCount += 0.04;

      // Sky
      const skyGradient = ctx.createLinearGradient(0, 0, 0, WATER_LEVEL);
      skyGradient.addColorStop(0, '#020617');
      skyGradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH, WATER_LEVEL);

      // Sun
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH / 2, 45, 26, 0, Math.PI * 2);
      ctx.fill();

      // Underwater
      const seaGradient = ctx.createLinearGradient(0, WATER_LEVEL, 0, CANVAS_HEIGHT);
      seaGradient.addColorStop(0, '#0284c7');
      seaGradient.addColorStop(0.5, '#0369a1');
      seaGradient.addColorStop(1, '#082f49');
      ctx.fillStyle = seaGradient;
      ctx.fillRect(0, WATER_LEVEL, CANVAS_WIDTH, CANVAS_HEIGHT - WATER_LEVEL);

      // Waves
      ctx.fillStyle = '#38bdf8';
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(0, WATER_LEVEL);
      for (let x = 0; x <= CANVAS_WIDTH; x += 15) {
        const y = WATER_LEVEL + Math.sin(timeCount * 2.5 + x * 0.02) * 5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(CANVAS_WIDTH, WATER_LEVEL - 10);
      ctx.lineTo(0, WATER_LEVEL - 10);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Seabed & Corals
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, SEABED_LEVEL, CANVAS_WIDTH, CANVAS_HEIGHT - SEABED_LEVEL);

      for (let x = 40; x < CANVAS_WIDTH; x += 100) {
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, SEABED_LEVEL);
        const sway = Math.sin(timeCount + x) * 14;
        ctx.quadraticCurveTo(x + sway, SEABED_LEVEL - 30, x + sway / 2, SEABED_LEVEL - 60);
        ctx.stroke();
      }

      // Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speed;
        if (b.y < WATER_LEVEL) b.y = SEABED_LEVEL;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x + Math.sin(b.y * 0.04) * 4, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Magnet effect
      if (magnetTimerRef.current > 0) {
        magnetTimerRef.current--;
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(playerBoatRef.current.hookX, playerBoatRef.current.hookY, 130, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (Math.random() < 0.035) spawnFish();

      // Fishes
      fishesRef.current.forEach((fish) => {
        if (fish.state === 'SWIMMING') {
          // If magnet is active, pull fish towards player hook
          if (magnetTimerRef.current > 0 && playerBoatRef.current.state === 'DROPPING') {
            const dx = playerBoatRef.current.hookX - fish.x;
            const dy = playerBoatRef.current.hookY - fish.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              fish.x += (dx / dist) * 2.5;
              fish.y += (dy / dist) * 2.5;
            }
          } else {
            fish.x += fish.speed;
            fish.y = fish.baseY + Math.sin(timeCount * 2 + fish.sinOffset) * 8;
          }

          if (fish.direction === 1 && fish.x > CANVAS_WIDTH + 40) fish.x = -40;
          else if (fish.direction === -1 && fish.x < -40) fish.x = CANVAS_WIDTH + 40;
        }

        ctx.save();
        ctx.translate(fish.x, fish.y);
        if (fish.direction === -1) ctx.scale(-1, 1);

        if (fish.type === 'chest') {
          ctx.fillStyle = '#eab308';
          ctx.fillRect(-15, -12, 30, 24);
          ctx.strokeStyle = '#78350f';
          ctx.lineWidth = 2;
          ctx.strokeRect(-15, -12, 30, 24);
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (fish.type === 'magnet') {
          ctx.fillStyle = '#ef4444';
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText('🧲', -10, 8);
        } else {
          const tailWiggle = Math.sin(timeCount * 9) * 6;
          ctx.fillStyle = fish.color;
          ctx.beginPath();
          ctx.moveTo(-fish.size, 0);
          ctx.lineTo(-fish.size - 12, -8 + tailWiggle);
          ctx.lineTo(-fish.size - 12, 8 + tailWiggle);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(0, 0, fish.size, fish.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(fish.size * 0.4, -fish.size * 0.2, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(fish.size * 0.4 + 1, -fish.size * 0.2, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // Update Player Hook
      const pBoat = playerBoatRef.current;
      if (pBoat.state === 'DROPPING') {
        pBoat.hookY += pBoat.speed;

        fishesRef.current.forEach((fish) => {
          if (fish.state === 'SWIMMING' && pBoat.state === 'DROPPING') {
            const dist = Math.hypot(pBoat.hookX - fish.x, pBoat.hookY - fish.y);
            if (dist < fish.size + 12) {
              pBoat.state = 'HOOKED';
              pBoat.caughtFish = fish;
              fish.state = 'HOOKED';
              playAudio('hook');
              triggerQuestionForPlayer(fish);
            }
          }
        });

        if (pBoat.hookY >= pBoat.targetY || pBoat.hookY >= SEABED_LEVEL - 10) {
          if (pBoat.state !== 'HOOKED') pBoat.state = 'REELING';
        }
      } else if (pBoat.state === 'REELING') {
        pBoat.hookY -= pBoat.speed * 1.6;
        if (pBoat.caughtFish) {
          pBoat.caughtFish.x = pBoat.hookX;
          pBoat.caughtFish.y = pBoat.hookY + 10;
        }
        if (pBoat.hookY <= WATER_LEVEL) {
          pBoat.hookY = WATER_LEVEL;
          pBoat.state = 'IDLE';
          pBoat.caughtFish = null;
        }
      }

      // Update AI Hook
      if (gameMode === 'vs_ai') {
        const aBoat = aiBoatRef.current;
        if (aBoat.state === 'IDLE') {
          const targetables = fishesRef.current.filter((f) => f.state === 'SWIMMING' && f.x > CANVAS_WIDTH * 0.3);
          if (targetables.length > 0) {
            targetables.sort((a, b) => b.points - a.points);
            const target = targetables[0];
            aBoat.targetY = target.y + 10;
            aBoat.state = 'DROPPING';
            playAudio('drop');
          }
        } else if (aBoat.state === 'DROPPING') {
          aBoat.hookY += aBoat.speed;
          fishesRef.current.forEach((fish) => {
            if (fish.state === 'SWIMMING' && aBoat.state === 'DROPPING') {
              const dist = Math.hypot(aBoat.hookX - fish.x, aBoat.hookY - fish.y);
              if (dist < fish.size + 12) {
                aBoat.state = 'THINKING';
                aBoat.caughtFish = fish;
                fish.state = 'HOOKED';
                aBoat.thinkTimer = Math.floor(40 + Math.random() * 30);
                aBoat.thoughtText = 'AI កំពុងគិត... 🤔';
                playAudio('hook');
              }
            }
          });

          if (aBoat.hookY >= aBoat.targetY || aBoat.hookY >= SEABED_LEVEL - 10) {
            if (aBoat.state !== 'THINKING' && aBoat.state !== 'HOOKED') aBoat.state = 'REELING';
          }
        } else if (aBoat.state === 'THINKING') {
          aBoat.thinkTimer--;
          if (aBoat.thinkTimer <= 0) {
            const accThreshold = aiDifficulty === 'easy' ? 0.5 : aiDifficulty === 'medium' ? 0.75 : 0.92;
            const isCorrect = Math.random() < accThreshold;

            if (isCorrect && aBoat.caughtFish) {
              const pts = aBoat.caughtFish.points;
              setAiScore((prev) => prev + pts);
              addFloatingText(aBoat.hookX, aBoat.hookY - 20, `+${pts} (${aBoat.caughtFish.name})`, '#f87171');
              playAudio('correct');
              aBoat.thoughtText = 'ឆ្លើយត្រូវ! 🎯';
            } else {
              addFloatingText(aBoat.hookX, aBoat.hookY - 20, 'ត្រីរបូត! ❌', '#ef4444');
              playAudio('wrong');
              aBoat.thoughtText = 'ឆ្លើយខុស! 😅';
            }

            if (aBoat.caughtFish) {
              const idx = fishesRef.current.findIndex((f) => f.id === aBoat.caughtFish.id);
              if (idx !== -1) fishesRef.current.splice(idx, 1);
              aBoat.caughtFish = null;
            }

            aBoat.state = 'REELING';
            setTimeout(() => {
              aBoat.thoughtText = '';
            }, 1400);
          }
        } else if (aBoat.state === 'REELING') {
          aBoat.hookY -= aBoat.speed * 1.6;
          if (aBoat.hookY <= WATER_LEVEL) {
            aBoat.hookY = WATER_LEVEL;
            aBoat.state = 'IDLE';
            aBoat.caughtFish = null;
          }
        }
      }

      // Draw Boats
      drawBoatAndHook(ctx, playerBoatRef.current, '#2563eb', 'ទូកអ្នក');
      if (gameMode === 'vs_ai') {
        drawBoatAndHook(ctx, aiBoatRef.current, '#dc2626', 'ទូក AI');
      }

      // Particles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life / 50);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        if (p.life <= 0) particlesRef.current.splice(idx, 1);
      });

      // Floating texts
      floatingTextsRef.current.forEach((ft, index) => {
        ft.y -= 0.8;
        ft.opacity -= 0.015;
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.opacity);
        ctx.font = 'bold 16px Kantumruy Pro';
        ctx.fillText(ft.text, ft.x - 20, ft.y);
        ctx.globalAlpha = 1.0;
        if (ft.opacity <= 0) floatingTextsRef.current.splice(index, 1);
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('click', handlePointerDown);
      canvas.removeEventListener('touchstart', handlePointerDown);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isOpen, gameRunning, aiDifficulty, gameMode, selectedSubject]);

  const drawBoatAndHook = (ctx: CanvasRenderingContext2D, boat: any, color: string, label: string) => {
    // Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(boat.hookX, boat.y + 10);
    ctx.lineTo(boat.hookX, boat.hookY);
    ctx.stroke();

    // Hook
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(boat.hookX - 4, boat.hookY + 4, 4, 0, Math.PI, false);
    ctx.stroke();

    // Boat
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(boat.x - 65, boat.y);
    ctx.lineTo(boat.x + 65, boat.y);
    ctx.lineTo(boat.x + 48, boat.y + boat.height);
    ctx.lineTo(boat.x - 48, boat.y + boat.height);
    ctx.closePath();
    ctx.fill();

    // Character
    ctx.font = '22px sans-serif';
    ctx.fillText(label.includes('AI') ? '🤖' : '🎣', boat.x - 12, boat.y - 8);

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Kantumruy Pro';
    ctx.fillText(label, boat.x - 22, boat.y + 22);

    // Thought bubble
    if (boat.thoughtText) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(boat.x - 45, boat.y - 48, 110, 26);
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(boat.x - 45, boat.y - 48, 110, 26);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px Kantumruy Pro';
      ctx.fillText(boat.thoughtText, boat.x - 40, boat.y - 31);
    }
  };

  const triggerQuestionForPlayer = (fish: any) => {
    const qList = getExamQuestionsForSubject(selectedSubject);
    const randomQ = qList[Math.floor(Math.random() * qList.length)];

    setCurrentQuiz({
      q: randomQ.q,
      options: randomQ.options,
      answer: randomQ.answer,
      exp: randomQ.exp,
      fishName: fish.name,
      fishPoints: fish.points,
      fishType: fish.type
    });

    setSelectedOption(null);
    setQuizAnswered(false);
    setQuizTimeLeft(10);

    clearInterval(quizTimerRef.current);
    quizTimerRef.current = setInterval(() => {
      setQuizTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(quizTimerRef.current);
          handleQuizSubmit(-1, randomQ.answer, fish.points);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleQuizSubmit = (optIndex: number, correctIdx: number, points: number) => {
    if (quizAnswered) return;

    clearInterval(quizTimerRef.current);
    setSelectedOption(optIndex);
    setQuizAnswered(true);

    const isCorrect = optIndex === correctIdx;

    if (isCorrect) {
      playAudio('correct');
      setPlayerScore((prev) => prev + points);
      addFloatingText(playerBoatRef.current.hookX, playerBoatRef.current.hookY - 20, `+${points} (${playerBoatRef.current.caughtFish?.name || 'ត្រី'})`, '#38bdf8');
      createParticles(playerBoatRef.current.hookX, playerBoatRef.current.hookY, '#38bdf8', 15);

      if (currentQuiz?.fishType === 'magnet') {
        magnetTimerRef.current = 300; // 5 seconds
        addFloatingText(playerBoatRef.current.x, playerBoatRef.current.y - 20, '🧲 មេដែកសកម្ម!', '#facc15');
      }
    } else {
      playAudio('wrong');
      addFloatingText(playerBoatRef.current.hookX, playerBoatRef.current.hookY - 20, 'ត្រីរបូត! ❌', '#ef4444');
    }

    // Unhook fish & Reel back hook
    setTimeout(() => {
      if (playerBoatRef.current.caughtFish) {
        const caughtId = playerBoatRef.current.caughtFish.id;
        fishesRef.current = fishesRef.current.filter((f) => f.id !== caughtId);
        playerBoatRef.current.caughtFish = null;
      }
      playerBoatRef.current.state = 'REELING';
      setCurrentQuiz(null);
    }, 1500);
  };

  const handleStartGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setGameTime(120);
    setShowGameOver(false);
    setGameRunning(true);

    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          setGameRunning(false);
          setShowGameOver(true);
          awardCoinsAndXp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const awardCoinsAndXp = () => {
    try {
      const saved = localStorage.getItem('grade6_reward_state');
      let rewardState = saved ? JSON.parse(saved) : { coins: 500, xp: 800, level: 3 };

      const earnedCoins = playerScore + (playerScore > aiScore ? 300 : 100);
      const earnedXp = playerScore * 2 + 200;

      rewardState.coins = (rewardState.coins || 0) + earnedCoins;
      rewardState.xp = (rewardState.xp || 0) + earnedXp;

      localStorage.setItem('grade6_reward_state', JSON.stringify(rewardState));
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 text-white rounded-3xl border border-sky-500/30 shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-sky-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl shadow-md font-bold">
              🎣
            </div>
            <div>
              <h2 className="font-moul text-sm sm:text-base text-cyan-200 font-bold leading-tight">
                ហ្គេមប្រកួតស្ទូចត្រី - អ្នក vs AI
              </h2>
              <p className="text-[11px] text-sky-300/70 font-sans">
                ឆ្លើយសំណួរដណ្តើមពិន្ទុ ស្ទូចត្រី និងប្រអប់កំណប់!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700"
              title={isMuted ? 'បើកសំឡេង' : 'បិទសំឡេង'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
              id="btn-close-fishing-game"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Setup Screen */}
        {!gameRunning && !showGameOver ? (
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[80vh]">
            <div className="text-center space-y-2">
              <div className="text-5xl animate-bounce my-1">🎣 🆚 🤖</div>
              <h3 className="font-moul text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                ជ្រើសរើសមុខវិជ្ជា និងកម្រិតប្រកួតស្ទូចត្រី
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                ជ្រើសរើសមុខវិជ្ជាសិក្សាដែលអ្នកចង់ស្ទូចត្រី និងឆ្លើយសំណួរដើម្បីប្រកួតយកពិន្ទុ និងកាក់រង្វាន់!
              </p>
            </div>

            {/* Select Subject Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-sky-300 uppercase tracking-wider block">
                ១. ជ្រើសរើសមុខវិជ្ជាប្រកួត (Select Subject)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FISHING_SUBJECTS.map((s) => {
                  const qCount = getExamQuestionsForSubject(s.id).length;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSubject(s.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        selectedSubject === s.id
                          ? 'bg-gradient-to-r ' + s.color + ' border-white/60 ring-2 ring-cyan-400 shadow-lg scale-102'
                          : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <h4 className="font-moul text-xs sm:text-sm text-white font-bold">{s.nameKhmer}</h4>
                        <span className="text-[10px] opacity-80 font-sans block">
                          {qCount} សំណួរវិញ្ញាសា
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                <label className="text-xs font-bold text-sky-300 uppercase tracking-wider block">
                  ២. របៀបលេង (Game Mode)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGameMode('vs_ai')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      gameMode === 'vs_ai'
                        ? 'bg-rose-600 border-rose-400 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Swords className="w-4 h-4" />
                    <span>ប្រកួតជាមួយ AI</span>
                  </button>

                  <button
                    onClick={() => setGameMode('solo')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      gameMode === 'solo'
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>លេងទោលរាប់ពិន្ទុ</span>
                  </button>
                </div>
              </div>

              {gameMode === 'vs_ai' && (
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                  <label className="text-xs font-bold text-sky-300 uppercase tracking-wider block">
                    ៣. កម្រិតសមត្ថភាព AI
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'easy', label: 'ងាយស្រួល', color: 'bg-emerald-600' },
                      { id: 'medium', label: 'មធ្យម', color: 'bg-amber-600' },
                      { id: 'hard', label: 'ពូកែ', color: 'bg-rose-600' }
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setAiDifficulty(d.id as any)}
                        className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          aiDifficulty === d.id
                            ? `${d.color} border-white text-white shadow-md`
                            : 'bg-slate-900 text-slate-400 border-slate-700'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartGame}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-moul font-bold rounded-2xl shadow-xl transition-all transform active:scale-98 text-sm sm:text-base border border-cyan-300/40 cursor-pointer flex items-center justify-center gap-2"
              id="btn-start-fishing-match"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>ចាប់ផ្ដើមប្រកួតស្ទូចត្រី 🚀</span>
            </button>
          </div>
        ) : (
          /* ACTIVE GAME VIEW */
          <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
            {/* Top Score Bar */}
            <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-blue-950/80 px-3 py-1.5 rounded-xl border border-blue-500/40 flex items-center gap-2">
                  <span className="text-lg">🎣</span>
                  <div>
                    <div className="text-[10px] text-blue-300 font-bold">ទូកអ្នក</div>
                    <div className="text-base font-mono font-bold text-blue-400">{playerScore}</div>
                  </div>
                </div>
              </div>

              {/* Timer Display */}
              <div className="bg-slate-950 border border-amber-500/40 px-4 py-1 rounded-full text-center">
                <span className="text-[10px] text-slate-400 block -mb-1 font-bold">ពេលវេលា</span>
                <span className="text-base font-mono font-bold text-amber-400">
                  {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {gameMode === 'vs_ai' && (
                <div className="flex items-center gap-3">
                  <div className="bg-red-950/80 px-3 py-1.5 rounded-xl border border-red-500/40 flex items-center gap-2 text-right">
                    <div>
                      <div className="text-[10px] text-red-300 font-bold">ទូក AI</div>
                      <div className="text-base font-mono font-bold text-red-400">{aiScore}</div>
                    </div>
                    <span className="text-lg">🤖</span>
                  </div>
                </div>
              )}
            </div>

            {/* Canvas Area */}
            <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center min-h-[360px] sm:min-h-[480px]">
              <canvas ref={canvasRef} className="w-full h-full max-h-[580px] object-contain cursor-pointer" />

              {/* Mobile Floating Drop Button */}
              <div className="absolute bottom-4 right-4 sm:hidden z-20">
                <button
                  onClick={() => triggerHookDrop(500)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 active:scale-90 text-white font-bold py-3 px-5 rounded-full shadow-2xl border-2 border-white/40 flex items-center gap-2 text-sm cursor-pointer"
                >
                  <span>🎣 ទម្លាក់សន្ទូច</span>
                </button>
              </div>
            </div>

            {/* Quiz Question Overlay */}
            {currentQuiz && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-30 animate-fade-in">
                <div className="bg-slate-900 border-2 border-cyan-500/60 rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl space-y-4">
                  <div className="flex justify-between items-center text-xs text-sky-300 border-b border-slate-800 pb-2">
                    <span className="font-bold font-moul text-cyan-200 flex items-center gap-1.5">
                      🎣 ស្ទូចបាន៖ {currentQuiz.fishName} (+{currentQuiz.fishPoints} ពិន្ទុ)
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-mono font-bold border border-amber-500/30">
                      ⏳ {quizTimeLeft}s
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {currentQuiz.q}
                  </h4>

                  <div className="space-y-2">
                    {currentQuiz.options.map((opt, idx) => {
                      let btnClass = 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700';
                      if (quizAnswered) {
                        if (idx === currentQuiz.answer) {
                          btnClass = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                        } else if (idx === selectedOption) {
                          btnClass = 'bg-rose-600 text-white border-rose-400 font-bold';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizAnswered}
                          onClick={() => handleQuizSubmit(idx, currentQuiz.answer, currentQuiz.fishPoints)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                        >
                          <span>{idx + 1}. {opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered && (
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-sky-200 leading-relaxed animate-fade-in">
                      💡 <span className="font-bold text-amber-300">ពន្យល់៖</span> {currentQuiz.exp}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Game Over Modal */}
            {showGameOver && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-40 animate-fade-in">
                <div className="bg-slate-900 border border-sky-500/40 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl">
                  <div className="text-6xl my-1">
                    {playerScore > aiScore ? '🏆' : playerScore === aiScore ? '🤝' : '🤖'}
                  </div>
                  <h3 className="font-moul text-lg sm:text-xl text-amber-300">
                    {playerScore > aiScore ? 'អ្នកទទួលបានជ័យជំនះ!' : playerScore === aiScore ? 'លទ្ធផលស្មើគ្នា!' : 'AI ជាអ្នកឈ្នះ!'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    ការប្រកួតត្រូវបានបញ្ចប់ដោយជោគជ័យ! អ្នកទទួលបានកាក់ និង XP បន្ថែមសម្រាប់គណនីរបស់អ្នក។
                  </p>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-400 font-bold">ពិន្ទុរបស់អ្នក៖</span>
                      <span className="text-white font-bold">{playerScore}</span>
                    </div>
                    {gameMode === 'vs_ai' && (
                      <div className="flex justify-between">
                        <span className="text-red-400 font-bold">ពិន្ទុ AI Bot៖</span>
                        <span className="text-white font-bold">{aiScore}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-slate-800 pt-2 text-amber-400">
                      <span>កាក់ទទួលបាន 🪙:</span>
                      <span className="font-bold">+{playerScore + (playerScore > aiScore ? 300 : 100)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowGameOver(false)}
                      className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                    >
                      ប្តូរមុខវិជ្ជា
                    </button>
                    <button
                      onClick={handleStartGame}
                      className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-md"
                    >
                      ប្រកួតម្ដងទៀត 🔄
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
