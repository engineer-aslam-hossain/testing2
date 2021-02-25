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
                  src="/images/Juwai.png"
                  alt=""
                  className="partnerImg img-fluid"
                />
              </div>
              <div className="col-md-9 d-flex flex-column ">
                <h1 className="partnerName">Juwai IQI Limited</h1>
                <p>
                  Juwai IQI is the Asian Real Estate Technology Group that
                  empowers residents of Asia to become residents of the world.
                </p>
                <p>
                  The company offers real estate marketers an end-to-end
                  marketing and sales solution that integrates is super-app, its
                  IQI Global network of more than 15,000 real estate agents, and
                  its market-leading property marketplaces. Juwai IQI has sold
                  and rented over 17,000 properties worth US$1 billion in 2020,
                  engages 5.5 million monthly active users, and advertises US$4
                  trillion of property from 111 countries every year.
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
