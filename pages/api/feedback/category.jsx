import {
  buildFeedbackPath,
  extractFeedback,
  filteredData,
  sortData,
  filterCategory,
} from "pages/helper/HelperFunctions";

export default async function sortFeedbackHandler(req, res) {
  const filePath = buildFeedbackPath();
  const feedbackData = await extractFeedback(filePath);

  let data = [];
  data.push(feedbackData);
  if (req.method === "PATCH") {
    try {
      let filter = filteredData(data, "suggestion");

      let filterData = filterCategory(filter, req.body);

      res.status(200).json({ filterData });
    } catch (error) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
}
