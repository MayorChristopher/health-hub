import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const AdminVerifyStaff = () => {
  const navigate = useNavigate();
  const [pendingStaff, setPendingStaff] = useState<any[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [verificationData, setVerificationData] = useState({
    mdcnNumber: "",
    licenseExpiry: "",
    verificationNotes: "",
  });

  useEffect(() => {
    checkAuth();
    fetchPendingStaff();
  }, []);

  const checkAuth = () => {
    const session = localStorage.getItem("admin_session");
    if (!session) {
      toast({
        title: "Unauthorized",
        description: "Please login as admin first",
        variant: "destructive",
      });
      navigate("/admin");
    }
  };

  const fetchPendingStaff = async () => {
    const { data } = await supabase
      .from("medical_staff")
      .select("*")
      .eq("is_active", false)
      .order("created_at", { ascending: false });
    
    if (data) setPendingStaff(data);
  };

  const handleApprove = async () => {
    if (!verificationData.mdcnNumber) {
      toast({
        title: "MDCN Number Required",
        description: "You must verify and enter the practitioner's MDCN registration number",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("medical_staff")
        .update({
          is_active: true,
          mdcn_number: verificationData.mdcnNumber,
          license_expiry: verificationData.licenseExpiry || null,
          verification_notes: verificationData.verificationNotes || null,
          verified_at: new Date().toISOString(),
        })
        .eq("id", selectedStaff.id);

      if (error) {
        console.error('Approval error:', error);
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }

      toast({
        title: "✅ Staff Approved",
        description: `${selectedStaff.full_name} can now access patient records`,
      });

      setSelectedStaff(null);
      setVerificationData({ mdcnNumber: '', licenseExpiry: '', verificationNotes: '' });
      fetchPendingStaff();
    } catch (error) {
      console.error('Approval error:', error);
      toast({ title: "Error", description: "Failed to approve staff", variant: "destructive" });
    }
  };

  const handleReject = async () => {
    if (!confirm(`Are you sure you want to reject ${selectedStaff.full_name}'s registration?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("medical_staff")
        .delete()
        .eq("id", selectedStaff.id);

      if (error) {
        console.error('Rejection error:', error);
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }

      toast({
        title: "❌ Registration Rejected",
        description: "Staff registration has been removed",
      });

      setSelectedStaff(null);
      setVerificationData({ mdcnNumber: '', licenseExpiry: '', verificationNotes: '' });
      fetchPendingStaff();
    } catch (error) {
      console.error('Rejection error:', error);
      toast({ title: "Error", description: "Failed to reject staff", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin-dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Staff Verification</h1>
            <p className="text-sm text-gray-600">Verify medical licenses before granting access</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">⚖️ Legal Requirement</h3>
              <p className="text-sm text-red-800">
                Under the <strong>Medical and Dental Practitioners Act</strong> and <strong>Code of Medical Ethics</strong>, 
                you MUST verify each practitioner's MDCN registration before granting access to patient health information (PHI). 
                Failure to do so violates patient confidentiality laws and can result in license revocation.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pending Verifications</h2>
          <p className="text-gray-600">{pendingStaff.length} staff awaiting approval</p>
        </div>

        {pendingStaff.length === 0 ? (
          <Card className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-600">No pending staff verifications</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingStaff.map((staff) => (
              <Card key={staff.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{staff.full_name}</h3>
                      <Badge variant="secondary">{staff.staff_id}</Badge>
                      <Badge className="bg-yellow-500">{staff.role}</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p><strong>Hospital:</strong> {staff.hospital_id}</p>
                      <p><strong>Phone:</strong> {staff.phone}</p>
                      <p><strong>Email:</strong> {staff.email || "N/A"}</p>
                      <p><strong>Registered:</strong> {new Date(staff.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setSelectedStaff(staff)}
                    className="bg-medical-green hover:bg-medical-dark"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Verify License
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Verification Dialog */}
      <Dialog open={!!selectedStaff} onOpenChange={() => setSelectedStaff(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Verify Medical License</DialogTitle>
          </DialogHeader>
          
          {selectedStaff && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Practitioner:</strong> {selectedStaff.full_name} ({selectedStaff.role})
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  ⚠️ <strong>Verification Steps:</strong>
                  <br />1. Visit <a href="https://www.mdcn.gov.ng" target="_blank" rel="noopener noreferrer" className="underline">MDCN Portal</a> to verify registration
                  <br />2. Confirm practitioner's name, specialty, and license status
                  <br />3. Enter verified MDCN number below
                </p>
              </div>

              <div>
                <Label htmlFor="mdcn">MDCN Registration Number *</Label>
                <Input
                  id="mdcn"
                  placeholder="e.g., MDCN/2024/12345"
                  value={verificationData.mdcnNumber}
                  onChange={(e) => setVerificationData({...verificationData, mdcnNumber: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="expiry">License Expiry Date</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={verificationData.licenseExpiry}
                  onChange={(e) => setVerificationData({...verificationData, licenseExpiry: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="notes">Verification Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any verification notes..."
                  value={verificationData.verificationNotes}
                  onChange={(e) => setVerificationData({...verificationData, verificationNotes: e.target.value})}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button onClick={handleApprove} className="bg-medical-green hover:bg-medical-dark">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve & Activate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVerifyStaff;
