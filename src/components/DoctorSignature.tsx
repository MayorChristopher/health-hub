import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Clock } from "lucide-react";

interface DoctorSignatureProps {
  doctorName: string;
  staffId: string;
  signedAt: string;
  diagnosis?: string;
  prescription?: string;
}

export const DoctorSignature = ({ doctorName, staffId, signedAt, diagnosis, prescription }: DoctorSignatureProps) => {
  return (
    <Card className="p-4 bg-green-50 border-green-300 border-2">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-green-900">Legally Signed & Verified</h4>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Doctor:</span>
              <span className="text-gray-900">{doctorName}</span>
              <Badge variant="outline" className="text-xs">{staffId}</Badge>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-3 w-3" />
              <span>Signed on {new Date(signedAt).toLocaleString()}</span>
            </div>

            {diagnosis && (
              <div className="pt-2 border-t border-green-200">
                <span className="font-semibold text-gray-700">Diagnosis:</span>
                <p className="text-gray-900 mt-1">{diagnosis}</p>
              </div>
            )}

            {prescription && (
              <div className="pt-2 border-t border-green-200">
                <span className="font-semibold text-gray-700">Prescription:</span>
                <p className="text-gray-900 mt-1">{prescription}</p>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-xs text-green-800 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              This record is legally binding and cannot be modified without audit trail
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
