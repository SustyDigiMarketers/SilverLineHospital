import React from 'react';
import PageHero from '../components/PageHero';
import Blog from '../components/Blog';
import SEO from '../components/SEO';
import { generateBreadcrumbSchema, HOSPITAL_NAP } from '../lib/seoConfig';

const BlogPage: React.FC = () => {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Health Blog', url: '/blog' }
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SilverLine Health & Medical Blog",
    "description": "Medical insights, health tips, disease prevention guidance, and wellness articles from the medical specialists at SilverLine Hospital Trichy.",
    "url": `${HOSPITAL_NAP.url}/blog`,
    "publisher": {
      "@type": "Hospital",
      "name": HOSPITAL_NAP.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${HOSPITAL_NAP.url}/logo.png`
      }
    }
  };

  return (
    <div>
      <SEO
        title="Health & Medical Blog | SilverLine Hospital Trichy"
        description="Read medical insights, doctor advice, cardiology tips, cancer prevention awareness, and healthy lifestyle tips from SilverLine Hospital Trichy."
        keywords="health blog trichy, medical news trichy, doctor health tips, cancer awareness, heart health tips trichy"
        canonical="/blog"
        schema={[blogSchema, breadcrumbs]}
      />
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
