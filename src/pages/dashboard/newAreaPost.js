import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import PublishIcon from "@material-ui/icons/Publish";
import Swal from "sweetalert2";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
// import { EditorState } from "draft-js";
import dynamic from "next/dynamic";

// const Editor = dynamic(
//   () => {
//     return import("react-draft-wysiwyg").then((mod) => mod.Editor);
//   },
//   { loading: () => null, ssr: false }
// );

const NewAreaPost = () => {
  const [visibilities, setVisibilities] = useState(false);
  const [zillas, setZillas] = useState([]);
  const [areaDetails, setAreaDetails] = useState({
    // is_disable: false,
  });

  const visibilityHandler = (value) => {
    // console.log(value === "off");
    value === "off" ? setVisibilities(true) : setVisibilities(false);
    // value === "off"
    //   ? setAreaDetails({
    //       ...areaDetails,
    //       is_disable: true,
    //     })
    //   : setAreaDetails({
    //       ...areaDetails,
    //       is_disable: false,
    //     });
  };

  const blogSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("DreamFinder_session"));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/area_guide/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            DreamFinder: token,
          },
          body: JSON.stringify(areaDetails),
        }
      );
      const data = await res.json();
      //   console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Area Posted Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setAreaDetails({});
      }
      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: data.message[0],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   try {
  //     fetch(
  //       "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => setZillas(data[2].data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  //   console.log(areaDetails);

  const instanceRef = React.useRef();

  let editorInstance;
  async function handleSave() {
    const savedData = await editorInstance.save();

    console.log("savedData", savedData);
  }

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  // const [editState, setEditState] = useState({
  //   editorChangeState: EditorState.createEmpty(),
  // });
  // const onEditorStateChange = (editorState) => {
  //   setEditState(editorState);
  // };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-4 d-flex justify-content-between findPropertyHeader align-items-center flex-wrap">
            <div>
              <h1>Post New Area Guide</h1>
            </div>
            <div className="d-flex align-items-center">
              <div className="mr-3">
                <h6>Public Visibility :</h6>
              </div>
              <div>
                <button
                  className={`onOff ${visibilities === true ? "active" : ""}`}
                  onClick={() => visibilityHandler("off")}
                >
                  off
                </button>
                <button
                  className={`onOff ${visibilities === false ? "active" : ""}`}
                  onClick={() => visibilityHandler("on")}
                >
                  on
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-5">
            <Form noValidate onSubmit={blogSubmitHandler}>
              <Form.Group>
                <h5>Area Name</h5>
                <Form.Control
                  type="text"
                  placeholder="Area Name"
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <div className="my-3">
                <h5 className=""> District </h5>
                <Dropdown className="d-flex align-items-center">
                  <Dropdown.Toggle className="headerMain" drop="left">
                    {(areaDetails.district && areaDetails.district) ||
                      "Select Location"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="searchDropDownMenu">
                    <div>
                      <div>
                        <div className="proTypeOptionsDiv">
                          <div className="d-flex flex-column">
                            {zillas.map((item) => (
                              <button
                                type="button"
                                className={`propertyTypeBtn ${
                                  areaDetails.district === item.name
                                    ? "active"
                                    : ""
                                }`}
                                key={item.id}
                                onClick={() =>
                                  setAreaDetails({
                                    ...areaDetails,
                                    district: item.name,
                                  })
                                }
                              >
                                {item.name}
                                {areaDetails.district === item.name && (
                                  <ArrowRightIcon />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <Form.Group>
                <h5>Cover Photo + Thumbnail</h5>
                <input type="file" id="file" className="file" />
                <label htmlFor="file" className="fileLabel">
                  <p className="mb-0">Select file</p> <PublishIcon />
                </label>
              </Form.Group>
              <Form.Group>
                <h5>Content</h5>
                <Form.Control
                  as="textarea"
                  rows={10}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      content: {
                        ...areaDetails.content_details,
                        content_details: e.target.value,
                      },
                    })
                  }
                ></Form.Control>
              </Form.Group>
              <div className="d-flex">
                {/* <Editor
                  // editorState={editState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                      uploadCallback: uploadImageCallBack,
                      alt: { present: true, mandatory: true },
                    },
                  }}
                /> */}
              </div>
              <div className="my-5">
                <div>
                  <p>
                    Not Done Writing Yet? Post the blog keeping the{" "}
                    <strong>VISIBILITY: OFF.</strong> You can later come back
                    right where you left off!
                  </p>
                </div>
                <div className="col-md-4 d-flex  justify-content-between my-5 px-0">
                  <button className="postPropertyBtn" type="submit">
                    POST AREA GUIDE
                  </button>
                  <button className="showRequest" type="button">
                    CANCEL
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewAreaPost;
