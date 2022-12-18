import { getSession } from "next-auth/react";
import {
  connectDatabase,
  updateProductDiscountsByProductId,
  updateProductByProductId,
} from "../../../helpers/db-util";
import { validateEmptyForm } from "../../../helpers/validation";

const handler = async (req, res) => {
  const { productId } = req.query;
  const { Discounts, product } = req.body;

  const validateEmpty = validateEmptyForm({ productId, Discounts, product });
  if (validateEmpty) {
    res.status(500).json({ message: "All fields are required" });
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  if (req.method === "PUT") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    if (Discounts)
      try {
        const updatedProductDiscounts = await updateProductDiscountsByProductId(
          client,
          productId,
          Discounts
        );
        client.close();
        res.status(200).json({
          message: "It updated product-discounts :)",
          updatedProductDiscounts,
        });
      } catch (error) {
        client.close();
        res.status(500).json({ message: "Updating product-discounts failed!" });
      }

    if (product)
      try {
        const updatedProduct = await updateProductByProductId(
          client,
          productId,
          product
        );
        client.close();
        res.status(200).json({
          message: "It updated product :)",
          updatedProduct,
        });
      } catch (error) {
        client.close();
        res.status(500).json({ message: "Updating product failed!" });
      }

    client.close();
  }
};

export default handler;
