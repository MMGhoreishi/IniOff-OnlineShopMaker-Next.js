import { findUserByEmail } from "../../../../helpers/auth";
import { connectDatabase } from "../../../../helpers/db-util";

const handler = async (req, res) => {
  const { email } = req.query;
  if (!email) return;

  if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      const existingUserData = await findUserByEmail(client, email);
      if (existingUserData) {
        client.close();
        res.status(200).json({
          message: "User exists already!",
          userData: existingUserData[0],
        });
      }
    } catch (error) {
      client.close();
      res.status(500).json({ message: "finding the user failed!" });
    }

    client.close();
  }
};

export default handler;
