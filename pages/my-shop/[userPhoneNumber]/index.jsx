import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useReducer } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";
import {
  NothingFound,
  AddOrEditContent,
  AddTitle,
  ModalForDelete,
  PasswordInput,
} from "../../../components";
import { findUserByEmail } from "../../../helpers/auth";
import {
  connectDatabase,
  findProductsByUserPN,
} from "../../../helpers/db-util";
import { getSession } from "next-auth/react";

const ACTIONS = {
  SET_FRAME1: "SET_FRAME1",
  SET_FRAME2: "SET_FRAME2",
  SET_FRAME3: "SET_FRAME3",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_BTN_CLICKED: "SET_BTN_CLICKED",
  SET_PRODUCT_ID: "SET_PRODUCT_ID",
  SET_PROFILE_INFO: "SET_PROFILE_INFO",
  SET_PROFILE_VIEW: "SET_PROFILE_VIEW",
  SET_OLD_PASSWORD: "SET_OLD_PASSWORD",
  SET_NEW_PASSWORD: "SET_NEW_PASSWORD",
  SET_OLD_PASSWORD_EYE: "SET_OLD_PASSWORD_EYE",
  SET_NEW_PASSWORD_EYE: "SET_NEW_PASSWORD_EYE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FRAME1:
      return { ...state, frame1: action.photo };
    case ACTIONS.SET_FRAME2:
      return { ...state, frame2: action.photo };
    case ACTIONS.SET_FRAME3:
      return { ...state, frame3: action.photo };
    case ACTIONS.SET_PRODUCTS:
      return { ...state, getProducts: action.products };
    case ACTIONS.SET_BTN_CLICKED:
      return { ...state, btnClicked: action.clicked };
    case ACTIONS.SET_PRODUCT_ID:
      return { ...state, getProductId: action.productId };
    case ACTIONS.SET_PROFILE_INFO:
      return { ...state, getProfileInfo: action.profileInfo };
    case ACTIONS.SET_PROFILE_VIEW:
      return { ...state, profileView: action.text };
    case ACTIONS.SET_OLD_PASSWORD:
      return { ...state, oldPassword: action.oldPassword };
    case ACTIONS.SET_NEW_PASSWORD:
      return { ...state, newPassword: action.newPassword };
    case ACTIONS.SET_OLD_PASSWORD_EYE:
      return { ...state, oldPasswordEye: action.oldPasswordEye };
    case ACTIONS.SET_NEW_PASSWORD_EYE:
      return { ...state, newPasswordEye: action.newPasswordEye };
    default:
      return state;
  }
};

