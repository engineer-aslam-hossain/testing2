import { Dropdown, Table } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
const AllBlogPosts = ({ blogs }) => {
  const { data } = blogs;
  // console.log(data);
  const [showVisibility, setShowVisibility] = useState("Show All");

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 findPropertyHeader ">
            <div>
              <h1>Blog Posts</h1>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-5 mt-3">
              <div className="d-flex align-items-center flex-wrap my-3">
                <h5 className="mb-0 mr-3"> SHOW VISIBILITY </h5>
                <Dropdown className="d-flex align-items-center">
                  <Dropdown.Toggle className="headerMain" drop="left">
                    {showVisibility ? showVisibility : "Show All"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="searchDropDownMenu">
                    <div>
                      <div>
                        <div className="proTypeOptionsDiv">
                          <div className="d-flex flex-column">
                            <Dropdown.Item
                            //   onClick={() =>
                            //     setAddListDetails({
                            //       ...addListDetails,
                            //       purpose: "Sell",
                            //     })
                            //   }
                            >
                              Show All
                            </Dropdown.Item>
                            <Dropdown.Item
                            //   onClick={() =>
                            //     setAddListDetails({
                            //       ...addListDetails,
                            //       purpose: "Rent",
                            //     })
                            //   }
                            >
                              Show "ON" Only
                            </Dropdown.Item>
                            <Dropdown.Item
                            //   onClick={() =>
                            //     setAddListDetails({
                            //       ...addListDetails,
                            //       purpose: "Auction",
                            //     })
                            //   }
                            >
                              Show "OFF" Only
                            </Dropdown.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Link href="/dashboard/newBlogPost">
                  <a className="postPropertyBtn">+ POST NEW BLOG</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-12 allPropertiesListTable">
            <Table hover>
              <thead>
                <tr>
                  <th>Created </th>
                  <th>Last Updated</th>
                  <th>Visibility</th>
                  <th>Blog Title</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className="">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td>{new Date(item.updatedAt).toLocaleString()}</td>
                    <td>{item.is_disable ? "Off" : "On"}</td>
                    <td>{item.title}</td>
                    <td>
                      <div className="d-flex justify-content-around align-items-center">
                        <button className="showRequest">EDIT BLOG</button>
                        <button className="showRequest">SEE PUBLISHED</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllBlogPosts;

export async function getStaticProps() {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${process.env.API_BASE_URL}/blog/all`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const blogs = await res.json();
  // console.log(blogs);
  // Pass blogs data to the page via props
  return { props: { blogs } };
}
