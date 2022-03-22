import SuggestionContext from "./suggestion-context";

import { useReducer, useState, useCallback } from "react";

const initalFeedbackState = {
  currentOption: "Most Upvotes",
  currentCategory: "suggestion",
};

const actionTypes = {
  OPTION: "OPTION",
  CATEGORY: "CATEGORY",
};

const actions = {
  option: (option) => ({ type: actionTypes.OPTION, option }),
  category: (category) => ({ type: actionTypes.CATEGORY, category }),
};

const reducerFN = (state, action) => {
  switch (action.type) {
    case actionTypes.OPTION: {
      let option = action.option;
      return {
        currentOption: option,
      };
    }
  }
};

const SuggestionProvider = (props) => {
  const [feedbackState, dispatch] = useReducer(reducerFN, initalFeedbackState);

  const option = useCallback((option) => {
    dispatch(actions.option(option));
  }, []);

  const category = useCallback((category) => {
    dispatch(actions.category(category));
  }, []);

  const suggestionContext = {
    currentOption: feedbackState.currentOption,
    currentCategory: feedbackState.currentCategory,
    option,
    category,
  };

  return (
    <SuggestionContext.Provider value={suggestionContext}>
      {props.children}
    </SuggestionContext.Provider>
  );
};

export default SuggestionProvider;
