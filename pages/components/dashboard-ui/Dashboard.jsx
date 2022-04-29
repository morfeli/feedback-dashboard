import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import MobileNavBar from "../dashboard-ui/UI/MobileNavBar";
import DashboardCategories from "./DashboardCategories";
import DashboardRoadmap from "./DashboardRoadmap";

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
        <div className="bg-[url('../public/assets/suggestions/tablet/background-header.png')] bg-no-repeat flex flex-col p-12 w-fit rounded-lg xl:my-8">
          <div className="relative top-30px right-20px">
            <h1 className="tracking-wide text-white font-jost-semibold">
              Frontend Mentor
            </h1>
            <p className="text-slate-200">Feedback Board</p>
          </div>
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
