import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button
      className="py-1 mt-4 text-white rounded-md w-60 bg-sky-500 md:w-20"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
