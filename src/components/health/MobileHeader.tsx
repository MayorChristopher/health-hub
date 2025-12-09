import HealthLogo from "./HealthLogo";

const MobileHeader = () => {
  return (
    <div className="health-gradient px-6 pt-8 pb-12 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <span className="text-primary-foreground/80 text-sm font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white" opacity="0.8">
            <rect x="0" y="6" width="3" height="6" rx="0.5" />
            <rect x="4" y="4" width="3" height="8" rx="0.5" />
            <rect x="8" y="2" width="3" height="10" rx="0.5" />
            <rect x="12" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white" opacity="0.8">
            <path d="M8 2C4.5 2 1.5 4 0 7c1.5 3 4.5 5 8 5s6.5-2 8-5c-1.5-3-4.5-5-8-5z" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="white" opacity="0.8">
            <rect x="0" y="0" width="21" height="12" rx="2" stroke="white" strokeWidth="1" fill="none" />
            <rect x="2" y="2" width="17" height="8" rx="1" fill="white" />
            <rect x="22" y="4" width="2" height="4" rx="0.5" fill="white" />
          </svg>
        </div>
      </div>
      <HealthLogo variant="light" size="lg" />
    </div>
  );
};

export default MobileHeader;