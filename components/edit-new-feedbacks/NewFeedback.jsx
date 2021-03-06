import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import classNames from "classnames";

import GoBackBtn from "../dashboard-ui/UI/GoBackBtn";
import NewFeedbackSvg from "../dashboard-ui/UI/NewFeedbackSvg";
import SortingButton from "../dashboard-ui/UI/SortingButton";
import Modal from "../dashboard-ui/UI/Modal";

const isEmpty = (value) => value.trim() === "";

const categoryValues = [
  { id: 0, value: "Feature" },
  { id: 1, value: "UI" },
  { id: 2, value: "UX" },
  { id: 3, value: "Enhancement" },
  { id: 4, value: "Bug" },
];

const NewFeedback = () => {
  const [titleValid, setTitleIsValid] = useState(true);
  const [messageValid, setMessageIsValid] = useState(true);
  const [categoryValue, setCategoryValue] = useState("Feature");
  const [userData, setUserData] = useState(null);
  const [APIMessage, setAPIMessage] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();
  const titleRef = useRef();
  const messageRef = useRef();

  const routeToHomePage = () => {
    router.replace("/suggestions");
  };
  useEffect(() => {
    if (status === "authenticated") {
      setUserData([session.user.name]);
    }
  }, [status, session]);

  useEffect(() => {
    APIMessage && setRenderModal((current) => !current);
  }, [APIMessage]);

  useEffect(() => {
    renderModal &&
      setTimeout(() => {
        routeToHomePage();
      }, 6000);
  }, [renderModal, routeToHomePage]);

  const captureCategoryValue = (value) => {
    setCategoryValue(value);
  };

  const onSubmitNewFeedback = async (e) => {
    if (e.target.name !== "test") {
      e.stopPropagation();
    }
    e.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredMessage = messageRef.current.value;

    let enteredTitleIsValid = !isEmpty(enteredTitle);
    let enteredMessageIsValid = !isEmpty(enteredMessage);

    let formIsValid = enteredMessageIsValid && enteredTitleIsValid;

    if (!formIsValid) {
      setMessageIsValid(false);
      setTitleIsValid(false);
      return;
    }

    const feedbackData = {
      title: enteredTitle,
      message: enteredMessage,
      category: categoryValue,
      firstName: userData[0].firstName,
      lastName: userData[0].lastName,
      userName: userData[0].userName,
      userEmail: userData[0].email,
      objectId: userData[0].objectId,
    };

    fetch("/api/feedback/new-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => setAPIMessage(data.message))
      .catch((err) => console.log(err));
  };

  return (
    <main className="z-50 pb-8 xl:mx-64">
      <GoBackBtn />
      <section className="flex flex-col p-4 m-8 bg-white rounded-md md:m-20">
        <div className="absolute top-60px md:top-100px">
          <NewFeedbackSvg />
        </div>
        <h1 className="pt-8 text-lg font-jost-bold text-third-blue md:text-2xl">
          Create New Feedback
        </h1>

        <form
          className="flex flex-col"
          onSubmit={onSubmitNewFeedback}
          name="test"
        >
          <label htmlFor="title" className="py-8 md:pl-4">
            <h2 className="pb-2 font-jost-bold text-third-blue">
              Feedback Title
            </h2>
            Add a short, descriptive headline
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={() => setTitleIsValid(true)}
            className={classNames(
              "self-center",
              "w-2/3",
              "pl-4",
              "bg-light-gray",
              "h-11",
              "md:pl-4",
              "outline-none",
              {
                "border-red-700": !titleValid,
                "border-2": !titleValid,
              }
            )}
            ref={titleRef}
          />

          <label htmlFor="category" className="py-8 md:pl-4">
            <h2 className="pb-2 font-jost-bold text-third-blue">Category</h2>
            Choose a category for your feedback
          </label>

          <SortingButton
            categoryValues={categoryValues}
            captureCategoryValue={captureCategoryValue}
          />

          <label htmlFor="message" className="py-8 md:pl-4">
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
            onChange={() => setMessageIsValid(true)}
            className={classNames(
              "self-center",
              "w-2/3",
              "p-4",
              "bg-light-gray",
              "h-11",
              "md:pl-4",
              "outline-none",
              {
                "border-red-700": !messageValid,
                "border-2": !messageValid,
              }
            )}
            ref={messageRef}
          ></textarea>

          <div className="flex flex-col mt-4 md:flex-row-reverse md:pr-20">
            <button
              type="submit"
              name="submitButton"
              className="self-center px-4 py-1 my-2 text-white rounded-lg bg-button-pink"
            >
              Add Feedback
            </button>
            <button className="self-center px-4 py-1 my-2 text-white rounded-lg bg-first-blue md:mr-4">
              Cancel
            </button>
          </div>
        </form>
      </section>
      <Modal active={renderModal} status={APIMessage} color="bg-first-blue" />
    </main>
  );
};

export default NewFeedback;
