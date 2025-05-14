
import { Calendar, Clock, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock appointment data
const upcomingAppointments = [
  {
    id: "1",
    doctor: {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    date: "2025-05-18",
    time: "10:30 AM",
    status: "confirmed"
  },
  {
    id: "2",
    doctor: {
      name: "Dr. Michael Brown",
      specialization: "Dermatology",
      image: "https://randomuser.me/api/portraits/men/92.jpg"
    },
    date: "2025-05-25",
    time: "2:00 PM",
    status: "pending"
  }
];

// Mock medical records data
const recentMedicalRecords = [
  {
    id: "1",
    title: "Blood Test Results",
    date: "2025-05-01",
    doctor: "Dr. Sarah Johnson",
    type: "Lab Report"
  },
  {
    id: "2",
    title: "Annual Physical Checkup",
    date: "2025-04-15",
    doctor: "Dr. James Wilson",
    type: "Examination"
  },
  {
    id: "3",
    title: "Prescription Renewal",
    date: "2025-04-22",
    doctor: "Dr. Sarah Johnson",
    type: "Prescription"
  }
];

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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
              <p className="mt-2 text-white/80">Your health dashboard is ready for you.</p>
            </div>
            
            <Button 
              className="mt-4 md:mt-0 bg-white text-medical-blue hover:bg-gray-100"
              onClick={() => navigate('/patient/book-appointment')}
            >
              Book New Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-medical-blue/10 p-4 rounded-full">
              <Calendar className="text-medical-blue w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold">{upcomingAppointments.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-100 p-4 rounded-full">
              <FileText className="text-green-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Medical Records</p>
              <h3 className="text-2xl font-bold">{recentMedicalRecords.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <Clock className="text-blue-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Consultations</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
          <Button 
            variant="outline" 
            className="text-sm"
            onClick={() => navigate('/patient/appointments')}
          >
            View All
          </Button>
        </div>
        
        {upcomingAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <img 
                      src={appointment.doctor.image} 
                      alt={appointment.doctor.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-800">{appointment.doctor.name}</h3>
                      <p className="text-sm text-gray-500">{appointment.doctor.specialization}</p>
                      
                      <div className="flex items-center mt-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="ml-2 text-sm">{formatDate(appointment.date)}</span>
                      </div>
                      
                      <div className="flex items-center mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="ml-2 text-sm">{appointment.time}</span>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        {appointment.status === 'confirmed' ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="ml-1 text-sm font-medium">Confirmed</span>
                          </div>
                        ) : appointment.status === 'pending' ? (
                          <div className="flex items-center text-yellow-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="ml-1 text-sm font-medium">Pending</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <X className="w-4 h-4" />
                            <span className="ml-1 text-sm font-medium">Cancelled</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">You have no upcoming appointments.</p>
              <Button 
                className="mt-4 bg-medical-blue hover:bg-medical-darkblue"
                onClick={() => navigate('/patient/book-appointment')}
              >
                Book an Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Recent Medical Records */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Medical Records</h2>
          <Button 
            variant="outline" 
            className="text-sm"
            onClick={() => navigate('/patient/records')}
          >
            View All
          </Button>
        </div>
        
        <Card>
          <div className="divide-y">
            {recentMedicalRecords.map((record) => (
              <div key={record.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800">{record.title}</h4>
                    <p className="text-sm text-gray-500">
                      {record.doctor} • {formatDate(record.date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full">
                    {record.type}
                  </span>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Health Tips */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Health Tips & Reminders</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-600">Annual checkup reminder</h3>
              <div className="mt-1 text-sm text-blue-500">
                <p>It's time for your annual physical checkup. Schedule an appointment soon.</p>
              </div>
              <div className="mt-2">
                <Button 
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => navigate('/patient/book-appointment')}
                >
                  Schedule Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
