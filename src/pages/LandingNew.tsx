import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Shield, Database, Users, Stethoscope, Pill } from "lucide-react";

const LandingNew = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-green rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-medical-green">HealthMR</span>
          </div>
          <Button onClick={() => navigate("/user-access")} className="bg-medical-green hover:bg-medical-dark">
            Access Portal
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-medical-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-medical-dark mb-6">
              Integrated Medical Records for Nigerian Healthcare
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Complete EMR system managing patient care from registration to pharmacy, with herbal medicine tracking
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/user-access")} className="bg-medical-green hover:bg-medical-dark">
                Patient Portal
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/hospital-access")} className="border-medical-green text-medical-green hover:bg-medical-light">
                Medical Staff
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-medical-dark mb-12">Complete Healthcare Workflow</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard icon={Users} title="Registration" desc="Patient demographics with unique HealthMR ID" />
            <ModuleCard icon={Activity} title="Nursing" desc="Vitals recording and initial assessment" />
            <ModuleCard icon={Stethoscope} title="Consultation" desc="Doctor diagnosis with clinical decision support" />
            <ModuleCard icon={Database} title="Laboratory" desc="Sample tracking and instant results" />
            <ModuleCard icon={Pill} title="Pharmacy" desc="Prescription management and drug interaction alerts" />
            <ModuleCard icon={Shield} title="Herbal Tracking" desc="Monitor traditional medicine usage and interactions" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-medical-light">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          <p>&copy; 2024 HealthMR. Abia Starthon Project</p>
        </div>
      </footer>
    </div>
  );
};

const ModuleCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white">
    <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-medical-green" />
    </div>
    <h3 className="text-lg font-semibold text-medical-dark mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

export default LandingNew;
