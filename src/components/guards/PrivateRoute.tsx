
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext'; // Import UserRole

interface PrivateRouteProps {
  children: ReactElement;
  allowedRoles: UserRole[]; // Use UserRole type
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Use user.appRole which is correctly typed as UserRole | null
  if (user && user.appRole && !allowedRoles.includes(user.appRole)) {
    // Redirect to appropriate dashboard based on appRole
    if (user.appRole === 'patient') {
      return <Navigate to="/patient" replace />;
    } else if (user.appRole === 'doctor') {
      // Add check for doctor approval status before redirecting to doctor dashboard
      if (user.profile && 'is_approved' in user.profile && !user.profile.is_approved) {
        // If doctor is not approved, redirect to login or a pending page. For now, login.
        // Consider a dedicated pending approval page/toast message on login page.
        return <Navigate to="/login?status=pending_approval_redirect" replace />;
      }
      return <Navigate to="/doctor" replace />;
    } else if (user.appRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    // Fallback if role is somehow not covered, though appRole should be one of the UserRole types
    return <Navigate to="/login" replace />; 
  }
  
  // If user.appRole is null but user is authenticated (should not happen with proper registration/login)
  if (user && !user.appRole) {
    console.warn("User is authenticated but appRole is null. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
