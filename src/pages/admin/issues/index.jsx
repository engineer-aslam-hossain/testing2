import { faPlus, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import AddNewIssueModal from "../../../components/AddNewIssueModal/AddNewIssueModal";
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
    display: "flex",
    alignItems: "center",
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
      "&:last-child": {
        marginLeft: "auto",
        background: "#BC9700",
        borderRadius: "4px",
        padding: "8px 15px",
        border: "none",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        lineHeight: "23px",
        color: "#FFFFFF",
        "& svg": {
          marginRight: "15px",
        },
      },
    },
  },
  inputGroup: {
    margin: "30px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridGap: "20px",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "4px",
      color: "#000000",
      textTransform: "uppercase",
    },
    "& span": {
      display: "block",
      position: "relative",
      width: "100%",
      height: "40px",
      "& input": {
        width: "100%",
        height: "100%",
        outline: "none",
        background: "#FFFFFF",
        border: "1px solid #747474",
        boxSizing: "border-box",
        borderRadius: "4px",
        padding: "0 10px",
      },
      "& svg": {
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        color: "#747474",
        cursor: "pointer",
      },
    },
    "& select": {
      width: "100%",
      height: "40px",
      outline: "none",
      background: "#FFFFFF",
      border: "1px solid #747474",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: "0 10px",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "21px",
      color: "#747474",
    },
  },
  resetLink: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "21px",
    color: "#FF0000",
    margin: "0px 30px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginTop: "-20px",
    marginBottom: "-20px",
    "& svg": {
      marginRight: "10px",
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

export default function Leads() {
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const [filterByIssueType, setFilterByIssueType] = useState("all");
  const [sortByTag, setSortByTag] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllIssues();
  }, [filterByIssueType, sortByTag, page, search]);

  const changeIssueTypeFilterState = (name) => setFilterByIssueType(name);

  const resetFilters = () => {
    setFilterByIssueType("all");
    setSortByTag("");
    setSearch("");
  };

  const getAllIssues = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/issue?page=${page}`;
    if (filterByIssueType !== "all") url += `&type=${filterByIssueType}`;
    if (sortByTag.length > 0) url += `&sort_filter=${sortByTag}`;
    if (search.length > 0) url += `&name=${search}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
      });
      const data = await res.json();
      setIssues(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <Topbar active="issues-feedback" />
        <h3 className={classes.sectionTitle}>Issue / Feedback Calls</h3>

        <div className={classes.btnGroup}>
          <button
            className={`${filterByIssueType === "all" ? "active" : ""}`}
            onClick={() => changeIssueTypeFilterState("all")}
          >
            Show All
          </button>
          <button
            className={`${filterByIssueType === "Feedback" ? "active" : ""}`}
            onClick={() => changeIssueTypeFilterState("Feedback")}
          >
            Show Feedback Only
          </button>
          <button
            className={`${filterByIssueType === "Complaint" ? "active" : ""}`}
            onClick={() => changeIssueTypeFilterState("Complaint")}
          >
            Show Complaints Only
          </button>
          <AddNewIssueModal getAllIssues={getAllIssues}>
            <button>
              <FontAwesomeIcon icon={faPlus} /> New Issue Report
            </button>
          </AddNewIssueModal>
        </div>

        <div className={classes.inputGroup}>
          <div>
            <h5>Search</h5>
            <span>
              <input
                type="text"
                placeholder="Search by Name, Property ID, Status"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          {/* <div>
		<h5>Status</h5>
		<select>
			<option value="Show all">Show All</option>
		</select>
	</div> */}
          <div>
            <h5>Sort By</h5>
            <select onChange={({ target }) => setSortByTag(target.value)}>
              <option>Select Option</option>
              <option value="name">Name</option>
              <option value="new_first">New First</option>
              <option value="old_first">Old First</option>
            </select>
          </div>
        </div>

        {(!!sortByTag.length ||
          !!search.length ||
          filterByIssueType !== "all") && (
          <p className={classes.resetLink} onClick={resetFilters}>
            <FontAwesomeIcon icon={faTimes} /> Reset Search filters
          </p>
        )}

        <div className={classes.tableWrapper}>
          <table>
            <thead>
              <tr>
                <td>Time</td>
                <td>Issue Type</td>
                <td>Status</td>
                <td>Name</td>
                <td>Phone</td>
                <td>Email</td>
                <td>Address</td>
                <td>Issue</td>
                <td>Next Meeting</td>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, ind) => (
                <tr
                  key={ind}
                  onClick={() => Router.push(`/admin/issues/${issue._id}`)}
                >
                  <td>{issue.createdAt || "N/A"}</td>
                  <td>{issue.type || "N/A"}</td>
                  <td>{issue.status || "N/A"}</td>
                  <td>{issue.name || "N/A"}</td>
                  <td>{issue.phone || "N/A"}</td>
                  <td>{issue.email || "N/A"}</td>
                  <td>{issue.address || "N/A"}</td>
                  <td>{issue.msg || "N/A"}</td>
                  <td>N/A</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={classes.paginationWrapper}>
          {page !== 1 && (
            <button
              onClick={() => setPage((page) => (page > 1 ? page - 1 : page))}
            >
              Prev
            </button>
          )}
          {page > 1 && !!issues.length && (
            <Fragment>
              <button>{page - 1}</button>
              <button className="active">{page}</button>
              <button>{page + 1}</button>
            </Fragment>
          )}
          {issues.length > 0 && (
            <button onClick={() => setPage((page) => page + 1)}>Next</button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
