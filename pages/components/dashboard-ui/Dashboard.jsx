import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import MobileNavBar from "./MobileNavBar";

const Dashboard = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  return (
    <>
      <DashboardHeader isOpen={menuIsOpen} toggleMenu={toggleMenu} />

      <MobileNavBar isOpen={menuIsOpen} />
    </>
  );
};

export default Dashboard;
