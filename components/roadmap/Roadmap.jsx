import { useState, useEffect } from "react";

import MobileRoadmap from "./MobileRoadmap";
import RoadmapDesktop from "./RoadmapDesktop";

const Roadmap = ({ data, session, innerWidth, isMobile }) => {
  const { plannedData, progressData, liveData } = data;
  const [renderStatus, setRenderStatus] = useState();

  const plannedLength = `Planned (${plannedData.length})`;
  const inProgressLength = `In-Progress (${progressData.length})`;
  const liveLength = `Live (${liveData.length})`;

  useEffect(() => {
    setRenderStatus(data.progressData);
  }, [data.progressData]);

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
    title = plannedLength;
    content = "Features currently being planned.";
    color = "first-orange";
    borderColor = "border-t-first-orange";
  } else if (renderStatus == progressData) {
    title = inProgressLength;
    content = "Features currently being developed.";
    color = "button-pink";
    borderColor = "border-t-button-pink";
  } else if (renderStatus == liveData) {
    title = liveLength;
    content = "Features that are now live!";
    color = "light-blue";
    borderColor = "border-t-light-blue";
  }

  if (innerWidth == 0) {
    return <></>;
  } else if (isMobile) {
    return (
      <MobileRoadmap
        session={session}
        renderStatus={renderStatus}
        progressData={progressData}
        liveData={liveData}
        plannedData={plannedData}
        planned={plannedLength}
        live={liveLength}
        inProgress={inProgressLength}
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
        session={session}
        progressData={progressData}
        liveData={liveData}
        plannedData={plannedData}
        planned={plannedLength}
        live={liveLength}
        inProgress={inProgressLength}
        isMobile={isMobile}
      />
    );
  }
};

export default Roadmap;
