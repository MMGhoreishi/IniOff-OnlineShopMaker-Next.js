import { connectDatabase, insertDocument } from "../../../helpers/db-util";
import { validateEmptyForm } from "../../../helpers/validation";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      const { contactData } = req.body;
      await insertDocument(client, "contacts", contactData);
      client.close();
      res.status(201).json({ message: "It added the message well!" });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Inserting the message failed!" });
    }
  }
};

export default handler;
