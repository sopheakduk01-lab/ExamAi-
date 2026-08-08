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
  CheckCircle2,
  BookMarked,
  Flame,
  Star,
  Share2,
  BookOpenCheck,
  GraduationCap,
  TrendingUp,
  Lightbulb
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

  const ITEMS_PER_PAGE = 12;

  // Saved/bookmarked articles in localStorage
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('grade6_library_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('grade6_library_bookmarks', JSON.stringify(bookmarkedArticleIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedArticleIds]);

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

    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/\n+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'km-KH';
    utterance.rate = 0.9;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleShare = (article: LibraryArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title}\n\n${article.summary}\n\n(ពីបណ្ណាល័យទំនើប ត្រៀមប្រឡងថ្នាក់ទី៦)`);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
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

  const featuredArticle = LIBRARY_ARTICLES[0];

  const getFontSizeClass = () => {
    switch (readerFontSize) {
      case 'sm':
        return 'text-sm leading-relaxed';
      case 'lg':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-50 via-white to-amber-50/40 rounded-3xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl border border-amber-500/30 overflow-hidden relative">
        {/* Ambient glowing background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header with Rich Gradient */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-[#2B170B] via-[#452413] to-[#2B170B] text-white flex items-center justify-between shrink-0 border-b border-amber-600/30 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 text-amber-950 flex items-center justify-center font-bold shadow-lg shadow-amber-950/50 text-2xl border border-yellow-200/50 shrink-0 transform hover:scale-105 transition-transform">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg sm:text-2xl font-moul tracking-wide text-amber-100">
                  បណ្ណាល័យទំនើបឌីជីថល
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-sans font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 shadow-xs">
                  <Sparkles className="w-3 h-3 animate-spin" /> VIP 2026
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/90 mt-1 font-sans">
                បណ្តុំអត្ថបទអប់រំ គន្លឹះដោះស្រាយចំណោទ ស្វ័យសិក្សា និងត្រៀមប្រឡងសញ្ញាបត្របឋមភូមិថ្នាក់ទី៦
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis?.cancel();
              onClose();
            }}
            className="p-2.5 rounded-2xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 hover:text-white transition-all cursor-pointer border border-amber-500/30 shadow-md hover:scale-105 active:scale-95"
            id="btn-close-modern-library"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Notification Toast for Share */}
        {copiedNotification && (
          <div className="absolute top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>បានចម្លងតំណភ្ជាប់អត្ថបទរួចរាល់!</span>
          </div>
        )}

        {/* Article Reader View OR Article List View */}
        {selectedArticle ? (
          /* READ ARTICLE VIEW */
          <div className="flex-1 overflow-y-auto flex flex-col bg-gradient-to-b from-white to-amber-50/30 relative z-10">
            {/* Reader Action Bar */}
            <div className="p-3.5 sm:p-4 bg-white/95 backdrop-blur-md border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-xs">
              <button
                onClick={() => {
                  if (isPlayingAudio) window.speechSynthesis?.cancel();
                  setIsPlayingAudio(false);
                  setSelectedArticle(null);
                }}
                className="px-4 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border border-amber-200 shadow-2xs hover:scale-102"
              >
                <ChevronLeft className="w-4 h-4 text-amber-700" />
                <span>ត្រឡប់ទៅបញ្ជីអត្ថបទ</span>
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Text-to-speech button */}
                <button
                  onClick={() =>
                    handleToggleSpeech(`${selectedArticle.title}. ${selectedArticle.content}`)
                  }
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/30'
                      : 'bg-amber-500 hover:bg-amber-400 text-amber-950 border border-amber-300'
                  }`}
                  title="អានជាសំឡេង"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>ផ្អាកអានសំឡេង</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>ស្តាប់សំឡេងអាន</span>
                    </>
                  )}
                </button>

                {/* Font Size Adjuster */}
                <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 shadow-inner">
                  <button
                    onClick={() => setReaderFontSize('sm')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      readerFontSize === 'sm' ? 'bg-white shadow-xs text-amber-950 font-extrabold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setReaderFontSize('md')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      readerFontSize === 'md' ? 'bg-white shadow-xs text-amber-950 font-extrabold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setReaderFontSize('lg')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      readerFontSize === 'lg' ? 'bg-white shadow-xs text-amber-950 font-extrabold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    A+
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                  title="ចែករំលែកអត្ថបទ"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Bookmark Toggle */}
                <button
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className={`p-2.5 rounded-2xl transition-all cursor-pointer shadow-2xs ${
                    bookmarkedArticleIds.includes(selectedArticle.id)
                      ? 'bg-rose-500 text-white border border-rose-600 shadow-rose-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedArticleIds.includes(selectedArticle.id) ? 'fill-white' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Article Content Area */}
            <div className="p-5 sm:p-10 max-w-4xl mx-auto w-full space-y-8">
              {/* Category Badge & Meta Header */}
              <div className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-3 rounded-2xl bg-amber-100/80 border border-amber-200 shadow-xs">
                      {selectedArticle.icon}
                    </span>
                    <div>
                      <span className="px-3.5 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-bold font-moul shadow-2xs">
                        {selectedArticle.categoryLabel}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>រយៈពេលអានប្រហែល {selectedArticle.readingTimeMinutes} នាទី</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ផ្ទៀងផ្ទាត់ដោយក្រសួង
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold font-moul text-slate-900 leading-snug">
                  {selectedArticle.title}
                </h1>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/60 border border-amber-200/80 text-amber-950 font-medium text-sm sm:text-base shadow-2xs leading-relaxed flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-moul block text-xs text-amber-800 mb-1">សេចក្តីសង្ខេបខ្លឹមសារ៖</strong>
                    {selectedArticle.summary}
                  </div>
                </div>
              </div>

              {/* Main Article Body */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6">
                <div className={`text-slate-800 space-y-5 whitespace-pre-line font-sans ${getFontSizeClass()}`}>
                  {selectedArticle.content}
                </div>
              </div>

              {/* Key Takeaways Card */}
              {selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white space-y-4 shadow-xl border border-emerald-500/30 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                  <h3 className="font-bold text-base sm:text-lg font-moul text-emerald-200 flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40">
                      <BookOpenCheck className="w-5 h-5 text-emerald-300" />
                    </div>
                    <span>ចំណុចសំខាន់ៗត្រូវចងចាំ (Key Takeaways)</span>
                  </h3>

                  <ul className="space-y-3 text-sm sm:text-base text-emerald-100 font-sans">
                    {selectedArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/20 shadow-2xs">
                        <span className="w-6 h-6 rounded-full bg-emerald-500 text-emerald-950 font-bold flex items-center justify-center shrink-0 text-xs shadow-xs">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ARTICLE LIST VIEW */
          <div className="flex-1 overflow-y-auto flex flex-col relative z-10">
            {/* Search, Filters & Hero Featured Carousel */}
            <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md border-b border-slate-200/80 space-y-5 shadow-sm">
              {/* Featured Banner at top */}
              {featuredArticle && !searchQuery && selectedCategory === 'all' && !showOnlyBookmarks && (
                <div
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3D2012] via-[#59301A] to-[#2B150A] text-amber-50 p-5 sm:p-7 shadow-xl border border-amber-600/40 cursor-pointer group hover:scale-[1.01] transition-transform"
                >
                  <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[11px] font-bold font-moul">
                          ⭐ អត្ថបទពិសេសប្រចាំថ្ងៃ
                        </span>
                        <span className="text-xs text-amber-200/90 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5" /> អាន {featuredArticle.readingTimeMinutes} នាទី
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-moul text-amber-100 group-hover:text-yellow-300 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-200/90 line-clamp-2 leading-relaxed font-sans">
                        {featuredArticle.summary}
                      </p>
                    </div>

                    <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-bold text-xs sm:text-sm shadow-lg group-hover:scale-105 transition-all shrink-0 flex items-center gap-2 border border-yellow-200/50">
                      <span>អានឥឡូវនេះ</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Search Bar & Bookmarks Toggle */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-amber-700 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="ស្វែងរកអត្ថបទអប់រំ គន្លឹះដោះស្រាយចំណោទ វិទ្យាសាស្ត្រ រូបមន្ត..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-amber-600/30 bg-amber-50/40 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-hidden focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-500/20 transition-all font-sans shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200/60 px-2.5 py-1 rounded-xl"
                    >
                      លុប
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowOnlyBookmarks(!showOnlyBookmarks);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
                    showOnlyBookmarks
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30 scale-102'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 shadow-2xs'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${showOnlyBookmarks ? 'fill-white' : 'text-rose-600'}`}
                  />
                  <span>អត្ថបទបានចំណាំ ({bookmarkedArticleIds.length})</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
                {[
                  { id: 'all', label: '🌟 ទាំងអស់' },
                  { id: 'math', label: '📐 គណិតវិទ្យា' },
                  { id: 'science', label: '🔬 វិទ្យាសាស្ត្រ' },
                  { id: 'study_method', label: '⏱️ វិធីសាស្ត្ររៀន' },
                  { id: 'morals', label: '🌸 សីលធម៌-អប់រំ' },
                  { id: 'exam_tips', label: '⏳ បច្ចេកទេសប្រឡង' },
                  { id: 'khmer', label: '✍️ ភាសាខ្មែរ' },
                  { id: 'social', label: '🏛️ សិក្សាសង្គម' },
                  { id: 'life_skills', label: '🌿 បំណិនជីវិត' },
                  { id: 'tech', label: '💻 បច្ចេកវិទ្យា' },
                  { id: 'environment', label: '🌍 បរិស្ថាន' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-2xl font-bold cursor-pointer transition-all shrink-0 font-moul ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-900/30 scale-105 border border-amber-500'
                        : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Results count & status bar */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/80 font-medium">
                <span>
                  បង្ហាញពី {filteredArticles.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} ដល់{' '}
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} នៃសរុប{' '}
                  <strong className="text-amber-900">{filteredArticles.length}</strong> អត្ថបទ
                </span>
                <span className="font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-xl border border-amber-200">
                  ទំព័រទី {currentPage} / {totalPages}
                </span>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="p-4 sm:p-8 flex-1 bg-gradient-to-b from-slate-100/70 to-amber-50/20 flex flex-col justify-between space-y-6">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 space-y-4 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto w-full p-8">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-3xl shadow-inner">
                    📭
                  </div>
                  <h3 className="font-bold text-base text-slate-900 font-moul">
                    មិនមានអត្ថបទដែលត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    សូមព្យាយាមស្វែងរកពាក្យគន្លឹះផ្សេង ឬចុចមើលប្រភេទអត្ថបទផ្សេងទៀត។
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setShowOnlyBookmarks(false);
                      setCurrentPage(1);
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-md inline-block"
                  >
                    បង្ហាញអត្ថបទទាំងអស់
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedArticles.map((art) => {
                    const isBookmarked = bookmarkedArticleIds.includes(art.id);

                    return (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-950/10 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group transform hover:-translate-y-1 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                        <div className="space-y-3 relative z-10">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="text-3xl p-2 rounded-2xl bg-amber-50 border border-amber-200/80 shadow-2xs group-hover:scale-110 transition-transform">
                                {art.icon}
                              </span>
                              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200">
                                {art.categoryLabel}
                              </span>
                            </div>

                            <button
                              onClick={(e) => toggleBookmark(art.id, e)}
                              className={`p-2 rounded-xl transition-all cursor-pointer ${
                                isBookmarked
                                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                                  : 'bg-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                              }`}
                              title="រក្សាទុកចំណាំ"
                            >
                              <Bookmark
                                className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`}
                              />
                            </button>
                          </div>

                          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 font-moul leading-snug">
                            {art.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                            {art.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium relative z-10">
                          <span className="flex items-center gap-1 text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60 font-sans">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            អាន {art.readingTimeMinutes} នាទី
                          </span>

                          <span className="font-bold text-amber-700 group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-moul text-xs">
                            អានបន្ត →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-6 border-t border-slate-200">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>ទំព័រមុន</span>
                  </button>

                  <div className="px-4 py-2 rounded-2xl bg-amber-100 text-amber-950 text-xs font-bold border border-amber-300 shadow-inner">
                    ទំព័រទី {currentPage} នៃ {totalPages}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <span>ទំព័របន្ទាប់</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Bottom Footer */}
        <div className="p-3.5 bg-[#2B170B] text-amber-200 border-t border-amber-600/30 text-xs flex items-center justify-between px-6 shrink-0 shadow-lg">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span className="font-moul">បណ្ណាល័យឌីជីថលក្រសួងអប់រំ - ថ្នាក់ទី៦ ({LIBRARY_ARTICLES.length} អត្ថបទសរុប)</span>
          </div>
          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis?.cancel();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            បិទបណ្ណាល័យ
          </button>
        </div>
      </div>
    </div>
  );
};
