import { signIn } from "next-auth/react";

import { useEffect, useState } from "react";

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

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!result.error) {
      setLoginResult(null);
    } else {
      setLoginResult(result.error);
    }

    if (!formIsValid) {
      return;
    }

    setForm(intialFormState);
  };

  return (
    <form onSubmit={submitLoginData}>
      <div>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
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
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Create a password"
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
          />
        </label>
      </div>

      {loginResult && <p>{loginResult}</p>}
      <button className="w-32 p-2 rounded-3xl bg-faded-blue">Login</button>
    </form>
  );
};

export default LoginForm;
