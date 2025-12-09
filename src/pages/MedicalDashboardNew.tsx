import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, FileText, TestTube, Pill, Activity, LogOut, Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const MedicalDashboardNew = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const Sidebar = () => (
    <div className="space-y-1">
      {[
        { id: "overview", icon: Activity, label: "Dashboard" },
        { id: "patients", icon: Users, label: "Patients" },
        { id: "appointments", icon: Calendar, label: "Appointments" },
        { id: "consultations", icon: FileText, label: "Consultations" },
        { id: "lab", icon: TestTube, label: "Laboratory" },
        { id: "pharmacy", icon: Pill, label: "Pharmacy" },
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
            <div className="w-8 h-8 bg-medical-green rounded flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-medical-green">HealthMR</span>
          </div>
          <Avatar><AvatarFallback className="bg-medical-gold text-white">DS</AvatarFallback></Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className="hidden lg:block"><Sidebar /></aside>

          <main>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-medical-dark">Dr. Sarah Johnson</h2>
                  <p className="text-gray-600">Cardiology Department</p>
                </div>
                <div className="grid sm:grid-cols-4 gap-4">
                  <StatCard label="Today's Appointments" value="8" color="green" />
                  <StatCard label="Active Patients" value="124" color="gold" />
                  <StatCard label="Pending Reviews" value="5" color="green" />
                  <StatCard label="Lab Results" value="12" color="gold" />
                </div>
                <Card className="p-6">
                  <h3 className="font-semibold text-medical-dark mb-4">Today's Schedule</h3>
                  <div className="space-y-3">
                    <ScheduleItem patient="John Doe" type="Checkup" time="9:00 AM" />
                    <ScheduleItem patient="Jane Smith" type="Follow-up" time="10:30 AM" />
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "patients" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <h2 className="text-2xl font-bold text-medical-dark">Patients</h2>
                  <div className="flex gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search patients..." className="pl-9" />
                    </div>
                    <Button className="bg-medical-green hover:bg-medical-dark">Add Patient</Button>
                  </div>
                </div>
                <PatientCard name="John Doe" id="HMR-2024-001234" lastVisit="Jan 15, 2024" />
                <PatientCard name="Jane Smith" id="HMR-2024-001235" lastVisit="Jan 10, 2024" />
              </div>
            )}

            {activeTab === "consultations" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-medical-dark">Consultations</h2>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">New Consultation</h3>
                  <div className="space-y-4">
                    <Input placeholder="Patient HealthMR ID" />
                    <Button className="bg-medical-green hover:bg-medical-dark">Start Consultation</Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "lab" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-medical-dark">Laboratory</h2>
                  <Button className="bg-medical-green hover:bg-medical-dark">Request Test</Button>
                </div>
                <LabCard patient="John Doe" test="Blood Test" status="Completed" date="Jan 15, 2024" />
              </div>
            )}

            {activeTab === "pharmacy" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-medical-dark">Pharmacy</h2>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Prescription Management</h3>
                  <p className="text-gray-600">View and manage patient prescriptions with drug interaction alerts</p>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <Card className="p-4">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className={`text-3xl font-bold ${color === "green" ? "text-medical-green" : "text-medical-gold"}`}>{value}</p>
  </Card>
);

const ScheduleItem = ({ patient, type, time }: { patient: string; type: string; time: string }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-0">
    <div>
      <p className="font-medium text-gray-900">{patient} - {type}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
    <Button size="sm" className="bg-medical-green hover:bg-medical-dark">View</Button>
  </div>
);

const PatientCard = ({ name, id, lastVisit }: { name: string; id: string; lastVisit: string }) => (
  <Card className="p-4 flex justify-between items-center">
    <div>
      <p className="font-medium text-gray-900">{name}</p>
      <p className="text-sm text-gray-500">{id} • Last visit: {lastVisit}</p>
    </div>
    <Button size="sm" className="bg-medical-green hover:bg-medical-dark">View Records</Button>
  </Card>
);

const LabCard = ({ patient, test, status, date }: { patient: string; test: string; status: string; date: string }) => (
  <Card className="p-4 flex justify-between items-center">
    <div>
      <p className="font-medium text-gray-900">{patient} - {test}</p>
      <p className="text-sm text-gray-500">{date} • <span className="text-medical-green">{status}</span></p>
    </div>
    <Button size="sm" className="bg-medical-green hover:bg-medical-dark">View Results</Button>
  </Card>
);

export default MedicalDashboardNew;
