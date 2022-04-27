import AddFeedbackBtn from "./UI/AddFeedbackBtn";
import SortingButton from "./UI/SortingButton";

const SortingHeader = ({ sortArray, data, test }) => {
  return (
    <section className="flex items-center p-4 bg-first-blue">
      <SortingButton sortArray={sortArray} data={data} test={test} />

      <AddFeedbackBtn />
    </section>
  );
};

export default SortingHeader;
