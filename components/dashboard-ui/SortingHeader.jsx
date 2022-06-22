import AddFeedbackBtn from "./UI/AddFeedbackBtn";
import SortingButton from "./UI/SortingButton";
import SuggestionSVG from "./UI/SuggestionSVG";

const buttonValues = [
  { id: 0, value: "Most Upvotes" },
  { id: 1, value: "Least Upvotes" },
  { id: 2, value: "Most Comments" },
  { id: 3, value: "Least Comments" },
];

const SortingHeader = ({ sortFN, suggestionsLength }) => {
  return (
    <section className="flex items-center justify-between p-4 bg-third-blue md:justify-between md:mx-4 md:rounded-lg">
      <div className="hidden md:flex md:items-center">
        <SuggestionSVG />
        <h1 className="pl-2 text-white font-jost-bold">
          {suggestionsLength} Suggestions
        </h1>
      </div>
      <SortingButton sortFN={sortFN} buttonValues={buttonValues} />

      <AddFeedbackBtn fetch={fetch} />
    </section>
  );
};

export default SortingHeader;
