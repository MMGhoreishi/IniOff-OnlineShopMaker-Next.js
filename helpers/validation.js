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

export const validateEmptyForm = (...myArray) => {
  const myFieldsOBJ = Object.values(myArray[0]);

  for (let i = 0; i < myFieldsOBJ.length; i++) {
    if (myFieldsOBJ[i] === "") return true;
  }

  return false;
};
