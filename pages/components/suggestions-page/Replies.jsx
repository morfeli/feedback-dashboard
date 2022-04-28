import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import UserReplies from "./UserReplies";

const Replies = ({ username, name, replyingTo, content, image }) => {
  const [reply, setReply] = useState(false);
  const [replies, setReplies] = useState([]);

  const toggleReply = () => {
    setReply((current) => !current);
  };

  const postReplies = (data) => {
    setReplies((current) => [...current, data]);
  };

  return (
    <div className="py-2 pl-4 pr-12 mt-4 ml-3 border-l md:pl-28">
      <UserReplies
        username={username}
        name={name}
        replyingTo={replyingTo}
        content={content}
        toggleReply={toggleReply}
        image={image}
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
        <AddCommentForm
          postReplies={postReplies}
          username={username}
          toggleReply={toggleReply}
        />
      )}
    </div>
  );
};

export default Replies;
