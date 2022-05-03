import { useState } from "react";

const isEmpty = (value: string) => value.trim() === "";

const isTenChars = (value: string) => value.trim().length >= 10;

const emailValidation = (value: string) => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (value.match(pattern)) {
    return true;
  } else {
    return false;
  }
};

type UserSignUp = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  touched: {
    firstName: boolean;
    lastName: boolean;
    userName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  valid: {
    firstName: boolean;
    lastName: boolean;
    userName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
};

const intialFormState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  touched: {
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  valid: {
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
};

const SignUpForm = (props: any) => {
  const [form, setForm] = useState<UserSignUp>(intialFormState);

  const submitUserData = (e) => {
    e.preventDefault();

    const firstNameIsValid = !isEmpty(form.firstName);
    const lastNameIsValid = !isEmpty(form.lastName);
    const userNameIsValid = !isEmpty(form.userName);
    const emailIsValid = emailValidation(form.email);
    const passwordisValid = isTenChars(form.password);
    const confirmPasswordIsValid = isTenChars(form.confirmPassword);

    setForm((current) => ({
      ...current,
      validity: {
        firstName: firstNameIsValid,
        lastName: lastNameIsValid,
        userName: userNameIsValid,
        email: emailIsValid,
        password: passwordisValid,
        confirmPassword: confirmPasswordIsValid,
      },
    }));

    if (form.password != form.confirmPassword) {
      throw new Error("Please enter matching passwords!");
    }

    const formIsValid = firstNameIsValid && lastNameIsValid && userNameIsValid;
    emailIsValid && passwordisValid && confirmPasswordIsValid;

    let userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      userName: form.userName,
      email: form.email,
      password: form.confirmPassword,
    };

    if (!formIsValid) {
      return;
    }

    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then((res) => console.log(res));

    setForm(intialFormState);
    props.directUser();
  };

  return (
    <form
      onSubmit={submitUserData}
      className="flex flex-col items-center justify-center pt-4"
    >
      <section className="flex flex-col items-center">
        <div className="mb-2">
          <label htmlFor="firstName">
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  firstName: e.target.value,
                  touched: {
                    ...current.touched,
                    firstName: true,
                  },
                }))
              }
              value={form.firstName}
              className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="lastName">
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  lastName: e.target.value,
                  touched: {
                    ...current.touched,
                    lastName: true,
                  },
                }))
              }
              value={form.lastName}
              className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="userName">
            <input
              id="userName"
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  userName: e.target.value,
                  touched: {
                    ...current.touched,
                    userName: true,
                  },
                }))
              }
              value={form.userName}
              className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
            />
          </label>
        </div>
        <div className="mb-2">
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
              className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
            />
          </label>
        </div>
        <div className="mb-2">
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
              className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  confirmPassword: e.target.value,
                  touched: {
                    ...current.touched,
                    confirmPassword: true,
                  },
                }))
              }
              value={form.confirmPassword}
              className="w-60 p-2 bg-light-gray focus:outline-button-pink rounded-md"
            />
          </label>
        </div>
        <button className=" mt-4 w-60 py-1 bg-sky-500 text-white rounded-md">
          Submit
        </button>
      </section>
    </form>
  );
};

export default SignUpForm;
