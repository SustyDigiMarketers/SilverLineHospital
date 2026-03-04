import React, { useState, useEffect, useRef } from 'react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

interface JobFormModalProps {
  onClose: () => void;
  onSave: (jobData: Omit<Job, 'id'> | Job) => void;
  job: Job | null;
}

const JobFormModal: React.FC<JobFormModalProps> = ({ onClose, onSave, job }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: 'Wellness City',
    type: 'Full-time',
    description: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
      });
    }
    titleInputRef.current?.focus();
  }, [job]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (job) {
      onSave({ ...job, ...formData });
    } else {
      onSave(formData);
    }
  };

  const inputStyles = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00B5A5] focus:border-[#00B5A5] sm:text-sm";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{job ? 'Edit Job Listing' : 'Add New Job Listing'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input ref={titleInputRef} type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={inputStyles} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" name="department" id="department" value={formData.department} onChange={handleChange} required className={inputStyles} />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className={inputStyles} />
            </div>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange} required className={inputStyles}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" rows={5} value={formData.description} onChange={handleChange} required className={inputStyles}></textarea>
          </div>
        </form>
        <div className="p-6 bg-gray-50 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-[#00B5A5] border border-transparent rounded-md shadow-sm hover:bg-[#0E2A47] focus:outline-none"
          >
            Save Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFormModal;