import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Link from "next/link";
import { Card, CardDeck, Form } from "react-bootstrap";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SingleProperty from "../../components/SingleProperty/SingleProperty";
import DreamFinderContext from "../../components/Context/Context";
import Swal from "sweetalert2";

import { useContext, useState } from "react";

const SinglePropertyInfoDetails = ({ data }) => {
  const {
    address,
    address_area,
    address_district,
    name,
    description,
    detail,
    amenity,
    price,
    ref_code,
  } = data.data;

  const {
    extra_details,
    belcony,
    unit,
    developer_name,
    floor,
    land_size,
    landlord_name,
    landlord_number,
    manager_name,
    manager_number,
    service_charge,
  } = detail;

  const { allProperty, loggedInUser } = useContext(DreamFinderContext);
  const similarProperty = allProperty.filter(
    (item) => item.address_district === address_district
  );

  const [getInTouch, setGetInTouch] = useState({
    type: "Get In Touch",
    name: loggedInUser.name ? loggedInUser.name : "",
    email: loggedInUser.email ? loggedInUser.email : "",
    phone_number: loggedInUser.phone_number ? loggedInUser.phone_number : "",
    message: `I am interested to inquire about your property in DreamFinder: ID-${ref_code}. Please contact me according to your convenience
    `,
  });

  // console.log(data.data);

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

  if (data) {
    return (
      <section className="SingleAreaInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between align-items-center mb-4 mt-5 flex-wrap">
              <div className="findedPropertyHeader">
                <h1>Property in {address_area}</h1>
                <Link href="/">
                  <a>Search more properties in {address_district}</a>
                </Link>
              </div>
              <h3>
                <FavoriteBorderIcon style={{ fontSize: "1.8rem" }} />
                Save This Property
              </h3>
            </div>
            <div className="col-md-12">
              <Card className="propertyCard">
                <Card.Body>
                  <Card.Img variant="top" src="/images/Foyer-Mob 1.png" />
                  <div className="col-md-12 d-flex justify-content-end algin-items-center px-0 propertyCardButtonGroup">
                    <button>
                      <LocationOnIcon /> location in maps
                    </button>
                    <button>
                      <MonetizationOnIcon /> floor plan
                    </button>
                    <button>
                      <MonetizationOnIcon /> mortgage calculator
                    </button>
                    <button>
                      <ZoomOutMapIcon /> expand images
                    </button>
                  </div>
                  <div className="col-md-12 d-flex flex-wrap">
                    <div className="col-md-8">
                      <div className="propertyName mb-3">
                        <h2>{name}</h2>
                        <div className="d-flex align-items-center">
                          <h4>{address}</h4>
                          {/* <Link href="/">( Open In Maps )</Link> */}
                        </div>
                      </div>

                      <div className="FindedPropertyDetails mb-4">
                        <h5>property details</h5>
                        <p>Floor : {floor} </p>
                        <p>Unit : {unit} </p>
                        <p>Belcony : {belcony} </p>
                        <p>Land Size : {land_size} Katha </p>
                        <p>Service Charge : {service_charge} </p>
                        <p>Manager Name : {manager_name} </p>
                        <p>Manager Number : {manager_number} </p>
                        <p>Land Lord Name : {landlord_name} </p>
                        <p>Land Lord Number : {landlord_number} </p>
                        <p>Developer Name : {developer_name} </p>

                        <ul>
                          {extra_details &&
                            extra_details.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                        </ul>
                      </div>
                      <div className="FindedPropertyDetails mb-4">
                        <h5>property descriptions</h5>
                        <p>{description}</p>
                      </div>
                      <div className="FindedPropertyDetails mb-4">
                        <h5>property amenities</h5>
                        <ul>
                          {amenity &&
                            amenity.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="findedItemcontactUsForm">
                        <h1>{price} BDT</h1>
                        <p>GET IN TOUCH WITH US</p>
                      </div>
                      <Card style={{ padding: "1rem" }} className="signUpCard">
                        <Form noValidate onSubmit={getInTouchSubmitHandler}>
                          <div className="formHeading">
                            {/* <p>Property ID: 12144141</p>
                            <h1>A1B2C3D4</h1> */}
                          </div>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={loggedInUser.name}
                              placeholder="Enter Your Full Name"
                              onChange={(e) =>
                                setGetInTouch({
                                  ...getInTouch,
                                  name: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control
                              type="email"
                              defaultValue={loggedInUser.email}
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
                              defaultValue={loggedInUser.phone_number}
                              onChange={(e) =>
                                setGetInTouch({
                                  ...getInTouch,
                                  phone_number: e.target.value,
                                })
                              }
                              placeholder="Phone Number"
                            />
                          </Form.Group>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              defaultValue={getInTouch.message}
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
                          <button className="messageSendBtn" type="submit">
                            GET IN TOUCH
                          </button>
                        </Form>
                        <div className="contactUpFormFooter">
                          <p>
                            Or, You can call or email us yourself from bellow.
                            Be sure to mention the Property ID while discussing
                            on mail or phone
                          </p>
                          <div className="d-flex justify-content-between">
                            <button>call</button>
                            <button>email</button>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="FindedPropertyDetails col-md-12">
                      <h5>location nearby</h5>
                      <div className="col-md-12 d-flex  algin-items-center px-0 propertyCardButtonGroup">
                        <button>
                          <LocationOnIcon /> location in maps
                        </button>
                        <button>
                          <MonetizationOnIcon /> floor plan
                        </button>
                        <button>
                          <MonetizationOnIcon /> mortgage calculator
                        </button>
                        <button>
                          <ZoomOutMapIcon /> expand images
                        </button>
                      </div>
                      <div className="mapDiv">
                        <img src="/images/locations.png" alt="" />
                        {/* <iframe
                          src="http://maps.google.com/maps?q=23.770541202199745, 90.40633522570474&z=15&output=embed"
                          height="500px"
                        ></iframe> */}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-12 findedPropertyFooter">
              <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
                <h1>Similar Properties</h1>
                <button>see all</button>
              </div>
              <div className="col-md-12">
                <CardDeck>
                  {similarProperty
                    .slice(0, 3)
                    .map(
                      (item) =>
                        item.address_district === address_district && (
                          <SingleProperty item={item} key={item._id} />
                        )
                    )}
                </CardDeck>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    // return <Error />;
  }
};

export default SinglePropertyInfoDetails;

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/property/?_id=${params.id}`
  );
  const data = await res.json();
  // console.log(data);

  return { props: { data } };
}
