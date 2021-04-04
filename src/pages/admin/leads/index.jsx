import { faPlus, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core";
import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import AddNewLeadModal from "../../../components/AddNewLeadModal/AddNewLeadModal";
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
    "& span": {
      display: "flex",
      alignItems: "center",
      marginRight: "15px",
      "& input:checked + label": {
        background: "#474747",
      },
      "& label": {
        display: "inline-block",
        width: "16px",
        height: "16px",
        background: "#ffffff",
        marginRight: "5px",
        marginBottom: "0",
        borderRadius: "50%",
        border: "1px solid #474747",
        cursor: "pointer",
      },
    },
    "& button": {
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
  const [leads, setLeads] = useState([]);
  const [filterByLeadType, setFilterByLeadType] = useState("all");
  const [sortByTag, setSortByTag] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllleads();
  }, [filterByLeadType, sortByTag, page, search]);

  const changeLeadTypeFilterState = ({ target }) =>
    setFilterByLeadType(target.name);

  const resetFilters = () => {
    setFilterByLeadType("all");
    setSortByTag("");
    setSearch("");
  };

  const getAllleads = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/lead?page=${page}`;
    if (filterByLeadType !== "all") url += `&lead_type=${filterByLeadType}`;
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
      setLeads(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <Topbar active="leads" />
        <h3 className={classes.sectionTitle}>All Leads</h3>

        <div className={classes.btnGroup}>
          <span>
            <input
              hidden
              type="checkbox"
              name="all"
              checked={filterByLeadType === "all"}
              onChange={changeLeadTypeFilterState}
              id="checkbox-1"
            />
            <label htmlFor="checkbox-1" />
            Show All
          </span>
          <span>
            <input
              hidden
              type="checkbox"
              name="Tenant"
              checked={filterByLeadType === "Tenant"}
              onChange={changeLeadTypeFilterState}
              id="checkbox-2"
            />
            <label htmlFor="checkbox-2" />
            Show Tenants Only
          </span>
          <span>
            <input
              hidden
              type="checkbox"
              name="Buyer"
              checked={filterByLeadType === "Buyer"}
              onChange={changeLeadTypeFilterState}
              id="checkbox-3"
            />
            <label htmlFor="checkbox-3" />
            Show Buyers Only
          </span>
          <span>
            <input
              hidden
              type="checkbox"
              name="Owner"
              checked={filterByLeadType === "Owner"}
              onChange={changeLeadTypeFilterState}
              id="checkbox-4"
            />
            <label htmlFor="checkbox-4" />
            Show Owners Only
          </span>
          <AddNewLeadModal getAllleads={getAllleads}>
            <button>
              <FontAwesomeIcon icon={faPlus} /> Generate New Lead
            </button>
          </AddNewLeadModal>
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
          filterByLeadType !== "all") && (
          <p className={classes.resetLink} onClick={resetFilters}>
            <FontAwesomeIcon icon={faTimes} /> Reset Search filters
          </p>
        )}

        <div className={classes.tableWrapper}>
          <table>
            <thead>
              <tr>
                <td>LEAD ID</td>
                <td>Time</td>
                <td>Lead Type</td>
                <td>Property ID</td>
                <td>Name</td>
                <td>Phone</td>
                <td>Zilla</td>
                <td>Upazilla/Thana</td>
                <td>STATUS</td>
                <td>Next Meeting</td>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, ind) => (
                <tr
                  key={ind}
                  onClick={() => router.push(`/admin/leads/${lead._id}`)}
                >
                  <td>{lead._id.substr(0, 5)}</td>
                  <td>{lead.createdAt}</td>
                  <td>{lead.lead_type}</td>
                  <td>{lead.property_id || "N/A"}</td>
                  <td>{lead.name || "N/A"}</td>
                  <td>{lead.phone || "N/A"}</td>
                  <td>{lead.zilla || "N/A"}</td>
                  <td>{lead.upazilla || "N/A"}</td>
                  <td>{lead.status || "N/A"}</td>
                  <td>{lead.meeting[0]?.date || "N/A"}</td>
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
          {page > 1 && !!leads.length && (
            <Fragment>
              <button>{page - 1}</button>
              <button className="active">{page}</button>
              <button>{page + 1}</button>
            </Fragment>
          )}
          {leads.length > 0 && (
            <button onClick={() => setPage((page) => page + 1)}>Next</button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
