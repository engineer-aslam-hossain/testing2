import { Card } from "react-bootstrap";
import Link from "next/link";
const SingleAreaDetails = ({ item }) => {
  const { img, address, _id } = item;
  // console.log(item);
  return (
    <Link href={`/areaGuide/${[_id]}`}>
      <Card className="propertyCard col-md-3 m-3 p-0">
        <Card.Body className="d-flex flex-column align-items-center p-0">
          <Card.Img
            variant="top"
            src="/images/LRM_EXPOR.png"
            alt="Area Image"
          />
          <p className="my-2">{address} </p>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default SingleAreaDetails;
