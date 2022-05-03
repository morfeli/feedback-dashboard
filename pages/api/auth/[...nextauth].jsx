import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper Functions
import { comparePasswords } from "../../../components/helper/HelperFunctions";
import { MongoClient } from "mongodb";

export default NextAuth({
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let client = await MongoClient.connect(env.process.NEXTAUTH_URL);

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({
          email: credentials.email,
        });

        const userInfo = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
        };

        if (!user) {
          client.close();

          throw new Error("No user found!");
        }

        const isValid = await comparePasswords(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();

          throw new Error("Invalid password");
        }

        client.close();

        if (user) {
          return {
            email: userInfo,
          };
        } else {
          return null;
        }
      },
    }),
  ],
});
