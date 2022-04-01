import { useContext, useEffect, useState } from "react";
import { IconArrowSvg } from "../dashboard-ui/UI/IconArrowSvg";
import { CommentsSvg } from "../dashboard-ui/UI/CommentsSvg";
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

  useEffect(() => {
    console.log(feedbacks);
  }, [feedbacks]);

  return (
    <>
      <ul>
        {feedbacks ? (
          feedbacks.filterData.map((item, i) => {
            let comments = item.comments;

            return (
              <li className="p-8 bg-white">
                <h1 className="text-third-blue">{item.title}</h1>
                <p className="py-2 text-first-blue">{item.description}</p>
                <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray">
                  {item.category}
                </button>
                <div className="flex justify-between pt-4">
                  <button className="flex items-center p-2 capitalize text-second-blue rounded-xl bg-light-gray">
                    <IconArrowSvg />
                    {item.upvotes}
                  </button>
                  <button className="flex items-center">
                    {" "}
                    <CommentsSvg /> {comments ? comments.length : 0}
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>Loading data..</p>
        )}
      </ul>
    </>
  );
};

export default Suggestions;
