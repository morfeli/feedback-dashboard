import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button
      className=" mt-4 w-60 py-1 bg-sky-500 text-white rounded-md md:w-20  "
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
