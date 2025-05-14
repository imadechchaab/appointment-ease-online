
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCheck, XCircle } from 'lucide-react';

const DoctorAppointments = () => {
  // Mock data - replace with actual data fetching
  const appointments = [
    { id: '1', patientName: 'Alice Wonderland', service: 'Consultation', date: '2025-06-10', time: '10:00 AM', status: 'Confirmed' },
    { id: '2', patientName: 'Bob The Builder', service: 'Follow-up', date: '2025-06-10', time: '11:30 AM', status: 'Pending Confirmation' },
    { id: '3', patientName: 'Charlie Brown', service: 'New Patient Visit', date: '2025-06-11', time: '09:00 AM', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
        {/* Add any relevant actions like "Manage Availability" */}
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <CalendarDays size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">You have no appointments scheduled.</p>
            {/* Potentially link to availability settings */}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map(appt => (
            <Card key={appt.id} className="overflow-hidden">
              <CardHeader className={
                appt.status === 'Confirmed' ? 'bg-blue-50' :
                appt.status === 'Pending Confirmation' ? 'bg-yellow-50' :
                'bg-gray-50' // Completed or other statuses
              }>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{appt.patientName}</CardTitle>
                        <p className="text-sm text-gray-600">{appt.service}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        appt.status === 'Confirmed' ? 'bg-blue-200 text-blue-800' :
                        appt.status === 'Pending Confirmation' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-gray-200 text-gray-800'
                    }`}>
                        {appt.status}
                    </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <p className="text-sm text-gray-700"><strong>Date:</strong> {appt.date}</p>
                <p className="text-sm text-gray-700"><strong>Time:</strong> {appt.time}</p>
                {appt.status === 'Pending Confirmation' && (
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <UserCheck size={14} className="mr-1" /> Confirm
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                        <XCircle size={14} className="mr-1" /> Decline
                    </Button>
                  </div>
                )}
                 {appt.status === 'Confirmed' && (
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Reschedule</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <p className="text-center text-gray-500 text-sm mt-8">This is a placeholder page for Doctor Appointments. Full functionality will be implemented later.</p>
    </div>
  );
};

export default DoctorAppointments;
