const NavLinks = ({ children, value, category, toggle, test }) => {
  const captureSortOption = (e) => {
    category(e.target.value);
    test(e.target.value);
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
