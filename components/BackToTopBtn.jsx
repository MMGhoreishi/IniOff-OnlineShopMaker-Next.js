import { useEffect, useReducer } from "react";

const ACTIONS = {
  SET_SHOW_BUTTON: "SET_SHOW_BUTTON",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SHOW_BUTTON:
      return { ...state, showButton: action.showButton };
    default:
      return state;
  }
};

const BackToTopBtn = () => {
  const [state, dispatch] = useReducer(reducer, {
    showButton: "",
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton("active");
      } else {
        setShowButton("");
      }
    });
  }, []);

  const setShowButton = (showButton) => {
    dispatch({
      type: ACTIONS.SET_SHOW_BUTTON,
      showButton: showButton,
    });
  };

  return (
    <a
      href="#"
      className={`back-to-top d-flex align-items-center justify-content-center ${state.showButton}`}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
};

export default BackToTopBtn;
