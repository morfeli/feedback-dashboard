import {
  connectToDatabase,
  hashedPassword,
} from "../../helper/HelperFunctions";

const isEmpty = (value) => value.trim() === "";

const isNineChars = (value) => value.trim().length >= 9;

const emailValidation = (value) => {
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

    const { firstName, lastName, email, password, userName } = data;

    const firstNameIsValid = !isEmpty(firstName);
    const lastNameisValid = !isEmpty(lastName);
    const emailIsValid = emailValidation(email);
    const passwordisValid = isNineChars(password);
    const userNameIsValid = !isEmpty(userName);

    let userDataIsValid =
      firstNameIsValid &&
      lastNameisValid &&
      emailIsValid &&
      passwordisValid &&
      userNameIsValid;

    if (!userDataIsValid) {
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUserEmail = await db
      .collection("users")
      .findOne({ email: email });

    if (existingUserEmail) {
      client.close();
      res
        .status(201)
        .json({ message: "This email already exists.", email: true });
      return;
    }

    const existingUserName = await db
      .collection("users")
      .findOne({ userName: userName });

    if (existingUserName) {
      client.close();
      res
        .status(201)
        .json({ message: "This username is taken.", userName: true });
      return;
    }

    const protectedPassword = await hashedPassword(password);

    await db.collection("users").insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: protectedPassword,
      userName: userName,
    });

    client.close();

    res.status(201).json({ message: "Succesful sign up!", success: true });
  }
}
