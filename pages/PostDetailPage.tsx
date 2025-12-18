import React, { useContext, useEffect, useState } from 'react';
import { getPostById, getPosts } from '../lib/blogService';
import PostCard from '../components/PostCard';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import * as blogService from '../lib/blogService';

interface PostDetailPageProps {
  postId: string;
}

const SocialShareIcon: React.FC<{ href: string, 'aria-label': string, children: React.ReactNode }> = ({ href, 'aria-label': ariaLabel, children }) => (
    <a href={href} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00B5A5] transition-colors">
        {children}
    </a>
);


const PostDetailPage: React.FC<PostDetailPageProps> = ({ postId }) => {
  const { config } = useContext(MasterSetupContext);
  const [post, setPost] = useState<blogService.Post | undefined>(blogService.getPostById(postId));
  const [relatedPosts, setRelatedPosts] = useState<blogService.Post[]>([]);

  // Fetch post if not found in cache (direct URL access case)
  useEffect(() => {
      const loadPost = async () => {
          let currentPost = blogService.getPostById(postId);
          if (!currentPost) {
              await blogService.fetchPosts(); // Refresh cache
              currentPost = blogService.getPostById(postId);
          }
          setPost(currentPost);
      };
      loadPost();
  }, [postId]);

  useEffect(() => {
      const loadRelated = async () => {
          if (post) {
              const allPosts = await blogService.fetchPosts();
              const related = allPosts
                  .filter(p => p.id !== postId && p.category === post.category)
                  .slice(0, 3);
              setRelatedPosts(related);
          }
      }
      loadRelated();
  }, [postId, post]);


  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.location.hash = href;
  };

  if (!post) {
    return (
      <div className="pt-40 min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-3xl font-bold text-[#0E2A47] mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the article you were looking for.</p>
        <a 
            href="#blog" 
            onClick={(e) => handleNavClick(e, '#blog')}
            className="inline-block px-6 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-colors hover:bg-[#00B5A5]">
            &larr; Back to Blog
        </a>
      </div>
    );
  }

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  const pageUrl = encodeURIComponent(window.location.href);
  const postTitle = encodeURIComponent(post.title);
  
  const imageSrc = typeof post.image === 'string' && (post.image.startsWith('http') || post.image.startsWith('data:'))
    ? post.image
    : config.imagePaths?.blog?.[Number(post.image)] || '';

  return (
    <article className="pt-24 bg-gray-50 font-['Poppins',_sans-serif]">
      {/* Hero Image */}
      <header className="relative w-full bg-gray-200 h-[50vh] md:h-[60vh]">
        <img src={imageSrc} alt={post.title} className="absolute h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end items-start text-white p-8 md:p-12">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <p className="inline-block bg-[#00B5A5] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
              {post.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold !leading-tight drop-shadow-lg">{post.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          {/* Meta Info Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-gray-200">
              <div>
                  <p className="font-semibold text-gray-800">By {post.author}</p>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <span className="text-sm font-semibold text-gray-600">Share:</span>
                  <SocialShareIcon href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${postTitle}`} aria-label="Share on Twitter">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </SocialShareIcon>
                   <SocialShareIcon href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`} aria-label="Share on Facebook">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </SocialShareIcon>
              </div>
          </div>

          {/* Post Content */}
          <div 
            className="prose lg:prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </div>
      
      {/* Related Posts / "Read More" Section */}
      {relatedPosts.length > 0 && (
          <section className="py-20">
              <div className="container mx-auto max-w-4xl px-4 sm:px-6">
                  <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-widest mb-8 text-center">You Might Also Like</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {relatedPosts.map(relatedPost => (
                        <PostCard key={relatedPost.id} post={relatedPost} variant="compact" />
                      ))}
                    </div>
                    <div className="mt-12 text-center">
                        <a 
                            href="#blog" 
                            onClick={(e) => handleNavClick(e, '#blog')}
                            className="inline-block px-8 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]">
                            Back to Blog
                        </a>
                    </div>
              </div>
          </section>
      )}

      {/* Fallback "Back to blog" button if no related posts */}
      {relatedPosts.length === 0 && (
         <div className="py-16 text-center">
            <a 
                href="#blog" 
                onClick={(e) => handleNavClick(e, '#blog')}
                className="inline-block px-8 py-3 font-medium text-white bg-[#0E2A47] rounded-full transition-all duration-300 ease-in-out hover:bg-[#00B5A5] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]">
                &larr; Back to Blog
            </a>
        </div>
      )}
    </article>
  );
};

export default PostDetailPage;