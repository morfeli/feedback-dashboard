import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import CommentsSvg from "../dashboard-ui/UI/CommentsSvg";
import UpvotesButton from "./UpvotesButton";

const FeedbackCard = ({
  session,
  animateItem,
  animateKey,
  title,
  description,
  category,
  upvotes,
  comments,
  id,
  innerWidth,
  isMobile,
  userUpvoted,
}) => {
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes);
  const [userHasUpVoted, setUserHasUpVoted] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const sessionEmail = session.user.name.email;
    const user = userUpvoted ? userUpvoted.toString() : "";

    if (user.includes(sessionEmail)) {
      setUserHasUpVoted(true);
    }
  }, []);

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
          variants={animateItem}
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
              userHasUpVoted={userHasUpVoted}
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
          userHasUpVoted={userHasUpVoted}
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
