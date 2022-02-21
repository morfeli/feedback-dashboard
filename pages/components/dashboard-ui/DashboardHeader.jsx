import MobileMenuBtn from "./MobileMenuBtn";

const DashboardHeader = ({ isOpen, toggleMenu }) => {
  return (
    <header className="bg-[url('../public/assets/suggestions/mobile/background-header.png')] bg-no-repeat flex justify-between items-center">
      <div className="pl-4">
        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </div>

      <MobileMenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default DashboardHeader;
