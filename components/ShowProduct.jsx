import classNames from "classnames";
import Image from "next/image";

const ShowProduct = ({ product, userInformation }) => {
  return (
    <div className="row gy-4">
      <div className="col-lg-7">
        <div id="product-slider" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#product-slider"
              data-bs-slide-to="0"
              class="active"
            ></button>
            <button
              type="button"
              data-bs-target="#product-slider"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#product-slider"
              data-bs-slide-to="2"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "600px",
                }}
              >
                {" "}
                <Image
                  src={
                    product.photo1
                      ? `/assets/img/product-photos/${product.photo1}`
                      : null
                  }
                  alt={product.name}
                  layout="fill"
                />
              </div>
            </div>
            <div class="carousel-item">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "600px",
                }}
              >
                {" "}
                <Image
                  src={
                    product.photo2
                      ? `/assets/img/product-photos/${product.photo2}`
                      : null
                  }
                  alt={product.name}
                  layout="fill"
                />
              </div>
            </div>
            <div class="carousel-item">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "600px",
                }}
              >
                {" "}
                <Image
                  src={
                    product.photo3
                      ? `/assets/img/product-photos/${product.photo3}`
                      : null
                  }
                  alt={product.name}
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-5">
        <div className="portfolio-info">
          <h3>{product.name}</h3>
          <div className="text-center">
            <div
              className={classNames("alert text-uppercase", {
                "alert-success": product.condition,
                "alert-danger": !product.condition,
              })}
            >
              <strong>
                {product.condition ? "در دسترس" : "غیرقابل دسترس"}
              </strong>
            </div>
            <div className="fw-bold d-block mb-2">
              <span className="text-danger ms-2">
                {product.price + "تومان"}
              </span>{" "}
              <span className="text-decoration-line-through">
                {product.discount + "تومان"}
              </span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover small">
              <tbody>
                <tr className="table-danger">
                  <td>
                    <i className="bi bi-list-columns text-secondary"></i>{" "}
                    <strong>دسته</strong>
                  </td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td>
                    <i className="bi bi-person text-secondary"></i>{" "}
                    <strong>نام شرکت</strong>
                  </td>
                  <td>{userInformation.companyName}</td>
                </tr>
                <tr className="table-danger">
                  <td>
                    <i className="bi bi-instagram text-secondary"></i>{" "}
                    <strong>اینستاگرام</strong>
                  </td>
                  <td>
                    <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
                      {userInformation.instagram}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="bi bi-telephone text-secondary"></i>{" "}
                    <strong>شماره موبایل</strong>
                  </td>
                  <td>{userInformation.phoneNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-grid">
            <button type="button" className="btn btn-danger btn-block btn-lg">
              <i className="bi bi-journal-code"></i> دریافت یک کد تخفیف
            </button>
          </div>
        </div>
        <div className="portfolio-description mt-3 p-3 border border-warning border-2 rounded-3">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
