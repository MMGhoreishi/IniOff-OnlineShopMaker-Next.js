import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { AddTitle, PasswordInput } from "../../components";
import { getSession } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ACTIONS = {
  SET_NEW_PASSWORD_EYE: "SET_NEW_PASSWORD_EYE",
  SET_REPEATED_PASSWORD_EYE: "SET_REPEATED_PASSWORD_EYE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NEW_PASSWORD_EYE:
      return { ...state, newPasswordEye: action.newPasswordEye };
    case ACTIONS.SET_REPEATED_PASSWORD_EYE:
      return { ...state, repeatedPasswordEye: action.repeatedPasswordEye };
    default:
      return state;
  }
};

const SignUp = ({ session }) => {
  const [state, dispatch] = useReducer(reducer, {
    newPasswordEye: true,
    repeatedPasswordEye: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (session !== "Not-Entered") userStatus();
  }, []);

  const userStatus = async () => {
    const { email } = session;

    await fetch(`/api/auth/findUserByEmail/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        router.replace({
          pathname: "/my-shop/[phoneNumber]",
          query: { phoneNumber: data.userData.phoneNumber },
        });
      });
  };

  const setNewPasswordEye = () => {
    const newPasswordEye = !state.newPasswordEye;
    dispatch({
      type: ACTIONS.SET_NEW_PASSWORD_EYE,
      newPasswordEye,
    });
  };

  const setRepeatedPasswordEye = () => {
    const repeatedPasswordEye = !state.repeatedPasswordEye;
    dispatch({
      type: ACTIONS.SET_REPEATED_PASSWORD_EYE,
      repeatedPasswordEye,
    });
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("نام و نام خانوادگی ضروری است"),
    instagram: Yup.string().required("آیدی اینستاگرام ضروری است"),
    companyName: Yup.string().required("نام شرکت ضروری است"),
    phoneNumber: Yup.string()
      .required(" شماره موبایل ضروری است")
      .matches(phoneRegExp, "شماره موبایل نامعتبر است"),
    email: Yup.string()
      .email("فرمت ایمیل نامعتبر است")
      .required("ایمیل ضروری است"),
    password: Yup.string()
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .max(16, "رمز عبور باید حداکثر 16 کاراکتر باشد")
      .required("رمز عبور ضروری است"),
    repeatedPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "فیلد رمز عبور و فیلد تکرار رمز عبور مطابقت ندارند"
      )
      .min(8, "تکرار رمز عبور باید حداقل 8 کاراکتر باشد")
      .max(16, "تکرار رمز عبور باید حداکثر 16 کاراکتر باشد")
      .required("تکرار رمز عبور ضروری است"),
  });

  const createNewUser = async (values, { resetForm }) => {
    const {
      name,
      instagram,
      companyName,
      phoneNumber,
      email,
      password,
      repeatedPassword,
    } = values;

    await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        name,
        instagram,
        companyName,
        phoneNumber,
        email,
        password,
        repeatedPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      switch (response.status) {
        case 422:
          toast.error("چنین کاربری از قبل وجود دارد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        case 201:
          toast.success("شما با موفقیت ثبت نام کردید", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          resetForm({ values: "" });
          break;
        default:
          toast.error("خطایی رخ داد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
    });
  };

  return (
    <>
      {" "}
      <AddTitle title="ساخت فروشگاه" />
      <section class="inner-page mt-5" id="login-register-section">
        <div class="container shadow-lg mt-5 py-5">
          <div class="row">
            <div class="col-md-6">
              <h2 class="mb-5 fw-bold text-center">ساخت فروشگاه شما</h2>

              <Formik
                initialValues={{
                  name: "",
                  instagram: "",
                  companyName: "",
                  phoneNumber: "",
                  email: "",
                  password: "",
                  repeatedPassword: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={createNewUser}
              >
                {({ touched, errors, isSubmitting, values }) =>
                  !isSubmitting ? (
                    <Form>
                      <div class="input-group mb-3 input-group-lg">
                        <span
                          class="input-group-text"
                          style={{ borderRadius: "0 25px 25px 0" }}
                        >
                          <i class="bi bi-person-circle"></i>
                        </span>

                        <Field
                          type="text"
                          name="name"
                          placeholder="نام و نام خانوادگی"
                          autocomplete="off"
                          style={{
                            borderRadius: "25px 0 0 25px",
                          }}
                          className={`form-control
                          ${touched.name && errors.name ? "is-invalid" : ""}`}
                        />

                        <ErrorMessage
                          component="div"
                          name="name"
                          className="invalid-feedback"
                        />
                      </div>

                      <div class="input-group mb-3 input-group-lg">
                        <span
                          class="input-group-text"
                          style={{ borderRadius: "0 25px 25px 0" }}
                        >
                          <i class="bi bi-instagram"></i>
                        </span>

                        <Field
                          type="text"
                          name="instagram"
                          placeholder="آیدی اینستاگرام"
                          autocomplete="off"
                          style={{
                            borderRadius: "25px 0 0 25px",
                          }}
                          className={`form-control
                          ${
                            touched.instagram && errors.instagram
                              ? "is-invalid"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          component="div"
                          name="instagram"
                          className="invalid-feedback"
                        />
                      </div>

                      <div class="input-group mb-3 input-group-lg">
                        <span
                          class="input-group-text"
                          style={{ borderRadius: "0 25px 25px 0" }}
                        >
                          <i class="bi bi-building"></i>
                        </span>

                        <Field
                          type="text"
                          name="companyName"
                          placeholder="نام شرکت شما"
                          autocomplete="off"
                          style={{
                            borderRadius: "25px 0 0 25px",
                          }}
                          className={`form-control
                          ${
                            touched.companyName && errors.companyName
                              ? "is-invalid"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          component="div"
                          name="companyName"
                          className="invalid-feedback"
                        />
                      </div>

                      <div class="input-group mb-3 input-group-lg">
                        <span
                          class="input-group-text"
                          style={{ borderRadius: "0 25px 25px 0" }}
                        >
                          <i class="bi bi-telephone-fill"></i>
                        </span>

                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="شماره موبایل شما"
                          autocomplete="off"
                          style={{
                            borderRadius: "25px 0 0 25px",
                          }}
                          className={`form-control
                          ${
                            touched.phoneNumber && errors.phoneNumber
                              ? "is-invalid"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          component="div"
                          name="phoneNumber"
                          className="invalid-feedback"
                        />
                      </div>

                      <div class="input-group mb-3 input-group-lg">
                        <span
                          class="input-group-text"
                          style={{
                            borderRadius: "0 25px 25px 0",
                          }}
                        >
                          <i class="bi bi-envelope-fill"></i>
                        </span>

                        <Field
                          type="text"
                          name="email"
                          placeholder="ایمیل"
                          autocomplete="off"
                          style={{
                            borderRadius: "25px 0 0 25px",
                          }}
                          className={`form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                        />

                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      </div>

                      <div class="input-group mb-3 input-group-lg">
                        <PasswordInput
                          passwordHandler={setNewPasswordEye}
                          passwordEye={state.newPasswordEye}
                          errorMsg={
                            <ErrorMessage
                              component="div"
                              name="password"
                              className="invalid-feedback"
                            />
                          }
                        >
                          <Field
                            type={state.newPasswordEye ? "password" : "text"}
                            name="password"
                            placeholder="رمز عبور"
                            style={{
                              borderRadius: 0,
                            }}
                            className={`form-control
                          ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          />
                        </PasswordInput>
                      </div>

                      <div class="input-group mb-3 input-group-lg">
                        <PasswordInput
                          passwordHandler={setRepeatedPasswordEye}
                          passwordEye={state.repeatedPasswordEye}
                          errorMsg={
                            <ErrorMessage
                              component="div"
                              name="repeatedPassword"
                              className="invalid-feedback"
                            />
                          }
                        >
                          <Field
                            type={
                              state.repeatedPasswordEye ? "password" : "text"
                            }
                            name="repeatedPassword"
                            placeholder="تکرار رمز عبور"
                            style={{
                              borderRadius: 0,
                            }}
                            className={`form-control
                          ${
                            touched.repeatedPassword && errors.repeatedPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          />
                        </PasswordInput>
                      </div>

                      <div class="d-grid">
                        <button
                          type="submit"
                          class="btn btn-login-register btn-block btn-lg"
                        >
                          <i class="bi bi-code-slash"></i> ارسال کد
                        </button>
                      </div>
                    </Form>
                  ) : null
                }
              </Formik>
            </div>
            <div class="col-md-6 text-center">
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image
                  src="/assets/img/receive-phonenumber.jpg"
                  alt="receive-phoneNumber-image"
                  className="img-fluid rounded"
                  width={800}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;

export const getServerSideProps = async (context) => {
  let session = await getSession({ req: context.req });

  if (!session)
    return {
      props: {
        session: "Not-Entered",
      },
    };
  else
    return {
      props: {
        session: { email: session.user.email },
      },
    };
};
