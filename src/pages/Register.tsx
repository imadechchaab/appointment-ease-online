
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Eye, EyeOff } from 'lucide-react'; // Changed Calendar to Activity
import { useAuth } from '@/context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock specializations
const specializations = [
  { id: '1', name: 'General Medicine' },
  { id: '2', name: 'Cardiology' },
  { id: '3', name: 'Neurology' },
  { id: '4', name: 'Pediatrics' },
  { id: '5', name: 'Dermatology' },
  { id: '6', name: 'Orthopedics' },
  { id: '7', name: 'Psychiatry' },
  { id: '8', name: 'Gynecology' },
];

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specializationId, setSpecializationId] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const { register } = useAuth();

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
    if (role === 'doctor' && !specializationId) {
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
      await register(name, email, password, role, role === 'doctor' ? specializationId : undefined);
      // Potentially redirect to a "pending approval" page for doctors
      navigate(role === 'doctor' ? '/login?status=pending_approval' : `/${role}`); 
    } catch (error) {
      console.error('Registration error:', error);
      // Add toast for error
      setErrors({ form: 'Registration failed. Please try again.' });
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
        />
        {errors.email && <p id={`${role}-email-error`} className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {role === 'doctor' && (
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Select 
            value={specializationId} 
            onValueChange={setSpecializationId}
          >
            <SelectTrigger className={errors.specialization ? 'border-red-500' : ''} aria-invalid={!!errors.specialization} aria-describedby={errors.specialization ? "specialization-error" : undefined}>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map(spec => (
                <SelectItem key={spec.id} value={spec.id}>
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
        <Input 
          id={`${role}-confirmPassword`} 
          type="password" 
          placeholder="••••••••" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={errors.confirmPassword ? 'border-red-500' : ''}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? `${role}-confirmPassword-error` : undefined}
        />
        {errors.confirmPassword && <p id={`${role}-confirmPassword-error`} className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>

      {role === 'doctor' && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
          <p>Note: Doctor accounts require verification by an administrator before you can access all features. You will be notified once your account is approved.</p>
        </div>
      )}
      
      {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}

      <Button 
        type="submit" 
        className="w-full bg-medical-blue hover:bg-medical-darkblue"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center">
        <Link to="/" className="flex items-center">
          <div className="bg-medical-blue text-white p-2 rounded-md">
            <Activity size={20} /> {/* Changed from Calendar */}
          </div>
          <span className="text-2xl font-bold ml-2 text-gray-800">OnlineDoc</span> {/* Changed from MediBook */}
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
            setErrors({}); // Clear errors on tab change
            // Optionally clear form fields too
            // setName(''); setEmail(''); setPassword(''); setConfirmPassword(''); setSpecializationId('');
          }}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="patient">I'm a Patient</TabsTrigger>
              <TabsTrigger value="doctor">I'm a Doctor</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="patient" className="mt-0 pt-0"> {/* Remove default TabsContent margin */}
                {renderFormFields()}
              </TabsContent>
              
              <TabsContent value="doctor" className="mt-0 pt-0"> {/* Remove default TabsContent margin */}
                {renderFormFields()}
              </TabsContent>
            </form>
          </Tabs>
          
          {/* Removed "Or continue with" and Google button */}
          
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
