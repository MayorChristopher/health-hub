import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import LandingPro from "./pages/LandingPro";
import PatientLogin from "./pages/PatientLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEditPatient from "./pages/AdminEditPatient";
import AdminVerifyStaff from "./pages/AdminVerifyStaff";
import StaffLogin from "./pages/StaffLogin";
import StaffRegistration from "./pages/StaffRegistration";
import Registration from "./pages/Registration";
import UserAccess from "./pages/UserAccess";
import Verify from "./pages/Verify";
import HospitalAccess from "./pages/HospitalAccess";
import HospitalVerify from "./pages/HospitalVerify";
import PatientDashboardNew from "./pages/PatientDashboardNew";
import MedicalDashboardNew from "./pages/MedicalDashboardNew";
import PatientRecordView from "./pages/PatientRecordView";
import HealthCoach from "./pages/HealthCoach";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DataProtection from "./pages/DataProtection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPro />} />
            <Route path="/patient-login" element={<PatientLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/edit-patient/:patientId" element={<AdminEditPatient />} />
            <Route path="/admin/verify-staff" element={<AdminVerifyStaff />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/user-access" element={<UserAccess />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/staff-registration" element={<StaffRegistration />} />
            <Route path="/hospital-access" element={<HospitalAccess />} />
            <Route path="/hospital-verify" element={<HospitalVerify />} />
            <Route path="/patient-dashboard" element={<PatientDashboardNew />} />
            <Route path="/patient-record/:patientId" element={<PatientRecordView />} />
            <Route path="/health-coach" element={<HealthCoach />} />
            <Route path="/medical-dashboard" element={<MedicalDashboardNew />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/data-protection" element={<DataProtection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;