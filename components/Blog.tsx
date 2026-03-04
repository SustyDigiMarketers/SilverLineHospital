import React, { useState, useEffect, useContext } from 'react';
import * as blogService from '../lib/blogService';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

const Blog: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const [posts, setPosts] = useState<blogService.Post[]>([]);

  useEffect(() => {
    const fetch = async () => {
        const data = await blogService.fetchPosts();
        setPosts(data);
    };
    fetch();
  }, []);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12 animate-on-scroll fade-in-up">
          <h2 className="text-4xl font-bold text-[#0E2A47]">From Our Health Blog</h2>
          <p className="mt-4 text-lg text-gray-600">Stay updated with the latest health news and tips from our experts.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {posts.map((post, index) => {
             // Handle both numeric indices (local assets) and string URLs (uploaded)
             const imageSrc = typeof post.image === 'string' && (post.image.startsWith('http') || post.image.startsWith('data:'))
                ? post.image
                : config.imagePaths?.blog?.[Number(post.image)] || '';

             return (
                <a
                  key={post.id}
                  href={`#post/${post.id}`}
                  className="block bg-white rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-on-scroll fade-in-up focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] relative"
                  style={{ '--stagger-delay': `${index * 50}ms` } as React.CSSProperties}
                >
                  {post.featured && (
                    <span className="absolute top-3 right-3 bg-[#00B5A5] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 uppercase tracking-wider">
                        Featured
                    </span>
                  )}
                  <div className="overflow-hidden h-56">
                    <img src={imageSrc} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="inline-block bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#0E2A47] mb-3 group-hover:text-[#00B5A5] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <p className="font-medium text-[#0E2A47] group-hover:text-[#00B5A5] transition-colors mt-auto self-start">
                      Read More &rarr;
                    </p>
                  </div>
                </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;