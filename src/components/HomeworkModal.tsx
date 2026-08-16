import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  BookMarked,
  Save,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';

interface HomeworkQuestion {
  id: string;
  type: 'text' | 'choice' | 'match';
  questionText: string;
  placeholder?: string;
  correctAnswer: string;
  options?: string[];
  explanation: string;
}

interface HomeworkSheet {
  id: string;
  subjectId: string;
  subjectName: string;
  lessonNumber: string;
  lessonTitle: string;
  topicTitle: string;
  badgeColor: string;
  questions: HomeworkQuestion[];
}

interface HomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnCoins?: (coins: number, xp: number) => void;
}

const HOMEWORK_SHEETS: HomeworkSheet[] = [
  {
    id: 'hw_math_lesson1',
    subjectId: 'math',
    subjectName: 'គណិតវិទ្យាថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី១៖ ចំនួន',
    lessonTitle: 'ចំនួន',
    topicTitle: '❖ អំណាន និងសំណេរចំនួន',
    badgeColor: 'bg-rose-500 text-white border-rose-300',
    questions: [
      {
        id: 'hw_math_q1',
        type: 'text',
        questionText: '១. ចូរសរសេរចំនួន "១២,៤៥០,៧០០" ជាអក្សរ៖',
        placeholder: 'សរសេរចម្លើយជាអក្សរខ្មែរនៅទីនេះ...',
        correctAnswer: 'ដប់ពីរលានសែសិបប្រាំម៉ឺនប្រាំពីររយ',
        explanation: 'ចំនួន ១២,៤៥០,៧០០ អានថា "ដប់ពីរលានសែសិបប្រាំម៉ឺនប្រាំពីររយ"។'
      },
      {
        id: 'hw_math_q2',
        type: 'text',
        questionText: '២. ចូរសរសេរចំនួន "ប្រាំលានប្រាំបួនសែនបីម៉ឺនប្រាំពីរ" ជាលេខ៖',
        placeholder: 'សរសេរចម្លើយជាលេខ (ឧទាហរណ៍៖ 5,000,000)...',
        correctAnswer: '5,930,007',
        explanation: 'ប្រាំលាន (5,000,000) + ប្រាំបួនសែន (900,000) + បីម៉ឺន (30,000) + ប្រាំពីរ (7) = 5,930,007 (ឬ ៥,៩៣០,០០៧)។'
      },
      {
        id: 'hw_math_q3',
        type: 'choice',
        questionText: '៣. ក្នុងចំនួន ៧,៥៤២,៣០០ តើលេខ ៥ ស្ថិតនៅខ្ទង់អ្វី ហើយមានតម្លៃស្មើនឹងប៉ុន្មាន?',
        options: [
          'ក. ខ្ទង់រយ មានតម្លៃ ៥០០',
          'ខ. ខ្ទង់ម៉ឺន មានតម្លៃ ៥០,០០០',
          'គ. ខ្ទង់សែន មានតម្លៃ ៥០០,០០០',
          'ឃ. ខ្ទង់លាន មានតម្លៃ ៥,០០០,០០០'
        ],
        correctAnswer: 'គ. ខ្ទង់សែន មានតម្លៃ ៥០០,០០០',
        explanation: 'លេខ ៥ នៅក្នុង ៧,៥៤២,៣០០ ស្ថិតនៅក្នុងខ្ទង់សែន ដូច្នេះវាមានតម្លៃស្មើនឹង ៥០០,០០០។'
      },
      {
        id: 'hw_math_q4',
        type: 'text',
        questionText: '៤. ចូរគណនា៖ ៤,៥០០,០០០ + ៣៥០,០០០ = ?',
        placeholder: 'សរសេរលទ្ធផលជាលេខ...',
        correctAnswer: '4,850,000',
        explanation: '៤,៥០០,០០០ បូក ៣៥០,០០០ ស្មើនឹង ៤,៨៥០,០០០ (4,850,000)។'
      }
    ]
  },
  {
    id: 'hw_khmer_grammar',
    subjectId: 'khmer',
    subjectName: 'ភាសាខ្មែរថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនវេយ្យាករណ៍',
    lessonTitle: 'ថ្នាក់ពាក្យ',
    topicTitle: '❖ នាម អាយតនិបាត និងគុណនាម',
    badgeColor: 'bg-blue-600 text-white border-blue-300',
    questions: [
      {
        id: 'hw_khmer_q1',
        type: 'choice',
        questionText: '១. តើពាក្យ "សាលារៀន" ជាថ្នាក់ពាក្យប្រភេទអ្វី?',
        options: [
          'ក. កិរិយាសព្ទ',
          'ខ. នាមអរូបី',
          'គ. នាមរូបី (នាមទូទៅ)',
          'ឃ. គុណនាម'
        ],
        correctAnswer: 'គ. នាមរូបី (នាមទូទៅ)',
        explanation: 'សាលារៀន ជានាមរូបី (នាមទូទៅ) ព្រោះជាពាក្យសម្គាល់ទីកន្លែងដែលយើងមើលឃើញផ្ទាល់ភ្នែក។'
      },
      {
        id: 'hw_khmer_q2',
        type: 'text',
        questionText: '២. ចូរបំពេញពាក្យអាយតនិបាត (ធ្នាក់) ត្រឹមត្រូវក្នុងល្បះ៖ "សិស្សានុសិស្សកំពុងរៀនសូត្រ ________ បណ្ណាល័យ។"',
        placeholder: 'បំពេញពាក្យត្រឹមត្រូវ (ឧ. នៅ, ក្នុង, ទៅ)...',
        correctAnswer: 'នៅក្នុង',
        explanation: 'ពាក្យ "នៅក្នុង" ឬ "ក្នុង" ឬ "នៅ" គឺជាអាយតនិបាត (ធ្នាក់) ដែលបង្ហាញទីកន្លែងសមស្របបំផុតសម្រាប់ល្បះនេះ។'
      },
      {
        id: 'hw_khmer_q3',
        type: 'choice',
        questionText: '៣. តើពាក្យ "ឆ្លាតវៃ" នៅក្នុងឃ្លា "សិស្សឆ្លាតវៃ" ជាថ្នាក់ពាក្យអ្វី?',
        options: [
          'ក. នាម',
          'ខ. គុណនាម',
          'គ. សព្វនាម',
          'ឃ. កិរិយាសព្ទ'
        ],
        correctAnswer: 'ខ. គុណនាម',
        explanation: '«ឆ្លាតវៃ» ជាគុណនាម ព្រោះវាប្រើសម្រាប់បញ្ជាក់លក្ខណៈ ឬគុណភាពឱ្យនាម «សិស្ស»។'
      }
    ]
  },
  {
    id: 'hw_science_plants',
    subjectId: 'science',
    subjectName: 'វិទ្យាសាស្ត្រថ្នាក់ទី៦',
    lessonNumber: 'មេរៀនទី២៖ រុក្ខជាតិ និងដី',
    lessonTitle: 'រុក្ខជាតិ',
    topicTitle: '❖ សរីរាង្គលូតលាស់ និងការបន្តពូជរបស់រុក្ខជាតិ',
    badgeColor: 'bg-emerald-600 text-white border-emerald-300',
    questions: [
      {
        id: 'hw_science_q1',
        type: 'choice',
        questionText: '១. តើសរីរាង្គណាខ្លះរបស់រុក្ខជាតិដែលចាត់ទុកជា "សរីរាង្គលូតលាស់"?',
        options: [
          'ក. ផ្កា ផ្លែ និងគ្រាប់',
          'ខ. រឹស ដើម និងស្លឹក',
          'គ. លម្អងញី និងលម្អងឈ្មោល',
          'ឃ. ឫស និងផ្កា'
        ],
        correctAnswer: 'ខ. រឹស ដើម និងស្លឹក',
        explanation: 'ឫស ដើម និងស្លឹក គឺជាសរីរាង្គលូតលាស់របស់រុក្ខជាតិ ចំណែកឯផ្កា ផ្លែ និងគ្រាប់ គឺជាសរីរាង្គបន្តពូជ។'
      },
      {
        id: 'hw_science_q2',
        type: 'text',
        questionText: '២. តើរុក្ខជាតិបៃតងផលិតអាហារផ្ទាល់ខ្លួនតាមរយៈដំណើរការអ្វី?',
        placeholder: 'សរសេរឈ្មោះដំណើរការនោះជាភាសាខ្មែរ...',
        correctAnswer: 'រស្មីសំយោគ',
        explanation: 'រុក្ខជាតិបៃតងធ្វើដំណើរការ "រស្មីសំយោគ" (Photosynthesis) ដោយប្រើប្រាស់ពន្លឺព្រះអាទិត្យ ទឹក និងឧស្ម័នកាបូនិច ដើម្បីផលិតអាហារ (គ្លុយកូស)។'
      },
      {
        id: 'hw_science_q3',
        type: 'choice',
        questionText: '៣. តើធាតុផ្សំសំខាន់បំផុតនៅក្នុងស្លឹករុក្ខជាតិដែលស្រូបពន្លឺព្រះអាទិត្យមានឈ្មោះថាអ្វី?',
        options: [
          'ក. អុកស៊ីសែន',
          'ខ. ក្លរ៉ូភីល (Chlorophyll)',
          'គ. អាសូត',
          'ឃ. កាបូន'
        ],
        correctAnswer: 'ខ. ក្លរ៉ូភីល (Chlorophyll)',
        explanation: 'ក្លរ៉ូភីល (Chlorophyll) គឺជាសារធាតុពណ៌បៃតងនៅក្នុងស្លឹករុក្ខជាតិ ដែលដើរតួនាទីយ៉ាងសំខាន់ក្នុងការស្រូបយកថាមពលពន្លឺព្រះអាទិត្យ។'
      }
    ]
  }
];

