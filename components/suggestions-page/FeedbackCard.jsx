import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

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
  user,
  totalCommentsLength,
  paramsId,
}) => {
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes);
  const [userHasUpVoted, setUserHasUpVoted] = useState(false);
  const [stateColor, setStateColor] = useState(null);
  const [disable, setDisable] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const sessionEmail = session.user.name.email;
    const user = userUpvoted ? userUpvoted.toString() : "";

    if (user.includes(sessionEmail)) {
      setUserHasUpVoted(true);
    }
  }, []);

  const setTotalUpvotesHandler = () => {
    if (!disable) {
      setTotalUpvotes((current) => current + 1);
      setStateColor(true);
    }
    setDisable(true);
  };

  const linkHandler = (e) => {
    if (paramsId || e.target.name === "deleteButton") {
      e.stopPropagation();
    } else {
      router.push(`suggestions/${id}`);
    }
  };

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <motion.div
        onClick={linkHandler}
        className="relative z-0 p-4 mx-4 mb-8 bg-white cursor-pointer rounded-2xl"
        variants={animateItem}
        initial={{
          opacity: 0,
          translateY: -50,
          translateX: animateKey % 2 === 0 ? -50 : 50,
        }}
        animate={{ opacity: 1, translateY: 0, translateX: 0 }}
        transition={{ duration: 0.8, delay: animateKey * 0.2 }}
      >
        <div className="flex justify-between">
          <div>
            <h1 className="text-third-blue font-jost-bold ">{title}</h1>
            <p className="py-2 text-first-blue">{description}</p>
          </div>
          <div>
            <p>
              {user[0].firstName} {user[0].lastName}
            </p>
            <p>@{user[0].userName}</p>
          </div>
        </div>
        <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
          {category}
        </button>
        <div className="relative z-0 flex justify-between pt-4">
          <UpvotesButton
            id={id}
            upvotes={totalUpvotes}
            stateUpvote={setTotalUpvotesHandler}
            stateColor={stateColor}
            userHasUpVoted={userHasUpVoted}
            isMobile={isMobile}
          />
          <button className="flex items-center justify-between w-8">
            <CommentsSvg />
            {comments ? comments.length : 0}
          </button>
        </div>
      </motion.div>
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
        className="relative z-0 flex items-center mx-4 mb-8 bg-white cursor-pointer rounded-2xl"
      >
        <div onClick={linkHandler} className="flex items-center w-full p-4">
          <UpvotesButton
            id={id}
            upvotes={totalUpvotes}
            stateUpvote={setTotalUpvotesHandler}
            stateColor={stateColor}
            userHasUpVoted={userHasUpVoted}
          />
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
        </div>
      </motion.div>
    );
  }
};

export default FeedbackCard;
