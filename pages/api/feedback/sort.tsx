import {
  buildFeedbackPath,
  extractFeedback,
  filteredData,
  sortData,
} from "pages/helper/HelperFunctions";

export default async function sortFeedbackHandler(req, res) {
  if (req.method === "POST") {
    try {
      const filePath = buildFeedbackPath();
      const feedbackData = await extractFeedback(filePath);

      let data = [];
      data.push(feedbackData);

      let filterData = filteredData(data, "suggestion");
      sortData(filterData, req.body);

      res.status(200).json({ filterData });
    } catch (error) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
}
