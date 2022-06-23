import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

// components
import DashboardCategories from "../DashboardCategories";
import DashboardRoadmap from "../DashboardRoadmap";
import LogOutBtn from "../../dashboard-ui/UI/LogOutBtn";

const MobileNavBar = ({
  data,
  isOpen,
  categoryFN,
  toggleMenu,
  isMobile,
  activeLink,
  toggleActiveLink,
}) => {
  let mobileMenuClass;

  if (isOpen) {
    mobileMenuClass = classNames(
      "px-6 py-8 bg-light-gray absolute z-50 rounded-sm	"
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
            categoryFN={categoryFN}
            toggleMenu={toggleMenu}
            isMobile={isMobile}
            activeLink={activeLink}
            toggleActiveLink={toggleActiveLink}
          />
          <DashboardRoadmap isMobile={isMobile} data={data} />
          <LogOutBtn />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavBar;
