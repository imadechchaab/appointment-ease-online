
import { 
  Users, 
  UserCheck,
  AlertTriangle,
  BarChart,
  Calendar,
  Star,
  ChevronRight,
  Search,
  Settings,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// Mock data for doctors pending approval
const pendingDoctors = [
  {
    id: "1",
    name: "Dr. Mark Thompson",
    specialization: "Neurology",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    appliedOn: "2025-05-10"
  },
  {
    id: "2",
    name: "Dr. Laura Garcia",
    specialization: "Pediatrics",
    image: "https://randomuser.me/api/portraits/women/78.jpg",
    appliedOn: "2025-05-12"
  },
  {
    id: "3",
    name: "Dr. James Wilson",
    specialization: "Cardiology",
    image: "https://randomuser.me/api/portraits/men/45.jpg", 
    appliedOn: "2025-05-13"
  }
];

// Mock data for system users
const recentUsers = [
  {
    id: "1",
    name: "John Smith",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    joinedOn: "2025-05-01",
    status: "active"
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    role: "Doctor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    joinedOn: "2025-04-28",
    status: "active"
  },
  {
    id: "3",
    name: "Robert Davis",
    role: "Patient",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    joinedOn: "2025-05-05",
    status: "blocked"
  },
  {
    id: "4",
    name: "Dr. Emily Chen",
    role: "Doctor",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    joinedOn: "2025-05-02",
    status: "active"
  }
];

// Mock data for system statistics
const systemStats = {
  totalPatients: 1245,
  totalDoctors: 87,
  activeAppointments: 156,
  monthlySessions: 428,
  averageRating: 4.7
};

// Mock data for recent appointments
const recentAppointments = [
  {
    id: "1", 
    doctor: "Dr. Sarah Johnson",
    patient: "John Smith",
    date: "2025-05-14",
    time: "10:30 AM",
    status: "completed"
  },
  {
    id: "2",
    doctor: "Dr. Emily Chen",
    patient: "Mary Johnson",
    date: "2025-05-14",
    time: "11:45 AM",
    status: "completed"
  },
  {
    id: "3",
    doctor: "Dr. James Wilson",
    patient: "Robert Davis",
    date: "2025-05-14",
    time: "2:15 PM",
    status: "ongoing"
  }
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Filter users based on search term
  const filteredUsers = searchTerm
    ? recentUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recentUsers;
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-medical-blue/80 to-medical-darkblue text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
              <p className="mt-2 text-white/80">MediBook Administrator Dashboard</p>
            </div>
            
            <Button 
              className="mt-4 md:mt-0 bg-white text-medical-blue hover:bg-gray-100"
            >
              <Settings size={16} className="mr-2" /> System Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <Users className="text-medical-blue w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Patients</p>
              <h3 className="text-2xl font-bold">{systemStats.totalPatients}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-100 p-4 rounded-full">
              <UserCheck className="text-green-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Doctors</p>
              <h3 className="text-2xl font-bold">{systemStats.totalDoctors}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-purple-100 p-4 rounded-full">
              <Calendar className="text-purple-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Appointments</p>
              <h3 className="text-2xl font-bold">{systemStats.activeAppointments}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-yellow-100 p-4 rounded-full">
              <TrendingUp className="text-yellow-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Monthly Sessions</p>
              <h3 className="text-2xl font-bold">{systemStats.monthlySessions}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-orange-100 p-4 rounded-full">
              <Star className="text-orange-500 w-8 h-8" fill="currentColor" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Average Rating</p>
              <h3 className="text-2xl font-bold">{systemStats.averageRating}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Doctor Approval Requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Doctor Approval Requests</h2>
          <Button 
            variant="outline" 
            className="text-sm"
          >
            View All
          </Button>
        </div>
        
        {pendingDoctors.length > 0 ? (
          <Card>
            <div className="divide-y">
              {pendingDoctors.map((doctor) => (
                <div key={doctor.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                      <p className="text-sm text-gray-500">
                        {doctor.specialization} • Applied on {formatDate(doctor.appliedOn)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-red-500 border-red-300 hover:bg-red-50">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="py-8">
                <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No pending approval requests</h3>
                <p className="mt-1 text-sm text-gray-500">All doctor registration requests have been processed.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* System Users */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">System Users</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Search users..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <div className="divide-y">
              <div className="p-3 bg-gray-50 flex items-center text-sm font-medium text-gray-500">
                <div className="w-12"></div>
                <div className="ml-4 flex-1">User</div>
                <div className="w-24 text-center">Role</div>
                <div className="w-24 text-center hidden md:block">Joined</div>
                <div className="w-24 text-center">Status</div>
                <div className="w-16"></div>
              </div>
              
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 flex items-center">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-800">{user.name}</h4>
                    <p className="text-sm text-gray-500 hidden md:block">User #{user.id}</p>
                  </div>
                  
                  <div className="w-24 text-center">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      user.role === 'Patient' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="w-24 text-center hidden md:block">
                    <span className="text-sm text-gray-500">
                      {formatDate(user.joinedOn)}
                    </span>
                  </div>
                  
                  <div className="w-24 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'active' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1"></span>
                          Active
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1"></span>
                          Blocked
                        </>
                      )}
                    </span>
                  </div>
                  
                  <div className="w-16 text-right">
                    <Button variant="ghost" size="sm">
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t text-center">
              <Button variant="outline" className="text-sm">
                View All Users
              </Button>
            </div>
          </Card>
        </div>
        
        {/* System Analytics */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">System Analytics</h2>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-700 mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start">
                    <div className={`p-2 rounded-full ${
                      appointment.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Calendar size={16} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">
                        {appointment.patient} had an appointment with {appointment.doctor}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(appointment.date)} at {appointment.time} • 
                        <span className={`ml-1 ${
                          appointment.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {appointment.status === 'completed' ? 'Completed' : 'Ongoing'}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-700 mb-4">System Performance</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Server Load</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Database Usage</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">API Response Time</span>
                    <span className="font-medium">234ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-medical-blue h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">Weekly Change</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm">New Patients</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">+24</span>
                        <span className="text-xs text-green-500 ml-1">(+12%)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm">New Doctors</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">+3</span>
                        <span className="text-xs text-green-500 ml-1">(+5%)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm">Cancelled Appointments</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">-7</span>
                        <span className="text-xs text-red-500 ml-1">(-3%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full bg-medical-blue hover:bg-medical-darkblue">
                    <BarChart size={16} className="mr-2" /> View Full Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* System Alerts */}
      <Card className="bg-yellow-50 border border-yellow-200">
        <CardContent className="p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">System Notifications</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Database backup scheduled for tonight at 2:00 AM</li>
                  <li>3 new doctor registrations pending approval</li>
                  <li>System update available for scheduling</li>
                </ul>
              </div>
              <div className="mt-4">
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  View All Alerts
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
