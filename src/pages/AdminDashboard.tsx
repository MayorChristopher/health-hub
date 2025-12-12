import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Edit, Trash2, Search, Activity, FileText, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalPatients: 0, totalStaff: 0, totalConsultations: 0, totalLabTests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const { count: patientsCount } = await supabase.from('patients').select('*', { count: 'exact', head: true });
      const { count: staffCount } = await supabase.from('medical_staff').select('*', { count: 'exact', head: true });
      const { count: consultationsCount } = await supabase.from('consultations').select('*', { count: 'exact', head: true });
      const { count: labTestsCount } = await supabase.from('lab_tests').select('*', { count: 'exact', head: true });
      
      setStats({
        totalPatients: patientsCount || 0,
        totalStaff: staffCount || 0,
        totalConsultations: consultationsCount || 0,
        totalLabTests: labTestsCount || 0
      });

      // Fetch patients
      const { data: patientsData } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      setPatients(patientsData || []);

      // Fetch staff
      const { data: staffData } = await supabase
        .from('medical_staff')
        .select('*')
        .order('created_at', { ascending: false });
      setStaff(staffData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.healthmr_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nin?.includes(searchTerm)
  );

  const filteredStaff = staff.filter(s => 
    s.full_name?.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
    s.staff_id?.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
    s.role?.toLowerCase().includes(staffSearchTerm.toLowerCase())
  );

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-medical-green">{stats.totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-medical-green" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Medical Staff</p>
                <p className="text-2xl font-bold text-medical-green">{stats.totalStaff}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-medical-green" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Consultations</p>
                <p className="text-2xl font-bold text-medical-gold">{stats.totalConsultations}</p>
              </div>
              <FileText className="h-8 w-8 text-medical-gold" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lab Tests</p>
                <p className="text-2xl font-bold text-medical-gold">{stats.totalLabTests}</p>
              </div>
              <Activity className="h-8 w-8 text-medical-gold" />
            </div>
          </Card>
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
              {loading ? (
                <p className="text-center py-8 text-gray-500">Loading patients...</p>
              ) : filteredPatients.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No patients found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">HealthMR ID</th>
                        <th className="text-left py-3">Name</th>
                        <th className="text-left py-3">NIN</th>
                        <th className="text-left py-3">Phone</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Registered</th>
                        <th className="text-right py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr key={patient.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 font-mono text-sm">{patient.healthmr_id}</td>
                          <td className="py-3">{patient.first_name} {patient.last_name}</td>
                          <td className="py-3 font-mono text-sm">
                            {patient.nin || <span className="text-gray-400 italic">Temp: {patient.temp_id}</span>}
                          </td>
                          <td className="py-3">{patient.phone}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded ${
                              patient.record_status === 'verified' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {patient.record_status === 'verified' ? 'Verified' : 'Provisional'}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-600">
                            {new Date(patient.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 text-right">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/admin/edit-patient/${patient.id}`)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search staff..." className="pl-9" value={staffSearchTerm} onChange={(e) => setStaffSearchTerm(e.target.value)} />
              </div>
              <Button className="bg-medical-green hover:bg-medical-dark">
                <UserPlus className="h-4 w-4 mr-2" /> Add Staff
              </Button>
            </div>

            <Card className="p-6">
              {loading ? (
                <p className="text-center py-8 text-gray-500">Loading staff...</p>
              ) : filteredStaff.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No staff members found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Staff ID</th>
                        <th className="text-left py-3">Name</th>
                        <th className="text-left py-3">Role</th>
                        <th className="text-left py-3">Hospital ID</th>
                        <th className="text-left py-3">Phone</th>
                        <th className="text-left py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((member) => (
                        <tr key={member.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 font-mono text-sm">{member.staff_id}</td>
                          <td className="py-3">{member.full_name}</td>
                          <td className="py-3 capitalize">{member.role?.replace('_', ' ')}</td>
                          <td className="py-3">{member.hospital_id}</td>
                          <td className="py-3">{member.phone}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded ${
                              member.is_active 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {member.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
