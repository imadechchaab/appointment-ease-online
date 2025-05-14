import { Calendar, Clock, AlertCircle, CheckCircle, X, FileText as FileTextIcon } from 'lucide-react'; // Renamed FileText to FileTextIcon to avoid conflict
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

// Mock medical records data - kept for stats card if needed elsewhere, but section removed.
// const recentMedicalRecords = [ ... ]; // This data is no longer used directly on this page.

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed to 2 columns */}
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
        
        {/* Medical Records Stat Card Removed */}
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-100 p-4 rounded-full"> {/* Was green-100, changed for variety as only 2 cards now */}
              <Clock className="text-blue-600 w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Past Consultations</p> {/* Changed from Consultations to Past Consultations for clarity */}
              <h3 className="text-2xl font-bold">12</h3> {/* Mock data */}
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
            onClick={() => navigate('/patient/appointments')} // This should navigate to the new PatientAppointments page
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
      
      {/* Recent Medical Records Section Removed */}
      
      {/* Health Tips Section Removed */}
    </div>
  );
};

export default PatientDashboard;
