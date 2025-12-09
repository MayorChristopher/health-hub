import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import UserAccess from "./pages/UserAccess";
import Verify from "./pages/Verify";
import HospitalAccess from "./pages/HospitalAccess";
import HospitalVerify from "./pages/HospitalVerify";
import PatientDashboardNew from "./pages/PatientDashboardNew";
import MedicalDashboardNew from "./pages/MedicalDashboardNew";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/user-access" element={<UserAccess />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/hospital-access" element={<HospitalAccess />} />
            <Route path="/hospital-verify" element={<HospitalVerify />} />
            <Route path="/patient-dashboard" element={<PatientDashboardNew />} />
            <Route path="/medical-dashboard" element={<MedicalDashboardNew />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;