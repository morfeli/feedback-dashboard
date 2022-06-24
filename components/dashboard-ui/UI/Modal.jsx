import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ active, children }) => {
  const modalVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: "spring", stiffness: 100, delay: 2 }}
          className="flex items-center justify-center p-4 mx-4 bg-red-300 rounded-md"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
