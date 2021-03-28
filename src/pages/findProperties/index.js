import {
  CardDeck,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Pagination,
  Spinner,
} from "react-bootstrap";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import fakePopularity from "../../fakeData/fakePopularity";
import SingleProperty from "../../components/SingleProperty/SingleProperty";
import DreamFinderContext from "../../components/Context/Context";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import fakeOptions from "../../fakeData/fakeOptions";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import SortIcon from "@material-ui/icons/Sort";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SearchItemGroup from "../../components/SearchItemGroup/SearchItemGroup";
import fakeProperty from "../../fakeData/fakeProperty";
import ModalSearchComponent from "../../components/ModalSearchComonent/ModalSearchComponent";
const StyledBadge = withStyles((theme) => ({
  badge: {
    paddingLeft: ".8rem",
    color: "#696969",
    fontWeight: "400",
    top: "-14px",
    background: "#fff",
    width: "100%",
    borderRadius: "4px",
    zIndex: 0,
    fontSize: "10px",
    justifyContent: "start",
    transform: "none",
  },
}))(Badge);

const findProperties = () => {
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const {
    searchData,
    SetSearchData,
    searchResult,
    setSearchResult,
    findProperty,
    setFindProperty,
  } = useContext(DreamFinderContext);
  const [keywords, setKeyWords] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [minArea, setMinArea] = useState(null);
  const [maxArea, setMaxArea] = useState(null);

  // console.log(searchData);

  const submitHandler = (e) => {
    e.preventDefault();

    SetSearchData({
      ...searchData,
      area_sqft_min: Math.floor(minArea),
      area_sqft_max: Math.floor(maxArea),
    });
  };

  const searchLoadData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/search`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...searchData,
            purpose: findProperty,
            page: parseInt(pageNo),
          }),
        }
      );
      const data = await res.json();
      setSearchResult(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchLoadData();
  }, [pageNo, searchData]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const wid = window.innerWidth;
    setScreenWidth(wid);
  });

  const areaSubmitHandler = (e) => {
    e.preventDefault();
    SetSearchData({
      ...searchData,
      area_sqft_min: Math.floor(minArea),
      area_sqft_max: Math.floor(maxArea),
    });
  };

  // console.log(searchData);
  return (
    <section className="Properties">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between findPropertyHeader align-items-center flex-wrap">
            <div>
              <h1>Property For {findProperty}</h1>
            </div>
            <div>
              <button
                onClick={() => setFindProperty("Rent")}
                className={`${findProperty === "Rent" && "active"}`}
              >
                Rent
              </button>
              <button
                onClick={() => setFindProperty("Sell")}
                className={`${findProperty === "Sell" && "active"}`}
              >
                Sale
              </button>
              <button
                onClick={() => setFindProperty("New_Project")}
                className={`${findProperty === "New_Project" && "active"}`}
              >
                New&nbsp;Project
              </button>
              <button
                onClick={() => setFindProperty("Auction")}
                className={`${findProperty === "Auction" && "active"}`}
              >
                Auction
              </button>
            </div>
          </div>
          <div className="col-md-12 my-1 ">
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

              <Dropdown className="findPropertyDiv">
                <StyledBadge badgeContent={"Area (Sq.Ft)"}>
                  <Dropdown.Toggle className="headerMain" drop="left">
                    {searchData.area_sqft_min
                      ? `${searchData.area_sqft_min} - ${searchData.area_sqft_max}`
                      : "Area (Sq.Ft)"}
                  </Dropdown.Toggle>
                </StyledBadge>

                <Dropdown.Menu
                  className="searchDropDownMenu bathmenu"
                  align="right"
                >
                  <div className="p-3">
                    <Form
                      noValidate
                      className="d-flex flex-column"
                      onSubmit={areaSubmitHandler}
                    >
                      <Form.Group>
                        <Form.Label>Min</Form.Label>
                        <Form.Control
                          type="number"
                          className="priceInput"
                          name="min"
                          onChange={(e) => setMinArea(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Max</Form.Label>
                        <Form.Control
                          type="number"
                          className="priceInput"
                          name="max"
                          onChange={(e) => setMaxArea(e.target.value)}
                        />
                      </Form.Group>
                      <button type="submit" className="priceSubmitBtn">
                        SET AREA
                      </button>
                    </Form>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        className="resetBtn"
                        type="button"
                        onClick={() => setRange("")}
                      >
                        <CloseIcon /> Reset
                      </button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Dropdown className="findPropertyDiv">
                <StyledBadge badgeContent={"Features"}>
                  <Dropdown.Toggle id="findProperty" drop="left">
                    {searchData.area_sqft_min
                      ? `${searchData.area_sqft_min} - ${searchData.area_sqft_max}`
                      : "None"}
                  </Dropdown.Toggle>
                </StyledBadge>

                <Dropdown.Menu className="searchDropDownMenu">
                  <div>
                    <div>
                      <div className="proTypeOptionsDiv">
                        <div className="d-flex flex-column">
                          <Dropdown.Item>Residential</Dropdown.Item>
                          <Dropdown.Item>Commercial</Dropdown.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          </div>
          {screenWidth < 992 && (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="filterBtnDiv col-lg-6 px-0 my-3 col-md-6">
                <button className="getInTouchSendBtn" onClick={handleShow}>
                  <img
                    src="/icons/filter.svg"
                    alt="filterIcon"
                    className="mr-3"
                  />
                  Open Search Filters
                </button>
              </div>
            </div>
          )}

          <div className="col-md-12 my-1 d-flex justify-content-between flex-wrap">
            <div className="col-md findPropertySearch1 p-0">
              <div className="searchBtn">
                <InputGroup className="align-items-center">
                  <div className="col-md-9 px-0 col-sm-9 col-9">
                    <Select
                      isMulti
                      name="colors"
                      inputId="test789"
                      instanceId="test124121"
                      styles={style}
                      options={fakeOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder={`Search by location for ${findProperty}`}
                      onChange={(e) =>
                        e.map((item) =>
                          SetSearchData({
                            ...searchData,
                            address: searchData.address
                              ? [...searchData.address, item.label]
                              : [item.label],
                          })
                        )
                      }
                    />
                  </div>
                  <div className="col-md-3 col-sm-3 col-3 px-0 d-flex justify-content-end">
                    <InputGroup.Append>
                      {/* <InputGroup.Text className="searchIcon">
                        <MyLocationIcon />
                      </InputGroup.Text> */}
                      <button
                        className="searchFindBtn"
                        onClick={searchLoadData}
                      >
                        Find
                      </button>
                    </InputGroup.Append>
                  </div>
                </InputGroup>
              </div>
            </div>

            <div className="col-md  findPropertySearch2 p-0">
              <div className="searchBtn">
                <InputGroup className="align-items-center">
                  <div className="col-md-9 col-sm-9 col-9 px-0">
                    <Select
                      isMulti
                      name="colors"
                      inputId="teffdsf"
                      instanceId="tesdfsfsf"
                      styles={style}
                      options={keywords.keyword}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Search by Keywords"
                      onKeyDown={(e) =>
                        e.keyCode === 13 &&
                        setKeyWords({
                          ...keywords,
                          keyword: keywords.keyword
                            ? [
                                ...keywords.keyword,
                                {
                                  value: e.target.value,
                                  label: e.target.value,
                                },
                              ]
                            : [
                                {
                                  value: e.target.value,
                                  label: e.target.value,
                                },
                              ],
                        })
                      }
                      onChange={(e) =>
                        e.map((item) =>
                          SetSearchData({
                            ...searchData,
                            keyword: searchData.keyword
                              ? [...searchData.keyword, item.label]
                              : [item.label],
                          })
                        )
                      }
                    />
                  </div>
                  <div className="col-md-3 col-sm-3 col-3 px-0 d-flex justify-content-end">
                    <InputGroup.Append>
                      <button
                        className="searchFindBtn"
                        onClick={searchLoadData}
                      >
                        Find
                      </button>
                    </InputGroup.Append>
                  </div>
                </InputGroup>
              </div>
            </div>
          </div>
          <div className="col-md-12  d-flex justify-content-between mb-5 flex-wrap">
            <button className="resetFilter" onClick={() => SetSearchData({})}>
              <CloseIcon /> Reset Filters
            </button>
            {/* <Dropdown>
              <Dropdown.Toggle id="propertyDropdown" drop="left">
                <SortIcon /> Newst First
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
            </Dropdown> */}
          </div>

          <div className="col-md-12">
            <CardDeck>
              {searchResult && searchResult.length > 0 ? (
                searchResult.map((item) => (
                  <SingleProperty item={item} key={item._id} />
                ))
              ) : (
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <Spinner animation="border" />
                </div>
              )}
            </CardDeck>
          </div>
          <div className="col-md-12 d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev
                onClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
              />
              <Pagination.Item active>{pageNo}</Pagination.Item>
              <Pagination.Next onClick={() => setPageNo(pageNo + 1)} />
            </Pagination>
          </div>
          <ModalSearchComponent show={show} handleClose={handleClose} />
        </div>
      </div>
    </section>
  );
};

export default findProperties;
