import NavLinks from "../dashboard-ui/UI/NavLinks";

const DashboardCategories = ({ category, toggleMenu, test }) => {
  return (
    <nav className="w-56 mx-auto">
      <ul className="flex flex-wrap items-center justify-between h-52">
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="all"
        >
          All
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="ui"
        >
          UI
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="ux"
        >
          UX
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="enhancement"
        >
          Enhancement
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="bug"
        >
          Bug
        </NavLinks>
        <NavLinks
          category={category}
          test={test}
          toggle={toggleMenu}
          value="feature"
        >
          Feature
        </NavLinks>
      </ul>
    </nav>
  );
};

export default DashboardCategories;
