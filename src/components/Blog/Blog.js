import React from "react";
import { CardDeck } from "react-bootstrap";
import fakeBlog from "../../fakeData/fakeBlog";
import CommonHeader from "../CommonHeader/CommonHeader";
import SingleBlog from "../SingleBlog/SingleBlog";

const blog = () => {
  return (
    <section className="blog mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <CommonHeader title="From the Blog" />
            <div className="d-flex justify-content-center align-items-center">
              <h5>No Blogs Posted Yet</h5>
            </div>
            {/* <CardDeck>
              {fakeBlog.map((item) => (
                <SingleBlog item={item} key={item.id} />
              ))}
            </CardDeck> */}
            {/* <div className="d-flex justify-content-end my-3">
              <button
                style={{
                  border: "none",
                  background: "none",
                  fontWeight: "700",
                }}
              >
                SEE All
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default blog;
