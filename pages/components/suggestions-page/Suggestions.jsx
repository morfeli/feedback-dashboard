import { useContext, useEffect, useState } from "react";
import SuggestionCards from "./SuggestionCards";
import SuggestionContext from "../../store/suggestion-context";

const Suggestions = ({ sortedData }) => {
  const [feedbacks, setFeedbacks] = useState();

  useEffect(() => {
    fetch("api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFeedbacks(sortedData);
  }, [sortedData]);

  // useEffect(() => {
  //   let feedBackArray = filteredData(data, filter);
  //   setFeedbacks(feedBackArray);
  //   sortData(feedBackArray, sort);
  // }, [data, filter, sort]);

  useEffect(() => {
    console.log(
      feedbacks ? feedbacks.filterData.map((item, i) => item.comments) : null
    );
  }, [feedbacks]);

  return (
    <ul>
      {feedbacks ? (
        feedbacks.filterData.map((item, i) => {
          return (
            <SuggestionCards
              key={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
            />
          );
        })
      ) : (
        <p>Loading data..</p>
      )}
      {/* <p>Testing..</p> */}
    </ul>
  );
};

export default Suggestions;
