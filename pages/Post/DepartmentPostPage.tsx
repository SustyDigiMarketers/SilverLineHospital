import React, { useEffect, useState } from 'react';
import { Share2, Link as LinkIcon, Facebook, Twitter, Linkedin, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { getPosts, getPostById, Post } from '../../lib/blogService';
import { motion, useScroll, useSpring } from 'framer-motion';

const DepartmentPostPage: React.FC<{ postId?: string }> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const allPosts = getPosts();
    const currentPost = postId ? getPostById(postId) : null;
    
    // Fallback if post not found
    if (currentPost) {
      setPost(currentPost);
    } else if (allPosts.length > 0) {
      // Fallback to the first post for preview if invalid ID
      setPost(allPosts[0]); 
    }

    // Fetch related posts (same category if possible, excluding this one)
    if (currentPost) {
       let related = allPosts.filter(p => p.id !== currentPost.id && p.category === currentPost.category);
       if (related.length < 3) {
           const others = allPosts.filter(p => p.id !== currentPost.id && p.category !== currentPost.category);
           related = [...related, ...others];
       }
       setRelatedPosts(related.slice(0, 3));
    }

  }, [postId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || '';

  if (!post) {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold text-[#0E2A47] mb-4">Article Not Found</h1>
            <p className="text-gray-500 mb-8">The article you're looking for could not be found.</p>
            <a href="/blog" className="px-6 py-3 bg-[#00B5A5] text-white rounded-full font-bold hover:bg-[#0E2A47] transition-colors">
              Back to Blog
            </a>
          </div>
      );
  }

  // Use natural reading time calculation (approx 200 words per min)
  const wordCount = post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="w-full bg-white text-gray-900 font-sans min-h-screen relative">
      
      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#00B5A5] origin-left z-50"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-24 pb-20">
        
        {/* Breadcrumb */}
        <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-sm text-gray-500 mb-8"
        >
            <a href="/" className="hover:text-[#00B5A5] transition-colors focus:outline-none focus:underline">Home</a>
            <span className="mx-2">/</span>
            <a href="/blog" className="hover:text-[#00B5A5] transition-colors focus:outline-none focus:underline">Blog</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{post.title}</span>
        </motion.nav>

        {/* Article Header */}
        <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B5A5]/10 text-[#00B5A5] text-xs font-bold uppercase tracking-widest mb-6">
                {post.category}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0E2A47] leading-tight mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00B5A5]" />
                    <span>{post.author || 'SilverLine Team'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00B5A5]" />
                    <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00B5A5]" />
                    <span>{readingTime} min read</span>
                </div>
            </div>
        </motion.header>

        {/* Hero Image */}
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden shadow-xl mb-16"
        >
            <img 
                src={typeof post.image === 'string' ? post.image : (post as any).fallbackImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d'} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop'; }}
            />
        </motion.div>

        {/* Layout: Content + Sticky Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Sticky Share Rail (Desktop) */}
            <div className="hidden lg:block w-16 flex-shrink-0">
                <div className="sticky top-32 flex flex-col items-center gap-6">
                    <div className="w-px h-12 bg-gray-200" />
                    
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#00B5A5] hover:text-white transition-all shadow-sm hover:shadow-md" aria-label="Share on Twitter">
                        <Twitter className="w-4 h-4" />
                    </a>
                    
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#00B5A5] hover:text-white transition-all shadow-sm hover:shadow-md" aria-label="Share on Facebook">
                        <Facebook className="w-4 h-4" />
                    </a>
                    
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#00B5A5] hover:text-white transition-all shadow-sm hover:shadow-md" aria-label="Share on LinkedIn">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    
                    <button onClick={handleCopyLink} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#00B5A5] hover:text-white transition-all shadow-sm hover:shadow-md relative group" aria-label="Copy link to clipboard">
                        <LinkIcon className="w-4 h-4" />
                        {copyFeedback && (
                            <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Copied!</span>
                        )}
                    </button>
                    
                    <div className="w-px h-12 bg-gray-200" />
                </div>
            </div>

            {/* Article Body */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex-1 max-w-[820px]"
            >
                {/* Excerpt */}
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium mb-10">
                    {post.excerpt}
                </p>

                {/* Content */}
                <div 
                    className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-[1.8] md:leading-[1.9] prose-headings:text-[#0E2A47] prose-headings:font-bold prose-a:text-[#00B5A5] hover:prose-a:text-[#0E2A47] prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-[#00B5A5] prose-blockquote:text-gray-500 prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Mobile Share Rail */}
                <div className="lg:hidden mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-4">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2">Share</span>
                    
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#00B5A5] hover:text-white transition-all" aria-label="Share on Twitter">
                        <Twitter className="w-4 h-4" />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#00B5A5] hover:text-white transition-all" aria-label="Share on Facebook">
                        <Facebook className="w-4 h-4" />
                    </a>
                    <button onClick={handleCopyLink} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#00B5A5] hover:text-white transition-all relative" aria-label="Copy link to clipboard">
                        <LinkIcon className="w-4 h-4" />
                        {copyFeedback && (
                            <span className="absolute -top-10 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Copied!</span>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
          <div className="bg-gray-50 py-24 border-t border-gray-100 mt-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <div className="flex items-center justify-between mb-12">
                      <h3 className="text-3xl font-extrabold text-[#0E2A47]">Related Articles</h3>
                      <a href="/blog" className="hidden sm:flex items-center gap-2 text-[#00B5A5] font-bold hover:text-[#0E2A47] transition-colors focus:outline-none focus:underline">
                          View all <ArrowRight className="w-4 h-4" />
                      </a>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {relatedPosts.map((related) => (
                          <a href={`/post/${related.id}`} key={related.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#00B5A5]/40" aria-label={`Read article: ${related.title}`}>
                              <div className="aspect-[4/3] w-full overflow-hidden relative">
                                  <img 
                                      src={typeof related.image === 'string' ? related.image : (related as any).fallbackImage || 'https://images.unsplash.com/photo-1544913776-90c1223073a3'} 
                                      alt={related.title}
                                      loading="lazy"
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544913776-90c1223073a3?q=80&w=600&auto=format&fit=crop'; }}
                                  />
                                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#0E2A47] uppercase tracking-widest">
                                      {related.category}
                                  </div>
                              </div>
                              <div className="p-8 flex-1 flex flex-col">
                                  <div className="text-sm text-gray-400 mb-3">{new Date(related.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                  <h4 className="text-xl font-bold text-[#0E2A47] mb-4 group-hover:text-[#00B5A5] transition-colors line-clamp-2">
                                      {related.title}
                                  </h4>
                                  <div className="mt-auto flex items-center text-[#00B5A5] font-bold text-sm">
                                      Read article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                                  </div>
                              </div>
                          </a>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default DepartmentPostPage;
