
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

const STORAGE_KEY = 'silverline_blog_posts';

const getStoredPosts = (): Post[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing stored posts", e);
            return defaultPosts;
        }
    }
    return defaultPosts;
};

const savePosts = (posts: Post[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

let postsCache: Post[] = getStoredPosts();

// Fetch posts (Async) - Now just returns local cache
export const fetchPosts = async (): Promise<Post[]> => {
    postsCache = getStoredPosts();
    return postsCache;
};

// Synchronous wrapper for components that expect immediate data
export const getPosts = (): Post[] => {
    return postsCache;
};

export const getPostById = (id: string): Post | undefined => {
  return postsCache.find(post => post.id === id);
};

export const addPost = async (post: Omit<Post, 'id'>): Promise<void> => {
  const newPost = { ...post, id: `post_${Date.now()}` };
  postsCache = [newPost, ...postsCache];
  savePosts(postsCache);
};

export const updatePost = async (updatedPost: Post): Promise<void> => {
  postsCache = postsCache.map(p => p.id === updatedPost.id ? updatedPost : p);
  savePosts(postsCache);
};

export const deletePost = async (id: string): Promise<void> => {
  postsCache = postsCache.filter(p => p.id !== id);
  savePosts(postsCache);
};
