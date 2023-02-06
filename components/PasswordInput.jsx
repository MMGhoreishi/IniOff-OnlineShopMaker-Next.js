const PasswordInput = ({
  children,
  passwordHandler,
  passwordEye,
  errorMsg,
}) => {
  return (
    <div className="input-group mb-3 input-group-lg">
      <span
        className="input-group-text"
        style={{
          borderRadius: "0 25px 25px 0",
        }}
      >
        <i className="bi bi-code-square"></i>
      </span>

      {children}
      <span
        className="input-group-text eyePassword"
        style={{
          borderRadius: "25px 0 0 25px",
        }}
        onClick={passwordHandler}
      >
        {passwordEye ? (
          <i className="bi bi-eye-slash-fill"></i>
        ) : (
          <i className="bi bi-eye-fill"></i>
        )}
      </span>
      {errorMsg}
    </div>
  );
};

export default PasswordInput;
