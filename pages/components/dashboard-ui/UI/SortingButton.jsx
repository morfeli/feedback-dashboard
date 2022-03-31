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
      <button onClick={captureSortOption} value="Most_Upvotes">
        Most Upvotes
      </button>
      <button onClick={captureSortOption} value="Least_Upvotes">
        Least Upvotes
      </button>
      <button onClick={captureSortOption} value="Most_Comments">
        Most comments
      </button>
      <button onClick={captureSortOption} value="Least_Comments">
        Least comments
      </button>
    </>
  );
};

export default SortingButton;
