import { getSession } from "next-auth/react";
import { updateUserProfileByPhoneNumber } from "../../../helpers/auth";
import {
  connectDatabase,
  deleteDocumentById,
  insertDocument,
  findProductsByName,
} from "../../../helpers/db-util";
import { validateEmptyForm } from "../../../helpers/validation";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    try {
      const { product } = req.body;
      const validateEmpty = validateEmptyForm(product);
      if (validateEmpty) {
        res.status(500).json({ message: "All fields are required" });
        return;
      }

      const existingProduct = await findProductsByName(client, product.name);
      if (existingProduct.length > 0) {
        client.close();
        res.status(422).json({ message: "Product exists already!" });
      } else {
        await insertDocument(client, "products", product);
        client.close();
        res.status(201).json({ message: "It added the product well!" });
      }
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Inserting the product failed!" });
    }
  }

  if (req.method === "PUT") {
    const { profileInfo } = req.body;

    try {
      const updatedUser = await updateUserProfileByPhoneNumber(
        client,
        profileInfo
      );

      client.close();
      res
        .status(200)
        .json({ message: "It updated user-profile :)", updatedUser });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Updating user failed!" });
    }
  }

  if (req.method === "DELETE") {
    const { productId } = req.body;

    try {
      const deletedProduct = await deleteDocumentById(
        client,
        "products",
        productId
      );

      res
        .status(200)
        .json({ message: "It deleted the product well :)", deletedProduct });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Deleting product failed!" });
    }
  }

  client.close();
};

export default handler;
