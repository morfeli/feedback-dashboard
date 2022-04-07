import { useState } from "react";

import AddCommentForm from "./AddCommentForm";

const Comment = ({ image, name, username, content }) => {
  const [reply, setReply] = useState(false);
  const [replies, setReplies] = useState([]);

  const toggleReply = () => {
    setReply((current) => !current);
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
      {reply && <AddCommentForm username={username} />}
      <hr />
    </div>
  );
};

export default Comment;
