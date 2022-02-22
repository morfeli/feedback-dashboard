import RoadmapStatus from "./RoadmapStatus";

const DashboardRoadmap = () => {
  return (
    <section className="w-56 h-48 mx-auto mt-12">
      <div className="flex justify-between w-11/12 ">
        <h1>Roadmap</h1>
        <button>View</button>
      </div>
      <div className="flex flex-col justify-between h-32 mt-4">
        <RoadmapStatus status={"Planned"} number={2} color="bg-first-orange" />
        <RoadmapStatus
          status={"In-Progress"}
          number={3}
          color="bg-button-pink"
        />
        <RoadmapStatus status={"Live"} number={1} color="bg-light-blue" />
      </div>
    </section>
  );
};

export default DashboardRoadmap;
