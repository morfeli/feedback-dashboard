import Comment from "./Comment";

const SuggestionsComments = ({ item }) => {
  const comments = item.map((item) => item.comments);

  let commentsLength = comments[0].length;

  let replies = comments[0].filter((comment) => comment.replies);

  let repliesLength = replies[0].replies.length;

  let totalCommentsLength = commentsLength + repliesLength;

  return (
    <section className="mx-4 mt-8 bg-white rounded-md">
      <div className="flex p-8">
        <h1 className="font-jost-bold text-third-blue">
          {totalCommentsLength} Comments
        </h1>
      </div>
      <aside>
        {comments
          ? comments[0].map((item) => (
              <Comment
                key={item.id}
                replyArray={item.replies}
                item={item}
                // image={item.user.image}
                name={item.user.name}
                username={item.user.username}
                content={item.content}
              />
            ))
          : null}
      </aside>
    </section>
  );
};

export default SuggestionsComments;
