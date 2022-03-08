import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Dashboard from "./components/dashboard-ui/Dashboard";
import SignUpPage from "./components/user-sign-up/SignUpPage";

export default function UserSignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/suggestions");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Dashboard />
      <SignUpPage />
    </>
  );
}
