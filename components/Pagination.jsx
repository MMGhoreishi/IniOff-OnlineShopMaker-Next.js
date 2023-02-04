import { useEffect } from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  useEffect(() => {
    console.log("nPages>>>>");
    console.log(nPages);

    console.log("currentPage>>>>");
    console.log(currentPage);
  }, [nPages, currentPage]);

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav>
      <ul className="pagination pagination-circle justify-content-center">
        <li className="page-item">
          <span className="page-link" onClick={prevPage}>
            قبلی
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
            بعدی
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
