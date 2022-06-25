import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ArrowSVG from "./ArrowSVG";
import ButtonTest from "./ButtonTest";
import classNames from "classnames";

const SortingButton = ({
  sortFN,
  buttonValues,
  categoryValues,
  statusValues,
  captureCategoryValue,
  captureStatusValue,
}) => {
  const [active, setActive] = useState(false);
  const [sortValue, setSortValue] = useState();

  useEffect(() => {
    if (buttonValues) {
      setSortValue(buttonValues[0].value);
    }
    if (categoryValues) {
      setSortValue(categoryValues[0].value);
    }
    if (statusValues) {
      setSortValue(statusValues[0].value);
    }
  }, [buttonValues, categoryValues, statusValues]);

  const captureSortOption = (e) => {
    setSortValue(e.target.value);
    setActive(false);
    sortFN && sortFN(e.target.value);
    captureCategoryValue && captureCategoryValue(e.target.value);
    captureStatusValue && captureStatusValue(e.target.value);
  };

  const toggleActive = () => {
    setActive((current) => !current);
  };

  const activeDivVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };

  let content;
  let styles;

  if (buttonValues) {
    content = "Sort by";
    styles = classNames(
      "flex items-center pr-1 text-white font-jost-semibold z-40"
    );
  } else if (categoryValues) {
    content = "Category";
    styles = classNames(
      "flex items-center justify-between px-4 self-center w-72 bg-light-gray h-11 outline-none z-40"
    );
  } else if (statusValues) {
    content = "Status";
    styles = classNames(
      "flex items-center justify-between px-4 self-center w-72 bg-light-gray h-11 outline-none z-40"
    );
  }

  let motionDivStyle;

  if (active) {
    motionDivStyle = classNames(
      "absolute z-40 flex flex-col justify-around w-64 h-64 bg-white rounded-lg shadow-lg top-60px shadow-cyan-500/50"
    );
  } else {
    motionDivStyle = classNames("bg-red-300");
  }

  return (
    <div className="relative self-center pl-1 ">
      <button
        type="button"
        onClick={toggleActive}
        htmlFor="sort"
        className={styles}
      >
        {content}: {sortValue}
        <ArrowSVG rotate={active} />
      </button>

      {active && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={activeDivVariants}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          className={motionDivStyle}
        >
          {buttonValues &&
            buttonValues.map((item, i) => {
              return (
                <ButtonTest
                  key={item.id}
                  value={item.value}
                  captureSortOption={captureSortOption}
                  sortValue={sortValue}
                />
              );
            })}
          {categoryValues &&
            categoryValues.map((item, i) => {
              return (
                <ButtonTest
                  key={item.id}
                  value={item.value}
                  captureSortOption={captureSortOption}
                  sortValue={sortValue}
                />
              );
            })}
          {statusValues &&
            statusValues.map((item, i) => {
              return (
                <ButtonTest
                  key={item.id}
                  value={item.value}
                  captureSortOption={captureSortOption}
                  sortValue={sortValue}
                />
              );
            })}
        </motion.div>
      )}
    </div>
  );
};

export default SortingButton;
