import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Search,
  Bookmark,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Type,
  Share2,
  CheckCircle2,
  ThumbsUp,
  Lightbulb,
  GraduationCap,
  Award,
  BookMarked
} from 'lucide-react';
import { LIBRARY_ARTICLES, LibraryArticle } from '../data/libraryData';

interface ModernLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModernLibraryModal: React.FC<ModernLibraryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<LibraryArticle | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 20;

  // Saved/bookmarked articles in localStorage
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('grade6_library_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter saved tab
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Article Reader font size state
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Text-to-speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('grade6_library_bookmarks', JSON.stringify(bookmarkedArticleIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedArticleIds]);

  // Clean up speech synthesis when component unmounts or article closes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((aId) => aId !== id) : [...prev, id]
    );
  };

  const handleToggleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('កម្មវិធីរុករកនេះមិនគាំទ្រមុខងារអានសំឡេងឡើយ។');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare speech text (strip markdown symbols like **, #)
    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/\n+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'km-KH'; // Khmer voice if available, falls back to default
    utterance.rate = 0.9; // Slightly slower for better clarity

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Filtered articles logic
  const filteredArticles = LIBRARY_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBookmark = !showOnlyBookmarks || bookmarkedArticleIds.includes(article.id);

    return matchesCategory && matchesSearch && matchesBookmark;
  });

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getFontSizeClass = () => {
    switch (readerFontSize) {
      case 'sm':
        return 'text-sm leading-relaxed';
      case 'lg':
        return 'text-lg leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shadow-md shrink-0 text-2xl">
              📚
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl font-moul tracking-wide text-amber-100 flex items-center gap-2">
                ប័ណ្ណាល័យទំនើប
                <span className="text-xs font-sans bg-amber-500/30 text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400/40 font-normal">
                  {LIBRARY_ARTICLES.length}+ អត្ថបទអប់រំ
                </span>
              </h2>
              <p className="text-xs text-amber-200/90 mt-0.5 hidden sm:block">
                បណ្តុំវិធីសាស្ត្រដោះស្រាយចំណោទ គន្លឹះរៀនពូកែ បច្ចេកវិទ្យា និងអត្ថបទអប់រំសីលធម៌សម្រាប់សិស្សថ្នាក់ទី៦
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis?.cancel();
              onClose();
            }}
            className="p-2 rounded-xl text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            id="btn-close-modern-library"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Article Reader View OR Article List View */}
        {selectedArticle ? (
          /* READ ARTICLE VIEW */
          <div className="flex-1 overflow-y-auto flex flex-col bg-slate-50">
            {/* Reader Action Bar */}
            <div className="p-3 sm:p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 sticky top-0 z-10 shadow-2xs">
              <button
                onClick={() => {
                  if (isPlayingAudio) window.speechSynthesis?.cancel();
                  setIsPlayingAudio(false);
                  setSelectedArticle(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>ត្រឡប់ទៅប័ណ្ណាល័យ</span>
              </button>

              <div className="flex items-center gap-2">
                {/* Text-to-speech button */}
                <button
                  onClick={() =>
                    handleToggleSpeech(`${selectedArticle.title}. ${selectedArticle.content}`)
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                  }`}
                  title="អានជាសំឡេង"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>ផ្អាកអាន</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-700" />
                      <span>ស្ដាប់សំឡេងអាន</span>
                    </>
                  )}
                </button>

                {/* Font Size Adjuster */}
                <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                  <button
                    onClick={() => setReaderFontSize('sm')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      readerFontSize === 'sm' ? 'bg-white shadow-2xs text-amber-800' : 'text-slate-600'
                    }`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setReaderFontSize('md')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      readerFontSize === 'md' ? 'bg-white shadow-2xs text-amber-800' : 'text-slate-600'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setReaderFontSize('lg')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      readerFontSize === 'lg' ? 'bg-white shadow-2xs text-amber-800' : 'text-slate-600'
                    }`}
                  >
                    A+
                  </button>
                </div>

                {/* Bookmark Toggle */}
                <button
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    bookmarkedArticleIds.includes(selectedArticle.id)
                      ? 'bg-rose-100 text-rose-600 border border-rose-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedArticleIds.includes(selectedArticle.id) ? 'fill-rose-600' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Article Content Area */}
            <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6">
              {/* Category Badge & Meta */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedArticle.icon}</span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                    {selectedArticle.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    រយៈពេលអាន {selectedArticle.readingTimeMinutes} នាទី
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold font-moul text-slate-900 leading-snug">
                  {selectedArticle.title}
                </h1>

                <p className="text-sm font-semibold text-amber-900 bg-amber-50 p-3 rounded-2xl border border-amber-200/80">
                  💡 {selectedArticle.summary}
                </p>
              </div>

              {/* Main Article Body */}
              <div className={`text-slate-800 space-y-4 whitespace-pre-line ${getFontSizeClass()}`}>
                {selectedArticle.content}
              </div>

              {/* Key Takeaways Card */}
              {selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 shadow-2xs">
                  <h3 className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>ចំណុចសំខាន់ៗត្រូវចងចាំ (Key Takeaways)</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
                    {selectedArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ARTICLE LIST VIEW */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Search and Filters Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="ស្វែងរកអត្ថបទអប់រំ វិធីសាស្ត្ររៀន វិទ្យាសាស្ត្រ រូបមន្តចំណោទ..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      លុប
                    </button>
                  )}
                </div>

                {/* Saved filter toggle */}
                <button
                  onClick={() => {
                    setShowOnlyBookmarks(!showOnlyBookmarks);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                    showOnlyBookmarks
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${showOnlyBookmarks ? 'fill-white' : 'text-slate-500'}`}
                  />
                  <span>ចំណាំ ({bookmarkedArticleIds.length})</span>
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'all', label: 'ទាំងអស់' },
                  { id: 'math', label: 'គណិតវិទ្យា 📐' },
                  { id: 'science', label: 'វិទ្យាសាស្ត្រ 🔬' },
                  { id: 'study_method', label: 'វិធីសាស្ត្ររៀន ⏱️' },
                  { id: 'morals', label: 'សីលធម៌-អប់រំ 🌸' },
                  { id: 'exam_tips', label: 'បច្ចេកទេសប្រឡង ⏳' },
                  { id: 'khmer', label: 'ភាសាខ្មែរ ✍️' },
                  { id: 'social', label: 'សិក្សាសង្គម-ប្រវត្តិវិទ្យា 🏛️' },
                  { id: 'life_skills', label: 'បំណិនជីវិត 🌿' },
                  { id: 'tech', label: 'បច្ចេកវិទ្យា 💻' },
                  { id: 'environment', label: 'បរិស្ថាន 🌍' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-amber-700 text-white shadow-2xs'
                        : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Results summary bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                <span>
                  បង្ហាញ {filteredArticles.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} -{' '}
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} នៃ{' '}
                  <strong>{filteredArticles.length}</strong> អត្ថបទ
                </span>
                <span>ទំព័រទី {currentPage} / {totalPages}</span>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="p-4 sm:p-6 flex-1 bg-slate-100/60 flex flex-col justify-between space-y-6">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <BookMarked className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-600">
                    មិនរកឃើញអត្ថបទអប់រំដែលប្អូនស្វែងរកឡើយ
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setShowOnlyBookmarks(false);
                      setCurrentPage(1);
                    }}
                    className="text-xs font-bold text-amber-700 underline cursor-pointer"
                  >
                    បង្ហាញអត្ថបទទាំងអស់ឡើងវិញ
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedArticles.map((art) => {
                    const isBookmarked = bookmarkedArticleIds.includes(art.id);

                    return (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400/80 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{art.icon}</span>
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                                {art.categoryLabel}
                              </span>
                            </div>

                            <button
                              onClick={(e) => toggleBookmark(art.id, e)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="រក្សាទុកចំណាំ"
                            >
                              <Bookmark
                                className={`w-4 h-4 ${isBookmarked ? 'fill-rose-600 text-rose-600' : ''}`}
                              />
                            </button>
                          </div>

                          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                            {art.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {art.readingTimeMinutes} នាទី
                          </span>

                          <span className="font-bold text-amber-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            អានអត្ថបទ →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-200/80">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>ថយក្រោយ</span>
                  </button>

                  <span className="text-xs font-bold text-slate-700 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>បន្ទាប់</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Bottom Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between px-5 shrink-0">
          <span>ប័ណ្ណាល័យអប់រំ និងវិធីសាស្ត្ររៀនសូត្រថ្នាក់ទី៦ ({LIBRARY_ARTICLES.length} អត្ថបទ)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            បិទ
          </button>
        </div>
      </div>
    </div>
  );
};
