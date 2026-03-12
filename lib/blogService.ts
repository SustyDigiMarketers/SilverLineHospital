
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
        title: 'Understanding Heart Health in Contemporary Lifestyles',
        category: 'Cardiology',
        excerpt: 'Learn about the key factors that contribute to a healthy heart and how to prevent cardiovascular diseases in your daily routine.',
        content: '<p>Heart health is central to overall well-being...</p>',
        author: 'Dr. G. Senthilkumar',
        publishDate: '2023-10-25',
        featured: true,
        image: 0
    },
    {
        id: 'post_2',
        title: 'The Importance of Early Detection in Oncology',
        category: 'Oncology',
        excerpt: 'Early diagnosis significantly improves the chances of successful treatment. Read about our screening programs and advanced diagnostics.',
        content: '<p>Cancer screening is vital...</p>',
        author: 'Dr. G. Hemalatha',
        publishDate: '2023-10-20',
        featured: false,
        image: 1
    },
    {
        id: 'post_3',
        title: 'Advanced Robotic Surgery: The Future of Precision',
        category: 'Surgery',
        excerpt: 'Discover how robotic-assisted surgeries are providing better outcomes with less recovery time for patients.',
        content: '<p>Robotic surgery is transforming the medical field...</p>',
        author: 'Dr. S. Sivapragash',
        publishDate: '2023-10-15',
        featured: false,
        image: 2
    },
    {
        id: 'post_4',
        title: 'Nutrition and Wellness: Fueling Your Recovery',
        category: 'Wellness',
        excerpt: 'A balanced diet is the cornerstone of healing. Our nutritionists share tips for staying healthy after treatment.',
        content: '<p>Nutrition plays a critical role in recovery...</p>',
        author: 'Dr. M. Nirmal',
        publishDate: '2023-10-10',
        featured: false,
        image: 3
    },
    {
        id: 'post_5',
        title: 'Managing Chronic Pain with Integrative Therapy',
        category: 'Palliative Care',
        excerpt: 'Explore new multidisciplinary approaches to chronic pain management through physical therapy and medication.',
        content: '<p>Chronic pain can be debilitating...</p>',
        author: 'Dr. P. Ramamoorthi',
        publishDate: '2023-10-05',
        featured: false,
        image: 4
    },
    {
        id: 'post_6',
        title: 'New Breakthroughs in Nephrology Treatments',
        category: 'Nephrology',
        excerpt: 'Recent clinical trials have shown promising results for patients with early-stage kidney disease.',
        content: '<p>Innovative treatments are emerging in nephrology...</p>',
        author: 'Dr. K. Sathyasagar',
        publishDate: '2023-09-28',
        featured: false,
        image: 5
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
