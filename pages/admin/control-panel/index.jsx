import Image from "next/image";
import { AddTitle } from "../../../components";

const controlPanel = () => {
  return (
    <>
      <AddTitle title="کنترل پنل ادمین - خانه" />

      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <Image
              src="/assets/img/Control-Panel-icon.png"
              alt="receive-phoneNumber-image"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default controlPanel;
