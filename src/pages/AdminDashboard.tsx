
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Users, FileText, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Manage Users",
      description: "View and manage all user accounts.",
      link: "/admin/users",
      icon: <Users className="w-6 h-6 text-medical-blue" />,
    },
    {
      title: "Doctor Approvals",
      description: "Approve or reject new doctor registrations.",
      link: "/admin/approvals",
      icon: <FileText className="w-6 h-6 text-medical-blue" />,
    },
    {
      title: "System Analytics",
      description: "View system usage and performance metrics.",
      link: "/admin/analytics",
      icon: <Activity className="w-6 h-6 text-medical-blue" />,
    },
  ];

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
        <p className="text-gray-600">
          Welcome, {user?.profile?.full_name || user?.email || 'Admin'}! Here's an overview of your system.
        </p>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((item) => (
          <Card 
            key={item.title} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Placeholder for more advanced analytics or quick actions 
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Users: Loading...</p>
          <p>Pending Approvals: Loading...</p>
        </CardContent>
      </Card>
      */}
    </div>
  );
};

export default AdminDashboard;
