import { Dropdown, Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import Swal from "sweetalert2";

const NewJobPost = () => {
  const [jobFunctions, setJobFunctions] = useState("");
  const jobTypes = [
    {
      id: 1,
      type: "Internship",
    },

    {
      id: 2,
      type: "Part Time",
    },
    {
      id: 3,
      type: "Full Time",
    },
    {
      id: 4,
      type: "Apprenticeship",
    },
    {
      id: 5,
      type: "Contract",
    },
    {
      id: 6,
      type: "Freelance",
    },
  ];
  const [jobPostInfo, setJobPostInfo] = useState({});

  const jobFunctionsHandler = () => {
    setJobPostInfo({
      ...jobPostInfo,
      functions: jobPostInfo.functions
        ? [...jobPostInfo.functions, jobFunctions]
        : [jobFunctions],
    });
    setJobFunctions("");
  };

  const newJobSubmitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      const token = JSON.parse(localStorage.getItem("dreamfinder_session"));
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/job/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          dreamfinder: token,
        },
        body: JSON.stringify(jobPostInfo),
      });
      const data = await res.json();
      //   console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "New Job Posted SuccessFully",
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
    setJobPostInfo("");
  };

  //   console.log(jobPostInfo);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5">
            <h1 className="dashboardTitle">New Job Post</h1>
          </div>
          <div className="col-md-8">
            <Form
              className="newPropertyListingForm"
              noValidate
              onSubmit={newJobSubmitHandler}
            >
              <Form.Group>
                <h5>Job Post Title</h5>
                <Form.Control
                  type="text"
                  placeholder="Job Post Title"
                  onChange={(e) =>
                    setJobPostInfo({
                      ...jobPostInfo,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <div className="addingDiv">
                <Form.Group controlId="formBasicEmail">
                  <h5>Job Functions</h5>
                  <Form.Control
                    type="text"
                    placeholder="Job Functions"
                    value={jobFunctions}
                    onChange={(e) => setJobFunctions(e.target.value)}
                  />
                  <button type="button" onClick={jobFunctionsHandler}>
                    <AddIcon />
                  </button>
                </Form.Group>
                <div className="d-flex flex-column justify-content-center align-items-center my-3">
                  {jobPostInfo.functions &&
                    jobPostInfo.functions.map((item, index) => (
                      <h5 key={index} className="mb-0">
                        {index + 1}-{item}
                      </h5>
                    ))}
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap my-3">
                <h5 className=""> Employment Type </h5>
                <Dropdown className="d-flex align-items-center">
                  <Dropdown.Toggle className="headerMain" drop="left">
                    {jobPostInfo.type ? jobPostInfo.type : "Select Type"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="searchDropDownMenu">
                    <div>
                      <div>
                        <div className="proTypeOptionsDiv">
                          <div className="d-flex flex-column">
                            {jobTypes.map((item) => (
                              <Dropdown.Item
                                onClick={() =>
                                  setJobPostInfo({
                                    ...jobPostInfo,
                                    type: item.type,
                                  })
                                }
                                key={item.id}
                              >
                                {item.type}
                              </Dropdown.Item>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <h5>Job Description</h5>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) =>
                    setJobPostInfo({
                      ...jobPostInfo,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <div className="col-md-8 col-lg-6 col-8 d-flex  justify-content-between my-5 px-0">
                <button className="postPropertyBtn" type="submit">
                  POST THIS JOB
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

export default NewJobPost;
