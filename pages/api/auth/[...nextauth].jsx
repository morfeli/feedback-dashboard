import NextAuth from "next-auth";

import {
  comparePasswords,
  connectToDatabase,
} from "../../../helper/HelperFunctions";

import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        console.log(user);

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        let isValid = await comparePasswords(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in.");
        }

        client.close();

        return {
          email: user.email,
        };
      },
    }),
  ],
});
