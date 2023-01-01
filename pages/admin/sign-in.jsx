import { AddTitle } from "../../components";

const SignIn = () => {
  return (
    <>
      <AddTitle title="ورود به پنل ادمین" />

      <div id="sign-in">
        <section className="dark-cover d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col text-center text-white h2 fw-light mb-5 title-form">
                <i className="bi bi-door-open"></i> ورود به پنل ادمین
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control form-control-lg mb-3"
                  placeholder="نام کاربری"
                />
                <input
                  type="password"
                  className="form-control form-control-lg mb-3"
                  placeholder="رمز عبور"
                />
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-danger btn-block btn-lg"
                  >
                    <i className="bi bi-key-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignIn;
