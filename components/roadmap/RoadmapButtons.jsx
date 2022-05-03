import classNames from "classnames";

const RoadmapButtons = ({
  changeStatus,
  children,
  renderStatus,
  value,
  plannedData,
  progressData,
  liveData,
}) => {
  let color;
  if (renderStatus === plannedData) {
    color = "first-orange";
  } else if (renderStatus === progressData) {
    color = "button-pink";
  } else if (renderStatus === liveData) {
    color = "light-blue";
  }
  console.log(color);

  const buttonStyles = classNames("pb-4", "w-28", {});

  return (
    <button onClick={changeStatus} value={value} className={buttonStyles}>
      {children}
    </button>
  );
};

export default RoadmapButtons;
