import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Shield, Eye, FileCheck } from "lucide-react";

const DataProtection = () => {
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
            <Lock className="h-8 w-8 text-medical-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Data Protection</h1>
          <p className="text-gray-600">How we protect your medical information</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-medical-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Encryption</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              All data is encrypted using AES-256 encryption, the same standard used by banks and financial institutions. 
              Your medical records are protected both in transit and at rest.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mb-4">
              <Eye className="h-6 w-6 text-medical-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Access Control</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Only authorized healthcare providers directly involved in your care can access your records. 
              All access is logged and monitored for security purposes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mb-4">
              <FileCheck className="h-6 w-6 text-medical-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Audit Trails</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Every change to your medical records is logged with who made the change, when, and why. 
              This ensures complete accountability and transparency.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-medical-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Backups</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Your data is backed up daily to secure, geographically distributed servers. 
              In case of any system failure, your medical records remain safe and accessible.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Compliance Standards</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-medical-green pl-4">
              <h3 className="font-bold text-gray-900 mb-1">NDPR Compliance</h3>
              <p className="text-gray-700 text-sm">
                We fully comply with the Nigerian Data Protection Regulation (NDPR), ensuring your data rights 
                are protected under Nigerian law.
              </p>
            </div>

            <div className="border-l-4 border-medical-green pl-4">
              <h3 className="font-bold text-gray-900 mb-1">International Standards</h3>
              <p className="text-gray-700 text-sm">
                Our platform follows international best practices for healthcare data protection, including 
                ISO 27001 information security standards and healthcare-specific data protection guidelines.
              </p>
            </div>

            <div className="border-l-4 border-medical-green pl-4">
              <h3 className="font-bold text-gray-900 mb-1">Medical Records Act</h3>
              <p className="text-gray-700 text-sm">
                We adhere to Nigerian Medical Records Act requirements for proper storage, access, and retention 
                of medical records.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-medical-green text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Your Data Rights</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Right to access your medical records at any time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Right to request corrections to inaccurate information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Right to view who accessed your records and when</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Right to export your medical data in a portable format</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span>Right to file complaints about data protection violations</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Questions about data protection?</p>
          <Button onClick={() => navigate("/contact")} className="bg-medical-green hover:bg-medical-dark">
            Contact Our Data Protection Officer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataProtection;
