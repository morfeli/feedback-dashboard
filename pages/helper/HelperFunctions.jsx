import { MongoClient } from "mongodb";

import { hash } from "bcryptjs";

export async function hashedPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://morfelidev:MRDnEKLfPdlWEy7C@cluster0.2wru9.mongodb.net/users?retryWrites=true&w=majority"
  );
  return client;
}
