import Comment from "./Comment";

const SuggestionsComments = ({ item, length }) => {
  const comments = item.map((item) => item.comments);

  return (
    <section className="mx-4 mt-8 bg-white rounded-md">
      <div className="flex p-8">
        <h1 className="font-jost-bold text-third-blue">{length} Comments</h1>
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
