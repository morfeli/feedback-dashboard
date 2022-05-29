import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import classNames from "classnames";

// components
import DashboardCategories from "../DashboardCategories";
import DashboardRoadmap from "../DashboardRoadmap";
import LogOutBtn from "../../dashboard-ui/UI/LogOutBtn";

const MobileNavBar = ({
  isOpen,
  category,
  toggleMenu,
  test,
  roadmap,
  isMobile,
  activeLink,
  toggleActiveLink,
}) => {
  let mobileMenuClass;

  if (isOpen) {
    mobileMenuClass = classNames(
      "block px-8 py-8 bg-light-gray absolute right-0px z-50 "
    );
  } else {
    mobileMenuClass = classNames("hidden px-8 bg-light-gray absolute ");
  }

  const navBarVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={mobileMenuClass}
          variants={navBarVariants}
          initial="closed"
          animate="open"
          transition={{ type: "spring", stiffness: 100 }}
          exit={{ opacity: 0, x: "-100%" }}
        >
          <DashboardCategories
            category={category}
            toggleMenu={toggleMenu}
            test={test}
            isMobile={isMobile}
            activeLink={activeLink}
            toggleActiveLink={toggleActiveLink}
          />
          <DashboardRoadmap roadmap={roadmap} isMobile={isMobile} />
          <LogOutBtn />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavBar;
