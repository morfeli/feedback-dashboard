const IconArrowSvg = ({ userHasUpVoted, stateColor }) => {
  return (
    <svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M1 6l4-4 4 4"
        stroke={userHasUpVoted || stateColor ? "#FFF" : "#4661E6"}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default IconArrowSvg;
