import MobileMenuBtn from "../dashboard-ui/UI/MobileMenuBtn";

const DashboardHeader = ({ isOpen, toggleMenu }) => {
  return (
    <header className="bg-[url('../public/assets/suggestions/mobile/background-header.png')] bg-no-repeat bg-cover flex justify-between items-center overflow-hidden">
      <div className="pl-4">
        <h1 className="tracking-wide text-white font-jost-semibold">
          Frontend Mentor
        </h1>
        <p className="text-slate-200">Feedback Board</p>
      </div>

      <MobileMenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default DashboardHeader;
