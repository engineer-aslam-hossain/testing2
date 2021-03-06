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

const NewPropertyListing = ({ router }) => {
  const { loggedInUser } = useContext(DreamFinderContext);
  const route = useRouter();
  const [postRequest, setPostRequest] = useState({});
  const [addListDetails, setAddListDetails] = useState({
    currency: "BDT",
    category: "Residential",
    is_disable: false,
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

      if (router.query.routeType === "collected") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/property/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              DreamFinder: token,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.success === "yes") {
          const {
            address,
            address_area,
            address_block,
            address_district,
            address_subdistrict,
            amenity,
            area_sqft,
            bath,
            bed,
            description,
            detail,
            images,
            name,
            price,
            property_type,
            purpose,
            submitor_id,
            title,
          } = data.data;
          setAddListDetails({
            ...addListDetails,
            address: address,
            address_area: address_area,
            address_block: address_block,
            address_district: address_district,
            address_subdistrict: address_subdistrict,
            amenity: amenity,
            area_sqft: area_sqft,
            bath: bath,
            bed: bed,
            description: description,
            detail: detail,
            images: images,
            name: name,
            price: price,
            property_type: property_type,
            purpose: purpose,
            submitor_id: submitor_id._id,
            title: title,
          });
        }
      } else {
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
        console.log(data);
        if (data.success === "yes") {
          const {
            district,
            email,
            name,
            subdistrict,
            property_type,
            purpose,
          } = data.data;
          setAddListDetails({
            ...addListDetails,
            submitor: {
              name: name,
              email: email,
            },
            address_district: district,
            address_subdistrict: subdistrict,
            property_type: property_type,
            purpose: purpose,
          });
        }
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
    const loginUser = loggedInUser._id;
    loginUser &&
      setAddListDetails({
        ...addListDetails,
        submitor_id: loginUser,
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
      ? setAddListDetails({
          ...addListDetails,
          amenity: addListDetails.amenity.filter(
            (item) => addListDetails.amenity.indexOf(item) !== itemIndex
          ),
        })
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
        setAddListDetails({ currency: "BDT", category: "Residential" });
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
              <h1>New Property Listing</h1>
            </div>
            <div>
              <button className="showRequest ">
                <strong>SHOW ALL REQUESTS</strong>
              </button>
            </div>
          </div>

          <div className="col-md-12 my-4">
            <div className="col-xl-9">
              <Form
                className="newPropertyListingForm"
                onSubmit={propertySubmitHandler}
              >
                <Form.Group>
                  <Form.Label>Property Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Property Name"
                    defaultValue={addListDetails.name}
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
                    {addListDetails.images &&
                      addListDetails.images.map((item, index) => (
                        <p key={index} className="mb-0">
                          {item}
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
                    placeholder="City / Area"
                    defaultValue={addListDetails.address_area}
                    onChange={(e) =>
                      setAddListDetails({
                        ...addListDetails,
                        address_area: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address Block</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Block"
                    defaultValue={addListDetails.address_block}
                    onChange={(e) =>
                      setAddListDetails({
                        ...addListDetails,
                        address_block: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Detailed Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Detailed Address"
                    defaultValue={addListDetails.address}
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
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        placeholder="Price"
                        defaultValue={addListDetails.price}
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
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        placeholder="Service Charge"
                        defaultValue={
                          addListDetails.detail &&
                          addListDetails.detail.service_charge
                        }
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
                    <div className="d-flex align-items-center">
                      {" "}
                      <Form.Control
                        type="number"
                        placeholder="Area"
                        defaultValue={addListDetails.area_sqft}
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
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        placeholder="Land Size"
                        defaultValue={
                          addListDetails.detail &&
                          addListDetails.detail.land_size
                        }
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
                      defaultValue={
                        addListDetails.detail && addListDetails.detail.floor
                      }
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
                      defaultValue={
                        addListDetails.detail && addListDetails.detail.unit
                      }
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
                      defaultValue={addListDetails.bed}
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
                      defaultValue={addListDetails.bath}
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
                      defaultValue={
                        addListDetails.detail && addListDetails.detail.balcony
                      }
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
                    defaultValue={addListDetails.description}
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
                      <div className="d-flex align-items-center">
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
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("CCTV")
                        }
                        type="checkbox"
                        onChange={() => amenityHandler("CCTV")}
                        label="CCTV ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox2">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Security")
                        }
                        onChange={() => amenityHandler("Security")}
                        label="Security ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox3">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Lift")
                        }
                        onChange={() => amenityHandler("Lift")}
                        label="Lift ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox4">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Gas")
                        }
                        onChange={() => amenityHandler("Gas")}
                        label="Gas ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox5">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Tiles")
                        }
                        onChange={() => amenityHandler("Tiles")}
                        label="Tiles ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox6">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Swimming Pool")
                        }
                        onChange={() => amenityHandler("Swimming Pool")}
                        label="Swimming Pool ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox7">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Gym")
                        }
                        onChange={() => amenityHandler("Gym")}
                        label="Gym ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox8">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Prayer Room")
                        }
                        onChange={() => amenityHandler("Prayer Room")}
                        label="Prayer Room ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox9">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Emergency Exit")
                        }
                        onChange={() => amenityHandler("Emergency Exit")}
                        label="Emergency Exit ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox10">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Stair")
                        }
                        onChange={() => amenityHandler("Stair")}
                        label="Stair ?"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox11">
                      <Form.Check
                        type="checkbox"
                        checked={
                          addListDetails.amenity &&
                          addListDetails.amenity.includes("Parking")
                        }
                        onChange={() => amenityHandler("Parking")}
                        label="Parking ?"
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group>
                      <Form.Label>Property Details List</Form.Label>
                      <div className="d-flex align-items-center">
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
                      defaultValue={
                        addListDetails.detail &&
                        addListDetails.detail.developer_name
                      }
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
                      defaultValue={
                        addListDetails.detail &&
                        addListDetails.detail.handover_date
                      }
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
                      defaultValue={
                        addListDetails.detail &&
                        addListDetails.detail.manager_name
                      }
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
                      defaultValue={
                        addListDetails.detail &&
                        addListDetails.detail.manager_number
                      }
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
                      defaultValue={
                        addListDetails.detail &&
                        addListDetails.detail.landlord_name
                      }
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
                      defaultValue={
                        addListDetails.detail &&
                        addListDetails.detail.landlord_number
                      }
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

export default withRouter(NewPropertyListing);
