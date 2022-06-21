import classNames from "classnames";
import RoadmapCards from "./RoadmapCards";

const MobileRoadmap = ({
  changeStatus,
  renderStatus,
  plannedData,
  progressData,
  liveData,
  planned,
  inProgress,
  live,
  title,
  content,
  color,
  borderColor,
  isMobile,
}) => {
  return (
    <section className="overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-8 border-b-4">
        <button
          onClick={changeStatus}
          value="planned"
          className={classNames("pb-4", "w-28", {
            "border-b-first-orange": renderStatus
              ? renderStatus == plannedData
              : null,
            "border-b-4": renderStatus ? renderStatus == plannedData : null,
          })}
        >
          {planned}
        </button>
        <button
          onClick={changeStatus}
          value="in-progress"
          className={classNames("pb-4", "w-28", {
            "border-b-button-pink": renderStatus
              ? renderStatus == progressData
              : null,
            "border-b-4": renderStatus ? renderStatus == progressData : null,
          })}
        >
          {inProgress}
        </button>
        <button
          onClick={changeStatus}
          value="live"
          className={classNames("pb-4", "w-28", {
            "border-b-light-blue": renderStatus
              ? renderStatus == liveData
              : null,
            "border-b-4": renderStatus ? renderStatus == liveData : null,
          })}
        >
          {live}
        </button>
      </div>
      <div>
        <div className="p-4">
          <h1 className="font-jost-bold">{title}</h1>
          <p>{content}</p>
        </div>
        {renderStatus &&
          renderStatus.map((item, i) => {
            let comments = item.comments;
            return (
              <RoadmapCards
                animateKey={i}
                key={item.id}
                title={item.title}
                category={item.category}
                upvotes={item.upvotes}
                status={item.status}
                comments={comments ? comments : null}
                description={item.description}
                id={item.id}
                color={color}
                borderColor={borderColor}
                isMobile={isMobile}
              />
            );
          })}
      </div>
    </section>
  );
};

export default MobileRoadmap;
