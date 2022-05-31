import path from "path";
import fs from "fs/promises";

export default async function editFeedbackHandler(req, res) {
  if (req.method === "PUT") {
    let reqID = req.body.id;
    let updatedStatus = req.body.status;
    let updatedCategory = req.body.category;
    let updatedMessage = req.body.message;

    let filePath = path.join(process.cwd(), "json", "data.json");

    let jsonData = await fs.readFile(filePath);

    const feedbackData = JSON.parse(jsonData);

    const existingFeedback = feedbackData.productRequests.find(
      (item) => item.id == reqID
    );

    if (existingFeedback) {
      let content = existingFeedback;

      content.status = updatedStatus;
      content.description = updatedMessage;
      content.category = updatedCategory;

      fs.writeFile(filePath, JSON.stringify(feedbackData, null, 2));
      res
        .status(201)
        .json({ message: "Feedback was successfuly edited and saved." });
    }
  }
}
