
import { supabase } from './supabaseClient';
import { addHistory } from './contentHistoryService';

export type UserRole = string;
export type Credentials = Record<UserRole, string>;

export const verifyAsync = async (
  username: string,
  password?: string
): Promise<{ success: boolean; role?: UserRole; message: string }> => {
  
  try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
          return { success: false, message: 'Invalid username.' };
      }

      // In a real app, verify hash. Here we compare plaintext as per existing logic.
      if (data.password === password) {
          return { success: true, role: data.role, message: 'Login successful.' };
      } else {
          return { success: false, message: 'Invalid password.' };
      }
  } catch (err) {
      console.error("Auth error:", err);
      return { success: false, message: 'Authentication failed.' };
  }
};

export const getCredentialsAsync = async (): Promise<Credentials> => {
    try {
        const { data } = await supabase.from('app_users').select('username, password');
        const creds: Credentials = {};
        data?.forEach((u: any) => {
            creds[u.username] = u.password;
        });
        return creds;
    } catch {
        return {};
    }
};

export const updateCredentialAsync = async (username: UserRole, newPassword: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('app_users')
            .update({ password: newPassword })
            .eq('username', username);
            
        if (!error) {
            addHistory({
                page: 'Credentials',
                section: `user: ${username}`,
                type: 'Password Updated',
            });
            return true;
        }
        return false;
    } catch {
        return false;
    }
};

export const addCredentialAsync = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
        // Assume role is same as username for this simple mapping, or default to 'admin'
        const role = ['master', 'superadmin', 'hr'].includes(username) ? username : 'admin';
        
        const { error } = await supabase
            .from('app_users')
            .insert([{ username, password, role }]);

        if (error) {
            if (error.code === '23505') return { success: false, message: 'User already exists.' };
            throw error;
        }
        return { success: true, message: 'User added.' };
    } catch (e: any) {
        return { success: false, message: e.message || 'Error adding user.' };
    }
};

export const deleteCredentialAsync = async (username: string): Promise<{ success: boolean; message: string }> => {
    if (username === 'master') return { success: false, message: 'Cannot delete master.' };
    
    try {
        const { error } = await supabase.from('app_users').delete().eq('username', username);
        if (error) throw error;
        return { success: true, message: 'User deleted.' };
    } catch {
        return { success: false, message: 'Error deleting user.' };
    }
};

// Deprecated sync
export const verify = () => ({ success: false, message: "Use verifyAsync" });
export const getCredentials = () => ({});
