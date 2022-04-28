import NavLinks from "../dashboard-ui/UI/NavLinks";
import classnames from "classnames";
import { useState } from "react";

const DashboardCategories = ({ category, toggleMenu, test, isMobile }) => {
  const [activeLink, setActiveLink] = useState("all");

  const toggleActiveLink = (value) => {
    setActiveLink(value);
  };

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
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          All
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="ui"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          UI
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="ux"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          UX
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="enhancement"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          Enhancement
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="bug"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          Bug
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="feature"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          Feature
        </NavLinks>
      </ul>
    </nav>
  );
};

export default DashboardCategories;
