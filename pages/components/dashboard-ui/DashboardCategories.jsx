import NavLinks from "./NavLinks";

const DashboardCategories = () => {
  return (
    <nav className="w-56 mx-auto">
      <ul className="flex flex-wrap items-center justify-between h-52">
        <NavLinks>All</NavLinks>
        <NavLinks>UI</NavLinks>
        <NavLinks>UX</NavLinks>
        <NavLinks>Enhancement</NavLinks>
        <NavLinks>Bug</NavLinks>
        <NavLinks>Feature</NavLinks>
      </ul>
    </nav>
  );
};

export default DashboardCategories;
