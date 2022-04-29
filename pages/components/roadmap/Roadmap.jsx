import { useState, useEffect } from "react";

import MobileRoadmap from "./MobileRoadmap";
import RoadmapDesktop from "./RoadmapDesktop";

const Roadmap = ({ data, innerWidth, isMobile }) => {
  const [renderStatus, setRenderStatus] = useState();

  const progressData = data.progress;
  const plannedData = data.planned;
  const liveData = data.live;

  const planned = `Planned (${data.planned.length})`;
  const inProgress = `In-Progress (${data.progress.length})`;
  const live = `Live (${data.live.length})`;

  useEffect(() => {
    setRenderStatus(progressData);
  });

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
  let borderColor;

  if (renderStatus == plannedData) {
    title = planned;
    content = "Features currently being planned.";
    color = "first-orange";
    borderColor = "border-t-first-orange";
  } else if (renderStatus == progressData) {
    title = inProgress;
    content = "Features currently being developed.";
    color = "button-pink";
    borderColor = "border-t-button-pink";
  } else if (renderStatus == liveData) {
    title = live;
    content = "Features that are now live!";
    color = "light-blue";
    borderColor = "border-t-light-blue";
  }

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <MobileRoadmap
        renderStatus={renderStatus}
        progressData={progressData}
        liveData={liveData}
        plannedData={plannedData}
        planned={planned}
        live={live}
        inProgress={inProgress}
        title={title}
        content={content}
        color={color}
        borderColor={borderColor}
        changeStatus={changeStatus}
        isMobile={isMobile}
      />
    );
  } else {
    return (
      <RoadmapDesktop
        progressData={progressData}
        liveData={liveData}
        plannedData={plannedData}
        planned={planned}
        live={live}
        inProgress={inProgress}
        isMobile={isMobile}
      />
    );
  }
};

export default Roadmap;
