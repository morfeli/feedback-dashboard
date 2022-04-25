import RoadmapStatus from "../dashboard-ui/UI/RoadmapStatus";
import Link from "next/link";

const DashboardRoadmap = ({ roadmap }) => {
  let progressLength = roadmap.progress.length;
  let liveLength = roadmap.live.length;
  let plannedLength = roadmap.planned.length;

  return (
    <section className="w-56 h-48 mx-auto mt-12">
      <div className="flex justify-between w-11/12 ">
        <h1>Roadmap</h1>
        <Link href="/roadmap">
          <button>View</button>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-32 mt-4">
        <RoadmapStatus
          status={"Planned"}
          number={plannedLength}
          color="bg-first-orange"
        />
        <RoadmapStatus
          status={"In-Progress"}
          number={progressLength}
          color="bg-button-pink"
        />
        <RoadmapStatus
          status={"Live"}
          number={liveLength}
          color="bg-light-blue"
        />
      </div>
    </section>
  );
};

export default DashboardRoadmap;
