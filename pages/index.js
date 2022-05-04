import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import LoginPage from "../components/user-sign-up/LoginPage";
import Logo from "../components/dashboard-ui/UI/Logo";

export default function UserSignUpPage() {
  const [innerWidth, setInnerWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isMobile = innerWidth <= 767;

  const changeWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isMobile]);

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
    return <Logo />;
  }

  return (
    <>
      <LoginPage />
    </>
  );
}
