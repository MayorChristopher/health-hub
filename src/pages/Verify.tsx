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

const Verify = () => {
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
      description: "Your identity has been verified.",
    });
    navigate("/");
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
              To protect your medical information, we need to confirm it's really you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <p className="text-sm text-foreground font-medium">Registered Phone Number:</p>
            <p className="text-lg font-semibold text-foreground">080****5689</p>
          </motion.div>

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
            <span className="text-muted-foreground text-sm">or verify using fingerprint</span>
          </motion.div>

          <HealthButton variant="primary" onClick={handleVerify}>
            Verify & Continue
          </HealthButton>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-muted-foreground text-center mt-6"
          >
            Your details are encrypted and never shared without your consent.
          </motion.p>
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default Verify;