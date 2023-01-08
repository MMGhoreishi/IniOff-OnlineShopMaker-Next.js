import { useEffect, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import SingleFileUploadForm from "./SingleUploadForm";

const ACTIONS = {
  SET_PRODUCT: "SET_PRODUCT",
  SET_ERR_PRODUCT: "SET_ERR_PRODUCT",

  SET_FILE1: "SET_FILE1",
  SET_PREVIEW_URL1: "SET_PREVIEW_URL1",

  SET_FILE2: "SET_FILE2",
  SET_PREVIEW_URL2: "SET_PREVIEW_URL2",

  SET_FILE3: "SET_FILE3",
  SET_PREVIEW_URL3: "SET_PREVIEW_URL3",

  SET_DEL_ARRAY: "SET_DEL_ARRAY",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCT:
      return { ...state, getProduct: action.product };
    case ACTIONS.SET_ERR_PRODUCT:
      return { ...state, getErrProduct: action.getErrProduct };

    case ACTIONS.SET_FILE1:
      return { ...state, file1: action.file };
    case ACTIONS.SET_PREVIEW_URL1:
      return { ...state, previewUrl1: action.previewUrl };

    case ACTIONS.SET_FILE2:
      return { ...state, file2: action.file };
    case ACTIONS.SET_PREVIEW_URL2:
      return { ...state, previewUrl2: action.previewUrl };

    case ACTIONS.SET_FILE3:
      return { ...state, file3: action.file };
    case ACTIONS.SET_PREVIEW_URL3:
      return { ...state, previewUrl3: action.previewUrl };
    case ACTIONS.SET_DEL_ARRAY:
      return { ...state, delArray: action.delArray };
    default:
      return state;
  }
};

