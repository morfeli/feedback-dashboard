import classnames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

import RoadmapStatus from "../dashboard-ui/UI/RoadmapStatus";

const DashboardRoadmap = ({ roadmapData, isMobile }) => {
  return (
    <section
      className={classnames(
        "p-4",
        "w-64",
        {
          "bg-white": !isMobile,
          "rounded-lg": !isMobile,
        },
        "xl:my-8",
        "xl:px-8"
      )}
    >
      <div className="flex flex-col justify-between p-4">
        <div className="flex justify-between">
          <h1 className="pr-8 font-jost-bold text-second-blue">Roadmap</h1>
          <Link href="/roadmap" passHref>
            <button className="border-b-2 text-first-blue border-b-first-blue">
              View
            </button>
          </Link>
        </div>
        <RoadmapStatus
          status={"Planned"}
          number={roadmapData.planned ? roadmapData.planned.length : 0}
          color="bg-first-orange"
        />
        <RoadmapStatus
          status={"In-Progress"}
          number={roadmapData.progress ? roadmapData.progress.length : 0}
          color="bg-button-pink"
        />
        <RoadmapStatus
          status={"Live"}
          number={roadmapData.live ? roadmapData.live.length : 0}
          color="bg-light-blue"
        />
      </div>
    </section>
  );
};

export default DashboardRoadmap;
