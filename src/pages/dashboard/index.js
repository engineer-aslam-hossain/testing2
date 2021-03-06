import Link from "next/link";
import { useContext } from "react";
import DreamFinderContext from "../../components/Context/Context";
import adminPanelData from "../../fakeData/adminPanelData";
import Custom404 from "../../pages/404";

const Dashboard = () => {
  const { loggedInUser } = useContext(DreamFinderContext);

  // console.log(loggedInUser);

  if (
    loggedInUser.role &&
    (loggedInUser.role.includes("ADMIN") ||
      loggedInUser.role.includes("DATA_COLLECTOR"))
  ) {
    return (
      <section>
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-12 my-5">
              <h1 className="dashboardTitle">Admin Dashboard</h1>
            </div>
            {loggedInUser.role.includes("ADMIN") && (
              <div className="col-md-12 p-3 mb-5">
                <div className="px-4 propertyManagementTitle mb-3 position-relative">
                  <h3>Property Listing Requests</h3>
                </div>
                <div className="col-md-12 d-flex flex-wrap px-0">
                  {adminPanelData.map(
                    (item) =>
                      item.id <= 5 && (
                        <Link
                          href={{
                            pathname: `/dashboard/${item.route}`,
                            query: { show: item.query },
                          }}
                          key={item.id}
                        >
                          <div className="col-md-3 singlePropertyCard">
                            <div className="mb-3">
                              <img src={item.icon} alt="icons" />
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.details}</p>
                          </div>
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}

            {loggedInUser.role.includes("ADMIN") && (
              <div className="col-md-12 p-3 mb-5">
                <div className="px-4 propertyManagementTitle mb-3 position-relative">
                  <h3>Already Listed Properties</h3>
                </div>
                <div className="col-md-12 d-flex flex-wrap px-0">
                  {adminPanelData.map(
                    (item) =>
                      item.id > 5 &&
                      item.id <= 9 && (
                        <Link
                          href={{
                            pathname: `/dashboard/${item.route}`,
                            query: { show: item.query },
                          }}
                          key={item.id}
                        >
                          <div className="col-md-3 singlePropertyCard">
                            <div className="mb-3">
                              <img src={item.icon} alt="icons" />
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.details}</p>
                          </div>
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}

            {(loggedInUser.role.includes("ADMIN") ||
              loggedInUser.role.includes("DATA_COLLECTOR")) && (
              <div className="col-md-12 p-3 mb-5">
                <div className="px-4 propertyManagementTitle mb-3 position-relative">
                  <h3>Data Collectors</h3>
                </div>
                <div className="col-md-12 d-flex flex-wrap px-0">
                  {adminPanelData.map((item) =>
                    !loggedInUser.role.includes("ADMIN")
                      ? item.id == 20 && (
                          <Link
                            href={{
                              pathname: `/dashboard/${item.route}`,
                              query: { show: item.query },
                            }}
                            key={item.id}
                          >
                            <div className="col-md-3 singlePropertyCard">
                              <div className="mb-3">
                                <img src={item.icon} alt="icons" />
                              </div>
                              <h4>{item.title}</h4>
                              <p>{item.details}</p>
                            </div>
                          </Link>
                        )
                      : item.id > 19 &&
                        item.id <= 21 && (
                          <Link
                            href={{
                              pathname: `/dashboard/${item.route}`,
                              query: { show: item.query },
                            }}
                            key={item.id}
                          >
                            <div className="col-md-3 singlePropertyCard">
                              <div className="mb-3">
                                <img src={item.icon} alt="icons" />
                              </div>
                              <h4>{item.title}</h4>
                              <p>{item.details}</p>
                            </div>
                          </Link>
                        )
                  )}
                </div>
              </div>
            )}

            {loggedInUser.role.includes("ADMIN") && (
              <div className="col-md-12 p-3 mb-5">
                <div className="px-4 propertyManagementTitle mb-3 position-relative">
                  <h3>Publications & Misc</h3>
                </div>
                <div className="col-md-12 d-flex flex-wrap px-0">
                  {adminPanelData.map(
                    (item) =>
                      item.id > 9 &&
                      item.id <= 16 && (
                        <Link
                          href={{
                            pathname: `/dashboard/${item.route}`,
                            query: { show: item.query },
                          }}
                          key={item.id}
                        >
                          <div
                            key={item.id}
                            className="col-md-3 singlePropertyCard"
                          >
                            <div className="mb-3">
                              <img src={item.icon} alt="icons" />
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.details}</p>
                          </div>
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}
            {loggedInUser.role.includes("ADMIN") && (
              <div className="col-md-12 p-3 mb-5">
                <div className="px-4 propertyManagementTitle mb-3 position-relative">
                  <h3>Admin and Settings</h3>
                </div>
                <div className="col-md-12 d-flex flex-wrap px-0">
                  {adminPanelData.map(
                    (item) =>
                      item.id > 16 &&
                      item.id <= 19 && (
                        <Link href={`/dashboard/${item.route}`} key={item.id}>
                          <div
                            key={item.id}
                            className="col-md-3 singlePropertyCard"
                          >
                            <div className="mb-3">
                              <img src={item.icon} alt="icons" />
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.details}</p>
                          </div>
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } else {
    return <Custom404 />;
  }
};

export default Dashboard;
