
// Supabase is disabled as per user request to remove external database
export const isSupabaseConfigured = false;

export const supabase = {
    from: () => ({
        select: () => ({ order: () => ({ data: [], error: null }) }),
        insert: () => ({ error: null }),
        update: () => ({ eq: () => ({ error: null }) }),
        delete: () => ({ eq: () => ({ error: null }) }),
    }),
    storage: {
        from: () => ({
            upload: async () => ({ data: null, error: new Error("Supabase is disabled") }),
            getPublicUrl: () => ({ data: { publicUrl: "" } }),
            list: async () => ({ data: [], error: null }),
        })
    }
} as any;

/**
 * Mock upload - returns null as we are using local images/base64 now
 */
export const uploadImageToSupabase = async (_file: File): Promise<string | null> => {
    return null;
};

/**
 * Mock list - returns empty array
 */
export const listStorageImages = async (): Promise<{ name: string; url: string }[]> => {
    return [];
};
