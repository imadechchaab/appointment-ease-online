import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser, Subscription } from '@supabase/supabase-js';

// Define user types based on roles
export type UserRole = 'patient' | 'doctor' | 'admin';

// Extended User interface to include profile data
export interface UserProfileData {
  id: string; // Profile table ID
  user_id: string; // Corresponds to Supabase auth user ID
  full_name: string | null;
  email: string | null;
  profile_image_url?: string | null;
  specialization?: string | null; // For doctors
  is_approved?: boolean | null; // For doctors
}

export interface User extends SupabaseUser {
  profile: UserProfileData | null; // Holds data from patients, doctors, or admins table
  appRole: UserRole | null; // Role derived from user_metadata or profile
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, specialization?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Added setUser
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // No need for authSubscription state here, manage listener directly in useEffect

  const fetchUserProfile = useCallback(async (supabaseUser: SupabaseUser, role: UserRole): Promise<UserProfileData | null> => {
    if (!supabaseUser) return null;

    let tableName: 'patients' | 'doctors' | 'admins' | '' = '';
    if (role === 'patient') tableName = 'patients';
    else if (role === 'doctor') tableName = 'doctors';
    else if (role === 'admin') tableName = 'admins';
    else return null;

    console.log(`Fetching profile from ${tableName} for user ${supabaseUser.id} with role ${role}`);

    const { data, error } = await supabase
      .from(tableName) 
      .select('*')
      .eq('user_id', supabaseUser.id)
      .single();

    if (error) {
      console.error(`Error fetching ${role} profile:`, error);
      if (error.code === 'PGRST116') {
        toast({
          title: "Profile Not Found",
          description: `Could not find a ${role} profile. This might be a temporary issue. Please try logging in again shortly.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile Fetch Error",
          description: `Failed to fetch ${role} profile. ${error.message}`,
          variant: "destructive",
        });
      }
      return null;
    }
    console.log(`Fetched profile data for ${role}:`, data);
    return data as UserProfileData;
  }, [toast]); // Added toast to useCallback dependencies

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        const role = currentSession.user.user_metadata?.role as UserRole;
        if (role) {
          const profile = await fetchUserProfile(currentSession.user, role);
          setUser({ ...currentSession.user, profile, appRole: role });
        } else {
          setUser({ ...currentSession.user, profile: null, appRole: null });
           console.warn("User role not found in metadata during initial session load.");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setLoading(true);
        setSession(newSession);
        if (newSession?.user) {
          const role = newSession.user.user_metadata?.role as UserRole;
           console.log("Auth state changed. Event:", _event, "User metadata role:", role);
          if (role) {
            // Defer profile fetching slightly to avoid potential race conditions on fast auth changes
            // Using setTimeout to ensure state updates from onAuthStateChange complete before fetching.
            setTimeout(async () => {
              const profile = await fetchUserProfile(newSession.user, role);
              setUser({ ...newSession.user, profile, appRole: role });
              setLoading(false);
            }, 0);
          } else {
             setUser({ ...newSession.user, profile: null, appRole: null });
             console.warn("User role not found in metadata during auth state change.");
             setLoading(false);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // The listener object itself contains the subscription.
    // The subscription has an unsubscribe method.
    return () => {
      authListener?.subscription.unsubscribe(); // Correctly unsubscribe
    };
  }, [fetchUserProfile]); // fetchUserProfile is now memoized with useCallback


  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      if (data.user) {
        const role = data.user.user_metadata?.role as UserRole;
        console.log("Login successful. User metadata role:", role);
        if (role) {
          // Fetch profile immediately after login success
          const profile = await fetchUserProfile(data.user, role);
          setUser({ ...data.user, profile, appRole: role }); // Update user state
          toast({
            title: "Login successful",
            description: `Welcome back, ${profile?.full_name || data.user.email}!`
          });
          // Navigation will be handled by useEffect in Login.tsx or PrivateRoute
        } else {
          setUser({ ...data.user, profile: null, appRole: null });
           toast({
            title: "Login successful, but role missing",
            description: `Welcome back! However, your role information is missing. Please contact support.`,
            variant: "destructive"
          });
           console.error("User role not found in metadata after login for user:", data.user.id);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      // Toast is handled in the error block above or if error is re-thrown
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole, specialization?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role, // This will be stored in auth.users.raw_user_meta_data
            full_name: name, // For the trigger
            specialization: role === 'doctor' ? specialization : undefined, // For the trigger
          }
        }
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message || "Could not create account. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      // Regardless of user or session, show success and instruct to check email / log in.
      // Supabase handles email verification flow. The trigger creates the profile.
      toast({
        title: "Registration successful!",
        description: role === 'doctor' 
          ? "Please check your email to verify your account. Your doctor profile is pending approval." 
          : "Please check your email to verify your account, then log in."
      });
      
    } catch (error) {
      console.error("Registration error:", error);
      // Toast is handled in the error block above
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Logout failed",
          description: error.message || "Could not log out. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      setUser(null);
      setSession(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (roles: UserRole[]) => {
    if (!user || !user.appRole) return false;
    return roles.includes(user.appRole);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isAuthenticated: !!user && !!session, 
      loading, 
      login, 
      register, 
      logout, 
      hasRole,
      setUser // Provide setUser in context
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
