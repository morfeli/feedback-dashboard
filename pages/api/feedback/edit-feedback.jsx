import fs from "fs/promises";

import {
  buildFeedbackPath,
  extractFeedback,
} from "../../helper/HelperFunctions";

export default async function editFeedbackHandler(req, res) {
  if (req.method === "PUT") {
    let reqData = req.body;

    let reqID = req.body.id;
    let updatedTitle = req.body.title;
    let updatedStatus = req.body.status;
    let updatedCategory = req.body.category;
    let updatedMessage = req.body.message;

    const filePath = buildFeedbackPath();

    const feedbackData = await extractFeedback(filePath);

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
