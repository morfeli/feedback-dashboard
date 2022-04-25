import { buildFeedbackPath, extractFeedback } from "../helper/HelperFunctions";
import SuggestionsComments from "../components/suggestions-page/SuggestionsComments";

import GoBackBtn from "../components/dashboard-ui/UI/GoBackBtn";
import EditFeedbackBtn from "../components/dashboard-ui/UI/EditFeedbackBtn";
import FeedbackCard from "../components/suggestions-page/FeedbackCard";

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

  return (
    <>
      <div className="flex items-baseline justify-between">
        <GoBackBtn />

        {/* <EditFeedbackBtn item={item} /> */}
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
            <FeedbackCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              comments={comments}
              totalCommentsLength={totalCommentsLength}
            />
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
