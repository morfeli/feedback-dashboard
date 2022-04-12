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

  const renderSortedFeedback = (sort) => {
    switch (sort) {
      case "Most_Upvotes": {
        let sortedArray = filterData.sort(
          (itemA, itemB) => itemB.upvotes - itemA.upvotes
        );

        return {
          sortedArray,
        };
      }
      case "Least_Upvotes": {
        let sortedArray = filterData.sort(
          (itemA, itemB) => itemA.upvotes - itemB.upvotes
        );

        return {
          sortedArray,
        };
      }
      case "Most_Comments": {
        let sortedArray = filterData.sort((a, b) => {
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
        let sortedArray = filterData.sort((a, b) => {
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

  // useEffect(() => {
  //   renderSortedFeedback(sort);
  // }, [sort]);

  const updateSortedArray = (value) => {
    setSort(value);
  };

  if (session) {
    return (
      <>
        <Dashboard />

        <SortingHeader
          sortArray={updateSortedArray}
          test={renderSortedFeedback}
          data={filterData}
        />

        <Suggestions data={filterData} sort={sort} />
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
