export type CharacterGesture = 'sampeah' | 'wave' | 'peace' | 'love' | 'heart_hands' | 'raise_hand' | 'bow';
export type CharacterExpression = 'cute_sparkle' | 'wink' | 'joy' | 'cat_mouth' | 'star_eyes';

export interface FullBodyCharacter {
  id: string;
  name: string;
  title: string;
  category: 'school' | 'culture' | 'hero' | 'magic' | 'tech' | 'animal' | 'sports' | 'profession';
  categoryLabel: string;
  danceStyle: 
    | 'robam-khmer' 
    | 'hip-hop' 
    | 'disco-spin' 
    | 'robot' 
    | 'salsa' 
    | 'victory-jump' 
    | 'moonwalk' 
    | 'breakdance' 
    | 'magic-float' 
    | 'kun-khmer' 
    | 'kpop-bounce' 
    | 'floss-dance' 
    | 'twister' 
    | 'wave-dance';
  danceNameKhmer: string;
  danceDescription: string;
  soundBeat: 'upbeat' | 'khmer-tro' | 'electro-pop' | 'funky-disco' | 'hero-march' | 'magic-chime' | 'rock-drum' | 'latin-samba';
  catchphrase: string;
  badgeEmoji: string;
  gender: 'boy' | 'girl' | 'robot' | 'animal' | 'fantasy';
  colors: {
    skin: string;
    hair: string;
    outfitTop: string;
    outfitBottom: string;
    shoes: string;
    accent: string;
    bgGradient: string;
    border: string;
  };
  features: {
    hairStyle: 'short' | 'ponytail' | 'curly' | 'bun' | 'spiky' | 'crown' | 'helmet' | 'ears' | 'cap';
    glasses?: boolean;
    accessory?: 'backpack' | 'violin' | 'flask' | 'books' | 'ball' | 'headphone' | 'cape' | 'wand' | 'staff' | 'laptop' | 'trophy' | 'none';
    outfitType: 'uniform' | 'apsara' | 'boxer' | 'sports' | 'space' | 'doctor' | 'wizard' | 'robot' | 'hero' | 'casual' | 'fur' | 'police' | 'chef' | 'firefighter' | 'bride' | 'groom' | 'ninja' | 'hijab' | 'santa' | 'vampire';
    gesture?: CharacterGesture;
    expression?: CharacterExpression;
  };
}

