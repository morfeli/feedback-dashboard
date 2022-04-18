import Link from "next/link";

const AddFeedbackBtn = () => {
  return (
    <Link href="/suggestions/new-feedback">
      <button className="p-2 text-white rounded-xl bg-button-pink">
        + Add Feedback
      </button>
    </Link>
  );
};

export default AddFeedbackBtn;
