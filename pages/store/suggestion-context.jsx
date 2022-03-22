import { createContext } from "react";

const SuggestionContext = createContext({
  currentOption: "Most Upvotes",
  currentCategory: "suggestion",

  option: (value) => {},
  cateogory: (value) => {},
});

export default SuggestionContext;
