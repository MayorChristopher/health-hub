import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, FileText, Bell, Menu, LogOut, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const MedicalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const Sidebar = () => (
    <div className="space-y-2">
      <Button variant={activeTab === "overview" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("overview")}>
        <Users className="mr-2 h-4 w-4" /> Overview
      </Button>
      <Button variant={activeTab === "patients" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("patients")}>
        <Users className="mr-2 h-4 w-4" /> Patients
      </Button>
      <Button variant={activeTab === "appointments" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("appointments")}>
        <Calendar className="mr-2 h-4 w-4" /> Appointments
      </Button>
      <Button variant={activeTab === "records" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("records")}>
        <FileText className="mr-2 h-4 w-4" /> Records
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
            <h1 className="text-xl font-bold">Medical Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell /></Button>
            <Avatar><AvatarFallback>DS</AvatarFallback></Avatar>
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
                  <h2 className="text-2xl font-bold mb-2">Welcome, Dr. Smith</h2>
                  <p className="text-muted-foreground">Today's overview</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card><CardHeader><CardTitle className="text-sm">Today's Appointments</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">8</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-sm">Active Patients</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">124</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-sm">Pending Reviews</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">5</p></CardContent></Card>
                  <Card><CardHeader><CardTitle className="text-sm">Messages</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">12</p></CardContent></Card>
                </div>
                <Card>
                  <CardHeader><CardTitle>Today's Schedule</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div><p className="font-medium">John Doe - Checkup</p><p className="text-sm text-muted-foreground">9:00 AM</p></div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div><p className="font-medium">Jane Smith - Follow-up</p><p className="text-sm text-muted-foreground">10:30 AM</p></div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "patients" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <h2 className="text-2xl font-bold">Patients</h2>
                  <div className="flex gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search patients..." className="pl-9" />
                    </div>
                    <Button>Add Patient</Button>
                  </div>
                </div>
                <div className="grid gap-4">
                  <Card><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="font-medium">John Doe</p><p className="text-sm text-muted-foreground">Last visit: Jan 15, 2024</p></div><Button size="sm">View Records</Button></div></CardContent></Card>
                  <Card><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="font-medium">Jane Smith</p><p className="text-sm text-muted-foreground">Last visit: Jan 10, 2024</p></div><Button size="sm">View Records</Button></div></CardContent></Card>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Appointments</h2>
                  <Button>Schedule New</Button>
                </div>
                <div className="grid gap-4">
                  <Card><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="font-medium">John Doe - Annual Checkup</p><p className="text-sm text-muted-foreground">Feb 10, 2024 at 9:00 AM</p></div><Button variant="outline" size="sm">Reschedule</Button></div></CardContent></Card>
                </div>
              </div>
            )}

            {activeTab === "records" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Patient Records</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search records..." className="pl-9" />
                </div>
                <div className="grid gap-4">
                  <Card><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="font-medium">John Doe - Blood Test Results</p><p className="text-sm text-muted-foreground">Jan 15, 2024</p></div><Button size="sm">View</Button></div></CardContent></Card>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
