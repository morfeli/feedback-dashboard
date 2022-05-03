import { useState, useEffect } from "react";

import path from "path";
import fs from "fs/promises";

import RoadmapHeader from "../../components/roadmap/RoadmapHeader";
import Roadmap from "../../components/roadmap/Roadmap";

const RoadmapPage = ({ data }) => {
  const [innerWidth, setInnerWidth] = useState(0);

  const isMobile = innerWidth <= 768;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  return (
    <>
      <RoadmapHeader />
      <Roadmap data={data} innerWidth={innerWidth} isMobile={isMobile} />
    </>
  );
};

export default RoadmapPage;

export const getServerSideProps = async () => {
  let filePath = path.join(process.cwd(), "public", "data", "data.json");

  let jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

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
