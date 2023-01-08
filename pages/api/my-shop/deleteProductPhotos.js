import { getSession } from "next-auth/react";
import { join } from "path";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  // Just after the "Method Not Allowed" code

  try {
    const { myPhotosArray } = req.body;

    const splitUrl = myPhotosArray.url;
    const myArray = splitUrl.split("/");

    const uploadDirFolder = join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/uploads/${myArray[0]}`
    );

    const rimraf = require("rimraf");
    rimraf(uploadDirFolder, () => {
      console.log("$$$$$$done");
    });

    res.status(200).json({
      message: "Delete File successfully.",
    });
    return;
  } catch (error) {
    console.log("#######error2>>>>");
    console.log(error);
    res.status(500).json({ message: error });
    return;
  }
};

export default handler;
