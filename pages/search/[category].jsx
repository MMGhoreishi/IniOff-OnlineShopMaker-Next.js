import { useEffect, useReducer } from "react";
import Link from "next/link";
import Image from "next/image";
import { connectDatabase, findProductsByCategory } from "../../helpers/db-util";
import classNames from "classnames";
import {
  FormForSearch,
  ModalForSearch,
  NothingFound,
  AddTitle,
  Pagination,
} from "../../components";

const ACTIONS = {
  SET_YOUR_CATEGORY: "SET_YOUR_CATEGORY",
  SET_YOUR_PRODUCTS: "SET_YOUR_PRODUCTS",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_N_PAGES: "SET_N_PAGES",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_YOUR_CATEGORY:
      return { ...state, yourCategory: action.yourCategory };
    case ACTIONS.SET_YOUR_PRODUCTS:
      return { ...state, products: action.products };
    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case ACTIONS.SET_N_PAGES:
      return { ...state, nPages: action.nPages };
    default:
      return state;
  }
};

const Category = ({ products, category, getShowPermission, statusNumber }) => {
  const [state, dispatch] = useReducer(reducer, {
    yourCategory: null,
    products: null,
    currentPage: 1,
    nPages: 0,
  });

  const setNPages = (nPages) => {
    dispatch({
      type: ACTIONS.SET_N_PAGES,
      nPages,
    });
  };

  const setCurrentPage = (currentPage) => {
    dispatch({
      type: ACTIONS.SET_CURRENT_PAGE,
      currentPage,
    });
  };

  const setYourCategory = (yourCategory) => {
    dispatch({
      type: ACTIONS.SET_YOUR_CATEGORY,
      yourCategory,
    });
  };

  const setYourProducts = (products) => {
    dispatch({
      type: ACTIONS.SET_YOUR_PRODUCTS,
      products,
    });
  };

  useEffect(() => {
    setYourCategory(category);

    const recordsPerPage = 4;
    const indexOfLastRecord = state.currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    setYourProducts(products.slice(indexOfFirstRecord, indexOfLastRecord));
    setNPages(Math.ceil(products.length / recordsPerPage));
  }, [state.currentPage]);

  return (
    <>
      <AddTitle title={`جستجو ${state.yourCategory}`} />
      <section className="inner-page mt-5" id="search-section">
        <div className="container shadow-lg mt-5 py-5">
          <h2 className="mb-5 fw-bold text-center">جستجوی محصول</h2>
          <FormForSearch
            categoryState={state.yourCategory}
            myFirstclassName="ps-sm-0"
            mySecondclassName="pe-sm-0"
          />
          {!getShowPermission ? (
            <>
              <div className="row py-5">
                {state.products &&
                  state.products.map((product) => (
                    <div
                      className="col-xxl-4 col-lg-6 mb-xxl-0 mb-5"
                      key={product._id.toString()}
                    >
                      <div className="card">
                        <Image
                          className="card-img-top"
                          src={`/uploads/${product.photo1.url}`}
                          alt={product.name}
                          width={500}
                          height={450}
                        />
                        <div className="card-body">
                          <Link href={`/product-details/${product._id}`}>
                            <h4 className="card-title">{product.name}</h4>
                          </Link>
                          <i className="bi bi-tags-fill icon-category"></i>
                          <span className="fw-bold text-capitalize  me-2">
                            {product.category}
                          </span>
                          <p className="card-text mt-3">
                            {product.description}
                          </p>
                          <div className="fw-bold text-center mb-3">
                            <span className="text-danger ms-2">
                              {product.price}$
                            </span>
                            <span className="text-decoration-line-through">
                              {product.discount}$
                            </span>
                          </div>
                          <div className="d-grid">
                            <Link
                              href={{
                                pathname: "/product-details/[productId]",
                                query: { productId: product._id },
                              }}
                            >
                              <a>
                                <button
                                  type="button"
                                  className="btn btn-details btn-block btn-lg text-white w-100"
                                >
                                  جزئیات
                                </button>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className="card-footer text-center">
                          <div
                            className={classNames(
                              "badge rounded-pill text-uppercase p-3 mb-2",
                              {
                                "bg-success": product.condition,
                                "bg-danger": !product.condition,
                              }
                            )}
                          >
                            {product.condition ? "موجود" : "ناموجود"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="row">
                <div className="col text-center">
                  <Pagination
                    nPages={state.nPages}
                    currentPage={state.currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="mt-5">
              <NothingFound text="!!!متاسفم چیزی یافت نشد" />
            </div>
          )}
        </div>

        {/* Start Modal For Search Form */}
        <ModalForSearch changeCategory={setYourCategory} />
        {/* End Modal For Search Form */}
      </section>
    </>
  );
};

export default Category;

export const getServerSideProps = async (context) => {
  const { category } = context.params;

  let client = null;
  let products = null;
  let getShowPermission = true;
  let statusNumber = 200;

  try {
    client = await connectDatabase();
  } catch (error) {
    statusNumber = 500;
  }

  if (statusNumber != 500)
    try {
      products = await findProductsByCategory(client, category);

      if (products.length > 0) {
        products = products.map((p) => {
          p._id = p._id.toString();
          return p;
        });

        getShowPermission = false;
      }
    } catch (error) {
      statusNumber = 500;
    }

  client.close();

  return {
    props: {
      products,
      category,
      getShowPermission,
      statusNumber,
    },
  };
};
