import { buildFeedbackPath, extractFeedback } from "../helper/HelperFunctions";

import { IconArrowSvg } from "../components/dashboard-ui/UI/IconArrowSvg";
import { CommentsSvg } from "../components/dashboard-ui/UI/CommentsSvg";
import SuggestionsComments from "../components/suggestions-page/SuggestionsComments";

const SuggestionFeedbackDetailPage = ({ item }) => {
  return (
    <>
      <ul>
        {item.map((item, i) => {
          let comments = item.comments;
          let repliesArr = comments
            ? comments.map((item) => item.replies)
            : null;

          let totalCommentsLength;
          if (comments && repliesArr) {
            totalCommentsLength = comments.length + repliesArr.length;
          }
          return (
            <li key={item.id}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button>{item.category}</button>
              <div>
                <button>
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
      <SuggestionsComments item={item} />
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
