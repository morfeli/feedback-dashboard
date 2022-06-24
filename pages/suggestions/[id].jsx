import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../helper/HelperFunctions";

import Modal from "../../components/dashboard-ui/UI/Modal";
import SuggestionsComments from "../../components/suggestions-page/SuggestionsComments";
import GoBackBtn from "../../components/dashboard-ui/UI/GoBackBtn";
import UserButtons from "../../components/dashboard-ui/UI/UserButtons";
import FeedbackCard from "../../components/suggestions-page/FeedbackCard";

const SuggestionFeedbackDetailPage = ({
  data,
  session,
  paramsId,
  displayButtons,
}) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [APIMessage, setAPIMessage] = useState();
  const [renderModal, setRenderModal] = useState(false);
  const isMobile = innerWidth <= 767;

  const router = useRouter();

  const updateAPIMessageHandler = (value) => {
    setAPIMessage(value);
  };

  const routeToHomePage = () => {
    router.replace("/suggestions");
  };

  useEffect(() => {
    APIMessage && setRenderModal((current) => !current);
  }, [APIMessage]);

  useEffect(() => {
    renderModal &&
      setTimeout(() => {
        routeToHomePage();
      }, 6000);
  }, [renderModal]);

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  return (
    <main className="overflow-hidden xl:mx-64 md:pb-8">
      <div className="flex items-baseline justify-between">
        <GoBackBtn />

        {displayButtons && (
          <UserButtons
            item={data}
            updateAPIMessageHandler={updateAPIMessageHandler}
          />
        )}
      </div>
      <ul className="mt-8">
        {data.map((item, i) => {
          const usersThatHaveUpvoted = item.upVotedUsers;
          const postedUser = item.postedBy;

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

          const totalCommentsLength = commentsLength + replyLength;

          return (
            <FeedbackCard
              paramsId={paramsId}
              session={session}
              key={item.feedbackID}
              id={item.feedbackID}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              user={postedUser}
              userUpvoted={usersThatHaveUpvoted}
              comments={comments}
              totalCommentsLength={totalCommentsLength}
              innerWidth={innerWidth}
              isMobile={isMobile}
            />
          );
        })}
      </ul>
      <SuggestionsComments item={data} />
      <Modal
        active={renderModal}
        status={APIMessage}
        color="bg-red-500"
      ></Modal>
    </main>
  );
};

export default SuggestionFeedbackDetailPage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const { params } = context;

  const paramsId = params.id;

  const parseID = parseInt(paramsId);

  const client = await connectToDatabase();

  let item = [];

  const singleFeedback = await client
    .db()
    .collection("posts")
    .findOne({ feedbackID: parseID });

  client.close();

  item.push(singleFeedback);

  const sessionEmail = session.user.name.email;
  const userEmailThatCreatedPost = singleFeedback.postedBy[0].email;

  let displayButtons;
  if (sessionEmail === userEmailThatCreatedPost) {
    displayButtons = true;
  } else {
    displayButtons = false;
  }

  return {
    props: {
      session,
      paramsId,
      displayButtons,
      data: JSON.parse(JSON.stringify(item)),
    },
  };
}
