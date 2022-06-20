import Link from "next/link";

const EditFeedbackBtn = ({ item }) => {
  const id = item[0].feedbackID;

  return (
    <Link href={`/suggestions/edit/${id}`} passHref>
      <div className="pt-8 pr-8">
        <button className="p-2 text-white rounded-xl bg-first-blue">
          Edit Feedback
        </button>
      </div>
    </Link>
  );
};

export default EditFeedbackBtn;
