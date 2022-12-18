import { getSession } from "next-auth/react";
import { existingUser, hashCode } from "../../../helpers/auth";
import { connectDatabase, insertDocument } from "../../../helpers/db-util";
import {
  ValidateEmail,
  validateEmptyForm,
  validateMinMax,
} from "../../../helpers/validation";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      name,
      instagram,
      companyName,
      phoneNumber,
      email,
      password,
      repeatedPassword,
    } = req.body;

    //Start Sign-Up Form Validation
    const session = await getSession({ req });

    if (session) {
      res.status(401).json({ message: "Authenticated!" });
      return;
    }

    const validateEmpty = validateEmptyForm(req.body);
    if (validateEmpty) {
      res.status(500).json({ message: "All fields are required" });
      return;
    }

    if (!ValidateEmail(email)) {
      res.status(500).json({ message: "The email-format is wrong" });
      return;
    }

    const valPassword = validateMinMax(password, 8, 16);
    if (!valPassword) {
      res.status(500).json({ message: "The password-format is wrong" });
      return;
    }

    const valRepeatedPassword = validateMinMax(repeatedPassword, 8, 16);
    if (!valRepeatedPassword) {
      res.status(500).json({ message: "The repeatedPassword-format is wrong" });
      return;
    }

    if (password !== repeatedPassword) {
      res
        .status(500)
        .json({ message: "The password does not match the repeatedPassword" });
      return;
    }

    //End Sign-Up Form Validation

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      const existingUserData = await existingUser(
        client,
        name,
        instagram,
        companyName,
        phoneNumber,
        email,
        password
      );

      if (existingUserData) {
        client.close();
        res.status(422).json({ message: "User exists already!" });
      } else {
        const hashedPassword = await hashCode(password);
        const myUser = {
          name,
          instagram,
          companyName,
          phoneNumber,
          email,
          password: hashedPassword,
          RevieWbyExperts: "under investigation",
        };
        await insertDocument(client, "users", myUser);
        client.close();
        res.status(201).json({ message: "It added the user well!" });
      }
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Inserting the user failed!" });
    }

    client.close();
  }
};

export default handler;
