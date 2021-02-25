import { TwitterTimelineEmbed } from "react-twitter-embed";
// import InstagramEmbed from "react-instagram-embed";
// import InstagramEmbed from "react-instagram-embed";

// import Instagram from "instagram-web-api";

const SocialMedia = ({ posts }) => {
  console.log(posts);
  return (
    <section className="socailMedia py-5">
      <div className="container">
        <div className="row">
          <div className="sectionTitle col-md-12">
            <h3>GET SOCIAL WITH US</h3>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <h5 className="text-white">
                  <img src="images/icon_fb.svg" alt="" /> Facebook
                </h5>
                <div
                  className="facebook mx-auto"
                  style={{
                    background: "white",
                    width: "340px",
                    height: "500px",
                  }}
                >
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIQIDreamFinder%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=687119211961427"
                    width="340px"
                    height="500px"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture;"
                  ></iframe>
                </div>
              </div>
              <div className="col-md-4">
                <h5 className="text-white">
                  <img src="images/icon_twitter.svg" alt="" /> Twitter
                </h5>
                <div
                  className="facebook mx-auto"
                  style={{
                    background: "white",
                    width: "340px",
                    height: "500px",
                  }}
                >
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="DreamFinder8"
                    options={{ height: 500 }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <h5 className="text-white">
                  <img src="images/icon_insta.svg" alt="" /> Instagram
                </h5>
                <div
                  className="facebook mx-auto"
                  style={{
                    background: "white",
                    width: "340px",
                    height: "500px",
                  }}
                >
                  {/* <InstagramEmbed
                    url="https://www.instagram.com/p/CIAh0-7lTYo/"
                    clientAccessToken="687119211961427|0f79ed7ae10aff844fe26e8bbc010f3c"
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName="div"
                    protocol=""
                    injectScript
                    // onLoading={() => {}}
                    // onSuccess={() => {}}
                    // onAfterRender={() => {}}
                    // onFailure={() => {}}
                  /> */}
                  {/* <frame
                    src="https://www.instagram.com/p/CIAh0-7lTYo/"
                    width="340px"
                    height="500px"
                  ></frame> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;

// export async function getStaticProps(context) {
//   const client = new Instagram({
//     username: "aslamhossain_dev",
//     password: "aslamhossain11590",
//   });
//   await client.login();

//   const response = await client.getPhotosByUsername({
//     username: "aslamhossain_dev",
//   });

//   return {
//     props: {
//       posts: response.user.edge_owner_to_timeline_media.edges,
//     }, // will be passed to the page component as props

//   };
// }
