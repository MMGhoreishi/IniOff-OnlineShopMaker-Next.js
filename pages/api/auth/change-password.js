import { getSession } from "next-auth/react";
import {
  findUserByEmail,
  hashCode,
  updateUserPasswordByEmail,
  verifyCode,
} from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db-util";
import { validateEmptyForm } from "../../../helpers/validation";

const handler = async (req, res) => {
  if (req.method !== "PATCH") return;

  const { oldPassword, newPassword } = req.body;

  const validateEmpty = validateEmptyForm(req.body);
  if (validateEmpty) {
    res.status(500).json({ message: "تمام فیلدها ضروری هستند" });
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "شما اهراز هویت نشده اید" });
    return;
  }
  const { email: userEmail } = session.user;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
  try {
    const user = await findUserByEmail(client, userEmail);
    if (user.length <= 0) {
      res.status(404).json({ message: "It could not find such user!" });
      client.close();
      return;
    }
    const currentPassword = user[0].password;

    const passwordsAreEqual = await verifyCode(oldPassword, currentPassword);
    if (!passwordsAreEqual) {
      res.status(403).json({
        message:
          "Your old-password is not the same with the password in the database!",
      });
      client.close();
      return;
    }

    const hashedPassword = await hashCode(newPassword);

    await updateUserPasswordByEmail(client, userEmail, hashedPassword);
    client.close();
    res.status(200).json({ message: "It changed the password well!" });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "A problem happened!" });
  }
};

export default handler;
