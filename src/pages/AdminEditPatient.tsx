import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminEditPatient = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<any>(null);
  const [editReason, setEditReason] = useState("");

  useEffect(() => {
    fetchPatient();
  }, [patientId]);

  const fetchPatient = async () => {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load patient data",
        variant: "destructive",
      });
      return;
    }

    setPatient(data);
  };

  const handleSave = async () => {
    if (!editReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for editing this record",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Get old values for audit
      const { data: oldData } = await supabase
        .from("patients")
        .select("*")
        .eq("id", patientId)
        .single();

      // Update patient record
      const { error: updateError } = await supabase
        .from("patients")
        .update({
          first_name: patient.first_name,
          last_name: patient.last_name,
          nin: patient.nin || null,
          phone: patient.phone,
          email: patient.email,
          date_of_birth: patient.date_of_birth,
          gender: patient.gender,
          blood_group: patient.blood_group,
          address: patient.address,
          state: patient.state,
          lga: patient.lga,
          occupation: patient.occupation,
          next_of_kin_name: patient.next_of_kin_name,
          next_of_kin_phone: patient.next_of_kin_phone,
          record_status: patient.record_status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", patientId);

      if (updateError) throw updateError;

      // Log to audit trail
      const adminSession = JSON.parse(localStorage.getItem("admin_session") || "{}");
      await supabase.from("audit_log").insert({
        admin_id: adminSession.id,
        action: "edit_patient",
        table_name: "patients",
        record_id: patientId,
        old_values: oldData,
        new_values: patient,
        reason: editReason,
      });

      toast({
        title: "Success",
        description: "Patient record updated successfully",
      });

      navigate("/admin-dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin-dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Edit Patient Record</h1>
              <p className="text-sm text-gray-500">{patient.healthmr_id}</p>
            </div>
          </div>
          <Badge variant={patient.record_status === "verified" ? "default" : "secondary"}>
            {patient.record_status?.toUpperCase()}
          </Badge>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Card className="p-8">
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Admin Edit Mode</p>
                <p className="text-sm text-yellow-800">
                  All changes will be logged in the audit trail. Provide a clear reason for editing.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={patient.first_name}
                    onChange={(e) => setPatient({ ...patient, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={patient.last_name}
                    onChange={(e) => setPatient({ ...patient, last_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>NIN {patient.temp_id && "(Optional - Has Temp ID)"}</Label>
                  <Input
                    value={patient.nin || ""}
                    onChange={(e) => setPatient({ ...patient, nin: e.target.value })}
                    maxLength={11}
                    placeholder={patient.temp_id ? "Add NIN to verify record" : ""}
                  />
                  {patient.temp_id && (
                    <p className="text-xs text-gray-500 mt-1">Temp ID: {patient.temp_id}</p>
                  )}
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={patient.phone}
                    onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={patient.email || ""}
                    onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={patient.date_of_birth}
                    onChange={(e) => setPatient({ ...patient, date_of_birth: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select
                    value={patient.gender}
                    onValueChange={(value) => setPatient({ ...patient, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Blood Group</Label>
                  <Select
                    value={patient.blood_group || ""}
                    onValueChange={(value) => setPatient({ ...patient, blood_group: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Address</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label>Residential Address</Label>
                  <Input
                    value={patient.address}
                    onChange={(e) => setPatient({ ...patient, address: e.target.value })}
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={patient.state}
                    onChange={(e) => setPatient({ ...patient, state: e.target.value })}
                  />
                </div>
                <div>
                  <Label>LGA</Label>
                  <Input
                    value={patient.lga}
                    onChange={(e) => setPatient({ ...patient, lga: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Next of Kin */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Next of Kin</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={patient.next_of_kin_name}
                    onChange={(e) => setPatient({ ...patient, next_of_kin_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={patient.next_of_kin_phone}
                    onChange={(e) => setPatient({ ...patient, next_of_kin_phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Record Status */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Record Status</h2>
              <Select
                value={patient.record_status}
                onValueChange={(value) => setPatient({ ...patient, record_status: value })}
              >
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Verified (Has NIN)</SelectItem>
                  <SelectItem value="provisional">Provisional (No NIN)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Edit Reason */}
            <div>
              <Label className="text-red-600">Reason for Edit *</Label>
              <Textarea
                value={editReason}
                onChange={(e) => setEditReason(e.target.value)}
                placeholder="e.g., Patient reported incorrect phone number, Correcting typo in name, Adding NIN to upgrade provisional record"
                rows={3}
                className="mt-2"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button variant="outline" onClick={() => navigate("/admin-dashboard")} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading} className="flex-1 bg-medical-green">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminEditPatient;
