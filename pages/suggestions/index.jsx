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
  const [loading, setLoading] = useState(true);
  // const [sort, setSort] = useState("Most Upvotes");
  // const [category, setCategory] = useState("all");
  // const [filter, setFilter] = useState(suggestions);
  // const [suggestionLength, setSuggestionLength] = useState(filter.length);
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
    <main className="xl:flex xl:justify-evenly xl:items-baseline">
      <div>
        <Dashboard
          isMobile={isMobile}
          innerWidth={innerWidth}
          // test={filterDataByCategory}
          // category={updateCategory}
          // roadmap={roadmapData}
        />
      </div>
      <div className="xl:w-900px">
        <SortingHeader
        // sortArray={updateSortedArray}
        // test={renderSortedFeedback}
        // data={suggestions}
        // suggestionLength={suggestionLength}
        />

        <Suggestions
          data={feedbackData}
          // sort={sort}
          // filter={filter}
          // isMobile={isMobile}
          // innerWidth={innerWidth}
        />
      </div>
    </main>
  );

  // const filterDataByCategory = (category) => {
  //   if (category === "all") {
  //     let filteredFeedbacks = suggestions;
  //     setFilter(filteredFeedbacks);
  //     setSuggestionLength(filteredFeedbacks.length);
  //   } else {
  //     let filteredFeedbacks = suggestions.filter(
  //       (item) => item.category === category
  //     );
  //     setFilter(filteredFeedbacks);
  //     setSuggestionLength(filteredFeedbacks.length);
  //   }
  // };

  // const renderSortedFeedback = (sort) => {
  //   let arr;
  //   if (filter) {
  //     arr = filter;
  //   } else {
  //     arr = suggestions;
  //   }

  //   switch (sort) {
  //     case "Most Upvotes": {
  //       let sortedArray = arr.sort(
  //         (itemA, itemB) => itemB.upvotes - itemA.upvotes
  //       );

  //       return {
  //         sortedArray,
  //       };
  //     }
  //     case "Least Upvotes": {
  //       let sortedArray = arr.sort(
  //         (itemA, itemB) => itemA.upvotes - itemB.upvotes
  //       );

  //       return {
  //         sortedArray,
  //       };
  //     }
  //     case "Most Comments": {
  //       let sortedArray = arr.sort((a, b) => {
  //         const commentsA = a.comments ? a.comments.length : 0;
  //         const commentsB = b.comments ? b.comments.length : 0;

  //         const repliesA = a.comments ? a.comments : [];
  //         const filteredRepliesA = repliesA.filter((comment) => {
  //           return comment.replies ? comment.replies : null;
  //         });

  //         const repliesB = b.comments ? b.comments : [];
  //         const filteredRepliesB = repliesB.filter((comment) => {
  //           return comment.replies ? comment.replies : null;
  //         });

  //         const repliesLengthA = filteredRepliesA[0]
  //           ? filteredRepliesA[0].replies.length
  //           : 0;
  //         const repliesLengthB = filteredRepliesB[0]
  //           ? filteredRepliesB[0].replies.length
  //           : 0;

  //         const A = commentsA + repliesLengthA;
  //         const B = commentsB + repliesLengthB;

  //         return B - A;
  //       });

  //       return {
  //         sortedArray,
  //       };
  //     }

  //     case "Least Comments": {
  //       let sortedArray = arr.sort((a, b) => {
  //         const commentsA = a.comments ? a.comments.length : 0;
  //         const commentsB = b.comments ? b.comments.length : 0;

  //         const repliesA = a.comments ? a.comments : [];
  //         const filteredRepliesA = repliesA.filter((comment) => {
  //           return comment.replies ? comment.replies : null;
  //         });

  //         const repliesB = b.comments ? b.comments : [];
  //         const filteredRepliesB = repliesB.filter((comment) => {
  //           return comment.replies ? comment.replies : null;
  //         });

  //         const repliesLengthA = filteredRepliesA[0]
  //           ? filteredRepliesA[0].replies.length
  //           : 0;
  //         const repliesLengthB = filteredRepliesB[0]
  //           ? filteredRepliesB[0].replies.length
  //           : 0;

  //         const A = commentsA + repliesLengthA;
  //         const B = commentsB + repliesLengthB;

  //         return A - B;
  //       });
  //       return {
  //         sortedArray,
  //       };
  //     }
  //   }
  // };

  // const updateSortedArray = (value) => {
  //   setSort(value);
  // };

  // const updateCategory = (value) => {
  //   setCategory(value);
  // };
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
