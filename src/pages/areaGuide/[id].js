import Custom404 from "../404";
import Link from "next/link";
import dynamic from "next/dynamic";

// const MyEditor = dynamic(
//   () => import("../../components/EditorJsTools/EditorJsTools"),
//   { ssr: false }
// );
const SingleAreaRoute = ({ data }) => {
  const { address, content, district, img } = data.data;
  const { about, comunity, properties, title, contentImg } = content;

  if (data) {
    return (
      <section className="SingleAreaInfo">
        <div className="container">
          <div className="row">
            {/* <MyEditor
              data={{
                time: 1556098174501,
                blocks: [
                  {
                    type: "header",
                    data: {
                      text: "Editor.js",
                      level: 2,
                    },
                  },
                  {
                    type: "paragraph",
                    data: {
                      text:
                        "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
                    },
                  },
                  {
                    type: "header",
                    data: {
                      text: "Key features",
                      level: 3,
                    },
                  },
                  {
                    type: "list",
                    data: {
                      style: "unordered",
                      items: [
                        "It is a block-styled editor",
                        "It returns clean data output in JSON",
                        "Designed to be extendable and pluggable with a simple API",
                      ],
                    },
                  },
                  {
                    type: "header",
                    data: {
                      text: "What does it mean «block-styled editor»",
                      level: 3,
                    },
                  },
                  {
                    type: "paragraph",
                    data: {
                      text:
                        'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
                    },
                  },
                  {
                    type: "paragraph",
                    data: {
                      text:
                        'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
                    },
                  },
                  {
                    type: "header",
                    data: {
                      text: "What does it mean clean data output",
                      level: 3,
                    },
                  },
                  {
                    type: "paragraph",
                    data: {
                      text:
                        "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
                    },
                  },
                  {
                    type: "paragraph",
                    data: {
                      text:
                        'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
                    },
                  },
                  {
                    type: "paragraph",
                    data: {
                      text:
                        "Clean data is useful to sanitize, validate and process on the backend.",
                    },
                  },
                  {
                    type: "delimiter",
                    data: {},
                  },
                  {
                    type: "paragraph",
                    data: {
                      text:
                        "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
                    },
                  },
                  {
                    type: "image",
                    data: {
                      file: {
                        url:
                          "https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg",
                      },
                      caption: "",
                      withBorder: true,
                      stretched: false,
                      withBackground: false,
                    },
                  },
                ],
                version: "2.19.1",
              }}
            /> */}
            <div className="col-md-12 d-flex justify-content-between align-items-center singeAreaHeader my-4">
              <h3>Area Guide</h3>
              <Link href="/areaGuide">
                <a className="backToProfile">Back to Area Guides Home</a>
              </Link>
            </div>
            <div className="col-md-12 singleAreaInfoDetails">
              <img src="/images/LRM_EXPOR.png" alt="singleAreaImg" />
              <h1>{address}</h1>
            </div>
            <div className="col-md-12 singleAreaInfoDetails">
              <h3>ABOUT {district}</h3>
              <p>{about}</p>
              <img src="/images/maxresdefault.png" alt="image" />
              <h3>Community</h3>
              <p>{comunity}</p>
              <img src="/images/building.png" alt="image" />
              <h3>Properties in {district}</h3>
              <p>{properties}</p>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Custom404 />;
  }
};

export default SingleAreaRoute;

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const posts = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = [
//     {
//       params: {
//         name: "1",
//       },
//     },
//   ];

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true };
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${params.name}`
//   );
//   const post = await res.json();

//   // Pass post data to the page via props
//   return { props: { post } };
// }

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.API_BASE_URL}/area_guide/?_id=${params.id}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
