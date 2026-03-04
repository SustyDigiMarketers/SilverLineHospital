
export interface LogEntry {
  id: number | string;
  timestamp: string;
  username: string;
  action: string;
}

export interface FormSubmission {
  timestamp: string;
  [key: string]: any;
}

const LOGS_KEY = 'silverline_audit_logs';
const SUBMISSIONS_KEY = 'silverline_form_submissions';

const getStoredLogs = (): LogEntry[] => {
    const stored = localStorage.getItem(LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
};

const getStoredSubmissions = (): any[] => {
    const stored = localStorage.getItem(SUBMISSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
};

// --- Audit Logs ---

export const fetchLogs = async (): Promise<LogEntry[]> => {
    return getStoredLogs().slice(0, 100);
};

export const addLog = async (username: string, action: string): Promise<void> => {
    const logs = getStoredLogs();
    logs.unshift({
        id: Date.now(),
        username,
        action,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};

// --- Form Submissions ---

export const fetchSubmissions = async (type: 'marketing' | 'international'): Promise<FormSubmission[]> => {
    const submissions = getStoredSubmissions();
    return submissions
        .filter(s => s.form_type === type)
        .map(s => ({
            timestamp: s.created_at,
            ...s.data
        }));
};

export const addMarketingSubmission = async (data: Record<string, any>) => {
    await saveSubmission('marketing', data);
};

export const addInternationalSubmission = async (data: Record<string, any>) => {
    await saveSubmission('international', data);
};

const saveSubmission = async (type: string, data: Record<string, any>) => {
    const submissions = getStoredSubmissions();
    submissions.unshift({
        form_type: type,
        data: data,
        created_at: new Date().toISOString()
    });
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
};

export const clearMarketingSubmissions = async () => {
    await clearSubmissionsByType('marketing');
};

export const clearInternationalSubmissions = async () => {
    await clearSubmissionsByType('international');
};

const clearSubmissionsByType = async (type: string) => {
    const submissions = getStoredSubmissions();
    const filtered = submissions.filter(s => s.form_type !== type);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
}

// Sync wrappers
export const getLogs = (): LogEntry[] => getStoredLogs(); 
export const getMarketingSubmissions = (): FormSubmission[] => getStoredSubmissions().filter(s => s.form_type === 'marketing');
export const getInternationalSubmissions = (): FormSubmission[] => getStoredSubmissions().filter(s => s.form_type === 'international');
