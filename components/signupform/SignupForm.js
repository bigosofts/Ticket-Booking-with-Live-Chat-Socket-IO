"use client";
import { useEffect, useRef } from "react";
import "./SigninForm.css";
import { useRouter } from "next/navigation";

import {
  createData as createClient,
  selectAllDataPublic as selectallclients,
} from "@/apiservices/clientapiservices";
import {
  createData as createInstructor,
  selectAllDataPublic as selectallinstructors,
} from "@/apiservices/instructorapiservices";
import mytoast from "../toast/toast";

function SignupForm(props) {
  const router = useRouter();
  const data2 = props.isAdmin;
  const usernameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();

  const hardRefreshCustom = (link) => {
    if (typeof window !== "undefined") {
      window.location.href = link;
    }
  };

  let stateCondition;
  stateCondition = props.form;
  useEffect(() => {
    setTimeout(() => {
      const container = document.querySelector(".container-slide-signin");

      container.classList.add("sign-up-mode");
    }, 10);
  }, []);

  async function clickHandlerClient(e) {
    e.preventDefault();

    let username = usernameref.current.value;
    let email = emailref.current.value;
    let password = passwordref.current.value;

    if (data2.status == "noToken") {
      const res2 = await selectallclients({ userName: username });
      const res3 = await selectallclients({ clientEmail: email });

      if (res2.data.length > 0) {
        mytoast.warning("Username already exists. Try different name");
      } else {
        if (res3.data.length > 0) {
          mytoast.warning("Email name already exists. Try different email");
        } else {
          const res4 = await createClient(
            username,
            email,
            555,
            "active",
            password,
            "/images/demo1.jpg"
          );

          if (res4.status == "Success") {
            mytoast.success("User has been created");
          }
        }
      }
    } else {
      mytoast.success("You are already logged in");
    }
  }
  async function clickHandlerInstructor(e) {
    e.preventDefault();
    let username = usernameref.current.value;
    let email = emailref.current.value;
    let password = passwordref.current.value;

    if (data2.status == "noToken") {
      const res2 = await selectallinstructors({ userName: username });
      const res3 = await selectallinstructors({ instructorEmail: email });

      if (res2.data.length > 0) {
        mytoast.warning("Username already exists. Try different name");
      } else {
        if (res3.data.length > 0) {
          mytoast.warning("Email name already exists. Try different email");
        } else {
          const res4 = await createInstructor(
            username,
            email,
            555,
            "",
            "inactive",
            false,
            password,
            "/images/demo1.jpg"
          );

          if (res4.status == "Success") {
            mytoast.success("User has been created");
          }
        }
      }
    } else {
      mytoast.success("You are already logged in");
    }
  }

  return (
    <div
      className={`container-slide-signin ${
        stateCondition ? "sign-up-mode" : ""
      }`}
    >
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Click to sign up as a client</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-signup solid"
            />
          </form>

          <form action="#" className="sign-up-form">
            <h2 className="title"></h2>
            <div className="input-field">
              <i className="fa fa-envelope"></i>
              <input type="email" ref={emailref} placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input ref={usernameref} type="text" placeholder="Username" />
            </div>

            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input ref={passwordref} type="password" placeholder="Password" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection:"column"
              }}
            >
              <div
                onClick={clickHandlerClient}
                className="btn btn-signup sign-up-btn"
              >Click to sign up as a client</div>
              <div
                onClick={clickHandlerInstructor}
                className="btn btn-signup sign-up-btn"
              >Click to sign up as a guide or organization</div>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Don't you have any account yet? Signup as a Client or Sign up as
              an Instructor if you have qualifications
            </p>
            <button
              onClick={() => router.push("/register")}
              className="btn btn-signup transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src="" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Already have Instructor or Client Account With Us? please click
              sign in button to log in
            </p>
            <button
              onClick={() => router.push("/login")}
              className="btn btn-signup transparent"
              id="sign-in-btn"
            >
              Log in
            </button>
            <button
              style={{ marginLeft: "20px", marginTop: "20px" }}
              onClick={() => hardRefreshCustom("/")}
              className="btn btn-signup transparent"
              id="sign-up-btn"
            >
              Go to Home
            </button>
          </div>
          <img src="" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
