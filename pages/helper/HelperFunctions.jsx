import { hash, compare } from "bcryptjs";

import path from "path";
import fs from "fs/promises";

export async function hashedPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function comparePasswords(hashedPassword, password) {
  const isValid = await compare(hashedPassword, password);
  return isValid;
}

// export async function connectToDatabase() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://morfelidev:MRDnEKLfPdlWEy7C@cluster0.2wru9.mongodb.net/users?retryWrites=true&w=majority"
//   );
//   return client;
// }

export function buildFeedbackPath() {
  return path.join(process.cwd(), "public", "data", "data.json");
}

export const extractFeedback = async (filePath) => {
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);
  return data;
};

// export function sortCategory(data, category) {
//   if (category === "all") {
//     return data;
//   } else {
//     return data.filter((item) => item.category === category);
//   }
// }

export const filteredData = (data, status) => {
  let filteredData = data.productRequests.filter(
    (item) => item.status === status
  );

  return filteredData;
};

export const increaseUpvotesByOne = (item) => {
  return item.upvotes + 1;
};
