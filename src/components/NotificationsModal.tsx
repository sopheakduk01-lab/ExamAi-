import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  CheckCheck,
  Filter,
  Sparkles,
  BookOpen,
  Award,
  MessageSquare,
  Palette,
  Clock,
  ChevronRight,
  Trash2,
  BellOff
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'exam' | 'lesson' | 'achievement' | 'tip';
  icon: string;
  isRead: boolean;
  actionLabel?: string;
  actionKey?: 'open_progress' | 'open_bookmarks' | 'open_chat' | 'open_drawing' | 'open_library' | 'open_missions';
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProgress?: () => void;
  onOpenBookmarks?: () => void;
  onOpenStudentChat?: () => void;
  onOpenDrawing?: () => void;
  onOpenModernLibrary?: () => void;
  onOpenMissions?: () => void;
  onUnreadCountChange?: (count: number) => void;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '📢 ព័ត៌មានបច្ចុប្បន្នភាពសំណួរប្រឡង',
    message: 'ប្រព័ន្ធបានធ្វើបច្ចុប្បន្នភាពសំណួរគំរូប្រឡងឌីជីថល ថ្នាក់ទី៦ សម្រាប់មុខវិជ្ជា គណិតវិទ្យា និងភាសាខ្មែរ រួចរាល់ហើយ!',
    time: '១០ នាទីមុន',
    category: 'exam',
    icon: '📝',
    isRead: false,
    actionLabel: 'មើលមេរៀនប្រឡង',
    actionKey: 'open_library'
  },
  {
    id: 'notif-2',
    title: '🏆 សមិទ្ធផលពិសេស៖ សិស្សពូកែ',
    message: 'សូមអបអរសាទរ! អ្នកបានចូលសិក្សា និងធ្វើលំហាត់ជាប់ៗគ្នា ៣ ថ្ងៃ និងទទួលបានផ្លាកសញ្ញាសិស្សពូកែ!',
    time: '១ ម៉ោងមុន',
    category: 'achievement',
    icon: '🏅',
    isRead: false,
    actionLabel: 'ពិនិត្យមើលលទ្ធផល',
    actionKey: 'open_progress'
  },
  {
    id: 'notif-3',
    title: '💡 គន្លឹះដោះស្រាយលំហាត់គណិតវិទ្យា',
    message: 'របៀបបូក និងដកប្រភាគដែលមានភាគបែងខុសគ្នា៖ ត្រូវរកភាគបែងរួមតូចបំផុត (ព.ព.គុ.ត) ជាមុនសិន រួចទើបបូកភាគយក!',
    time: '៣ ម៉ោងមុន',
    category: 'tip',
    icon: '📐',
    isRead: false
  },
  {
    id: 'notif-4',
    title: '💬 បន្ទប់ Chat ពិភាក្សាសិស្សថ្នាក់ទី៦',
    message: 'មានមិត្តភក្តិ និងគ្រូសិប្បនិម្មិតកំពុងរង់ចាំពិភាក្សា និងឆ្លើយសំណួរលំហាត់របស់អ្នកក្នុងបន្ទប់ Chat!',
    time: 'ម្សិលមិញ',
    category: 'lesson',
    icon: '💬',
    isRead: true,
    actionLabel: 'ចូលទៅកាន់ Chat',
    actionKey: 'open_chat'
  },
  {
    id: 'notif-5',
    title: '🎨 ក្តារខៀនគំនូសសេរី (Art & Scratchpad)',
    message: 'ប្រើប្រាស់ក្តារខៀនគំនូសសេរី ដើម្បីគូសវាស គណនាលំហាត់ ឬសរសេរចំណាំមេរៀនបានយ៉ាងងាយស្រួល!',
    time: '២ ថ្ងៃមុន',
    category: 'tip',
    icon: '🎨',
    isRead: true,
    actionLabel: 'បើកក្តារខៀន',
    actionKey: 'open_drawing'
  }
];

