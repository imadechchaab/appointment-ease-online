import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Plus, Edit, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PatientAppointments = () => {
  const navigate = useNavigate();

  // Mock data for appointments - replace with actual data fetching
  const appointments = [
    { id: 'appt101', doctorName: 'Dr. Emily Carter', specialty: 'Cardiology', date: '2025-06-10', time: '10:00 AM', status: 'Confirmed' },
    { id: 'appt102', doctorName: 'Dr. John Smith', specialty: 'Dermatology', date: '2025-06-15', time: '02:30 PM', status: 'Pending' },
    { id: 'appt103', doctorName: 'Dr. Sarah Lee', specialty: 'Pediatrics', date: '2025-05-20', time: '11:00 AM', status: 'Completed' },
  ];

  const handleCancelAppointment = (appointmentId: string) => {
    // In a real app, this would update appointment status via API
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment (ID: ${appointmentId}) has been cancelled.`,
      variant: "destructive",
    });
    // Optionally, update local state or re-fetch appointments
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <Button onClick={() => navigate('/patient/book-appointment')} className="bg-medical-blue hover:bg-medical-darkblue">
          <Plus size={16} className="mr-2" />
          Book New Appointment
        </Button>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <CalendarCheck size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">You have no appointments scheduled.</p>
            <Button onClick={() => navigate('/patient/book-appointment')} className="mt-4 bg-medical-blue hover:bg-medical-darkblue">
              Book an Appointment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {appointments.map(appt => (
            <Card key={appt.id} className="overflow-hidden">
              <CardHeader className={
                appt.status === 'Confirmed' ? 'bg-green-50' :
                appt.status === 'Pending' ? 'bg-yellow-50' :
                'bg-gray-50'
              }>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{appt.doctorName}</CardTitle>
                    <p className="text-sm text-gray-600">{appt.specialty}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    appt.status === 'Confirmed' ? 'bg-green-200 text-green-800' :
                    appt.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <p className="text-sm text-gray-700"><strong>Date:</strong> {appt.date}</p>
                <p className="text-sm text-gray-700"><strong>Time:</strong> {appt.time}</p>
                <div className="flex space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={appt.status === 'Completed'}
                    onClick={() => appt.status !== 'Completed' && navigate(`/patient/appointments/${appt.id}/reschedule`)}
                  >
                    <Edit size={14} className="mr-1" /> Reschedule
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={appt.status === 'Completed'} 
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-300 hover:border-red-400"
                    onClick={() => appt.status !== 'Completed' && handleCancelAppointment(appt.id)}
                  >
                    <XCircle size={14} className="mr-1" /> Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
