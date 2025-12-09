import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight } from "lucide-react";

const HomeNew = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="HealthMR" className="h-12" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-green-100 text-medical-green rounded-full text-sm font-medium mb-4 animate-fade-in">
              Abia State Healthcare Initiative
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
              Your Health Records,<br />
              <span className="text-medical-green">Simplified</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
              Comprehensive electronic medical records system for Abia State healthcare facilities
            </p>

            {/* CTA Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              {/* Patient Card */}
              <div 
                onClick={() => navigate("/register")}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-medical-green transition-all duration-300 cursor-pointer hover:shadow-xl"
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-medical-green transition-colors">
                  <ArrowRight className="h-5 w-5 text-medical-green group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Patient Portal</h3>
                  <p className="text-gray-600 mb-4">Register or access your medical records</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-50 text-medical-green text-xs rounded-full">Sign Up</span>
                    <span className="px-3 py-1 bg-green-50 text-medical-green text-xs rounded-full">Login</span>
                  </div>
                </div>
              </div>

              {/* Staff Card */}
              <div 
                onClick={() => navigate("/staff-login")}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-medical-gold transition-all duration-300 cursor-pointer hover:shadow-xl"
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center group-hover:bg-medical-gold transition-colors">
                  <ArrowRight className="h-5 w-5 text-medical-gold group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Medical Staff</h3>
                  <p className="text-gray-600 mb-4">Healthcare provider access portal</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-yellow-50 text-medical-gold text-xs rounded-full">Sign Up</span>
                    <span className="px-3 py-1 bg-yellow-50 text-medical-gold text-xs rounded-full">Login</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-gray-500 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-medical-green rounded-full"></div>
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-medical-green rounded-full"></div>
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-medical-green rounded-full"></div>
                <span>6 Integrated Modules</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
          <p>&copy; 2025 HealthMR. Abia Starthon Project.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeNew;
