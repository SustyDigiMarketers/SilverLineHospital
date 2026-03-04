import React, { useState, useContext, useMemo, useEffect } from 'react';
import { MasterSetupContext } from '../MasterSetupProvider';
import type { Doctor } from '../../../lib/doctorsData';

const newDoctorTemplate: Omit<Doctor, 'id'> = {
    name: 'New Doctor',
    specialty: 'Specialty',
    image: 'imagePaths.doctors.nirmal', // A default image
    shortBio: '',
    fullBio: '',
    philosophy: '',
    expertise: [],
    social: {
        linkedin: '#',
        twitter: '#',
    }
};

const DoctorManager: React.FC = () => {
    const { config, updateConfig } = useContext(MasterSetupContext);
    const doctors: Doctor[] = config.doctors?.list || [];

    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(doctors[0]?.id || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState<Doctor | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const filteredDoctors = useMemo(() => {
        return doctors.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [doctors, searchQuery]);

    useEffect(() => {
        const doctorToEdit = doctors.find(doc => doc.id === selectedDoctorId);
        if (doctorToEdit) {
            setFormData(JSON.parse(JSON.stringify(doctorToEdit))); // Deep copy
        } else {
            setFormData(null);
        }
    }, [selectedDoctorId, doctors]);
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({
                ...formData,
                social: {
                    ...formData.social,
                    [name]: value
                }
            });
        }
    };
    
    const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const expertiseArray = e.target.value.split(',').map(item => item.trim());
        if (formData) {
            setFormData({ ...formData, expertise: expertiseArray });
        }
    };
    
    const handleAddNewDoctor = () => {
        const newDoctor: Doctor = {
            id: `doctor_${new Date().getTime()}`,
            ...newDoctorTemplate
        };
        const updatedDoctors = [newDoctor, ...doctors];
        updateConfig('doctors.list', updatedDoctors, 'Doctor Added');
        setSelectedDoctorId(newDoctor.id);
    };

    const handleSaveChanges = () => {
        if (!formData) return;
        
        const updatedDoctors = doctors.map(doc => doc.id === formData.id ? formData : doc);
        updateConfig('doctors.list', updatedDoctors, 'Doctor Details Updated');
        
        setSuccessMessage('Changes saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleDeleteDoctor = () => {
        if (!selectedDoctorId) return;
        setIsDeleteModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (!selectedDoctorId) return;
        
        const updatedDoctors = doctors.filter(doc => doc.id !== selectedDoctorId);
        updateConfig('doctors.list', updatedDoctors, 'Doctor Deleted');
        
        setIsDeleteModalOpen(false);
        setSelectedDoctorId(updatedDoctors.length > 0 ? updatedDoctors[0].id : null);
        setFormData(null);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const inputStyles = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00B5A5] focus:border-[#00B5A5] sm:text-sm";

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {isDeleteModalOpen && formData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
                    <div
                        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-6 transform animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-confirmation-title"
                    >
                        <h2 id="delete-confirmation-title" className="text-lg font-bold text-gray-900">Confirm Deletion</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to permanently delete the profile for <strong className="text-gray-800">{formData.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Manage Doctor Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Doctor List */}
                <div className="md:col-span-1 border-r pr-6 flex flex-col">
                    <div className="relative mb-4">
                        <input
                            type="search"
                            placeholder="Search doctors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-full"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={handleAddNewDoctor}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#00B5A5] rounded-md hover:bg-[#0E2A47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                        >
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add New Doctor
                        </button>
                    </div>
                    <ul className="space-y-2 flex-grow overflow-y-auto max-h-[55vh]">
                        {filteredDoctors.map(doc => (
                            <li key={doc.id}>
                                <button
                                    onClick={() => setSelectedDoctorId(doc.id)}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedDoctorId === doc.id ? 'bg-[#00B5A5] text-white' : 'hover:bg-gray-100'}`}
                                >
                                    {doc.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Column: Editor */}
                <div className="md:col-span-2">
                    {formData ? (
                        <div className="flex flex-col h-full">
                            <div className="space-y-4 flex-grow overflow-y-auto pr-2 max-h-[70vh]">
                                {successMessage && <div className="bg-green-100 text-green-800 p-2 rounded-md text-sm">{successMessage}</div>}
                                
                                <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Specialty</label>
                                    <input type="text" name="specialty" value={formData.specialty} onChange={handleFormChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Image Path</label>
                                    <input type="text" name="image" value={formData.image} onChange={handleFormChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Short Bio</label>
                                    <textarea name="shortBio" rows={2} value={formData.shortBio} onChange={handleFormChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Full Bio</label>
                                    <textarea name="fullBio" rows={5} value={formData.fullBio} onChange={handleFormChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Philosophy</label>
                                    <textarea name="philosophy" rows={3} value={formData.philosophy} onChange={handleFormChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Areas of Expertise (comma-separated)</label>
                                    <input type="text" name="expertise" value={formData.expertise.join(', ')} onChange={handleExpertiseChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">LinkedIn URL</label>
                                    <input name="linkedin" type="url" value={formData.social.linkedin} onChange={handleSocialChange} className={inputStyles} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Twitter URL</label>
                                    <input name="twitter" type="url" value={formData.social.twitter} onChange={handleSocialChange} className={inputStyles} />
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t flex-shrink-0 flex items-center justify-end gap-4">
                                <button
                                    onClick={handleDeleteDoctor}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-6 py-2 text-sm font-medium text-white bg-[#0E2A47] rounded-md hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Select a doctor from the list to view and edit their details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorManager;