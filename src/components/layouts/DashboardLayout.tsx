
import { ReactNode, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
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
  Home as HomeIcon, 
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
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const getInitials = (name: string = "User") => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Navigation items based on user role
  const navigationItems = {
    patient: [
      { name: 'Dashboard', icon: HomeIcon, path: '/patient' },
      { name: 'Find Doctors', icon: Search, path: '/find-doctor' },
      { name: 'My Appointments', icon: Calendar, path: '/patient/appointments' },
      { name: 'Profile', icon: User, path: '/patient/profile' },
    ],
    doctor: [
      { name: 'Dashboard', icon: HomeIcon, path: '/doctor' },
      { name: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
      { name: 'Patients', icon: Users, path: '/doctor/patients' },
      { name: 'Profile', icon: User, path: '/doctor/profile' },
    ],
    admin: [
      { name: 'Dashboard', icon: HomeIcon, path: '/admin' },
      { name: 'Manage Users', icon: Users, path: '/admin/users' },
      { name: 'Doctor Approvals', icon: FileText, path: '/admin/approvals' },
      { name: 'System Analytics', icon: Activity, path: '/admin/analytics' },
      { name: 'Profile', icon: User, path: '/admin/profile' },
    ],
  };

  // Get navigation items based on user role
  const navItems = user?.role ? navigationItems[user.role as keyof typeof navigationItems] : [];

  // Determine current page title based on nav items
  const currentPage = navItems.find(item => 
    location.pathname === item.path || 
    location.pathname.startsWith(item.path + (item.path === '/' ? '' : '/'))
  );
  
  let pageTitle = currentPage ? currentPage.name : "Dashboard";
  if (location.pathname.includes('/book-appointment')) pageTitle = 'Book Appointment';
  if (location.pathname.includes('/profile')) pageTitle = 'Profile Settings';
  if (user?.name && !currentPage) pageTitle = `Welcome, ${user.name}`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white shadow-md transition-all duration-300 flex flex-col fixed h-full z-20",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center h-16">
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="bg-medical-blue text-white p-2 rounded-md">
              <Activity size={20} />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold ml-2 text-gray-800 truncate">OnlineDoc</span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className={cn(
              "rounded-full hover:bg-gray-100 ml-auto",
              !sidebarOpen && "mx-auto"
            )}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu size={20} />
          </Button>
        </div>
        
        {/* Navigation Links */}
        <nav className="py-4 flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-lg text-gray-700 hover:text-medical-blue transition-colors group",
                    location.pathname === item.path || (item.path !== `/${user?.role}` && location.pathname.startsWith(item.path))
                      ? "bg-medical-blue/10 text-medical-blue font-medium" 
                      : "hover:bg-gray-100"
                  )}
                  title={item.name}
                >
                  <item.icon 
                    size={20} 
                    className={cn(
                      location.pathname === item.path || (item.path !== `/${user?.role}` && location.pathname.startsWith(item.path))
                        ? "text-medical-blue" 
                        : "text-gray-500 group-hover:text-medical-blue"
                    )} 
                  />
                  {sidebarOpen && <span className="ml-3 truncate">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t">
          {user && (
            <div className="flex items-center">
              <Avatar className="flex-shrink-0">
                <AvatarImage src={user.profileImage || undefined} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              
              {sidebarOpen && (
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize truncate">{user.role}</p>
                </div>
              )}
              
              <div className={cn("ml-auto", !sidebarOpen && "hidden")}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0" aria-label="User settings">
                      <Settings size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate(`/${user.role}/profile`)}>
                      <User size={16} className="mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
          {!user && sidebarOpen && (
            <Button onClick={() => navigate('/login')} className="w-full">Login</Button>
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
        <div className="bg-white shadow-sm p-4 flex items-center justify-between h-16 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800 truncate">
            {pageTitle}
          </h1>

          {user?.role === 'patient' && !location.pathname.includes('/book-appointment') && (
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
