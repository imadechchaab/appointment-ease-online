
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookAppointment from "./pages/BookAppointment";
import FindDoctor from "./pages/FindDoctor";
import ProfileSettings from "./pages/ProfileSettings";

// Patient pages
import PatientAppointments from "./pages/PatientAppointments"; 

// Doctor pages
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPatients from "./pages/DoctorPatients";

// Appointment & Patient detail pages
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";
import RescheduleAppointmentPage from "./pages/RescheduleAppointmentPage";
import AddPatientPage from "./pages/AddPatientPage";
import ViewPatientProfilePage from "./pages/ViewPatientProfilePage";

// Admin pages
import AdminUsers from "./pages/AdminUsers";
import AdminDoctorApprovals from "./pages/AdminDoctorApprovals";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminProfile from "./pages/AdminProfile";

// Layouts
import DashboardLayout from "./components/layouts/DashboardLayout";

// Guards
import PrivateRoute from "./components/guards/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/find-doctor" element={<FindDoctor />} />
            
            {/* Patient routes */}
            <Route path="/patient" element={
              <PrivateRoute allowedRoles={['patient']}>
                <DashboardLayout>
                  <PatientDashboard />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/patient/book-appointment/:doctorId?" element={
              <PrivateRoute allowedRoles={['patient']}>
                <DashboardLayout>
                  <BookAppointment />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/patient/appointments" element={ 
              <PrivateRoute allowedRoles={['patient']}>
                <DashboardLayout>
                  <PatientAppointments />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/patient/appointments/:appointmentId/reschedule" element={
              <PrivateRoute allowedRoles={['patient']}>
                <DashboardLayout>
                  <RescheduleAppointmentPage />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/patient/profile" element={
              <PrivateRoute allowedRoles={['patient']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </PrivateRoute>
            } />
            
            {/* Doctor routes */}
            <Route path="/doctor" element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <DoctorDashboard />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/doctor/appointments" element={ 
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <DoctorAppointments />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/doctor/appointments/:appointmentId/details" element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <AppointmentDetailsPage />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/doctor/appointments/:appointmentId/reschedule" element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <RescheduleAppointmentPage />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/doctor/patients" element={ 
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <DoctorPatients />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/doctor/patients/add" element={ 
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <AddPatientPage />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/doctor/patients/:patientId/profile" element={ 
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <ViewPatientProfilePage />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/doctor/profile" element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </PrivateRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/admin/users" element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminUsers />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/admin/approvals" element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminDoctorApprovals />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/admin/analytics" element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminAnalytics />
                </DashboardLayout>
              </PrivateRoute>
            } />
            <Route path="/admin/profile" element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminProfile />
                </DashboardLayout>
              </PrivateRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
