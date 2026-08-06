import React, { useState } from 'react';
import { X, BookOpen, Search, Sparkles, Hash } from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';

interface MathFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormulaCategory {
  title: string;
  items: {
    name: string;
    formula: string;
    description: string;
    example?: string;
  }[];
}

const FORMULA_CATEGORIES: FormulaCategory[] = [
  {
    title: 'រូបមន្តផ្ទៃក្រឡា (Area Formulas)',
    items: [
      {
        name: 'ផ្ទៃក្រឡាចតុកោណកែង',
        formula: 'S = b × h',
        description: 'ផ្ទៃ = បណ្ដោយ × ទទឹង',
        example: 'បណ្ដោយ 8m និងទទឹង 5m ➔ S = 8 × 5 = 40m²'
      },
      {
        name: 'ផ្ទៃក្រឡាចតុកោណកែងស្មើ (ការ៉េ)',
        formula: 'S = a × a = a²',
        description: 'ផ្ទៃ = ជ្រុង × ជ្រុង',
        example: 'ជ្រុង 6cm ➔ S = 6 × 6 = 36cm²'
      },
      {
        name: 'ផ្ទៃក្រឡាត្រីកោណ',
        formula: 'S = (b × h) / 2',
        description: 'ផ្ទៃ = (បាត × កម្ពស់) / 2',
        example: 'បាត 10cm និងកម្ពស់ 6cm ➔ S = (10 × 6) / 2 = 30cm²'
      },
      {
        name: 'ផ្ទៃក្រឡារង្វង់',
        formula: 'S = π × R × R = 3.14 × R²',
        description: 'ផ្ទៃ = 3.14 × កាំ × កាំ',
        example: 'កាំ R = 5cm ➔ S = 3.14 × 5 × 5 = 78.5cm²'
      },
      {
        name: 'បរិមាត្ររង្វង់',
        formula: 'P = 2 × π × R = 3.14 × D',
        description: 'បរិមាត្រ = 3.14 × អង្កត់ផ្ចិត',
        example: 'អង្កត់ផ្ចិត D = 10cm ➔ P = 3.14 × 10 = 31.4cm'
      }
    ]
  },
  {
    title: 'រូបមន្តមាឌ និងផ្ទៃខាង (Volume Formulas)',
    items: [
      {
        name: 'មាឌប្រអប់ចតុកោណកែង',
        formula: 'V = a × b × h',
        description: 'មាឌ = បណ្ដោយ × ទទឹង × កម្ពស់',
        example: 'a = 4m, b = 3m, h = 5m ➔ V = 4 × 3 × 5 = 60m³'
      },
      {
        name: 'មាឌកូប (Cube Volume)',
        formula: 'V = a × a × a = a³',
        description: 'មាឌ = ជ្រុង × ជ្រុង × ជ្រុង',
        example: 'ជ្រុង a = 3cm ➔ V = 3 × 3 × 3 = 27cm³'
      },
      {
        name: 'មាឌស៊ីឡាំង',
        formula: 'V = S_base × h = (3.14 × R²) × h',
        description: 'មាឌ = ផ្ទៃបាត × កម្ពស់',
        example: 'R = 2cm, h = 10cm ➔ V = 3.14 × 4 × 10 = 125.6cm³'
      }
    ]
  },
  {
    title: 'ល្បឿន ចម្ងាយ និងរយៈពេល (Speed, Distance, Time)',
    items: [
      {
        name: 'ល្បឿនមធ្យម (Speed V)',
        formula: 'V = d / t',
        description: 'ល្បឿន = ចម្ងាយ / រយៈពេល (km/h ឬ m/s)',
        example: 'ចម្ងាយ 120km រយៈពេល 2h ➔ V = 120 / 2 = 60 km/h'
      },
      {
        name: 'ចម្ងាយចរ (Distance d)',
        formula: 'd = V × t',
        description: 'ចម្ងាយ = ល្បឿន × រយៈពេល',
        example: 'ល្បឿន 50 km/h រយៈពេល 3h ➔ d = 50 × 3 = 150 km'
      },
      {
        name: 'រយៈពេល (Time t)',
        formula: 't = d / V',
        description: 'រយៈពេល = ចម្ងាយ / ល្បឿន',
        example: 'ចម្ងាយ 200km ល្បឿន 40 km/h ➔ t = 200 / 40 = 5 h'
      }
    ]
  },
  {
    title: 'ភាគរយ និងការប្រាក់សាមញ្ញ (Percentage & Simple Interest)',
    items: [
      {
        name: 'ការប្រាក់សាមញ្ញ (Interest I)',
        formula: 'I = (P × r × t) / 100',
        description: 'ការប្រាក់ = (ប្រាក់ដើម × អត្រា% × រយៈពេល) / 100',
        example: 'ប្រាក់ដើម 1,000$ អត្រា 5% រយៈពេល 2ឆ្នាំ ➔ I = (1000 × 5 × 2) / 100 = 100$'
      },
      {
        name: 'តម្លៃបញ្ចុះភាគរយ',
        formula: 'តម្លៃបញ្ចុះ = តម្លៃដើម × (ភាគរយ / 100)',
        description: 'តម្លៃថ្មី = តម្លៃដើម - តម្លៃបញ្ចុះ',
        example: 'អាវ 20$ បញ្ចុះ 10% ➔ បញ្ចុះ 2$ ➔ តម្លៃថ្មី = 18$'
      }
    ]
  },
  {
    title: 'ប្រភាគ និងសមាត្រ (Fractions & Ratios)',
    items: [
      {
        name: 'មធ្យមភាគ (Average)',
        formula: 'មធ្យមភាគ = ផលបូកទិន្នន័យ / ចំនួនទិន្នន័យ',
        description: 'បូកទិន្នន័យទាំងអស់ រួចចែកនឹងចំនួនធាតុ',
        example: 'ពិន្ទុ 10, 15, 20 ➔ មធ្យម = (10+15+20) / 3 = 15'
      },
      {
        name: 'សមាត្រ (Proportion)',
        formula: 'a / b = c / d  ➔  a × d = b × c',
        description: 'ផលគុណចុងស្មើផលគុណកណ្ដាល',
        example: 'x / 4 = 6 / 8 ➔ x × 8 = 4 × 6 ➔ x = 24 / 8 = 3'
      }
    ]
  }
];

