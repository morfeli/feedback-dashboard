import { useState } from "react";

import AddCommentForm from "./AddCommentForm";
import PostedComment from "./PostedComment";
import Replies from "./Replies";
import UserComment from "./UserComment";

const Comment = ({ image, name, username, content, replyArray }) => {
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
        name={name}
        image={image}
        content={content}
        toggleReply={toggleReply}
        username={username}
      />

      {reply && (
        <AddCommentForm
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

export default Comment;
