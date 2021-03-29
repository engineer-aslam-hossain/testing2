import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown, Pagination } from "react-bootstrap";
const Careers = () => {
  const [pageNo, setPageNo] = useState(1);
  const [allJobPosts, setAllJobPosts] = useState([]);
  const [divisions, setDivisions] = useState([]);

  const [queryData, setQueryData] = useState({
    division: "",
    position: "",
  });

  const searchLoadData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/job/all?page=${pageNo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setAllJobPosts(data.data);
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/divisions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      setDivisions(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchLoadData();
  }, [pageNo]);

  const filterdJobPosts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/job/all?division=${queryData.division}&position=${queryData.position}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await res.json();
      // console.log(data);
      setAllJobPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    filterdJobPosts();
  }, [queryData]);

  // console.log(allJobPosts);

  return (
    <section>
      <section className="careerGuideWelcome">
        <div className="container h-100">
          <div className="row  areaGuideHeaderMain h-100  align-items-center">
            <div className="col-md-12 AreaGuideTitle d-flex flex-column align-items-center justify-content-between">
              <div className="col-md-12 d-flex flex-column align-items-center ">
                <h1>Welcome to Careers at DreamFinder Ltd.</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
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
            <div className="d-flex flex-wrap align-items-center mb-3">
              <div className="col-lg-6">
                <span>Division</span>
                <Dropdown className="pb-3">
                  <Dropdown.Toggle
                    drop="left"
                    className="w-100 d-flex align-items-center justify-content-between careerDropDown"
                  >
                    {Object.entries(queryData).length > 0 && queryData.division
                      ? queryData.division
                      : "All"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="SignUpFormDropDownMenu">
                    {divisions.map((item) => (
                      <Dropdown.Item
                        key={item._id}
                        onClick={() =>
                          setQueryData({
                            ...queryData,
                            division: item.name,
                          })
                        }
                      >
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="col-lg-6">
                <span>Position</span>
                <Dropdown className="pb-3">
                  <Dropdown.Toggle
                    drop="left"
                    className="w-100 d-flex align-items-center justify-content-between careerDropDown"
                  >
                    {Object.entries(queryData).length > 0 && queryData.position
                      ? queryData.position
                      : "All"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="SignUpFormDropDownMenu">
                    {divisions.length > 0 &&
                      divisions.map(
                        (item) =>
                          item.name === queryData.division &&
                          item.positions.map((pos) => (
                            <Dropdown.Item
                              key={pos._id}
                              onClick={() =>
                                setQueryData({
                                  ...queryData,
                                  position: pos.name,
                                })
                              }
                            >
                              {pos.name}
                            </Dropdown.Item>
                          ))
                      )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="col-lg-12 availableJobLists">
              {allJobPosts &&
                allJobPosts.map((item) => (
                  <div className="jobPost p-4 my-1" key={item._id}>
                    <div>
                      <h4>{item.title}</h4>
                      <p>
                        Posted on : {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="my-4">
                      <h5>{item.description}</h5>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div>
                        <h6>
                          {item.position} | {item.division}
                        </h6>
                      </div>
                      <div>
                        <Link href={`/careers/${[item._id]}`}>
                          <a className="applyNow">VIEW DETAILS</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-12 d-flex justify-content-center mb-5">
            <Pagination>
              <Pagination.Prev
                onClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
              />
              <Pagination.Item active>{pageNo}</Pagination.Item>
              <Pagination.Next onClick={() => setPageNo(pageNo + 1)} />
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
