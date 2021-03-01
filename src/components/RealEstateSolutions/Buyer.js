import fakeBuyerData from "../../fakeData/fakeBuyerData";

const Buyer = () => {
  return (
    <section>
      <ReactFullpage
        navigation
        // onLeave={this.onLeave.bind(this)}
        // sectionsColor={this.state.sectionsColor}
        render={(comp) =>
          console.log("render prop change") || (
            <ReactFullpage.Wrapper>
              {fakeBuyerData.map((item) => (
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
                  <div>
                    <img src={item.img} alt="" />
                  </div>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )
        }
      />
    </section>
  );
};

export default Buyer;
