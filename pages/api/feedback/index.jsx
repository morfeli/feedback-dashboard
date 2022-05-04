import path from "path";
import fs from "fs/promises";

import { filteredData } from "../../../helper/HelperFunctions";

export default async function feedbackHandler(req, res) {
  if (req.method === "GET") {
    try {
      let filePath = path.join(process.cwd(), "public", "data", "data.json");

      let jsonData = await fs.readFile(filePath);

      const feedbackData = JSON.parse(jsonData);

      let data = [];
      data.push(feedbackData);

      let filterData = filteredData(data, "suggestion");

      res.status(200).json({ filterData });
    } catch (error) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
}
