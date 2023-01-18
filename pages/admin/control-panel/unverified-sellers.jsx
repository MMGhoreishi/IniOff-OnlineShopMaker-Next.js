import { AddTitle } from "../../../components";

const UnverifiedSellers = () => {
  return (
    <>
      <AddTitle title="کنترل پنل ادمین - فروشندگان تایید نشده" />

      <div className="container">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-light text-center align-middle">
            <thead className="table-info">
              <tr>
                <th>
                  <i className="bi bi-123"></i> شماره ردیف
                </th>
                <th>
                  <i className="bi bi-alarm"></i> وضعیت
                </th>
                <th>
                  <i className="bi bi-person-fill"></i> Name
                </th>
                <th>
                  <i className="bi bi-building"></i> Company Name
                </th>
                <th>
                  <i className="bi bi-calendar-day-fill"></i> Registration تاریخ
                </th>
                <th>
                  <i className="bi bi-card-text"></i> جزئیات
                </th>
                <th>
                  <i className="bi bi-trash-fill"></i> حذف
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <button
                    onclick="this.innerHTML='تایید شده'"
                    type="button"
                    className="text-uppercase btn btn-warning"
                  >
                    عدم تایید
                  </button>
                </td>
                <td>رضا حسینی</td>
                <td>گوگل</td>
                <td>2/21/2020</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#detailModal"
                  >
                    جزئیات
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    حذف
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <button
                    onclick="this.innerHTML='تایید شده'"
                    type="button"
                    className="text-uppercase btn btn-warning"
                  >
                    عدم تایید
                  </button>
                </td>
                <td>حسن محمدی</td>
                <td>مایکروسافت</td>
                <td>2/21/2020</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#detailModal"
                  >
                    جزئیات
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default UnverifiedSellers;
