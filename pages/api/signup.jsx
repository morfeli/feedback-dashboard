import { hashedPassword } from "../../components/helper/HelperFunctions";
import { MongoClient } from "mongodb";

const isEmpty = (value) => value.trim() === "";

const isTenChars = (value) => value.trim().length >= 10;

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
    console.log(data);

    const { firstName, lastName, email, password, userName } = data;

    const firstNameIsValid = !isEmpty(firstName);
    const lastNameisValid = !isEmpty(lastName);
    const emailIsValid = emailValidation(email);
    const passwordisValid = isTenChars(password);
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

    let client = await MongoClient.connect(
      "mongodb+srv://morfelidev:MRDnEKLfPdlWEy7C@cluster0.2wru9.mongodb.net/users?retryWrites=true&w=majority"
    );

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User already exists, please log in!" });
      console.log("User already exists, please log in!");
      client.close();
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

    res.status(201).json({ message: "Signed up!" });
  } else {
    res.status(200).json({ data: req.body });
  }
}
