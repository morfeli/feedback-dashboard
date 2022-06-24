import Link from "next/link";
import { useRouter } from "next/router";

const UserButtons = ({ item, updateAPIMessageHandler }) => {
  const router = useRouter();
  const id = item[0].feedbackID;

  const deleteFeedback = () => {
    fetch("/api/feedback/delete-feedback", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => updateAPIMessageHandler(data.message));
  };

  return (
    <div>
      <Link href={`/suggestions/edit/${id}`} passHref>
        <button className="p-2 mr-10 text-white rounded-xl bg-first-blue">
          Edit Feedback
        </button>
      </Link>

      <button
        onClick={deleteFeedback}
        className="p-2 mt-4 text-white bg-red-800 rounded-xl"
      >
        Delete Feedback
      </button>
    </div>
  );
};

export default UserButtons;
