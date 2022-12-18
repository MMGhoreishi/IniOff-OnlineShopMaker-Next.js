import Link from "next/link";
import Image from "next/image";
import { AddTitle } from "../components";

const NotFound = () => {
  return (
    <>
      <AddTitle title="چیزی یافت نشد" />
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center">
            <Image
              src="/assets/img/404.png"
              alt="no-found"
              width={400}
              height={400}
            />
          </div>
          <div className="col-12">
            <div
              style={{ maxWidth: 500 }}
              class="border border-success mx-auto alert alert-warning text-center fw-bold h5 mt-3"
              role="alert"
            >
              متاسفم چنین صفحه ای یافت نشد
              <div className="mt-3 text-capitalize">
                <Link href="/">
                  <button type="button" className="btn btn-primary btn-lg">
                    صفحه اصلی
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
