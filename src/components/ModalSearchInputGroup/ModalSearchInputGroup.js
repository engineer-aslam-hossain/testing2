import { useContext, useState } from "react";
import DreamFinderContext from "../Context/Context";
import Select from "react-select";
import fakeOptions from "../../fakeData/fakeOptions";
import { Dropdown, Form } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import fakeProperty from "../../fakeData/fakeProperty";
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
    fontSize: "10px",
    justifyContent: "start",
    transform: "none",
    paddingTop: ".25rem",
  },
}))(Badge);
const ModalSearchInputGroup = () => {
  const {
    searchData,
    SetSearchData,
    findProperty,
    setFindProperty,
  } = useContext(DreamFinderContext);
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      fontSize: "12px",
    }),
    option: (styles) => {
      return {
        ...styles,
        fontSize: "12px",
      };
    },
  };
  const residentHandler = () => {
    document.querySelector(".resBtn").classList.add("active");
    document.querySelector(".comBtn").classList.remove("active");
    document
      .querySelector(".proTypeOptionsDiv")
      .style.setProperty("display", "block");
    document
      .querySelector(".comercialOptionsDiv")
      .style.setProperty("display", "none");
  };
  const comarcialHandler = () => {
    document.querySelector(".resBtn").classList.remove("active");
    document.querySelector(".comBtn").classList.add("active");
    document
      .querySelector(".proTypeOptionsDiv")
      .style.setProperty("display", "none");
    document
      .querySelector(".comercialOptionsDiv")
      .style.setProperty("display", "block");
  };

  const [range, setRange] = useState({
    min: "",
    max: "",
    show: "",
  });
  const onChangeHandler = (e) => {
    e.preventDefault();
    const newRange = { ...range };
    newRange[e.target.name] = e.target.value;
    setRange(newRange);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const changeRange = { ...range };
    changeRange["show"] = true;
    setRange(changeRange);
    SetSearchData({
      ...searchData,
      price_min: parseInt(range.min),
      price_max: parseInt(range.max),
    });
  };

  const [minArea, setMinArea] = useState(null);
  const [maxArea, setMaxArea] = useState(null);
  const areaSubmitHandler = (e) => {
    e.preventDefault();
    SetSearchData({
      ...searchData,
      area_sqft_min: Math.floor(minArea),
      area_sqft_max: Math.floor(maxArea),
    });
  };

  return (
    <div>
      <div className="col-md-12 col-sm-12 ">
        <div className=" py-0 my-3 modalSearchSelect">
          <Select
            isMulti
            name="colors"
            inputId="test123"
            instanceId="test456"
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
      </div>
      <div className="col-md-12 col-sm-12 my-3">
        <div className="searchModalDiv">
          <Dropdown className="findPropertyDiv">
            <StyledBadge badgeContent={"Property Type"}>
              <Dropdown.Toggle className="w-100 searchModalBtn" drop="left">
                {searchData.property_type ? searchData.property_type : "All"}
              </Dropdown.Toggle>
            </StyledBadge>

            <Dropdown.Menu className="ModalSearchDropDownMenu">
              <div>
                <div className="mx-4 d-flex justify-content-center proTypeBtnDiv ">
                  <button onClick={residentHandler} className="resBtn active">
                    RESIDENTIAL
                  </button>
                  <button onClick={comarcialHandler} className="comBtn">
                    COMERCIAL
                  </button>
                </div>
                <div>
                  <div className="proTypeOptionsDiv">
                    <div className="d-flex flex-column">
                      {fakeProperty.map(
                        (item) =>
                          item.category === "residential" && (
                            <button
                              onClick={(e) =>
                                SetSearchData({
                                  ...searchData,
                                  property_type: e.target.innerText,
                                })
                              }
                              key={item.id}
                              className="propertyTypeBtn"
                              name="propertyType"
                            >
                              {searchData.property_type === item.name && (
                                <CheckIcon className="mr-3" />
                              )}
                              {item.name}
                            </button>
                          )
                      )}
                      <div className="d-flex justify-content-end">
                        <button
                          className="resetBtn"
                          onClick={() => SetProperty("All")}
                        >
                          <CloseIcon /> Reset
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="comercialOptionsDiv">
                    <div className="d-flex flex-column">
                      {fakeProperty.map(
                        (item) =>
                          item.category === "comercial" && (
                            <button
                              className="propertyTypeBtn"
                              key={item.id}
                              onClick={(e) =>
                                SetSearchData({
                                  ...searchData,
                                  property_type: e.target.innerText,
                                })
                              }
                            >
                              {searchData.property_type === item.name && (
                                <CheckIcon className="mr-3" />
                              )}
                              {item.name}
                            </button>
                          )
                      )}
                      <div className="d-flex justify-content-end">
                        <button
                          className="resetBtn"
                          onClick={() => SetProperty("All")}
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
      <div className="col-md-12 col-sm-12 my-3">
        <div className="searchModalDiv">
          <Dropdown className="findPropertyDiv">
            <StyledBadge badgeContent={"Price ( BDT )"}>
              <Dropdown.Toggle drop="left" className="w-100 searchModalBtn">
                {searchData.price_min && searchData.price_max
                  ? `${searchData.price_min}- ${searchData.price_max} BDT`
                  : "Price"}
              </Dropdown.Toggle>
            </StyledBadge>

            <Dropdown.Menu className="searchDropDownMenu PriceMenu">
              <div className="p-3">
                <Form className="d-flex flex-column" onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Min</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="BDT"
                      className="priceInput"
                      name="min"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Max</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="BDT"
                      className="priceInput"
                      name="max"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                  <button type="submit" className="priceSubmitBtn">
                    SET PRICE RANGE
                  </button>
                </Form>
                <div className="d-flex justify-content-end mt-3">
                  <button className="resetBtn" onClick={() => setRange("")}>
                    <CloseIcon /> Reset
                  </button>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="col-md-12 col-sm-12 my-3">
        <div className="searchModalDiv">
          <Dropdown className="findPropertyDiv">
            <StyledBadge badgeContent={"Beds"}>
              <Dropdown.Toggle drop="left" className="w-100 searchModalBtn">
                {searchData.beds ? searchData.beds.join(",") : "Beds"}
              </Dropdown.Toggle>
            </StyledBadge>

            <Dropdown.Menu className="searchDropDownMenu bedmenu">
              <div>
                <div>
                  <div className="proTypeOptionsDiv">
                    <div className="d-flex flex-column">
                      {fakeProperty.map(
                        (item) =>
                          item.category === "beds" && (
                            <button
                              className="propertyTypeBtn"
                              onClick={(e) =>
                                SetSearchData({
                                  ...searchData,
                                  beds: searchData.beds
                                    ? [
                                        ...searchData.beds,
                                        parseInt(e.target.innerText),
                                      ]
                                    : [parseInt(e.target.innerText)],
                                })
                              }
                              key={item.id}
                            >
                              {searchData.beds &&
                                searchData.beds.map(
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
                          onClick={() => Setbed("Any")}
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
      <div className="col-md-12 col-sm-12 my-3">
        <div className="searchModalDiv">
          <Dropdown className="findPropertyDiv">
            <StyledBadge badgeContent={"Area (Sq.Ft)"}>
              <Dropdown.Toggle drop="left" className="w-100 searchModalBtn">
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
        </div>
      </div>
      <div className="col-md-12 col-sm-12 my-3">
        <div className="searchModalDiv">
          <Dropdown>
            <StyledBadge badgeContent={"Bath"}>
              <Dropdown.Toggle className="w-100 searchModalBtn" drop="left">
                {searchData.baths ? searchData.baths.join(",") : "Baths"}
              </Dropdown.Toggle>
            </StyledBadge>

            <Dropdown.Menu className="ModalSearchDropDownMenu">
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
    </div>
  );
};

export default ModalSearchInputGroup;
