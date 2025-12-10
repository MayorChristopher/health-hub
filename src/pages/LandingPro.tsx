import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Database, Users, CheckCircle, ArrowRight, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const LandingPro = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [stats, setStats] = useState({ patients: 0, records: 0, facilities: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: patients } = await supabase.from('patients').select('*', { count: 'exact', head: true });
      const { count: consultations } = await supabase.from('consultations').select('*', { count: 'exact', head: true });
      const { count: labTests } = await supabase.from('lab_tests').select('*', { count: 'exact', head: true });
      const { count: practitioners } = await supabase.from('medical_staff').select('*', { count: 'exact', head: true });
      
      const totalRecords = (consultations || 0) + (labTests || 0);
      setStats({ 
        patients: patients || 0, 
        records: totalRecords, 
        facilities: practitioners || 0 
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="HealthMR" className="h-8 md:h-10" />
            <span className="text-lg md:text-xl font-bold text-medical-green">HealthMR</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate("/patient-login")}>
              {t("patientLoginNav")}
            </Button>
            <Button variant="ghost" onClick={() => navigate("/staff-login")}>
              {t("staff")}
            </Button>
            <Button onClick={() => navigate("/register")} className="bg-medical-green hover:bg-medical-dark">
              {t("register")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-3">
              <div className="flex justify-center pb-2 border-b">
                <LanguageSwitcher />
              </div>
              <Button 
                variant="ghost" 
                onClick={() => { navigate("/patient-login"); setMobileMenuOpen(false); }}
                className="w-full justify-start"
              >
                {t("patientLoginNav")}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { navigate("/staff-login"); setMobileMenuOpen(false); }}
                className="w-full justify-start"
              >
                {t("staff")}
              </Button>
              <Button 
                onClick={() => { navigate("/register"); setMobileMenuOpen(false); }}
                className="w-full bg-medical-green hover:bg-medical-dark"
              >
                {t("register")}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-50 rounded-full mb-4 md:mb-6">
                <div className="w-2 h-2 bg-medical-green rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm font-medium text-medical-green">{t("trustedBy")}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                {t("heroTitle")}
              </h1>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                {t("heroDescription")}
              </p>
              <div className="flex flex-col gap-3">
                <Button size="lg" onClick={() => navigate("/register")} className="bg-medical-green hover:bg-medical-dark text-white w-full sm:w-auto">
                  {t("registerAsPatient")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button size="lg" variant="outline" onClick={() => navigate("/staff-login")} className="border-2 border-medical-green text-medical-green hover:bg-green-50 hover:text-medical-dark w-full sm:w-auto">
                  {t("healthcareProvider")}
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 md:gap-8 mt-6 md:mt-8 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-medical-green" />
                  <span>{t("ninVerified")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-medical-green" />
                  <span>{t("hipaaCompliant")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-medical-green" />
                  <span>{t("access24")}</span>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-medical-green/10 to-medical-gold/10 rounded-3xl p-4 md:p-8 backdrop-blur">
                <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between p-3 md:p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600">{t("activePatients")}</p>
                      <p className="text-2xl md:text-3xl font-bold text-medical-green">{stats.patients}</p>
                    </div>
                    <Users className="h-8 md:h-12 w-8 md:w-12 text-medical-green" />
                  </div>
                  <div className="flex items-center justify-between p-3 md:p-4 bg-yellow-50 rounded-xl">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600">{t("recordsManaged")}</p>
                      <p className="text-2xl md:text-3xl font-bold text-medical-gold">{stats.records}</p>
                    </div>
                    <Database className="h-8 md:h-12 w-8 md:w-12 text-medical-gold" />
                  </div>
                  <div className="flex items-center justify-between p-3 md:p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600">{t("verifiedPractitioners")}</p>
                      <p className="text-2xl md:text-3xl font-bold text-medical-green">{stats.facilities}</p>
                    </div>
                    <Shield className="h-8 md:h-12 w-8 md:w-12 text-medical-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">{t("completeWorkflow")}</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("workflowDescription")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              number="01"
              title={t("patientRegistration")}
              description={t("patientRegDesc")}
            />
            <FeatureCard 
              number="02"
              title={t("clinicalManagement")}
              description={t("clinicalDesc")}
            />
            <FeatureCard 
              number="03"
              title={t("herbalTracking")}
              description={t("herbalDesc")}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-medical-green text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">{t("ctaTitle")}</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/register")} className="bg-white text-medical-green hover:bg-gray-100 w-full sm:w-auto">
              {t("registerNow")}
            </Button>
            <Button size="lg" onClick={() => navigate("/admin")} className="bg-medical-gold hover:bg-yellow-600 text-white border-0 w-full sm:w-auto">
              {t("adminAccess")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-2 md:col-span-1">
              <img src="/logo.png" alt="HealthMR" className="h-8 md:h-10 mb-3 md:mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-xs md:text-sm">
                {t("footerDescription")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t("product")}</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li>{t("features")}</li>
                <li>{t("security")}</li>
                <li>{t("pricing")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t("company")}</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li>{t("about")}</li>
                <li>{t("contact")}</li>
                <li>{t("careers")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t("legal")}</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li>{t("privacy")}</li>
                <li>{t("terms")}</li>
                <li>{t("compliance")}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-400">
            <p>&copy; {t("copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
    <div className="text-4xl md:text-5xl font-bold text-medical-green/20 mb-3 md:mb-4">{number}</div>
    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{title}</h3>
    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default LandingPro;
