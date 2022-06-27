import { useState } from "react";

import AddCommentForm from "./AddCommentForm";
import FeedbackComments from "./FeedbackComments";
import UserComment from "./UserComment";

const SuggestionsComments = ({ comments, id }) => {
  const [postedComment, setPostedComment] = useState([]);

  const postComment = (data) => {
    setPostedComment((current) => [...current, data]);
  };

  let placeholder;
  if (comments.length === 1) {
    placeholder = "Comment";
  } else {
    placeholder = "Comments";
  }

  return (
    <>
      <section className="py-4 mx-4 my-8 bg-white rounded-md">
        <div className="flex p-4">
          <h1 className="font-jost-bold text-third-blue">
            {comments.length} {placeholder}
          </h1>
        </div>

        {comments &&
          comments.map((item) => {
            return (
              <FeedbackComments
                key={item.id}
                commentID={item.id}
                content={item.content}
                firstName={item.user.firstName}
                lastName={item.user.lastName}
                username={item.user.userName}
                replyArray={item.replies}
              />
            );
          })}

        {postedComment &&
          postedComment.map((item, i) => (
            <UserComment
              key={i}
              firstName={item.firstName}
              lastName={item.lastName}
              message={item.message}
              username={item.username}
            />
          ))}
      </section>
      <AddCommentForm postComment={postComment} id={id} />
    </>
  );
};

export default SuggestionsComments;
