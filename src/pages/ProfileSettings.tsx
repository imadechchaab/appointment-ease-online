
import React, { useState, useEffect, useRef } from 'react';
import { useAuth, User } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User as UserIcon, Edit3 } from 'lucide-react'; // UserIcon to avoid conflict
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client'; // For file uploads

const ProfileSettings = () => {
  const { user, loading: authLoading, session, setUser } = useAuth(); // Added setUser
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState(user?.profile?.full_name || '');
  const [email, setEmail] = useState(user?.email || ''); // Email from auth.user
  const [specialization, setSpecialization] = useState(user?.profile?.specialization || '');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profile?.profile_image_url || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.profile?.full_name || '');
      setEmail(user.email || '');
      setProfileImageUrl(user.profile?.profile_image_url || '');
      if (user.appRole === 'doctor') {
        setSpecialization(user.profile?.specialization || '');
      }
    }
  }, [user]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImageFile(file);
      setProfileImageUrl(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !session) {
      toast({ title: "Error", description: "You must be logged in to update your profile.", variant: "destructive" });
      return;
    }
    setIsUpdating(true);

    let uploadedImageUrl = profileImageUrl;

    if (profileImageFile) {
      setIsUploading(true);
      const fileExt = profileImageFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images') // Ensure this bucket exists and has correct policies
        .upload(filePath, profileImageFile, {
          cacheControl: '3600',
          upsert: true, 
        });
      
      setIsUploading(false);
      if (uploadError) {
        toast({ title: "Upload Error", description: `Failed to upload profile image: ${uploadError.message}`, variant: "destructive" });
        setIsUpdating(false);
        return;
      }
      
      const { data: urlData } = supabase.storage.from('profile-images').getPublicUrl(filePath);
      uploadedImageUrl = urlData.publicUrl;
    }
    
    // Determine table and data for update
    let tableName: 'patients' | 'doctors' | 'admins' | '' = '';
    if (user.appRole === 'patient') tableName = 'patients';
    else if (user.appRole === 'doctor') tableName = 'doctors';
    else if (user.appRole === 'admin') tableName = 'admins';
    else {
      toast({ title: "Error", description: "Invalid user role.", variant: "destructive" });
      setIsUpdating(false);
      return;
    }

    const updates: { full_name: string; profile_image_url?: string; specialization?: string; updated_at: string } = {
      full_name: fullName,
      updated_at: new Date().toISOString(),
    };
    if (uploadedImageUrl) {
      updates.profile_image_url = uploadedImageUrl;
    }
    if (user.appRole === 'doctor') {
      updates.specialization = specialization;
    }
    
    const { data: updatedProfile, error: updateError } = await supabase
      .from(tableName)
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      toast({ title: "Update Error", description: `Failed to update profile: ${updateError.message}`, variant: "destructive" });
    } else if (updatedProfile) {
      toast({ title: "Success", description: "Profile updated successfully!" });
      // Update user context
      setUser(prevUser => prevUser ? ({
        ...prevUser,
        profile: {
            // Spread existing profile data and then override
            ...(prevUser.profile || { id: '', user_id: user.id, full_name: '', email: user.email || '' }), // provide default structure if profile is null
            full_name: updatedProfile.full_name,
            profile_image_url: updatedProfile.profile_image_url,
            ...(user.appRole === 'doctor' && { specialization: updatedProfile.specialization }),
        }
      }) : null);
      setProfileImageUrl(updatedProfile.profile_image_url || ''); // Update local state for image URL
      setProfileImageFile(null); // Clear the file input after successful upload
    }
    setIsUpdating(false);
  };

  if (authLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading profile settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Profile Settings</CardTitle>
          <CardDescription>Manage your personal information and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-gray-200 group-hover:border-medical-blue transition-all">
                  <AvatarImage src={profileImageUrl || undefined} alt={user.profile?.full_name || user.email || 'User'} />
                  <AvatarFallback className="bg-gray-300">
                    <UserIcon className="w-16 h-16 text-gray-500" />
                  </AvatarFallback>
                </Avatar>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="absolute bottom-0 right-0 rounded-full bg-white group-hover:bg-medical-blue group-hover:text-white transition-all"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change profile picture"
                >
                  <Camera className="w-5 h-5" />
                </Button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
              <div>
                <h2 className="text-xl font-semibold text-center">{user.profile?.full_name || user.email}</h2>
                <p className="text-sm text-gray-500 text-center capitalize">{user.appRole}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  disabled 
                  className="bg-gray-100 cursor-not-allowed"
                  aria-label="Email address (cannot be changed)"
                />
              </div>
              {user.appRole === 'doctor' && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input 
                    id="specialization" 
                    value={specialization} 
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g., Cardiology, Pediatrics"
                  />
                </div>
              )}
            </div>
            
            {/* Add more fields as necessary, e.g., password change */}
            {/* For password change, you'd typically use supabase.auth.updateUser({ password: newPassword }) */}

            <CardFooter className="pt-6 flex justify-end px-0">
              <Button type="submit" className="bg-medical-blue hover:bg-medical-darkblue" disabled={isUploading || isUpdating || authLoading}>
                {(isUploading || isUpdating) ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;

