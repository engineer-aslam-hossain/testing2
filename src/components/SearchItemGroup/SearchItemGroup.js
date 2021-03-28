import { Dropdown, Form } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { useContext, useState } from "react";
import Badge from "@material-ui/core/Badge";
import DreamFinderContext from "../Context/Context";
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

const SearchItemGroup = ({ btnName }) => {
  const {
    searchData,
    SetSearchData,
    setSearchResult,
    findProperty,
    setFindProperty,
  } = useContext(DreamFinderContext);
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

  // console.log(searchData);
  return (
    <>
      <Dropdown className="findPropertyDiv">
        <StyledBadge badgeContent={"Property Type"}>
          <Dropdown.Toggle className={btnName} drop="left">
            {searchData.property_type ? searchData.property_type : "All"}
          </Dropdown.Toggle>
        </StyledBadge>

        <Dropdown.Menu className="searchDropDownMenu">
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
      <Dropdown className="findPropertyDiv">
        <StyledBadge badgeContent={"Price ( BDT )"}>
          <Dropdown.Toggle className={btnName} drop="left">
            {range.show ? `${range.min}- ${range.max} BDT` : "Price"}
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
      <Dropdown className="findPropertyDiv">
        <StyledBadge badgeContent={"Beds"}>
          <Dropdown.Toggle className={btnName} drop="left">
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
                                  <CheckIcon className="mr-3" key={item.name} />
                                )
                            )}
                          {item.name}
                        </button>
                      )
                  )}
                  <div className="d-flex justify-content-end">
                    <button className="resetBtn" onClick={() => Setbed("Any")}>
                      <CloseIcon /> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SearchItemGroup;
