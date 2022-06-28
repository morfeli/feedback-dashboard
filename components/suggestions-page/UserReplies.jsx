const UserReplies = ({
  username,
  name,
  replyingTo,
  content,
  firstName,
  lastName,
  message,
  loggedInUser,
}) => {
  return (
    <>
      <div className="flex items-center justify-between pl-8">
        <div className="flex items-center">
          <div className="flex flex-col pl-4">
            <h1 className="font-jost-semibold text-first-blue">{name}</h1>
            {firstName && lastName && (
              <div className="flex">
                <h1 className="font-jost-semibold text-first-blue">
                  {firstName}
                </h1>
                <h1 className="pl-1 font-jost-semibold text-first-blue">
                  {lastName}
                </h1>
              </div>
            )}
            {username && <p className="text-second-blue">@{username}</p>}
            {loggedInUser && (
              <p className="text-second-blue">@{loggedInUser}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex py-2 pl-16">
        {content && (
          <p className="text-sm md:text-base">
            <span className="pr-2 text-button-pink font-jost-bold md:text-base">
              @{replyingTo}
            </span>
            {content}
          </p>
        )}
        {message && (
          <p className="text-sm">
            <span className="pr-2 text-button-pink font-jost-bold">
              @{replyingTo}
            </span>
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default UserReplies;
