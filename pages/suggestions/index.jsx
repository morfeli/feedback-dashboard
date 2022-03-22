import { getSession } from "next-auth/react";

// components
import Dashboard from "../components/dashboard-ui/Dashboard";
import SortingHeader from "../components/dashboard-ui/SortingHeader";
import Suggestions from "../components/suggestions-page/Suggestions";

// helper function
import { buildFeedbackPath, extractFeedback } from "../helper/HelperFunctions";

const SuggestionsPage = ({ session, dataArr }) => {
  if (session) {
    return (
      <>
        <Dashboard />

        <SortingHeader />

        <Suggestions data={dataArr} />
      </>
    );
  }
};

export default SuggestionsPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const filePath = buildFeedbackPath();
    const feedBackData = await extractFeedback(filePath);

    const dataArr = [];
    dataArr.push(feedBackData);

    return {
      props: { session, dataArr },
    };
  }
};
