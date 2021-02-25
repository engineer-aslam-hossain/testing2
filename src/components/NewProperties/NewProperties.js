import { useContext } from "react";
import { CardDeck } from "react-bootstrap";
import fakeCardInfo from "../../fakeData/fakeCardInfo";
import CommonHeader from "../CommonHeader/CommonHeader";
import DreamFinderContext from "../Context/Context";
import SingleProperty from "../SingleProperty/SingleProperty";

const NewProperties = ({ data }) => {
  // console.log(data);
  const { allProperty, saveProperties } = useContext(DreamFinderContext);

  const limitedProperty = allProperty.slice(0, 3);
  // console.log(limitedProperty);
  return (
    <section className="newProperties">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <CommonHeader title="New Properties" />
            <CardDeck>
              {limitedProperty &&
                limitedProperty.map((item) => (
                  <SingleProperty item={item} key={item._id} />
                ))}
            </CardDeck>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProperties;

// This also gets called at build time
