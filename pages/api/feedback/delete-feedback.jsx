import {
  buildFeedbackPath,
  extractFeedback,
} from "../../helper/HelperFunctions";

import fs from "fs/promises";

export default async function deleteFeedbackHandler(req, res) {
  if (req.method === "PUT") {
    let id = req.body;

    const path = buildFeedbackPath();
    let data = await extractFeedback(path);

    let filter = data.productRequests.filter((item) => item.id != id);

    data.productRequests = filter;

    // fs.writeFile(path, JSON.stringify(data, null, 2));
    res.send(data);
    res.status(201).json({ message: "Feedback has successfuly been deleted" });
  }
}
