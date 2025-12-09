import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Users, Stethoscope, FileText, Shield, Clock } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-green rounded flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-medical-green">HealthMR</h1>
              <p className="text-xs text-gray-500">Electronic Medical Records</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-medical-green">Features</a>
            <a href="#stats" className="text-gray-700 hover:text-medical-green">About</a>
            <Button onClick={() => navigate("/register")} className="bg-medical-green hover:bg-medical-dark">
              Patient Login
            </Button>
            <Button onClick={() => navigate("/hospital-access")} variant="outline" className="border-medical-green text-medical-green">
              Staff Login
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-green-100 text-medical-green rounded-full text-sm font-medium mb-6">
                Abia State Healthcare Initiative
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Comprehensive Medical Records System for Abia State
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Integrated EMR platform managing complete patient care workflow—from registration and vitals to consultation, laboratory, pharmacy, and herbal medicine tracking.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => navigate("/register")} className="bg-medical-green hover:bg-medical-dark px-8">
                  Access Your Records
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/hospital-access")} className="border-gray-300">
                  Healthcare Provider Login
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-medical-green rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Patient Registration</p>
                      <p className="text-sm text-gray-600">NIN-verified identity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="w-12 h-12 bg-medical-gold rounded-full flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Clinical Consultation</p>
                      <p className="text-sm text-gray-600">Digital diagnosis & prescriptions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-medical-green rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Complete Records</p>
                      <p className="text-sm text-gray-600">Lab, pharmacy & herbal tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Healthcare Workflow</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed for Nigerian healthcare facilities—from primary health centers to teaching hospitals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="h-8 w-8" />}
              title="Patient Registration"
              description="NIN-verified registration with unique HealthMR ID. Captures demographics, lifestyle, and herbal medicine usage."
            />
            <FeatureCard 
              icon={<Activity className="h-8 w-8" />}
              title="Nursing Module"
              description="Vitals recording (BP, temp, pulse, O2 sat), symptom checklist, and automated alerts for abnormal readings."
            />
            <FeatureCard 
              icon={<Stethoscope className="h-8 w-8" />}
              title="Doctor Consultation"
              description="Clinical decision support for malaria, typhoid, hypertension. Herb-drug interaction alerts."
            />
            <FeatureCard 
              icon={<FileText className="h-8 w-8" />}
              title="Laboratory Management"
              description="Sample tracking, test requests, instant results integration. Supports blood, urine, stool analysis."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8" />}
              title="Pharmacy System"
              description="Prescription management, stock control, drug interaction alerts including herbal supplements."
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8" />}
              title="Herbal Medicine Tracking"
              description="Monitor agbo, bitters, and traditional remedies. Prevents dangerous herb-drug interactions."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-20 bg-medical-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-medical-green mb-2">100%</p>
              <p className="text-gray-600">Secure & Encrypted</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-medical-green mb-2">24/7</p>
              <p className="text-gray-600">Access Anytime</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-medical-green mb-2">NIN</p>
              <p className="text-gray-600">Verified Identity</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-medical-green mb-2">6</p>
              <p className="text-gray-600">Integrated Modules</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-medical-green rounded flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">HealthMR</span>
              </div>
              <p className="text-gray-400 text-sm">
                Integrated Electronic Medical Records for Nigerian Healthcare
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-400">Abia State, Nigeria</p>
              <p className="text-sm text-gray-400">info@healthmr.ng</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 HealthMR. Abia Starthon Project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 border rounded-xl hover:shadow-lg transition-all bg-white">
    <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-medical-green mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Home;
