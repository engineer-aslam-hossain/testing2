import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import PublishIcon from "@material-ui/icons/Publish";
import Swal from "sweetalert2";
import { withRouter } from "next/router";

const JobPost = ({ router }) => {
  const [serviceFile, setServiceFile] = useState(null);
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setServiceFile(newFile);
  };

  // console.log(serviceFile);

  const [applyInfo, setApplyInfo] = useState({
    cv: "test String",
    job_id: router.query.id ? router.query.id : "",
  });

  const jobApplySubmitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    // const formData = new FormData();

    // formData.append("file", serviceFile);
    // formData.append("name", applyInfo.name);
    // console.log(formData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/job/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applyInfo),
      });
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

  // console.log(applyInfo);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5 jobPostPageTitle">
            <h1>Job Post Details</h1>
          </div>
          <div className="col-md-12 d-flex flex-wrap justify-content-between mb-5">
            <div className="col-md-6 px-0">
              <div className="mb-4 jobPostTitle">
                <h3>Job Post Title</h3>
                <p>Posted on 17 Feb, 2021</p>
              </div>
              <div className="mb-5 jobPostDetails">
                <h5>
                  Job Post Description Architecto excepturi quia voluptatibus ex
                  est numquam ut non. Repellat qui inventore corrupti voluptatem
                  modi nihil inventore vero. Odit sint natus animi modi eius
                  quibusdam. Enim possimus soluta nisi aperiam in sit. Tepturi
                  quia voluptatibus ex est numquam ut non. Repellat qui
                  inventore corrupti voluptatem modi nihil inventore vero. Odit
                  sint natus animi modi eius quibusdam. Enim possimus soluta
                  nisi aperiam in sit. Job Post Description Architecto excepturi
                  quia voluptatibus ex est numquam ut non. Repellat qui
                  inventore corrupti voluptatem modi nihil inventore vero. Odit
                  sint natus animi modi eius quibusdam. Enim possimus soluta
                  nisi aperiam in sit. Tepturi quia voluptatibus ex est numquam
                  ut non. Repellat qui inventore corrupti voluptatem modi nihil
                  inventore vero. Odit sint natus animi modi eius quibusdam.
                  Enim possimus soluta nisi aperiam in sit.
                </h5>
              </div>

              <div>
                <div className="d-flex align-items-center jobPostFooter">
                  <div>
                    <h6>Employment Type </h6>
                  </div>
                  <div>
                    <p>Full Time</p>
                  </div>
                </div>
                <div className="d-flex align-items-center jobPostFooter">
                  <div>
                    <h6>Job Functions </h6>
                  </div>
                  <div>
                    <p>IT, Tech, Analyst</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Card style={{ padding: "1rem" }} className="">
                <div className="my-4">
                  <h3 className="getIntouchCardTitle">Apply for This Job</h3>
                </div>
                <Form noValidate onSubmit={jobApplySubmitHandler}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      // defaultValue={loggedInUser.name}
                      onChange={(e) =>
                        setApplyInfo({
                          ...applyInfo,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter Your Full Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      // defaultValue={loggedInUser.email}
                      onChange={(e) =>
                        setApplyInfo({
                          ...applyInfo,
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
                      // defaultValue={loggedInUser.phone_number}
                      onChange={(e) =>
                        setApplyInfo({
                          ...applyInfo,
                          phone_number: e.target.value,
                        })
                      }
                      placeholder="Phone Number"
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Cover Letter</Form.Label>
                    <Form.Control
                      as="textarea"
                      // defaultValue={`I am interested to inquire about your property in Dreamfinder: ID-${ref_code}. Please contact me according to your convenience
                      //           `}
                      onChange={(e) =>
                        setApplyInfo({
                          ...applyInfo,
                          cover_letter: e.target.value,
                        })
                      }
                      placeholder=""
                      rows={4}
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Curriculum Vitae</h5>
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      className="file"
                    />
                    <label htmlFor="file" className="cvLabel">
                      <p className="mb-0">Select file</p> <PublishIcon />
                    </label>
                  </Form.Group>
                  <button className="applyNow" type="submit">
                    APPLY NOW
                  </button>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(JobPost);
