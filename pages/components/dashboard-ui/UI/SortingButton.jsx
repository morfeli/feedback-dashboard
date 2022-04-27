const SortingButton = (props) => {
  const captureSortOption = (e) => {
    props.sortArray(e.target.value);
    props.test(e.target.value);
  };

  return (
    <div>
      <label htmlFor="sort" className="pr-2 text-white font-jost-semibold">
        Sort by:
      </label>
      <select
        name="sort"
        id="sort"
        className="text-white bg-transparent font-jost-semibold "
        onChange={captureSortOption}
      >
        <option value="Most_Upvotes">Most Upvotes</option>
        <option value="Least_Upvotes">Least Upvotes</option>
        <option value="Most_Comments">Most Comments</option>
        <option value="Least_Comments">Least Comments</option>
      </select>
    </div>
  );
};

export default SortingButton;
