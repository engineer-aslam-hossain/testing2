import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Dropdown, Form, Modal, Row, Col } from "react-bootstrap";
import fakePopularity from "../fakeData/fakePopularity";
import CheckIcon from "@material-ui/icons/Check";
import fakeRoleData from "../fakeData/fakeRoleData";
import fakeProperty from "../fakeData/fakeProperty";
import CloseIcon from "@material-ui/icons/Close";
import DreamFinderContext from "../components/Context/Context";
import Swal from "sweetalert2";

const ListANewProperty = () => {
  const { loggedInUser } = useContext(DreamFinderContext);

  const [show, setShow] = useState(false);
  const [listPropertyData, setListPropertyData] = useState({
    email: loggedInUser.email ? loggedInUser.email : "",
    name: loggedInUser.name ? loggedInUser.name : "",
    phone_number: loggedInUser.phone_number ? loggedInUser.phone_number : "",
  });
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState("");
  const [upozillas, setUpozillas] = useState([]);

  const [zillas, setZillas] = useState([]);
  const [zilla_id, setZilla_id] = useState("");
  const [division_id, setDivision_id] = useState("");

  // console.log(divisions, zillas);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/list/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listPropertyData),
        }
      );
      const data = await res.json();
      if (data.success === "yes") {
        // setDistrictData(data.data);
        handleShow();
      }
      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: data.message,
        });
      }
      setListPropertyData({});
      // console.log(data);
    } catch (err) {
      // console.log(err);
      Swal.fire({
        icon: "error",
        title: "something went wrong",
      });
    }
  };
  const residentHandler = () => {
    document.querySelector(".resBtn").classList.add("active");
    document.querySelector(".comBtn").classList.remove("active");
    document
      .querySelector(".proTypeOptionsDiv")
      .style.setProperty("display", "block");
    document
      .querySelector(".comercialOptionsDiv")
      .style.setProperty("display", "none");
  };
  const comarcialHandler = () => {
    document.querySelector(".resBtn").classList.remove("active");
    document.querySelector(".comBtn").classList.add("active");
    document
      .querySelector(".proTypeOptionsDiv")
      .style.setProperty("display", "none");
    document
      .querySelector(".comercialOptionsDiv")
      .style.setProperty("display", "block");
  };

  useEffect(() => {
    try {
      fetch(
        "https://raw.githubusercontent.com/engineer-aslam-hossain/AllDistrictUpazillaWithDhakaThana/master/AllDistrictUpazillaWithDhakaThana.json"
      )
        .then((res) => res.json())
        .then((data) => setUpozillas(data[2].data));
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(
        "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json"
      )
        .then((res) => res.json())
        .then((data) => setZillas(data[2].data));
    } catch (err) {
      console.log(err);
    }

    try {
      fetch(
        "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/divisions/divisions.json"
      )
        .then((res) => res.json())
        .then((data) => setDivisions(data[2].data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const zilaHandler = (item) => {
    setListPropertyData({
      ...listPropertyData,
      district: item.name,
    });
    setZilla_id(item.id);
  };

  const divisionHandler = (item) => {
    setDivision(item.name);
    setDivision_id(item.id);
  };

  // console.log(listPropertyData);
  return (
    <section className="list_a_new_property">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between findPropertyHeader align-items-center flex-wrap mb-4">
            <div>
              <h1>List a new Property</h1>
            </div>
            <div>
              <Link href="/profile">
                <a className="backToProfile">Back to Profile</a>
              </Link>
            </div>
          </div>
          <div className="col-md-12 listFormDiv p-4 py-5">
            <Form onSubmit={submitHandler} noValidate>
              <div className="col-md-12 d-flex justify-content-between  flex-wrap px-0">
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>My Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Full Name"
                      name="name"
                      value={loggedInUser.name || ""}
                      onChange={(e) =>
                        setListPropertyData({
                          ...listPropertyData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid" className="name">
                      {/* {!CreateUser.name
                      ? "name must be start with atleast 3 character"
                      : ""} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>My Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      value={loggedInUser.email || ""}
                      onChange={(e) =>
                        setListPropertyData({
                          ...listPropertyData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid" className="name">
                      {/* {!CreateUser.name
                      ? "name must be start with atleast 3 character"
                      : ""} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>My Phone</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Your Phone no."
                      name="phone_number"
                      value={loggedInUser.phone_number || ""}
                      onChange={(e) =>
                        setListPropertyData({
                          ...listPropertyData,
                          phone_number: e.target.value,
                        })
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid" className="name">
                      {/* {!CreateUser.name
                      ? "name must be start with atleast 3 character"
                      : ""} */}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <h2 className="listPropertyTitle">
                    List your Property in DreamFinder
                  </h2>
                  <p className="listPropertyDetails">
                    We have dedicated real estate experts ready and available to
                    meet with you face to face and manage your property
                    requirements individually.
                  </p>
                  <p className="listPropertyDetailsBold">
                    Just submit your property info and DreamFinder will contact
                    you very soon for further details.
                  </p>
                </div>
              </div>
              <div className="col-md-12 d-flex  flex-wrap px-0 mt-5 ">
                <div className="col-md-4 d-flex align-items-center justify-content-between flex-wrap my-3">
                  <h5 className="mr-4">I am a / an</h5>
                  <Dropdown className="">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {listPropertyData.role && listPropertyData.role.length > 0
                        ? listPropertyData.role.slice(0, 2).join(",")
                        : "Select Role"}
                      {listPropertyData.role && listPropertyData.role.length > 3
                        ? ` + ${listPropertyData.role.length - 2}`
                        : ""}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      className=""
                      style={{ padding: "0.5rem 2rem" }}
                    >
                      <div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              <fieldset>
                                <p>You're sign-up as ? </p>
                                <Form.Group as={Row}>
                                  <Col>
                                    {fakeRoleData.map((item) => (
                                      <Form.Check
                                        type="radio"
                                        label={item.role}
                                        name="role"
                                        required
                                        id={item.id}
                                        key={item.id}
                                        onChange={() =>
                                          setListPropertyData({
                                            ...listPropertyData,
                                            role: listPropertyData.role
                                              ? [
                                                  ...listPropertyData.role,
                                                  item.role,
                                                ]
                                              : [item.role],
                                          })
                                        }
                                      />
                                    ))}
                                  </Col>
                                </Form.Group>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Menu>
                    <Form.Control.Feedback type="invalid" className="role">
                      {/* {CreateUser.role.length < 1
                        ? "atleast 1 role must be selected"
                        : ""} */}
                    </Form.Control.Feedback>
                  </Dropdown>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-between flex-wrap my-3">
                  <h5 className="mr-4"> I want to </h5>
                  <Dropdown className="d-flex align-items-center">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {listPropertyData.purpose
                        ? listPropertyData.purpose
                        : "Select Purpose"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              <Dropdown.Item
                                onClick={() =>
                                  setListPropertyData({
                                    ...listPropertyData,
                                    purpose: "Sell",
                                  })
                                }
                              >
                                Sell
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setListPropertyData({
                                    ...listPropertyData,
                                    purpose: "Rent",
                                  })
                                }
                              >
                                Rent
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setListPropertyData({
                                    ...listPropertyData,
                                    purpose: "Auction",
                                  })
                                }
                              >
                                Auction
                              </Dropdown.Item>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-between flex-wrap my-3">
                  <h5 className="mr-4">a / an</h5>
                  <Dropdown>
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {listPropertyData.property_type
                        ? listPropertyData.property_type
                        : "All"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div className="mx-4 d-flex justify-content-center proTypeBtnDiv ">
                          <button
                            type="button"
                            onClick={residentHandler}
                            className="resBtn active"
                          >
                            RESIDENTIAL
                          </button>
                          <button
                            type="button"
                            onClick={comarcialHandler}
                            className="comBtn"
                          >
                            COMERCIAL
                          </button>
                        </div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              {fakeProperty.map(
                                (item) =>
                                  item.category === "residential" && (
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        setListPropertyData({
                                          ...listPropertyData,
                                          property_type: e.target.innerText,
                                        })
                                      }
                                      key={item.id}
                                      className="propertyTypeBtn"
                                      name="propertyType"
                                    >
                                      {listPropertyData.property_type ===
                                        item.name && (
                                        <CheckIcon className="mr-3" />
                                      )}
                                      {item.name}
                                    </button>
                                  )
                              )}
                              <div className="d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="resetBtn"
                                  onClick={(e) =>
                                    setListPropertyData({
                                      ...listPropertyData,
                                      property_type: "All",
                                    })
                                  }
                                >
                                  <CloseIcon /> Reset
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="comercialOptionsDiv">
                            <div className="d-flex flex-column">
                              {fakeProperty.map(
                                (item) =>
                                  item.category === "comercial" && (
                                    <button
                                      type="button"
                                      className="propertyTypeBtn"
                                      key={item.id}
                                      onClick={(e) =>
                                        setListPropertyData({
                                          ...listPropertyData,
                                          property_type: e.target.innerText,
                                        })
                                      }
                                    >
                                      {listPropertyData.property_type ===
                                        item.name && (
                                        <CheckIcon className="mr-3" />
                                      )}
                                      {item.name}
                                    </button>
                                  )
                              )}
                              <div className="d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="resetBtn"
                                  onClick={(e) =>
                                    setListPropertyData({
                                      ...listPropertyData,
                                      property_type: "All",
                                    })
                                  }
                                >
                                  <CloseIcon /> Reset
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-between flex-wrap my-3">
                  <h5 className="mr-4">in Division</h5>
                  <Dropdown className="d-flex align-items-center">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {(division && division) || "Select Divison"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              {divisions.map((item) => (
                                <button
                                  type="button"
                                  className="propertyTypeBtn"
                                  key={item.id}
                                  onClick={() => divisionHandler(item)}
                                >
                                  {division === item.name && (
                                    <CheckIcon className="mr-3" />
                                  )}
                                  {item.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-between flex-wrap my-3">
                  <h5 className="mr-4">Zilla</h5>
                  <Dropdown className="d-flex align-items-center">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {(listPropertyData.district &&
                        listPropertyData.district) ||
                        "Select Zilla"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              {zillas.map(
                                (item) =>
                                  division_id &&
                                  division_id === item.division_id && (
                                    <button
                                      type="button"
                                      className="propertyTypeBtn"
                                      key={item.id}
                                      onClick={() => zilaHandler(item)}
                                    >
                                      {listPropertyData.district ===
                                        item.name && (
                                        <CheckIcon className="mr-3" />
                                      )}
                                      {item.name}
                                    </button>
                                  )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-between flex-wrap my-3">
                  <h5 className="mr-4">Thana/Upozilla</h5>
                  <Dropdown className="d-flex align-items-center">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {(listPropertyData.subdistrict &&
                        listPropertyData.subdistrict) ||
                        "Select Thana/Upozilla"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              {upozillas.map(
                                (item) =>
                                  zilla_id &&
                                  zilla_id === item.district_id && (
                                    <button
                                      type="button"
                                      className="propertyTypeBtn"
                                      key={item.id}
                                      onClick={() =>
                                        setListPropertyData({
                                          ...listPropertyData,
                                          subdistrict: item.name,
                                        })
                                      }
                                    >
                                      {listPropertyData.subdistrict ===
                                        item.name && (
                                        <CheckIcon className="mr-3" />
                                      )}
                                      {/* {console.log(listPropertyData.district)} */}
                                      {item.name}
                                    </button>
                                  )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="px-3 mt-3">
                <button type="submit" className="listPropertySubmitBtn">
                  Submit Form
                </button>
              </div>
            </Form>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <div className="p-4 listNewPropertyModal">
            <div>
              <h2>Request Recorded</h2>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-center ">
              <div className="checkIconDiv my-3">
                <CheckIcon />
              </div>
              <h4>
                Your Property Listing Request was recorded successfully. Please
                wait and DreamFinder will contact you very soon
              </h4>
              <p>You can view your pending properties from your Profile</p>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <Link href="/profile">
                <a className="backToProfile mr-4">Go to Profile</a>
              </Link>
              <button className="listPropertySubmitBtn" onClick={handleClose}>
                Okay
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default ListANewProperty;
