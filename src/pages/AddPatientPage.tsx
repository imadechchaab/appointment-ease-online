
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AddPatientPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, collect form data and send to API
    toast({
      title: "Patient Added (Simulated)",
      description: "The new patient information would be saved here.",
    });
    navigate('/doctor/patients'); // Navigate back to patient list
  };

  return (
    <div className="space-y-6">
       <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft size={16} className="mr-2" />
        Back to Patients
      </Button>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus size={24} className="mr-2" /> Add New Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="patientName">Full Name</Label>
              <Input id="patientName" placeholder="e.g., John Doe" required />
            </div>
            <div>
              <Label htmlFor="patientEmail">Email Address</Label>
              <Input id="patientEmail" type="email" placeholder="e.g., john.doe@example.com" required />
            </div>
            <div>
              <Label htmlFor="patientPhone">Phone Number</Label>
              <Input id="patientPhone" type="tel" placeholder="e.g., (123) 456-7890" />
            </div>
            <div>
              <Label htmlFor="patientDob">Date of Birth</Label>
              <Input id="patientDob" type="date" />
            </div>
            <Button type="submit" className="w-full">Add Patient</Button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            This is a placeholder form for adding a new patient.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPatientPage;
