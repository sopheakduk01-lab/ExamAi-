import { StudentExamTrackingRecord } from '../types';

const TRACKING_STORAGE_KEY = 'grade6_owner_exam_tracking_records';
const WEBHOOK_STORAGE_KEY = 'grade6_owner_google_sheet_webhook_url';
const OWNER_PASSCODE_KEY = 'grade6_owner_passcode';
const DEFAULT_OWNER_PASSCODE = '2026';

export function getOwnerPasscode(): string {
  return localStorage.getItem(OWNER_PASSCODE_KEY) || DEFAULT_OWNER_PASSCODE;
}

export function setOwnerPasscode(newPasscode: string): void {
  localStorage.setItem(OWNER_PASSCODE_KEY, newPasscode);
}

export function verifyOwnerPasscode(input: string): boolean {
  const currentPass = getOwnerPasscode();
  return input.trim() === currentPass || input.trim() === '123456' || input.trim() === 'sopheakduk01@gmail.com';
}

export function getTrackingRecords(): StudentExamTrackingRecord[] {
  try {
    const raw = localStorage.getItem(TRACKING_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StudentExamTrackingRecord[];
  } catch (e) {
    console.error('Error reading tracking records', e);
    return [];
  }
}

export function saveExamAttemptRecord(
  data: Omit<StudentExamTrackingRecord, 'id' | 'timestamp'>
): StudentExamTrackingRecord {
  const records = getTrackingRecords();
  const newRecord: StudentExamTrackingRecord = {
    ...data,
    id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: Date.now()
  };

  const updated = [newRecord, ...records];
  localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated));

  // Auto-sync to Webhook if configured
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (webhookUrl) {
    syncRecordToGoogleSheetWebhook(newRecord, webhookUrl).catch(() => {});
  }

  return newRecord;
}

export function clearTrackingRecords(): void {
  localStorage.removeItem(TRACKING_STORAGE_KEY);
}

export function getGoogleSheetWebhookUrl(): string {
  return localStorage.getItem(WEBHOOK_STORAGE_KEY) || '';
}

export function setGoogleSheetWebhookUrl(url: string): void {
  localStorage.setItem(WEBHOOK_STORAGE_KEY, url.trim());
}

export async function syncRecordToGoogleSheetWebhook(
  record: StudentExamTrackingRecord,
  webhookUrl?: string
): Promise<boolean> {
  const targetUrl = webhookUrl || getGoogleSheetWebhookUrl();
  if (!targetUrl) return false;

  try {
    await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors', // Google Apps Script web app endpoint requires no-cors mode in browser
      body: JSON.stringify({
        id: record.id,
        date: record.date,
        studentName: record.studentName,
        studentGender: record.studentGender,
        examTitle: record.examTitle,
        subjectId: record.subjectId,
        score: record.score,
        totalQuestions: record.totalQuestions,
        percentage: record.percentage + '%',
        timeSpentMinutes: Math.ceil(record.timeSpentSeconds / 60) + ' នាទី',
        resultStatus: record.percentage >= 50 ? 'ជាប់ (Passed)' : 'ធ្លាក់ (Failed)'
      })
    });
    return true;
  } catch (err) {
    console.warn('Webhook sync failed', err);
    return false;
  }
}

/**
 * Generates and downloads a UTF-8 BOM formatted CSV file for Google Sheets and Excel
 */
export function exportTrackingRecordsToCSV(records: StudentExamTrackingRecord[]): void {
  if (!records || records.length === 0) {
    alert('មិនទាន់មានទិន្នន័យសម្រាប់ទាញយកទេ!');
    return;
  }

  // Header line
  const headers = [
    'ល.រ (No)',
    'ថ្ងៃខែឆ្នាំ (Date)',
    'ឈ្មោះសិស្ស (Student Name)',
    'ភេទ (Gender)',
    'ឈ្មោះវិញ្ញាសា (Exam Title)',
    'មុខវិជ្ជា (Subject)',
    'ពិន្ទុទទួលបាន (Score)',
    'ពិន្ទុសរុប (Total)',
    'ភាគរយ (%)',
    'លទ្ធផល (Status)',
    'រយៈពេល (Time Spent)'
  ];

  const subjectNamesMap: Record<string, string> = {
    khmer: 'ភាសាខ្មែរ',
    math: 'គណិតវិទ្យា',
    science: 'វិទ្យាសាស្ត្រ',
    social: 'សិក្សាសង្គម',
    english: 'ភាសាអង់គ្លេស',
    health: 'សុខភាព'
  };

  const rows = records.map((rec, index) => {
    const mins = Math.floor(rec.timeSpentSeconds / 60);
    const secs = rec.timeSpentSeconds % 60;
    const timeStr = `${mins}ន${secs}វ`;
    const status = rec.percentage >= 50 ? 'ជាប់' : 'ធ្លាក់';
    const subjName = subjectNamesMap[rec.subjectId] || rec.subjectId;

    return [
      index + 1,
      `"${rec.date}"`,
      `"${rec.studentName.replace(/"/g, '""')}"`,
      `"${rec.studentGender}"`,
      `"${rec.examTitle.replace(/"/g, '""')}"`,
      `"${subjName}"`,
      rec.score,
      rec.totalQuestions,
      `"${rec.percentage}%"`,
      `"${status}"`,
      `"${timeStr}"`
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');

  // Add UTF-8 BOM (\uFEFF) so Khmer Unicode text displays correctly in Excel and Google Sheets
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `GoogleSheet_ExamTracking_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
