import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminLayout = ({ children }) => {
  const router = useRouter();

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
        <div class="container">
          <div class="row py-5">
            <div class="col-12 text-center text-white h2 fw-light title-form">
              <i class="bi bi-gear-wide-connected"></i> کنترل پنل - صفحه اصلی
            </div>
            <div className="col-12 text-center">
              <button
                type="button"
                class="btn btn-success rounded-pill border border-warning px-3 mt-2"
              >
                <i class="bi bi-cursor"></i> بازدید از سایت
              </button>

              <div className="px-5 pt-3">
                {" "}
                <div
                  class="input-group input-group-lg"
                  style={{
                    borderRadius: 25,
                    border: "#0d6efd 2px solid",
                  }}
                >
                  <span
                    class="input-group-text"
                    style={{ borderRadius: "0 25px 25px 0px" }}
                  >
                    <i class="bi bi-menu-down"></i>
                  </span>
                  <select
                    class="form-select"
                    name="adminPages"
                    onChange={changePage}
                    style={{ borderRadius: "25px 0px 0px 25px" }}
                  >
                    <option value="">صفحه اصلی</option>
                    <option value="read-messages">پیام های خوانده شده</option>
                    <option value="unread-messages">
                      پیام های خوانده نشده
                    </option>
                    <option value="verified-sellers">
                      فروشندگان تایید شده
                    </option>
                    <option value="unverified-sellers">
                      فروشندگان تایید نشده
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </section>
      {/* Template Main JS File */}
      <script src="/assets/js/adminMain.js"></script>
    </>
  );
};

export default AdminLayout;
