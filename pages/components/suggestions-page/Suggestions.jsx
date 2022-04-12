import { useContext, useEffect, useState } from "react";

import Link from "next/link";

import { IconArrowSvg } from "../dashboard-ui/UI/IconArrowSvg";
import { CommentsSvg } from "../dashboard-ui/UI/CommentsSvg";
// import { sortData } from "../../helper/HelperFunctions";

const Suggestions = ({ data, sort }) => {
  const [feedbackState, setFeedbackState] = useState(data);

  const filterData = (category) => {
    let filtered;
    switch (category) {
      case "ui": {
        filtered = data.filter((item) => item.category === "ui");
        console.log(filtered);
      }
      case "ux": {
        filtered = data.filter((item) => item.category === "ux");
        console.log(filtered);
      }
      case "feature": {
        filtered = data.filter((item) => item.category === "feature");
        console.log(filtered);
      }
      case "enhancement": {
        filtered = data.filter((item) => item.category === "enhancement");
        console.log(filtered);
      }
      case "bug": {
        filtered = data.filter((item) => item.category === "bug");
        console.log(filtered);
      }

      case "all": {
        return console.log("testing");
      }
    }
  };

  filterData();

  const renderFeedback = () => {
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
  };

  return (
    <>
      <ul className="mt-8 space-y-4">{renderFeedback()}</ul>
    </>
  );
};

export default Suggestions;
