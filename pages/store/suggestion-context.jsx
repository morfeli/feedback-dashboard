import { createContext } from "react";

const SuggestionContext = createContext({
  currentOption: "Most_Upvotes",
  currentStatus: "suggestion",

  option: (option) => {},
  status: (status) => {},
});

export default SuggestionContext;
