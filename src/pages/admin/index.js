import { makeStyles } from "@material-ui/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import DreamFinderContext from "../../components/Context/Context";
import Topbar from "../../components/Topbar/Topbar";

const useStyles = makeStyles({
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
  userInfo: {
    background: "#FFFFF8",
    border: "1px solid #E7E7E7",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    padding: "30px",
  },
  userInfoWelcomeMsg: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "200%",
    color: "#474747",
  },
  userInfoRole: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "200%",
    color: "#474747",
  },
  userInfoStatsWrapper: {
    display: "flex",
  },
  userInfoStats: {
    minWidth: "220px",
    marginTop: "20px",
    "& + &": {
      marginLeft: "50px",
    },
    "& h3": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "200%",
      color: "#A08A00",
    },
    "& span": {
      display: "flex",
      justifyContent: "space-between",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "200%",
      color: "#474747",
    },
  },
  activityOverviewWrapper: {
    background: "#FFFFF8",
    border: "1px solid #E7E7E7",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    padding: "30px",
    marginTop: "30px",
  },
  activityOverviewTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "32px",
      lineHeight: "41px",
      color: "#474747",
    },
    "& select": {
      width: "230px",
      height: "38px",
      background: "#FFFFFF",
      border: "1px solid #C7C7C7",
      boxSizing: "border-box",
      borderRadius: "4px",
      padding: "0 10px",
    },
  },
  activityOverviewBoard: {
    padding: "30px",
    background: "#FFFFFF",
    border: "1px solid #A7A7A7",
    boxSizing: "border-box",
    borderRadius: "4px",
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    gridGap: "30px",
  },
  activityOverviewStats: {
    "& h3": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "200%",
      color: "#A08A00",
    },
    "& span": {
      display: "flex",
      justifyContent: "space-between",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "200%",
      color: "#474747",
    },
  },
  activityOverviewStatChart: {
    minHeight: "250px",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [activity, setActivity] = useState(null);
  const { loggedInUser } = useContext(DreamFinderContext);

  useEffect(() => {
    if (loggedInUser?._id) {
      getUserActivity(loggedInUser?._id);
    }
  }, [loggedInUser]);

  const getUserActivity = async () => {
    const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/overview?user_id=${
      loggedInUser?._id
    }&from=2021-03-01&till=${moment().format("YYYY-MM-DD")}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DreamFinder: getToken,
        },
      });
      const data = await res.json();
      setActivity(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const leadGenarationData = [
    { name: "Leads Ongoing", value: activity?.lead?.ongoing || 0 },
    { name: "Leads Passed", value: activity?.lead?.ongoing || 0 },
    { name: "Leads failed", value: activity?.lead?.failed || 0 },
    { name: "Leads Total", value: activity?.lead?.total || 0 },
  ];

  const meetingsData = [
    { name: "Meetings Ongoing", value: activity?.meeting?.ongoing || 0 },
    { name: "Meetings Attended", value: activity?.meeting?.attended || 0 },
    { name: "Meetings Missed", value: activity?.meeting?.missed || 0 },
    { name: "Meetings Total", value: activity?.meeting?.total || 0 },
  ];

  const reportsData = [
    { name: "Calls Taken", value: 340 },
    { name: "Issues Solved", value: 276 },
    { name: "Unresolved Issues", value: 64 },
  ];

  return (
    <div className={classes.root}>
      <div className="container">
        <Topbar active="overview" />

        <div className={classes.main}>
          <h3 className={classes.sectionTitle}>Admin Dashboard</h3>

          <div className={classes.userInfo}>
            <h4 className={classes.userInfoWelcomeMsg}>
              Welcome, {loggedInUser.name}
            </h4>
            <h3 className={classes.userInfoRole}>
              Role: {loggedInUser.role?.[0]}
            </h3>

            <div className={classes.userInfoStatsWrapper}>
              <div className={classes.userInfoStats}>
                <h3>Lead Generation</h3>
                <span>
                  Leads Ongoing <strong>{activity?.lead?.ongoing}</strong>
                </span>
                <span>
                  Leads Passed <strong>{activity?.lead?.passed}</strong>
                </span>
                <span>
                  Leads Failed <strong>{activity?.lead?.failed}</strong>
                </span>
                <span>
                  Leads Total <strong>{activity?.lead?.total}</strong>
                </span>
              </div>

              <div className={classes.userInfoStats}>
                <h3>Meetings</h3>
                <span>
                  Meetings Ongoing <strong>{activity?.meeting?.ongoing}</strong>
                </span>
                <span>
                  Meetings Attended{" "}
                  <strong>{activity?.meeting?.attended}</strong>
                </span>
                <span>
                  Meetings Missed <strong>{activity?.meeting?.missed}</strong>
                </span>
                <span>
                  Meetings Total <strong>{activity?.meeting?.total}</strong>
                </span>
              </div>

              <div className={classes.userInfoStats}>
                <h3>Reports / Query Calls</h3>
                <span>
                  Calls Taken <strong>340</strong>
                </span>
                <span>
                  Issues Solved <strong>256</strong>
                </span>
                <span>
                  Unresolved Issues <strong>64</strong>
                </span>
              </div>
            </div>
          </div>

          <div className={classes.activityOverviewWrapper}>
            <div className={classes.activityOverviewTop}>
              <h3>Activity Overview</h3>
              <span>
                Last{" "}
                <select>
                  <option value="week">Week</option>
                </select>
              </span>
            </div>

            <div className={classes.activityOverviewBoard}>
              <div className={classes.activityOverviewStats}>
                <h3>Lead Generation</h3>
                <span>
                  Leads Ongoing <strong>{activity?.lead?.ongoing}</strong>
                </span>
                <span>
                  Leads Passed <strong>{activity?.lead?.passed}</strong>
                </span>
                <span>
                  Leads Failed <strong>{activity?.lead?.failed}</strong>
                </span>
                <span>
                  Leads Total <strong>{activity?.lead?.total}</strong>
                </span>
              </div>

              <div className={classes.activityOverviewStatChart}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={leadGenarationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={classes.activityOverviewBoard}>
              <div className={classes.activityOverviewStats}>
                <h3>Meetings</h3>
                <span>
                  Meetings Ongoing <strong>{activity?.meeting?.ongoing}</strong>
                </span>
                <span>
                  Meetings Attended{" "}
                  <strong>{activity?.meeting?.attended}</strong>
                </span>
                <span>
                  Meetings Missed <strong>{activity?.meeting?.missed}</strong>
                </span>
                <span>
                  Meetings Total <strong>{activity?.meeting?.total}</strong>
                </span>
              </div>

              <div className={classes.activityOverviewStatChart}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={meetingsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={classes.activityOverviewBoard}>
              <div className={classes.activityOverviewStats}>
                <h3>Reports / Query Calls</h3>
                <span>
                  Calls Taken <strong>340</strong>
                </span>
                <span>
                  Issues Solved <strong>276</strong>
                </span>
                <span>
                  Unresolved Issues <strong>64</strong>
                </span>
              </div>

              <div className={classes.activityOverviewStatChart}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={reportsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
