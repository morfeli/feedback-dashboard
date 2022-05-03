import { useRouter } from "next/router";
import LeftArrowSVG from "../dashboard-ui/UI/LeftArrowSvg";
import AddFeedbackBtn from "../dashboard-ui/UI/AddFeedbackBtn";

const RoadmapHeader = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <header className="flex justify-between p-4 text-white bg-third-blue md:m-4 md:rounded-xl md:p-8 xl:mt-8">
      <div>
        <button
          onClick={goBack}
          className="flex items-center justify-between w-20"
        >
          <LeftArrowSVG />
          Go Back
        </button>
        <h1 className="font-jost-semibold md:text-2xl">Roadmap</h1>
      </div>
      <AddFeedbackBtn />
    </header>
  );
};

export default RoadmapHeader;
