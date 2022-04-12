const NavLinks = ({ children, value, categorySorting, toggle }) => {
  const captureSortOption = (e) => {
    fetch("api/feedback/sort", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e.target.value),
    })
      .then((res) => res.json())
      .then((data) => categorySorting(data))
      .catch((err) => console.log(err));

    toggle();
  };

  return (
    <button
      onClick={captureSortOption}
      value={value}
      className="p-3 text-center w-fit rounded-xl text-first-blue font-jost-bold bg-light-gray"
    >
      {children}
    </button>
  );
};
export default NavLinks;
