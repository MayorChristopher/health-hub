import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, Users } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">HealthHub</span>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#features" className="text-sm hover:text-primary">Features</a>
            <a href="#about" className="text-sm hover:text-primary">About</a>
            <a href="#contact" className="text-sm hover:text-primary">Contact</a>
          </div>
          <Button onClick={() => navigate("/user-access")}>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Health, <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Instant access to your medical records. Connect with healthcare providers. Manage your health journey all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/user-access")}>
                Patient Access
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/hospital-access")}>
                Medical Professional
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-primary/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <Heart className="h-48 w-48 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose HealthHub?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-xl">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-muted-foreground">Bank-level encryption protects your medical data</p>
            </div>
            <div className="bg-card p-6 rounded-xl">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Available</h3>
              <p className="text-muted-foreground">Access your records anytime, anywhere</p>
            </div>
            <div className="bg-card p-6 rounded-xl">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connected Care</h3>
              <p className="text-muted-foreground">Share records with healthcare providers instantly</p>
            </div>
            <div className="bg-card p-6 rounded-xl">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Complete History</h3>
              <p className="text-muted-foreground">All your medical records in one place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 HealthHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
