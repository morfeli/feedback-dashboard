import { useContext, useEffect, useState } from "react";
import SuggestionCards from "./SuggestionCards";
import SuggestionContext from "../../store/suggestion-context";

const Suggestions = ({ data }) => {
  const suggestionCtx = useContext(SuggestionContext);
  const [suggestionArr, setSuggestionArr] = useState([]);

  const status = suggestionCtx.currentStatus;
  const option = suggestionCtx.currentOption;

  const filteredData = (option, status) => {
    let filteredFeedback = data[0].productRequests.filter(
      (item) => item.status === status
    );

    return filteredFeedback;
  };

  const sortData = (data, option) => {
    switch (option) {
      case "Most_Upvotes": {
        let sortedArray = data.sort(
          (itemA, itemB) => itemB.upvotes - itemA.upvotes
        );

        return {
          sortedArray,
        };
      }
      case "Least_Upvotes": {
        let sortedArray = data.sort(
          (itemA, itemB) => itemA.upvotes - itemB.upvotes
        );

        return {
          sortedArray,
        };
      }
    }
  };

  useEffect(() => {
    let feedBackArray = filteredData(null, status);
    // let sortedArray = feedBackArray.sort(
    //   (itemA, itemB) => itemA.upvotes - itemB.upvotes
    // );
    // console.log(sortedArray);
    setSuggestionArr(feedBackArray);
  }, [suggestionCtx.status]);

  useEffect(() => {
    let test = sortData(suggestionArr, option);
    console.log(test);
  }, [suggestionArr, option]);

  return (
    <ul>
      {/* need to figure out how to display number of comments + replies on the UI */}
      {suggestionArr.map((item) => {
        return (
          <SuggestionCards
            key={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            upvotes={item.upvotes}
          />
        );
      })}
    </ul>
  );
};

export default Suggestions;
