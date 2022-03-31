import { MongoClient } from "mongodb";
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

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://morfelidev:MRDnEKLfPdlWEy7C@cluster0.2wru9.mongodb.net/users?retryWrites=true&w=majority"
  );
  return client;
}

export function buildFeedbackPath() {
  return path.join(process.cwd(), "public", "data", "data.json");
}

export const extractFeedback = async (filePath) => {
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);
  return data;
};

export function sortData(data, option) {
  switch (option) {
    case "Most_Upvotes": {
      let sortedArray = data.sort(
        (itemA, itemB) => itemB.upvotes - itemA.upvotes
      );

      return {
        sortedArray,
      };
    }
    case "Least_Upvotes": {
      let sortedArray = data.sort(
        (itemA, itemB) => itemA.upvotes - itemB.upvotes
      );

      return {
        sortedArray,
      };
    }
  }
}

export const filteredData = (data, status) => {
  let filteredFeedback = data[0].productRequests.filter(
    (item) => item.status === status
  );

  return filteredFeedback;
};
