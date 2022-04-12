import { useState, useRef } from "react";

const isEmpty = (value) => value.trim() === "";

const AddCommentForm = ({ username, postComment, toggleReply }) => {
  const [formValidity, setFormValidity] = useState({
    comment: true,
  });

  const textAreaRef = useRef();

  const sendComment = (e) => {
    e.preventDefault();

    const enteredText = textAreaRef.current.value;

    const enteredTextIsValid = !isEmpty(enteredText);

    setFormValidity({
      comment: enteredTextIsValid,
    });

    const formIsValid = enteredTextIsValid;

    if (!formIsValid) {
      return;
    }

    postComment({ message: enteredText });
    toggleReply();
  };

  return (
    <form
      className="flex flex-col p-4 mx-4 bg-white rounded-2xl"
      onSubmit={sendComment}
    >
      <label className="font-jost-bold text-third-blue" htmlFor="comment">
        Add Comment
      </label>
      <textarea
        className="pb-8"
        id="comment"
        placeholder={`Reply to @${username}...`}
        type="text"
        ref={textAreaRef}
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
