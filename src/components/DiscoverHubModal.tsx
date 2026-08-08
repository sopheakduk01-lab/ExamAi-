import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  TrendingUp,
  Flame,
  Award,
  BookOpen,
  Brain,
  Zap,
  ArrowRight,
  Star,
  CheckCircle2,
  Clock,
  Play,
  Lightbulb
} from 'lucide-react';

interface DiscoverHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLibrary: () => void;
  onOpenAITutor: () => void;
  onStartExam: (subjectId: any) => void;
}

export const DiscoverHubModal: React.FC<DiscoverHubModalProps> = ({
  isOpen,
  onClose,
  onOpenLibrary,
  onOpenAITutor,
  onStartExam,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trending' | 'tips' | 'trivia'>('all');
  const [triviaAnswered, setTriviaAnswered] = useState<number | null>(null);

  if (!isOpen) return null;

  const trendingTopics = [
    {
      id: 'math-1',
      title: 'គន្លឹះដោះស្រាយលំហាត់ប្រភាគ និងសមាមាត្រថ្នាក់ទី៦ ឱ្យបាន ១០/១០',
      category: 'គណិតវិទ្យា',
      readTime: '៥ នាទី',
      likes: '១.២ខេ',
      badge: 'ពេញនិយមខ្លាំង',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'khmer-1',
      title: 'ក្បួនសរសេរអត្ថបទពិពណ៌នា និងរឿងនិទានប្រឡងសញ្ញាបត្របឋមសិក្សា',
      category: 'ភាសាខ្មែរ',
      readTime: '៧ នាទី',
      likes: '៩៨០',
      badge: 'សំខាន់ខ្លាំង',
      color: 'from-rose-600 to-orange-600'
    },
    {
      id: 'sci-1',
      title: 'ប្រព័ន្ធរំលាយអាហារ និងមុខងារសរីរាង្គក្នុងរាង្គកាយមនុស្ស',
      category: 'វិទ្យាសាស្ត្រ',
      readTime: '៦ នាទី',
      likes: '៨៥០',
      badge: 'ចំណេះដឹងទូទៅ',
      color: 'from-emerald-600 to-teal-600'
    }
  ];

  const aiTips = [
    {
      title: 'បច្ចេកទេស Pomodoro (២៥នាទីសិក្សា + ៥នាទីសម្រាក)',
      desc: 'ជួយឱ្យខួរក្បាលស្រស់ថ្លា និងចងចាំមេរៀនបានយូរអង្វែងពេលរៀបចំប្រឡងថ្នាក់ទី៦។'
    },
    {
      title: 'ការបង្កើតសំនួរខ្លួនឯង (Active Recall)',
      desc: 'កុំគ្រាន់តែអានអត្ថបទ ត្រូវព្យាយាមបិទទំព័រហើយសួរខ្លួនឯងឡើងវិញពីខ្លឹមសារស្នូល។'
    },
    {
      title: 'ការដោះស្រាយលំហាត់គំរូតាមឆ្នាំចាស់ៗ',
      desc: 'ហ្វឹកហាត់វិញ្ញាសាឆ្នាំមុនៗយ៉ាងហោចណាស់ ៥ សន្លឹកមុនថ្ងៃប្រឡងផ្លូវការ។'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-moul tracking-wide flex items-center gap-2">
                <span>Discover Hub</span>
                <span className="text-xs bg-yellow-400 text-slate-950 font-sans px-2 py-0.5 rounded-full font-extrabold">EXPLORE</span>
              </h2>
              <p className="text-xs text-indigo-100 font-medium">ស្វែងយល់ពីមាតិកាពិសេស គន្លឹះសិក្សា និងចំណេះដឹងថ្មីៗថ្នាក់ទី៦</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Sub-navigation categories */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-t-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🌟 ទិដ្ឋភាពទូទៅ
          </button>
          <button
            onClick={() => setActiveCategory('trending')}
            className={`px-4 py-2 rounded-t-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'trending'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🔥 មេរៀនពេញនិយម
          </button>
          <button
            onClick={() => setActiveCategory('tips')}
            className={`px-4 py-2 rounded-t-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'tips'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            💡 គន្លឹះសិក្សា AI
          </button>
          <button
            onClick={() => setActiveCategory('trivia')}
            className={`px-4 py-2 rounded-t-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'trivia'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🎯 សំណួរពុទ្ធិរហ័ស
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          
          {/* Quick Hero Banner inside Discover */}
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 p-6 text-white overflow-hidden shadow-xl">
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" /> មុខងារពិសេសប្រចាំថ្ងៃ
              </span>
              <h3 className="text-lg font-bold font-moul">ត្រៀមខ្លួនរួចរាល់សម្រាប់ការប្រឡងថ្នាក់ទី៦</h3>
              <p className="text-xs text-indigo-200 leading-relaxed max-w-lg">
                ស្វែងរកបណ្តុំមេរៀនសង្ខេប ការពន្យល់ពី AI និងលំហាត់គំរូដែលត្រូវបានសម្រិតសម្រាំងយ៉ាងពិសេសសម្រាប់សិស្សានុសិស្សកម្ពុជា។
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenLibrary();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>ចូលអានបណ្ណាល័យឌីជីថល</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAITutor();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-700/80 hover:bg-indigo-700 text-white font-bold text-xs border border-indigo-500/50 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Brain className="w-4 h-4 text-yellow-300" />
                  <span>ជជែកជាមួយ AI Tutor</span>
                </button>
              </div>
            </div>
          </div>

          {(activeCategory === 'all' || activeCategory === 'trending') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>មេរៀន និងអត្ថបទពេញនិយមប្រចាំសប្តាហ៍</span>
                </h4>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline" onClick={() => onOpenLibrary()}>
                  មើលទាំងអស់ →
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {trendingTopics.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onOpenLibrary();
                    }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-current" /> {item.badge}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {item.title}
                      </h5>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.readTime}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">អានឥឡូវ <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeCategory === 'all' || activeCategory === 'tips') && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>គន្លឹះសិក្សាជោគជ័យពីគ្រូបង្រៀន AI</span>
              </h4>

              <div className="space-y-2.5">
                {aiTips.map((tip, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{tip.title}</h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeCategory === 'all' || activeCategory === 'trivia') && (
            <div className="space-y-3 p-4 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-600 text-white">សំណួរពុទ្ធិប្រចាំថ្ងៃ</span>
                <span className="text-xs text-slate-500">កម្រិត ថ្នាក់ទី៦</span>
              </div>
              
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                តើបុរាណដ្ឋានអង្គរវត្តត្រូវបានកសាងឡើងក្នុងសតវត្សរ៍ទីប៉ុន្មាន?
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { text: 'សតវត្សរ៍ទី ១១', correct: false },
                  { text: 'សតវត្សរ៍ទី ១២', correct: true },
                  { text: 'សតវត្សរ៍ទី ១៣', correct: false },
                  { text: 'សតវត្សរ៍ទី ១៤', correct: false },
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTriviaAnswered(idx)}
                    className={`p-3 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                      triviaAnswered === null
                        ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                        : opt.correct
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                        : triviaAnswered === idx
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60'
                    }`}
                  >
                    {opt.text} {triviaAnswered !== null && opt.correct && ' ✓'}
                  </button>
                ))}
              </div>

              {triviaAnswered !== null && (
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-emerald-600">ការពន្យល់៖</span> ប្រាសាទអង្គរវត្តកសាងឡើងដោយព្រះបាទសូរ្យវរ្ម័នទី២ នៅពាក់កណ្តាលសតវត្សរ៍ទី១២ (ឆ្នាំ១១១៣ - ១១៥០)។
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
