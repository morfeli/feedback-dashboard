import { useState, useEffect } from "react";

import AddCommentForm from "./AddCommentForm";
import FeedbackComments from "./FeedbackComments";
import UserComment from "./UserComment";

const SuggestionsComments = ({ comments, searchID }) => {
  const [stateComments, setStateComments] = useState([]);
  const [incrementCommentID, setIncrementCommentID] = useState(null);

  const postComment = (data) => {
    setStateComments((current) => [...current, data]);
  };

  const toggleReply = () => {
    setReply((current) => !current);
  };

  let placeholder;
  if (comments.length === 1) {
    placeholder = "Comment";
  } else {
    placeholder = "Comments";
  }

  useEffect(() => {
    setIncrementCommentID(stateComments.length);
  }, [stateComments]);

  return (
    <>
      <section className="py-4 mx-4 my-8 bg-white rounded-md">
        <div className="flex p-4">
          <h1 className="font-jost-bold text-third-blue">
            {comments.length} {placeholder}
          </h1>
        </div>

        {comments &&
          comments.map((item, i) => {
            let commentUserID = item.id;

            if (incrementCommentID) {
              commentUserID += incrementCommentID;
            }
            return (
              <FeedbackComments
                searchID={searchID}
                key={item.id}
                commentID={commentUserID}
                content={item.content}
                firstName={item.user.firstName}
                lastName={item.user.lastName}
                username={item.user.userName}
                replyArray={item.replies}
              />
            );
          })}

        {stateComments &&
          stateComments.map((item, i) => {
            return (
              <UserComment
                searchID={searchID}
                key={item.id}
                firstName={item.firstName}
                lastName={item.lastName}
                message={item.message}
                username={item.userName}
              />
            );
          })}
      </section>
      <AddCommentForm postComment={postComment} searchID={searchID} />
    </>
  );
};

export default SuggestionsComments;
