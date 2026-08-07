import React, { useState, useEffect } from 'react';
import {
  X,
  Target,
  Trophy,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Gift,
  Coins,
  Crown,
  BookOpen,
  GraduationCap,
  Swords,
  Bookmark,
  Flame,
  Star,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  ShieldAlert,
  ShoppingBag,
  Clock,
  Sparkles as SparklesIcon,
  Check,
  RotateCcw
} from 'lucide-react';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'achievement' | 'special' | 'custom';
  targetCount: number;
  currentCount: number;
  rewardCoins: number;
  rewardXp: number;
  rewardTitle?: string;
  isClaimed: boolean;
  iconName: 'book' | 'exam' | 'battle' | 'bookmark' | 'streak' | 'score' | 'star' | 'crown' | 'custom';
  isCustom?: boolean;
}

export interface PowerUpItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
  price: number;
  quantity: number;
}

export interface UserRewardState {
  coins: number;
  xp: number;
  level: number;
  streakDays: number;
  lastCheckInDate: string | null;
  claimedMissionIds: string[];
  customMissions: Mission[];
  unlockedAvatarIds: string[];
  activeAvatarId: string;
  unlockedBadgeIds: string[];
  powerUps: Record<string, number>;
}

interface MissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedExamCount: number;
  bookmarkedCount: number;
}

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'm1_read_lesson',
    title: 'អាន និងរំលឹកមេរៀនសង្ខេប',
    description: 'ចូលពិនិត្យ និងអានខ្លឹមសារមេរៀនសង្ខេបយ៉ាងហោចណាស់ ៣ មេរៀន',
    category: 'daily',
    targetCount: 3,
    currentCount: 3,
    rewardCoins: 300,
    rewardXp: 500,
    isClaimed: false,
    iconName: 'book'
  },
  {
    id: 'm2_complete_exam',
    title: 'បញ្ចប់វិញ្ញាសាប្រឡងសាកល្បង',
    description: 'ធ្វើ និងបញ្ចប់វិញ្ញាសាប្រឡងថ្នាក់ទី៦ យ៉ាងហោចណាស់ ១ វិញ្ញាសា',
    category: 'daily',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 500,
    rewardXp: 800,
    rewardTitle: 'ជើងឯកវិញ្ញាសា',
    isClaimed: false,
    iconName: 'exam'
  },
  {
    id: 'm3_battle_ai',
    title: 'ប្រកួតស្ទង់សមត្ថភាពជាមួយ AI',
    description: 'ចូលរួមប្រកួតដេញដោលដោះស្រាយលំហាត់ជាមួយ AI យ៉ាងហោចណាស់ ១ លើក',
    category: 'daily',
    targetCount: 1,
    currentCount: 1,
    rewardCoins: 600,
    rewardXp: 1000,
    rewardTitle: 'អ្នកប្រយុទ្ធ AI',
    isClaimed: false,
    iconName: 'battle'
  },
  {
    id: 'm4_bookmark_questions',
    title: 'ចំណាំសំណួរពិបាកសម្រាប់រំលឹក',
    description: 'ចុចបេះដូង ឬចំណាំសំណួរពិបាកៗចំនួន ៣ សំណួរ',
    category: 'daily',
    targetCount: 3,
    currentCount: 0,
    rewardCoins: 400,
    rewardXp: 600,
    isClaimed: false,
    iconName: 'bookmark'
  },
  {
    id: 'm5_high_score',
    title: 'ទទួលបានពិន្ទុ ៨០% ឡើងលើ',
    description: 'ធ្វើវិញ្ញាសាប្រឡងទទួលបានលទ្ធផលល្អប្រសើរ ៨០% ឡើងទៅ',
    category: 'achievement',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 1200,
    rewardXp: 2000,
    rewardTitle: 'សិស្សឆ្នើមថ្នាក់ទី៦',
    isClaimed: false,
    iconName: 'score'
  },
  {
    id: 'm6_complete_5_exams',
    title: 'វីរបុរសប្រឡងថ្នាក់ទី៦',
    description: 'បញ្ចប់វិញ្ញាសាប្រឡងសរុបបានចំនួន ៥ វិញ្ញាសា',
    category: 'achievement',
    targetCount: 5,
    currentCount: 0,
    rewardCoins: 2500,
    rewardXp: 4000,
    rewardTitle: 'បណ្ឌិតវិញ្ញាសាទី៦',
    isClaimed: false,
    iconName: 'exam'
  },
  {
    id: 'm7_perfect_score',
    title: 'ទទួលបានពិន្ទុ ១០០% ពេញ',
    description: 'ឆ្លើយត្រូវទាំងអស់គ្មានខុសលើវិញ្ញាសាប្រឡងសាកល្បង',
    category: 'special',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 3500,
    rewardXp: 5000,
    rewardTitle: 'អ្នកប្រាជ្ញឥតខ្ចោះ',
    isClaimed: false,
    iconName: 'crown'
  },
  {
    id: 'm8_math_master',
    title: 'អ្នកជំនាញគណិតវិទ្យា',
    description: 'រំលឹកមេរៀន និងប្រឡងគណិតវិទ្យាបាន ៣ លើក',
    category: 'achievement',
    targetCount: 3,
    currentCount: 1,
    rewardCoins: 1800,
    rewardXp: 3000,
    rewardTitle: 'គ្រូគណិតសិប្បនិម្មិត',
    isClaimed: false,
    iconName: 'star'
  },
  {
    id: 'm9_bookmark_10',
    title: 'បណ្ណាល័យសំណួរចំណាំ',
    description: 'រក្សាទុកសំណួរចំណាំសរុបបានចំនួន ១០ សំណួរ',
    category: 'achievement',
    targetCount: 10,
    currentCount: 0,
    rewardCoins: 2000,
    rewardXp: 3500,
    rewardTitle: 'អ្នកប្រមូលចំណេះដឹង',
    isClaimed: false,
    iconName: 'bookmark'
  },
  {
    id: 'm10_legend_10_exams',
    title: 'ជើងឯកប្រឡងថ្នាក់ជាតិ',
    description: 'ខិតខំប្រឹងប្រែងធ្វើវិញ្ញាសាប្រឡងសរុប ១០ វិញ្ញាសា',
    category: 'special',
    targetCount: 10,
    currentCount: 0,
    rewardCoins: 5000,
    rewardXp: 8000,
    rewardTitle: 'ស្ដេចវិញ្ញាសាថ្នាក់ទី៦',
    isClaimed: false,
    iconName: 'crown'
  },
  {
    id: 'm11_super_studious',
    title: 'សិស្សឧស្សាហ៍ទូទាំងប្រទេស',
    description: 'អានអត្ថបទបណ្ណាល័យ និងធ្វើវិញ្ញាសាច្រើនជាង ១៥ លើក',
    category: 'special',
    targetCount: 15,
    currentCount: 2,
    rewardCoins: 8000,
    rewardXp: 12000,
    rewardTitle: '💎 វីរបុរសប្រាជ្ញាកម្ពុជា',
    isClaimed: false,
    iconName: 'crown'
  }
];

