import React from "react";
import { Dropdown, FormControl, InputGroup } from "react-bootstrap";
import fakeBlog from "../../fakeData/fakeBlog";
import SearchIcon from "@material-ui/icons/Search";
import fakePopularity from "../../fakeData/fakePopularity";
import Link from "next/link";
const blogPage = ({ blogs }) => {
  const allBlogs = blogs.data;
  // console.log(allBlogs);
  const data_for_show = allBlogs.slice(0, 3);
  const category = [
    {
      id: 1,
      title: "Residential",
    },
    {
      id: 2,
      title: "Commercial",
    },
  ];

  return (
    <section className="blog mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto my-3">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-5">
                <img
                  src="/images/Blogging_bro_1.png"
                  alt=""
                  className="areaGuideImg"
                />
              </div>
              <div className="col-md-6 AreaGuideTitle">
                <h1>Blogs</h1>
                <p>
                  Pariatur blanditiis dolorem fugit et illo omnis. Maxime animi
                  eum temporibus autem. Quia dolorum exercitationem qui cum
                  sequi laudantium nisi. Sit eum aliquid facere ut minus.
                </p>
                <button className="updateBtn">get regular updates</button>
              </div>
            </div>
          </div>
          {/* <div className="col-md-10 d-flex flex-wrap justify-content-around mx-auto areaGuideInputGroup mb-5">
            <div className="col-md-6 d-flex justify-content-center">
              <InputGroup className="">
                <FormControl
                  placeholder="Search for an area"
                  className="areaSearch"
                />
                <InputGroup.Append>
                  <InputGroup.Text className="searchIcon">
                    <SearchIcon />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <div className="col-md-3 d-flex justify-content-center districtDiv">
              <Dropdown className="districtDropDow d-flex align-items-center">
                <Dropdown.Toggle className="headerMain" drop="left">
                  All
                </Dropdown.Toggle>

                <Dropdown.Menu className="searchDropDownMenu">
                  <div>
                    <div>
                      <div className="proTypeOptionsDiv">
                        <div className="d-flex flex-column">
                          {category.map((item) => (
                            <Dropdown.Item key={item.id}>
                              {item.title}
                            </Dropdown.Item>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-md-3 d-flex justify-content-center">
              <Dropdown className="d-flex align-items-center">
                <Dropdown.Toggle className="headerMain" drop="left">
                  Popularity
                </Dropdown.Toggle>

                <Dropdown.Menu className="searchDropDownMenu">
                  <div>
                    <div>
                      <div className="proTypeOptionsDiv">
                        <div className="d-flex flex-column">
                          {fakePopularity.map((item) => (
                            <Dropdown.Item key={item.id}>
                              {item.name}
                            </Dropdown.Item>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div> */}
        </div>
        <div className="row">
          {data_for_show.map((item) => (
            <Link href={`/blog/${[item._id]}`} key={item._id}>
              <div
                key={item._id}
                className="col-md-10 mx-auto d-flex flex-wrap m-3 blogCard justify-content-between"
              >
                <div className="col-md-4 pl-0 d-flex">
                  <img
                    src="/images/Dhaka.png"
                    alt="blogImage"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-8 blogBody">
                  <div className="mb-3">
                    <h1>{item.title}</h1>
                    <p>
                      <span>{item.content.writer}</span>
                    </p>
                    <i>{new Date(item.createdAt).toDateString()}</i>
                  </div>
                  <div>
                    <h6>{item.content.about}</h6>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Link
                      href={`/blog/${[item._id]}`}
                      className="seeMoreBtn"
                      style={{ color: "#453ACE" }}
                    >
                      <a>SEE MORE...</a>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default blogPage;
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(`${process.env.API_BASE_URL}/blog/all`);
//   const posts = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = [
//     {
//       params: {
//         name: "1",
//       },
//     },
//   ];

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true };
// }602ca33140fc4f05382471a4

// This also gets called at build time
export async function getStaticProps({ params }) {
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
  console.log(blogs);
  // Pass blogs data to the page via props
  return { props: { blogs } };
}
