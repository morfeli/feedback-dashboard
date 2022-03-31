import {
  buildFeedbackPath,
  extractFeedback,
  filteredData,
  sortData,
} from "pages/helper/HelperFunctions";

export default async function feedbackHandler(req, res) {
  if (req.method === "GET") {
    try {
      const filePath = buildFeedbackPath();
      const feedbackData = await extractFeedback(filePath);

      let data = [];
      data.push(feedbackData);

      let filterData = filteredData(data, "suggestion");
      sortData(filterData, "Most_Upvotes");

      res.status(200).json({ filterData });
    } catch (error) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
}
