import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

// import path from "path";
// import fs from "fs";

// components
import Dashboard from "../../components/dashboard-ui/Dashboard";
import SortingHeader from "../../components/dashboard-ui/SortingHeader";
import Suggestions from "../../components/suggestions-page/Suggestions";

// import { filteredData } from "../../helper/HelperFunctions";

const SuggestionsPage = ({ session, feedbackData }) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const isMobile = innerWidth <= 767;
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  // const { suggestions, progress, planned, live } = feedbackData;
  const [sort, setSort] = useState("Most Upvotes");
  const [category, setCategory] = useState("all");
  // const [filter, setFilter] = useState(suggestions);
  // const [suggestionLength, setSuggestionLength] = useState(filter.length);

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

  useEffect(() => {
    fetch("/api/staticdata")
      .then((res) => res.json())
      .then((data) => setData(data.productRequests));
    setIsLoading(false);
  }, []);

  const updateSortOption = (value) => {
    setSort(value);
  };

  const updateCategoryOption = (value) => {
    setCategory(value);
  };

  if (session) {
    return (
      <main className="xl:flex xl:justify-evenly">
        <div>
          <Dashboard
            isMobile={isMobile}
            innerWidth={innerWidth}
            updateCategory={updateCategoryOption}
          />
        </div>
        <div className="xl:w-900px xl:mt-12">
          <SortingHeader setSortOption={updateSortOption} />

          <Suggestions
            data={data}
            sortOption={sort}
            categoryOption={category}
            isMobile={isMobile}
            innerWidth={innerWidth}
          />
        </div>
      </main>
    );
  }
};

export default SuggestionsPage;

// async function getData() {
//   const filePath = path.join(process.cwd(), "public", "data", "data.json");
//   const jsonData = await fs.readFileSync(filePath);
//   const data = JSON.parse(jsonData);

//   return data;
// }

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
    // const data = await getData();

    // const inProgressStatusData = data.productRequests.filter(
    //   (item) => item.status == "in-progress"
    // );

    // const liveStatusData = data.productRequests.filter(
    //   (item) => item.status == "live"
    // );

    // const plannedStatusData = data.productRequests.filter(
    //   (item) => item.status == "planned"
    // );

    // let filterData = filteredData(data, "suggestion");

    // let feedbackData = {
    //   suggestions: filterData,
    //   progress: inProgressStatusData,
    //   planned: plannedStatusData,
    //   live: liveStatusData,
    // };

    return {
      props: { session },
    };
  }
};
