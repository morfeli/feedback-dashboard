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

    // if (existingFeedback) {
    //   let content = existingFeedback;

    //   content.title = updatedTitle;
    //   content.status = updatedStatus;
    //   content.description = updatedMessage;
    //   content.category = updatedCategory;
    //   console.log(content);
    //   fs.writeFile(filePath, JSON.stringify(content, null, 2));
    // }
  }
}
