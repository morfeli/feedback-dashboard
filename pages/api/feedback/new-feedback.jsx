import path from "path";
import fs from "fs/promises";

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

    let filePath = path.join(process.cwd(), "json", "data.json");

    let jsonData = await fs.readFile(filePath);

    const data = JSON.parse(jsonData);

    data.productRequests.forEach((item) => item.id++);
    data.productRequests.push(newFeedback);

    fs.writeFile(filePath, JSON.stringify(data, null, 2));

    res.status(201).send({ data });
  }
}
