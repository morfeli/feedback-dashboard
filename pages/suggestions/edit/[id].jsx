import path from "path";
import fs from "fs/promises";

import EditFeedback from "../../../components/edit-new-feedbacks/EditFeedback";
const EditFeedbackPage = ({ editFeedback }) => {
  return <EditFeedback item={editFeedback} />;
};

export default EditFeedbackPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const paramsId = params.id;
  let filePath = path.join(process.cwd(), "public", "data", "data.json");

  let jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  const item = data.productRequests.find((item) => item.id == paramsId);

  const editFeedback = [];

  editFeedback.push(item);

  return {
    props: { editFeedback },
  };
}
