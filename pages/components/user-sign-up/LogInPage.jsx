import LoginForm from "./LoginForm.tsx";

const UserLoginPage = () => {
  return (
    <main className="flex flex-col items-center h-screen bg-light-gray">
      <div className="flex flex-col items-center justify-center px-8 pt-4">
        <h1 className="text-xl">Product Feedback App</h1>
        <p className="text-lg">A communtity driven platform</p>
        <p className="pt-4 text-xl text-center ">
          Login in today and leave a feedback in how we can improve our platform
          for our users.
        </p>
      </div>
      <LoginForm />
      <div className="pt-6">
        <p>Need to sign up? Please click here.</p>
      </div>
    </main>
  );
};

export default UserLoginPage;
