import fakeArea from "../../fakeData/fakeArea";
import SingleArea from "../SingleArea/SingleArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommonHeader from "../CommonHeader/CommonHeader";
import { useEffect, useState } from "react";
const PopularArea = () => {
  const [location, setLocation] = useState({});
  const getAllProperty = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/config/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      // console.log(data);
      setLocation(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  // console.log(data);
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
                <div className="d-flex align-items-center flex-column">
                  <p className="text-center seeMoreBtn mb-0">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </p>
                  <p className="areaName">See More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularArea;
