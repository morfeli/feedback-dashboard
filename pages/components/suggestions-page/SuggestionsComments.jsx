import Comment from "./Comment";

const SuggestionsComments = ({ item }) => {
  const comments = item.map((item) => item.comments);

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
    <section className="mx-4 mt-8 bg-white rounded-md">
      <div className="flex p-8">
        <h1 className="font-jost-bold text-third-blue">
          {totalLength} Comments
        </h1>
      </div>
      <aside>
        {comments
          ? comments[0].map((item) => (
              <Comment
                key={item.id}
                image={item.user.image}
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
