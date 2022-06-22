import { useState, useRef } from "react";
import { useRouter } from "next/router";

// components
import GoBackBtn from "../dashboard-ui/UI/GoBackBtn";
import EditFeedbackSVG from "../dashboard-ui/UI/EditFeedbackSvg";
import classNames from "classnames";
import SortingButton from "../dashboard-ui/UI/SortingButton";

// quick validation
const isEmpty = (value) => value.trim() === "";

const categoryValues = [
  { id: 0, value: "Feature" },
  { id: 1, value: "UI" },
  { id: 2, value: "UX" },
  { id: 3, value: "Enhancement" },
  { id: 4, value: "Bug" },
];

const statusValues = [
  { id: 0, value: "Planned" },
  { id: 1, value: "Live" },
  { id: 2, value: "In-Progress" },
  { id: 3, value: "Suggestion" },
];

const EditFeedback = ({ item }) => {
  const [formValidation, setFormValidation] = useState(true);
  const [categoryValue, setCategoryValue] = useState("Feature");
  const [status, setStatus] = useState("Planned");

  const captureCategoryValue = (value) => {
    setCategoryValue(value);
  };

  const statusHandler = (value) => {
    setStatus(value);
  };

  const title = item[0].title;
  const description = item[0].description;
  const id = item[0].feedbackID;

  const router = useRouter();

  const messageRef = useRef();

  const onSubmitEditFeedback = async (e) => {
    e.preventDefault();

    const enteredMessage = messageRef.current.value;

    let enteredMessageIsValid = !isEmpty(enteredMessage);

    let formIsValid = enteredMessageIsValid;

    if (!formIsValid) {
      setFormValidation(false);
      return;
    }

    const editFeedbackData = {
      id: id,
      message: enteredMessage,
      category: categoryValue,
      status: status,
    };

    fetch("/api/feedback/edit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editFeedbackData),
    });

    messageRef.current.value = "";

    router.replace("/suggestions");
  };

  const goBack = () => {
    router.back();
  };

  return (
    <main className="pb-8 xl:mx-64">
      <GoBackBtn />
      <section className="flex flex-col p-4 m-8 bg-white rounded-md md:m-20">
        <div className="absolute top-60px md:top-115px">
          <EditFeedbackSVG />
        </div>
        <h1 className="pt-8 text-lg font-jost-bold text-third-blue md:text-2xl">
          Editing: {title}
        </h1>

        <form className="flex flex-col" onSubmit={onSubmitEditFeedback}>
          <label htmlFor="category" className="py-8 md:pl-4">
            <h2 className="pb-2 font-jost-bold text-third-blue">Category</h2>
            Choose a category for your feedback
          </label>
          <SortingButton
            categoryValues={categoryValues}
            captureCategoryValue={captureCategoryValue}
          />

          <label htmlFor="category" className="py-8 md:pl-4">
            <h2 className="pb-2 font-jost-bold text-third-blue">
              Update Status
            </h2>
            Change feature state
          </label>
          <SortingButton
            statusValues={statusValues}
            captureStatusValue={statusHandler}
          />

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
