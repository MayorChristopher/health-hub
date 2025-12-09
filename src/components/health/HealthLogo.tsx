import { motion } from "framer-motion";

interface HealthLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const HealthLogo = ({ variant = "light", size = "md" }: HealthLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const textColor = variant === "light" ? "text-primary-foreground" : "text-primary";
  const iconBg = variant === "light" ? "bg-primary-foreground" : "bg-primary";
  const checkColor = "text-health-soft";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3"
    >
      {/* Medical Cross Icon */}
      <div
        className={`${iconBg} rounded-lg flex items-center justify-center`}
        style={{ width: iconSizes[size], height: iconSizes[size] }}
      >
        <svg
          width={iconSizes[size] - 12}
          height={iconSizes[size] - 12}
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Vertical bar of the cross */}
          <rect
            x="9"
            y="3"
            width="6"
            height="18"
            rx="1"
            fill="hsl(150, 85%, 29%)"
          />
          {/* Horizontal bar of the cross */}
          <rect
            x="3"
            y="9"
            width="18"
            height="6"
            rx="1"
            fill="hsl(150, 85%, 29%)"
          />
        </svg>
      </div>
      
      <span className={`font-bold ${sizeClasses[size]} ${textColor}`}>
        HealthID
      </span>
      
      {/* Verified checkmark */}
      <svg
        width={size === "lg" ? 24 : size === "md" ? 20 : 16}
        height={size === "lg" ? 24 : size === "md" ? 20 : 16}
        viewBox="0 0 24 24"
        fill="none"
        className={checkColor}
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export default HealthLogo;