import classnames from "classnames";

const RoadmapStatus = ({ status, number, color }) => {
  const bgColorClass = classnames("w-4 h-4 rounded-3xl", color);
  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex items-center">
        <div className={bgColorClass} />

        <h1 className="pl-2">{status}</h1>
      </div>
      <span>{number}</span>
    </div>
  );
};

export default RoadmapStatus;
