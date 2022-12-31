import { useRouter } from "next/router";
import { useReducer } from "react";
import { findUserByPN } from "../../../helpers/auth";
import { connectDatabase, findProductById } from "../../../helpers/db-util";
import {
  NothingFound,
  ShowProduct,
  AddOrEditContent,
  AddTitle,
  ModalForDelete,
} from "../../../components";
import { getSession } from "next-auth/react";

const ACTIONS = {
  SAVE_DISCOUNT: "SAVE_DISCOUNT",
  SET_PRODUCT_DISCOUNTS: "SET_PRODUCT_DISCOUNTS",
  SET_PRODUCT: "SET_PRODUCT",
  SET_BTN_CLICKED: "SET_BTN_CLICKED",
  SET_CHECK_USER_PHONENUMBER_IN_DB: "SET_CHECK_USER_PHONENUMBER_IN_DB",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SAVE_DISCOUNT:
      return { ...state, getDiscountToDel: action.payload };
    case ACTIONS.SET_PRODUCT_DISCOUNTS:
      return { ...state, getProductDiscounts: action.R_ProductDiscounts };
    case ACTIONS.SET_PRODUCT:
      return { ...state, getProduct: action.R_Product };
    default:
      return state;
  }
};

const ProductId = ({ product, userData, getShowPermission, statusNumber }) => {
  const [state, dispatch] = useReducer(reducer, {
    getDiscountToDel: 0,
    getProduct: product,
    getProductDiscounts: product ? product.numberOfDiscounts : "",
    getUserInformation: userData,
    getShowPermission,
  });

  const router = useRouter();
  const { productId } = router.query;

  const deleteDiscount = async () => {
    try {
      const allDiscounts = [...state.getProductDiscounts];

      const removedDiscounts = [...state.getProductDiscounts];
      removedDiscounts.splice(state.getDiscountToDel, 1);
      setProductDiscounts(removedDiscounts);

      fetch(`/api/my-shop/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ Discounts: removedDiscounts }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 200) setProductDiscounts(allDiscounts);
      });
    } catch (err) {
      setProductDiscounts(allDiscounts);
      console.log(err.message);
    }
  };

  const saveDiscount = (discount) => {
    dispatch({ type: ACTIONS.SAVE_DISCOUNT, payload: discount });
  };

  const setProductDiscounts = (discounts) => {
    dispatch({
      type: ACTIONS.SET_PRODUCT_DISCOUNTS,
      R_ProductDiscounts: discounts,
    });
  };

  const setProduct = (product) => {
    dispatch({
      type: ACTIONS.SET_PRODUCT,
      R_Product: product,
    });
  };

  switch (state.getShowPermission) {
    case "SignIn":
      return (
        <>
          <AddTitle title={`مدیریت ${state.getProduct.name}`} />
          <section className="text-capitalize mt-5" id="manage-section">
            <>
              <div className="container shadow-lg mt-5">
                <div className="row shadow-lg rounded-3">
                  <a
                    style={{ width: 100 }}
                    href="discount-details.html"
                    target="_blank"
                    class="btn back m-3"
                  >
                    <i class="bi bi-skip-backward-fill"></i>
                  </a>
                  {/* Nav pills */}
                  <ul className="nav nav-pills nav-justified border-top border-danger">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="pill"
                        href="#edit-codes"
                      >
                        مدیریت کدهای تخفیف
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="pill"
                        href="#edit-content"
                      >
                        ویرایش محصول
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="pill"
                        href="#preview"
                      >
                        پیش نمایش
                      </a>
                    </li>
                  </ul>{" "}
                  {/* Tab panes */}{" "}
                  <div className="tab-content py-5">
                    <div className="tab-pane container fade" id="edit-codes">
                      <div className="table-responsive">
                        {state.getProductDiscounts.length > 0 ? (
                          <table className="table table-striped table-bordered table-hover text-center align-middle">
                            <thead className="table-success">
                              <tr>
                                <th>
                                  <i className="bi bi-123"></i> شماره
                                </th>
                                <th>
                                  <i className="bi bi-file-code-fill"></i> کد
                                  تخفیف
                                </th>
                                <th>
                                  <i className="bi bi-trash-fill"></i> حذف کد
                                  تخفیف
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {state.getProductDiscounts.map(
                                (discount, index) => (
                                  <tr key={discount.toString()}>
                                    <td className="fw-bold">{index + 1}</td>
                                    <td>{discount}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-delete"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                        onClick={() => saveDiscount(index)}
                                      >
                                        حذف
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        ) : (
                          <NothingFound text="کد تخفیفی یافت نشد" />
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane text-center container fade"
                      id="edit-content"
                    >
                      <AddOrEditContent
                        showEditBtn={true}
                        addOrEdit="edit"
                        product={state.getProduct}
                        changeProduct={setProduct}
                      />
                    </div>
                    <div className="tab-pane container active" id="preview">
                      <ShowProduct
                        product={state.getProduct}
                        userInformation={state.getUserInformation}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Modal For Delete Form */}
              <ModalForDelete handleDelete={deleteDiscount} />
              {/* End Modal For Delete Form */}
            </>
          </section>
        </>
      );
    case "Not Product":
      return (
        <>
          <AddTitle title="محصول یافت نشد" />
          <NothingFound text="چنین محصولی یافت نشد" />
        </>
      );
    case "Not PhoneNumber":
      return (
        <>
          <AddTitle title="شماره موبایل اشتباه" />
          <NothingFound text="لطفا شماره موبایل خود را به درستی وارد کنید" />
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

export default ProductId;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  let getShowPermission = "Not SignIn";

  if (session) {
    const { userPhoneNumber, productId } = context.params;

    let client = null;
    let product = null;
    let userData = null;
    let statusNumber = 200;

    try {
      client = await connectDatabase();
    } catch (error) {
      statusNumber = 500;
    }

    if (statusNumber != 500) {
      try {
        product = await findProductById(client, productId);
        if (product.length > 0) {
          product = product.map((p) => {
            p._id = p._id.toString();
            return p;
          });

          product = product[0];
        } else {
          getShowPermission = "Not Product";

          client.close();
          return {
            props: {
              getShowPermission,
            },
          };
        }
      } catch {
        getShowPermission = "Not Product";

        client.close();
        return {
          props: {
            getShowPermission,
          },
        };
      }

      try {
        userData = await findUserByPN(client, userPhoneNumber);
        if (userData.length > 0) {
          userData = userData.map((u) => {
            u._id = u._id.toString();
            return u;
          });

          userData = userData[0];

          getShowPermission = "SignIn";

          client.close();
          return {
            props: {
              product,
              userData,
              getShowPermission,
              statusNumber,
            },
          };
        } else {
          getShowPermission = "Not PhoneNumber";

          client.close();
          return {
            props: {
              getShowPermission,
            },
          };
        }
      } catch {
        getShowPermission = "Not PhoneNumber";

        client.close();
        return {
          props: {
            getShowPermission,
          },
        };
      }
    }
    client.close();
  }

  return {
    props: {
      getShowPermission,
    },
  };
};
