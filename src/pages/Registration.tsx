import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, ArrowLeft } from "lucide-react";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nin: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    state: "",
    lga: "",
    occupation: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
    usesHerbalMedicine: false,
    herbalTypes: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verify");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-medical-green rounded flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-medical-green">HealthMR</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Registration</h1>
          <p className="text-gray-600">Complete your registration to access HealthMR services</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="nin">National Identification Number (NIN) *</Label>
                  <Input id="nin" required maxLength={11} value={formData.nin} onChange={(e) => setFormData({...formData, nin: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input id="dob" type="date" required value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({...formData, bloodGroup: value})}>
                    <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
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

            {/* Address Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Address Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Residential Address *</Label>
                  <Input id="address" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abia">Abia</SelectItem>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="rivers">Rivers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lga">Local Government Area *</Label>
                  <Input id="lga" required value={formData.lga} onChange={(e) => setFormData({...formData, lga: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Next of Kin */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Next of Kin</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nextOfKinName">Full Name *</Label>
                  <Input id="nextOfKinName" required value={formData.nextOfKinName} onChange={(e) => setFormData({...formData, nextOfKinName: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="nextOfKinPhone">Phone Number *</Label>
                  <Input id="nextOfKinPhone" type="tel" required value={formData.nextOfKinPhone} onChange={(e) => setFormData({...formData, nextOfKinPhone: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Herbal Medicine */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Traditional Medicine Usage</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="herbal" checked={formData.usesHerbalMedicine} onCheckedChange={(checked) => setFormData({...formData, usesHerbalMedicine: checked as boolean})} />
                  <Label htmlFor="herbal" className="font-normal">I use traditional/herbal medicine</Label>
                </div>
                {formData.usesHerbalMedicine && (
                  <div className="ml-6 space-y-2">
                    <p className="text-sm text-gray-600 mb-2">Select types you use:</p>
                    {["Agbo (herbal concoction)", "Bitters", "Soaked roots/herbs", "Traditional supplements"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="font-normal text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="outline" onClick={() => navigate("/")} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-medical-green hover:bg-medical-dark">
                Continue to Verification
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