// Sound generator helper using Web Audio API
const playSound = (type: 'click' | 'read_all' | 'pop') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'click' || type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'read_all') {
      const notes = [440, 554.37, 659.25];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.08, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.001, now + i * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.18);
      });
    }
  } catch (e) {
    // ignore
  }
};

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onOpenProgress,
  onOpenBookmarks,
  onOpenStudentChat,
  onOpenDrawing,
  onOpenModernLibrary,
  onOpenMissions,
  onUnreadCountChange
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('grade6_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEFAULT_NOTIFICATIONS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'exam' | 'tip'>('all');

  // Save to localStorage & notify parent unread count
  useEffect(() => {
    try {
      localStorage.setItem('grade6_notifications', JSON.stringify(notifications));
    } catch (e) {
      // ignore
    }
    const unread = notifications.filter((n) => !n.isRead).length;
    if (onUnreadCountChange) {
      onUnreadCountChange(unread);
    }
  }, [notifications, onUnreadCountChange]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    playSound('pop');
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const handleMarkAllAsRead = () => {
    playSound('read_all');
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handleClearAll = () => {
    playSound('click');
    setNotifications([]);
  };

  const handleNotificationAction = (item: NotificationItem) => {
    handleMarkAsRead(item.id);
    onClose();

    if (item.actionKey === 'open_progress' && onOpenProgress) onOpenProgress();
    else if (item.actionKey === 'open_bookmarks' && onOpenBookmarks) onOpenBookmarks();
    else if (item.actionKey === 'open_chat' && onOpenStudentChat) onOpenStudentChat();
    else if (item.actionKey === 'open_drawing' && onOpenDrawing) onOpenDrawing();
    else if (item.actionKey === 'open_library' && onOpenModernLibrary) onOpenModernLibrary();
    else if (item.actionKey === 'open_missions' && onOpenMissions) onOpenMissions();
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'unread') return !item.isRead;
    if (activeFilter === 'exam') return item.category === 'exam';
    if (activeFilter === 'tip') return item.category === 'tip' || item.category === 'achievement';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-xl bg-[#FAF8F2] text-slate-800 rounded-3xl shadow-2xl border border-amber-300/80 overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-amber-900 via-[#3D1E0B] to-amber-950 text-amber-50 p-4 sm:p-5 flex items-center justify-between border-b border-amber-600/40 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-yellow-300 flex items-center justify-center border border-amber-400/40 shadow-inner">
                <Bell className="w-6 h-6 text-yellow-300 animate-wiggle" />
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-950 shadow-md animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-moul text-sm sm:text-base text-yellow-100 tracking-wide">
                  ការជូនដំណឹង (Notifications)
                </h2>
                {unreadCount > 0 && (
                  <span className="bg-rose-500/30 text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-400/40">
                    {unreadCount} មិនទាន់អាន
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/80 font-medium">
                ព័ត៌មានប្រឡង គន្លឹះសិក្សា និងសមិទ្ធផលថ្មីៗ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 rounded-2xl bg-amber-950/50 hover:bg-amber-900/80 text-amber-200 hover:text-white transition-colors cursor-pointer border border-amber-500/30"
            id="btn-close-notif-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FILTER BAR & QUICK ACTIONS */}
        <div className="bg-white p-3 px-4 border-b border-amber-200/80 flex items-center justify-between gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'ទាំងអស់' },
              { id: 'unread', label: `មិនទាន់អាន (${unreadCount})` },
              { id: 'exam', label: 'ព័ត៌មានប្រឡង' },
              { id: 'tip', label: 'គន្លឹះសិក្សា' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setActiveFilter(tab.id as typeof activeFilter);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-amber-500 text-amber-950 shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="text-[11px] font-bold text-amber-800 hover:text-amber-950 hover:underline flex items-center gap-1 cursor-pointer"
                title="សម្គាល់ថាបានអានទាំងអស់"
              >
                <CheckCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>អានទាំងអស់</span>
              </button>
            )}

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
                title="លុបទាំងអស់"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMarkAsRead(item.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative group ${
                  item.isRead
                    ? 'bg-white/80 border-slate-200/80 hover:bg-amber-50/50'
                    : 'bg-amber-50/90 border-amber-300 shadow-sm hover:shadow-md hover:bg-amber-100/60'
                }`}
              >
                {/* Unread Glowing Dot */}
                {!item.isRead && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-200 animate-pulse" />
                )}

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 text-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>

                  <div className="flex-1 pr-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3
                        className={`text-xs sm:text-sm font-bold ${
                          item.isRead ? 'text-slate-800' : 'text-amber-950 font-moul'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium mb-2.5">
                      {item.message}
                    </p>

                    {item.actionLabel && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationAction(item);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-2xs transition-all cursor-pointer active:scale-95"
                      >
                        <span>{item.actionLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl shadow-inner">
                <BellOff className="w-7 h-7 text-amber-600" />
              </div>
              <p className="font-moul text-sm text-amber-950">គ្មានការជូនដំណឹងទេ!</p>
              <p className="text-xs text-slate-500 font-medium">
                អ្នកបានអានការជូនដំណឹងទាំងអស់រួចរាល់ហើយ
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-amber-50 border-t border-amber-200/80 text-center text-[11px] text-slate-500 font-medium shrink-0">
          💡 ការជូនដំណឹងផ្ញើផ្ទាល់ពីប្រព័ន្ធត្រៀមប្រឡងថ្នាក់ទី៦
        </div>
      </div>
    </div>
  );
};
