import { connectDatabase, insertDocument } from "../../../helpers/db-util";
import { ValidateEmail, validateEmptyForm } from "../../../helpers/validation";

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
      const contactDataKeys = ["name", "email", "subject", "message"];

      const validateEmpty = validateEmptyForm(contactData, contactDataKeys);
      if (validateEmpty) {
        res.status(500).json({ message: "All fields are required" });
        return;
      }

      if (!ValidateEmail(contactData.email)) {
        res.status(500).json({ message: "The email-format is wrong" });
        return;
      }

      await insertDocument(client, "contacts", contactData);
      client.close();
      res.status(201).json({ message: "It added the message well!" });
    } catch (error) {
      console.log("######Error-contact>>>>");
      console.log(error);

      client.close();
      res.status(500).json({ message: "Inserting the message failed!" });
    }
  }
};

export default handler;
