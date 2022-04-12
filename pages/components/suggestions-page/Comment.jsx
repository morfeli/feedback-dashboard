import { useState, useEffect } from "react";

import AddCommentForm from "./AddCommentForm";
import Replies from "./Replies";

const Comment = ({ image, name, username, content, replyArray }) => {
  const [reply, setReply] = useState(false);
  const [repliedComments, setRepliedComments] = useState([]);

  const toggleReply = () => {
    setReply((current) => !current);
  };

  const postComment = (value) => {
    setRepliedComments(value);
  };

  return (
    <div className="pt-2">
      <div className="flex items-center pl-8">
        <div className="flex items-center">
          <img src={image} />
          <div className="flex flex-col pl-4">
            <h1 className="font-jost-semibold">{name}</h1>
            <p>@{username}</p>
          </div>
        </div>

        <h1
          onClick={toggleReply}
          className="absolute right-35px text-first-blue"
        >
          Reply
        </h1>
      </div>
      <p className="p-4">{content}</p>
      {repliedComments &&
        repliedComments.map((item) => <li>{item.message}</li>)}

      {replyArray &&
        replyArray.map((reply, i) => (
          <Replies
            key={i}
            name={reply.user.name}
            username={reply.user.username}
            content={reply.content}
            replyingTo={reply.replyingTo}
          />
        ))}
      {reply && (
        <AddCommentForm
          username={username}
          postComment={postComment}
          toggleReply={toggleReply}
        />
      )}
      <hr />
    </div>
  );
};

export default Comment;
