import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
const AllJobPosts = () => {
  const [showVisibility, setShowVisibility] = useState("Show All");

  const [allJobPost, setAllJobPost] = useState([]);

  const getAllJobPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/job/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      // console.log(data);
      setAllJobPost(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllJobPosts();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5">
            <h1 className="dashboardTitle">All Job Posts</h1>
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center flex-wrap my-3">
                <h5 className="mb-0 mr-3"> SHOW VISIBILITY </h5>
                <Dropdown className="d-flex align-items-center">
                  <Dropdown.Toggle className="headerMain" drop="left">
                    {showVisibility ? showVisibility : "Show All"}
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
                              onClick={() =>
                                setShowVisibility("Show 'ON' Only")
                              }
                            >
                              Show "ON" Only
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                setShowVisibility("Show 'OFF' Only")
                              }
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
              <div>
                <Link href="/dashboard/newJobPost">
                  <a className="postPropertyBtn">+ POST NEW JOB</a>
                </Link>
              </div>
            </div>
          </div>
          {allJobPost &&
            allJobPost.map((item) => (
              <div className="col-md-12 jobPost p-4 my-4" key={item._id}>
                <div>
                  <h4>{item.title}</h4>
                  <p>Posted on {new Date(item.createdAt).toDateString()}</p>
                </div>
                <div className="my-4">
                  <h5>{item.description}</h5>
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div>
                    <h6>
                      {item.division} | {item.position}
                    </h6>
                  </div>
                  <div>
                    <Link
                      href={{
                        pathname: `/dashboard/allJobPosts`,
                      }}
                    >
                      <a className="editJobPost">EDIT POST</a>
                    </Link>
                    <Link
                      href={{
                        pathname: `/dashboard/allJobPosts`,
                      }}
                    >
                      <a className="applyNow">SEE APPLICANTS</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AllJobPosts;
