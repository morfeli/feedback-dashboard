import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import CommentsSvg from "../dashboard-ui/UI/CommentsSvg";
import UpvotesButton from "./UpvotesButton";

const FeedbackCard = ({
  animateKey,
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
        <motion.li
          className="p-4 mx-4 mb-8 bg-white rounded-2xl"
          initial={{
            opacity: 0,
            translateY: -50,
            translateX: animateKey % 2 === 0 ? -50 : 50,
          }}
          animate={{ opacity: 1, translateY: 0, translateX: 0 }}
          transition={{ duration: 0.8, delay: animateKey * 0.2 }}
        >
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
        </motion.li>
      </Link>
    );
  } else {
    return (
      <motion.div
        initial={{
          opacity: 0,
          translateY: -50,
          translateX: animateKey % 2 === 0 ? -50 : 50,
        }}
        animate={{ opacity: 1, translateY: 0, translateX: 0 }}
        transition={{ duration: 0.8, delay: animateKey * 0.2 }}
        className="relative z-0 flex items-center p-4 mx-4 mb-8 bg-white cursor-pointer rounded-2xl"
      >
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
      </motion.div>
    );
  }
};

export default FeedbackCard;

{
  /* <Link href={`suggestions/${id}`} passHref>
<li className="relative z-0 flex items-center p-4 mx-4 mb-8 bg-white cursor-pointer rounded-2xl">
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
