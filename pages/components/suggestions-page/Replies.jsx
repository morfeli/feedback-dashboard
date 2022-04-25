import { useState } from "react";
import AddCommentForm from "./AddCommentForm";

const Replies = ({ username, name, replyingTo, content }) => {
  const [reply, setReply] = useState(false);

  const toggleReply = () => {
    setReply((current) => !current);
  };

  return (
    <div className="py-2 pl-4 mt-4 ml-3 border-l">
      <div className="flex items-center justify-between px-6">
        <div>
          <h1 className="font-jost-semibold text-first-blue">{name}</h1>
          <p className="text-second-blue">@{username}</p>
        </div>

        <h1 className="text-first-blue" onClick={toggleReply}>
          Reply
        </h1>
      </div>

      <div className="flex px-4 py-2">
        <p className="text-sm">
          <span className="pr-2 text-button-pink font-jost-bold">
            @{replyingTo}
          </span>
          {content}
        </p>
      </div>

      {reply && <AddCommentForm username={username} />}
    </div>
  );
};

export default Replies;
