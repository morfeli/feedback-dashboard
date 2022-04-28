import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import GoBackBtn from "../dashboard-ui/UI/GoBackBtn";
import NewFeedbackSvg from "../dashboard-ui/UI/NewFeedbackSvg";

const NewFeedback = () => {
  const router = useRouter();
  const titleRef = useRef();
  const messageRef = useRef();
  const categoryRef = useRef();

  const onSubmitNewFeedback = async (e) => {
    e.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredMessage = messageRef.current.value;
    const enteredCategory = categoryRef.current.value;

    const feedbackData = {
      title: enteredTitle,
      message: enteredMessage,
      category: enteredCategory,
    };

    fetch("/api/feedback/new-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    router.replace("/suggestions");
  };

  return (
    <>
      <GoBackBtn />
      <section className="flex flex-col p-4 m-8 bg-white md:m-20">
        <div className="absolute top-60px md:top-100px">
          <NewFeedbackSvg />
        </div>
        <h1 className="pt-8 text-lg font-jost-bold text-third-blue md:text-2xl">
          Create New Feedback
        </h1>

        <form className="flex flex-col" onSubmit={onSubmitNewFeedback}>
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
            className="self-center w-2/3 pl-4 bg-light-gray h-11 md:w-3/4"
            ref={titleRef}
          />

          <label htmlFor="category" className="py-8 md:pl-4">
            <h2 className="pb-2 font-jost-bold text-third-blue">Category</h2>
            Choose a category for your feedback
          </label>
          <select
            name="category"
            id="category"
            className="self-center w-2/3 px-2 bg-light-gray h-11 md:w-3/4"
            ref={categoryRef}
          >
            <option value="feature">Feature</option>
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
          </select>

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
            className="self-center w-2/3 px-2 py-2 mb-4 bg-light-gray md:w-3/4"
            ref={messageRef}
          ></textarea>

          <div className="flex flex-col md:flex-row-reverse md:pr-20">
            <button
              type="submit"
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
    </>
  );
};

export default NewFeedback;
