import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, FileText, TestTube, Pill } from "lucide-react";
import { AuditTrailViewer } from "@/components/AuditTrailViewer";
import { DoctorSignature } from "@/components/DoctorSignature";

const PatientRecordView = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [labTests, setLabTests] = useState<any[]>([]);

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const fetchPatientData = async () => {
    // Fetch patient
    const { data: patientData } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single();
    setPatient(patientData);

    // Fetch consultations with doctor info
    const { data: consultData } = await supabase
      .from("consultations")
      .select("*, medical_staff(full_name, staff_id)")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false });
    setConsultations(consultData || []);

    // Fetch prescriptions with doctor info
    const { data: prescData } = await supabase
      .from("prescriptions")
      .select("*, medical_staff(full_name, staff_id)")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false });
    setPrescriptions(prescData || []);

    // Fetch lab tests
    const { data: labData } = await supabase
      .from("lab_tests")
      .select("*")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false });
    setLabTests(labData || []);
  };

  if (!patient) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Patient Medical Record</h1>
            <p className="text-sm text-gray-600">{patient.healthmr_id}</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Patient Info */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-medical-green rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{patient.first_name} {patient.last_name}</h2>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                <span>DOB: {new Date(patient.date_of_birth).toLocaleDateString()}</span>
                <span>•</span>
                <span>Gender: {patient.gender}</span>
                <span>•</span>
                <span>Blood: {patient.blood_group || "N/A"}</span>
                <span>•</span>
                <Badge variant={patient.record_status === "verified" ? "default" : "secondary"}>
                  {patient.record_status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Audit Trail for Patient Record */}
        <AuditTrailViewer recordId={patientId!} tableName="patients" />

        {/* Medical Records Tabs */}
        <Tabs defaultValue="consultations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultations">
              <FileText className="h-4 w-4 mr-2" />
              Consultations
            </TabsTrigger>
            <TabsTrigger value="prescriptions">
              <Pill className="h-4 w-4 mr-2" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="lab">
              <TestTube className="h-4 w-4 mr-2" />
              Lab Tests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultations" className="space-y-4">
            {consultations.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">No consultations found</Card>
            ) : (
              consultations.map((consult) => (
                <Card key={consult.id} className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">Consultation</h3>
                      <p className="text-sm text-gray-600">{new Date(consult.created_at).toLocaleString()}</p>
                    </div>
                    <Badge>{consult.consultation_type || "General"}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-sm">Chief Complaint:</span>
                      <p className="text-gray-700">{consult.chief_complaint}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Diagnosis:</span>
                      <p className="text-gray-700">{consult.diagnosis}</p>
                    </div>
                    {consult.treatment_plan && (
                      <div>
                        <span className="font-semibold text-sm">Treatment Plan:</span>
                        <p className="text-gray-700">{consult.treatment_plan}</p>
                      </div>
                    )}
                  </div>

                  {/* Doctor Signature */}
                  {consult.signed_by_staff_id && consult.medical_staff && (
                    <DoctorSignature
                      doctorName={consult.medical_staff.full_name}
                      staffId={consult.medical_staff.staff_id}
                      signedAt={consult.signed_at || consult.created_at}
                      diagnosis={consult.diagnosis}
                    />
                  )}

                  {/* Audit Trail for this consultation */}
                  <AuditTrailViewer recordId={consult.id} tableName="consultations" />
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            {prescriptions.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">No prescriptions found</Card>
            ) : (
              prescriptions.map((presc) => (
                <Card key={presc.id} className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{presc.medication_name}</h3>
                      <p className="text-sm text-gray-600">{new Date(presc.created_at).toLocaleString()}</p>
                    </div>
                    <Badge variant={presc.status === "active" ? "default" : "secondary"}>
                      {presc.status}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Dosage:</span> {presc.dosage}
                    </div>
                    <div>
                      <span className="font-semibold">Frequency:</span> {presc.frequency}
                    </div>
                    <div>
                      <span className="font-semibold">Duration:</span> {presc.duration}
                    </div>
                    {presc.instructions && (
                      <div className="md:col-span-2">
                        <span className="font-semibold">Instructions:</span> {presc.instructions}
                      </div>
                    )}
                  </div>

                  {/* Doctor Signature */}
                  {presc.signed_by_staff_id && presc.medical_staff && (
                    <DoctorSignature
                      doctorName={presc.medical_staff.full_name}
                      staffId={presc.medical_staff.staff_id}
                      signedAt={presc.signed_at || presc.created_at}
                      prescription={`${presc.medication_name} - ${presc.dosage}, ${presc.frequency} for ${presc.duration}`}
                    />
                  )}

                  <AuditTrailViewer recordId={presc.id} tableName="prescriptions" />
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="lab" className="space-y-4">
            {labTests.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">No lab tests found</Card>
            ) : (
              labTests.map((test) => (
                <Card key={test.id} className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{test.test_name}</h3>
                      <p className="text-sm text-gray-600">{new Date(test.created_at).toLocaleString()}</p>
                    </div>
                    <Badge variant={test.status === "completed" ? "default" : "secondary"}>
                      {test.status}
                    </Badge>
                  </div>

                  {test.results && (
                    <div>
                      <span className="font-semibold text-sm">Results:</span>
                      <p className="text-gray-700 mt-1">{test.results}</p>
                    </div>
                  )}

                  <AuditTrailViewer recordId={test.id} tableName="lab_tests" />
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientRecordView;
