import { Dropdown, Form, Modal } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { useContext, useEffect, useState } from "react";
import fakeProperty from "../../fakeData/fakeProperty";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import { withRouter } from "next/router";
import DreamFinderContext from "../../components/Context/Context";

const collectNewProperty = ({ router }) => {
  const { loggedInUser } = useContext(DreamFinderContext);
  const route = useRouter();
  const [postRequest, setPostRequest] = useState({});
  const [addListDetails, setAddListDetails] = useState({
    currency: "BDT",
    category: "Residential",
  });

  // console.log(addListDetails);

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

  // console.log(postRequest);
  const asyncFunction = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/engineer-aslam-hossain/AllDistrictUpazillaWithDhakaThana/master/AllDistrictUpazillaWithDhakaThana.json"
      );

      const data = await res.json();
      // console.log(data[2].data);
      setUpozillas(data[2].data);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json"
      );
      const data = await res.json();
      // console.log(data[2].data);
      setZillas(data[2].data);
    } catch (err) {
      console.log(err);
    }

    try {
      const token = JSON.parse(localStorage.getItem("DreamFinder_session"));
      const postId = await router.query.post;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/list/?_id=${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            DreamFinder: token,
          },
        }
      );
      const data = await res.json();

      if (data.success === "yes") {
        setAddListDetails({
          ...addListDetails,
          address_district: data.data.district,
          address_subdistrict: data.data.subdistrict,
          property_type: data.data.property_type,
          submitor_id: data.data._id,
          purpose: data.data.purpose,
        });
        setPostRequest(data.data);
      }

      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    asyncFunction();
  }, []);

  useEffect(() => {
    const loginUser_id = loggedInUser._id;
    loginUser_id &&
      setAddListDetails({
        ...addListDetails,
        submitor_id: loginUser_id,
      });
  }, [loggedInUser]);

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

  // console.log(addListDetails);

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/create/as/data-collector`,
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
          title: "Property Data Collected SuccessFully",
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [uploadImage, setUploadImage] = useState({});
  const [imageArr, setImageArr] = useState([]);

  // console.log(imageArr);

  const modalCancel = () => {
    handleClose();
    setUploadImage({});
  };

  const handleFileChange = async (e) => {
    setUploadImage(e.target.files[0]);
    handleShow();
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append("file", uploadImage);
    setImageArr([...imageArr, uploadImage]);

    handleClose();
    try {
      const token = JSON.parse(localStorage.getItem("DreamFinder_session"));
      axios({
        method: "post",
        cache: false,
        contentType: false,
        processData: false,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/file/upload`,
        data: formData,
        headers: { DreamFinder: token },
      })
        .then(function (response) {
          //handle success
          const { data } = response;
          setAddListDetails({
            ...addListDetails,
            images: addListDetails.images
              ? [...addListDetails.images, data.data]
              : [data.data],
          });

          console.log(data);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(addListDetails);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between my-4 newPropertyListing align-items-center flex-wrap">
            <div>
              <h1>New Collection Request</h1>
            </div>
          </div>

          <div className="col-md-12 my-4">
            <div className="col-xl-9">
              <Form
                className="collectPropertyForm"
                onSubmit={propertySubmitHandler}
              >
                <Form.Group>
                  <Form.Label>Property Name</Form.Label>
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
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    className="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file" className="fileLabel">
                    <p className="mb-0">Select file</p> <PublishIcon />
                  </label>
                </Form.Group>
                <Form.Group>
                  <h5></h5>
                  <div className="">
                    {imageArr &&
                      imageArr.map((item, index) => (
                        <p key={index} className="mb-0">
                          {item.name}
                        </p>
                      ))}
                  </div>
                </Form.Group>

                <div className="my-3">
                  <Form.Label>Property Type</Form.Label>
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
                <div className="my-3">
                  <Form.Label>Purpose</Form.Label>
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
                <div className=" my-3">
                  <Form.Label>District</Form.Label>
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
                <div className=" my-3">
                  <Form.Label>Sub-District</Form.Label>
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
                  <Form.Label>City / Area</Form.Label>
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
                  <Form.Label>Detailed Address</Form.Label>
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
                    <Form.Label>Price</Form.Label>
                    <div className="d-flex justify-content-between align-items-center">
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
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Service Charge</Form.Label>
                    <div className="d-flex justify-content-between align-items-center">
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
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Area</Form.Label>
                    <div className="d-flex justify-content-between align-items-center">
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
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Land Size</Form.Label>
                    <div className="d-flex justify-content-between align-items-center">
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
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Floor</Form.Label>
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
                    <Form.Label>Unit</Form.Label>
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
                    <Form.Label>Beds</Form.Label>
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
                    <Form.Label>Baths</Form.Label>
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
                    <Form.Label>Balcony</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Balcony"
                      onChange={(e) =>
                        setAddListDetails({
                          ...addListDetails,
                          detail: {
                            ...addListDetails.detail,
                            balcony: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
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
                      <Form.Label>Amenities List</Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Control
                          type="text"
                          placeholder="Amenities"
                          value={amenist}
                          onChange={(e) => setAmenist(e.target.value)}
                        />
                        <button type="button" onClick={amenistHandler}>
                          <AddIcon />
                        </button>
                      </div>
                    </Form.Group>
                    <div className="d-flex flex-column justify-content-center align-items-center my-3">
                      {addListDetails.amenity &&
                        addListDetails.amenity.map(
                          (item, index) =>
                            item !== extraAmenities && (
                              <p key={index} className="mb-0">
                                {index + 1}-{item}
                              </p>
                            )
                        )}
                    </div>
                    <Form.Group controlId="formBasicCheckbox1">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("CCTV")}
                        label="CCTV ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox2">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Security")}
                        label="Security ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox3">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Lift")}
                        label="Lift ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox4">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Gas")}
                        label="Gas ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox5">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Tiles")}
                        label="Tiles ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox6">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Swimming Pool")}
                        label="Swimming Pool ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox7">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Gym")}
                        label="Gym ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox8">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Prayer Room")}
                        label="Prayer Room ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox9">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Emergency Exit")}
                        label="Emergency Exit ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox10">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Stair")}
                        label="Stair ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox11">
                      <Form.Check
                        type="checkbox"
                        onChange={() => amenityHandler("Parking")}
                        label="Parking ?"
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group>
                      <Form.Label>Property Details List</Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Control
                          type="text"
                          value={propertyDetail}
                          placeholder="Property Details List"
                          onChange={(e) => setpropertyDetail(e.target.value)}
                        />
                        <button type="button" onClick={propertyDetailHandler}>
                          <AddIcon />
                        </button>
                      </div>
                    </Form.Group>
                    <div className="d-flex flex-column justify-content-center align-items-center my-3">
                      {addListDetails.detail &&
                        addListDetails.detail.extra_details &&
                        addListDetails.detail.extra_details.map(
                          (item, index) => (
                            <p key={index} className="mb-0">
                              {index + 1}-{item}
                            </p>
                          )
                        )}
                    </div>
                  </div>

                  <Form.Group>
                    <Form.Label>Developer Name</Form.Label>
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
                    <Form.Label>Handover Date</Form.Label>
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
                    <Form.Label>Manager Name</Form.Label>
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
                    <Form.Label>Manager Number</Form.Label>
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
                    <Form.Label>Landlord Name</Form.Label>
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
                    <Form.Label>Landlord Number</Form.Label>
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

                <div className="col-lg-6 d-flex  justify-content-between my-5 px-0">
                  <button className="postPropertyBtn" type="submit">
                    SAVE PROPERTY COLLECTION
                  </button>
                  <button
                    className="showRequest"
                    type="button"
                    onClick={() => route.push("/dashboard")}
                  >
                    CANCEL
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <div>
                <h5>Upload File ?</h5>
              </div>
              <div>
                <p>image.jpg</p>
              </div>
              <div className="col-md-6 d-flex  justify-content-between my-4 ml-auto px-0">
                <button
                  className="showRequest"
                  type="button"
                  onClick={modalCancel}
                >
                  CANCEL
                </button>
                <button
                  className="postPropertyBtn"
                  type="button"
                  onClick={fileUploadHandler}
                >
                  Upload
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default withRouter(collectNewProperty);
