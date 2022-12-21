import { getSession } from "next-auth/react";
import { updateUserProfileByPhoneNumber } from "../../../helpers/auth";
import {
  connectDatabase,
  deleteDocumentById,
  insertDocument,
  findProductsByName,
} from "../../../helpers/db-util";
import { ValidateEmail, validateEmptyForm } from "../../../helpers/validation";

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
    const { product } = req.body;
    const productKeys = [
      "name",
      "numberOfDiscounts",
      "price",
      "discount",
      "description",
      "photo1",
      "photo2",
      "photo3",
      "category",
    ];

    const result = validateEmptyForm(product, productKeys);
    if (result) {
      client.close();
      res.status(500).json({ message: "All fields are required" });
      return;
    }

    try {
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
    const profileKeys = ["name", "instagram", "companyName"];

    const result = validateEmptyForm(profileInfo, profileKeys);
    if (result) {
      client.close();
      res.status(500).json({ message: "All fields are required" });
      return;
    }

    if (!ValidateEmail(profileInfo.email)) {
      client.close();
      res.status(500).json({ message: "The email-format is wrong" });
      return;
    }

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

    if (!productId) {
      client.close();
      res.status(500).json({ message: "productId is empty" });
      return;
    }

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
