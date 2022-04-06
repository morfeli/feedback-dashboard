import { useState } from "react";

const SuggestionsComments = ({ item }) => {
  const comments = item.map((item) => item.comments);

  const content = comments[0].map((item) => <li>{item.content}</li>);
  console.log(content);
  const totalLength = item.map((item, i) => {
    let comments = item.comments;
    let repliesArr = comments ? comments.map((item) => item.replies) : null;

    let totalCommentsLength;
    if (comments && repliesArr) {
      totalCommentsLength = comments.length + repliesArr.length;
    }

    return totalCommentsLength;
  });

  return (
    <section>
      <div className="flex p-8">
        <span>{totalLength}</span>
        <h1 className="pl-2">Comments</h1>
      </div>
      <ul>
        {comments ? comments[0].map((item) => <li>{item.content}</li>) : null}
      </ul>
    </section>
  );
};

export default SuggestionsComments;
