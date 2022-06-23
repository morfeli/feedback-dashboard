import CheckSVG from "./CheckSVG";

const ButtonTest = ({ captureSortOption, value, sortValue }) => {
  if (value === sortValue) {
    console.log(true);
  }
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-between py-4 pl-4 text-left hover:text-button-pink hover:cursor-pointer"
        onClick={captureSortOption}
        value={value}
        name="dropdown-btn"
      >
        {value}
        {sortValue == value ? <CheckSVG /> : null}
      </button>

      <hr />
    </>
  );
};

export default ButtonTest;
