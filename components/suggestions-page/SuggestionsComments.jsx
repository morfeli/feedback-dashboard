import { useState } from "react";

import AddCommentForm from "./AddCommentForm";
import FeedbackComments from "./FeedbackComments";
import UserComment from "./UserComment";

const SuggestionsComments = ({ item, length }) => {
  const [postedComment, setPostedComment] = useState([]);

  const postComment = (data) => {
    setPostedComment((current) => [...current, data]);
  };

  let isThereAnyComments;
  if (item[0].comments) {
    isThereAnyComments = item[0].comments;
  } else {
    isThereAnyComments = null;
  }

  return (
    <>
      <section className="py-4 mx-4 my-8 bg-white rounded-md">
        <div className="flex p-8">
          <h1 className="font-jost-bold text-third-blue">{length} Comments</h1>
        </div>

        {isThereAnyComments &&
          isThereAnyComments.map((item) => (
            <FeedbackComments
              key={item.feedbackID}
              content={item.content}
              name={item.user.name}
              replyArray={item.replies}
              username={item.user.userName}
            />
          ))}

        {postedComment &&
          postedComment.map((item, i) => (
            <UserComment
              key={i}
              firstName={item.firstName}
              lastName={item.lastName}
              message={item.message}
              username={item.username}
            />
          ))}
      </section>
      <AddCommentForm postComment={postComment} />
    </>
  );
};

export default SuggestionsComments;
