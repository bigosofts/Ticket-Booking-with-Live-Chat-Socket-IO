"use client";
import { useRouter } from "next/navigation";
function HeaderFront(props) {
  const router = useRouter();

  const hardRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <header className="hide">
      <nav class="header-front">
        <img
          style={{ cursor: "pointer" }}
          onClick={hardRefresh}
          src="/hero-img/logo.png"
          alt="Travel"
          className="logo"
        ></img>
        <ul style={{paddingLeft:"0px"}}>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/login")}
          >
            <a>Login</a>
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/register")}
          >
            <a>Sign Up</a>
          </li>
          <li className="search">
            <a href="#search-front">
              <i className="fa fa-search"></i>
            </a>
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/dashboard/user")}
            className="hamburger"
          >
            <a>
              <div className="bar"></div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderFront;
