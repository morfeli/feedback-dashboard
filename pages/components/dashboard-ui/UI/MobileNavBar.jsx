import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

// components
import DashboardCategories from "../DashboardCategories";
import DashboardRoadmap from "../DashboardRoadmap";

const MobileNavBar = ({ isOpen, category, toggleMenu, test }) => {
  let mobileMenuClass;

  if (isOpen) {
    mobileMenuClass = classNames(
      "block w-10/12 bg-light-gray absolute right-0px"
    );
  } else {
    mobileMenuClass = classNames("hidden w-10/12 bg-light-gray absolute ");
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
          />
          <DashboardRoadmap />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavBar;
