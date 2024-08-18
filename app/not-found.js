import Link from "next/link";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    color: "#333",
    textAlign: "center",
  },
  heading: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "24px",
  },
  link: {
    fontSize: "18px",
    color: "#0070f3",
    textDecoration: "none",
    border: "1px solid #0070f3",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "all 0.3s",
  },
};

styles.link[":hover"] = {
  backgroundColor: "#0070f3",
  color: "#fff",
};
