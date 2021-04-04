import { makeStyles } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import AllMeetnigsModal from "../../../components/AllMeetnigsModal/AllMeetnigsModal";
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
    display: "flex",
    justifyContent: "flex-end",
    "& span": {
      minWidth: "200px",
      height: "40px",
      display: "inline-block",
      marginLeft: "10px",
    },
    "& label": {
      display: "block",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "5px",
      color: "#000000",
      textTransform: "uppercase",
    },
    "& select": {
      width: "100%",
      height: "30px",
      background: "#FFFFFF",
      opacity: "0.74",
      border: "1px solid #747474",
      boxSizing: "border-box",
      borderRadius: "4px",
      outline: "none",
    },
  },
  calanderDayNames: {
    margin: "0 30px",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    "& span": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40px",
      background: "#E5E5E5",
      borderTop: "1px solid #A7A7A7",
      borderLeft: "1px solid #A7A7A7",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#474747",
      "&:last-child": {
        borderRight: "1px solid #A7A7A7",
      },
    },
  },
  calanderWrapper: {
    margin: "0 30px",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    border: "1px solid #A7A7A7",
    borderBottom: "none",
    borderRight: "none",
  },
  calanderDay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    background: "transparent",
    borderRight: "1px solid #A7A7A7",
    borderBottom: "1px solid #A7A7A7",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#474747",
    position: "relative",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    lineHeight: "22px",
    color: "#000000",
    padding: "20px",
    textAlign: "center",
    "&::before": {
      content: "attr(data-content)",
      position: "absolute",
      top: "10px",
      right: "10px",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "30px",
      color: "#474747",
    },
  },
});

export default function Leads() {
  const classes = useStyles();
  const [meetings, setMeetings] = useState([]);
  const [selectedMon, setSelectedMon] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getAllMettings();
  }, []);

  const getAllMettings = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/meeting/month_view?year=${selectedYear}&month=${+selectedMon}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
      });
      const data = await res.json();
      setMeetings(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <Topbar active="meetings" />
        <h3 className={classes.sectionTitle}>Meeting Schedule</h3>

        <div className={classes.inputGroup}>
          <span>
            <label htmlFor="month">Month</label>
            <select
              defaultValue={selectedMon}
              onChange={({ target }) => setSelectedMon(target.value)}
            >
              <option value="1">Jan</option>
              <option value="2">Fev</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </span>
          <span>
            <label htmlFor="year">Year</label>
            <select
              defaultValue={selectedYear}
              onChange={({ target }) => setSelectedYear(target.value)}
            >
              <option value={selectedYear}>{selectedYear}</option>
            </select>
          </span>
        </div>
        <div className={classes.calanderDayNames}>
          <span>Saturday</span>
          <span>Sunday</span>
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednessday</span>
          <span>Thursday</span>
          <span>Friday</span>
        </div>
        <div className={classes.calanderWrapper}>
          {meetings.map((meeting, ind) => (
            <AllMeetnigsModal key={ind} date={"2021-03-01"}>
              <div className={classes.calanderDay} data-content={ind + 1}>
                {meeting.count} Mettings pending
              </div>
            </AllMeetnigsModal>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
