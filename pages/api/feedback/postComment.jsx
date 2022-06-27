import { connectToDatabase } from "../../../helper/HelperFunctions";
const mongodb = require("mongodb");
const Int32 = mongodb.Int32;

export default async function postCommentHandler(req, res) {
  if (req.method === "POST") {
    const selectedID = req.body.feedbackToFilterBy;
    const userComment = req.body.message;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;

    let replyingTo;
    let commentID;
    if (req.body.replyingTo && req.body.commentToFilterBy) {
      replyingTo = req.body.replyingTo;
      commentID = req.body.commentToFilterBy;
    }

    let postComment = {
      id: Int32(1),
      content: userComment,
      user: {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
      },
    };

    if (replyingTo && commentID) {
      postComment = {
        content: userComment,
        replyingTo: replyingTo,
        user: {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
        },
      };
    }

    const client = await connectToDatabase();

    if (commentID) {
      const singleFeedback = await client
        .db()
        .collection("posts")
        .updateOne(
          {
            $and: [{ feedbackID: selectedID }, { "comments.id": commentID }],
          },
          { $push: { "comments.replies": postComment } }
        );
      console.log(singleFeedback);
      client.close();
    } else {
      await client
        .db()
        .collection("posts")
        .updateOne(
          { feedbackID: selectedID },
          { $inc: { "comments.$[].id": 1 } }
        );

      const singleFeedback = await client
        .db()
        .collection("posts")
        .updateOne(
          { feedbackID: selectedID },
          { $push: { comments: postComment } }
        );

      client.close();
    }

    client.close();
    res.status(201);
  }
}
