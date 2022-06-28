import { useState } from "react";
import UserComment from "./UserComment";
import UserReplies from "./UserReplies";

const FeedbackComments = ({
  searchID,
  commentID,
  firstName,
  lastName,
  username,
  content,
  replyArray,
}) => {
  const [stateReplies, setStateReplies] = useState([]);
  const postReplies = (data) => {
    setStateReplies((current) => [...current, data]);
  };

  return (
    <div>
      <UserComment
        searchID={searchID}
        commentID={commentID}
        firstName={firstName}
        lastName={lastName}
        username={username}
        content={content}
        postReplies={postReplies}
      />

      {replyArray &&
        replyArray.map((item, i) => (
          <UserReplies
            key={i}
            firstName={item.user.firstName}
            lastName={item.user.lastName}
            username={item.user.userName}
            content={item.content}
            replyingTo={item.replyingTo}
          />
        ))}

      {stateReplies &&
        stateReplies.map((item, i) => {
          return (
            <UserReplies
              key={i}
              username={item.userName}
              firstName={item.firstName}
              lastName={item.lastName}
              message={item.message}
              replyingTo={item.replyingTo}
            />
          );
        })}
    </div>
  );
};

export default FeedbackComments;
