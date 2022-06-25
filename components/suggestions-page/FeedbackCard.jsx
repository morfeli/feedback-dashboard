import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import CommentsSvg from "../dashboard-ui/UI/CommentsSvg";
import UpvotesButton from "./UpvotesButton";
import classNames from "classnames";

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
  status,
  color,
  borderColor,
  isRoadmap,
  totalCommentsLength,
  paramsId,
}) => {
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes);
  const [userHasUpVoted, setUserHasUpVoted] = useState(false);
  const [stateColor, setStateColor] = useState(null);
  const [disable, setDisable] = useState(false);

  const router = useRouter();

  const sessionEmail = session.user.name.email;
  const userVotes = userUpvoted ? userUpvoted.toString() : "";

  useEffect(() => {
    if (userVotes.includes(sessionEmail)) {
      setUserHasUpVoted(true);
    }
  }, [sessionEmail, userVotes]);

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

  let containerStyle;
  if (status && color && borderColor) {
    containerStyle = classNames(
      "cursor-pointer",
      "p-4",
      "mx-8",
      "my-4",
      "list-none",
      "bg-white",
      "border-t-8",
      borderColor,
      "rounded-md",
      { "w-full": !isMobile }
    );
  } else {
    containerStyle = classNames(
      "relative",
      "p-4",
      "mb-8",
      "mx-8",
      "bg-white",
      "cursor-pointer",
      "rounded-2xl"
    );
  }

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile || isRoadmap) {
    return (
      <motion.div
        onClick={linkHandler}
        className={containerStyle}
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
            <div className="flex items-center pb-2">
              {color && (
                <div
                  className={classNames(
                    "w-4",
                    "h-4",
                    "rounded-xl",
                    `bg-${color}`,
                    `border-t-${color}`
                  )}
                />
              )}

              {status && <p className="pl-2 capitalize">{status}</p>}
            </div>
            <h1 className="text-third-blue font-jost-bold ">{title}</h1>
            <p className="py-2 text-first-blue">{description}</p>
          </div>
          {!isRoadmap && (
            <div className="pt-4">
              <p>
                {user[0].firstName} {user[0].lastName}
              </p>
              <p>@{user[0].userName}</p>
            </div>
          )}
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
        {isRoadmap && (
          <div className="pt-4">
            <p>
              {user[0].firstName} {user[0].lastName}
            </p>
            <p>@{user[0].userName}</p>
          </div>
        )}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        onClick={linkHandler}
        initial={{
          opacity: 0,
          translateY: -50,
          translateX: animateKey % 2 === 0 ? -50 : 50,
        }}
        animate={{ opacity: 1, translateY: 0, translateX: 0 }}
        transition={{ duration: 0.8, delay: animateKey * 0.2 }}
        className="relative z-0 flex items-center justify-between p-4 mx-4 mb-8 bg-white cursor-pointer rounded-2xl"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <UpvotesButton
              id={id}
              upvotes={totalUpvotes}
              stateUpvote={setTotalUpvotesHandler}
              stateColor={stateColor}
              userHasUpVoted={userHasUpVoted}
            />

            <div className="flex flex-col items-baseline pl-8">
              <h1 className="text-third-blue font-jost-bold ">{title}</h1>
              <p className="py-2 text-first-blue">{description}</p>
              <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
                {category}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col self-baseline ">
          <div className="pb-6">
            <p>
              {user[0].firstName} {user[0].lastName}
            </p>
            <p>@{user[0].userName}</p>
          </div>
          <button className="flex items-center justify-between w-8">
            <CommentsSvg />
            {comments ? comments.length : 0}
          </button>
        </div>
      </motion.div>
    );
  }
};

export default FeedbackCard;
