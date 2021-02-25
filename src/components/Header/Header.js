import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import navLink from "../../fakeData/navLink";
import Link from "next/link";
import Image from "next/image";
import DreamFinderContext from "../Context/Context";

const Header = () => {
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
              src="/images/DreamFinderLogo.png"
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
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
                      <Link href="/">
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
    </header>
  );
};

export default Header;
