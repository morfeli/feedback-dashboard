import NavLinks from "../dashboard-ui/UI/NavLinks";

const DashboardCategories = ({ categorySorting, toggleMenu }) => {
  return (
    <nav className="w-56 mx-auto">
      <ul className="flex flex-wrap items-center justify-between h-52">
        <NavLinks
          categorySorting={categorySorting}
          toggle={toggleMenu}
          value="all"
        >
          All
        </NavLinks>
        <NavLinks
          categorySorting={categorySorting}
          toggle={toggleMenu}
          value="ui"
        >
          UI
        </NavLinks>
        <NavLinks
          categorySorting={categorySorting}
          toggle={toggleMenu}
          value="ux"
        >
          UX
        </NavLinks>
        <NavLinks
          categorySorting={categorySorting}
          toggle={toggleMenu}
          value="enhancement"
        >
          Enhancement
        </NavLinks>
        <NavLinks
          categorySorting={categorySorting}
          toggle={toggleMenu}
          value="bug"
        >
          Bug
        </NavLinks>
        <NavLinks
          categorySorting={categorySorting}
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
