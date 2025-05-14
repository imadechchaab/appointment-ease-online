
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Save, UserPlus, Bell, Lock, Loader2 } from 'lucide-react';

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // User profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '555-123-4567',
    address: '123 Main St, New York, NY 10001',
    dob: '1990-01-01',
    gender: 'male',
    bloodType: 'A+',
    emergencyContact: 'Jane Smith (555-987-6543)',
  });
  
  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: true,
    smsReminders: true,
    appointmentUpdates: true,
    marketingEmails: false
  });
  
  // Doctor specific settings (only for doctor role)
  const [doctorSettings, setDoctorSettings] = useState({
    specialization: user?.specialization || '',
    consultationFee: '150',
    experience: '10',
    education: 'Harvard Medical School',
    availableHours: '9:00 AM - 5:00 PM',
    acceptingNewPatients: true
  });
  
  // Handle profile form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle password form change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle notification settings change
  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: checked }));
  };
  
  // Handle doctor settings change
  const handleDoctorSettingChange = (key: string, value: string | boolean) => {
    setDoctorSettings(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
    }, 1500);
  };
  
  // Handle password change submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account information and preferences</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Profile Card */}
        <div className="md:w-64">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32 border-4 border-white shadow">
                  <AvatarImage src={user?.profileImage} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                
                <h2 className="mt-4 text-xl font-semibold text-gray-800">{user?.name}</h2>
                <p className="text-gray-500 capitalize">{user?.role}</p>
                
                <div className="mt-4 w-full">
                  <Button className="w-full">
                    Change Photo
                  </Button>
                </div>
                
                <div className="mt-6 space-y-2 w-full text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">May 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              {user?.role === 'doctor' && (
                <TabsTrigger value="doctor-settings">Doctor Settings</TabsTrigger>
              )}
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            disabled
                          />
                          <p className="text-xs text-gray-500">Cannot be changed</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select 
                            value={profileForm.gender} 
                            onValueChange={(value) => setProfileForm(prev => ({ ...prev, gender: value }))}
                          >
                            <SelectTrigger id="gender">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input 
                            id="dob"
                            name="dob"
                            type="date"
                            value={profileForm.dob}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bloodType">Blood Type</Label>
                          <Select 
                            value={profileForm.bloodType} 
                            onValueChange={(value) => setProfileForm(prev => ({ ...prev, bloodType: value }))}
                          >
                            <SelectTrigger id="bloodType">
                              <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address"
                          name="address"
                          value={profileForm.address}
                          onChange={handleProfileChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input 
                          id="emergencyContact"
                          name="emergencyContact"
                          value={profileForm.emergencyContact}
                          onChange={handleProfileChange}
                          placeholder="Name and phone number"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="currentPassword"
                              name="currentPassword"
                              type={showPassword ? "text" : "password"}
                              value={passwordForm.currentPassword}
                              onChange={handlePasswordChange}
                              required
                            />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input 
                              id="newPassword"
                              name="newPassword"
                              type={showPassword ? "text" : "password"}
                              value={passwordForm.newPassword}
                              onChange={handlePasswordChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input 
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              value={passwordForm.confirmPassword}
                              onChange={handlePasswordChange}
                              required
                            />
                          </div>
                          {passwordForm.newPassword && passwordForm.confirmPassword &&
                           passwordForm.newPassword !== passwordForm.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Update Password
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Two-factor authentication is not enabled yet.</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                      </div>
                      <Button variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Setup 2FA
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Appointment Reminders</p>
                          <p className="text-sm text-gray-500">Get notified about your upcoming appointments via email.</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailReminders}
                          onCheckedChange={(checked) => handleNotificationChange('emailReminders', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Appointment Reminders</p>
                          <p className="text-sm text-gray-500">Get notified about your upcoming appointments via SMS.</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.smsReminders}
                          onCheckedChange={(checked) => handleNotificationChange('smsReminders', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Appointment Updates</p>
                          <p className="text-sm text-gray-500">Get notified when your appointment is rescheduled or cancelled.</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.appointmentUpdates}
                          onCheckedChange={(checked) => handleNotificationChange('appointmentUpdates', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Receive promotional offers and newsletters.</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>
                        <Bell className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Doctor Settings Tab (only for doctors) */}
            {user?.role === 'doctor' && (
              <TabsContent value="doctor-settings">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Professional Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input 
                            id="specialization"
                            value={doctorSettings.specialization}
                            onChange={(e) => handleDoctorSettingChange('specialization', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                          <Input 
                            id="consultationFee"
                            value={doctorSettings.consultationFee}
                            onChange={(e) => handleDoctorSettingChange('consultationFee', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input 
                            id="experience"
                            value={doctorSettings.experience}
                            onChange={(e) => handleDoctorSettingChange('experience', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="education">Education</Label>
                          <Input 
                            id="education"
                            value={doctorSettings.education}
                            onChange={(e) => handleDoctorSettingChange('education', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="availableHours">Available Hours</Label>
                          <Input 
                            id="availableHours"
                            value={doctorSettings.availableHours}
                            onChange={(e) => handleDoctorSettingChange('availableHours', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="acceptingNewPatients" className="block mb-2">Accepting New Patients</Label>
                          <Switch 
                            id="acceptingNewPatients"
                            checked={doctorSettings.acceptingNewPatients as boolean}
                            onCheckedChange={(checked) => handleDoctorSettingChange('acceptingNewPatients', checked)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="doctorBio">Professional Bio</Label>
                        <textarea 
                          id="doctorBio"
                          className="w-full p-3 border rounded-md h-20"
                          placeholder="Brief description of your professional background and expertise..."
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>
                          <Save className="mr-2 h-4 w-4" />
                          Save Professional Info
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
