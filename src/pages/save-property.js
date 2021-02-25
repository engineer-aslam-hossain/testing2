import { Dropdown, Form, InputGroup, Spinner } from "react-bootstrap";
import Select from "react-select";
import SingleProperty from "../components/SingleProperty/SingleProperty";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import fakePopularity from "../fakeData/fakePopularity";
import fakeOptions from "../fakeData/fakeOptions";
import Link from "next/link";
import SortIcon from "@material-ui/icons/Sort";
import fakeCardInfo from "../fakeData/fakeCardInfo";
import SearchItemGroup from "../components/SearchItemGroup/SearchItemGroup";
import { useContext, useEffect, useState } from "react";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import DreamFinderContext from "../components/Context/Context";
import CloseIcon from "@material-ui/icons/Close";
import fakeProperty from "../fakeData/fakeProperty";
import CheckIcon from "@material-ui/icons/Check";

const StyledBadge = withStyles((theme) => ({
  badge: {
    paddingLeft: ".8rem",
    color: "#696969",
    top: "-14px",
    fontWeight: "400",
    background: "#fff",
    width: "100%",
    borderRadius: "4px",
    zIndex: 0,
    justifyContent: "start",
    transform: "none",
  },
}))(Badge);
const SaveProperty = () => {
  const {
    searchData,
    allProperty,
    SetSearchData,
    saveProperties,
    setSaveProperties,
  } = useContext(DreamFinderContext);
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const [minArea, setMinArea] = useState(null);
  const [maxArea, setMaxArea] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    SetSearchData({
      ...searchData,
      area_sqft_min: Math.floor(minArea),
      area_sqft_max: Math.floor(maxArea),
    });
  };

  const getSaveProperty = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("dreamfinder_session"));
      // console.log(getToken);
      if (getToken) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/favourites`,
          {
            method: "GET",
            headers: { dreamfinder: getToken },
          }
        );
        const data = await res.json();
        // console.log(data);
        setSaveProperties(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSaveProperty();
  }, []);
  // console.log(searchData);
  return (
    <section>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between findPropertyHeader align-items-center flex-wrap">
            <div>
              <h1>My Saved Property</h1>
            </div>
            <div>
              <Link href="/profile">
                <a className="backToProfile">Back to Profile</a>
              </Link>
            </div>
          </div>
          <div className="col-md-12 my-3 ">
            <div
              className={`searchDetails d-flex justify-content-between flex-wrap findPropertyDropDownCard`}
            >
              <SearchItemGroup btnName="headerMain findProperty" />

              <Dropdown>
                <StyledBadge badgeContent={"Bath"}>
                  <Dropdown.Toggle
                    className="headerMain findProperty"
                    drop="left"
                  >
                    {searchData.baths ? searchData.baths.join(",") : "Baths"}
                  </Dropdown.Toggle>
                </StyledBadge>

                <Dropdown.Menu className="searchDropDownMenu">
                  <div>
                    <div>
                      <div className="proTypeOptionsDiv">
                        <div className="d-flex flex-column">
                          {fakeProperty.map(
                            (item) =>
                              item.category === "baths" && (
                                <button
                                  className="propertyTypeBtn"
                                  onClick={(e) =>
                                    SetSearchData({
                                      ...searchData,
                                      baths: searchData.baths
                                        ? [
                                            ...searchData.baths,
                                            parseInt(e.target.innerText),
                                          ]
                                        : [parseInt(e.target.innerText)],
                                    })
                                  }
                                  key={item.id}
                                >
                                  {searchData.baths &&
                                    searchData.baths.map(
                                      (b) =>
                                        b == item.name && (
                                          <CheckIcon
                                            className="mr-3"
                                            key={item.name}
                                          />
                                        )
                                    )}
                                  {item.name}
                                </button>
                              )
                          )}
                          <div className="d-flex justify-content-end">
                            <button
                              className="resetBtn"
                              onClick={() => Setbath("Any")}
                            >
                              <CloseIcon /> Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="col-md-12 my-3 d-flex justify-content-between flex-wrap">
            <div className="col-md findPropertySearch1">
              <div className="searchBtn">
                <InputGroup className="align-items-center">
                  <div className="col-md-9 px-0">
                    <Select
                      isMulti
                      name="colors"
                      inputId="test789"
                      instanceId="test124121"
                      styles={style}
                      options={fakeOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Search by location for rent"
                      // onChange={(e) =>
                      //   e.map((item) =>
                      //     SetSearchData({
                      //       ...searchData,
                      //       address: searchData.address
                      //         ? [...searchData.address, item.label]
                      //         : [item.label],
                      //     })
                      //   )
                      // }
                    />
                  </div>
                  <div className="col-md-3 px-0 d-flex justify-content-end">
                    <InputGroup.Append>
                      {/* <InputGroup.Text className="searchIcon">
                        <MyLocationIcon />
                      </InputGroup.Text> */}
                      <button
                        className="searchFindBtn"
                        // onClick={searchLoadData}
                      >
                        Find
                      </button>
                    </InputGroup.Append>
                  </div>
                </InputGroup>
              </div>
            </div>

            <div className="col-md  findPropertySearch2">
              <div className="searchBtn">
                <InputGroup className="align-items-center">
                  <div className="col-md-9 px-0">
                    <Select
                      isMulti
                      name="colors"
                      inputId="teffdsf"
                      instanceId="tesdfsfsf"
                      styles={style}
                      // options={keywords.keyword}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Search by Keywords"
                      // onKeyDown={(e) =>
                      //   e.keyCode === 13 &&
                      //   setKeyWords({
                      //     ...keywords,
                      //     keyword: keywords.keyword
                      //       ? [
                      //           ...keywords.keyword,
                      //           {
                      //             value: e.target.value,
                      //             label: e.target.value,
                      //           },
                      //         ]
                      //       : [
                      //           {
                      //             value: e.target.value,
                      //             label: e.target.value,
                      //           },
                      //         ],
                      //   })
                      // }
                      // onChange={(e) =>
                      //   e.map((item) =>
                      //     SetSearchData({
                      //       ...searchData,
                      //       keyword: searchData.keyword
                      //         ? [...searchData.keyword, item.label]
                      //         : [item.label],
                      //     })
                      //   )
                      // }
                    />
                  </div>
                  <div className="col-md-3 px-0 d-flex justify-content-end">
                    <InputGroup.Append>
                      <button
                        className="searchFindBtn"
                        // onClick={searchLoadData}
                      >
                        Find
                      </button>
                    </InputGroup.Append>
                  </div>
                </InputGroup>
              </div>
            </div>
          </div>
          {/* <div className="col-md-12  d-flex justify-content-end mt-3 flex-wrap">
            <Dropdown>
              <Dropdown.Toggle id="propertyDropdown" drop="left">
                <SortIcon /> Newest First
              </Dropdown.Toggle>

              <Dropdown.Menu className="searchDropDownMenu">
                <div>
                  <div>
                    <div className="proTypeOptionsDiv">
                      <div className="d-flex flex-column">
                        {fakePopularity.map((item) => (
                          <Dropdown.Item key={item.id}>
                            {item.name}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
          <div className="col-md-12 d-flex flex-wrap mt-5">
            {saveProperties.length > 0 ? (
              saveProperties.map((item) => (
                <SingleProperty item={item} key={item._id} />
              ))
            ) : (
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveProperty;
