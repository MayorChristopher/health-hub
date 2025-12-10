import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Database, Users, CheckCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const LandingPro = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ patients: 0, records: 0, facilities: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: patients } = await supabase.from('patients').select('*', { count: 'exact', head: true });
    const { count: records } = await supabase.from('consultations').select('*', { count: 'exact', head: true });
    setStats({ patients: patients || 0, records: records || 0, facilities: 12 });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="HealthMR" className="h-10" />
            <span className="text-xl font-bold text-medical-green hidden sm:block">HealthMR</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate("/patient-login")} className="text-sm md:text-base">Patient Login</Button>
            <Button variant="ghost" onClick={() => navigate("/staff-login")} className="text-sm md:text-base">Staff</Button>
            <Button onClick={() => navigate("/register")} className="bg-medical-green hover:bg-medical-dark text-sm md:text-base">
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-6">
                <div className="w-2 h-2 bg-medical-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-medical-green">Trusted by Healthcare Providers Across Abia State</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Modern Healthcare Records for Abia State
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Secure, integrated electronic medical records system designed for Abia State healthcare facilities. Manage patient care from registration to pharmacy.
              </p>
              <div className="flex flex-col gap-3">
                <Button size="lg" onClick={() => navigate("/register")} className="bg-medical-green hover:bg-medical-dark text-white w-full sm:w-auto">
                  Register as Patient
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button size="lg" variant="outline" onClick={() => navigate("/staff-login")} className="border-2 border-medical-green text-medical-green hover:bg-green-50 hover:text-medical-dark w-full sm:w-auto">
                  Healthcare Provider
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green" />
                  <span>NIN Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green" />
                  <span>24/7 Access</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-medical-green/10 to-medical-gold/10 rounded-3xl p-8 backdrop-blur">
                <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-600">Active Patients</p>
                      <p className="text-3xl font-bold text-medical-green">{stats.patients}</p>
                    </div>
                    <Users className="h-12 w-12 text-medical-green" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-600">Records Managed</p>
                      <p className="text-3xl font-bold text-medical-gold">{stats.records}</p>
                    </div>
                    <Database className="h-12 w-12 text-medical-gold" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-600">Healthcare Facilities</p>
                      <p className="text-3xl font-bold text-medical-green">{stats.facilities}</p>
                    </div>
                    <Shield className="h-12 w-12 text-medical-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Healthcare Workflow</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From patient registration to pharmacy dispensing, HealthMR covers every step of the healthcare journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              number="01"
              title="Patient Registration"
              description="NIN-verified registration with unique HealthMR ID. Comprehensive demographic and medical history capture."
            />
            <FeatureCard 
              number="02"
              title="Clinical Management"
              description="Nursing vitals, doctor consultations, lab tests, and prescriptions all in one integrated system."
            />
            <FeatureCard 
              number="03"
              title="Herbal Medicine Tracking"
              description="Unique feature tracking traditional medicine usage to prevent dangerous herb-drug interactions."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-medical-green text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients and healthcare providers using HealthMR across Abia State
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/register")} className="bg-white text-medical-green hover:bg-gray-100 w-full sm:w-auto">
              Register Now
            </Button>
            <Button size="lg" onClick={() => navigate("/admin")} className="bg-medical-gold hover:bg-yellow-600 text-white border-0 w-full sm:w-auto">
              Admin Access
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/logo.png" alt="HealthMR" className="h-10 mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm">
                Modern electronic medical records for Abia State healthcare
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Features</li>
                <li>Security</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Contact</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 HealthMR. Abia Starthon Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
    <div className="text-5xl font-bold text-medical-green/20 mb-4">{number}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default LandingPro;
