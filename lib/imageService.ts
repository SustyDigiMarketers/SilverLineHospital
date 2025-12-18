
import { uploadImageToSupabase, isSupabaseConfigured } from './supabaseClient';

// Utility to handle image uploads
// Prioritizes Supabase Storage, falls back to Base64 if Supabase fails or isn't configured.

export const compressAndConvertToBase64 = async (file: File): Promise<string> => {
    // 1. Try Supabase Upload first
    if (isSupabaseConfigured) {
        try {
            const publicUrl = await uploadImageToSupabase(file);
            if (publicUrl) {
                return publicUrl;
            }
        } catch (e) {
            console.warn("Supabase upload failed, falling back to Base64", e);
        }
    }

    // 2. Fallback to Base64 (Local compression)
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                
                // Max dimensions to keep size down
                const MAX_WIDTH = 1024;
                const MAX_HEIGHT = 1024;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                
                // Compress to JPEG with 0.7 quality
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(dataUrl);
            };
            
            img.onerror = (err) => reject(err);
        };
        
        reader.onerror = (error) => reject(error);
    });
};
