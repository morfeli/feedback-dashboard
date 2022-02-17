import { useEffect } from "react";

const MobileMenuBtn = (props) => {
  useEffect(() => {
    if (!props.isOpen) {
      const element = document.getElementById("checkbox");
      element.checked = false;
    }
  }, [props]);

  return (
    <label>
      <input type="checkbox" id="checkbox" className="hidden" />
      <div
        className="absolute flex flex-col h-8 justify-evenly right-4 top-1"
        onClick={props.toggleMenu}
      >
        <div className="h-1 bg-slate-50 w-7"></div>
        <div className="h-1 bg-white w-7"></div>
        <div className="h-1 bg-white w-7"></div>
      </div>
    </label>
  );
};

export default MobileMenuBtn;
