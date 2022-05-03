import { hash, compare } from "bcryptjs";

export async function hashedPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function comparePasswords(hashedPassword, password) {
  const isValid = await compare(hashedPassword, password);
  return isValid;
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
