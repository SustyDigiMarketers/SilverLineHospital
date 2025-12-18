
import { supabase } from './supabaseClient';

export interface Post {
  id: string;
  image: number | string;
  category: string;
  title: string;
  excerpt: string;
  publishDate: string;
  author: string;
  featured?: boolean;
  content: string;
}

// Default posts for fallback
const defaultPosts: Post[] = [
    {
        id: 'post_1',
        title: 'Understanding Heart Health',
        category: 'Cardiology',
        excerpt: 'Learn about the key factors that contribute to a healthy heart and how to prevent cardiovascular diseases.',
        content: '<p>Heart health is central to overall well-being...</p>',
        author: 'Dr. G. Senthilkumar',
        publishDate: '2023-10-25',
        featured: true,
        image: 0
    },
    {
        id: 'post_2',
        title: 'The Importance of Early Detection',
        category: 'Oncology',
        excerpt: 'Early diagnosis significantly improves the chances of successful treatment. Read about our screening programs.',
        content: '<p>Cancer screening is vital...</p>',
        author: 'Dr. G. Hemalatha',
        publishDate: '2023-10-20',
        featured: false,
        image: 1
    }
];

let postsCache: Post[] = [];

// Fetch posts (Async)
export const fetchPosts = async (): Promise<Post[]> => {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
            postsCache = data;
            return data;
        } else {
            // If DB is empty, return defaults (and maybe seed them?)
            return defaultPosts;
        }
    } catch (err) {
        console.error("Error fetching posts from Supabase:", err);
        return postsCache.length > 0 ? postsCache : defaultPosts;
    }
};

// Synchronous wrapper for components that expect immediate data (will return cache)
export const getPosts = (): Post[] => {
    if (postsCache.length === 0) {
        fetchPosts(); // Trigger fetch in background
        return defaultPosts;
    }
    return postsCache;
};

export const getPostById = (id: string): Post | undefined => {
  return postsCache.find(post => post.id === id) || defaultPosts.find(p => p.id === id);
};

export const addPost = async (post: Omit<Post, 'id'>): Promise<void> => {
  try {
      const newPost = { ...post, id: `post_${Date.now()}` };
      const { error } = await supabase.from('blogs').insert([newPost]);
      if (error) throw error;
      
      await fetchPosts(); // Refresh cache
  } catch (err) {
      console.error("Error adding post:", err);
  }
};

export const updatePost = async (updatedPost: Post): Promise<void> => {
  try {
      const { error } = await supabase
        .from('blogs')
        .update(updatedPost)
        .eq('id', updatedPost.id);
        
      if (error) throw error;
      await fetchPosts(); // Refresh cache
  } catch (err) {
      console.error("Error updating post:", err);
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      await fetchPosts(); // Refresh cache
  } catch (err) {
      console.error("Error deleting post:", err);
  }
};
