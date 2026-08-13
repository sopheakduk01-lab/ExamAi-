import React, { useState, useEffect, useRef } from 'react';
import { getSafeAudioContext } from '../utils/audioSynthesizer';
import {
  X,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Play,
  Pause,
  Shield,
  Star,
  Zap,
  Sparkles,
  Heart,
  Crown,
  BookOpen,
  Info,
  ChevronRight,
  Home,
  Target,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

interface VijjaNavaGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubjectId?: string;
}

// ----------------------------------------------------
// 1. SOUND SYNTHESIZER
// ----------------------------------------------------
class SoundFx {
  private isMuted: boolean = false;

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  playCatch() {
    if (this.isMuted) return;
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playPowerup() {
    if (this.isMuted) return;
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playWrong() {
    if (this.isMuted) return;
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playSwitchAlert() {
    if (this.isMuted) return;
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(1760, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playFever() {
    if (this.isMuted) return;
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Ignore audio errors
    }
  }
}

const sfx = new SoundFx();

// ----------------------------------------------------
// 2. 5 BEAUTIFUL KHMER CUTE CHARACTERS
// ----------------------------------------------------
interface GameCharacter {
  id: string;
  name: string;
  icon: string;
  color: string;
  ability: string;
  desc: string;
  speedMultiplier: number;
  magnetPassive: boolean;
  scoreBonus: number;
  startLives: number;
  startShield: boolean;
}

const CHARACTERS: GameCharacter[] = [
  {
    id: 'morakot',
    name: 'មរកត',
    icon: '👑',
    color: '#facc15',
    ability: 'មាសបូកពិន្ទុ',
    desc: 'សមត្ថភាព៖ ទទួលបានពិន្ទុបន្ថែម +៥០%',
    speedMultiplier: 1.0,
    magnetPassive: false,
    scoreBonus: 1.5,
    startLives: 3,
    startShield: false
  },
  {
    id: 'manee',
    name: 'មណី',
    icon: '🐱',
    color: '#c084fc',
    ability: 'មេដែកចិន្តា',
    desc: 'សមត្ថភាព៖ មានមេដែកស្រូបចម្លើយត្រូវជានិច្ច',
    speedMultiplier: 1.0,
    magnetPassive: true,
    scoreBonus: 1.0,
    startLives: 3,
    startShield: false
  },
  {
    id: 'ratanak',
    name: 'រតនៈ',
    icon: '🐸',
    color: '#4ade80',
    ability: 'ល្បឿនស្ទុះរហ័ស',
    desc: 'សមត្ថភាព៖ ផ្លាស់ទីលឿន និងស្ទុះទាន់ចិត្ត',
    speedMultiplier: 1.45,
    magnetPassive: false,
    scoreBonus: 1.0,
    startLives: 3,
    startShield: false
  },
  {
    id: 'sovan',
    name: 'សុវណ្ណ',
    icon: '🐻',
    color: '#fb923c',
    ability: 'ខែលមាសការពារ',
    desc: 'សមត្ថភាព៖ ទទួលបានខែលការពារស្រាប់តាំងពីដើម',
    speedMultiplier: 1.0,
    magnetPassive: false,
    scoreBonus: 1.0,
    startLives: 3,
    startShield: true
  },
  {
    id: 'bopha',
    name: 'បុប្ផា',
    icon: '🐰',
    color: '#f472b6',
    ability: 'បេះដូងបន្ថែម',
    desc: 'សមត្ថភាព៖ បន្ថែមជីវិតបេះដូង +១ (៤ ជីវិត)',
    speedMultiplier: 1.1,
    magnetPassive: false,
    scoreBonus: 1.0,
    startLives: 4,
    startShield: false
  }
];

// ----------------------------------------------------
// 3. 15 FULL TOPICS PER SUBJECT
// ----------------------------------------------------
interface PromptItem {
  prompt: string;
  isCorrect: (val: any) => boolean;
  generatePool: () => any[];
}

interface TopicItem {
  id: string;
  title: string;
  prompts: PromptItem[];
}

const GAME_SUBJECTS: Record<string, TopicItem[]> = {
  khmer: [
    {
      id: 'k1', title: '១. ថ្នាក់ពាក្យ - នាម',
      prompts: [
        { prompt: "ស្វែងរក៖ ពាក្យជានាមទីកន្លែង", isCorrect: v => ['សាលារៀន', 'មន្ទីរពេទ្យ', 'វត្តអារាម', 'ផ្សារ', 'ផ្ទះ'].includes(v), generatePool: () => ['សាលារៀន', 'មន្ទីរពេទ្យ', 'វត្តអារាម', 'ផ្សារ', 'រត់', 'ស្អាត', 'លឿន'] },
        { prompt: "ស្វែងរក៖ ពាក្យជានាមវត្ថុ/សត្វ", isCorrect: v => ['សៀវភៅ', 'ដើមឈើ', 'ឆ្មា', 'កុំព្យូទ័រ', 'តុ'].includes(v), generatePool: () => ['សៀវភៅ', 'ដើមឈើ', 'ឆ្មា', 'កុំព្យូទ័រ', 'សរសេរ', 'អាន', 'ដើរ'] },
        { prompt: "ស្វែងរក៖ ពាក្យជានាមអរូបី", isCorrect: v => ['កិត្តិយស', 'សេចក្តីសុខ', 'ការអប់រំ', 'ភាពស្មោះត្រង់'].includes(v), generatePool: () => ['កិត្តិយស', 'សេចក្តីសុខ', 'ការអប់រំ', 'ភាពស្មោះត្រង់', 'ផ្ទះ', 'ឆ្មា', 'រត់'] }
      ]
    },
    {
      id: 'k2', title: '២. ថ្នាក់ពាក្យ - កិរិយាសព្ទ',
      prompts: [
        { prompt: "ស្វែងរក៖ កិរិយាសព្ទសកម្ម", isCorrect: v => ['រត់', 'សរសេរ', 'អាន', 'ដើរ', 'ហែល'].includes(v), generatePool: () => ['រត់', 'សរសេរ', 'អាន', 'ដើរ', 'តុ', 'ស្អាត', 'ធំ'] },
        { prompt: "ស្វែងរក៖ កិរិយាសព្ទអសកម្ម", isCorrect: v => ['ដេក', 'អង្គុយ', 'ឈរ', 'ដួល', 'សន្លប់'].includes(v), generatePool: () => ['ដេក', 'អង្គុយ', 'ឈរ', 'ដួល', 'សៀវភៅ', 'ខ្ពស់', 'ក្រហម'] }
      ]
    },
    {
      id: 'k3', title: '៣. ថ្នាក់ពាក្យ - គុណនាម',
      prompts: [
        { prompt: "ស្វែងរក៖ គុណនាមប្រាប់រូបរាង/ទំហំ", isCorrect: v => ['ធំ', 'តូច', 'ខ្ពស់', 'ទាប', 'វែង', 'ខ្លី'].includes(v), generatePool: () => ['ធំ', 'តូច', 'ខ្ពស់', 'ទាប', 'ផ្ទះ', 'រត់', 'សាលា'] },
        { prompt: "ស្វែងរក៖ គុណនាមប្រាប់លក្ខណៈ/គុណភាព", isCorrect: v => ['ស្អាត', 'លឿន', 'ល្អ', 'ឆ្លាត', 'ស្លូត'].includes(v), generatePool: () => ['ស្អាត', 'លឿន', 'ល្អ', 'ឆ្លាត', 'សៀវភៅ', 'ដើរ', 'អាន'] }
      ]
    },
    { id: 'k4', title: '៤. ថ្នាក់ពាក្យ - គុណកិរិយា', prompts: [{ prompt: "ស្វែងរក៖ គុណកិរិយាប្រាប់កិរិយា", isCorrect: v => ['យ៉ាងលឿន', 'យ៉ាងស្អាត', 'រហ័ស', 'ណាស់'].includes(v), generatePool: () => ['យ៉ាងលឿន', 'យ៉ាងស្អាត', 'រហ័ស', 'សៀវភៅ', 'រត់', 'សាលា'] }] },
    { id: 'k5', title: '៥. ថ្នាក់ពាក្យ - ធ្លាក់', prompts: [{ prompt: "ស្វែងរក៖ ពាក្យជាធ្លាក់ទីកន្លែង", isCorrect: v => ['លើ', 'ក្រោម', 'ក្នុង', 'ជិត', 'ពី'].includes(v), generatePool: () => ['លើ', 'ក្រោម', 'ក្នុង', 'ជិត', 'រត់', 'ស្អាត', 'ផ្ទះ'] }] },
    { id: 'k6', title: '៦. ថ្នាក់ពាក្យ - សន្ធាន', prompts: [{ prompt: "ស្វែងរក៖ ពាក្យជាសន្ធានភ្ជាប់ល្បះ", isCorrect: v => ['និង', 'ហើយ', 'ប៉ុន្តែ', 'ព្រោះ', 'ដោយសារ'].includes(v), generatePool: () => ['និង', 'ហើយ', 'ប៉ុន្តែ', 'ព្រោះ', 'សៀវភៅ', 'រត់', 'ធំ'] }] },
    { id: 'k7', title: '៧. ពាក្យដូច / ន័យដូច', prompts: [{ prompt: "ន័យដូចនឹង «បក្សី» (Bird)", isCorrect: v => ['សកុណា', 'បក្សា', 'សកុណី'].includes(v), generatePool: () => ['សកុណា', 'បក្សា', 'សកុណី', 'មច្ឆា', 'កុមារ', 'កស្សករ'] }] },
    { id: 'k8', title: '៨. ពាក្យផ្ទុយ (Antonyms)', prompts: [{ prompt: "ពាក្យផ្ទុយនឹង «ខ្នះខ្នែង»", isCorrect: v => ['ខ្ជិលច្រអូស', 'រុញរា'].includes(v), generatePool: () => ['ខ្ជិលច្រអូស', 'រុញរា', 'សកម្ម', 'រហ័ស', 'ឆ្លាត'] }] },
    { id: 'k9', title: '៩. មេពាក្យ និងឬសព្ទ', prompts: [{ prompt: "ស្វែងរក៖ ពាក្យមានឬសព្ទ «រៀន»", isCorrect: v => ['បង្រៀន', 'រៀនសូត្រ', 'អ្នករៀន'].includes(v), generatePool: () => ['បង្រៀន', 'រៀនសូត្រ', 'អ្នករៀន', 'រត់ប្រណាំង', 'ធ្វើការ'] }] },
    { id: 'k10', title: '១០. សញ្ញាវណ្ណយុត្តិ', prompts: [{ prompt: "ស្វែងរក៖ ល្បះប្រើ «សញ្ញាសួរ ?»", isCorrect: v => ['តើអ្នកទៅណា?', 'ហេតុអ្វី?'].includes(v), generatePool: () => ['តើអ្នកទៅណា?', 'ហេតុអ្វី?', 'ខ្ញុំទៅសាលា', 'ឱ! ស្អាតម៉្លេះ'] }] },
    { id: 'k11', title: '១១. ប្រភេទល្បះ - ល្បះទោល', prompts: [{ prompt: "ស្វែងរក៖ ល្បះទោល (Simple Sentence)", isCorrect: v => ['សុខទៅសាលា', 'ឆ្មាស៊ីត្រី'].includes(v), generatePool: () => ['សុខទៅសាលា', 'ឆ្មាស៊ីត្រី', 'សុខទៅសាលាហើយសៅទៅផ្ទះ'] }] },
    { id: 'k12', title: '១២. ប្រភេទល្បះ - ល្បះតម្លួត', prompts: [{ prompt: "ស្វែងរក៖ ល្បះតម្លួត (Compound)", isCorrect: v => ['សុខរៀន ហើយសៅលេង'].includes(v), generatePool: () => ['សុខរៀន ហើយសៅលេង', 'សុខទៅសាលា', 'ឆ្មាស៊ីត្រី'] }] },
    { id: 'k13', title: '១៣. សុភាសិត និងភាសិត', prompts: [{ prompt: "បន្តសុភាសិត៖ «ចេះមកពី...»", isCorrect: v => ['រៀន'].includes(v), generatePool: () => ['រៀន', 'លេង', 'ដេក', 'ដើរ', 'ញ៉ាំ'] }] },
    { id: 'k14', title: '១៤. ពាក្យគួរសម និងរាជសព្ទ', prompts: [{ prompt: "រាជសព្ទនៃ «ហូប / ញ៉ាំ» (Eat)", isCorrect: v => ['សោយ', 'ពិសារ'].includes(v), generatePool: () => ['សោយ', 'ពិសារ', 'ញ៉ាំ', 'ហូប', 'អាន'] }] },
    { id: 'k15', title: '១៥. មេប្រយោគ និងកម្មបទ', prompts: [{ prompt: "ស្វែងរក៖ ពាក្យជា «កម្មបទ» ក្នុង (សុខស៊ីបាយ)", isCorrect: v => ['បាយ'].includes(v), generatePool: () => ['បាយ', 'សុខ', 'ស៊ី', 'ទៅ', 'សាលា'] }] }
  ],

  english: [
    {
      id: 'e1', title: '1. Nouns (នាម)',
      prompts: [
        { prompt: "Find: Nouns (Thing/Place)", isCorrect: v => ['Book', 'School', 'Dog', 'House', 'Apple'].includes(v), generatePool: () => ['Book', 'School', 'Dog', 'House', 'Run', 'Fast', 'Big'] },
        { prompt: "Find: Proper Nouns (Names)", isCorrect: v => ['Cambodia', 'Phnom Penh', 'John', 'Angkor'].includes(v), generatePool: () => ['Cambodia', 'Phnom Penh', 'John', 'Angkor', 'book', 'run', 'small'] }
      ]
    },
    {
      id: 'e2', title: '2. Action Verbs (កិរិយា)',
      prompts: [
        { prompt: "Find: Action Verbs", isCorrect: v => ['Run', 'Jump', 'Read', 'Write', 'Swim'].includes(v), generatePool: () => ['Run', 'Jump', 'Read', 'Write', 'Desk', 'Chair', 'Blue'] },
        { prompt: "Find: Past Tense Verbs (-ed/Irregular)", isCorrect: v => ['Played', 'Walked', 'Ate', 'Went', 'Saw'].includes(v), generatePool: () => ['Played', 'Walked', 'Ate', 'Went', 'Play', 'Walk', 'Cat'] }
      ]
    },
    { id: 'e3', title: '3. Adjectives (គុណនាម)', prompts: [{ prompt: "Find: Adjectives (Describing)", isCorrect: v => ['Big', 'Small', 'Fast', 'Happy', 'Beautiful'].includes(v), generatePool: () => ['Big', 'Small', 'Fast', 'Happy', 'Cat', 'School', 'Walk'] }] },
    { id: 'e4', title: '4. Plural Nouns (ពហុវចនៈ)', prompts: [{ prompt: "Find: Plural Nouns (-s/-es)", isCorrect: v => ['Cats', 'Books', 'Boxes', 'Apples'].includes(v), generatePool: () => ['Cats', 'Books', 'Boxes', 'Apples', 'Dog', 'Pen', 'Chair'] }] },
    { id: 'e5', title: '5. Animals Vocabulary', prompts: [{ prompt: "Find: Wild Animals", isCorrect: v => ['Lion', 'Tiger', 'Elephant', 'Monkey'].includes(v), generatePool: () => ['Lion', 'Tiger', 'Elephant', 'Monkey', 'Dog', 'Cat', 'Cow'] }] },
    { id: 'e6', title: '6. Fruits Vocabulary', prompts: [{ prompt: "Find: Fruits (ផ្លែឈើ)", isCorrect: v => ['Apple', 'Banana', 'Mango', 'Orange', 'Grape'].includes(v), generatePool: () => ['Apple', 'Banana', 'Mango', 'Orange', 'Dog', 'Book', 'Table'] }] },
    { id: 'e7', title: '7. Opposite Words (ពាក្យផ្ទុយ)', prompts: [{ prompt: "Opposite of 'Big'", isCorrect: v => ['Small', 'Little', 'Tiny'].includes(v), generatePool: () => ['Small', 'Little', 'Tiny', 'Large', 'Huge', 'Tall', 'Fast'] }] },
    { id: 'e8', title: '8. School Supplies', prompts: [{ prompt: "Find: School Supplies", isCorrect: v => ['Pencil', 'Ruler', 'Eraser', 'Bag', 'Notebook'].includes(v), generatePool: () => ['Pencil', 'Ruler', 'Eraser', 'Bag', 'Tiger', 'Milk', 'Bread'] }] },
    { id: 'e9', title: '9. Family Members', prompts: [{ prompt: "Find: Family Members", isCorrect: v => ['Father', 'Mother', 'Brother', 'Sister'].includes(v), generatePool: () => ['Father', 'Mother', 'Brother', 'Sister', 'Doctor', 'Teacher'] }] },
    { id: 'e10', title: '10. Professions (មុខរបរ)', prompts: [{ prompt: "Find: Professions/Jobs", isCorrect: v => ['Doctor', 'Teacher', 'Farmer', 'Pilot', 'Nurse'].includes(v), generatePool: () => ['Doctor', 'Teacher', 'Farmer', 'Pilot', 'Apple', 'Book'] }] },
    { id: 'e11', title: '11. Days of the Week', prompts: [{ prompt: "Find: Days of the Week", isCorrect: v => ['Monday', 'Friday', 'Sunday', 'Wednesday'].includes(v), generatePool: () => ['Monday', 'Friday', 'Sunday', 'Wednesday', 'January', 'March'] }] },
    { id: 'e12', title: '12. Months of the Year', prompts: [{ prompt: "Find: Months", isCorrect: v => ['January', 'April', 'August', 'December'].includes(v), generatePool: () => ['January', 'April', 'August', 'December', 'Monday', 'Today'] }] },
    { id: 'e13', title: '13. Prepositions of Place', prompts: [{ prompt: "Find: Prepositions (ទីតាំង)", isCorrect: v => ['Under', 'Behind', 'Between', 'Next to'].includes(v), generatePool: () => ['Under', 'Behind', 'Between', 'Next to', 'Run', 'Book'] }] },
    { id: 'e14', title: '14. Colors and Shapes', prompts: [{ prompt: "Find: Shapes (រូបរាង)", isCorrect: v => ['Circle', 'Square', 'Triangle', 'Rectangle'].includes(v), generatePool: () => ['Circle', 'Square', 'Triangle', 'Rectangle', 'Red', 'Blue'] }] },
    { id: 'e15', title: '15. Numbers 1 to 100', prompts: [{ prompt: "Find: Numbers > 50", isCorrect: v => typeof v === 'number' && v > 50, generatePool: () => [60, 75, 80, 99, 10, 25, 30, 45] }] }
  ],

  social: [
    { id: 'so1', title: '១. ប្រវត្តិសាស្ត្រ - អង្គរវត្ត', prompts: [{ prompt: "ព្រះមហាក្សត្រកសាង «អង្គរវត្ត»", isCorrect: v => ['សុរិយវរ្ម័នទី២'].includes(v), generatePool: () => ['សុរិយវរ្ម័នទី២', 'ជ័យវរ្ម័នទី៧', 'ជ័យវរ្ម័នទី២'] }] },
    { id: 'so2', title: '២. ប្រវត្តិសាស្ត្រ - បាយ័ន', prompts: [{ prompt: "ព្រះមហាក្សត្រកសាង «ប្រាសាទបាយ័ន»", isCorrect: v => ['ជ័យវរ្ម័នទី៧'].includes(v), generatePool: () => ['ជ័យវរ្ម័នទី៧', 'សុរិយវរ្ម័នទី២', 'ជ័យវរ្ម័នទី២'] }] },
    { id: 'so3', title: '៣. ប្រវត្តិសាស្ត្រ - សម័យអង្គរ', prompts: [{ prompt: "រាជធានីបុរាណសម័យអង្គរ", isCorrect: v => ['អង្គរធំ', 'យសោធរៈបុរៈ'].includes(v), generatePool: () => ['អង្គរធំ', 'យសោធរៈបុរៈ', 'ភ្នំពេញ', 'លង្វែក'] }] },
    { id: 'so4', title: '៤. ភូមិវិទ្យា - ទន្លេសាប', prompts: [{ prompt: "លក្ខណៈពិសេសនៃ «បឹងទន្លេសាប»", isCorrect: v => ['បឹងទឹកសាបធំជាងគេ', 'ជម្រកត្រីច្រើន'].includes(v), generatePool: () => ['បឹងទឹកសាបធំជាងគេ', 'ជម្រកត្រីច្រើន', 'សមុទ្រទឹកប្រៃ'] }] },
    { id: 'so5', title: '៥. ភូមិវិទ្យា - ទន្លេមេគង្គ', prompts: [{ prompt: "ទន្លេវែងជាងគេនៅកម្ពុជា", isCorrect: v => ['ទន្លេមេគង្គ'].includes(v), generatePool: () => ['ទន្លេមេគង្គ', 'ទន្លេសាប', 'ទន្លេបាសាក់'] }] },
    { id: 'so6', title: '៦. ភូមិវិទ្យា - កំពូលភ្នំខ្ពស់', prompts: [{ prompt: "កំពូលភ្នំខ្ពស់ជាងគេនៅកម្ពុជា", isCorrect: v => ['ភ្នំឱរ៉ាល់'].includes(v), generatePool: () => ['ភ្នំឱរ៉ាល់', 'ភ្នំគូលែន', 'ភ្នំដងរែក'] }] },
    { id: 'so7', title: '៧. ភូមិវិទ្យា - តំបន់ឆ្នេរ', prompts: [{ prompt: "ស្វែងរក៖ ខេត្តតំបន់ឆ្នេរសមុទ្រ", isCorrect: v => ['ព្រះសីហនុ', 'កំពត', 'កែប', 'កោះកុង'].includes(v), generatePool: () => ['ព្រះសីហនុ', 'កំពត', 'កែប', 'កោះកុង', 'បាត់ដំបង'] }] },
    { id: 'so8', title: '៨. សីលធម៌ - ការគោរពចាស់ទុំ', prompts: [{ prompt: "ការបង្ហាញការគោរពចាស់ទុំ", isCorrect: v => ['សំពះជម្រាបសួរ', 'អោនក្បាល'].includes(v), generatePool: () => ['សំពះជម្រាបសួរ', 'អោនក្បាល', 'ស្រែកឡូឡា'] }] },
    { id: 'so9', title: '៩. សីលធម៌ - គ្រួសារ', prompts: [{ prompt: "កតញ្ញូតាធម៌ចំពោះមាតាបិតា", isCorrect: v => ['ស្តាប់បង្គាប់', 'ជួយធ្វើការងារ'].includes(v), generatePool: () => ['ស្តាប់បង្គាប់', 'ជួយធ្វើការងារ', 'ជែកតវ៉ា'] }] },
    { id: 'so10', title: '១០. ពលរដ្ឋវិទ្យា - សិទ្ធិកុមារ', prompts: [{ prompt: "សិទ្ធិមូលដ្ឋានរបស់កុមារ", isCorrect: v => ['សិទ្ធិទទួលបានការអប់រំ', 'សិទ្ធិរស់រាន'].includes(v), generatePool: () => ['សិទ្ធិទទួលបានការអប់រំ', 'សិទ្ធិរស់រាន', 'សិទ្ធិធ្វើពលកម្មធ្ងន់'] }] },
    { id: 'so11', title: '១១. ពលរដ្ឋវិទ្យា - មិត្តភាព', prompts: [{ prompt: "លក្ខណៈនៃ «មិត្តល្អ»", isCorrect: v => ['ជួយគ្នាក្នុងគ្រាអាសន្ន', 'ស្មោះត្រង់'].includes(v), generatePool: () => ['ជួយគ្នាក្នុងគ្រាអាសន្ន', 'ស្មោះត្រង់', 'បបួលធ្វើខុស'] }] },
    { id: 'so12', title: '១២. វប្បធម៌ - បុណ្យប្រពៃណី', prompts: [{ prompt: "ពិធីបុណ្យប្រពៃណីជាតិខ្មែរ", isCorrect: v => ['ចូលឆ្នាំខ្មែរ', 'ភ្ជុំបិណ្ឌ', 'អុំទូក'].includes(v), generatePool: () => ['ចូលឆ្នាំខ្មែរ', 'ភ្ជុំបិណ្ឌ', 'អុំទូក', 'បុណ្យណូអែល'] }] },
    { id: 'so13', title: '១៣. វប្បធម៌ - សិល្បៈខ្មែរ', prompts: [{ prompt: "ស្វែងរក៖ សិល្បៈរាំប្រពៃណីខ្មែរ", isCorrect: v => ['របាំអប្សរា', 'របាំត្រដក់', 'រាំវង់'].includes(v), generatePool: () => ['របាំអប្សរា', 'របាំត្រដក់', 'រាំវង់', 'ចម្រៀងរ៉ក'] }] },
    { id: 'so14', title: '១៤. សញ្ញាសម្គាល់ជាតិខ្មែរ', prompts: [{ prompt: "និមិត្តរូបជាតិខ្មែរ (Symbol)", isCorrect: v => ['ប្រាសាទអង្គរវត្ត', 'ផ្កាឈូក', 'ដើមត្នោត'].includes(v), generatePool: () => ['ប្រាសាទអង្គរវត្ត', 'ផ្កាឈូក', 'ដើមត្នោត', 'ផ្កាកុលាប'] }] },
    { id: 'so15', title: '១៥. ការថែរក្សាបេតិកភណ្ឌ', prompts: [{ prompt: "ការចូលរួមថែរក្សាបេតិកភណ្ឌ", isCorrect: v => ['មិនវាសសេរីលើប្រាសាទ', 'ការពារបរិស្ថាន'].includes(v), generatePool: () => ['មិនវាសសេរីលើប្រាសាទ', 'ការពារបរិស្ថាន', 'បោះសំរាម'] }] }
  ],

  health: [
    { id: 'h1', title: '១. អាហាររូបត្ថម្ភ - វីតាមីន A', prompts: [{ prompt: "ស្វែងរក៖ អាហារសម្បូរ «វីតាមីន A» (ភ្នែក)", isCorrect: v => ['ការ៉ុត', 'ល្ពៅ', 'ពពាយ', 'ថ្លើម'].includes(v), generatePool: () => ['ការ៉ុត', 'ល្ពៅ', 'ពពាយ', 'ថ្លើម', 'បាយ', 'ប្រេង', 'ស្ករ'] }] },
    { id: 'h2', title: '២. អាហាររូបត្ថម្ភ - វីតាមីន C', prompts: [{ prompt: "ស្វែងរក៖ អាហារសម្បូរ «វីតាមីន C»", isCorrect: v => ['ក្រូច', 'ស្ត្រូប៊ែរី', 'ម្ទេសប្លោក'].includes(v), generatePool: () => ['ក្រូច', 'ស្ត្រូប៊ែរី', 'ម្ទេសប្លោក', 'សាច់', 'បាយ', 'នំប៉័ង'] }] },
    { id: 'h3', title: '៣. អាហាររូបត្ថម្ភ - វីតាមីន D', prompts: [{ prompt: "ស្វែងរក៖ ប្រភព «វីតាមីន D» (ឆ្អឹង)", isCorrect: v => ['ពន្លឺថ្ងៃព្រឹក', 'ស៊ុតក្រហម', 'ប្រេងត្រី'].includes(v), generatePool: () => ['ពន្លឺថ្ងៃព្រឹក', 'ស៊ុតក្រហម', 'ប្រេងត្រី', 'កូកា', 'ស្ករគ្រាប់'] }] },
    { id: 'h4', title: '៤. អាហារសម្បូរ កាល់ស្យូម', prompts: [{ prompt: "ស្វែងរក៖ អាហារពង្រឹងឆ្អឹង (កាល់ស្យូម)", isCorrect: v => ['ទឹកដោះគោ', 'ត្រីតូចៗ', 'សណ្តែកសៀង'].includes(v), generatePool: () => ['ទឹកដោះគោ', 'ត្រីតូចៗ', 'សណ្តែកសៀង', 'កូកា', 'ស្ករគ្រាប់'] }] },
    { id: 'h5', title: '៥. អាហារសម្បូរ ប្រូតេអ៊ីន', prompts: [{ prompt: "ស្វែងរក៖ អាហារសាងសង់សាច់ដុំ (ប្រូតេអ៊ីន)", isCorrect: v => ['សាច់មាន់', 'ត្រី', 'ស៊ុត', 'សណ្តែក'].includes(v), generatePool: () => ['សាច់មាន់', 'ត្រី', 'ស៊ុត', 'សណ្តែក', 'ទឹកក្រូច', 'ស្ករ'] }] },
    { id: 'h6', title: '៦. អាហារសម្បូរ កាបូអ៊ីដ្រាត', prompts: [{ prompt: "ស្វែងរក៖ អាហារផ្តល់ថាមពល (កាបូអ៊ីដ្រាត)", isCorrect: v => ['បាយ', 'នំប៉័ង', 'ដំឡូង', 'មី'].includes(v), generatePool: () => ['បាយ', 'នំប៉័ង', 'ដំឡូង', 'មី', 'ទឹក', 'ត្រី', 'ស៊ុត'] }] },
    { id: 'h7', title: '៧. អនាម័យខ្លួនប្រាណ', prompts: [{ prompt: "ទម្លាប់ល្អ៖ អនាម័យខ្លួនប្រាណ", isCorrect: v => ['ងូតទឹក', 'កាត់ក្រចក', 'លាងដៃ'].includes(v), generatePool: () => ['ងូតទឹក', 'កាត់ក្រចក', 'លាងដៃ', 'លេងដី', 'អត់កក់សក់'] }] },
    { id: 'h8', title: '៨. អនាម័យមាត់ធ្មេញ', prompts: [{ prompt: "ការថែរក្សាធ្មេញឱ្យមាំមួន", isCorrect: v => ['ដុសធ្មេញ១ថ្ងៃ២ដង', 'កាត់បន្ថយស្ករ'].includes(v), generatePool: () => ['ដុសធ្មេញ១ថ្ងៃ២ដង', 'កាត់បន្ថយស្ករ', 'ញ៉ាំស្ករច្រើន', 'មិនដុសធ្មេញ'] }] },
    { id: 'h9', title: '៩. សុវត្ថិភាពចំណីអាហារ', prompts: [{ prompt: "ចំណីអាហារមានសុវត្ថិភាព", isCorrect: v => ['ចម្អិនឆ្អិន', 'គ្របជិត', 'មានអនាម័យ'].includes(v), generatePool: () => ['ចម្អិនឆ្អិន', 'គ្របជិត', 'មានអនាម័យ', 'ផ្អូម', 'រុយរោម'] }] },
    { id: 'h10', title: '១០. ការបង្ការជំងឺគ្រុនឈាម', prompts: [{ prompt: "វិធីបង្ការជំងឺគ្រុនឈាម", isCorrect: v => ['កម្ទេចជម្រកមូស', 'គេងក្នុងមុង'].includes(v), generatePool: () => ['កម្ទេចជម្រកមូស', 'គេងក្នុងមុង', 'ទុកទឹកថ្លុក', 'ឱ្យមូសខាំ'] }] },
    { id: 'h11', title: '១១. សុខភាពផ្លូវចិត្ត', prompts: [{ prompt: "ទម្លាប់ល្អសម្រាប់សុខភាពផ្លូវចិត្ត", isCorrect: v => ['គេងគ្រប់គ្រាន់', 'ធ្វើលំហាត់ប្រាណ'].includes(v), generatePool: () => ['គេងគ្រប់គ្រាន់', 'ធ្វើលំហាត់ប្រាណ', 'ស្ដ្រេស', 'ខឹងច្រើន'] }] },
    { id: 'h12', title: '១២. សុវត្ថិភាពចរាចរណ៍', prompts: [{ prompt: "ការធ្វើដំណើរមានសុវត្ថិភាព", isCorrect: v => ['ពាក់មួកសុវត្ថិភាព', 'ជិះខាងស្តាំ'].includes(v), generatePool: () => ['ពាក់មួកសុវត្ថិភាព', 'ជិះខាងស្តាំ', 'បើកលឿន', 'បំពានភ្លើងស្តុប'] }] },
    { id: 'h13', title: '១៣. គ្រោះថ្នាក់នៃបារី/គ្រឿងញៀន', prompts: [{ prompt: "ផលប៉ះពាល់នៃបារី", isCorrect: v => ['ខូចសួត', 'ជំងឺមហារីក'].includes(v), generatePool: () => ['ខូចសួត', 'ជំងឺមហារីក', 'សុខភាពល្អ', 'មាំមួន'] }] },
    { id: 'h14', title: '១៤. ការសង្គ្រោះបឋម', prompts: [{ prompt: "បឋមសង្គ្រោះពេលរលាកទឹកក្តៅ", isCorrect: v => ['ចាក់ទឹកស្អាតត្រជាក់'].includes(v), generatePool: () => ['ចាក់ទឹកស្អាតត្រជាក់', 'លាបប្រេងកោស', 'បិទបង់តTight'] }] },
    { id: 'h15', title: '១៥. អនាម័យបរិស្ថាន', prompts: [{ prompt: "ការថែរក្សាបរិស្ថានរស់នៅ", isCorrect: v => ['បោះសំរាមក្នុងធុង', 'ដាំដើមឈើ'].includes(v), generatePool: () => ['បោះសំរាមក្នុងធុង', 'ដាំដើមឈើ', 'ចោលសំរាមពាសវាល', 'កាប់ឈើ'] }] }
  ],

  math: [
    { id: 'm1', title: '១. លេខគូ (Even Numbers)', prompts: [{ prompt: "ស្វែងរក៖ លេខគូ (Even)", isCorrect: v => typeof v === 'number' && v % 2 === 0, generatePool: () => [2, 4, 6, 8, 10, 12, 14, 1, 3, 5, 7, 9, 11] }] },
    { id: 'm2', title: '២. លេខសេស (Odd Numbers)', prompts: [{ prompt: "ស្វែងរក៖ លេខសេស (Odd)", isCorrect: v => typeof v === 'number' && v % 2 !== 0, generatePool: () => [1, 3, 5, 7, 9, 11, 13, 2, 4, 6, 8, 10] }] },
    { id: 'm3', title: '៣. លេខបឋម (Prime Numbers)', prompts: [{ prompt: "ស្វែងរក៖ ចំនួនបឋម (Prime)", isCorrect: v => [2, 3, 5, 7, 11, 13, 17, 19].includes(v), generatePool: () => [2, 3, 5, 7, 11, 13, 4, 6, 8, 9, 10, 12] }] },
    { id: 'm4', title: '៤. ពហុគុណនៃ 3', prompts: [{ prompt: "ស្វែងរក៖ ពហុគុណនៃ 3", isCorrect: v => typeof v === 'number' && v % 3 === 0, generatePool: () => [3, 6, 9, 12, 15, 18, 2, 4, 5, 7, 8, 10] }] },
    { id: 'm5', title: '៥. ពហុគុណនៃ 5', prompts: [{ prompt: "ស្វែងរក៖ ពហុគុណនៃ 5", isCorrect: v => typeof v === 'number' && v % 5 === 0, generatePool: () => [5, 10, 15, 20, 25, 30, 2, 4, 7, 9, 12] }] },
    { id: 'm6', title: '៦. ពហុគុណនៃ 10', prompts: [{ prompt: "ស្វែងរក៖ ពហុគុណនៃ 10", isCorrect: v => typeof v === 'number' && v % 10 === 0, generatePool: () => [10, 20, 30, 40, 50, 5, 15, 25, 33, 42] }] },
    { id: 'm7', title: '៧. ប្រភាគស្មើនឹង 1/2', prompts: [{ prompt: "ស្វែងរក៖ ប្រភាគស្មើ 1/2", isCorrect: v => ['2/4', '3/6', '4/8', '5/10'].includes(v), generatePool: () => ['2/4', '3/6', '4/8', '5/10', '1/3', '2/5', '3/4'] }] },
    { id: 'm8', title: '៨. ប្រភាគស្មើនឹង 1/4', prompts: [{ prompt: "ស្វែងរក៖ ប្រភាគស្មើ 1/4", isCorrect: v => ['2/8', '3/12', '25%'].includes(v), generatePool: () => ['2/8', '3/12', '25%', '1/2', '2/3', '3/5'] }] },
    { id: 'm9', title: '៩. ចំនួនទសភាគ > 0.5', prompts: [{ prompt: "ស្វែងរក៖ ទសភាគធំជាង 0.5", isCorrect: v => typeof v === 'number' && v > 0.5, generatePool: () => [0.6, 0.75, 0.8, 0.9, 0.1, 0.2, 0.35, 0.4] }] },
    { id: 'm10', title: '១០. ចំនួនទសភាគ < 0.5', prompts: [{ prompt: "ស្វែងរក៖ ទសភាគតូចជាង 0.5", isCorrect: v => typeof v === 'number' && v < 0.5, generatePool: () => [0.1, 0.25, 0.3, 0.4, 0.6, 0.7, 0.85] }] },
    { id: 'm11', title: '១១. រូបរាងធរណីមាត្រ ២D', prompts: [{ prompt: "ស្វែងរក៖ រូបធរណីមាត្រ ២D", isCorrect: v => ['ការេ', 'ត្រីកោណ', 'រង្វង់', 'ចតុកោណ'].includes(v), generatePool: () => ['ការេ', 'ត្រីកោណ', 'រង្វង់', 'ចតុកោណ', 'កូប', 'ស៊ីឡាំង'] }] },
    { id: 'm12', title: '១២. រូបរាងធរណីមាត្រ ៣D', prompts: [{ prompt: "ស្វែងរក៖ រូបធរណីមាត្រ ៣D (Solids)", isCorrect: v => ['កូប', 'ស៊ីឡាំង', 'កោន', 'ស៊្វែរ'].includes(v), generatePool: () => ['កូប', 'ស៊ីឡាំង', 'កោន', 'ស៊្វែរ', 'ការេ', 'រង្វង់'] }] },
    { id: 'm13', title: '១៣. ខ្នាតរ៉ាប់ទម្ងន់ (Weight)', prompts: [{ prompt: "ស្វែងរក៖ ខ្នាតទម្ងន់", isCorrect: v => ['គីឡូក្រាម', 'ក្រាម', 'តោន'].includes(v), generatePool: () => ['គីឡូក្រាម', 'ក្រាម', 'តោន', 'ម៉ែត្រ', 'លីត្រ', 'វិនាទី'] }] },
    { id: 'm14', title: '១៤. ខ្នាតរ៉ាប់ប្រវែង (Length)', prompts: [{ prompt: "ស្វែងរក៖ ខ្នាតប្រវែង", isCorrect: v => ['ម៉ែត្រ', 'គីឡូម៉ែត្រ', 'សង់ទីម៉ែត្រ'].includes(v), generatePool: () => ['ម៉ែត្រ', 'គីឡូម៉ែត្រ', 'សង់ទីម៉ែត្រ', 'គីឡូក្រាម', 'លីត្រ'] }] },
    { id: 'm15', title: '១៥. ភាគរយ > 50%', prompts: [{ prompt: "ស្វែងរក៖ ភាគរយធំជាង 50%", isCorrect: v => ['60%', '75%', '80%', '90%'].includes(v), generatePool: () => ['60%', '75%', '80%', '90%', '10%', '25%', '40%'] }] }
  ],

  science: [
    { id: 's1', title: '១. ស្ថានភាពធាតុ - ធាតុរឹង', prompts: [{ prompt: "ស្វែងរក៖ ធាតុរឹង (Solids 🧊)", isCorrect: v => ['ទឹកកក', 'ឈើ', 'ដែក', 'ថ្ម'].includes(v), generatePool: () => ['ទឹកកក', 'ឈើ', 'ដែក', 'ថ្ម', 'ទឹក', 'ប្រេង', 'ខ្យល់'] }] },
    { id: 's2', title: '២. ស្ថានភាពធាតុ - ធាតុរាវ', prompts: [{ prompt: "ស្វែងរក៖ ធាតុរាវ (Liquids 💧)", isCorrect: v => ['ទឹក', 'ទឹកដោះគោ', 'ប្រេង', 'ទឹកក្រូច'].includes(v), generatePool: () => ['ទឹក', 'ទឹកដោះគោ', 'ប្រេង', 'ទឹកក្រូច', 'ឈើ', 'ដែក', 'ខ្យល់'] }] },
    { id: 's3', title: '៣. ស្ថានភាពធាតុ - ឧស្ម័ន', prompts: [{ prompt: "ស្វែងរក៖ ឧស្ម័ន (Gases 💨)", isCorrect: v => ['អុកស៊ីសែន', 'ខ្យល់', 'ចំហាយទឹក', 'កាបូនិច'].includes(v), generatePool: () => ['អុកស៊ីសែន', 'ខ្យល់', 'ចំហាយទឹក', 'កាបូនិច', 'ទឹក', 'ដែក', 'ថ្ម'] }] },
    { id: 's4', title: '៤. ប្រព័ន្ធរំលាយអាហារ', prompts: [{ prompt: "ស្វែងរក៖ សរីរាង្គរំលាយអាហារ", isCorrect: v => ['ក្រពះ', 'ពោះវៀន', 'បំពង់អាហារ', 'មាត់'].includes(v), generatePool: () => ['ក្រពះ', 'ពោះវៀន', 'បំពង់អាហារ', 'មាត់', 'សួត', 'បេះដូង'] }] },
    { id: 's5', title: '៥. ប្រព័ន្ធដកដង្ហើម', prompts: [{ prompt: "ស្វែងរក៖ សរីរាង្គដកដង្ហើម", isCorrect: v => ['សួត', 'បំពង់ខ្យល់', 'ច្រមុះ'].includes(v), generatePool: () => ['សួត', 'បំពង់ខ្យល់', 'ច្រមុះ', 'ក្រពះ', 'ពោះវៀន', 'បេះដូង'] }] },
    { id: 's6', title: '៦. ប្រព័ន្ធលំហូរឈាម', prompts: [{ prompt: "ស្វែងរក៖ សរីរាង្គបូមឈាម", isCorrect: v => ['បេះដូង', 'សរសៃឈាម'].includes(v), generatePool: () => ['បេះដូង', 'សរសៃឈាម', 'ក្រពះ', 'សួត', 'ឆ្អឹង'] }] },
    { id: 's7', title: '៧. រុក្ខជាតិ និងរស្មីសំយោគ', prompts: [{ prompt: "ធាតុចាំបាច់សម្រាប់រស្មីសំយោគ", isCorrect: v => ['ពន្លឺព្រះអាទិត្យ', 'ទឹក', 'កាបូនិច'].includes(v), generatePool: () => ['ពន្លឺព្រះអាទិត្យ', 'ទឹក', 'កាបូនិច', 'ប្រេង', 'អំបិល'] }] },
    { id: 's8', title: '៨. សត្វឥតឆ្អឹងកង', prompts: [{ prompt: "ស្វែងរក៖ សត្វឥតឆ្អឹងកង (Invertebrates)", isCorrect: v => ['ជន្លេន', 'បង្គា', 'មឹក', 'កណ្តូប'].includes(v), generatePool: () => ['ជន្លេន', 'បង្គា', 'មឹក', 'កណ្តូប', 'ឆ្កែ', 'ឆ្មា', 'មាន់'] }] },
    { id: 's9', title: '៩. សត្វមានឆ្អឹងកង', prompts: [{ prompt: "ស្វែងរក៖ សត្វមានឆ្អឹងកង (Vertebrates)", isCorrect: v => ['ឆ្កែ', 'ឆ្មា', 'ត្រី', 'បក្សី'].includes(v), generatePool: () => ['ឆ្កែ', 'ឆ្មា', 'ត្រី', 'បក្សី', 'ជន្លេន', 'មឹក', 'កណ្តូប'] }] },
    { id: 's10', title: '១០. ប្រភពថាមពលកកើតឡើងវិញ', prompts: [{ prompt: "ស្វែងរក៖ ថាមពលកកើតឡើងវិញ", isCorrect: v => ['ពន្លឺអាទិត្យ', 'ខ្យល់', 'ទឹក'].includes(v), generatePool: () => ['ពន្លឺអាទិត្យ', 'ខ្យល់', 'ទឹក', 'ធ្យូងថ្ម', 'ប្រេងកាត'] }] },
    { id: 's11', title: '១១. ភពក្នុងប្រព័ន្ធព្រះអាទិត្យ', prompts: [{ prompt: "ស្វែងរក៖ ភពក្នុងប្រព័ន្ធអាទិត្យ", isCorrect: v => ['ផែនដី', 'អង្គារ', 'ព្រហស្បតិ៍', 'សុក្រ'].includes(v), generatePool: () => ['ផែនដី', 'អង្គារ', 'ព្រហស្បតិ៍', 'សុក្រ', 'ព្រះច័ន្ទ', 'តារា'] }] },
    { id: 's12', title: '១២. កម្លាំងទាញ និងកម្លាំងរុញ', prompts: [{ prompt: "ស្វែងរក៖ សកម្មភាពប្រើ «កម្លាំងរុញ»", isCorrect: v => ['រុញរទេះ', 'ទាត់បាល់', 'បុកទ្វារ'].includes(v), generatePool: () => ['រុញរទេះ', 'ទាត់បាល់', 'បុកទ្វារ', 'ទាញខ្សែ', 'យោងទឹក'] }] },
    { id: 's13', title: '១៣. អង្គធាតុចម្លងអគ្គិសនី', prompts: [{ prompt: "ស្វែងរក៖ អង្គធាតុចម្លងអគ្គិសនី (Conductors)", isCorrect: v => ['តង់ដែក', 'ស្ពាន់', 'ទឹក'].includes(v), generatePool: () => ['តង់ដែក', 'ស្ពាន់', 'ទឹក', 'ឈើក្រៀម', 'ជ័រ', 'កែវ'] }] },
    { id: 's14', title: '១៤. ការកែច្នៃសំណល់ (Recycling)', prompts: [{ prompt: "សម្ភារអាចកែច្នៃឡើងវិញបាន", isCorrect: v => ['ដបជ័រ', 'ក្រដាស', 'កំប៉ុង'].includes(v), generatePool: () => ['ដបជ័រ', 'ក្រដាស', 'កំប៉ុង', 'ម្ហូបផ្អូម', 'ស្មៅ'] }] },
    { id: 's15', title: '១៥. បាតុភូតធម្មជាតិ - វដ្តទឹក', prompts: [{ prompt: "ស្វែងរក៖ ដំណាក់កាលនៃវដ្តទឹក", isCorrect: v => ['ចំហាយទឹក', 'កំណកចំហាយ', 'ភ្លៀង'].includes(v), generatePool: () => ['ចំហាយទឹក', 'កំណកចំហាយ', 'ភ្លៀង', 'រញ្ជួយដី', 'បន្ទុះភ្នំភ្លើង'] }] }
  ]
};

const PRAISE_WORDS = ["អស្ចារ្យណាស់!", "លឿនមែន!", "ឆ្លាតណាស់!", "ឥតខ្ចោះ! (PERFECT)"];
const NEUTRAL_COLORS = ['#c084fc', '#818cf8', '#38bdf8', '#2dd4bf', '#34d399', '#f472b6'];

// Helper Classes
class Shockwave {
  x: number;
  y: number;
  r: number;
  maxR: number;
  color: string;
  alpha: number;

  constructor(x: number, y: number, color: string, maxR: number) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.maxR = maxR;
    this.color = color;
    this.alpha = 1;
  }

  update() {
    this.r += (this.maxR - this.r) * 0.12;
    this.alpha -= 0.025;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
  decay: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.r = Math.random() * 5 + 2;
    this.color = color;
    this.alpha = 1;
    this.decay = Math.random() * 0.03 + 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize: number;
  alpha: number;
  vy: number;

  constructor(x: number, y: number, text: string, color: string, fontSize = 18) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.fontSize = fontSize;
    this.alpha = 1;
    this.vy = -2.2;
  }

  update() {
    this.y += this.vy;
    this.alpha -= 0.018;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.fontSize}px "Kantumruy Pro", sans-serif`;
    ctx.textAlign = 'center';
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

class PowerupItem {
  x: number;
  y: number;
  r: number;
  speed: number;
  type: string;

  constructor(width: number) {
    this.x = Math.random() * (width - 100) + 50;
    this.y = -40;
    this.r = 24;
    this.speed = 2.2;
    const types = ['shield', 'freeze', 'magnet', 'heart'];
    this.type = types[Math.floor(Math.random() * types.length)];
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);

    let icon = '🛡️';
    let glowColor = '#38bdf8';
    if (this.type === 'freeze') { icon = '⏱️'; glowColor = '#0284c7'; }
    if (this.type === 'magnet') { icon = '🧲'; glowColor = '#f59e0b'; }
    if (this.type === 'heart') { icon = '💖'; glowColor = '#ec4899'; }

    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 15;
    
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = '16px "Kantumruy Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, 0, 0);

    ctx.restore();
  }
}

class FallingItem {
  x: number;
  y: number;
  r: number;
  baseSpeed: number;
  value: any;
  isCorrect: boolean;
  pulse: number;
  color: string;
  rotAngle: number;

  constructor(width: number, value: any, isCorrect: boolean, currentScore: number) {
    this.x = Math.random() * (width - 100) + 50;
    this.y = -40;
    this.r = Math.min(width * 0.06, 32) + 4;
    this.baseSpeed = Math.random() * 1.5 + 2.0 + (currentScore / 700);
    this.value = value;
    this.isCorrect = isCorrect;
    this.pulse = Math.random() * Math.PI;
    this.color = NEUTRAL_COLORS[Math.floor(Math.random() * NEUTRAL_COLORS.length)];
    this.rotAngle = Math.random() * Math.PI * 2;
  }

  update(freezeTimer: number, isFeverActive: boolean, magnetTimer: number, magnetPassive: boolean, playerX: number, playerY: number) {
    let currentSpeed = this.baseSpeed;
    if (freezeTimer > 0) currentSpeed *= 0.35;

    if ((isFeverActive || magnetTimer > 0 || magnetPassive) && this.isCorrect) {
      const dx = playerX - this.x;
      const dy = playerY - this.y;
      this.x += dx * 0.1;
      this.y += dy * 0.1;
    } else {
      this.y += currentSpeed;
    }
    this.pulse += 0.06;
    this.rotAngle += 0.03;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const glowR = this.r + Math.sin(this.pulse) * 4;
    
    const grad = ctx.createRadialGradient(this.x, this.y, this.r * 0.2, this.x, this.y, glowR + 10);
    grad.addColorStop(0, this.color + 'ee');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, glowR + 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotAngle);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-this.r * 0.5, -this.r * 0.5, this.r, this.r);
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.max(11, this.r * 0.55)}px "Kantumruy Pro", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(this.value), this.x, this.y);

    ctx.restore();
  }
}

export const VijjaNavaGameModal: React.FC<VijjaNavaGameModalProps> = ({
  isOpen,
  onClose,
  initialSubjectId = 'khmer'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sound State
  const [isMuted, setIsMuted] = useState(false);

  // Selection state
  const [selectedCharacter, setSelectedCharacter] = useState<GameCharacter>(CHARACTERS[0]);
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubjectId in GAME_SUBJECTS ? initialSubjectId : 'khmer');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('k1');

  // Game UI States
  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'>('MENU');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [lives, setLives] = useState(3);
  const [maxLives, setMaxLives] = useState(3);
  const [hasShield, setHasShield] = useState(false);
  const [hasFreeze, setHasFreeze] = useState(false);
  const [hasMagnet, setHasMagnet] = useState(false);
  const [feverProgress, setFeverProgress] = useState(0);
  const [isFeverActive, setIsFeverActive] = useState(false);

  // Prompt / Target State
  const [targetPromptText, setTargetPromptText] = useState('ស្វែងរក៖ ពាក្យជានាម');
  const [questionNum, setQuestionNum] = useState(1);
  const [alertAnim, setAlertAnim] = useState(false);

  // Ref variables to avoid stale closure issues in canvas loop
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const comboRef = useRef(combo);
  comboRef.current = combo;

  const maxComboRef = useRef(maxCombo);
  maxComboRef.current = maxCombo;

  const livesRef = useRef(lives);
  livesRef.current = lives;

  const maxLivesRef = useRef(maxLives);
  maxLivesRef.current = maxLives;

  const hasShieldRef = useRef(hasShield);
  hasShieldRef.current = hasShield;

  const freezeTimerRef = useRef(0);
  const magnetTimerRef = useRef(0);
  const feverTimerRef = useRef(0);
  const feverProgressRef = useRef(0);
  const isFeverActiveRef = useRef(false);

  const currentTargetRef = useRef<PromptItem | null>(null);
  const questionCounterRef = useRef(1);
  const correctCatchInCurrentPromptRef = useRef(0);
  const selectedCharacterRef = useRef(selectedCharacter);
  selectedCharacterRef.current = selectedCharacter;

  const fallingItemsRef = useRef<FallingItem[]>([]);
  const powerupItemsRef = useRef<PowerupItem[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const starsRef = useRef<Array<{ x: number; y: number; r: number; alpha: number; speed: number }>>([]);

  const playerRef = useRef({
    x: 200,
    y: 500,
    targetX: 200,
    r: 36,
    bob: 0
  });

  const lastSpawnTimeRef = useRef(0);
  const gameTimeRef = useRef(0);

  // Sync selectedSubject with initialSubjectId when changed
  useEffect(() => {
    if (initialSubjectId in GAME_SUBJECTS) {
      setSelectedSubject(initialSubjectId);
      const topics = GAME_SUBJECTS[initialSubjectId] || [];
      if (topics.length > 0) setSelectedTopicId(topics[0].id);
    }
  }, [initialSubjectId]);

  // Update sound mute status
  useEffect(() => {
    sfx.setMuted(isMuted);
  }, [isMuted]);

  // Switch target prompt function
  const switchTargetPrompt = () => {
    const topicList = GAME_SUBJECTS[selectedSubject] || GAME_SUBJECTS['khmer'];
    const topicObj = topicList.find(t => t.id === selectedTopicId) || topicList[0];
    const prompts = topicObj.prompts;
    
    let newTarget = currentTargetRef.current;
    if (prompts.length > 1) {
      while (newTarget === currentTargetRef.current) {
        newTarget = prompts[Math.floor(Math.random() * prompts.length)];
      }
    } else {
      const allPromptsOfSubject = topicList.flatMap(t => t.prompts);
      while (newTarget === currentTargetRef.current && allPromptsOfSubject.length > 1) {
        newTarget = allPromptsOfSubject[Math.floor(Math.random() * allPromptsOfSubject.length)];
      }
    }

    const finalTarget = newTarget || prompts[0];
    currentTargetRef.current = finalTarget;
    correctCatchInCurrentPromptRef.current = 0;
    questionCounterRef.current += 1;

    setTargetPromptText(finalTarget.prompt);
    setQuestionNum(questionCounterRef.current);

    setAlertAnim(true);
    setTimeout(() => setAlertAnim(false), 800);

    sfx.playSwitchAlert();

    if (canvasRef.current) {
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      shockwavesRef.current.push(new Shockwave(w / 2, 90, '#facc15', Math.max(w, h) * 0.7));
      floatingTextsRef.current.push(new FloatingText(w / 2, h / 2 - 40, `⚡ សំណួរទី ${questionCounterRef.current}! ⚡`, '#facc15', 24));
    }
  };

  // Setup Stars
  const initStars = (w: number, h: number) => {
    const starArr = [];
    for (let i = 0; i < 70; i++) {
      starArr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.4 + 0.1
      });
    }
    starsRef.current = starArr;
  };

  // Start game handler
  const startGame = () => {

    setScore(0);
    setCombo(1);
    setMaxCombo(1);

    const charObj = selectedCharacter;
    setMaxLives(charObj.startLives);
    setLives(charObj.startLives);
    setHasShield(charObj.startShield);
    setHasFreeze(false);
    setHasMagnet(false);
    setFeverProgress(0);
    setIsFeverActive(false);

    livesRef.current = charObj.startLives;
    maxLivesRef.current = charObj.startLives;
    hasShieldRef.current = charObj.startShield;

    freezeTimerRef.current = 0;
    magnetTimerRef.current = 0;
    feverTimerRef.current = 0;
    feverProgressRef.current = 0;
    isFeverActiveRef.current = false;

    fallingItemsRef.current = [];
    powerupItemsRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    shockwavesRef.current = [];
    gameTimeRef.current = 0;
    questionCounterRef.current = 0;

    switchTargetPrompt();

    setGameState('PLAYING');
  };

  // Canvas loop
  useEffect(() => {
    if (!isOpen) return;

    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resizeC = () => {
      if (containerRef.current && cvs) {
        const rect = containerRef.current.getBoundingClientRect();
        cvs.width = rect.width;
        cvs.height = rect.height;
        playerRef.current.y = rect.height - 90;
        initStars(rect.width, rect.height);
      }
    };

    resizeC();
    window.addEventListener('resize', resizeC);

    const spawnItem = (w: number) => {
      if (!currentTargetRef.current) return;

      if (Math.random() < 0.08 && powerupItemsRef.current.length < 2) {
        powerupItemsRef.current.push(new PowerupItem(w));
      }

      const pool = currentTargetRef.current.generatePool();
      const randomValue = pool[Math.floor(Math.random() * pool.length)];
      const isCorrect = currentTargetRef.current.isCorrect(randomValue);
      fallingItemsRef.current.push(new FallingItem(w, randomValue, isCorrect, scoreRef.current));
    };

    const handleCollectPowerup = (pItem: PowerupItem, index: number) => {
      sfx.playPowerup();
      if (pItem.type === 'shield') {
        hasShieldRef.current = true;
        setHasShield(true);
        floatingTextsRef.current.push(new FloatingText(pItem.x, pItem.y, '🛡️ ទទួលបានខែល! SHIELD ON', '#38bdf8', 20));
      } else if (pItem.type === 'freeze') {
        freezeTimerRef.current = 300;
        setHasFreeze(true);
        floatingTextsRef.current.push(new FloatingText(pItem.x, pItem.y, '⏱️ ពន្យឺតពេល! FREEZE', '#0284c7', 20));
      } else if (pItem.type === 'magnet') {
        magnetTimerRef.current = 300;
        setHasMagnet(true);
        floatingTextsRef.current.push(new FloatingText(pItem.x, pItem.y, '🧲 មេដែកស្រូប! MAGNET', '#f59e0b', 20));
      } else if (pItem.type === 'heart') {
        if (livesRef.current < maxLivesRef.current) {
          livesRef.current += 1;
          setLives(livesRef.current);
          floatingTextsRef.current.push(new FloatingText(pItem.x, pItem.y, '💖 បន្ថែមជីវិត +1', '#ec4899', 20));
        }
      }

      for (let i = 0; i < 10; i++) {
        particlesRef.current.push(new Particle(pItem.x, pItem.y, '#facc15'));
      }
      powerupItemsRef.current.splice(index, 1);
    };

    const handleCollectItem = (item: FallingItem, index: number) => {
      if (item.isCorrect) {
        sfx.playCatch();
        const earnedScore = Math.round(10 * comboRef.current * selectedCharacterRef.current.scoreBonus);
        const newScore = scoreRef.current + earnedScore;
        const newCombo = comboRef.current + 1;
        scoreRef.current = newScore;
        comboRef.current = newCombo;
        setScore(newScore);
        setCombo(newCombo);

        if (newCombo > maxComboRef.current) {
          maxComboRef.current = newCombo;
          setMaxCombo(newCombo);
        }

        correctCatchInCurrentPromptRef.current += 1;

        if (newCombo % 3 === 0 && cvs) {
          const praise = PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)];
          floatingTextsRef.current.push(new FloatingText(cvs.width / 2, cvs.height / 2, praise, '#facc15', 26));
        }

        if (!isFeverActiveRef.current) {
          const newFever = Math.min(100, feverProgressRef.current + 12);
          feverProgressRef.current = newFever;
          setFeverProgress(newFever);

          if (newFever >= 100) {
            isFeverActiveRef.current = true;
            feverTimerRef.current = 300;
            setIsFeverActive(true);
            sfx.playFever();
          }
        }

        for (let i = 0; i < 12; i++) {
          particlesRef.current.push(new Particle(item.x, item.y, '#22c55e'));
        }
        floatingTextsRef.current.push(new FloatingText(item.x, item.y, `ត្រូវហើយ! +${earnedScore}`, '#22c55e', 20));

        if (correctCatchInCurrentPromptRef.current >= 5) {
          switchTargetPrompt();
        }

      } else {
        if (hasShieldRef.current) {
          hasShieldRef.current = false;
          setHasShield(false);
          sfx.playPowerup();
          floatingTextsRef.current.push(new FloatingText(item.x, item.y, '🛡️ ខែលបានការពារ! SHIELD ABSORBED', '#38bdf8', 20));
        } else {
          sfx.playWrong();
          comboRef.current = 1;
          setCombo(1);
          livesRef.current -= 1;
          setLives(livesRef.current);

          for (let i = 0; i < 14; i++) {
            particlesRef.current.push(new Particle(item.x, item.y, '#ef4444'));
          }
          floatingTextsRef.current.push(new FloatingText(item.x, item.y, 'ខុសហើយ! WRONG', '#ef4444', 20));

          if (livesRef.current <= 0) {
            setGameState('GAMEOVER');
          }
        }
      }

      fallingItemsRef.current.splice(index, 1);
    };

    const renderLoop = (timestamp: number) => {
      const width = cvs.width;
      const height = cvs.height;

      if (gameStateRef.current === 'PLAYING') {
        gameTimeRef.current += 1;

        // Draw Background
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height));
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(0.6, '#090d16');
        bgGrad.addColorStop(1, '#020408');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Stars
        ctx.fillStyle = '#ffffff';
        starsRef.current.forEach(star => {
          star.y += star.speed * (freezeTimerRef.current > 0 ? 0.3 : 1);
          if (star.y > height) star.y = 0;
          ctx.save();
          ctx.globalAlpha = star.alpha;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Perspective Grid
        ctx.save();
        ctx.strokeStyle = freezeTimerRef.current > 0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(56, 189, 248, 0.08)';
        ctx.lineWidth = 1;
        const horizonY = height * 0.75;
        
        for (let x = -width; x < width * 2; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(width / 2 + (x - width / 2) * 0.1, horizonY);
          ctx.stroke();
        }

        for (let y = horizonY; y < height; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        ctx.restore();

        // Spawn Items
        if (timestamp - lastSpawnTimeRef.current > Math.max(600, 1400 - scoreRef.current)) {
          spawnItem(width);
          lastSpawnTimeRef.current = timestamp;
        }

        if (gameTimeRef.current % 1500 === 0) {
          switchTargetPrompt();
        }

        if (freezeTimerRef.current > 0) {
          freezeTimerRef.current -= 1;
          if (freezeTimerRef.current <= 0) setHasFreeze(false);
        }

        if (magnetTimerRef.current > 0) {
          magnetTimerRef.current -= 1;
          if (magnetTimerRef.current <= 0) setHasMagnet(false);
        }

        if (isFeverActiveRef.current) {
          feverTimerRef.current -= 1;
          const prog = (feverTimerRef.current / 300) * 100;
          feverProgressRef.current = prog;
          setFeverProgress(prog);
          if (feverTimerRef.current <= 0) {
            isFeverActiveRef.current = false;
            setIsFeverActive(false);
            feverProgressRef.current = 0;
            setFeverProgress(0);
          }
        }

        // Draw Shockwaves
        shockwavesRef.current.forEach((sw, idx) => {
          sw.update();
          sw.draw(ctx);
          if (sw.alpha <= 0) shockwavesRef.current.splice(idx, 1);
        });

        // Draw Particles
        particlesRef.current.forEach((p, idx) => {
          p.update();
          p.draw(ctx);
          if (p.alpha <= 0) particlesRef.current.splice(idx, 1);
        });

        // Draw Floating Texts
        floatingTextsRef.current.forEach((ft, idx) => {
          ft.update();
          ft.draw(ctx);
          if (ft.alpha <= 0) floatingTextsRef.current.splice(idx, 1);
        });

        const player = playerRef.current;

        // Draw Powerup Items
        powerupItemsRef.current.forEach((pItem, idx) => {
          pItem.update();
          pItem.draw(ctx);

          const dx = pItem.x - player.x;
          const dy = pItem.y - player.y;
          const dist = Math.hypot(dx, dy);

          if (dist < pItem.r + player.r + 10) {
            handleCollectPowerup(pItem, idx);
          } else if (pItem.y > height + 50) {
            powerupItemsRef.current.splice(idx, 1);
          }
        });

        // Draw Falling Items
        fallingItemsRef.current.forEach((item, idx) => {
          item.update(
            freezeTimerRef.current,
            isFeverActiveRef.current,
            magnetTimerRef.current,
            selectedCharacterRef.current.magnetPassive,
            player.x,
            player.y
          );
          item.draw(ctx);

          const dx = item.x - player.x;
          const dy = item.y - player.y;
          const dist = Math.hypot(dx, dy);

          if (dist < item.r + player.r + 10) {
            handleCollectItem(item, idx);
          } else if (item.y > height + 50) {
            if (item.isCorrect && !isFeverActiveRef.current) {
              comboRef.current = 1;
              setCombo(1);
            }
            fallingItemsRef.current.splice(idx, 1);
          }
        });

        // Draw Player Character
        const lerpSpeed = 0.4 * selectedCharacterRef.current.speedMultiplier;
        player.x += (player.targetX - player.x) * lerpSpeed;
        player.bob += 0.08;
        const bobY = player.y + Math.sin(player.bob) * 3;

        ctx.save();

        // Trailing Line
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.2)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(player.x, bobY - player.r);
        ctx.lineTo(player.x, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        // Shield
        if (hasShieldRef.current) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 4;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(player.x, bobY, player.r + 14, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Character Aura
        const auraRadius = player.r + (isFeverActiveRef.current ? 30 : 18) + Math.sin(player.bob * 2) * 3;
        const auraGrad = ctx.createRadialGradient(player.x, bobY, player.r * 0.3, player.x, bobY, auraRadius);
        auraGrad.addColorStop(0, selectedCharacterRef.current.color + 'dd');
        auraGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(player.x, bobY, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        // Body Gradient
        const bodyGrad = ctx.createLinearGradient(
          player.x - player.r, bobY - player.r, 
          player.x + player.r, bobY + player.r
        );
        bodyGrad.addColorStop(0, '#ffffff');
        bodyGrad.addColorStop(0.3, selectedCharacterRef.current.color);
        bodyGrad.addColorStop(1, '#000000');

        ctx.fillStyle = bodyGrad;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(player.x, bobY, player.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Emoji Icon
        ctx.font = `${player.r * 1.1}px "Kantumruy Pro", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(selectedCharacterRef.current.icon, player.x, bobY);

        ctx.restore();
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeC);
    };
  }, [isOpen]);

  // Handle Touch/Mouse input
  const updatePointerPosition = (clientX: number, clientY: number) => {
    if (gameStateRef.current !== 'PLAYING') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const posX = (clientX - rect.left) * (cvs.width / rect.width);
    const posY = (clientY - rect.top) * (cvs.height / rect.height);

    for (let i = fallingItemsRef.current.length - 1; i >= 0; i--) {
      const item = fallingItemsRef.current[i];
      const dist = Math.hypot(item.x - posX, item.y - posY);
      if (dist < item.r + 25) {
        // Collect directly if tapped
        return;
      }
    }

    playerRef.current.targetX = Math.max(playerRef.current.r, Math.min(cvs.width - playerRef.current.r, posX));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameState === 'PLAYING' && e.touches.length > 0) {
      updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameState === 'PLAYING' && e.touches.length > 0) {
      updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (gameState === 'PLAYING') {
      updatePointerPosition(e.clientX, e.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameState === 'PLAYING') {
      updatePointerPosition(e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current === 'PLAYING') {
        const player = playerRef.current;
        const cvs = canvasRef.current;
        const maxW = cvs ? cvs.width : 500;
        if (e.key === 'ArrowLeft') {
          player.targetX = Math.max(player.r, player.targetX - 40);
        } else if (e.key === 'ArrowRight') {
          player.targetX = Math.min(maxW - player.r, player.targetX + 40);
        } else if (e.key === 'p' || e.key === 'P') {
          setGameState(prev => prev === 'PLAYING' ? 'PAUSED' : 'PLAYING');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-center items-center overflow-hidden touch-none select-none">
      
      {/* Container wrapper */}
      <div 
        ref={containerRef}
        className="relative w-full h-full max-w-5xl max-h-[1000px] flex flex-col justify-between overflow-hidden bg-slate-950 border border-amber-500/30 shadow-[0_0_50px_rgba(250,204,21,0.15)] sm:rounded-3xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >

        {/* Top Marquee Banner */}
        <div className="absolute top-0 left-0 w-full bg-slate-950/90 border-b border-amber-500/40 text-amber-300 py-1 px-3 z-20 overflow-hidden text-xs font-bold flex items-center shadow-[0_0_15px_rgba(250,204,21,0.2)] backdrop-blur-md">
          <div className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black mr-2 uppercase tracking-wider shrink-0 z-10 shadow-sm flex items-center gap-1">
            <Info className="w-3 h-3" /> ការណែនាំ
          </div>
          <div className="overflow-hidden w-full relative flex items-center">
            <div className="whitespace-nowrap animate-marquee flex gap-8 items-center text-[11px] sm:text-xs">
              <span>💡 <b>កម្រិតនៃការលេង៖</b> គួរលេងត្រឹមតែ ១៥ ទៅ ៣០ នាទីក្នុងមួយថ្ងៃ ដើម្បីរំលឹកមេរៀន និងកម្សាន្តអារម្មណ៍!</span>
              <span>👁️ <b>សុខភាពភ្នែក៖</b> សូមរក្សាចម្ងាយភ្នែកពីអេក្រង់យ៉ាងតិច ៣០ សង់ទីម៉ែត្រ និងសម្រាកភ្នែក ៥ នាទី!</span>
              <span>🎓 <b>ស្មារតីរៀនសូត្រ៖</b> ផ្តោតអារម្មណ៍អានសំណួរឱ្យច្បាស់លាស់ មុននឹងសម្រេចចិត្តចាប់យកចម្លើយត្រឹមត្រូវ!</span>
            </div>
          </div>

          {/* Sound & Close Buttons */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0 z-20">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              title={isMuted ? 'បើកសំឡេង' : 'បិទសំឡេង'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition"
              title="បិទហ្គេម"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Canvas Background Engine */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* HUD UI overlay when PLAYING or PAUSED */}
        {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
          <>
            {/* Top HUD Bar */}
            <div className="absolute top-9 left-0 w-full p-2.5 sm:p-4 flex justify-between items-start pointer-events-none z-10">
              
              {/* Score Box */}
              <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.2)] flex flex-col items-start min-w-[90px] sm:min-w-[120px]">
                <span className="text-[10px] sm:text-xs text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3 text-sky-400 fill-sky-400" /> ពិន្ទុ / SCORE
                </span>
                <span className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] mt-0.5">
                  {score}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-amber-400 mt-0.5 tracking-wide">
                  COMBO x{combo}
                </span>
              </div>

              {/* Target Banner */}
              <div className={`bg-slate-900/90 backdrop-blur-md rounded-2xl px-3 py-2 sm:px-5 sm:py-3 border border-amber-400/60 shadow-[0_0_20px_rgba(250,204,21,0.3)] flex flex-col items-center max-w-[60%] text-center transition-all duration-300 pointer-events-auto ${alertAnim ? 'scale-110 shadow-[0_0_40px_rgba(250,204,21,0.8)]' : ''}`}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-xs text-yellow-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
                    <Target className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} /> គោលដៅ
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 px-2 py-0.5 rounded-full">
                    សំណួរទី {questionNum}
                  </span>
                  <button 
                    onClick={switchTargetPrompt}
                    className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/50 active:scale-95 transition cursor-pointer flex items-center gap-1" 
                    title="ប្តូរសំណួរថ្មី"
                  >
                    <RotateCcw className="w-2.5 h-2.5" /> ដូរ
                  </button>
                </div>
                <span className="text-xs sm:text-base font-black text-amber-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] mt-0.5 line-clamp-1">
                  {targetPromptText}
                </span>
              </div>

              {/* Lives & Pause */}
              <div className="flex flex-col items-end gap-2 pointer-events-auto">
                <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)] flex flex-col items-end">
                  <div className="flex items-center gap-1.5">
                    {hasShield && (
                      <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1 animate-pulse">
                        <Shield className="w-3 h-3" /> ខែល
                      </span>
                    )}
                    <span className="text-[10px] sm:text-xs text-rose-400 font-bold uppercase tracking-wider">
                      ជីវិត / LIVES
                    </span>
                  </div>
                  <div className="flex gap-1 text-rose-500 text-sm sm:text-base mt-1">
                    {Array.from({ length: maxLives }).map((_, i) => (
                      <Heart 
                        key={i} 
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < lives ? 'fill-rose-500 text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]' : 'text-slate-600 opacity-40'}`} 
                      />
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setGameState(prev => prev === 'PLAYING' ? 'PAUSED' : 'PLAYING')} 
                  className="bg-slate-900/80 hover:bg-slate-800 text-slate-200 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-slate-700 active:scale-90 transition cursor-pointer shadow-lg"
                >
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

            </div>

            {/* Active Powerups Badges */}
            <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none z-10">
              {hasFreeze && (
                <div className="bg-sky-500/20 border border-sky-400/60 px-3 py-1 rounded-full text-xs font-bold text-sky-300 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                  <Zap className="w-3.5 h-3.5 animate-spin text-sky-400" /> ពេលវេលាយឺត
                </div>
              )}
              {hasMagnet && (
                <div className="bg-amber-500/20 border border-amber-400/60 px-3 py-1 rounded-full text-xs font-bold text-amber-300 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                  <Sparkles className="w-3.5 h-3.5 animate-bounce text-amber-400" /> មេដែកស្រូប
                </div>
              )}
            </div>

            {/* Fever Bar */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] max-w-md pointer-events-none z-10">
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-black text-amber-300 mb-1 px-1 tracking-wide">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-yellow-400 animate-bounce" /> FEVER MODE (ថាមពល)
                </span>
                <span className="drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                  {isFeverActive ? 'ACTIVE! 🔥' : `${Math.floor(feverProgress)}%`}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-950/90 rounded-full border border-amber-500/60 p-0.5 overflow-hidden shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-200" 
                  style={{ width: `${feverProgress}%` }}
                />
              </div>
            </div>
          </>
        )}

        {/* 4. START MENU MODAL */}
        {gameState === 'MENU' && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 z-30 pt-10">
            <div className="max-w-md w-full bg-slate-900/90 border border-yellow-500/50 rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(250,204,21,0.25)] text-center relative overflow-hidden max-h-[90vh] flex flex-col">
              
              <div className="inline-flex p-2.5 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-600/10 border border-yellow-500/40 text-yellow-400 text-2xl mb-1 shadow-[0_0_20px_rgba(250,204,21,0.3)] mx-auto">
                <Crown className="w-7 h-7 text-amber-400" />
              </div>
              
              <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 mb-0.5 tracking-wide">
                វិជ្ជានាវា៖ ល្បងប្រាជ្ញាចិន្តា
              </h1>
              <p className="text-[11px] text-slate-300 mb-3">កម្មវិធីហ្គេមអប់រំថ្នាក់ទី៦ (VIJJA NAVA GRADE 6)</p>

              {/* Scrollable Area */}
              <div className="overflow-y-auto pr-1 flex-1 text-left mb-3 space-y-3">
                
                {/* STEP 1: SUBJECT SELECTOR */}
                <div>
                  <label className="block text-[11px] font-black text-sky-400 uppercase tracking-widest mb-1.5">
                    ១. ជ្រើសរើសមុខវិជ្ជា (Subject):
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubject('khmer');
                        const topics = GAME_SUBJECTS['khmer'] || [];
                        if (topics.length > 0) setSelectedTopicId(topics[0].id);
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border font-bold text-[11px] cursor-pointer transition ${
                        selectedSubject === 'khmer' 
                          ? 'border-yellow-500 bg-yellow-500/20 text-white' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
                      <span>ភាសាខ្មែរ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubject('english');
                        const topics = GAME_SUBJECTS['english'] || [];
                        if (topics.length > 0) setSelectedTopicId(topics[0].id);
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border font-bold text-[11px] cursor-pointer transition ${
                        selectedSubject === 'english' 
                          ? 'border-yellow-500 bg-yellow-500/20 text-white' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>អង់គ្លេស</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubject('social');
                        const topics = GAME_SUBJECTS['social'] || [];
                        if (topics.length > 0) setSelectedTopicId(topics[0].id);
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border font-bold text-[11px] cursor-pointer transition ${
                        selectedSubject === 'social' 
                          ? 'border-yellow-500 bg-yellow-500/20 text-white' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>សិក្សាសង្គម</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubject('health');
                        const topics = GAME_SUBJECTS['health'] || [];
                        if (topics.length > 0) setSelectedTopicId(topics[0].id);
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border font-bold text-[11px] cursor-pointer transition ${
                        selectedSubject === 'health' 
                          ? 'border-yellow-500 bg-yellow-500/20 text-white' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      <span>សុខភាព</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubject('math');
                        const topics = GAME_SUBJECTS['math'] || [];
                        if (topics.length > 0) setSelectedTopicId(topics[0].id);
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border font-bold text-[11px] cursor-pointer transition ${
                        selectedSubject === 'math' 
                          ? 'border-yellow-500 bg-yellow-500/20 text-white' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>គណិតវិទ្យា</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubject('science');
                        const topics = GAME_SUBJECTS['science'] || [];
                        if (topics.length > 0) setSelectedTopicId(topics[0].id);
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border font-bold text-[11px] cursor-pointer transition ${
                        selectedSubject === 'science' 
                          ? 'border-yellow-500 bg-yellow-500/20 text-white' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-teal-400" />
                      <span>វិទ្យាសាស្ត្រ</span>
                    </button>

                  </div>
                </div>

                {/* STEP 2: TOPIC SELECTOR */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[11px] font-black text-amber-300 uppercase tracking-widest">
                      ២. ជ្រើសរើសប្រធានបទ (Topics):
                    </label>
                    <span className="text-[9px] font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/30">
                      {(GAME_SUBJECTS[selectedSubject] || []).length} ប្រធានបទ
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-[130px] overflow-y-auto pr-1">
                    {(GAME_SUBJECTS[selectedSubject] || []).map(topic => {
                      const isSelected = topic.id === selectedTopicId;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => setSelectedTopicId(topic.id)}
                          className={`flex items-center justify-between p-2 rounded-xl border text-[11px] font-bold transition cursor-pointer ${
                            isSelected 
                              ? 'border-amber-400 bg-amber-400/20 text-white' 
                              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <span className="line-clamp-1">{topic.title}</span>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-transparent'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={startGame}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-[0_0_25px_rgba(250,204,21,0.5)] active:scale-95 transition cursor-pointer tracking-wider flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" /> ចាប់ផ្តើមប្រកួត (START GAME)
              </button>

            </div>
          </div>
        )}

        {/* 5. PAUSE MENU */}
        {gameState === 'PAUSED' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-30">
            <div className="max-w-xs w-full bg-slate-900/90 border border-slate-700 rounded-3xl p-6 text-center shadow-2xl">
              <h2 className="text-xl font-black text-white mb-5 flex items-center justify-center gap-2">
                <Pause className="w-5 h-5 text-amber-400" /> ផ្អាកហ្គេម (PAUSED)
              </h2>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setGameState('PLAYING')}
                  className="py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-2xl transition cursor-pointer shadow-lg"
                >
                  បន្តលេង (Resume)
                </button>
                <button
                  type="button"
                  onClick={startGame}
                  className="py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl border border-slate-600/80 transition cursor-pointer"
                >
                  លេងឡើងវិញ (Restart)
                </button>
                <button
                  type="button"
                  onClick={() => setGameState('MENU')}
                  className="py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-2xl border border-rose-500/40 transition cursor-pointer"
                >
                  ទំព័រដើម (Main Menu)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. GAME OVER MODAL */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 z-30">
            <div className="max-w-md w-full bg-slate-900/90 border border-rose-500/50 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(244,63,94,0.3)]">
              
              <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-3xl mb-4 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <Trophy className="w-8 h-8 text-rose-400" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1.5">បញ្ចប់ហ្គេម (GAME OVER)</h2>
              <p className="text-xs text-slate-400 mb-6">ការប្រកួតត្រូវបានបញ្ចប់! នេះជាលទ្ធផលរបស់អ្នក៖</p>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-6 grid grid-cols-2 gap-3 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">ពិន្ទុសរុប (FINAL SCORE)</span>
                  <span className="text-2xl font-black text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">{score}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black block">កម្ពស់កុំបូ (MAX COMBO)</span>
                  <span className="text-2xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">x{maxCombo}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={startGame}
                  className="flex-1 py-3.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 text-slate-950 font-black rounded-2xl shadow-[0_0_25px_rgba(250,204,21,0.4)] transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> លេងម្តងទៀត
                </button>
                <button
                  type="button"
                  onClick={() => setGameState('MENU')}
                  className="py-3.5 px-5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl border border-slate-600 transition cursor-pointer flex items-center justify-center"
                >
                  <Home className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
