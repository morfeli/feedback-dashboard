import { useState } from "react";

import DashboardHeader from "../dashboard-ui/DashboardHeader";
import MobileNavBar from "../dashboard-ui/UI/MobileNavBar";
import DashboardCategories from "../dashboard-ui/DashboardCategories";
import DashboardRoadmap from "../dashboard-ui/DashboardRoadmap";
import LogOutBtn from "../dashboard-ui/UI/LogOutBtn";

const Dashboard = ({ category, test, roadmap, isMobile, innerWidth }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <>
        <DashboardHeader isOpen={menuIsOpen} toggleMenu={toggleMenu} />

        <MobileNavBar
          roadmap={roadmap}
          test={test}
          isOpen={menuIsOpen}
          isMobile={isMobile}
          category={category}
          toggleMenu={toggleMenu}
        />
      </>
    );
  } else {
    return (
      <header className="flex items-center justify-between m-4 xl:flex-col">
        <div className="bg-[url('../public/assets/suggestions/tablet/background-header.png')] bg-no-repeat bg-cover flex flex-col justify-end	pl-4 pb-4 w-64 h-52 rounded-lg xl:my-8 xl:items-center xl:justify-center xl:pl-0 xl:pb-0">
          <h1 className="tracking-wide text-white font-jost-semibold">
            Frontend Mentor
          </h1>
          <p className="text-slate-200">Feedback Board</p>
          <LogOutBtn />
        </div>
        <DashboardCategories
          isMobile={isMobile}
          category={category}
          toggleMenu={toggleMenu}
          test={test}
        />
        <DashboardRoadmap roadmap={roadmap} isMobile={isMobile} />
      </header>
    );
  }
};

export default Dashboard;