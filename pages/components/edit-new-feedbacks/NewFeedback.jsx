import { useState, useRef, useEffect } from "react";

import GoBackBtn from "../dashboard-ui/UI/GoBackBtn";
import NewFeedbackSvg from "../dashboard-ui/UI/NewFeedbackSvg";

const NewFeedback = () => {
  const titleRef = useRef();
  const messageRef = useRef();
  const categoryRef = useRef();

  const sendFeedback = async (value) => {
    try {
      const response = await fetch("/api/feedback/new-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error("Error, try again!");
      }

      const data = await response.json();
    } catch (error) {
      console.log(error.message || "There was an error!");
    }
  };

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

    await sendFeedback(feedbackData);
  };

  return (
    <>
      <GoBackBtn />
      <section
        className="flex flex-col bg-white p-4 m-8"
        onSubmit={onSubmitNewFeedback}
      >
        <div className="absolute top-60px">
          <NewFeedbackSvg />
        </div>
        <h1 className="pt-8 font-jost-bold text-third-blue text-lg">
          Create New Feedback
        </h1>

        <form className="flex flex-col">
          <label htmlFor="title" className="py-8">
            <h2 className="pb-2 font-jost-bold text-third-blue">
              Feedback Title
            </h2>
            Add a short, descriptive headline
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="self-center bg-light-gray px-8 w-64 h-11	"
            ref={titleRef}
          />

          <label htmlFor="category" className="py-8">
            <h2 className="pb-2 font-jost-bold text-third-blue">Category</h2>
            Choose a category for your feedback
          </label>
          <select
            name="category"
            id="category"
            className="self-center bg-light-gray px-2 w-64 h-11"
            ref={categoryRef}
          >
            <option value="feature">Feature</option>
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
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
            className="self-center bg-light-gray w-64 mb-4 px-2 py-2"
            ref={messageRef}
          ></textarea>

          <button
            type="submit"
            className="bg-button-pink text-white rounded-lg py-1 my-2"
          >
            Add Feedback
          </button>
          <button className="bg-first-blue rounded-lg py-1 my-2 text-white">
            Cancel
          </button>
        </form>
      </section>
    </>
  );
};

export default NewFeedback;
