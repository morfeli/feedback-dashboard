const AddCommentForm = ({ username }) => {
  return (
    <form className="flex flex-col p-4 mx-4 bg-white rounded-2xl">
      <label className="font-jost-bold text-third-blue" htmlFor="comment">
        Add Comment
      </label>
      <textarea
        className="pb-8"
        id="comment"
        placeholder={`Reply to @${username}...`}
        type="text"
      />
      <button
        className="self-end p-2 mt-4 text-white rounded-lg bg-button-pink"
        type="submit"
      >
        Post Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
