const UserReplies = ({
  username,
  name,
  toggleReply,
  replyingTo,
  content,
  firstName,
  lastName,
  message,
  loggedInUser,
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div>
          <h1 className="font-jost-semibold text-first-blue">{name}</h1>
          {firstName && lastName ? (
            <div className="flex items-center">
              <h1 className="font-jost-semibold text-first-blue">
                {firstName}
              </h1>
              <h1 className="font-jost-semibold text-first-blue">{lastName}</h1>
            </div>
          ) : null}
          {username ? <p className="text-second-blue">@{username}</p> : null}
          {loggedInUser ? (
            <p className="text-second-blue">@{loggedInUser}</p>
          ) : null}
        </div>

        <h1 className="text-first-blue" onClick={toggleReply}>
          Reply
        </h1>
      </div>

      <div className="flex px-4 py-2">
        {content ? (
          <p className="text-sm">
            <span className="pr-2 text-button-pink font-jost-bold">
              @{replyingTo}
            </span>
            {content}
          </p>
        ) : null}
        {message ? (
          <p className="text-sm">
            <span className="pr-2 text-button-pink font-jost-bold">
              @{replyingTo}
            </span>
            {message}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default UserReplies;
