import SuggestionContext from "./suggestion-context";

import { useReducer, useCallback } from "react";

const initalFeedbackState = {
  currentStatus: "suggestion",
  currentOption: "Most_Upvotes",
};

const actionTypes = {
  STATUS: "STATUS",
  OPTION: "OPTION",
};

const actions = {
  status: (status) => ({ type: actionTypes.STATUS, status }),
  option: (option) => ({ type: actionTypes.OPTION, option }),
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
