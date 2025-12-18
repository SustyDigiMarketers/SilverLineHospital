import React, { useState, useContext } from 'react';
import { MasterSetupContext } from '../MasterSetupProvider';
import JobFormModal from '../JobFormModal';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const JobManager: React.FC = () => {
    const { config, updateConfig } = useContext(MasterSetupContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    const jobs: Job[] = config.career?.jobs || [];

    const openAddModal = () => {
        setEditingJob(null);
        setIsModalOpen(true);
    };

    const openEditModal = (job: Job) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    const handleDelete = (jobId: string) => {
        if (window.confirm('Are you sure you want to delete this job listing?')) {
            const updatedJobs = jobs.filter(job => job.id !== jobId);
            updateConfig('career.jobs', updatedJobs, 'Job Data Update');
        }
    };

    const handleSave = (jobData: Omit<Job, 'id'> | Job) => {
        let updatedJobs: Job[];
        if ('id' in jobData) { // Editing existing job
            updatedJobs = jobs.map(job => (job.id === jobData.id ? jobData : job));
        } else { // Adding new job
            const newJob: Job = { ...jobData, id: `job_${new Date().getTime()}` };
            updatedJobs = [newJob, ...jobs];
        }
        updateConfig('career.jobs', updatedJobs, 'Job Data Update');
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Job Listings Management</h3>
                    <button
                        onClick={openAddModal}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#00B5A5] rounded-md hover:bg-[#0E2A47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                    >
                        Add New Job
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button onClick={() => openEditModal(job)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <JobFormModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    job={editingJob}
                />
            )}
        </>
    );
};

export default JobManager;