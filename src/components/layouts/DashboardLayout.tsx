
import { ReactNode, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Search, 
  Settings, 
  LogOut, 
  Menu, 
  Users, 
  Activity, 
  FileText,
  Home,
  Plus
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Navigation items based on user role
  const navigationItems = {
    patient: [
      { name: 'Dashboard', icon: Home, path: '/patient' },
      { name: 'Find Doctors', icon: Search, path: '/find-doctor' },
      { name: 'My Appointments', icon: Calendar, path: '/patient/appointments' },
      { name: 'Medical Records', icon: FileText, path: '/patient/records' },
    ],
    doctor: [
      { name: 'Dashboard', icon: Home, path: '/doctor' },
      { name: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
      { name: 'Patients', icon: Users, path: '/doctor/patients' },
      { name: 'Medical Records', icon: FileText, path: '/doctor/records' },
    ],
    admin: [
      { name: 'Dashboard', icon: Home, path: '/admin' },
      { name: 'Manage Users', icon: Users, path: '/admin/users' },
      { name: 'Doctor Approvals', icon: FileText, path: '/admin/approvals' },
      { name: 'System Analytics', icon: Activity, path: '/admin/analytics' },
    ],
  };

  // Get navigation items based on user role
  const navItems = user?.role ? navigationItems[user.role] : [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white shadow-md transition-all duration-300 flex flex-col fixed h-full z-10",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="bg-medical-blue text-white p-2 rounded-md">
              <Activity size={20} />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold ml-2 text-gray-800">MediBook</span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="rounded-full hover:bg-gray-100"
          >
            <Menu size={20} />
          </Button>
        </div>
        
        {/* Navigation Links */}
        <nav className="py-4 flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-medical-blue transition-colors"
                >
                  <item.icon size={20} className="text-gray-500" />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t">
          {user && (
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={user.profileImage} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              )}
              
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Settings size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/${user.role}/profile`)}>
                      <User size={16} className="mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </aside>
      
      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Main content header */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, {user?.name || 'User'}
          </h1>

          {/* Show "Book Appointment" button for patients */}
          {user?.role === 'patient' && (
            <Button onClick={() => navigate('/patient/book-appointment')} className="bg-medical-blue hover:bg-medical-darkblue">
              <Plus size={16} className="mr-2" />
              Book Appointment
            </Button>
          )}
        </div>
        
        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
