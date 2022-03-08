import { getSession } from "next-auth/react";

const SuggestionsPage = ({ session }) => {
  if (session) {
    return <h1>We got a session</h1>;
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
