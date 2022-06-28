import { useState } from "react";
import AddCommentForm from "./AddCommentForm";

const UserComment = ({
  username,
  searchID,
  commentID,
  content,
  firstName,
  lastName,
  message,
  postReplies,
}) => {
  const [triggerForm, setTriggerForm] = useState(false);

  const toggleReply = () => {
    setTriggerForm((current) => !current);
  };

  return (
    <>
      <div className="flex items-baseline justify-between pl-4 m-4 rounded-md bg-slate-200">
        <div className="flex flex-col pl-4 my-2">
          <h1 className="font-jost-semibold">
            {firstName} {lastName}{" "}
          </h1>
          <p className="pt-2">@{username}</p>
          <p className="pt-4 pl-4 text-md">{content}</p>
          {message && <p className="pt-4 pl-4 text-md">{message}</p>}
        </div>

        <h1
          onClick={toggleReply}
          className="pr-8 cursor-pointer text-first-blue"
        >
          Reply
        </h1>
      </div>

      {triggerForm && (
        <AddCommentForm
          toggleReply={toggleReply}
          postReplies={postReplies}
          searchID={searchID}
          commentID={commentID}
          username={username}
        />
      )}
    </>
  );
};

export default UserComment;
