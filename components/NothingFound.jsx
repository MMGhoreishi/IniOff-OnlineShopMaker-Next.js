import Image from "next/image";

const NothingFound = ({ text }) => {
  return (
    <>
      <div className=" py-5 my-5">
        <div className="col-12 text-center">
          <Image
            className="mx-auto d-block"
            src="/assets/img/no-found.gif"
            alt="no-found"
            width={300}
            height={228}
          />
        </div>
        <div className="col-12">
          <div
            style={{ maxWidth: 500 }}
            className="mx-auto alert alert-danger text-center mt-3"
            role="alert"
          >
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default NothingFound;
