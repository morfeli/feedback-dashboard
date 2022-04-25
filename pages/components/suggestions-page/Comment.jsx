import { useState, useEffect } from "react";
import Image from "next/image";

import AddCommentForm from "./AddCommentForm";
import PostedComment from "./PostedComment";
import Replies from "./Replies";

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
      <div className="flex items-center pl-8">
        <div className="flex items-center">
          <Image src={image} width={50} height={50} className="rounded-3xl " />
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
      <p className="p-8 text-sm">{content}</p>

      <hr />

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

      {/* <hr /> */}
    </div>
  );
};

export default Comment;
