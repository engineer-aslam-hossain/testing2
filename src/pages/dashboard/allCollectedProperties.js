import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import Link from "next/link";
import { withRouter } from "next/router";

const AllCollectedProperties = ({ router }) => {
  const [lists, setLists] = useState([]);
  const [showListOf, setShowListOf] = useState(router.query.show);

  const fetchLists = async () => {
    const getUser = JSON.parse(localStorage.getItem("DreamFinder_session"));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/as/data-collector`,
        {
          method: "GET",
        }
      );
      const { data } = await res.json();
      setLists(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);
  // console.log(lists.map((item) => console.log(item)));

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

  // console.log(lists);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5">
            <div>
              <h1 className="dashboardTitle">All Collected Property Lists</h1>
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
                  <th>Collector Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {lists.map((item) => (
                  <tr onClick={() => modalHandler(item)} key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>{item.property_type}</td>
                    <td>{item.purpose}</td>
                    <td>{item.address_district}</td>
                    <td>{item.address_subdistrict}</td>
                    <td>{item.name}</td>
                    <td>{item.submitor.email}</td>
                    <td>{item.submitor.phone_number}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <div className="p-5 modalDiv">
              <div className="modalTop pb-4">
                <div className="mb-4">
                  <h2 className="modalPurpose">
                    Property Type for {modalDetails.purpose}
                  </h2>
                </div>
                <div className="my-4">
                  <h3 className="modalLocation">
                    <span>Location:</span>
                    {modalDetails.address_subdistrict},
                    {modalDetails.address_district}
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
                    <span> Collected By (Collector) :</span>
                    {modalDetails.submitor && modalDetails.submitor.name}
                  </h3>
                </div>
                <div className="my-4 d-flex align-items-center">
                  <h3 className="modalMail">
                    <span> Email: </span>
                    {modalDetails.submitor && modalDetails.submitor.email}
                  </h3>
                  <button className="modalMailBtn">email</button>
                </div>
                <div className="my-4 d-flex align-items-center">
                  <h3 className="modalPhone">
                    <span> Phone: </span>
                    {modalDetails.submitor &&
                      modalDetails.submitor.phone_number}
                  </h3>
                  <button className="modalCallBtn">call</button>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <Link
                  href={{
                    pathname: "/dashboard/newPropertyListing",
                    query: { post: modalDetails._id, routeType: "collected" },
                  }}
                >
                  <a className="postPropertyBtn">REVIEW PROPERTY</a>
                </Link>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default withRouter(AllCollectedProperties);
