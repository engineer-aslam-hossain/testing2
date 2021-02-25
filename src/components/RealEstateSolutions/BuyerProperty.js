import fakeBuyerData from "../../fakeData/fakeBuyerData";

const BuyerProperty = () => {
  return (
    <section className="buyerProperty">
      {fakeBuyerData.map((item) =>
        item.id === 0 ? (
          <div
            key={item.id}
            className="section fullpageDiv d-flex justify-content-center align-items-center position-relative"
          >
            <div className="overlayDiv"></div>
            <div className="fullpageDetails d-flex flex-column justify-content-center align-items-center">
              <h1>{item.title}</h1>
              <h3>{item.details}</h3>
            </div>
            <div className="propertyImgDiv">
              <img src={item.img} alt="" />
            </div>
          </div>
        ) : (
          <div
            key={item.id}
            className="section fullpageDiv d-flex justify-content-center align-items-center position-relative"
          >
            <div className="overlayDiv"></div>
            <div className="fullpageDetails d-flex  justify-content-center align-items-center">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <h1>{item.id}.</h1>
              </div>
              <div className="col-md-8">
                <h2>{item.title}</h2>
                <p>{item.details} </p>
              </div>
            </div>
            <div className="propertyImgDiv">
              <img src={item.img} alt="" />
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default BuyerProperty;
