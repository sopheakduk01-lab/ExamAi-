import { StudentAccount } from '../types';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderGrade: string;
  senderSchool?: string;
  channelId: string; // 'general' | 'math' | 'khmer' | 'science' | 'exam'
  content: string;
  timestamp: string;
  reactions?: Record<string, number>; // e.g. { '👍': 3, '💡': 2 }
  isAiPeer?: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const CHAT_CHANNELS: ChatChannel[] = [
  {
    id: 'general',
    name: 'បន្ទប់ពិភាក្សាទូទៅ',
    description: 'ចែករំលែកបទពិសោធន៍រៀន និងនិយាយលេងកម្សាន្ត',
    icon: '💬'
  },
  {
    id: 'math',
    name: 'លំហាត់គណិតវិទ្យា',
    description: 'សួរ និងជួយដោះស្រាយលំហាត់គណិតទី៦',
    icon: '📐'
  },
  {
    id: 'khmer',
    name: 'ភាសាខ្មែរ & សរសេរតែងសេចក្តី',
    description: 'ពិភាក្សាអក្ខរាវិរុទ្ធ វេយ្យាករណ៍ និងតែងសេចក្តី',
    icon: '🇰🇭'
  },
  {
    id: 'science',
    name: 'វិទ្យាសាស្ត្រ & សង្គមវិទ្យា',
    description: 'សំណួរអំពីពិសោធន៍ រុក្ខជាតិ ប្រវត្តិវិទ្យា និងភូមិវិទ្យា',
    icon: '🔬'
  },
  {
    id: 'exam',
    name: 'ក្រុមត្រៀមប្រឡងអាហារូបករណ៍',
    description: 'រំលឹកវិញ្ញាសាចាស់ៗ និងតិចនិកធ្វើប្រឡង',
    icon: '🏆'
  }
];

const STORAGE_CHAT_KEY = 'grade6_student_chat_messages_v1';

// Initial pre-populated messages from active Grade 6 students
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_init_1',
    senderId: 'peer_1',
    senderName: 'សុខា (បឋមសិក្សាវត្ដភ្នំ)',
    senderAvatar: '👦',
    senderGrade: 'ថ្នាក់ទី៦',
    channelId: 'general',
    content: 'ជម្រាបសួរមិត្តៗថ្នាក់ទី៦ទាំងអស់គ្នា! តើអ្នកទាំងអស់គ្នារៀបចំខ្លួនប្រឡងដល់ណាហើយ?',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    reactions: { '👋': 5, '❤️': 3 }
  },
  {
    id: 'msg_init_2',
    senderId: 'peer_2',
    senderName: 'រតនា',
    senderAvatar: '👧',
    senderGrade: 'ថ្នាក់ទី៦',
    channelId: 'general',
    content: 'ខ្ញុំកំពុងរំលឹកវិញ្ញាសាគណិតវិទ្យាឆ្នាំ២០២៣! មានលំហាត់ប្រភាគខ្លះពិបាកដែរ!',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    reactions: { '💡': 4 }
  },
  {
    id: 'msg_init_3',
    senderId: 'peer_3',
    senderName: 'មករា (សាលានរោត្តម)',
    senderAvatar: '🌟',
    senderGrade: 'ថ្នាក់ទី៦',
    channelId: 'math',
    content: 'អ្នកណាចេះគណនាផ្ទៃក្រឡារង្វង់ R = 7cm ខ្លះ? សូមជួយប្រាប់រូបមន្តផង!',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    reactions: { '📐': 2 }
  },
  {
    id: 'msg_init_4',
    senderId: 'peer_4',
    senderName: 'ចាន់ថន (សិស្សពូកែគណិត)',
    senderAvatar: '🎓',
    senderGrade: 'ថ្នាក់ទី៦',
    channelId: 'math',
    content: 'រូបមន្តផ្ទៃក្រឡារង្វង់ S = π × R² បាទ! ប្រសិនបើ R = 7cm, S = 3.14 × 7 × 7 = 153.86 cm²',
    timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    reactions: { '👏': 8, '👍': 6 }
  },
  {
    id: 'msg_init_5',
    senderId: 'peer_5',
    senderName: 'សុភ័ក្ត្រ',
    senderAvatar: '📚',
    senderGrade: 'ថ្នាក់ទី៦',
    channelId: 'khmer',
    content: 'តើប្រយោគសមាសជាអ្វី? អ្នកណាចាំអត្ថន័យច្បាស់ខ្លះ?',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    reactions: { '💡': 2 }
  },
  {
    id: 'msg_init_6',
    senderId: 'peer_6',
    senderName: 'សុជាតា',
    senderAvatar: '👑',
    senderGrade: 'ថ្នាក់ទី៦',
    channelId: 'khmer',
    content: 'ប្រយោគសមាស ជាប្រយោគដែលកើតឡើងដោយការផ្សំប្រយោគទោលចាប់ពីពីរឡើងទៅ ដោយប្រើឈ្នាប់តភ្ជាប់!',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    reactions: { '👏': 5, '❤️': 4 }
  },
  {
    id: 'msg_init_7',
    senderId: 'peer_7',
    senderName: 'វីរៈ',
    senderAvatar: '🚀',
    senderGrade: 'ថ្នាក់ទី៦',
    channelId: 'exam',
    content: 'តស៊ូឡើងទាំងអស់គ្នា! ប្រឡងជិតមកដល់ហើយ សង្ឃឹមថាពួកយើងទទួលបានលទ្ធផលល្អ!',
    timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    reactions: { '🏆': 10, '🔥': 7 }
  }
];

export function getChatMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_CHAT_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(INITIAL_MESSAGES));
      return INITIAL_MESSAGES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_MESSAGES;
  } catch (e) {
    console.error('Error reading chat messages:', e);
    return INITIAL_MESSAGES;
  }
}

export function saveChatMessages(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages));
    // Trigger window custom event for local sync across components
    window.dispatchEvent(new CustomEvent('grade6_chat_updated'));
  } catch (e) {
    console.error('Error saving chat messages:', e);
  }
}

export function sendStudentChatMessage(
  student: StudentAccount,
  channelId: string,
  content: string
): ChatMessage {
  const allMessages = getChatMessages();
  const newMessage: ChatMessage = {
    id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    senderId: student.id,
    senderName: student.school ? `${student.name} (${student.school})` : student.name,
    senderAvatar: student.avatar || '🎓',
    senderGrade: student.grade || 'ថ្នាក់ទី៦',
    channelId,
    content: content.trim(),
    timestamp: new Date().toISOString(),
    reactions: {}
  };

  const updated = [...allMessages, newMessage];
  saveChatMessages(updated);
  return newMessage;
}

export function toggleMessageReaction(messageId: string, emoji: string): void {
  const allMessages = getChatMessages();
  const index = allMessages.findIndex((m) => m.id === messageId);
  if (index !== -1) {
    const msg = allMessages[index];
    const reactions = { ...(msg.reactions || {}) };
    reactions[emoji] = (reactions[emoji] || 0) + 1;
    allMessages[index] = { ...msg, reactions };
    saveChatMessages(allMessages);
  }
}
