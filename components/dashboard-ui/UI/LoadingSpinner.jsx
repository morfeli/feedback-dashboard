import { motion } from "framer-motion";

const loaderStyle =
  "box-border w-full h-full border-8 border-solid rounded-full border-slate-800 border-t-first-blue border-b-button-pink";

const innerLoaderStyle =
  "box-border w-full h-full border-8 border-solid rounded-full border-slate-800 border-t-slate-200 border-b-slate-200";

const LoadingSpinner = () => {
  return (
    <div className="mx-auto w-14 h-14">
      <motion.div
        animate={{
          opacity: 1,
          rotate: [0, 360, -360, 0],
          scale: [0.9, 1.2, 1.5],
        }}
        transition={{
          duration: [0, 2, 5, 8],
          repeat: Infinity,
          ease: "linear",
        }}
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
