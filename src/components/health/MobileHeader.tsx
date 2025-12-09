import HealthLogo from "./HealthLogo";

const MobileHeader = () => {
  return (
    <div className="health-gradient px-6 pt-8 pb-12 flex flex-col items-center">
      <HealthLogo variant="light" size="lg" />
    </div>
  );
};

export default MobileHeader;