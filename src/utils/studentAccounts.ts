import { StudentAccount, UserProgress, UserProfile } from '../types';

const STORAGE_ACCOUNTS_KEY = 'grade6_student_accounts';
const STORAGE_CURRENT_ID_KEY = 'grade6_current_student_id';

// Helper to get all saved student accounts
export function getAllStudentAccounts(): StudentAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading student accounts:', e);
    return [];
  }
}

// Helper to save all student accounts
export function saveAllStudentAccounts(accounts: StudentAccount[]): void {
  try {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Error saving student accounts:', e);
  }
}

// Get ID of currently logged-in student
export function getCurrentStudentId(): string | null {
  try {
    return localStorage.getItem(STORAGE_CURRENT_ID_KEY);
  } catch {
    return null;
  }
}

// Set active student ID
export function setCurrentStudentId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(STORAGE_CURRENT_ID_KEY, id);
    } else {
      localStorage.removeItem(STORAGE_CURRENT_ID_KEY);
    }
  } catch (e) {
    console.error('Error setting current student ID:', e);
  }
}

// Get currently active student account object
export function getCurrentStudentAccount(): StudentAccount | null {
  const currentId = getCurrentStudentId();
  if (!currentId) return null;
  const accounts = getAllStudentAccounts();
  const found = accounts.find((a) => a.id === currentId);
  return found || null;
}

