import Image from "next/image";
import { toast } from "react-toastify";
import { uploadImageValidation } from "../helpers/validation";

const SingleFileUploadForm = ({
  name,
  setFile,
  setPreviewUrl,
  file,
  previewUrl,
}) => {
  const onFileUploadChange = async (e) => {
    const myTest = "rrrr";

    fetch(`/api/my-shop/validateProductPhotos/${myTest}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("response.status-pppp>>>>");
      console.log(response.status);
    });

    // await fetch("/api/my-shop/validateProductPhotos", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     fileInputFiles,
    //   }),

    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => {
    //   if (response.status === 200) {
    //     console.log("response.status-ipt>>>>>>");
    //     console.log("---200");
    //     return;
    //   } else {
    //     console.log("response.status-ipt>>>>>>");
    //     console.log("---500");
    //     return;
    //   }
    // });

    const result = uploadImageValidation(e.target);
    if (!result) return;

    const fileInput = e.target;
    const file = fileInput.files[0];

    console.log("ClientSide-fileInput>>>>>");
    console.log(file);

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  const onCancelFile = (e) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <>
      <div>
        {previewUrl ? (
          <Image
            alt="file uploader preview"
            objectFit="cover"
            src={previewUrl}
            width={320}
            height={218}
            layout="fixed"
          />
        ) : (
          <>
            <div>
              <i class="bi bi-camera2" style={{ fontSize: 100 }}></i>
            </div>

            <input
              type="file"
              name={name}
              accept="image/png,image/jpeg"
              onChange={onFileUploadChange}
              id={name}
              hidden
            />
            <label className="upload-label" for={name}>
              <i className="bi bi-camera2"></i> انتخاب تصویر
            </label>
          </>
        )}
      </div>

      <div className="mt-2">
        <button
          className="btn btn-danger"
          disabled={!previewUrl}
          onClick={onCancelFile}
        >
          <i className="bi bi-camera2"></i> حذف تصویر
        </button>
      </div>
    </>
  );
};

export default SingleFileUploadForm;
