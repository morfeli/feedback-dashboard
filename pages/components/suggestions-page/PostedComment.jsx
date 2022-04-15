const PostedComment = ({
  firstName,
  lastName,
  username,
  message,
  replyingTo,
}) => {
  return (
    <div>
      <div>
        <div className="flex">
          <h1>{firstName}</h1>
          <h1 className="pl-2">{lastName}</h1>
        </div>
        <p>@{username}</p>
        <div className="flex">
          {replyingTo ? <p>@{replyingTo}</p> : null}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PostedComment;
