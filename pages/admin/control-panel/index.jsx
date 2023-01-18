import { AddTitle } from "../../../components";

const controlPanel = () => {
  return (
    <>
      <AddTitle title="کنترل پنل ادمین - اینی آف" />

      <section id="control-panel">
        <div class="container">
          <div class="row  py-5">
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
            </div>
          </div>
          <div class="row manage-row">
            <div class="col p-5">
              {/* Nav pills */}
              <ul class="nav nav-pills nav-justified">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-bs-toggle="pill"
                    href="#unread-messages"
                  >
                    پیام های خوانده نشده
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="pill"
                    href="#read-messages"
                  >
                    پیام های خوانده شده
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="pill"
                    href="#unapproved-sellers"
                  >
                    فروشندگان تایید نشده
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="pill"
                    href="#approved-sellers"
                  >
                    فروشندگان تایید شده
                  </a>
                </li>
              </ul>

              {/* Start Tab panes */}
              <div class="tab-content py-5">
                <div class="tab-pane container active" id="unread-messages">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover table-light text-center align-middle">
                      <thead class="table-info">
                        <tr>
                          <th>
                            <i class="bi bi-123"></i> شماره ردیف
                          </th>
                          <th>
                            <i class="bi bi-alarm"></i> وضعیت
                          </th>
                          <th>
                            <i class="bi bi-activity"></i> عنوان
                          </th>
                          <th>
                            <i class="bi bi-calendar-day-fill"></i> تاریخ
                          </th>
                          <th>
                            <i class="bi bi-card-text"></i> جزئیات
                          </th>
                          <th>
                            <i class="bi bi-trash-fill"></i> حذف
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <button
                              onclick="this.innerHTML='خوانده شده'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              خوانده نشده
                            </button>
                          </td>
                          <td>test</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
                              onclick="this.innerHTML='خوانده شده'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              خوانده نشده
                            </button>
                          </td>
                          <td>test</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
                <div class="tab-pane container fade" id="read-messages">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover table-light text-center align-middle">
                      <thead class="table-info">
                        <tr>
                          <th>
                            <i class="bi bi-123"></i> شماره ردیف
                          </th>
                          <th>
                            <i class="bi bi-alarm"></i> وضعیت
                          </th>
                          <th>
                            <i class="bi bi-activity"></i> عنوان
                          </th>
                          <th>
                            <i class="bi bi-calendar-day-fill"></i> تاریخ
                          </th>
                          <th>
                            <i class="bi bi-card-text"></i> جزئیات
                          </th>
                          <th>
                            <i class="bi bi-trash-fill"></i> حذف
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <button
                              onclick="this.innerHTML='خوانده نشده'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              خوانده شده
                            </button>
                          </td>
                          <td>test</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
                              onclick="this.innerHTML='خوانده نشده'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              خوانده شده
                            </button>
                          </td>
                          <td>test</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
                <div class="tab-pane container fade" id="unapproved-sellers">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover table-light text-center align-middle">
                      <thead class="table-info">
                        <tr>
                          <th>
                            <i class="bi bi-123"></i> شماره ردیف
                          </th>
                          <th>
                            <i class="bi bi-alarm"></i> وضعیت
                          </th>
                          <th>
                            <i class="bi bi-person-fill"></i> Name
                          </th>
                          <th>
                            <i class="bi bi-building"></i> Company Name
                          </th>
                          <th>
                            <i class="bi bi-calendar-day-fill"></i> Registration
                            تاریخ
                          </th>
                          <th>
                            <i class="bi bi-card-text"></i> جزئیات
                          </th>
                          <th>
                            <i class="bi bi-trash-fill"></i> حذف
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <button
                              onclick="this.innerHTML='Approved'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              Unapproved
                            </button>
                          </td>
                          <td>Jack Smith</td>
                          <td>Microsoft</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
                              onclick="this.innerHTML='Approved'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              Unapproved
                            </button>
                          </td>
                          <td>Jack Smith</td>
                          <td>Microsoft</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
                <div class="tab-pane container fade" id="approved-sellers">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover table-light text-center align-middle">
                      <thead class="table-info">
                        <tr>
                          <th>
                            <i class="bi bi-123"></i> شماره ردیف
                          </th>
                          <th>
                            <i class="bi bi-alarm"></i> وضعیت
                          </th>
                          <th>
                            <i class="bi bi-person-fill"></i> Name
                          </th>
                          <th>
                            <i class="bi bi-building"></i> Company Name
                          </th>
                          <th>
                            <i class="bi bi-calendar-day-fill"></i> Registration
                            تاریخ
                          </th>
                          <th>
                            <i class="bi bi-card-text"></i> جزئیات
                          </th>
                          <th>
                            <i class="bi bi-trash-fill"></i> حذف
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <button
                              onclick="this.innerHTML='Unapproved'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              Approved
                            </button>
                          </td>
                          <td>Jack Smith</td>
                          <td>Microsoft</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
                              onclick="this.innerHTML='Unapproved'"
                              type="button"
                              class="text-uppercase btn btn-warning"
                            >
                              Approved
                            </button>
                          </td>
                          <td>Jack Smith</td>
                          <td>Microsoft</td>
                          <td>2/21/2020</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#detailModal"
                            >
                              جزئیات
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
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
              </div>
              {/* End Tab panes */}

              {/* Start Pagination */}
              <ul class="pagination pagination-lg justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
              {/* End Pagination */}
            </div>
          </div>
        </div>
      </section>

      {/* Start Modal For Delete Form */}
      <div class="modal fade" id="deleteModal">
        <div class="modal-dialog modal-dialog-scrollable modal-sm modal-dialog-centered">
          <div class="modal-content">
            {/* Modal Header */}
            <div class="modal-header">
              <h4 class="modal-title">
                <i class="bi bi-trash-fill"></i> حذف
              </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal body */}
            <div class="modal-body text-center">
              آیا از حذف آن اطمینان دارید؟
            </div>

            {/* Modal footer */}
            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-success">
                بله
              </button>
              <button
                type="button"
                class="btn btn-danger"
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
      <div class="modal fade" id="detailModal">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            {/* Modal Header */}
            <div class="modal-header">
              <h4 class="modal-title">
                <i class="bi bi-card-text"></i> جزئیات
              </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal body */}
            <div class="modal-body text-white">
              <div class="row">
                <div class="col-2 bg-warning fw-bold py-2">
                  <i class="bi bi-alarm"></i> وضعیت
                </div>
                <div class="col bg-info py-2">خوانده نشده</div>
              </div>
              <div class="row">
                <div class="col-2 fw-bold second-item-y py-2">
                  <i class="bi bi-activity"></i> عنوان
                </div>
                <div class="col second-item-b py-2">
                  Now I am talking to you
                </div>
              </div>
              <div class="row">
                <div class="col-2 bg-warning fw-bold py-2">
                  <i class="bi bi-calendar-day-fill"></i> تاریخ
                </div>
                <div class="col bg-info py-2">2/21/2020</div>
              </div>
              <div class="row">
                <div class="col-2 fw-bold second-item-y py-2">
                  <i class="bi bi-person-fill"></i> Name
                </div>
                <div class="col second-item-b py-2">Jack Voily</div>
              </div>
              <div class="row">
                <div class="col-2 bg-warning fw-bold py-2">
                  <i class="bi bi-envelope-fill"></i> Email
                </div>
                <div class="col bg-info py-2">mr.mmghoreishi@gmail.com</div>
              </div>
              <div class="row">
                <div class="col-2 fw-bold second-item-y py-2">
                  <i class="bi bi-chat-dots-fill"></i> Message
                </div>
                <div class="col second-item-b py-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae
                  congue mauris rhoncus aenean vel elit scelerisque
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div class="modal-footer justify-content-center">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal For Detail */}
    </>
  );
};

export default controlPanel;
