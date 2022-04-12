import SortingButton from "./UI/SortingButton";

const SortingHeader = ({ sortArray, data, test }) => {
  return (
    <section className="flex items-center p-4 justify-evenly bg-first-blue">
      <SortingButton sortArray={sortArray} data={data} test={test} />

      <button className="p-2 text-white rounded-xl bg-button-pink">
        + Add Feedback
      </button>
    </section>
  );
};

export default SortingHeader;
