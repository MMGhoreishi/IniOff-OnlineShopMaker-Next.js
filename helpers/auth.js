import { hash, compare } from "bcryptjs";
const dbName = "inioff";

export const hashCode = async (code) => {
  const hashedCode = await hash(code.toString(), 12);
  return hashedCode;
};

export const verifyCode = async (code, hashedCode) => {
  const isValid = await compare(code, hashedCode);
  return isValid;
};

export const findUserByPN = async (client, phoneNumber) => {
  const db = await client.db(dbName);
  const collection = await db.collection("users");
  const filteredUser = await collection.find({ phoneNumber }).toArray();

  return filteredUser;
};

export const findUserByEmail = async (client, email) => {
  const db = await client.db(dbName);
  const collection = await db.collection("users");
  const filteredUser = await collection.find({ email }).toArray();

  return filteredUser;
};

export const updateUserPasswordByEmail = async (client, email, password) => {
  const db = await client.db(dbName);
  const collection = await db.collection("users");

  const updateResult = await collection.updateOne(
    { email },
    {
      $set: {
        password,
      },
    }
  );

  return updateResult;
};

export const updateUserProfileByPhoneNumber = async (
  client,
  { phoneNumber, name, instagram, companyName }
) => {
  const db = await client.db(dbName);
  const collection = await db.collection("users");

  const updateResult = await collection.updateOne(
    { phoneNumber },
    {
      $set: {
        completedProfileInfo: true,
        RevieWbyExperts: "under investigation",
        name,
        instagram,
        companyName,
      },
    }
  );

  return updateResult;
};

export const existingUser = async (
  client,
  name,
  instagram,
  companyName,
  phoneNumber,
  email
) => {
  const db = await client.db(dbName);
  const collection = await db.collection("users");

  const findUserByName = await collection.find({ name }).toArray();
  const findUserByInstagram = await collection.find({ instagram }).toArray();
  const findUserByCompanyName = await collection
    .find({ companyName })
    .toArray();
  const findUserByPhoneNumber = await collection
    .find({ phoneNumber })
    .toArray();
  const findUserByEmail = await collection.find({ email }).toArray();

  if (
    findUserByName.length > 0 ||
    findUserByInstagram.length > 0 ||
    findUserByCompanyName.length > 0 ||
    findUserByPhoneNumber.length > 0 ||
    findUserByEmail.length > 0
  )
    return true;
  else return false;
};
