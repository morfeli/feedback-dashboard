import path from "path";
import fs from "fs/promises";

import EditFeedback from "../../../components/edit-new-feedbacks/EditFeedback";
const EditFeedbackPage = ({ editFeedback }) => {
  return <EditFeedback item={editFeedback} />;
};

export default EditFeedbackPage;

async function getData() {
  const filePath = path.join(process.cwd(), "json", "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const paramsId = params.id;

  const data = await getData();

  const item = data.productRequests.find((item) => item.id == paramsId);

  const editFeedback = [];

  editFeedback.push(item);

  return {
    props: { editFeedback },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const slugs = data.productRequests.map((item) => item.id);

  const params = slugs.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths: params,
    fallback: false,
  };
}
