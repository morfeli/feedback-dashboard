import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

const isEmpty = (value) => value.trim() === "";

const AddCommentForm = ({ username, postComment, toggleReply }) => {
  const [formValidity, setFormValidity] = useState({
    comment: true,
  });

  const [userData, setUserData] = useState();
  const { data: session, status } = useSession();

  const textAreaRef = useRef();

  useEffect(() => {
    if (status === "authenticated") {
      setUserData([session.user.email]);
    }
  }, [status, session]);

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

    let postedComment = {
      message: enteredText,
      firstName: userData[0].firstName,
      lastName: userData[0].lastName,
      username: userData[0].userName,
      replyingTo: username ? username : null,
    };

    postComment(postedComment);
    toggleReply ? toggleReply() : null;

    textAreaRef.current.value = "";
  };

  return (
    <form
      className="flex flex-col p-4 mx-4 mb-12 bg-white rounded-2xl"
      onSubmit={sendComment}
    >
      <label className="font-jost-bold text-third-blue" htmlFor="comment">
        Add Comment
      </label>
      <textarea
        className="p-2"
        id="comment"
        placeholder={
          username ? `Reply to @${username}` : "Type your comment here"
        }
        type="text"
        ref={textAreaRef}
        maxLength="250"
      />
      <div className="flex items-center justify-between">
        <button
          className="self-end px-4 py-2 mt-4 text-white rounded-lg bg-button-pink"
          type="submit"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
