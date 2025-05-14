
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';

const ViewPatientProfilePage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  // Mock patient data - replace with actual data fetching using patientId
  const patient = {
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    phone: '(555) 123-4567',
    dob: '1990-07-26',
    avatarUrl: 'https://randomuser.me/api/portraits/women/60.jpg',
    lastVisit: '2025-05-10',
    medicalHistorySummary: 'Generally healthy, seasonal allergies.',
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft size={16} className="mr-2" />
        Back to Patients
      </Button>
      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
            <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{patient.name} (ID: {patientId})</CardTitle>
          <CardDescription>Patient Profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <Mail size={18} className="text-gray-500" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <Phone size={18} className="text-gray-500" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <CalendarIcon size={18} className="text-gray-500" />
              <span>Born on {patient.dob}</span>
            </div>
             <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <CalendarIcon size={18} className="text-gray-500" />
              <span>Last Visit: {patient.lastVisit}</span>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">Medical History Summary</h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{patient.medicalHistorySummary}</p>
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center">
            This is a placeholder page for viewing patient <span className="font-semibold">{patientId}</span>'s profile.
            More detailed medical records, appointment history, and notes would be available here.
          </p>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline">View Full Medical Record</Button>
            <Button>Book New Appointment for Patient</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewPatientProfilePage;
