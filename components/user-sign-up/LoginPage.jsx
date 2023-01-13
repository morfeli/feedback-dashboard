import { useState } from "react";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Logo from "../dashboard-ui/UI/Logo";
import MorfeliSVG from "../dashboard-ui/UI/MorfeliSVG";

const LoginPage = () => {
  const [isUser, setIsUser] = useState(true);

  const isLoggedInHandler = () => {
    setIsUser((current) => !current);
  };

  return (
    <main className="flex flex-col items-center m-10">
      <div className="flex flex-col py-10 mx-4 mt-8 bg-white border-2 border-solid w-80">
        <Logo />
        <h1 className="pt-4 text-xl text-center">Product Feedback Dashboard</h1>
        <p className="text-lg text-center">A communtity driven platform</p>
        {isUser && (
          <p className="px-2 pt-4 text-xl text-center">
            Log in and leave a feedback in how we can improve our platform for
            our users.
          </p>
        )}
        {!isUser && (
          <p className="px-2 pt-4 text-xl text-center">
            Sign up today and leave a feedback in how we can improve our
            platform for our users.
          </p>
        )}
        {isUser && <LoginForm />}

        {!isUser && <SignUpForm directUser={isLoggedInHandler} />}

        {isUser && (
          <div className="flex justify-center pt-6">
            <h1>Don&apos;t have an account?</h1>
            <button
              onClick={isLoggedInHandler}
              className="pl-2 font-jost-semibold text-sky-500"
            >
              Sign Up
            </button>
          </div>
        )}
        {!isUser && (
          <div className="flex justify-center pt-6">
            <h1>Have an account?</h1>
            <button
              onClick={isLoggedInHandler}
              className="pl-2 font-jost-semibold text-sky-500"
            >
              Log In
            </button>
          </div>
        )}
      </div>

      <div className="py-8 text-center">
        <h2 className="text-xl">Dummy Credentials</h2>

        <p className="py-2">Email: test@gmail.com</p>
        <p>Password: testtesttest</p>
      </div>

      <MorfeliSVG />
    </main>
  );
};

export default LoginPage;
