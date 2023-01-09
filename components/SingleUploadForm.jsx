import Image from "next/image";

const SingleFileUploadForm = ({
  name,
  setFile,
  setPreviewUrl,
  file,
  previewUrl,
}) => {
  const onCancelFile = (e) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const onFileUploadChange = (e) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  return (
    <div
      style={{
        border: "solid 2px 2px solid rgb(68 68 68 / 43%)",
        borderRadius: 25,
      }}
    >
      <form
        className="w-full p-3 border border-gray-500 border-dashed"
        onSubmit={(e) => e.preventDefault()}
        style={{ borderRadius: 25 }}
      >
        <div className="flex flex-col md:flex-row gap-1.5 md:py-4">
          <div className="flex-grow">
            {previewUrl ? (
              <div className="mx-auto w-80">
                <Image
                  alt="file uploader preview"
                  objectFit="cover"
                  src={previewUrl}
                  width={320}
                  height={218}
                  layout="fixed"
                />
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <strong className="text-sm font-medium">
                  انتخاب تصویر محصول
                </strong>
                <input
                  className="block w-0 h-0"
                  name={name}
                  type="file"
                  onChange={onFileUploadChange}
                />
              </label>
            )}
          </div>
          <div className="flex mt-4 md:mt-0 md:flex-col justify-center gap-1.5">
            <button
              disabled={!previewUrl}
              onClick={onCancelFile}
              className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
              style={{ borderRadius: 25, border: "solid 2px #f9b1b1" }}
            >
              <i class="bi bi-camera2"></i> حذف تصویر
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleFileUploadForm;
