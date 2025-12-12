import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

const Terms = () => {
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
            <FileText className="h-8 w-8 text-medical-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using HealthMR, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              As a user of HealthMR, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide accurate and truthful information during registration</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Use the platform only for legitimate healthcare purposes</li>
              <li>Respect the privacy and confidentiality of other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Healthcare Provider Obligations</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Healthcare providers using HealthMR must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Maintain valid professional licenses and credentials</li>
              <li>Provide accurate diagnoses and prescriptions</li>
              <li>Digitally sign all medical records they create</li>
              <li>Comply with all applicable medical regulations and standards</li>
              <li>Maintain patient confidentiality at all times</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Users are strictly prohibited from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Accessing medical records without proper authorization</li>
              <li>Sharing login credentials with unauthorized persons</li>
              <li>Tampering with or falsifying medical records</li>
              <li>Using the platform for fraudulent purposes</li>
              <li>Attempting to breach system security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              HealthMR provides a platform for storing and managing medical records. We are not responsible for 
              medical decisions made by healthcare providers or the accuracy of information entered by users. 
              All medical advice should be obtained from qualified healthcare professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Service Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of our services at any time. 
              We will provide reasonable notice of significant changes that affect your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account if you violate these terms or engage in activities that 
              harm other users or the platform. You may also request account termination at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be 
              resolved in accordance with Nigerian law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms, contact us at:
              <br />
              Email: legal@healthmr.ng
              <br />
              Phone: +234 912 329 7491
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
