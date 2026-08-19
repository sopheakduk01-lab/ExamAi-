import React, { useState, useEffect } from 'react';
import { X, Type, Check, Sparkles, ZoomIn, ZoomOut, RefreshCw, Eye, Palette } from 'lucide-react';

export interface FontSettings {
  fontFamily: 'battambang' | 'kantumruuy' | 'noto' | 'siemreap';
  fontSize: number; // in percentage e.g. 100, 110, 125, 140
  lineHeight: number; // e.g. 1.65, 1.85, 2.05
  isBoldEnhanced: boolean;
  bgTheme: 'warm' | 'chalkboard' | 'grid' | 'sky' | 'sakura' | 'dark';
}

export const DEFAULT_FONT_SETTINGS: FontSettings = {
  fontFamily: 'battambang',
  fontSize: 105,
  lineHeight: 1.8,
  isBoldEnhanced: false,
  bgTheme: 'warm',
};

const STORAGE_KEY = 'grade6_font_preference_v3';

export function getSavedFontSettings(): FontSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_FONT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading font settings', e);
  }
  return DEFAULT_FONT_SETTINGS;
}

export function applyFontSettingsToDOM(settings: FontSettings) {
  const root = document.documentElement;
  
  // 1. Font Family
  let fontStack = "'Battambang', 'Kantumruuy Pro', 'Noto Sans Khmer', 'Siemreap', sans-serif";
  if (settings.fontFamily === 'kantumruuy') {
    fontStack = "'Kantumruuy Pro', 'Battambang', 'Noto Sans Khmer', 'Siemreap', sans-serif";
  } else if (settings.fontFamily === 'noto') {
    fontStack = "'Noto Sans Khmer', 'Battambang', 'Kantumruuy Pro', 'Siemreap', sans-serif";
  } else if (settings.fontFamily === 'siemreap') {
    fontStack = "'Siemreap', 'Battambang', 'Kantumruuy Pro', sans-serif";
  } else {
    fontStack = "'Battambang', 'Kantumruuy Pro', 'Noto Sans Khmer', 'Siemreap', sans-serif";
  }

  root.style.setProperty('--app-font-family', fontStack);
  root.style.setProperty('--app-font-scale', `${settings.fontSize}%`);
  root.style.setProperty('--app-line-height', `${settings.lineHeight}`);
  
  if (settings.isBoldEnhanced) {
    document.body.classList.add('font-medium');
  } else {
    document.body.classList.remove('font-medium');
  }

  // 2. Background Theme Settings
  let bgColor = '#FAF8F5';
  let textColor = '#1E293B';
  let bgPattern = 'none';
  let bgSize = 'auto';

  switch (settings.bgTheme) {
    case 'chalkboard':
      bgColor = '#142D29';
      textColor = '#F8FAFC';
      // Dusty noise/grid effect for chalkboard
      bgPattern = 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)';
      bgSize = '24px 24px';
      break;
    case 'grid':
      bgColor = '#FFFFFF';
      textColor = '#0F172A';
      // Dual linear gradient to make notebook grid lines
      bgPattern = 'linear-gradient(rgba(226, 232, 240, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 232, 240, 0.7) 1px, transparent 1px)';
      bgSize = '24px 24px';
      break;
    case 'sky':
      bgColor = '#F0F6FC';
      textColor = '#0F172A';
      bgPattern = 'none';
      break;
    case 'sakura':
      bgColor = '#FFF5F6';
      textColor = '#3D0C11';
      bgPattern = 'none';
      break;
    case 'dark':
      bgColor = '#0F172A';
      textColor = '#F1F5F9';
      bgPattern = 'none';
      break;
    case 'warm':
    default:
      bgColor = '#FAF8F5';
      textColor = '#1E293B';
      bgPattern = 'none';
      break;
  }

  root.style.setProperty('--app-bg-color', bgColor);
  root.style.setProperty('--app-text-color', textColor);
  root.style.setProperty('--app-bg-pattern', bgPattern);
  root.style.setProperty('--app-bg-size', bgSize);

  // Sync dark mode class on html/body so other UI components (like dark:bg-slate-900) respond correctly
  if (settings.bgTheme === 'dark' || settings.bgTheme === 'chalkboard') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

