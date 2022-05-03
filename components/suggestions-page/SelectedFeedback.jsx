import { useState } from "react";

import IconArrowSvg from "../dashboard-ui/UI/IconArrowSvg";
import CommentsSvg from "../dashboard-ui/UI/CommentsSvg";

const SelectedFeedback = ({
  title,
  description,
  category,
  upvotes,
  comments,
  totalCommentsLength,
  id,
  innerWidth,
  isMobile,
}) => {
  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <div>
        <li className="p-4 mx-4 bg-white rounded-2xl">
          <h1 className="text-third-blue font-jost-bold ">{title}</h1>
          <p className="py-2 text-first-blue">{description}</p>
          <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
            {category}
          </button>
          <div className="flex justify-between pt-4">
            <button className="z-40 flex items-center justify-between p-2 px-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold">
              <IconArrowSvg />
              {upvotes}
            </button>
            <button className="flex items-center justify-between w-8">
              <CommentsSvg />
              {comments ? comments.length || totalCommentsLength : 0}
            </button>
          </div>
        </li>
      </div>
    );
  } else {
    return (
      <div>
        <li className="relative flex items-center p-4 mx-4 bg-white rounded-2xl cursor-pointer">
          <button
            value={id}
            className="z-40 flex items-center self-start justify-between p-2 px-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold hover:bg-gray-300"
          >
            <IconArrowSvg />
            {upvotes}
          </button>
          <div className="flex flex-col items-baseline pl-8">
            <h1 className="text-third-blue font-jost-bold ">{title}</h1>
            <p className="py-2 text-first-blue">{description}</p>
            <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
              {category}
            </button>
          </div>
          <div className="flex justify-between pt-4">
            <button className="absolute flex items-center justify-between w-8 right-15px bottom-60px">
              <CommentsSvg />
              {comments ? comments.length || totalCommentsLength : 0}
            </button>
          </div>
        </li>
      </div>
    );
  }
};

export default SelectedFeedback;
