import { getSession } from "next-auth/react";
import {
  addPhotosToProductByName,
  connectDatabase,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method !== "PUT") return;

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const { productName, photosArray } = req.body;

    const updatedProductPhotos = await addPhotosToProductByName(
      client,
      productName,
      photosArray
    );

    client.close();
    res.status(200).json({
      message: "It updated product-photos well :)",
      updatedProductPhotos,
    });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Updating product-photos failed!" });
  }

  client.close();
};

export default handler;
