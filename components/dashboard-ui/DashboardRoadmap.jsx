import classnames from "classnames";
import Link from "next/link";

import RoadmapStatus from "../dashboard-ui/UI/RoadmapStatus";

const DashboardRoadmap = ({ isMobile, data }) => {
  return (
    <section
      className={classnames(
        "p-4",
        "w-54",
        {
          "bg-white": !isMobile,
          "rounded-lg": !isMobile,
        },
        "xl:my-8",
        "xl:px-6"
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
          number={data.plannedData.length}
          color="bg-first-orange"
        />
        <RoadmapStatus
          status={"In-Progress"}
          number={data.inProgressData.length}
          color="bg-button-pink"
        />
        <RoadmapStatus
          status={"Live"}
          number={data.liveData.length}
          color="bg-light-blue"
        />
      </div>
    </section>
  );
};

export default DashboardRoadmap;
