import { toast } from "react-toastify";

export const ValidateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;

  return false;
};

export const validateMinMax = (inputtxt, minlength, maxlength) => {
  const fieldLength = inputtxt.length;
  const mnlen = minlength;
  const mxlen = maxlength;

  if (fieldLength < mnlen || fieldLength > mxlen) return false;
  else return true;
};

export const validateEmptyForm = (objData, objKeys) => {
  for (let i = 0; i < objKeys.length; i++) {
    if (!objData[objKeys[i]]) return true;
  }

  return false;
};

export const uploadImageValidation = (eventHandler) => {
  const fileInput = eventHandler;

  if (!fileInput.files) {
    toast.error("فایلی انتخاب نشده است", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return false;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    toast.error("لیست فایل ها خالی است", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return false;
  }

  const file = fileInput.files[0];

  /** File validation */
  if (!file.type.startsWith("image")) {
    toast.error("لطفا یک تصویر معتبر انتخاب کنید", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return false;
  }

  return file;
};
