
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, Search, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DoctorPatients = () => {
  const navigate = useNavigate();
  // Mock data - replace with actual data fetching
  const patients = [
    { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', lastVisit: '2025-05-10', avatarUrl: 'https://randomuser.me/api/portraits/women/60.jpg' },
    { id: '2', name: 'Bob The Builder', email: 'bob@example.com', lastVisit: '2025-04-22', avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', lastVisit: '2025-06-01', avatarUrl: 'https://randomuser.me/api/portraits/men/78.jpg' },
  ];

  const handleAddPatient = () => {
    navigate('/doctor/patients/add');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">My Patients</h1>
        <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Search patients..." className="pl-10" />
            </div>
            <Button onClick={handleAddPatient} className="bg-medical-blue hover:bg-medical-darkblue">
                <PlusCircle size={16} className="mr-2" /> Add Patient
            </Button>
        </div>
      </div>

      {patients.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">You have no patients yet.</p>
            <Button onClick={handleAddPatient} className="mt-4 bg-medical-blue hover:bg-medical-darkblue">
                <PlusCircle size={16} className="mr-2" /> Add Your First Patient
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {patients.map(patient => (
                                <tr key={patient.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                                                <AvatarFallback>{patient.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Button 
                                          variant="link" 
                                          className="text-medical-blue p-0 h-auto"
                                          onClick={() => navigate(`/doctor/patients/${patient.id}/profile`)}
                                        >
                                          View Profile
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
      )}
      {/* Removed placeholder text */}
    </div>
  );
};

export default DoctorPatients;
