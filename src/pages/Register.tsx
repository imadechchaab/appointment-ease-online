
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast"; // Import useToast

// Mock specializations
const specializations = [
  { id: 'Cardiology', name: 'Cardiology' },
  { id: 'Neurology', name: 'Neurology' },
  { id: 'Pediatrics', name: 'Pediatrics' },
  { id: 'Dermatology', name: 'Dermatology' },
  { id: 'Orthopedics', name: 'Orthopedics' },
  { id: 'Psychiatry', name: 'Psychiatry' },
  { id: 'Gynecology', name: 'Gynecology' },
  { id: 'General Medicine', name: 'General Medicine' },
];

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialization, setSpecialization] = useState(''); // Changed from specializationId
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const { register, loading: authLoading } = useAuth();
  const { toast } = useToast(); // Initialize useToast

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (role === 'doctor' && !specialization) { // Changed from specializationId
      newErrors.specialization = 'Specialization is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await register(name, email, password, role, role === 'doctor' ? specialization : undefined);
      // The register function in AuthContext shows a toast.
      // Redirect to login page after successful registration.
      // For doctors, include a query param to indicate pending approval.
      const redirectPath = role === 'doctor' ? '/login?status=pending_approval' : '/login';
      navigate(redirectPath); 
    } catch (error: any) {
      // Toast for specific errors handled in AuthContext's register
      // General fallback error for the form
      setErrors({ form: error.message || 'Registration failed. Please try again.' });
      console.error('Registration page error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor={`${role}-name`}>Full Name</Label>
        <Input 
          id={`${role}-name`} 
          placeholder={role === 'doctor' ? "Dr. Jane Smith" : "John Doe"} 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? 'border-red-500' : ''}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${role}-name-error` : undefined}
          autoComplete="name"
        />
        {errors.name && <p id={`${role}-name-error`} className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input 
          id={`${role}-email`} 
          type="email" 
          placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${role}-email-error` : undefined}
          autoComplete="email"
        />
        {errors.email && <p id={`${role}-email-error`} className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {role === 'doctor' && (
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Select 
            value={specialization}  // Changed from specializationId
            onValueChange={setSpecialization} // Changed from setSpecializationId
          >
            <SelectTrigger className={errors.specialization ? 'border-red-500' : ''} aria-invalid={!!errors.specialization} aria-describedby={errors.specialization ? "specialization-error" : undefined}>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map(spec => (
                <SelectItem key={spec.id} value={spec.name}> {/* Use spec.name as value if IDs are same as names, or ensure spec.id is what backend expects */}
                  {spec.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.specialization && <p id="specialization-error" className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <div className="relative">
          <Input 
            id={`${role}-password`} 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'border-red-500' : ''}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? `${role}-password-error` : undefined}
            autoComplete="new-password"
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
        {errors.password && <p id={`${role}-password-error`} className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${role}-confirmPassword`}>Confirm Password</Label>
        <div className="relative">
          <Input 
            id={`${role}-confirmPassword`} 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? 'border-red-500' : ''}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? `${role}-confirmPassword-error` : undefined}
            autoComplete="new-password"
          />
          <button 
            type="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p id={`${role}-confirmPassword-error`} className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>

      {role === 'doctor' && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
          <p>Note: Doctor accounts require verification by an administrator. You will be notified once approved. After registration, please log in.</p>
        </div>
      )}
       {role === 'patient' && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
          <p>After registration, you will be redirected to the login page. Please use your credentials to log in.</p>
        </div>
      )}
      
      {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}

      <Button 
        type="submit" 
        className="w-full bg-medical-blue hover:bg-medical-darkblue"
        disabled={isLoading || authLoading}
      >
        {(isLoading || authLoading) ? 'Creating Account...' : 'Create Account'}
      </Button>
    </>
  );

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
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="patient" onValueChange={(value) => {
            setRole(value as 'patient' | 'doctor');
            setErrors({});
            // Reset fields that might differ between roles if needed
            setSpecialization(''); 
          }}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="patient">I'm a Patient</TabsTrigger>
              <TabsTrigger value="doctor">I'm a Doctor</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* The TabsContent structure with renderFormFields is good for shared fields */}
              <TabsContent value="patient" className="mt-0 pt-0">
                {renderFormFields()}
              </TabsContent>
              
              <TabsContent value="doctor" className="mt-0 pt-0">
                {renderFormFields()}
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-medical-blue hover:underline font-medium">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
