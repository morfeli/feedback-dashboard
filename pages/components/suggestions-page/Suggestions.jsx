import { useContext, useEffect, useState } from "react";

import Link from "next/link";

import { IconArrowSvg } from "../dashboard-ui/UI/IconArrowSvg";
import { CommentsSvg } from "../dashboard-ui/UI/CommentsSvg";
import NoSuggestions from "./NoSuggestions";

const Suggestions = ({ data, sort, filter }) => (
  <ul className="mt-8 space-y-4">
    <Feedback data={data} filter={filter} />
  </ul>
);

const Feedback = ({ data, filter }) => {
  const [feedbackState, setFeedbackState] = useState(data);

  if (filter) {
    return filter.length ? (
      filter.map((item) => {
        let comments = item.comments;

        return (
          <Link key={item.id} href={`suggestions/${item.id}`}>
            <li key={item.id} className="p-4 mx-4 bg-white rounded-2xl">
              <h1 className="text-third-blue font-jost-bold ">{item.title}</h1>
              <p className="py-2 text-first-blue">{item.description}</p>
              <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
                {item.category}
              </button>
              <div className="flex justify-between pt-4">
                <button className="flex items-center p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold">
                  <IconArrowSvg />
                  {item.upvotes}
                </button>
                <button className="flex items-center">
                  {" "}
                  <CommentsSvg /> {comments ? comments.length : 0}
                </button>
              </div>
            </li>
          </Link>
        );
      })
    ) : (
      <NoSuggestions />
    );
  } else {
    return data.map((item) => {
      let comments = item.comments;

      return (
        <Link key={item.id} href={`suggestions/${item.id}`}>
          <li key={item.id} className="p-4 mx-4 bg-white rounded-2xl">
            <h1 className="text-third-blue font-jost-bold ">{item.title}</h1>
            <p className="py-2 text-first-blue">{item.description}</p>
            <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
              {item.category}
            </button>
            <div className="flex justify-between pt-4">
              <button className="flex items-center p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold">
                <IconArrowSvg />
                {item.upvotes}
              </button>
              <button className="flex items-center">
                {" "}
                <CommentsSvg /> {comments ? comments.length : 0}
              </button>
            </div>
          </li>
        </Link>
      );
    });
  }
};

export default Suggestions;
