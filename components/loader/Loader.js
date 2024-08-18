import "./Loader.css";
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <img
          width="150"
          height="150"
          className="animationName"
          style={{ margin: "auto" }}
          src="/hero-img/logo.png"
        ></img>
        <h1
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "300",
          }}
        >
          Loading ...
        </h1>
      </div>
    </div>
  );
}

export default Loader;
