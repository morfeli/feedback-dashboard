import { connectToDatabase } from "../../../helper/HelperFunctions";
export default async function editFeedbackHandler(req, res) {
  if (req.method === "POST") {
    const id = req.body.id;
    const updatedStatus = req.body.status;
    const updatedCategory = req.body.category;
    const updatedDescription = req.body.message;
    const convertStatus = updatedStatus.toLowerCase();
    const convertCategory = updatedCategory.toLowerCase();

    const client = await connectToDatabase();

    await client
      .db()
      .collection("posts")
      .updateOne(
        { feedbackID: id },
        {
          $set: {
            status: convertStatus,
            category: convertCategory,
            description: updatedDescription,
          },
        }
      );

    client.close();
    res.status(201).json({ message: "Feedback successfully updated." });
  }
}
