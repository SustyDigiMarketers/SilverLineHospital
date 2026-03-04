import React, { useContext } from 'react';
import * as blogService from '../lib/blogService';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

interface PostCardProps {
  post: blogService.Post;
  variant?: 'default' | 'large' | 'compact';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'default' }) => {
  const { config } = useContext(MasterSetupContext);
  
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const postUrl = `#post/${post.id}`;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.hash = event.currentTarget.hash;
  };

  const featuredBadge = post.featured && (
    <div className="absolute top-3 left-3 bg-[#00B5A5] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 uppercase tracking-wider">
      Featured
    </div>
  );
  
  // Logic to resolve image source: Direct URL vs Config Index
  const imageSrc = typeof post.image === 'string' && (post.image.startsWith('http') || post.image.startsWith('data:'))
        ? post.image
        : config.imagePaths?.blog?.[Number(post.image)] || '';

  if (variant === 'large') {
    return (
      <a href={postUrl} onClick={handleNavClick} className="group cursor-pointer block relative">
        {featuredBadge}
        <div className="overflow-hidden mb-6 rounded-lg">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-black transition-colors">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2 h-10">{post.excerpt}</p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </a>
    );
  }
  
  if (variant === 'compact') {
     return (
       <a href={postUrl} onClick={handleNavClick} className="group cursor-pointer block relative">
        {featuredBadge}
        <div className="overflow-hidden mb-4 rounded-lg">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-black transition-colors leading-tight line-clamp-2">{post.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 h-10">{post.excerpt}</p>
      </a>
     );
  }

  return (
    <a href={postUrl} onClick={handleNavClick} className="group cursor-pointer block relative">
      {featuredBadge}
      <div className="overflow-hidden mb-4 rounded-lg">
        <img
          src={imageSrc}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-black transition-colors line-clamp-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2 h-10">{post.excerpt}</p>
      <p className="text-sm text-gray-500">{formattedDate}</p>
    </a>
  );
};

export default PostCard;