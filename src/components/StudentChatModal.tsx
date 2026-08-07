import React, { useState, useEffect, useRef } from 'react';
import { StudentAccount } from '../types';
import {
  ChatMessage,
  CHAT_CHANNELS,
  getChatMessages,
  sendStudentChatMessage,
  toggleMessageReaction
} from '../utils/studentChat';
import {
  MessageSquare,
  Send,
  User,
  Users,
  Sparkles,
  X,
  Smile,
  ThumbsUp,
  Heart,
  Lightbulb,
  Award,
  BookOpen,
  School,
  Lock,
  Search,
  HelpCircle,
  RefreshCw,
  Clock,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Paperclip,
  ChevronDown,
  Volume2,
  Share2,
  Hash,
  Menu,
  Zap,
  Star
} from 'lucide-react';

interface StudentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccount: StudentAccount | null;
  onOpenAccountModal: () => void;
}

const QUICK_EMOJIS = ['👍', '❤️', '💡', '👏', '🎯', '🔥', '😊', '🙏', '🎉', '📚', '📐', '⭐'];

const QUICK_QUESTION_TEMPLATES = [
  'សូមជួយពន្យល់លំហាត់នេះផង!',
  'តើត្រូវរៀបចំកាលវិភាគរៀនប្រឡងយ៉ាងដូចម្តេច?',
  'អ្នកណាចេះរូបមន្តគណិតវិទ្យាទី៦ខ្លះ?',
  'សូមចែករំលែកប្រធានបទតែងសេចក្តីល្អៗ!',
  'មានវគ្គរំលឹកមេរៀនវិទ្យាសាស្ត្រអត់?'
];

const SIMULATED_ONLINE_PEERS = [
  { name: 'សុខា', avatar: '👦', grade: 'ទី៦A', school: 'វត្តភ្នំ' },
  { name: 'រតនា', avatar: '👧', grade: 'ទី៦B', school: 'ចតុមុខ' },
  { name: 'មករា', avatar: '🌟', grade: 'ទី៦C', school: 'នរោត្តម' },
  { name: 'ចាន់ថន', avatar: '🎓', grade: 'ទី៦A', school: 'សាលាសិស្សពូកែ' },
  { name: 'សុភ័ក្ត្រ', avatar: '📚', grade: 'ទី៦D', school: 'បឋមសិក្សាភ្នំពេញ' }
];

