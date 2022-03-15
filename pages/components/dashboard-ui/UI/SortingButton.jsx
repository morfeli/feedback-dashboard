const SortingButton = () => {
  return (
    <label htmlFor="sortOptions" className="text-white">
      Sort by:
      <select name="sortOptions" id="sortOptions" className="bg-transparent">
        <option selected value="Most Upvotes">
          Most Upvotes
        </option>
        <option value="Least Upvotes">Least Upvotes</option>
        <option value="Most Comments">Most Comments</option>
        <option value="Least Comments">Least Comments</option>
      </select>
    </label>
  );
};

export default SortingButton;
