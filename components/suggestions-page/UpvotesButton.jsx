import IconArrowSvg from "../dashboard-ui/UI/IconArrowSvg";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UpvotesButton = ({ upvotes, id, stateUpvote, userHasUpVoted }) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (status === "authenticated") {
      setUserData([session.user.name]);
    }
  }, [status, session]);

  const buttonStyles = classNames(
    "flex items-center justify-between p-2 px-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold",
    {
      "bg-first-blue": userHasUpVoted,
      "text-slate-50": userHasUpVoted,
    }
  );

  const onClick = () => {
    stateUpvote();

    const userObject = {
      email: userData[0].email,
      id: id,
    };

    setTimeout(() => {
      fetch("/api/feedback/inc-upvotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObject),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, 3);
  };
  return (
    <button onClick={onClick} value={id} className={buttonStyles}>
      <IconArrowSvg userHasUpVoted={userHasUpVoted} />
      {upvotes}
    </button>
  );
};

export default UpvotesButton;
