"use client";
import { useEffect, useRef, useState } from "react";
import "./SigninForm.css";
import { useRouter } from "next/navigation";
import { clientLogin } from "@/apiservices/checklogin";
import { instructorLogin } from "@/apiservices/checklogin";
import mytoast from "../toast/toast";
import { setInitialData as setIsAdmin } from "@/app/redux/features/isAdmin/isAdminSlice";
import { useDispatch } from "react-redux";
import { setToken } from "@/helper/sessionHelper";

function SigninForm(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const data2 = props.isAdmin;

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

      container.classList.remove("sign-up-mode");
    }, 10);
  }, []);

  const userNameref = useRef();
  const passwordref = useRef();

  async function clickHandlerClient(e) {
    e.preventDefault();
    let userName = userNameref.current.value;
    let password = passwordref.current.value;

    if (data2.status == "noToken") {
      const res = await clientLogin(userName, password);

      if (res.status == "Alhamdulillah") {
        dispatch(
          setIsAdmin({
            status: res.status,
            data: {
              userName: res.data.userName,
              userRole: res.data.userRole,
              isAdmin: res.data.isAdmin,
            },
          })
        );
        setToken("token_travel", res);
        mytoast.success("Login SuccessFul");
        router.push(`/dashboard/${userName}`);
      } else if (res.status == "nouser") {
        dispatch(
          setIsAdmin({
            status: "nouser",
            data: "",
          })
        );

        mytoast.warning("There is no account with this username");
        setTimeout(() => {
          hardRefreshCustom("/register");
        }, 2000);
      }
    }
  }
  async function clickHandlerInstructor(e) {
    e.preventDefault();
    let userName = userNameref.current.value;
    let password = passwordref.current.value;

    if (data2.status == "noToken") {
      const res = await instructorLogin(userName, password);

      if (res.status == "Alhamdulillah") {
        dispatch(
          setIsAdmin({
            status: res.status,
            data: {
              userName: res.data.userName,
              userRole: res.data.userRole,
              isAdmin: res.data.isAdmin,
            },
          })
        );
        setToken("token_travel", res);

        mytoast.success("Login SuccessFul");
        router.push(`/dashboard/${userName}`);
      } else if (res.status == "noUser") {
        dispatch(
          setIsAdmin({
            status: "nouser",
            data: "",
          })
        );
        mytoast.warning("There is no account or Account is not active");
        setTimeout(() => {
          hardRefreshCustom("/register");
        }, 2000);
      }
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
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input ref={userNameref} type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input ref={passwordref} type="password" placeholder="Password" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <button onClick={clickHandlerClient} className="btn btn-signin">
                Log in as client
              </button>
              <button
                onClick={clickHandlerInstructor}
                className="btn btn-signin"
              >
                Log in as Instructor
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Demo Instructor Account</h3>
            <p>
              Username: <span style={{ color: "yellow" }}>limon</span>
              <br></br> Password:{" "}
              <span style={{ color: "yellow" }}>12345678</span>
            </p>
            <button
              onClick={() => router.push("/register")}
              className="btn btn-signin transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src="" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <img src="" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SigninForm;
