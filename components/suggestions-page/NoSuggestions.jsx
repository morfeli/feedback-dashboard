import AddFeedbackBtn from "components/dashboard-ui/UI/AddFeedbackBtn";
import NoFeedbackSVG from "components/dashboard-ui/UI/NoFeedbackSvg";

const NoSuggestions = () => {
  return (
    <section className="flex flex-col items-center py-16 mx-4 bg-white rounded-lg">
      <NoFeedbackSVG />
      <h1 className="pt-4">There is no feedback yet.</h1>
      <p className="px-4 py-4 text-lg text-center md:px-40">
        Got a suggestion? Found a bug that need to be squashed? We love hearing
        about new ideas to improve our app.{" "}
      </p>
      <AddFeedbackBtn />
    </section>
  );
};

export default NoSuggestions;