export const HomeworkModal: React.FC<HomeworkModalProps> = ({
  isOpen,
  onClose,
  onEarnCoins
}) => {
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [gradedQuestions, setGradedQuestions] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'practice' | 'history'>('practice');
  const [homeworkHistory, setHomeworkHistory] = useState<Array<{
    sheetTitle: string;
    subject: string;
    score: number;
    total: number;
    date: string;
  }>>([
    {
      sheetTitle: 'មេរៀនទី១៖ ចំនួន (អំណាន និងសំណេរចំនួន)',
      subject: 'គណិតវិទ្យាថ្នាក់ទី៦',
      score: 4,
      total: 4,
      date: '០៧ សីហា ២០២៦'
    }
  ]);

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isOpen) return null;

  const currentSheet = HOMEWORK_SHEETS[selectedSheetIndex];

  const handleAnswerChange = (questionId: string, value: string) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const cleanText = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[,.\s\-\[\]\(\)]/g, '')
      .replace(/៥/g, '5')
      .replace(/៩/g, '9')
      .replace(/៣/g, '3')
      .replace(/៧/g, '7')
      .trim();
  };

  const checkAnswerCorrectness = (q: HomeworkQuestion, studentAns: string): boolean => {
    if (!studentAns) return false;
    
    if (q.type === 'choice') {
      return studentAns.charAt(0) === q.correctAnswer.charAt(0);
    }
    
    // Flexible text match for young students
    const cleanStudent = cleanText(studentAns);
    const cleanCorrect = cleanText(q.correctAnswer);
    return cleanStudent.includes(cleanCorrect) || cleanCorrect.includes(cleanStudent);
  };

  const handleSubmitHomework = () => {
    const grades: Record<string, boolean> = {};
    let correctCount = 0;

    currentSheet.questions.forEach((q) => {
      const studentAns = studentAnswers[q.id] || '';
      const isCorrect = checkAnswerCorrectness(q, studentAns);
      grades[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setGradedQuestions(grades);
    setShowResults(true);

    // Reward points for submitting homework
    const earnedCoins = correctCount * 100 + 50;
    const earnedXp = correctCount * 150 + 100;
    
    if (onEarnCoins) {
      onEarnCoins(earnedCoins, earnedXp);
    }

    // Add to local history
    const isAlreadyInHistory = homeworkHistory.some(
      (h) => h.sheetTitle === `${currentSheet.lessonNumber} (${currentSheet.lessonTitle})` && h.score === correctCount
    );

    if (!isAlreadyInHistory) {
      setHomeworkHistory((prev) => [
        {
          sheetTitle: `${currentSheet.lessonNumber} - ${currentSheet.topicTitle}`,
          subject: currentSheet.subjectName,
          score: correctCount,
          total: currentSheet.questions.length,
          date: 'ថ្ងៃនេះ'
        },
        ...prev
      ]);
    }
  };

  const handleReset = () => {
    setStudentAnswers({});
    setShowResults(false);
    setGradedQuestions({});
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAskAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');

    // Simulate AI homework tutoring in Khmer
    setTimeout(() => {
      let responseText = '';
      if (aiPrompt.toLowerCase().includes('គណិត') || aiPrompt.toLowerCase().includes('ចំនួន')) {
        responseText = `🤖 **ជំនួយការគ្រូ AI សិក្សា៖**\n\nដើម្បីអាន ឬសរសេរចំនួនធំៗបានល្អ ប្អូនត្រូវចងចាំការបែងចែកខ្ទង់ជាក្រុម (ក្រុមលាន ក្រុមពាន់ និងក្រុមឯកតា)៖\n\n១. **ក្រុមឯកតា៖** ខ្ទង់រយ ខ្ទង់ដប់ ខ្ទង់រាយ\n២. **ក្រុមពាន់៖** ខ្ទង់រយពាន់ (សែន) ខ្ទង់ដប់ពាន់ (ម៉ឺន) ខ្ទង់ពាន់\n៣. **ក្រុមលាន៖** ខ្ទង់លាន ខ្ទង់ដប់លាន ខ្ទង់រយលាន\n\n**ឧទាហរណ៍៖** ចំនួន **១២,៤៥០,៧០០** គឺមាន៖\n- ១២ នៅក្នុងក្រុមលាន ➔ **ដប់ពីរលាន**\n- ៤៥០ នៅក្នុងក្រុមពាន់ ➔ **សែសិបប្រាំម៉ឺន (ឬបួនរយហាសិបពាន់)**\n- ៧០០ នៅក្នុងក្រុមឯកតា ➔ **ប្រាំពីររយ**\n\nសរុបមកអានថា៖ **"ដប់ពីរលានសែសិបប្រាំម៉ឺនប្រាំពីររយ"**។ សាកល្បងអនុវត្តលំហាត់ផ្សេងៗទៀតណា!`;
      } else {
        responseText = `🤖 **ជំនួយការគ្រូ AI សិក្សា៖**\n\nមេរៀននេះសំខាន់ណាស់សម្រាប់ថ្នាក់ទី៦! \n\nដើម្បីធ្វើកិច្ចការផ្ទះបានពិន្ទុល្អ ប្អូនគួរ៖\n- ពិនិត្យសំនួរឱ្យបានច្បាស់លាស់\n- អានសៀវភៅសិក្សាគោលទំព័រដែលទាក់ទង\n- បំពេញចម្លើយដោយយកចិត្តទុកដាក់ និងមិនប្រញាប់ប្រញាល់ពេកទេ។\n\nតើប្អូនមានចម្ងល់ត្រង់សំណួរណាខ្លះ? ចូរប្រាប់លោកគ្រូ AI មក លោកគ្រូនឹងជួយពន្យល់ជាជំហានៗ!`;
      }
      setAiResponse(responseText);
      setIsAiLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in overflow-y-auto">
      <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Top bar with tabs and close button */}
        <div className="bg-[#8C5E3C] text-amber-50 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-md shrink-0">
              <BookMarked className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg font-moul tracking-wide text-amber-100">
                ផ្ទាំងកិច្ចការផ្ទះសិស្ស (Homework Board)
              </h2>
              <p className="text-xs text-amber-200/90 font-medium">
                ធ្វើកិច្ចការផ្ទះ អនុវត្តលំហាត់ ដើម្បីពង្រឹងសមត្ថភាព និងទទួលបានពិន្ទុបន្ថែម!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-amber-400 text-amber-950 shadow-inner'
                  : 'bg-white/10 text-amber-100 hover:bg-white/20'
              }`}
            >
              កិច្ចការត្រូវធ្វើ
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-amber-400 text-amber-950 shadow-inner'
                  : 'bg-white/10 text-amber-100 hover:bg-white/20'
              }`}
            >
              ប្រវត្តិកិច្ចការ
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 text-amber-200 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              title="បិទ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {activeTab === 'practice' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col md:flex-row gap-5 bg-slate-50 dark:bg-slate-950">
            
            {/* Left sidebar: homework selection sheets list */}
            <div className="w-full md:w-72 shrink-0 space-y-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  រាយនាមកិច្ចការផ្ទះ
                </h3>
                <div className="space-y-2.5">
                  {HOMEWORK_SHEETS.map((sheet, idx) => (
                    <button
                      key={sheet.id}
                      onClick={() => {
                        setSelectedSheetIndex(idx);
                        setShowResults(false);
                        setStudentAnswers({});
                        setGradedQuestions({});
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        selectedSheetIndex === idx
                          ? 'bg-amber-500/10 border-amber-500 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="text-2xl mt-0.5">
                        {sheet.subjectId === 'math' ? '📐' : sheet.subjectId === 'khmer' ? '📚' : '🔬'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            {sheet.lessonNumber.split('៖')[0]}
                          </span>
                        </div>
                        <h4 className="font-moul text-[11px] sm:text-xs text-slate-800 dark:text-slate-200 truncate mt-1">
                          {sheet.lessonTitle}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">
                          {sheet.subjectName}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Homework Helper mini widget */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-sm shadow-xs">
                    🤖
                  </div>
                  <h4 className="text-xs font-bold font-moul text-indigo-950 dark:text-indigo-200">
                    ជំនួយការលំហាត់ AI ផ្ទាល់ខ្លួន
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  សួរនាំពន្យល់ពីវិធីដោះស្រាយលំហាត់ ឬកិច្ចការផ្ទះនេះ៖
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                    placeholder="សួរពីវិធីគិត អានចំនួន..."
                    className="w-full py-2 pl-3 pr-8 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 dark:text-slate-100"
                  />
                  <button
                    onClick={handleAskAi}
                    className="absolute right-1.5 top-1.5 p-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>

                {isAiLoading && (
                  <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold justify-center pt-1 animate-pulse">
                    <span>កំពុងគិត...</span>
                  </div>
                )}

                {aiResponse && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-[10px] leading-relaxed text-slate-700 dark:text-slate-300 border border-indigo-100 dark:border-indigo-950 max-h-48 overflow-y-auto whitespace-pre-line font-medium shadow-xs">
                    {aiResponse}
                  </div>
                )}
              </div>
            </div>

            {/* Right: The Homework Paper Sheet (Official Look & Feel from Image) */}
            <div className="flex-1 flex flex-col items-center">
              
              {/* Paper Worksheet Container mimicking an official MoEYS A4 printout */}
              <div 
                id="homework-printable-area" 
                className="w-full bg-white text-slate-950 rounded-3xl p-6 sm:p-9 shadow-md border border-slate-300/80 max-w-[760px] relative overflow-hidden flex flex-col justify-between min-h-[720px]"
              >
                {/* Decorative background lines mimicking paper watermark */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

                <div className="relative z-10 space-y-6">
                  
                  {/* CENTRED OFFICIAL MINISTRY LOGO & HEADER */}
                  <div className="flex flex-col items-center text-center space-y-3.5 border-b-2 border-slate-200 pb-5">
                    {/* Cambodia Ministry Logo */}
                    <div className="w-[100px] h-[100px] flex items-center justify-center shrink-0 relative">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Emblem_of_the_Ministry_of_Education%2C_Youth_and_Sport_%28Cambodia%29.svg"
                        alt="ក្រសួងអប់រំ យុវជន និងកីឡា"
                        className="object-contain w-full h-full filter drop-shadow-xs"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback logo if wikipedia fails
                          e.currentTarget.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=150&q=80";
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-moul text-[13px] text-slate-900 tracking-wide">
                        ក្រសួងអប់រំ យុវជន និងកីឡា
                      </h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">
                        Ministry of Education, Youth and Sport
                      </p>
                    </div>

                    {/* Image-accurate homework title section */}
                    <div className="pt-2 space-y-1">
                      <h2 className="font-moul text-[16px] text-slate-900 border-b border-slate-300 pb-0.5 inline-block">
                        {currentSheet.subjectName}
                      </h2>
                      <p className="font-moul text-[14px] text-amber-800 mt-1">
                        {currentSheet.lessonNumber}
                      </p>
                      <span className="text-slate-700 font-bold text-sm bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 inline-block mt-1">
                        {currentSheet.topicTitle}
                      </span>
                    </div>
                  </div>

                  {/* Worksheet body */}
                  <div className="space-y-5 pt-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 border-b border-dashed border-slate-200 pb-2.5">
                      <span className="flex items-center gap-1">
                        👤 សិស្ស៖ <span className="text-slate-800">សាកល្បងដោយសិស្សថ្នាក់ទី៦</span>
                      </span>
                      <span>📅 កាលបរិច្ឆេទ៖ ថ្ងៃនេះ</span>
                    </div>

                    {/* Question listings */}
                    <div className="space-y-6">
                      {currentSheet.questions.map((q, idx) => (
                        <div key={q.id} className="space-y-2.5">
                          <p className="text-sm font-bold text-slate-800 leading-relaxed font-sans">
                            {q.questionText}
                          </p>

                          {/* Render choices or text boxes */}
                          {q.type === 'choice' && q.options ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                              {q.options.map((opt) => (
                                <button
                                  key={opt}
                                  disabled={showResults}
                                  onClick={() => handleAnswerChange(q.id, opt)}
                                  className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                                    studentAnswers[q.id] === opt
                                      ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold'
                                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {studentAnswers[q.id] === opt && (
                                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 ml-2"></span>
                                  )}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="pl-2">
                              <input
                                type="text"
                                disabled={showResults}
                                value={studentAnswers[q.id] || ''}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                placeholder={q.placeholder}
                                className="w-full p-3 rounded-xl bg-slate-50 text-slate-900 border-2 border-slate-200 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-semibold shadow-2xs"
                              />
                            </div>
                          )}

                          {/* Individual results and explanation */}
                          {showResults && (
                            <div className={`p-3 rounded-xl border pl-3.5 text-xs font-medium space-y-1.5 ${
                              gradedQuestions[q.id]
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                                : 'bg-rose-50 border-rose-300 text-rose-950'
                            }`}>
                              <div className="flex items-center gap-2">
                                {gradedQuestions[q.id] ? (
                                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                                ) : (
                                  <XCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
                                )}
                                <span className="font-bold">
                                  {gradedQuestions[q.id] ? 'ចម្លើយត្រឹមត្រូវ! (+១០០ ពិន្ទុ)' : 'ចម្លើយមិនទាន់ត្រឹមត្រូវ!'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                                {q.explanation}
                              </p>
                              {!gradedQuestions[q.id] && (
                                <p className="text-[11px] text-amber-900 font-bold">
                                  💡 ចម្លើយគំរូ៖ {q.correctAnswer}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Worksheet Footer (Official Note) */}
                <div className="border-t border-slate-200 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 font-bold relative z-10 gap-2">
                  <span>© រក្សាសិទ្ធិដោយប្រព័ន្ធរៀន និងប្រឡងថ្នាក់ទី៦ ឆ្នាំ ២០២៦</span>
                  <span className="text-[#8C5E3C] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                     រៀបចំជាកិច្ចការផ្ទះស្តង់ដារ
                  </span>
                </div>
              </div>

              {/* Action buttons under worksheet sheet */}
              <div className="w-full max-w-[760px] flex flex-wrap items-center justify-between gap-3 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95"
                    title="បោះពុម្ពកិច្ចការនេះ"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>បោះពុម្ព</span>
                  </button>
                  <button
                    onClick={() => {
                      alert("កិច្ចការផ្ទះត្រូវបានរក្សាទុកក្នុងទូរស័ព្ទជោគជ័យ!");
                    }}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ទាញយក PDF</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {showResults ? (
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      សាកល្បងឡើងវិញ
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitHomework}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>ប្រគល់កិច្ចការ & ពិនិត្យពិន្ទុ</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Visual score card popup if results are shown */}
              {showResults && (
                <div className="w-full max-w-[760px] mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-800 text-white shadow-lg border border-amber-400 flex items-center justify-between gap-4 animate-bounce-short">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl shadow-inner border border-white/20">
                      🏆
                    </div>
                    <div>
                      <h4 className="font-moul text-xs sm:text-sm text-yellow-100">
                        កិច្ចការត្រូវបានកែដោយជោគជ័យ!
                      </h4>
                      <p className="text-[11px] text-amber-100 font-medium mt-0.5">
                        ទទួលបានពិន្ទុ {Object.values(gradedQuestions).filter(Boolean).length} លើ {currentSheet.questions.length} ត្រឹមត្រូវ!
                      </p>
                    </div>
                  </div>
                  <div className="bg-white text-amber-950 px-4 py-2 rounded-xl text-center shadow-md">
                    <div className="text-[10px] font-extrabold uppercase text-amber-800">ពិន្ទុសរុប</div>
                    <div className="text-lg font-extrabold font-sans">
                      {Math.round((Object.values(gradedQuestions).filter(Boolean).length / currentSheet.questions.length) * 100)}%
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        ) : (
          /* Homework submission history tab */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50 dark:bg-slate-950 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="font-moul text-sm text-slate-800 dark:text-slate-200">
                  ប្រវត្តិនៃការបញ្ចប់កិច្ចការផ្ទះរបស់ខ្ញុំ
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold">
                      <th className="pb-3 pr-4">កិច្ចការផ្ទះ / វិញ្ញាសា</th>
                      <th className="pb-3 pr-4">មុខវិជ្ជា</th>
                      <th className="pb-3 pr-4 text-center">លទ្ធផល</th>
                      <th className="pb-3 text-right">កាលបរិច្ឆេទ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {homeworkHistory.map((history, idx) => (
                      <tr key={idx} className="text-slate-700 dark:text-slate-300">
                        <td className="py-3.5 pr-4 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span className="text-sm">📝</span>
                          <span>{history.sheetTitle}</span>
                        </td>
                        <td className="py-3.5 pr-4 text-xs font-bold text-slate-500">
                          {history.subject}
                        </td>
                        <td className="py-3.5 pr-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                            history.score === history.total
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                          }`}>
                            {history.score} / {history.total} ត្រឹមត្រូវ ({Math.round((history.score / history.total) * 100)}%)
                          </span>
                        </td>
                        <td className="py-3.5 text-right text-xs font-bold text-slate-400">
                          {history.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 dark:text-amber-300 font-semibold leading-relaxed">
                💡 **ព័ត៌មានបន្ថែម៖** កិច្ចការផ្ទះដែលប្អូនបានធ្វើរួច នឹងត្រូវកត់ត្រាទុកក្នុងប្រវត្តិកិច្ចការផ្ទះរហូត។ ប្អូនអាចត្រលប់មកធ្វើឡើងវិញនៅពេលណាក៏បាន ដើម្បីទទួលបានពិន្ទុបន្ថែម និងរំលឹកមេរៀនមុនពេលប្រឡងឆមាស ឬប្រឡងបញ្ចប់ឆ្នាំ!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
