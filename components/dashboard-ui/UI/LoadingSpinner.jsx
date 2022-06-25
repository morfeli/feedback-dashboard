import { motion } from "framer-motion";
import classNames from "classnames";

const loaderStyle = classNames(
  "box-border w-full h-full border-8 border-solid rounded-full border-slate-800 border-t-first-blue border-b-button-pink"
);

const innerLoaderStyle = classNames(
  "box-border w-full h-full border-8 border-solid rounded-full border-slate-800 border-t-slate-200 border-b-slate-200"
);

const LoadingSpinner = () => {
  return (
    <div className="w-14 h-14">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotate: [0, 360, -360, 0],
          scale: [0.9, 1.2, 1.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className={loaderStyle}
      >
        <motion.div
          animate={{ rotate: [0, 360, -360, 0] }}
          className={innerLoaderStyle}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
