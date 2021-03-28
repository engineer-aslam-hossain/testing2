import CommonHeader from "../CommonHeader/CommonHeader";
import Slider from "react-slick";
import fakeSlideItems from "../../fakeData/fakeSlideItems";
import { useEffect, useState } from "react";

const PremiumAgents = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      />
    );
  }
  const [innerWidth, SetWidth] = useState(null);
  useEffect(() => {
    const windowWidth = window.innerWidth;
    SetWidth(windowWidth);
  }, []);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    centerPadding: "0px",
    slidesToShow: innerWidth < 768 ? 2 : innerWidth < 992 ? 3 : 5,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="premiumAgents">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sectionTitle col-lg-7 mx-auto">
              <h2 className="Title">
                Wondering where to live? Dreamfinder will help you find it!
                Browse properties by city , town or country…
              </h2>
            </div>
            {/* <CommonHeader title="Premium Agents" /> */}
            {/* <div className="d-flex justify-content-center align-items-center">
              <h5>No agents published yet</h5>
            </div> */}
            {/* <div className="mx-auto premiumAgentsSlider" style={{ width: "80%" }}>
              <Slider {...settings}>
                {fakeSlideItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-center align-items-center flex-column"
                  >
                    <img src={item.img} alt="" className="sliderImg" />
                    <h5 className="my-2">{item.title} </h5>
                  </div>
                ))}
              </Slider>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumAgents;
