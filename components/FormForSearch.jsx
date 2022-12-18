import { useRouter } from "next/router";
import { toast } from "react-toastify";

const FormForSearch = ({
  categoryState,
  myFirstclassName,
  mySecondclassName,
}) => {
  const router = useRouter();

  const handleSearch = () => {
    if (!categoryState)
      toast.warn("لطفا یک دسته انتخاب کنید", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else
      router.replace({
        pathname: "/search/[category]",
        query: { category: categoryState },
      });
  };

  return (
    <>
      <div className="row search-box">
        <div className={`col-sm-9 ${myFirstclassName || "p-sm-0"}`}>
          <input
            data-bs-toggle="modal"
            data-bs-target="#searchModalForHero"
            type="text"
            value={categoryState && categoryState}
            className="form-control form-control-lg"
            placeholder="دسته مورد نظر را انتخاب کنید"
            style={{
              borderRadius: "0 50px 50px 0",
            }}
            disabled
          />
        </div>
        <div className={`col-sm-3 d-grid ${mySecondclassName || "p-sm-0"}`}>
          <button
            type="button"
            className="btn btn-block btn-lg text-white"
            style={{
              borderRadius: "50px 0 0 50px",
            }}
            onClick={handleSearch}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default FormForSearch;
