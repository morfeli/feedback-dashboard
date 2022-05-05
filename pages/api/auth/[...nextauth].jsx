import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper Functions
import {
  connectToDatabase,
  comparePasswords,
} from "../../../helper/HelperFunctions";

export default NextAuth({
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({
          email: credentials.email,
        });

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
        } else {
          console.log("Valid");
        }

        client.close();

        if (user) {
          return {
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       token.id = user.id;
  //     }

  //     return token;
  //   },
  //   session: ({ session, token }) => {
  //     if (token) {
  //       session.id = token.id;
  //     }

  //     return session;
  //   },
  // },
  secret: "MunkNation",
});
