import NoSuggestions from "./NoSuggestions";
import FeedbackCard from "./FeedbackCard";

const filterDataByCategory = (category) => {
  if (category === "all") {
    let filteredFeedbacks = suggestions;
    setFilter(filteredFeedbacks);
    setSuggestionLength(filteredFeedbacks.length);
  } else {
    let filteredFeedbacks = suggestions.filter(
      (item) => item.category === category
    );
    setFilter(filteredFeedbacks);
    setSuggestionLength(filteredFeedbacks.length);
  }
};

function renderFeedback(arr, categoryOption, sortOption) {
  return arr
    .filter((item) => item.status == "suggestion")
    .filter((item) => {
      if (categoryOption === "all") {
        return item;
      } else {
        return (item) => item.category === categoryOption;
      }
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "Most Upvotes": {
          let sortedArray = arr.sort(
            (itemA, itemB) => itemB.upvotes - itemA.upvotes
          );

          return {
            sortedArray,
          };
        }
        case "Least Upvotes": {
          let sortedArray = arr.sort(
            (itemA, itemB) => itemA.upvotes - itemB.upvotes
          );

          return {
            sortedArray,
          };
        }
        case "Most Comments": {
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

        case "Least Comments": {
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
    });
}

const Suggestions = ({
  data,
  categoryOption,
  sortOption,
  isMobile,
  innerWidth,
}) => (
  <ul className="mt-8 space-y-4">
    <Feedback
      data={data}
      categoryOption={categoryOption}
      sortOption={sortOption}
      isMobile={isMobile}
      innerWidth={innerWidth}
    />
  </ul>
);

const Feedback = ({
  data,
  categoryOption,
  sortOption,
  isMobile,
  innerWidth,
}) => {
  console.log(sortOption);
  return renderFeedback(data, categoryOption, sortOption).map((item) => {
    let comments = item.comments;

    return (
      <FeedbackCard
        key={item.id}
        title={item.title}
        description={item.description}
        category={item.category}
        upvotes={item.upvotes}
        comments={comments}
        id={item.id}
        isMobile={isMobile}
        innerWidth={innerWidth}
      />
    );
  });
};

export default Suggestions;

// if (filter) {
//   return filter.length ? (
//     filter.map((item) => {
//       let comments = item.comments;

//       return (
//         <FeedbackCard
//           key={item.id}
//           id={item.id}
//           title={item.title}
//           description={item.description}
//           category={item.category}
//           upvotes={item.upvotes}
//           comments={comments}
//           isMobile={isMobile}
//           innerWidth={innerWidth}
//         />
//       );
//     })
//   ) : (
//     <NoSuggestions />
//   );
// }
