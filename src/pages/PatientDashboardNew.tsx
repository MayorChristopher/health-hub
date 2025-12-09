import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, FileText, Calendar, Pill, TestTube, LogOut, Menu, Download } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { AddMedicalTestDialog } from "@/components/AddMedicalTestDialog";

const PatientDashboardNew = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [patientData, setPatientData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [labTests, setLabTests] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/patient-login');
      return;
    }

    const { data: patient } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (patient) {
      setPatientData(patient);
      
      const { data: appts } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patient.id)
        .order('appointment_date', { ascending: false })
        .limit(5);
      if (appts) setAppointments(appts);

      const { data: labs } = await supabase
        .from('lab_tests')
        .select('*')
        .eq('patient_id', patient.id)
        .order('completed_at', { ascending: false });
      if (labs) setLabTests(labs);

      const { data: consults } = await supabase
        .from('consultations')
        .select('*')
        .eq('patient_id', patient.id)
        .order('consultation_date', { ascending: false });
      if (consults) setConsultations(consults);

      const { data: presc } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('patient_id', patient.id)
        .eq('status', 'active')
        .order('prescribed_at', { ascending: false });
      if (presc) setPrescriptions(presc);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const Sidebar = () => (
    <div className="space-y-1">
      {[
        { id: "overview", icon: Activity, label: "Overview" },
        { id: "records", icon: FileText, label: "Medical Records" },
        { id: "appointments", icon: Calendar, label: "Appointments" },
        { id: "prescriptions", icon: Pill, label: "Prescriptions" },
        { id: "labs", icon: TestTube, label: "Lab Results" },
      ].map((item) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "default" : "ghost"}
          className={`w-full justify-start ${activeTab === item.id ? "bg-medical-green hover:bg-medical-dark" : ""}`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon className="mr-2 h-4 w-4" /> {item.label}
        </Button>
      ))}
      <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => navigate("/")}>
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon"><Menu /></Button>
              </SheetTrigger>
              <SheetContent side="left"><Sidebar /></SheetContent>
            </Sheet>
            <img src="/logo.png" alt="HealthMR" className="h-10" />
            <span className="font-bold text-medical-green">HealthMR</span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className="hidden lg:block"><Sidebar /></aside>

          <main>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-medical-dark">Welcome, {patientData?.first_name || 'Patient'}</h2>
                  <p className="text-gray-600">HealthMR ID: {patientData?.healthmr_id || 'Loading...'}</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <StatCard label="Upcoming Visits" value={appointments.length.toString()} />
                  <StatCard label="Active Prescriptions" value={prescriptions.length.toString()} />
                  <StatCard label="Lab Tests" value={labTests.length.toString()} />
                </div>
                <Card className="p-6">
                  <h3 className="font-semibold text-medical-dark mb-4">Recent Activity</h3>
                  {!patientData ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                  ) : appointments.length > 0 ? (
                    <div className="space-y-3">
                      {appointments.map((apt) => (
                        <ActivityItem key={apt.id} title={apt.reason || 'Appointment'} date={new Date(apt.appointment_date).toLocaleDateString()} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No recent activity</p>
                  )}
                </Card>
              </div>
            )}

            {activeTab === "records" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-medical-dark">Medical Records</h2>
                {consultations.length > 0 ? (
                  <div className="space-y-4">
                    {consultations.map((c) => (
                      <Card key={c.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-medical-dark">{c.chief_complaint}</p>
                            <p className="text-sm text-gray-600 mt-1"><strong>Diagnosis:</strong> {c.diagnosis || 'N/A'}</p>
                            <p className="text-sm text-gray-600"><strong>Treatment:</strong> {c.treatment_plan || 'N/A'}</p>
                            <p className="text-xs text-gray-500 mt-2">{new Date(c.consultation_date).toLocaleString()}</p>
                          </div>
                          <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No medical records available yet. Records will appear here after consultations.</p>
                )}
              </div>
            )}

            {activeTab === "prescriptions" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-medical-dark">Prescriptions</h2>
                {prescriptions.length > 0 ? (
                  <div className="space-y-4">
                    {prescriptions.map((p) => (
                      <Card key={p.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-medical-dark">{p.medication_name}</p>
                            <p className="text-sm text-gray-600"><strong>Dosage:</strong> {p.dosage}</p>
                            <p className="text-sm text-gray-600"><strong>Frequency:</strong> {p.frequency}</p>
                            <p className="text-sm text-gray-600"><strong>Duration:</strong> {p.duration}</p>
                            <p className="text-xs text-gray-500 mt-2">Prescribed: {new Date(p.prescribed_at).toLocaleDateString()}</p>
                          </div>
                          <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No active prescriptions. Prescriptions from consultations will appear here.</p>
                )}
              </div>
            )}

            {activeTab === "labs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-medical-dark">Lab Results</h2>
                  {patientData && <AddMedicalTestDialog patientId={patientData.id} onSuccess={fetchPatientData} />}
                </div>
                {labTests.length > 0 ? (
                  <div className="space-y-4">
                    {labTests.map((test) => (
                      <Card key={test.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-medical-dark">{test.test_type}</p>
                            <p className="text-sm text-gray-600 mt-1"><strong>Results:</strong> {test.results}</p>
                            {test.notes && <p className="text-sm text-gray-600"><strong>Notes:</strong> {test.notes}</p>}
                            <p className="text-xs text-gray-500 mt-2">
                              {test.completed_at ? `Completed: ${new Date(test.completed_at).toLocaleDateString()}` : 'Pending'}
                            </p>
                          </div>
                          <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No lab results available yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Add your medical test results using the button above.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-medical-dark">Appointments</h2>
                  <Button className="bg-medical-green hover:bg-medical-dark" onClick={() => alert('Appointment booking coming soon!')}>Book New</Button>
                </div>
                {appointments.length > 0 ? (
                  appointments.map((apt) => (
                    <RecordCard 
                      key={apt.id}
                      title={apt.reason || 'Appointment'} 
                      date={new Date(apt.appointment_date).toLocaleString()} 
                      action="View" 
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No appointments scheduled</p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <Card className="p-4">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="text-3xl font-bold text-medical-green">{value}</p>
  </Card>
);

const ActivityItem = ({ title, date }: { title: string; date: string }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-0">
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <Button size="sm" variant="outline" className="border-medical-green text-medical-green" onClick={() => alert('View details coming soon!')}>View</Button>
  </div>
);

const RecordCard = ({ title, date, action }: { title: string; date: string; action?: string }) => (
  <Card className="p-4 flex justify-between items-center">
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <Button size="sm" className="bg-medical-green hover:bg-medical-dark" onClick={() => alert('Feature coming soon!')}>{action || "Download"}</Button>
  </Card>
);

export default PatientDashboardNew;
