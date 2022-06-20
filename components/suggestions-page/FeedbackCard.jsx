import Link from "next/link";
import { useState } from "react";

import CommentsSvg from "../dashboard-ui/UI/CommentsSvg";
import UpvotesButton from "./UpvotesButton";

const FeedbackCard = ({
  title,
  description,
  category,
  upvotes,
  comments,
  id,
  innerWidth,
  isMobile,
}) => {
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes);
  const [disable, setDisable] = useState(false);

  const setTotalUpvotesHandler = () => {
    if (disable) {
      return;
    }
    setTotalUpvotes((current) => current + 1);
    setDisable(true);
  };

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <Link href={`suggestions/${id}`} passHref>
        <li className="p-4 mx-4 mb-8 bg-white rounded-2xl">
          <h1 className="text-third-blue font-jost-bold ">{title}</h1>
          <p className="py-2 text-first-blue">{description}</p>
          <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
            {category}
          </button>
          <div className="flex justify-between pt-4">
            <UpvotesButton
              id={id}
              upvotes={totalUpvotes}
              stateUpvote={setTotalUpvotesHandler}
            />
            <button className="flex items-center justify-between w-8">
              <CommentsSvg />
              {comments ? comments.length : 0}
            </button>
          </div>
        </li>
      </Link>
    );
  } else {
    return (
      <div className="z-0 relative flex items-center p-4 mx-4 mb-8 bg-white cursor-pointer rounded-2xl">
        <UpvotesButton
          id={id}
          upvotes={totalUpvotes}
          stateUpvote={setTotalUpvotesHandler}
        />
        <Link href={`suggestions/${id}`} passHref>
          <li className="w-full">
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
                {comments ? comments.length : 0}
              </button>
            </div>
          </li>
        </Link>
      </div>
    );
  }
};

export default FeedbackCard;

{
  /* <Link href={`suggestions/${id}`} passHref>
<li className="z-0 relative flex items-center p-4 mx-4 mb-8 bg-white cursor-pointer rounded-2xl">
  <UpvotesButton id={id} upvotes={upvotes} />
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
      {comments ? comments.length : 0}
    </button>
  </div>
</li>
</Link> */
}
