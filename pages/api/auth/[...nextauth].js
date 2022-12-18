import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";

import { verifyCode, findUserByEmail } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db-util";
import {
  ValidateEmail,
  validateEmptyForm,
  validateMinMax,
} from "../../../helpers/validation";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        //Start Sign-In Form Validation
        const session = await getSession({ req: credentials.req });

        if (session) {
          res.status(401).json({ message: "Authenticated!" });
          return;
        }

        const { email, password } = credentials;

        const validateEmpty = validateEmptyForm({ email, password });
        if (validateEmpty) throw new Error("All fields are required");

        if (!ValidateEmail(email)) throw new Error("The email-format is wrong");

        const valPassword = validateMinMax(password, 8, 16);
        if (!valPassword) throw new Error("The password-format is wrong");
        //End Sign-In Form Validation

        let client;
        try {
          client = await connectDatabase();
        } catch (error) {
          throw new Error("Connecting to the database failed");
        }
        const existingUser = await findUserByEmail(client, email);
        if (existingUser.length > 0) {
          const { password: hashedPassword } = existingUser[0];
          const result = await verifyCode(password, hashedPassword);
          if (!result) {
            client.close();
            throw new Error("The password is wrong");
          }
          client.close();
          return { email };
        } else {
          client.close();
          throw new Error("It could not find such user");
        }
      },
    }),
  ],
});