// Create a new student account
export function createStudentAccount(data: {
  name: string;
  pin: string; // 6 digits
  grade?: string;
  school?: string;
  avatar?: string;
  bookmarks?: string[];
  progress?: UserProgress;
}): { success: boolean; account?: StudentAccount; error?: string } {
  const trimmedName = data.name.trim();
  const cleanPin = data.pin.trim();

  if (!trimmedName) {
    return { success: false, error: 'សូមបញ្ចូលឈ្មោះសិស្ស!' };
  }

  if (!/^\d{6}$/.test(cleanPin)) {
    return { success: false, error: 'កូដសម្ងាត់ត្រូវតែជាលេខ ៦ ខ្ទង់!' };
  }

  const accounts = getAllStudentAccounts();

  // Check if account with same name and PIN already exists
  const existing = accounts.find(
    (a) => a.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (existing) {
    if (existing.pin === cleanPin) {
      // Account exists with matching PIN - log in to existing account!
      existing.lastLoginAt = new Date().toISOString();
      saveAllStudentAccounts(accounts);
      setCurrentStudentId(existing.id);
      return { success: true, account: existing };
    } else {
      return {
        success: false,
        error: `ឈ្មោះ "${trimmedName}" មានរួចហើយ! ប្រសិនបើនេះជា account របស់អ្នក សូមបញ្ចូលកូដ ៦ ខ្ទង់ឲ្យបានត្រឹមត្រូវ ឬជ្រើសរើសឈ្មោះផ្សេង!`
      };
    }
  }

  const newAccount: StudentAccount = {
    id: `student_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: trimmedName,
    pin: cleanPin,
    grade: data.grade || 'ថ្នាក់ទី៦',
    school: data.school?.trim() || undefined,
    avatar: data.avatar || '🎓',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    bookmarks: data.bookmarks || [],
    progress: data.progress || { completedExams: [], bookmarkedQuestionIds: [], notes: {} }
  };

  accounts.push(newAccount);
  saveAllStudentAccounts(accounts);
  setCurrentStudentId(newAccount.id);

  return { success: true, account: newAccount };
}

// Login with Student Name and 6-digit PIN
export function loginStudentAccount(
  name: string,
  pin: string
): { success: boolean; account?: StudentAccount; error?: string } {
  const trimmedName = name.trim();
  const cleanPin = pin.trim();

  if (!trimmedName) {
    return { success: false, error: 'សូមបញ្ចូលឈ្មោះសិស្ស!' };
  }

  if (!cleanPin) {
    return { success: false, error: 'សូមបញ្ចូលកូដ ៦ ខ្ទង់!' };
  }

  const accounts = getAllStudentAccounts();
  const foundByName = accounts.find(
    (a) => a.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (!foundByName) {
    return {
      success: false,
      error: `រកមិនឃើញ account ឈ្មោះ "${trimmedName}" ទេ! សូមពិនិត្យឈ្មោះឡើងវិញ ឬចុះឈ្មោះបង្កើត account ថ្មី!`
    };
  }

  if (foundByName.pin !== cleanPin) {
    return {
      success: false,
      error: 'កូដសម្ងាត់ ៦ ខ្ទង់ មិនត្រឹមត្រូវទេ! សូមព្យាយាមម្តងទៀត!'
    };
  }

  // Success
  foundByName.lastLoginAt = new Date().toISOString();
  saveAllStudentAccounts(accounts);
  setCurrentStudentId(foundByName.id);

  return { success: true, account: foundByName };
}

// Login directly by Account Object (e.g. from quick device selector + PIN)
export function loginByIdAndPin(
  id: string,
  pin: string
): { success: boolean; account?: StudentAccount; error?: string } {
  const accounts = getAllStudentAccounts();
  const found = accounts.find((a) => a.id === id);

  if (!found) {
    return { success: false, error: 'រកមិនឃើញ account នេះទេ!' };
  }

  if (found.pin !== pin.trim()) {
    return { success: false, error: 'កូដសម្ងាត់ ៦ ខ្ទង់ មិនត្រឹមត្រូវទេ!' };
  }

  found.lastLoginAt = new Date().toISOString();
  saveAllStudentAccounts(accounts);
  setCurrentStudentId(found.id);

  return { success: true, account: found };
}

// Update current student details
export function updateStudentAccount(
  id: string,
  updates: Partial<Omit<StudentAccount, 'id' | 'createdAt'>>
): StudentAccount | null {
  const accounts = getAllStudentAccounts();
  const index = accounts.findIndex((a) => a.id === id);

  if (index === -1) return null;

  accounts[index] = {
    ...accounts[index],
    ...updates
  };

  saveAllStudentAccounts(accounts);
  return accounts[index];
}

// Save progress & bookmarks for an active student
export function syncStudentState(
  id: string,
  bookmarks: string[],
  progress: UserProgress
): void {
  const accounts = getAllStudentAccounts();
  const index = accounts.findIndex((a) => a.id === id);
  if (index !== -1) {
    accounts[index].bookmarks = bookmarks;
    accounts[index].progress = progress;
    saveAllStudentAccounts(accounts);
  }
}

// Logout current student
export function logoutCurrentStudent(): void {
  setCurrentStudentId(null);
}

// Migration helper: If user had an unassigned profile/bookmarks/progress, convert to StudentAccount
export function migrateLegacyDataIfNeeded(): StudentAccount | null {
  try {
    const existingAccounts = getAllStudentAccounts();
    const currentId = getCurrentStudentId();

    if (currentId && existingAccounts.some((a) => a.id === currentId)) {
      return getCurrentStudentAccount();
    }

    // Check if there is legacy profile
    const legacyProfileRaw = localStorage.getItem('grade6_user_profile');
    const legacyBookmarksRaw = localStorage.getItem('grade6_bookmarks');
    const legacyProgressRaw = localStorage.getItem('grade6_progress');

    let legacyProfile: UserProfile | null = null;
    let legacyBookmarks: string[] = [];
    let legacyProgress: UserProgress = { completedExams: [], bookmarkedQuestionIds: [], notes: {} };

    if (legacyProfileRaw) {
      try { legacyProfile = JSON.parse(legacyProfileRaw); } catch {}
    }
    if (legacyBookmarksRaw) {
      try { legacyBookmarks = JSON.parse(legacyBookmarksRaw); } catch {}
    }
    if (legacyProgressRaw) {
      try { legacyProgress = JSON.parse(legacyProgressRaw); } catch {}
    }

    if (legacyProfile) {
      // Create a student account from legacy data with default PIN 123456
      const result = createStudentAccount({
        name: legacyProfile.name || 'សិស្សថ្នាក់ទី៦',
        pin: legacyProfile.pin || '123456',
        grade: legacyProfile.grade || 'ថ្នាក់ទី៦',
        school: legacyProfile.school,
        avatar: legacyProfile.avatar || '🎓',
        bookmarks: legacyBookmarks,
        progress: legacyProgress
      });

      if (result.success && result.account) {
        return result.account;
      }
    }

    // If there are existing accounts, default to the most recently used one
    if (existingAccounts.length > 0) {
      const sorted = [...existingAccounts].sort(
        (a, b) => new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime()
      );
      setCurrentStudentId(sorted[0].id);
      return sorted[0];
    }

    return null;
  } catch (e) {
    console.error('Error during account migration:', e);
    return null;
  }
}