const UserPN = ({
  statusNumber,
  products,
  userData,
  userStatus,
  checkUserPhoneNumberInDb,
}) => {
  const router = useRouter();
  const { userPhoneNumber } = router.query;

  const [state, dispatch] = useReducer(reducer, {
    getProducts: products,
    getUserStatus: userStatus,
    btnClicked: false,
    getProductId: 0,
    getProfileInfo: userData,
    checkUserPhoneNumberInDb,
    profileView: "edit-profile",
    frame1: "/assets/img/preview.png",
    frame2: "/assets/img/preview.png",
    frame3: "/assets/img/preview.png",
    oldPassword: "",
    newPassword: "",
    oldPasswordEye: true,
    newPasswordEye: true,
  });

  const setNewPasswordEye = () => {
    const newPasswordEye = !state.newPasswordEye;
    dispatch({
      type: ACTIONS.SET_NEW_PASSWORD_EYE,
      newPasswordEye,
    });
  };

  const setOldPasswordEye = () => {
    const oldPasswordEye = !state.oldPasswordEye;
    dispatch({
      type: ACTIONS.SET_OLD_PASSWORD_EYE,
      oldPasswordEye,
    });
  };

  const setProfileView = (text) => {
    dispatch({
      type: ACTIONS.SET_PROFILE_VIEW,
      text,
    });
  };

  const deleteProductHandle = () => {
    const allProducts = [...state.getProducts];
    try {
      const updatedProducts = state.getProducts.filter(
        (c) => c._id !== state.getProductId
      );
      setProducts(updatedProducts);

      fetch(`/api/my-shop`, {
        method: "DELETE",
        body: JSON.stringify({ productId: state.getProductId }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 200) {
          setProducts(allProducts);
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
    } catch (err) {
      setProducts(allProducts);
      console.log(err.message);
    }
  };

  const updateProfileInfo = (event) => {
    event.preventDefault();

    fetch(`/api/my-shop`, {
      method: "PUT",
      body: JSON.stringify({ profileInfo: state.getProfileInfo }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200)
        toast.success(
          "تبریک ویرایش موفقیت آمیز بود بنابراین حساب شما تحت بررسی کارشناسان می باشد",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      else
        toast.error("خطایی رخ داد", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    });
  };

  const setProducts = (products) => {
    dispatch({
      type: ACTIONS.SET_PRODUCTS,
      products,
    });
  };

  const setBtnClicked = (clicked) => {
    dispatch({
      type: ACTIONS.SET_BTN_CLICKED,
      clicked,
    });
  };
  const setProductId = (productId) => {
    dispatch({
      type: ACTIONS.SET_PRODUCT_ID,
      productId,
    });
  };

  const setProfileInfo = (profileInfo) => {
    dispatch({
      type: ACTIONS.SET_PROFILE_INFO,
      profileInfo,
    });
  };

  const setFrame1 = (photo) => {
    dispatch({
      type: ACTIONS.SET_FRAME1,
      photo,
    });
  };

  const setFrame2 = (photo) => {
    dispatch({
      type: ACTIONS.SET_FRAME2,
      photo,
    });
  };

  const setFrame3 = (photo) => {
    dispatch({
      type: ACTIONS.SET_FRAME3,
      photo,
    });
  };

  const handleProfileInfo = (event) => {
    setProfileInfo({
      ...state.getProfileInfo,
      [event.target.name]: event.target.value,
    });
  };

  const saveProductId = (productId) => {
    setProductId(productId);
  };

  const removePreview = () => {
    setFrame1("/assets/img/preview.png");
    setFrame2("/assets/img/preview.png");
    setFrame3("/assets/img/preview.png");
  };

  const setOldPassword = (oldPassword) => {
    dispatch({
      type: ACTIONS.SET_OLD_PASSWORD,
      oldPassword: oldPassword.target.value,
    });
  };

  const setNewPassword = (newPassword) => {
    dispatch({
      type: ACTIONS.SET_NEW_PASSWORD,
      newPassword: newPassword.target.value,
    });
  };

  const changePasswordHandler = async (event) => {
    event.preventDefault();

    const { oldPassword, newPassword } = state;

    if (!oldPassword || !newPassword) {
      toast.error("لطفا تمام فیلدها را پر کنید", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    fetch("/api/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      switch (response.status) {
        case 200:
          toast.success("با موفقیت رمز عبور تغییر کرد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        case 401:
          toast.error("شما اهراز هویت نشده اید", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        case 500:
          toast.error("مشکلی پیش آمد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        case 404:
          toast.error("چنین کاربری یافت نشد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        case 403:
          toast.error("پسورد فعلی شما با پسورد در دیتابس مطابقت ندارد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
      }
    });
  };

  switch (state.checkUserPhoneNumberInDb) {
    case "Confirmed":
      return (
        <>
          <AddTitle title={`فروشگاه ${state.getProfileInfo.name}`} />

          <section className="text-capitalize mt-5" id="myShop-section">
            <div className="container shadow-lg mt-5">
              <div className="row shadow-lg rounded-3">
                {" "}
                {/* Nav pills */}{" "}
                <ul className="nav nav-pills nav-justified border-top border-danger">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="pill"
                      href="#edit-your-profile-shop"
                    >
                      پروفایل فروشگاه من
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="pill"
                      href="#discounts"
                    >
                      فروشگاه من
                    </a>
                  </li>
                </ul>{" "}
                {/* Tab panes */}{" "}
                <div className="tab-content py-5">
                  <div
                    className="tab-pane container fade"
                    id="edit-your-profile-shop"
                  >
                    <div className="row  mb-3">
                      <div className="col-md-6">
                        <div class="d-grid">
                          <button
                            style={{
                              backgroundColor:
                                state.profileView === "edit-profile" &&
                                "#67b129",
                            }}
                            type="button"
                            class="btn btn-success btn-block "
                            onClick={() => setProfileView("edit-profile")}
                          >
                            <i class="bi bi-card-checklist"></i> ویرایش اطلاعات
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="d-grid">
                          <button
                            style={{
                              backgroundColor:
                                state.profileView === "change-password" &&
                                "#d8d844",
                            }}
                            type="button"
                            class="btn btn-warning btn-block"
                            onClick={() => setProfileView("change-password")}
                          >
                            <i class="bi bi-card-checklist"></i> تغییر رمز عبور
                          </button>
                        </div>
                      </div>
                    </div>
                    {state.profileView === "edit-profile" ? (
                      <form onSubmit={updateProfileInfo}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-group mb-3 input-group-lg">
                              <span
                                className="input-group-text"
                                style={{
                                  borderRadius: "0 25px 25px 0",
                                }}
                              >
                                <i className="bi bi-person-fill"></i>
                              </span>
                              <input
                                placeholder="نام و نام خانوادگی"
                                style={{
                                  borderRadius: "25px 0 0 25px",
                                }}
                                type="text"
                                className="form-control"
                                onChange={handleProfileInfo}
                                name="name"
                                value={state.getProfileInfo.name}
                              />
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                              <span
                                className="input-group-text"
                                style={{
                                  borderRadius: "0 25px 25px 0",
                                }}
                              >
                                <i className="bi bi-instagram"></i>
                              </span>
                              <input
                                placeholder="آیدی اینستاگرام شما"
                                style={{
                                  borderRadius: "25px 0 0 25px",
                                }}
                                type="text"
                                className="form-control"
                                onChange={handleProfileInfo}
                                name="instagram"
                                value={state.getProfileInfo.instagram}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-group mb-3 input-group-lg">
                              <span
                                className="input-group-text"
                                style={{
                                  borderRadius: "0 25px 25px 0",
                                }}
                              >
                                <i className="bi bi-building"></i>
                              </span>
                              <input
                                placeholder="نام شرکت شما"
                                style={{
                                  borderRadius: "25px 0 0 25px",
                                }}
                                type="text"
                                className="form-control"
                                onChange={handleProfileInfo}
                                name="companyName"
                                value={state.getProfileInfo.companyName}
                              />
                            </div>
                            <div className="d-grid">
                              <button
                                type="submit"
                                className="btn btn-edit-profile btn-block btn-lg"
                              >
                                <i className="bi bi-pencil-square"></i> ویرایش
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={changePasswordHandler}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-group mb-3 input-group-lg">
                              <PasswordInput
                                passwordHandler={setOldPasswordEye}
                                passwordEye={state.oldPasswordEye}
                              >
                                <input
                                  placeholder="رمز عبور فعلی"
                                  style={{
                                    borderRadius: 0,
                                  }}
                                  type={
                                    state.oldPasswordEye ? "password" : "text"
                                  }
                                  className="form-control"
                                  onChange={setOldPassword}
                                  name="old-password"
                                  value={state.oldPassword}
                                />
                              </PasswordInput>
                            </div>
                            <div className="input-group mb-3 input-group-lg">
                              <PasswordInput
                                passwordHandler={setNewPasswordEye}
                                passwordEye={state.newPasswordEye}
                              >
                                <input
                                  placeholder="رمز عبور جدید"
                                  style={{
                                    borderRadius: 0,
                                  }}
                                  type={
                                    state.newPasswordEye ? "password" : "text"
                                  }
                                  className="form-control"
                                  onChange={setNewPassword}
                                  name="new-password"
                                  value={state.newPassword}
                                />
                              </PasswordInput>
                            </div>
                            <div className="d-grid">
                              <button
                                type="submit"
                                className="btn btn-edit-profile btn-block btn-lg"
                              >
                                <i class="bi bi-gear-wide-connected"></i> تغییر
                                رمز عبور
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="tab-pane container active" id="discounts">
                    {state.getUserStatus === 1 && (
                      <div
                        class="alert alert-warning text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        <div className="row">
                          <div className="col-12 text-center">
                            <Image
                              className="rounded-circle"
                              src="/assets/img/review-by-experts.gif"
                              alt="review-by-experts"
                              width={297}
                              height={285}
                            />
                          </div>
                        </div>
                        فروشگاه شما تحت بررسی کارشناسان است بنابراین لطفا صبر
                        کنید
                      </div>
                    )}
                    {state.getUserStatus === 2 && (
                      <div
                        class="alert alert-danger text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        <div className="row">
                          <div className="col-12 text-center">
                            <Image
                              src="/assets/img/close.png"
                              alt="review-by-experts"
                              width={130}
                              height={130}
                            />
                          </div>
                        </div>
                        متاسفانه فروشگاه شما توسط کارشناسان تایید نشد بنابراین
                        دوباره تلاش برای ساخت فروشگاه نمایید و مشکلات ذکر شده در
                        لیست پایین را رفع نمایید تا فرشگاه شما مورد تایید قرار
                        گیرد
                        <ul class="list-group mt-3 p-0">
                          <li class="list-group-item">نام شرکت مناسب نیست</li>
                          <li class="list-group-item">
                            تصویر شرکت مناسب نیست از تصویر بهتری استفاده کنید
                          </li>
                        </ul>
                      </div>
                    )}
                    {state.getUserStatus === 3 && (
                      <>
                        <button
                          type="button"
                          className="btn btn-show-modal-new-discount mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#addEditModal"
                        >
                          <i className="bi bi-file-earmark-plus"></i> اضافه کردن
                          محصول جدید
                        </button>

                        {state.getProducts &&
                        Object.keys(state.getProducts).length > 0 ? (
                          <>
                            <div className="table-responsive">
                              <table
                                className="table table-striped table-bordered table-hover text-center align-middle"
                                id="discounts-table"
                              >
                                <thead className="table-success">
                                  <tr>
                                    <th>
                                      <i className="bi bi-123"></i>
                                      شماره
                                    </th>
                                    <th>
                                      <i class="bi bi-camera2"></i> تصویر
                                    </th>
                                    <th>
                                      <i className="bi bi-activity"></i> نام
                                    </th>
                                    <th>
                                      <i className="bi bi-alarm"></i> وضعیت
                                    </th>
                                    <th>
                                      <i className="bi bi-alarm"></i> وضعیت
                                      بررسی توسط کارشناسان
                                    </th>
                                    <th>
                                      <i class="bi bi-trash-fill"></i> حذف محصول
                                    </th>
                                    <th>
                                      <i className="bi bi-pencil-fill"></i>{" "}
                                      مدیریت محصول
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {state.getProducts.map((product, index) => {
                                    let keyId;
                                    if (product._id)
                                      keyId = product._id.toString();
                                    else
                                      keyId = Math.floor(
                                        Math.random() * 1000000
                                      ).toString();

                                    return (
                                      <tr key={keyId}>
                                        <td className="fw-bold">{index + 1}</td>
                                        <td>
                                          <Image
                                            src={`/assets/img/product-photos/${product.photo1}`}
                                            alt={product.name}
                                            width={80}
                                            height={60}
                                          />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>
                                          <span
                                            className={classNames(
                                              "badge",
                                              "text-uppercase",
                                              {
                                                available: product.condition,
                                                unavailable: !product.condition,
                                              }
                                            )}
                                          >
                                            {product.condition
                                              ? "موجود"
                                              : "ناموجود"}
                                          </span>
                                        </td>
                                        <td
                                          className={classNames("fw-bold", {
                                            "text-success":
                                              product.RevieWbyExperts ===
                                              "confirmed",
                                            "text-danger":
                                              product.RevieWbyExperts ===
                                              "not confirmed",
                                            "text-warning":
                                              product.RevieWbyExperts ===
                                              "under investigation",
                                          })}
                                        >
                                          {product.RevieWbyExperts ===
                                            "confirmed" && "تایید شده"}
                                          {product.RevieWbyExperts ===
                                            "not confirmed" && "رد شده"}
                                          {product.RevieWbyExperts ===
                                            "under investigation" &&
                                            "تحت بررسی"}
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            class="btn btn-delete"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteModal"
                                            onClick={() =>
                                              saveProductId(product._id)
                                            }
                                          >
                                            حذف
                                          </button>
                                        </td>
                                        <td>
                                          <Link
                                            href={{
                                              pathname:
                                                "/my-shop/[userPhoneNumber]/[productId]",
                                              query: {
                                                userPhoneNumber:
                                                  userPhoneNumber,
                                                productId: product._id,
                                              },
                                            }}
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-edit"
                                            >
                                              مدیریت
                                            </button>
                                          </Link>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>{" "}
                            <ul className="pagination pagination-lg justify-content-center">
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  Previous
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  1
                                </a>
                              </li>
                              <li className="page-item active">
                                <a className="page-link" href="#">
                                  2
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  3
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  Next
                                </a>
                              </li>
                            </ul>{" "}
                          </>
                        ) : (
                          <NothingFound text="محصولی موجود نیست اما شما می توانید محصول اضافه کنید" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Start Modal For Delete Form */}
            <ModalForDelete handleDelete={deleteProductHandle} />
            {/* End Modal For Delete Form */}

            {/* Start Modal For Edit/Add Form */}
            <div className="modal fade" id="addEditModal">
              <div className="modal-dialog modal-dialog-scrollable modal-xl modal-dialog-centered">
                <div className="modal-content">
                  {/* Modal Header */}
                  <div className="modal-header">
                    <h4 className="modal-title">
                      <i className="bi bi-file-earmark-plus"></i> اضافه کردن
                      محصول
                    </h4>
                    <button
                      type="button"
                      className="btn-close m-0"
                      data-bs-dismiss="modal"
                      onClick={removePreview}
                    ></button>
                  </div>
                  {/* Modal body */}
                  <div className="modal-body text-center">
                    <AddOrEditContent
                      frame1={state.frame1}
                      frame2={state.frame2}
                      frame3={state.frame3}
                      setFrame1={setFrame1}
                      setFrame2={setFrame2}
                      setFrame3={setFrame3}
                      addOrEdit="add"
                      btnClicked={state.btnClicked}
                      setBtnClicked={setBtnClicked}
                      userPhoneNumber={userPhoneNumber}
                      product={state.getProducts}
                      changeProduct={setProducts}
                    />
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer justify-content-center">
                    <button
                      type="button"
                      className="btn btn-add-new-discount"
                      data-bs-dismiss="modal"
                      onClick={() => setBtnClicked(true)}
                    >
                      ثبت محصول
                    </button>
                    <button
                      type="button"
                      className="btn btn-cancel"
                      data-bs-dismiss="modal"
                      onClick={removePreview}
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* End Modal For Edit/Add Form */}
          </section>
        </>
      );
    case "Not Confirmed":
      return (
        <>
          <AddTitle title="اشتباه بودن شماره موبایل" />
          <NothingFound text="متاسفانه شماره موبایل در آدرس بار مرورگر با شماره موبایلی که با آن در سایت ثبت نام کردید مطابقت ندارد بنابراین لطفا شماره موبایل درستی را وارد کنید" />
        </>
      );
    case "Not SignIn":
      return (
        <>
          <AddTitle title="اهراز هویت" />
          <NothingFound text="لطفا در سایت ورود کنید و درصورت نداشتن حساب کاربری (فروشگاه) لطفا ثبت نام کنید" />
        </>
      );
  }
};

export default UserPN;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  let checkUserPhoneNumberInDb = "Not Confirmed";
  if (session) {
    const { userPhoneNumber } = context.params;

    let client = null;
    let products = null;
    let userData = null;
    let userStatus = null;
    let statusNumber = 200;

    try {
      client = await connectDatabase();
    } catch (error) {
      statusNumber = 500;
    }

    if (statusNumber != 500)
      try {
        const { email } = session.user;
        const userDataFetch = await findUserByEmail(client, email);

        if (userDataFetch.length > 0) {
          userData = userDataFetch.map((user) => {
            user._id = user._id.toString();
            return user;
          });
          userData = userDataFetch[0];

          if (userPhoneNumber === userData.phoneNumber) {
            checkUserPhoneNumberInDb = "Confirmed";

            switch (userData.RevieWbyExperts) {
              case "under investigation":
                userStatus = 1;
                break;
              case "not confirmed":
                userStatus = 2;
                break;
              case "confirmed":
                userStatus = 3;
                break;
            }

            products = await findProductsByUserPN(client, userPhoneNumber);
            if (products.length > 0)
              products = products.map((p) => {
                p._id = p._id.toString();
                return p;
              });
            else products = null;
          }
        } else userData = null;
      } catch (error) {
        statusNumber = 500;
      }

    client.close();

    return {
      props: {
        statusNumber,
        products,
        userData,
        userStatus,
        checkUserPhoneNumberInDb,
      },
    };
  }
  checkUserPhoneNumberInDb = "Not SignIn";

  return {
    props: {
      checkUserPhoneNumberInDb,
    },
  };
};
