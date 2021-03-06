import { Card, Form } from "react-bootstrap";
import Link from "next/link";
import { useContext, useState } from "react";
import DreamFinderContext from "../components/Context/Context";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
const Login = () => {
  const { loggedInUser, setLoggedInUser } = useContext(DreamFinderContext);

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    e.preventDefault();
    let isInputValid;

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
      const newUser = { ...loginUser };
      newUser[e.target.name] = e.target.value;
      setLoginUser(newUser);
    }
  };

  const router = useRouter();
  console.log(router.pathname);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/signin`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(loginUser),
        }
      );
      const data = await res.json();

      if (data.data) {
        localStorage.setItem("DreamFinder_session", JSON.stringify(data.data));
        try {
          const getToken = JSON.parse(
            localStorage.getItem("DreamFinder_session")
          );
          console.log(getToken);
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
            method: "GET",
            headers: { DreamFinder: getToken },
          });
          const data = await res.json();
          // console.log(data);
          setLoggedInUser(data.data);
          if (data.data.name) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      } else if ((data.success = "no")) {
        // setLoggedInUser(data);
        // console.log(data);
        Swal.fire({
          icon: "error",
          title: "password or email was wrong",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "something went wrong",
      });
    }
  };

  return (
    <section className="sign-up py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <Card
                  style={{ padding: "2rem 2rem", border: "none" }}
                  className=""
                >
                  <Form noValidate onSubmit={submitHandler}>
                    <h3 className="formTitle">Login</h3>
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
                        {!loginUser.email
                          ? "please provide an valid email"
                          : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
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
                        {loginUser.password.length < 6
                          ? "must have minimum 6 character with number"
                          : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                      <Link href="/">
                        <a className="text-secondary">Forget Password ?</a>
                      </Link>
                    </div>
                    <div className="d-flex flex-column align-items-center mt-5">
                      <button type="submit" className="sign-up-btn">
                        Login
                      </button>
                      <Link href="/sign-up">
                        <a className="insteadLogin">Create Account ?</a>
                      </Link>
                      <p className="text-secondary">Or Sign Up with...</p>
                    </div>
                    <div className="d-flex flex-column justify-content-around flex-wrap">
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
                      <button className="social-btn" type="button">
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

export default Login;
