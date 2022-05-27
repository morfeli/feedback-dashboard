import NavLinks from "../dashboard-ui/UI/NavLinks";
import classnames from "classnames";
import { useState } from "react";

const DashboardCategories = ({
  updateCategory,
  toggleMenu,
  isMobile,
  activeLink,
  toggleActiveLink,
}) => {
  return (
    <nav className={classnames("w-64", "mx-auto", "bg-white", "rounded-md")}>
      <ul className="flex flex-wrap items-center justify-between p-4 h-52">
        <NavLinks
          updateCategory={updateCategory}
          toggle={toggleMenu}
          value="all"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          All
        </NavLinks>
        <NavLinks
          updateCategory={updateCategory}
          toggle={toggleMenu}
          value="ui"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          UI
        </NavLinks>
        <NavLinks
          updateCategory={updateCategory}
          toggle={toggleMenu}
          value="ux"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          UX
        </NavLinks>
        <NavLinks
          updateCategory={updateCategory}
          toggle={toggleMenu}
          value="enhancement"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          Enhancement
        </NavLinks>
        <NavLinks
          updateCategory={updateCategory}
          toggle={toggleMenu}
          value="bug"
          setActive={toggleActiveLink}
          activeLink={activeLink}
        >
          Bug
        </NavLinks>
        <NavLinks
          updateCategory={updateCategory}
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
