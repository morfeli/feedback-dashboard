import { useState } from "react";

import AddCommentForm from "./AddCommentForm";

const Comment = ({ image, name, username, content, replyArray }) => {
  const [reply, setReply] = useState(false);
  const [replies, setReplies] = useState(replyArray);

  const toggleReply = () => {
    setReply((current) => !current);
  };

  console.log(replies);
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
      {replies &&
        replies.map((reply) => <li key={Math.random()}>{reply.content}</li>)}
      {reply && <AddCommentForm username={username} />}
      <hr />
    </div>
  );
};

export default Comment;
