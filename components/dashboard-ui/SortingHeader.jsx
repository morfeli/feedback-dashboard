import AddFeedbackBtn from "./UI/AddFeedbackBtn";
import SortingButton from "./UI/SortingButton";
import SuggestionSVG from "./UI/SuggestionSVG";

const SortingHeader = ({ sortFN, length, test }) => {
  return (
    <section className="flex items-center p-4 bg-third-blue md:justify-between md:mx-4 md:rounded-lg">
      <div className="hidden md:flex md:items-center">
        <SuggestionSVG />
        <h1 className="pl-2 text-white font-jost-bold">{length} Suggestions</h1>
      </div>
      <SortingButton sortFN={sortFN} />

      <AddFeedbackBtn fetch={fetch} />
    </section>
  );
};

export default SortingHeader;
