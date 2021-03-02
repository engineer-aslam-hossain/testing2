import { useEffect, useState } from "react";
import { CardDeck, Dropdown, FormControl, InputGroup } from "react-bootstrap";
import fakePopularity from "../../fakeData/fakePopularity";
import SearchIcon from "@material-ui/icons/Search";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import fakeAreaDetails from "../../fakeData/fakeAreaDetails";
import SingleAreaDetails from "../../components/SingleAreaDetails/SingleAreaDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
const AreaGuide = () => {
  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    fetch("https://bdapis.herokuapp.com/api/v1.0/districts")
      .then((res) => res.json())
      .then((data) => setDistricts(data.data));
  }, []);
  // console.log(districts);

  const [districtData, setDistrictData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [seeAll, setSeeAll] = useState(false);

  // console.log(seeAll);

  const searchAreaByDistrict = async () => {
    // console.log(e);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/area_guide/district?district=${selectedDistrict}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === "yes") {
        setDistrictData(data.data);
      }

      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [searchAreaAddress, setSearchAreaAddress] = useState("");
  const [searchAreaAddressData, setSearchAreaAddressData] = useState([]);
  const searchAreaByAddress = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/area_guide/?address=${searchAreaAddress}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === "yes") {
        setSearchAreaAddressData(data.data);
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchAreaByDistrict();
  }, [selectedDistrict]);

  // console.log(districtData, searchAreaAddressData);
  return (
    <section className="areaGuide">
      <section className="areaGuideHeaderMain">
        <div className="container h-100">
          <div className="row  areaGuideHeaderMain h-100  align-items-center">
            <div className="col-md-12 AreaGuideTitle d-flex flex-column align-items-center justify-content-between">
              <div className="col-md-6 d-flex flex-column align-items-center ">
                <h1>Area Guide</h1>
                <p className="AreaGuideP">
                  A neighbourhood guide provides foundational information you
                  need to start your home search and dive into some of the
                  details that matter the most. Ready to get started?
                </p>
              </div>
              <div className="col-md-12 px-4 mx-auto ">
                <div className="col-md-12 d-flex flex-wrap justify-content-around mx-auto areaGuideInputGroup">
                  <div className="col-md-6 d-flex justify-content-center areaGuideSearch">
                    <InputGroup className="">
                      <FormControl
                        placeholder="Search for an area"
                        className="areaSearch"
                        onChange={(e) => setSearchAreaAddress(e.target.value)}
                        onKeyDown={(e) =>
                          e.keyCode === 13 && searchAreaByAddress()
                        }
                      />
                      <InputGroup.Append>
                        <InputGroup.Text
                          className="searchIcon"
                          onClick={searchAreaByAddress}
                        >
                          <SearchIcon />
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center districtDiv">
                    <Dropdown className="districtDropDow d-flex align-items-center">
                      <Dropdown.Toggle className="headerMain" drop="left">
                        {selectedDistrict}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="searchDropDownMenu">
                        <div>
                          <div>
                            <div className="proTypeOptionsDiv">
                              <div className="d-flex flex-column">
                                {districts.map((item) => (
                                  <button
                                    className="propertyTypeBtn"
                                    key={item._id}
                                    onClick={() =>
                                      setSelectedDistrict(item.district)
                                    }
                                  >
                                    {item.district}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="col-md-12">
          <CommonHeader title={selectedDistrict} />
        </div>

        <div className="col-md-12 d-flex flex-wrap px-0">
          {(searchAreaAddress && (
            <SingleAreaDetails
              item={searchAreaAddressData}
              key={searchAreaAddress._id}
            />
          )) ||
          seeAll
            ? districtData
                .slice(0, 20)
                .map((item) => <SingleAreaDetails item={item} key={item._id} />)
            : districtData.map((item) => (
                <SingleAreaDetails item={item} key={item._id} />
              ))}

          <div className="col-md-12 d-flex justify-content-center my-5">
            <button className="seeAllBtn" onClick={() => setSeeAll(!seeAll)}>
              {seeAll ? "See Less" : "See All"}
              {seeAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreaGuide;

// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`https://bdapis.herokuapp.com/api/v1.0/districts`);
//   const data = await res.json();
//   // console.log(districts);
//   // Pass districts data to the page via props
//   return { props: { districts: data.data } };
// }
