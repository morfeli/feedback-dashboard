import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

const isEmpty = (value) => value.trim() === "";

const AddCommentForm = ({
  username,
  postComment,
  postReplies,
  toggleReply,
}) => {
  const [formValidity, setFormValidity] = useState({
    comment: true,
  });

  const [userData, setUserData] = useState();
  const [maxLength, setMaxLength] = useState(250);
  const [charsLeft, setCharsLeft] = useState(250);
  const { data: session, status } = useSession();

  const textAreaRef = useRef();

  useEffect(() => {
    if (status === "authenticated") {
      setUserData([session.user.name]);
    }
  }, [status, session]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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

    postComment ? postComment(postedComment) : null;
    postReplies ? postReplies(postedComment) : null;
    toggleReply ? toggleReply() : null;

    setCharsLeft(250);
    textAreaRef.current.value = "";
  };

  const decrementMaxLength = (e) => {
    let charCount = e.target.value.length;
    const charLength = maxLength - charCount;
    setCharsLeft(charLength);
  };

  return (
    <form
      className="flex flex-col p-4 mx-4 mb-12 bg-white rounded-2xl"
      onSubmit={sendComment}
    >
      <label className="pb-4 font-jost-bold text-third-blue" htmlFor="comment">
        Add Comment
      </label>
      <textarea
        className="p-4 bg-light-gray cursor-pointer"
        id="comment"
        placeholder={
          username ? `Reply to @${username}` : "Type your comment here"
        }
        type="text"
        ref={textAreaRef}
        onChange={decrementMaxLength}
        maxLength={250}
      />
      <div className="flex items-center justify-between">
        <p>{charsLeft} Characters left</p>
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
