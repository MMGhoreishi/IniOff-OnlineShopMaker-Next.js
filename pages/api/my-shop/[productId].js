import { getSession } from "next-auth/react";
import {
  connectDatabase,
  updateProductDiscountsByProductId,
  updateProductByProductId,
} from "../../../helpers/db-util";
import { validateEmptyForm } from "../../../helpers/validation";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  if (req.method === "PUT") {
    const { productId } = req.query;
    const { product } = req.body;

    if (!productId) {
      res.status(500).json({ message: "productId is required" });
      return;
    }

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
      res.status(500).json({ message: "All fields are required" });
      return;
    }

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
