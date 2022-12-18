import { AddTitle, NothingFound, ShowProduct } from "../../components";
import { useReducer } from "react";
import { connectDatabase, findDocumentById } from "../../helpers/db-util";

const ACTIONS = {
  //SET_NOT_FOUND_PRODUCT: "SET_NOT_FOUND_PRODUCT",
};

const reducer = (state, action) => {
  switch (action.type) {
    // case ACTIONS.SET_NOT_FOUND_PRODUCT:
    // return { ...state, getNotFoundProduct: action.notFoundProduct };
    default:
      return state;
  }
};

const ProductId = ({ product, userData, getShowPermission, statusNumber }) => {
  const [state, dispatch] = useReducer(reducer, {
    getProduct: product,
    getUserInformation: userData,
    getNotFoundProduct: getShowPermission,
  });

  return (
    <>
      <AddTitle
        title={
          state.getProduct
            ? state.getProduct.name
            : "متاسفم چنین محصولی یافت نشد"
        }
      />
      <section
        id="discount-details"
        className="inner-page portfolio-details mt-5"
      >
        {!state.getNotFoundProduct ? (
          <div className="container shadow-lg mt-5 py-5">
            <ShowProduct
              product={state.getProduct}
              userInformation={state.getUserInformation}
            />
          </div>
        ) : (
          <NothingFound text="متاسفم چنین محصولی یافت نشد" />
        )}
      </section>
    </>
  );
};

export default ProductId;

export const getServerSideProps = async (context) => {
  const { productId } = context.params;

  let client = null;
  let product = null;
  let userData = null;
  let getShowPermission = true;
  let statusNumber = 200;

  try {
    client = await connectDatabase();
  } catch (error) {
    statusNumber = 500;
  }

  if (statusNumber != 500)
    try {
      product = await findDocumentById(client, "products", productId);

      if (product.length > 0) {
        product = product.map((p) => {
          p._id = p._id.toString();
          return p;
        });

        product = product[0];

        userData = await findDocumentById(client, "users", product.userId);
        if (userData.length > 0) {
          userData = userData.map((u) => {
            u._id = u._id.toString();
            return u;
          });

          userData = userData[0];

          getShowPermission = false;
        }
      }
    } catch (error) {
      statusNumber = 500;
    }

  client.close();

  return {
    props: {
      product,
      userData,
      getShowPermission,
      statusNumber,
    },
  };
};
