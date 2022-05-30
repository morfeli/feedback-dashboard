import classnames from "classnames";

const NavLinks = ({
  children,
  value,
  categoryFN,
  toggle,
  setActive,
  activeLink,
}) => {
  const captureSortOption = (e) => {
    categoryFN(e.target.value);
    setActive(e.target.value);
    toggle();
  };

  let btnStyle = classnames(
    "p-3",
    "text-center",
    "w-fit",
    "rounded-xl",
    "text-first-blue",
    "font-jost-bold",
    "bg-light-gray",
    "hover:bg-gray-300"
  );

  if (activeLink == value) {
    btnStyle = classnames(
      "p-3",
      "text-center",
      "w-fit",
      "rounded-xl",
      "text-white",
      "bg-first-blue",
      "font-jost-bold"
    );
  }

  return (
    <button onClick={captureSortOption} value={value} className={btnStyle}>
      {children}
    </button>
  );
};
export default NavLinks;
