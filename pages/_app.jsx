import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Layout } from "../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

const ACTIONS = {
  SET_PAGE_NAME: "SET_PAGE_NAME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PAGE_NAME:
      return { ...state, pageName: action.pageName };
    default:
      return state;
  }
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    pageName: false,
  });

  const setPageName = (pageName) => {
    dispatch({
      type: ACTIONS.SET_PAGE_NAME,
      pageName,
    });
  };

  useEffect(() => {
    const pageName = router.pathname;
    const result = pageName.includes("admin");

    if (result) setPageName(true);
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer
        style={{
          fontFamily: "Vazir FD-WOL",
          fontWeight: 500,
          fontStyle: "normal",
        }}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!state.pageName ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default MyApp;
