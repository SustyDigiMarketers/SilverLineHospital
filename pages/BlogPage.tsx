import React from 'react';
import PageHero from '../components/PageHero';
import Blog from '../components/Blog';

const BlogPage: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="Our Health Blog" 
        subtitle="Stay updated with the latest medical news and health tips."
        backgroundImage="imagePaths.blog[0]"
      />
      <Blog />
    </div>
  );
};

export default BlogPage;
