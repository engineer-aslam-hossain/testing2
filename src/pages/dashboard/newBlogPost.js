import { useState } from "react";
import { Form } from "react-bootstrap";
import PublishIcon from "@material-ui/icons/Publish";
import Swal from "sweetalert2";

const NewBlogPost = () => {
  const [visibilities, setVisibilities] = useState(false);

  const [blogDetails, setBlogDetails] = useState({
    // is_disable: false,
  });

  const visibilityHandler = (value) => {
    // console.log(value === "off");
    value === "off" ? setVisibilities(true) : setVisibilities(false);
    // value === "off"
    //   ? setBlogDetails({
    //       ...blogDetails,
    //       is_disable: true,
    //     })
    //   : setBlogDetails({
    //       ...blogDetails,
    //       is_disable: false,
    //     });
  };

  const blogSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("DreamFinder_session"));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            DreamFinder: token,
          },
          body: JSON.stringify(blogDetails),
        }
      );
      const data = await res.json();
      // console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Blog Posted Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setBlogDetails({});
      }
      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: data.message[0],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(blogDetails);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-4 d-flex justify-content-between findPropertyHeader align-items-center flex-wrap">
            <div>
              <h1>Post New Blog</h1>
            </div>
            <div className="d-flex align-items-center">
              <div className="mr-3">
                <h6>Public Visibility :</h6>
              </div>
              <div>
                <button
                  className={`onOff ${visibilities === true ? "active" : ""}`}
                  onClick={() => visibilityHandler("off")}
                >
                  off
                </button>
                <button
                  className={`onOff ${visibilities === false ? "active" : ""}`}
                  onClick={() => visibilityHandler("on")}
                >
                  on
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-5 blogPostBody">
            <Form noValidate onSubmit={blogSubmitHandler}>
              <Form.Group>
                <h5>Blog Title</h5>
                <Form.Control
                  type="text"
                  placeholder="Blog Title"
                  onChange={(e) =>
                    setBlogDetails({
                      ...blogDetails,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <h5>Cover Photo + Thumbnail</h5>
                <input type="file" id="file" className="file" />
                <label htmlFor="file" className="fileLabel">
                  <p className="mb-0">Select file</p> <PublishIcon />
                </label>
              </Form.Group>
              <Form.Group>
                <h5>Content</h5>
                <Form.Control
                  as="textarea"
                  rows={10}
                  onChange={(e) =>
                    setBlogDetails({
                      ...blogDetails,
                      content: {
                        ...blogDetails.content_details,
                        content_details: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
              <div className="my-5">
                <div>
                  <p>
                    Not Done Writing Yet? Post the blog keeping the{" "}
                    <strong>VISIBILITY: OFF.</strong> You can later come back
                    right where you left off!
                  </p>
                </div>
                <div className="col-md-4 d-flex  justify-content-between my-5 px-0">
                  <button className="postPropertyBtn" type="submit">
                    POST THIS BLOG
                  </button>
                  <button className="showRequest" type="button">
                    CANCEL
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewBlogPost;
