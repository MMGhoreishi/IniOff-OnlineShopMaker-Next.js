import { uploadImageValidation } from "../../../../helpers/validation";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }

  const { myTest } = req.query;

  console.log("#####myTest-rrr>>>>");
  console.log(myTest);

  // const { fileInputFiles } = req.body;

  // try {
  //   console.log("#########my-new-files-input[0].length-new-www>>>>>");
  //   console.log(fileInputFiles);
  // } catch (e) {
  //   console.log("###my-eeee>>>>");
  //   console.log(e);
  // }

  return;
  const result = uploadImageValidation(ipt1);

  console.log("########ipt1-server-side>>>>>>");
  console.log(ipt1);

  if (!result)
    res.status(500).json({
      message: "A problem happened",
    });
  else
    res.status(200).json({
      message: "Validate File successfully.",
    });
};

export default handler;
