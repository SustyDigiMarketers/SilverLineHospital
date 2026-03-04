import React, { useState, useContext, useMemo, useEffect } from 'react';
import { MasterSetupContext } from '../MasterSetupProvider';
import type { Doctor } from '../../../lib/doctorsData';

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
];

const DoctorScheduleManager: React.FC = () => {
    const { config, updateConfig } = useContext(MasterSetupContext);
    const doctors: Doctor[] = config.doctors?.list || [];
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || '');
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [successMessage, setSuccessMessage] = useState('');

    const schedules = config.doctorSchedules || {};

    // This effect synchronizes the selected doctor with the master list of doctors.
    // If a doctor is added or deleted, it ensures the selection remains valid.
    useEffect(() => {
        const doctorExists = doctors.some(d => d.id === selectedDoctorId);
        if ((!doctorExists || !selectedDoctorId) && doctors.length > 0) {
            setSelectedDoctorId(doctors[0].id);
        } else if (doctors.length === 0) {
            setSelectedDoctorId('');
        }
    }, [doctors, selectedDoctorId]);

    const availableSlotsForSelectedDate = useMemo(() => {
        return schedules[selectedDoctorId]?.[selectedDate] || [];
    }, [schedules, selectedDoctorId, selectedDate]);

    const handleSlotChange = (timeSlot: string, isChecked: boolean) => {
        // FIX: Explicitly type `currentSlots` as a `Set<string>` to resolve downstream type inference issues. The `availableSlotsForSelectedDate` variable is inferred as `any[]`, which causes `new Set()` to create a `Set<unknown>`, leading to a type error when sorting.
        const currentSlots = new Set<string>(availableSlotsForSelectedDate);
        if (isChecked) {
            currentSlots.add(timeSlot);
        } else {
            currentSlots.delete(timeSlot);
        }
        
        const newSlots = Array.from(currentSlots).sort((a, b) => timeSlots.indexOf(a) - timeSlots.indexOf(b));
        const configKey = `doctorSchedules.${selectedDoctorId}.${selectedDate}`;
        updateConfig(configKey, newSlots.length > 0 ? newSlots : undefined, 'Schedule Update');
    };
    
    const handleSave = () => {
        // The config is updated on every checkbox change, so this is more for user feedback
        setSuccessMessage(`Schedule for ${doctors.find(d => d.id === selectedDoctorId)?.name} on ${selectedDate} has been updated.`);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Manage Doctor Schedules</h3>
            
            {successMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 mb-4 rounded-md" role="status">
                    <p>{successMessage}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="doctor-select" className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                    <select
                        id="doctor-select"
                        value={selectedDoctorId}
                        onChange={e => setSelectedDoctorId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5]"
                    >
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                    <input
                        type="date"
                        id="date-select"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#00B5A5] focus:border-[#00B5A5]"
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
            </div>

            {selectedDoctorId && selectedDate && (
                <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Available Time Slots</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {timeSlots.map(slot => (
                            <label key={slot} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={availableSlotsForSelectedDate.includes(slot)}
                                    onChange={e => handleSlotChange(slot, e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-300 text-[#00B5A5] focus:ring-[#00B5A5]"
                                />
                                <span className="text-sm text-gray-700">{slot}</span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-6 text-right">
                         <button
                            onClick={handleSave}
                            className="px-6 py-2 text-sm font-medium text-white bg-[#00B5A5] rounded-md hover:bg-[#0E2A47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
                        >
                            Confirm Updates
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorScheduleManager;