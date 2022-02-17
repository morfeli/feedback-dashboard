import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardCategories from "./DashboardCategories";
import DashboardRoadmap from "./DashboardRoadmap";

const Dashboard = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  return (
    <>
      <DashboardHeader isOpen={menuIsOpen} toggleMenu={toggleMenu} />

      <DashboardCategories isOpen={menuIsOpen} />

      <DashboardRoadmap />
    </>
  );
};

export default Dashboard;
