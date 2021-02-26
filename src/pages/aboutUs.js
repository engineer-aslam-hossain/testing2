import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useEffect, useState } from "react";
import CommonHeader from "../components/CommonHeader/CommonHeader";
import aboutUsDetails from "../fakeData/aboutUsDetails";

const AboutUs = () => {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    // window.addEventListener("resize", () => {
    //   const wid = window.innerWidth;
    //   setWindowSize(wid);
    // });
    const wid = window.innerWidth;
    setWindowSize(wid);
  }, []);
  //   console.log(windowSize);
  return (
    <section>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between findPropertyHeader align-items-center flex-wrap">
            <div>
              <h1>About Us</h1>
            </div>
            <div className="">
              <button className="getInTouch d-flex justify-content-between align-items-center">
                <MailOutlineIcon />
                <p className="mb-1">Get in Touch with us</p>
              </button>
            </div>
          </div>
          <div className="col-md-12">
            <CommonHeader title="Our Team" />

            <div>
              <img
                src="/images/Ahsan_Manzil.png"
                alt="teamImg"
                className="img-fluid teamImg"
              />
            </div>
          </div>
          <div className="col-md-12">
            <CommonHeader title="Our Origin" />
            <div>
              <p>
                DreamFinder Ltd. is an esteemed sister concern of Amader Bari
                Ltd.
              </p>
              <p>
                Amader Bari Ltd. grew exponentially since its inception n 2005,
                known for building numerous luxurious multi-storied residential
                & commercial complexes across the most prominent zones in Dhaka,
                Bangladesh.
              </p>
              <p>
                Inheriting the extensive local knoledge, resources and skills,
                DreamFinder Ltd. aims to build a strong relationship with its
                valuable customers and provide them a unque experience this
                industry requires.
              </p>
            </div>
          </div>

          <div className="col-md-12">
            <CommonHeader title="What We Do" />
            <div>
              <p>
                DreamFinder Ltd. is a real estate agent serving to facilitate
                all out clients’ realty solution.
              </p>
              <p>
                Whether you are selling or buying, a landlord seeking
                resonsible, quality tenants, or a tenant searching for a home,
                the process itself can get incredibly stressful.
              </p>
              <p>
                DreamFinder Ltd. operates to simplify and expedite the entire
                course of action and delivers the kind of quality services that
                buyers, sellers, landlords and tenants require.
              </p>
            </div>
          </div>
          {aboutUsDetails.map((item) => (
            <div className="col-md-12 px-0 d-flex flex-wrap my-4" key={item.id}>
              {item.id % 2 !== 0 || windowSize < 768 ? (
                <div className="col-md-4 d-flex align-items-center mb-4">
                  <img
                    src={item.img}
                    alt="img"
                    className="img-fluid aboutUsDetailsImg"
                  />
                </div>
              ) : null}

              <div className="col-md-8">
                <h2 className="aboutUsDetailsTitle">{item.title}</h2>
                <p>{item.firstP}</p>
                <p>{item.secondP}</p>
                <p>{item.thirdP}</p>
              </div>
              {item.id % 2 === 0 && windowSize > 768 ? (
                <div className="col-md-4 d-flex align-items-center mb-4">
                  <img
                    src={item.img}
                    alt="img"
                    className="img-fluid aboutUsDetailsImg"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
