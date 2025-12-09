import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Edit, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="HealthMR" className="h-10" />
            <span className="font-semibold">Admin Dashboard</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Logout</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Management</h1>
          <p className="text-gray-600">Manage patients, staff, and system settings</p>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="staff">Medical Staff</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search patients..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button className="bg-medical-green hover:bg-medical-dark">
                <UserPlus className="h-4 w-4 mr-2" /> Add Patient
              </Button>
            </div>

            <Card className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">HealthMR ID</th>
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">NIN</th>
                    <th className="text-left py-3">Phone</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">HMR-2025-000001</td>
                    <td className="py-3">John Doe</td>
                    <td className="py-3">12345678901</td>
                    <td className="py-3">08012345678</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search staff..." className="pl-9" />
              </div>
              <Button className="bg-medical-green hover:bg-medical-dark">
                <UserPlus className="h-4 w-4 mr-2" /> Add Staff
              </Button>
            </div>

            <Card className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Staff ID</th>
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">Role</th>
                    <th className="text-left py-3">Hospital ID</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">STF-2025-000001</td>
                    <td className="py-3">Dr. Sarah Johnson</td>
                    <td className="py-3">Doctor</td>
                    <td className="py-3">FMC-UMUAHIA</td>
                    <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span></td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Settings</h3>
              <p className="text-gray-600">Configure system-wide settings and preferences</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
