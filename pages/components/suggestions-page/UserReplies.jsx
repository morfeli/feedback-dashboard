import Image from "next/image";

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
  image,
}) => {
  return (
    <>
      <div className="flex items-center justify-between pl-8">
        <div className="flex items-center">
          {image ? (
            <Image src={image} width={50} height={50} className="rounded-3xl" />
          ) : null}

          <div className="flex flex-col pl-4">
            <h1 className="font-jost-semibold text-first-blue">{name}</h1>
            {firstName && lastName ? (
              <div className="flex">
                <h1 className="font-jost-semibold text-first-blue">
                  {firstName}
                </h1>
                <h1 className="pl-1 font-jost-semibold text-first-blue">
                  {lastName}
                </h1>
              </div>
            ) : null}
            {username ? <p className="text-second-blue">@{username}</p> : null}
            {loggedInUser ? (
              <p className="text-second-blue">@{loggedInUser}</p>
            ) : null}
          </div>
        </div>

        <h1 className="text-first-blue" onClick={toggleReply}>
          Reply
        </h1>
      </div>
      <div className="flex py-2">
        {content ? (
          <p className="text-sm md:text-base">
            <span className="pr-2 text-button-pink font-jost-bold md:text-base">
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
