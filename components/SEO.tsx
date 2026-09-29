import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HOSPITAL_NAP } from '../lib/seoConfig';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  image?: string;
  robots?: string;
  schema?: Record<string, any> | Array<Record<string, any> | null | undefined>;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "multispeciality hospital in trichy, hospital in trichy, best hospital tiruchirappalli, emergency hospital trichy, cancer hospital trichy, cardiology trichy, nephrology trichy, urology trichy, doctors in trichy",
  canonical,
  type = 'website',
  image = HOSPITAL_NAP.image,
  robots = 'index, follow',
  schema
}) => {
  // If title already ends with SilverLine Hospital, don't duplicate
  const fullTitle = title.includes('SilverLine') 
    ? title 
    : `${title} | SilverLine Hospital Trichy`;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : HOSPITAL_NAP.url;
  const canonicalUrl = canonical 
    ? (canonical.startsWith('http') ? canonical : `${HOSPITAL_NAP.url}${canonical.startsWith('/') ? canonical : `/${canonical}`}`)
    : currentUrl;

  const validSchemas = Array.isArray(schema) 
    ? schema.filter(Boolean) 
    : (schema ? [schema] : []);

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* GEO & Local Entity Metadata */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Tiruchirappalli, Trichy, Tamil Nadu" />
      <meta name="geo.position" content={`${HOSPITAL_NAP.geo.latitude};${HOSPITAL_NAP.geo.longitude}`} />
      <meta name="ICBM" content={`${HOSPITAL_NAP.geo.latitude}, ${HOSPITAL_NAP.geo.longitude}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="SilverLine Hospital Trichy" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@Silverline63819" />

      {/* Structured Data (JSON-LD) for Rich Snippets & AI Answer Engines */}
      {validSchemas.map((s, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