const AVATARS = [
  { id: 'av_starter', name: 'សិស្សខិតខំ', icon: '🎓', reqCoins: 0, tag: 'ទូទៅ' },
  { id: 'av_smart', name: 'សិស្សពូកែ', icon: '⭐', reqCoins: 300, tag: 'ពេញនិយម' },
  { id: 'av_ai_fighter', name: 'អ្នកប្រយុទ្ធ AI', icon: '🤖', reqCoins: 800, tag: 'ប្រយុទ្ធ' },
  { id: 'av_champion', name: 'ជើងឯកថ្នាក់ទី៦', icon: '🏆', reqCoins: 1500, tag: 'ជើងឯក' },
  { id: 'av_math_wizard', name: 'អ្នកប្រាជ្ញលេខ', icon: '📐', reqCoins: 2500, tag: 'គណិតវិទ្យា' },
  { id: 'av_khmer_scholar', name: 'វីរបុរសអក្សរសាស្ត្រ', icon: '📜', reqCoins: 4000, tag: 'ភាសាខ្មែរ' },
  { id: 'av_king_exam', name: 'ស្ដេចប្រឡង', icon: '👑', reqCoins: 6000, tag: 'កិត្តិយស' },
  { id: 'av_cosmic_learner', name: 'សិស្សអវកាស', icon: '🚀', reqCoins: 8500, tag: 'វិទ្យាសាស្ត្រ' },
  { id: 'av_dragon_master', name: 'នាគរាជប្រាជ្ញា', icon: '🐉', reqCoins: 12000, tag: 'រឿងព្រេង' },
  { id: 'av_supreme_scholar', name: 'ស្ដេចសិស្សឆ្នើមថ្នាក់ជាតិ', icon: '💎', reqCoins: 20000, tag: 'កំពូល' }
];

