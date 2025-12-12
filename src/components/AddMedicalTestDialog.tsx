import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Plus, Upload, FileText, AlertTriangle, CheckCircle } from "lucide-react";

const COMMON_TESTS = [
  { 
    value: "HIV/AIDS Test", 
    label: "HIV/AIDS Test", 
    placeholder: "e.g., Negative, Positive, Reactive, Non-reactive",
    description: "HIV screening test to detect antibodies to the virus",
    whatToEnter: "Enter: Negative, Positive, Reactive, or Non-reactive",
    normalRange: "Normal: Non-reactive/Negative"
  },
  { 
    value: "Hepatitis B Test", 
    label: "Hepatitis B Test", 
    placeholder: "e.g., Negative, Positive, HBsAg Reactive",
    description: "Test for Hepatitis B surface antigen (HBsAg)",
    whatToEnter: "Enter: Negative, Positive, HBsAg Reactive, or HBsAg Non-reactive",
    normalRange: "Normal: Negative/Non-reactive"
  },
  { 
    value: "Hepatitis C Test", 
    label: "Hepatitis C Test", 
    placeholder: "e.g., Negative, Positive, Anti-HCV Reactive",
    description: "Test for Hepatitis C antibodies (Anti-HCV)",
    whatToEnter: "Enter: Negative, Positive, Anti-HCV Reactive, or Non-reactive",
    normalRange: "Normal: Negative/Non-reactive"
  },
  { 
    value: "Malaria Test", 
    label: "Malaria Test", 
    placeholder: "e.g., Negative, Positive (P. falciparum), Parasites seen",
    description: "Microscopy or rapid diagnostic test for malaria parasites",
    whatToEnter: "Enter: Negative, Positive, or specify parasite type (P. falciparum, P. vivax)",
    normalRange: "Normal: Negative (No parasites detected)"
  },
  { 
    value: "Typhoid Test", 
    label: "Typhoid Test", 
    placeholder: "e.g., Negative, Positive, Widal test 1:80",
    description: "Widal test or Typhidot for typhoid fever",
    whatToEnter: "Enter: Negative, Positive, or Widal titer (e.g., 1:80, 1:160)",
    normalRange: "Normal: Negative or titer <1:80"
  },
  { 
    value: "Blood Sugar (Glucose)", 
    label: "Blood Sugar (Glucose)", 
    placeholder: "e.g., 95 mg/dL",
    description: "Fasting or random blood glucose level",
    whatToEnter: "Enter the number with unit (e.g., 95 mg/dL or 5.3 mmol/L)",
    normalRange: "Fasting: 70-100 mg/dL | Random: <140 mg/dL"
  },
  { 
    value: "Blood Pressure Check", 
    label: "Blood Pressure Check", 
    placeholder: "e.g., 120/80 mmHg",
    description: "Systolic/Diastolic blood pressure measurement",
    whatToEnter: "Enter as: Systolic/Diastolic (e.g., 120/80 mmHg)",
    normalRange: "Normal: <120/<80 mmHg | Elevated: 120-129/<80"
  },
  { 
    value: "Complete Blood Count (CBC)", 
    label: "Complete Blood Count (CBC)", 
    placeholder: "e.g., WBC: 7000, RBC: 5.2M, Hemoglobin: 14g/dL",
    description: "Full blood count including WBC, RBC, Hemoglobin, Platelets",
    whatToEnter: "Enter key values: WBC, RBC, Hemoglobin, Hematocrit, Platelets",
    normalRange: "WBC: 4,000-11,000 | Hb: 12-16g/dL (F), 14-18g/dL (M)"
  },
  { 
    value: "Cholesterol Test", 
    label: "Cholesterol Test", 
    placeholder: "e.g., Total: 180 mg/dL, LDL: 100, HDL: 50",
    description: "Lipid profile: Total cholesterol, LDL, HDL, Triglycerides",
    whatToEnter: "Enter: Total cholesterol, LDL, HDL, and Triglycerides values",
    normalRange: "Total: <200 mg/dL | LDL: <100 | HDL: >40 (M), >50 (F)"
  },
  { 
    value: "Pregnancy Test", 
    label: "Pregnancy Test", 
    placeholder: "e.g., Negative, Positive",
    description: "hCG test to detect pregnancy",
    whatToEnter: "Enter: Negative or Positive",
    normalRange: "Non-pregnant: Negative"
  },
  { 
    value: "COVID-19 Test", 
    label: "COVID-19 Test", 
    placeholder: "e.g., Negative, Positive, Not Detected",
    description: "PCR or Rapid Antigen test for SARS-CoV-2",
    whatToEnter: "Enter: Negative, Positive, Detected, or Not Detected",
    normalRange: "Normal: Negative/Not Detected"
  },
  { 
    value: "Tuberculosis (TB) Test", 
    label: "Tuberculosis (TB) Test", 
    placeholder: "e.g., Negative, Positive, MTB Detected",
    description: "GeneXpert, Sputum AFB, or Mantoux test for TB",
    whatToEnter: "Enter: Negative, Positive, MTB Detected, or Not Detected",
    normalRange: "Normal: Negative/Not Detected"
  },
  { 
    value: "Urinalysis", 
    label: "Urinalysis", 
    placeholder: "e.g., Normal, Protein: Trace, Glucose: Negative",
    description: "Urine test for protein, glucose, blood, pH, etc.",
    whatToEnter: "Enter findings: Color, Protein, Glucose, Blood, pH, Specific gravity",
    normalRange: "Protein: Negative | Glucose: Negative | pH: 4.5-8.0"
  },
  { 
    value: "Stool Test", 
    label: "Stool Test", 
    placeholder: "e.g., No parasites seen, Ova/Cysts present",
    description: "Microscopy for parasites, ova, and cysts",
    whatToEnter: "Enter: No parasites seen, or specify parasites/ova found",
    normalRange: "Normal: No parasites, ova, or cysts detected"
  },
  { 
    value: "X-Ray", 
    label: "X-Ray", 
    placeholder: "e.g., Chest X-ray: Clear lung fields",
    description: "Radiographic imaging (Chest, Abdomen, Bone, etc.)",
    whatToEnter: "Enter: Body part scanned and findings (e.g., Clear, Normal, Abnormality noted)",
    normalRange: "Normal: No abnormalities detected"
  },
  { 
    value: "Ultrasound", 
    label: "Ultrasound", 
    placeholder: "e.g., Abdominal scan: Normal findings",
    description: "Ultrasound imaging (Abdominal, Pelvic, Obstetric, etc.)",
    whatToEnter: "Enter: Area scanned and findings from radiologist report",
    normalRange: "Normal: No abnormalities detected"
  },
  { 
    value: "ECG/EKG", 
    label: "ECG/EKG", 
    placeholder: "e.g., Normal sinus rhythm, Heart rate: 72 bpm",
    description: "Electrocardiogram to check heart rhythm and rate",
    whatToEnter: "Enter: Rhythm type, Heart rate, and any abnormalities noted",
    normalRange: "Normal: Sinus rhythm, 60-100 bpm"
  },
  { 
    value: "Other", 
    label: "Other", 
    placeholder: "Enter your test results",
    description: "Any other medical test not listed above",
    whatToEnter: "Enter the test results as shown on your report",
    normalRange: "Refer to your test report for normal ranges"
  }
];

