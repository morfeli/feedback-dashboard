import classnames from "classnames";

const RoadmapStatus = ({ status, number, color }) => {
  const bgColorClass = classnames("w-4 h-4 rounded-3xl", color);
  return (
    <div className="flex items-center justify-between w-11/12">
      <div className={bgColorClass} />
      <div className="flex justify-between w-3/4">
        <h1>{status}</h1>
        <span>{number}</span>
      </div>
    </div>
  );
};

export default RoadmapStatus;
