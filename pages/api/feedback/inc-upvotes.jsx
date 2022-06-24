import { connectToDatabase } from "../../../helper/HelperFunctions";

export default async function increaseUpvotes(req, res) {
  if (req.method === "POST") {
    const itemID = req.body.id;
    const userEmail = req.body.email;

    const client = await connectToDatabase();

    const userAlreadyUpvoted = await client
      .db()
      .collection("posts")
      .findOne({ feedbackID: itemID, upVotedUsers: { $in: [userEmail] } });

    if (userAlreadyUpvoted) {
      res
        .status(201)
        .json({ message: "You can only upvote a feedback once! :)" });

      client.close();
      return;
    } else {
      let singleFeedback = await client
        .db()
        .collection("posts")
        .updateOne(
          { feedbackID: itemID },
          { $inc: { upvotes: 1 }, $addToSet: { upVotedUsers: userEmail } }
        );

      client.close();
      res.status(201).json({ message: "Upvoted successfully!" });
    }
  }
}
