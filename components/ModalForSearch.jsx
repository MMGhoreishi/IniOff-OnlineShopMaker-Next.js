import Image from "next/image";

const ModalForSearch = ({ changeCategory }) => {
  return (
    <div className="modal fade" id="searchModalForHero">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">دسته ها</h4>
            <button
              type="button"
              className="btn-close m-0"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>نام دسته</th>
                  <th>تعداد تخفیفات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/تجارت و صنعت.png"
                      alt="تجارت و صنعت"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("تجارت و صنعت")}
                    >
                      تجارت و صنعت
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/اتومبیل و وسایل نقلیه.png"
                      alt="اتومبیل و وسایل نقلیه"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("اتومبیل و وسایل نقلیه")}
                    >
                      اتومبیل و وسایل نقلیه
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/الکترونیکی.png"
                      alt="الکترونیکی"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("الکترونیکی")}
                    >
                      الکترونیکی
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/سلامت و زیبایی.png"
                      alt="سلامت و زیبایی"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("سلامت و زیبایی")}
                    >
                      سلامت و زیبایی
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/سرگرمی و ورزش و کودکان.png"
                      alt="سرگرمی و ورزش و کودکان"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("سرگرمی و ورزش و کودکان")}
                    >
                      سرگرمی و ورزش و کودکان
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/لوازم خانگی.png"
                      alt="لوازم خانگی"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("لوازم خانگی")}
                    >
                      لوازم خانگی
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/شغل ها.png"
                      alt="شغل ها"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("شغل ها")}
                    >
                      شغل ها
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/دیگر موارد.png"
                      alt="دیگر موارد"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("دیگر موارد")}
                    >
                      دیگر موارد
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/حیوانات.png"
                      alt="حیوانات"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("حیوانات")}
                    >
                      حیوانات
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/ویژگی.png"
                      alt="ویژگی"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("ویژگی")}
                    >
                      ویژگی
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Image
                      src="/assets/img/icons/خدمات.png"
                      alt="خدمات"
                      width={70}
                      height={70}
                    />{" "}
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      onClick={() => changeCategory("خدمات")}
                    >
                      خدمات
                    </a>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill p-3">
                      20
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForSearch;
