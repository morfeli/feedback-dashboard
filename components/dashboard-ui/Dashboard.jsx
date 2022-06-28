import { useState } from "react";

import DashboardHeader from "../dashboard-ui/DashboardHeader";
import MobileNavBar from "../dashboard-ui/UI/MobileNavBar";
import DashboardCategories from "../dashboard-ui/DashboardCategories";
import DashboardRoadmap from "../dashboard-ui/DashboardRoadmap";
import LogOutBtn from "../dashboard-ui/UI/LogOutBtn";

const Dashboard = ({ categoryFN, isMobile, innerWidth, data }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("all");

  const toggleActiveLink = (value) => {
    setActiveLink(value);
  };

  const toggleMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  const plannedLength = data[0].plannedArray.length;
  const liveLength = data[0].liveArray.length;
  const progressLength = data[0].progressArray.length;

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <div>
        <DashboardHeader isOpen={menuIsOpen} toggleMenu={toggleMenu} />

        <MobileNavBar
          plannedLength={plannedLength}
          liveLength={liveLength}
          progressLength={progressLength}
          data={data}
          isOpen={menuIsOpen}
          isMobile={isMobile}
          categoryFN={categoryFN}
          toggleMenu={toggleMenu}
          activeLink={activeLink}
          toggleActiveLink={toggleActiveLink}
        />
      </div>
    );
  } else {
    return (
      <header className="flex items-center justify-between m-4 xl:flex-col">
        <div className="bg-[url('../public/assets/suggestions/tablet/background-header.png')] bg-no-repeat bg-cover flex flex-col justify-end	pl-4 pb-4 w-52 h-52 rounded-lg xl:my-8 xl:items-center xl:justify-center xl:pl-0 xl:pb-0">
          <h1 className="tracking-wide text-white font-jost-semibold">
            Frontend Mentor
          </h1>
          <p className="text-slate-200">Feedback Board</p>
          <LogOutBtn />
        </div>
        <DashboardCategories
          isMobile={isMobile}
          categoryFN={categoryFN}
          toggleMenu={toggleMenu}
          activeLink={activeLink}
          toggleActiveLink={toggleActiveLink}
        />
        <DashboardRoadmap
          isMobile={isMobile}
          plannedLength={plannedLength}
          liveLength={liveLength}
          progressLength={progressLength}
        />
      </header>
    );
  }
};

export default Dashboard;
