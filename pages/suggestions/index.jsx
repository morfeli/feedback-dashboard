import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../helper/HelperFunctions";

// components
import Dashboard from "../../components/dashboard-ui/Dashboard";
import SortingHeader from "../../components/dashboard-ui/SortingHeader";
import Suggestions from "../../components/suggestions-page/Suggestions";

const SuggestionsPage = ({ session, data, suggestionArrayLength, roadmap }) => {
  const [loading, setLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState([roadmap]);
  const [sortValue, setSortValue] = useState("Most Upvotes");
  const [categoryValue, setCategoryValue] = useState("all");
  const [statusType, __] = useState("suggestion");
  const [innerWidth, setInnerWidth] = useState(0);
  const isMobile = innerWidth <= 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);
  const loadingHandler = () => setLoading(false);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  useEffect(() => {
    setTimeout(() => {
      loadingHandler();
    }, 5000);
  }, []);

  const updateSortValue = (value) => {
    setSortValue(value);
  };

  const updateCategory = (value) => {
    setCategoryValue(value);
  };

  return (
    <main className="xl:flex xl:justify-evenly">
      <div>
        <Dashboard
          isMobile={isMobile}
          innerWidth={innerWidth}
          categoryFN={updateCategory}
          data={roadmapData}
        />
      </div>
      <div className="xl:w-900px xl:mt-12">
        <SortingHeader
          sortFN={updateSortValue}
          suggestionsLength={suggestionArrayLength}
        />

        <Suggestions
          session={session}
          isLoading={loading}
          data={data}
          sort={sortValue}
          status={statusType}
          category={categoryValue}
          isMobile={isMobile}
          innerWidth={innerWidth}
        />
      </div>
    </main>
  );
};

export default SuggestionsPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const client = await connectToDatabase();

    const storeData = [];

    await client
      .db()
      .collection("posts")
      .find()
      .forEach((post) => storeData.push(post));

    client.close();

    const suggestionArray = storeData.filter(
      (item) => item.status === "suggestion"
    );
    const plannedArray = storeData.filter((item) => item.status === "planned");
    const liveArray = storeData.filter((item) => item.status === "live");
    const progressArray = storeData.filter(
      (item) => item.status === "progress"
    );

    const suggestionArrayLength = suggestionArray.length;

    const roadmapData = {
      plannedArray,
      liveArray,
      progressArray,
    };
    const data = JSON.parse(JSON.stringify(storeData));

    const roadmap = JSON.parse(JSON.stringify(roadmapData));

    return {
      props: { session, data, roadmap, suggestionArrayLength },
    };
  }
};
