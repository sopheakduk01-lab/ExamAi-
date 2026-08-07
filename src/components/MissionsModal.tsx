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
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'achievement' | 'special';
  targetCount: number;
  currentCount: number;
  rewardCoins: number;
  rewardXp: number;
  rewardTitle?: string;
  isClaimed: boolean;
  iconName: 'book' | 'exam' | 'battle' | 'bookmark' | 'streak' | 'score' | 'star' | 'crown';
}

export interface UserRewardState {
  coins: number;
  xp: number;
  level: number;
  claimedMissionIds: string[];
  unlockedAvatarIds: string[];
  activeAvatarId: string;
  unlockedBadgeIds: string[];
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
  { id: 'av_starter', name: 'សិស្សខិតខំ', icon: '🎓', reqCoins: 0 },
  { id: 'av_smart', name: 'សិស្សពូកែ', icon: '⭐', reqCoins: 300 },
  { id: 'av_ai_fighter', name: 'អ្នកប្រយុទ្ធ AI', icon: '🤖', reqCoins: 800 },
  { id: 'av_champion', name: 'ជើងឯកថ្នាក់ទី៦', icon: '🏆', reqCoins: 1500 },
  { id: 'av_math_wizard', name: 'អ្នកប្រាជ្ញលេខ', icon: '📐', reqCoins: 2500 },
  { id: 'av_khmer_scholar', name: 'វីរបុរសអក្សរសាស្ត្រ', icon: '📜', reqCoins: 4000 },
  { id: 'av_king_exam', name: 'ស្ដេចប្រឡង', icon: '👑', reqCoins: 6000 },
  { id: 'av_cosmic_learner', name: 'សិស្សអវកាស', icon: '🚀', reqCoins: 8500 },
  { id: 'av_dragon_master', name: 'នាគរាជប្រាជ្ញា', icon: '🐉', reqCoins: 12000 },
  { id: 'av_supreme_scholar', name: 'ស្ដេចសិស្សឆ្នើមថ្នាក់ជាតិ', icon: '💎', reqCoins: 20000 }
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

export const MissionsModal: React.FC<MissionsModalProps> = ({
  isOpen,
  onClose,
  completedExamCount,
  bookmarkedCount
}) => {
  const [activeTab, setActiveTab] = useState<'missions' | 'avatars' | 'badges'>('missions');
  const [missionCategoryFilter, setMissionCategoryFilter] = useState<'all' | 'daily' | 'achievement' | 'special'>('all');

  // Load reward state
  const [rewardState, setRewardState] = useState<UserRewardState>(() => {
    try {
      const saved = localStorage.getItem('grade6_reward_state');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      coins: 500,
      xp: 800,
      level: 3,
      claimedMissionIds: [],
      unlockedAvatarIds: ['av_starter'],
      activeAvatarId: 'av_starter',
      unlockedBadgeIds: ['bg_first_step']
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

  // Calculate mission progress dynamically based on app activity
  const missionsWithLiveProgress = DEFAULT_MISSIONS.map((m) => {
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

  const filteredMissions = missionsWithLiveProgress.filter((m) => {
    if (missionCategoryFilter === 'all') return true;
    return m.category === missionCategoryFilter;
  });

  const handleClaimReward = (m: Mission) => {
    if (m.isClaimed || m.currentCount < m.targetCount) return;

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

  const handleUnlockAvatar = (av: typeof AVATARS[0]) => {
    if (rewardState.unlockedAvatarIds.includes(av.id)) {
      setRewardState((prev) => ({ ...prev, activeAvatarId: av.id }));
      return;
    }

    if (rewardState.coins >= av.reqCoins) {
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
      setRewardState((prev) => ({
        ...prev,
        coins: prev.coins - badge.price,
        unlockedBadgeIds: [...(prev.unlockedBadgeIds || []), badge.id]
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
        return <Swords className="w-5 h-5 text-amber-600" />;
      case 'bookmark':
        return <Bookmark className="w-5 h-5 text-rose-600" />;
      case 'score':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'crown':
        return <Crown className="w-5 h-5 text-amber-600" />;
      case 'star':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Zap className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shadow-md shrink-0 text-xl">
              🎯
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl font-moul tracking-wide text-amber-100 flex items-center gap-2">
                បេសកកម្ម និងរង្វាន់
                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-200 animate-pulse" />
              </h2>
              <p className="text-xs text-amber-200/90 mt-0.5">
                បំពេញសកម្មភាពសិក្សាដើម្បីទទួលកាក់ ពិន្ទុពិសោធន៍ និងមេដាយកិត្តិយស!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            id="btn-close-missions"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User XP & Currency Status Bar */}
        <div className="bg-slate-900 p-4 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          {/* Level & XP */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md font-mono">
              Lvl {rewardState.level}
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                <span>កម្រិតសមត្ថភាព</span>
                <span className="text-amber-400">{rewardState.xp} XP</span>
              </div>
              <div className="w-32 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${(rewardState.xp % 300) / 3}%` }}
                />
              </div>
            </div>
          </div>

          {/* Knowledge Coins Balance */}
          <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700">
            <Coins className="w-5 h-5 text-amber-400 fill-amber-400" />
            <div className="font-mono font-bold text-amber-300 text-base sm:text-lg">
              {rewardState.coins} <span className="text-xs font-normal text-slate-300">កាក់</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-4 pt-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('missions')}
            className={`pb-3 px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'missions'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Target className="w-4 h-4 text-amber-600" />
            <span>បេសកកម្មសិក្សា ({DEFAULT_MISSIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('avatars')}
            className={`pb-3 px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'avatars'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-600" />
            <span>រូបតំណាងសិស្ស</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-3 px-3.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'badges'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>មេដាយកិត្តិយស</span>
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* 1. Missions Tab */}
          {activeTab === 'missions' && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'all', label: 'ទាំងអស់' },
                  { id: 'daily', label: 'ប្រចាំថ្ងៃ 📅' },
                  { id: 'achievement', label: 'សមិទ្ធផល 🏆' },
                  { id: 'special', label: 'បេសកកម្មពិសេស 👑' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setMissionCategoryFilter(cat.id as any)}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors shrink-0 ${
                      missionCategoryFilter === cat.id
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredMissions.map((mission) => {
                  const canClaim = mission.currentCount >= mission.targetCount && !mission.isClaimed;
                  const progressPct = Math.min(
                    100,
                    Math.round((mission.currentCount / mission.targetCount) * 100)
                  );

                  return (
                    <div
                      key={mission.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        mission.isClaimed
                          ? 'bg-slate-50 border-slate-200 opacity-70'
                          : canClaim
                          ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/30'
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

                      {/* Reward & Claim Button */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-lg">
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
                          <button
                            disabled={!canClaim}
                            onClick={() => handleClaimReward(mission)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              canClaim
                                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:scale-105 active:scale-95'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            }`}
                          >
                            <Gift className="w-4 h-4" />
                            <span>{canClaim ? 'ទទួលរង្វាន់!' : 'មិនទាន់សម្រេច'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Avatars & Titles Tab */}
          {activeTab === 'avatars' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                ប្រើប្រាស់កាក់ចំណេះដឹងដែលទទួលបានពីការបំពេញបេសកកម្ម ដើម្បីដោះសោរូបតំណាងសិស្សពិសេស៖
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

          {/* 3. Badges Shop Tab */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                ដោះសោមេដាយកិត្តិយស និងរង្វាន់ពិសេស ដើម្បីបង្ហាញពីសមត្ថភាព និងភាពឧស្សាហ៍ព្យាយាមរបស់ប្អូន៖
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
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
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
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>បេសកកម្មត្រូវបានធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិ</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            បិទ
          </button>
        </div>
      </div>
    </div>
  );
};
