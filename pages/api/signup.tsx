// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { hashedPassword, connectToDatabase } from "../helper/HelperFunctions";

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

export default async function handler(req, res) {
  if (req.method == "POST") {
    let data = req.body;

    const firstNameIsValid = !isEmpty(data.firstName);
    const lastNameisValid = !isEmpty(data.lastName);
    const emailIsValid = emailValidation(data.email);
    const passwordisValid = isTenChars(data.password);

    let userDataIsValid =
      firstNameIsValid && lastNameisValid && emailIsValid && passwordisValid;

    if (!userDataIsValid) {
      return;
    }

    const protectedPassword = await hashedPassword(data.password);

    const storeUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: protectedPassword,
    };

    const client = await connectToDatabase();

    const db = client.db();

    await db.collection("users").insertOne({ user: storeUserData });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  } else {
    res.status(200).json({ data: req.body });
  }
}
