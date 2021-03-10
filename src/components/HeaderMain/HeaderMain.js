import { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import Select from "react-select";
import { useRouter } from "next/router";
import CloseIcon from "@material-ui/icons/Close";
import { Card, Accordion, Button, InputGroup, Modal } from "react-bootstrap";
import DreamFinderContext from "../Context/Context";
import fakeOptions from "../../fakeData/fakeOptions";
import SearchItemGroup from "../SearchItemGroup/SearchItemGroup";
import ModalSearchInputGroup from "../ModalSearchInputGroup/ModalSearchInputGroup";
import ModalSearchComponent from "../ModalSearchComonent/ModalSearchComponent";

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
          {/* <Modal
            dialogClassName="modal-90w"
            show={show}
            onHide={handleClose}
            animation={false}
          >
            <Modal.Body>
              <div className="col-md-12 col-sm-12 d-flex justify-content-between align-items-center ">
                <h3 className="filterSearch">Search Filters</h3>
                <CloseIcon onClick={handleClose} />
              </div>
              <div className="modalBtnDiv col-sm-12 col-md-12 d-flex justify-content-between px-3">
                <button
                  className={`w-100 rent ${
                    findProperty === "Rent" && "active"
                  }`}
                  onClick={() => setFindProperty("Rent")}
                >
                  Rent
                </button>
                <button
                  className={`w-100 ${findProperty === "Sell" && "active"}`}
                  onClick={() => setFindProperty("Sell")}
                >
                  Sale
                </button>
                <button
                  className={`w-100 ${
                    findProperty === "new_project" && "active"
                  }`}
                  onClick={() => setFindProperty("new_project")}
                >
                  Projects
                </button>
                <button
                  className={`w-100 auction ${
                    findProperty === "Auction" && "active"
                  }`}
                  onClick={() => setFindProperty("Auction")}
                >
                  Auction
                </button>
              </div>
              <ModalSearchInputGroup />
              <div className="col-md-12 col-sm-12 position-relative">
                <div className="searchModalFooter">
                  <button
                    className="w-100 resetFilter text-dark font-weight-bold"
                    onClick={() => SetSearchData({})}
                  >
                    Reset Filter
                  </button>
                  <button
                    className="w-100 getInTouchSendBtn mt-3"
                    onClick={findHandler}
                  >
                    Find
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal> */}
          <ModalSearchComponent show={show} handleClose={handleClose} />
        </div>
      </div>
    </section>
  );
};

export default HeaderMain;
