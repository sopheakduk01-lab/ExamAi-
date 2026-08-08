import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, BookOpen, Brain, CheckCircle2, Trash2, Play, FileText, Award, HelpCircle } from 'lucide-react';

interface CustomQuizItem {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  createdAt: string;
}

interface AICreatorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomQuiz: (quizTitle: string, questions: CustomQuizItem[]) => void;
}

export const AICreatorStudioModal: React.FC<AICreatorStudioModalProps> = ({
  isOpen,
  onClose,
  onStartCustomQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'ai_generate' | 'manual' | 'my_creations'>('ai_generate');
  
  // AI Generator Form State
  const [subject, setSubject] = useState('គណិតវិទ្យា');
  const [topic, setTopic] = useState('ប្រភាគ និងសមាមាត្រ');
  const [difficulty, setDifficulty] = useState('មធ្យម');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual Form State
  const [manualQuestion, setManualQuestion] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [manualExplanation, setManualExplanation] = useState('');

  // Saved Custom Creations
  const [savedCreations, setSavedCreations] = useState<CustomQuizItem[]>(() => {
    try {
      const stored = localStorage.getItem('grade6_custom_creations');
      return stored ? JSON.parse(stored) : [
        {
          id: 'demo-1',
          subject: 'គណិតវិទ្យា',
          question: 'តើផលគុណនៃ ១២៥ និង ៨ ស្មើនឹងប៉ុន្មាន?',
          options: ['៨០០', '១០០០', '១២៥០', '៩៥០'],
          correctAnswer: 1,
          explanation: '១២៥ × ៨ = ១០០០ ។',
          createdAt: new Date().toLocaleDateString()
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('grade6_custom_creations', JSON.stringify(savedCreations));
    } catch (e) {
      console.error(e);
    }
  }, [savedCreations]);

  if (!isOpen) return null;

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Simulate AI generating robust questions for Grade 6
      const newItems: CustomQuizItem[] = [];
      for (let i = 1; i <= questionCount; i++) {
        newItems.push({
          id: 'ai-' + Date.now() + '-' + i,
          subject: subject,
          question: `សំណួរ AI ទី ${i} លើប្រធានបទ "${topic}" សម្រាប់ថ្នាក់ទី៦៖ តើលទ្ធផលត្រឹមត្រូវគឺអ្វី?`,
          options: [
            `ចម្លើយ A សម្រាប់ ${topic}`,
            `ចម្លើយ B ត្រឹមត្រូវតាមស្ដង់ដារ`,
            `ចម្លើយ C ជំនួស`,
            `ចម្លើយ D បំពេញបន្ថែម`
          ],
          correctAnswer: 1,
          explanation: `ការពន្យល់លម្អិតពី AI៖ ប្រធានបទ ${topic} ទាមទារការយល់ដឹងពីគោលគំនិតគ្រឹះថ្នាក់ទី៦។`,
          createdAt: new Date().toLocaleDateString()
        });
      }
      setSavedCreations(prev => [...newItems, ...prev]);
      setIsGenerating(false);
      setActiveTab('my_creations');
    }, 1200);
  };

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuestion || !opt1 || !opt2) return;

    const newItem: CustomQuizItem = {
      id: 'manual-' + Date.now(),
      subject: subject,
      question: manualQuestion,
      options: [opt1, opt2, opt3 || 'គ្មាន', opt4 || 'គ្មាន'],
      correctAnswer: correctIndex,
      explanation: manualExplanation || 'បង្កើតដោយសិស្សផ្ទាល់សម្រាប់ត្រៀមប្រឡង។',
      createdAt: new Date().toLocaleDateString()
    };

    setSavedCreations(prev => [newItem, ...prev]);
    setManualQuestion('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setOpt4('');
    setManualExplanation('');
    setActiveTab('my_creations');
  };

  const handleDeleteItem = (id: string) => {
    setSavedCreations(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-moul tracking-wide flex items-center gap-2">
                <span>ស្ទូឌីយ៉ូបង្កើតសំណួរ AI</span>
                <span className="text-xs bg-yellow-400 text-purple-950 font-sans px-2 py-0.5 rounded-full font-extrabold">NEW</span>
              </h2>
              <p className="text-xs text-purple-100 font-medium">បង្កើតវិញ្ញាសា និងកាតពន្លឺផ្ទាល់ខ្លួនសម្រាប់ថ្នាក់ទី៦</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('ai_generate')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'ai_generate'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Brain className="w-4 h-4 text-purple-500" />
            <span>AI បង្កើតស្វ័យប្រវត្តិ</span>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4 text-indigo-500" />
            <span>បង្កើតដោយដៃ</span>
          </button>
          <button
            onClick={() => setActiveTab('my_creations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'my_creations'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>សំណួរដែលបានបង្កើត ({savedCreations.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'ai_generate' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div className="text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
                  <span className="font-bold">ជំនួយការ AI ថ្នាក់ទី៦៖</span> ជ្រើសរើសមុខវិជ្ជា និងប្រធានបទដែលអ្នកចង់ហ្វឹកហាត់ នោះប្រព័ន្ធ AI នឹងបង្កើតសំណួរពហុជម្រើស និងការពន្យល់ច្បាស់លាស់ជូនភ្លាមៗ។
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">មុខវិជ្ជា</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="គណិតវិទ្យា">📐 គណិតវិទ្យា</option>
                    <option value="ភាសាខ្មែរ">🇰🇭 ភាសាខ្មែរ</option>
                    <option value="សិក្សាសង្គម">🌍 សិក្សាសង្គម (ប្រវត្តិវិទ្យា ភូមិវិទ្យា សីលធម៌)</option>
                    <option value="វិទ្យាសាស្ត្រ">🔬 វិទ្យាសាស្ត្រ (រូបវិទ្យា ជីវវិទ្យា គីមីវិទ្យា)</option>
                    <option value="អង់គ្លេស">🇬🇧 ភាសាអង់គ្លេស</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">កម្រិតពិបាក</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="ងាយស្រួល">⭐ ងាយស្រួល (កម្រិតមូលដ្ឋាន)</option>
                    <option value="មធ្យម">⭐⭐ មធ្យម (ស្ដង់ដារប្រឡង)</option>
                    <option value="ប្រឡងថ្នាក់ជាតិ">⭐⭐⭐ ពិបាក (ត្រៀមសិស្សពូកែ/ថ្នាក់ជាតិ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">ប្រធានបទ ឬសំណួរគំរូ</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="ឧ. ប្រភាគទសភាគ, រុក្ខជាតិ និងសត្វ, ប្រវត្តិសាស្ត្រសម័យអង្គរ..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">ចំនួនសំណួរ: {questionCount}</label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>៣ សំណួរ</span>
                  <span>១០ សំណួរ</span>
                  <span>១៥ សំណួរ</span>
                </div>
              </div>

              <button
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-base shadow-lg shadow-purple-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>កំពុងបង្កើតសំណួរដោយ AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span>បង្កើតសំណួរភ្លាមៗ (AI Generator)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === 'manual' && (
            <form onSubmit={handleAddManual} className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">មុខវិជ្ជា</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  >
                    <option value="គណិតវិទ្យា">គណិតវិទ្យា</option>
                    <option value="ភាសាខ្មែរ">ភាសាខ្មែរ</option>
                    <option value="សិក្សាសង្គម">សិក្សាសង្គម</option>
                    <option value="វិទ្យាសាស្ត្រ">វិទ្យាសាស្ត្រ</option>
                    <option value="អង់គ្លេស">ភាសាអង់គ្លេស</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ចម្លើយត្រឹមត្រូវ</label>
                  <select
                    value={correctIndex}
                    onChange={(e) => setCorrectIndex(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-emerald-600"
                  >
                    <option value={0}>ជម្រើសទី ១ ត្រឹមត្រូវ</option>
                    <option value={1}>ជម្រើសទី ២ ត្រឹមត្រូវ</option>
                    <option value={2}>ជម្រើសទី ៣ ត្រឹមត្រូវ</option>
                    <option value={3}>ជម្រើសទី ៤ ត្រឹមត្រូវ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">សំនួរ</label>
                <textarea
                  rows={2}
                  value={manualQuestion}
                  onChange={(e) => setManualQuestion(e.target.value)}
                  placeholder="សរសេរសំណួររបស់អ្នកនៅទីនេះ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  placeholder="ជម្រើសទី ១"
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  required
                />
                <input
                  type="text"
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  placeholder="ជម្រើសទី ២"
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  required
                />
                <input
                  type="text"
                  value={opt3}
                  onChange={(e) => setOpt3(e.target.value)}
                  placeholder="ជម្រើសទី ៣ (προαιρετικά)"
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
                <input
                  type="text"
                  value={opt4}
                  onChange={(e) => setOpt4(e.target.value)}
                  placeholder="ជម្រើសទី ៤ (προαιρετικά)"
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ការពន្យល់ (Explanation)</label>
                <input
                  type="text"
                  value={manualExplanation}
                  onChange={(e) => setManualExplanation(e.target.value)}
                  placeholder="មូលហេតុដែលចម្លើយនេះត្រឹមត្រូវ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                + រក្សាទុកសំណួរថ្មី
              </button>
            </form>
          )}

          {activeTab === 'my_creations' && (
            <div className="space-y-3 animate-fadeIn">
              {savedCreations.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <HelpCircle className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">មិនទាន់មានសំណួរដែលបានបង្កើតនៅឡើយទេ</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">សរុប: {savedCreations.length} សំណួរ</span>
                    <button
                      onClick={() => {
                        onStartCustomQuiz('សំណួរដែលបានបង្កើតដោយខ្លួនឯង', savedCreations);
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>លេងសាកល្បងទាំងអស់ ({savedCreations.length})</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {savedCreations.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                              {item.subject}
                            </span>
                            <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.question}</p>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            ✓ ចម្លើយត្រឹមត្រូវ៖ {item.options[item.correctAnswer]}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              onStartCustomQuiz(`វិញ្ញាសា៖ ${item.subject}`, [item]);
                              onClose();
                            }}
                            className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 transition-colors cursor-pointer"
                            title="លេងសំណួរនេះ"
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="លុប"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