export const AddMedicalTestDialog = ({ patientId, onSuccess }: { patientId: string; onSuccess: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testType, setTestType] = useState("");
  const [customTest, setCustomTest] = useState("");
  const [results, setResults] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const selectedTest = COMMON_TESTS.find(test => test.value === testType);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPG, PNG, or PDF file",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // MANDATORY: Check if file is uploaded
    if (!file) {
      toast({
        title: "Lab Slip Required",
        description: "Please upload a photo or PDF of your lab slip for verification",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setUploading(true);

    try {
      const finalTestType = testType === "Other" ? customTest : testType;
      
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${patientId}/${Date.now()}_${finalTestType.replace(/\s+/g, '_')}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lab-results')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error("Failed to upload file: " + uploadError.message);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('lab-results')
        .getPublicUrl(fileName);

      // Insert lab test with file URL
      const { error } = await supabase.from("lab_tests").insert({
        patient_id: patientId,
        test_type: finalTestType,
        status: "completed",
        results,
        notes: notes + `\n\n📎 Lab Slip: ${publicUrl}`,
        completed_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medical test result and lab slip uploaded successfully",
      });
      
      setOpen(false);
      setTestType("");
      setCustomTest("");
      setResults("");
      setNotes("");
      setFile(null);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add test result",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
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
            <Label htmlFor="test-type">Test Type</Label>
            <Select value={testType} onValueChange={setTestType} required>
              <SelectTrigger id="test-type">
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_TESTS.map((test) => (
                  <SelectItem key={test.value} value={test.value}>
                    {test.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Choose the type of medical test you want to record</p>
          </div>

          {/* Test Information Box */}
          {selectedTest && selectedTest.value !== "Other" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-sm text-blue-900">📋 About This Test</h4>
              <p className="text-xs text-blue-800">{selectedTest.description}</p>
              <div className="pt-2 space-y-1">
                <p className="text-xs font-medium text-blue-900">✍️ What to enter:</p>
                <p className="text-xs text-blue-700">{selectedTest.whatToEnter}</p>
              </div>
              <div className="pt-1">
                <p className="text-xs font-medium text-blue-900">📊 Normal Range:</p>
                <p className="text-xs text-blue-700">{selectedTest.normalRange}</p>
              </div>
            </div>
          )}

          {testType === "Other" && (
            <div>
              <Label htmlFor="custom-test">Custom Test Name</Label>
              <Input
                id="custom-test"
                value={customTest}
                onChange={(e) => setCustomTest(e.target.value)}
                placeholder="e.g., Liver Function Test, Kidney Function Test"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Enter the name of the test not listed above</p>
            </div>
          )}

          <div>
            <Label htmlFor="results">Test Results *</Label>
            <Textarea
              id="results"
              value={results}
              onChange={(e) => setResults(e.target.value)}
              placeholder={selectedTest?.placeholder || "Enter test results (e.g., Negative, Positive, Normal, etc.)"}
              required
              rows={3}
              className="font-mono"
            />
            <p className="text-xs text-green-600 mt-1">
              💡 Copy the results exactly as shown on your test report
            </p>
          </div>

          {/* MANDATORY FILE UPLOAD */}
          <div className="border-2 border-dashed border-yellow-300 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <Label className="text-yellow-900 font-semibold">Upload Lab Slip (REQUIRED) *</Label>
                <p className="text-xs text-yellow-800 mt-1">
                  <strong>Important:</strong> To prevent clinical errors, you MUST upload a photo or PDF of your original lab slip. 
                  This allows doctors to verify the results and reduces liability.
                </p>
              </div>
            </div>
            
            <div className="mt-3">
              <Input
                id="file-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={handleFileChange}
                required
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-2">
                📸 Accepted: JPG, PNG, PDF (Max 5MB)
              </p>
              
              {file && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">{file.name}</p>
                    <p className="text-xs text-green-700">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Test done at XYZ Lab, Doctor's comments, Follow-up needed"
              rows={2}
            />
            <p className="text-xs text-muted-foreground mt-1">Add any extra information about the test or recommendations</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-800">
                <strong>Liability Notice:</strong> Inaccurate data entry can lead to clinical harm. 
                The uploaded lab slip serves as the verified source document for your doctor.
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !file} 
            className="w-full bg-medical-green hover:bg-medical-dark"
          >
            {uploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-pulse" />
                Uploading Lab Slip...
              </>
            ) : loading ? (
              "Adding..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload & Add Test Result
              </>
            )}
          </Button>
          
          {!file && (
            <p className="text-xs text-center text-red-600">
              ⚠️ Lab slip upload is required to submit
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
