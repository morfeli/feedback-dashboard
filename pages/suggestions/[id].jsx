import { useState, useEffect } from "react";
import { connectToDatabase } from "../../helper/HelperFunctions";

import SuggestionsComments from "../../components/suggestions-page/SuggestionsComments";
import GoBackBtn from "../../components/dashboard-ui/UI/GoBackBtn";
import EditFeedbackBtn from "../../components/dashboard-ui/UI/EditFeedbackBtn";
import SelectedFeedback from "../../components/suggestions-page/SelectedFeedback";

const SuggestionFeedbackDetailPage = ({ data }) => {
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

  // const findLength = () => {
  //   return data.map((item, i) => {
  //     const comments = item.comments;

  //     const commentsLength = comments ? comments.length : 0;

  //     const replies = comments
  //       ? comments.filter((comment) => comment.replies)
  //       : null;

  //     const mappedReplies = comments
  //       ? replies.map((item) => item.replies)
  //       : null;

  //     let replyLength = comments
  //       ? mappedReplies[0]
  //         ? mappedReplies[0].length
  //         : 0
  //       : null;

  //     const totalCommentsLength = commentsLength + replyLength;

  //     return totalCommentsLength;
  //   });
  // };

  // const length = findLength();

  // console.log(length);

  return (
    <main className="xl:mx-64 md:pb-8">
      <div className="flex items-baseline justify-between">
        <GoBackBtn />

        <EditFeedbackBtn item={data} />
      </div>
      <ul className="mt-8">
        {data.map((item, i) => {
          const comments = item.comments;

          const commentsLength = comments ? comments.length : 0;

          const replies = comments
            ? comments.filter((comment) => comment.replies)
            : null;

          const mappedReplies = comments
            ? replies.map((item) => item.replies)
            : null;

          const replyLength = comments
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
      <SuggestionsComments item={data} />
    </main>
  );
};

export default SuggestionFeedbackDetailPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const paramsId = params.id;

  const parseID = parseInt(paramsId);

  const client = await connectToDatabase();

  let item = [];

  const singleFeedback = await client
    .db()
    .collection("posts")
    .findOne({ feedbackID: parseID });

  item.push(singleFeedback);

  return {
    props: {
      data: JSON.parse(JSON.stringify(item)),
    },
  };
}
