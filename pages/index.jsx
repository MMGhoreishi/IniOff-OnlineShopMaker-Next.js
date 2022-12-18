import { useReducer } from "react";
import Image from "next/image";
import {
  FormForSearch,
  ModalForSearch,
  AddTitle,
  Contact,
} from "../components";

const ACTIONS = {
  SET_YOUR_CATEGORY: "SET_YOUR_CATEGORY",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_YOUR_CATEGORY:
      return { ...state, yourCategory: action.yourCategory };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    yourCategory: "",
  });

  const setYourCategory = (yourCategory) => {
    dispatch({
      type: ACTIONS.SET_YOUR_CATEGORY,
      yourCategory: yourCategory,
    });
  };

  return (
    <>
      <h1>TEST!</h1>
      <AddTitle title="صفحه اصلی" />
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FormForSearch categoryState={state.yourCategory} />
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Image
                src="/assets/img/hero-img.png"
                alt="hero-img"
                className="img-fluid animated"
                width={780}
                height={646}
              />
            </div>
          </div>
        </div>

        {/* Start Modal For Search Form */}
        <ModalForSearch changeCategory={setYourCategory} />
        {/* End Modal For Search Form */}
      </section>
      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>درباره ما</h2>
            </div>

            <div className="row content">
              <div className="col">
                <p>
                  {" "}
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                  صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                  راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                  حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای
                  موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
                <a href="#" className="btn-learn-more">
                  بیشتر ...
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="cta"
          style={{
            background:
              "linear-gradient(#b7d53daf, #b7d53ddc),  url(/assets/img/cta-bg.jpg) fixed center center",
          }}
        >
          <div className="container" data-aos="zoom-in">
            <div className="row">
              <div
                className="container aos-init aos-animate"
                data-aos="fade-up"
              >
                <div className="section-title">
                  <h2 className="text-white">تعداد تخفیفات ثبت شده</h2>
                  <h3>1000</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="rules" className="faq section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>قوانین</h2>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
              </p>
            </div>

            <div className="faq-list">
              <ul>
                <li data-aos="fade-up" data-aos-delay="100">
                  <div className="row">
                    <div className="col-1 text-center p-0">
                      {" "}
                      <i className="bx bx-help-circle icon-help"></i>
                    </div>
                    <div className="col-11 p-0">
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-list-1"
                        className="collapsed"
                      >
                        <div className="row">
                          <div className="col-1 p-0 text-center">
                            {" "}
                            <i className="bx bx-chevron-down icon-show"></i>
                            <i className="bx bx-chevron-up icon-close"></i>
                          </div>
                          <div className="col-11 p-0 order-first">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ؟
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    id="faq-list-1"
                    className="collapse show"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="200">
                  <div className="row">
                    <div className="col-1 text-center p-0">
                      {" "}
                      <i className="bx bx-help-circle icon-help"></i>
                    </div>
                    <div className="col-11 p-0">
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-list-2"
                        className="collapsed"
                      >
                        <div className="row">
                          <div className="col-1 p-0 text-center">
                            {" "}
                            <i className="bx bx-chevron-down icon-show"></i>
                            <i className="bx bx-chevron-up icon-close"></i>
                          </div>
                          <div className="col-11 p-0 order-first">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ؟
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div
                    id="faq-list-2"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="300">
                  <div className="row">
                    <div className="col-1 text-center p-0">
                      {" "}
                      <i className="bx bx-help-circle icon-help"></i>
                    </div>
                    <div className="col-11 p-0">
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-list-3"
                        className="collapsed"
                      >
                        <div className="row">
                          <div className="col-1 p-0 text-center">
                            {" "}
                            <i className="bx bx-chevron-down icon-show"></i>
                            <i className="bx bx-chevron-up icon-close"></i>
                          </div>
                          <div className="col-11 p-0 order-first">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ؟
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    id="faq-list-3"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="400">
                  <div className="row">
                    <div className="col-1 text-center p-0">
                      {" "}
                      <i className="bx bx-help-circle icon-help"></i>
                    </div>
                    <div className="col-11 p-0">
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-list-4"
                        className="collapsed"
                      >
                        <div className="row">
                          <div className="col-1 p-0 text-center">
                            {" "}
                            <i className="bx bx-chevron-down icon-show"></i>
                            <i className="bx bx-chevron-up icon-close"></i>
                          </div>
                          <div className="col-11 p-0 order-first">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ؟
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    id="faq-list-4"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      {" "}
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </li>

                <li data-aos="fade-up" data-aos-delay="500">
                  <div className="row">
                    <div className="col-1 text-center p-0">
                      {" "}
                      <i className="bx bx-help-circle icon-help"></i>
                    </div>
                    <div className="col-11 p-0">
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-list-5"
                        className="collapsed"
                      >
                        <div className="row">
                          <div className="col-1 p-0 text-center">
                            {" "}
                            <i className="bx bx-chevron-down icon-show"></i>
                            <i className="bx bx-chevron-up icon-close"></i>
                          </div>
                          <div className="col-11 p-0 order-first">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ؟
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    id="faq-list-5"
                    className="collapse"
                    data-bs-parent=".faq-list"
                  >
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>تماس با ما</h2>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
              </p>
            </div>

            <div className="row">
              <div className="col-lg-5 d-flex align-items-stretch">
                <div className="info">
                  <div className="address row">
                    <div className="col-1">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="col-11">
                      <h4>آدرس شرکت:</h4>
                      <p>
                        تهران - مهرآباد جنوبی - خ دانشگاه هوایی شمالی - خ شهید
                        قادری - پلاک 29 طبقه اول
                      </p>
                    </div>
                  </div>

                  <div className="email row">
                    <div className="col-1">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="col-11">
                      <h4>ایمیل:</h4>
                      <p>info@example.com</p>
                    </div>
                  </div>

                  <div className="phone row">
                    <div className="col-1">
                      {" "}
                      <i className="bi bi-phone"></i>
                    </div>
                    <div className="col-11">
                      <h4>شماره تماس:</h4>
                      <p
                        className="d-inline"
                        style={{ direction: "ltr", unicodeBidi: "embed" }}
                      >
                        +98 936 399 8946
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                <Contact />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
