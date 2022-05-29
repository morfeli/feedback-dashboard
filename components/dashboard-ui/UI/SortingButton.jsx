import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ArrowSVG from "./ArrowSVG";
import CheckSVG from "./CheckSVG";

const SortingButton = ({ sortFN, test }) => {
  const [active, setActive] = useState(false);
  const [sortValue, setSortValue] = useState("Most Upvotes");

  const captureSortOption = (e) => {
    sortFN(e.target.value);
    // test(e.target.value);
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
    <div className="relative pl-1 xl:pr-72 ">
      <button
        onClick={toggleActive}
        htmlFor="sort"
        className="flex items-center pr-1 text-white font-jost-semibold"
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
            className="absolute z-50 flex flex-col justify-around w-64 h-64 bg-white rounded-lg shadow-lg top-60px shadow-cyan-500/50"
          >
            <button
              className="flex items-center justify-between py-4 pl-4 text-left hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Most Upvotes"
            >
              Most Upvotes
              {sortValue == "Most Upvotes" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="flex items-center justify-between py-4 pl-4 text-left hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Least Upvotes"
            >
              Least Upvotes
              {sortValue == "Least Upvotes" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="flex items-center justify-between py-4 pl-4 text-left hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Most Comments"
            >
              Most Comments
              {sortValue == "Most Comments" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="flex items-center justify-between py-4 pl-4 text-left hover:text-button-pink hover:cursor-pointer"
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
