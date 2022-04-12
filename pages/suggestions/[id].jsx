import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { buildFeedbackPath, extractFeedback } from "../helper/HelperFunctions";
import { IconArrowSvg } from "../components/dashboard-ui/UI/IconArrowSvg";
import { CommentsSvg } from "../components/dashboard-ui/UI/CommentsSvg";
import SuggestionsComments from "../components/suggestions-page/SuggestionsComments";
import LeftArrowSVG from "../components/dashboard-ui/UI/LeftArrowSvg";

const SuggestionFeedbackDetailPage = ({ item }) => {
  const findLength = () => {
    return item.map((item, i) => {
      let comments = item.comments;

      let commentsLength = comments ? comments.length : 0;

      let replies = comments.filter((comment) => comment.replies);

      let mappedReplies = replies.map((item) => item.replies);

      let replyLength = mappedReplies[0] ? mappedReplies[0].length : 0;

      let totalCommentsLength = commentsLength + replyLength;

      return totalCommentsLength;
    });
  };

  let length = findLength();

  const router = useRouter();

  const goBackHandler = () => {
    router.back();
  };

  return (
    <>
      <div className="pt-8 pl-8">
        <button
          onClick={goBackHandler}
          className="flex items-center justify-between w-20"
        >
          <LeftArrowSVG />
          Go Back
        </button>
      </div>

      <ul className="mt-8">
        {item.map((item, i) => {
          let comments = item.comments;

          let commentsLength = comments ? comments.length : 0;

          let replies = comments.filter((comment) => comment.replies);

          let mappedReplies = replies.map((item) => item.replies);

          let replyLength = mappedReplies[0] ? mappedReplies[0].length : 0;

          let totalCommentsLength = commentsLength + replyLength;

          return (
            <li key={item.id} className="p-4 mx-4 bg-white rounded-2xl">
              <h1 className="text-third-blue font-jost-bold">{item.title}</h1>
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
                  <CommentsSvg /> {comments ? totalCommentsLength : 0}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <SuggestionsComments item={item} length={length} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const paramsId = params.id;

  const filePath = buildFeedbackPath();
  const feedbackData = await extractFeedback(filePath);

  const data = [];

  data.push(feedbackData);

  let singleItem = data[0].productRequests.filter(
    (item) => item.id == paramsId
  );

  return {
    props: {
      item: singleItem,
    },
  };
}

export default SuggestionFeedbackDetailPage;
