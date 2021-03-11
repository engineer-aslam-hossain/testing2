import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import navLink from "../../fakeData/navLink";
import Link from "next/link";
import Image from "next/image";
import DreamFinderContext from "../Context/Context";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Fragment } from "react";

const useStyles = makeStyles({
  list: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "2rem",
  },
  fullList: {
    width: "auto",
  },
});

const Header = () => {
  // test code

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {navLink.map((item) => (
        <Fragment key={item.id}>
          {item.id == 5 && loggedInUser.email ? null : (
            <Link href={item.to} key={item.id}>
              <a className={`headerLinks ${isActive(item.to)}`}>{item.name}</a>
            </Link>
          )}
        </Fragment>
      ))}

      {!loggedInUser.email && (
        <Link href="/sign-up">
          <a className={`px-2 headerLinks signUpBtn`}>
            Become a Member : SIGNUP
          </a>
        </Link>
      )}
      {loggedInUser.email && (
        <Link href="/profile">
          <a className="headerLinks">
            <img
              src="/icons/admin/user.svg"
              alt="icons"
              className="img-fluid navImg"
            />
            My Profile
          </a>
        </Link>
      )}
      <Link href="/list-a-new-property">
        <a className="headerLinks">
          <img
            src="/icons/Profile_ListNewProperty.svg"
            alt="icons"
            className="img-fluid navImg"
          />
          List a New Property
        </a>
      </Link>
      <Link href="/">
        <a className="headerLinks">
          <img
            src="/icons/Profile_ManageRenters.svg"
            alt="icons"
            className="img-fluid navImg"
          />
          Pay Rent
        </a>
      </Link>
      <Link href="/myProperties">
        <a className="headerLinks">
          <img
            src="/icons/Profile_MyListedProperties.svg"
            alt="icons"
            className="img-fluid navImg"
          />
          My Existing Properties
        </a>
      </Link>
      <Link href="/save-property">
        <a className="headerLinks">
          <img
            src="/icons/Profile_FavoriteProperties.svg"
            alt="icons"
            className="img-fluid navImg"
          />
          Saved Properties
        </a>
      </Link>
      <Link href="/">
        <a className="headerLinks">
          <img
            src="/icons/Profile_SiteSettings.svg"
            alt="icons"
            className="img-fluid navImg"
          />
          Site Settings
        </a>
      </Link>
    </div>
  );

  // test code
  const { loggedInUser, setLoggedInUser } = useContext(DreamFinderContext);
  const router = useRouter();

  const isActive = (route) => {
    if (route == router.pathname) {
      return "active";
    } else "";
  };
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  let navbarClasses = ["header"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  return (
    <header className={scrolled ? "scrolled" : "header"}>
      <Navbar expand="lg" className="p-0">
        <Link href="/">
          <a>
            <img
              src="/images/Output_Dream_Finder_logo.jpg"
              alt="me"
              className="logoImg"
            />
          </a>
        </Link>
        {router.pathname === "/login" ||
          (router.pathname === "/sign-up" ? (
            ""
          ) : (
            <>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={toggleDrawer("right", true)}
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto headerLink">
                  {navLink.map((item) => (
                    <div className="navDiv" key={item.id}>
                      {item.id == 5 && loggedInUser.email ? null : (
                        <Link href={item.to} key={item.id}>
                          <a className={`${isActive(item.to)}`}>{item.name}</a>
                        </Link>
                      )}
                    </div>
                  ))}

                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" drop="left">
                      <FontAwesomeIcon icon={faUserCircle} />
                      MyDreamFinder
                    </Dropdown.Toggle>

                    <Dropdown.Menu alignRight className="mb-5 myDreamFinder">
                      {!loggedInUser.email && (
                        <Link href="/sign-up">
                          <a className={`signUpBtn`}>
                            {" "}
                            Become a Member : SIGNUP
                          </a>
                        </Link>
                      )}
                      {loggedInUser.email && (
                        <Link href="/profile">
                          <a>
                            <FontAwesomeIcon icon={faUserCircle} /> My Profile
                          </a>
                        </Link>
                      )}
                      <Link href="/list-a-new-property">
                        <a>
                          <img
                            src="/icons/Profile_ListNewProperty.svg"
                            alt="icons"
                            className="img-fluid"
                          />
                          List a New Property
                        </a>
                      </Link>
                      <Link href="/">
                        <a>
                          <img
                            src="/icons/Profile_ManageRenters.svg"
                            alt="icons"
                            className="img-fluid"
                          />
                          Pay Rent
                        </a>
                      </Link>
                      <Link href="/myProperties">
                        <a>
                          <img
                            src="/icons/Profile_MyListedProperties.svg"
                            alt="icons"
                            className="img-fluid"
                          />
                          My Existing Properties
                        </a>
                      </Link>
                      <Link href="/save-property">
                        <a>
                          <img
                            src="/icons/Profile_FavoriteProperties.svg"
                            alt="icons"
                            className="img-fluid"
                          />
                          Saved Properties
                        </a>
                      </Link>
                      <Link href="/">
                        <a>
                          <img
                            src="/icons/Profile_SiteSettings.svg"
                            alt="icons"
                            className="img-fluid"
                          />
                          Site Settings
                        </a>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          ))}
      </Navbar>
      <div>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </div>
    </header>
  );
};

export default Header;
