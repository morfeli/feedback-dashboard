import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ArrowSVG from "./ArrowSVG";
import CheckSVG from "./CheckSVG";

const SortingButton = (props) => {
  const [active, setActive] = useState(false);
  const [sortOption, setSortOption] = useState("Most Upvotes");

  const captureSortOption = (e) => {
    props.sortArray(e.target.value);
    props.test(e.target.value);
    setSortOption(e.target.value);
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
        Sort by: {sortOption}
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
              {sortOption == "Most Upvotes" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="py-4 text-left pl-4 flex items-center justify-between hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Least Upvotes"
            >
              Least Upvotes
              {sortOption == "Least Upvotes" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="py-4 text-left pl-4  flex items-center justify-between  hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Most Comments"
            >
              Most Comments
              {sortOption == "Most Comments" ? <CheckSVG /> : null}
            </button>

            <hr />

            <button
              className="py-4 text-left pl-4 flex items-center justify-between hover:text-button-pink hover:cursor-pointer"
              onClick={captureSortOption}
              value="Least Comments"
            >
              Least Comments
              {sortOption == "Least Comments" ? <CheckSVG /> : null}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <select
        name="sort"
        id="sort"
        className="pr-1 text-white bg-transparent font-jost-semibold"
        onChange={captureSortOption}
      >
        <option value="Most_Upvotes">Most Upvotes</option>
        <option value="Least_Upvotes">Least Upvotes</option>
        <option value="Most_Comments">Most Comments</option>
        <option value="Least_Comments">Least Comments</option>
      </select> */}
    </div>
  );
};

export default SortingButton;
