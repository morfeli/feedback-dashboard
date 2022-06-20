import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../helper/HelperFunctions";

// import useSWR from "swr";

// components
import Dashboard from "../../components/dashboard-ui/Dashboard";
import SortingHeader from "../../components/dashboard-ui/SortingHeader";
import Suggestions from "../../components/suggestions-page/Suggestions";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const SuggestionsPage = ({ session, data, suggestionArrayLength }) => {
  // const { data, error } = useSWR("/api/feedback/fetchFeedbackData", fetcher);
  // const [loading, setLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState([]);
  const [sortValue, setSortValue] = useState("Most Upvotes");
  const [categoryValue, setCategoryValue] = useState("all");
  const [statusType, __] = useState("suggestion");
  const [length, setLength] = useState(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const isMobile = innerWidth <= 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  const filterDataForRoadmapPage = () => {
    const plannedData = data.filter((item) => item.status === "planned");
    const liveData = data.filter((item) => item.status === "live");
    const inProgressData = data.filter((item) => item.status === "in-progress");

    const roadmap = {
      plannedData,
      liveData,
      inProgressData,
    };

    setRoadmapData(roadmap);
  };
  useEffect(() => {
    filterDataForRoadmapPage();
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }

  //   if (data) {
  //     setLoading(false);
  //     setFeedbackData(data);
  //   }
  // }, [data]);

  const updateSortValue = (value) => {
    setSortValue(value);
  };

  const updateCategory = (value) => {
    setCategoryValue(value);
  };

  // if (!data) {
  //   // can return a loading spinner here...
  //   return <div>Loading..</div>;
  // }

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

    const suggestionArray = storeData.filter(
      (item) => item.status === "suggestion"
    );

    const suggestionArrayLength = suggestionArray.length;

    const data = JSON.parse(JSON.stringify(storeData));

    return {
      props: { session, data, suggestionArrayLength },
    };
  }
};
