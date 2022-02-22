import classNames from "classnames";
import { useEffect } from "react";

import DashboardCategories from "./DashboardCategories";
import DashboardRoadmap from "./DashboardRoadmap";

const MobileNavBar = (props) => {
  let mobileMenuClass;

  if (props.isOpen) {
    mobileMenuClass = classNames(
      "block w-10/12 bg-light-gray absolute right-0px"
    );
  } else {
    mobileMenuClass = classNames(
      "hidden w-10/12 bg-light-gray absolute right-2000px "
    );
  }

  useEffect(() => {
    if (props.isOpen) {
      console.log("true");
    }
  }, [props.isOpen]);

  return (
    <div className={mobileMenuClass}>
      <DashboardCategories />
      <DashboardRoadmap />
    </div>
  );
};

export default MobileNavBar;
