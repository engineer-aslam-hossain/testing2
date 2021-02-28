import CommonHeader from "../CommonHeader/CommonHeader";
const Partner = () => {
  return (
    <section className="partner py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <CommonHeader title="Our Partner" />
            <div className="d-flex flex-wrap px-4">
              <div className="col-md-3">
                <img
                  src="/images/iqi_global.png"
                  alt=""
                  className="partnerImg img-fluid"
                />
              </div>
              <div className="col-md-9 d-flex flex-column ">
                <h1 className="iqiGlobal">
                  IQI Global : Asia’s Global Real Estate
                </h1>
                <h1 className="partnerName">A Member of Juwaii IQI</h1>
                <p> Asia's largest real estate firm in the world. </p>
                <p>
                  This is a company that is proud of its ability to combine
                  global insights and industry practices with local knowledge,
                  creating a unique sales technique which is both friendly and
                  professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
