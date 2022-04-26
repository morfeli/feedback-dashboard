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

  return (
    <Link href={`suggestions/${id}`}>
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
};

export default FeedbackCard;
