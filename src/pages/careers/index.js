import Link from "next/link";
const Careers = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 careerTitle">
            <h1>Welcome to Careers at DreamFinder Ltd.</h1>
          </div>
          <div className="col-md-12 my-5 careerTitleDetails">
            <p>
              Our goal is to become Bangladesh's premier property destination
              for customers, home and abroad and be the most preferred partner
              for real-estate professionals.
            </p>
          </div>
          <div className="col-md-12 my-3 hiringOverview px-0">
            <div className="my-5">
              <h3>An Overview of Our Hiring Process</h3>
            </div>
            <div className="col-md-12 d-flex flex-wrap px-0">
              <div className="col-md-4  mb-4 d-flex justify-content-center px-0">
                <img
                  src="/images/Group_476.png"
                  alt="careerImg"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-4  mb-4 d-flex justify-content-center px-0">
                <img
                  src="/images/Group_477.png"
                  alt="careerImg"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-4  mb-4 d-flex justify-content-center px-0">
                <img
                  src="/images/Group_478.png"
                  alt="careerImg"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-4  mb-4 d-flex justify-content-center px-0">
                <img
                  src="/images/Group_479.png"
                  alt="careerImg"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-4  mb-4 d-flex justify-content-center px-0">
                <img
                  src="/images/Group_480.png"
                  alt="careerImg"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-4  mb-4 d-flex justify-content-center px-0">
                <img
                  src="/images/Group_481.png"
                  alt="careerImg"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-5">
            <div className="my-5 availablePost">
              <h3>Available Job Posts</h3>
            </div>
            <div className="col-md-12 jobPost p-4 my-4">
              <div>
                <h4>Job Post Title</h4>
                <p>Posted on 17 Feb, 2021</p>
              </div>
              <div className="my-4">
                <h5>
                  Job Post Description Architecto excepturi quia voluptatibus ex
                  est numquam ut non. Repellat qui inventore corrupti voluptatem
                  modi nihil inventore vero. Odit sint natus animi modi eius
                  quibusdam. Enim possimus soluta nisi aperiam in sit. Tepturi
                  quia voluptatibus ex est numquam ut non. Repellat qui
                  inventore corrupti voluptatem modi nihil inventore vero. Odit
                  sint natus animi modi eius quibusdam. Enim possimus soluta
                  nisi ... ... ...
                </h5>
              </div>
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div>
                  <h6>EMPLOYMENTTYPE | JOBFUNCTIONS</h6>
                </div>
                <div>
                  <Link
                    href={{
                      pathname: `/careers/jobPost`,
                      query: { id: "602a3e1340fc4f05382471a0" },
                    }}
                  >
                    <a className="applyNow">APPLY NOW</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
