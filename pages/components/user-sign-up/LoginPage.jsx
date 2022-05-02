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
    <>
      <main className="flex flex-col items-center m-10">
        <div className=" flex flex-col border-2 border-solid w-80 py-10 mt-8 mx-4 bg-white">
          <Logo />
          <h1 className="text-center text-xl pt-4">
            Product Feedback Dashboard
          </h1>
          <p className="text-lg text-center">A communtity driven platform</p>
          {isUser && (
            <p className="pt-4 text-xl text-center px-2">
              Log in and leave a feedback in how we can improve our platform for
              our users.
            </p>
          )}
          {!isUser && (
            <p className="pt-4 text-xl text-center px-2">
              Sign up today and leave a feedback in how we can improve our
              platform for our users.
            </p>
          )}
          {isUser && <LoginForm />}

          {!isUser && <SignUpForm directUser={isLoggedInHandler} />}

          {isUser && (
            <div className="pt-6 flex justify-center">
              <h1>Dont have an account?</h1>
              <button
                onClick={isLoggedInHandler}
                className="pl-2 font-jost-semibold text-sky-500"
              >
                Sign Up
              </button>
            </div>
          )}
          {!isUser && (
            <div className="pt-6 flex justify-center">
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

        <div>
          <MorfeliSVG />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
