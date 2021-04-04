import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import { useContext } from "react";
import DreamFinderContext from "../../components/Context/Context";

const useStyles = makeStyles({
  root: {
    background: "#FFFFF8",
    boxShadow: "0px 5.6338px 5.6338px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    height: "100px",
    display: "flex",
  },
  link: {
    width: "150px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#FFFFF8",
    border: "1px solid #747474",
    boxSizing: "border-box",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "26px",
    color: "#474747",
    padding: "20px 30px",
    "&:hover": {
      textDecoration: "none",
      color: "#474747",
    },
  },
});

export default function Topbar({ active }) {
  const classes = useStyles();
  const { loggedInUser } = useContext(DreamFinderContext);
  console.log(loggedInUser);

  return (
    <div className={classes.root}>
      <Link href="/admin">
        <a
          style={{ background: active === "overview" ? "#FFE778" : "initial" }}
          className={classes.link}
        >
          Overview
        </a>
      </Link>
      <Link href="/admin/listing-requests">
        <a
          style={{
            background: active === "listing-requests" ? "#FFE778" : "initial",
          }}
          className={classes.link}
        >
          Listing Requests
        </a>
      </Link>
      <Link href="/admin/leads">
        <a
          style={{ background: active === "leads" ? "#FFE778" : "initial" }}
          className={classes.link}
        >
          Leads
        </a>
      </Link>
      <Link href="/admin/issues">
        <a
          style={{
            background: active === "issues-feedback" ? "#FFE778" : "initial",
          }}
          className={classes.link}
        >
          Issues / Feedback
        </a>
      </Link>
      <Link href="/admin/meetings">
        <a
          style={{ background: active === "meetings" ? "#FFE778" : "initial" }}
          className={classes.link}
        >
          Mettings
        </a>
      </Link>
    </div>
  );
}
