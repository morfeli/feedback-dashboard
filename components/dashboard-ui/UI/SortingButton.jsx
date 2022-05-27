import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ArrowSVG from "./ArrowSVG";
import CheckSVG from "./CheckSVG";

const SortingButton = ({ setSortOption }) => {
  const [active, setActive] = useState(false);
  const [sortValue, setSortValue] = useState("Most Upvotes");

  const captureSortOption = (e) => {
    setSortOption(e.target.value);
    setSortValue(e.target.value);
    setActive(false);
  };

  const toggleActive = () => {
    setActive((current) => !current);
  };

  const activeDivVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };

  return (
    <div className="pl-1 relative xl:pr-72 ">
      <button
        onClick={toggleActive}
        htmlFor="sort"
        className="pr-1 text-white font-jost-semibold flex items-center"
      >
        Sort by: {sortValue}
        <ArrowSVG rotate={active} />
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={activeDivVariants}
            transition={{ type: "spring", stiffness: 100 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute bg-white z-50 w-64 h-64 top-60px flex flex-col justify-around rounded-lg shadow-lg shadow-cyan-500/50"
          >
            <button
              className="py-4 text-left pl-4 flex items-center justify-between hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Most Upvotes"
            >
              Most Upvotes
              {sortValue == "Most Upvotes" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="py-4 text-left pl-4 flex items-center justify-between hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Least Upvotes"
            >
              Least Upvotes
              {sortValue == "Least Upvotes" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="py-4 text-left pl-4  flex items-center justify-between  hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Most Comments"
            >
              Most Comments
              {sortValue == "Most Comments" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="py-4 text-left pl-4 flex items-center justify-between hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Least Comments"
            >
              Least Comments
              {sortValue == "Least Comments" ? <CheckSVG /> : null}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortingButton;
