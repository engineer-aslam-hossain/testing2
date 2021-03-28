import {
  Dropdown,
  Form,
  InputGroup,
  Pagination,
  Spinner,
} from "react-bootstrap";
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
  const [pageNo, setPageNo] = useState(1);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20);

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

  const submitHandler = (e) => {
    e.preventDefault();
    SetSearchData({
      ...searchData,
      area_sqft_min: Math.floor(minArea),
      area_sqft_max: Math.floor(maxArea),
    });
  };

  const getSaveProperty = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
      // console.log(getToken);
      if (getToken) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/favourites`,
          {
            method: "GET",
            headers: { DreamFinder: getToken },
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
  // console.log(saveProperties);
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
          <div className="col-md-12 d-flex  flex-wrap mt-5">
            {saveProperties && saveProperties.length > 0 ? (
              saveProperties
                .slice(startIndex, 20)
                .map((item) => <SingleProperty item={item} key={item._id} />)
            ) : (
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            )}
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

export default SaveProperty;
