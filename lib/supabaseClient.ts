
import { createClient } from '@supabase/supabase-js';

// Credentials provided by the user
const SUPABASE_URL = 'https://gpwkhzbyayjlgfvirreq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwd2toemJ5YXlqbGdmdmlycmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyODAyMDcsImV4cCI6MjA3OTg1NjIwN30.PZpnn0sZJDmP2CjYutNHGMY3us6Lf6LCuoE8kF72H8s';

export const isSupabaseConfigured = true;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Uploads a file to the 'images' bucket in Supabase and returns the public URL.
 */
export const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        
        // Upload to 'images' bucket
        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw error;
        }

        // Get Public URL
        const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error uploading image to Supabase:', error);
        return null;
    }
};

/**
 * Lists all images currently stored in the Supabase 'images' bucket.
 */
export const listStorageImages = async (): Promise<{ name: string; url: string }[]> => {
    try {
        const { data, error } = await supabase.storage
            .from('images')
            .list('', {
                limit: 100,
                sortBy: { column: 'created_at', order: 'desc' },
            });

        if (error) {
            console.error('Error listing storage images:', error);
            return [];
        }

        return data.map((file) => {
            const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(file.name);
            return {
                name: file.name,
                url: publicUrlData.publicUrl,
            };
        });
    } catch (error) {
        console.error('Error fetching storage images:', error);
        return [];
    }
};
