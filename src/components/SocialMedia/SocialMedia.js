import { TwitterTimelineEmbed } from "react-twitter-embed";
// import InstagramEmbed from "react-instagram-embed";
import InstagramEmbed from "react-instagram-embed";
import Link from "next/link";
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
                <Link href="https://www.facebook.com/IQIDreamFinder/">
                  <h5 className="text-white">
                    <img src="/images/icon_fb.svg" alt="" /> Facebook
                  </h5>
                </Link>
                <div
                  className="socialMedia mx-auto"
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
                <Link href="https://www.linkedin.com/in/iqidreamfinder-limited-06a28a207/">
                  <h5 className="text-white py-1">
                    <img src="/images/linkedin.png" alt="" /> LinkedIn
                  </h5>
                </Link>
                <div
                  className="socialMedia mx-auto"
                  style={{
                    background: "white",
                    width: "340px",
                    height: "500px",
                  }}
                >
                  <iframe
                    src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6744826546416156672"
                    height="500"
                    width="360"
                    frameBorder="0"
                    allowFullScreen=""
                    title="Embedded post"
                  ></iframe>
                </div>
              </div>
              <div className="col-md-4">
                <Link href="https://www.instagram.com/iqidreamfinder.bd/">
                  <h5 className="text-white">
                    <img src="/images/icon_insta.svg" alt="" /> Instagram
                  </h5>
                </Link>
                <div
                  className="socialMedia mx-auto"
                  style={{
                    background: "white",
                    width: "340px",
                    height: "500px",
                    overflowY: "scroll",
                  }}
                >
                  <InstagramEmbed
                    url="https://www.instagram.com/p/CLUroTQFY50/"
                    clientAccessToken="687119211961427|0f79ed7ae10aff844fe26e8bbc010f3c"
                    maxWidth={340}
                    hideCaption={false}
                    containerTagName="div"
                    protocol=""
                    injectScript
                    // onLoading={() => {}}
                    // onSuccess={() => {}}
                    // onAfterRender={() => {}}
                    // onFailure={() => {}}
                  />
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

export async function getStaticProps(context) {
  // const client = new Instagram({
  //   username: "ridoyahmed11590@gmail.com",
  //   password: "aslamhossain11590",
  // });
  // await client.login();
  // const response = await client.getPhotosByUsername({
  //   username: "ridoyahmed11590@gmail.com",
  // });
  // console.log(response);
  // return {
  //   props: {
  //     posts: response.user.edge_owner_to_timeline_media.edges,
  //   }, // will be passed to the page component as props
  // };
  // async function getPost() {
  //   var response = await fetch(
  //     "https://graph.facebook.com/v8.0/instagram_oembed?url=" +
  //       "https://www.instagram.com/p/CIAh0-7lTYo/" +
  //       "&omitscript=true&access_token=" +
  //       "687119211961427" +
  //       "|" +
  //       "0f79ed7ae10aff844fe26e8bbc010f3c"
  //   );
  //   var data = await response.json();
  // }
}
