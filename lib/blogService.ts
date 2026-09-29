
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

const postFiles = import.meta.glob('../pages/Post/*.tsx');
// In Vite 4+, use query: '?raw' to get string contents
const rawPostFiles = import.meta.glob('../pages/Post/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

// Helper to resolve the best cover image for a post file.
// Priority: 1) /Blog/{Department}/hero.jpg (local public folder)
//           2) first <img src> found in the .tsx raw source
//           3) numeric fallback index
const getPostCoverImage = (fileName: string, fileContent: string, index: number): string | number => {
    // Check if the local Blog folder image would be valid by attempting a HEAD request at runtime.
    // At build/scan time we simply trust the path and let the <img> onError handle broken paths.
    const localHero = `/Blog/${fileName}/hero.jpg`;
    // We return the local path; each component is responsible for fallback via onError.
    // To avoid showing a broken image we still check the raw tsx as a secondary hint.
    const imgMatch = fileContent.match(/<img[^>]*src=["'](https?:\/\/[^"']+)["']/);
    // Return local path first; if it 404s at runtime, components should show the tsx-extracted url
    return localHero;
};

const fileBasedPosts: Post[] = Object.keys(postFiles).map((path, index) => {
    const fileName = path.split('/').pop()?.replace('.tsx', '') || '';
    
    // Auto-categorize based on file name
    let category = 'Hospital News';
    if (fileName.toLowerCase().includes('cardio')) category = 'Cardiology';
    else if (fileName.toLowerCase().includes('oncolo')) category = 'Oncology';
    else if (fileName.toLowerCase().includes('neuro')) category = 'Neurology';
    else if (fileName.toLowerCase().includes('department')) category = 'Department';
    
    // Create a readable title
    const title = fileName.replace(/([A-Z])/g, ' $1').trim() + ' Updates';

    // Extract fallback image from raw file content (first https img)
    const fileContent = rawPostFiles[path] || '';
    const imgMatch = fileContent.match(/<img[^>]*src=["'](https?:\/\/[^"']+)["']/);
    const fallbackImage = imgMatch ? imgMatch[1] : `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop`;

    return {
        id: fileName,
        title: title,
        category: category,
        excerpt: `Read the latest dedicated updates and clinical articles from our ${category} department.`,
        content: `<p>Content dynamically loaded from ${fileName}.tsx</p>`,
        author: 'SilverLine Hospital',
        publishDate: new Date().toISOString().split('T')[0],
        featured: index === 0,
        // Primary: local public/Blog image; fallback stored separately for components
        image: `/Blog/${fileName}/hero.jpg`,
        fallbackImage: fallbackImage,
    } as Post & { fallbackImage: string };
});

let postsCache: Post[] = [];
let combinedCache: Post[] = [];

// Fetch posts (Async) - EXCLUSIVELY return automatically detected file-based posts
export const fetchPosts = async (): Promise<Post[]> => {
    combinedCache = [...fileBasedPosts];
    return combinedCache;
};

// Synchronous wrapper for components that expect immediate data
export const getPosts = (): Post[] => {
    return combinedCache.length > 0 ? combinedCache : fileBasedPosts;
};

export const getPostById = (id: string): Post | undefined => {
  return fileBasedPosts.find(post => post.id === id);
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
