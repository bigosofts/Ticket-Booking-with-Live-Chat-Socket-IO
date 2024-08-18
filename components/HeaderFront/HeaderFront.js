"use client";
import { useRouter } from "next/navigation";
function HeaderFront({ scrolledStatus }) {
  const router = useRouter();
//hard refresh
  const hardRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <header className={scrolledStatus ? `scrolled hide` : `hide`}>
      <nav className="header-front">
        <img
          style={{ cursor: "pointer" }}
          onClick={hardRefresh}
          src="/hero-img/logo.png"
          alt="Travel"
          className="logo"
        ></img>
        <ul style={{ paddingLeft: "0px" }}>
          

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
