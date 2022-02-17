import MobileMenuBtn from "./MobileMenuBtn";

const DashboardHeader = (props) => {
  return (
    <header className="bg-[url('../public/assets/suggestions/mobile/background-header.png')] bg-no-repeat flex justify-between">
      <div>
        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </div>

      <MobileMenuBtn isOpen={props.isOpen} toggleMenu={props.toggleMenu} />
    </header>
  );
};

export default DashboardHeader;
