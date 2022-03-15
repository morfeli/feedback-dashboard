import classNames from "classnames";

// components
import DashboardCategories from "../DashboardCategories";
import DashboardRoadmap from "../DashboardRoadmap";

const MobileNavBar = ({ isOpen }) => {
  let mobileMenuClass;

  if (isOpen) {
    mobileMenuClass = classNames(
      "block w-10/12 bg-light-gray absolute right-0px"
    );
  } else {
    mobileMenuClass = classNames(
      "hidden w-10/12 bg-light-gray absolute right-2000px "
    );
  }

  return (
    <div className={mobileMenuClass}>
      <DashboardCategories />
      <DashboardRoadmap />
    </div>
  );
};

export default MobileNavBar;
