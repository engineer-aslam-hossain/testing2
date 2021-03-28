import { Dropdown, FormControl, InputGroup, Pagination } from "react-bootstrap";
import fakeBlog from "../../fakeData/fakeBlog";
import SearchIcon from "@material-ui/icons/Search";
import fakePopularity from "../../fakeData/fakePopularity";
import Link from "next/link";
import { useEffect, useState } from "react";
const blogPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const [allBlogs, setAllBlogs] = useState([]);

  // console.log(allBlogs);

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

  const submitHandler = (e) => {
    e.preventDefault();
    SetSearchData({
      ...searchData,
      area_sqft_min: Math.floor(minArea),
      area_sqft_max: Math.floor(maxArea),
    });
  };

  const searchLoadData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/all?page=${pageNo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setAllBlogs(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchLoadData();
  }, [pageNo]);

  // console.log(allBlogs);

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
          {allBlogs.map((item) => (
            <Link href={`/blog/${[item._id]}`} key={item._id}>
              <div
                key={item._id}
                className="col-md-10 mx-auto d-flex flex-wrap p-0 blogCard justify-content-between"
              >
                <div className="col-md-4 py-3  d-flex">
                  <img
                    src="/images/Ahsan_Manzil.png"
                    alt="blogImage"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-8 blogBody my-3">
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
          <div className="col-md-12 d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev
                onClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
              />
              <Pagination.Item active>{pageNo}</Pagination.Item>
              <Pagination.Next onClick={() => setPageNo(pageNo + 1)} />
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
};

export default blogPage;

// This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`${process.env.API_BASE_URL}/blog/all`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });
//   const blogs = await res.json();
//   console.log(blogs);
//   // Pass blogs data to the page via props
//   return { props: { blogs } };
// }
