import { useState } from "react";
import { useContext } from "react";
import SuggestionContext from "../../../store/suggestion-context";

const SortingButton = () => {
  const suggestionCtx = useContext(SuggestionContext);

  const captureSortOption = (e) => {
    suggestionCtx.option(e.target.value);
    console.log(suggestionCtx.currentOption);
  };

  return (
    <label htmlFor="sortOptions" className="text-white">
      Sort by:
      <select
        name="sortOptions"
        id="sortOptions"
        className="bg-transparent"
        onChange={captureSortOption}
      >
        <option value="Most_Upvotes">Most Upvotes</option>
        <option value="Least_Upvotes">Least Upvotes</option>
        <option value="Most_Comments">Most Comments</option>
        <option value="Least_Comments">Least Comments</option>
      </select>
    </label>
  );
};

export default SortingButton;
