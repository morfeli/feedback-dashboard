import { useEffect } from "react";
import AddFeedbackBtn from "./UI/AddFeedbackBtn";
import SortingButton from "./UI/SortingButton";
import SuggestionSVG from "./UI/SuggestionSVG";

const SortingHeader = ({ sortArray, data, test, suggestionLength }) => {
  return (
    <section className="flex items-center p-4 bg-third-blue md:justify-between md:mx-4 md:rounded-lg">
      <div className="hidden md:flex md:items-center">
        <SuggestionSVG />
        <h1 className="pl-2 text-white font-jost-bold">
          {suggestionLength} Suggestions
        </h1>
      </div>
      <SortingButton sortArray={sortArray} test={test} />

      <AddFeedbackBtn />
    </section>
  );
};

export default SortingHeader;
