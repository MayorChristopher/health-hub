import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

const Privacy = () => {
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

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-medical-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              HealthMR collects and processes the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Personal identification information (Name, NIN, Date of Birth)</li>
              <li>Contact information (Phone, Email, Address)</li>
              <li>Medical records (Consultations, Diagnoses, Prescriptions, Lab Results)</li>
              <li>Herbal medicine usage information</li>
              <li>Biometric data (if provided for provisional registration)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Your information is used exclusively for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Providing healthcare services and maintaining medical records</li>
              <li>Enabling authorized healthcare providers to access your medical history</li>
              <li>Improving healthcare delivery and patient outcomes</li>
              <li>Complying with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement bank-level encryption (AES-256) to protect your data. All information is stored securely 
              in compliance with Nigerian Data Protection Regulation (NDPR) and international healthcare data protection standards. 
              Access is restricted to authorized healthcare providers only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We NEVER share your personal health information without your explicit consent, except when required by law 
              or for emergency medical treatment. Your data is accessible only to healthcare providers directly involved 
              in your care.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access your medical records at any time</li>
              <li>Request corrections to inaccurate information</li>
              <li>View the audit trail of all changes to your records</li>
              <li>Withdraw consent for data processing (subject to legal requirements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For privacy-related questions or concerns, contact us at:
              <br />
              Email: privacy@healthmr.ng
              <br />
              Phone: +234 912 329 7491
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
