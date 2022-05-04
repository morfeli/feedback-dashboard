import { hash, compare } from "bcryptjs";
import { MongoClient } from "mongodb";

export async function hashedPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function comparePasswords(hashedPassword, password) {
  const isValid = await compare(hashedPassword, password);
  return isValid;
}

export async function connectToDatabase() {
  const client = MongoClient.connect(
    `mongodb+srv://morfelidev:productfeedback@cluster0.2wru9.mongodb.net/feedbackdashboard?retryWrites=true&w=majority`
  );

  return client;
}

export const filteredData = (data, status) => {
  let filteredData = data.productRequests.filter(
    (item) => item.status === status
  );

  return filteredData;
};

export const increaseUpvotesByOne = (item) => {
  return item.upvotes + 1;
};