const AddOrEditContent = ({
  showEditBtn,
  addOrEdit,
  userPhoneNumber,
  product,
  changeProduct,
}) => {
  const closeRef = useRef();

  const [state, dispatch] = useReducer(reducer, {
    file1: null,
    previewUrl1: null,
    file2: null,
    previewUrl2: null,
    file3: null,
    previewUrl3: null,
    delArray: [],
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

  const setDelArray = (delArray) => {
    dispatch({
      type: ACTIONS.SET_DEL_ARRAY,
      delArray,
    });
  };

  const setFile1 = (file) => {
    dispatch({
      type: ACTIONS.SET_FILE1,
      file,
    });
  };

  const setFile2 = (file) => {
    dispatch({
      type: ACTIONS.SET_FILE2,
      file,
    });
  };

  const setFile3 = (file) => {
    dispatch({
      type: ACTIONS.SET_FILE3,
      file,
    });
  };

  const setPreviewUrl1 = (previewUrl) => {
    dispatch({
      type: ACTIONS.SET_PREVIEW_URL1,
      previewUrl,
    });
  };

  const setPreviewUrl2 = (previewUrl) => {
    dispatch({
      type: ACTIONS.SET_PREVIEW_URL2,
      previewUrl,
    });
  };

  const setPreviewUrl3 = (previewUrl) => {
    dispatch({
      type: ACTIONS.SET_PREVIEW_URL3,
      previewUrl,
    });
  };

  const setProductInfo = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    setProduct({
      ...state.getProduct,
      [name]: value,
    });
  };

  useEffect(() => {
    setProduct(
      addOrEdit === "edit" && {
        ...product,
      }
    );
  }, [product]);

  const editProduct = async () => {
    //Start-Validation
    const frmInputKeys = [
      "name",
      "numberOfDiscounts",
      "price",
      "discount",
      "description",
      "photo1",
      "photo2",
      "photo3",
      "category",
    ];
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

  const onUploadFile = async () => {
    const myFilesArray = ["file1", "file2", "file3"];
    const myFilesUrls = [];
    for (let i = 0; i < myFilesArray.length; i++) {
      const myFile = state[myFilesArray[i]];

      if (!myFile) {
        return;
      }

      try {
        let formData = new FormData();
        formData.append("media", myFile);

        const res = await fetch("/api/my-shop/uploadProductPhotos", {
          method: "POST",
          body: formData,
        });

        const { data, error } = await res.json();

        if (error || !data) {
          alert(error || "Sorry! something went wrong.");
          return false;
        }

        myFilesUrls.push(data);

        console.log("File was uploaded successfylly:", data);
      } catch (error) {
        console.error(error);
        alert("Sorry! something went wrong.");
        return false;
      }
    }

    return myFilesUrls;
  };

  const addProduct = async () => {
    //Start-Validation
    const frmInputKeys = [
      "name",
      "numberOfDiscounts",
      "price",
      "discount",
      "description",
      "photo1",
      "photo2",
      "photo3",
      "category",
    ];

    const myObj = { ...state.getProduct };
    if (state.file1) {
      myObj.photo1 = "ok";
    }

    if (state.file2) {
      myObj.photo2 = "ok";
    }

    if (state.file3) {
      myObj.photo3 = "ok";
    }

    const result = validateProductFrm(myObj, frmInputKeys);
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

      const uploadPhotos = await onUploadFile();

      console.log("uploadPhotos-photos-await>>>>>");
      console.log(uploadPhotos);

      setDelArray(uploadPhotos);

      const objValue = {
        ...myObj,
        ...{
          numberOfDiscounts: discountsArray,
          userPhoneNumber: userPhoneNumber,
          photo1: uploadPhotos[0],
          photo2: uploadPhotos[1],
          photo3: uploadPhotos[2],
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
      }).then(async (response) => {
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

        if (response.status !== 201 && response.status !== 422) {
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

        if (response.status === 201) {
          closeRef.current.click();

          toast.success("محصول با موفقیت اضافه شد", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else await delMethod();
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

  const validateProductFrm = (objData, objKeys) => {
    const errFields = [];
    for (let i = 0; i < objKeys.length; i++) {
      if (!objData[objKeys[i]]) errFields.push(objKeys[i]);
    }

    return errFields;
  };

  const delMethod = async () => {
    await fetch("/api/my-shop/deleteProductPhotos", {
      method: "DELETE",
      body: JSON.stringify({ myPhotosArray: state.delArray[0] }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200)
        toast.success("تصاویر با موفقیت حذف شدند", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        <div className="col-12 mb-3">
          <span className="badge required">الزامی</span>
          <SingleFileUploadForm
            name="photo1"
            setFile={setFile1}
            setPreviewUrl={setPreviewUrl1}
            file={state.file1}
            previewUrl={state.previewUrl1}
          />

          {state.getErrProduct !== null && state.getErrProduct.photo1 && (
            <div className="alert alert-danger">تصویر محصول الزامی است</div>
          )}
        </div>
        <div className="col-12 mb-3">
          <span className="badge required">الزامی</span>
          <SingleFileUploadForm
            name="photo2"
            setFile={setFile2}
            setPreviewUrl={setPreviewUrl2}
            file={state.file2}
            previewUrl={state.previewUrl2}
          />
          {state.getErrProduct !== null && state.getErrProduct.photo2 && (
            <div className="alert alert-danger">تصویر محصول الزامی است</div>
          )}
        </div>
        <div className="col-12 mb-3">
          <span className="badge required">الزامی</span>
          <SingleFileUploadForm
            name="photo3"
            setFile={setFile3}
            setPreviewUrl={setPreviewUrl3}
            file={state.file3}
            previewUrl={state.previewUrl3}
          />
          {state.getErrProduct !== null && state.getErrProduct.photo3 && (
            <div className="alert alert-danger">تصویر محصول الزامی است</div>
          )}
        </div>
      </div>
      <span className="badge required">الزامی</span>
      <textarea
        className="form-control mb-3"
        rows="5"
        style={{ padding: 15 }}
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
              onClick={addProduct}
            >
              ثبت محصول
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              data-bs-dismiss="modal"
              ref={closeRef}
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
