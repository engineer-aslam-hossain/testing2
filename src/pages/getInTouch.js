import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const GetInTouch = () => {
  const [getInTouch, setGetInTouch] = useState({
    type: "Get In Touch",
  });

  const router = useRouter();

  const getInTouchSubmitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/message/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getInTouch),
        }
      );
      const data = await res.json();
      // console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Send Message SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(getInTouch);
  return (
    <section>
      <section className="">
        <iframe
          src="http://maps.google.com/maps?q=23.770541202199745, 90.40633522570474&z=15&output=embed"
          height="400px"
          width="100%"
        ></iframe>
      </section>
      <div className="container">
        <div className="row py-5 justify-content-around">
          <div className="col-md-4 mb-5 getInTouchLeft">
            <div>
              <h1>Get in Touch With us</h1>
            </div>
            <div className="my-5">
              <p>
                <img
                  src="/icons/Vector.svg"
                  alt="icons"
                  className="img-fluid"
                />
                info@dreamfinderltd.com <span>Mail Now</span>
              </p>
              <p>
                <img
                  src="/icons/Vector_1.svg"
                  alt="icons"
                  className="img-fluid"
                />
                +88 02 88 78 78 1<span>Call Now</span>
              </p>
              <p>
                <img
                  src="/icons/Vector_1.svg"
                  alt="icons"
                  className="img-fluid"
                />
                +88 02 88 78 78 1<span>Call Now</span>
              </p>
              <p>
                <img
                  src="/icons/Vector_1.svg"
                  alt="icons"
                  className="img-fluid"
                />
                +88 02 88 78 78 1<span>Call Now</span>
              </p>
              <p>
                <img
                  src="/icons/Getintouch_Address.svg"
                  alt="icons"
                  className="img-fluid"
                />
                Shanta Western Tower, Level-10, Office Suite-1004, 186 Bir Uttam
                Mir Shawkat Sarak, Tejgaon, Dhaka -1208, Bangladesh
              </p>
            </div>
            <div>
              <h4>Want to know more?</h4>
              <button
                className="getInTouchSendBtn"
                onClick={() => router.push("/aboutUs")}
              >
                ABOUT US
              </button>
              <button className="getInTouchSendBtn my-4">
                CAREER OPPORTUNITIES
              </button>
              <button className="getInTouchSendBtn">EXPLORE PROPERTIES</button>
            </div>
          </div>
          <div className="col-md-4">
            <Card style={{ padding: "1rem" }} className="getInTouchCard">
              <div className="my-4">
                <h3 className="getIntouchCardTitle">Write Anything to Us</h3>
              </div>
              <Form noValidate onSubmit={getInTouchSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    // defaultValue={loggedInUser.name}
                    onChange={(e) =>
                      setGetInTouch({
                        ...getInTouch,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter Your Full Name"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    // defaultValue={loggedInUser.email}
                    onChange={(e) =>
                      setGetInTouch({
                        ...getInTouch,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter email address"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control
                    type="number"
                    // defaultValue={loggedInUser.phone_number}
                    onChange={(e) =>
                      setGetInTouch({
                        ...getInTouch,
                        phone_number: e.target.value,
                      })
                    }
                    placeholder="Phone Number"
                  />
                </Form.Group>
                {/* <Form.Group controlId="formBasicPassword">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    // defaultValue={loggedInUser.phone_number}
                    onChange={(e) =>
                      setGetInTouch({
                        ...getInTouch,
                        type: e.target.value,
                      })
                    }
                    placeholder="Subject"
                  />
                </Form.Group> */}
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    // defaultValue={`I am interested to inquire about your property in Dreamfinder: ID-${ref_code}. Please contact me according to your convenience
                    //           `}
                    placeholder="write your message here"
                    rows={3}
                    onChange={(e) =>
                      setGetInTouch({
                        ...getInTouch,
                        message: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <button className="getInTouchSendBtn" type="submit">
                  SEND MESSAGE
                </button>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;