const BADGES = [
  { id: 'bg_first_step', name: 'មេដាយជំហានដំបូង', icon: '🏅', desc: 'ចូលរួមរៀនសូត្រក្នុងកម្មវិធី', price: 100 },
  { id: 'bg_fast_solver', name: 'មេដាយល្បឿនលឿន', icon: '⚡', desc: 'ឆ្លើយសំណួរបានលឿននិងរហ័ស', price: 500 },
  { id: 'bg_ai_slayer', name: 'មេដាយឈ្នះ AI', icon: '🗡️', desc: 'យកឈ្នះ AI ក្នុងការប្រកួតសមត្ថភាព', price: 1200 },
  { id: 'bg_golden_brain', name: 'មេដាយខួរក្បាលមាស', icon: '🧠', desc: 'ឆ្លើយត្រូវ ១០០% លើវិញ្ញាសា', price: 2500 },
  { id: 'bg_diamond_mind', name: 'មេដាយពេជ្រប្រាជ្ញា', icon: '💎', desc: 'ទទួលបានពិន្ទុខ្ពស់ដាច់គេ', price: 5000 },
  { id: 'bg_dragon_honor', name: 'មេដាយនាគរាជកិត្តិយស', icon: '🐉', desc: 'ដោះសោគំរូ និងបេសកកម្មទាំងអស់', price: 10000 },
  { id: 'bg_grade6_hero', name: 'មេដាយវីរបុរសថ្នាក់ទី៦', icon: '🛡️', desc: 'បញ្ចប់បេសកកម្ម និងប្រឡងជើងឯក', price: 15000 }
];

const POWERUPS: PowerUpItem[] = [
  { id: 'pw_double_xp', name: 'ថ្នាំគុណ ២ XP (Double XP)', desc: 'ទទួលបានពិន្ទុពិសោធន៍ ២ដង ក្នុងរយៈពេល ២៤ម៉ោង', icon: '🧪', price: 800, quantity: 0 },
  { id: 'pw_hint_shield', name: 'ខែលជំនួយចម្លើយ (Hint Shield)', desc: 'ដកចម្លើយខុស ២ ចេញក្នុងពេលធ្វើប្រឡង', icon: '🛡️', price: 500, quantity: 0 },
  { id: 'pw_streak_freeze', name: 'ខែលការពារ Streak (Streak Freeze)', desc: 'ការពារ Streak ប្រចាំថ្ងៃពេលភ្លេចចូលរៀន ១ ថ្ងៃ', icon: '❄️', price: 1000, quantity: 0 },
  { id: 'pw_golden_ticket', name: 'សំបុត្រមាសប្រឡង (Golden Pass)', desc: 'ដោះសោវិញ្ញាសាប្រឡងពិសេស និង AI Battle Pro', icon: '🎫', price: 2000, quantity: 0 }
];

const DAILY_REWARDS = [
  { day: 1, coins: 100, xp: 200, label: 'ថ្ងៃទី ១' },
  { day: 2, coins: 200, xp: 300, label: 'ថ្ងៃទី ២' },
  { day: 3, coins: 350, xp: 500, label: 'ថ្ងៃទី ៣' },
  { day: 4, coins: 500, xp: 700, label: 'ថ្ងៃទី ៤' },
  { day: 5, coins: 700, xp: 1000, label: 'ថ្ងៃទី ៥' },
  { day: 6, coins: 1000, xp: 1500, label: 'ថ្ងៃទី ៦' },
  { day: 7, coins: 2500, xp: 3000, label: 'ថ្ងៃទី ៧ (🎁 ប្រអប់មាស)', isBig: true }
];

// Simple audio tone generator
const playClaimSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error(e);
  }
};

