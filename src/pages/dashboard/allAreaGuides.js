import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import SingleAreaDetails from "../../components/SingleAreaDetails/SingleAreaDetails";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const AllAreaGuides = ({ area }) => {
  const [zillas, setZillas] = useState([]);
  const [selectedZilla, setSelectedZilla] = useState("Dhaka");
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
            <div className="d-flex justify-content-end align-items-center mb-5 mt-3">
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
              <div className="col-md-12 d-flex align-items-start flex-wrap px-5">
                {areaData.map((item) => (
                  <SingleAreaDetails item={item} key={item._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllAreaGuides;
