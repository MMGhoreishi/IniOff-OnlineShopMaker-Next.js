import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const ACTIONS = {
  SET_PRODUCT: "SET_PRODUCT",
  SET_ERR_PRODUCT: "SET_ERR_PRODUCT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCT:
      return { ...state, getProduct: action.product };
    case ACTIONS.SET_ERR_PRODUCT:
      return { ...state, getErrProduct: action.getErrProduct };
    default:
      return state;
  }
};

const AddOrEditContent = ({
  frame1,
  frame2,
  frame3,
  setFrame1,
  setFrame2,
  setFrame3,
  showEditBtn,
  addOrEdit,
  userPhoneNumber,
  product,
  changeProduct,
  removePreview,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    getProduct: {
      name: "",
      numberOfDiscounts: "",
      price: "",
      discount: "",
      description: "",
      photo1: "",
      photo2: "",
      photo3: "",
      category: "",
    },
    getErrProduct: {
      name: false,
      numberOfDiscounts: false,
      price: false,
      discount: false,
      description: false,
      photo1: false,
      photo2: false,
      photo3: false,
      category: false,
    },
  });

  useEffect(() => {
    setProduct(
      addOrEdit === "edit" && {
        ...product,
      }
    );
  }, [product]);

  const editProduct = async () => {
    //Start-Validation
    const frmInputKeys = {
      name: false,
      numberOfDiscounts: false,
      price: false,
      discount: false,
      description: false,
      photo1: false,
      photo2: false,
      photo3: false,
      category: false,
    };
    const result = validateProductFrm(state.getProduct, frmInputKeys);
    const myObjErr = {};
    for (let i = 0; i < result.length; i++) {
      myObjErr[result[i]] = true;
    }
    setErrProduct(myObjErr);
    if (result.length > 0) return;
    //End-Validation

    const previousProduct = product;
    try {
      changeProduct(state.getProduct);

      await fetch(`/api/my-shop/${product._id}`, {
        method: "PUT",
        body: JSON.stringify({ product: state.getProduct }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200)
          toast.success("محصول با موفقیت ویرایش شد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        else {
          changeProduct(previousProduct);

          toast.error("خطایی در ویرایش محصول پیش آمد", {
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
      changeProduct(previousProduct);
      console.log(err.message);
    }
  };

  const addProduct = async () => {
    //Start-Validation
    const frmInputKeys = {
      name: false,
      numberOfDiscounts: false,
      price: false,
      discount: false,
      description: false,
      photo1: false,
      photo2: false,
      photo3: false,
      category: false,
    };
    const result = validateProductFrm(state.getProduct, frmInputKeys);
    const myObjErr = {};
    for (let i = 0; i < result.length; i++) {
      myObjErr[result[i]] = true;
    }
    setErrProduct(myObjErr);
    if (result.length > 0) return;
    //End-Validation

    const allProducts = product ? [...product] : null;
    try {
      const discountsArray = [];
      for (let i = 0; i < state.getProduct.numberOfDiscounts; i++) {
        const discount = Math.floor(Math.random() * 1000000);
        discountsArray.push(discount);
      }

      const objValue = {
        ...state.getProduct,
        ...{
          numberOfDiscounts: discountsArray,
          userPhoneNumber: userPhoneNumber,
          RevieWbyExperts: "under investigation",
          condition: true,
        },
      };

      if (product) changeProduct([...allProducts, objValue]);
      else changeProduct([objValue]);

      await fetch("/api/my-shop", {
        method: "POST",
        body: JSON.stringify({ product: objValue }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 422)
          toast.error("این محصول با این نام از قبل وجود دارد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        if (response.status !== 201 && product) changeProduct(allProducts);

        if (response.status !== 201 && response.status !== 422)
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
    } catch (err) {
      if (product) changeProduct(allProducts);
      console.log(err.message);
    }
  };

  const setProduct = (product) => {
    dispatch({
      type: ACTIONS.SET_PRODUCT,
      product: product,
    });
  };

  const setErrProduct = (getErrProduct) => {
    dispatch({
      type: ACTIONS.SET_ERR_PRODUCT,
      getErrProduct: getErrProduct,
    });
  };

  const setProductInfo = (event) => {
    const name = event.target.name;
    const value =
      name === "photo1" || name === "photo2" || name === "photo3"
        ? /*URL.createObjectURL(event.target.files[0])*/ "portfolio-3.jpg"
        : event.target.value;

    switch (name) {
      case "photo1":
        setFrame1(value);
        break;

      case "photo2":
        setFrame2(value);
        break;

      case "photo3":
        setFrame3(value);
        break;
    }

    setProduct({
      ...state.getProduct,
      [name]: value,
    });
  };

  const validateProductFrm = (objFields, objKeys) => {
    const mixObj = { ...objKeys, ...objFields };

    const myFieldsOBJ = Object.values(mixObj);
    const myFieldsOBJ_KEY = Object.keys(mixObj);

    const errFields = [];

    for (let i = 0; i < myFieldsOBJ_KEY.length; i++) {
      if (!myFieldsOBJ[i]) errFields.push(myFieldsOBJ_KEY[i]);
    }

    return errFields;
  };

  return (
    <>
      <span className="badge required">الزامی</span>
      <div className="input-group mb-3 input-group-lg">
        <span
          className="input-group-text"
          style={{
            borderRadius: "0 25px 25px 0",
          }}
        >
          <i className="bi bi-basket2-fill"></i>
        </span>

        <input
          onChange={setProductInfo}
          value={state.getProduct.name || ""}
          name="name"
          placeholder="نام محصول شما"
          style={{
            borderRadius: "25px 0 0 25px",
          }}
          type="text"
          className="form-control"
        />
      </div>

      {state.getErrProduct !== null && state.getErrProduct.name && (
        <div className="alert alert-danger">نام محصول الزامی است</div>
      )}
      <span className="badge required">الزامی</span>
      <div className="input-group mb-3 input-group-lg">
        <span
          className="input-group-text"
          style={{
            borderRadius: "0 25px 25px 0",
          }}
        >
          <i className="bi bi-card-checklist"></i>
        </span>
        <select
          value={state.getProduct.category || ""}
          style={{
            borderRadius: "25px 0 0 25px",
          }}
          className="form-select"
          name="category"
          onChange={setProductInfo}
        >
          <option value="" disabled selected hidden>
            دسته محصول شما
          </option>
          <option value="تجارت و صنعت">تجارت و صنعت</option>
          <option value="اتومبیل و وسایل نقلیه">اتومبیل و وسایل نقلیه</option>
          <option value="الکترونیکی">الکترونیکی</option>
          <option value="سلامت و زیبایی">سلامت و زیبایی</option>
          <option value="سرگرمی و ورزش و کودکان">سرگرمی و ورزش و کودکان</option>
          <option value="لوازم خانگی">لوازم خانگی</option>
          <option value="شغل ها"> شغل ها</option>
          <option value="دیگر موارد">دیگر موارد</option>
          <option value="حیوانات">حیوانات</option>
          <option value="ویژگی">ویژگی</option>
          <option value="خدمات">خدمات</option>
        </select>
      </div>
      {state.getErrProduct !== null && state.getErrProduct.category && (
        <div className="alert alert-danger">انتخاب دسته محصول الزامی است</div>
      )}
      {!showEditBtn && (
        <>
          <span className="badge required">الزامی</span>
          <div className="input-group mb-3 input-group-lg">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0 25px 25px 0",
              }}
            >
              <i className="bi bi-123"></i>
            </span>
            <input
              placeholder="تعداد کدهای تخفیف"
              style={{
                borderRadius: "25px 0 0 25px",
              }}
              type="number"
              className="form-control"
              name="numberOfDiscounts"
              onChange={setProductInfo}
            />
          </div>
          {state.getErrProduct !== null &&
            state.getErrProduct.numberOfDiscounts && (
              <div className="alert alert-danger">
                تعداد کدهای تخفیف الزامی است
              </div>
            )}
        </>
      )}
      <span className="h5">
        <i className="bi bi-cash-stack"></i> قیمت محصول شما:{" "}
      </span>
      <div className="row mt-3">
        <div className="col-lg-6">
          <span className="badge required">الزامی</span>
          <div className="input-group mb-3 input-group-lg">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0 25px 25px 0",
              }}
            >
              <i class="bi bi-cash mx-1"></i> (تومان){" "}
            </span>
            <input
              placeholder="قیمت بدون تخفیف"
              style={{
                borderRadius: "25px 0 0 25px",
              }}
              type="number"
              className="form-control"
              value={state.getProduct.price || ""}
              name="price"
              onChange={setProductInfo}
            />
          </div>

          {state.getErrProduct !== null && state.getErrProduct.price && (
            <div className="alert alert-danger">قیمت بدون تخفیف الزامی است</div>
          )}
        </div>
        <div className="col-lg-6">
          <span className="badge required">الزامی</span>
          <div className="input-group mb-3 input-group-lg">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0 25px 25px 0",
              }}
            >
              <i class="bi bi-cash mx-1"></i> (تومان){" "}
            </span>
            <input
              placeholder="قیمت با تخفیف"
              style={{
                borderRadius: "25px 0 0 25px",
              }}
              type="number"
              className="form-control"
              value={state.getProduct.discount || ""}
              name="discount"
              onChange={setProductInfo}
            />
          </div>
          {state.getErrProduct !== null && state.getErrProduct.discount && (
            <div className="alert alert-danger">قیمت با تخفیف الزامی است</div>
          )}
        </div>
      </div>
      <span className="h5">
        <i className="bi bi-camera-fill"></i> تصاویر محصول شما:{" "}
      </span>
      <div className="row mt-3">
        <div className="col-lg-4">
          <span className="badge required">الزامی</span>
          <div className="input-group mb-3 input-group-lg">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0 25px 25px 0",
              }}
            >
              <i className="bi bi-cloud-plus-fill"></i>
            </span>
            <input
              className="form-control"
              style={{
                borderRadius: "25px 0 0 25px",
              }}
              type="file"
              id="formFile"
              name="photo1"
              onChange={setProductInfo}
            />
          </div>
          {state.getErrProduct !== null && state.getErrProduct.photo1 && (
            <div className="alert alert-danger">تصویر محصول الزامی است</div>
          )}
          <img id="frame1" src={frame1} className="img-fluid mb-3" />
        </div>
        <div className="col-lg-4">
          <span className="badge required">الزامی</span>
          {/* <span className="badge optional">اختیاری</span> */}
          <div className="input-group mb-3 input-group-lg">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0 25px 25px 0",
              }}
            >
              <i className="bi bi-cloud-plus-fill"></i>
            </span>
            <input
              className="form-control"
              style={{
                borderRadius: "25px 0 0 25px",
              }}
              type="file"
              id="formFile"
              name="photo2"
              onChange={setProductInfo}
            />
          </div>
          {state.getErrProduct !== null && state.getErrProduct.photo2 && (
            <div className="alert alert-danger">تصویر محصول الزامی است</div>
          )}
          <img id="frame2" src={frame2} className="img-fluid mb-3" />
        </div>
        <div className="col-lg-4">
          <span className="badge required">الزامی</span>
          {/* <span className="badge optional">اختیاری</span> */}
          <div className="input-group mb-3 input-group-lg">
            <span
              className="input-group-text"
              style={{
                borderRadius: "0 25px 25px 0",
              }}
            >
              <i className="bi bi-cloud-plus-fill"></i>
            </span>
            <input
              className="form-control"
              style={{
                borderRadius: "25px 0 0 25px",
              }}
              type="file"
              id="formFile"
              name="photo3"
              onChange={setProductInfo}
            />
          </div>
          {state.getErrProduct !== null && state.getErrProduct.photo3 && (
            <div className="alert alert-danger">تصویر محصول الزامی است</div>
          )}
          <img id="frame3" src={frame3} className="img-fluid mb-3" />
        </div>
      </div>
      <span className="badge required">الزامی</span>
      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="توضیحات محصول شما"
        value={state.getProduct.description || ""}
        name="description"
        onChange={setProductInfo}
      />
      {state.getErrProduct !== null && state.getErrProduct.description && (
        <div className="alert alert-danger">توضیحات محصول الزامی است</div>
      )}
      {showEditBtn ? (
        <div class="d-grid mt-3">
          <button
            type="submit"
            class="btn btn-edit btn-block btn-lg"
            onClick={editProduct}
          >
            <i class="bi bi-pencil-square"></i> ویرایش
          </button>
        </div>
      ) : (
        <>
          {/* Modal footer */}
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-add-new-discount"
              data-bs-dismiss="modal"
              onClick={addProduct}
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
        </>
      )}
    </>
  );
};

export default AddOrEditContent;
