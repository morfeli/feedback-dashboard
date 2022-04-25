import { buildFeedbackPath, extractFeedback } from "../helper/HelperFunctions";

import RoadmapHeader from "../components/dashboard-ui/RoadmapHeader";
import RoadmapAnimatedTabs from "../components/dashboard-ui/RoadmapAnimatedTabs";

const RoadmapPage = ({ data }) => {
  return (
    <>
      <RoadmapHeader />
      <RoadmapAnimatedTabs data={data} />
    </>
  );
};

export default RoadmapPage;

export const getServerSideProps = async () => {
  const filePath = buildFeedbackPath();

  const data = await extractFeedback(filePath);

  const filteredData = data.productRequests.filter(
    (item) => item.status != "suggestion"
  );

  const inProgressStatusData = filteredData.filter(
    (item) => item.status == "in-progress"
  );

  const liveStatusData = filteredData.filter((item) => item.status == "live");

  const plannedStatusData = filteredData.filter(
    (item) => item.status == "planned"
  );

  const statusData = {
    progress: inProgressStatusData,
    live: liveStatusData,
    planned: plannedStatusData,
  };

  return {
    props: { data: statusData },
  };
};
