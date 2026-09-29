/**
 * PressReleasePage — Renders a single press release by slug
 * Follows the same pattern as pages/Post/DepartmentPostPage.tsx
 */
import React from 'react';
import { pressReleases } from './listOfPressRelease';
import IslandBar from '../../components/IslandBar';

interface PressReleasePageProps {
  slug?: string;
}

const PressReleasePage: React.FC<PressReleasePageProps> = ({ slug }) => {
  const release = pressReleases.find((pr) => pr.slug === slug);

  if (!release) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-20 h-20 rounded-full bg-[#0E2A47]/5 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-[#0E2A47]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0E2A47] mb-3">Press Release Not Found</h1>
        <p className="text-gray-500 mb-8">The press release you are looking for could not be found.</p>
        <a
          href="/blog"
          className="inline-flex items-center gap-2 bg-[#00B5A5] hover:bg-[#0E2A47] text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300"
        >
          ← Back to Blog
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[200px] sm:h-[320px] md:h-[500px] xl:h-[550px] overflow-hidden bg-[#0E2A47]">
        <div className="w-full max-w-[480px] sm:max-w-none mx-auto h-full relative">
          <img
            src={release.image}
            alt={release.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/90 via-[#0E2A47]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-14">
            <span className="inline-flex items-center gap-2 bg-[#00B5A5] text-white text-xs font-black px-3 py-1 sm:px-4 sm:py-2 rounded-full uppercase tracking-widest mb-2 sm:mb-4">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Press Release · {new Date(release.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl line-clamp-2 sm:line-clamp-none">
              {release.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="relative z-30">
        <IslandBar />
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-[#00B5A5] pl-6 mb-12 italic">
            {release.excerpt}
          </p>

          {/* Full Content */}
          {release.content ? (
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: release.content }}
            />
          ) : (
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                SilverLine Hospital, Trichy's leading multi-speciality healthcare institution, is pleased to share
                this important update with our patients, partners, and the wider community.
              </p>
              <p>{release.excerpt}</p>
              <p>
                For further information, please contact our communications team at{' '}
                <a href="mailto:contact@silverlinehospital.com" className="text-[#00B5A5] hover:underline font-semibold">
                  contact@silverlinehospital.com
                </a>{' '}
                or call us at{' '}
                <a href="tel:04312906470" className="text-[#00B5A5] hover:underline font-semibold">
                  0431-2906470
                </a>.
              </p>
            </div>
          )}

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <a
              href="/blog"
              className="inline-flex items-center gap-3 text-[#0E2A47] hover:text-[#00B5A5] font-bold transition-colors duration-300 group"
            >
              <span className="w-10 h-10 rounded-full bg-[#0E2A47]/5 group-hover:bg-[#00B5A5]/10 flex items-center justify-center transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              </span>
              Back to Blog & News
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressReleasePage;