export const StudentChatModal: React.FC<StudentChatModalProps> = ({
  isOpen,
  onClose,
  currentAccount,
  onOpenAccountModal
}) => {
  const [activeChannelId, setActiveChannelId] = useState<string>('general');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const loadMessages = () => {
    setMessages(getChatMessages());
  };

  useEffect(() => {
    if (isOpen) {
      loadMessages();
      const handleChatUpdate = () => loadMessages();
      window.addEventListener('grade6_chat_updated', handleChatUpdate);
      return () => {
        window.removeEventListener('grade6_chat_updated', handleChatUpdate);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, activeChannelId, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight > 120) {
      setShowScrollBottom(true);
    } else {
      setShowScrollBottom(false);
    }
  };

  if (!isOpen) return null;

  const currentChannel = CHAT_CHANNELS.find((c) => c.id === activeChannelId) || CHAT_CHANNELS[0];

  const filteredMessages = messages.filter((m) => {
    const matchesChannel = m.channelId === activeChannelId;
    if (!searchTerm.trim()) return matchesChannel;
    return (
      matchesChannel &&
      (m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.senderName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!currentAccount) {
      onOpenAccountModal();
      return;
    }

    sendStudentChatMessage(currentAccount, activeChannelId, inputText);
    setInputText('');
    setShowEmojiPicker(false);
    loadMessages();

    // Trigger typing effect & simulated response for questions
    if (
      inputText.includes('?') ||
      inputText.includes('តើ') ||
      inputText.includes('សូម') ||
      inputText.includes('ជួយ') ||
      inputText.includes('រូបមន្ត')
    ) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const peerResponses = [
          'អរគុណសម្រាប់សំណួរ! សិស្សច្បង និងមិត្តៗនៅក្នុងក្រុមនឹងជួយឆ្លើយក្នុងពេលឆាប់ៗនេះ! 🌟',
          'សំណួរនេះល្អណាស់! ចាំខ្ញុំជួយរកលំហាត់ និងរូបមន្តស្រដៀងគ្នាមកចែករំលែក! 📚',
          'សូមរង់ចាំបន្តិច មិត្តៗថ្នាក់ទី៦ កំពុងពិភាក្សាលើប្រធានបទនេះ! 👏',
          'តស៊ូឡើង! រៀនរួមគ្នាដើម្បីទទួលបាននិទ្ទេសល្អក្នុងការប្រឡងថ្នាក់ទី៦! 🏆'
        ];
        const randomReply = peerResponses[Math.floor(Math.random() * peerResponses.length)];
        const aiMsg: ChatMessage = {
          id: `msg_peer_${Date.now()}`,
          senderId: 'peer_bot',
          senderName: 'ជំនួយការសិក្សាថ្នាក់ទី៦ 🤖',
          senderAvatar: '🤖',
          senderGrade: 'ជំនួយការ',
          channelId: activeChannelId,
          content: randomReply,
          timestamp: new Date().toISOString(),
          isAiPeer: true
        };
        const updated = [...getChatMessages(), aiMsg];
        localStorage.setItem('grade6_student_chat_messages_v1', JSON.stringify(updated));
        loadMessages();
      }, 1800);
    }
  };

  const handleReaction = (msgId: string, emoji: string) => {
    toggleMessageReaction(msgId, emoji);
    loadMessages();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="w-full max-w-5xl h-[92vh] max-h-[820px] bg-white rounded-3xl shadow-2xl border border-amber-300/60 overflow-hidden flex flex-col md:flex-row relative">
        
        {/* LEFT SIDEBAR: Channels & Student Status */}
        <div
          className={`w-full md:w-80 bg-gradient-to-b from-[#2A150B] via-[#1F0E07] to-[#150904] text-amber-100 p-4 border-b md:border-b-0 md:border-r border-amber-800/40 flex flex-col justify-between shrink-0 transition-all ${
            showMobileSidebar ? 'block' : 'hidden md:flex'
          }`}
        >
          <div>
            {/* Top Brand Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-amber-800/50 mb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 text-amber-950 flex items-center justify-center font-black text-xl shadow-lg ring-2 ring-amber-400/30">
                  💬
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-moul text-sm text-yellow-300 tracking-wide">
                      Chat សិស្សទី៦
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="អនឡាញ" />
                  </div>
                  <p className="text-[10px] text-amber-300/80 font-medium">
                    បណ្តាញពិភាក្សាសិក្សា និងសួរសំណួរ
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="md:hidden p-2 rounded-xl bg-amber-950/80 text-amber-300 hover:bg-amber-900 border border-amber-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active Account Card */}
            {currentAccount ? (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/90 to-amber-900/60 border border-amber-500/30 mb-4 shadow-inner flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-2xl bg-amber-200/20 border border-amber-400/40 text-2xl flex items-center justify-center shrink-0 shadow-xs">
                    {currentAccount.avatar}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-xs font-moul text-amber-100 truncate">
                        {currentAccount.name}
                      </p>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    </div>
                    <p className="text-[10px] text-amber-300/80 truncate">
                      {currentAccount.grade} • {currentAccount.school || 'សាលារៀន'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenAccountModal}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 border border-amber-400/40 text-[10px] font-bold shrink-0 cursor-pointer transition-colors"
                >
                  កែប្រែ
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950 to-amber-900 border border-amber-500/50 mb-4 text-center shadow-lg">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-1.5">
                  <User className="w-4 h-4" />
                </div>
                <p className="text-xs text-amber-100 font-bold mb-1">មិនទាន់ចូលប្រើប្រាស់ Account</p>
                <p className="text-[10px] text-amber-300/80 mb-2.5">
                  បង្កើត ឬជ្រើសរើស Account ដើម្បីផ្ញើសារសួរសំណួរ!
                </p>
                <button
                  type="button"
                  onClick={onOpenAccountModal}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-bold font-moul text-xs shadow-md cursor-pointer transition-all active:scale-95"
                >
                  + ចូល/បង្កើត Account
                </button>
              </div>
            )}

            {/* Channels Header & List */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 mb-1.5">
                <span className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  បន្ទប់ពិភាក្សា (Channels)
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-md border border-amber-500/30 font-bold">
                  {CHAT_CHANNELS.length}
                </span>
              </div>

              <div className="space-y-1.5 max-h-48 md:max-h-72 overflow-y-auto pr-1">
                {CHAT_CHANNELS.map((ch) => {
                  const isActive = ch.id === activeChannelId;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        setActiveChannelId(ch.id);
                        setSearchTerm('');
                        setShowMobileSidebar(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl text-left flex items-center gap-3 transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold shadow-md scale-101 border border-amber-300'
                          : 'hover:bg-amber-900/40 text-amber-200/90 border border-transparent'
                      }`}
                    >
                      <span className="text-xl p-1 rounded-xl bg-black/10 shrink-0">
                        {ch.icon}
                      </span>
                      <div className="truncate flex-1">
                        <p className={`text-xs truncate ${isActive ? 'font-moul text-amber-950' : 'font-semibold text-amber-100 group-hover:text-yellow-200'}`}>
                          {ch.name}
                        </p>
                        <p className={`text-[10px] truncate ${isActive ? 'text-amber-900 font-medium' : 'text-amber-400/70'}`}>
                          {ch.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Online Members Quick Avatar Strip */}
            <div className="mt-4 pt-3 border-t border-amber-800/40">
              <div className="flex items-center justify-between text-[10px] text-amber-300/80 mb-2 font-semibold">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-400" />
                  សិស្សកំពុងអនឡាញ (៥នាក់)
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {SIMULATED_ONLINE_PEERS.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 bg-amber-950/80 px-2 py-1 rounded-xl border border-amber-800/50 shrink-0"
                    title={`${p.name} (${p.school})`}
                  >
                    <span className="text-xs">{p.avatar}</span>
                    <span className="text-[10px] font-bold text-amber-200">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Sync Badge */}
          <div className="pt-3 border-t border-amber-800/40 hidden md:block">
            <div className="flex items-center gap-2 text-[10px] text-amber-300/80">
              <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span>ប្រព័ន្ធរក្សាទុកសារភ្លាមៗ (Instant Local Storage)</span>
            </div>
          </div>
        </div>

        {/* RIGHT AREA: Main Chat Board */}
        <div className="flex-1 flex flex-col bg-slate-50/80 min-w-0">
          
          {/* Header Bar */}
          <div className="bg-white p-3.5 px-4 border-b border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className="md:hidden p-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 cursor-pointer"
                title="បើកបញ្ជីបន្ទប់"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300/70 text-2xl flex items-center justify-center shrink-0 shadow-2xs">
                {currentChannel.icon}
              </div>

              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="font-moul text-sm text-amber-950 truncate">
                    {currentChannel.name}
                  </h3>
                  <span className="hidden sm:inline bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    ថ្នាក់ទី៦
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{currentChannel.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search Bar */}
              <div className="relative hidden sm:block w-44">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ស្វែងរកសារ..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none bg-slate-50/80 font-medium"
                />
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-2xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                id="btn-close-student-chat-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Questions & Templates Strip */}
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 p-2 px-3 border-b border-amber-200/70 overflow-x-auto flex items-center gap-2 text-xs shrink-0 no-scrollbar">
            <span className="text-[11px] font-bold text-amber-900 shrink-0 flex items-center gap-1.5 bg-amber-200/60 px-2 py-0.5 rounded-lg border border-amber-300/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              សំណួរលឿនៗ៖
            </span>
            {QUICK_QUESTION_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(tmpl)}
                className="px-3 py-1 rounded-full bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 text-[11px] whitespace-nowrap cursor-pointer transition-all shadow-2xs font-semibold hover:scale-102 active:scale-95"
              >
                {tmpl}
              </button>
            ))}
          </div>

          {/* Messages Feed Area */}
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-4 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
          >
            {filteredMessages.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3 bg-white/60 backdrop-blur-xs rounded-3xl border border-dashed border-slate-300 max-w-md mx-auto p-6 my-8">
                <div className="w-14 h-14 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl shadow-inner">
                  {currentChannel.icon}
                </div>
                <h4 className="font-moul text-xs text-amber-950">
                  មិនទាន់មានសារនៅក្នុង "{currentChannel.name}" នៅឡើយទេ!
                </h4>
                <p className="text-xs text-slate-500">
                  សូមធ្វើជាសិស្សដំបូងគេដែលផ្ញើសារសួរសំណួរ ឬចែករំលែកចំណេះដឹង!
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isMe = currentAccount && msg.senderId === currentAccount.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[92%] sm:max-w-[82%] ${
                      isMe ? 'ml-auto flex-row-reverse' : ''
                    }`}
                  >
                    {/* Student Avatar */}
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-100 to-yellow-200 border border-amber-300 text-2xl flex items-center justify-center shrink-0 shadow-xs ring-2 ring-white">
                      {msg.senderAvatar}
                    </div>

                    {/* Message Bubble Column */}
                    <div className="space-y-1 min-w-0">
                      {/* Sender Info Bar */}
                      <div
                        className={`flex items-center gap-2 text-[11px] ${
                          isMe ? 'justify-end text-amber-950 font-bold' : 'text-slate-600'
                        }`}
                      >
                        <span className="font-bold text-slate-800">{msg.senderName}</span>
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded-md text-[10px] font-bold">
                          {msg.senderGrade}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Main Text Bubble */}
                      <div
                        className={`p-3.5 sm:p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm transition-all ${
                          isMe
                            ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-tr-xs border border-amber-600'
                            : msg.isAiPeer
                            ? 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 text-amber-950 border border-amber-300 rounded-tl-xs font-medium shadow-md'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                        }`}
                      >
                        {msg.isAiPeer && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-800 mb-1.5 border-b border-amber-300/60 pb-1">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>ចម្លើយជំនួយការសិស្សថ្នាក់ទី៦</span>
                          </div>
                        )}
                        <p className="whitespace-pre-wrap break-words font-medium">{msg.content}</p>
                      </div>

                      {/* Reactions & Reaction Picker Trigger */}
                      <div
                        className={`flex items-center gap-1.5 flex-wrap pt-1 ${
                          isMe ? 'justify-end' : ''
                        }`}
                      >
                        {/* Render Reactions */}
                        {msg.reactions &&
                          Object.entries(msg.reactions).map(([emoji, count]) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleReaction(msg.id, emoji)}
                              className="inline-flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-950 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300 shadow-2xs transition-transform active:scale-90 cursor-pointer"
                            >
                              <span>{emoji}</span>
                              <span>{count}</span>
                            </button>
                          ))}

                        {/* Quick Reaction Buttons */}
                        <div className="inline-flex items-center gap-0.5 bg-white p-1 rounded-full border border-slate-200 shadow-2xs opacity-80 hover:opacity-100 transition-opacity">
                          {['👍', '❤️', '💡', '👏'].map((e) => (
                            <button
                              key={e}
                              type="button"
                              onClick={() => handleReaction(msg.id, e)}
                              className="p-1 hover:scale-130 transition-transform text-xs cursor-pointer rounded-full hover:bg-amber-50"
                              title={`ប្រតិកម្ម ${e}`}
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-amber-800 bg-amber-100/80 p-2.5 px-4 rounded-full border border-amber-300 max-w-xs animate-pulse shadow-2xs">
                <span className="text-base">🤖</span>
                <span className="font-bold">ជំនួយការសិស្សកំពុងរៀបចំចម្លើយ...</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Floating Scroll to Bottom Button */}
          {showScrollBottom && (
            <button
              type="button"
              onClick={scrollToBottom}
              className="absolute bottom-20 right-6 z-10 px-3.5 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xl border border-amber-400 flex items-center gap-1.5 cursor-pointer animate-bounce"
            >
              <ChevronDown className="w-4 h-4" />
              <span>សារថ្មីចុងក្រោយ</span>
            </button>
          )}

          {/* Input Form Footer Bar */}
          <div className="p-3.5 bg-white border-t border-slate-200/90 relative shadow-md">
            {/* Emoji Picker Popover */}
            {showEmojiPicker && (
              <div className="absolute bottom-18 left-4 bg-white p-3 rounded-2xl shadow-2xl border border-amber-300 z-20 grid grid-cols-6 gap-2 animate-fade-in max-w-xs">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setInputText((prev) => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="p-2 text-2xl hover:bg-amber-100 rounded-xl transition-transform hover:scale-125 cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {!currentAccount ? (
              <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100/80 rounded-2xl border border-amber-300 text-center flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  <span className="text-xs font-bold text-amber-950">
                    សូមចូលប្រើប្រាស់ Account សិស្សដើម្បីផ្ញើសារសួរសំណួរ!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenAccountModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold font-moul text-xs shadow-md cursor-pointer transition-all active:scale-95"
                >
                  ចូល Account ឥឡូវនេះ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-3 rounded-2xl bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer border border-amber-300/80"
                  title="បន្ថែម Emoji"
                >
                  <Smile className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`ផ្ញើសារសួរសំណួរក្នុង "${currentChannel.name}"...`}
                  className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 outline-none text-xs sm:text-sm bg-slate-50 font-medium text-slate-800 placeholder-slate-400"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-4 py-3 sm:px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 disabled:opacity-50 text-amber-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  id="btn-send-student-chat-msg"
                >
                  <Send className="w-4 h-4 text-amber-950" />
                  <span className="hidden sm:inline font-moul text-xs text-amber-950">
                    ផ្ញើសារ
                  </span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
