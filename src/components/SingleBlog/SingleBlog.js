import { Card } from "react-bootstrap";
const SingleBlog = ({ item }) => {
  const { img, title, write_name, company_name, date, details } = item;
  return (
    <div className="col-md-4 mb-3">
      <Card className="blogCard">
        <Card.Body>
          <Card.Img variant="top" src={img} />
          <h4 className="blogTitle">{title}</h4>
          <Card.Title className="writerName">
            {write_name} - {company_name}
          </Card.Title>
          <Card.Text className="writerName text-secondary">{date}</Card.Text>
          <Card.Text className="blogDetails">{details}</Card.Text>
          <div className="d-flex justify-content-end">
            <button className="seeMoreBtn" style={{ color: "#453ACE" }}>
              SEE MORE...
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleBlog;
