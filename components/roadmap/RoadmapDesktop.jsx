import RoadmapCards from "./RoadmapCards";

const RoadmapDesktop = ({
  plannedData,
  progressData,
  liveData,
  planned,
  live,
  inProgress,
  isMobile,
}) => {
  return (
    <section className="grid grid-cols-3 gap-2 pt-8 mx-2 gap-y-16 lg:mx-8 lg:gap-4">
      <div className="flex flex-col items-center">
        <div className="self-start">
          <h1 className="font-jost-bold">{planned}</h1>
          <p>Features currently being planned.</p>
        </div>

        {plannedData.map((item, i) => {
          let comments = item.comments;

          let borderColor = "border-t-first-orange";

          let color = "first-orange";

          return (
            <RoadmapCards
              key={item.feedbackID}
              animateKey={i}
              id={item.feedbackID}
              status={item.status}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              color={color}
              borderColor={borderColor}
              isMobile={isMobile}
              comments={comments ? comments : null}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <div className="self-start">
          <h1 className="font-jost-bold">{inProgress}</h1>
          <p>Features currently being developed.</p>
        </div>

        {progressData.map((item, i) => {
          let comments = item.comments;
          let borderColor = "border-t-button-pink";
          let color = "button-pink";

          return (
            <RoadmapCards
              key={i}
              animateKey={i}
              id={item.id}
              status={item.status}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              color={color}
              borderColor={borderColor}
              isMobile={isMobile}
              comments={comments ? comments : null}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <div className="self-start">
          <h1 className="font-jost-bold">{live}</h1>
          <p>Features that are now live!</p>
        </div>

        {liveData.map((item, i) => {
          let comments = item.comments;
          let color = "light-blue";
          let borderColor = "border-t-light-blue";

          return (
            <RoadmapCards
              key={i}
              animateKey={i}
              id={item.id}
              status={item.status}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              color={color}
              borderColor={borderColor}
              isMobile={isMobile}
              comments={comments ? comments : null}
            />
          );
        })}
      </div>
    </section>
  );
};

export default RoadmapDesktop;
