import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fakePropertyManagementData from "../../fakeData/fakePrpertyManagementData";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import DreamFinderContext from "../Context/Context";
import { useRouter } from "next/router";
import myActivities from "../../fakeData/myActivities";
import Custom404 from "../../pages/404";
import Link from "next/link";

const UserProfile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(DreamFinderContext);
  const { role } = loggedInUser;
  const user = role && role.includes("ADMIN");
  // console.log(loggedInUser);
  const router = useRouter();

  const logoutHandler = () => {
    setLoggedInUser({});
    localStorage.removeItem("DreamFinder_session");
    router.push("/login");
  };

  if (loggedInUser.email) {
    return (
      <section className="userProfile">
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between align-items-center flex-wrap py-5 userHeader">
              <h1>My DreamFinder Profile</h1>
              <button onClick={logoutHandler}>
                <FontAwesomeIcon icon={faPowerOff} />
                Logout
              </button>
            </div>
            <div className="col-md-12 userInfo">
              <div className="d-flex mb-4">
                <div>
                  <img
                    src="/images/user.png"
                    alt="userImg"
                    className="img-fluid"
                  />
                </div>
                <div className="ml-4">
                  <h3> {loggedInUser.name}</h3>
                  <p className="userRole">
                    {loggedInUser.role.map((item, index) => (
                      <span key={index}>{item}, </span>
                    ))}
                  </p>
                  {/* <button>Edit Profile</button> */}
                </div>
              </div>
              <div className="userInfoFooter">
                <p>
                  <strong className="mr-3">Email :</strong>
                  {loggedInUser.email}
                </p>
                <p>
                  <strong className="mr-3">Phone :</strong>
                  {loggedInUser.phone_number}
                </p>
              </div>
            </div>
            <div className="col-md-12 p-3 mb-3">
              <div className="px-4 propertyManagementTitle mb-3 position-relative">
                <h3>Property Management</h3>
              </div>
              <div className="col-md-12 d-flex flex-wrap px-0">
                {fakePropertyManagementData.map((item) => (
                  <Link href={`/${item.route}`} key={item.id}>
                    <div key={item.id} className="col-md-3 singlePropertyCard">
                      <div className="mb-3">
                        <img src={item.icon} alt="icons" />
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.details}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-md-12 p-3 mb-5">
              <div className="px-4 propertyManagementTitle mb-3 position-relative">
                <h3>Activities</h3>
              </div>
              <div className="col-md-12 d-flex flex-wrap px-0">
                {myActivities.map((item) => (
                  <Link href={`/${item.route}`} key={item.id}>
                    <div key={item.id} className="col-md-3 singlePropertyCard">
                      <div className="mb-3">
                        <img src={item.icon} alt="icons" />
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.details}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {(role && role.includes("ADMIN")) ||
            role.includes("DATA_COLLECTOR") ? (
              <div className="col-md-12 p-3 mb-5">
                <div className="px-4 propertyManagementTitle mb-3 position-relative">
                  <h3>Administrative Management</h3>
                </div>
                <div className="d-flex flex-wrap">
                  <Link href="/dashboard">
                    <div className="col-md-3 singlePropertyCard">
                      <div className="mb-3">
                        <img
                          src="/icons/Profile_ListNewProperty.svg"
                          alt="icons"
                        />
                      </div>
                      <h4>Admin Control Panel</h4>
                      <p>Manage Payments from renters of your property </p>
                    </div>
                  </Link>
                  <Link href="/admin">
                    <div className="col-md-3 singlePropertyCard">
                      <div className="mb-3">
                        <img
                          src="/icons/Profile_ListNewProperty.svg"
                          alt="icons"
                        />
                      </div>
                      <h4>Admin Panel 2.0</h4>
                      <p>Manage Payments from renters of your property </p>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    );
  } else {
    return <Custom404 />;
  }
};

export default UserProfile;
