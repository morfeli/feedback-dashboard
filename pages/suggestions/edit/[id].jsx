import { connectToDatabase } from "../../../helper/HelperFunctions";
import EditFeedback from "../../../components/edit-new-feedbacks/EditFeedback";

const EditFeedbackPage = ({ data }) => {
  return <EditFeedback item={data} />;
};

export default EditFeedbackPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const paramsId = params.id;

  const parseID = parseInt(paramsId);

  const client = await connectToDatabase();

  let item = [];

  const singleFeedback = await client
    .db()
    .collection("posts")
    .findOne({ feedbackID: parseID });

  item.push(singleFeedback);

  return {
    props: {
      data: JSON.parse(JSON.stringify(item)),
    },
  };
}
