import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const headingH2 = {
  fontFamily: "PT Sans",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "40px",
  lineHeight: "52px",
  marginLeft: "16px",
};

const main_wrapper = {
  padding: "30px",
  margin: "20px",
  background: "#FFFFFF",
  border: "1px solid #C7C7C7",
  boxSizing: "border-box",
  borderRadius: "4px",
  boxShadow: "rgb(102 102 102 / 60%) 3px 3px 4px",
};
// const meeting_wrapper = {
//   border: "1px solid #E5E5E5",
//   padding: "30px",
//   margin: "20px",
// };
const meeting_wrapper1 = {
  border: "1px solid rgb(176 176 176)",
  padding: "15px 35px",
  marginRight: "9px",
  background: "#FFFDE7",
};
const meeting_done_wrapper1 = {
  border: "1px solid rgb(176 176 176)",
  padding: "35px",
  marginRight: "9px",
  background: "#FFFDE7",
};
const upcomming_wrapper1 = {
  border: "1px solid rgb(176 176 176)",
  padding: "35px",
  marginRight: "9px",
  background: "#FFFDE7",
  marginBottom: "20px",
};
const content = {
  fontFamily: "PT Sans",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "18px",
};

export default function SingleLead() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);
  const [lead, setLead] = useState(null);
  const [editableMetting, setEditableMetting] = useState(null);
  const [formValues, setFormValues] = useState({
    lead_id: router.query.id,
    datetime: "",
    name: "",
    objective: "",
    outcome: "",
  });

  useEffect(() => {
    if (router.query.id) {
      getLead();
      setFormValues({
        ...formValues,
        lead_id: router.query.id,
      });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (editableMetting?._id) {
      setFormValues({
        lead_id: router.query.id,
        datetime: editableMetting.date,
        name: editableMetting.name,
        objective: editableMetting.objective,
        outcome: editableMetting.outcome,
      });
    }
  }, [editableMetting]);

  const getLead = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/lead?id=${router.query.id}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
      });
      const data = await res.json();
      setLead(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const transferLeadsToSalesDepartment = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/lead/pass`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
        body: JSON.stringify({ id: router.query.id }),
      });
      const data = await res.json();
      if (data) {
        getLead();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewMeeting = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
        body: JSON.stringify({
          ...formValues,
          date: formValues.datetime.split("T")[0],
          time: formValues.datetime.split("T")[1],
          name: undefined,
          outcome: undefined,
          datetime: undefined,
        }),
      });
      const data = await res.json();
      if (data) {
        getLead();
        setIsNewMeetingModalOpen(false);
        setFormValues({
          lead_id: router.query.id,
          datetime: "",
          name: "",
          objective: "",
          outcome: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveEdits = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
        body: JSON.stringify({
          ...formValues,
          date: formValues?.datet?.ime?.split?.("T")[0] || editableMetting.date,
          time: formValues?.datet?.ime?.split?.("T")[1] || editableMetting.time,
          id: editableMetting._id,
          name: undefined,
          outcome: undefined,
          datetime: undefined,
          lead_id: undefined,
        }),
      });
      const data = await res.json();
      if (data) {
        getLead();
        setEditableMetting(false);
        setFormValues({
          lead_id: router.query.id,
          datetime: "",
          name: "",
          objective: "",
          outcome: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!lead?._id) return null;
  return (
    <Fragment>
      <div className="container">
        <h2 style={headingH2}>Lead on {lead.createdAt || "N/A"}</h2>
        <div style={main_wrapper}>
          <Row>
            <Col md={7}>
              <Row>
                <Col md={3}>
                  <h6 className="mb-3">Created on</h6>
                  <h6 className="mb-3">Lead Type</h6>
                  <h6 className="mb-3">Property ID</h6>
                  <h6 className="mb-3">Name</h6>
                  <h6 className="mb-3">Phone</h6>
                  <h6 className="mb-3">Zilla</h6>
                  <h6 className="mb-3">Upazilla/Thana</h6>
                  <h6 className="mb-3">STATUS</h6>
                  <h6 className="mb-3">Description</h6>
                </Col>
                <Col md={9} style={content}>
                  <h6 className="mb-3">{lead.createdAt || "N/A"}</h6>
                  <h6 className="mb-3">{lead.lead_type || "N/A"}</h6>
                  <h6 className="mb-3">{lead.property_id || "N/A"}</h6>
                  <h6 className="mb-3">{lead.name || "N/A"}</h6>
                  <h6 className="mb-3">{lead.phone || "N/A"}</h6>
                  <h6 className="mb-3">{lead.zilla || "N/A"}</h6>
                  <h6 className="mb-3">{lead.upozilla || "N/A"}</h6>
                  <h6 className="mb-3">{lead.status || "N/A"}</h6>
                  <h6 className="mb-3">{lead.comment || "N/A"}</h6>
                </Col>
              </Row>
            </Col>
            <Col md={2}></Col>
            <Col md={3}>
              {lead?.phase !== "SALES_EXECUTIVE" && (
                <Button
                  style={{
                    background: " rgb(106, 181, 62)",
                    marginLeft: "107px",
                    fontFamily: "PT Sans",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "16px",
                    lineHeight: "21px",
                  }}
                  onClick={transferLeadsToSalesDepartment}
                >
                  Transfer Lead to Sales Dept
                </Button>
              )}
            </Col>
          </Row>

          {/* Meetings */}

          <Row style={{ marginTop: "30px", marginBottom: "15px" }}>
            {/* <Col md={9}>
              <h3>Meetings</h3>
            </Col>
            <Col md={3}>
              <Button style={{ background: "#BC9700" }}>+ New Meetings </Button>
            </Col> */}
            <Col>
              <div className="mb-3 d-flex">
                <h3 className="float-left">Meetings</h3>
                <Button
                  className="ml-auto"
                  style={{ background: "#BC9700" }}
                  onClick={() =>
                    setIsNewMeetingModalOpen(!isNewMeetingModalOpen)
                  }
                >
                  + New Meetings{" "}
                </Button>
              </div>

              {isNewMeetingModalOpen && (
                <div style={meeting_wrapper1}>
                  <Form className="mt-4">
                    <div className="d-flex">
                      <h6
                        style={{
                          fontFamily: "PT Sans",
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "14px",
                          lineHeight: "16px",
                          color: "#474747",
                        }}
                        className="mr-auto"
                      ></h6>
                      <h6
                        style={{
                          fontFamily: "PT Sans",
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "23px",
                          lineHeight: "18px",
                          color: "#474747",
                          cursor: "pointer",
                        }}
                        onClick={handleNewMeeting}
                      >
                        DONE
                      </h6>
                    </div>
                    <br />
                    <Row>
                      <Col md={6}>
                        <Form.Group as={Row} controlId="MeetingStatus">
                          <Form.Label column md={4}>
                            Meeting Status
                          </Form.Label>
                          <Col md={6} style={{ marginLeft: "109px" }}>
                            <Form.Control
                              type="text"
                              placeholder="UPCOMING"
                              disabled
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group as={Row} controlId="MeetingTime">
                          <Form.Label column sm={4}>
                            Meeting Time
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="datetime-local"
                              placeholder="11:43, 21 Feb, 2021"
                              name="datetime"
                              onChange={({ target }) =>
                                setFormValues({
                                  ...formValues,
                                  [target.name]: target.value,
                                })
                              }
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group as={Row} controlId="ExecutiveName">
                      <Form.Label column sm={3}>
                        Executive Name
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          placeholder="John"
                          name="name"
                          value={formValues.name}
                          onChange={({ target }) =>
                            setFormValues({
                              ...formValues,
                              [target.name]: target.value,
                            })
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="ExecutiveName">
                      <Form.Label column sm={3}>
                        Meeting Objectives
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          style={{ width: "100%", boxSizing: "border-box" }}
                          as="textarea"
                          rows={3}
                          cols={30}
                          placeholder=""
                          name="objective"
                          value={formValues.objective}
                          onChange={({ target }) =>
                            setFormValues({
                              ...formValues,
                              [target.name]: target.value,
                            })
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              )}
            </Col>
          </Row>
          {lead.meeting.map((meeting) => (
            <div style={upcomming_wrapper1} key={meeting._id}>
              <Row>
                <Col>
                  <h6 style={{ display: "flex" }}>
                    <strong
                      style={{
                        color:
                          meeting.status === "Done" ? "#09B51A" : "#B50909",
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      {meeting.status === "Upcoming" && "UPCOMING MEETING"}
                      {meeting.status === "Done" && "MEETING DONE"}
                    </strong>{" "}
                    <span>{meeting?.createdAt}</span>
                    <span
                      style={{ marginLeft: "auto", cursor: "pointer" }}
                      onClick={() => setEditableMetting(meeting)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </h6>
                  <span>Issued on {meeting.date}</span>
                </Col>
              </Row>
              <Row style={{ marginTop: "12px" }}>
                <Col md={3}>
                  <h5
                    style={{
                      fontFamily: "PT Sans",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "21px",
                      textAlign: "justify",
                      color: "#474747",
                      marginBottom: "10px",
                    }}
                  >
                    Executive Name
                  </h5>
                  <h5
                    style={{
                      fontFamily: "PT Sans",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "21px",
                      textAlign: "justify",
                      color: "#474747",
                    }}
                  >
                    Meeting Objectives
                  </h5>
                  {meeting.outcome && (
                    <h5
                      style={{
                        fontFamily: "PT Sans",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "21px",
                        textAlign: "justify",
                        color: "#474747",
                        marginBottom: "10px",
                      }}
                    >
                      Meeting Outcomes
                    </h5>
                  )}
                </Col>
                <Col
                  md={9}
                  style={{
                    fontFamily: "PT Sans",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "18px",
                    textAlign: "justify",
                    color: "#474747",
                  }}
                >
                  <h5
                    style={{
                      fontFamily: "PT Sans",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "18px",
                      textAlign: "justify",
                      color: "#474747",
                    }}
                  >
                    {meeting.name || "N/A"}
                  </h5>
                  <h6
                    style={{
                      fontFamily: "PT Sans",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "18px",
                      textAlign: "justify",
                      color: "#474747",
                      marginTop: "15px",
                    }}
                  >
                    {meeting.objective || "N/A"}
                  </h6>
                  {meeting.outcome && (
                    <h6
                      style={{
                        fontFamily: "PT Sans",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "14px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        color: "#474747",
                        marginTop: "15px",
                      }}
                    >
                      {meeting.outcome || "N/A"}
                    </h6>
                  )}
                </Col>
              </Row>
            </div>
          ))}

          {/* meeting done  */}

          {editableMetting?._id && (
            <div style={meeting_wrapper1} className="mt-3">
              {/* <Row>
              <Col md={10}>
                <span>Issued on 11:43, 21 Feb, 2021</span>
              </Col>
              <Col md={2}>
                <Button style={{ background: "#BC9700" }}>Done</Button>
              </Col>
            </Row> */}
              <div className="d-flex">
                <h6
                  style={{
                    fontFamily: "PT Sans",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "16px",
                    color: "#474747",
                  }}
                  className="mr-auto"
                >
                  Issued on 11:43, 21 Feb, 2021
                </h6>
                <h6
                  style={{
                    fontFamily: "PT Sans",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "23px",
                    lineHeight: "18px",
                    color: "#474747",
                    cursor: "pointer",
                  }}
                  onClick={saveEdits}
                >
                  DONE
                </h6>
              </div>
              <Row>
                <Col id="mamun">
                  <Form className="mt-4">
                    <Row>
                      <Col md={6}>
                        <Form.Group as={Row} controlId="MeetingStatus">
                          <Form.Label column md={4}>
                            Meeting Status
                          </Form.Label>
                          <Col md={6} style={{ marginLeft: "109px" }}>
                            <Form.Control
                              type="text"
                              placeholder="DONE"
                              disabled
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group as={Row} controlId="MeetingTime">
                          <Form.Label column sm={4}>
                            Meeting Time
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="date"
                              placeholder="11:43, 21 Feb, 2021"
                              name="datetime"
                              onChange={({ target }) =>
                                setFormValues({
                                  ...formValues,
                                  [target.name]: target.value,
                                })
                              }
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group as={Row} controlId="ExecutiveName">
                      <Form.Label column sm={3}>
                        Executive Name
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          placeholder="John"
                          name="name"
                          value={formValues.name}
                          onChange={({ target }) =>
                            setFormValues({
                              ...formValues,
                              [target.name]: target.value,
                            })
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="ExecutiveName">
                      <Form.Label column sm={3}>
                        Meeting Objectives
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          style={{ width: "100%", boxSizing: "border-box" }}
                          as="textarea"
                          rows={3}
                          cols={30}
                          placeholder=""
                          name="objective"
                          value={formValues.objective}
                          onChange={({ target }) =>
                            setFormValues({
                              ...formValues,
                              [target.name]: target.value,
                            })
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="ExecutiveName">
                      <Form.Label column sm={3}>
                        Meeting Outcomes
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          style={{ width: "100%", boxSizing: "border-box" }}
                          as="textarea"
                          rows={3}
                          cols={30}
                          placeholder=""
                          name="outcome"
                          value={formValues.outcome}
                          onChange={({ target }) =>
                            setFormValues({
                              ...formValues,
                              [target.name]: target.value,
                            })
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
