
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, UserCheck, Activity, Users } from 'lucide-react';

const AdminAnalytics = () => {
  // Mock data for analytics
  const appointmentData = [
    { name: 'Jan', count: 65 },
    { name: 'Feb', count: 80 },
    { name: 'Mar', count: 110 },
    { name: 'Apr', count: 95 },
    { name: 'May', count: 130 },
  ];

  const userRegistrationData = [
    { name: 'Jan', patients: 45, doctors: 12 },
    { name: 'Feb', patients: 52, doctors: 15 },
    { name: 'Mar', patients: 61, doctors: 19 },
    { name: 'Apr', patients: 48, doctors: 10 },
    { name: 'May', patients: 64, doctors: 20 },
  ];
  
  // Stats summary
  const stats = [
    {
      title: "Total Users",
      value: "2,546",
      icon: Users,
      description: "Patients and doctors",
      change: "+15%",
      iconClassName: "bg-blue-100 text-blue-600"
    },
    {
      title: "Active Doctors",
      value: "152",
      icon: UserCheck,
      description: "Verified professionals",
      change: "+8%",
      iconClassName: "bg-green-100 text-green-600"
    },
    {
      title: "Monthly Appointments",
      value: "1,245",
      icon: Calendar,
      description: "Booked sessions",
      change: "+24%",
      iconClassName: "bg-purple-100 text-purple-600"
    },
    {
      title: "Platform Uptime",
      value: "99.9%",
      icon: Activity,
      description: "Last 30 days",
      change: "0.1%",
      iconClassName: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">System Analytics</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex">
              <div className={`${stat.iconClassName} p-3 rounded-full h-12 w-12 flex items-center justify-center mr-4`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="flex items-center text-xs">
                  <span className={stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">{stat.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* User Registrations Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userRegistrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="patients" stroke="#8884d8" />
                  <Line type="monotone" dataKey="doctors" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
