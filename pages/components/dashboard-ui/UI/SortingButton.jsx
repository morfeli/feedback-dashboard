import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import SuggestionContext from "../../../store/suggestion-context";

const SortingButton = (props) => {
  const captureSortOption = (e) => {
    fetch("api/feedback/sort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e.target.value),
    })
      .then((res) => res.json())
      .then((data) => props.sortArray(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <label htmlFor="sort">Sort by:</label>
      <select name="sort" id="sort" onChange={captureSortOption}>
        <option value="Most_Upvotes">Most Upvotes</option>
        <option value="Least_Upvotes">Least Upvotes</option>
        <option value="Most_Comments">Most Comments</option>
        <option value="Least_Comments">Least Comments</option>
      </select>
    </>
  );
};

export default SortingButton;
