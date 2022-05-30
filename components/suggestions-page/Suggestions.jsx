import NoSuggestions from "./NoSuggestions";
import FeedbackCard from "./FeedbackCard";

function renderFeeback(items, sortOption) {
  return items.sort((a, b) => {
    if (sortOption == "Most Upvotes") {
      return b.upvotes - a.upvotes;
    } else if (sortOption == "Least Upvotes") {
      return a.upvotes - b.upvotes;
    } else if (sortOption == "Most Comments") {
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
    } else if (sortOption == "Least Comments") {
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
    }
  });
}

const Suggestions = ({ data, sort, isMobile, innerWidth }) => {
  return (
    <ul className="mt-8 space-y-4">
      <Feedback
        data={data.suggestions}
        sort={sort}
        isMobile={isMobile}
        innerWidth={innerWidth}
      />
    </ul>
  );
};

const Feedback = ({ data, sort, isMobile, innerWidth }) => {
  if (data) {
    return renderFeeback(data, sort).map((item) => {
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
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Suggestions;

{
  /* <NoSuggestions /> */
}
