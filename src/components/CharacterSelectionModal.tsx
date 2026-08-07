import React, { useState, useEffect } from 'react';
import { CHARACTERS_DATA, FullBodyCharacter as CharacterType } from '../data/charactersData';
import { FullBodyCharacter } from './FullBodyCharacter';
import { playDanceBeat } from '../utils/audioSynthesizer';
import {
  Sparkles,
  X,
  Search,
  CheckCircle2,
  Music,
  Volume2,
  Zap,
} from 'lucide-react';

interface CharacterSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCharacterId?: string;
  onSelectCharacter: (character: CharacterType) => void;
}

export const CharacterSelectionModal: React.FC<CharacterSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedCharacterId,
  onSelectCharacter
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewCharacter, setPreviewCharacter] = useState<CharacterType | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      if (selectedCharacterId) {
        const found = CHARACTERS_DATA.find((c) => c.id === selectedCharacterId);
        if (found) {
          setPreviewCharacter(found);
          playDanceBeat(found.soundBeat);
        } else {
          setPreviewCharacter(CHARACTERS_DATA[0]);
          playDanceBeat(CHARACTERS_DATA[0].soundBeat);
        }
      } else {
        setPreviewCharacter(CHARACTERS_DATA[0]);
        playDanceBeat(CHARACTERS_DATA[0].soundBeat);
      }
    }
  }, [isOpen, selectedCharacterId]);

  if (!isOpen) return null;

  // Categories list including requested Professions
  const categories = [
    { id: 'all', label: 'ទាំងអស់ (៥០+ តួអង្គ)' },
    { id: 'profession', label: 'អាជីព & មុខរបរ (👮🏻 🕵️‍♀️ 👷🏻‍♀️ 👩🏼‍⚕️ 👨‍🍳 👩‍🎤 👨‍🎓 👩🏻‍🏫 👩🏻‍🚒 🥷🏻 👰🏼‍♀️ 🤵🏻 👩🏻‍🚀)' },
    { id: 'school', label: 'សិស្សសាលា & យុវជន (🙋🏻‍♀️ 🙇🏼‍♀️ 🧑🏻‍🎨)' },
    { id: 'culture', label: 'វប្បធម៌ខ្មែរ & កីឡា (💃 🥊 ⚽)' },
    { id: 'hero', label: 'វីរបុរស & អវកាស (🦸🏻‍♂️ 🥷🏻 👩🏻‍🚀)' },
    { id: 'magic', label: 'វេទមន្ត & ទេពអប្សរ (🧙‍♀️ 🧛‍♂️ 🧟‍♀️ 🧌 🤶🏻)' },
    { id: 'animal', label: 'សត្វឆ្លាតវៃ (🐰 🦊)' }
  ];

  // Gesture display labels
  const getGestureLabel = (gesture?: string) => {
    switch (gesture) {
      case 'sampeah':
        return '🙏 កាយវិការសំពះ (Sampeah)';
      case 'wave':
        return '🤚 កាយវិការជម្រាបសួរ (Waving)';
      case 'peace':
        return '✌️ កាយវិការសន្តិភាព (Peace V)';
      case 'love':
        return '🤟 កាយវិការបេះដូង (Love)';
      case 'heart_hands':
        return '🫶 ដៃរូបបេះដូង (Heart Hands)';
      case 'raise_hand':
        return '🙋‍♀️ លើកដៃសួរ (Raise Hand)';
      case 'bow':
        return '🙇‍♀️ អោនក្បាលគោរព (Bowing)';
      default:
        return '🙏 កាយវិការសំពះ';
    }
  };

  // Filtered characters
  const filteredCharacters = CHARACTERS_DATA.filter((char) => {
    const matchesCategory = activeCategory === 'all' || char.category === activeCategory;
    const matchesSearch =
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.catchphrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.badgeEmoji.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleCharacterClick = (char: CharacterType) => {
    setPreviewCharacter(char);
    if (isPlayingMusic) {
      playDanceBeat(char.soundBeat);
    }
  };

  const handleConfirmSelection = () => {
    if (previewCharacter) {
      onSelectCharacter(previewCharacter);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-gradient-to-b from-amber-50 via-white to-amber-100/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 rounded-3xl shadow-2xl border-2 border-amber-300 dark:border-amber-600/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-[#3A1D0B] via-[#5C2E12] to-[#2E1408] text-amber-50 p-4 sm:p-5 border-b border-amber-600/40 shrink-0">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-200 transition-all cursor-pointer border border-amber-600/50 shadow-md"
            id="btn-close-character-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center text-2xl shadow-lg border-2 border-amber-200 shrink-0">
              🎭
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold font-moul text-yellow-300 tracking-wide flex items-center gap-2">
                <span>🎭 ចុះឈ្មោះ & ជ្រើសរើសតួអង្គសិក្សាដំបូង</span>
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
              </h2>
              <p className="text-xs text-amber-200/90 font-medium">
                សូមជ្រើសរើសតួអង្គដៃគូសិក្សា Cute Cute សម្រាប់ប្រើប្រាស់ក្នុងកម្មវិធី (មាន ៥០+ តួអង្គផ្លូវការ)!
              </p>
            </div>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          {/* Active Preview Spotlight Card */}
          {previewCharacter && (
            <div className="bg-gradient-to-br from-amber-500/10 via-yellow-400/20 to-amber-600/10 dark:from-amber-950/40 dark:via-yellow-900/30 dark:to-slate-900 p-4 sm:p-5 rounded-3xl border-2 border-amber-400/80 dark:border-amber-500/50 shadow-xl flex flex-col md:flex-row items-center gap-5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />

              {/* Dancing Character Preview */}
              <div className="shrink-0 flex flex-col items-center bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-amber-300/80 shadow-inner w-full md:w-56">
                <FullBodyCharacter
                  character={previewCharacter}
                  isDancing={true}
                  size="lg"
                  showBadge={false}
                />
                <div className="mt-2 text-center space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-xs shadow-md animate-bounce">
                    <Music className="w-3.5 h-3.5" />
                    <span>{previewCharacter.danceNameKhmer}</span>
                  </span>
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-300">
                    {getGestureLabel(previewCharacter.features.gesture)}
                  </div>
                </div>
              </div>

              {/* Character Info & Catchphrase */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 text-[11px] font-bold mb-1">
                    {previewCharacter.categoryLabel} • {previewCharacter.badgeEmoji}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-moul text-amber-950 dark:text-yellow-300">
                    {previewCharacter.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                    {previewCharacter.title}
                  </p>
                </div>

                {/* Speech Bubble Quote */}
                <div className="relative bg-white dark:bg-slate-800 p-3.5 rounded-2xl border-2 border-amber-400 text-amber-950 dark:text-amber-100 text-xs sm:text-sm font-bold shadow-md">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-amber-400 border-b-8 border-b-transparent hidden md:block" />
                  <p className="italic">"{previewCharacter.catchphrase}"</p>
                </div>

                <div className="text-[11px] text-amber-900 dark:text-amber-200 flex items-center justify-center md:justify-start gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{previewCharacter.danceDescription}</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <button
                    onClick={handleConfirmSelection}
                    className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold font-moul text-xs sm:text-sm shadow-xl shadow-amber-900/20 active:scale-98 transition-all cursor-pointer flex items-center gap-2 border border-amber-200"
                    id="btn-confirm-character-select"
                  >
                    <CheckCircle2 className="w-5 h-5 text-yellow-200" />
                    <span>ជ្រើសរើសតួអង្គនេះចូលរៀន</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlayingMusic(!isPlayingMusic);
                      if (!isPlayingMusic) playDanceBeat(previewCharacter.soundBeat);
                    }}
                    className="p-3 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-800 text-amber-900 dark:text-amber-200 font-bold text-xs border border-amber-300 dark:border-slate-700 cursor-pointer transition-colors flex items-center gap-1.5"
                    title="បើក/បិទសំឡេងចង្វាក់"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                    <span>{isPlayingMusic ? 'បិទភ្លេង' : 'ស្តាប់ភ្លេងរាំ'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search & Category Filter */}
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ស្វែងរកតួអង្គ (ឧទាហរណ៍៖ នគរបាល, គ្រូពេទ្យ, និនចា, ចុងភៅ, វីរបុរស...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-amber-300/80 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-slate-100 shadow-xs"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-white shadow-md font-bold border border-amber-300'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-100 border border-amber-200/80 dark:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Characters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
            {filteredCharacters.map((char) => {
              const isSelected = previewCharacter?.id === char.id;
              return (
                <div
                  key={char.id}
                  onClick={() => handleCharacterClick(char)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between group relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-100 to-amber-200/90 dark:from-amber-950/80 dark:to-yellow-900/60 border-amber-500 shadow-lg ring-2 ring-amber-400 scale-102'
                      : 'bg-white dark:bg-slate-900 border-amber-200/80 dark:border-slate-800 hover:border-amber-400 hover:shadow-md hover:bg-amber-50/50'
                  }`}
                >
                  {/* Category Tag */}
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100/80 dark:bg-slate-800 text-amber-900 dark:text-amber-200 border border-amber-300/60 z-10">
                    {char.badgeEmoji}
                  </span>

                  {/* Character Illustration */}
                  <div className="my-1 py-1 transform group-hover:scale-105 transition-transform">
                    <FullBodyCharacter
                      character={char}
                      isDancing={isSelected}
                      size="md"
                      showBadge={false}
                    />
                  </div>

                  {/* Name & Title */}
                  <div className="w-full text-center mt-1">
                    <h4 className="text-xs font-bold font-moul text-amber-950 dark:text-yellow-300 truncate">
                      {char.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {char.title}
                    </p>

                    <span className="mt-1.5 inline-block w-full py-1 px-1 rounded-lg text-[10px] font-bold text-amber-900 dark:text-amber-200 bg-amber-200/50 dark:bg-slate-800 border border-amber-300/60 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      {isSelected ? '✓ កំពុងជ្រើសរើស' : 'ចុចដើម្បីរាំ'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCharacters.length === 0 && (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400 font-semibold text-sm">
              មិនរកឃើញតួអង្គឡើយ! សូមសាកល្បងពាក្យគន្លឹះផ្សេងទៀត។
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
