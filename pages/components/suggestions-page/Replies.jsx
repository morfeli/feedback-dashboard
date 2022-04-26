import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import UserReplies from "./UserReplies";

const Replies = ({ username, name, replyingTo, content }) => {
  const [reply, setReply] = useState(false);
  const [replies, setReplies] = useState([]);

  const toggleReply = () => {
    setReply((current) => !current);
  };

  const postReplies = (data) => {
    setReplies((current) => [...current, data]);
  };

  console.log(replies);

  return (
    <div className="py-2 pl-4 mt-4 ml-3 border-l">
      <UserReplies
        username={username}
        name={name}
        replyingTo={replyingTo}
        content={content}
        toggleReply={toggleReply}
      />

      {replies &&
        replies.map((item, i) => (
          <UserReplies
            key={i}
            firstName={item.firstName}
            lastName={item.lastName}
            replyingTo={item.replyingTo}
            message={item.message}
            loggedInUser={item.username}
          />
        ))}

      {reply && (
        <AddCommentForm postReplies={postReplies} username={username} />
      )}
    </div>
  );
};

export default Replies;
