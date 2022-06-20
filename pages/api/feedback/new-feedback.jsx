import { connectToDatabase } from "../../../helper/HelperFunctions";
const mongodb = require("mongodb");

const isEmpty = (value) => value.trim() === "";
const Int32 = mongodb.Int32;

export default async function newFeedbackHandler(req, res) {
  if (req.method === "POST") {
    const enteredTitle = req.body.title;
    const enteredMessage = req.body.message;
    const enteredCategory = req.body.category;
    // const userFirstName = req.body.firstName;
    // const userLastName = req.body.lastName;
    // const userName = req.body.userName;

    // Solve how to insert objectid ref the user post

    let titleIsValid = !isEmpty(enteredTitle);
    let messageIsValid = !isEmpty(enteredMessage);

    if (!titleIsValid && !messageIsValid) {
      return;
    }

    const client = await connectToDatabase();

    await client
      .db()
      .collection("posts")
      .updateMany({}, { $inc: { feedbackID: 1 } });

    await client
      .db()
      .collection("posts")
      .insertOne({
        feedbackID: Int32(1),
        title: enteredTitle,
        category: enteredCategory,
        upvotes: Int32(0),
        status: "suggestion",
        description: enteredMessage,
        comments: [],
      });

    res.status(201);
  }
}
