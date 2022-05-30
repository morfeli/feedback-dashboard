import Link from "next/link";
import { useState } from "react";

import IconArrowSvg from "../dashboard-ui/UI/IconArrowSvg";
import CommentsSvg from "../dashboard-ui/UI/CommentsSvg";

const FeedbackCard = ({
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
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes);

  const incrementUpvoteByOne = (e) => {
    let item = e.target.value;
    fetch("/api/feedback/increaseUpvotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => setTotalUpvotes(data));
  };

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <Link href={`suggestions/${id}`} passHref>
        <li className="p-4 mx-4 bg-white rounded-2xl">
          <h1 className="text-third-blue font-jost-bold ">{title}</h1>
          <p className="py-2 text-first-blue">{description}</p>
          <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
            {category}
          </button>
          <div className="flex justify-between pt-4">
            <button
              onClick={incrementUpvoteByOne}
              value={id}
              className="z-40 flex items-center justify-between p-2 px-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold"
            >
              <IconArrowSvg />
              {totalUpvotes}
            </button>
            <button className="flex items-center justify-between w-8">
              <CommentsSvg />
              {comments ? comments.length || totalCommentsLength : 0}
            </button>
          </div>
        </li>
      </Link>
    );
  } else {
    return (
      <Link href={`suggestions/${id}`} passHref>
        <li className="relative flex items-center p-4 mx-4 bg-white cursor-pointer rounded-2xl">
          <button
            onClick={incrementUpvoteByOne}
            value={id}
            className="z-40 flex items-center self-start justify-between p-2 px-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold hover:bg-gray-300"
          >
            <IconArrowSvg />
            {totalUpvotes}
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
      </Link>
    );
  }
};

export default FeedbackCard;
