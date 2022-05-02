import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const isTenChars = (value: string) => value.trim().length >= 10;

const emailValidation = (value: string) => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (value.match(pattern)) {
    return true;
  } else {
    return false;
  }
};

type UserLoginIn = {
  email: string;
  password: string;

  touched: {
    email: boolean;
    password: boolean;
  };
  valid: {
    email: boolean;
    password: boolean;
  };
};

const intialFormState = {
  email: "",
  password: "",

  touched: {
    email: false,
    password: false,
  },
  valid: {
    email: false,
    password: false,
  },
};

const LoginForm = () => {
  const [form, setForm] = useState<UserLoginIn>(intialFormState);
  const [loginResult, setLoginResult] = useState(null);
  const router = useRouter();

  const submitLoginData = async (e) => {
    e.preventDefault();

    const emailIsValid = emailValidation(form.email);
    const passwordisValid = isTenChars(form.password);

    setForm((current) => ({
      ...current,
      validity: {
        email: emailIsValid,
        password: passwordisValid,
      },
    }));

    const formIsValid = emailIsValid && passwordisValid;

    if (!formIsValid) {
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!result.error) {
      router.replace("/suggestions");
    } else {
      setLoginResult(result.error);
    }

    setForm(intialFormState);
  };

  return (
    <form
      onSubmit={submitLoginData}
      className="flex flex-col items-center pt-4"
    >
      <div>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Email address"
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                email: e.target.value,
                touched: {
                  ...current.touched,
                  email: true,
                },
              }))
            }
            value={form.email}
            className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
          />
        </label>
      </div>
      <div className="pt-4">
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                password: e.target.value,
                touched: {
                  ...current.touched,
                  password: true,
                },
              }))
            }
            value={form.password}
            className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
          />
        </label>
      </div>

      {loginResult && <p>{loginResult}</p>}
      <button className=" mt-4 w-60 py-1 bg-sky-500 text-white rounded-md">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
