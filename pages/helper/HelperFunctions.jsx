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

// export function buildNewFeedbackPath() {
//   return path.join(process.cwd(), "public", "data", "data.json");
// }

export const extractFeedback = async (filePath) => {
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);
  return data;
};

export function sortCategory(data, category) {
  if (category === "all") {
    return data;
  } else {
    return data.filter((item) => item.category === category);
  }
}

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

    case "Most_Comments": {
      let sortedArray = data.sort((a, b) => {
        const commentsA = a.comments ? a.comments.length : 0;
        const commentsB = b.comments ? b.comments.length : 0;

        const repliesA = a.comments ? a.comments : [];
        const filteredRepliesA = repliesA.filter((comment) => {
          return comment.replies ? comment.replies : null;
        });

        const repliesB = b.comments ? b.comments : [];
        const filteredRepliesB = repliesB.filter((comment) => {
          return comment.replies ? comment.replies : null;
        });

        const repliesLengthA = filteredRepliesA[0]
          ? filteredRepliesA[0].replies.length
          : 0;
        const repliesLengthB = filteredRepliesB[0]
          ? filteredRepliesB[0].replies.length
          : 0;

        const A = commentsA + repliesLengthA;
        const B = commentsB + repliesLengthB;

        return B - A;
      });

      return {
        sortedArray,
      };
    }

    case "Least_Comments": {
      let sortedArray = data.sort((a, b) => {
        const commentsA = a.comments ? a.comments.length : 0;
        const commentsB = b.comments ? b.comments.length : 0;

        const repliesA = a.comments ? a.comments : [];
        const filteredRepliesA = repliesA.filter((comment) => {
          return comment.replies ? comment.replies : null;
        });

        const repliesB = b.comments ? b.comments : [];
        const filteredRepliesB = repliesB.filter((comment) => {
          return comment.replies ? comment.replies : null;
        });

        const repliesLengthA = filteredRepliesA[0]
          ? filteredRepliesA[0].replies.length
          : 0;
        const repliesLengthB = filteredRepliesB[0]
          ? filteredRepliesB[0].replies.length
          : 0;

        const A = commentsA + repliesLengthA;
        const B = commentsB + repliesLengthB;

        return A - B;
      });
      return {
        sortedArray,
      };
    }
  }
}

export const filteredData = (data, status, category) => {
  let filteredData = data.productRequests.filter(
    (item) => item.status === status
  );

  switch (category) {
    case "ui": {
      filteredData = filteredData.filter((item) => item.category === "ui");
      return filteredData;
    }
    case "ux": {
      filteredData = filteredData.filter((item) => item.category === "ux");
      return filteredData;
    }
    case "feature": {
      filteredData = filteredData.filter((item) => item.category === "feature");
      return filteredData;
    }
    case "enhancement": {
      filteredData = filteredData.filter(
        (item) => item.category === "enhancement"
      );
      return filteredData;
    }
    case "bug": {
      filteredData = filteredData.filter((item) => item.category === "bug");
      return filteredData;
    }

    case "all": {
      return filteredData;
    }
  }

  return filteredData;
};
