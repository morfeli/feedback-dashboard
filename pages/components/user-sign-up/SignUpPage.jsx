import { useState } from "react";

// components
import SignUpForm from "./SignUpForm.tsx";
import LoginForm from "./LoginForm.tsx";

const SignUpPage = () => {
  const [isUser, setIsUser] = useState(false);

  const isLoggedInHandler = () => {
    setIsUser((current) => !current);
  };

  return (
    <main className="flex flex-col items-center h-screen bg-light-gray">
      <div className="flex flex-col items-center justify-center px-8 pt-4">
        <h1 className="text-xl">Product Feedback App</h1>
        <p className="text-lg">A communtity driven platform</p>
        {!isUser && (
          <p className="pt-4 text-xl text-center ">
            Sign up today and leave a feedback in how we can improve our
            platform for our users.
          </p>
        )}
        {isUser && (
          <p className="pt-4 text-xl text-center ">
            Log in and leave a feedback in how we can improve our platform for
            our users.
          </p>
        )}
      </div>
      {!isUser && <SignUpForm directUser={isLoggedInHandler} />}
      {isUser && <LoginForm />}
      <div className="pt-6">
        {!isUser && (
          <button onClick={isLoggedInHandler}>
            Already a user? Click here to login!
          </button>
        )}
      </div>
    </main>
  );
};

export default SignUpPage;
