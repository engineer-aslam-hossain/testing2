import { Dropdown, Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import fakeProperty from "../../fakeData/fakeProperty";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NewPropertyListing = () => {
  const router = useRouter();

  const [addListDetails, setAddListDetails] = useState({
    currency: "BDT",
    category: "Residential",
  });

  const residentHandler = () => {
    setAddListDetails({
      ...addListDetails,
      category: "Residential",
    });
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
    setAddListDetails({
      ...addListDetails,
      category: "Comercial",
    });
    document.querySelector(".resBtn").classList.remove("active");
    document.querySelector(".comBtn").classList.add("active");
    document
      .querySelector(".proTypeOptionsDiv")
      .style.setProperty("display", "none");
    document
      .querySelector(".comercialOptionsDiv")
      .style.setProperty("display", "block");
  };
  const [upozillas, setUpozillas] = useState([]);
  const [zillas, setZillas] = useState([]);
  const [zilla_id, setZilla_id] = useState("");

  useEffect(() => {
    try {
      fetch(
        "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/upazilas/upazilas.json"
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
  }, []);

  const zilaHandler = (item) => {
    setAddListDetails({
      ...addListDetails,
      address_district: item.name,
    });
    setZilla_id(item.id);
  };

  const [amenist, setAmenist] = useState("");
  const [extraAmenities, SetExtraAmenities] = useState({
    cctv: false,
    security: false,
    lift: false,
    gas: false,
    tiles: false,
    pool: false,
    gym: false,
    prayer_room: false,
    exit: false,
    stair: false,
    parking: false,
  });
  // console.log(extraAmenities);
  const amenistHandler = () => {
    setAddListDetails({
      ...addListDetails,
      amenity: addListDetails.amenity
        ? [...addListDetails.amenity, amenist]
        : [amenist],
    });
    setAmenist("");
  };

  const [extraPropertyDetails, setExtraPropertyDetails] = useState([]);
  const [propertyDetail, setpropertyDetail] = useState("");
  const propertyDetailHandler = () => {
    setExtraPropertyDetails([...extraPropertyDetails, propertyDetail]);
    setpropertyDetail("");
  };

  const amenityHandler = (item) => {
    const itemIndex =
      addListDetails.amenity && addListDetails.amenity.indexOf(item);
    addListDetails.amenity && addListDetails.amenity.includes(item)
      ? addListDetails.amenity.splice(itemIndex, 1)
      : setAddListDetails({
          ...addListDetails,
          amenity: addListDetails.amenity
            ? [...addListDetails.amenity, item]
            : [item],
        });
  };

  console.log(addListDetails);

  useEffect(() => {
    setAddListDetails({
      ...addListDetails,
      amenity: addListDetails.amenity
        ? [...addListDetails.amenity, extraAmenities]
        : [extraAmenities],
    });
  }, [extraAmenities]);

  useEffect(() => {
    setAddListDetails({
      ...addListDetails,
      detail: {
        ...addListDetails.detail,
        extra_details: extraPropertyDetails,
      },
    });
  }, [extraPropertyDetails]);

  const propertySubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("DreamFinder_session"));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            DreamFinder: token,
          },
          body: JSON.stringify(addListDetails),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Property Posted SuccessFully",
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
    setAddListDetails({ currency: "BDT", category: "Residential" });
  };

  // console.log(addListDetails);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between my-4 newPropertyListing align-items-center flex-wrap">
            <div>
              <h1>New Property Listing</h1>
            </div>
            <div>
              <button className="showRequest ">
                <strong>SHOW ALL REQUESTS</strong>
              </button>
            </div>
          </div>

          <div className="col-md-12 my-4">
            <div className="col-md-9">
              <Form
                className="newPropertyListingForm"
                onSubmit={propertySubmitHandler}
              >
                <Form.Group>
                  <h5>Property Name</h5>
                  <Form.Control
                    type="text"
                    placeholder="Property Name"
                    onChange={(e) =>
                      setAddListDetails({
                        ...addListDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <div className="d-flex align-items-center flex-wrap my-3">
                  <h5 className=""> Property Type </h5>
                  <Dropdown>
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {addListDetails.property_type
                        ? addListDetails.property_type
                        : "All"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div className="mx-4 d-flex justify-content-center proTypeBtnDiv ">
                          <button
                            onClick={residentHandler}
                            className="resBtn active"
                            type="button"
                          >
                            RESIDENTIAL
                          </button>
                          <button
                            onClick={comarcialHandler}
                            className="comBtn"
                            type="button"
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
                                        setAddListDetails({
                                          ...addListDetails,
                                          property_type: e.target.innerText,
                                        })
                                      }
                                      key={item.id}
                                      className="propertyTypeBtn"
                                      name="propertyType"
                                    >
                                      {addListDetails.property_type ===
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
                                  onClick={() => SetProperty("All")}
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
                                        setAddListDetails({
                                          ...addListDetails,
                                          property_type: e.target.innerText,
                                        })
                                      }
                                    >
                                      {addListDetails.property_type ===
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
                                  onClick={() => SetProperty("All")}
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
                <div className="d-flex align-items-center flex-wrap my-3">
                  <h5 className=""> Purpose </h5>
                  <Dropdown className="d-flex align-items-center">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {addListDetails.purpose
                        ? addListDetails.purpose
                        : "Select Purpose"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              <Dropdown.Item
                                onClick={() =>
                                  setAddListDetails({
                                    ...addListDetails,
                                    purpose: "Sell",
                                  })
                                }
                              >
                                Sell
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setAddListDetails({
                                    ...addListDetails,
                                    purpose: "Rent",
                                  })
                                }
                              >
                                Rent
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setAddListDetails({
                                    ...addListDetails,
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
                <div className="d-flex align-items-center flex-wrap my-3">
                  <h5 className=""> District</h5>
                  <Dropdown className="d-flex align-items-center">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {(addListDetails.address_district &&
                        addListDetails.address_district) ||
                        "Select Location"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchDropDownMenu">
                      <div>
                        <div>
                          <div className="proTypeOptionsDiv">
                            <div className="d-flex flex-column">
                              {zillas.map((item) => (
                                <button
                                  type="button"
                                  className="propertyTypeBtn"
                                  key={item.id}
                                  onClick={() => zilaHandler(item)}
                                >
                                  {addListDetails.address_district ===
                                    item.name && <CheckIcon className="mr-3" />}
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
                <div className="d-flex align-items-center flex-wrap my-3">
                  <h5 className=""> Sub-District </h5>
                  <Dropdown className="d-flex align-items-center">
                    <Dropdown.Toggle className="headerMain" drop="left">
                      {(addListDetails.address_subdistrict &&
                        addListDetails.address_subdistrict) ||
                        "Select Sub-Location"}
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
                                        setAddListDetails({
                                          ...addListDetails,
                                          address_subdistrict: item.name,
                                        })
                                      }
                                    >
                                      {addListDetails.address_subdistrict ===
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
                <Form.Group>
                  <h5>City / Area</h5>
                  <Form.Control
                    type="text"
                    placeholder="CIty / Area"
                    onChange={(e) =>
                      setAddListDetails({
                        ...addListDetails,
                        address_area: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <h5>Detailed Address</h5>
                  <Form.Control
                    type="text"
                    placeholder="Detailed Address"
                    onChange={(e) =>
                      setAddListDetails({
                        ...addListDetails,
                        address: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {/* <Form.Group >
                  <h5>Maps Location</h5>
                  <Form.Control
                    type="text"
                    placeholder="Maps Location"
                    onChange={(e) =>
                      setAddListDetails({
                        ...addListDetails,
                        location: e.target.value,
                      })
                    }
                  />
                </Form.Group> */}
                <div className="col-md-8 px-0">
                  <Form.Group>
                    <h5>Price</h5>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          price: parseInt(e.target.value),
                        })
                      }
                    />
                    <h6 className="ml-3">BDT</h6>
                  </Form.Group>
                  <Form.Group>
                    <h5>Service Charge</h5>
                    <Form.Control
                      type="number"
                      placeholder="Service Charge"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            service_charge: e.target.value,
                          },
                        })
                      }
                    />
                    <h6 className="ml-3">BDT</h6>
                  </Form.Group>
                  <Form.Group>
                    <h5>Area</h5>
                    <Form.Control
                      type="number"
                      placeholder="Area"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          area_sqft: Math.floor(e.target.value),
                        })
                      }
                    />
                    <h6 className="ml-3">Sqr.Ft</h6>
                  </Form.Group>
                  <Form.Group>
                    <h5>Land Size</h5>
                    <Form.Control
                      type="number"
                      placeholder="Land Size"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            land_size: e.target.value,
                          },
                        })
                      }
                    />
                    <h6 className="ml-3">Katha</h6>
                  </Form.Group>

                  <Form.Group>
                    <h5>Floor</h5>
                    <Form.Control
                      type="text"
                      placeholder="Floor"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            floor: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <h5>Unit</h5>
                    <Form.Control
                      type="text"
                      placeholder="Unit"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            unit: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Beds</h5>
                    <Form.Control
                      type="number"
                      placeholder="Beds"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          bed: Math.floor(e.target.value),
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Baths</h5>
                    <Form.Control
                      type="number"
                      placeholder="Baths"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          bath: Math.floor(e.target.value),
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Belcony</h5>
                    <Form.Control
                      type="number"
                      placeholder="Belcony"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            belcony: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <h5>Description</h5>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) =>
                      setAddListDetails({
                        ...addListDetails,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <div className="col-md-8 pb-5 px-0 addingDiv">
                  <div>
                    <Form.Group>
                      <h5>Amenities List</h5>
                      <Form.Control
                        type="text"
                        placeholder="Amenities"
                        value={amenist}
                        onChange={(e) => setAmenist(e.target.value)}
                      />
                      <button type="button" onClick={amenistHandler}>
                        <AddIcon />
                      </button>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox1">
                      <h5>CCTV</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("CCTV")}
                        label="CCTV ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox2">
                      <h5>Security</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Security")}
                        label="Security ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox3">
                      <h5>Lift</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Lift")}
                        label="Lift ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox4">
                      <h5>Gas</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Gas")}
                        label="Gas ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox5">
                      <h5>Tiles</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Tiles")}
                        label="Tiles ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox6">
                      <h5>Swimming Pool</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Swimming Pool")}
                        label="Swimming Pool ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox7">
                      <h5>Gym</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Gym")}
                        label="Gym ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox8">
                      <h5>Prayer Room</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Prayer Room")}
                        label="Prayer Room ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox9">
                      <h5>Emergency Exit</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Emergency Exit")}
                        label="Emergency Exit ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox10">
                      <h5>Stair</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Stair")}
                        label="Stair ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox11">
                      <h5>Parking</h5>
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Parking")}
                        label="Parking ?"
                      />
                    </Form.Group>
                    {/* <div className="d-flex flex-column justify-content-center align-items-center my-3">
                      {addListDetails.amenity &&
                        addListDetails.amenity.map(
                          (item, index) =>
                            item !== extraAmenities && (
                              <h5 key={index} className="mb-0">
                                {index + 1}-{item}
                              </h5>
                            )
                        )}
                    </div> */}
                  </div>
                  <div>
                    <Form.Group>
                      <h5>Property Details List</h5>
                      <Form.Control
                        type="text"
                        value={propertyDetail}
                        placeholder="Property Details List"
                        onChange={(e) => setpropertyDetail(e.target.value)}
                      />
                      <button type="button" onClick={propertyDetailHandler}>
                        <AddIcon />
                      </button>
                    </Form.Group>
                    <div className="d-flex flex-column justify-content-center align-items-center my-3">
                      {addListDetails.detail &&
                        addListDetails.detail.extra_details &&
                        addListDetails.detail.extra_details.map(
                          (item, index) => (
                            <h5 key={index} className="mb-0">
                              {index + 1}-{item}
                            </h5>
                          )
                        )}
                    </div>
                  </div>

                  {/* <Form.Group >
                    <h5>Images</h5>
                    <Form.Control type="file" placeholder="Images" />
                    <button type="button">
                      <AddIcon />
                    </button>
                  </Form.Group> */}

                  <Form.Group>
                    <h5>Developer Name</h5>
                    <Form.Control
                      type="text"
                      placeholder="Developer Name"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            developer_name: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <h5>Handover Date</h5>
                    <Form.Control
                      type="date"
                      placeholder="Handover Date"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            handover_date: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Manager Name</h5>
                    <Form.Control
                      type="text"
                      placeholder="Manager Name"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            manager_name: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Manager Number</h5>
                    <Form.Control
                      type="number"
                      placeholder="Manager Number"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            manager_number: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Landlord Name</h5>
                    <Form.Control
                      type="text"
                      placeholder="Landlord Name"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            landlord_name: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Landlord Number</h5>
                    <Form.Control
                      type="number"
                      placeholder="Landlord Number"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            landlord_number: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6 d-flex  justify-content-between my-5 px-0">
                  <button className="postPropertyBtn" type="submit">
                    POST THIS PROPERTY
                  </button>
                  <button
                    className="showRequest"
                    type="button"
                    onClick={() => router.push("/dashboard")}
                  >
                    CANCEL
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPropertyListing;
