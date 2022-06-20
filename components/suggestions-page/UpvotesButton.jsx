import IconArrowSvg from "../dashboard-ui/UI/IconArrowSvg";

const UpvotesButton = ({ upvotes, id }) => {
  const onClick = () => {
    fetch("/api/feedback/inc-upvotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
  };
  return (
    <button
      onClick={onClick}
      value={id}
      className="flex items-center justify-between p-2 px-2 capitalize text-second-blue rounded-xl bg-light-gray font-jost-bold"
    >
      <IconArrowSvg />
      {upvotes}
    </button>
  );
};

export default UpvotesButton;
