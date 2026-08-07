import React, { useState, useEffect } from 'react';
import { User, Users, CheckCircle2, ArrowRight, Sparkles, GraduationCap, X } from 'lucide-react';

interface StudentExamRegistrationModalProps {
  isOpen: boolean;
  examTitle: string;
  onClose: () => void;
  onConfirm: (studentInfo: { name: string; gender: 'ប្រុស' | 'ស្រី' }) => void;
  defaultName?: string;
  defaultGender?: 'ប្រុស' | 'ស្រី';
}

export const StudentExamRegistrationModal: React.FC<StudentExamRegistrationModalProps> = ({
  isOpen,
  examTitle,
  onClose,
  onConfirm,
  defaultName = '',
  defaultGender = 'ប្រុស'
}) => {
  const [name, setName] = useState(defaultName);
  const [gender, setGender] = useState<'ប្រុស' | 'ស្រី'>(defaultGender);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load saved student registration if available
    const saved = localStorage.getItem('grade6_student_exam_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.gender) setGender(parsed.gender);
      } catch (e) {
        // ignore
      }
    } else if (defaultName) {
      setName(defaultName);
    }
  }, [isOpen, defaultName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('សូមបញ្ចូលឈ្មោះរបស់បេក្ខជន/បេក្ខនារី!');
      return;
    }
    setError('');

    // Save info locally for convenience next time
    localStorage.setItem(
      'grade6_student_exam_info',
      JSON.stringify({ name: name.trim(), gender })
    );

    onConfirm({ name: name.trim(), gender });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 overflow-hidden">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="បិទ"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-extrabold tracking-wide">ចុះឈ្មោះចូលប្រឡង</h2>
          <p className="text-amber-100 text-xs mt-1 line-clamp-2 px-2">{examTitle}</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>សូមបំពេញ <b>ឈ្មោះ</b> និង <b>ភេទ</b> ឱ្យបានត្រឹមត្រូវ ដើម្បីរក្សាកំណត់ត្រាប្រឡង និងតាមដានលទ្ធផល។</span>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-600" />
              <span>ឈ្មោះសិស្សប្រឡង <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="ឧទាហរណ៍៖ សុខ ចាន់ថន"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              autoFocus
            />
            {error && <p className="text-xs text-rose-500 font-medium mt-1">{error}</p>}
          </div>

          {/* Gender Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-600" />
              <span>ភេទ <span className="text-rose-500">*</span></span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('ប្រុស')}
                className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  gender === 'ប្រុស'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                  ♂
                </span>
                <span>ប្រុស (បុរស)</span>
                {gender === 'ប្រុស' && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-auto" />}
              </button>

              <button
                type="button"
                onClick={() => setGender('ស្រី')}
                className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  gender === 'ស្រី'
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 ring-2 ring-pink-500/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                  ♀
                </span>
                <span>ស្រី (នារី)</span>
                {gender === 'ស្រី' && <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 ml-auto" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-base shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>ចាប់ផ្តើមធ្វើវិញ្ញាសា</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
