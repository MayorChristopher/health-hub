import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Eye, Heart } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <img src="/logo.png" alt="HealthMR" className="h-10" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-12">
        <div className="text-center">
          <img src="/logo.png" alt="HealthMR" className="h-20 md:h-24 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About HealthMR</h1>
          <p className="text-xl text-gray-600">Transforming Healthcare in Abia State</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-medical-green mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            HealthMR was born from the Abia Starthon 2025, a vision to revolutionize healthcare delivery in Abia State and beyond. 
            We recognized the critical need for integrated electronic medical records that could serve the unique needs of Nigerian healthcare facilities.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our platform bridges the gap between traditional and modern healthcare, incorporating features for herbal medicine tracking 
            alongside conventional medical records, ensuring comprehensive patient care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-medical-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              To provide accessible, secure, and comprehensive electronic medical records for every Nigerian, 
              ensuring quality healthcare delivery across all facilities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-medical-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-medical-gold" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              A Nigeria where every patient's medical history is instantly accessible to authorized healthcare providers, 
              enabling better diagnosis and treatment outcomes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-medical-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
            <p className="text-gray-600 text-sm">
              Privacy, Security, Accessibility, Innovation, and Cultural Sensitivity guide everything we do. 
              We respect both modern and traditional healthcare practices.
            </p>
          </div>
        </div>

        <div className="bg-medical-green text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Abia Starthon 2025</h2>
          <p className="leading-relaxed mb-4">
            HealthMR is a proud product of the Abia Starthon 2025 initiative, demonstrating the innovative spirit 
            and technological capability of Abia State. This project showcases how local solutions can address 
            critical healthcare challenges.
          </p>
          <p className="leading-relaxed">
            We are committed to continuous improvement and expansion, with plans to integrate with more healthcare 
            facilities across Nigeria and implement advanced features like AI-powered diagnostics and telemedicine.
          </p>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate("/register")} className="bg-medical-green hover:bg-medical-dark">
            Join HealthMR Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
