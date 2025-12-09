import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, FileText, Calendar, Pill, TestTube, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const PatientDashboardNew = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

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
            <div className="w-8 h-8 bg-medical-green rounded flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-medical-green">HealthMR</span>
          </div>
          <Avatar><AvatarFallback className="bg-medical-green text-white">JD</AvatarFallback></Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className="hidden lg:block"><Sidebar /></aside>

          <main>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-medical-dark">Welcome, John Doe</h2>
                  <p className="text-gray-600">HealthMR ID: HMR-2024-001234</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <StatCard label="Upcoming Visits" value="2" />
                  <StatCard label="Active Prescriptions" value="3" />
                  <StatCard label="Pending Results" value="1" />
                </div>
                <Card className="p-6">
                  <h3 className="font-semibold text-medical-dark mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <ActivityItem title="Blood Test Completed" date="2 days ago" />
                    <ActivityItem title="Prescription Refilled" date="5 days ago" />
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "records" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-medical-dark">Medical Records</h2>
                <RecordCard title="Annual Checkup Report" date="Jan 15, 2024" />
                <RecordCard title="Blood Test Results" date="Dec 20, 2023" />
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-medical-dark">Appointments</h2>
                  <Button className="bg-medical-green hover:bg-medical-dark">Book New</Button>
                </div>
                <RecordCard title="Dr. Sarah Johnson - Cardiology" date="Feb 10, 2024 at 10:00 AM" action="Reschedule" />
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
    <Button size="sm" variant="outline" className="border-medical-green text-medical-green">View</Button>
  </div>
);

const RecordCard = ({ title, date, action }: { title: string; date: string; action?: string }) => (
  <Card className="p-4 flex justify-between items-center">
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <Button size="sm" className="bg-medical-green hover:bg-medical-dark">{action || "Download"}</Button>
  </Card>
);

export default PatientDashboardNew;
