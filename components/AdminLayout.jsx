import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

const ACTIONS = {
  SET_PAGE_NAME: "SET_PAGE_NAME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PAGE_NAME:
      return { ...state, pageName: action.pageName };
    default:
      return state;
  }
};

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, {
    pageName: null,
    baseUrl: "/admin/control-panel/",
  });

  const setPageName = (pageName) => {
    dispatch({
      type: ACTIONS.SET_PAGE_NAME,
      pageName,
    });
  };

  const receivePageNameFromUrl = () => {
    const pageName = router.pathname;
    setPageName(pageName);
  };

  useEffect(() => {
    receivePageNameFromUrl();
  }, []);

  const changePage = (event) => {
    const pageName = event.target.value;

    router.replace({
      pathname: `/admin/control-panel/${pageName}`,
    });
  };

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        <meta content="" name="description" />
        <meta content="" name="keywords" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

        {/* Vendor CSS Files */}
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />

        {/* Template Main CSS File */}
        <link href="/assets/css/style-manager.css" rel="stylesheet" />
      </Head>
      <section id="control-panel">
        <div className="container">
          <div className="row py-5">
            <div className="col-12 text-center text-white h2 fw-light title-form">
              <i className="bi bi-gear-wide-connected"></i> کنترل پنل
            </div>
            <div className="col-12 text-center">
              <button
                type="button"
                className="btn btn-success rounded-pill border border-warning px-3 mt-2"
              >
                <i className="bi bi-cursor"></i> بازدید از سایت
              </button>

              <div className="px-5 pt-3">
                {" "}
                <div
                  className="input-group input-group-lg"
                  style={{
                    borderRadius: 25,
                    border: "#0d6efd 2px solid",
                  }}
                >
                  <span
                    className="input-group-text"
                    style={{ borderRadius: "0 25px 25px 0px" }}
                  >
                    <i className="bi bi-menu-down"></i>
                  </span>
                  <select
                    className="form-select"
                    name="adminPages"
                    onChange={changePage}
                    style={{ borderRadius: "25px 0px 0px 25px" }}
                  >
                    <option value="" selected={state.pageName === null}>
                      صفحه اصلی
                    </option>
                    <option
                      value="read-messages"
                      selected={
                        state.pageName === `${state.baseUrl}read-messages`
                      }
                    >
                      پیام های خوانده شده
                    </option>
                    <option
                      value="unread-messages"
                      selected={
                        state.pageName === `${state.baseUrl}unread-messages`
                      }
                    >
                      پیام های خوانده نشده
                    </option>
                    <option
                      value="verified-sellers"
                      selected={
                        state.pageName === `${state.baseUrl}verified-sellers`
                      }
                    >
                      فروشندگان تایید شده
                    </option>
                    <option
                      value="unverified-sellers"
                      selected={
                        state.pageName === `${state.baseUrl}unverified-sellers`
                      }
                    >
                      فروشندگان تایید نشده
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row manage-row p-5">{children}</div>
        </div>
      </section>

      {/* Start Modal For Delete Form */}
      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog modal-dialog-scrollable modal-sm modal-dialog-centered">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">
                <i className="bi bi-trash-fill"></i> حذف
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal body */}
            <div className="modal-body text-center">
              آیا از حذف آن اطمینان دارید؟
            </div>

            {/* Modal footer */}
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-success">
                بله
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                خیر
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal For Delete Form */}

      {/* Start Modal For Detail */}
      <div className="modal fade" id="detailModal">
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">
                <i className="bi bi-card-text"></i> جزئیات
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal body */}
            <div className="modal-body text-white">
              <div className="row">
                <div className="col-2 bg-warning fw-bold py-2">
                  <i className="bi bi-alarm"></i> وضعیت
                </div>
                <div className="col bg-info py-2">خوانده نشده</div>
              </div>
              <div className="row">
                <div className="col-2 fw-bold second-item-y py-2">
                  <i className="bi bi-activity"></i> عنوان
                </div>
                <div className="col second-item-b py-2">
                  Now I am talking to you
                </div>
              </div>
              <div className="row">
                <div className="col-2 bg-warning fw-bold py-2">
                  <i className="bi bi-calendar-day-fill"></i> تاریخ
                </div>
                <div className="col bg-info py-2">2/21/2020</div>
              </div>
              <div className="row">
                <div className="col-2 fw-bold second-item-y py-2">
                  <i className="bi bi-person-fill"></i> Name
                </div>
                <div className="col second-item-b py-2">Jack Voily</div>
              </div>
              <div className="row">
                <div className="col-2 bg-warning fw-bold py-2">
                  <i className="bi bi-envelope-fill"></i> Email
                </div>
                <div className="col bg-info py-2">mr.mmghoreishi@gmail.com</div>
              </div>
              <div className="row">
                <div className="col-2 fw-bold second-item-y py-2">
                  <i className="bi bi-chat-dots-fill"></i> Message
                </div>
                <div className="col second-item-b py-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae
                  congue mauris rhoncus aenean vel elit scelerisque
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal For Detail */}

      {/* Template Main JS File */}
      <script src="/assets/js/adminMain.js"></script>
    </>
  );
};

export default AdminLayout;
