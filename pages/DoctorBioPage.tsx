import React from 'react';

const DoctorBioPage: React.FC<{ doctorId?: string, onBookAppointmentClick?: () => void }> = ({ doctorId, onBookAppointmentClick }) => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-4">Doctor Bio: {doctorId}</h1>
      <p>Placeholder for Doctor Profile Page</p>
    </div>
  );
};

export default DoctorBioPage;
