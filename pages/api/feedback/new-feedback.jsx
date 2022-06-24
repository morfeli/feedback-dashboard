import { connectToDatabase } from "../../../helper/HelperFunctions";
const mongodb = require("mongodb");

const isEmpty = (value) => value.trim() === "";
const Int32 = mongodb.Int32;
const ObjectID = mongodb.ObjectId;

export default async function newFeedbackHandler(req, res) {
  if (req.method === "POST") {
    const enteredTitle = req.body.title;
    const enteredMessage = req.body.message;
    const enteredCategory = req.body.category;
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const objectId = req.body.objectId;

    const convertCategory = enteredCategory.toLowerCase();

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
        createdByUserRef: ObjectID.createFromHexString(objectId),
        postedBy: [
          {
            firstName: userFirstName,
            lastName: userLastName,
            userName: userName,
            email: userEmail,
          },
        ],
        feedbackID: Int32(1),
        title: enteredTitle,
        category: convertCategory,
        upvotes: Int32(0),
        status: "suggestion",
        description: enteredMessage,
        comments: [],
      });

    client.close();
    res
      .status(201)
      .json({ message: "Feedback has successfully been added! :)" });
  }
}
