import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import classNames from "classnames";
import LinkReactScroll from "./LinkReactScroll";
import BackToTopBtn from "./BackToTopBtn";
import Image from "next/image";
import { useSession, signOut, getSession } from "next-auth/react";
import { toast } from "react-toastify";

const ACTIONS = {
  SET_HEADER_CLASS_NAME: "SET_HEADER_CLASS_NAME",
  SET_USER_NAME: "SET_USER_NAME",
  SET_USER_PHONENUMBER: "SET_USER_PHONENUMBER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_HEADER_CLASS_NAME:
      return { ...state, headerClassName: action.headerClassName };
    case ACTIONS.SET_USER_NAME:
      return { ...state, userName: action.userName };
    case ACTIONS.SET_USER_PHONENUMBER:
      return { ...state, userPhoneNumber: action.userPhoneNumber };
    default:
      return state;
  }
};

const Layout = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  const [state, dispatch] = useReducer(reducer, {
    headerClassName: "",
    userName: "",
    userPhoneNumber: "",
  });

  const setUserData = (userName, userPhoneNumber) => {
    dispatch({
      type: ACTIONS.SET_USER_NAME,
      userName,
    });

    dispatch({
      type: ACTIONS.SET_USER_PHONENUMBER,
      userPhoneNumber,
    });
  };

  useEffect(() => {
    reciveUserData();
  }, []);

  const reciveUserData = async () => {
    await getSession().then(async (session) => {
      if (session) {
        const { email } = session.user;
        await fetch(`/api/auth/findUserByEmail/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUserData(data.userData.name, data.userData.phoneNumber);
          });
      }
    });
  };

  useEffect(() => {
    window.onscroll = () => handleScroll(state.headerClassName);
  }, [state.headerClassName]);

  const setHeaderClassName = (headerClassName) => {
    dispatch({
      type: ACTIONS.SET_HEADER_CLASS_NAME,
      headerClassName: headerClassName,
    });
  };

  const handleScroll = (headerClassName) => {
    if (headerClassName !== "header-scrolled" && window.pageYOffset >= 100) {
      setHeaderClassName("header-scrolled");
    } else if (
      headerClassName === "header-scrolled" &&
      window.pageYOffset < 100
    ) {
      setHeaderClassName("");
    }
  };

  const signOutHandler = async () => {
    await signOut();
  };

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}

        <meta content="" name="description" />
        <meta content="" name="keywords" />

        {/* Vendor CSS Files   */}
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/boxicons/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />

        {/* Template Main CSS File */}
        <link href="/assets/css/style-user.css" rel="stylesheet" />
      </Head>

      <header id="header" className={`fixed-top ${state.headerClassName}`}>
        <div className="container">
          <Image
            className={classNames("logo", "float-end", {
              "ms-auto": true,
            })}
            src="/assets/img/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />

          <nav id="navbar" className="navbar float-start">
            <ul>
              {useRouter().pathname == "/" ? (
                <>
                  <li>
                    <LinkReactScroll to="hero" text={"خانه"} />
                  </li>
                  <li>
                    <LinkReactScroll to="about" text={"درباره ما"} />
                  </li>
                  <li>
                    <LinkReactScroll to="rules" text={"قوانین"} />
                  </li>
                  <li>
                    <LinkReactScroll to="contact" text={"تماس با ما"} />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/">خانه</Link>
                  </li>
                  <li>
                    <Link href="/">درباره ما</Link>
                  </li>
                  <li>
                    <Link href="/">قوانین</Link>
                  </li>
                  <li>
                    <Link href="/">تماس با ما</Link>
                  </li>
                </>
              )}
              {status === "authenticated" ? (
                <>
                  <li>
                    <Link href={`/my-shop/${state.userPhoneNumber}`}>
                      <a className="authenticated scrollto shadow-lg">
                        <i class="bi bi-gear-fill"></i>
                        {state.userName}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={signOutHandler}
                      className="logout scrollto shadow-lg border border-0"
                    >
                      <i class="bi bi-box-arrow-right"></i>
                      خروج
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/account/sign-up">
                      <a className="register-login scrollto shadow-lg">
                        <i class="bi bi-person-bounding-box"></i>
                        ساخت فروشگاه
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/sign-in">
                      <a className="register-login scrollto shadow-lg">
                        <i class="bi bi-door-open-fill"></i>
                        ورود به فروشگاه
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      {children}

      <footer id="footer">
        <div className="container footer-bottom clearfix">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Arsha</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>
      <BackToTopBtn />

      {/* Vendor JS Files */}
      <script src="/assets/vendor/aos/aos.js"></script>
      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
      <script src="/assets/vendor/waypoints/noframework.waypoints.js"></script>
      <script src="/assets/vendor/php-email-form/validate.js"></script>

      {/* Template Main JS File */}
      <script src="/assets/js/main.js"></script>
    </>
  );
};

export default Layout;
