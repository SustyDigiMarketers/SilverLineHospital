import React, { useEffect, useState } from 'react';
import { Heart, Share2, Printer, MapPin, Images } from 'lucide-react';
import { getPosts, Post } from '../../lib/blogService';

const DepartmentPostPage: React.FC<{ postId?: string }> = ({ postId }) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic SEO Keywords Injection
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Cardiology, Heart Health, Cardiovascular Treatment, Best Heart Specialists, SilverLine Hospital');

    // Fetch related posts (excluding this one)
    const allPosts = getPosts();
    const related = allPosts.filter(p => p.id !== (postId || 'Cardiology')).slice(0, 3);
    setRelatedPosts(related);

    return () => {
        metaKeywords?.removeAttribute('content');
    };
  }, [postId]);

  const HERO_FALLBACK = '';
  const SECONDARY_FALLBACK = '';

  const getImageSrc = (post: Post) => {
      if (typeof post.image === 'string' && (post.image.startsWith('/Blog/') || post.image.startsWith('http'))) {
          return post.image;
      }
      return 'https://images.unsplash.com/photo-1544913776-90c1223073a3?q=80&w=600&auto=format&fit=crop';
  };

  return (
    <div className="w-full bg-[#fafafa] text-gray-900 font-sans min-h-screen">
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] bg-gray-200">
        <img
          src="/Blog/Cardiology/hero.jpg"
          alt="Cardiology Hero"
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = HERO_FALLBACK; }}
        />
        
        {/* Title Box overlapping the image bottom-left */}
        <div className="absolute -bottom-16 left-0 md:left-[10%] bg-[#fafafa] p-8 md:p-12 md:pr-16 w-[95%] md:w-[70%] lg:w-[60%] max-w-4xl z-10">
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-serif uppercase tracking-wider text-gray-900 leading-[1.1]">
            VELIMIR KHLEBNIKOV FOR ANSELM KIEFER
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 lg:px-8 mt-28 mb-20 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Sidebar (Meta & Actions) */}
          <div className="w-full lg:w-[20%] flex flex-col space-y-10">
            <div>
              <div className="flex items-start text-[#00B5A5] text-sm mb-2">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                <span>The Main Museum Complex</span>
              </div>
              <div className="text-gray-500 text-xs tracking-wide uppercase font-semibold">
                29 July 2017 — 15 October 2017
              </div>
            </div>

            <div className="flex flex-col space-y-5 text-gray-400 text-xs uppercase font-semibold tracking-wider pt-8 border-t border-transparent lg:border-gray-200/50">
              <button className="flex items-center gap-4 hover:text-[#00B5A5] transition-colors w-max group">
                <Heart className="w-5 h-5 group-hover:fill-[#00B5A5]" strokeWidth={1.5} /> <span>Favourites</span>
              </button>
              <button className="flex items-center gap-4 hover:text-[#00B5A5] transition-colors w-max group">
                <Share2 className="w-5 h-5" strokeWidth={1.5} /> <span>Share</span>
              </button>
              <button className="flex items-center gap-4 hover:text-[#00B5A5] transition-colors w-max group">
                <Printer className="w-5 h-5" strokeWidth={1.5} /> <span>Print</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[50%]">
            <p className="text-gray-700 leading-[1.8] mb-10 text-[15px]">
              Located in the Nicholas Hall of the Winter Palace, the exhibition is organized by the State Hermitage Museum in close collaboration with the artist and in cooperation with Galerie Thaddaeus Ropac, London/Paris/Salzburg. Anselm Kiefer dedicated the exhibition to the great Russian poet Velimir Khlebnikov. Anselm Kiefer is an artist whose work demonstrates a deep and diverse intellectual reflection. In his oeuvre he faces the themes of history, religion, literature, philosophy as well as the question of memory and heritage. One of the main sources of inspiration for Kiefer is world culture in its widest perspective: German history, religious mysticism, antiquity, and Mesopotamian mythology.
            </p>
            
            {/* Secondary Image */}
            <div className="mb-10 group cursor-pointer">
              <img
                src="/Blog/Cardiology/secondary.jpg"
                alt="Cardiology Detail"
                className="w-full h-auto object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = SECONDARY_FALLBACK; }}
              />
              <div className="flex items-center text-xs text-gray-900 mt-4 gap-2 font-bold tracking-wide uppercase">
                <Images className="w-4 h-4 text-gray-400" /> View the slideshow
              </div>
            </div>

            <p className="text-gray-700 leading-[1.8] mb-8 text-[15px]">
              In 1980 Kiefer represented Germany at the Venice Biennale. In the following years he had solo exhibitions held at the Kunsthalle in Düsseldorf, the Museum of Modern Art in New York, the Guggenheim Museum in Bilbao, the Royal Academy of Arts in London as well as at the Grand Palais and the Centre Pompidou in Paris. Anselm Kiefer is the only living artist to be part of the permanent display of the Louvre.
            </p>
            <p className="text-gray-700 leading-[1.8] text-[15px]">
              According to the German philosopher Peter Sloterdijk, "Anselm Kiefer's art lodges in a strange spaciousness, as far from horrible as it is from comforting."
            </p>
          </div>

          {/* Right Sidebar (Related) */}
          <div className="w-full lg:w-[30%] lg:pl-12">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-8 text-gray-900">Related Posts</h3>
            
            <div className="space-y-10">
              {relatedPosts.map((post) => (
                <a href={`/post/${post.id}`} key={post.id} className="group cursor-pointer block">
                  <div className="relative mb-4">
                    <img 
                      src={getImageSrc(post)} 
                      className="w-full h-40 object-cover" 
                      alt="Related"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544913776-90c1223073a3?q=80&w=600&auto=format&fit=crop'; }}
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#fafafa]"></div>
                  </div>
                  <h4 className="font-serif text-lg leading-snug group-hover:text-[#00B5A5] transition-colors mb-2 text-gray-900 pr-4 line-clamp-2">{post.title}</h4>
                  <div className="text-[#00B5A5] text-xs flex items-center mb-1">
                    <MapPin className="w-3 h-3 mr-1" /> {post.category || 'Hospital Updates'}
                  </div>
                  <div className="text-gray-500 text-xs tracking-wide">{new Date(post.publishDate).toLocaleDateString()}</div>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DepartmentPostPage;
