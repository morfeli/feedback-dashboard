import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../helper/HelperFunctions";

import RoadmapHeader from "../../components/roadmap/RoadmapHeader";
import Roadmap from "../../components/roadmap/Roadmap";

const RoadmapPage = ({ data, session }) => {
  const [innerWidth, setInnerWidth] = useState(0);
  console.log(session);
  const isMobile = innerWidth <= 768;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  if (!session) {
    return null;
  }

  return (
    <>
      <RoadmapHeader />
      <Roadmap
        data={data}
        session={session}
        innerWidth={innerWidth}
        isMobile={isMobile}
      />
    </>
  );
};

export default RoadmapPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const storeData = [];

  const client = await connectToDatabase();

  await client
    .db()
    .collection("posts")
    .find()
    .forEach((post) => storeData.push(post));

  client.close();

  const plannedData = storeData.filter((item) => item.status === "planned");

  const progressData = storeData.filter(
    (item) => item.status === "in-progress"
  );

  const liveData = storeData.filter((item) => item.status === "live");

  const roadmapData = {
    plannedData,
    progressData,
    liveData,
  };

  return {
    props: { session, data: JSON.parse(JSON.stringify(roadmapData)) },
  };
};
