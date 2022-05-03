import NoSuggestions from "./NoSuggestions";
import FeedbackCard from "./FeedbackCard";

const Suggestions = ({ data, filter, isMobile, innerWidth }) => (
  <ul className="mt-8 space-y-4">
    <Feedback
      data={data}
      filter={filter}
      isMobile={isMobile}
      innerWidth={innerWidth}
    />
  </ul>
);

const Feedback = ({ data, filter, isMobile, innerWidth }) => {
  if (filter) {
    return filter.length ? (
      filter.map((item) => {
        let comments = item.comments;

        return (
          <FeedbackCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            upvotes={item.upvotes}
            comments={comments}
            isMobile={isMobile}
            innerWidth={innerWidth}
          />
        );
      })
    ) : (
      <NoSuggestions />
    );
  } else {
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
  }
};

export default Suggestions;
