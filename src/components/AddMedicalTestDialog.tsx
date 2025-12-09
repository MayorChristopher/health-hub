import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const COMMON_TESTS = [
  "HIV/AIDS Test",
  "Hepatitis B Test",
  "Hepatitis C Test",
  "Malaria Test",
  "Typhoid Test",
  "Blood Sugar (Glucose)",
  "Blood Pressure Check",
  "Complete Blood Count (CBC)",
  "Cholesterol Test",
  "Pregnancy Test",
  "COVID-19 Test",
  "Tuberculosis (TB) Test",
  "Urinalysis",
  "Stool Test",
  "X-Ray",
  "Ultrasound",
  "ECG/EKG",
  "Other"
];

export const AddMedicalTestDialog = ({ patientId, onSuccess }: { patientId: string; onSuccess: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testType, setTestType] = useState("");
  const [customTest, setCustomTest] = useState("");
  const [results, setResults] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalTestType = testType === "Other" ? customTest : testType;

    const { error } = await supabase.from("lab_tests").insert({
      patient_id: patientId,
      test_type: finalTestType,
      status: "completed",
      results,
      notes,
      completed_at: new Date().toISOString(),
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add test result",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Medical test result added successfully",
      });
      setOpen(false);
      setTestType("");
      setCustomTest("");
      setResults("");
      setNotes("");
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-medical-green hover:bg-medical-dark">
          <Plus className="mr-2 h-4 w-4" /> Add Test Result
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical Test Result</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Test Type</Label>
            <Select value={testType} onValueChange={setTestType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_TESTS.map((test) => (
                  <SelectItem key={test} value={test}>
                    {test}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {testType === "Other" && (
            <div>
              <Label>Custom Test Name</Label>
              <Input
                value={customTest}
                onChange={(e) => setCustomTest(e.target.value)}
                placeholder="Enter test name"
                required
              />
            </div>
          )}

          <div>
            <Label>Test Results</Label>
            <Textarea
              value={results}
              onChange={(e) => setResults(e.target.value)}
              placeholder="Enter test results (e.g., Negative, Positive, Normal, etc.)"
              required
              rows={3}
            />
          </div>

          <div>
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information"
              rows={2}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-medical-green hover:bg-medical-dark">
            {loading ? "Adding..." : "Add Test Result"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
