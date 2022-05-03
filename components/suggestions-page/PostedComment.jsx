const PostedComment = ({
  firstName,
  lastName,
  username,
  message,
  replyingTo,
}) => {
  return (
    <aside className="pb-8 pl-4 ml-3 border-l">
      <div className="flex">
        <h1 className="font-jost-semibold text-first-blue">{firstName}</h1>
        <h1 className="pl-1 font-jost-semibold text-first-blue">{lastName}</h1>
      </div>
      <p className="text-first-blue">@{username}</p>
      <div className="flex items-center">
        {replyingTo ? (
          <span className="pr-2 text-sm text-button-pink font-jost-bold">
            @{replyingTo}
          </span>
        ) : null}
        <p className="text-sm">{message}</p>
      </div>
    </aside>
  );
};

export default PostedComment;