export const MissionsModal: React.FC<MissionsModalProps> = ({
  isOpen,
  onClose,
  completedExamCount,
  bookmarkedCount
}) => {
  const [activeTab, setActiveTab] = useState<'missions' | 'custom' | 'checkin' | 'avatars' | 'badges' | 'powerups'>('missions');
  const [missionCategoryFilter, setMissionCategoryFilter] = useState<'all' | 'daily' | 'achievement' | 'special' | 'custom'>('all');

  // Custom Mission Creator Form State
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTarget, setNewTarget] = useState('1');
  const [newCoins, setNewCoins] = useState('300');
  const [newXp, setNewXp] = useState('500');

  // Load reward state
  const [rewardState, setRewardState] = useState<UserRewardState>(() => {
    try {
      const saved = localStorage.getItem('grade6_reward_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          coins: parsed.coins ?? 500,
          xp: parsed.xp ?? 800,
          level: parsed.level ?? 3,
          streakDays: parsed.streakDays ?? 1,
          lastCheckInDate: parsed.lastCheckInDate ?? null,
          claimedMissionIds: parsed.claimedMissionIds ?? [],
          customMissions: parsed.customMissions ?? [],
          unlockedAvatarIds: parsed.unlockedAvatarIds ?? ['av_starter'],
          activeAvatarId: parsed.activeAvatarId ?? 'av_starter',
          unlockedBadgeIds: parsed.unlockedBadgeIds ?? ['bg_first_step'],
          powerUps: parsed.powerUps ?? {}
        };
      }
    } catch (e) {
      console.error(e);
    }
    return {
      coins: 500,
      xp: 800,
      level: 3,
      streakDays: 1,
      lastCheckInDate: null,
      claimedMissionIds: [],
      customMissions: [],
      unlockedAvatarIds: ['av_starter'],
      activeAvatarId: 'av_starter',
      unlockedBadgeIds: ['bg_first_step'],
      powerUps: {}
    };
  });

  // Save reward state
  useEffect(() => {
    try {
      localStorage.setItem('grade6_reward_state', JSON.stringify(rewardState));
    } catch (e) {
      console.error(e);
    }
  }, [rewardState]);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = rewardState.lastCheckInDate === todayStr;

  // Calculate mission progress dynamically based on app activity
  const allDefaultMissionsWithLiveProgress = DEFAULT_MISSIONS.map((m) => {
    let current = m.currentCount;
    if (m.id === 'm2_complete_exam') {
      current = Math.min(completedExamCount, m.targetCount);
    } else if (m.id === 'm4_bookmark_questions') {
      current = Math.min(bookmarkedCount, m.targetCount);
    } else if (m.id === 'm6_complete_5_exams' || m.id === 'm10_legend_10_exams') {
      current = Math.min(completedExamCount, m.targetCount);
    } else if (m.id === 'm9_bookmark_10') {
      current = Math.min(bookmarkedCount, m.targetCount);
    }

    const isClaimed = rewardState.claimedMissionIds.includes(m.id);
    return { ...m, currentCount: current, isClaimed };
  });

  const customMissionsWithClaimed = rewardState.customMissions.map((m) => ({
    ...m,
    isClaimed: rewardState.claimedMissionIds.includes(m.id)
  }));

  const allMissions = [...allDefaultMissionsWithLiveProgress, ...customMissionsWithClaimed];

  const filteredMissions = allMissions.filter((m) => {
    if (missionCategoryFilter === 'all') return true;
    return m.category === missionCategoryFilter;
  });

  const handleClaimReward = (m: Mission) => {
    if (m.isClaimed || m.currentCount < m.targetCount) return;

    playClaimSound();
    const newCoins = rewardState.coins + m.rewardCoins;
    const newXp = rewardState.xp + m.rewardXp;
    const newLevel = Math.floor(newXp / 300) + 1;

    setRewardState((prev) => ({
      ...prev,
      coins: newCoins,
      xp: newXp,
      level: newLevel,
      claimedMissionIds: [...prev.claimedMissionIds, m.id]
    }));
  };

  const handleDailyCheckIn = () => {
    if (hasCheckedInToday) return;

    playClaimSound();
    const currentDayIdx = ((rewardState.streakDays - 1) % 7);
    const dayReward = DAILY_REWARDS[currentDayIdx] || DAILY_REWARDS[0];

    const newStreak = rewardState.streakDays + 1;
    const newCoins = rewardState.coins + dayReward.coins;
    const newXp = rewardState.xp + dayReward.xp;
    const newLevel = Math.floor(newXp / 300) + 1;

    setRewardState((prev) => ({
      ...prev,
      coins: newCoins,
      xp: newXp,
      level: newLevel,
      streakDays: newStreak,
      lastCheckInDate: todayStr
    }));
  };

  const handleCreateCustomMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const targetVal = Math.max(1, parseInt(newTarget) || 1);
    const coinsVal = Math.max(50, parseInt(newCoins) || 100);
    const xpVal = Math.max(100, parseInt(newXp) || 200);

    const customMission: Mission = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'បេសកកម្មសិក្សាផ្ទាល់ខ្លួនបង្កើតដោយសិស្ស/អាណាព្យាបាល',
      category: 'custom',
      targetCount: targetVal,
      currentCount: 0,
      rewardCoins: coinsVal,
      rewardXp: xpVal,
      isClaimed: false,
      iconName: 'custom',
      isCustom: true
    };

    setRewardState((prev) => ({
      ...prev,
      customMissions: [customMission, ...prev.customMissions]
    }));

    setNewTitle('');
    setNewDesc('');
    setNewTarget('1');
    setNewCoins('300');
    setNewXp('500');
    setIsCreatingCustom(false);
  };

  const handleIncrementCustom = (mId: string) => {
    setRewardState((prev) => ({
      ...prev,
      customMissions: prev.customMissions.map((cm) => {
        if (cm.id === mId) {
          const nextCount = Math.min(cm.targetCount, cm.currentCount + 1);
          return { ...cm, currentCount: nextCount };
        }
        return cm;
      })
    }));
  };

  const handleDeleteCustom = (mId: string) => {
    setRewardState((prev) => ({
      ...prev,
      customMissions: prev.customMissions.filter((cm) => cm.id !== mId),
      claimedMissionIds: prev.claimedMissionIds.filter((id) => id !== mId)
    }));
  };

  const handleUnlockAvatar = (av: typeof AVATARS[0]) => {
    if (rewardState.unlockedAvatarIds.includes(av.id)) {
      setRewardState((prev) => ({ ...prev, activeAvatarId: av.id }));
      return;
    }

    if (rewardState.coins >= av.reqCoins) {
      playClaimSound();
      setRewardState((prev) => ({
        ...prev,
        coins: prev.coins - av.reqCoins,
        unlockedAvatarIds: [...prev.unlockedAvatarIds, av.id],
        activeAvatarId: av.id
      }));
    }
  };

  const handleUnlockBadge = (badge: typeof BADGES[0]) => {
    if (rewardState.unlockedBadgeIds?.includes(badge.id)) return;

    if (rewardState.coins >= badge.price) {
      playClaimSound();
      setRewardState((prev) => ({
        ...prev,
        coins: prev.coins - badge.price,
        unlockedBadgeIds: [...(prev.unlockedBadgeIds || []), badge.id]
      }));
    }
  };

  const handleBuyPowerUp = (pw: PowerUpItem) => {
    if (rewardState.coins >= pw.price) {
      playClaimSound();
      const currentQty = rewardState.powerUps[pw.id] || 0;
      setRewardState((prev) => ({
        ...prev,
        coins: prev.coins - pw.price,
        powerUps: {
          ...prev.powerUps,
          [pw.id]: currentQty + 1
        }
      }));
    }
  };

  const getIcon = (name: Mission['iconName']) => {
    switch (name) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'exam':
        return <GraduationCap className="w-5 h-5 text-sky-600" />;
      case 'battle':
        return <Swords className="w-5 h-5 text-purple-600" />;
      case 'bookmark':
        return <Bookmark className="w-5 h-5 text-rose-600" />;
      case 'score':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'crown':
        return <Crown className="w-5 h-5 text-amber-600" />;
      case 'star':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'custom':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      default:
        return <Zap className="w-5 h-5 text-amber-500" />;
    }
  };

  const activeAvatarObj = AVATARS.find((a) => a.id === rewardState.activeAvatarId) || AVATARS[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shadow-md shrink-0 text-2xl border border-amber-300/60">
              {activeAvatarObj.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base sm:text-xl font-moul tracking-wide text-amber-100 flex items-center gap-1.5">
                  បេសកកម្ម និងរង្វាន់សិក្សា
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-200 animate-pulse" />
                </h2>
              </div>
              <p className="text-xs text-amber-200/90 mt-0.5">
                បំពេញបេសកកម្ម បង្កើតកិច្ចការផ្ទាល់ខ្លួន និងដោះសោរង្វាន់កិត្តិយស!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10 active:scale-95"
            id="btn-close-missions"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status Bar */}
        <div className="bg-slate-900 p-3.5 sm:p-4 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          {/* Level & XP */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-md font-mono border border-amber-300">
              Lvl {rewardState.level}
            </div>
            <div>
              <div className="text-xs text-slate-300 font-bold flex items-center gap-2">
                <span className="text-white font-moul">កម្រិតវីរបុរស</span>
                <span className="text-amber-400 font-mono">{rewardState.xp} XP</span>
              </div>
              <div className="w-32 sm:w-40 h-2.5 bg-slate-800 rounded-full mt-1 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${(rewardState.xp % 300) / 3}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Counter & Coins Balance */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span className="text-xs font-bold text-amber-300">
                Streak: <span className="font-mono text-sm text-white">{rewardState.streakDays}</span> ថ្ងៃ
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
              <div className="font-mono font-bold text-amber-300 text-sm sm:text-base">
                {rewardState.coins} <span className="text-xs font-normal text-slate-300">កាក់</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-3 pt-2 gap-1 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('missions')}
            className={`pb-2.5 px-3 sm:px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'missions'
                ? 'border-amber-600 text-amber-950 bg-white rounded-t-xl shadow-2xs font-moul'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 text-amber-600" />
            <span>បេសកកម្ម ({allMissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 px-3 sm:px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'custom'
                ? 'border-indigo-600 text-indigo-950 bg-white rounded-t-xl shadow-2xs font-moul'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>កិច្ចការផ្ទាល់ខ្លួន ({rewardState.customMissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('checkin')}
            className={`pb-2.5 px-3 sm:px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'checkin'
                ? 'border-emerald-600 text-emerald-950 bg-white rounded-t-xl shadow-2xs font-moul'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>វត្តមានប្រចាំថ្ងៃ 🎁</span>
          </button>

          <button
            onClick={() => setActiveTab('powerups')}
            className={`pb-2.5 px-3 sm:px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'powerups'
                ? 'border-purple-600 text-purple-950 bg-white rounded-t-xl shadow-2xs font-moul'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-purple-600" />
            <span>ហាងអាវុធជំនួយ</span>
          </button>

          <button
            onClick={() => setActiveTab('avatars')}
            className={`pb-2.5 px-3 sm:px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'avatars'
                ? 'border-amber-600 text-amber-950 bg-white rounded-t-xl shadow-2xs font-moul'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-600" />
            <span>រូបតំណាងសិស្ស</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-2.5 px-3 sm:px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'badges'
                ? 'border-amber-600 text-amber-950 bg-white rounded-t-xl shadow-2xs font-moul'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>មេដាយកិត្តិយស</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {/* TAB 1: Main Missions List */}
          {activeTab === 'missions' && (
            <div className="space-y-4">
              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'all', label: 'ទាំងអស់' },
                  { id: 'daily', label: 'ប្រចាំថ្ងៃ 📅' },
                  { id: 'achievement', label: 'សមិទ្ធផល 🏆' },
                  { id: 'special', label: 'ពិសេស 👑' },
                  { id: 'custom', label: 'ផ្ទាល់ខ្លួន ✍️' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setMissionCategoryFilter(cat.id as any)}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all shrink-0 ${
                      missionCategoryFilter === cat.id
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredMissions.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                    <p className="text-sm font-bold text-slate-500">គ្មានបេសកកម្មក្នុងប្រភេទទិន្នន័យនេះទេ</p>
                  </div>
                ) : (
                  filteredMissions.map((mission) => {
                    const canClaim = mission.currentCount >= mission.targetCount && !mission.isClaimed;
                    const progressPct = Math.min(
                      100,
                      Math.round((mission.currentCount / mission.targetCount) * 100)
                    );

                    return (
                      <div
                        key={mission.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs ${
                          mission.isClaimed
                            ? 'bg-slate-100/80 border-slate-200 opacity-70'
                            : canClaim
                            ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/40'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 shrink-0">
                            {getIcon(mission.iconName)}
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                                {mission.title}
                              </h4>
                              {mission.rewardTitle && (
                                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold border border-amber-200">
                                  🎖️ {mission.rewardTitle}
                                </span>
                              )}
                              {mission.isCustom && (
                                <span className="text-[10px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md font-bold border border-indigo-200">
                                  ✍️ ផ្ទាល់ខ្លួន
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {mission.description}
                            </p>

                            {/* Progress bar */}
                            <div className="space-y-1 pt-1">
                              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                                <span>វឌ្ឍនភាព៖ {mission.currentCount}/{mission.targetCount}</span>
                                <span>{progressPct}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reward & Action */}
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-lg border border-amber-200/60">
                            <Coins className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                            <span>+{mission.rewardCoins} កាក់</span>
                            <span className="text-slate-400">•</span>
                            <span>+{mission.rewardXp} XP</span>
                          </div>

                          {mission.isClaimed ? (
                            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              បានទទួលរួច
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              {mission.isCustom && mission.currentCount < mission.targetCount && (
                                <button
                                  onClick={() => handleIncrementCustom(mission.id)}
                                  className="px-2.5 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                                  title="បន្ថែមចំនួនដែលបានធ្វើ"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>+1</span>
                                </button>
                              )}

                              <button
                                disabled={!canClaim}
                                onClick={() => handleClaimReward(mission)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  canClaim
                                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:scale-105 active:scale-95'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300/60'
                                }`}
                              >
                                <Gift className="w-4 h-4" />
                                <span>{canClaim ? 'ទទួលរង្វាន់!' : 'មិនទាន់សម្រេច'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Custom Missions Manager */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <h3 className="font-moul text-sm sm:text-base text-indigo-200 flex items-center gap-2">
                    <span>✍️ បង្កើតបេសកកម្មសិក្សាផ្ទាល់ខ្លួន</span>
                  </h3>
                  <p className="text-xs text-indigo-200/80 mt-1">
                    សិស្ស គ្រូបង្រៀន ឬអាណាព្យាបាល អាចបន្ថែមគោលដៅសិក្សាផ្ទាល់ខ្លួន និងកំណត់រង្វាន់កាក់បាន!
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatingCustom(!isCreatingCustom)}
                  className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isCreatingCustom ? 'បិទកម្រងបែបបទ' : 'បន្ថែមបេសកកម្មថ្មី'}</span>
                </button>
              </div>

              {/* Form to Create Custom Mission */}
              {isCreatingCustom && (
                <form
                  onSubmit={handleCreateCustomMission}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-200 shadow-md space-y-3 animate-fade-in"
                >
                  <h4 className="font-moul text-xs text-indigo-900">បំពេញព័ត៌មានបេសកកម្មថ្មី</h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ចំណងជើងបេសកកម្ម *</label>
                      <input
                        type="text"
                        required
                        placeholder="ឧទាហរណ៍៖ អានមេរៀនប្រវត្តិវិទ្យា ២ ទំព័រ"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ការពិពណ៌នាបន្ថែម</label>
                      <input
                        type="text"
                        placeholder="ឧទាហរណ៍៖ ទន្ទេញពាក្យគន្លឹះ និងកត់ត្រាចំណុចសំខាន់ៗ"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50 text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-1">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">ចំនួនគោលដៅ</label>
                        <input
                          type="number"
                          min="1"
                          value={newTarget}
                          onChange={(e) => setNewTarget(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50 text-slate-900 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">រង្វាន់កាក់ 🪙</label>
                        <input
                          type="number"
                          min="50"
                          step="50"
                          value={newCoins}
                          onChange={(e) => setNewCoins(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50 text-slate-900 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">រង្វាន់ XP ⭐</label>
                        <input
                          type="number"
                          min="100"
                          step="100"
                          value={newXp}
                          onChange={(e) => setNewXp(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 bg-slate-50 text-slate-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingCustom(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      បោះបង់
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
                    >
                      រក្សាទុកបេសកកម្ម
                    </button>
                  </div>
                </form>
              )}

              {/* Custom Missions List */}
              <div className="space-y-3">
                {rewardState.customMissions.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
                    <p className="text-sm font-bold text-slate-600">អ្នកមិនទាន់បានបង្កើតបេសកកម្មផ្ទាល់ខ្លួននៅឡើយទេ</p>
                    <p className="text-xs text-slate-400 mt-1">ចុចប៊ូតុង "បន្ថែមបេសកកម្មថ្មី" ខាងលើដើម្បីចាប់ផ្តើម</p>
                  </div>
                ) : (
                  rewardState.customMissions.map((m) => {
                    const isClaimed = rewardState.claimedMissionIds.includes(m.id);
                    const canClaim = m.currentCount >= m.targetCount && !isClaimed;

                    return (
                      <div
                        key={m.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-slate-900">{m.title}</h5>
                            <span className="text-[10px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-bold">
                              {m.currentCount}/{m.targetCount}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{m.description}</p>
                          <div className="text-[11px] font-mono text-amber-700 font-bold pt-1">
                            🪙 +{m.rewardCoins} កាក់ • ⭐ +{m.rewardXp} XP
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-0 border-slate-100 pt-2 sm:pt-0">
                          {isClaimed ? (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                              បានទទួលរង្វាន់
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              {m.currentCount < m.targetCount && (
                                <button
                                  onClick={() => handleIncrementCustom(m.id)}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer transition-colors"
                                >
                                  +1 បំពេញ
                                </button>
                              )}
                              {canClaim && (
                                <button
                                  onClick={() => handleClaimReward(m)}
                                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                                >
                                  ទទួលរង្វាន់
                                </button>
                              )}
                            </div>
                          )}

                          <button
                            onClick={() => handleDeleteCustom(m.id)}
                            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="លុបបេសកកម្ម"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Daily Check-in Streak Calendar */}
          {activeTab === 'checkin' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-5 rounded-3xl shadow-md border border-emerald-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Daily Check-In Streak
                  </span>
                  <h3 className="font-moul text-base sm:text-lg text-emerald-100">
                    វត្តមានរៀនសូត្រប្រចាំថ្ងៃ
                  </h3>
                  <p className="text-xs text-emerald-200/80 max-w-md">
                    ចូលរៀនជារៀងរាល់ថ្ងៃដើម្បីរក្សា Streak ទទួលបានកាក់បន្ថែម និងប្រអប់រង្វាន់មាសនៅថ្ងៃទី ៧!
                  </p>
                </div>

                <button
                  disabled={hasCheckedInToday}
                  onClick={handleDailyCheckIn}
                  className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 shrink-0 ${
                    hasCheckedInToday
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
                      : 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 active:scale-95 animate-pulse'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{hasCheckedInToday ? 'បានចុះវត្តមានថ្ងៃនេះរួចរាល់' : 'ចុះវត្តមានថ្ងៃនេះ (+កាក់)'}</span>
                </button>
              </div>

              {/* 7 Day Rewards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DAILY_REWARDS.map((r, idx) => {
                  const dayNum = idx + 1;
                  const currentStreakIdx = ((rewardState.streakDays - 1) % 7) + 1;
                  const isPastOrToday = dayNum <= currentStreakIdx && hasCheckedInToday;

                  return (
                    <div
                      key={r.day}
                      className={`p-3.5 rounded-2xl border text-center space-y-2 relative overflow-hidden transition-all ${
                        r.isBig
                          ? 'sm:col-span-2 bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400'
                          : isPastOrToday
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">{r.label}</span>
                      <div className="text-2xl py-1">{r.isBig ? '🎁' : '🪙'}</div>
                      <div className="font-mono font-bold text-xs text-slate-900">
                        +{r.coins} កាក់ <span className="text-emerald-600 font-normal block text-[10px]">+{r.xp} XP</span>
                      </div>

                      {isPastOrToday && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Power-ups Shop */}
          {activeTab === 'powerups' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                ប្រើប្រាស់កាក់ចំណេះដឹងដើម្បីទិញអាវុធ និងឧបករណ៍ជំនួយពិសេសក្នុងការប្រឡង និងការរៀនសូត្រ៖
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POWERUPS.map((pw) => {
                  const qty = rewardState.powerUps[pw.id] || 0;
                  const canAfford = rewardState.coins >= pw.price;

                  return (
                    <div key={pw.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl p-2.5 bg-slate-100 rounded-2xl shrink-0">{pw.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900">{pw.name}</h5>
                            {qty > 0 && (
                              <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-bold">
                                មាន {qty}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{pw.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="font-mono text-xs font-bold text-amber-700">🪙 {pw.price} កាក់</span>

                        <button
                          disabled={!canAfford}
                          onClick={() => handleBuyPowerUp(pw)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                            canAfford
                              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          ទិញឧបករណ៍
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: Avatars */}
          {activeTab === 'avatars' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                ដោះសោរូបតំណាងសិស្សពិសេសដើម្បីបង្ហាញលើកម្រងព័ត៌មាន និងប្រកួតប្រជែង៖
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AVATARS.map((av) => {
                  const isUnlocked = rewardState.unlockedAvatarIds.includes(av.id);
                  const isActive = rewardState.activeAvatarId === av.id;

                  return (
                    <div
                      key={av.id}
                      className={`p-4 rounded-2xl border text-center space-y-3 transition-all flex flex-col justify-between ${
                        isActive
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/30'
                          : isUnlocked
                          ? 'bg-white border-slate-200 hover:border-slate-300'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="text-4xl mx-auto py-2">{av.icon}</div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-900">{av.name}</h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isUnlocked ? 'បានដោះសោ' : `តម្លៃ ${av.reqCoins} កាក់`}
                        </p>
                      </div>

                      <button
                        onClick={() => handleUnlockAvatar(av)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-emerald-600 text-white'
                            : isUnlocked
                            ? 'bg-slate-800 text-white hover:bg-slate-900'
                            : rewardState.coins >= av.reqCoins
                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {isActive ? 'កំពុងប្រើ' : isUnlocked ? 'ជ្រើសរើស' : 'ដោះសោ'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: Badges */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                មេដាយកិត្តិយសបង្ហាញពីស្នាដៃ និងការប្រឹងប្រែងរៀនសូត្រ៖
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BADGES.map((badge) => {
                  const isUnlocked = rewardState.unlockedBadgeIds?.includes(badge.id);
                  const canAfford = rewardState.coins >= badge.price;

                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                        isUnlocked
                          ? 'bg-amber-50/60 border-amber-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl p-2 bg-slate-100 rounded-xl shrink-0">
                          {badge.icon}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900">{badge.name}</h5>
                          <p className="text-[11px] text-slate-500">{badge.desc}</p>
                        </div>
                      </div>

                      <button
                        disabled={isUnlocked || !canAfford}
                        onClick={() => handleUnlockBadge(badge)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          isUnlocked
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : canAfford
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {isUnlocked ? 'បានដោះសោ' : `${badge.price} កាក់`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="text-slate-600 font-medium">បេសកកម្ម និងទិន្នន័យត្រូវបានរក្សាទុកដោយស្វ័យប្រវត្តិ</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition-colors cursor-pointer text-xs"
          >
            បិទ
          </button>
        </div>
      </div>
    </div>
  );
};
