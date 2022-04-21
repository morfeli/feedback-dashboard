const RoadmapTabs = ({ data }) => {
  const plannedDataLength = data.planned.length;
  const inProgressDataLength = data.progress.length;
  const liveDataLength = data.live.length;

  return (
    <div className="flex justify-between items-center p-4 border-b-4 ">
      <button>Planned ({plannedDataLength})</button>
      <button>In-Progress ({inProgressDataLength})</button>
      <button>Live ({liveDataLength})</button>
    </div>
  );
};

export default RoadmapTabs;
