
export interface HistoryEntry {
  id: number | string;
  timestamp: string;
  page: string;
  section: string;
  type: string;
}

const STORAGE_KEY = 'silverline_content_history';

const getStoredHistory = (): HistoryEntry[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const fetchHistory = async (): Promise<HistoryEntry[]> => {
    return getStoredHistory().slice(0, 50);
};

export const addHistory = async (entry: Omit<HistoryEntry, 'id' | 'timestamp'>): Promise<void> => {
    const history = getStoredHistory();
    history.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...entry
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const clearHistory = async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY);
};

// Sync wrapper
export const getHistory = (): HistoryEntry[] => getStoredHistory();
