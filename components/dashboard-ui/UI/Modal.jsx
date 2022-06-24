import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

const Modal = ({ active, status, color }) => {
  if (!status) {
    return null;
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const divStyle = classNames(
    "flex",
    "items-center",
    "justify-center",
    "p-4",
    "mx-4",
    "mb-4",
    "rounded-md",
    color
  );

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: "spring", stiffness: 100, delay: 2 }}
          className={divStyle}
        >
          <p className="text-white">{status}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