export const CHARACTERS_DATA: FullBodyCharacter[] = [
  // 1. សិស្សសាលា & យុវជន (1-8)
  {
    id: 'char_1',
    name: 'សុខា (Sokha)',
    title: 'សិស្សប្រុសឆ្នើមថ្នាក់ទី៦',
    category: 'school',
    categoryLabel: 'សិស្សសាលា & យុវជន',
    danceStyle: 'hip-hop',
    danceNameKhmer: 'រាំញ័រស្មាស្ទីល Hip-Hop លើកដៃសំពះ',
    danceDescription: 'រាំលោតចុះឡើងតាមចង្វាក់ Hip-Hop និងសំពះជម្រាបសួរយ៉ាងគួរឲ្យស្រឡាញ់!',
    soundBeat: 'upbeat',
    catchphrase: 'តោះរៀនជាមួយខ្ញុំ! ប្រឡងយកនិទ្ទេស A ទាំងអស់គ្នា! 🙏',
    badgeEmoji: '👦',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#2d1a0e',
      outfitTop: '#2563eb',
      outfitBottom: '#1e293b',
      shoes: '#ef4444',
      accent: '#3b82f6',
      bgGradient: 'from-blue-500 to-indigo-600',
      border: 'border-blue-400'
    },
    features: {
      hairStyle: 'short',
      glasses: true,
      accessory: 'backpack',
      outfitType: 'uniform',
      gesture: 'sampeah',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_2',
    name: 'កល្យាណ (Kalyan)',
    title: 'សិស្សស្រីឆ្នើមថ្នាក់ទី៦',
    category: 'school',
    categoryLabel: 'សិស្សសាលា & យុវជន',
    danceStyle: 'kpop-bounce',
    danceNameKhmer: 'រាំស្ទីល K-Pop ធ្វើដៃរូបបេះដូង',
    danceDescription: 'រាំពត់ពេនញញឹមស្រស់ និងធ្វើសញ្ញាបេះដូងជូនមិត្តៗ! 💖',
    soundBeat: 'electro-pop',
    catchphrase: 'ការសិក្សាគឺជាពន្លឺនៃជីវិត! តោះខិតខំទាំងអស់គ្នា! 🫶',
    badgeEmoji: '👧',
    gender: 'girl',
    colors: {
      skin: '#fcd34d',
      hair: '#451a03',
      outfitTop: '#ec4899',
      outfitBottom: '#831843',
      shoes: '#f43f5e',
      accent: '#f472b6',
      bgGradient: 'from-pink-500 to-rose-600',
      border: 'border-pink-400'
    },
    features: {
      hairStyle: 'ponytail',
      glasses: false,
      accessory: 'books',
      outfitType: 'uniform',
      gesture: 'heart_hands',
      expression: 'wink'
    }
  },
  {
    id: 'char_3',
    name: 'វិចិត្រ (Vicheat)',
    title: 'យុវជនសិល្បករគូររូប 🧑🏻‍🎨',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'twister',
    danceNameKhmer: 'រាំគ្រវីជក់គូររូប ធ្វើសញ្ញាសន្តិភាព',
    danceDescription: 'រាំគ្រវីចង្កេះ បង្វិលជក់គូររូប និងធ្វើសញ្ញាសន្តិភាព ✌️',
    soundBeat: 'funky-disco',
    catchphrase: 'ពិភពលោកពេញដោយពណ៌ស្រស់ស្អាតនៅពេលយើងរៀនសូត្រ! 🎨',
    badgeEmoji: '🧑🏻‍🎨',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#7c2d12',
      outfitTop: '#10b981',
      outfitBottom: '#064e3b',
      shoes: '#fbbf24',
      accent: '#34d399',
      bgGradient: 'from-emerald-500 to-teal-700',
      border: 'border-emerald-400'
    },
    features: {
      hairStyle: 'cap',
      accessory: 'laptop',
      outfitType: 'casual',
      gesture: 'peace',
      expression: 'joy'
    }
  },
  {
    id: 'char_4',
    name: 'ចិន្តា (Chenda - 🙋🏻‍♀️)',
    title: 'សិស្សឆ្នើមលើកដៃឆ្លើយ',
    category: 'school',
    categoryLabel: 'សិស្សសាលា & យុវជន',
    danceStyle: 'victory-jump',
    danceNameKhmer: 'រាំលើកដៃសួរ និងលោតអបអរសាទរ',
    danceDescription: 'លើកដៃឆ្លើយសំណួរយ៉ាងក្លាហាន និងរាំលោតសប្បាយ!',
    soundBeat: 'upbeat',
    catchphrase: 'ខ្ញុំដឹងចម្លើយ! ខ្ញុំស្រឡាញ់ការរៀនសូត្រ! 🙋🏻‍♀️',
    badgeEmoji: '🙋🏻‍♀️',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#1e1b4b',
      outfitTop: '#8b5cf6',
      outfitBottom: '#4c1d95',
      shoes: '#a855f7',
      accent: '#c084fc',
      bgGradient: 'from-purple-500 to-indigo-700',
      border: 'border-purple-400'
    },
    features: {
      hairStyle: 'bun',
      accessory: 'books',
      outfitType: 'uniform',
      gesture: 'raise_hand',
      expression: 'star_eyes'
    }
  },
  {
    id: 'char_5',
    name: 'បុប្ផាក្រមុំ (Bopha - 🙇🏼‍♀️)',
    title: 'សិស្សស្រីរៀបរយគោរពគារវកិច្ច',
    category: 'school',
    categoryLabel: 'សិស្សសាលា & យុវជន',
    danceStyle: 'wave-dance',
    danceNameKhmer: 'រាំអោនក្បាលគោរពលោកគ្រូអ្នកគ្រូ',
    danceDescription: 'អោនក្បាលគោរពយ៉ាងសុភាពរៀបរយ និងញញឹមស្រស់!',
    soundBeat: 'magic-chime',
    catchphrase: 'គារវកិច្ច និងសុជីវធម៌ គឺជាគុណធម៌របស់សិស្ស! 🙇🏼‍♀️',
    badgeEmoji: '🙇🏼‍♀️',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#0f172a',
      outfitTop: '#06b6d4',
      outfitBottom: '#164e63',
      shoes: '#0891b2',
      accent: '#67e8f9',
      bgGradient: 'from-sky-500 to-teal-700',
      border: 'border-sky-400'
    },
    features: {
      hairStyle: 'ponytail',
      glasses: true,
      accessory: 'books',
      outfitType: 'uniform',
      gesture: 'bow',
      expression: 'cute_sparkle'
    }
  },

  // 2. អាជីព & មុខរបរ (Professions: Police, Doctor, Chef, Teacher, Engineer, Firefighter, etc.)
  {
    id: 'char_police',
    name: 'នគរបាលសុវត្ថិភាព (Police - 👮🏻)',
    title: 'នគរបាលការពារសន្តិសុខ',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'victory-jump',
    danceNameKhmer: 'រាំក្បាច់នគរបាលលើកដៃគារវកិច្ច',
    danceDescription: 'រាំយ៉ាងម៉ឺងម៉ាត់ និងលើកដៃគារវកិច្ចការពារសន្តិសុខ!',
    soundBeat: 'hero-march',
    catchphrase: 'ការពារសុវត្ថិភាពសង្គម និងសិស្សានុសិស្សជានិច្ច! 👮🏻',
    badgeEmoji: '👮🏻',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#0f172a',
      outfitTop: '#1e3a8a',
      outfitBottom: '#172554',
      shoes: '#020617',
      accent: '#3b82f6',
      bgGradient: 'from-blue-700 to-slate-900',
      border: 'border-blue-400'
    },
    features: {
      hairStyle: 'short',
      outfitType: 'police',
      gesture: 'sampeah',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_detective',
    name: 'ស៊ើបអង្កេតឆ្លាត (Detective - 🕵️‍♀️)',
    title: 'អ្នកស៊ើបអង្កេតអាថ៌កំបាំង',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'robot',
    danceNameKhmer: 'រាំក្បាច់ស៊ើបអង្កេតរកតម្រុយ',
    danceDescription: 'ដើរស្វែងរកតម្រុយមេរៀន និងអាថ៌កំបាំងវិទ្យាសាស្ត្រ!',
    soundBeat: 'electro-pop',
    catchphrase: 'គ្មានអាថ៌កំបាំងណាដែលយើងដោះស្រាយមិនបានទេ! 🕵️‍♀️',
    badgeEmoji: '🕵️‍♀️',
    gender: 'girl',
    colors: {
      skin: '#fcd34d',
      hair: '#451a03',
      outfitTop: '#78350f',
      outfitBottom: '#451a03',
      shoes: '#292524',
      accent: '#fbbf24',
      bgGradient: 'from-amber-700 to-stone-900',
      border: 'border-amber-400'
    },
    features: {
      hairStyle: 'bun',
      glasses: true,
      accessory: 'books',
      outfitType: 'casual',
      gesture: 'peace',
      expression: 'wink'
    }
  },
  {
    id: 'char_doctor',
    name: 'គ្រូពេទ្យចិត្តល្អ (Doctor - 👩🏼‍⚕️)',
    title: 'វេជ្ជបណ្ឌិតថែទាំសុខភាព',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'wave-dance',
    danceNameKhmer: 'រាំក្បាច់គ្រូពេទ្យធ្វើសញ្ញាបេះដូង',
    danceDescription: 'រាំទន់ភ្លន់ និងធ្វើសញ្ញាបេះដូងជូនពរសុខភាពល្អ! 💖',
    soundBeat: 'magic-chime',
    catchphrase: 'សុខភាពមាំមួន ប្រាជ្ញាភ្លឺថ្លា! ថែទាំខ្លួនឲ្យបានល្អ! 👩🏼‍⚕️',
    badgeEmoji: '👩🏼‍⚕️',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#d97706',
      outfitTop: '#ffffff',
      outfitBottom: '#0284c7',
      shoes: '#0369a1',
      accent: '#38bdf8',
      bgGradient: 'from-sky-400 to-blue-700',
      border: 'border-sky-300'
    },
    features: {
      hairStyle: 'ponytail',
      glasses: true,
      outfitType: 'doctor',
      gesture: 'heart_hands',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_chef',
    name: 'ចុងភៅឆ្នើម (Chef - 👨‍🍳)',
    title: 'មេចុងភៅធ្វើម្ហូបឆ្ងាញ់',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'salsa',
    danceNameKhmer: 'រាំក្រវីស្លាបព្រានិងធ្វើម្ហូប',
    danceDescription: 'រាំចង្វាក់ Salsa ក្រវីស្លាបព្រានិងចម្អិនអាហារ!',
    soundBeat: 'latin-samba',
    catchphrase: 'អាហារមានជីវជាតិ ធ្វើឲ្យខួរក្បាលឆ្លាតវៃ! 👨‍🍳',
    badgeEmoji: '👨‍🍳',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#1e293b',
      outfitTop: '#f8fafc',
      outfitBottom: '#0f172a',
      shoes: '#dc2626',
      accent: '#ef4444',
      bgGradient: 'from-rose-500 to-red-800',
      border: 'border-rose-400'
    },
    features: {
      hairStyle: 'short',
      outfitType: 'chef',
      gesture: 'wave',
      expression: 'joy'
    }
  },
  {
    id: 'char_singer',
    name: 'តារាចម្រៀងផ្កាយ (Singer - 👩‍🎤)',
    title: 'អ្នកចម្រៀងវ័យក្មេង',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'kpop-bounce',
    danceNameKhmer: 'រាំច្រៀងកាន់មីក្រូហ្វូន ស្ទីល K-Pop',
    danceDescription: 'កាន់មីក្រូហ្វូន ច្រៀង និងរាំធ្វើដៃរូបបេះដូង!',
    soundBeat: 'electro-pop',
    catchphrase: 'តន្ត្រី និងការសិក្សាធ្វើឲ្យពិភពលោកស្រស់បំព្រង! 👩‍🎤',
    badgeEmoji: '👩‍🎤',
    gender: 'girl',
    colors: {
      skin: '#fcd34d',
      hair: '#c084fc',
      outfitTop: '#ec4899',
      outfitBottom: '#be185d',
      shoes: '#f43f5e',
      accent: '#f472b6',
      bgGradient: 'from-fuchsia-500 to-pink-700',
      border: 'border-fuchsia-400'
    },
    features: {
      hairStyle: 'spiky',
      accessory: 'headphone',
      outfitType: 'casual',
      gesture: 'love',
      expression: 'star_eyes'
    }
  },
  {
    id: 'char_teacher_m',
    name: 'លោកគ្រូប្រាជ្ញា (Teacher - 👨🏼‍🏫)',
    title: 'គ្រូបង្រៀនគំរូ',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'wave-dance',
    danceNameKhmer: 'រាំក្បាច់លោកគ្រូពន្យល់មេរៀន',
    danceDescription: 'រាំទន់ភ្លន់ អោនក្បាលគោរព និងពន្យល់មេរៀនយ៉ាងច្បាស់!',
    soundBeat: 'upbeat',
    catchphrase: 'ចំណេះដឹងគឺជាទ្រព្យសម្បត្តិដែលគ្មាននរណាលួចបានឡើយ! 👨🏼‍🏫',
    badgeEmoji: '👨🏼‍🏫',
    gender: 'boy',
    colors: {
      skin: '#fed7aa',
      hair: '#451a03',
      outfitTop: '#2563eb',
      outfitBottom: '#1e3a8a',
      shoes: '#1e1b4b',
      accent: '#60a5fa',
      bgGradient: 'from-blue-600 to-slate-800',
      border: 'border-blue-300'
    },
    features: {
      hairStyle: 'short',
      glasses: true,
      accessory: 'books',
      outfitType: 'uniform',
      gesture: 'sampeah',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_teacher_f',
    name: 'អ្នកគ្រូវិមល (Teacher - 👩🏻‍🏫)',
    title: 'អ្នកគ្រូបង្រៀនចិត្តល្អ',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'robam-khmer',
    danceNameKhmer: 'រាំក្បាច់អ្នកគ្រូសំពះស្វាគមន៍',
    danceDescription: 'សំពះស្វាគមន៍សិស្សានុសិស្ស និងរាំយ៉ាងល្វត់ល្វន់!',
    soundBeat: 'khmer-tro',
    catchphrase: 'សូមស្វាគមន៍កូនៗមកកាន់ថ្នាក់រៀនសប្បាយ! 👩🏻‍🏫',
    badgeEmoji: '👩🏻‍🏫',
    gender: 'girl',
    colors: {
      skin: '#fcd34d',
      hair: '#1c1917',
      outfitTop: '#059669',
      outfitBottom: '#064e3b',
      shoes: '#047857',
      accent: '#34d399',
      bgGradient: 'from-teal-600 to-emerald-800',
      border: 'border-teal-300'
    },
    features: {
      hairStyle: 'bun',
      glasses: true,
      accessory: 'books',
      outfitType: 'uniform',
      gesture: 'sampeah',
      expression: 'joy'
    }
  },
  {
    id: 'char_graduate',
    name: 'បរិញ្ញាបត្រតូច (Graduate - 👨‍🎓)',
    title: 'សិស្សបញ្ចប់ការសិក្សា',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'victory-jump',
    danceNameKhmer: 'រាំបោះមួកបញ្ចប់ការសិក្សា',
    danceDescription: 'លោតបោះមួកឡើងលើអាកាស ដោយក្តីមោទនភាព!',
    soundBeat: 'hero-march',
    catchphrase: 'ជោគជ័យបានមកពីការខិតខំរៀនសូត្ររាល់ថ្ងៃ! 👨‍🎓',
    badgeEmoji: '👨‍🎓',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#0f172a',
      outfitTop: '#0f172a',
      outfitBottom: '#020617',
      shoes: '#f59e0b',
      accent: '#fbbf24',
      bgGradient: 'from-amber-500 via-slate-800 to-amber-900',
      border: 'border-amber-400'
    },
    features: {
      hairStyle: 'short',
      accessory: 'trophy',
      outfitType: 'uniform',
      gesture: 'raise_hand',
      expression: 'star_eyes'
    }
  },
  {
    id: 'char_engineer',
    name: 'វិស្វករស្ថាបនា (Engineer - 👷🏻‍♀️)',
    title: 'វិស្វករសំណង់ & បច្ចេកវិទ្យា',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'robot',
    danceNameKhmer: 'រាំស្ទីលវិស្វករសាងសង់',
    danceDescription: 'រាំស្ទីលម៉ាស៊ីនសាងសង់ និងធ្វើសញ្ញាសន្តិភាព ✌️',
    soundBeat: 'electro-pop',
    catchphrase: 'កសាងស្ពាន និងអគារចំណេះដឹងសម្រាប់អនាគត! 👷🏻‍♀️',
    badgeEmoji: '👷🏻‍♀️',
    gender: 'girl',
    colors: {
      skin: '#fcd34d',
      hair: '#78350f',
      outfitTop: '#f59e0b',
      outfitBottom: '#1e293b',
      shoes: '#d97706',
      accent: '#fef08a',
      bgGradient: 'from-yellow-500 to-amber-800',
      border: 'border-yellow-400'
    },
    features: {
      hairStyle: 'cap',
      glasses: true,
      accessory: 'laptop',
      outfitType: 'casual',
      gesture: 'peace',
      expression: 'wink'
    }
  },
  {
    id: 'char_firefighter',
    name: 'វីរបុរសពន្លត់អគ្គីភ័យ (Firefighter - 👩🏻‍🚒)',
    title: 'អ្នកពន្លត់អគ្គីភ័យក្លាហាន',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'victory-jump',
    danceNameKhmer: 'រាំក្បាច់អ្នកពន្លត់អគ្គីភ័យក្លាហាន',
    danceDescription: 'រាំលោតក្លាហាន និងលើកដៃការពារសុវត្ថិភាព!',
    soundBeat: 'hero-march',
    catchphrase: 'ក្លាហាន និងជួយសង្គ្រោះអ្នកដទៃជានិច្ច! 👩🏻‍🚒',
    badgeEmoji: '👩🏻‍🚒',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#1c1917',
      outfitTop: '#b91c1c',
      outfitBottom: '#7f1d1d',
      shoes: '#facc15',
      accent: '#fef08a',
      bgGradient: 'from-red-600 to-amber-800',
      border: 'border-red-400'
    },
    features: {
      hairStyle: 'ponytail',
      outfitType: 'firefighter',
      gesture: 'wave',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_hijab',
    name: 'អ្នកប្រាជ្ញស៊ូហ្វី (Hijab Scholar - 🧕🏻)',
    title: 'សិស្សស្រីពូកែភាសា & ប្រវត្តិវិទ្យា',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'wave-dance',
    danceNameKhmer: 'រាំអោនក្បាលគោរពយ៉ាងទន់ភ្លន់',
    danceDescription: 'អោនក្បាលគោរព និងរាំយ៉ាងមានសុជីវធម៌!',
    soundBeat: 'magic-chime',
    catchphrase: 'ចំណេះដឹង និងសន្តិភាពនាំមកនូវសេចក្តីសុខ! 🧕🏻',
    badgeEmoji: '🧕🏻',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#d97706',
      outfitTop: '#0d9488',
      outfitBottom: '#115e59',
      shoes: '#14b8a6',
      accent: '#99f6e4',
      bgGradient: 'from-teal-600 to-cyan-900',
      border: 'border-teal-300'
    },
    features: {
      hairStyle: 'ponytail',
      accessory: 'books',
      outfitType: 'hijab',
      gesture: 'bow',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_ninja',
    name: 'និនចាល្បឿនលឿន (Ninja - 🥷🏻)',
    title: 'អ្នកក្លាហាននិនចា',
    category: 'hero',
    categoryLabel: 'វីរបុរស & អវកាស',
    danceStyle: 'breakdance',
    danceNameKhmer: 'រាំក្បាច់និនចាបង្វិលខ្លួនលឿន',
    danceDescription: 'បង្វិលខ្លួនលឿនដូចខ្យល់ និងធ្វើកាយវិការសំពះ 🥷🏻',
    soundBeat: 'rock-drum',
    catchphrase: 'លឿន ស្ងាត់ និងដោះស្រាយលំហាត់បានត្រឹមត្រូវ! 🥷🏻',
    badgeEmoji: '🥷🏻',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#0f172a',
      outfitTop: '#020617',
      outfitBottom: '#0f172a',
      shoes: '#dc2626',
      accent: '#ef4444',
      bgGradient: 'from-slate-800 to-black',
      border: 'border-red-500'
    },
    features: {
      hairStyle: 'short',
      outfitType: 'ninja',
      gesture: 'sampeah',
      expression: 'star_eyes'
    }
  },
  {
    id: 'char_bride',
    name: 'កូនក្រមុំសុភមង្គល (Bride - 👰🏼‍♀️)',
    title: 'កូនក្រមុំស្អាតបាត',
    category: 'culture',
    categoryLabel: 'វប្បធម៌ខ្មែរ & កីឡា',
    danceStyle: 'robam-khmer',
    danceNameKhmer: 'រាំក្បាច់កូនក្រមុំសំពះស្វាគមន៍',
    danceDescription: 'សំពះស្វាគមន៍យ៉ាងរៀបរយ និងរាំល្វត់ល្វន់!',
    soundBeat: 'khmer-tro',
    catchphrase: 'សេចក្តីសុខ និងក្តីស្រឡាញ់ជុំវិញខ្លួនយើង! 👰🏼‍♀️',
    badgeEmoji: '👰🏼‍♀️',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#d97706',
      outfitTop: '#f8fafc',
      outfitBottom: '#f1f5f9',
      shoes: '#f472b6',
      accent: '#fbcfe8',
      bgGradient: 'from-pink-300 via-rose-400 to-pink-600',
      border: 'border-pink-300'
    },
    features: {
      hairStyle: 'crown',
      outfitType: 'bride',
      gesture: 'sampeah',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_groom',
    name: 'កូនកំលោះសង្ហា (Groom - 🤵🏻)',
    title: 'កូនកំលោះរៀបរយ',
    category: 'culture',
    categoryLabel: 'វប្បធម៌ខ្មែរ & កីឡា',
    danceStyle: 'salsa',
    danceNameKhmer: 'រាំចង្វាក់កូនកំលោះរាក់ទាក់',
    danceDescription: 'រាំរាក់ទាក់ញញឹមស្រស់ និងធ្វើសញ្ញាសន្តិភាព ✌️',
    soundBeat: 'latin-samba',
    catchphrase: 'សុជីវធម៌ និងភាពស្មោះត្រង់នាំមកនូវសេចក្តីសុខ! 🤵🏻',
    badgeEmoji: '🤵🏻',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#1e293b',
      outfitTop: '#0f172a',
      outfitBottom: '#020617',
      shoes: '#ef4444',
      accent: '#ffffff',
      bgGradient: 'from-slate-700 via-slate-900 to-black',
      border: 'border-slate-400'
    },
    features: {
      hairStyle: 'short',
      outfitType: 'groom',
      gesture: 'peace',
      expression: 'joy'
    }
  },
  {
    id: 'char_wizard',
    name: 'គ្រូមន្តអាគម (Wizard - 🧙‍♀️)',
    title: 'អ្នកមន្តអាគមវិទ្យាសាស្ត្រ',
    category: 'magic',
    categoryLabel: 'វេទមន្ត & ទេពអប្សរ',
    danceStyle: 'magic-float',
    danceNameKhmer: 'រាំអណ្តែតលើអាកាសបាញ់ផ្កាយ',
    danceDescription: 'អណ្តែតលើអាកាស និងបាញ់ពន្លឺផ្កាយមន្តអាគម! ✨',
    soundBeat: 'magic-chime',
    catchphrase: 'វិទ្យាសាស្ត្រ និងគណិតវិទ្យា គឺជាវេទមន្តពិត! 🧙‍♀️',
    badgeEmoji: '🧙‍♀️',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#c084fc',
      outfitTop: '#4c1d95',
      outfitBottom: '#2e1065',
      shoes: '#a855f7',
      accent: '#fef08a',
      bgGradient: 'from-purple-700 via-indigo-900 to-slate-950',
      border: 'border-purple-400'
    },
    features: {
      hairStyle: 'ponytail',
      accessory: 'wand',
      outfitType: 'wizard',
      gesture: 'raise_hand',
      expression: 'star_eyes'
    }
  },
  {
    id: 'char_astronaut',
    name: 'អ្នកអវកាសតូច (Astronaut - 👩🏻‍🚀)',
    title: 'អ្នករុករកភពអវកាស',
    category: 'hero',
    categoryLabel: 'វីរបុរស & អវកាស',
    danceStyle: 'moonwalk',
    danceNameKhmer: 'រាំ Moonwalk លើផ្ទៃព្រះច័ន្ទ',
    danceDescription: 'រអិលជើងលើផ្ទៃព្រះច័ន្ទ និងធ្វើសញ្ញាសន្តិភាព ✌️',
    soundBeat: 'electro-pop',
    catchphrase: 'ហោះទៅកាន់ចក្រវាឡ ដើម្បីស្វែងយល់ពីពិភពលោក! 👩🏻‍🚀',
    badgeEmoji: '👩🏻‍🚀',
    gender: 'girl',
    colors: {
      skin: '#fcd34d',
      hair: '#1c1917',
      outfitTop: '#f8fafc',
      outfitBottom: '#0284c7',
      shoes: '#0284c7',
      accent: '#38bdf8',
      bgGradient: 'from-blue-600 via-indigo-900 to-black',
      border: 'border-sky-400'
    },
    features: {
      hairStyle: 'helmet',
      accessory: 'laptop',
      outfitType: 'space',
      gesture: 'wave',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_santa',
    name: 'តាណូអែលផ្តល់កាដូ (Santa - 🤶🏻)',
    title: 'អ្នកផ្តល់កាដូ និងស្នាមញញឹម',
    category: 'magic',
    categoryLabel: 'វេទមន្ត & ទេពអប្សរ',
    danceStyle: 'floss-dance',
    danceNameKhmer: 'រាំចង្វាក់ Floss គ្រវីដៃសប្បាយ',
    danceDescription: 'គ្រវីដៃសប្បាយ និងចែករំលែកកាដូចំណេះដឹង!',
    soundBeat: 'upbeat',
    catchphrase: 'Ho Ho Ho! រៀនសូត្រពូកែ ទទួលបានកាដូជោគជ័យ! 🤶🏻',
    badgeEmoji: '🤶🏻',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#ffffff',
      outfitTop: '#dc2626',
      outfitBottom: '#991b1b',
      shoes: '#0f172a',
      accent: '#fef08a',
      bgGradient: 'from-red-600 via-rose-700 to-green-900',
      border: 'border-red-400'
    },
    features: {
      hairStyle: 'ponytail',
      outfitType: 'santa',
      gesture: 'heart_hands',
      expression: 'joy'
    }
  },
  {
    id: 'char_superhero',
    name: 'វីរបុរសការពារ (Superhero - 🦸🏻‍♂️)',
    title: 'អ្នកក្លាហានការពារពិភពលោក',
    category: 'hero',
    categoryLabel: 'វីរបុរស & អវកាស',
    danceStyle: 'victory-jump',
    danceNameKhmer: 'រាំលោតផ្លោះស្ទីលវីរបុរស',
    danceDescription: 'លោតខ្ពស់លើកដៃឡើងលើ និងបកអាវឃ្លុំ!',
    soundBeat: 'hero-march',
    catchphrase: 'ចំណេះដឹងគឺជាអំណាចដ៏អស្ចារ្យបំផុត! 🦸🏻‍♂️',
    badgeEmoji: '🦸🏻‍♂️',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#292524',
      outfitTop: '#dc2626',
      outfitBottom: '#1d4ed8',
      shoes: '#f59e0b',
      accent: '#fbbf24',
      bgGradient: 'from-red-500 via-blue-600 to-indigo-900',
      border: 'border-amber-400'
    },
    features: {
      hairStyle: 'spiky',
      accessory: 'cape',
      outfitType: 'hero',
      gesture: 'raise_hand',
      expression: 'star_eyes'
    }
  },
  {
    id: 'char_vampire',
    name: 'ដ្រាគូឡាតូច Cute (Vampire - 🧛‍♂️)',
    title: 'អ្នកការពារអាថ៌កំបាំងយប់',
    category: 'magic',
    categoryLabel: 'វេទមន្ត & ទេពអប្សរ',
    danceStyle: 'disco-spin',
    danceNameKhmer: 'រាំបង្វិលអាវឃ្លុំ ស្ទីលកំប្លែង',
    danceDescription: 'បង្វិលអាវឃ្លុំ និងញញឹមលេចធ្មេញCute Cute! 🧛‍♂️',
    soundBeat: 'rock-drum',
    catchphrase: 'ខ្ញុំមិនខាំទេ! ខ្ញុំចូលចិត្តអានសៀវភៅយប់ជ្រៅ! 🧛‍♂️',
    badgeEmoji: '🧛‍♂️',
    gender: 'boy',
    colors: {
      skin: '#e2e8f0',
      hair: '#0f172a',
      outfitTop: '#4c1d95',
      outfitBottom: '#020617',
      shoes: '#dc2626',
      accent: '#ef4444',
      bgGradient: 'from-purple-900 via-slate-900 to-black',
      border: 'border-purple-400'
    },
    features: {
      hairStyle: 'short',
      accessory: 'cape',
      outfitType: 'vampire',
      gesture: 'peace',
      expression: 'cat_mouth'
    }
  },
  {
    id: 'char_zombie',
    name: 'ហ្សូមប៊ី Cute (Zombie - 🧟‍♀️)',
    title: 'អ្នករាំចង្វាក់ Thriller',
    category: 'magic',
    categoryLabel: 'វេទមន្ត & ទេពអប្សរ',
    danceStyle: 'hip-hop',
    danceNameKhmer: 'រាំក្បាច់ Thriller Cute Cute',
    danceDescription: 'រាំញ័រដៃជើង ញញឹមស្រស់ និងធ្វើដៃរូបបេះដូង!',
    soundBeat: 'rock-drum',
    catchphrase: 'ខួរក្បាលរបស់ខ្ញុំត្រូវការរៀនសូត្ររាល់ថ្ងៃ! 🧠🧟‍♀️',
    badgeEmoji: '🧟‍♀️',
    gender: 'girl',
    colors: {
      skin: '#a7f3d0',
      hair: '#064e3b',
      outfitTop: '#047857',
      outfitBottom: '#065f46',
      shoes: '#10b981',
      accent: '#6ee7b7',
      bgGradient: 'from-emerald-700 via-teal-900 to-slate-950',
      border: 'border-emerald-400'
    },
    features: {
      hairStyle: 'ponytail',
      outfitType: 'casual',
      gesture: 'heart_hands',
      expression: 'wink'
    }
  },
  {
    id: 'char_troll',
    name: 'យក្សតូចចិត្តល្អ (Troll - 🧌)',
    title: 'អ្នកការពារព្រៃឈើ',
    category: 'magic',
    categoryLabel: 'វេទមន្ត & ទេពអប្សរ',
    danceStyle: 'floss-dance',
    danceNameKhmer: 'រាំចង្វាក់ Floss លោតញញឹម',
    danceDescription: 'គ្រវីដៃរហ័ស និងសំពះស្វាគមន៍មិត្តៗ!',
    soundBeat: 'upbeat',
    catchphrase: 'ស្រឡាញ់ធម្មជាតិ និងការការពារបរិស្ថាន! 🧌',
    badgeEmoji: '🧌',
    gender: 'fantasy',
    colors: {
      skin: '#86efac',
      hair: '#15803d',
      outfitTop: '#166534',
      outfitBottom: '#14532d',
      shoes: '#22c55e',
      accent: '#fef08a',
      bgGradient: 'from-green-600 via-emerald-800 to-teal-950',
      border: 'border-green-400'
    },
    features: {
      hairStyle: 'ears',
      outfitType: 'fur',
      gesture: 'sampeah',
      expression: 'joy'
    }
  },
  {
    id: 'char_diverse_leader',
    name: 'ប្រធានគណៈប្រតិភូ (Global Leader - 🧔🏿‍♀️)',
    title: 'អ្នកដឹកនាំវប្បធម៌សកល',
    category: 'profession',
    categoryLabel: 'អាជីព & មុខរបរ',
    danceStyle: 'wave-dance',
    danceNameKhmer: 'រាំក្បាច់ស្វាគមន៍មិត្តភាពអន្តរជាតិ',
    danceDescription: 'រាំស្វាគមន៍មិត្តភាព និងធ្វើសញ្ញាសន្តិភាព ✌️',
    soundBeat: 'upbeat',
    catchphrase: 'សន្តិភាព មិត្តភាព និងការរៀនសូត្ររួមគ្នា! 🧔🏿‍♀️',
    badgeEmoji: '🧔🏿‍♀️',
    gender: 'girl',
    colors: {
      skin: '#78350f',
      hair: '#1c1917',
      outfitTop: '#0284c7',
      outfitBottom: '#0369a1',
      shoes: '#f59e0b',
      accent: '#38bdf8',
      bgGradient: 'from-amber-800 via-blue-900 to-slate-950',
      border: 'border-amber-400'
    },
    features: {
      hairStyle: 'curly',
      glasses: true,
      accessory: 'books',
      outfitType: 'uniform',
      gesture: 'wave',
      expression: 'cute_sparkle'
    }
  },

  // 3. វប្បធម៌ខ្មែរ & កីឡា (11-20)
  {
    id: 'char_11',
    name: 'បុប្ផា (Bopha)',
    title: 'នាដការីអប្សរាសុវណ្ណ',
    category: 'culture',
    categoryLabel: 'វប្បធម៌ខ្មែរ & កីឡា',
    danceStyle: 'robam-khmer',
    danceNameKhmer: 'រាំក្បាច់អប្សរាល្វត់ល្វន់សំពះ',
    danceDescription: 'រាំក្បាច់បុរាណខ្មែរ លត់ម្រាមដៃ និងសំពះយ៉ាងល្វត់ល្វន់!',
    soundBeat: 'khmer-tro',
    catchphrase: 'ថែរក្សាវប្បធម៌អរិយធម៌ខ្មែរឲ្យបានគង់វង្ស! 🙏',
    badgeEmoji: '💃',
    gender: 'girl',
    colors: {
      skin: '#fed7aa',
      hair: '#000000',
      outfitTop: '#eab308',
      outfitBottom: '#ca8a04',
      shoes: '#a16207',
      accent: '#fef08a',
      bgGradient: 'from-amber-400 via-yellow-500 to-amber-700',
      border: 'border-amber-300'
    },
    features: {
      hairStyle: 'crown',
      outfitType: 'apsara',
      gesture: 'sampeah',
      expression: 'cute_sparkle'
    }
  },
  {
    id: 'char_12',
    name: 'រិទ្ធី (Rithy)',
    title: 'អ្នកប្រដាល់គុនខ្មែរ',
    category: 'culture',
    categoryLabel: 'វប្បធម៌ខ្មែរ & កីឡា',
    danceStyle: 'kun-khmer',
    danceNameKhmer: 'រាំស្ទីលថ្វាយបង្គំគ្រូគុនខ្មែរ',
    danceDescription: 'រាំវាយកណ្តាប់ដៃ លើកជើងទាត់ និងថ្វាយបង្គំគ្រូយ៉ាងអង់អាស!',
    soundBeat: 'rock-drum',
    catchphrase: 'កាយសម្បទារឹងមាំ ប្រាជ្ញាឈ្លាសវៃ គុនខ្មែរអស្ចារ្យ! 🥊',
    badgeEmoji: '🥊',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#1c1917',
      outfitTop: '#dc2626',
      outfitBottom: '#991b1b',
      shoes: '#7f1d1d',
      accent: '#fca5a5',
      bgGradient: 'from-red-600 to-rose-900',
      border: 'border-red-400'
    },
    features: {
      hairStyle: 'short',
      outfitType: 'boxer',
      gesture: 'sampeah',
      expression: 'joy'
    }
  },
  {
    id: 'char_14',
    name: 'សុវណ្ណ (Sovan)',
    title: 'កីឡាករបាល់ទាត់ឆ្នើម',
    category: 'sports',
    categoryLabel: 'វប្បធម៌ខ្មែរ & កីឡា',
    danceStyle: 'victory-jump',
    danceNameKhmer: 'រាំស៊ុតបញ្ចូលទីចង្វាក់បាល់ទាត់',
    danceDescription: 'រាំលោតអបអរសាទរពេលស៊ុតបញ្ចូលទី និងលើកដៃសួរ!',
    soundBeat: 'hero-march',
    catchphrase: 'ធ្វើការជាក្រុម រត់ទៅមុខជានិច្ច! ⚽',
    badgeEmoji: '⚽',
    gender: 'boy',
    colors: {
      skin: '#f5c396',
      hair: '#1e293b',
      outfitTop: '#2563eb',
      outfitBottom: '#1d4ed8',
      shoes: '#eab308',
      accent: '#60a5fa',
      bgGradient: 'from-blue-600 to-indigo-800',
      border: 'border-blue-400'
    },
    features: {
      hairStyle: 'spiky',
      accessory: 'ball',
      outfitType: 'sports',
      gesture: 'raise_hand',
      expression: 'star_eyes'
    }
  },

  // 4. សត្វឆ្លាតវៃ & តួអង្គត្លុក (Animals & Fantasy)
  {
    id: 'char_49',
    name: 'ទន្សាយវៃឆ្លាត (Smart Bunny)',
    title: 'ទន្សាយរត់លឿន',
    category: 'animal',
    categoryLabel: 'សត្វឆ្លាតវៃ & តួអង្គត្លុក',
    danceStyle: 'victory-jump',
    danceNameKhmer: 'រាំលោតត្រចៀកវែង ធ្វើសញ្ញាសន្តិភាព',
    danceDescription: 'លោតចុះឡើង គ្រវីត្រចៀក និងធ្វើសញ្ញាសន្តិភាព ✌️',
    soundBeat: 'upbeat',
    catchphrase: 'លោតឲ្យខ្ពស់ រៀនឲ្យពូកែ! 🐰',
    badgeEmoji: '🐰',
    gender: 'animal',
    colors: {
      skin: '#f87171',
      hair: '#ef4444',
      outfitTop: '#ffffff',
      outfitBottom: '#b91c1c',
      shoes: '#fca5a5',
      accent: '#fee2e2',
      bgGradient: 'from-red-400 via-rose-500 to-pink-700',
      border: 'border-rose-300'
    },
    features: {
      hairStyle: 'ears',
      outfitType: 'fur',
      gesture: 'peace',
      expression: 'wink'
    }
  },
  {
    id: 'char_50',
    name: 'សត្វកញ្ជ្រោងប្រាជ្ញា (Wise Fox)',
    title: 'កញ្ជ្រោងប្រាជ្ញាវៃឆ្លាត',
    category: 'animal',
    categoryLabel: 'សត្វឆ្លាតវៃ & តួអង្គត្លុក',
    danceStyle: 'disco-spin',
    danceNameKhmer: 'រាំចង្វាក់បង្វិលកន្ទុយកញ្ជ្រោង',
    danceDescription: 'បង្វិលខ្លួននិងគ្រវីកន្ទុយកញ្ជ្រោងពណ៌លឿងទុំ!',
    soundBeat: 'funky-disco',
    catchphrase: 'ប្រាជ្ញា និងចំណេះដឹងជាមិត្តពិតប្រាកដ! 🦊',
    badgeEmoji: '🦊',
    gender: 'animal',
    colors: {
      skin: '#f97316',
      hair: '#ea580c',
      outfitTop: '#c2410c',
      outfitBottom: '#9a3412',
      shoes: '#ffedd5',
      accent: '#fed7aa',
      bgGradient: 'from-orange-500 via-amber-600 to-yellow-800',
      border: 'border-orange-300'
    },
    features: {
      hairStyle: 'ears',
      glasses: true,
      accessory: 'books',
      outfitType: 'fur',
      gesture: 'sampeah',
      expression: 'cute_sparkle'
    }
  }
];