interface FontPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: FontSettings;
  onUpdateSettings: (newSettings: FontSettings) => void;
}

export const FontPreferencesModal: React.FC<FontPreferencesModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onUpdateSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<FontSettings>(currentSettings);

  useEffect(() => {
    if (isOpen) {
      setLocalSettings(currentSettings);
    }
  }, [isOpen, currentSettings]);

  if (!isOpen) return null;

  const fontOptions: { id: FontSettings['fontFamily']; label: string; sub: string; preview: string; className: string }[] = [
    {
      id: 'battambang',
      label: 'អក្សរ បាត់ដំបង (Battambang)',
      sub: 'ស្តង់ដារសៀវភៅពុម្ពក្រសួង ច្បាស់ ស្រួលអានបំផុត',
      preview: 'ភាសាខ្មែរ និងគណិតវិទ្យា ថ្នាក់ទី៦',
      className: 'font-battambang',
    },
    {
      id: 'kantumruuy',
      label: 'អក្សរ កន្តុំរុយ ប្រូ (Kantumruuy Pro)',
      sub: 'រចនាបថទំនើប ស្រទន់ ទាក់ទាញភ្នែក',
      preview: 'ត្រៀមប្រឡងបញ្ចប់ភូមិសិក្សា',
      className: 'font-kantumruuy',
    },
    {
      id: 'noto',
      label: 'អក្សរ ណូតូសាន (Noto Sans Khmer)',
      sub: 'ច្បាស់ដាច់ៗ ស្តង់ដារអន្តរជាតិ Google',
      preview: 'វិញ្ញាសា និងមេរៀនសង្ខេប',
      className: 'font-noto',
    },
    {
      id: 'siemreap',
      label: 'អក្សរ សៀមរាប (Siemreap)',
      sub: 'រចនាបថខ្មែរប្រពៃណី សាមញ្ញ',
      preview: 'ចំណេះដឹងទូទៅ និងវិទ្យាសាស្ត្រ',
      className: 'font-siemreap',
    },
  ];

  const bgThemes: { id: FontSettings['bgTheme']; label: string; desc: string; previewBg: string; textClass: string; borderClass: string }[] = [
    {
      id: 'warm',
      label: 'លឿងទន់ (Classic Warm)',
      desc: 'ពណ៌ក្រដាសសៀវភៅពុម្ព ការពារភ្នែក',
      previewBg: 'bg-[#FAF8F5]',
      textClass: 'text-slate-800',
      borderClass: 'border-amber-200',
    },
    {
      id: 'chalkboard',
      label: 'ក្តារខៀន (Blackboard)',
      desc: 'រចនាបថថ្នាក់រៀនខ្មែរ នឹកឃើញអនុស្សាវរីយ៍',
      previewBg: 'bg-[#142D29]',
      textClass: 'text-emerald-100',
      borderClass: 'border-emerald-800',
    },
    {
      id: 'grid',
      label: 'ក្រដាសក្រឡា (Grid Paper)',
      desc: 'ក្រដាសសៀវភៅសរសេរ គណិតវិទ្យា',
      previewBg: 'bg-white bg-[linear-gradient(#e2e8f0_1px,transparent_1px),linear-gradient(90deg,#e2e8f0_1px,transparent_1px)] bg-[size:12px_12px]',
      textClass: 'text-slate-900',
      borderClass: 'border-slate-300',
    },
    {
      id: 'sky',
      label: 'ខៀវស្រទន់ (Calm Sky)',
      desc: 'ត្រជាក់ភ្នែក ជួយឱ្យផ្ដោតអារម្មណ៍',
      previewBg: 'bg-[#F0F6FC]',
      textClass: 'text-blue-950',
      borderClass: 'border-blue-200',
    },
    {
      id: 'sakura',
      label: 'ផ្កាឈូក (Lotus Pink)',
      desc: 'ស្រទន់ ស្រស់ស្អាត បែបយុវវ័យ',
      previewBg: 'bg-[#FFF5F6]',
      textClass: 'text-[#3D0C11]',
      borderClass: 'border-rose-200',
    },
    {
      id: 'dark',
      label: 'ងងឹតស្រួល (Comfort Dark)',
      desc: 'សម្រាប់អានពេលយប់ មិនចុកភ្នែក',
      previewBg: 'bg-[#0F172A]',
      textClass: 'text-slate-200',
      borderClass: 'border-slate-700',
    },
  ];

  const sizeOptions = [
    { value: 92, label: 'តូច (92%)' },
    { value: 100, label: 'ធម្មតា (100%)' },
    { value: 108, label: 'ធំល្មម (108%)' },
    { value: 120, label: 'ធំច្បាស់ (120%)' },
    { value: 135, label: 'ធំបំផុត (135%)' },
  ];

  const lineHeightOptions = [
    { value: 1.65, label: 'ស្តង់ដារ (1.65)' },
    { value: 1.85, label: 'ទូលាយស្រួលអាន (1.85)' },
    { value: 2.05, label: 'ទូលាយខ្លាំង (2.05)' },
  ];

  const handleApply = (newSet: FontSettings) => {
    setLocalSettings(newSet);
    onUpdateSettings(newSet);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSet));
    } catch (e) {
      console.error(e);
    }
    applyFontSettingsToDOM(newSet);
  };

  const handleReset = () => {
    handleApply(DEFAULT_FONT_SETTINGS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-indigo-500/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-moul">
                <span>កែសម្រួលទម្រង់អក្សរ & ផ្ទៃក្រោយ</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ជ្រើសរើសពុម្ពអក្សរ ពណ៌ផ្ទៃក្រោយ និងទំហំដែលលោកអ្នកស្រួលមើល
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50 dark:bg-slate-950/30 transition-colors">
          
          {/* Live Preview Box */}
          <div className="bg-slate-100/80 dark:bg-slate-900 p-4 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> ផ្ទាំងសាកល្បងមើលការផ្លាស់ប្តូរផ្ទាល់
              </span>
              <span className="text-[11px] bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-md font-bold">
                ទំហំ: {localSettings.fontSize}% | ផ្ទៃក្រោយ: {bgThemes.find(t => t.id === localSettings.bgTheme)?.label.split(' ')[0]}
              </span>
            </div>
            
            {/* The actual preview box mimicking the theme styling */}
            <div 
              className={`p-4 rounded-xl border transition-all`}
              style={{
                fontSize: `${(localSettings.fontSize / 100) * 15}px`,
                lineHeight: localSettings.lineHeight,
                fontWeight: localSettings.isBoldEnhanced ? '600' : '400',
                backgroundColor: 
                  localSettings.bgTheme === 'warm' ? '#FAF8F5' :
                  localSettings.bgTheme === 'chalkboard' ? '#142D29' :
                  localSettings.bgTheme === 'grid' ? '#FFFFFF' :
                  localSettings.bgTheme === 'sky' ? '#F0F6FC' :
                  localSettings.bgTheme === 'sakura' ? '#FFF5F6' : '#0F172A',
                color: 
                  localSettings.bgTheme === 'warm' ? '#1E293B' :
                  localSettings.bgTheme === 'chalkboard' ? '#F8FAFC' :
                  localSettings.bgTheme === 'grid' ? '#0F172A' :
                  localSettings.bgTheme === 'sky' ? '#0F172A' :
                  localSettings.bgTheme === 'sakura' ? '#3D0C11' : '#F1F5F9',
                borderColor: 
                  localSettings.bgTheme === 'warm' ? '#E5E7EB' :
                  localSettings.bgTheme === 'chalkboard' ? '#1B4D45' :
                  localSettings.bgTheme === 'grid' ? '#CBD5E1' :
                  localSettings.bgTheme === 'sky' ? '#BFDBFE' :
                  localSettings.bgTheme === 'sakura' ? '#FBCFE8' : '#334155',
                backgroundImage: localSettings.bgTheme === 'grid' ? 'linear-gradient(rgba(226,232,240,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(226,232,240,0.8) 1px,transparent 1px)' : 'none',
                backgroundSize: '20px 20px',
              }}
            >
              <h4 className="font-bold mb-1" style={{ color: localSettings.bgTheme === 'chalkboard' ? '#A7F3D0' : localSettings.bgTheme === 'sakura' ? '#9D174D' : '#059669' }}>
                គណិតវិទ្យា ថ្នាក់ទី៦៖ ចំនួន និងតម្លៃខ្ទង់
              </h4>
              <p>
                ប្រព័ន្ធអប់រំកម្ពុជាជួយប្អូនៗសិស្សានុសិស្សថ្នាក់ទី៦ ត្រៀមប្រឡងបញ្ចប់ភូមិសិក្សាដោយជោគជ័យ និងទទួលបាននិទ្ទេសល្អ!
              </p>
            </div>
          </div>

          {/* 1. Background Theme Changer (NEW FEATURE REQUEST) */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-500" />
              <span>១. ជ្រើសរើសស្ទីលពណ៌ផ្ទៃក្រោយ (Background Themes)</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {bgThemes.map((theme) => {
                const isSelected = localSettings.bgTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleApply({ ...localSettings, bgTheme: theme.id })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/40 shadow-xs font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {/* Circle preview of background */}
                    <div className={`w-8 h-8 rounded-xl border ${theme.previewBg} ${theme.borderClass} shrink-0 shadow-2xs flex items-center justify-center`}>
                      {isSelected && <Check className={`w-4 h-4 ${theme.id === 'chalkboard' || theme.id === 'dark' ? 'text-white' : 'text-amber-600'}`} />}
                    </div>
                    
                    <div className="min-w-0">
                      <div className="font-bold text-xs truncate">{theme.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{theme.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Family Options */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-emerald-500" />
              <span>២. ជ្រើសរើសប្រភេទពុម្ពអក្សរខ្មែរ (Khmer Font Style)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {fontOptions.map((opt) => {
                const isSelected = localSettings.fontFamily === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleApply({ ...localSettings, fontFamily: opt.id })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{opt.sub}</span>
                    <span className={`text-xs mt-1 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg ${opt.className}`}>
                      {opt.preview}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Font Size Options */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                ៣. ទំហំអក្សរទូទៅ (Font Size Scale)
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    const next = Math.max(90, localSettings.fontSize - 5);
                    handleApply({ ...localSettings, fontSize: next });
                  }}
                  className="p-1 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs cursor-pointer"
                  title="បង្រួមអក្សរ"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    const next = Math.min(150, localSettings.fontSize + 5);
                    handleApply({ ...localSettings, fontSize: next });
                  }}
                  className="p-1 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs cursor-pointer"
                  title="ពង្រីកអក្សរ"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {sizeOptions.map((sz) => {
                const isSelected = localSettings.fontSize === sz.value;
                return (
                  <button
                    key={sz.value}
                    onClick={() => handleApply({ ...localSettings, fontSize: sz.value })}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {sz.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Line Spacing (Anti-clipping for Khmer) */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              ៤. គម្លាតជួរអក្សរ (ជួយកុំឱ្យជាន់ជើងអក្សរ ឬស្រៈលើ-ក្រោម)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {lineHeightOptions.map((lh) => {
                const isSelected = localSettings.lineHeight === lh.value;
                return (
                  <button
                    key={lh.value}
                    onClick={() => handleApply({ ...localSettings, lineHeight: lh.value })}
                    className={`py-2 px-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {lh.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Text Weight / Boldness */}
          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                អក្សរដិតច្បាស់ (Enhanced Text Boldness)
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                ជួយឱ្យតួអក្សរខ្មែរដិតច្បាស់ល្អ ស្រួលមើលលើអេក្រង់ទូរស័ព្ទ និងកុំព្យូទ័រ
              </p>
            </div>
            <button
              onClick={() => handleApply({ ...localSettings, isBoldEnhanced: !localSettings.isBoldEnhanced })}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                localSettings.isBoldEnhanced ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs ${
                  localSettings.isBoldEnhanced ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>កំណត់ដូចដើម</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            រួចរាល់
          </button>
        </div>

      </div>
    </div>
  );
};
