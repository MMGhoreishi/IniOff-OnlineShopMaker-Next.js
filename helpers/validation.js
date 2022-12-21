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
