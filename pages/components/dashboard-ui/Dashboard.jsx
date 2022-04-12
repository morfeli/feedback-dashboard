import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import MobileNavBar from "../dashboard-ui/UI/MobileNavBar";

const Dashboard = ({ categorySorting }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  return (
    <>
      <DashboardHeader isOpen={menuIsOpen} toggleMenu={toggleMenu} />

      <MobileNavBar
        isOpen={menuIsOpen}
        categorySorting={categorySorting}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default Dashboard;
