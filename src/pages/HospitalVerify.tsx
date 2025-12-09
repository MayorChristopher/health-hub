import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileContainer from "@/components/health/MobileContainer";
import MobileHeader from "@/components/health/MobileHeader";
import OTPInput from "@/components/health/OTPInput";
import HealthButton from "@/components/health/HealthButton";
import FingerprintIcon from "@/components/health/FingerprintIcon";
import PageTransition from "@/components/health/PageTransition";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const HospitalVerify = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpComplete = (otp: string) => {
    console.log("OTP entered:", otp);
  };

  const handleVerify = () => {
    toast({
      title: "Verification Successful",
      description: "Hospital staff identity verified. Access granted.",
    });
    navigate("/medical-dashboard");
  };

  const handleResend = () => {
    if (canResend) {
      setCountdown(30);
      setCanResend(false);
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent.",
      });
    }
  };

  return (
    <MobileContainer>
      <PageTransition>
        <MobileHeader />

        <div className="bg-card px-6 py-8 -mt-6 rounded-t-3xl relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl font-bold text-primary mb-2">Verify Your Identity</h1>
            <p className="text-muted-foreground text-sm">
              To access patient records, verify your identity
            </p>
          </motion.div>

          {/* Hospital Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 p-4 border-2 border-primary rounded-xl bg-health-light">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check size={14} className="text-primary-foreground" />
              </div>
              <span className="text-foreground font-medium">
                Federal Medical Centre, Umuahia
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-center text-sm text-muted-foreground mb-4"
          >
            Enter code sent to registered hospital contact
          </motion.p>

          <div className="mb-4">
            <OTPInput length={6} onComplete={handleOtpComplete} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-center text-sm mb-6 ${
              canResend ? "text-primary cursor-pointer hover:underline" : "text-health-soft"
            }`}
            onClick={handleResend}
          >
            {canResend ? "Resend code" : `Resend code in ${countdown}s`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <FingerprintIcon size={24} />
            <span className="text-muted-foreground text-sm">Scan Registered Staff Fingerprint</span>
          </motion.div>

          <HealthButton variant="primary" onClick={handleVerify}>
            Complete Verification
          </HealthButton>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-muted-foreground text-center mt-6"
          >
            All login attempts are logged and monitored for compliance.
          </motion.p>
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default HospitalVerify;