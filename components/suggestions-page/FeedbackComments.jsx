import { useState } from "react";

import AddCommentForm from "./AddCommentForm";
import PostedComment from "./PostedComment";
import Replies from "./Replies";
import UserComment from "./UserComment";

const FeedbackComments = ({
  // image,
  id,
  commentID,
  firstName,
  lastName,
  username,
  content,
  replyArray,
}) => {
  const [reply, setReply] = useState(false);
  const [repliedComments, setRepliedComments] = useState([]);

  const toggleReply = () => {
    setReply((current) => !current);
  };

  const postComment = (data) => {
    setRepliedComments((current) => [...current, data]);
  };

  return (
    <div className="pt-2">
      <UserComment
        firstName={firstName}
        lastName={lastName}
        username={username}
        content={content}
        // image={image}
        toggleReply={toggleReply}
      />

      {reply && (
        <AddCommentForm
          commentID={commentID}
          username={username}
          postComment={postComment}
          toggleReply={toggleReply}
        />
      )}

      {repliedComments &&
        repliedComments.map((item, i) => (
          <PostedComment
            key={i}
            firstName={item.firstName}
            lastName={item.lastName}
            message={item.message}
            username={item.username}
            replyingTo={item.replyingTo}
          />
        ))}

      {replyArray &&
        replyArray.map((reply, i) => (
          <Replies
            key={i}
            name={reply.user.name}
            image={reply.user.image}
            username={reply.user.username}
            content={reply.content}
            replyingTo={reply.replyingTo}
          />
        ))}

      {/* <hr /> */}
    </div>
  );
};

export default FeedbackComments;
