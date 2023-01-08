import { MongoClient, ObjectId } from "mongodb";

const dbName = "inioff";

export const connectDatabase = async () => {
  const client = await new MongoClient("mongodb://0.0.0.0:27017/");

  return client;
};

export const insertDocument = async (client, collectionName, dataObj) => {
  try {
    const db = await client.db(dbName);
    const collection = await db.collection(collectionName);
    const insertD = await collection.insertOne(dataObj);

    return insertD;
  } catch (err) {
    console.log(err);
  }
};

export const deleteDocumentById = async (client, collectionName, _id) => {
  const db = await client.db(dbName);
  const collection = await db.collection(collectionName);

  const deleteResult = await collection.deleteOne({ _id: ObjectId(_id) });
  return deleteResult;
};

export const findProductsByUserPN = async (client, userPhoneNumber) => {
  const db = await client.db(dbName);
  const collection = await db.collection("products");

  const filteredProducts = await collection.find({ userPhoneNumber }).toArray();

  return filteredProducts;
};

export const findProductsByCategory = async (client, category) => {
  const db = await client.db(dbName);
  const collection = await db.collection("products");

  const filteredProducts = await collection.find({ category }).toArray();

  return filteredProducts;
};

export const findProductById = async (client, _id) => {
  const db = await client.db(dbName);
  const collection = await db.collection("products");

  const filteredProduct = await collection
    .find({ _id: ObjectId(_id) })
    .toArray();

  return filteredProduct;
};

export const findProductsByName = async (client, name) => {
  const db = await client.db(dbName);
  const collection = await db.collection("products");

  const product = await collection.find({ name }).toArray();

  return product;
};

export const addPhotosToProductByName = async (client, name, photosArray) => {
  const db = await client.db(dbName);
  const collection = await db.collection("products");

  const updateResult = await collection.updateOne(
    { name },
    {
      $set: {
        photo1: photosArray[0],
        photo2: photosArray[1],
        photo3: photosArray[2],
      },
    }
  );

  return updateResult;
};

export const updateProductDiscountsByProductId = async (
  client,
  _id,
  numberOfDiscounts
) => {
  const db = await client.db(dbName);
  const collection = await db.collection("products");

  const updateResult = await collection.updateOne(
    { _id: ObjectId(_id) },
    { $set: { numberOfDiscounts } }
  );

  return updateResult;
};

export const updateProductByProductId = async (
  client,
  _id,
  { name, category, price, discount, photo3, photo2, photo1, description }
) => {
  const db = await client.db(dbName);
  const collection = await db.collection("products");

  const updateResult = await collection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        name,
        category,
        price,
        discount,
        photo3,
        photo2,
        photo1,
        description,
      },
    }
  );

  return updateResult;
};
