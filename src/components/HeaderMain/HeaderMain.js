import { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import Select from "react-select";
import { useRouter } from "next/router";
import CloseIcon from "@material-ui/icons/Close";
import {
  Card,
  Accordion,
  Button,
  InputGroup,
  Modal,
  Dropdown,
  Form,
} from "react-bootstrap";
import DreamFinderContext from "../Context/Context";
import fakeOptions from "../../fakeData/fakeOptions";
import SearchItemGroup from "../SearchItemGroup/SearchItemGroup";
import ModalSearchInputGroup from "../ModalSearchInputGroup/ModalSearchInputGroup";
import ModalSearchComponent from "../ModalSearchComonent/ModalSearchComponent";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

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

const HeaderMain = () => {
  const {
    searchData,
    SetSearchData,
    findProperty,
    setFindProperty,
  } = useContext(DreamFinderContext);

  // searchData && searchData.beds.map((item) => console.log(item));
  // console.log(searchData);

  const [hide, SetHide] = useState("hide");
  const showHide = () => {
    hide === "hide" ? SetHide("show") : SetHide("hide");
  };

  const router = useRouter();
  const findHandler = () => {
    router.push("/findProperties");
  };
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

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const wid = window.innerWidth;
    setScreenWidth(wid);
  });

  // console.log(screenWidth);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showBtnHandler = (item) => {
    handleShow();
    setFindProperty(item);
  };

  const [minArea, setMinArea] = useState(null);
  const [maxArea, setMaxArea] = useState(null);
  const areaSubmitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    SetSearchData({
      ...searchData,
      area_sqft_min: Math.floor(minArea),
      area_sqft_max: Math.floor(maxArea),
    });
  };

  return (
    <section className="header-main py-5" id="home">
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-7 d-flex flex-column  justify-content-center mx-auto py-4">
            <div className="colorText">
              <h1 className="headerMainTitle">
                For all your realty solutions...
              </h1>
            </div>

            <div className="btnGroupDiv my-0 mx-auto d-flex flex-wrap justify-content-between align-content-center">
              {screenWidth < 992 && (
                <>
                  <button
                    onClick={() => showBtnHandler("Rent")}
                    className={`${findProperty === "Rent" && "active"}`}
                  >
                    For Rent
                  </button>
                  <button
                    onClick={() => showBtnHandler("Sell")}
                    className={`${findProperty === "Sell" && "active"}`}
                  >
                    For Sale
                  </button>
                </>
              )}
              <>
                <button
                  onClick={() => setFindProperty("Rent")}
                  className={`${findProperty === "Rent" && "active"} Rent`}
                >
                  For Rent
                </button>
                <button
                  onClick={() => setFindProperty("Sell")}
                  className={`${findProperty === "Sell" && "active"} Sell`}
                >
                  For Sale
                </button>
                <button
                  onClick={() => setFindProperty("new_project")}
                  className={`${
                    findProperty === "new_project" && "active"
                  } new_project`}
                >
                  New Project
                </button>
                <button
                  onClick={() => setFindProperty("Auction")}
                  className={`${
                    findProperty === "Auction" && "active"
                  } Auction`}
                >
                  For Auction
                </button>
              </>
            </div>
            <div className="searchDiv my-3">
              <div className="searchBtn">
                <InputGroup className="align-items-center">
                  <div className="col-md-10 px-0">
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
                  <div className="col-md-2 pr-0 d-flex justify-content-end">
                    <InputGroup.Append>
                      <button className="searchFindBtn" onClick={findHandler}>
                        Find
                      </button>
                    </InputGroup.Append>
                  </div>
                </InputGroup>
              </div>

              <Accordion>
                <Card className="bg-transparent">
                  <Accordion.Collapse eventKey="0">
                    <div
                      className={`searchDetails d-flex justify-content-between flex-wrap`}
                    >
                      <SearchItemGroup btnName="headerMain" />
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
                    </div>
                  </Accordion.Collapse>
                </Card>

                <Accordion.Toggle
                  as={Button}
                  eventKey="0"
                  onClick={showHide}
                  className="filter"
                >
                  {hide === "hide" ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  {`${hide === "hide" ? "Show More" : "Show less"}`}
                </Accordion.Toggle>
              </Accordion>
            </div>
          </div>
          <ModalSearchComponent show={show} handleClose={handleClose} />
        </div>
      </div>
    </section>
  );
};

export default HeaderMain;
