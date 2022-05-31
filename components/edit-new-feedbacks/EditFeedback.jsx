import { useState, useRef } from "react";
import { useRouter } from "next/router";

// components
import GoBackBtn from "../dashboard-ui/UI/GoBackBtn";
import EditFeedbackSVG from "../dashboard-ui/UI/EditFeedbackSvg";
import classNames from "classnames";

// quick validation
const isEmpty = (value) => value.trim() === "";

const EditFeedback = ({ item }) => {
  const [formValidation, setFormValidation] = useState(true);

  let title = item[0].title;
  let id = item[0].id;
  let enteredID = item[0].id;
  let description = item[0].description;

  const router = useRouter();

  const messageRef = useRef();
  const categoryRef = useRef();
  const statusRef = useRef();

  const onSubmitEditFeedback = async (e) => {
    e.preventDefault();

    const enteredMessage = messageRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const enteredStatus = statusRef.current.value;

    let enteredMessageIsValid = !isEmpty(enteredMessage);

    let formIsValid = enteredMessageIsValid;

    if (!formIsValid) {
      setFormValidation(false);
      return;
    }

    const editFeedbackData = {
      id: enteredID,
      message: enteredMessage,
      category: enteredCategory,
      status: enteredStatus,
    };

    fetch("/api/feedback/edit-feedback", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editFeedbackData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    messageRef.current.value = "";

    router.replace("/suggestions");
  };

  const goBack = () => {
    router.back();
  };

  // const onDeleteFeedbackHandler = () => {
  //   const removeItem = deleteRef.current.value;

  //   fetch("/api/feedback/delete-feedback", {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(removeItem),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));

  //   router.replace("/suggestions");
  // };

  return (
    <main className="pb-8 xl:mx-64">
      <GoBackBtn />
      <section className="flex flex-col p-4 m-8 bg-white rounded-md md:m-20">
        <div className="absolute top-60px md:top-115px">
          <EditFeedbackSVG />
        </div>
        <h1 className="pt-8 text-lg font-jost-bold text-third-blue md:text-2xl">
          Editing {title}
        </h1>

        <form className="flex flex-col" onSubmit={onSubmitEditFeedback}>
          <label htmlFor="category" className="py-8 md:pl-4">
            <h2 className="pb-2 font-jost-bold text-third-blue">Category</h2>
            Choose a category for your feedback
          </label>
          <select
            name="category"
            id="category"
            className="self-center w-2/3 pl-4 border-r-8 border-transparent bg-light-gray h-11 md:w-3/4"
            ref={categoryRef}
          >
            <option value="feature">Feature</option>
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
          </select>

          <label htmlFor="category" className="py-8 md:pl-4">
            <h2 className="pb-2 font-jost-bold text-third-blue">
              Update Status
            </h2>
            Change feature state
          </label>
          <select
            name="category"
            id="category"
            className="self-center w-2/3 pl-4 border-r-8 border-transparent bg-light-gray h-11 md:w-3/4"
            ref={statusRef}
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In-progress</option>
            <option value="live">Live</option>
            <option value="suggestion">Suggestion</option>
          </select>

          <label htmlFor="message" className="py-8">
            <h2 className="pb-2 font-jost-bold text-third-blue">
              Feedback Detail
            </h2>
            Include any specific comments on what should be improved, added,
            etc.
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            cols="33"
            ref={messageRef}
            placeholder={description}
            onChange={() => setFormValidation(true)}
            className={classNames(
              "self-center",
              "w-2/3",
              "px-2",
              "py-2",
              "mb-4",
              "bg-light-gray",
              "md:w-3/4",
              "outline-none",

              {
                "border-red-700": !formValidation,
                "border-2": !formValidation,
              }
            )}
          ></textarea>

          <div className="flex flex-col md:flex-row-reverse md:pr-20">
            <button
              type="submit"
              className="self-center px-4 py-1 my-2 text-white rounded-lg bg-button-pink"
            >
              Save Changes
            </button>
            <button
              onClick={goBack}
              className="self-center px-4 py-1 my-2 mr-4 text-white rounded-lg bg-first-blue"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* <button
          onClick={onDeleteFeedbackHandler}
          ref={deleteRef}
          value={id}
          className="py-1 my-2 text-white bg-red-600 rounded-lg"
        >
          Delete
        </button> */}
      </section>
    </main>
  );
};

export default EditFeedback;
