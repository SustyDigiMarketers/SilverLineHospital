
import { supabase } from './supabaseClient';

export interface HistoryEntry {
  id: number | string;
  timestamp: string;
  page: string;
  section: string;
  type: string;
}

export const fetchHistory = async (): Promise<HistoryEntry[]> => {
    try {
        const { data, error } = await supabase
            .from('content_history')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(50);
            
        if (error) throw error;
        return data || [];
    } catch (e) {
        console.error("Error fetching history", e);
        return [];
    }
};

export const addHistory = async (entry: Omit<HistoryEntry, 'id' | 'timestamp'>): Promise<void> => {
  try {
      await supabase.from('content_history').insert([{
          timestamp: new Date().toISOString(),
          ...entry
      }]);
  } catch (e) {
      console.error("Error adding history", e);
  }
};

export const clearHistory = async (): Promise<void> => {
   try {
       // Deletes all rows
       await supabase.from('content_history').delete().neq('id', 0); 
   } catch (e) {
       console.error("Error clearing history", e);
   }
};

// Deprecated sync
export const getHistory = (): HistoryEntry[] => [];
