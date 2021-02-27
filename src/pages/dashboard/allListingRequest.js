import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import Link from "next/link";
import { withRouter } from "next/router";

const AllListingRequest = ({ router }) => {
  const [lists, setLists] = useState([]);
  const [showListOf, setShowListOf] = useState(router.query.show);

  const fetchLists = async () => {
    const getUser = JSON.parse(localStorage.getItem("dreamfinder_session"));
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/list/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        dreamfinder: getUser,
      },
    });
    const { data } = await res.json();
    setLists(data);
  };

  useEffect(() => {
    fetchLists();
  }, []);
  // console.log(lists);

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

  // console.log(showListOf);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5">
            <div>
              <h1 className="dashboardTitle">All Property Listing Requests</h1>
            </div>
            <div className="mt-4">
              <button
                onClick={() => showHandler("All")}
                className={`listReqBtn ${showListOf === "All" && "active"}`}
              >
                SHOW ALL
              </button>
              <button
                onClick={() => showHandler("Sell")}
                className={`listReqBtn ${showListOf === "Sell" && "active"}`}
              >
                SHOW SALES ONLY
              </button>
              <button
                onClick={() => showHandler("Rent")}
                className={`listReqBtn ${showListOf === "Rent" && "active"}`}
              >
                SHOW RENTS ONLY
              </button>

              <button
                onClick={() => showHandler("Auction")}
                className={`listReqBtn ${showListOf === "Auction" && "active"}`}
              >
                SHOW AUCTIONS ONLY
              </button>
            </div>
          </div>
          <div className="col-md-12 allPropertiesListTable">
            <Table hover>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Property Type</th>
                  <th>Purpose</th>
                  <th>Zilla</th>
                  <th>Upazilla/Thana</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {lists.map((item) =>
                  showListOf === "All" ? (
                    <tr onClick={() => modalHandler(item)} key={item._id}>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                      <td>{item.property_type}</td>
                      <td>{item.purpose}</td>
                      <td>{item.district}</td>
                      <td>{item.subdistrict}</td>
                      <td>{item.name}</td>
                      <td>{item.role[0]}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>
                    </tr>
                  ) : (
                    item.purpose === showListOf && (
                      <tr onClick={() => modalHandler(item)} key={item._id}>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                        <td>{item.property_type}</td>
                        <td>{item.purpose}</td>
                        <td>{item.district}</td>
                        <td>{item.subdistrict}</td>
                        <td>{item.name}</td>
                        <td>{item.role[0]}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_number}</td>
                      </tr>
                    )
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

export default withRouter(AllListingRequest);
