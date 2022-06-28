import UserReplies from "./UserReplies";

const Replies = ({ username, name, replyingTo, content, image }) => {
  return (
    <div className="border-l md:pl-28">
      <UserReplies
        username={username}
        name={name}
        replyingTo={replyingTo}
        content={content}
        image={image}
      />
    </div>
  );
};

export default Replies;
