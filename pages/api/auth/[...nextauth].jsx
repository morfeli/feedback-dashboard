import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper Functions
import { comparePasswords } from "../../../components/helper/HelperFunctions";
import { MongoClient } from "mongodb";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let client = await MongoClient.connect(
          "mongodb+srv://morfelidev:MRDnEKLfPdlWEy7C@cluster0.2wru9.mongodb.net/users?retryWrites=true&w=majority"
        );

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
  // callbacks: {
  //   jwt: async ({ token, user }) => {
  //     if (user) {
  //       token = user;
  //     }
  //     return token;
  //   },
  // },
  // session: async ({ session, token }) => {
  //   console.log(token);
  //   session = token;
  //   return session;
  // },
});
