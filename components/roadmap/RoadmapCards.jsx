import { motion } from "framer-motion";
import Link from "next/link";
import classNames from "classnames";

import IconArrowSvg from "../dashboard-ui/UI/IconArrowSvg";
import CommentsSvg from "../dashboard-ui/UI/CommentsSvg";

const RoadmapCards = ({
  animateKey,
  status,
  title,
  description,
  category,
  upvotes,
  comments,
  color,
  id,
  borderColor,
  isMobile,
}) => {
  return (
    <Link href={`suggestions/${id}`} passHref>
      <motion.li
        className={classNames(
          "cursor-pointer",
          "p-4",
          "mx-4",
          "my-4",
          "list-none",
          "bg-white",
          "border-t-8",
          borderColor,
          "rounded-md",
          { "w-full": !isMobile }
        )}
        initial={{
          opacity: 0,
          translateY: -50,
          translateX: animateKey % 2 === 0 ? -50 : 50,
        }}
        animate={{ opacity: 1, translateY: 0, translateX: 0 }}
        transition={{ duration: 0.8, delay: animateKey * 0.2 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex items-center">
          <div
            className={classNames(
              "w-4",
              "h-4",
              "rounded-xl",
              `bg-${color}`,
              `border-t-${color}`
            )}
          />
          <p className="pl-2 capitalize">{status}</p>
        </div>
        <h1 className="pt-4 text-third-blue font-jost-bold">{title}</h1>
        <p className="py-2 xl:pr-8">{description}</p>
        <button className="p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-semibold">
          {category}
        </button>
        <div className="flex justify-between pt-4">
          <button className="flex items-center p-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold">
            <IconArrowSvg />
            {upvotes}
          </button>
          <button className="flex items-center justify-around w-10">
            <CommentsSvg />
            {comments ? comments.length : 0}
          </button>
        </div>
      </motion.li>
    </Link>
  );
};

export default RoadmapCards;
