import { increaseUpvotesByOne } from "../../helper/HelperFunctions";

import path from "path";
import fs from "fs/promises";

export default async function increaseUpvotes(req, res) {
  if (req.method === "POST") {
    let itemID = req.body;

    let filePath = path.join(process.cwd(), "public", "data", "data.json");

    let jsonData = await fs.readFile(filePath);

    const data = JSON.parse(jsonData);

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