export const MathFormulaModal: React.FC<MathFormulaModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredCategories = FORMULA_CATEGORIES.map((cat) => {
    const matchingItems = cat.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, items: matchingItems };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-600 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 text-white backdrop-blur-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-moul">
                រូបមន្តគណិតវិទ្យាសំខាន់ៗ ថ្នាក់ទី៦
              </h2>
              <p className="text-xs text-emerald-100">កម្រងរូបមន្តផ្លូវការសម្រាប់ពិនិត្យមើល និងចងចាំ</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ស្វែងរករូបមន្ត (ឧទាហរណ៍៖ ផ្ទៃក្រឡា, មាឌ, ល្បឿន, ភាគរយ...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              រកមិនឃើញរូបមន្តត្រូវនឹង «{searchTerm}»
            </div>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 font-moul border-b pb-1.5 flex items-center gap-2 text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  {cat.title}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-2 hover:bg-emerald-50/60 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300">
                          <MathFormattedText text={item.formula} />
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        • {item.description}
                      </p>

                      {item.example && (
                        <div className="text-xs bg-white p-2 rounded-lg border border-slate-200 text-slate-700 font-mono">
                          💡 <span className="font-semibold text-emerald-900">ឧទាហរណ៍៖</span> <MathFormattedText text={item.example} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          ប្អូនៗអាចប្រើរូបមន្តទាំងនេះដើម្បីជួយដោះស្រាយលំហាត់ និងវិញ្ញាសាប្រឡង!
        </div>
      </div>
    </div>
  );
};
