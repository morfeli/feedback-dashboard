import { useEffect, useState } from "react";

import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";
// import PostedComment from "./PostedComment";
import UserComment from "./UserComment";

const SuggestionsComments = ({ item, length }) => {
  const [postedComment, setPostedComment] = useState([]);

  const postComment = (data) => {
    setPostedComment((current) => [...current, data]);
  };

  let content;
  if (item[0].comments) {
    content = item[0].comments;
  } else {
    content = null;
  }

  return (
    <>
      <section className="py-4 mx-4 my-8 bg-white rounded-md">
        <div className="flex p-8">
          <h1 className="font-jost-bold text-third-blue">{length} Comments</h1>
        </div>
        <>
          {content ? (
            content.map((item) => (
              <Comment
                key={item.id}
                replyArray={item.replies}
                item={item}
                image={item.user.image}
                name={item.user.name}
                username={item.user.username}
                content={item.content}
              />
            ))
          ) : (
            <div></div>
          )}
        </>

        <div>
          {postedComment
            ? postedComment.map((item, i) => (
                <UserComment
                  key={i}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  message={item.message}
                  username={item.username}
                />
              ))
            : null}
        </div>
      </section>
      <AddCommentForm postComment={postComment} />
    </>
  );
};

export default SuggestionsComments;
