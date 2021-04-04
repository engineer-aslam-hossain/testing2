import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Topbar from "../../../components/Topbar/Topbar";

const useStyles = makeStyles({
  root: {
    marginTop: "-115px",
  },
  main: {
    width: "100%",
    paddingBottom: "100px",
  },
  sectionTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "40px",
    lineHeight: "52px",
    color: "#474747",
    margin: "30px",
  },
  btnGroup: {
    margin: "30px",
    "& button": {
      display: "inline-block",
      background: "#FFFFF8",
      border: "1px solid #E7E7E7",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: "5px 15px",
      marginRight: "20px",
      textTransform: "uppercase",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "12px",
      lineHeight: "21px",
      color: "#000000",
      "&.active": {
        background: "#FFD200",
      },
    },
  },
  tableWrapper: {
    margin: "30px",
    background: "#FFFFFF",
    border: "1px solid #A7A7A7",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    "& table": {
      width: "100%",
      borderCollapse: "collapse",
      "& td": {
        padding: "10px",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "18px",
        color: "#474747",
        "& + td": {
          borderLeft: "1px solid #A7A7A7",
        },
        "& div": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        "& button": {
          background: "#BC9700",
          borderRadius: "4px",
          padding: "5px 15px",
          border: "none",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "13px",
          lineHeight: "21px",
          color: "#FFFFFF",
        },
      },
      "& thead td": {
        background: "#E7E7E7",
        borderBottom: "1px solid #A7A7A7",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "23px",
        color: "#474747",
      },
    },
  },
  paginationWrapper: {
    margin: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      minWidth: "30px",
      height: "30px",
      border: "none",
      background: "transparent",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "21px",
      color: "#000000",
      "&.active": {
        background: "#474747",
        borderRadius: "2px",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "21px",
        color: "#FFE778",
      },
    },
  },
});

export default function ListingRequests() {
  const classes = useStyles();
  const [lists, setLists] = useState([]);
  const [filterByListType, setFilterByListType] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllLists();
  }, [filterByListType]);

  const changeListTypeFilterState = (name) => setFilterByListType(name);

  const getAllLists = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/list/search?page=${page}`;
    if (filterByListType !== "all") url += `&type=${filterByListType}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
      });
      const data = await res.json();
      setLists(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="container">
        <Topbar active="listing-requests" />

        <h3 className={classes.sectionTitle}>All Property Listing Requests</h3>

        <div className={classes.btnGroup}>
          <button
            className={`${filterByListType === "all" ? "active" : ""}`}
            onClick={() => changeListTypeFilterState("all")}
          >
            Show All
          </button>
          <button
            className={`${filterByListType === "Rent" ? "active" : ""}`}
            onClick={() => changeListTypeFilterState("Rent")}
          >
            Show Rents Only
          </button>
          <button
            className={`${filterByListType === "Sale" ? "active" : ""}`}
            onClick={() => changeListTypeFilterState("Sale")}
          >
            Show Sells Only
          </button>
          <button
            className={`${filterByListType === "Auction" ? "active" : ""}`}
            onClick={() => changeListTypeFilterState("Auction")}
          >
            Show Auctions Only
          </button>
        </div>

        <div className={classes.tableWrapper}>
          <table>
            <thead>
              <tr>
                <td>Time</td>
                <td>Property Type</td>
                <td>Purpose</td>
                <td>Zilla</td>
                <td>Upazilla/Thana</td>
                <td>Name</td>
                <td>Role</td>
                <td>Email</td>
                <td>Phone</td>
              </tr>
            </thead>
            <tbody>
              {lists.map((list, ind) => (
                <tr key={ind}>
                  <td>{list.createdAt || "N/A"}</td>
                  <td>{list.property_type || "N/A"}</td>
                  <td>{list.purpose || "N/A"}</td>
                  <td>{list.zilla || "N/A"}</td>
                  <td>{list.upazilla || "N/A"}</td>
                  <td>{list.role[0] || "N/A"}</td>
                  <td>{list.name || "N/A"}</td>
                  <td>{list.email || "N/A"}</td>
                  <td>
                    <div>
                      {list.phone_number || "N/A"} <button>New Lead</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={classes.paginationWrapper}>
          <button>Prev</button>
          <button>1</button>
          <button>2</button>
          <button className="active">3</button>
          <button>4</button>
          <button>5</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}
