import { useState } from "react";

import FeedbackCard from "../suggestions-page/FeedbackCard";

const RoadmapDesktop = ({
  session,
  plannedData,
  progressData,
  liveData,
  planned,
  live,
  inProgress,
  isMobile,
}) => {
  console.log(liveData);
  const [roadmapState, _roadmapState] = useState(true);
  return (
    <section className="grid grid-cols-3 gap-2 pt-8 mx-2 overflow-hidden gap-y-16 lg:mx-8 lg:gap-4">
      <div className="flex flex-col items-center">
        <div className="self-start">
          <h1 className="font-jost-bold">{planned}</h1>
          <p>Features currently being planned.</p>
        </div>

        {plannedData.map((item, i) => {
          const comments = item.comments;
          const usersWhomUpvoted = item.upVotedUsers;
          const postedUser = item.postedBy;

          const borderColor = "border-t-first-orange";
          const color = "first-orange";

          return (
            <FeedbackCard
              session={session}
              key={item.feedbackID}
              animateKey={i}
              id={item.feedbackID}
              status={item.status}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              user={postedUser}
              userUpvoted={usersWhomUpvoted}
              color={color}
              borderColor={borderColor}
              isMobile={isMobile}
              isRoadmap={roadmapState}
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
          const comments = item.comments;
          const usersWhomUpvoted = item.upVotedUsers;
          const postedUser = item.postedBy;
          const borderColor = "border-t-button-pink";
          const color = "button-pink";

          return (
            <FeedbackCard
              session={session}
              key={i}
              animateKey={i}
              id={item.feedbackID}
              status={item.status}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              user={postedUser}
              userUpvoted={usersWhomUpvoted}
              color={color}
              borderColor={borderColor}
              isMobile={isMobile}
              isRoadmap={roadmapState}
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
          const comments = item.comments;
          const usersWhomUpvoted = item.upVotedUsers;
          const postedUser = item.postedBy;
          const color = "light-blue";
          const borderColor = "border-t-light-blue";

          return (
            <FeedbackCard
              session={session}
              key={i}
              animateKey={i}
              id={item.feedbackID}
              status={item.status}
              title={item.title}
              description={item.description}
              category={item.category}
              upvotes={item.upvotes}
              user={postedUser}
              userUpvoted={usersWhomUpvoted}
              color={color}
              borderColor={borderColor}
              isMobile={isMobile}
              isRoadmap={roadmapState}
              comments={comments ? comments : null}
            />
          );
        })}
      </div>
    </section>
  );
};

export default RoadmapDesktop;
