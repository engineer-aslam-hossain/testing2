import { Card } from "react-bootstrap";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Swal from "sweetalert2";
import Link from "next/link";
import { useContext, useState } from "react";
import DreamFinderContext from "../Context/Context";
const SingleProperty = ({ item }) => {
  const { allProperty, saveProperties, loggedInUser } = useContext(
    DreamFinderContext
  );

  const {
    _id,
    name,
    address,
    bed,
    bath,
    purpose,
    property_type,
    category,
    price,
    image,
  } = item;

  const [saved, setSaved] = useState(false);
  // console.log(item);

  const findSaved =
    loggedInUser && loggedInUser.favourite_properties
      ? loggedInUser.favourite_properties.includes(_id)
      : "";

  const savePropertyHandler = async (id) => {
    // console.log(id);
    try {
      const getToken = JSON.parse(localStorage.getItem("DreamFinder_session"));
      if (getToken) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/add_to_favourite`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              DreamFinder: getToken,
            },
            body: JSON.stringify({ property_id: id }),
          }
        );
        const data = await res.json();
        // console.log(data);
        if (data.success === "yes") {
          Swal.fire({
            icon: "success",
            title: "Property Saved",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-md-4 mb-3 px-1">
      <Card className="propertyCard">
        <Link href={`/findProperties/${_id}`}>
          <Card.Body>
            <Card.Img variant="top" src={image} alt="PropertyImg" />
            <h5 className="propertyName">{name} </h5>
            <h6 className="propertyAdd">{address}</h6>
            <Card.Text className="propertyText">{`${bed} beds | ${bath} baths | ${purpose} |  ${category} | ${property_type} |`}</Card.Text>
          </Card.Body>
        </Link>

        <div className="cardFooter d-flex justify-content-between px-4 pb-3">
          <button
            onClick={() => savePropertyHandler(_id)}
            type="button"
            className="saveBtn"
          >
            {findSaved ? (
              <FavoriteIcon style={{ fontSize: "1.8rem" }} className="saved" />
            ) : (
              <FavoriteBorderIcon style={{ fontSize: "1.8rem" }} />
            )}
          </button>
          <h4>{price} BDT</h4>
        </div>
      </Card>
    </div>
  );
};

export default SingleProperty;
