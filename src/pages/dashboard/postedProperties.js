import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Modal, Table } from "react-bootstrap";
import Link from "next/link";
import DreamFinderContext from "../../components/Context/Context";
const PostedProperties = () => {
  const { allProperty } = useContext(DreamFinderContext);
  const [lists, setLists] = useState([]);
  const [showListOf, setShowListOf] = useState("All");
  const [showVisibility, setShowVisibility] = useState("Show All");
  console.log(allProperty);
  const fetchLists = async () => {
    const getUser = JSON.parse(localStorage.getItem("dreamfinder_session"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/property/search`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          dreamfinder: getUser,
        },
      }
    );
    const { data } = await res.json();
    setLists(data);
  };

  useEffect(() => {
    fetchLists();
  }, []);
  console.log(lists);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalDetails, setModalDetails] = useState({});
  const modalHandler = (item) => {
    handleShow();
    setModalDetails(item);
  };

  const showHandler = (item) => {
    setShowListOf(item);
  };

  console.log(showVisibility);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5">
            <div>
              <div>
                <h1 className="dashboardTitle">Posted Property</h1>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => showHandler("All")}
                  className={`listReqBtn ${showListOf === "All" && "active"}`}
                >
                  SHOW All
                </button>
                <button
                  onClick={() => showHandler("Rent")}
                  className={`listReqBtn ${showListOf === "Rent" && "active"}`}
                >
                  SHOW RENTS ONLY
                </button>
                <button
                  onClick={() => showHandler("Sell")}
                  className={`listReqBtn ${showListOf === "Sell" && "active"}`}
                >
                  SHOW SALES ONLY
                </button>
                <button
                  onClick={() => showHandler("Auction")}
                  className={`listReqBtn ${
                    showListOf === "Auction" && "active"
                  }`}
                >
                  SHOW AUCTIONS ONLY
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap my-3 px-2">
              <h5 className="mb-0 mr-3"> SHOW VISIBILITY </h5>
              <Dropdown className="d-flex align-items-center">
                <Dropdown.Toggle className="headerMain" drop="left">
                  {showVisibility}
                </Dropdown.Toggle>

                <Dropdown.Menu className="searchDropDownMenu">
                  <div>
                    <div>
                      <div className="proTypeOptionsDiv">
                        <div className="d-flex flex-column">
                          <Dropdown.Item
                            onClick={() => setShowVisibility("Show All")}
                          >
                            Show All
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setShowVisibility("Show 'ON' Only")}
                          >
                            Show "ON" Only
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setShowVisibility("Show 'OFF' Only")}
                          >
                            Show "OFF" Only
                          </Dropdown.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="col-md-12 allPropertiesListTable">
            <Table hover>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Visibility</th>
                  <th>Property Type</th>
                  <th>Purpose</th>
                  <th>Zilla</th>
                  <th>Upazilla/Thana</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Submitter Name</th>
                  <th>Submitter Phone</th>
                </tr>
              </thead>
              <tbody>
                {allProperty.map((item) =>
                  showListOf === "All" ? (
                    showVisibility === "Show 'ON' Only" &&
                    item.is_disable === false ? (
                      <Link href={`/findProperties/${item._id}`} key={item._id}>
                        <tr>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                          <td>{item.is_disable ? "Off" : "On"}</td>
                          <td>{item.property_type}</td>
                          <td>{item.purpose}</td>
                          <td>{item.address_district}</td>
                          <td>{item.address_subdistrict}</td>
                          <td>{item.price}</td>
                          <td>{item.area_sqft}</td>
                          <td onClick={() => modalHandler(item)} key={item._id}>
                            {item.property_type}
                          </td>
                          <td>{item.property_type}</td>
                        </tr>
                      </Link>
                    ) : showVisibility === "Show 'Off' Only" &&
                      item.is_disable === true ? (
                      <Link href={`/findProperties/${item._id}`} key={item._id}>
                        <tr>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                          <td>{item.is_disable ? "Off" : "On"}</td>
                          <td>{item.property_type}</td>
                          <td>{item.purpose}</td>
                          <td>{item.address_district}</td>
                          <td>{item.address_subdistrict}</td>
                          <td>{item.price}</td>
                          <td>{item.area_sqft}</td>
                          <td onClick={() => modalHandler(item)} key={item._id}>
                            {item.property_type}
                          </td>
                          <td>{item.property_type}</td>
                        </tr>
                      </Link>
                    ) : (
                      showVisibility === "Show All" && (
                        <Link
                          href={`/findProperties/${item._id}`}
                          key={item._id}
                        >
                          <tr key={item._id}>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                            <td>{item.is_disable ? "Off" : "On"}</td>
                            <td>{item.property_type}</td>
                            <td>{item.purpose}</td>
                            <td>{item.address_district}</td>
                            <td>{item.address_subdistrict}</td>
                            <td>{item.price}</td>
                            <td>{item.area_sqft}</td>
                            <td
                              onClick={() => modalHandler(item)}
                              key={item._id}
                            >
                              {item.property_type}
                            </td>
                            <td>{item.property_type}</td>
                          </tr>
                        </Link>
                      )
                    )
                  ) : (
                    item.purpose === showListOf &&
                    (showVisibility === "Show 'ON' Only" &&
                    item.is_disable === false ? (
                      <Link href={`/findProperties/${item._id}`} key={item._id}>
                        <tr>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                          <td>{item.is_disable ? "Off" : "On"}</td>
                          <td>{item.property_type}</td>
                          <td>{item.purpose}</td>
                          <td>{item.address_district}</td>
                          <td>{item.address_subdistrict}</td>
                          <td>{item.price}</td>
                          <td>{item.area_sqft}</td>
                          <td onClick={() => modalHandler(item)} key={item._id}>
                            {item.property_type}
                          </td>
                          <td>{item.property_type}</td>
                        </tr>
                      </Link>
                    ) : showVisibility === "Show 'Off' Only" &&
                      item.is_disable === true ? (
                      <Link href={`/findProperties/${item._id}`} key={item._id}>
                        <tr>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                          <td>{item.is_disable ? "Off" : "On"}</td>
                          <td>{item.property_type}</td>
                          <td>{item.purpose}</td>
                          <td>{item.address_district}</td>
                          <td>{item.address_subdistrict}</td>
                          <td>{item.price}</td>
                          <td>{item.area_sqft}</td>
                          <td onClick={() => modalHandler(item)} key={item._id}>
                            {item.property_type}
                          </td>
                          <td>{item.property_type}</td>
                        </tr>
                      </Link>
                    ) : (
                      showVisibility === "Show All" && (
                        <Link
                          href={`/findProperties/${item._id}`}
                          key={item._id}
                        >
                          <tr key={item._id}>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                            <td>{item.is_disable ? "Off" : "On"}</td>
                            <td>{item.property_type}</td>
                            <td>{item.purpose}</td>
                            <td>{item.address_district}</td>
                            <td>{item.address_subdistrict}</td>
                            <td>{item.price}</td>
                            <td>{item.area_sqft}</td>
                            <td
                              onClick={() => modalHandler(item)}
                              key={item._id}
                            >
                              {item.property_type}
                            </td>
                            <td>{item.property_type}</td>
                          </tr>
                        </Link>
                      )
                    ))
                  )
                )}
              </tbody>
            </Table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <div className="p-5 modalDiv">
              <div className="modalTop pb-4">
                <div className="mb-4">
                  <h2 className="modalPurpose">Property Type for Purpose</h2>
                </div>
                <div className="my-4">
                  <h3 className="modalLocation">
                    <span>Location:</span>
                    {modalDetails.subdistrict}, {modalDetails.district}
                  </h3>
                </div>
                <div className="my-4">
                  <h3 className="modalPostedOn">
                    <span>Posted on:</span>
                    {new Date(modalDetails.createdAt).toLocaleString()}
                  </h3>
                </div>
              </div>
              <div className="pt-4">
                <div className="my-4">
                  <h3 className="modalPostedBy">
                    <span> Posted By (Submitter) :</span>
                    {modalDetails.name}
                  </h3>
                </div>
                <div className="my-4">
                  <h3 className="modalRole">
                    <span> Role:</span>
                    {modalDetails.role &&
                      modalDetails.role.map((item, index) => (
                        <p key={index} className="mx-2 mb-0">
                          {item},
                        </p>
                      ))}
                  </h3>
                </div>
                <div className="my-4 d-flex align-items-center">
                  <h3 className="modalMail">
                    <span> Email: </span>
                    {modalDetails.email}
                  </h3>
                  <button className="modalMailBtn">email</button>
                </div>
                <div className="my-4 d-flex align-items-center">
                  <h3 className="modalPhone">
                    <span> Phone: </span>
                    {modalDetails.phone_number}
                  </h3>
                  <button className="modalCallBtn">call</button>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <Link href="newPropertyListing">
                  <a className="postPropertyBtn">+ POST THIS PROPERTY</a>
                </Link>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default PostedProperties;
