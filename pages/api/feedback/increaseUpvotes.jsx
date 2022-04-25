import {
  buildFeedbackPath,
  extractFeedback,
  increaseUpvotesByOne,
} from "../../helper/HelperFunctions";

import fs from "fs/promises";

export default async function increaseUpvotes(req, res) {
  if (req.method === "POST") {
    let itemID = req.body;

    let path = buildFeedbackPath();

    let data = await extractFeedback(path);

    let singleItem = data.productRequests.find((item) => item.id == itemID);

    let increment = increaseUpvotesByOne(singleItem);

    if (singleItem) {
      let item = singleItem;

      item.upvotes = increment;

      fs.writeFile(path, JSON.stringify(data, null, 2));
      res.status(201).send(increment);
    }
  }
}
