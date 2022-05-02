import { motion } from "framer-motion";

const ArrowSVG = ({ rotate }) => {
  return (
    <div className="pl-4">
      <motion.svg
        animate={{ rotate: rotate ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="7"
      >
        <path
          fill="none"
          stroke="#4661E6"
          strokeWidth="2"
          d="M1 6l4-4 4 4"
        ></path>
      </motion.svg>
    </div>
  );
};

export default ArrowSVG;
