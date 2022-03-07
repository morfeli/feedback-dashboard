import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper Functions
import {
  connectToDatabase,
  comparePasswords,
} from "../../helper/HelperFunctions";

export default NextAuth({
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({ email: credentials.email });

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
        return {
          email: user.email,
        };
      },
    }),
  ],
});