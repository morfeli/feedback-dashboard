import NavLinks from "../dashboard-ui/UI/NavLinks";
import classnames from "classnames";
import { useEffect } from "react";

const DashboardCategories = ({ category, toggleMenu, test, isMobile }) => {
  return (
    <nav
      className={classnames("w-56", "mx-auto", {
        "bg-white": !isMobile,
        "rounded-lg": !isMobile,
      })}
    >
      <ul className="flex flex-wrap items-center justify-between p-4 h-52">
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="all"
        >
          All
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="ui"
        >
          UI
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="ux"
        >
          UX
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="enhancement"
        >
          Enhancement
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="bug"
        >
          Bug
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="feature"
        >
          Feature
        </NavLinks>
      </ul>
    </nav>
  );
};

export default DashboardCategories;
