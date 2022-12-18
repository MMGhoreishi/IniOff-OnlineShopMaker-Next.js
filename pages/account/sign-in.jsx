import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { AddTitle, PasswordInput } from "../../components";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ACTIONS = {
  SET_NEW_PASSWORD_EYE: "SET_NEW_PASSWORD_EYE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NEW_PASSWORD_EYE:
      return { ...state, newPasswordEye: action.newPasswordEye };
    default:
      return state;
  }
};

const SignIn = ({ session }) => {

  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, {
    newPasswordEye: true,
  });

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("فرمت ایمیل نامعتبر است")
      .required("ایمیل ضروری است"),
    password: Yup.string()
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .max(16, "رمز عبور باید حداکثر 16 کاراکتر باشد")
      .required("رمز عبور ضروری است"),
  });

  const setNewPasswordEye = () => {
    const newPasswordEye = !state.newPasswordEye;
    dispatch({
      type: ACTIONS.SET_NEW_PASSWORD_EYE,
      newPasswordEye,
    });
  };

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

  const userSignIn = async ({ email, password }) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    const { error } = result;

    if (error) return;

    toast.success("تبریک شما با موفقیت به فروشگاه خود وارد شدید", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    await fetch(`/api/auth/findUserByEmail/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        router.replace({
          pathname: "/my-shop/[userPhoneNumber]",
          query: { userPhoneNumber: data.userData.phoneNumber },
        });
      });
  };

  return (
    <>
      <AddTitle title="ورود به فروشگاه" />
      <section class="inner-page mt-5" id="login-register-section">
        <div class="container shadow-lg mt-5 py-5">
          <div class="row">
            <div class="col-md-6">
              <h2 class="mb-5 fw-bold text-center">ورود به فروشگاه</h2>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={userSignIn}
              >
                {({ touched, errors, isSubmitting, values }) =>
                  !isSubmitting ? (
                    <Form>
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
              <Image
                className="img-fluid rounded"
                src="/assets/img/sms.jpg"
                alt="receive-phoneNumber-image"
                width={800}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;

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
