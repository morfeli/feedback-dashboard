import { useState } from "react";
import classNames from "classnames";

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
  email: string;
  password: string;
  confirmPassword: string;
  touched: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  valid: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
};

const intialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  touched: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  valid: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
};

const UserForm = () => {
  const [form, setForm] = useState<UserSignUp>(intialFormState);

  const submitUserData = (e) => {
    e.preventDefault();

    const firstNameIsValid = !isEmpty(form.firstName);
    const lastNameIsValid = !isEmpty(form.lastName);
    const emailIsValid = emailValidation(form.email);
    const passwordisValid = isTenChars(form.password);
    const confirmPasswordIsValid = isTenChars(form.confirmPassword);

    setForm((current) => ({
      ...current,
      validity: {
        firstName: firstNameIsValid,
        lastName: lastNameIsValid,
        email: emailIsValid,
        password: passwordisValid,
        confirmPassword: confirmPasswordIsValid,
      },
    }));

    if (form.password != form.confirmPassword) {
      throw new Error("Please enter matching passwords!");
    }

    const formIsValid =
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordisValid &&
      confirmPasswordIsValid;

    let userData = {
      firstName: form.firstName,
      lastName: form.lastName,
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
    }).then((res) => console.log("Data has been sent to the database!"));

    // setForm(intialFormState);
  };

  return (
    <form onSubmit={submitUserData}>
      <fieldset>
        <legend>Sign Up</legend>
      </fieldset>

      <div>
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
          />
        </label>
      </div>
      <div>
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
          />
        </label>
      </div>
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
      <div>
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
          />
        </label>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UserForm;
