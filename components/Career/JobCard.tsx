import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  Clock,
  Heart,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle,
  Building2,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { JobItem } from './CareerTypes';

interface JobCardProps {
  job: JobItem;
  onApply: (job: JobItem) => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onApply,
  isSaved,
  onToggleSave,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at SilverLine Hospital`,
        text: `Open position for ${job.title} at SilverLine Hospital, Trichy.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/career#${job.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      id={job.id}
      className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-[#00B5A5]/40 transition-all duration-200 overflow-hidden flex flex-col justify-between h-full"
    >
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#00B5A5]/10 text-[#00B5A5] border border-[#00B5A5]/20">
              {job.department}
            </span>

            {job.urgent && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                Urgent Requirement
              </span>
            )}

            {job.postedAgo && (
              <span className="text-xs text-gray-400 font-medium">
                {job.postedAgo}
              </span>
            )}
          </div>

          {/* Bookmark & Share Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              title="Share Position"
              aria-label="Share Position"
              className="p-2 text-gray-400 hover:text-[#00B5A5] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(job.id)}
              title={isSaved ? 'Remove from Saved Jobs' : 'Save Job'}
              aria-label={isSaved ? 'Remove from Saved Jobs' : 'Save Job'}
              className={`p-2 rounded-lg transition-colors ${
                isSaved
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-gray-400 hover:text-rose-500 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#0E2A47] hover:text-[#00B5A5] transition-colors leading-tight">
          {job.title}
        </h3>

        {/* Metadata Strip */}
        <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1.5 font-medium text-gray-700">
            <Briefcase className="w-4 h-4 text-[#00B5A5]" />
            <span>{job.type}</span>
          </div>

          <span className="text-gray-300">•</span>

          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{job.experience || job.experienceLevel || '1–3 Years Experience'}</span>
          </div>

          <span className="text-gray-300">•</span>

          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-4 h-4 text-[#00B5A5]" />
            <span>{job.location || 'SilverLine Hospital, Trichy'}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">
          {job.description}
        </p>

        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Expandable Details Section */}
        {isExpanded && (
          <div className="mt-5 pt-5 border-t border-gray-100 space-y-4 text-xs sm:text-sm">
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h4 className="font-bold text-[#0E2A47] uppercase tracking-wider text-xs mb-2">
                  Key Responsibilities
                </h4>
                <ul className="space-y-1.5 text-gray-600">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B5A5] mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h4 className="font-bold text-[#0E2A47] uppercase tracking-wider text-xs mb-2">
                  Qualifications & Requirements
                </h4>
                <ul className="space-y-1.5 text-gray-600">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.salary && (
              <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Compensation Package</span>
                <span className="font-bold text-[#0E2A47]">{String(job.salary)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 sm:px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-3 mt-auto">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-gray-600 hover:text-[#0E2A47] flex items-center gap-1 transition-colors"
        >
          <span>{isExpanded ? 'Hide Details' : 'View Details & Requirements'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        <div className="flex items-center gap-2">
          {copiedLink && (
            <span className="text-xs text-emerald-600 font-medium animate-fade-in">
              Link copied!
            </span>
          )}
          <button
            onClick={() => onApply(job)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00B5A5] hover:bg-[#0E2A47] text-white text-xs sm:text-sm font-semibold transition-colors duration-150 shadow-xs"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
