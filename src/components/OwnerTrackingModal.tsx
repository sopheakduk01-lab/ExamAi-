import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Search,
  Download,
  Users,
  Award,
  Clock,
  TrendingUp,
  Trash2,
  X,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  RefreshCw,
  Key
} from 'lucide-react';
import { StudentExamTrackingRecord } from '../types';
import {
  getTrackingRecords,
  verifyOwnerPasscode,
  exportTrackingRecordsToCSV,
  clearTrackingRecords,
  getGoogleSheetWebhookUrl,
  setGoogleSheetWebhookUrl,
  getOwnerPasscode,
  setOwnerPasscode
} from '../utils/examTracking';

interface OwnerTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerTrackingModal: React.FC<OwnerTrackingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');

  const [records, setRecords] = useState<StudentExamTrackingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'ប្រុស' | 'ស្រី'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pass' | 'fail'>('all');

  const [webhookUrl, setWebhookUrlInput] = useState('');
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinSavedMessage, setPinSavedMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setRecords(getTrackingRecords());
      setWebhookUrlInput(getGoogleSheetWebhookUrl());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyOwnerPasscode(passcode)) {
      setIsUnlocked(true);
      setPasscodeError('');
    } else {
      setPasscodeError('កូដសំងាត់មិនត្រឹមត្រូវទេ! (Default Code: 2026)');
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('តើអ្នកប្រាកដជាចង់លុបទិន្នន័យតាមដានការប្រឡងទាំងអស់នេះមែនទេ?')) {
      clearTrackingRecords();
      setRecords([]);
    }
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleSheetWebhookUrl(webhookUrl);
    setShowWebhookConfig(false);
    alert('រក្សាទុក Google Sheets Webhook URL រួចរាល់!');
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      alert('សូមបញ្ចូលកូដយ៉ាងតិច ៤ ខ្ទង់!');
      return;
    }
    setOwnerPasscode(newPin.trim());
    setNewPin('');
    setShowChangePin(false);
    setPinSavedMessage('បានផ្លាស់ប្តូរកូដសំងាត់ម្ចាស់ប្រព័ន្ធជោគជ័យ!');
    setTimeout(() => setPinSavedMessage(''), 3000);
  };

  // Filtering records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.examTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender = genderFilter === 'all' || rec.studentGender === genderFilter;

    const isPass = rec.percentage >= 50;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pass' && isPass) ||
      (statusFilter === 'fail' && !isPass);

    return matchesSearch && matchesGender && matchesStatus;
  });

  // Calculate statistics
  const totalSubmissions = records.length;
  const passCount = records.filter((r) => r.percentage >= 50).length;
  const passRate = totalSubmissions > 0 ? Math.round((passCount / totalSubmissions) * 100) : 0;
  const maleCount = records.filter((r) => r.studentGender === 'ប្រុស').length;
  const femaleCount = records.filter((r) => r.studentGender === 'ស្រី').length;
  const avgPercentage =
    totalSubmissions > 0
      ? Math.round(records.reduce((acc, curr) => acc + curr.percentage, 0) / totalSubmissions)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-300/80 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-4 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-wide flex items-center gap-2">
                <span>ប្រព័ន្ធតាមដានការចូលប្រឡង (Owner Tracking)</span>
                <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Owner Only
                </span>
              </h2>
              <p className="text-amber-100 text-xs mt-0.5">
                ទិន្នន័យប្រឡងរបស់សិស្សទាំងអស់ រៀបចំសម្រាប់ Google Sheet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Locked Screen */}
        {!isUnlocked ? (
          <div className="p-8 sm:p-12 text-center my-auto max-w-md mx-auto space-y-5">
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/60 rounded-3xl flex items-center justify-center mx-auto text-amber-600 shadow-inner border border-amber-200">
              <Lock className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
                តម្រូវឱ្យមានកូដសំងាត់ម្ចាស់ប្រព័ន្ធ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                សូមបញ្ចូល PIN ឬកូដសំងាត់ម្ចាស់ (Default PIN: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-amber-600">2026</code>)
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="បញ្ចូលកូដសំងាត់ម្ចាស់ (PIN)"
                className="w-full px-4 py-3 text-center text-lg tracking-widest rounded-2xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                autoFocus
              />
              {passcodeError && (
                <p className="text-xs text-rose-500 font-bold flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{passcodeError}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
              >
                ផ្ទៀងផ្ទាត់ និងចូលមើលទិន្នន័យ
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Dashboard Content */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {pinSavedMessage && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{pinSavedMessage}</span>
              </div>
            )}

            {/* Stat Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700 flex flex-col justify-between">
                <span className="text-xs text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>ការចូលប្រឡងសរុប</span>
                </span>
                <div className="mt-2 text-2xl font-black text-amber-950 dark:text-amber-100">
                  {totalSubmissions} <span className="text-xs font-normal text-slate-500">លើក</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200/80 dark:border-slate-700 flex flex-col justify-between">
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>អត្រាប្រឡងជាប់</span>
                </span>
                <div className="mt-2 text-2xl font-black text-emerald-950 dark:text-emerald-100">
                  {passRate}% <span className="text-xs font-normal text-emerald-600">({passCount} នាក់)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-200/80 dark:border-slate-700 flex flex-col justify-between">
                <span className="text-xs text-blue-800 dark:text-blue-300 font-bold flex items-center gap-1">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>ពិន្ទុមធ្យមភាគ</span>
                </span>
                <div className="mt-2 text-2xl font-black text-blue-950 dark:text-blue-100">
                  {avgPercentage}%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-slate-800/80 border border-purple-200/80 dark:border-slate-700 flex flex-col justify-between">
                <span className="text-xs text-purple-800 dark:text-purple-300 font-bold flex items-center gap-1">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span>សមាមាត្រភេទ</span>
                </span>
                <div className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="text-blue-600">♂ {maleCount}</span>
                  <span>/</span>
                  <span className="text-pink-600">♀ {femaleCount}</span>
                </div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => exportTrackingRecordsToCSV(records)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>ទាញយក CSV សម្រាប់ Google Sheet</span>
                </button>

                <button
                  onClick={() => setShowWebhookConfig(!showWebhookConfig)}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow flex items-center gap-2 cursor-pointer transition-all"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>កែប្រែ Webhook Sheet</span>
                </button>

                <button
                  onClick={() => setShowChangePin(!showChangePin)}
                  className="px-3 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>ដូរ PIN ម្ចាស់</span>
                </button>
              </div>

              {records.length > 0 && (
                <button
                  onClick={handleClearLogs}
                  className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>លុបទិន្នន័យ</span>
                </button>
              )}
            </div>

            {/* Webhook Configuration Modal Inline */}
            {showWebhookConfig && (
              <form onSubmit={handleSaveWebhook} className="p-4 bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-2xl space-y-3">
                <h4 className="text-sm font-extrabold text-amber-950 dark:text-amber-200 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-amber-600" />
                  <span>កំណត់ Google Apps Script / Sheet Webhook URL សម្រាប់ការអាប់ដេតស្វ័យប្រវត្តិតាម Realtime</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  បញ្ចូល Webhook Endpoint URL របស់ Google Sheet របស់អ្នក។ រាល់ពេលសិស្សចុចបញ្ជូនវិញ្ញាសា ប្រព័ន្ធនឹងផ្ញើទិន្នន័យឈ្មោះ ភេទ ពិន្ទុ ទៅកាន់ Google Sheet ដោយស្វ័យប្រវត្តិ។
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    រក្សាទុក URL
                  </button>
                </div>
              </form>
            )}

            {/* Change PIN Form Inline */}
            {showChangePin && (
              <form onSubmit={handleSaveNewPin} className="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl space-y-3">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-600" />
                  <span>ផ្លាស់ប្តូរកូដសំងាត់ម្ចាស់ប្រព័ន្ធ (Owner PIN)</span>
                </h4>
                <div className="flex gap-2 max-w-sm">
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="បញ្ចូល PIN ថ្មីយ៉ាងតិច ៤ ខ្ទង់"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    ផ្លាស់ប្តូរ
                  </button>
                </div>
              </form>
            )}

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ស្វែងរកតាមឈ្មោះសិស្ស ឬវិញ្ញាសា..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs font-bold dark:text-white outline-none"
                >
                  <option value="all">ភេទទាំងអស់</option>
                  <option value="ប្រុស">ប្រុស (♂)</option>
                  <option value="ស្រី">ស្រី (♀)</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs font-bold dark:text-white outline-none"
                >
                  <option value="all">លទ្ធផលទាំងអស់</option>
                  <option value="pass">ជាប់ (≥ 50%)</option>
                  <option value="fail">ធ្លាក់ (&lt; 50%)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-amber-100/70 dark:bg-slate-800 text-amber-950 dark:text-amber-200 font-extrabold uppercase border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3">#</th>
                      <th className="p-3">ថ្ងៃខែឆ្នាំ</th>
                      <th className="p-3">ឈ្មោះសិស្ស</th>
                      <th className="p-3">ភេទ</th>
                      <th className="p-3">ឈ្មោះវិញ្ញាសា</th>
                      <th className="p-3">ពិន្ទុ</th>
                      <th className="p-3">ភាគរយ</th>
                      <th className="p-3">រយៈពេល</th>
                      <th className="p-3 text-center">លទ្ធផល</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 dark:text-slate-200">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400 font-medium">
                          {records.length === 0
                            ? 'មិនទាន់មានទិន្នន័យការប្រឡងរបស់សិស្សនៅឡើយទេ'
                            : 'មិនមានទិន្នន័យស្របតាមការស្វែងរកឡើយ'}
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((rec, idx) => {
                        const mins = Math.floor(rec.timeSpentSeconds / 60);
                        const secs = rec.timeSpentSeconds % 60;
                        const isPass = rec.percentage >= 50;

                        return (
                          <tr
                            key={rec.id}
                            className="hover:bg-amber-50/50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                            <td className="p-3 font-medium whitespace-nowrap">{rec.date}</td>
                            <td className="p-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                              {rec.studentName}
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[11px] ${
                                  rec.studentGender === 'ប្រុស'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                    : 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
                                }`}
                              >
                                {rec.studentGender === 'ប្រុស' ? '♂ ប្រុស' : '♀ ស្រី'}
                              </span>
                            </td>
                            <td className="p-3 font-medium max-w-xs truncate" title={rec.examTitle}>
                              {rec.examTitle}
                            </td>
                            <td className="p-3 font-bold text-amber-700 dark:text-amber-400">
                              {rec.score} / {rec.totalQuestions}
                            </td>
                            <td className="p-3 font-black text-slate-800 dark:text-slate-100">
                              {rec.percentage}%
                            </td>
                            <td className="p-3 text-slate-500 font-mono whitespace-nowrap">
                              {mins}ន {secs}វ
                            </td>
                            <td className="p-3 text-center whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  isPass
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                                }`}
                              >
                                {isPass ? 'ជាប់' : 'ធ្លាក់'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
