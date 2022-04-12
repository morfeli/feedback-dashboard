import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import MobileNavBar from "../dashboard-ui/UI/MobileNavBar";

const Dashboard = ({ category, test }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  return (
    <>
      <DashboardHeader isOpen={menuIsOpen} toggleMenu={toggleMenu} />

      <MobileNavBar
        test={test}
        isOpen={menuIsOpen}
        category={category}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default Dashboard;
