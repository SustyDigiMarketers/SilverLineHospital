import React, { useState, useEffect, useContext, useMemo } from 'react';
import * as blogService from '../lib/blogService';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import { motion, AnimatePresence } from 'framer-motion';

const POSTS_PER_PAGE = 4;

const Blog: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const [posts, setPosts] = useState<blogService.Post[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            const data = await blogService.fetchPosts();
            setPosts(data);
        };
        fetch();
    }, []);

    // Helper to get image source
    const getImageSrc = (post: blogService.Post | undefined) => {
        if (!post) return '';
        return typeof post.image === 'string' && (post.image.startsWith('http') || post.image.startsWith('data:'))
            ? post.image
            : config.imagePaths?.blog?.[Number(post.image)] || '';
    };

    // Filter logic
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [posts, searchQuery, selectedCategory]);

    // Categories extraction
    const categories = useMemo(() => {
        const cats = new Set(posts.map(p => p.category));
        return ['All', ...Array.from(cats).sort()];
    }, [posts]);

    // Top posts (most recent for now)
    const topPosts = useMemo(() => {
        return [...posts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 5);
    }, [posts]);

    // Pagination
    const pageCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    return (
        <section id="blog" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-[#00B5A5]/10 to-transparent blur-3xl" />
                <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-l from-[#0E2A47]/5 to-transparent blur-3xl" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* --- Sidebar (Left) --- */}
                    <aside className="lg:w-1/3 flex flex-col gap-10">
                        {/* Search Bar */}
                        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.05)] border border-white/50 animate-on-scroll fade-in-left">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search stories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-100/50 border-none rounded-2xl py-4 pl-6 pr-12 text-[#0E2A47] placeholder:text-gray-400 focus:ring-2 focus:ring-[#00B5A5]/50 transition-all duration-300"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Categories Box */}
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.05)] border border-white/50 animate-on-scroll fade-in-left delay-100">
                            <h3 className="text-xl font-extrabold text-[#0E2A47] mb-8 flex items-center gap-3">
                                <span className="w-2 h-8 bg-[#00B5A5] rounded-full"></span>
                                Categories
                            </h3>
                            <div className="flex flex-col gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex items-center justify-between group py-3 px-5 rounded-2xl transition-all duration-300 ${
                                            selectedCategory === cat 
                                            ? 'bg-gradient-to-r from-[#0E2A47] to-[#1d3f7f] text-white shadow-lg' 
                                            : 'hover:bg-teal-50 text-gray-600 hover:text-[#00B5A5]'
                                        }`}
                                    >
                                        <span className="font-bold tracking-tight">{cat}</span>
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] transition-colors ${
                                            selectedCategory === cat ? 'bg-white/20' : 'bg-slate-100 text-gray-400 group-hover:bg-[#00B5A5] group-hover:text-white'
                                        }`}>
                                            {posts.filter(p => cat === 'All' || p.category === cat).length}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Top Posts Box */}
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.05)] border border-white/50 animate-on-scroll fade-in-left delay-200">
                            <h3 className="text-xl font-extrabold text-[#0E2A47] mb-8 flex items-center gap-3">
                                <span className="w-2 h-8 bg-[#00B5A5] rounded-full"></span>
                                Trending Stories
                            </h3>
                            <div className="flex flex-col gap-6">
                                {topPosts.map((post, i) => (
                                    <a 
                                        key={post.id} 
                                        href={`#post/${post.id}`} 
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="text-3xl font-black text-slate-200 group-hover:text-[#00B5A5]/20 transition-colors duration-500 leading-none">
                                            {i + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="font-bold text-[#0E2A47] text-sm leading-snug group-hover:text-[#00B5A5] transition-colors line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">
                                                {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Instagram Feed Section */}
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.05)] border border-white/50 animate-on-scroll fade-in-left delay-300">
                            <h3 className="text-xl font-extrabold text-[#0E2A47] mb-8 flex items-center gap-3">
                                <span className="w-2 h-8 bg-[#00B5A5] rounded-full"></span>
                                Clinical Life
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer group hover:ring-4 hover:ring-[#00B5A5]/30 transition-all duration-300">
                                        <img 
                                            src={config.imagePaths?.blog?.[i % 6] || ''} 
                                            alt="Instagram feed item" 
                                            className="w-full h-full object-cover group-hover:rotate-6 group-hover:scale-125 transition-transform duration-700" 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* --- Blog Feed (Right) --- */}
                    <main className="lg:w-2/3">
                        {/* --- TOP SECTION: Featured & Auto-Scroll Trending --- */}
                        {topPosts.length > 0 && (
                        <div className="mb-16">
                            <div className="flex flex-col xl:flex-row gap-6 mb-12">
                                {/* Large Featured Post */}
                                <div className="xl:w-2/3">
                                    <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50">
                                        <img 
                                            src={getImageSrc(topPosts[0])} 
                                            alt={topPosts[0].title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/95 via-[#0E2A47]/40 to-transparent flex flex-col justify-end p-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-[#00B5A5] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#00B5A5]/30">
                                                    Featured Story
                                                </span>
                                                <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">
                                                    {new Date(topPosts[0].publishDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight group-hover:text-[#00B5A5] transition-colors duration-300">
                                                {topPosts[0].title}
                                            </h2>
                                            <p className="text-white/80 text-sm max-w-xl line-clamp-2 mb-6">
                                                {topPosts[0].excerpt}
                                            </p>
                                            <a href={`#post/${topPosts[0].id}`} className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest group/btn">
                                                Read More 
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-[#00B5A5] transition-all duration-300">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Auto-Scroll List (Right of Hero) */}
                                <div className="xl:w-1/3 flex flex-col gap-4 max-h-[450px] overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-slate-50 to-transparent z-10" />
                                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-50 to-transparent z-10" />
                                    
                                    <motion.div 
                                        animate={{ y: [0, -400] }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="flex flex-col gap-4"
                                    >
                                        {[...topPosts, ...topPosts].map((post, i) => (
                                            <a key={i} href={`#post/${post.id}`} className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-white flex gap-4 group transition-all hover:bg-white hover:shadow-xl hover:border-[#00B5A5]/20">
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                                    <img src={getImageSrc(post)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h4 className="text-xs font-black text-[#0E2A47] line-clamp-2 leading-tight group-hover:text-[#00B5A5] transition-colors">{post.title}</h4>
                                                    <span className="text-[10px] text-gray-400 font-bold mt-1">{new Date(post.publishDate).toLocaleDateString()}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* --- MIDDLE SECTION: Explore Heading --- */}
                        <div className="flex flex-col md:flex-row items-end justify-between mb-12 animate-on-scroll fade-in-up">
                            <div className="md:w-1/2">
                                <h2 className="text-4xl font-extrabold text-[#0E2A47] leading-tight">
                                    Explore Our Latest <span className="relative inline-block">
                                        Articles
                                        <div className="absolute bottom-2 left-0 w-full h-3 bg-[#00B5A5]/20 -z-10 rounded-full" />
                                    </span>
                                </h2>
                            </div>
                            <div className="md:w-1/3 mt-4 md:mt-0">
                                <p className="text-gray-500 text-sm leading-relaxed border-l-4 border-[#00B5A5]/20 pl-6">
                                    Embark on a journey with us as we delve into the realms of health innovation, sharing expert insights and medical breakthroughs.
                                </p>
                            </div>
                        </div>

                        {/* --- BOTTOM SECTION: Grid --- */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selectedCategory + searchQuery + currentPage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                            >
                                {paginatedPosts.length > 0 ? (
                                    paginatedPosts.map((post, index) => (
                                        <motion.a
                                            key={post.id}
                                            href={`#post/${post.id}`}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white/90 backdrop-blur-md rounded-[2rem] border border-white overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_25px_50px_-15px_rgba(0,181,165,0.15)] hover:-translate-y-2 hover:border-[#00B5A5]/30 shadow-sm"
                                        >
                                            <div className="relative h-56 overflow-hidden">
                                                <img 
                                                    src={getImageSrc(post)} 
                                                    alt={post.title} 
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            </div>
                                            <div className="p-8 flex flex-col flex-grow">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <svg className="w-3.5 h-3.5 text-[#00B5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                                        {new Date(post.publishDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-black text-[#0E2A47] mb-3 group-hover:text-[#00B5A5] transition-colors line-clamp-2 leading-tight tracking-tight">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-500 text-xs mb-6 line-clamp-3 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-[#0E2A47] group-hover:text-[#00B5A5] uppercase tracking-widest flex items-center gap-2 transition-all group-hover:gap-4">
                                                        Read More
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.a>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center animate-fade-in bg-white/50 rounded-3xl border-2 border-dashed border-[#00B5A5]/20">
                                        <svg className="w-16 h-16 mx-auto text-[#0E2A47]/10 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 2v4h4" /></svg>
                                        <p className="text-[#0E2A47] font-extrabold text-xl">No articles found</p>
                                        <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination */}
                        {pageCount > 1 && (
                            <div className="mt-20 flex justify-center items-center gap-4">
                                {[...Array(pageCount)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-14 h-14 rounded-full flex items-center justify-center font-black transition-all duration-300 ${
                                            currentPage === i + 1
                                            ? 'bg-gradient-to-r from-[#0E2A47] to-[#1d3f7f] text-white shadow-[#0E2A47]/20 shadow-xl scale-110'
                                            : 'bg-white text-gray-400 hover:bg-teal-50 hover:text-[#00B5A5] shadow-sm'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default Blog;
