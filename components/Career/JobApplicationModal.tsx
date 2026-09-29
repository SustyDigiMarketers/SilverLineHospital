import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  Building2,
  Phone,
  Mail,
  AlertCircle,
  ArrowRight,
  Send,
  Trash2,
} from 'lucide-react';
import { JobItem, ApplicationFormData } from './CareerTypes';
import { submitCareerApplication, SubmissionResult } from '../../lib/formSubmission';

interface JobApplicationModalProps {
  job: JobItem | null;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, onClose }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experienceYears: '1-3 years',
    currentRole: '',
    noticePeriod: 'Immediate',
    coverNote: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<SubmissionResult | null>(null);
  const [confirmedAccuracy, setConfirmedAccuracy] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submittedResult]);

  // Lock body scroll while modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!job) return null;

  const handleModalClose = () => {
    if (submittedResult) {
      // Reset form state if closing from success view
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        qualification: '',
        experienceYears: '1-3 years',
        currentRole: '',
        noticePeriod: 'Immediate',
        coverNote: '',
      });
      setResumeFile(null);
      setSubmissionError(null);
      setSubmittedResult(null);
    }
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submissionError) setSubmissionError(null);
  };

  const handleFile = (file: File) => {
    setFileError(null);
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileError('Please upload a valid PDF, DOC, or DOCX document.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5 MB limit. Please choose a smaller file.');
      return;
    }
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      const result = await submitCareerApplication({
        FullName: formData.fullName,
        Phone: formData.phone,
        Email: formData.email,
        Qualification: formData.qualification,
        Experience: formData.experienceYears,
        NoticePeriod: formData.noticePeriod,
        CurrentHospital: formData.currentRole,
        CoverNote: formData.coverNote,
        Position: job.title,
        Department: job.department,
        Location: job.location || 'SilverLine Hospital, Trichy',
        ResumeFile: resumeFile,
        ResumeFileName: resumeFile ? resumeFile.name : '',
        ResumeFileSize: resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : '',
      });

      // STRICT VALIDATION: Show success popup ONLY after confirmed response!
      if (result.success && result.referenceId) {
        setSubmittedResult(result);
      } else {
        // Prevent false success popup; display helpful retry message
        setSubmissionError(
          result.error || 'Application could not be submitted. Please try again.'
        );
      }
    } catch (err: any) {
      setSubmissionError(
        err?.message || 'Application could not be submitted. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const refId = submittedResult?.referenceId || '';
  const mailtoSubject = encodeURIComponent(
    `Application for ${job.title} - Ref: ${refId || 'Direct'}`
  );
  const mailtoBody = encodeURIComponent(
    `Dear SilverLine Hospital HR Team,\n\nI have applied for the position of ${job.title} (Department: ${job.department}).\nReference ID: ${refId}\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nQualification: ${formData.qualification}\nExperience: ${formData.experienceYears}\nCurrent Hospital/Org: ${formData.currentRole || 'N/A'}\nNotice Period: ${formData.noticePeriod}\n\nPlease find my resume attached for your kind perusal.\n\nThank you,\n${formData.fullName}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleModalClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-job-title"
    >
      <style>{`
        @keyframes circleDraw {
          0% {
            stroke-dasharray: 151;
            stroke-dashoffset: 151;
          }
          100% {
            stroke-dasharray: 151;
            stroke-dashoffset: 0;
          }
        }
        @keyframes checkDraw {
          0% {
            stroke-dasharray: 38;
            stroke-dashoffset: 38;
          }
          100% {
            stroke-dasharray: 38;
            stroke-dashoffset: 0;
          }
        }
        @keyframes modalPopIn {
          0% {
            transform: scale(0.96);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-circle-draw {
          animation: circleDraw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .animate-check-draw {
          stroke-dasharray: 38;
          stroke-dashoffset: 38;
          animation: checkDraw 0.45s cubic-bezier(0.65, 0, 0.45, 1) 0.45s forwards;
        }
        .animate-pop-in {
          animation: modalPopIn 0.25s ease-out forwards;
        }
      `}</style>

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 transition-all border border-gray-100 animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#0E2A47] text-white p-6 sm:p-7 relative">
          <button
            onClick={handleModalClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00B5A5]/20 text-[#00E5D0] border border-[#00B5A5]/30">
              {job.department}
            </span>
            <span className="text-xs text-slate-300">• {job.type}</span>
          </div>

          <h3 id="modal-job-title" className="text-2xl font-bold text-white tracking-tight">
            {submittedResult ? 'Application Status' : `Apply: ${job.title}`}
          </h3>
          <p className="text-sm text-slate-300 mt-1 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#00B5A5]" />
            SilverLine Hospital, Palur, Trichy
          </p>
        </div>

        {/* Modal Body */}
        {submittedResult ? (
          /* =========================================================
             CONFIRMED SUCCESS POPUP WITH ANIMATED CHECK/TICK
             ========================================================= */
          <div className="p-7 sm:p-10 text-center space-y-6">
            {/* Animated SVG Check / Tick */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <svg className="w-20 h-20 text-[#00B5A5]" viewBox="0 0 52 52">
                <circle
                  cx="26"
                  cy="26"
                  r="24"
                  fill="#F0FDFA"
                  stroke="#00B5A5"
                  strokeWidth="2.75"
                  className="animate-circle-draw"
                />
                <path
                  fill="none"
                  stroke="#00B5A5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.5 26.5l7.5 7.5 16-16"
                  className="animate-check-draw"
                />
              </svg>
            </div>

            {/* Header & Confirmation */}
            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-[#0E2A47] tracking-tight uppercase">
                Application Submitted
              </h4>
              <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                Your application has been successfully received by{' '}
                <strong className="text-[#0E2A47]">SilverLine Hospital HR</strong>.
              </p>
            </div>

            {/* Role & Candidate Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-xs text-slate-700">
              <span className="font-semibold text-[#0E2A47]">{job.title}</span>
              <span className="text-slate-400">•</span>
              <span>{submittedResult.submittedName}</span>
            </div>

            {/* Reference ID Card */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 max-w-md mx-auto text-center space-y-2 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Reference ID
              </span>
              <div className="text-2xl font-mono font-extrabold text-[#0E2A47] tracking-wider selection:bg-[#00B5A5]/20">
                {submittedResult.referenceId}
              </div>
              <div className="text-xs text-slate-500 pt-1 leading-relaxed">
                {resumeFile ? (
                  <span>
                    Candidate details recorded in HR Google Sheet. Resume file{' '}
                    <strong className="text-slate-700 font-semibold">{resumeFile.name}</strong> (
                    {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB) logged for review.
                  </span>
                ) : (
                  <span>
                    Candidate details recorded in HR Google Sheet. Our HR Talent Acquisition team will
                    review your profile and reach out for interview scheduling.
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={`mailto:careers@silverlinehospitals.com?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-4 h-4 text-gray-500" />
                Email Resume Directly to HR
              </a>
              <button
                onClick={handleModalClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl bg-[#00B5A5] text-white text-xs sm:text-sm font-semibold hover:bg-[#0E2A47] transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================
             APPLICATION FORM
             ========================================================= */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Error Notification banner if previous submit failed */}
            {submissionError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm space-y-1">
                  <div className="font-bold text-rose-900">Application could not be submitted</div>
                  <div>{submissionError}</div>
                  <div className="text-xs text-rose-700 pt-0.5">
                    Your entered data has been preserved. Please verify your internet connection and try clicking <strong>Retry Application</strong> below.
                  </div>
                </div>
              </div>
            )}

            {/* Candidate Basics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Dr. Priya Rajan / Ramesh K"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500 pointer-events-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email & Highest Qualification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="candidate@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Highest Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  required
                  placeholder="e.g. MBBS, MD, B.Sc Nursing, GNM, B.Pharm"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Experience & Notice Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Relevant Experience <span className="text-red-500">*</span>
                </label>
                <select
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent bg-white transition-all"
                >
                  <option value="Fresher (0 years)">Fresher / Recent Graduate</option>
                  <option value="1-3 years">1–3 Years</option>
                  <option value="3-5 years">3–5 Years</option>
                  <option value="5-8 years">5–8 Years</option>
                  <option value="8+ years">8+ Years Experience</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Notice Period <span className="text-red-500">*</span>
                </label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent bg-white transition-all"
                >
                  <option value="Immediate">Immediate / Within 7 Days</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days (1 Month)</option>
                  <option value="45 Days">45 Days</option>
                  <option value="60 Days">60 Days (2 Months)</option>
                </select>
              </div>
            </div>

            {/* Current Hospital / Organization */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Current Hospital / Employer (Optional)
              </label>
              <input
                type="text"
                name="currentRole"
                placeholder="e.g. Apollo / Kauvery / Government Medical College"
                value={formData.currentRole}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all"
              />
            </div>

            {/* Resume Upload Drag & Drop */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Upload Resume / CV
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {!resumeFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-[#00B5A5] bg-[#00B5A5]/5'
                      : 'border-gray-300 hover:border-[#00B5A5] hover:bg-gray-50/70'
                  }`}
                >
                  <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">
                    <span className="text-[#00B5A5] font-semibold">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, or DOCX (Max file size: 5 MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-[#00B5A5]/10 text-[#00B5A5] rounded-lg shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold text-gray-900 truncate">
                        {resumeFile.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready to attach
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {fileError && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {fileError}
                </p>
              )}
            </div>

            {/* Cover Note / Clinical Strengths */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Key Clinical Skills / Cover Note (Optional)
              </label>
              <textarea
                name="coverNote"
                rows={3}
                placeholder="Briefly mention your clinical areas of expertise, registrations (TNMC/TNC), or key career achievements..."
                value={formData.coverNote}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:border-transparent transition-all"
              />
            </div>

            {/* Checkbox confirmation */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="accuracy-check"
                type="checkbox"
                required
                checked={confirmedAccuracy}
                onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-[#00B5A5] border-gray-300 rounded focus:ring-[#00B5A5]"
              />
              <label htmlFor="accuracy-check" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                I hereby declare that all information provided in this application is accurate and true to the best of my knowledge.
              </label>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-500 text-center sm:text-left">
                Need assistance? Contact HR at <span className="font-semibold text-gray-700">+91 431 290 6470</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#00B5A5] hover:bg-[#0E2A47] rounded-lg shadow-sm transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <>
                      {submissionError ? 'Retry Application' : 'Submit Application'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
