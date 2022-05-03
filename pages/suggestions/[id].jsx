import { useState, useEffect } from "react";

import path from "path";
import fs from "fs/promises";

import SuggestionsComments from "../components/suggestions-page/SuggestionsComments";
import GoBackBtn from "../components/dashboard-ui/UI/GoBackBtn";
import EditFeedbackBtn from "../components/dashboard-ui/UI/EditFeedbackBtn";
import SelectedFeedback from "../components/suggestions-page/SelectedFeedback";

const SuggestionFeedbackDetailPage = ({ item }) => {
  const [innerWidth, setInnerWidth] = useState(0);

  const isMobile = innerWidth <= 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  const findLength = () => {
    return item.map((item, i) => {
      let comments = item.comments;

      let commentsLength = comments ? comments.length : 0;

      let replies = comments
        ? comments.filter((comment) => comment.replies)
        : null;

      let mappedReplies = comments ? replies.map((item) => item.replies) : null;

      let replyLength = comments
        ? mappedReplies[0]
          ? mappedReplies[0].length
          : 0
        : null;

      let totalCommentsLength = commentsLength + replyLength;

      return totalCommentsLength;
    });
  };

  let length = findLength();

  return (
    <main className="xl:mx-64 md:pb-8">
      <div className="flex items-baseline justify-between">
        <GoBackBtn />

        <EditFeedbackBtn item={item} />
      </div>

      <ul className="mt-8">
        {item.map((item, i) => {
          let comments = item.comments;

          let commentsLength = comments ? comments.length : 0;

          let replies = comments
            ? comments.filter((comment) => comment.replies)
            : null;

          let mappedReplies = comments
            ? replies.map((item) => item.replies)
            : null;

          let replyLength = comments
            ? mappedReplies[0]
              ? mappedReplies[0].length
              : 0
            : null;

          let totalCommentsLength = commentsLength + replyLength;

          return (
            <SelectedFeedback
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              comments={comments}
              totalCommentsLength={totalCommentsLength}
              innerWidth={innerWidth}
              isMobile={isMobile}
            />
          );
        })}
      </ul>
      <SuggestionsComments item={item} length={length} />
    </main>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const paramsId = params.id;

  let filePath = path.join(process.cwd(), "public", "data", "data.json");

  let jsonData = await fs.readFile(filePath);

  const feedbackData = JSON.parse(jsonData);

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
