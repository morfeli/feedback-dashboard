import {
  buildFeedbackPath,
  extractFeedback,
} from "../../helper/HelperFunctions";

import EditFeedback from "../../components/edit-new-feedbacks/EditFeedback";

const EditFeedbackPage = ({ editFeedback }) => {
  return <EditFeedback item={editFeedback} />;
};

export default EditFeedbackPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const paramsId = params.id;

  const filePath = buildFeedbackPath();

  const data = await extractFeedback(filePath);

  const item = data.productRequests.find((item) => item.id == paramsId);

  const editFeedback = [];

  editFeedback.push(item);

  return {
    props: { editFeedback },
  };
}
