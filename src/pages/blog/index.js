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
      <section className="blogHeaderMain">
        <div className="container h-100">
          <div className="row  areaGuideHeaderMain h-100  align-items-center">
            <div className="col-md-12 AreaGuideTitle d-flex flex-column align-items-center justify-content-between">
              <div className="col-md-6 d-flex flex-column align-items-center ">
                <h1>Blogs</h1>
                <p className="blogP">
                  A neighbourhood guide provides foundational information you
                  need to start your home search and dive into some of the
                  details that matter the most. Ready to get started?
                </p>
                {/* <button className="updateBtn">get regular updates</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row mt-5">
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
