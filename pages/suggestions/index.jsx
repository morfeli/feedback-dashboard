import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

// components
import Dashboard from "../components/dashboard-ui/Dashboard";
import SortingHeader from "../components/dashboard-ui/SortingHeader";
import Suggestions from "../components/suggestions-page/Suggestions";

import {
  buildFeedbackPath,
  extractFeedback,
  filteredData,
} from "../helper/HelperFunctions";

const SuggestionsPage = ({ session, filterData }) => {
  const [sort, setSort] = useState("Most_Upvotes");
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = useState();

  const filterDataByCategory = (category) => {
    if (category === "all") {
      let filteredFeedbacks = filterData;
      setFilter(filteredFeedbacks);
    } else {
      let filteredFeedbacks = filterData.filter(
        (item) => item.category === category
      );
      setFilter(filteredFeedbacks);
    }
  };

  const renderSortedFeedback = (sort) => {
    let arr;
    if (filter) {
      arr = filter;
    } else {
      arr = filterData;
    }

    switch (sort) {
      case "Most_Upvotes": {
        let sortedArray = arr.sort(
          (itemA, itemB) => itemB.upvotes - itemA.upvotes
        );

        return {
          sortedArray,
        };
      }
      case "Least_Upvotes": {
        let sortedArray = arr.sort(
          (itemA, itemB) => itemA.upvotes - itemB.upvotes
        );

        return {
          sortedArray,
        };
      }
      case "Most_Comments": {
        let sortedArray = arr.sort((a, b) => {
          const commentsA = a.comments ? a.comments.length : 0;
          const commentsB = b.comments ? b.comments.length : 0;

          const repliesA = a.comments ? a.comments : [];
          const filteredRepliesA = repliesA.filter((comment) => {
            return comment.replies ? comment.replies : null;
          });

          const repliesB = b.comments ? b.comments : [];
          const filteredRepliesB = repliesB.filter((comment) => {
            return comment.replies ? comment.replies : null;
          });

          const repliesLengthA = filteredRepliesA[0]
            ? filteredRepliesA[0].replies.length
            : 0;
          const repliesLengthB = filteredRepliesB[0]
            ? filteredRepliesB[0].replies.length
            : 0;

          const A = commentsA + repliesLengthA;
          const B = commentsB + repliesLengthB;

          return B - A;
        });

        return {
          sortedArray,
        };
      }

      case "Least_Comments": {
        let sortedArray = arr.sort((a, b) => {
          const commentsA = a.comments ? a.comments.length : 0;
          const commentsB = b.comments ? b.comments.length : 0;

          const repliesA = a.comments ? a.comments : [];
          const filteredRepliesA = repliesA.filter((comment) => {
            return comment.replies ? comment.replies : null;
          });

          const repliesB = b.comments ? b.comments : [];
          const filteredRepliesB = repliesB.filter((comment) => {
            return comment.replies ? comment.replies : null;
          });

          const repliesLengthA = filteredRepliesA[0]
            ? filteredRepliesA[0].replies.length
            : 0;
          const repliesLengthB = filteredRepliesB[0]
            ? filteredRepliesB[0].replies.length
            : 0;

          const A = commentsA + repliesLengthA;
          const B = commentsB + repliesLengthB;

          return A - B;
        });
        return {
          sortedArray,
        };
      }
    }
  };

  useEffect(() => {
    renderSortedFeedback();
  }, [sort, filter]);

  const updateSortedArray = (value) => {
    setSort(value);
  };

  const updateCategory = (value) => {
    setCategory(value);
  };

  if (session) {
    return (
      <>
        <Dashboard test={filterDataByCategory} category={updateCategory} />

        <SortingHeader
          sortArray={updateSortedArray}
          test={renderSortedFeedback}
          data={filterData}
        />

        <Suggestions data={filterData} sort={sort} filter={filter} />
      </>
    );
  }
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
    let filePath = buildFeedbackPath();
    let data = await extractFeedback(filePath);

    let filterData = filteredData(data, "suggestion");

    return {
      props: { session, filterData },
    };
  }
};
