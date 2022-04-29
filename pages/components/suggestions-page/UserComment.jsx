import Image from "next/image";

const UserComment = ({
  image,
  username,
  name,
  toggleReply,
  content,
  firstName,
  lastName,
  message,
}) => {
  return (
    <>
      <div className="flex items-center justify-between pl-8">
        <div className="flex items-center">
          {image ? (
            <Image src={image} width={50} height={50} className="rounded-3xl" />
          ) : null}

          <div className="flex flex-col pl-4">
            <h1 className="font-jost-semibold">{name}</h1>
            {firstName && lastName ? (
              <div className="flex">
                <h1 className="font-jost-semibold">{firstName}</h1>
                <h1 className="pl-2 font-jost-semibold">{lastName}</h1>
              </div>
            ) : null}
            <p>@{username}</p>
          </div>
        </div>

        <h1 onClick={toggleReply} className="pr-8 text-first-blue">
          Reply
        </h1>
      </div>
      {message && <p className="p-8 pl-12 text-sm">{message}</p>}
      <p className="p-8 text-sm md:text-base md:pl-24">{content}</p>
    </>
  );
};

export default UserComment;
