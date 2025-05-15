
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminDoctorApprovals = () => {
  // Mock data for doctor approval requests
  const approvalRequests = [
    { 
      id: '1', 
      name: 'Dr. James Wilson', 
      email: 'james@example.com', 
      specialization: 'Cardiology',
      experience: '10 years',
      dateApplied: '2025-05-10',
    },
    { 
      id: '2', 
      name: 'Dr. Maria Garcia', 
      email: 'maria@example.com', 
      specialization: 'Neurology',
      experience: '8 years',
      dateApplied: '2025-05-11',
    },
    { 
      id: '3', 
      name: 'Dr. Robert Chen', 
      email: 'robert@example.com', 
      specialization: 'Pediatrics',
      experience: '12 years',
      dateApplied: '2025-05-12',
    },
  ];

  const handleApprove = (id: string, name: string) => {
    toast({
      title: "Doctor Approved",
      description: `${name}'s account has been approved.`,
      variant: "default",
    });
  };

  const handleReject = (id: string, name: string) => {
    toast({
      title: "Doctor Application Rejected",
      description: `${name}'s account has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Doctor Approval Requests</h1>
      </div>
      
      {approvalRequests.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">No pending doctor approval requests.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {approvalRequests.map(request => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="bg-yellow-50 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <User className="text-yellow-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{request.name}</p>
                      <p className="text-sm text-gray-500">{request.email}</p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending Approval</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-medium">{request.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{request.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Applied</p>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-500" />
                      <span>{request.dateApplied}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleApprove(request.id, request.name)}
                  >
                    <CheckCircle size={16} className="mr-1" /> Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleReject(request.id, request.name)}
                  >
                    <XCircle size={16} className="mr-1" /> Reject
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

export default AdminDoctorApprovals;
