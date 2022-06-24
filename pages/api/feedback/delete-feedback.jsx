import { connectToDatabase } from "../../../helper/HelperFunctions";

export default async function deleteFeedbackHandler(req, res) {
  if (req.method === "POST") {
    const id = req.body;

    const client = await connectToDatabase();

    await client.db().collection("posts").deleteOne({ feedbackID: id });

    client.close();
    res.status(201).json({ message: "Feedback successfully deleted." });
  }
}
