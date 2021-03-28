import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Swal from "sweetalert2";
const PostPopularLocations = () => {
  const [locationArea, setLocationArea] = useState("");

  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  const jobFunctionsHandler = () => {
    setLocations([...locations, location]);
    setLocation("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(locationArea, locations);
    try {
      const token = JSON.parse(localStorage.getItem("DreamFinder_session"));
      const popular_area = {};
      popular_area[locationArea] = locations;
      //   console.log(JSON.stringify(popular_area));
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/config/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: token,
        },

        body: JSON.stringify({ popular_location: popular_area }),
      });
      const data = await res.json();
      //   console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "New Popular Location Posted SuccessFully",
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
    setLocations([]);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5">
            <h1 className="dashboardTitle">Post A Location</h1>
          </div>
          <div className="col-md-8">
            <Form
              className="newPropertyListingForm"
              noValidate
              onSubmit={submitHandler}
            >
              <Form.Group>
                <h5>Zilla</h5>
                <Form.Control
                  type="text"
                  placeholder="Zilla"
                  onChange={(e) => setLocationArea(e.target.value)}
                />
              </Form.Group>
              <div className="addingDiv">
                <Form.Group controlId="formBasicEmail">
                  <h5>Area</h5>
                  <Form.Control
                    type="text"
                    placeholder="Area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button type="button" onClick={jobFunctionsHandler}>
                    <AddIcon />
                  </button>
                </Form.Group>
                <div className="d-flex flex-column justify-content-center align-items-center my-3">
                  {locations &&
                    locations.map((item, index) => (
                      <h5 key={index} className="mb-0">
                        {index + 1}-{item}
                      </h5>
                    ))}
                </div>
              </div>

              <div className="col-md-8 col-lg-6 col-8 d-flex  justify-content-between my-5 px-0">
                <button className="postPropertyBtn" type="submit">
                  POST THIS LOCATION
                </button>
                <button className="showRequest" type="button">
                  CANCEL
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostPopularLocations;
