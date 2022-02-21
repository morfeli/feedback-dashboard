const NavLinks = (props) => {
  return (
    <li className="w-fit p-3 rounded-xl text-center text-first-blue font-jost-bold bg-light-gray">
      {props.children}
    </li>
  );
};
export default NavLinks;
