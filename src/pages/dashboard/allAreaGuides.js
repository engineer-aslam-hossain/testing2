import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import SingleAreaDetails from "../../components/SingleAreaDetails/SingleAreaDetails";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const AllAreaGuides = ({ area }) => {
  const [zillas, setZillas] = useState([]);
  const [selectedZilla, setSelectedZilla] = useState("Dhaka");
  const [showVisibility, setShowVisibility] = useState("Show All");
  const [areaData, setAreaData] = useState([]);
  const getDistricts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/area_guide/district?district=${selectedZilla}`
    );
    const { data } = await res.json();
    setAreaData(data);
  };

  useEffect(() => {
    try {
      fetch(
        "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json"
      )
        .then((res) => res.json())
        .then((data) => setZillas(data[2].data));
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getDistricts();
  }, [selectedZilla]);
  // console.log(areaData);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 findPropertyHeader ">
            <div>
              <h1>Area Guides</h1>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-5 mt-3">
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
                <Link href="/dashboard/newAreaPost">
                  <a className="postPropertyBtn">+ POST NEW AREA GUIDE</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-12 d-flex flex-wrap mb-5">
            <div className="col-md-2 zillaSideBar px-0">
              <ul>
                <div className="py-2 px-3 zillaTitle">
                  <h5 className="mb-0 bold">Zillas</h5>
                </div>
                {zillas.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setSelectedZilla(item.name)}
                    className={selectedZilla === item.name ? "active" : ""}
                  >
                    {item.name}
                    {selectedZilla === item.name && <ArrowRightIcon />}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-10 px-0">
              <div className="col-md-12 d-flex align-items-start flex-wrap pl-5">
                {areaData.map((item) =>
                  showVisibility === "Show 'ON' Only" &&
                  item.is_disable === true ? (
                    <SingleAreaDetails item={item} key={item._id} />
                  ) : showVisibility === "Show 'Off' Only" &&
                    item.is_disable === false ? (
                    <SingleAreaDetails item={item} key={item._id} />
                  ) : (
                    showVisibility === "Show All" && (
                      <SingleAreaDetails item={item} key={item._id} />
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllAreaGuides;
