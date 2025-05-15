
import { Card, CardContent } from '@/components/ui/card';
import { User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminUsers = () => {
  // Mock data for users
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'patient', status: 'Active' },
    { id: '2', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', role: 'doctor', status: 'Active' },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'patient', status: 'Inactive' },
    { id: '4', name: 'Dr. Emily Davis', email: 'emily@example.com', role: 'doctor', status: 'Active' },
    { id: '5', name: 'Robert Wilson', email: 'robert@example.com', role: 'admin', status: 'Active' },
  ];

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: `User ${action}`,
      description: `User ID: ${userId} has been ${action.toLowerCase()}.`,
      variant: action === 'Suspended' ? 'destructive' : 'default',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
        <Button className="bg-medical-blue hover:bg-medical-darkblue">
          Add New User
        </Button>
      </div>
      
      <div className="grid gap-4">
        {users.map(user => (
          <Card key={user.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <User className="text-gray-500" size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'doctor' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      {user.status === 'Active' && (
                        <span className="flex items-center text-xs text-green-600 ml-2">
                          <CheckCircle size={12} className="mr-1" /> {user.status}
                        </span>
                      )}
                      {user.status === 'Inactive' && (
                        <span className="text-xs text-gray-500 ml-2">{user.status}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'Edited')}>
                    Edit
                  </Button>
                  {user.status === 'Active' ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleUserAction(user.id, 'Suspended')}
                    >
                      Suspend
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => handleUserAction(user.id, 'Activated')}
                    >
                      Activate
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
