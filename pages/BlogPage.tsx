import React, { useState, useEffect, useMemo } from 'react';
import * as blogService from '../lib/blogService';
import BlogHero from '../components/BlogHero';
import PostCard from '../components/PostCard';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<blogService.Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPosts(blogService.getPosts());
  }, []);

  const allCategories = useMemo(() => {
    const categoriesSet = new Set(posts.map(p => p.category));
    return Array.from(categoriesSet).sort();
  }, [posts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category first
    if (activeCategory) {
        filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Then filter by search query
    const query = searchQuery.toLowerCase().trim();
    if (query) {
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.excerpt.toLowerCase().includes(query)
        );
    }

    return filtered;
  }, [posts, activeCategory, searchQuery]);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to the top of the post grid for a better user experience
      const blogSection = document.getElementById('blog-grid');
      if(blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Generate page numbers for pagination control with ellipsis logic
  const getPageNumbers = () => {
    if (totalPages <= 1) return [];
    
    const pageNumbers: (number | string)[] = [];
    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    pageNumbers.push(1);
    if (shouldShowLeftDots) pageNumbers.push('...');
    
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if(i > 1 && i < totalPages) {
         pageNumbers.push(i);
      }
    }
    
    if (shouldShowRightDots) pageNumbers.push('...');
    pageNumbers.push(totalPages);
    
    return pageNumbers;
  };


  return (
    <div className="bg-gray-50 pt-24 font-['Poppins',_sans-serif] min-h-screen">
      {/* Blog Hero Section */}
      <BlogHero posts={posts.filter(p => p.featured).slice(0, 4)} />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Search and Filter Section */}
        <section className="relative z-10 -mt-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Search Input */}
                    <div className="relative w-full md:flex-grow group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#00B5A5] transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="blog-search"
                            aria-label="Search for health articles"
                            className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl leading-5 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all duration-300"
                            placeholder="Search articles, topics, or keywords..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="mt-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Filter by Topic</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleCategoryClick(null)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out border ${!activeCategory ? 'bg-[#0E2A47] text-white border-[#0E2A47] shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-[#00B5A5] hover:text-[#00B5A5]'}`}
                        >
                            All Posts
                        </button>
                        {allCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out border ${activeCategory === category ? 'bg-[#00B5A5] text-white border-[#00B5A5] shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-[#00B5A5] hover:text-[#00B5A5]'}`}
                        >
                            {category}
                        </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Section Title */}
        <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0E2A47]">
                {searchQuery ? `Search Results for "${searchQuery}"` : (activeCategory ? `${activeCategory} Articles` : 'Latest Articles & Insights')}
            </h2>
            <span className="text-sm text-gray-500 font-medium hidden sm:block">
                Showing {paginatedPosts.length} of {filteredPosts.length} articles
            </span>
        </div>

        {/* Blog Posts Grid */}
        <section id="blog-grid" className="pb-16 min-h-[400px]">
            {paginatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post, index) => (
                        <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <PostCard post={post} variant="default" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No Posts Found</h3>
                    <p className="mt-2 text-gray-500 max-w-md mx-auto">We couldn't find any articles matching your search. Try adjusting your filters or keywords.</p>
                    <button 
                        onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                        className="mt-6 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-[#00B5A5] hover:border-[#00B5A5] transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </section>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
            <nav className="flex justify-center items-center space-x-2 pb-24" aria-label="Pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#00B5A5] hover:border-[#00B5A5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Previous
                </button>
                
                <div className="hidden sm:flex space-x-2">
                    {getPageNumbers().map((page, index) =>
                        typeof page === 'number' ? (
                            <button
                                key={index}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg transition-all shadow-sm ${
                                    currentPage === page 
                                    ? 'bg-[#0E2A47] text-white ring-2 ring-[#0E2A47] ring-offset-2' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-[#00B5A5] hover:border-[#00B5A5]'
                                }`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium">
                                ...
                            </span>
                        )
                    )}
                </div>
                
                 <span className="sm:hidden px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm">
                    {currentPage} / {totalPages}
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#00B5A5] hover:border-[#00B5A5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    Next
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </nav>
        )}
      </div>
    </div>
  );
};

export default BlogPage;