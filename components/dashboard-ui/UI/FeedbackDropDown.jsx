import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

{
  /* <select
name="category"
id="category"
className="self-center w-2/3 px-2 border-r-8 border-transparent bg-light-gray h-11"
ref={categoryRef}
>
<option value="feature">Feature</option>
<option value="ui">UI</option>
<option value="ux">UX</option>
<option value="enhancement">Enhancement</option>
<option value="bug">Bug</option>
</select> */
}

const FeedbackDropDown = () => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("Feature");

  const toggleActive = () => {
    setActive((current) => !current);
  };

  const captureValue = (e) => {
    setActive(e.target.value);
  };

  return (
    <div>
      <button onClick={toggleActive}></button>
    </div>
  );
};

export default FeedbackDropDown;
