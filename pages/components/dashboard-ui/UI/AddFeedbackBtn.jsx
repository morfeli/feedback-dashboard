import Link from "next/link";

const AddFeedbackBtn = () => {
  return (
    <Link href="/suggestions/new-feedback">
      <button className="absolute p-2 text-white rounded-xl bg-button-pink right-15px">
        + Add Feedback
      </button>
    </Link>
  );
};

export default AddFeedbackBtn;
