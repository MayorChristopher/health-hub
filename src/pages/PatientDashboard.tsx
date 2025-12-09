import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, FileText, Activity, Bell, Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const Sidebar = () => (
    <div className="space-y-2">
      <Button variant={activeTab === "overview" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("overview")}>
        <Activity className="mr-2 h-4 w-4" /> Overview
      </Button>
      <Button variant={activeTab === "records" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("records")}>
        <FileText className="mr-2 h-4 w-4" /> Medical Records
      </Button>
      <Button variant={activeTab === "appointments" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("appointments")}>
        <Calendar className="mr-2 h-4 w-4" /> Appointments
      </Button>
      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/")}>
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon"><Menu /></Button>
              </SheetTrigger>
              <SheetContent side="left"><Sidebar /></SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">Patient Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell /></Button>
            <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block"><Sidebar /></aside>

          {/* Main Content */}
          <main>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, John</h2>
                  <p className="text-muted-foreground">Here's your health overview</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card><CardHeader><CardTitle className="text-sm">Upcoming Appointments</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">2</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-sm">Active Prescriptions</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">3</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-sm">Recent Tests</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">1</p></CardContent></Card>
                </div>
                <Card>
                  <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div><p className="font-medium">Blood Test Results</p><p className="text-sm text-muted-foreground">2 days ago</p></div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div><p className="font-medium">Prescription Refill</p><p className="text-sm text-muted-foreground">5 days ago</p></div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "records" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Medical Records</h2>
                <div className="grid gap-4">
                  <Card><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="font-medium">Annual Checkup Report</p><p className="text-sm text-muted-foreground">Jan 15, 2024</p></div><Button size="sm">Download</Button></div></CardContent></Card>
                  <Card><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="font-medium">Blood Test Results</p><p className="text-sm text-muted-foreground">Dec 20, 2023</p></div><Button size="sm">Download</Button></div></CardContent></Card>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Appointments</h2>
                <Button>Book New Appointment</Button>
                <div className="grid gap-4">
                  <Card><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="font-medium">Dr. Sarah Johnson - Cardiology</p><p className="text-sm text-muted-foreground">Feb 10, 2024 at 10:00 AM</p></div><Button variant="outline" size="sm">Reschedule</Button></div></CardContent></Card>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
