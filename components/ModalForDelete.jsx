const ModalForDelete = ({ handleDelete }) => {
  return (
    <div className="modal fade" id="deleteModal">
      <div className="modal-dialog modal-dialog-scrollable modal-sm modal-dialog-centered">
        <div className="modal-content">
          {" "}
          {/* Modal Header */}{" "}
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="bi bi-trash-fill"></i> حذف
            </h4>
            <button
              type="button"
              className="btn-close m-0"
              data-bs-dismiss="modal"
            ></button>
          </div>{" "}
          {/* Modal body */}{" "}
          <div className="modal-body text-center">
            آیا شما از حذف این محصول اطمینان دارید؟
          </div>{" "}
          {/* Modal footer */}{" "}
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              بله
            </button>
            <button
              type="button"
              className="btn btn-delete"
              data-bs-dismiss="modal"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForDelete;
