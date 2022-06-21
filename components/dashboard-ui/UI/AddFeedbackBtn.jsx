import Link from "next/link";

const AddFeedbackBtn = () => {
  return (
    <Link href="/suggestions/new-feedback" passHref>
      <button className="p-2 text-white right-15px rounded-xl bg-button-pink md:relative ">
        + Add Feedback
      </button>
    </Link>
  );
};

export default AddFeedbackBtn;
