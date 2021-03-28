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

    try {
      const token = JSON.parse(localStorage.getItem("DreamFinder_session"));
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/job/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: token,
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
                <Form.Label>Job Post Title</Form.Label>
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

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Job Division</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job Division"
                  onChange={(e) =>
                    setJobPostInfo({
                      ...jobPostInfo,
                      division: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Job Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job Position"
                  onChange={(e) =>
                    setJobPostInfo({
                      ...jobPostInfo,
                      position: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Job Description</Form.Label>
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
