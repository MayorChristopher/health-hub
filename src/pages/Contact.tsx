import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, Twitter, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <img src="/logo.png" alt="HealthMR" className="h-10" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We're here to help. Reach out to us anytime.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" required placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" required placeholder="john@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+234-XXX-XXX-XXXX" />
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" required placeholder="How can we help?" />
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" required rows={5} placeholder="Tell us more..." />
              </div>
              <Button type="submit" className="w-full bg-medical-green hover:bg-medical-dark">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-medical-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@healthmr.ng</p>
                  <p className="text-gray-600">support@healthmr.ng</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-medical-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+234-XXX-XXX-XXXX</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 8AM-5PM WAT</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-medical-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">Abia State, Nigeria</p>
                  <p className="text-sm text-gray-500">Abia Starthon 2025 Project</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-medical-green text-white">
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="space-y-3">
                <a href="https://twitter.com/HealthMR_NG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition">
                  <Twitter className="h-5 w-5" />
                  <span>@HealthMR_NG</span>
                </a>
                <a href="https://linkedin.com/company/healthmr-nigeria" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition">
                  <Linkedin className="h-5 w-5" />
                  <span>HealthMR Nigeria</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
