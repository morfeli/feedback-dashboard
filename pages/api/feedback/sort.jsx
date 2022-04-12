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
  if (req.method === "POST") {
    try {
      let filterData = filteredData(data, "suggestion");
      sortData(filterData, req.body);

      res.status(200).json({ filterData });
    } catch (error) {
      res.status(500).json({ error: "failed to load data" });
    }
  }

  if (req.method === "PATCH") {
    try {
      let filterData = filteredData(data, "suggestion", req.body);
      console.log(filterData);
      res.status(200).json({ filterData });
    } catch (error) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
}
