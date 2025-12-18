export interface Patient {
  id: string;
  name: string;
  mobile: string;
  upcomingAppointments: { date: string, time: string, doctor: string, specialty: string }[];
  appointmentHistory: { date: string, doctor: string, specialty: string, details: string }[];
  medicalRecords: { name: string, date: string, type: 'Lab Result' | 'Imaging' | 'Note' }[];
  messages: { from: string, snippet: string, isRead: boolean, date: string }[];
}

export const mockPatients: Record<string, Patient> = {
  'P12345': {
    id: 'P12345',
    name: 'Jane Doe',
    mobile: '9876543210',
    upcomingAppointments: [
      { date: 'October 25, 2023', time: '10:30 AM', doctor: 'Dr. Evelyn Reed', specialty: 'Cardiology' },
      { date: 'November 15, 2023', time: '2:00 PM', doctor: 'Dr. Ben Carter', specialty: 'Dermatology' },
    ],
    appointmentHistory: [
      { date: 'September 12, 2023', doctor: 'Dr. Anya Sharma', specialty: 'Pediatrics', details: 'Annual Checkup' },
      { date: 'July 5, 2023', doctor: 'Dr. Marcus Chen', specialty: 'Dentistry', details: 'Dental Cleaning' },
      { date: 'April 20, 2023', doctor: 'Dr. Evelyn Reed', specialty: 'Cardiology', details: 'Follow-up Consultation' },
    ],
    medicalRecords: [
      { name: 'Annual Blood Test Results', date: 'Sep 15, 2023', type: 'Lab Result' },
      { name: 'Chest X-Ray Report', date: 'Apr 22, 2023', type: 'Imaging' },
      { name: 'Consultation Notes', date: 'Apr 20, 2023', type: 'Note' },
    ],
    messages: [
      { from: 'Dr. Evelyn Reed', snippet: 'Your recent test results are in...', isRead: false, date: 'Oct 18, 2023' },
      { from: 'Office Manager', snippet: 'Reminder: Upcoming appointment...', isRead: true, date: 'Oct 15, 2023' },
    ]
  },
  'P67890': {
    id: 'P67890',
    name: 'John Smith',
    mobile: '8765432109',
    upcomingAppointments: [
      { date: 'November 2, 2023', time: '9:00 AM', doctor: 'Dr. S. Shankar', specialty: 'Gastroenterology' },
    ],
    appointmentHistory: [
      { date: 'August 1, 2023', doctor: 'Dr. M. Nirmal', specialty: 'Orthopedics', details: 'Knee pain follow-up' },
      { date: 'June 20, 2023', doctor: 'Dr. Sridhar Sinnakkalai', specialty: 'General Medicine', details: 'Annual Physical' },
    ],
    medicalRecords: [
      { name: 'MRI Report - Right Knee', date: 'Aug 2, 2023', type: 'Imaging' },
    ],
    messages: [
      { from: 'Dr. S. Shankar', snippet: 'Please fast before your procedure.', isRead: true, date: 'Oct 28, 2023' },
    ]
  }
};
