
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Eye, EyeOff } from 'lucide-react'; // Changed Calendar to Activity for logo
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Form validation
    if (!email.trim() || !password.trim()) {
      // Consider adding a toast notification for errors
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      navigate(`/${role}`);
    } catch (error) {
      console.error('Login error:', error);
      // Consider adding a toast notification for login failure
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo login details for convenience
  const demoLogins = {
    patient: { email: 'patient@example.com', password: 'password123' },
    doctor: { email: 'doctor@example.com', password: 'password123' },
    admin: { email: 'admin@example.com', password: 'password123' }
  };
  
  const handleDemoLogin = async () => {
    setEmail(demoLogins[role].email);
    setPassword(demoLogins[role].password);
    
    setIsLoading(true);
    
    try {
      await login(demoLogins[role].email, demoLogins[role].password, role);
      navigate(`/${role}`);
    } catch (error) {
      console.error('Demo login error:', error);
      // Consider adding a toast notification for demo login failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center">
        <Link to="/" className="flex items-center">
          <div className="bg-medical-blue text-white p-2 rounded-md">
            <Activity size={20} /> {/* Changed from Calendar to Activity */}
          </div>
          <span className="text-2xl font-bold ml-2 text-gray-800">OnlineDoc</span> {/* Changed from MediBook */}
        </Link>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="patient" onValueChange={(value) => setRole(value as 'patient' | 'doctor' | 'admin')}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            {/* Unified form for all tabs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${role}-email`}>Email</Label>
                <Input 
                  id={`${role}-email`} 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor={`${role}-password`}>Password</Label>
                  <a href="#" className="text-xs text-medical-blue hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input 
                    id={`${role}-password`} 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-medical-blue hover:bg-medical-darkblue"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Tabs>
          
          <div className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `Try Demo ${role.charAt(0).toUpperCase() + role.slice(1)} Login`}
            </Button>
          </div>
          
          {/* Removed "Or" separator and Google login button */}
          
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-medical-blue hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
