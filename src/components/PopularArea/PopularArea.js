import fakeArea from "../../fakeData/fakeArea";
import SingleArea from "../SingleArea/SingleArea";
import CommonHeader from "../CommonHeader/CommonHeader";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DreamFinderContext from "../Context/Context";

const PopularArea = () => {
  const { searchData, SetSearchData } = useContext(DreamFinderContext);
  const [location, setLocation] = useState({});
  const router = useRouter();

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

  const gotoFindProperty = (place_name) => {
    SetSearchData({
      ...searchData,
      address: searchData.address
        ? [...searchData.address, place_name]
        : [place_name],
    });

    router.push("/findProperties");
  };

  // console.log(data);
  return (
    <section className="popular-area pb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <CommonHeader title="Popular Location" />

            {fakeArea.map((item, index) => (
              <div className="locationTable" key={index}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="areaName">{item.name} </h5>
                  <button className="seeAllBtn">
                    <ArrowRightAltIcon />
                    See More
                  </button>
                </div>
                <div className="placeGridDiv">
                  {item &&
                    item.places.map((place) => (
                      <div
                        className="position-relative placeDIv"
                        key={place.id}
                        onClick={() => gotoFindProperty(place.place_name)}
                      >
                        <img
                          src="/images/Dhaka.png"
                          alt="divImg"
                          className="img-fluid"
                        />
                        <h4>{place.place_name} </h4>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularArea;
