import fakeArea from "../../fakeData/fakeArea";
import SingleArea from "../SingleArea/SingleArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommonHeader from "../CommonHeader/CommonHeader";
const PopularArea = () => {
  return (
    <section className="popular-area pb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <CommonHeader title="Popular Location" />
            <div className="col-md-12 d-flex flex-wrap locationTable">
              <div className="area-name d-flex flex-wrap col-md-10">
                {fakeArea.map((area) => (
                  <SingleArea area={area} key={area.id} />
                ))}

                <div className="col-md-8 mx-auto d-flex justify-content-center align-items-center">
                  <h5>More cities coming soon....</h5>
                </div>
              </div>

              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <p className="text-center seeMoreBtn">
                  <FontAwesomeIcon icon={faArrowRight} /> <br /> See More
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularArea;
