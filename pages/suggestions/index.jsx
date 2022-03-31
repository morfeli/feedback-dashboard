import { getSession } from "next-auth/react";
import { useState } from "react";

// components
import Dashboard from "../components/dashboard-ui/Dashboard";
import SortingHeader from "../components/dashboard-ui/SortingHeader";
import Suggestions from "../components/suggestions-page/Suggestions";

// helper function

const SuggestionsPage = ({ session }) => {
  const [sortedArray, setSortedArray] = useState();

  const updateSortedArray = (data) => {
    setSortedArray(data);
  };

  if (session) {
    return (
      <>
        <Dashboard />

        <SortingHeader sortArray={updateSortedArray} />

        <Suggestions sortedData={sortedArray} />
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
  }

  return {
    props: { session },
  };
};
