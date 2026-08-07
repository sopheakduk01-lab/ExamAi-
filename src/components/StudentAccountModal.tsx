import React, { useState, useEffect } from 'react';
import { StudentAccount } from '../types';
import {
  getAllStudentAccounts,
  loginStudentAccount,
  createStudentAccount,
  updateStudentAccount,
  logoutCurrentStudent,
  loginByIdAndPin
} from '../utils/studentAccounts';
import {
  User,
  KeyRound,
  GraduationCap,
  School,
  Sparkles,
  Check,
  X,
  ShieldCheck,
  LogIn,
  UserPlus,
  LogOut,
  Eye,
  EyeOff,
  RefreshCw,
  Award,
  Bookmark,
  Users,
  Edit3,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface StudentAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccount: StudentAccount | null;
  onAccountChange: (account: StudentAccount | null) => void;
  isInitialSetup?: boolean;
}

const AVATARS = ['🎓', '👦', '👧', '🌟', '🦁', '🦉', '🚀', '🏆', '📚', '🎨', '👑', '⚡'];
const GRADES = ['ថ្នាក់ទី៦', 'ថ្នាក់ទី៥', 'ថ្នាក់ទី៤', 'ថ្នាក់ទី៧'];

export const StudentAccountModal: React.FC<StudentAccountModalProps> = ({
  isOpen,
  onClose,
  currentAccount,
  onAccountChange,
  isInitialSetup = false
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'login' | 'register'>(
    currentAccount ? 'profile' : 'login'
  );

  // Form states for login
  const [loginName, setLoginName] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [showLoginPin, setShowLoginPin] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  // Form states for registration / editing
  const [regName, setRegName] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regConfirmPin, setRegConfirmPin] = useState('');
  const [regGrade, setRegGrade] = useState('ថ្នាក់ទី៦');
  const [regSchool, setRegSchool] = useState('');
  const [regAvatar, setRegAvatar] = useState('🎓');
  const [showRegPin, setShowRegPin] = useState(false);

  // Edit Mode state inside Profile tab
  const [isEditMode, setIsEditMode] = useState(false);

  // Error & Success notice
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // List of saved accounts on device
  const [savedAccounts, setSavedAccounts] = useState<StudentAccount[]>([]);

  useEffect(() => {
    if (isOpen) {
      const accounts = getAllStudentAccounts();
      setSavedAccounts(accounts);
      setErrorMsg('');
      setSuccessMsg('');

      if (currentAccount) {
        setActiveTab('profile');
        setRegName(currentAccount.name);
        setRegPin(currentAccount.pin);
        setRegConfirmPin(currentAccount.pin);
        setRegGrade(currentAccount.grade);
        setRegSchool(currentAccount.school || '');
        setRegAvatar(currentAccount.avatar);
      } else if (accounts.length === 0) {
        setActiveTab('register');
      } else {
        setActiveTab('login');
      }
    }
  }, [isOpen, currentAccount]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    let res;
    if (selectedAccountId) {
      res = loginByIdAndPin(selectedAccountId, loginPin);
    } else {
      res = loginStudentAccount(loginName, loginPin);
    }

    if (res.success && res.account) {
      setSuccessMsg(`ស្វាគមន៍! បានចូលប្រើប្រាស់ account៖ ${res.account.name}`);
      onAccountChange(res.account);
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      setErrorMsg(res.error || 'ការចូលប្រើប្រាស់មិនបានសម្រេច!');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim()) {
      setErrorMsg('សូមបញ្ចូលឈ្មោះសិស្ស!');
      return;
    }

    if (!/^\d{6}$/.test(regPin.trim())) {
      setErrorMsg('កូដសម្ងាត់ត្រូវតែជាលេខ ៦ ខ្ទង់ (ឧទាហរណ៍៖ 123456)!');
      return;
    }

    if (regPin.trim() !== regConfirmPin.trim()) {
      setErrorMsg('កូដសម្ងាត់ ៦ ខ្ទង់ មិនត្រូវគ្នាទេ! សូមផ្ទៀងផ្ទាត់ឡើងវិញ!');
      return;
    }

    if (isEditMode && currentAccount) {
      const updated = updateStudentAccount(currentAccount.id, {
        name: regName.trim(),
        pin: regPin.trim(),
        grade: regGrade,
        school: regSchool.trim() || undefined,
        avatar: regAvatar
      });
      if (updated) {
        onAccountChange(updated);
        setIsEditMode(false);
        setSuccessMsg('បានរក្សាទុកព័ត៌មានកែប្រែដោយជោគជ័យ!');
      }
      return;
    }

    const res = createStudentAccount({
      name: regName,
      pin: regPin,
      grade: regGrade,
      school: regSchool,
      avatar: regAvatar
    });

    if (res.success && res.account) {
      setSuccessMsg(`បានបង្កើត account "${res.account.name}" ដោយជោគជ័យ!`);
      onAccountChange(res.account);
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.error || 'មិនអាចបង្កើត account បានទេ!');
    }
  };

  const handleLogout = () => {
    logoutCurrentStudent();
    onAccountChange(null);
    setSuccessMsg('បានចាកចេញពី account រួចរាល់!');
    const accounts = getAllStudentAccounts();
    setSavedAccounts(accounts);
    setIsEditMode(false);
    if (accounts.length > 0) {
      setActiveTab('login');
    } else {
      setActiveTab('register');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden my-auto transform transition-all">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-[#3D2012] via-[#59301A] to-[#2B150A] text-amber-50 p-5 sm:p-6 text-center border-b border-amber-600/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />

          {!isInitialSetup && (
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-amber-950/60 hover:bg-amber-900 text-amber-200 transition-colors cursor-pointer"
              id="btn-close-account-modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="w-16 h-16 mx-auto mb-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 flex items-center justify-center text-3xl shadow-lg border-2 border-amber-200">
            {currentAccount && activeTab === 'profile' ? currentAccount.avatar : '🎓'}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-moul text-yellow-200 tracking-wide mb-1">
            {currentAccount && activeTab === 'profile'
              ? currentAccount.name
              : activeTab === 'login'
              ? 'ចូលប្រើប្រាស់ Account'
              : 'ចុះឈ្មោះបង្កើត Account'}
          </h2>

          <p className="text-xs text-amber-200/90 font-medium max-w-xs mx-auto">
            {activeTab === 'profile'
              ? `${currentAccount?.grade} • ${currentAccount?.school || 'សាលាបឋមសិក្សា'}`
              : 'ចូល ឬបង្កើត Account ដោយប្រើឈ្មោះ និងកូដ ៦ ខ្ទង់ដើម្បីរក្សាទុកទិន្នន័យ!'}
          </p>

          {/* Navigation Tabs */}
          <div className="mt-4 flex rounded-xl bg-amber-950/80 p-1 border border-amber-600/40 text-xs font-bold">
            {currentAccount && (
              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-amber-500 text-amber-950 shadow-md font-bold'
                    : 'text-amber-200 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>គណនីខ្ញុំ</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
                setSuccessMsg('');
                setSavedAccounts(getAllStudentAccounts());
              }}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-amber-500 text-amber-950 shadow-md font-bold'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>ចូលប្រើប្រាស់</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setIsEditMode(false);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-amber-500 text-amber-950 shadow-md font-bold'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>បង្កើតថ្មី</span>
            </button>
          </div>
        </div>

        {/* Global Error/Success Messages */}
        {(errorMsg || successMsg) && (
          <div className="p-3 px-5 border-b border-amber-100">
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <X className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 sm:p-6 text-slate-800">
          {/* TAB 1: MY PROFILE (when logged in) */}
          {activeTab === 'profile' && currentAccount && (
            <div className="space-y-4">
              {!isEditMode ? (
                <>
                  {/* Account Identity Card */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-4 rounded-2xl border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        កូដសម្ងាត់ ៦ ខ្ទង់៖
                      </span>
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-amber-300 font-mono font-bold text-amber-950 text-sm">
                        <span>{showRegPin ? currentAccount.pin : '••••••'}</span>
                        <button
                          type="button"
                          onClick={() => setShowRegPin(!showRegPin)}
                          className="text-amber-700 hover:text-amber-900 cursor-pointer"
                        >
                          {showRegPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/80">
                        <span className="text-slate-500 block text-[10px] font-bold">វិញ្ញាសាបានប្រឡង</span>
                        <span className="text-amber-950 font-bold text-base">
                          {currentAccount.progress.completedExams.length} លើក
                        </span>
                      </div>
                      <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/80">
                        <span className="text-slate-500 block text-[10px] font-bold">សំណួរបានចំណាំ</span>
                        <span className="text-amber-950 font-bold text-base">
                          {currentAccount.bookmarks.length} សំណួរ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditMode(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      id="btn-edit-student-profile"
                    >
                      <Edit3 className="w-4 h-4 text-amber-800" />
                      <span>កែប្រែឈ្មោះ កូដ ៦ ខ្ទង់ ឬ រូបតំណាង</span>
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('login');
                          setSavedAccounts(getAllStudentAccounts());
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                        <span>ប្តូរ Account</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        id="btn-logout-student-account"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>ចាកចេញ</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Edit Profile Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm text-amber-950 font-moul">កែប្រែព័ត៌មានគណនី</h3>
                    <button
                      type="button"
                      onClick={() => setIsEditMode(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline font-bold"
                    >
                      បោះបង់
                    </button>
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1.5">រូបតំណាង</label>
                    <div className="grid grid-cols-6 gap-1.5 bg-amber-50/70 p-2 rounded-xl border border-amber-200">
                      {AVATARS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setRegAvatar(emoji)}
                          className={`h-9 rounded-lg text-lg flex items-center justify-center cursor-pointer ${
                            regAvatar === emoji
                              ? 'bg-amber-500 text-white shadow-xs scale-105 border border-amber-300'
                              : 'bg-white border border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-amber-950 mb-1">ឈ្មោះសិស្ស</label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:border-amber-600 outline-none text-sm font-semibold bg-amber-50/30"
                    />
                  </div>

                  {/* 6-digit PIN */}
                  <div>
                    <label className="block text-xs font-bold text-amber-950 mb-1">កូដសម្ងាត់ ៦ ខ្ទង់</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={regPin}
                      onChange={(e) => setRegPin(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:border-amber-600 outline-none font-mono tracking-widest text-sm font-bold bg-amber-50/30"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-xs font-bold text-amber-950 mb-1">កម្រិតថ្នាក់</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {GRADES.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setRegGrade(g)}
                          className={`py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                            regGrade === g
                              ? 'bg-amber-800 text-amber-50 border-amber-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-moul text-xs shadow-md transition-all cursor-pointer"
                  >
                    រក្សាទុកការកែប្រែ
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: LOG IN */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              {/* Quick Saved Accounts Selector (if available on device) */}
              {savedAccounts.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      <span>ជ្រើសរើស Account លើឧបករណ៍នេះ៖</span>
                    </span>
                    <span className="text-[10px] text-amber-800 font-semibold">
                      ({savedAccounts.length} គណនី)
                    </span>
                  </label>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {savedAccounts.map((acc) => {
                      const isSelected = selectedAccountId === acc.id || (!selectedAccountId && loginName === acc.name);
                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => {
                            setSelectedAccountId(acc.id);
                            setLoginName(acc.name);
                            setErrorMsg('');
                          }}
                          className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100/90 border-amber-500 ring-2 ring-amber-400/30 shadow-xs'
                              : 'bg-amber-50/40 border-amber-200 hover:bg-amber-100/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{acc.avatar}</span>
                            <div>
                              <p className="font-bold text-xs text-amber-950 font-moul leading-tight">
                                {acc.name}
                              </p>
                              <p className="text-[10px] text-amber-800">
                                {acc.grade} • {acc.school || 'សាលារៀន'}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md">
                            ជ្រើសរើស
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
                {/* Student Name Input */}
                <div>
                  <label htmlFor="login-name-input" className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-700" />
                    <span>ឈ្មោះសិស្ស</span>
                  </label>
                  <input
                    id="login-name-input"
                    type="text"
                    value={loginName}
                    onChange={(e) => {
                      setLoginName(e.target.value);
                      setSelectedAccountId(null);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="បញ្ចូលឈ្មោះសិស្ស"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/30 outline-none text-slate-800 font-semibold text-sm bg-amber-50/30"
                  />
                </div>

                {/* 6-Digit PIN Code */}
                <div>
                  <label htmlFor="login-pin-input" className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                    <span>កូដសម្ងាត់ ៦ ខ្ទង់</span>
                  </label>
                  <div className="relative">
                    <input
                      id="login-pin-input"
                      type={showLoginPin ? 'text' : 'password'}
                      maxLength={6}
                      value={loginPin}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setLoginPin(val);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="•••••• (៦ ខ្ទង់)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/30 outline-none text-slate-800 font-mono font-bold tracking-widest text-base bg-amber-50/30 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPin(!showLoginPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 hover:text-amber-900 cursor-pointer"
                    >
                      {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold font-moul text-xs shadow-lg shadow-amber-900/20 transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-300 active:scale-98"
                  id="btn-submit-student-login"
                >
                  <LogIn className="w-4 h-4 text-yellow-200" />
                  <span>ចូលប្រើប្រាស់ Account</span>
                </button>
              </form>

              <div className="text-center pt-1 border-t border-amber-100">
                <p className="text-xs text-slate-500 mb-2">មិនទាន់មាន Account ទេមែនទេ?</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMsg('');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 font-bold text-xs border border-amber-300 cursor-pointer transition-colors"
                >
                  + ចុះឈ្មោះបង្កើត Account ថ្មី
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: REGISTER NEW ACCOUNT */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Avatar Selection */}
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1.5">
                  ជ្រើសរើសរូបតំណាង (Avatar)
                </label>
                <div className="grid grid-cols-6 gap-2 bg-amber-50/70 p-2 rounded-2xl border border-amber-200">
                  {AVATARS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setRegAvatar(emoji)}
                      className={`h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                        regAvatar === emoji
                          ? 'bg-amber-500 text-white shadow-md scale-105 border-2 border-amber-300'
                          : 'hover:bg-amber-200/60 bg-white border border-amber-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Name */}
              <div>
                <label htmlFor="reg-name-input" className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <span>ឈ្មោះសិស្ស <span className="text-rose-500">*</span></span>
                </label>
                <input
                  id="reg-name-input"
                  type="text"
                  value={regName}
                  onChange={(e) => {
                    setRegName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="ឧទាហរណ៍៖ សុខ វិចិត្រ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/30 outline-none text-slate-800 font-semibold text-sm bg-amber-50/30"
                />
              </div>

              {/* 6-Digit PIN + Confirm PIN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="reg-pin-input" className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                    <span>កូដ ៦ ខ្ទង់ <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    id="reg-pin-input"
                    type={showRegPin ? 'text' : 'password'}
                    maxLength={6}
                    value={regPin}
                    onChange={(e) => {
                      setRegPin(e.target.value.replace(/\D/g, ''));
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="123456"
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 focus:border-amber-600 font-mono font-bold tracking-widest text-sm bg-amber-50/30"
                  />
                </div>

                <div>
                  <label htmlFor="reg-confirm-pin-input" className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>បញ្ជាក់កូដ ៦ ខ្ទង់</span>
                  </label>
                  <input
                    id="reg-confirm-pin-input"
                    type={showRegPin ? 'text' : 'password'}
                    maxLength={6}
                    value={regConfirmPin}
                    onChange={(e) => {
                      setRegConfirmPin(e.target.value.replace(/\D/g, ''));
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="123456"
                    className="w-full px-3 py-2 rounded-xl border border-amber-300 focus:border-amber-600 font-mono font-bold tracking-widest text-sm bg-amber-50/30"
                  />
                </div>
              </div>

              {/* Grade Selector */}
              <div>
                <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                  <span>កម្រិតថ្នាក់រៀន</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setRegGrade(g)}
                      className={`py-1.5 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                        regGrade === g
                          ? 'bg-amber-800 text-amber-50 border-amber-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* School Name */}
              <div>
                <label htmlFor="reg-school-input" className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-amber-700" />
                  <span>ឈ្មោះសាលារៀន (ជម្រើស)</span>
                </label>
                <input
                  id="reg-school-input"
                  type="text"
                  value={regSchool}
                  onChange={(e) => setRegSchool(e.target.value)}
                  placeholder="ឧទាហរណ៍៖ សាលាបឋមសិក្សាព្រះនរោត្តម"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 focus:border-amber-600 outline-none text-slate-800 text-xs bg-slate-50/50"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-amber-100/60 border border-amber-300/80 text-[11px] text-amber-900 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  កូដ ៦ ខ្ទង់ និង ឈ្មោះ ជាការចង់ចាំ account របស់អ្នក ទោះជា update ឬ reload ក៏ទិន្នន័យនៅរក្សាដដែល!
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold font-moul text-xs sm:text-sm shadow-lg shadow-amber-900/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-300"
                id="btn-submit-student-register"
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>បង្កើត និងរក្សាទុក Account</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
