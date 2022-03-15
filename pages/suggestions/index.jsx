import { getSession } from "next-auth/react";

// components
import Dashboard from "../components/dashboard-ui/Dashboard";
import SortingHeader from "../components/dashboard-ui/SortingHeader";

const SuggestionsPage = ({ session }) => {
  if (session) {
    return (
      <>
        <Dashboard />

        <SortingHeader />
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
