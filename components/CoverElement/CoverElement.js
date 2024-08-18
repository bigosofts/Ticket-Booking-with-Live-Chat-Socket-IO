"use client";
import { usePathname } from "next/navigation";

function CoverElement({ id }) {
  const pathname = usePathname();

  return (
    <div className="full_container secbg">
      <div className="container-travel-page">
        <h2>{id || "Posts"}</h2>
        <p>
          Home <span> {pathname} </span>
        </p>
      </div>
    </div>
  );
}

export default CoverElement;
