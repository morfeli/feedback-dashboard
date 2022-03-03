import Link from "next/link";

// components
import SignUpForm from "./SignUpForm.tsx";

const SignUpPage = () => {
  return (
    <main className="flex flex-col items-center h-screen bg-light-gray">
      <div className="flex flex-col items-center justify-center px-8 pt-4">
        <h1 className="text-xl">Product Feedback App</h1>
        <p className="text-lg">A communtity driven platform</p>
        <p className="pt-4 text-xl text-center ">
          Sign up today and leave a feedback in how we can improve our platform
          for our users.
        </p>
      </div>
      <SignUpForm />
      <div className="pt-6">
        <Link href="/auth">
          <p>Already a user? Please click here to login.</p>
        </Link>
      </div>
    </main>
  );
};

export default SignUpPage;
