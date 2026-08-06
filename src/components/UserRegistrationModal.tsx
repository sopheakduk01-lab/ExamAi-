import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, GraduationCap, School, Sparkles, Check, X, ShieldCheck, Heart } from 'lucide-react';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  isInitialRegistration?: boolean;
}

const AVATARS = ['👦', '👧', '🎓', '🌟', '🦁', '🦉', '🚀', '🏆', '📚', '🎨', '👑', '⚡'];
const GRADES = ['ថ្នាក់ទី៦', 'ថ្នាក់ទី៥', 'ថ្នាក់ទី៤', 'ថ្នាក់ទី៧'];

export const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  isInitialRegistration = false
}) => {
  const [name, setName] = useState(userProfile?.name || '');
  const [grade, setGrade] = useState(userProfile?.grade || 'ថ្នាក់ទី៦');
  const [school, setSchool] = useState(userProfile?.school || '');
  const [avatar, setAvatar] = useState(userProfile?.avatar || '🎓');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('សូមបញ្ចូលឈ្មោះរបស់អ្នក!');
      return;
    }

    const newProfile: UserProfile = {
      name: trimmedName,
      grade: grade || 'ថ្នាក់ទី៦',
      school: school.trim() || undefined,
      avatar,
      registeredAt: userProfile?.registeredAt || new Date().toISOString()
    };

    onSaveProfile(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden my-auto transform transition-all">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-[#3D2012] via-[#59301A] to-[#2B150A] text-amber-50 p-6 text-center border-b border-amber-600/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
          
          {!isInitialRegistration && (
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-amber-950/60 hover:bg-amber-900 text-amber-200 transition-colors cursor-pointer"
              id="btn-close-registration-modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 flex items-center justify-center text-3xl shadow-lg border-2 border-amber-200">
            {avatar}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-moul text-yellow-200 tracking-wide mb-1">
            {isInitialRegistration ? 'ចុះឈ្មោះប្រើប្រាស់' : 'ព័ត៌មានគណនីសិស្ស'}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
            {isInitialRegistration
              ? 'សូមបញ្ចូលឈ្មោះ និងព័ត៌មានសាមញ្ញដើម្បីចាប់ផ្តើមរៀន!'
              : 'កែប្រែឈ្មោះ និងរូបតំណាងរបស់អ្នក'}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-[11px] text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ងាយស្រួល មិនទាមទារអ៊ីម៉ែល ឬលេខសម្ងាត់ទេ</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-slate-800">
          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-bold text-amber-900 mb-2">
              ជ្រើសរើសរូបតំណាង (Avatar)
            </label>
            <div className="grid grid-cols-6 gap-2 bg-amber-50/70 p-2.5 rounded-2xl border border-amber-200">
              {AVATARS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`h-11 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                    avatar === emoji
                      ? 'bg-amber-500 text-white shadow-md scale-110 border-2 border-amber-300'
                      : 'hover:bg-amber-200/60 bg-white border border-amber-200/60'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Student Name */}
          <div>
            <label htmlFor="student-name-input" className="block text-xs font-bold text-amber-950 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-700" />
              <span>ឈ្មោះសិស្ស <span className="text-rose-500">*</span></span>
            </label>
            <input
              id="student-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="ឧទាហរណ៍៖ សុខ វិចិត្រ"
              className="w-full px-4 py-3 rounded-xl border border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/30 outline-none text-slate-800 font-semibold text-sm bg-amber-50/30"
              autoFocus
            />
            {error && <p className="text-xs text-rose-600 font-bold mt-1.5">{error}</p>}
          </div>

          {/* Grade Selector */}
          <div>
            <label className="block text-xs font-bold text-amber-950 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <span>កម្រិតថ្នាក់រៀន</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    grade === g
                      ? 'bg-amber-800 text-amber-50 border-amber-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* School Name (Optional) */}
          <div>
            <label htmlFor="student-school-input" className="block text-xs font-bold text-amber-950 mb-1.5 flex items-center gap-1.5">
              <School className="w-4 h-4 text-amber-700" />
              <span>ឈ្មោះសាលារៀន (ជម្រើស)</span>
            </label>
            <input
              id="student-school-input"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="ឧទាហរណ៍៖ សាលាបឋមសិក្សាព្រះនរោត្តម"
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/30 outline-none text-slate-800 text-xs bg-slate-50/50"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            {!isInitialRegistration && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
              >
                បោះបង់
              </button>
            )}

            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold font-moul text-xs sm:text-sm shadow-lg shadow-amber-900/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-300"
              id="btn-submit-registration"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>{isInitialRegistration ? 'ចាប់ផ្តើមរៀន' : 'រក្សាទុកព័ត៌មាន'}</span>
            </button>
          </div>

          {isInitialRegistration && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  // Guest quick save
                  onSaveProfile({
                    name: 'សិស្សថ្នាក់ទី៦',
                    grade: 'ថ្នាក់ទី៦',
                    avatar: '🎓',
                    registeredAt: new Date().toISOString()
                  });
                  onClose();
                }}
                className="text-xs text-amber-800/80 hover:text-amber-950 underline font-medium cursor-pointer"
              >
                រំលងសិន (ប្រើឈ្មោះបណ្តោះអាសន្ន "សិស្សថ្នាក់ទី៦")
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
