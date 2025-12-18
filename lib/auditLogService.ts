
import { supabase } from './supabaseClient';

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

// --- Audit Logs ---

export const fetchLogs = async (): Promise<LogEntry[]> => {
    try {
        const { data, error } = await supabase
            .from('audit_logs')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(100);
            
        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error("Error fetching logs:", err);
        return [];
    }
};

export const addLog = async (username: string, action: string): Promise<void> => {
    try {
        await supabase.from('audit_logs').insert([{
            username,
            action,
            timestamp: new Date().toISOString()
        }]);
    } catch (err) {
        console.error("Error adding log:", err);
    }
};

// --- Form Submissions ---

export const fetchSubmissions = async (type: 'marketing' | 'international'): Promise<FormSubmission[]> => {
    try {
        const { data, error } = await supabase
            .from('form_submissions')
            .select('data, created_at')
            .eq('form_type', type)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map Supabase structure back to app structure
        return (data || []).map((row: any) => ({
            timestamp: row.created_at,
            ...row.data
        }));
    } catch (err) {
        console.error("Error fetching submissions:", err);
        return [];
    }
};

export const addMarketingSubmission = async (data: Record<string, any>) => {
    await saveSubmission('marketing', data);
};

export const addInternationalSubmission = async (data: Record<string, any>) => {
    await saveSubmission('international', data);
};

const saveSubmission = async (type: string, data: Record<string, any>) => {
    try {
        await supabase.from('form_submissions').insert([{
            form_type: type,
            data: data
        }]);
    } catch (err) {
        console.error("Error saving submission:", err);
    }
};

export const clearMarketingSubmissions = async () => {
    await clearSubmissionsByType('marketing');
};

export const clearInternationalSubmissions = async () => {
    await clearSubmissionsByType('international');
};

const clearSubmissionsByType = async (type: string) => {
    try {
        await supabase.from('form_submissions').delete().eq('form_type', type);
    } catch (err) {
        console.error("Error clearing submissions:", err);
    }
}

// Sync wrappers (stubs)
export const getLogs = (): LogEntry[] => []; 
export const getMarketingSubmissions = (): FormSubmission[] => [];
export const getInternationalSubmissions = (): FormSubmission[] => [];
