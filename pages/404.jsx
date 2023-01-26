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
        </div>
      </div>
    </>
  );
};

export default NotFound;
