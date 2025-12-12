import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Activity, Edit, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SelfReportedVitalsProps {
  patientId: string;
  vitals: any[];
  onUpdate: () => void;
}

const SelfReportedVitals = ({ patientId, vitals, onUpdate }: SelfReportedVitalsProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    temperature: "",
    pulse: "",
    blood_pressure: "",
    symptoms: "",
    notes: "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.from("self_reported_vitals").insert({
        patient_id: patientId,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        pulse: formData.pulse ? parseInt(formData.pulse) : null,
        blood_pressure: formData.blood_pressure || null,
        symptoms: formData.symptoms || null,
        notes: formData.notes || null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your vitals have been recorded",
      });

      setFormData({
        temperature: "",
        pulse: "",
        blood_pressure: "",
        symptoms: "",
        notes: "",
      });
      setOpen(false);
      onUpdate();
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Self-Reported Vitals</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="border-blue-500 text-blue-600">
              <Activity className="h-4 w-4 mr-2" />
              Add Vitals
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Your Vitals</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  ℹ️ These are self-reported measurements for tracking trends. Your doctor will take official readings during consultation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Temperature (°C)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="37.5"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Pulse (bpm)</Label>
                  <Input
                    type="number"
                    placeholder="72"
                    value={formData.pulse}
                    onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Blood Pressure</Label>
                <Input
                  placeholder="120/80"
                  value={formData.blood_pressure}
                  onChange={(e) => setFormData({ ...formData, blood_pressure: e.target.value })}
                />
              </div>

              <div>
                <Label>Symptoms</Label>
                <Textarea
                  placeholder="Headache, fever, body aches..."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any other observations..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                />
              </div>

              <Button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600">
                {loading ? "Saving..." : "Save Vitals"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Display Self-Reported Vitals */}
      <div className="space-y-3">
        {vitals.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-gray-500">
              <Activity className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>No self-reported vitals yet</p>
              <p className="text-sm">Track your health measurements here</p>
            </CardContent>
          </Card>
        ) : (
          vitals.map((vital) => (
            <Card key={vital.id} className="border-l-4 border-l-blue-500 bg-blue-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500">Your Input</Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(vital.recorded_at).toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {vital.temperature && (
                    <div>
                      <p className="text-gray-600">Temperature</p>
                      <p className="font-semibold">{vital.temperature}°C</p>
                    </div>
                  )}
                  {vital.pulse && (
                    <div>
                      <p className="text-gray-600">Pulse</p>
                      <p className="font-semibold">{vital.pulse} bpm</p>
                    </div>
                  )}
                  {vital.blood_pressure && (
                    <div>
                      <p className="text-gray-600">BP</p>
                      <p className="font-semibold">{vital.blood_pressure}</p>
                    </div>
                  )}
                </div>
                {vital.symptoms && (
                  <div>
                    <p className="text-xs text-gray-600">Symptoms:</p>
                    <p className="text-sm">{vital.symptoms}</p>
                  </div>
                )}
                {vital.notes && (
                  <div>
                    <p className="text-xs text-gray-600">Notes:</p>
                    <p className="text-sm">{vital.notes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-blue-100 border-t border-blue-200 py-2">
                <div className="flex items-center gap-2 text-xs text-blue-800">
                  <AlertCircle className="h-3 w-3" />
                  <span>Self-reported - For trend tracking only</span>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SelfReportedVitals;
