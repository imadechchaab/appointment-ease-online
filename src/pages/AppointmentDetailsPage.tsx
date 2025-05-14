
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AppointmentDetailsPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();

  // In a real app, fetch appointment details using appointmentId

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft size={16} className="mr-2" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details (ID: {appointmentId})</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            This is a placeholder page for viewing the details of appointment <span className="font-semibold">{appointmentId}</span>.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Full appointment information, patient data, and any relevant notes would be displayed here.
          </p>
          {/* Add more detailed mock data or structure as needed */}
          <div className="mt-6 space-y-2">
            <p><strong>Patient Name:</strong> Mock Patient Name</p>
            <p><strong>Service:</strong> Mock Service</p>
            <p><strong>Date:</strong> 2025-07-10</p>
            <p><strong>Time:</strong> 10:00 AM</p>
            <p><strong>Status:</strong> Confirmed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentDetailsPage;
