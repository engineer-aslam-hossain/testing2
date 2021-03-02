import { useRouter } from "next/router";
import fakeBlog from "../../fakeData/fakeBlog";
import Custom404 from "../404";
import RedditIcon from "@material-ui/icons/Reddit";
import Link from "next/link";
import { Form } from "react-bootstrap";
const SingleBlogPage = ({ data }) => {
  // console.log(data.data);

  const { img, title, content } = data.data;
  const {
    writer,
    about,
    date,
    sub_title1,
    sub_title2,
    sub_title3,
    sub_details1,
    sub_details2,
    sub_details3,
    sub_details4,
    sub_details5,
  } = content;
  const submitHandler = () => {};

  if (data) {
    return (
      <section className="SingleAreaInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between singeAreaHeader align-items-center my-4">
              <h3>Blog Post</h3>
              <Link href="/blog">
                <a className="backToProfile">Back to Blogs Home</a>
              </Link>
            </div>
            <div className="col-md-12 singleAreaInfoDetails">
              <img src="/images/Curzon_Hall.png" alt="blogImage" />
            </div>
            <div className="col-md-11 mx-auto singleBlogDetails">
              <div className=" my-5">
                <h1>{title}</h1>
                <p className="blogWriter">{writer}</p>
                <i>{date} </i>
              </div>
              <div className="my-5">
                <p className="blogsDetails">{about}</p>
              </div>
              <div className="my-5">
                <h3>{sub_title1}</h3>
                <p className="blogsDetails">{sub_details1}</p>
              </div>
              <div className="my-5">
                <div className="d-flex flex-column">
                  <img
                    src="/images/Ahsan_Manzil.png"
                    alt="midImg"
                    className="img-fluid"
                  />
                  <h3>{sub_title2}</h3>
                  <p className="blogsDetails mb-5">{sub_details2}</p>
                  <p className="blogsDetails">{sub_details3}</p>
                </div>
              </div>
              <div className="my-5">
                <div className="d-flex flex-column">
                  <img
                    src="/images/Victorian.png"
                    alt="midImg"
                    className="img-fluid"
                  />
                  <h3>{sub_title3}</h3>
                  <p className="blogsDetails mb-5">{sub_details4}</p>
                  <p className="blogsDetails">{sub_details5}</p>
                </div>
              </div>
            </div>
            <div className="col-md-11 mx-auto">
              <div className="position-relative mb-3">
                <h4 className="share">Share on</h4>
              </div>
              <div className="d-flex justify-content-between shareBtnDiv flex-wrap mb-5">
                <button>
                  <img
                    src="/images/facebook.png"
                    alt="facebook"
                    className="img-fluid"
                  />
                  Facebook
                </button>
                <button>
                  <img
                    src="/images/reddit.png"
                    alt="reddit"
                    className="img-fluid"
                  />
                  Reddit
                </button>
                <button>
                  <img
                    src="/images/twitter.png"
                    alt="twitter"
                    className="img-fluid"
                  />
                  twitter
                </button>
                <button>
                  <img
                    src="/images/linkedin.png"
                    alt="linkedin"
                    className="img-fluid"
                  />
                  linkedin
                </button>
                <button>
                  <img
                    src="/images/mail.png"
                    alt="mail"
                    className="img-fluid"
                  />
                  email
                </button>
                <button>
                  <img
                    src="/images/copy.png"
                    alt="copy"
                    className="img-fluid"
                  />
                  copy link
                </button>
              </div>
              <div className="position-relative mb-3">
                <h4 className="share">Comments</h4>
              </div>
              <div>
                <div className="my-5">
                  <Form noValidate onSubmit={submitHandler}>
                    <div className="d-flex justify-content-between col-md-12 flex-wrap">
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Name"
                            name="name"
                            onChange={() => "hal"}
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            onChange={() => "hal"}
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="col-md-12 px-3 mt-4">
                      <Form.Group
                        controlId="exampleForm.ControlTextarea1"
                        className="px-3"
                      >
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </div>
                    <div className="col-md-12 px-3">
                      <div className="px-3">
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check
                            type="checkbox"
                            label="Save email and name for this site"
                          />
                        </Form.Group>
                        <button className="commentBtn" type="submit">
                          post comment
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="col-md-12 commetsDetails">
              {/* <div className="col-md-11 mx-auto mb-5">
                <h2>Mr. Jhon Watts</h2>
                <p>12.12.2021</p>
                <h3>
                  Very informative post, just subscribed to the newsletter.
                  Looking forward to more.
                </h3>
              </div>
              <div className="col-md-11 mx-auto my-5">
                <h2>Mr. Jhon Watts</h2>
                <p>12.12.2021</p>
                <h3>
                  Very informative post, just subscribed to the newsletter.
                  Looking forward to more.
                </h3>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Custom404 />;
  }
};

export default SingleBlogPage;

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(`${process.env.API_BASE_URL}/blog/?_id=${params.id}`);
  const data = await res.json();
  // console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}
