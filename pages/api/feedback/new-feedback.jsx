import fs from "fs/promises";
import path from "path";

import {
  buildFeedbackPath,
  extractFeedback,
} from "../../helper/HelperFunctions";

const isEmpty = (value) => value.trim() === "";

export default async function newFeedbackHandler(req, res) {
  if (req.method === "POST") {
    const enteredTitle = req.body.title;
    const enteredMessage = req.body.message;
    const enteredCategory = req.body.category;

    let titleIsValid = !isEmpty(enteredTitle);
    let messageIsValid = !isEmpty(enteredMessage);

    if (!titleIsValid && !messageIsValid) {
      return;
    }

    const newFeedback = {
      id: 1,
      title: enteredTitle,
      category: enteredCategory,
      upvotes: 0,
      status: "suggestion",
      description: enteredMessage,
      comments: [],
    };

    const filePath = buildFeedbackPath();

    const data = await extractFeedback(filePath);

    data.productRequests.forEach((item) => item.id++);
    data.productRequests.push(newFeedback);

    fs.writeFile(filePath, JSON.stringify(data));
  }
}
