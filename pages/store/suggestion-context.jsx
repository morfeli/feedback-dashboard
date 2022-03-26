import { createContext } from "react";

const SuggestionContext = createContext({
  currentOption: "Most Upvotes",
  currentStatus: "suggestion",

  option: (value) => {},
  status: (value) => {},
});

export default SuggestionContext;
