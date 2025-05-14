
import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  CheckCircle, 
  X, 
  AlertCircle,
  BarChart,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';

// Mock appointment data
const mockAppointments = [
  {
    id: "1",
    patient: {
      name: "John Smith",
      age: 42,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    date: "2025-05-16",
    time: "9:00 AM",
    type: "Checkup",
    status: "confirmed"
  },
  {
    id: "2",
    patient: {
      name: "Mary Johnson",
      age: 35,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    date: "2025-05-16",
    time: "10:30 AM",
    type: "Consultation",
    status: "confirmed"
  },
  {
    id: "3",
    patient: {
      name: "Robert Davis",
      age: 59,
      image: "https://randomuser.me/api/portraits/men/29.jpg"
    },
    date: "2025-05-16",
    time: "1:00 PM",
    type: "Follow-up",
    status: "confirmed"
  },
  {
    id: "4",
    patient: {
      name: "Jennifer Wilson",
      age: 28,
      image: "https://randomuser.me/api/portraits/women/17.jpg"
    },
    date: "2025-05-17",
    time: "11:00 AM",
    type: "Consultation",
    status: "pending"
  },
  {
    id: "5",
    patient: {
      name: "Michael Brown",
      age: 45,
      image: "https://randomuser.me/api/portraits/men/56.jpg"
    },
    date: "2025-05-17",
    time: "2:30 PM",
    type: "Checkup",
    status: "pending"
  }
];

// Mock patient data
const recentPatients = [
  {
    id: "1",
    name: "John Smith",
    age: 42,
    lastVisit: "2025-05-09",
    diagnosis: "Hypertension",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "2",
    name: "Mary Johnson",
    age: 35,
    lastVisit: "2025-05-08",
    diagnosis: "Allergic rhinitis",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "3",
    name: "Robert Davis",
    age: 59,
    lastVisit: "2025-05-07",
    diagnosis: "Diabetes mellitus",
    image: "https://randomuser.me/api/portraits/men/29.jpg"
  }
];

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('today');
  
  // Filter appointments based on tab
  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    
    if (activeTab === 'today') {
      return mockAppointments.filter(appointment => appointment.date === today);
    } else if (activeTab === 'tomorrow') {
      return mockAppointments.filter(appointment => appointment.date === tomorrow);
    } else if (activeTab === 'pending') {
      return mockAppointments.filter(appointment => appointment.status === 'pending');
    }
    
    return mockAppointments;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-medical-blue/80 to-medical-darkblue text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
              <p className="mt-2 text-white/80">
                {user?.specialization} • Your practice dashboard for today.
              </p>
            </div>
            
            <Button 
              className="mt-4 md:mt-0 bg-white text-medical-blue hover:bg-gray-100"
            >
              Update Availability
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-medical-blue/10 p-4 rounded-full">
              <Calendar className="text-medical-blue w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Clock className="text-yellow-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-100 p-4 rounded-full">
              <Users className="text-green-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Patients</p>
              <h3 className="text-2xl font-bold">142</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-purple-100 p-4 rounded-full">
              <TrendingUp className="text-purple-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">This Month</p>
              <h3 className="text-2xl font-bold">32</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Appointment Schedule */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Appointment Schedule</h2>
          <Button 
            variant="outline" 
            className="text-sm"
          >
            View Calendar
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue="today" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today" className="space-y-0 divide-y">
                {mockAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={appointment.patient.image} 
                        alt={appointment.patient.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-800">{appointment.patient.name}</h4>
                        <p className="text-sm text-gray-500">
                          {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:block">
                        {appointment.status === 'confirmed' ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirmed
                          </span>
                        ) : appointment.status === 'pending' ? (
                          <span className="flex items-center text-yellow-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Pending
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500">
                            <X className="w-4 h-4 mr-1" />
                            Cancelled
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="tomorrow" className="space-y-0 divide-y">
                {mockAppointments.slice(3, 5).map((appointment) => (
                  <div key={appointment.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={appointment.patient.image} 
                        alt={appointment.patient.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-800">{appointment.patient.name}</h4>
                        <p className="text-sm text-gray-500">
                          {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:block">
                        {appointment.status === 'confirmed' ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirmed
                          </span>
                        ) : appointment.status === 'pending' ? (
                          <span className="flex items-center text-yellow-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Pending
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500">
                            <X className="w-4 h-4 mr-1" />
                            Cancelled
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-0 divide-y">
                {mockAppointments.filter(a => a.status === 'pending').map((appointment) => (
                  <div key={appointment.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={appointment.patient.image} 
                        alt={appointment.patient.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-800">{appointment.patient.name}</h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(appointment.date)} • {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-red-500 border-red-300 hover:bg-red-50">
                        Decline
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="all" className="space-y-0 divide-y">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={appointment.patient.image} 
                        alt={appointment.patient.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-800">{appointment.patient.name}</h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(appointment.date)} • {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:block">
                        {appointment.status === 'confirmed' ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirmed
                          </span>
                        ) : appointment.status === 'pending' ? (
                          <span className="flex items-center text-yellow-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Pending
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500">
                            <X className="w-4 h-4 mr-1" />
                            Cancelled
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Patients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Patients</h2>
            <Button 
              variant="outline" 
              className="text-sm"
            >
              View All
            </Button>
          </div>
          
          <Card>
            <div className="divide-y">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={patient.image} 
                      alt={patient.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">{patient.name}</h4>
                      <p className="text-sm text-gray-500">
                        {patient.age} years • Last visit: {formatDate(patient.lastVisit)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full mr-3 hidden md:inline-block">
                      {patient.diagnosis}
                    </span>
                    <Button variant="ghost" size="sm" className="text-medical-blue">
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Performance Summary */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Performance</h2>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Appointment Completion</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Patient Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-medical-blue h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Response Time</span>
                    <span className="font-medium">1.2 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">Appointment Stats</h3>
                    <span className="text-xs text-gray-500">This Month</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-medical-blue">32</p>
                      <p className="text-xs text-gray-500 mt-1">Total</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-green-600">28</p>
                      <p className="text-xs text-gray-500 mt-1">Completed</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xl font-bold text-red-500">4</p>
                      <p className="text-xs text-gray-500 mt-1">Cancelled</p>
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
    </div>
  );
};

export default DoctorDashboard;
