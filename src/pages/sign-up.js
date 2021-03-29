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
    <>
      <section className="sign-up position-relative">
        <div className="become_A_Member">
          <h1>Become a Member, Register Now!</h1>
        </div>

        <div className="container registerBottom">
          <div className="row">
            <div className="col-lg-8 col-md-6 registerText">
              <h5>Register Now, It’s Free!</h5>
              <p>
                Post your properties on DreamFinder.com and directly expose them
                to thousands of potential investors, tenants, buyers, agents &
                brokers and other interested parties. Save your favourite
                properties in your members panel to view them later at your
                convenience. Search the exact kind of property you are looking
                for, including hundreds of developments, residential &
                commercial properties, homes, villas, apartments, plots, shops,
                offices, complete buildings & floors, warehouses, factories and
                labour camps.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 signUpCard">
              <Card style={{ padding: "2rem 2rem" }}>
                <Form noValidate onSubmit={submitHandler}>
                  <div className="d-flex flex-column justify-content-around flex-wrap mb-3">
                    <Link href="https://DreamFinder.com.bd/api/auth/google">
                      <a className="social-btn">
                        <img
                          src="/images/google.png"
                          className="img-fluid"
                          alt="#"
                        />
                        Sign in with Google
                      </a>
                    </Link>
                    <button className="social-btn">
                      <img src="/images/fb.png" className="img-fluid" alt="#" />
                      Continue with Facebook
                    </button>
                  </div>
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
                      {!CreateUser.email ? "please provide an valid email" : ""}
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
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label=" I Agree to Terms & Conditions"
                    />
                  </Form.Group>
                  <div className="d-flex flex-column align-items-center mt-5 ">
                    <button type="submit" className="sign-up-btn">
                      SIGNUP
                    </button>
                    <Link href="/login">
                      <a className="insteadLogin">Login instead ?</a>
                    </Link>
                  </div>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
