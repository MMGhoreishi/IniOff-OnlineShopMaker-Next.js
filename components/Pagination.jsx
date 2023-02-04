const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="text-center paginationContainer">
      <ul className="pagination pagination-circle justify-content-center">
        <li className="page-item">
          <span className="page-link" onClick={prevPage}>
            <i class="bi bi-caret-right"></i>
          </span>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <span
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
            >
              {pgNumber}
            </span>
          </li>
        ))}
        <li className="page-item">
          <span className="page-link" onClick={nextPage}>
            <i class="bi bi-caret-left"></i>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
