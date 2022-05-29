import NoSuggestions from "./NoSuggestions";
import FeedbackCard from "./FeedbackCard";

const Suggestions = ({ data, isMobile, innerWidth }) => {
  return (
    <ul className="mt-8 space-y-4">
      <Feedback
        data={data.suggestions}
        isMobile={isMobile}
        innerWidth={innerWidth}
      />
    </ul>
  );
};

const Feedback = ({ data, isMobile, innerWidth }) => {
  if (data) {
    return data.map((item) => {
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
