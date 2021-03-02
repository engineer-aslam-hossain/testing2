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
import fakePopularity from "../fakeData/fakePopularity";
import SingleProperty from "../components/SingleProperty/SingleProperty";
import DreamFinderContext from "../components/Context/Context";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import fakeOptions from "../fakeData/fakeOptions";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import SortIcon from "@material-ui/icons/Sort";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SearchItemGroup from "../components/SearchItemGroup/SearchItemGroup";
import fakeProperty from "../fakeData/fakeProperty";
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
    justifyContent: "start",
    transform: "none",
  },
}))(Badge);

const myProperties = () => {
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

  const [pageNo, setPageNo] = useState(1);
  const [endIndex, setEndIndex] = useState(20);
  const [startIndex, setStartIndex] = useState(0);

  const previousPage = () => {
    pageNo > 1 && setPageNo(pageNo - 1);
    startIndex > 0 && setStartIndex(startIndex - 20);
    endIndex > 20 && setEndIndex(endIndex - 20);
  };
  const nextPage = () => {
    setPageNo(pageNo + 1);
    setStartIndex(startIndex + 20);
    setEndIndex(endIndex + 20);
  };

  const searchLoadData = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("dreamfinder_session"));
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/my`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          dreamfinder: getToken,
        },
        body: JSON.stringify({ purpose: findProperty }),
      });
      const data = await res.json();
      setSearchResult(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchLoadData();
  }, []);

  // console.log(searchData);
  return (
    <section className="Properties">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between findPropertyHeader align-items-center flex-wrap">
            <div>
              <h1>My Property For {findProperty}</h1>
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
                New Project
              </button>
              <button
                onClick={() => setFindProperty("Auction")}
                className={`${findProperty === "Auction" && "active"}`}
              >
                Auction
              </button>
            </div>
          </div>

          <div className="col-md-12  d-flex justify-content-between mb-5 flex-wrap">
            {/* <button className="resetFilter">
              <CloseIcon /> Reset Filters
            </button> */}
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
                searchResult
                  .slice(startIndex, endIndex)
                  .map(
                    (item) =>
                      item.purpose === findProperty && (
                        <SingleProperty item={item} key={item._id} />
                      )
                  )
              ) : (
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <Spinner animation="border" />
                </div>
              )}
            </CardDeck>
          </div>
          <div className="col-md-12 d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{pageNo}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
};

export default myProperties;
