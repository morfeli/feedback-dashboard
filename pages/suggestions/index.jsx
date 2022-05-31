import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import useSWR from "swr";

// components
import Dashboard from "../../components/dashboard-ui/Dashboard";
import SortingHeader from "../../components/dashboard-ui/SortingHeader";
import Suggestions from "../../components/suggestions-page/Suggestions";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SuggestionsPage = ({ session }) => {
  const { data, error } = useSWR("/api/staticdata", fetcher);
  const [feedbackData, setFeedbackData] = useState([]);
  const [length, setLength] = useState();
  const [sortValue, setSortValue] = useState("Most Upvotes");
  const [categoryValue, setCategoryValue] = useState("all");
  const [innerWidth, setInnerWidth] = useState(0);
  const isMobile = innerWidth <= 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  const progress = feedbackData.progress;
  const planned = feedbackData.planned;
  const live = feedbackData.live;

  const roadmapData = {
    progress,
    planned,
    live,
  };

  const updateSortValue = (value) => {
    setSortValue(value);
  };

  const updateCategory = (value) => {
    setCategoryValue(value);
  };

  const captureArrayLength = (value) => {
    setLength(value);
  };

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data) {
      setFeedbackData(data);
    }
  }, [data]);

  if (error) {
    return <div>An error has occured</div>;
  }

  if (!data) {
    // can return a loading spinner here...
    return <div>Loading..</div>;
  }

  return (
    <main className="xl:flex xl:justify-evenly">
      <div>
        <Dashboard
          isMobile={isMobile}
          innerWidth={innerWidth}
          categoryFN={updateCategory}
          roadmapData={roadmapData}
        />
      </div>
      <div className="xl:w-900px xl:mt-12">
        <SortingHeader sortFN={updateSortValue} length={length} />

        <Suggestions
          data={feedbackData}
          sort={sortValue}
          category={categoryValue}
          isMobile={isMobile}
          innerWidth={innerWidth}
          test={captureArrayLength}
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
    return {
      props: { session },
    };
  }
};
