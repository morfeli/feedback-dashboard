import { useState, useEffect } from "react";
import classNames from "classnames";

import RoadmapCards from "../roadmap/RoadmapCards";

const RoadmapAnimatedTabs = ({ data }) => {
  const [renderStatus, setRenderStatus] = useState();

  const progressData = data.progress;
  const plannedData = data.planned;
  const liveData = data.live;

  const planned = `Planned (${data.planned.length})`;
  const inProgress = `In-Progress (${data.progress.length})`;
  const live = `Live (${data.live.length})`;

  useEffect(() => {
    setRenderStatus(progressData);
  }, []);

  const changeStatus = (e) => {
    let value = e.target.value;
    switch (value) {
      case "planned":
        setRenderStatus(plannedData);

        break;
      case "in-progress":
        setRenderStatus(progressData);
        break;
      case "live":
        setRenderStatus(liveData);
        break;
    }
  };

  let title;
  let content;
  let color;

  if (renderStatus == plannedData) {
    title = planned;
    content = "Features currently being planned.";
    color = "first-orange";
  } else if (renderStatus == progressData) {
    title = inProgress;
    content = "Features currently being developed.";
    color = "button-pink";
  } else if (renderStatus == liveData) {
    title = live;
    content = "Features that are now live!";
    color = "light-blue";
  }

  return (
    <section className="overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={changeStatus}
          value="planned"
          className={classNames("pb-4", "border-b-4", {
            "border-b-first-orange": renderStatus
              ? renderStatus == plannedData
              : null,
          })}
        >
          {planned}
        </button>
        <button
          onClick={changeStatus}
          value="in-progress"
          className={classNames("pb-4", "border-b-4", {
            "border-b-button-pink": renderStatus
              ? renderStatus == progressData
              : null,
          })}
        >
          {inProgress}
        </button>
        <button
          onClick={changeStatus}
          value="live"
          className={classNames("pb-4", "border-b-4", {
            "border-b-light-blue": renderStatus
              ? renderStatus == liveData
              : null,
          })}
        >
          {live}
        </button>
      </div>
      <article>
        <div className="p-4">
          <h1 className="font-jost-bold">{title}</h1>
          <p>{content}</p>
        </div>
        {renderStatus ? (
          renderStatus.map((item) => {
            let comments = item.comments;
            return (
              <RoadmapCards
                key={item.id}
                title={item.title}
                category={item.category}
                upvotes={item.upvotes}
                status={item.status}
                comments={comments ? comments : null}
                description={item.description}
                id={item.id}
                color={color}
              />
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </article>
    </section>
  );
};

export default RoadmapAnimatedTabs;
