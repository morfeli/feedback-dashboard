import SuggestionContext from "./suggestion-context";

import { useReducer, useState, useCallback } from "react";

const initalFeedbackState = {
  currentOption: "Most_Upvotes",
  currentStatus: "suggestion",
};

const actionTypes = {
  OPTION: "OPTION",
  STATUS: "STATUS",
};

const actions = {
  option: (option) => ({ type: actionTypes.OPTION, option }),
  status: (status) => ({ type: actionTypes.STATUS, status }),
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

  const status = useCallback((category) => {
    dispatch(actions.category(category));
  }, []);

  const suggestionContext = {
    currentOption: feedbackState.currentOption,
    currentStatus: feedbackState.currentStatus,
    option,
    status,
  };

  return (
    <SuggestionContext.Provider value={suggestionContext}>
      {props.children}
    </SuggestionContext.Provider>
  );
};

export default SuggestionProvider;
