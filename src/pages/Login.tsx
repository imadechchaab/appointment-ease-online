import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, EyeOff } from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (location.search.includes('status=pending_approval')) {
      toast({
        title: "Registration Submitted",
        description: "Your doctor account registration is pending approval by an administrator.",
        duration: 5000,
      });
      navigate('/login', { replace: true });
    }
  }, [location, navigate, toast]);

  useEffect(() => {
    if (isAuthenticated && user?.appRole && !authLoading) {
      if (user.appRole === 'doctor' && user.profile && 'is_approved' in user.profile && !user.profile.is_approved) {
        toast({
          title: "Account Pending Approval",
          description: "Your doctor account is still pending approval. Please check back later.",
          variant: "default",
          duration: 7000,
        });
      } else {
        navigate(`/${user.appRole}`);
      }
    }
  }, [isAuthenticated, user, navigate, authLoading, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({ title: "Validation Error", description: "Email and password are required.", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login page error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center">
        <Link to="/" className="flex items-center">
          <div className="bg-medical-blue text-white p-2 rounded-md">
            <Activity size={20} />
          </div>
          <span className="text-2xl font-bold ml-2 text-gray-800">OnlineDoc</span>
        </Link>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
          <CardDescription className="text-center">
            Select your role, then enter your email and password
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-medium">I am a:</Label>
              <RadioGroup 
                defaultValue="patient" 
                className="flex space-x-4"
                onValueChange={(value: string) => setSelectedRole(value as UserRole)}
                value={selectedRole}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patient" id="role-patient" />
                  <Label htmlFor="role-patient">Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="doctor" id="role-doctor" />
                  <Label htmlFor="role-doctor">Doctor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="role-admin" />
                  <Label htmlFor="role-admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
              disabled={isLoading || authLoading}
            >
              {(isLoading || authLoading) ? 'Logging in...' : 'Login'}
            </Button>
          </form>
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
