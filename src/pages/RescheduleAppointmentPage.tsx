
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const RescheduleAppointmentPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();

  const handleReschedule = () => {
    // In a real app, this would involve a form and API call
    toast({
      title: "Reschedule Requested",
      description: `Reschedule initiated for appointment ${appointmentId}. You would typically select a new date/time here.`,
    });
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft size={16} className="mr-2" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Reschedule Appointment (ID: {appointmentId})</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            This is a placeholder page for rescheduling appointment <span className="font-semibold">{appointmentId}</span>.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="newDate" className="block text-sm font-medium text-gray-700">New Date & Time</label>
              {/* In a real app, use a date picker and time picker here */}
              <input type="datetime-local" id="newDate" name="newDate" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <Button onClick={handleReschedule} className="w-full">
              <Calendar size={16} className="mr-2" />
              Request Reschedule
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Functionality to select a new date/time and confirm the reschedule would be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RescheduleAppointmentPage;
