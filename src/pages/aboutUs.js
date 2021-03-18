import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useEffect, useState } from "react";
import CommonHeader from "../components/CommonHeader/CommonHeader";
import aboutUsDetails from "../fakeData/aboutUsDetails";
import { useRouter } from "next/router";

const AboutUs = () => {
  const [windowSize, setWindowSize] = useState(0);
  const router = useRouter();

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
    <>
      <section>
        <div className="pt-3">
          <img
            src="/images/aboutUs.jpg"
            alt="teamImg"
            className="img-fluid teamImg"
          />
        </div>
      </section>
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <CommonHeader title="Our Origin" />
              <div className="ourOriginText">
                <p>
                  DreamFinder Ltd. is an esteemed sister concern of Amader Bari
                  Ltd.
                </p>
                <p>
                  Amader Bari Ltd. grew exponentially since its inception n
                  2005, known for building numerous luxurious multi-storied
                  residential & commercial complexes across the most prominent
                  zones in Dhaka, Bangladesh.
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
              <div className="ourOriginText">
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
                  course of action and delivers the kind of quality services
                  that buyers, sellers, landlords and tenants require.
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <CommonHeader title="Mission & Vision" />
              <div className="ourOriginText">
                <p>
                  Our mission is to differentiate ourselves through our
                  dedicated and knowledgeable sales, management and
                  administration team and offer a first class range of services
                  to cater to all our clients’ needs and requirements.
                </p>
                <div>
                  <br />
                  <br />
                  <p>
                    DreamFinder Ltd. is a real estate agent serving to
                    facilitate all our clients’ realty solutions. Whether you
                    are selling or buying, a landlord seeking responsible,
                    quality tenants, or a tenant searching for a home, the
                    process itself can get incredibly stressful. DreamFinder
                    Ltd. operates to simplify and expedite the entire course of
                    action and delivers the kind of quality services that
                    buyers, sellers, landlords and tenants require.
                  </p>

                  <p>
                    DreamFinder Ltd. is an esteemed sister concern of Amader
                    Bari Ltd. headed by a dynamic leader, Chowdhury Munir Uddin
                    Mahfuz. Amader Bari Ltd. grew exponentially since its
                    inception, known for building numerous luxurious
                    multi-storied residential & commercial complexes across the
                    most prominent zones in Dhaka, Bangladesh. Inheriting the
                    extensive local knowledge, resources and skills, DreamFinder
                    Ltd. aims to build a strong relationship with its valuable
                    customers and provide them a unique experience this industry
                    requires
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
