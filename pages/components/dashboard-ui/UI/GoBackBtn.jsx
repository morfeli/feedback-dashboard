import { useRouter } from "next/router";
import LeftArrowSVG from "./LeftArrowSvg";

const GoBackBtn = () => {
  const router = useRouter();

  const goBackHandler = () => {
    router.back();
  };
  return (
    <div className="pt-8 pl-8">
      <button
        onClick={goBackHandler}
        className="flex items-center justify-between w-20"
      >
        <LeftArrowSVG />
        Go Back
      </button>
    </div>
  );
};

export default GoBackBtn;
