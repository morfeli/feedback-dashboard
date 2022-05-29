import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + "/data.json", "utf8");
  //Return the content of the data file in json format

  const data = JSON.parse(fileContents);

  const inProgressStatusData = data.productRequests.filter(
    (item) => item.status == "in-progress"
  );

  const liveStatusData = data.productRequests.filter(
    (item) => item.status == "live"
  );

  const plannedStatusData = data.productRequests.filter(
    (item) => item.status == "planned"
  );

  const suggestionsData = data.productRequests.filter(
    (item) => item.status == "suggestion"
  );

  let feedbackData = {
    suggestions: suggestionsData,
    progress: inProgressStatusData,
    planned: plannedStatusData,
    live: liveStatusData,
  };

  console.log(feedbackData);
  res.status(200).json(feedbackData);
}
