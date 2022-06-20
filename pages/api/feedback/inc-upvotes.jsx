import { connectToDatabase } from "../../../helper/HelperFunctions";

export default async function increaseUpvotes(req, res) {
  if (req.method === "POST") {
    let itemID = req.body;

    const client = await connectToDatabase();

    let singleFeedback = await client
      .db()
      .collection("posts")
      .updateOne({ feedbackID: itemID }, { $inc: { upvotes: 1 } });

    res.status(201);
  }
}
