import { Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import fakeRoleData from "../fakeData/fakeRoleData";
import Swal from "sweetalert2";

const SignUp = () => {
  const [CreateUser, SetCreateUser] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    role: [],
  });

  console.log(CreateUser);
  const inputHandler = (e) => {
    e.preventDefault();
    let isInputValid;

    if (e.target.name === "name") {
      const nameValidation = /^([a-zA-Z]{3,30}\s*)+/;
      isInputValid = nameValidation.test(e.target.value);

      !isInputValid &&
        document.querySelector(".name").style.setProperty("display", "block");
    }
    if (e.target.name === "phone_number") {
      isInputValid = e.target.value.length > 10 ? e.target.value : "";
      !isInputValid &&
        document
          .querySelector(".phone_number")
          .style.setProperty("display", "block");
    }
    if (e.target.name === "email") {
      const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isInputValid = validation.test(e.target.value);
      !isInputValid &&
        document.querySelector(".email").style.setProperty("display", "block");
    }
    if (e.target.name === "password") {
      const passValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      isInputValid = passValidation.test(e.target.value);
      !isInputValid &&
        document
          .querySelector(".password")
          .style.setProperty("display", "block");
    }
    if (isInputValid) {
      const newUser = { ...CreateUser };
      newUser[e.target.name] = e.target.value;
      SetCreateUser(newUser);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CreateUser),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === "yes") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign Up Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sign-up py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row justify-content-center">
              {/* <div className="col-md-6 signUpLeft my-auto">
                <div
                  style={{
                    paddingRight: "3rem",
                    marginLeft: "auto",
                  }}
                >
                  <h1 className="signUpTitle">Sign Up</h1>
                  <p>
                    Pariatur blanditiis dolorem fugit et illo omnis. Maxime
                    animi eum temporibus autem. Quia dolorum exercitationem qui
                    cum sequi laudantium nisi. Sit eum aliquid facere ut minus.
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <img src="/images/House searching.png" alt="#" />
                  </div>
                </div>
              </div> */}
              <div className="col-md-5">
                <Card
                  style={{ padding: "2rem 2rem", border: "none" }}
                  className=""
                >
                  <Form noValidate onSubmit={submitHandler}>
                    <h3 className="formTitle">Signup</h3>
                    <Dropdown className="pb-3">
                      <Dropdown.Toggle id="SignUpFormDropDown" drop="left">
                        {CreateUser.role.length > 0
                          ? CreateUser.role.slice(0, 3).join(",")
                          : "Select Role"}
                        {CreateUser.role.length > 4
                          ? ` + ${CreateUser.role.length - 3}`
                          : ""}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="SignUpFormDropDownMenu"
                        style={{ padding: "0.5rem 2rem" }}
                      >
                        <div>
                          <div>
                            <div className="proTypeOptionsDiv">
                              <div className="d-flex flex-column">
                                <fieldset>
                                  <p>You're sign-up as ? </p>
                                  <Form.Group as={Row}>
                                    <Col>
                                      {fakeRoleData.map((item) => (
                                        <Form.Check
                                          type="radio"
                                          label={item.role}
                                          name="role"
                                          required
                                          id={item.id}
                                          key={item.id}
                                          onChange={() =>
                                            SetCreateUser({
                                              ...CreateUser,
                                              role: [
                                                ...CreateUser.role,
                                                item.role,
                                              ],
                                            })
                                          }
                                        />
                                      ))}
                                    </Col>
                                  </Form.Group>
                                </fieldset>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dropdown.Menu>
                      <Form.Control.Feedback type="invalid" className="role">
                        {CreateUser.role.length < 1
                          ? "atleast 1 role must be selected"
                          : ""}
                      </Form.Control.Feedback>
                    </Dropdown>

                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Full Name"
                        name="name"
                        onChange={inputHandler}
                        required
                      />
                      <Form.Control.Feedback type="invalid" className="name">
                        {!CreateUser.name
                          ? "name must be start with atleast 3 character"
                          : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        name="email"
                        onChange={inputHandler}
                        required
                      />
                      <Form.Control.Feedback type="invalid" className="email">
                        {!CreateUser.email
                          ? "please provide an valid email"
                          : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter your phone_number no."
                        name="phone_number"
                        maxLength="11"
                        onChange={inputHandler}
                        required
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="phone_number"
                      >
                        {!CreateUser.phone_number
                          ? "must have atleast 11 number"
                          : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        onChange={inputHandler}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="mb-3 password"
                      >
                        {CreateUser.password.length < 6
                          ? "must have minimum 6 character with number"
                          : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                      <Link href="/">
                        <a className="text-secondary">Forget Password ?</a>
                      </Link>
                    </div>
                    <div className="d-flex flex-column align-items-center mt-5 ">
                      <button type="submit" className="sign-up-btn">
                        SIGNUP
                      </button>
                      <Link href="/login">
                        <a className="insteadLogin">Login instead ?</a>
                      </Link>
                      <p className="text-secondary">Or Sign Up with...</p>
                    </div>
                    <div className="d-flex flex-column justify-content-around flex-wrap">
                      <button className="social-btn">
                        <img
                          src="/images/google.png"
                          className="img-fluid"
                          alt="#"
                        />
                        Sign in with Google
                      </button>
                      <button className="social-btn">
                        <img
                          src="/images/fb.png"
                          className="img-fluid"
                          alt="#"
                        />
                        Continue with Facebook
                      </button>
                    </div>
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
