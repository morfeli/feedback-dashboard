import NoSuggestions from "./NoSuggestions";
import FeedbackCard from "./FeedbackCard";

function renderFeeback(items, sortOption, categoryOption) {
  return items
    .filter((item) => {
      switch (categoryOption) {
        case "all":
          return item;
        case "ui":
          return item.category == "ui";
        case "ux":
          return item.category == "ux";
        case "ux":
          return item.category == "ux";
        case "feature":
          return item.category == "feature";
        case "bug":
          return item.category == "bug";
        case "enhancement":
          return item.category == "enhancement";
      }
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "Most Upvotes":
          return b.upvotes - a.upvotes;
        case "Least Upvotes":
          return a.upvotes - b.upvotes;
        case "Most Comments":
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

        case "Least Comments":
          const commentsA1 = a.comments ? a.comments.length : 0;
          const commentsB1 = b.comments ? b.comments.length : 0;

          const repliesA1 = a.comments ? a.comments : [];
          const filteredRepliesA1 = repliesA1.filter((comment) => {
            return comment.replies ? comment.replies : null;
          });

          const repliesB1 = b.comments ? b.comments : [];
          const filteredRepliesB1 = repliesB1.filter((comment) => {
            return comment.replies ? comment.replies : null;
          });

          const repliesLengthA1 = filteredRepliesA1[0]
            ? filteredRepliesA1[0].replies.length
            : 0;
          const repliesLengthB1 = filteredRepliesB1[0]
            ? filteredRepliesB1[0].replies.length
            : 0;

          const A1 = commentsA1 + repliesLengthA1;
          const B1 = commentsB1 + repliesLengthB1;

          return A1 - B1;
      }
    });
}

const Suggestions = ({ data, sort, category, isMobile, innerWidth }) => {
  return (
    <div className="mt-8 space-y-4">
      <Feedback
        data={data.suggestions}
        sort={sort}
        category={category}
        isMobile={isMobile}
        innerWidth={innerWidth}
      />
    </div>
  );
};

const Feedback = ({ data, sort, category, isMobile, innerWidth }) => {
  if (data) {
    let array = renderFeeback(data, sort, category);

    if (array.length) {
      return (
        <ul>
          {array.map((item, i) => {
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
          })}
        </ul>
      );
    } else {
      return <NoSuggestions />;
    }
  }

  return <div>Loading...</div>;
};

export default Suggestions;
